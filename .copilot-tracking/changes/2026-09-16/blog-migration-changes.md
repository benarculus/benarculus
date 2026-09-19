<!-- markdownlint-disable-file -->
# RPI Changes: Blog migration

## Metadata

* Task ID: BLOG-MIGRATION-001
* Related plan: [.copilot-tracking/plans/2026-09-16/blog-migration-plan.md](../../plans/2026-09-16/blog-migration-plan.md)
* Implementation date: 2026-09-17

## Execution Status

* Status: Partial
* Declared invocation scope: full plan
* Completed scope markers: P01 through P04, including P01-T01 through P04-T03
* All remaining active-plan markers: P05-T03
* Status basis: The site, content migration, tests, documentation, workflows, Pages configuration, repository safeguards, owner-side inventory, and owner-approved quality validation are complete. Deployment from merged `main` and the explicitly owner-approved DNS cutover remain.

## Execution Summary

The repository now contains a typed static Astro site, validated Markdown content, migrated local media, an accessible editorial design, deterministic tests and builds, supply-chain policy, and a least-privilege GitHub Pages deployment. Live repository safeguards are active. The local mock-up is available in the browser canvas for visual acceptance.

## Completed Work

### Hardened repository defaults before source introduction

* Related phase or task: P01-T01
* Files:
  * No production files; GitHub repository settings were updated.
* What changed and why: Changed default Actions permissions from write to read, disabled Actions approval of pull requests, and enabled secret scanning plus push protection.
* Completion evidence: GitHub API verification returned `default_workflow_permissions: read`, `can_approve_pull_request_reviews: false`, `secret_scanning: enabled`, and `secret_scanning_push_protection: enabled`.
* Validation: Passed through immediate read-back of the live repository settings.

### Built the static Astro and Markdown foundation

* Related phase or task: P01-T02 through P01-T04
* Files:
  * [`package.json`](../../../package.json)
  * [`package-lock.json`](../../../package-lock.json)
  * [`astro.config.mjs`](../../../astro.config.mjs)
  * [`src/content.config.ts`](../../../src/content.config.ts)
  * [`src/lib/content-schema.ts`](../../../src/lib/content-schema.ts)
  * [`src/lib/site.ts`](../../../src/lib/site.ts)
  * [`vitest.config.ts`](../../../vitest.config.ts)
  * [`playwright.config.ts`](../../../playwright.config.ts)
* What changed and why: Added a strict, static Astro application with exact direct dependency versions, a committed lockfile, publication metadata validation, stable slug and URL helpers, draft exclusion, duplicate-slug rejection, unit coverage thresholds, generated-output assertions, and cross-browser regression automation.
* Completion evidence: Production and `/benarculus` preview builds emit the expected static routes. Unit tests enforce 90/90/90/85 minimum coverage and workflow policy checks enforce full Action SHA pins.
* Validation: `astro check`, Prettier, 20 unit tests, production build, preview build, and generated-output assertions passed.

### Implemented the editorial mock-up and public pages

* Related phase or task: P02-T01 through P02-T03
* Files:
  * [`src/styles/global.css`](../../../src/styles/global.css)
  * [`src/layouts/BaseLayout.astro`](../../../src/layouts/BaseLayout.astro)
  * [`src/components/PostCard.astro`](../../../src/components/PostCard.astro)
  * [`src/pages/index.astro`](../../../src/pages/index.astro)
  * [`src/pages/blog/index.astro`](../../../src/pages/blog/index.astro)
  * [`src/pages/blog/[slug].astro`](../../../src/pages/blog/%5Bslug%5D.astro)
  * [`src/pages/404.astro`](../../../src/pages/404.astro)
