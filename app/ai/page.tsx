import Link from "next/link";
import { projects } from "@/lib/projects";
import { experiences } from "@/lib/experience";
import { resumeData } from "@/lib/resume-data";
import { verticalMetadata } from "@/lib/verticals";
import { VerticalActions } from "@/components/VerticalActions";

export const metadata = verticalMetadata("ai");
const selected = ["bytetoken", "inferbench", "epitopepred", "dekhosuno"].map(slug => projects.find(project => project.slug === slug)!);

export default function AIPage() {
  return <main id="main" className="inner-page vertical-page">
    <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>AI / BUILD & RESEARCH</span></header>
    <section className="site-shell page-hero">
      <p className="eyebrow">AI ENGINEERING & RESEARCH</p>
      <h1>Build the system.<br/><em>Make it inspectable.</em></h1>
      <p>I’m Chandan Pandey, an AI engineer building LLM infrastructure, evaluation systems and applied AI. My work connects research questions to software, measurements and decisions other people can examine.</p>
      <VerticalActions vertical="ai" />
    </section>
    <section className="site-shell section">
      <div className="section-intro"><p className="eyebrow">SELECTED ENGINEERING EVIDENCE</p><h2>From infrastructure to applied research.</h2></div>
      <div className="vertical-cards">{selected.map(project => <article key={project.slug}>
        <p className="eyebrow">{project.status === "public" ? "PUBLIC / INSPECTABLE" : "DOCUMENTED / FIRST-PARTY"}</p>
        <h3>{project.name}</h3><p>{project.summary}</p><p>{project.stack.join(" · ")}</p>
        <Link className="text-link" href={`/work/${project.slug}`}>Inspect architecture & evidence ↗</Link>
      </article>)}</div>
    </section>
    <section className="site-shell section">
      <div className="section-intro"><p className="eyebrow">RESEARCH & APPLIED ML EXPERIENCE</p><h2>The work behind the systems.</h2><p>Career summaries are first-party context. Public professional records and source qualifications remain available in the full timeline and credential ledger.</p></div>
      {experiences.filter(item => ["Amity University", "IBM SkillsBuild", "TechVidya Career"].includes(item.organization)).map(item => <article className="resume-entry" key={item.organization}><span>{item.period} · FIRST-PARTY CAREER CONTEXT</span><h3>{item.title} · {item.organization}</h3><p>{item.summary}</p></article>)}
      <Link className="text-link" href="/timeline">Career timeline ↗</Link>
    </section>
    <section className="site-shell section">
      <div className="section-intro"><p className="eyebrow">TECHNICAL WORKING SET</p><h2>Build, evaluate, explain.</h2></div>
      <div className="working-set">{resumeData["ai-llm-engineer"].skills.map(skill => <p key={skill.label}><strong>{skill.label}</strong><span>{skill.value}</span></p>)}</div>
      <VerticalActions vertical="ai" />
    </section>
  </main>;
}
