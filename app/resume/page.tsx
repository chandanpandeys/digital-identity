import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { timeline } from "@/lib/profile";

export const metadata: Metadata = { title: "Resume", description: "Curated professional summary for Chandan Pandey.", alternates: { canonical: "/resume" } };

export default function ResumePage() {
  return <main id="main" className="inner-page resume-page"><header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>RESUME / WEB VERSION</span></header><section className="site-shell page-hero"><p className="eyebrow">CURATED RESUME</p><h1>AI engineering,<br/><em>research & building.</em></h1><p>This is the stable web resume. Role-specific one-page PDF variants will be generated from the same source-of-truth profile rather than maintained as separate histories.</p></section><section className="site-shell resume-grid"><aside>EXPERIENCE</aside><div>{timeline.slice(0,3).map(item=><article className="resume-entry" key={item.title}><span>{item.period}</span><h2>{item.title}</h2><p>{item.description}</p></article>)}</div><aside>SELECTED PROJECTS</aside><div>{projects.slice(0,3).map(project=><article className="resume-entry" key={project.slug}><span>{project.year}</span><h2>{project.name}</h2><p>{project.strapline}</p><Link href={`/work/${project.slug}`}>Evidence ↗</Link></article>)}</div><aside>CORE SKILLS</aside><div className="skill-groups"><p><strong>AI / ML</strong> Python, scikit-learn, deep learning, NLP, sequence modelling, evaluation, embeddings.</p><p><strong>LLM systems</strong> AI agents, RAG, LangGraph, MCP, OpenAI / Claude / Gemini APIs, context engineering.</p><p><strong>Engineering</strong> Next.js, FastAPI, Flask, APIs, Docker, Git/GitHub, automation, developer tooling.</p><p><strong>Research</strong> computational biology workflows, literature review, experimentation, model benchmarking, technical documentation.</p></div></section></main>;
}
