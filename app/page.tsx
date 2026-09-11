import Link from "next/link";
import {
  ArrowUpRight,
  ArrowDown,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";
import StudioOrbit from "@/components/StudioOrbit";
import {
  SocialLinks,
  SectionHeading,
  ProjectGrid,
  ContactBand,
  StudioFooter,
} from "@/components/Studio";
export default function Home() {
  return (
    <main id="main" className="studio-home">
      <section className="studio-shell studio-hero">
        <div className="hero-main">
          <p className="micro">
            <span className="status-dot" /> CHANDAN PANDEY / INDIA
          </p>
          <h1>
            Curiosity,
            <br />
            built into
            <br />
            <em>something real.</em>
          </h1>
          <p className="hero-intro">
            I build AI systems, research difficult problems,
            <br className="desktop-break" /> and turn what I learn into stories
            worth sharing.
          </p>
          <div className="studio-actions">
            <Link className="studio-button primary" href="/ai">
              Explore AI work <ArrowUpRight size={19} />
            </Link>
            <Link className="studio-button" href="/content">
              Watch my content <ArrowUpRight size={19} />
            </Link>
          </div>
        </div>
        <StudioOrbit />
        <div className="hero-bottom">
          <span>ENGINEERING × RESEARCH × COMMUNICATION</span>
          <a href="#explore" aria-label="Scroll to explore">
            <ArrowDown size={20} />
          </a>
        </div>
      </section>
      <div className="studio-shell">
        <SocialLinks />
      </div>
      <section
        className="studio-shell studio-section route-section"
        id="explore"
      >
        <div className="studio-section-heading">
          <span className="micro">ONE PERSON. THREE WAYS IN.</span>
          <p>Follow the work that brought you here.</p>
        </div>
        <div className="route-grid">
          {[
            [
              "01",
              "AI Engineering & Research",
              "LLM systems, useful agents and applied research.",
              "/ai",
            ],
            [
              "02",
              "AI Content & Communication",
              "Technical understanding, made watchable and useful.",
              "/content",
            ],
            [
              "03",
              "The complete picture",
              "The person, the career and the thread connecting it all.",
              "/about",
            ],
          ].map(([n, t, d, h]) => (
            <Link href={h} key={h}>
              <span className="micro">{n}</span>
              <h2>{t}</h2>
              <p>{d}</p>
              <ArrowUpRight size={25} />
            </Link>
          ))}
        </div>
      </section>
      <section className="studio-shell studio-section">
        <SectionHeading
          number="01 / SELECTED WORK"
          title="Questions I turned into projects."
          note="From a smaller context window to a more useful career agent."
          href="/work"
          label="All project stories"
        />
        <ProjectGrid
          slugs={["bytetoken", "offerclaw", "benchwolf", "portable-ai-memory"]}
        />
      </section>
      <section className="studio-shell studio-statement">
        <p className="micro">THE SAME CURIOSITY. A DIFFERENT MEDIUM.</p>
        <h2>
          Build it deeply.
          <br />
          <span>Explain it clearly.</span>
        </h2>
        <div>
          <p>
            Engineering gives me something to say. Content makes it useful to
            someone else. Explore AI explainers, educational videos and the
            teaching that started it all.
          </p>
          <Link className="text-link" href="/content">
            Step inside the content studio <ArrowRight size={21} />
          </Link>
        </div>
      </section>
      <section className="studio-shell studio-ask-banner">
        <span className="micro">THE PORTFOLIO, IN CONVERSATION</span>
        <h2>Go beyond the scroll.</h2>
        <p>
          Ask about my projects, research contribution, teaching or fit for your
          team. Follow the sources behind the answer.
        </p>
        <Link className="studio-button primary" href="/ask">
          Ask Chandan <ArrowUpRight size={19} />
        </Link>
      </section>
      <ContactBand />
      <StudioFooter />
    </main>
  );
}
