import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected AI infrastructure, evaluation, research, accessibility, and automation case studies by Chandan Pandey.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main" className="inner-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>WORK INDEX / {projects.length.toString().padStart(2,"0")}</span></header>
      <section className="site-shell page-hero">
        <p className="eyebrow">WORK / CASE STUDIES</p>
        <h1>What I built,<br/><em>why it mattered.</em></h1>
        <p>
          Work is deliberately curated. Flagships earn their place through technical depth and inspectable evidence;
          smaller experiments live in <Link className="inline-text-link" href="/lab">Lab ↗</Link> instead of competing for attention.
        </p>
      </section>
      <section className="site-shell work-grid">
        {projects.map((project, index) => (
          <Link href={`/work/${project.slug}`} className={`work-card ${project.tier === "flagship" ? "flagship-card" : ""}`} key={project.slug}>
            <div><span>{String(index+1).padStart(2,"0")}</span><span>{project.year}</span></div>
            <p>{project.tier === "flagship" ? "FLAGSHIP · " : "SELECTED · "}{project.category}</p>
            <h2>{project.name}</h2><p>{project.summary}</p>
            <div className="tag-list">{project.stack.slice(0,5).map((tag)=><span key={tag}>{tag}</span>)}</div>
            <strong>Read case study ↗</strong>
          </Link>
        ))}
      </section>
      <section className="site-shell work-to-lab">
        <div><p className="eyebrow">MORE / LAB</p><h2>Experiments belong somewhere useful.</h2></div>
        <div><p>Agent workflows, earlier generative-AI builds, internship code, and archived web projects remain public without weakening the main engineering signal.</p><Link className="button secondary" href="/lab">Open Lab →</Link></div>
      </section>
    </main>
  );
}
