import type { MetadataRoute } from "next";
import { site } from "@/lib/profile";
import { projects } from "@/lib/projects";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/work", "/lab", "/timeline", "/about", "/content", "/now", "/resume", "/ask"];
  const projectRoutes = projects.map((project) => `/work/${project.slug}`);
  return [...staticRoutes, ...projectRoutes].map((path) => ({
    url: `${site.canonicalUrl}${path}`,
    lastModified: new Date("2026-08-31"),
    changeFrequency: path === "" || path === "/now" || path === "/ask" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/work" ? 0.9 : path === "/ask" ? 0.88 : path === "/lab" ? 0.78 : path === "/timeline" || path === "/about" ? 0.85 : 0.75,
  }));
}
