import { PDFDocument, StandardFonts, rgb, type PDFFont, type PDFPage } from "pdf-lib";
import type { ResumeData } from "@/lib/resume-data";

const PAGE_WIDTH = 595.28;
const PAGE_HEIGHT = 841.89;
const LEFT = 34;
const RIGHT = PAGE_WIDTH - 34;
const CONTENT_WIDTH = RIGHT - LEFT;
const BLUE = rgb(36 / 255, 87 / 255, 1);
const INK = rgb(18 / 255, 22 / 255, 28 / 255);
const MUTED = rgb(80 / 255, 87 / 255, 97 / 255);
const LINE = rgb(0.86, 0.88, 0.9);

function wrap(text: string, font: PDFFont, size: number, maxWidth: number) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = "";
  for (const word of words) {
    const candidate = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(candidate, size) <= maxWidth) {
      line = candidate;
    } else {
      if (line) lines.push(line);
      line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}

function drawWrapped(page: PDFPage, text: string, x: number, y: number, options: { font: PDFFont; size: number; width: number; color?: ReturnType<typeof rgb>; lineHeight?: number }) {
  const lineHeight = options.lineHeight ?? options.size * 1.22;
  const lines = wrap(text, options.font, options.size, options.width);
  lines.forEach((line, index) => page.drawText(line, { x, y: y - index * lineHeight, size: options.size, font: options.font, color: options.color ?? INK }));
  return y - lines.length * lineHeight;
}

function section(page: PDFPage, label: string, y: number, bold: PDFFont) {
  page.drawText(label.toUpperCase(), { x: LEFT, y, size: 7.6, font: bold, color: BLUE });
  page.drawLine({ start: { x: LEFT, y: y - 3 }, end: { x: RIGHT, y: y - 3 }, thickness: 0.55, color: LINE });
  return y - 14;
}

function entry(page: PDFPage, item: ResumeData["experience"][number], y: number, regular: PDFFont, bold: PDFFont) {
  page.drawText(item.title, { x: LEFT, y, size: 8.9, font: bold, color: INK });
  const titleWidth = bold.widthOfTextAtSize(item.title, 8.9);
  if (item.organization) page.drawText(` - ${item.organization}`, { x: LEFT + titleWidth + 3, y, size: 8.6, font: regular, color: MUTED });
  y -= 10.5;
  if (item.meta) {
    page.drawText(item.meta, { x: LEFT, y, size: 6.7, font: regular, color: MUTED });
    y -= 9;
  }
  for (const bullet of item.bullets) {
    page.drawText("-", { x: LEFT + 2, y, size: 7.1, font: bold, color: BLUE });
    y = drawWrapped(page, bullet, LEFT + 10, y, { font: regular, size: 7.15, width: CONTENT_WIDTH - 10, lineHeight: 8.55 });
    y -= 1.5;
  }
  return y - 1;
}

function project(page: PDFPage, item: ResumeData["work"][number], y: number, regular: PDFFont, bold: PDFFont) {
  page.drawText(item.title, { x: LEFT, y, size: 8.8, font: bold, color: INK });
  const titleWidth = bold.widthOfTextAtSize(item.title, 8.8);
  if (item.organization) page.drawText(` - ${item.organization}`, { x: LEFT + titleWidth + 3, y, size: 8.25, font: regular, color: MUTED });
  y -= 10.5;
  for (const bullet of item.bullets) {
    page.drawText("-", { x: LEFT + 2, y, size: 7, font: bold, color: BLUE });
    y = drawWrapped(page, bullet, LEFT + 10, y, { font: regular, size: 7.05, width: CONTENT_WIDTH - 10, lineHeight: 8.35 });
    y -= 1;
  }
  const proof = [item.evidence, item.url].filter(Boolean).join("  ");
  if (proof) {
    y = drawWrapped(page, proof, LEFT, y, { font: bold, size: 6.2, width: CONTENT_WIDTH, color: MUTED, lineHeight: 7.2 });
    y -= 1;
  }
  return y;
}

export async function buildResumePdf(data: ResumeData) {
  const doc = await PDFDocument.create();
  doc.setTitle(`Chandan Pandey - ${data.headline}`);
  doc.setAuthor("Chandan Pandey");
  doc.setSubject("Role-specific resume generated from the portfolio's structured career record.");

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = 798;

  page.drawText("Chandan Pandey", { x: LEFT, y, size: 21, font: bold, color: INK });
  y -= 24;
  page.drawText(data.headline, { x: LEFT, y, size: 10.2, font: bold, color: BLUE });
  y -= 14;
  const contact = "humanchandanpandey@gmail.com | +91 89573 65560 | linkedin.com/in/chandanpandeys | github.com/chandanpandeys | India";
  y = drawWrapped(page, contact, LEFT, y, { font: regular, size: 7.25, width: CONTENT_WIDTH, color: MUTED, lineHeight: 8.4 });
  y -= 1;
  y = drawWrapped(page, data.summary, LEFT, y, { font: regular, size: 7.8, width: CONTENT_WIDTH, color: INK, lineHeight: 9.3 });
  y -= 5;
  page.drawRectangle({ x: LEFT, y: y - 2, width: CONTENT_WIDTH, height: 5, color: BLUE });
  y -= 14;

  y = section(page, "Experience", y, bold);
  for (const item of data.experience) y = entry(page, item, y, regular, bold);

  y = section(page, "Selected Technical Work", y - 1, bold);
  for (const item of data.work) y = project(page, item, y, regular, bold);

  y = section(page, data.headline.startsWith("AI Content") ? "Communication & Technical Skills" : data.headline.startsWith("AI Research") ? "Research Skills" : "Core Skills", y - 1, bold);
  for (const skill of data.skills) {
    page.drawText(skill.label.toUpperCase(), { x: LEFT, y, size: 6.45, font: bold, color: BLUE });
    y = drawWrapped(page, skill.value, LEFT + 148, y, { font: regular, size: 6.9, width: CONTENT_WIDTH - 148, color: INK, lineHeight: 8.0 });
    page.drawLine({ start: { x: LEFT, y: y + 2 }, end: { x: RIGHT, y: y + 2 }, thickness: 0.35, color: LINE });
    y -= 2;
  }

  y = section(page, "Education", y - 2, bold);
  y = drawWrapped(page, data.educationNote ?? "Bachelor of Computer Applications (BCA) | 2022 - 2025", LEFT, y, { font: regular, size: 6.85, width: CONTENT_WIDTH, color: INK, lineHeight: 8.0 });

  if (y < 34) throw new Error(`Resume content overflowed the single-page layout: ${data.filename}`);

  const footer = `Chandan Pandey | ${data.headline} | Aug 2026`;
  const footerWidth = regular.widthOfTextAtSize(footer, 5.8);
  page.drawText(footer, { x: (PAGE_WIDTH - footerWidth) / 2, y: 16, size: 5.8, font: regular, color: MUTED });

  return doc.save();
}
