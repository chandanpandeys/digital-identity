export type ProjectStage = {
  step: string;
  title: string;
  detail: string;
};

export type ProjectMetric = {
  label: string;
  baseline?: string;
  result: string;
  note?: string;
};

export type Project = {
  slug: string;
  name: string;
  strapline: string;
  category: string;
  year: string;
  status: "public" | "case-study";
  tier: "flagship" | "selected";
  summary: string;
  problem: string;
  work: string[];
  evidence: string[];
  stack: string[];
  github?: string;
  sourceNote?: string;
  architecture?: ProjectStage[];
  metrics?: ProjectMetric[];
};

export const projects: Project[] = [
  {
    slug: "bytetoken",
    name: "ByteToken",
    strapline: "Tokenizer-aware transport and context optimization for AI agents.",
    category: "AI Infrastructure",
    year: "2026",
    status: "public",
    tier: "flagship",
    summary:
      "A research-and-engineering project exploring denser, lossless binary-data transport through LLM token sequences for agent and MCP workflows.",
    problem:
      "Agent systems routinely move structured data, logs, binary payloads, and tool output through context windows where conventional encodings such as Base64 can be expensive in tokens.",
    work: [
      "Explored tokenizer-aware encoding modes built around non-merging atomic token sets.",
      "Built reproducible benchmarks across structured and binary payloads using live o200k_base token counts.",
      "Separated raw encoding gains from compression gains so benchmark claims remain interpretable.",
      "Added CLI, context profiling, MCP-oriented workflows, compatibility experiments, integrity checks, and native acceleration paths.",
    ],
    evidence: [
      "Public repository contains the implementation, benchmark generator, tests, CI, CLI examples, and reproduction instructions.",
      "The real-world benchmark script generates JSON, pytest, CSV, source-code, Docker-log, embedding, and random-binary payloads and counts them with tiktoken.",
    ],
    architecture: [
      { step: "01", title: "Payload", detail: "Structured data, logs, embeddings, source code, or arbitrary bytes enter as a byte sequence." },
      { step: "02", title: "Compress when useful", detail: "Compressible payloads can be reduced first; incompressible binary can bypass this stage." },
      { step: "03", title: "Bit packing", detail: "Bytes are packed into denser fixed-width symbols instead of being expanded into Base64 text." },
      { step: "04", title: "Atomic-token mapping", detail: "Symbols map onto tokenizer atoms selected to avoid unwanted BPE merging and fragmentation." },
      { step: "05", title: "Agent / MCP transport", detail: "The encoded string travels through a prompt, tool call, or agent-to-agent context boundary." },
      { step: "06", title: "Lossless decode", detail: "The receiver maps tokens back to packed values, restores bytes, and optionally decompresses the original payload." },
    ],
    metrics: [
      { label: "JSON API response", baseline: "18,574 Base64 tokens", result: "11,919 ByteToken-15 · 728 with LZMA", note: "o200k_base benchmark; 35.8% raw encoding reduction, 96.1% with compression." },
      { label: "CSV analytics", baseline: "24,524 Base64 tokens", result: "14,924 ByteToken-15 · 885 with LZMA", note: "39.1% raw encoding reduction; 96.4% with compression." },
      { label: "Docker build log", baseline: "9,996 Base64 tokens", result: "6,456 ByteToken-15 · 509 with LZMA", note: "35.4% raw encoding reduction; 94.9% with compression." },
      { label: "Random 5 KB binary", baseline: "4,535 Base64 tokens", result: "2,797 ByteToken-15 · 2,854 with LZMA", note: "38.3% raw encoding reduction; compression provides no benefit on incompressible data." },
    ],
    sourceNote:
      "Benchmark numbers are reproduced from the public ByteToken benchmark table and benchmark_realworld.py. The large 90%+ figures are compression + encoding results, not raw ByteToken encoding alone.",
    stack: ["Python", "tiktoken", "LLM tokenization", "MCP", "CLI tooling", "CFFI", "Rust/PyO3"],
    github: "https://github.com/chandanpandeys/bytetoken",
  },
  {
    slug: "inferbench",
    name: "InferBench",
    strapline: "Local-LLM benchmarking across speed, memory, power, and quality.",
    category: "AI Evaluation / Developer Tooling",
    year: "2026",
    status: "public",
    tier: "flagship",
    summary:
      "A cross-platform Python CLI for deciding what local language models a machine can run and measuring the trade-offs once inference starts.",
    problem:
      "Local-model decisions are rarely about tokens-per-second alone. A useful edge benchmark also needs to reason about fit, latency, thermal behavior, memory pressure, energy use, and model quality on the same machine.",
    work: [
      "Built hardware preflight that inspects CPU, GPU/NPU, RAM, storage, and estimated memory-bandwidth constraints before model download.",
      "Combined generation speed, prompt processing, time-to-first-token, memory, power/energy, and compact quality evaluations in one CLI workflow.",
      "Added comparison, benchmark history, exports, model-sizing metadata, and a composite Edge Score for quick decision support.",
      "Kept the project inspectable with public source, tests, CI, packaging metadata, and documented security caveats for generated-code evaluation.",
    ],
    evidence: [
      "Public repository documents the CLI, hardware preflight, supported measurements, quality suite, cross-platform targets, and installation flow.",
      "Source tree includes dedicated preflight, CLI, reporting, leaderboard, model metadata, and benchmark test modules.",
    ],
    architecture: [
      { step: "01", title: "Hardware discovery", detail: "Detect the machine, usable memory, compute devices, architecture, and bandwidth constraints." },
      { step: "02", title: "Preflight model fit", detail: "Estimate whether candidate models fit before weights are downloaded or a benchmark begins." },
      { step: "03", title: "Inference runner", detail: "Execute local inference through supported backends and split prompt processing from generation behavior." },
      { step: "04", title: "Telemetry", detail: "Collect latency, throughput, memory pressure, power/energy, and thermal signals where the platform exposes them." },
      { step: "05", title: "Quality checks", detail: "Optionally run compact knowledge and coding evaluations so speed is not treated as the only objective." },
      { step: "06", title: "Decision layer", detail: "Normalize results into reports, comparisons, history, exports, and the composite Edge Score." },
    ],
    metrics: [
      { label: "Speed", result: "Generation tok/s · prompt tok/s · TTFT", note: "Includes sustained-performance and reasoning-token telemetry described by the project." },
      { label: "Memory", result: "Peak RAM · model footprint · utilization pressure", note: "Preflight also models whether candidate weights are likely to fit." },
      { label: "Power", result: "Watts · tok/s/W · energy per token", note: "Availability and precision depend on hardware/platform telemetry." },
      { label: "Quality", result: "mini-MMLU + mini-HumanEval", note: "Generated-code evaluation executes locally; the repository explicitly warns users about untrusted models." },
    ],
    sourceNote:
      "This case study deliberately avoids the repository README's comparative 'only tool' claim and treats sample benchmark output as illustrative unless a reproducible result artifact is linked.",
    stack: ["Python", "Ollama", "llama.cpp", "CLI", "Hardware telemetry", "MMLU", "HumanEval"],
    github: "https://github.com/chandanpandeys/inferbench",
  },
  {
    slug: "epitopepred",
    name: "EpitopePred",
    strapline: "An asynchronous computational vaccine-design platform.",
    category: "AI × Computational Biology",
    year: "2026",
    status: "case-study",
    tier: "flagship",
    summary:
      "A web-based immunoinformatics workflow for multi-stage epitope prediction, screening, and vaccine-design research.",
    problem:
      "Bioinformatics workflows can combine many long-running tools and scientific stages, making them difficult to orchestrate through a conventional request-response web application.",
    work: [
      "Built and integrated a Next.js frontend for sequence submission, strategy configuration, job tracking, results, and downloads.",
      "Connected the product workflow to FastAPI, Celery, and Redis so long-running computational jobs execute asynchronously.",
      "Worked across integrations including BLAST+, NetMHCpan, NetMHCIIpan, NetChop, SignalP, DeepTMHMM, and ESMFold.",
      "Optimized a dipeptide-composition path by replacing nested loops with vectorized counting; the first-party project record reports an approximately 400× improvement for that operation.",
    ],
    evidence: [
      "Project architecture and implementation work are documented in first-party career and research records supplied for this portfolio.",
      "The underlying project is not yet presented as a public repository, so the site distinguishes documented work from publicly inspectable code.",
    ],
    architecture: [
      { step: "01", title: "Sequence + strategy input", detail: "A researcher submits sequence data and configures the analysis path through the web interface." },
      { step: "02", title: "API validation", detail: "FastAPI validates requests and creates a durable job rather than holding a long HTTP request open." },
      { step: "03", title: "Async orchestration", detail: "Celery workers and Redis coordinate long-running scientific tasks and expose job progress to the frontend." },
      { step: "04", title: "Scientific toolchain", detail: "The pipeline integrates multiple immunoinformatics and structural-analysis tools according to the requested stages." },
      { step: "05", title: "Scoring + filtering", detail: "Feature extraction, model/scoring steps, and filtering narrow candidate epitopes and downstream outputs." },
      { step: "06", title: "Results layer", detail: "The UI polls job state and renders tables, downloadable artifacts, visual outputs, and structure files when produced." },
    ],
    metrics: [
      { label: "Async execution", result: "FastAPI → Celery → Redis workers", note: "Architecture choice keeps long-running scientific jobs out of the request-response path." },
      { label: "Tool integration", result: "15+ scientific tools in the project record", note: "Includes BLAST+, NetMHC family tools, NetChop, SignalP, DeepTMHMM, ESMFold, and related pipeline stages." },
      { label: "Vectorized feature path", baseline: "Nested-loop implementation", result: "~400× operation-level improvement", note: "First-party project record; should remain qualified until a public benchmark artifact is published." },
    ],
    sourceNote:
      "EpitopePred is intentionally labelled documented work. Public screenshots, source, benchmark notebooks, or a sanitized demo should be attached before stronger verification language is used.",
    stack: ["Next.js", "FastAPI", "Celery", "Redis", "Docker", "Python", "ESM", "Bioinformatics"],
  },
  {
    slug: "dekhosuno",
    name: "DekhoSuno",
    strapline: "AI accessibility companion for sensory impairments.",
    category: "Applied AI / Accessibility",
    year: "2025 — 2026",
    status: "public",
    tier: "selected",
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
    tier: "selected",
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
      "The first-party master resume records a 90% reduction in manual data-entry effort for the workflow; the site does not treat that number as independently verified.",
    ],
    stack: ["Python", "BeautifulSoup", "Requests", "Data visualization"],
    github: "https://github.com/chandanpandeys/OneClickAllResultsBot",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
