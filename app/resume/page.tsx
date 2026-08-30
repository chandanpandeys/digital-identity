import type { Metadata } from "next";
import Link from "next/link";
import { experiences } from "@/lib/experience";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Resume",
  description: "Curated AI engineering, applied research, and builder resume for Chandan Pandey.",
  alternates: { canonical: "/resume" },
};

const selectedOrganizations = new Set(["YAAS", "Amity University", "Notansun", "Google", "IBM SkillsBuild", "TechVidya Career"]);
const selectedExperience = experiences.filter(item => selectedOrganizations.has(item.organization));
const education = experiences.filter(item => item.kind === "education" && item.title.includes("Bachelor"));

export default function ResumePage() {
  return (
    <main id="main" className="inner-page resume-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>RESUME / WEB VERSION</span></header>
      <section className="site-shell page-hero">
        <p className="eyebrow">CURATED RESUME / SOURCE-OF-TRUTH VIEW</p>
        <h1>AI engineering,<br/><em>research & building.</em></h1>
        <p>A compact professional view for recruiters and collaborators. The website keeps the full history; future role-specific PDF resumes will be generated from this same underlying record.</p>
      </section>

      <section className="site-shell resume-grid">
        <aside>POSITIONING</aside>
        <div className="resume-positioning">
          <p>AI engineer and builder with hands-on work across machine learning, LLM systems, computational research, developer tooling, automation, accessibility, and technical content.</p>
          <div className="tag-list large"><span>AI Engineering</span><span>Applied ML</span><span>LLM Systems</span><span>Research</span><span>Developer Tools</span><span>Technical Content</span></div>
        </div>

        <aside>EXPERIENCE</aside>
        <div>{selectedExperience.map(item => <article className="resume-entry" key={`${item.organization}-${item.title}`}><span>{item.period}</span><h2>{item.title} · {item.organization}</h2><p>{item.summary}</p>{item.details.slice(0,2).map(detail => <p className="resume-detail" key={detail}>— {detail}</p>)}</article>)}</div>

        <aside>SELECTED PROJECTS</aside>
        <div>{projects.slice(0,4).map(project => <article className="resume-entry" key={project.slug}><span>{project.year} · {project.category}</span><h2>{project.name}</h2><p>{project.strapline}</p><Link href={`/work/${project.slug}`}>Inspect case study ↗</Link></article>)}</div>

        <aside>CORE SKILLS</aside>
        <div className="skill-groups">
          <p><strong>AI / ML</strong> Python, scikit-learn, machine learning, deep learning, NLP, sequence modelling, evaluation, embeddings.</p>
          <p><strong>LLM systems</strong> AI agents, RAG, LangGraph, MCP, model APIs, context engineering, automation workflows.</p>
          <p><strong>Engineering</strong> Next.js, TypeScript, FastAPI, Flask, APIs, Docker, Git/GitHub, CI/CD, developer tooling.</p>
          <p><strong>Research</strong> computational biology workflows, literature review, experiment design, model benchmarking, scientific and technical documentation.</p>
          <p><strong>Communication</strong> AI content strategy, technical storytelling, teaching, workshops, SEO/AEO/GEO research.</p>
        </div>

        <aside>EDUCATION</aside>
        <div>{education.map(item => <article className="resume-entry" key={item.title}><span>{item.period}</span><h2>{item.title}</h2><p>{item.organization}</p><p>{item.summary}</p></article>)}</div>

        <aside>FULL RECORD</aside>
        <div className="resume-entry"><h2>Need the complete chronology?</h2><p>The timeline preserves creator work, community programs, internships, education, research, and current roles without forcing all of them into a one-page resume.</p><Link href="/timeline">Open full timeline ↗</Link></div>
      </section>
    </main>
  );
}
