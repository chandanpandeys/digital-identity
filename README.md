# Chandan Pandey — Digital Identity

The source code and structured knowledge layer behind **chandanpandeys.me**.

## Preview the current build

[Open the `build/portfolio-v1` branch in StackBlitz](https://stackblitz.com/github/chandanpandeys/digital-identity/tree/build/portfolio-v1?startScript=dev)

StackBlitz imports this public GitHub branch, installs the dependencies, runs `npm run dev`, and gives you a live browser preview. The GitHub repository remains the source of truth.

This is not being designed as a generic portfolio template. The project has three jobs:

1. Give humans a fast, evidence-backed understanding of Chandan Pandey.
2. Give search engines a technically clean canonical identity to index.
3. Give AI systems structured, crawlable context through semantic pages and machine-readable endpoints.

## Stack

- Next.js 16 App Router
- React 19
- TypeScript
- Static/server-first rendering
- Custom CSS design system
- Metadata API + canonical URLs
- Person JSON-LD
- `robots.txt`, `sitemap.xml`, `/llms.txt`, `/profile.json`

## Information architecture

- `/` — identity + selected work
- `/work` — project index
- `/work/[slug]` — evidence-first case studies
- `/about` — complete narrative
- `/now` — current direction
- `/resume` — curated web resume
- `/llms.txt` — concise machine-readable identity
- `/profile.json` — structured source-of-truth profile

## Design principle

> Claims should have proof. Projects should have depth. A portfolio should reveal how someone thinks—not just list tools.

## Content policy

Public claims are built from first-party resume/LinkedIn material, public repositories, project artifacts, and verified credentials. Private repositories and unpublished work stay private unless explicitly cleared for publication.
