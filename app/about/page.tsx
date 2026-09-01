import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { proofSignals, site } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description: "The through-line behind Chandan Pandey's work across AI engineering, applied research, developer tooling, education, and technical communication.",
  alternates: { canonical: "/about" },
};

const chapters = [
  {
    index: "01",
    label: "EXPLAIN",
    title: "The first useful skill was making difficult things understandable.",
    body: "Before AI engineering became the center of the work, I was making student-focused education content and later answering more than 1,000 questions as a subject-matter expert. That taught me to break a problem down, expose the reasoning, and notice where another person gets stuck.",
    links: [{ label: "Creator chapter", href: "/content" }, { label: "Full timeline", href: "/timeline" }],
  },
  {
    index: "02",
    label: "RESEARCH",
    title: "Machine learning turned explanation into investigation.",
    body: "Internships and applied projects moved the work from learning models to testing them. Research at Amity pushed that further into cancer genomics, neoantigen prediction, peptide analysis, sequence-oriented modelling, evaluation, and computational vaccine workflows—where the question is not just whether code runs, but whether the method means what you think it means.",
    links: [{ label: "EpitopePred", href: "/work/epitopepred" }, { label: "Research timeline", href: "/timeline" }],
  },
  {
    index: "03",
    label: "SYSTEMS",
    title: "The current focus is turning technical questions into inspectable software.",
    body: "ByteToken asks how agent payloads can use context more efficiently. InferBench asks how to judge local LLMs on the hardware that actually runs them. DekhoSuno asks how multimodal AI can become an accessibility interface. Different domains, but the working pattern is the same: define the problem, build the system, measure what matters, and leave evidence behind.",
    links: [{ label: "Work index", href: "/work" }, { label: "Ask the evidence", href: "/ask" }],
  },
] as const;

const principles = [
  ["Evidence over adjectives", "A strong claim should resolve to code, a benchmark, a public artifact, or a clearly labelled first-party record."],
  ["Useful beyond the demo", "I am more interested in systems, workflows, interfaces, and evaluation than in impressive-looking one-off outputs."],
  ["Explanation is part of the product", "Documentation, research communication, teaching, and technical storytelling are ways of making a system usable—not side activities."],
] as const;

export default function AboutPage() {
  return (
    <main id="main" className="inner-page about-page-v2">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>ABOUT / THROUGH-LINE</span></header>

      <section className="site-shell about-hero">
        <div>
          <p className="eyebrow">ABOUT / ONE IDENTITY, MULTIPLE OUTPUTS</p>
          <h1>I learn deeply,<br/><em>build the system,</em><br/>then make it legible.</h1>
        </div>
        <div className="about-portrait"><Image src="https://avatars.githubusercontent.com/u/126047460?v=4" alt="Chandan Pandey" fill sizes="320px" /></div>
      </section>

      <section className="site-shell about-thesis">
        <aside>THE THROUGH-LINE</aside>
        <div>
          <p className="about-thesis-lede">I am an AI engineer and builder working across LLM infrastructure, applied research, developer tooling, accessibility, automation, and technical communication.</p>
          <p>The breadth only makes sense if you look at the method instead of the job titles. I keep returning to the same loop: understand a difficult problem, turn it into something operational, test the result, and explain the reasoning clearly enough that another person can inspect or use it.</p>
          <p>This portfolio is designed around that loop. It does not ask a recruiter to trust a long list of skills; it connects the claims to projects, public source, measurements, career records, and first-party context with different evidence strengths.</p>
        </div>
      </section>

      <section className="site-shell about-chapters">
        <div className="about-section-head"><p className="eyebrow">HOW THE WORK EVOLVED</p><h2>Explain → research → systems.</h2></div>
        {chapters.map((chapter) => (
          <article className="about-chapter" key={chapter.index}>
            <div className="about-chapter-index"><span>{chapter.index}</span><b>{chapter.label}</b></div>
            <div className="about-chapter-copy"><h3>{chapter.title}</h3><p>{chapter.body}</p></div>
            <div className="about-chapter-links">{chapter.links.map((link) => <Link href={link.href} key={link.href}>{link.label} ↗</Link>)}</div>
          </article>
        ))}
      </section>

      <section className="about-principles-band">
        <div className="site-shell">
          <p className="eyebrow light">WORKING PRINCIPLES</p>
          <div className="about-principles">
            {principles.map(([title, body], index) => <article key={title}><span>0{index + 1}</span><h2>{title}</h2><p>{body}</p></article>)}
          </div>
        </div>
      </section>

      <section className="site-shell about-proof">
        <div className="about-section-head"><p className="eyebrow">PUBLIC EVIDENCE NODES</p><h2>Start with what can be inspected.</h2></div>
        <ul>{proofSignals.map((signal)=><li key={signal.label}><a href={signal.href} target="_blank" rel="noreferrer"><strong>{signal.label}</strong><span>{signal.strength} · {signal.source} ↗</span></a></li>)}</ul>
        <div className="about-actions"><Link className="button primary" href="/work">Inspect work ↗</Link><Link className="button secondary" href="/ask">Ask the evidence ↗</Link><a className="button secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></div>
      </section>
    </main>
  );
}
