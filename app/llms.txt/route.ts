import { site, timeline } from "@/lib/profile";
import { projects } from "@/lib/projects";

export function GET() {
  const projectLines = projects.map((project) => `- ${project.name}: ${project.strapline} (${site.canonicalUrl}/work/${project.slug})`).join("\n");
  const timelineLines = timeline.map((item) => `- ${item.period}: ${item.title} — ${item.description}`).join("\n");
  const body = `# ${site.name}\n\nCanonical website: ${site.canonicalUrl}\nGitHub: ${site.links.github}\nLinkedIn: ${site.links.linkedin}\n\n## Summary\n${site.description}\n\n## Selected work\n${projectLines}\n\n## Selected timeline\n${timelineLines}\n\n## Machine-readable profile\n${site.canonicalUrl}/profile.json\n`;
  return new Response(body, { headers: { "content-type": "text/plain; charset=utf-8", "cache-control": "public, max-age=3600" } });
}
