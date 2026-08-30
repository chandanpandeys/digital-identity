export const site = {
  name: "Chandan Pandey",
  handle: "chandanpandeys",
  canonicalUrl: "https://chandanpandeys.me",
  description:
    "Chandan Pandey is an AI engineer and builder working across applied AI research, LLM systems, developer tooling, open source, accessibility, automation, and technical content.",
  location: "India",
  links: {
    github: "https://github.com/chandanpandeys",
    linkedin: "https://www.linkedin.com/in/chandanpandeys/",
    instagram: "https://www.instagram.com/Chandan__/",
  },
} as const;

export const disciplines = [
  {
    title: "Build",
    text: "AI systems, agent workflows, developer tools, automation, and product prototypes designed to survive beyond the demo.",
  },
  {
    title: "Research",
    text: "Applied machine learning across computational biology, neoantigen discovery, sequence modelling, evaluation, and research tooling.",
  },
  {
    title: "Explain",
    text: "Technical content, education, workshops, and narratives that make difficult systems understandable enough to use.",
  },
] as const;

export const now = [
  "Building AI systems and open-source developer infrastructure",
  "Leading AI and technology content at YAAS",
  "Turning private experiments into public, documented software",
] as const;

export const timeline = [
  {
    period: "2026 — NOW",
    title: "AI Content Lead · YAAS",
    description:
      "Researching AI tools and use cases, shaping strategy and scripts, and building repeatable workflows from research through publishing and performance analysis.",
  },
  {
    period: "2025 — 2026",
    title: "AI Research · Amity University",
    description:
      "Applied ML and computational workflows around cancer genomics, neoantigen prediction, immunogenicity, and vaccine-discovery research.",
  },
  {
    period: "2024 — NOW",
    title: "Founder · Notansun",
    description:
      "A student-focused programming and AI initiative evolving toward practical AI products, learning systems, workshops, and community experiments.",
  },
  {
    period: "2020 — 2022",
    title: "Early education creator",
    description:
      "The first public-building chapter: educational videos, exam preparation, visual explanations, and student-focused content while still in school.",
  },
] as const;

export const proofSignals = [
  {
    label: "Public code identity",
    detail: "Open-source repositories, developer tooling, experiments, and implementation history.",
    source: "GitHub",
    href: site.links.github,
    strength: "PUBLIC",
  },
  {
    label: "Professional record",
    detail: "Career roles, research experience, campus programs, education, and professional narrative.",
    source: "LinkedIn",
    href: site.links.linkedin,
    strength: "PUBLIC PROFILE",
  },
  {
    label: "ByteToken",
    detail: "Tokenizer-aware transport and context optimization work with implementation and benchmark material.",
    source: "Repository",
    href: "https://github.com/chandanpandeys/bytetoken",
    strength: "INSPECTABLE",
  },
  {
    label: "InferBench",
    detail: "Public local-LLM evaluation tooling covering hardware preflight, speed, memory, power/energy, quality, comparison, and reporting.",
    source: "Repository",
    href: "https://github.com/chandanpandeys/inferbench",
    strength: "INSPECTABLE",
  },
  {
    label: "DekhoSuno",
    detail: "Public Flutter accessibility project combining Gemini, OCR, speech, computer vision, sensors, and accessible interaction flows.",
    source: "Repository",
    href: "https://github.com/chandanpandeys/DekhoSuno",
    strength: "INSPECTABLE",
  },
  {
    label: "OneClickAllResultsBot",
    detail: "Public automation project for batch academic-result retrieval and comparative analysis.",
    source: "Repository",
    href: "https://github.com/chandanpandeys/OneClickAllResultsBot",
    strength: "INSPECTABLE",
  },
  {
    label: "IBM internship work",
    detail: "Public project repository associated with applied AI/ML internship work.",
    source: "Repository",
    href: "https://github.com/chandanpandeys/IBMInternshipProjects",
    strength: "PUBLIC",
  },
] as const;
