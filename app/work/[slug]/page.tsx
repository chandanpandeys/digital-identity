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

function EvidenceBadge({ isPublic }: { isPublic: boolean }) {
  return (
    <span className={`case-evidence-badge ${isPublic ? "public" : "documented"}`}>
      <i />{isPublic ? "PUBLIC / INSPECTABLE" : "DOCUMENTED / FIRST-PARTY"}
    </span>
  );
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const nextIndex = (projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length;
  const nextProject = projects[nextIndex];

  return (
    <main id="main" className="inner-page case-study">
      <header className="site-shell subnav">
        <Link href="/work">← Work index</Link>
        <span>{project.category.toUpperCase()} / {project.year}</span>
      </header>

      <section className="site-shell case-hero case-hero-v2">
        <div className="case-hero-meta">
          <p className="eyebrow">CASE STUDY / {project.tier.toUpperCase()}</p>
          <EvidenceBadge isPublic={project.status === "public"} />
        </div>
        <h1>{project.name}</h1>
        <p className="case-strapline">{project.strapline}</p>
        <p className="case-summary">{project.summary}</p>
        <div className="case-actions">
          {project.github && <a className="button primary" href={project.github} target="_blank" rel="noreferrer">Inspect source ↗</a>}
          <a className="button secondary" href="#architecture">System view ↓</a>
        </div>
      </section>

      <section className="site-shell case-layout case-layout-v2">
        <aside className="case-aside">
          <div><span>PROJECT TYPE</span><p>{project.category}</p></div>
          <div><span>EVIDENCE LEVEL</span><p>{project.status === "public" ? "Public code + first-party documentation" : "First-party project documentation"}</p></div>
          <div><span>POSITION IN PORTFOLIO</span><p>{project.tier === "flagship" ? "Flagship technical story" : "Selected supporting work"}</p></div>
        </aside>

        <article className="case-body case-body-v2">
          <section>
            <p className="eyebrow">01 / CONTEXT</p>
            <h2>The problem</h2>
            <p className="case-lede">{project.problem}</p>
          </section>

          <section>
            <p className="eyebrow">02 / CONTRIBUTION</p>
            <h2>What I worked on</h2>
            <ol className="contribution-list">
              {project.work.map((item, index) => (
                <li key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></li>
              ))}
            </ol>
          </section>

          {project.architecture && (
            <section id="architecture" className="architecture-section">
              <div className="architecture-heading">
                <div><p className="eyebrow">03 / SYSTEM VIEW</p><h2>How the pieces connect</h2></div>
                <p>Architecture is shown as a reasoning aid, not decorative infrastructure wallpaper.</p>
              </div>
              <div className="architecture-flow">
                {project.architecture.map((stage, index) => (
                  <div className="architecture-stage" key={stage.step}>
                    <span>{stage.step}</span>
                    <h3>{stage.title}</h3>
                    <p>{stage.detail}</p>
                    {index < project.architecture!.length - 1 && <i aria-hidden="true">→</i>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {project.metrics && (
            <section className="metric-section">
              <div className="architecture-heading">
                <div><p className="eyebrow">04 / MEASUREMENTS</p><h2>What is actually measured</h2></div>
                <p>Numbers retain their baseline and qualification so compressed, inferred, and illustrative results do not blur together.</p>
              </div>
              <div className="metric-grid">
                {project.metrics.map((metric) => (
                  <article key={metric.label} className="metric-card">
                    <span>{metric.label}</span>
                    {metric.baseline && <small>{metric.baseline}</small>}
                    <strong>{metric.result}</strong>
                    {metric.note && <p>{metric.note}</p>}
                  </article>
                ))}
              </div>
              {project.sourceNote && <p className="source-note"><strong>READING NOTE</strong>{project.sourceNote}</p>}
            </section>
          )}

          <section>
            <p className="eyebrow">05 / EVIDENCE</p>
            <h2>What supports the story</h2>
            <ul className="evidence-list">{project.evidence.map((item)=><li key={item}>{item}</li>)}</ul>
          </section>

          <section>
            <p className="eyebrow">06 / STACK</p>
            <h2>Tools used</h2>
            <div className="tag-list large">{project.stack.map((tag)=><span key={tag}>{tag}</span>)}</div>
          </section>
        </article>
      </section>

      <section className="site-shell next-case next-case-v2">
        <div><span>NEXT CASE</span><strong>{nextProject.name}</strong></div>
        <Link href={`/work/${nextProject.slug}`}>Continue →</Link>
      </section>
    </main>
  );
}
