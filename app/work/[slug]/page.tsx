import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main id="main" className="inner-page case-study">
      <header className="site-shell subnav"><Link href="/work">← Work index</Link><span>{project.category.toUpperCase()} / {project.year}</span></header>
      <section className="site-shell case-hero">
        <p className="eyebrow">CASE STUDY / {project.status === "public" ? "PUBLIC BUILD" : "DOCUMENTED WORK"}</p>
        <h1>{project.name}</h1><p className="case-strapline">{project.strapline}</p>
        {project.github && <a className="button primary" href={project.github} target="_blank" rel="noreferrer">Open repository ↗</a>}
      </section>
      <section className="site-shell case-layout">
        <aside><span>PROJECT NOTE</span><p>This page is intentionally evidence-first. Claims are being linked to public code, artifacts, screenshots, benchmarks, credentials, or first-party project records as the portfolio matures.</p></aside>
        <article className="case-body">
          <section><p className="eyebrow">01 / CONTEXT</p><h2>The problem</h2><p>{project.problem}</p></section>
          <section><p className="eyebrow">02 / CONTRIBUTION</p><h2>What I worked on</h2><ul>{project.work.map((item)=><li key={item}>{item}</li>)}</ul></section>
          <section><p className="eyebrow">03 / EVIDENCE</p><h2>What supports the story</h2><ul>{project.evidence.map((item)=><li key={item}>{item}</li>)}</ul></section>
          <section><p className="eyebrow">04 / STACK</p><h2>Tools used</h2><div className="tag-list large">{project.stack.map((tag)=><span key={tag}>{tag}</span>)}</div></section>
        </article>
      </section>
      <section className="site-shell next-case"><Link href="/work">Explore another project →</Link></section>
    </main>
  );
}
