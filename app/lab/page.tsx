import type { Metadata } from "next";
import Link from "next/link";
import { labItems } from "@/lib/lab";

export const metadata: Metadata = {
  title: "Lab",
  description: "Supporting experiments, automations, early builds, and public repositories by Chandan Pandey.",
  alternates: { canonical: "/lab" },
};

const labels = {
  supporting: "SUPPORTING BUILD",
  experiment: "EXPERIMENT",
  archive: "ARCHIVE",
} as const;

export default function LabPage() {
  return (
    <main id="main" className="inner-page lab-page">
      <header className="site-shell subnav">
        <Link href="/">← Chandan Pandey</Link>
        <span>LAB / {labItems.length.toString().padStart(2, "0")}</span>
      </header>

      <section className="site-shell page-hero">
        <p className="eyebrow">LAB / EXPERIMENTS + SUPPORTING WORK</p>
        <h1>Not everything should be<br/><em>a flagship.</em></h1>
        <p>
          This is where useful experiments, earlier builds, automations, and public code live without
          competing with the strongest case studies. The archive is part of the story; it just has a different job.
        </p>
      </section>

      <section className="site-shell lab-ledger" aria-label="Public lab projects">
        {labItems.map((item, index) => (
          <article className="lab-item" key={item.name}>
            <div className="lab-index">
              <span>{String(index + 1).padStart(2, "0")}</span>
              <span>{item.year}</span>
            </div>
            <div className="lab-copy">
              <p className="eyebrow">{labels[item.status]} · {item.category.toUpperCase()}</p>
              <h2>{item.name}</h2>
              <p>{item.summary}</p>
              <div className="lab-signal"><span>WHY IT STAYS</span><p>{item.signal}</p></div>
            </div>
            <a className="lab-link" href={item.github} target="_blank" rel="noreferrer" aria-label={`Open ${item.name} on GitHub`}>
              GitHub ↗
            </a>
          </article>
        ))}
      </section>

      <section className="site-shell prose-grid lab-policy">
        <aside>CURATION POLICY</aside>
        <div className="prose">
          <p>
            Work moves from Lab to the main Work index when the technical story is deep enough, the evidence is inspectable,
            and the project still represents the kind of engineering I want to be hired to do next.
          </p>
        </div>
      </section>
    </main>
  );
}
