import Image from "next/image";
import Link from "next/link";
import { disciplines, now, proofPoints, site, timeline } from "@/lib/profile";
import { projects } from "@/lib/projects";

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Header() {
  return (
    <header className="site-shell header">
      <Link className="brand" href="/" aria-label="Chandan Pandey home">
        Chandan Pandey<span>.</span>
      </Link>
      <nav aria-label="Primary navigation">
        <Link href="/work">Work</Link>
        <Link href="/about">About</Link>
        <Link href="/now">Now</Link>
        <Link href="/resume">Resume</Link>
      </nav>
      <a className="header-link" href={site.links.github} target="_blank" rel="noreferrer">
        GitHub <Arrow />
      </a>
    </header>
  );
}

export default function Home() {
  return (
    <main id="main">
      <Header />

      <section className="site-shell hero">
        <div className="hero-signal">
          <span className="signal-dot" />
          <span>AI engineer · applied research · open source · technical storytelling</span>
        </div>

        <div className="hero-grid">
          <div className="hero-copy">
            <p className="eyebrow">CHANDAN PANDEY / DIGITAL IDENTITY</p>
            <h1>
              I build AI systems,
              <br /> then <em>make them useful.</em>
            </h1>
            <p className="hero-deck">
              I work across AI engineering, computational research, developer tooling,
              automation, and technical content. This site is the evidence layer behind the title.
            </p>
            <div className="hero-actions">
              <Link className="button primary" href="/work">Explore the work <span>↓</span></Link>
              <a className="button secondary" href={site.links.linkedin} target="_blank" rel="noreferrer">
                Connect on LinkedIn <Arrow />
              </a>
            </div>
          </div>

          <aside className="portrait-card" aria-label="Chandan Pandey identity card">
            <div className="portrait-frame">
              <Image
                src="https://avatars.githubusercontent.com/u/126047460?v=4"
                alt="Chandan Pandey"
                fill
                priority
                sizes="(max-width: 900px) 75vw, 340px"
                className="portrait"
              />
              <span className="portrait-tag">PRIMARY IDENTITY / 01</span>
            </div>
            <div className="portrait-meta">
              <div><strong>@{site.handle}</strong><span>{site.location}</span></div>
              <span>AI / BUILD / RESEARCH</span>
            </div>
          </aside>
        </div>

        <div className="ticker" aria-label="Current focus">
          <span className="ticker-label">NOW</span>
          {now.map((item, index) => (
            <span className="ticker-item" key={item}><b>{String(index + 1).padStart(2, "0")}</b>{item}</span>
          ))}
        </div>
      </section>

      <section className="site-shell section operating-system">
        <div className="section-intro">
          <p className="eyebrow">01 / OPERATING SYSTEM</p>
          <h2>Three modes. One body of work.</h2>
        </div>
        <div className="discipline-grid">
          {disciplines.map((discipline, index) => (
            <article key={discipline.title} className="discipline">
              <span>0{index + 1}</span>
              <h3>{discipline.title}</h3>
              <p>{discipline.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="site-shell section selected-work">
        <div className="section-intro split">
          <div><p className="eyebrow">02 / SELECTED WORK</p><h2>Projects with a reason to exist.</h2></div>
          <p>
            Each project is being turned into a technical case study: problem, architecture,
            decisions, evidence, trade-offs, and what changed because the work existed.
          </p>
        </div>
        <div className="project-list">
          {projects.map((project, index) => (
            <Link className="project-row" href={`/work/${project.slug}`} key={project.slug}>
              <span className="project-number">0{index + 1}</span>
              <div className="project-title"><span>{project.category}</span><h3>{project.name}</h3></div>
              <p>{project.strapline}</p>
              <span className="project-year">{project.year}</span>
              <span className="project-arrow">↗</span>
            </Link>
          ))}
        </div>
        <Link className="text-link" href="/work">View the complete work index <Arrow /></Link>
      </section>

      <section className="story-band">
        <div className="site-shell story-grid">
          <div className="story-copy">
            <p className="eyebrow light">03 / THE THREAD</p>
            <h2>Researcher. Builder. Educator. Still one story.</h2>
            <p>
              The point of this portfolio is not to hide the different chapters. It is to show the
              connecting pattern: learn deeply, build something, explain it, then do it again at a higher level.
            </p>
            <Link className="button inverse" href="/about">Read the full story <Arrow /></Link>
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

      <section className="site-shell section proof-section">
        <div className="section-intro split">
          <div><p className="eyebrow">04 / PROOF, NOT DECORATION</p><h2>The portfolio is an evidence graph.</h2></div>
          <p>
            Every substantial claim should eventually resolve to a repository, credential,
            case study, artifact, public post, certificate, or first-party project record.
          </p>
        </div>
        <ul className="proof-grid">
          {proofPoints.map((point) => <li key={point}>{point}</li>)}
        </ul>
      </section>

      <section className="site-shell closing">
        <p className="eyebrow">05 / OPEN LOOP</p>
        <h2>Building the canonical version of Chandan Pandey on the web.</h2>
        <div>
          <p>
            For engineering, AI research, product experiments, technical content,
            collaborations, or conversations about difficult problems.
          </p>
          <a className="button primary" href={site.links.linkedin} target="_blank" rel="noreferrer">Start a conversation <Arrow /></a>
        </div>
      </section>

      <footer className="site-shell footer">
        <div><strong>Chandan Pandey</strong><span>AI Engineer · Researcher · Builder</span></div>
        <div><a href={site.links.github}>GitHub ↗</a><a href={site.links.linkedin}>LinkedIn ↗</a></div>
        <span>Structured for humans, search engines, and AI systems.</span>
      </footer>
    </main>
  );
}
