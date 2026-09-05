import { verticalMetadata } from "@/lib/verticals";
import { VerticalActions } from "@/components/VerticalActions";
import { experiences } from "@/lib/experience";
import Link from "next/link";
import { site } from "@/lib/profile";

export const metadata = verticalMetadata("content");

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
        <p className="eyebrow">AI CONTENT & TECHNICAL COMMUNICATION</p>
        <h1>Understand the technology.<br/><em>Make it understood.</em></h1>
        <p>I’m Chandan Pandey, an AI Content Lead connecting technical research, hands-on engineering and clear communication. I turn AI tools and use cases into useful narratives, scripts, workflows and learning material.</p>
        <VerticalActions vertical="content" />
      </section>

      <section className="site-shell section">
        <div className="section-intro"><p className="eyebrow">PROFESSIONAL CONTENT EXPERIENCE</p><h2>Research to narrative to iteration.</h2><p>These are first-party career summaries, with the public professional record linked for context. Client assets and performance results are not presented as independently verified samples.</p></div>
        <div className="vertical-cards">{experiences.filter(item => ["YAAS", "Notansun", "Brainly"].includes(item.organization)).map(item => <article key={item.organization}><p className="eyebrow">FIRST-PARTY CAREER CONTEXT · {item.period}</p><h3>{item.title} · {item.organization}</h3><p>{item.summary}</p><ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul></article>)}</div>
        <a className="text-link" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">Public professional profile ↗</a>
      </section>
      <section className="site-shell section">
        <div className="section-intro"><p className="eyebrow">INSPECTABLE TECHNICAL COMMUNICATION</p><h2>Read how I explain the work.</h2><p>Portfolio case studies demonstrate technical explanation. They are not client campaign results or audience-growth claims.</p></div>
        <div className="vertical-cards">
          <article><h3>ByteToken: explaining a benchmark</h3><p>Separate raw encoding from compression, preserve the baseline, and make a technical result reproducible.</p><Link className="text-link" href="/work/bytetoken">Read the explanation ↗</Link></article>
          <article><h3>InferBench: explaining evaluation</h3><p>Connect hardware fit, measurement and trade-offs to decisions a local-model user needs to make.</p><Link className="text-link" href="/work/inferbench">Read the case study ↗</Link></article>
        </div>
        <Link className="text-link" href="/lab">Explore public workflow experiments ↗</Link>
      </section>

      <section className="creator-quote-band">
        <div className="site-shell">
          <p className="eyebrow light">THE CONNECTING QUESTION</p>
          <blockquote>“Can I make the difficult thing legible without making it shallow?”</blockquote>
          <p>That question connects teaching, research communication, technical content, product interfaces, documentation, and tools built for other developers.</p>
        </div>
      </section>

      <section className="site-shell communication-section">
        <div className="about-section-head"><p className="eyebrow">WHAT COMMUNICATION DOES INSIDE THE WORK</p><h2>Research, structure, teach, explain.</h2></div>
        <div className="communication-grid">
          {communicationModes.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{body}</p></article>)}
        </div>
      </section>

      <section className="site-shell creator-ledger" id="creator-history">
        <div className="section-intro"><p className="eyebrow">DEEPER CONTEXT / CREATOR HISTORY</p><h2>Where explanation began.</h2><p>First-party history; archive artifacts will be linked after verification.</p></div>
        {chapters.map((chapter, index) => (
          <article key={chapter.period}>
            <span className="creator-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="creator-period">{chapter.period}</span>
            <div><p>{chapter.label}</p><h2>{chapter.title}</h2><strong>{chapter.body}</strong></div>
          </article>
        ))}
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
