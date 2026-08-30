import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected AI engineering, research, accessibility, automation, and developer-tooling projects by Chandan Pandey.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <main id="main" className="inner-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>WORK INDEX / {projects.length.toString().padStart(2,"0")}</span></header>
      <section className="site-shell page-hero">
        <p className="eyebrow">WORK / CASE STUDIES</p>
        <h1>What I built,<br/><em>why it mattered.</em></h1>
        <p>Not every experiment belongs on a resume. The work index is broader: flagship systems, research platforms, useful automations, and selected experiments worth understanding.</p>
      </section>
      <section className="site-shell work-grid">
        {projects.map((project, index) => (
          <Link href={`/work/${project.slug}`} className="work-card" key={project.slug}>
            <div><span>0{index+1}</span><span>{project.year}</span></div>
            <p>{project.category}</p><h2>{project.name}</h2><p>{project.summary}</p>
            <div className="tag-list">{project.stack.slice(0,5).map((tag)=><span key={tag}>{tag}</span>)}</div>
            <strong>Read case study ↗</strong>
          </Link>
        ))}
      </section>
    </main>
  );
}