* What changed and why: Implemented the confirmed warm, story-led design with centralized color, typography, spacing, focus, motion, and responsive tokens. Added semantic shared navigation, metadata, article composition, post cards, and no-script home, blog, article, and not-found pages.
* Owner visual feedback: Replaced the initial dark-red editorial accent with an evergreen accent pair (`#3f6b57` and `#284b3e`) while retaining the warm paper background and automated contrast coverage.
* Owner identity feedback: Standardized reader-facing branding, bylines, feeds, and structured metadata on “Ben Arculus”; retained “Benjamin Arculus” for copyright and legal policy text.
* Owner homepage feedback: Reframed the homepage around personal reflections on technical leadership, cybersecurity, and startups/entrepreneurship. Standardized the `/blog` collection’s reader-facing label as “Notes” across navigation, calls to action, index metadata, and recovery links.
* Owner language feedback: Consolidated the site voice on “personal notes” rather than alternating between “notes” and “reflections”; retained reflection language only where an article uses it descriptively.
* Owner topic feedback: Added AI as a recurring core topic in homepage, index, and search/social positioning. Kept “agentic systems” out of the permanent taxonomy so it can be used precisely in relevant notes without dating the overall brand.
* Completion evidence: The page set renders with no external client scripts, reserves image dimensions, exposes skip navigation and visible focus, and reflows at 320 CSS pixels.
* Validation: Eighteen Playwright cases passed across Chromium, Firefox, and WebKit, including automated accessibility, navigation, focus, reflow, and script-policy checks.

### Migrated the known article and discovery surfaces

* Related phase or task: P03-T01 through P03-T03
* Files:
  * [`src/content/posts/generate-clarity-by-establishing-a-writing-practice.md`](../../../src/content/posts/generate-clarity-by-establishing-a-writing-practice.md)
  * [`public/images/writing-practice.svg`](../../../public/images/writing-practice.svg)
  * [`src/pages/rss.xml.ts`](../../../src/pages/rss.xml.ts)
  * [`src/pages/sitemap.xml.ts`](../../../src/pages/sitemap.xml.ts)
  * [`src/pages/robots.txt.ts`](../../../src/pages/robots.txt.ts)
  * [`docs/authoring.md`](../../../docs/authoring.md)
* What changed and why: Converted the public article to schema-validated Markdown at its exact slug, retained its disclosure, citations, author, timestamp, and meaning, and locally optimized its 1500-by-1126 hero image from approximately 1.4 MB to 152 KB with embedded metadata removed. The original page exposed an empty image alternative; the migration uses a meaningful descriptive alternative to satisfy the approved accessibility requirement.
* Completion evidence: Canonical, Open Graph, Twitter, `BlogPosting` JSON-LD, `/rss.xml`, `/sitemap.xml`, and `robots.txt` are all generated from canonical content metadata in production and preview modes.
* Validation: Generated-output assertions passed for absolute origins, preview base prefixes, article URLs, feed items, sitemap entries, social images, JSON-LD, and script absence.

### Published an intentional GitHub profile surface

* Related phase or task: P03-T04
* Files:
  * [`README.md`](../../../README.md)
* What changed and why: Added a concise first-person profile introduction because `benarculus/benarculus` is the owner's special GitHub profile repository. The profile uses the approved “Ben Arculus” identity, personal-Notes voice, and technical leadership, cybersecurity, AI, and startups topic set.
* Boundary: Maintainer setup, authoring, migration, security, and contribution guidance remains in `docs/` and dedicated policy files. The profile includes only durable public positioning, site links, repository context, and licensing links.
* Completion evidence: The owner explicitly selected an intentional concise profile README rather than leaving the profile surface absent or deferring it.
* Validation: Content sensitivity and terminology were checked against the approved public site direction.

### Added repository policy and supply-chain controls

* Related phase or task: P04-T01 through P04-T03
* Files:
  * [`.github/workflows/ci.yml`](../../../.github/workflows/ci.yml)
  * [`.github/workflows/pages.yml`](../../../.github/workflows/pages.yml)
  * [`.github/dependabot.yml`](../../../.github/dependabot.yml)
  * [`.github/CODEOWNERS`](../../../.github/CODEOWNERS)
  * [`LICENSE`](../../../LICENSE)
  * [`CONTENT_LICENSE.md`](../../../CONTENT_LICENSE.md)
  * [`SECURITY.md`](../../../SECURITY.md)
  * [`CONTRIBUTING.md`](../../../CONTRIBUTING.md)
