# Interactive portfolio studio — design QA

Review date: 9 September 2026.

## Visual target and evidence

- Source visual: `../../../generated_images/01a07323-9a43-71d3-96cc-5279bd719bee/exec-4bce45a1-6096-4ea7-8711-d84b7c4e181f.png` (1487 × 1058 pixels).
- Implementation: `http://localhost:3000/`, production build, dark theme, page top, default artwork state.
- Final screenshots: `../portfolio-private/qa/home-production-desktop.jpg` and `../portfolio-private/qa/home-production-mobile.jpg`. QA artifacts remain local and are not portfolio content.
- Desktop CSS viewport: 1487 × 1058, DPR 1; captured content: 1472 × 931 pixels. Mobile CSS viewport: 390 × 844, DPR 1; captured content: 375 × 812 pixels. The in-app capture excludes its scrollbar and part of the requested frame. The comparison uses the overlapping hero region at near-equal width, not a false full-frame pixel-difference score. No raster resizing was applied.
- Supporting captures: `content-reels-desktop.png`, `credentials-mobile.png`, `home-320-final.png`, and the six rendered resume pages in the same local QA directory.
- The source and rendered homepage were supplied together for visual comparison. Responsive layouts are adaptations: the source has no mobile composition. Browser capture scaling can soften desktop text, so typography was also inspected in the DOM and the sharp mobile capture.

## Findings and iteration history

1. **Resolved P1 — hero typography and imagery.** The first implementation used a lighter headline and an automatically loaded simple 3D scene. The selected direction uses a bold headline and a detailed metallic orbital sculpture. Increased display weight to 650, restored the generated artwork as the default, and made actual Three.js exploration an explicit control. Post-fix comparison preserves the source's major regions and visual hierarchy.
2. **Resolved P2 — cropped 3D rings.** Adjusted the camera distance and geometry. Explore, pause/resume and return-to-artwork controls were exercised. Reduced-motion visitors receive static artwork by default and a paused scene if they choose 3D.
3. **Resolved P1 — project proof image.** Removed obsolete ByteToken image URLs and the unsupported compression illustration. The case study now shows the actual published Playground comparison, with transport modes and example-specific numbers qualified in adjacent copy.
4. **Resolved P2 — Instagram crops.** Increased embed height to show actual reel covers and native profile/interaction context. The three reels render together on desktop and stack on mobile; original post links remain available.
5. **Resolved P2 — resume pagination.** Reworked PDF layout so all three variants occupy two readable A4 pages, with clickable links and no clipped lines. All six rendered pages were inspected.
6. **Resolved P2 — narrow mobile overflow.** At 320 CSS pixels the hero and header exceeded the available width. Added a narrow breakpoint with smaller display text and compact navigation. The post-fix DOM measurement and screenshot show no horizontal overflow.
7. **Resolved P1 — Ask recovery and irrelevant retrieval.** Exact project names now resolve directly to their records. WebLLM's streaming request path resets interruption state; source records appear immediately while synthesis runs. Verified a browser-generated cited OfferClaw answer, stop/restart recovery, and fallback for an invalid research-ownership answer. Trivial name-only responses are rejected.

## Required fidelity surfaces

- **Fonts and typography:** large sans-serif display hierarchy, compact navigation and restrained small labels match the selected direction. Heading weight, line breaks, mobile wrapping and PDF body text were checked. Font antialiasing is assessed with capture-density limitations in mind.
- **Spacing and layout:** open two-column hero, right-hand sculpture, social rail, clear AI/Content CTAs and lower project grid retain the source composition. Mobile places artwork after the CTAs. No persistent controls overflow at the checked 320- and 390-pixel widths.
- **Colors and tokens:** graphite backgrounds, near-white type and acid-lime emphasis are consistent across the home, AI, Content, credentials, resumes and Ask surfaces. Focus states and reduced-motion rules are included.
- **Image quality:** the default hero uses a generated raster asset, not a code approximation. The optional 3D scene is a separate requested interaction. Real project media, native reel embeds, YouTube covers/players and original certificate previews replace placeholders. Original links remain available when a third-party embed is blocked.
- **Copy and content:** mockup-only claims were discarded. ByteToken describes token transport; OfferClaw describes an experimental career workspace. EpitopePred remains a contribution. Dated public counts are distinguished from live API results. No private chat archive, student contacts, invented awards or unsupported reach figures are published.

