import { portfolioPreview } from "@/lib/og";
import { getProject } from "@/lib/projects";
export const alt = "Project story · Chandan Pandey";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = getProject((await params).slug);
  return portfolioPreview(
    project?.name ?? "The project collection",
    project?.role === "Research contributor"
      ? "RESEARCH CONTRIBUTION"
      : "INDEPENDENT EXPERIMENT",
    project?.strapline ?? "Explore Chandan Pandey’s work.",
  );
}
