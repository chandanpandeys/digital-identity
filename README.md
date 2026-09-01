# Chandan Pandey — Digital Identity

The source code, evidence graph, resume system, and machine-readable identity layer behind my portfolio.

## What this project does

This site is designed to do four things well:

1. Give recruiters and engineers a fast, evidence-backed view of my work.
2. Turn selected projects into engineering case studies rather than screenshots and skill tags.
3. Give search engines a technically clean identity to index.
4. Give AI systems structured context with explicit provenance and evidence strength.

The visual system is editorial: warm paper, cobalt accents, technical grid language, restrained motion, and evidence-bearing visuals.

## Core architecture

- **Next.js 16.2.9 / React 19.2 / TypeScript**
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

- `/` — identity homepage + selected work
- `/work` — curated flagship/selected work
- `/work/[slug]` — architecture, measurements, artifacts, source links, evidence, stack
- `/lab` — supporting experiments and earlier public work
- `/timeline` — career, research, education, community, creator chronology
- `/about` — the explain → research → systems through-line
- `/content` — creator and technical-communication chapter
- `/now` — current allocation of attention
- `/resume` — canonical web resume + targeted PDF variants
- `/credentials` — selected evidence-backed credentials
- `/ask` — deterministic evidence navigator

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

### InferBench

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

The HTML resume is the primary hiring surface. Three one-page recruiter variants are generated server-side from structured data:

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
