import type { Metadata } from "next";
import Link from "next/link";
import { credentials } from "@/lib/credentials";
import { site } from "@/lib/profile";

export const metadata: Metadata = {
  title: "Credentials",
  description: "Selected evidence-backed AI and technical credentials for Chandan Pandey.",
  alternates: { canonical: "/credentials" },
};

export default function CredentialsPage() {
  const credentialJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${site.canonicalUrl}/credentials#credential-list`,
    name: "Selected credentials for Chandan Pandey",
    itemListElement: credentials.map((credential, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "EducationalOccupationalCredential",
        name: credential.title,
        description: credential.summary,
        recognizedBy: { "@type": "Organization", name: credential.issuer },
        credentialCategory: "Certificate",
        ...(credential.credentialId ? { identifier: credential.credentialId } : {}),
      },
    })),
  };

  return (
    <main id="main" className="inner-page credentials-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(credentialJsonLd).replace(/</g, "\\u003c") }} />
      <header className="site-shell subnav"><Link href="/">← Chandan Pandey</Link><span>CREDENTIALS / SELECTED EVIDENCE</span></header>

      <section className="site-shell page-hero credentials-hero">
        <p className="eyebrow">SELECTED / DOCUMENTED</p>
        <h1>Credentials without<br/><em>the badge wall.</em></h1>
        <p>Only credentials with a source record strong enough to inspect during the portfolio build appear here. This is deliberately not an exhaustive list of every course or participation certificate.</p>
      </section>

      <section className="site-shell credential-ledger" aria-label="Selected credentials">
        {credentials.map((credential, index) => (
          <article className="credential-entry" key={credential.slug}>
            <div className="credential-index"><span>{String(index + 1).padStart(2, "0")}</span><b>{credential.evidence}</b></div>
            <div className="credential-main">
              <p>{credential.issuer}</p>
              <h2>{credential.title}</h2>
              <strong>{credential.period}</strong>
              <span>{credential.summary}</span>
            </div>
            <dl className="credential-meta">
              {credential.issued && <><dt>Issued</dt><dd>{credential.issued}</dd></>}
              {credential.grade && <><dt>Grade</dt><dd>{credential.grade}</dd></>}
              {credential.credentialId && <><dt>Credential ID</dt><dd>{credential.credentialId}</dd></>}
              <dt>Public artifact</dt><dd>{credential.publicUrl ? "Available" : "Not published"}</dd>
            </dl>
          </article>
        ))}
      </section>

      <section className="site-shell credential-policy">
        <div><p className="eyebrow">EVIDENCE POLICY</p><h2>Documented does not mean public.</h2></div>
        <p>The source certificates for the records above are held as first-party documents. They are not linked from the public site until their sharing permissions and presentation are intentionally reviewed. Public repositories and public professional records continue to use stronger inspectable/public labels elsewhere in the portfolio.</p>
      </section>

      <section className="site-shell ask-next">
        <div><span>CONTINUE</span><strong>Credentials support the story; the work remains the primary evidence.</strong></div>
        <div><Link href="/resume">Resume ↗</Link><Link href="/work">Work ↗</Link><Link href="/timeline">Timeline ↗</Link></div>
      </section>
    </main>
  );
}
