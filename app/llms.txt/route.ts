import { site } from "@/lib/profile";
import { experiences } from "@/lib/experience";
import { projects } from "@/lib/projects";
import { labItems } from "@/lib/lab";

export function GET() {
  const projectLines = projects.map((project) => `- ${project.name} [${project.tier}]: ${project.strapline} (${site.canonicalUrl}/work/${project.slug})`).join("\n");
  const labLines = labItems.map((item) => `- ${item.name} [${item.status}]: ${item.summary} (${item.github})`).join("\n");
  const experienceLines = experiences.map((item) => `- ${item.period}: ${item.title}, ${item.organization} — ${item.summary}`).join("\n");
  const body = `# ${site.name}\n\nCanonical website: ${site.canonicalUrl}\nGitHub: ${site.links.github}\nLinkedIn: ${site.links.linkedin}\nInstagram: ${site.links.instagram}\n\n## Summary\n${site.description}\n\n## Primary routes\n- Work: ${site.canonicalUrl}/work\n- Lab: ${site.canonicalUrl}/lab\n- Timeline: ${site.canonicalUrl}/timeline\n- About: ${site.canonicalUrl}/about\n- Content and education: ${site.canonicalUrl}/content\n- Current focus: ${site.canonicalUrl}/now\n- Resume: ${site.canonicalUrl}/resume\n\n## Selected work\n${projectLines}\n\n## Lab and supporting public work\n${labLines}\n\n## Experience and education\n${experienceLines}\n\n## Machine-readable profile\n${site.canonicalUrl}/profile.json\n\n## Evidence policy\nPublic repositories and profiles are linked where inspectable. First-party career material is treated as first-party context rather than independently verified evidence. Benchmark baselines and qualifications are preserved on case-study pages. Private repositories and unpublished work are not exposed by default.\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
