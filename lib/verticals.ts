import type { Metadata } from "next";

export const verticals = {
  ai: {
    title: "AI Engineering & Research",
    description:
      "Chandan Pandey builds LLM infrastructure, evaluation systems and applied AI. Inspect ByteToken, BenchWolf, research workflows and accessibility software.",
    resume: "/resume?view=ai-llm-engineer",
    prompt: "What AI infrastructure has Chandan built?",
    prompts: [
      "What AI infrastructure has Chandan built?",
      "What research has he done?",
      "Show me accessibility work",
      "What is publicly inspectable?",
    ],
    nodes: ["infrastructure", "research", "accessibility"],
  },
  content: {
    title: "AI Content & Technical Communication",
    description:
      "Chandan Pandey connects AI research, content strategy, technical storytelling and developer education. Explore professional experience and inspectable explanations.",
    resume: "/resume?view=ai-content-developer-educator",
    prompt:
      "What AI content and technical communication experience does Chandan have?",
    prompts: [
      "What AI content and technical communication experience does Chandan have?",
      "Does he have teaching experience?",
      "Show content automation workflows",
      "What is publicly inspectable?",
    ],
    nodes: ["content", "automation"],
  },
} as const;

export type Vertical = keyof typeof verticals;
export type Intent = Vertical | "complete";
export function parseIntent(value: unknown): Intent {
  return value === "ai" || value === "content" ? value : "complete";
}
export function verticalMetadata(vertical: Vertical): Metadata {
  const { title, description } = verticals[vertical];
  const image = {
    url: `/${vertical}/opengraph-image`,
    width: 1200,
    height: 630,
    alt: `${title} · Chandan Pandey`,
  };
  return {
    title,
    description,
    alternates: { canonical: `/${vertical}` },
    openGraph: {
      type: "website",
      title: `${title} · Chandan Pandey`,
      description,
      url: `/${vertical}`,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} · Chandan Pandey`,
      description,
      images: [image.url],
    },
  };
}
