import Link from "next/link";
import {
  ArrowUpRight,
  InstagramLogo,
  YoutubeLogo,
  LinkedinLogo,
} from "@phosphor-icons/react/dist/ssr";
import { verticalMetadata } from "@/lib/verticals";
import { site } from "@/lib/profile";
import { socialSnapshot, videos, reels } from "@/lib/social";
import {
  SectionHeading,
  SocialLinks,
  ContactBand,
  StudioFooter,
} from "@/components/Studio";
import { VideoPlayer, ReelPlayer } from "@/components/MediaPlayer";
import ChannelStats from "@/components/ChannelStats";
export const metadata = verticalMetadata("content");
export default function ContentPage() {
  return (
    <main id="main">
      <section className="studio-shell studio-page-hero content-hero">
        <p className="micro">
          <span className="status-dot" /> AI CONTENT & TECHNICAL COMMUNICATION
        </p>
        <h1>
          Understand deeply.
          <br />
          Make it
          <br />
          <em>worth watching.</em>
        </h1>
        <div className="page-hero-bottom">
          <p>
            I’m Chandan Pandey. AI Content Lead at YAAS, engineer and educator.
            I connect technical research with stories people can understand and
            use.
          </p>
          <div className="studio-actions">
            <Link className="studio-button primary" href="#reels">
              Watch selected work <ArrowUpRight size={18} />
            </Link>
            <a
              className="studio-button"
              href={
                "mailto:" +
                site.contact.email +
                "?subject=Content%20opportunity"
              }
            >
              Work with me <ArrowUpRight size={18} />
            </a>
            <Link className="text-link" href="/ask?intent=content">
              Ask about my content <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <div className="studio-shell">
        <SocialLinks />
      </div>
      <section className="studio-shell studio-section" id="reels">
        <SectionHeading
          number="01 / AI & TECHNOLOGY, ON CAMERA"
          title="From technical idea to human story."
          note="Selected public reels from @justchandan__."
          href={site.links.instagram}
          label="Instagram profile"
        />
        <div className="reels-grid">
          {reels.map((r) => (
            <article key={r.id}>
              <ReelPlayer id={r.id} title={r.title} />
              <div className="media-caption">
                <span className="micro">
                  {r.topic} / {r.date}
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-shell studio-section">
        <SectionHeading
          number="02 / FIND THE WORK"
          title="A public trail across platforms."
          note="Dated public counts, with the source one click away."
        />
        <div className="channel-grid">
          <article>
            <InstagramLogo size={30} />
            <h3>Instagram</h3>
            <p>@justchandan__</p>
            <strong className="channel-count">
              {socialSnapshot.instagram.followers}
              <small>followers</small>
            </strong>
            <span className="micro">PUBLIC SNAPSHOT · 8 SEP 2026</span>
            <a
              className="text-link"
              href={site.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the profile <ArrowUpRight size={18} />
            </a>
          </article>
          <article>
            <YoutubeLogo size={30} />
            <h3>YouTube</h3>
            <p>Chanakya Education Centre</p>
            <ChannelStats />
            <a
              className="text-link"
              href={site.links.youtube}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open the channel <ArrowUpRight size={18} />
            </a>
          </article>
          <article>
            <LinkedinLogo size={30} />
            <h3>LinkedIn</h3>
            <p>Chandan Pandey · @chandanpandeys</p>
            <p className="channel-description">
              Professional updates, project launches and the conversations
              around the work.
            </p>
            <a
              className="text-link"
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
            >
              Visit my LinkedIn <ArrowUpRight size={18} />
            </a>
          </article>
        </div>
      </section>
      <section className="studio-shell studio-section">
        <SectionHeading
          number="03 / CONTENT AS A PRACTICE"
          title="Research. Script. Explain. Iterate."
        />
        <div className="content-practice">
          <div>
            <span className="micro">CURRENT ROLE / YAAS</span>
            <h3>AI Content Lead</h3>
            <p>
              Researching AI tools and use cases, shaping scripts and
              narratives, and building repeatable workflows from research
              through publishing and performance analysis.
            </p>
            <span className="source-note">
              Role account · First-party career record
            </span>
          </div>
          <div>
            <h3>Engineering behind the explanation</h3>
            <p>
              I also build the systems I spend time understanding: agents, AI
              context tools, evaluation and automation. That gives the content a
              practical technical foundation.
            </p>
            <Link href="/ai" className="text-link">
              See the engineering <ArrowUpRight size={18} />
            </Link>
          </div>
          <div>
            <h3>Content for your team</h3>
            <p>
              AI explainers, technical scripts, developer education,
              demonstrations and research-led content workflows.
            </p>
            <Link
              href="/resume?view=ai-content-developer-educator"
              className="text-link"
            >
              Experience & content resume <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>
      <section className="studio-shell studio-section" id="teaching">
        <SectionHeading
          number="04 / THE EDUCATOR BEHIND THE CREATOR"
          title="It started with helping someone learn."
          note="Original educational videos from Chanakya Education Centre."
        />
        <div className="video-grid">
          {videos.map((v) => (
            <article key={v.id}>
              <VideoPlayer id={v.id} title={v.title} />
              <div className="media-caption">
                <span className="micro">{v.topic}</span>
                <h3>{v.title}</h3>
                <p>
                  {v.duration} · {v.views.toLocaleString("en-IN")} views ·
                  snapshot 8 Sep 2026
                </p>
                <a
                  className="text-link"
                  href={"https://www.youtube.com/watch?v=" + v.id}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch on YouTube <ArrowUpRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="studio-shell studio-research" id="notansun">
        <div>
          <p className="micro">05 / COMMUNITY & TEACHING</p>
          <h2>
            Notansun Zone.
            <br />
            <span>Learning by doing.</span>
          </h2>
          <p>
            I founded Notansun to help students start building with technology.
            The teaching record includes Python workshops, a 10-day learning
            challenge, project exercises and participation certificates.
          </p>
          <p>
            My account includes teaching students across India. Workshop
            documents support the curriculum and program structure; attendance
            and completion totals are not claimed here.
          </p>
          <a
            className="text-link"
            href="https://www.instagram.com/notansunzone/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Notansun on Instagram <ArrowUpRight size={18} />
          </a>
        </div>
        <div className="research-steps">
          {[
            [
              "WORKSHOP",
              "Python for the real world",
              "Python fundamentals, functions, modules and practical projects.",
            ],
            [
              "PRACTICE",
              "Build something small",
              "Exercises included a Rock, Paper, Scissors game and text-to-speech.",
            ],
            [
              "CONTINUITY",
              "A 10-day learning challenge",
              "Daily practice, learning resources and participation certificates.",
            ],
          ].map(([n, t, d]) => (
            <article key={n}>
              <span className="micro">{n}</span>
              <h3>{t}</h3>
              <p>{d}</p>
            </article>
          ))}
          <small>
            Python workshops, practical projects and a 10-day learning challenge.
          </small>
        </div>
      </section>
      <section className="studio-shell credential-follow studio-section">
        <p className="micro">CAMPUS LEADERSHIP, DOCUMENTED</p>
        <h2>Participation. Outreach. A team effort.</h2>
        <p>Google Student Ambassador participation, E-Cell IIT Bombay Campus Ambassador completion, and our team's NEC 2025 Basic Track result—with the original certificates.</p>
        <Link className="studio-button" href="/credentials#originals">Open the certificate collection <ArrowUpRight size={18} /></Link>
      </section>
      <ContactBand intent="content" />
      <StudioFooter />
    </main>
  );
}
