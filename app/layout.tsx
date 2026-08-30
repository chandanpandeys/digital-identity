import type { Metadata } from "next";
import { site } from "@/lib/profile";
import "./globals.css";
import "./expansion.css";
import "./case-depth.css";
import "./curation.css";
import "./evidence.css";
import "./interaction.css";
import "./narrative.css";
import "./now.css";
import "./production.css";
import "./credentials.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.canonicalUrl),
  title: {
    default: "Chandan Pandey — AI Engineer, Researcher & Builder",
    template: "%s · Chandan Pandey",
  },
  description: site.description,
  alternates: { canonical: "/" },
  authors: [{ name: site.name, url: site.canonicalUrl }],
  creator: site.name,
  category: "technology",
  keywords: [
    "Chandan Pandey",
    "Chandan Pandey AI",
    "AI Engineer",
    "AI Research",
    "LLM Engineer",
    "AI Agents",
    "MCP",
    "Computational Biology",
    "Developer Tools",
  ],
  openGraph: {
    type: "profile",
    url: site.canonicalUrl,
    title: "Chandan Pandey — AI Engineer, Researcher & Builder",
    description: site.description,
    siteName: "Chandan Pandey",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Chandan Pandey — AI Engineer, Researcher & Builder" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Chandan Pandey — AI Engineer, Researcher & Builder",
    description: site.description,
    images: ["/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${site.canonicalUrl}/#person`,
  name: site.name,
  alternateName: site.handle,
  url: site.canonicalUrl,
  image: "https://avatars.githubusercontent.com/u/126047460?v=4",
  jobTitle: "AI Engineer and Builder",
  description: site.description,
  sameAs: [site.links.github, site.links.linkedin, site.links.instagram],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "AI Agents",
    "LLM Infrastructure",
    "Model Context Protocol",
    "Computational Biology",
    "Neoantigen Prediction",
    "Developer Tools",
    "AI Accessibility",
    "Technical Content",
  ],
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${site.canonicalUrl}/#profile-page`,
  url: site.canonicalUrl,
  name: "Chandan Pandey — Digital Identity",
  mainEntity: { "@id": `${site.canonicalUrl}/#person` },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }} />
      </body>
    </html>
  );
}