* What changed and why: Added read-only pull-request checks, a separate Pages deployment with job-scoped `pages: write` and `id-token: write`, full-SHA Action pins with version comments, weekly grouped Dependabot version updates with 14/30-day cooldowns, sensitive-path ownership, MIT source licensing, all-rights-reserved content licensing, private reporting guidance, and a no-unsolicited-contributions policy.
* Completion evidence: GitHub Pages is configured for Actions at `https://benarculus.github.io/benarculus/`; private vulnerability reporting is enabled; the active `Protect main` ruleset blocks deletion and force pushes, requires pull requests, and requires `Unit tests and coverage`, `Browser regression tests`, and `Production and preview builds`.
* Validation: Live API read-back confirmed the Pages workflow build type, private reporting, required checks, read-only Actions defaults, disabled workflow PR approvals, secret scanning, and push protection.

### Completed migration quality validation

* Related phase or task: P05-T01
* Files:
  * [`scripts/assert-generated.mjs`](../../../scripts/assert-generated.mjs)
  * [`scripts/lighthouse.mjs`](../../../scripts/lighthouse.mjs)
  * [`tests/browser/site.spec.ts`](../../../tests/browser/site.spec.ts)
* What changed and why: Added repeatable generated-route and Lighthouse quality gates and iterated the browser mock-up through owner feedback on accent color, public/legal naming, homepage positioning, Notes terminology, and AI topic scope.
* Completion evidence: Three mobile Lighthouse runs for each of home, `/blog`, and the preserved article route produced medians of 100 performance, 100 accessibility, 96 best practices, and 100 SEO. The owner approved the final evergreen, personal-Notes direction with AI as a recurring core topic.
* Validation: Automated P05-T01 checks pass and final visual/content acceptance was confirmed by the owner.

## Implementation-Time Plan Updates

### Reconciled the P01 task dependency

* Affected plan area or markers: P01-T02
* What changed: Corrected P01-T02 to depend on P01-T01 rather than itself.
* Why: The self-dependency was introduced while inserting the preventive-security prerequisite and would block plan-order execution.
* Triggering evidence: The current task blocks showed P01-T02 depending on P01-T02.
* User answer or decision: None; this preserves the approved phase sequence.
* Reconciliation performed: P01 task ordering and dependency text reconciled.
* Planning and critique state: Ready; no new critique required.

### Corrected plan diagram presentation defects

* Affected plan area or markers: Overall After diagram and P01 phase diagram
* What changed: Removed the duplicated `controls` declaration from the overall diagram and declared the referenced `controls` node in P01.
* Why: These were non-blocking presentation defects found during implementation.
* Triggering evidence: Mermaid source inspection before completion-marker reconciliation.
* User answer or decision: None; approved architecture and task scope are unchanged.
* Reconciliation performed: P01 through P04 markers now match completion evidence.
* Planning and critique state: Ready; no new critique required.

### Added the approved profile README task

* Affected plan area or markers: P03-T04 and the PC-009 disposition
* What changed: Added and completed P03-T04 for the intentional GitHub profile landing page. Clarified P03-T03 so maintainer guidance remains under `docs/` even when a root profile README exists.
* Why: The repository owner identified that the special repository's root README is rendered on the public GitHub profile and explicitly chose to design that surface.
* Triggering evidence: Owner decision during P05 inventory preparation.
* User answer or decision: Add a concise profile README.
* Reconciliation performed: P03 remains complete; the current plan no longer states that no root README is planned.
* Planning and critique state: Ready; the prior critique remains historical evidence and was not rerun.

### Pointed cutover work to the private inventory gate

