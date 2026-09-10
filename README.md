# Chandan Pandey — Digital Identity

The source code, evidence graph, resume system, and machine-readable identity layer behind my portfolio.

## What this project does

This site is designed to do four things well:

1. Give recruiters and engineers a fast, evidence-backed view of my work.
2. Turn selected projects into engineering case studies rather than screenshots and skill tags.
3. Give search engines a technically clean identity to index.
4. Give AI systems structured context with explicit provenance and evidence strength.

The interactive studio uses graphite, acid lime, large typography, a lazy-loaded Three.js orbital sculpture, real project screenshots and embedded creator work. Reduced motion, pause controls and a static asset keep the entry experience accessible.

## Core architecture

- **Next.js 16.3.4 / React 19.2 / TypeScript**
- App Router with static/server-first rendering
- Custom CSS design system
- Evidence-first project data in `lib/projects.ts`
- Career chronology in `lib/experience.ts`
- Shared Ask/evidence graph in `lib/evidence.ts`
- Selected credential records in `lib/credentials.ts`
- Role-specific resume data in `lib/resume-data.ts`
- Server-side PDF generation with `pdf-lib`
- Generated app icon, web manifest, Open Graph image, theme metadata, and custom 404
- GitHub Actions: identity checks → typecheck → production build

## Information architecture

- `/` — umbrella identity with AI / Content / Complete entry points
- `/ai` — AI Engineering & Research, selected technical evidence and engineering/research resumes
- `/work` — curated flagship/selected work
- `/work/[slug]` — architecture, measurements, artifacts, source links, evidence, stack
- `/lab` — supporting experiments and earlier public work
- `/timeline` — career, research, education, community, creator chronology
- `/about` — the explain → research → systems through-line
- `/content` — AI Content & Technical Communication; professional context and explanations first, creator history at `#teaching`
- `/now` — current allocation of attention
- `/resume` — canonical web resume + targeted PDF variants
- `/credentials` — selected evidence-backed credentials
- `/ask` — conversational evidence navigator with optional free browser AI; `?intent=ai` and `?intent=content` customize prompts, suggestions and relevant-result ranking. Unknown intent falls back to Complete; source strengths never change.

### Machine-readable surfaces

- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/profile.json`
- `/evidence.json`
- `/manifest.webmanifest`

`/profile.json` is the structured identity contract. `/evidence.json` is the retrieval/provenance contract behind Ask Chandan.

## Flagship technical stories

### ByteToken

Tokenizer-aware transport/context optimization for AI-agent and MCP payloads. The portfolio distinguishes raw encoding savings from compression-assisted savings and links to the reproducible public benchmark implementation.

### BenchWolf

Local-LLM evaluation across hardware preflight, model fit, speed, memory, power/energy, quality, comparison, and reporting.

### EpitopePred

Asynchronous computational vaccine-design workflow using Next.js, FastAPI, Celery, Redis, and scientific-tool integrations. It is explicitly labelled **documented / first-party** while the research source remains private.

## Evidence model

The site does not flatten every claim into “verified.” Evidence is labelled by source strength:

- **INSPECTABLE** — public source/repository can be opened and reviewed.
- **PUBLIC PROFILE** — public professional record.
- **FIRST-PARTY / DOCUMENTED** — source material exists, but is not presented as independently public evidence.

Private repositories and unpublished work stay private unless intentionally cleared.

## Resume system

The HTML resume is the primary hiring surface. Three readable recruiter variants are generated server-side from structured data:

- `/resume/pdf/ai-llm-engineer`
- `/resume/pdf/ai-research-ml`
- `/resume/pdf/ai-content-developer-educator`

The PDF endpoints carry `X-Robots-Tag: noindex, noarchive` so contact details do not become standalone search results.

## Search + AI identity

The site includes:

- canonical URLs derived from the production deployment, with an optional custom-domain override
- `Person` + `ProfilePage` JSON-LD
- project-level `SoftwareSourceCode` / `CreativeWork` JSON-LD
- credential `EducationalOccupationalCredential` JSON-LD
- per-project Open Graph metadata
- branded social preview image + generated app icon
- web manifest + theme metadata
- explicit crawler/search surfaces
- evidence and curation semantics in machine-readable JSON

## Local development

```bash
npm install
npm run dev
```

Validation:

```bash
npm run verify:identity
npm run typecheck
npm run build
```

## Design principle

> Claims should have proof. Projects should have depth. A portfolio should reveal how someone thinks—not just list tools.

## Dual-vertical validation

Run `npm run verify:identity`, `npm run typecheck`, and `npm run build`. With the production server running (`npm start`), run `node scripts/verify-verticals.mjs` to check audience routes, metadata, generated preview images, resume PDFs, Ask intent defaults and machine-readable routing. Set `TEST_ORIGIN` to test another local server address.

## Optional AI and channel statistics

Ask works immediately from the curated public evidence graph. Visitors may explicitly download Qwen2.5-0.5B through WebLLM for experimental local synthesis (WebGPU and several hundred MB required). Source records appear immediately while the model works. Streaming generation supports recovery after an interrupted request; model text is displayed only after the complete response passes validation. The model can produce terse or invalid responses, so source records remain available when generation times out or validation fails. Raw personal archives are never bundled or retrieved.

For optional hosted synthesis, configure the server-only `GEMINI_API_KEY` and optionally `GEMINI_MODEL` (default `gemini-3.7-flash`). Visitors opt in before questions, recent messages and public evidence are sent to Google. Provider free-tier availability and quotas may change. The route has bounded input, a timeout, source/citation checks and an in-instance rate limit; use provider quotas or deployment-level limits for distributed traffic. Never expose keys in client environment variables.

Configure `YOUTUBE_API_KEY` to refresh the public Chanakya Education Centre channel statistics through the official API with an hourly cache. Without it, the site clearly displays dated public snapshots. Instagram/LinkedIn reach, private analytics and professional endorsements require authorized evidence; none are invented.

`npm run verify:behavior` checks retrieval, follow-ups, contribution wording, synthesis validation and resume variant handling. `node scripts/verify-verticals.mjs` checks the running production surfaces.

## Public content boundaries

The credential gallery includes original Google Student Ambassador participation, IIT Bombay Campus Ambassador completion and NEC 2025 team-result documents, plus Internshala webinar participation and the existing AI training certificates. Public copies of the first three PDFs and their previews are served locally. Infosys Springboard learning is a separate set of 19 certificate-issued notifications (June 2025): issuer course links are labelled as course pages, not public certificate-verification links, and the individual PDFs still require export. Mailbox contents and private notification identifiers are excluded.

EpitopePred is a research contribution, not a personally owned product. BenchWolf demo output is illustrative and memory readings are system-wide. ByteToken numbers identify one published Playground example; local DirectID experiments are separate from text transport. OfferClaw and Portable AI Memory link to public software, never personal job-search or conversation data. Certificate links point only to already-public first-party originals. Unverified school awards, private registration data and raw ChatGPT exports are excluded.
