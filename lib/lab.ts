export type LabItem = {
  name: string;
  category: string;
  year: string;
  summary: string;
  signal: string;
  github: string;
  status: "experiment" | "archive" | "supporting";
};

export const labItems: LabItem[] = [
  {
    name: "AI-Powered Social Media Content Automation",
    category: "Agents / Automation",
    year: "2025 — 2026",
    summary:
      "An n8n workflow that turns a topic into platform-specific drafts, routes them through a human approval gate, then optionally publishes and reports status across multiple social platforms.",
    signal:
      "Useful because it demonstrates orchestration, structured LLM output, human-in-the-loop approval, credentials-aware integrations, and operational failure handling rather than a single prompt demo.",
    github: "https://github.com/chandanpandeys/Automations",
    status: "supporting",
  },
  {
    name: "OfferClaw",
    category: "Agent UX / Job Search",
    year: "2026",
    summary:
      "A browser-first React experiment around job discovery, application preparation, outreach, follow-up sequencing, and pipeline tracking with optional Gemini and JSearch integrations.",
    signal:
      "Kept in Lab because the product interaction model is interesting, while several market-effectiveness claims in its README still need stronger sourcing before they belong in a flagship case study.",
    github: "https://github.com/chandanpandeys/offerclaw",
    status: "experiment",
  },
  {
    name: "IBM Internship Projects",
    category: "Machine Learning",
    year: "2025",
    summary:
      "Public internship repository associated with project-based AI/ML work, including the employee-salary classification work represented in the professional record.",
    signal:
      "Useful supporting evidence for applied scikit-learn workflows, model comparison, explainability, and the progression from training projects into more independent systems work.",
    github: "https://github.com/chandanpandeys/IBMInternshipProjects",
    status: "supporting",
  },
  {
    name: "AI PPT Generator",
    category: "Generative AI",
    year: "2023 — 2024",
    summary:
      "An earlier Python experiment combining GPT-generated presentation content, Stable Diffusion imagery, and python-pptx assembly from context such as industry, topic, purpose, and tone.",
    signal:
      "Worth preserving as an early generative-AI build, but better shown as an experiment than as current flagship engineering work.",
    github: "https://github.com/chandanpandeys/Ai-ppt-gen",
    status: "archive",
  },
  {
    name: "Travel Website Project",
    category: "Web Development",
    year: "2024",
    summary:
      "A larger public web-development repository from an earlier stage of the build journey.",
    signal:
      "Preserved as historical evidence of progression, not promoted into the AI-focused work narrative.",
    github: "https://github.com/chandanpandeys/Travel-Website-Project",
    status: "archive",
  },
];
