import type { Metadata } from "next";
import { ArrowUpRight, Certificate } from "@phosphor-icons/react/dist/ssr";
import { credentials } from "@/lib/credentials";
import { site } from "@/lib/profile";
import { ContactBand, StudioFooter } from "@/components/Studio";
export const metadata: Metadata = {
  title: "Credentials & learning",
  description:
    "Open Chandan Pandey’s documented AI completion certificates from TechVidya and SkillsBuild/Edunet.",
  alternates: { canonical: "/credentials" },
};
export default function Credentials() {
  const json = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Chandan Pandey — documented credentials",
    itemListElement: credentials.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: c.title,
        url: c.publicUrl,
        description: c.summary,
        recognizedBy: { "@type": "Organization", name: c.issuer },
        credentialCategory: "Completion certificate",
        identifier: c.credentialId,
      },
    })),
  };
  return (
    <main id="main">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(json).replace(/</g, "\\u003c"),
        }}
      />
      <section className="studio-shell studio-page-hero">
        <p className="micro">CREDENTIALS & CONTINUOUS LEARNING</p>
        <h1>
          Learn it.
          <br />
          Use it.
          <br />
          <em>Keep the evidence.</em>
        </h1>
        <p className="hero-intro">
          The actual certificates, with issuer, program and dates. A starting
          point for understanding the training behind my work.
        </p>
      </section>
      <section className="studio-shell studio-section certificate-grid">
        {credentials.map((c) => (
          <article key={c.slug}>
            <div className="certificate-art">
              <iframe
                src={c.publicUrl?.replace("/view", "/preview")}
                title={c.issuer + " certificate issued to Chandan Pandey"}
                loading="lazy"
                allowFullScreen
              />
            </div>
            <div className="certificate-copy">
              <p className="micro">
                <Certificate size={17} /> {c.issuer}
              </p>
              <h2>{c.title}</h2>
              <p>{c.summary}</p>
              <dl>
                <div>
                  <dt>Program</dt>
                  <dd>{c.period}</dd>
                </div>
                {c.grade && (
                  <div>
                    <dt>Grade</dt>
                    <dd>{c.grade}</dd>
                  </div>
                )}
                {c.credentialId && (
                  <div>
                    <dt>Credential ID</dt>
                    <dd>{c.credentialId}</dd>
                  </div>
                )}
              </dl>
              <a
                className="studio-button primary"
                href={c.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open original certificate <ArrowUpRight size={18} />
              </a>
              <p className="source-note">
                First-party certificate · Public viewing link
              </p>
            </div>
          </article>
        ))}
      </section>
      <section className="studio-shell credential-follow">
        <h2>Want to discuss the work behind a credential?</h2>
        <p>
          Explore the project collection, or reach me at{" "}
          <a href={"mailto:" + site.contact.email}>{site.contact.email}</a>.
        </p>
      </section>
      <ContactBand />
      <StudioFooter />
    </main>
  );
}
