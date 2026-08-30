import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { proofSignals, site, timeline } from "@/lib/profile";

export const metadata: Metadata = {
  title: "About",
  description: "The story behind Chandan Pandey: AI engineering, applied research, education, content, and building in public.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <main id="main" className="inner-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>ABOUT / STORY</span></header>
      <section className="site-shell about-hero">
        <div><p className="eyebrow">ABOUT / THE LONG VERSION</p><h1>I learned by<br/><em>building in public.</em></h1></div>
        <div className="about-portrait"><Image src="https://avatars.githubusercontent.com/u/126047460?v=4" alt="Chandan Pandey" fill sizes="320px" /></div>
      </section>
      <section className="site-shell prose-grid">
        <aside>THE SHORT VERSION</aside>
        <div className="prose">
          <p>I am an AI engineer and builder whose work has moved through education, machine learning, applied research, developer tooling, automation, and technical content.</p>
          <p>My background is unconventional: a BCA, a tier-3 college, and a lot of learning done by making things work before I felt qualified to make them. That pattern—build, break, study, rebuild—became the operating system.</p>
          <p>The point of this site is to preserve the whole arc without turning it into noise. A recruiter should find the relevant engineering evidence quickly. A researcher should be able to inspect technical depth. A student should be able to see where the journey actually started.</p>
        </div>
      </section>
      <section className="site-shell about-timeline"><p className="eyebrow">SELECTED TIMELINE</p>{timeline.map((item)=><article key={item.title}><span>{item.period}</span><div><h2>{item.title}</h2><p>{item.description}</p></div></article>)}</section>
      <section className="site-shell about-proof">
        <p className="eyebrow">PUBLIC EVIDENCE NODES</p>
        <ul>{proofSignals.map((signal)=><li key={signal.label}><a href={signal.href} target="_blank" rel="noreferrer"><strong>{signal.label}</strong><span>{signal.strength} · {signal.source} ↗</span></a></li>)}</ul>
        <div className="about-actions"><Link className="button secondary" href="/timeline">Full timeline ↗</Link><a className="button secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">LinkedIn profile ↗</a></div>
      </section>
    </main>
  );
}
