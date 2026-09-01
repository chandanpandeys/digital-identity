import type { Metadata } from "next";
import Link from "next/link";
import { experienceKinds, experiences } from "@/lib/experience";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Career, research, education, community, and creator timeline for Chandan Pandey.",
  alternates: { canonical: "/timeline" },
};

export default function TimelinePage() {
  return (
    <main id="main" className="inner-page timeline-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>TIMELINE / FULL ARC</span></header>
      <section className="site-shell page-hero timeline-hero">
        <p className="eyebrow">TIMELINE / 2020 → NOW</p>
        <h1>Not a straight line.<br/><em>A useful one.</em></h1>
        <p>The complete arc across creator work, education, community programs, internships, applied research, product building, and AI content.</p>
      </section>

      <section className="site-shell timeline-index" aria-label="Experience categories">
        {Object.entries(experienceKinds).map(([key, label]) => <span key={key}>{key.toUpperCase()} / {label}</span>)}
      </section>

      <section className="site-shell career-ledger">
        {experiences.map((item, index) => (
          <article className="career-entry" key={`${item.period}-${item.title}-${item.organization}`}>
            <div className="career-index"><span>{String(index + 1).padStart(2, "0")}</span><i>{experienceKinds[item.kind]}</i></div>
            <div className="career-period">{item.period}</div>
            <div className="career-copy">
              <p>{item.organization}{item.location ? ` · ${item.location}` : ""}</p>
              <h2>{item.title}</h2>
              <strong>{item.summary}</strong>
              {item.details.length > 0 && <ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul>}
            </div>
          </article>
        ))}
      </section>

      <section className="site-shell timeline-note">
        <p className="eyebrow">SOURCE POLICY</p>
        <p>This timeline is intentionally conservative. Dates and descriptions are distilled from first-party career records and public profiles; disputed or weakly evidenced metrics are not promoted into headline claims.</p>
        <Link className="button secondary" href="/resume">Open curated resume ↗</Link>
      </section>
    </main>
  );
}
