import { disciplines, now, proofPoints, site, timeline } from "@/lib/profile";
import { projects } from "@/lib/projects";

export function GET() {
  return Response.json({
    schemaVersion: "1.0",
    updatedAt: "2026-08-30",
    person: site,
    disciplines,
    currently: now,
    selectedProjects: projects,
    timeline,
    proofPoints,
  }, { headers: { "cache-control": "public, max-age=3600" } });
}
