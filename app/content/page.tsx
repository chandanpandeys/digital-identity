import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Content & Education",
  description: "The creator and educator chapter of Chandan Pandey: early education content, teaching, technical explanation, and AI/technology storytelling.",
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
] as const;

const communicationModes = [
  ["Research synthesis", "Turn a large technical surface into the few distinctions, assumptions, and trade-offs that actually matter."],
  ["Documentation", "Leave enough structure behind that another person can understand how the system works and what supports the claims."],
  ["Teaching", "Notice where understanding breaks, then rebuild the explanation around the learner rather than around the expert."],
  ["Product narrative", "Make interfaces, demos, scripts, and technical content communicate what the system does without hiding its limits."],
] as const;

export default function ContentPage() {
  return (
    <main id="main" className="inner-page creator-page creator-page-v2">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>CONTENT / EXPLAIN</span></header>
      <section className="site-shell page-hero creator-hero">
        <p className="eyebrow">CONTENT / EDUCATION / TECHNICAL COMMUNICATION</p>
        <h1>Explanation is<br/><em>part of the engineering.</em></h1>
        <p>The creator history is not a separate influencer persona. It is where I learned a skill that still shows up in research, documentation, product UX, technical content, and developer tooling: make the difficult thing legible without making it shallow.</p>
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
          <p className="eyebrow light">THE CONNECTING QUESTION</p>
          <blockquote>“Can I make the difficult thing legible without making it shallow?”</blockquote>
          <p>That question connects teaching, research communication, technical content, product interfaces, documentation, and tools built for other developers.</p>
        </div>
      </section>

      <section className="site-shell communication-section">
        <div className="about-section-head"><p className="eyebrow">WHAT COMMUNICATION DOES INSIDE THE WORK</p><h2>Not promotion. An engineering surface.</h2></div>
        <div className="communication-grid">
          {communicationModes.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="site-shell creator-links">
        <div><p className="eyebrow">CURRENT CHANNELS</p><h2>The archive becomes evidence, not nostalgia.</h2></div>
        <div>
          <p>Older creator material will be indexed selectively after channel naming, links, and source artifacts are verified. The goal is to preserve the origin story without turning the portfolio into a social-media dump.</p>
          <a className="button secondary" href={site.links.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
          <a className="button secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
          <Link className="button secondary" href="/timeline">Full timeline ↗</Link>
        </div>
      </section>
    </main>
  );
}
