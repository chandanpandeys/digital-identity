import {
  PDFDocument,
  StandardFonts,
  rgb,
  PDFName,
  PDFString,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import type { ResumeData } from "@/lib/resume-data";
import { site } from "@/lib/profile";
const WIDTH = 595.28,
  HEIGHT = 841.89,
  LEFT = 45,
  RIGHT = WIDTH - 45;
const INK = rgb(0.08, 0.12, 0.09),
  MUTED = rgb(0.32, 0.38, 0.32),
  ACCENT = rgb(0.21, 0.37, 0.12);
function printable(text: string) {
  return text
    .replace(/[–—]/g, "-")
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/×/g, "x")
    .replace(/→/g, ">")
    .replace(/[^\x20-\x7E\xA0-\xFF]/g, "");
}
function wrap(text: string, font: PDFFont, size: number, width: number) {
  const lines: string[] = [];
  let line = "";
  for (const word of printable(text).split(/\s+/)) {
    const test = line ? line + " " + word : word;
    if (font.widthOfTextAtSize(test, size) <= width) line = test;
    else {
      if (line) lines.push(line);
      if (font.widthOfTextAtSize(word, size) > width) {
        let chunk = "";
        for (const letter of word) {
          if (font.widthOfTextAtSize(chunk + letter, size) > width) {
            lines.push(chunk);
            chunk = "";
          }
          chunk += letter;
        }
        line = chunk;
      } else line = word;
    }
  }
  if (line) lines.push(line);
  return lines;
}
export async function buildResumePdf(data: ResumeData) {
  const pdf = await PDFDocument.create(),
    regular = await pdf.embedFont(StandardFonts.Helvetica),
    bold = await pdf.embedFont(StandardFonts.HelveticaBold);
  pdf.setTitle("Chandan Pandey - " + data.headline);
  pdf.setAuthor("Chandan Pandey");
  pdf.setSubject("Role-focused experience and public project evidence");
  pdf.setLanguage("en-IN");
  let page: PDFPage,
    y = 0;
  const nextPage = () => {
    page = pdf.addPage([WIDTH, HEIGHT]);
    y = HEIGHT - 46;
  };
  const ensure = (height: number) => {
    if (y - height < 54) nextPage();
  };
  const text = (
    value: string,
    size = 10,
    font = regular,
    color = INK,
    indent = 0,
  ) => {
    const lines = wrap(value, font, size, RIGHT - LEFT - indent);
    for (const line of lines) {
      ensure(size * 1.4);
      page.drawText(line, { x: LEFT + indent, y, size, font, color });
      y -= size * 1.4;
    }
    return lines.length;
  };
  const link = (label: string, url: string, size = 9) => {
    ensure(16);
    const at = y;
    const lines = wrap(label, regular, size, RIGHT - LEFT);
    text(label, size, regular, ACCENT);
    const annotation = pdf.context.obj({
      Type: "Annot",
      Subtype: "Link",
      Rect: [LEFT, at - size * lines.length * 1.4, RIGHT, at + size],
      Border: [0, 0, 0],
      A: { Type: "Action", S: PDFName.of("URI"), URI: PDFString.of(url) },
    });
    page.node.addAnnot(pdf.context.register(annotation));
  };
  const section = (title: string) => {
    ensure(55);
    y -= 17;
    page.drawLine({
      start: { x: LEFT, y: y + 5 },
      end: { x: RIGHT, y: y + 5 },
      thickness: 0.5,
      color: rgb(0.78, 0.83, 0.77),
    });
    y -= 12;
    text(title.toUpperCase(), 9, bold, ACCENT);
    y -= 7;
  };
  const entries = (items: ResumeData["experience"]) => {
    for (const entry of items) {
      ensure(65);
      text(entry.title, 11, bold);
      if (entry.organization || entry.meta)
        text(
          [entry.organization, entry.meta].filter(Boolean).join(" | "),
          9,
          regular,
          MUTED,
        );
      y -= 5;
      for (const bullet of entry.bullets) {
        text("- " + bullet, 10, regular, INK, 5);
        y -= 4;
      }
      if (entry.evidence) text(entry.evidence, 8, regular, MUTED);
      if (entry.url)
        link(
          entry.url,
          entry.url.startsWith("http") ? entry.url : "https://" + entry.url,
          8.5,
        );
      y -= 10;
    }
  };
  nextPage();
  text("CHANDAN PANDEY", 25, bold);
  y -= 7;
  text(data.headline, 12, bold, ACCENT);
  y -= 10;
  link(
    site.contact.email + "  |  " + site.contact.phone,
    "mailto:" + site.contact.email,
    9,
  );
  link("LinkedIn: linkedin.com/in/chandanpandeys", site.links.linkedin, 9);
  link(
    "Portfolio: " + site.canonicalUrl + "/resume",
    site.canonicalUrl + "/resume",
    9,
  );
  y -= 13;
  text(data.summary, 10);
  section("Experience");
  entries(data.experience);
  const skillsHeight =
    49 +
    data.skills.reduce(
      (height, skill) =>
        height +
        wrap(skill.label, bold, 9, RIGHT - LEFT).length * 12.6 +
        wrap(skill.value, regular, 10, RIGHT - LEFT).length * 14 +
        7,
      0,
    );
  const skillsOnFirstPage = y - skillsHeight >= 54;
  const renderSkills = () => {
    section("Skills");
    for (const skill of data.skills) {
      ensure(45);
      text(skill.label, 9, bold);
      text(skill.value, 10);
      y -= 7;
    }
  };
  if (skillsOnFirstPage) renderSkills();
  nextPage();
  text("CHANDAN PANDEY", 12, bold);
  text(data.headline, 9, regular, MUTED);
  section("Selected work");
  entries(data.work);
  if (!skillsOnFirstPage) renderSkills();
  if (data.educationNote) {
    section("Education & learning");
    text(data.educationNote, 9.5);
  }
  y -= 10;
  link(
    "Certificates and original source links: " +
      site.canonicalUrl +
      "/credentials",
    site.canonicalUrl + "/credentials",
    9,
  );
  pdf.getPages().forEach((p, i) => {
    p.drawText("Chandan Pandey  |  " + data.headline, {
      x: LEFT,
      y: 28,
      size: 7.5,
      font: regular,
      color: MUTED,
    });
    p.drawText(i + 1 + " / " + pdf.getPageCount(), {
      x: RIGHT - 28,
      y: 28,
      size: 8,
      font: regular,
      color: MUTED,
    });
  });
  return pdf.save();
}
