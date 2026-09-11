import { portfolioPreview } from "@/lib/og";
export const alt = "Chandan Pandey — AI Content & Technical Communication";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() {
  return portfolioPreview(
    "Make it worth watching.",
    "/ CONTENT",
    "AI content and technical communication, with engineering depth.",
  );
}
