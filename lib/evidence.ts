export type EvidenceNode = {
  id: string;
  title: string;
  answer: string;
  tags: string[];
  strength: "INSPECTABLE" | "PUBLIC PROFILE" | "FIRST-PARTY";
  links: { label: string; href: string }[];
};

export const evidencePrompts = [
  "What AI infrastructure has Chandan built?",
  "What research has he done?",
  "Show me accessibility work",
  "What is publicly inspectable?",
  "Does he have teaching experience?",
] as const;

export const evidenceNodes: EvidenceNode[] = [
  {
    id: "infrastructure",
    title: "AI infrastructure and evaluation",
    answer: "The strongest public infrastructure stories are ByteToken and InferBench. ByteToken explores tokenizer-aware, lossless transport for agent/MCP payloads and publishes reproducible token-count benchmarks. InferBench is a Python CLI for local-LLM fit and evaluation across hardware preflight, speed, memory, power/energy, quality, reporting, and comparison.",
    tags: ["ai", "infrastructure", "llm", "agent", "mcp", "token", "bytetoken", "inferbench", "evaluation", "benchmark", "developer tools"],
    strength: "INSPECTABLE",
    links: [
      { label: "ByteToken case study", href: "/work/bytetoken" },
      { label: "InferBench case study", href: "/work/inferbench" },
      { label: "ByteToken source", href: "https://github.com/chandanpandeys/bytetoken" },
      { label: "InferBench source", href: "https://github.com/chandanpandeys/inferbench" },
    ],
  },
  {
    id: "research",
    title: "Applied AI research and computational biology",
    answer: "The research thread includes applied AI/ML work around cancer genomics, neoantigen prediction, immunogenicity, sequence-oriented modelling, and computational vaccine workflows. EpitopePred is the clearest system story: a Next.js/FastAPI interface backed by asynchronous Celery/Redis scientific jobs and an immunoinformatics toolchain. The portfolio deliberately labels this as documented first-party work until sanitized public artifacts are released.",
    tags: ["research", "cancer", "vaccine", "neoantigen", "computational biology", "bioinformatics", "epitope", "amity", "machine learning"],
    strength: "FIRST-PARTY",
    links: [
      { label: "EpitopePred case study", href: "/work/epitopepred" },
      { label: "Career timeline", href: "/timeline" },
      { label: "Professional profile", href: "https://www.linkedin.com/in/chandanpandeys/" },
    ],
  },
  {
    id: "accessibility",
    title: "Applied AI for accessibility",
    answer: "DekhoSuno is the main public accessibility project. It is a Flutter app organized around hearing- and visually-impaired workflows, combining Gemini, ML Kit, OCR, speech-to-text, TTS, camera input, wake-word interaction, sensors, and geolocation. The repository also publishes its own architecture, flowchart, and technology-map assets.",
    tags: ["accessibility", "dekhosuno", "flutter", "gemini", "ocr", "speech", "vision", "mobile", "ml kit"],
    strength: "INSPECTABLE",
    links: [
      { label: "DekhoSuno case study", href: "/work/dekhosuno" },
      { label: "DekhoSuno source", href: "https://github.com/chandanpandeys/DekhoSuno" },
    ],
  },
  {
    id: "automation",
    title: "Automation and agent workflows",
    answer: "The portfolio separates serious case studies from smaller experiments. Public supporting work includes OneClickAllResultsBot for batch academic-result retrieval, an n8n AI content workflow with a human approval gate and multi-platform publishing, and OfferClaw as an experimental job-search agent interface. These live in Work or Lab according to evidence depth, not novelty alone.",
    tags: ["automation", "agent", "n8n", "workflow", "oneclick", "results", "offerclaw", "content automation"],
    strength: "INSPECTABLE",
    links: [
      { label: "OneClick case study", href: "/work/oneclickallresultsbot" },
      { label: "Lab", href: "/lab" },
    ],
  },
  {
    id: "content",
    title: "Teaching, content, and explanation",
    answer: "The creator thread predates the AI work: educational videos while still in school, later 1,000+ student-question explanations through Brainly, workshops/mentorship, and current AI/technology content leadership. The site treats this as part of the same operating loop—learn deeply, build, then explain—rather than as a separate influencer identity.",
    tags: ["content", "teaching", "education", "brainly", "youtube", "creator", "yaas", "mentor", "communication"],
    strength: "PUBLIC PROFILE",
    links: [
      { label: "Creator chapter", href: "/content" },
      { label: "Timeline", href: "/timeline" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/chandanpandeys/" },
    ],
  },
  {
    id: "public",
    title: "What is publicly inspectable right now?",
    answer: "The strongest public evidence currently includes ByteToken, InferBench, DekhoSuno, OneClickAllResultsBot, IBM internship projects, the automation repository, OfferClaw, AI PPT Generator, and the portfolio source itself. Private or unpublished repositories are intentionally excluded from public evidence until they are cleaned and explicitly released.",
    tags: ["public", "github", "inspectable", "source", "repository", "evidence", "projects"],
    strength: "INSPECTABLE",
    links: [
      { label: "Work index", href: "/work" },
      { label: "Lab", href: "/lab" },
      { label: "GitHub", href: "https://github.com/chandanpandeys" },
    ],
  },
];
