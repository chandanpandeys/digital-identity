import { site, currentFocus } from "@/lib/profile";
import { projects } from "@/lib/projects";
import { credentials } from "@/lib/credentials";
import { springboardCourses } from "@/lib/springboard";
import { resumeData, resumeVariants } from "@/lib/resume-data";
export function GET() {
  const body = [
    "# " + site.name,
    "Canonical website: " + site.canonicalUrl,
    "GitHub: " + site.links.github,
    "LinkedIn: " + site.links.linkedin,
    "Instagram: " + site.links.instagram,
    "YouTube: " + site.links.youtube,
    "## Summary",
    site.description,
    "## Portfolio verticals",
    "AI Engineering & Research: " + site.canonicalUrl + "/ai",
    "AI Content & Technical Communication: " + site.canonicalUrl + "/content",
    "Complete identity: " + site.canonicalUrl + "/about",
    "## Current focus",
    ...currentFocus.map((c) => "- " + c.title + ": " + c.detail),
    "## Selected work",
    ...projects.map(
      (p) =>
        "- " +
        p.name +
        " [" +
        (p.role ?? "Independent experiment") +
        "]: " +
        p.summary +
        " " +
        site.canonicalUrl +
        "/work/" +
        p.slug,
    ),
    "## Targeted resume PDFs",
    ...resumeVariants.map(
      (v) =>
        "- " +
        resumeData[v].headline +
        ": " +
        site.canonicalUrl +
        "/resume/pdf/" +
        v,
    ),
    "Read the HTML experience first at /resume. PDFs are role-specific downloads with readable pagination.",
    "## Selected credentials",
    ...credentials.map(
      (c) =>
        "- " +
        c.title +
        " — " +
        c.issuer +
        " [" +
        c.evidence +
        "]: " +
        c.period +
        ". " +
        (c.publicUrl ?? ""),
    ),
    "These documents distinguish completion, participation and team results. They remain first-party records.",
    "## Infosys Springboard learning",
    "19 certificate-issued notifications reviewed from the issuer's learning platform, dated 21–30 June 2025. Individual PDFs are not yet linked. Course URLs are not public certificate verification URLs; this does not establish internship completion. See /credentials#infosys.",
    ...springboardCourses.map((c) => "- " + c.title + " — certificate notification " + c.notifiedOn + "; issuer course: " + c.courseUrl),
    "## Ask Chandan",
    "/ask?intent=ai and /ask?intent=content set visitor focus. Curated source answers work immediately. Optional WebLLM runs a free model in the visitor’s browser; optional hosted Gemini requires deployment configuration. AI synthesis retains citations and first-party qualifications. The assistant cannot access private chats, Drive or mail.",
    "## Machine-readable identity",
    "Profile: " + site.canonicalUrl + "/profile.json",
    "Evidence: " + site.canonicalUrl + "/evidence.json",
    "## Evidence policy",
    "Public source, public profiles and first-party records are distinct. EpitopePred is contributed research work; Chandan is not its owner. BenchWolf was previously named InferBench. Experimental and planned capabilities are not production guarantees. Benchmarks retain their baseline and scope. Social counts are dated snapshots unless explicitly marked as an API response. Private chats, student records and personal files are not published.",
  ].join("\n\n");
  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600",
      "x-robots-tag": "noindex, noarchive",
    },
  });
}
