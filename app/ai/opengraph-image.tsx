import { portfolioPreview } from "@/lib/og";
export const alt = "Chandan Pandey — AI Engineering & Research";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return portfolioPreview(
    "AI Engineering & Research",
    "/ AI",
    "LLM systems, useful agents and applied research.",
  );
}
