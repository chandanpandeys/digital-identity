import { portfolioPreview } from "@/lib/og";
export const alt = "Chandan Pandey — AI Engineering, Research & Content";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return portfolioPreview(
    "Curiosity, built into something real.",
    "AI × CONTENT",
    "AI systems. Applied research. Stories worth sharing.",
  );
}
