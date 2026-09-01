import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="inner-page">
      <header className="site-shell subnav">
        <Link href="/">← Chandan Pandey</Link>
        <span>404 / CONTEXT MISS</span>
      </header>

      <section className="site-shell page-hero">
        <p className="eyebrow">SIGNAL NOT RESOLVED</p>
        <h1>Context<br/><em>not found.</em></h1>
        <p>The route you followed is not part of the current identity graph. The useful paths are still intact: inspect the work, search the evidence, or return home.</p>
        <div className="hero-actions">
          <Link className="button primary" href="/work">Inspect the work →</Link>
          <Link className="button secondary" href="/ask">Ask the evidence →</Link>
          <Link className="button secondary" href="/">Return home</Link>
        </div>
      </section>
    </main>
  );
}
