export type Project = {
  slug: string;
  name: string;
  strapline: string;
  category: string;
  year: string;
  status: "public" | "case-study";
  summary: string;
  problem: string;
  work: string[];
  evidence: string[];
  stack: string[];
  github?: string;
};

export const projects: Project[] = [
  {
    slug: "bytetoken",
    name: "ByteToken",
    strapline: "Tokenizer-aware transport and context optimization for AI agents.",
    category: "AI Infrastructure",
    year: "2026",
    status: "public",
    summary:
      "A research-and-engineering project exploring denser, lossless binary-data transport through LLM token sequences for agent and MCP workflows.",
    problem:
      "Agent systems routinely move structured data, logs, binary payloads, and tool output through context windows where conventional encodings can be expensive in tokens.",
    work: [
      "Explored tokenizer-aware encoding modes and non-merging atomic token sets.",
      "Built benchmarks across structured and binary payloads instead of relying on synthetic claims alone.",
      "Added CLI, profiling, MCP-oriented workflows, compatibility experiments, and native acceleration paths.",
    ],
    evidence: [
      "Public repository with reproducible benchmark code and implementation details.",
      "Benchmarks document token savings across JSON, logs, CSV, code, embeddings, and random binary payloads.",
    ],
    stack: ["Python", "LLM tokenization", "MCP", "CLI tooling", "CFFI", "Rust/PyO3"],
    github: "https://github.com/chandanpandeys/bytetoken",
  },
  {
    slug: "epitopepred",
    name: "EpitopePred",
    strapline: "An asynchronous computational vaccine-design platform.",
    category: "AI × Computational Biology",
    year: "2026",
    status: "case-study",
    summary:
      "A web-based immunoinformatics workflow for multi-stage epitope prediction, screening, and vaccine-design research.",
    problem:
      "Bioinformatics workflows can combine many long-running tools and scientific stages, making them difficult to orchestrate through a conventional request-response web application.",
    work: [
      "Built and integrated a Next.js frontend for sequence submission, strategy configuration, job tracking, results, and downloads.",
      "Connected the product workflow to FastAPI, Celery, and Redis so long-running computational jobs execute asynchronously.",
      "Worked across integrations including BLAST+, NetMHCpan, NetMHCIIpan, NetChop, SignalP, DeepTMHMM, and ESMFold.",
      "Optimized a dipeptide-composition path by replacing nested loops with vectorized counting, producing an approximately 400× improvement in that operation.",
    ],
    evidence: [
      "Project work is documented in the master resume and research experience record.",
      "Portfolio publication will include screenshots, architecture, and public artifacts once cleared for release.",
    ],
    stack: ["Next.js", "FastAPI", "Celery", "Redis", "Docker", "Python", "ESM", "Bioinformatics"],
  },
  {
    slug: "dekhosuno",
    name: "DekhoSuno",
    strapline: "AI accessibility companion for sensory impairments.",
    category: "Applied AI / Accessibility",
    year: "2025 — 2026",
    status: "public",
    summary:
      "A Flutter application combining conversational AI, computer vision, OCR, speech, hardware sensors, and accessible interaction patterns.",
    problem:
      "People with visual or hearing impairments often need multiple disconnected tools for scene understanding, transcription, reading, navigation, and environmental awareness.",
    work: [
      "Designed separate Dekho and Suno modes for hearing- and visually-impaired workflows.",
      "Integrated Gemini, ML Kit, speech-to-text, TTS, OCR, camera, haptics, wake-word interaction, and geolocation.",
      "Prototyped features such as scene description, live subtitles, text reading, environmental alerts, currency recognition, and guided navigation.",
    ],
    evidence: [
      "Public GitHub repository documents architecture, feature flows, controls, and setup.",
      "The project is structured as an accessibility system rather than a single AI feature demo.",
    ],
    stack: ["Flutter", "Dart", "Gemini", "ML Kit", "Speech-to-Text", "OCR", "Computer Vision"],
    github: "https://github.com/chandanpandeys/DekhoSuno",
  },
  {
    slug: "oneclickallresultsbot",
    name: "OneClickAllResultsBot",
    strapline: "Batch academic-result retrieval and analysis.",
    category: "Automation",
    year: "2024",
    status: "public",
    summary:
      "An automation project built to turn repetitive university result lookup into a batch workflow with comparative analysis.",
    problem:
      "Checking many student results individually creates repetitive manual work and makes class-level comparison difficult.",
    work: [
      "Automated retrieval of 100+ student results from the university result portal.",
      "Used batch processing and structured presentation to reduce repetitive result collection.",
      "Added analysis and visualization so students could compare performance across peers.",
    ],
    evidence: [
      "Public repository is available on GitHub.",
      "The master resume records a 90% reduction in manual data-entry effort for the workflow.",
    ],
    stack: ["Python", "BeautifulSoup", "Requests", "Data visualization"],
    github: "https://github.com/chandanpandeys/OneClickAllResultsBot",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
