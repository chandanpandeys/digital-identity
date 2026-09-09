import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { verticalMetadata } from "@/lib/verticals";
import {
  SectionHeading,
  ProjectGrid,
  SocialLinks,
  ContactBand,
  StudioFooter,
} from "@/components/Studio";
export const metadata = verticalMetadata("ai");
export default function AIPage() {
  return (
    <main id="main">
      <section className="studio-shell studio-page-hero">
        <p className="micro">
          <span className="status-dot" /> AI ENGINEERING & RESEARCH
        </p>
        <h1>
          From a difficult
          <br />
          question to a<br />
          <em>working system.</em>
        </h1>
        <div className="page-hero-bottom">
          <p>
            I’m Chandan Pandey. I explore how AI systems use context, make
            decisions, get evaluated and become useful software.
          </p>
          <div className="studio-actions">
            <Link href="#systems" className="studio-button primary">
              Explore the systems <ArrowUpRight size={18} />
            </Link>
            <Link href="/resume?view=ai-llm-engineer" className="studio-button">
              AI experience & resume <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="studio-shell studio-section" id="systems">
        <SectionHeading
          number="01 / INDEPENDENT EXPERIMENTS"
          title="Built from a real question."
          note="Public code, development status and the reasoning behind each project."
        />
        <ProjectGrid
          slugs={[
            "offerclaw",
            "bytetoken",
            "benchwolf",
            "portable-ai-memory",
            "dekhosuno",
            "oneclickallresultsbot",
          ]}
        />
      </section>
      <section className="studio-shell studio-research">
        <div>
          <p className="micro">02 / RESEARCH CONTRIBUTION · AMITY UNIVERSITY</p>
          <h2>
            AI meets
            <br />
            <span>computational biology.</span>
          </h2>
          <p>
            Research work around cancer genomics, neoantigen prediction,
            immunogenicity and scientific workflows.
          </p>
          <p>
            On EpitopePred, I contributed frontend, backend integration and
            asynchronous job orchestration to a collaborative research platform.
            My portfolio documents my contribution; ownership belongs to the
            project.
          </p>
          <Link href="/work/epitopepred" className="studio-button">
            Read my contribution <ArrowUpRight size={18} />
          </Link>
        </div>
        <div className="research-steps">
          {[
            [
              "01",
              "Research inputs",
              "Sequences, analysis strategy and scientific tools.",
            ],
            [
              "02",
              "Long-running work",
              "FastAPI, Celery and Redis for asynchronous jobs.",
            ],
            [
              "03",
              "Usable results",
              "Job progress, results tables and downloadable artifacts.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="micro">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
          <small>
            First-party project account. No public source is claimed.
          </small>
        </div>
      </section>
      <section className="studio-shell studio-section">
        <SectionHeading
          number="03 / THE ENGINEERING RECORD"
          title="Follow the details."
        />
        <div className="route-grid">
          {[
            [
              "Experience",
              "Research, internships and current work.",
              "/timeline",
            ],
            [
              "Credentials",
              "Open the actual completion certificates.",
              "/credentials",
            ],
            [
              "Explore in conversation",
              "Ask about architecture, choices and limitations.",
              "/ask?intent=ai",
            ],
          ].map(([t, d, h]) => (
            <Link href={h} key={h}>
              <h2>{t}</h2>
              <p>{d}</p>
              <ArrowUpRight size={23} />
            </Link>
          ))}
        </div>
      </section>
      <div className="studio-shell">
        <SocialLinks />
      </div>
      <ContactBand intent="ai" />
      <StudioFooter />
    </main>
  );
}
