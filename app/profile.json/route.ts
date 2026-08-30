import { currentFocus, disciplines, now, proofSignals, site, timeline } from "@/lib/profile";
import { experiences } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { labItems } from "@/lib/lab";

export function GET() {
  return Response.json({
    schemaVersion: "1.5",
    updatedAt: "2026-08-31",
    canonical: site.canonicalUrl,
    person: site,
    disciplines,
    currently: now,
    currentFocus,
    selectedProjects: projects,
    lab: labItems,
    selectedTimeline: timeline,
    experience: experiences,
    publicEvidence: proofSignals,
    curation: {
      work: "Flagship and selected projects with enough technical depth or evidence for dedicated case studies.",
      lab: "Supporting experiments, earlier builds, and public repositories preserved without competing with flagship work.",
      now: "Only active allocation of attention; historical work belongs in Timeline and supporting experiments belong in Lab.",
      ask: "A deterministic evidence navigator that resolves questions to curated nodes and source links before any future generative synthesis layer is added.",
    },
    routes: {
      work: `${site.canonicalUrl}/work`,
      lab: `${site.canonicalUrl}/lab`,
      timeline: `${site.canonicalUrl}/timeline`,
      about: `${site.canonicalUrl}/about`,
      content: `${site.canonicalUrl}/content`,
      now: `${site.canonicalUrl}/now`,
      resume: `${site.canonicalUrl}/resume`,
      ask: `${site.canonicalUrl}/ask`,
      evidence: `${site.canonicalUrl}/evidence.json`,
      llms: `${site.canonicalUrl}/llms.txt`,
    },
  }, { headers: { "cache-control": "public, max-age=3600" } });
}
