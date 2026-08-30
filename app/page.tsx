import Link from "next/link";
import { ContextMap } from "@/components/ContextMap";
import { disciplines, now, proofSignals, site, timeline } from "@/lib/profile";
import { projects } from "@/lib/projects";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Header() {
  return (
    <header className="site-shell header">
      <Link className="brand" href="/" aria-label="Chandan Pandey home">
        CP<span>/</span>ID
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/work">Work</Link>
        <Link href="/timeline">Timeline</Link>
        <Link href="/about">About</Link>
        <Link href="/now">Now</Link>
      </nav>
      <a className="header-link" href={site.links.github} target="_blank" rel="noreferrer">
        GitHub <Arrow />
      </a>
    </header>
  );
}

function FlagshipEvidence() {
  return (
    <div className="lead-project-system flagship-evidence" aria-label="ByteToken JSON benchmark snapshot">
      <div className="flagship-evidence-head"><span>MEASURED / JSON API</span><small>o200k_base</small></div>
      <div className="flagship-bars">
        <div><span>BASE64</span><b>18,574</b><i><em style={{ width: "100%" }} /></i></div>
        <div><span>BT-15</span><b>11,919</b><i><em className="blue" style={{ width: "64.2%" }} /></i></div>
        <div><span>LZMA + BT</span><b>728</b><i><em className="signal" style={{ width: "5%" }} /></i></div>
      </div>
      <div className="flagship-evidence-note"><strong>35.8%</strong><span>raw encoding reduction vs Base64</span></div>
      <div className="compression-mark">RAW ≠<br />COMPRESSED</div>
      <span className="lead-arrow">↗</span>
    </div>
  );
}

export default function Home() {
  const [leadProject, ...supportingProjects] = projects;

  return (
    <main id="main">
      <Header />

      <section className="site-shell hero" aria-labelledby="hero-title">
        <div className="hero-signal">
          <span className="signal-dot" />
          <span>Chandan Pandey / AI engineer / India</span>
          <span className="hero-signal-right">Identity graph v0.2</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">AI ENGINEERING · APPLIED RESEARCH · OPEN SOURCE</p>
            <h1 id="hero-title">
              I turn AI research into
              <em> systems that ship.</em>
            </h1>
            <p className="hero-deck">
              I am Chandan Pandey—an AI engineer and builder working across LLM infrastructure,
              computational biology, automation, accessibility, and technical storytelling.
              This site is the evidence layer behind that sentence.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/work">Inspect the work <span>↓</span></Link>
              <a className="button secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <Arrow />
              </a>
            </div>
          </div>

          <ContextMap />
        </div>

        <div className="signal-rail" aria-label="Current focus">
          <span className="signal-rail-label">NOW</span>
          {now.map((item, index) => (
            <span className="signal-rail-item" key={item}>
              <b>{String(index + 1).padStart(2, "0")}</b>{item}
            </span>
          ))}
        </div>
      </section>

      <section className="site-shell section work-section" id="work">
        <div className="section-intro split">
          <div>
            <p className="eyebrow">01 / SELECTED WORK</p>
            <h2>Proof before polish.</h2>
          </div>
          <p>
            The projects are documented as systems: problem, architecture, decisions, evidence,
            trade-offs, and what is public enough to inspect.
          </p>
        </div>

        {leadProject && (
          <Link className="lead-project" href={`/work/${leadProject.slug}`}>
            <div className="lead-project-index">
              <span>FLAGSHIP / 01</span>
              <span>{leadProject.year}</span>
            </div>
            <div className="lead-project-copy">
              <p>{leadProject.category}</p>
              <h3>{leadProject.name}</h3>
              <strong>{leadProject.strapline}</strong>
              <span>{leadProject.summary}</span>
            </div>
            {leadProject.slug === "bytetoken" ? <FlagshipEvidence /> : <div className="lead-project-system"><span className="lead-arrow">↗</span></div>}
          </Link>
        )}

        <div className="project-list compact-projects">
          {supportingProjects.map((project, index) => (
            <Link className="project-row" href={`/work/${project.slug}`} key={project.slug}>
              <span className="project-number">0{index + 2}</span>
              <div className="project-title"><span>{project.category}</span><h3>{project.name}</h3></div>
              <p>{project.strapline}</p>
              <span className="project-year">{project.year}</span>
              <span className="project-arrow">↗</span>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/work">Open the complete work index <Arrow /></Link>
      </section>

      <section className="operating-band">
        <div className="site-shell section operating-system">
          <div className="section-intro inverse-intro">
            <p className="eyebrow light">02 / OPERATING SYSTEM</p>
            <h2>Build. Research. Explain.</h2>
            <p>Different outputs. The same loop: understand deeply, make the system real, then make the reasoning legible.</p>
          </div>
          <div className="discipline-grid">
            {disciplines.map((discipline, index) => (
              <article key={discipline.title} className="discipline">
                <span>MODE / 0{index + 1}</span>
                <h3>{discipline.title}</h3>
                <p>{discipline.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="site-shell section proof-section">
        <div className="section-intro split">
          <div><p className="eyebrow">03 / EVIDENCE GRAPH</p><h2>A claim should resolve somewhere.</h2></div>
          <p>
            Evidence has different strengths. Public repositories are inspectable; professional profiles are public records;
            first-party material is useful context. The site labels the difference instead of flattening everything into “verified.”
          </p>
        </div>
        <ol className="proof-ledger">
          {proofSignals.map((signal, index) => (
            <li key={signal.label}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><p>{signal.label}</p><small>{signal.detail}</small></div>
              <a href={signal.href} target="_blank" rel="noreferrer">{signal.strength} / {signal.source} <Arrow /></a>
            </li>
          ))}
        </ol>
      </section>

      <section className="story-band" id="story">
        <div className="site-shell story-grid">
          <div className="story-copy">
            <p className="eyebrow light">04 / THE THREAD</p>
            <h2>The work changed. The pattern did not.</h2>
            <p>
              Education content, student communities, applied ML, cancer-vaccine research,
              AI systems, open source, and product experiments are not separate identities.
              They are iterations of the same habit: learn, build, explain, repeat.
            </p>
            <div className="story-actions">
              <Link className="button inverse" href="/timeline">Inspect the timeline <Arrow /></Link>
              <Link className="button inverse muted-button" href="/content">Creator chapter <Arrow /></Link>
            </div>
          </div>
          <ol className="timeline">
            {timeline.map((item) => (
              <li key={`${item.period}-${item.title}`}>
                <span>{item.period}</span>
                <div><h3>{item.title}</h3><p>{item.description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="site-shell closing">
        <p className="eyebrow">05 / OPEN LOOP</p>
        <h2>Useful AI is the standard.</h2>
        <div>
          <p>
            I care about systems that survive beyond the demo: useful interfaces,
            inspectable reasoning, strong evaluation, and software people can actually use.
          </p>
          <a className="button primary" href={site.links.linkedin} target="_blank" rel="noreferrer">Start a conversation <Arrow /></a>
        </div>
      </section>

      <footer className="site-shell footer">
        <div><strong>Chandan Pandey</strong><span>AI Engineer · Researcher · Builder</span></div>
        <div><Link href="/resume">Resume</Link><Link href="/content">Content</Link><a href={site.links.github}>GitHub ↗</a></div>
        <span>Structured for humans, search engines, and AI systems.</span>
      </footer>
    </main>
  );
}
