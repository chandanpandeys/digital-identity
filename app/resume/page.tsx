import type { Metadata } from "next";
import Link from "next/link";
import { DownloadSimple, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { isResumeVariant, resumeData, resumeVariants } from "@/lib/resume-data";
import { site } from "@/lib/profile";
import { credentials } from "@/lib/credentials";
import { StudioFooter } from "@/components/Studio";
export const metadata: Metadata = {
  title: "Experience & resumes",
  description:
    "Read Chandan Pandey’s experience by role: AI engineering, applied research or AI content and developer education.",
  alternates: { canonical: "/resume" },
};
export default async function Resume({
  searchParams,
}: {
  searchParams: Promise<{ view?: string }>;
}) {
  const view = (await searchParams).view ?? "ai-llm-engineer";
  const variant = isResumeVariant(view) ? view : "ai-llm-engineer",
    data = resumeData[variant];
  const labels = {
    "ai-llm-engineer": "AI Engineering",
    "ai-research-ml": "Research & ML",
    "ai-content-developer-educator": "Content & Education",
  };
  return (
    <main id="main">
      <section className="studio-shell resume-heading">
        <p className="micro">EXPERIENCE, IN FOCUS</p>
        <h1>
          One career.
          <br />
          <em>The relevant view.</em>
        </h1>
        <div className="resume-tabs" aria-label="Resume focus">
          {resumeVariants.map((v) => (
            <Link
              key={v}
              href={"/resume?view=" + v}
              aria-current={variant === v ? "page" : undefined}
            >
              {labels[v]}
            </Link>
          ))}
        </div>
      </section>
      <section className="studio-shell resume-layout">
        <article className="web-resume">
          <header>
            <span className="micro">CHANDAN PANDEY</span>
            <h2>{data.headline}</h2>
            <p>{data.summary}</p>
            <div className="resume-contact">
              <a href={"mailto:" + site.contact.email}>{site.contact.email}</a>
              <a href={site.links.linkedin}>
                LinkedIn <ArrowUpRight size={14} />
              </a>
              <a href={site.links.github}>
                GitHub <ArrowUpRight size={14} />
              </a>
            </div>
          </header>
          {(
            [
              ["Experience", data.experience],
              ["Selected work", data.work],
            ] as const
          ).map(([title, items]) => (
            <section key={title}>
              <h3>{title}</h3>
              {items.map((e, i) => (
                <div className="resume-entry" key={i}>
                  <h4>{e.title}</h4>
                  <p className="entry-org">
                    {e.organization} {e.meta && " · " + e.meta}
                  </p>
                  <ul>
                    {e.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                  {e.evidence && (
                    <span className="source-note">{e.evidence}</span>
                  )}
                  {e.url && (
                    <a
                      className="text-link"
                      href={
                        e.url.startsWith("http") ? e.url : "https://" + e.url
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Open the source <ArrowUpRight size={15} />
                    </a>
                  )}
                </div>
              ))}
            </section>
          ))}
          <section>
            <h3>Skills</h3>
            <dl className="resume-skills">
              {data.skills.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <h3>Education & learning</h3>
            <p>{data.educationNote}</p>
            {credentials.map((c) => (
              <a
                className="text-link"
                href={c.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={c.slug}
              >
                {c.issuer}: {c.title}
                <ArrowUpRight size={15} />
              </a>
            ))}
          </section>
        </article>
        <aside className="resume-sidebar">
          <p className="micro">TAKE IT WITH YOU</p>
          <h3>{labels[variant]}</h3>
          <p>
            A readable PDF with the same experience, project links and source
            qualifications.
          </p>
          <a className="studio-button primary" href={"/resume/pdf/" + variant}>
            <DownloadSimple size={18} /> Download PDF
          </a>
          <a
            className="text-link"
            href={"/resume/pdf/" + variant + "?preview=1"}
            target="_blank"
            rel="noopener noreferrer"
          >
            Preview PDF <ArrowUpRight size={18} />
          </a>
          <Link
            className="text-link"
            href={
              "/ask?intent=" +
              (variant === "ai-content-developer-educator" ? "content" : "ai")
            }
          >
            Ask about my experience <ArrowUpRight size={18} />
          </Link>
        </aside>
      </section>
      <StudioFooter />
    </main>
  );
}
