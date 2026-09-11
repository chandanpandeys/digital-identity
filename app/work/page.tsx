import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { ProjectCard, ContactBand, StudioFooter } from "@/components/Studio";
export const metadata: Metadata = {
  title: "AI projects & engineering stories",
  description:
    "Explore Chandan Pandey’s independent AI experiments and research contributions: ByteToken, OfferClaw, BenchWolf, Portable AI Memory, EpitopePred and more.",
  alternates: { canonical: "/work" },
};
export default function Work() {
  return (
    <main id="main">
      <section className="studio-shell studio-page-hero">
        <p className="micro">THE PROJECT COLLECTION</p>
        <h1>
          Curiosity.
          <br />
          Code.
          <br />
          <em>Consequences.</em>
        </h1>
        <p className="hero-intro">
          Why I built it. What I learned. What you can inspect.
          <br />
          Independent experiments and clearly attributed research contributions.
        </p>
      </section>
      <section className="studio-shell studio-section">
        <div className="studio-project-grid">
          {projects.map((p, i) => (
            <ProjectCard project={p} index={i} key={p.slug} />
          ))}
        </div>
      </section>
      <ContactBand intent="ai" />
      <StudioFooter />
    </main>
  );
}
