import type { Metadata } from "next";
import { site } from "@/lib/profile";
import "./globals.css";

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
  openGraph: {
    type: "profile",
    url: site.canonicalUrl,
    title: "Chandan Pandey — AI Engineer, Researcher & Builder",
    description: site.description,
    siteName: "Chandan Pandey",
    images: [{ url: "https://avatars.githubusercontent.com/u/126047460?v=4", width: 460, height: 460, alt: "Chandan Pandey" }],
  },
  twitter: {
    card: "summary",
    title: "Chandan Pandey — AI Engineer, Researcher & Builder",
    description: site.description,
    images: ["https://avatars.githubusercontent.com/u/126047460?v=4"],
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
  name: site.name,
  url: site.canonicalUrl,
  image: "https://avatars.githubusercontent.com/u/126047460?v=4",
  jobTitle: "AI Engineer and Builder",
  description: site.description,
  sameAs: [site.links.github, site.links.linkedin],
  knowsAbout: [
    "Artificial Intelligence",
    "Machine Learning",
    "AI Agents",
    "LLM Infrastructure",
    "Model Context Protocol",
    "Computational Biology",
    "Developer Tools",
  ],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
