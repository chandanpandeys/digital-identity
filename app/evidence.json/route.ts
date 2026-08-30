import { evidenceNodes, evidencePrompts } from "@/lib/evidence";
import { site } from "@/lib/profile";

export function GET() {
  return Response.json({
    schemaVersion: "1.0",
    updatedAt: "2026-08-31",
    canonical: `${site.canonicalUrl}/evidence.json`,
    purpose: "Curated evidence graph used by the Ask Chandan interface before any future generative synthesis layer.",
    prompts: evidencePrompts,
    nodes: evidenceNodes,
    policy: {
      inspectable: "Public source or artifact can be opened directly.",
      publicProfile: "Claim is represented in a public professional/profile record.",
      firstParty: "Documented first-party context that is not presented as independent verification.",
    },
  }, { headers: { "cache-control": "public, max-age=3600" } });
}