* Affected plan area or markers: P05-T03
* What changed: Added a `Guidance:` block directing P05-T03 to consume the owner-completed [`docs/migration-inventory.md`](../../../docs/migration-inventory.md) gate through its non-sensitive summary only.
* Why: P05-T03 depends on rollback and DNS evidence created during P05-T02, and the plan did not previously name the concrete checklist path.
* Triggering evidence: Full-plan implementation resumed at P05-T02 before the owner completed the inventory.
* User answer or decision: The owner previously selected the safe private inventory workflow.
* Reconciliation performed: P05-T02 later completed; P05-T03 remains dependency-blocked until the branch merges and the owner approves DNS cutover.
* Planning and critique state: Ready; no new critique required.

## Validation Record

| Check | Scope | Status | Evidence or reason |
|-------|-------|--------|--------------------|
| Plan dependency inspection | Full plan | Passed | P01-T01 is the first dependency-ready task |
| Repository setting read-back | P01-T01 | Passed | Actions default read-only; workflow PR approval disabled; secret scanning and push protection enabled |
| Deterministic dependency install | P01-T02 | Passed | Exact direct versions, committed `package-lock.json`, `npm install` audit reported zero vulnerabilities |
| Astro and formatting checks | P01-P04 | Passed | Zero errors, warnings, or hints; Prettier passed |
| Unit tests and coverage | P01-T04 | Passed | 27 tests; 100% statements, lines, and functions; 86.36% branches |
| Production generated output | P03-T02 | Passed | Routes, canonical/social metadata, JSON-LD, RSS, sitemap, and robots assertions passed |
| Preview generated output | P03-T02, P04-T02 | Passed | `/benarculus` assets, links, metadata, feed, sitemap, and robots assertions passed |
| Browser regression suite | P01-T04, P02-T03, P05-T01 | Passed | 24 tests in Chromium, Firefox, and WebKit |
| Lighthouse mobile medians | P05-T01 | Passed | Home, blog, article: 100 performance, 100 accessibility, 96 best practices, 100 SEO |
| Live repository controls | P04-T02, P04-T03 | Passed | Pages via Actions, private reporting, secret protections, and active required-check ruleset verified |

## Pre-Review Reconciliation

* Plan markers and task-local context: P01 through P04 are checked and supported by implementation evidence.
* Completed-work evidence and handoff prose: Current for source, migration, automation, documentation, and repository settings.
* Validation, blockers, remaining work, and follow-up items: Automated validation is current; P05-T03 remains owner-gated.
* Review readiness: Not ready for full-plan Review because P05-T03 deployment/cutover remains.

## Blockers

* P05-T03: The Pages workflow cannot deploy until these changes reach protected `main`; DNS and custom-domain activation remain explicitly owner-gated.

### Owner-side inventory handoff

* Added [`docs/migration-inventory.md`](../../../docs/migration-inventory.md) with a safe checklist for private export, hidden-content review, media preservation, analytics/Search Console context, complete DNS capture, rollback criteria, and a non-sensitive result summary.
* The checklist explicitly keeps raw exports, DNS values, analytics, account details, verification material, and private content outside the public repository.

### Owner inventory summary received

* Related phase or task: P05-T02, in progress
* Safe evidence received:
  * Additional public pages or posts found: 1; disposition not yet resolved.
  * Private, draft, or unindexed items found: 0.
  * Additional publication media required: 1; requires work because the current reference is on the Squarespace CDN and ownership or replacement must be resolved.
  * Unsupported Squarespace features found: none.
  * Search Console context, analytics context, DNS snapshot, domain ownership or verification, and rollback record: completed privately.
  * General unresolved cutover blockers reported: none.
