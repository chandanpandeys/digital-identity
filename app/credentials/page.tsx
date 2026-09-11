import type { Metadata } from "next";
import { ArrowUpRight, Certificate } from "@phosphor-icons/react/dist/ssr";
import { credentials } from "@/lib/credentials";
import { springboardCourses } from "@/lib/springboard";
import { site } from "@/lib/profile";
import { ContactBand, StudioFooter } from "@/components/Studio";
export const metadata: Metadata = {
  title: "Credentials & learning",
  description:
    "Explore Chandan Pandey’s Google and IIT Bombay ambassador certificates, NEC team result, AI training and 19 Infosys Springboard certifications.",
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
        credentialCategory: c.category ?? "Completion certificate",
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
          AI learning, campus leadership and community participation—with the
          original documents and the context behind each record.
        </p>
        <div className="hero-actions">
          <a className="studio-button primary" href="#originals">Original certificates</a>
          <a className="studio-button" href="#infosys">19 Infosys Springboard records</a>
        </div>
      </section>
      <section id="originals" aria-label="Original certificates" className="studio-shell studio-section certificate-grid">
        {credentials.map((c) => (
          <article key={c.slug} id={c.slug}>
            <div className="certificate-art">
              {c.previewImage ? <img src={c.previewImage} alt={c.title + " — original certificate for Chandan Pandey"} loading="lazy" /> : (
              <iframe
                src={c.publicUrl?.replace("/view", "/preview")}
                title={c.issuer + " certificate issued to Chandan Pandey"}
                loading="lazy"
                allowFullScreen
              />
              )}
            </div>
            <div className="certificate-copy">
              <p className="micro">
                <Certificate size={17} /> {c.issuer}
              </p>
              <h2>{c.title}</h2>
              <p className="source-note">{c.category ?? "Completion certificate"}</p>
              <p>{c.summary}</p>
              <dl>
                <div>
                  <dt>Record</dt>
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
                href={c.downloadUrl ?? c.publicUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {c.downloadUrl ? "Open certificate PDF" : "Open original certificate"} <ArrowUpRight size={18} />
              </a>
              {c.downloadUrl && <a className="studio-button" href={c.publicUrl} target="_blank" rel="noopener noreferrer">View source on Drive <ArrowUpRight size={18} /></a>}
              <p className="source-note">
                First-party certificate · Public viewing link
              </p>
            </div>
          </article>
        ))}
      </section>
      <section id="infosys" className="studio-shell studio-section">
        <p className="micro">INFOSYS SPRINGBOARD / CONTINUOUS LEARNING</p>
        <h2>19 certifications. A wider learning foundation.</h2>
        <p className="hero-intro">AI and data science, generative models, development practices and communication.</p>
        <p className="source-note">Explore the courses behind my certifications, from AI foundations to generative models and technical communication.</p>
        <div className="springboard-grid">
          {springboardCourses.map((c) => <article key={c.courseUrl}>
            <p className="micro">INFOSYS SPRINGBOARD</p>
            <h3>{c.title}</h3>
            <p className="source-note">Course certification</p>
            <a href={c.courseUrl} target="_blank" rel="noopener noreferrer">Open issuer course page <ArrowUpRight size={17} /></a>
          </article>)}
        </div>
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
