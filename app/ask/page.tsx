import type { Metadata } from "next";
import Link from "next/link";
import { parseIntent } from "@/lib/verticals";
import AskChandan from "@/components/AskChandan";

export const metadata: Metadata = {
  title: "Ask Chandan",
  description: "Evidence-backed navigation across Chandan Pandey's public projects, research, experience, and technical work.",
  alternates: { canonical: "/ask" },
};

export default async function AskPage({ searchParams }: { searchParams: Promise<{ intent?: string | string[] }> }) {
  const intent = parseIntent((await searchParams).intent);
  return (
    <main id="main" className="inner-page ask-page">
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>ASK / EVIDENCE NAVIGATOR</span></header>
      <section className="site-shell page-hero ask-hero">
        <p className="eyebrow">ASK CHANDAN / V0.1</p>
        <h1>Query the work,<br/><em>not a persona.</em></h1>
        <p>This interface is intentionally conservative: it searches a curated evidence graph and shows where each answer comes from. The goal is not to sound impressive. The goal is to make the portfolio interrogable.</p>
      </section>
      <section className="site-shell ask-shell"><AskChandan key={intent} intent={intent} /></section>
      <section className="site-shell ask-next">
        <div><span>MACHINE-READABLE PROFILE</span><strong>The same identity layer is machine-readable.</strong></div>
        <div><a href="/profile.json">profile.json ↗</a><a href="/llms.txt">llms.txt ↗</a></div>
      </section>
    </main>
  );
}