* Privacy boundary: No DNS values, verification tokens, analytics identifiers, account details, export contents, or unpublished content were recorded.
* Public-item disposition: The single public item is the already migrated article at `/blog/generate-clarity-by-establishing-a-writing-practice`; no additional page or post migration is required.
* Publication-image disposition: The owner cannot confirm republishing rights for the existing Squarespace-hosted hero image and selected replacement before cutover. A repository-created abstract SVG was selected to remove the rights uncertainty and external-hosting dependency.
* Replacement implementation: Added [`public/images/writing-practice.svg`](../../../public/images/writing-practice.svg), a text-free 1500-by-1126 editorial illustration. After owner review, revised the initial converging-ideas composition to show a fountain-style pen actively drawing an evergreen line across an open notebook. Updated article metadata, shared social-image fallback, and generated-output assertions to use it.
* Second owner revision: removed the ink-trail path across the page, rebuilt the pen's tip as a rounded fountain-pen nib (slit plus breather hole) instead of the previous sharpened, pencil-like wedge, and repositioned the pen toward the bottom-left of the composition so the nib rests directly on the ruled line at `y="690"` on the left page. Updated `heroAlt` to describe the pen resting on the page rather than drawing a line.
* Third owner revision: replaced the pen's tan block-shaped rear end, which read as a pencil eraser, with a domed pen-cap shape rendered in the same evergreen body gradient with a thin gold ring, matching the rest of the pen instead of contrasting with it.
* Replacement validation: Astro and formatting checks passed; 20 unit tests retained 100% statement, line, and function coverage with 85% branch coverage; production and preview generated-output assertions passed; 18 Playwright cases passed across Chromium, Firefox, and WebKit. After each of the pen-writing, nib/position, and cap revisions, Lighthouse medians remained 100 performance, 100 accessibility, 96 best practices, and 100 SEO on home, blog, and article routes.
* Owner acceptance: The owner approved the final revised illustration on 2026-09-18. P05-T02 is complete: the private inventory, public-item disposition, image-rights resolution, replacement asset, and rollback record are all complete.

### Pull request review corrections

* Applied the 2026-09-18 pull request review findings: Pages CI now installs Playwright before validation and rejects files within hidden directories; canonical URLs, internal links, RSS, sitemap, generated-output assertions, browser tests, and Lighthouse targets consistently use Pages directory URLs; social metadata uses a local 1200-by-630 PNG derivative of the approved SVG; and slug, XML-escaping, no-client-script, responsive reflow, workflow-discovery, navigation-state, category-label, article-copy, and tracking-state safeguards are covered.
* Validation: `npm run check`, `npm run test:unit` (27 passing tests; 100% statements, lines, and functions; 86.36% branches), production and preview builds with generated-output assertions, `npm run test:browser` (24 passing cases across Chromium, Firefox, and WebKit), `npm run test:lighthouse` (100/100/96/100 median scores on each representative route), and `git diff --check` passed.

## Remaining Work

* P05-T03: Merge through protected checks, verify the project-site deployment at `https://benarculus.github.io/benarculus/`, then perform the owner-approved custom-domain cutover and post-cutover validation.

## Follow-Up Items

* Canonical plan list: [.copilot-tracking/plans/2026-09-16/blog-migration-plan.md](../../plans/2026-09-16/blog-migration-plan.md), `## Follow-Up Items`
* The legacy query-string feed URL `/blog?format=rss` cannot be retained on GitHub Pages; `/rss.xml` is the documented canonical replacement.

## Return-to-Caller State

* Implementation execution status: Partial
* Declared scope and markers: Full plan; P01 through P04, P05-T01, and P05-T02 complete; P05-T03 remains active.
* Validation coverage: Type/content checks, formatting, unit coverage, production/preview generation, three-browser accessibility/regression testing, Lighthouse medians, and live repository controls.
* Blockers: Merge/deployment and explicit owner approval to change DNS and activate the custom domain. The private Squarespace/DNS inventory gate is complete.
* Current plan updates: P01-T02 dependency and phase-diagram defects corrected; P01 through P04 markers reconciled.
* Planning and critique state: Ready; prior critique remains historical evidence.
* Follow-up items: Accepted legacy feed compatibility limitation.
* Review readiness or no-handoff reason: Not ready; the final P05-T03 deployment and owner-gated cutover evidence is incomplete.
* Continuation owner: user
