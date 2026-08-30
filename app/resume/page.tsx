import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { site } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Resume",
  description: "Curated AI engineering, applied research, developer-tooling, and technical communication resume for Chandan Pandey.",
  alternates: { canonical: "/resume" },
};

const selectedOrganizations = new Set(["YAAS", "Amity University", "Notansun", "IBM SkillsBuild", "TechVidya Career"]);
const selectedExperience = experiences.filter(item => selectedOrganizations.has(item.organization));
const education = experiences.filter(item => item.kind === "education" && item.title.includes("Bachelor"));
const selectedProjects = projects.filter(project => ["bytetoken", "inferbench", "epitopepred", "dekhosuno"].includes(project.slug));

const capabilities = [
  {
    title: "LLM infrastructure & evaluation",
    text: "Tokenizer-aware transport, context efficiency, local-model benchmarking, hardware fit, telemetry, evaluation, CLI/developer tooling.",
    evidence: [{ label: "ByteToken", href: "/work/bytetoken" }, { label: "InferBench", href: "/work/inferbench" }],
  },
  {
    title: "Applied AI research",
    text: "Machine learning, sequence-oriented modelling, computational biology workflows, model evaluation, research tooling, and technical documentation.",
    evidence: [{ label: "Amity research record", href: "/timeline" }, { label: "EpitopePred", href: "/work/epitopepred" }],
  },
  {
    title: "Applied product AI",
    text: "Multimodal AI, accessible interaction, OCR, speech, computer vision, mobile interfaces, APIs, and end-to-end prototype systems.",
    evidence: [{ label: "DekhoSuno", href: "/work/dekhosuno" }, { label: "Work index", href: "/work" }],
  },
  {
    title: "Automation & agent workflows",
    text: "Workflow orchestration, AI agents, approval loops, batch automation, tool integrations, and practical process design.",
    evidence: [{ label: "OneClickAllResultsBot", href: "/work/oneclickallresultsbot" }, { label: "Lab", href: "/lab" }],
  },
  {
    title: "Technical communication",
    text: "AI/technology research, scripting, technical storytelling, teaching, workshops, documentation, and translating complex systems for different audiences.",
    evidence: [{ label: "Creator chapter", href: "/content" }, { label: "Career timeline", href: "/timeline" }],
  },
] as const;

const workingSet = [
  ["Languages / data", "Python · TypeScript/JavaScript · SQL · pandas · NumPy · scikit-learn"],
  ["LLM / agents", "LLM APIs · RAG · LangGraph · MCP · embeddings · agent workflows · evaluation"],
  ["Product / backend", "Next.js · React · FastAPI · Flask · APIs · Docker · Git/GitHub · CI/CD"],
  ["Research", "computational biology · sequence modelling · benchmarking · literature review · scientific workflows"],
] as const;

export default function ResumePage() {
  return (
    <main id="main" className="inner-page resume-page resume-page-v2">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>RESUME / CURATED WEB VIEW</span></header>

      <section className="site-shell page-hero resume-hero-v2">
        <p className="eyebrow">AI ENGINEERING / APPLIED RESEARCH / DEVELOPER TOOLS</p>
        <h1>Build the system.<br/><em>Measure the result.</em></h1>
        <p>AI engineer and builder working across LLM infrastructure, local-model evaluation, computational research, automation, accessibility, and technical communication. This page is intentionally selective; the complete chronology lives in the timeline.</p>
        <div className="resume-contact-row"><a href={site.links.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><Link href="/ask">Ask the evidence ↗</Link></div>
      </section>

      <section className="site-shell resume-grid resume-grid-v2">
        <aside>POSITIONING</aside>
        <div className="resume-positioning">
          <p>I work best where a technical question has to become an inspectable system: understand the problem, build the implementation, define what to measure, and make the reasoning legible to other people.</p>
          <div className="tag-list large"><span>AI / LLM Systems</span><span>Applied ML</span><span>Evaluation</span><span>Developer Tools</span><span>Computational Research</span><span>Technical Communication</span></div>
        </div>

        <aside>CAPABILITY → EVIDENCE</aside>
        <div className="capability-ledger">
          {capabilities.map((capability, index) => (
            <article className="capability-entry" key={capability.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h2>{capability.title}</h2><p>{capability.text}</p></div>
              <div className="capability-links">{capability.evidence.map(link => <Link href={link.href} key={link.href}>{link.label} ↗</Link>)}</div>
            </article>
          ))}
        </div>

        <aside>SELECTED EXPERIENCE</aside>
        <div>{selectedExperience.map(item => <article className="resume-entry" key={`${item.organization}-${item.title}`}><span>{item.period}</span><h2>{item.title} · {item.organization}</h2><p>{item.summary}</p>{item.details.slice(0,2).map(detail => <p className="resume-detail" key={detail}>— {detail}</p>)}</article>)}</div>

        <aside>SELECTED SYSTEMS</aside>
        <div>{selectedProjects.map(project => <article className="resume-entry resume-project-entry" key={project.slug}><span>{project.year} · {project.tier.toUpperCase()} · {project.category}</span><h2>{project.name}</h2><p>{project.strapline}</p><p className="resume-detail">— {project.summary}</p><Link href={`/work/${project.slug}`}>Inspect case study ↗</Link></article>)}</div>

        <aside>TECHNICAL WORKING SET</aside>
        <div className="working-set">
          {workingSet.map(([label, tools]) => <p key={label}><strong>{label}</strong><span>{tools}</span></p>)}
        </div>

        <aside>EDUCATION</aside>
        <div>{education.map(item => <article className="resume-entry" key={item.title}><span>{item.period}</span><h2>{item.title}</h2><p>{item.organization}</p><p>{item.summary}</p></article>)}</div>

        <aside>FULL RECORD</aside>
        <div className="resume-entry resume-record"><h2>Need the complete chronology?</h2><p>The full timeline preserves creator work, campus/community programs, internships, education, research, and current roles without forcing every chapter into a hiring document.</p><div className="resume-record-links"><Link href="/timeline">Open full timeline ↗</Link><Link href="/content">Creator chapter ↗</Link><Link href="/work">All selected work ↗</Link></div></div>
      </section>
    </main>
  );
}
