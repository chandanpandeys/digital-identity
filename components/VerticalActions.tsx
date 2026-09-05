import Link from "next/link";
import { verticals, type Vertical } from "@/lib/verticals";
import { site } from "@/lib/profile";

export function VerticalActions({ vertical }: { vertical: Vertical }) {
  return <div className="hero-actions">
    <a className="button primary" href={verticals[vertical].resume}>{vertical === "ai" ? "AI Engineer" : "AI Content"} resume ↓</a>
    {vertical === "ai" && <a className="button secondary" href="/resume/pdf/ai-research-ml">Research resume ↓</a>}
    <Link className="button secondary" href={`/ask?intent=${vertical}`}>Ask about {vertical === "ai" ? "AI work" : "content work"} ↗</Link>
    <a className="button secondary" href={site.links.linkedin} target="_blank" rel="noopener noreferrer">Discuss {vertical === "ai" ? "engineering" : "content"} opportunities ↗</a>
  </div>;
}
