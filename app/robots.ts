import type { MetadataRoute } from "next";
import { site } from "@/lib/profile";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      { userAgent: "OAI-SearchBot", allow: "/" },
      { userAgent: "GPTBot", disallow: "/" },
      { userAgent: "Claude-SearchBot", allow: "/" },
      { userAgent: "Claude-User", allow: "/" },
      { userAgent: "ClaudeBot", disallow: "/" },
    ],
    sitemap: `${site.canonicalUrl}/sitemap.xml`,
    host: site.canonicalUrl,
  };
}
