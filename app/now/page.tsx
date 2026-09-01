import type { Metadata } from "next";
import Link from "next/link";
import { currentFocus } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Now",
  description: "What Chandan Pandey is actively building, publishing, and working on now.",
  alternates: { canonical: "/now" },
};

export default function NowPage() {
  return (
    <main id="main" className="inner-page now-page-v2">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>NOW / 31 AUG 2026</span></header>

      <section className="site-shell page-hero now-hero-v2">
        <p className="eyebrow">NOW / CURRENT ATTENTION</p>
        <h1>What is getting<br/><em>the next hour?</em></h1>
        <p>A /now page should not be a second resume. This is the deliberately short list of work receiving active attention right now.</p>
      </section>

      <section className="site-shell now-focus-ledger">
        {currentFocus.map((focus) => (
          <article key={focus.code}>
            <div className="now-focus-meta"><span>{focus.code}</span><b>{focus.status}</b></div>
            <div className="now-focus-copy"><p>{focus.label}</p><h2>{focus.title}</h2><strong>{focus.signal}</strong><span>{focus.detail}</span></div>
            <div className="now-focus-links">{focus.links.map((link) => <Link href={link.href} key={link.href}>{link.label} ↗</Link>)}</div>
          </article>
        ))}
      </section>

      <section className="site-shell now-boundary">
        <div><p className="eyebrow">WHAT THIS PAGE IS / ISN'T</p><h2>A snapshot, not a backlog.</h2></div>
        <div>
          <p>Past roles and education belong in the <Link href="/timeline">timeline</Link>. Smaller experiments belong in the <Link href="/lab">Lab</Link>. Claims and public artifacts belong in the <Link href="/ask">evidence graph</Link>. This page only tracks current allocation of attention.</p>
          <small>Last updated: 31 August 2026</small>
        </div>
      </section>
    </main>
  );
}
