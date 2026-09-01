import { currentFocus, disciplines, now, proofSignals, site, timeline } from "@/lib/profile";
import { experiences } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { labItems } from "@/lib/lab";
import { credentials } from "@/lib/credentials";
import { resumeData, resumeVariants } from "@/lib/resume-data";

export function GET() {
  const targetedResumes = resumeVariants.map((variant) => ({
    variant,
    headline: resumeData[variant].headline,
    summary: resumeData[variant].summary,
    filename: resumeData[variant].filename,
    download: `${site.canonicalUrl}/resume/pdf/${variant}`,
  }));

  return Response.json({
    schemaVersion: "1.7",
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
    selectedCredentials: credentials,
    targetedResumes,
    publicEvidence: proofSignals,
    curation: {
      work: "Flagship and selected projects with enough technical depth or evidence for dedicated case studies.",
      lab: "Supporting experiments, earlier builds, and public repositories preserved without competing with flagship work.",
      now: "Only active allocation of attention; historical work belongs in Timeline and supporting experiments belong in Lab.",
      credentials: "Selected credentials with an identified source document. Private source files are not exposed as public evidence until sharing is intentionally reviewed.",
      resume: "The HTML resume is the canonical hiring record. Targeted PDF variants are filtered views generated from a structured role-specific dataset.",
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
      credentials: `${site.canonicalUrl}/credentials`,
      ask: `${site.canonicalUrl}/ask`,
      evidence: `${site.canonicalUrl}/evidence.json`,
      llms: `${site.canonicalUrl}/llms.txt`,
    },
  }, { headers: { "cache-control": "public, max-age=3600", "x-robots-tag": "noindex, noarchive" } });
}