Focused checks covered small navigation labels, mobile wrapping, reel crops, source cards, certificate buttons and PDF typography. These details were readable in the focused mobile/media/PDF captures; the full hero comparison alone was not used to judge them.

## Interaction and technical checks

- AI, Content and Complete entry routes; desktop and mobile navigation; vertical-specific Ask and resume links.
- 3D load, pause/resume and artwork return; mobile menu open/navigation.
- Three original Instagram reels and three YouTube entries; native YouTube player opened with the correct title and duration. Sustained video playback and every browser's third-party-cookie policy were not tested.
- Original certificate links and embedded previews; three PDFs with two pages each and working link annotations.
- Ask intent, source expansion, immediate answers, unknown-topic fallback, stop/restart and browser synthesis. The small local model is experimental and may fall back; it is not represented as universally reliable AI.
- Identity verification, TypeScript, eight behavior checks, production build and production HTTP route checks are recorded with the release.

## Remaining limits

- Hosted Gemini synthesis has no configured server key and was not live-tested. Browser-model response quality varies by device and question; source validation is a guard, not a guarantee that every model sentence is accurate.
- YouTube's official API needs a server key for automatic refresh. Public snapshots are visibly dated; Instagram/LinkedIn private analytics require authorized exports or API access.
- Missing award proofs, exact career dates, additional freelance evidence and the full Notansun presentation remain on a private collection checklist.
- This review does not establish public production deployment, search rankings, WCAG certification or a Lighthouse score.

## Final comparison

The source and final production desktop capture were displayed together after all visual fixes. The bold headline, graphite/lime palette, orbital artwork, two entry CTAs and social rail preserve the selected direction. Expected adaptations are the more compact navigation with Credentials and Ask, button-style CTAs, the newly generated orbital artwork, and the AI/Content/Complete selector preceding project cards. These support the requested portfolio journeys and are accepted differences, not a claim of pixel-identical reproduction.

The final mobile capture has clear heading wraps, two visible CTAs, uncropped artwork and usable navigation. No homepage warning/error console entries were recorded. Identity verification passed (19 surfaces, 66 files); typecheck passed; all eight behavior tests passed; the production build exited 0 with 32 generated pages; the production HTTP suite passed routes, metadata, preview images, PDFs, Ask intents, API bounds, contribution wording, originals, redirects and social data.

No actionable P0/P1/P2 visual findings remain. Device-dependent local AI quality, unconfigured hosted/API options and missing personal proofs remain explicitly documented above.

final result: passed

## Credential expansion — 10 September 2026

The gallery contains six original-document records, including Google Student Ambassador participation, IIT Bombay Campus Ambassador completion, NEC 2025 team Rank 153 and Internshala webinar participation. Three already-public originals are now served as unmodified PDFs with local image previews. The Google source image and desktop rendering were compared together; the whole document remains contained without stretching or cropping.

Infosys Springboard has 19 issuer-email-supported records in a separate section. Notification dates and issuer course links are explicitly distinguished from public certificate-verification links. Individual Infosys PDFs remain unavailable in this release. Private messages and discovery files are not published.

Final validation passed: identity (19 surfaces, 67 files), nine behavior tests, typecheck, production build (32 generated pages), and production HTTP checks including the three PDFs and PNGs. Desktop at 1440px and mobile at 390px have no horizontal overflow. The mobile Infosys grid wraps cleanly in one column. The rebuilt browser page shows direct PDF buttons and separate Drive source links. This addendum does not assert a production promotion.
