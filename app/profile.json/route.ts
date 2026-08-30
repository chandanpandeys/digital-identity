import { disciplines, now, proofSignals, site, timeline } from "@/lib/profile";
import { experiences } from "@/lib/experience";
import { projects } from "@/lib/projects";

export function GET() {
  return Response.json({
    schemaVersion: "1.1",
    updatedAt: "2026-08-30",
    canonical: site.canonicalUrl,
    person: site,
    disciplines,
    currently: now,
    selectedProjects: projects,
    selectedTimeline: timeline,
    experience: experiences,
    publicEvidence: proofSignals,
    routes: {
      work: `${site.canonicalUrl}/work`,
      timeline: `${site.canonicalUrl}/timeline`,
      about: `${site.canonicalUrl}/about`,
      content: `${site.canonicalUrl}/content`,
      now: `${site.canonicalUrl}/now`,
      resume: `${site.canonicalUrl}/resume`,
      llms: `${site.canonicalUrl}/llms.txt`,
    },
  }, { headers: { "cache-control": "public, max-age=3600" } });
}
