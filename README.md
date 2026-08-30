# Chandan Pandey — Digital Identity

The source code, evidence graph, resume system, and machine-readable identity layer for Chandan Pandey.

**Intended canonical domain:** `chandanpandey.dev`  
**Current status:** active v1 development on `build/portfolio-v1`; final domain + production deployment are intentionally not live yet.

## What this project is

This is not a generic portfolio template. It has four jobs:

1. Give recruiters and engineers a fast, evidence-backed understanding of Chandan Pandey.
2. Turn selected projects into real engineering case studies rather than screenshots and skill tags.
3. Give search engines one technically clean canonical identity to index.
4. Give AI systems structured, crawlable context with explicit provenance and evidence strength.

The design language is editorial rather than cyberpunk: warm paper, cobalt signal color, technical grid language, restrained motion, and evidence-bearing visuals.

## Preview the active branch

[Open `build/portfolio-v1` in StackBlitz](https://stackblitz.com/github/chandanpandeys/digital-identity/tree/build/portfolio-v1?startScript=dev)

The permanent production topology will use one clean Vercel project after the final domain is attached.

## Core architecture

- **Next.js 16.2.9 / React 19.2 / TypeScript**
- App Router with static/server-first rendering
- Custom CSS design system; no portfolio template dependency
- Evidence-first project data in `lib/projects.ts`
- Career chronology in `lib/experience.ts`
- Shared Ask/evidence graph in `lib/evidence.ts`
- Selected credential records in `lib/credentials.ts`
- Role-specific resume data in `lib/resume-data.ts`
- Server-side PDF generation with `pdf-lib`
- Branded metadata surfaces: generated app icon, web manifest, theme viewport, custom 404
- GitHub Actions install → identity checks → typecheck → production build

## Information architecture

- `/` — identity homepage + selected work
- `/work` — curated flagship/selected work index
- `/work/[slug]` — architecture, measurements, artifacts, source links, evidence, stack
- `/lab` — supporting experiments and earlier public work
- `/timeline` — career, research, education, community, creator chronology
- `/about` — the explain → research → systems through-line
- `/content` — creator/technical-communication chapter
- `/now` — current allocation of attention
- `/resume` — canonical web resume + three targeted PDF variants
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
Asynchronous computational vaccine-design workflow using Next.js, FastAPI, Celery, Redis, and scientific-tool integrations. It remains explicitly labelled **documented / first-party** until sanitized public artifacts exist.

## Evidence model

The site does not flatten every claim into “verified.” Evidence is labelled by source strength:

- **INSPECTABLE** — public source/repository can be opened and reviewed.
- **PUBLIC PROFILE** — public professional record.
- **FIRST-PARTY / DOCUMENTED** — source material exists, but it is not presented as independently public evidence.

Private repositories and unpublished work stay private unless intentionally cleared.

## Resume system

The HTML resume is the canonical hiring surface. Three one-page recruiter variants are generated server-side from structured data:

- `/resume/pdf/ai-llm-engineer`
- `/resume/pdf/ai-research-ml`
- `/resume/pdf/ai-content-developer-educator`

The PDF endpoints are downloadable but carry `X-Robots-Tag: noindex, noarchive` so contact details do not become standalone search results.

## Search + AI identity

The site includes:

- environment-driven canonical URLs via `NEXT_PUBLIC_SITE_URL`
- `Person` + `ProfilePage` JSON-LD
- project-level `SoftwareSourceCode` / `CreativeWork` JSON-LD
- credential `EducationalOccupationalCredential` JSON-LD
- per-project Open Graph metadata
- branded social preview image + generated app icon
- web manifest + theme viewport metadata
- custom 404 that routes visitors back into the identity graph
- explicit crawler/search surfaces
- evidence and curation semantics in machine-readable JSON

The intended fallback canonical is `https://chandanpandey.dev`, but production should set `NEXT_PUBLIC_SITE_URL` explicitly.

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

## Release gate

Before v1 is merged into `main`:

- final domain must be purchased/attached explicitly
- one clean Vercel project must be created
- production machine routes, app metadata, and Open Graph output must be verified
- any credential artifact made public must have intentional sharing permissions
- EpitopePred must either gain sanitized public artifacts or keep its first-party label
- Search Console / Bing setup happens only after the final domain resolves

The active PR stays draft until those release decisions are complete.
