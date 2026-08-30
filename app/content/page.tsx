import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Content & Education",
  description: "The creator and educator chapter of Chandan Pandey: early YouTube work, teaching, technical explanation, and AI content.",
  alternates: { canonical: "/content" },
};

const chapters = [
  {
    period: "2020",
    label: "STARTED BEFORE THE TITLE",
    title: "Learning to explain on camera.",
    body: "The creator chapter began while I was still in school. The earliest polished videos were practical student problems—how to improve handwriting, then how to improve marks in board examinations. The production was simple; the useful skill was learning to structure an explanation for someone else.",
  },
  {
    period: "2020 — 2022",
    label: "EDUCATION CONTENT",
    title: "From study advice to technical concepts.",
    body: "The channel expanded into board-exam preparation, science concepts, diagrams, previous-year questions, and exam-oriented explanations for school and competitive-exam learners.",
  },
  {
    period: "2023 — 2024",
    label: "TEACHING AT SCALE",
    title: "Explanation became a working skill.",
    body: "As a subject-matter expert, I answered more than 1,000 student questions across mathematics, computer science, IT, and related topics. Workshops and student initiatives added live teaching, debugging, and project guidance to the same communication loop.",
  },
  {
    period: "2026 — NOW",
    label: "AI × CONTENT",
    title: "Technical storytelling became part of the job.",
    body: "Today the same skill is applied to AI and technology: researching tools and use cases, finding the useful angle, writing scripts and narratives, designing workflows, and using audience feedback to improve what gets explained next.",
  },
];

export default function ContentPage() {
  return (
    <main id="main" className="inner-page creator-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>CONTENT / EXPLAIN</span></header>
      <section className="site-shell page-hero creator-hero">
        <p className="eyebrow">CONTENT / EDUCATION / STORYTELLING</p>
        <h1>I was explaining<br/><em>before I was engineering.</em></h1>
        <p>This is not a separate creator persona. It is the communication layer behind the engineering work: understand something, structure it, and make it useful to someone else.</p>
      </section>

      <section className="site-shell creator-ledger">
        {chapters.map((chapter, index) => (
          <article key={chapter.period}>
            <span className="creator-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="creator-period">{chapter.period}</span>
            <div><p>{chapter.label}</p><h2>{chapter.title}</h2><strong>{chapter.body}</strong></div>
          </article>
        ))}
      </section>

      <section className="creator-quote-band">
        <div className="site-shell">
          <p className="eyebrow light">THE CONNECTING SKILL</p>
          <blockquote>“Can I make the difficult thing legible without making it shallow?”</blockquote>
          <p>That question connects teaching, research communication, technical content, product UX, documentation, and developer tooling.</p>
        </div>
      </section>

      <section className="site-shell creator-links">
        <div><p className="eyebrow">CURRENT CHANNELS</p><h2>The archive becomes evidence, not nostalgia.</h2></div>
        <div>
          <p>Older creator material will be indexed selectively as links and source artifacts are cleaned up. The goal is to preserve the origin story without turning the portfolio into a social-media dump.</p>
          <a className="button secondary" href={site.links.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a className="button secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </section>
    </main>
  );
}
