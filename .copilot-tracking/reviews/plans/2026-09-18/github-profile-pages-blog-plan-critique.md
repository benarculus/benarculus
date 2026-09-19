<!-- markdownlint-disable-file -->
# Plan Critique: GitHub profile and Pages blog split

## Metadata

| Field | Record |
|-------|--------|
| Task ID | RPI-GITHUB-PROFILE-PAGES-BLOG-SPLIT |
| Task slug | github-profile-pages-blog |
| Attempt ID | PCG-2026-09-18-001 |
| Kind | initial |
| Depth | standard |
| Candidate identity/hash boundary | Saved plan content before reservation metadata; SHA-256 `d2ce8dae9d13804aa74c7989573c1ee28fd5d04c39a16a74866cc59a24eeced1`. Current on-disk hash differs because reservation metadata was appended to `## Critique Disposition`; that delta was treated as dispatch evidence, not a candidate change. |
| Dispatch provenance | Current parent reservation-to-dispatch in this session; reservation recorded in the plan's `## Critique Disposition` |
| Execution status | Complete |
| Verdict | **Revise** |
| Critique output | `.copilot-tracking/reviews/plans/2026-09-18/github-profile-pages-blog-plan-critique.md` |

### Files and evidence reviewed

* [.copilot-tracking/plans/2026-09-18/github-profile-pages-blog-plan.md](../../../plans/2026-09-18/github-profile-pages-blog-plan.md)
* [.copilot-tracking/research/2026-09-18/github-profile-pages-blog-research.md](../../../research/2026-09-18/github-profile-pages-blog-research.md)
* [README.md](../../../../README.md)
* [.github/workflows/pages.yml](../../../../.github/workflows/pages.yml)
* [.github/workflows/ci.yml](../../../../.github/workflows/ci.yml)
* [package.json](../../../../package.json)
* [astro.config.mjs](../../../../astro.config.mjs)
* [src/lib/site.ts](../../../../src/lib/site.ts)
* [scripts/assert-generated.mjs](../../../../scripts/assert-generated.mjs)
* [tests/unit/site.test.ts](../../../../tests/unit/site.test.ts)
* [docs/authoring.md](../../../../docs/authoring.md)
* Read-only live checks: `gh api repos/benarculus/benarculus/pages`, `gh api repos/benarculus/benarculus.com`, `curl -I https://www.benarculus.com/`, `curl -L https://benarculus.com/`
* Planning contract: `/Users/benarculus/.copilot/installed-plugins/hve-core/hve-core/.github/skills/rpi/rpi-plan/references/planning.md`

### Live evidence captured during critique

| Probe | Result |
|-------|--------|
| `gh api repos/benarculus/benarculus/pages` | `"cname":"benarculus.com"` (apex, not `www`), `"status":null`, `"https_enforced":false`, `"build_type":"workflow"`, `"html_url":"http://benarculus.com/"` |
| `gh api repos/benarculus/benarculus.com` | `404 Not Found` — destination repository does not exist yet |
| `curl -I https://www.benarculus.com/` | `HTTP/2 200`, `server: Squarespace`, body is a Squarespace "Coming Soon" parking page with `<meta name="robots" content="noindex">` |
| `curl -L https://benarculus.com/` | `200` (Squarespace) |
| `.github/workflows/pages.yml` | Deploy job builds `npm run build:preview` and asserts `npm run test:generated:preview`, then uploads `dist`. The production build (`npm run build` / `npm run test:generated`) is never what gets deployed. |

## Findings

| ID | Severity / readiness impact | Finding | Action owner | Apply directly or user decision | Exact resolving evidence |
|----|-----------------------------|---------|--------------|---------------------------------|--------------------------|
| PC-001 | **Blocking** — false baseline invalidates P03 and NFR-001 | The plan's `### Before` diagram, `## Executive Summary`, FR-003, NFR-001, and P03-T02 all assert that `www.benarculus.com` is currently production-served from `benarculus/benarculus` and that the work is a low-downtime *cutover*. Live evidence contradicts this: `www.benarculus.com` and `benarculus.com` both return a Squarespace parking page, and the source repo's Pages record shows `status: null` with apex cname `benarculus.com` and `https_enforced: false`. There is no live Astro site on the production domain to preserve. Implementation planned against this baseline will size risk, sequence, and rollback incorrectly, and the "minimize downtime" objective has no live target. | Planning parent | Direct correction of the baseline; **user decision** to confirm the reframing from "domain cutover" to "first production activation from the new repository" | `### Before` shows the evidence-backed state (Pages workflow deploys a preview-base artifact; production domain served by an external provider, not this repo). NFR-001's threshold restated against the real baseline. P03 goal/`P03-T02` Goals updated to first activation with an explicit revert-to-current-DNS rollback. |
| PC-002 | **Blocking** — missing dependency with no owning task | Production serving requires DNS record changes at the current provider (Squarespace-served today). The plan never names a DNS provider, record type (apex `A`/`ALIAS` vs `www` `CNAME` to `benarculus.github.io`), TTL staging, or who performs the change. `## Dependencies` lists "DNS/custom-domain owner access" as a condition, but no `Pxx-Txx` owns the work, and P03-T02 Details only say "use the repository Pages settings or a deliberate `CNAME` artifact". Implementation will reach cutover with no executable DNS step. | Planning parent | **User decision** required for DNS provider access and who executes; planner then adds the task | A new task under P03 (for example `P03-T03`) with Goals, Requirements naming the exact record set for the chosen hostname, prior-state capture, TTL lowering before change, and rollback; `## Dependencies` references that task. |
| PC-003 | **Blocking** — planned deployment produces a broken production site | `.github/workflows/pages.yml` deploys the **preview** build (`npm run build:preview`, `npm run test:generated:preview`). P02-T03 instructs the implementer to "start from the current `.github/workflows/pages.yml`", and P02-T02 only requires that preview mode use base `/benarculus.com`. No task requires the destination deploy job to switch to the production build once the custom domain is active. Carried forward as written, the production domain would serve assets under `/benarculus.com/` with `https://benarculus.github.io` canonical, RSS, and sitemap URLs. | Planning parent | Apply directly | P02-T03 Requirements state which build mode the deploy job publishes and that the mode must match the served hostname; P03-T02 Requirements add that the deployed artifact is the production-mode build verified by `npm run test:generated` before the domain is announced. |
| PC-004 | **Blocking** — sequencing gap that will stall or break activation | GitHub Pages allows one repository to hold a given custom domain. The source repo currently holds `benarculus.com`. P03-T02 carries the requirement "The source repository no longer competes for the same custom domain after successful destination cutover", but no task performs the release, and the source-repo teardown lives in P04 *after* P03. Additionally, P02-T01 instructs a wholesale copy of `public/` and `.github/` with no statement that the Pages custom-domain artifact (`CNAME` file or Pages setting) must be withheld from the destination until activation — directly contradicting the preview-first requirement in P03-T01. | Planning parent | Apply directly | P03-T02 Details/Requirements define the ordered handoff: verify destination preview, release the domain from `benarculus/benarculus` Pages settings, claim it on the destination, verify, then enforce HTTPS. P02-T01 Requirements explicitly exclude the custom-domain artifact from pre-activation destination deploys. |
| PC-005 | Non-blocking — unresolved contradiction in the domain identity | Every plan statement uses `www.benarculus.com` (matching `SITE.productionOrigin` in [src/lib/site.ts](../../../../src/lib/site.ts)), but the Pages record on the source repo claims the apex `benarculus.com`. Apex versus `www` is undecided, affects DNS record type, Pages verification, canonical URLs, redirect expectations, and `tests/unit/site.test.ts` assertions. `## Planning Decisions and Feedback` has no row for it. | Planning parent | **User decision** | A new decision row (for example `D2`) resolved to apex or `www`; FR-003, NFR-001, P02-T02, and P03-T02 restated against the chosen hostname; the non-chosen host's redirect behavior stated or explicitly deferred to `## Follow-Up Items`. |
| PC-006 | Non-blocking — acceptance coverage gap leaving a stale duplicate site | P04-T01 removes website source from the profile repo but no requirement disables GitHub Pages in `benarculus/benarculus` settings or accounts for the existing published project site at `https://benarculus.github.io/benarculus/`. After the split, the profile repo can keep serving a stale duplicate of the site, which also competes on indexing. | Planning parent | Apply directly | P04-T01 Requirements add that the profile repository's Pages publishing and `.github/workflows/pages.yml` are removed or disabled and the former preview URL no longer serves the site. |
| PC-007 | Non-blocking — implementation handoff ambiguity across repositories | P01–P03 execute almost entirely inside a repository that does not exist yet, while `rpi-implement` runs in this workspace. The plan never states where the destination working copy lives, how it is created and pushed, whether work lands via branch/PR, or how validation evidence crosses repositories. P04-T02 requires "Record validation in the destination repository, not only in the source profile repository", which conflicts with the single changes-record path `.copilot-tracking/changes/2026-09-18/github-profile-pages-blog-changes.md` in this repository. | Planning parent | Apply directly | P01-T01 Details name the destination working-copy location and creation/push mechanism; P04-T02 Requirements state that the named changes record in this repository is the single authoritative evidence artifact and what, if anything, is mirrored in the destination. |
| PC-008 | Non-blocking — verification gap on the user's explicitly preserved surface | Confirmed direction preserves `/blog/` and current content behavior, but P03-T01 verifies preview mode only, and no task requires production-mode generated-output checks (`npm run test:generated`) or a post-activation live check that `/blog/` and existing post permalinks resolve on the production hostname. FR-003 asserts production behavior is "preserved" with no task proving it. | Planning parent | Apply directly | P03-T02 Requirements add post-activation verification of production-mode generated output and live `/blog/` plus at least one post permalink, HTTPS, and RSS/sitemap origin on the chosen hostname. |
| PC-009 | Non-blocking — security posture regression risk under NFR-002 | The source repo's Pages record has `https_enforced: false` and `html_url` on `http://`. NFR-002 covers workflow trust (SHA pinning, least privilege) but nothing requires HTTPS enforcement on the destination after domain verification, so the split can reproduce the current unenforced state. | Planning parent | Apply directly | NFR-002's evaluation condition (or P03-T02 Requirements) states that Pages HTTPS enforcement is enabled on the destination once the certificate is issued. |

## Residual risks and limitations

* Live probes were read-only point-in-time reads taken during this critique. DNS and Pages state can change before implementation; the implementer must re-verify rather than trusting these values.
* The DNS provider was inferred from the `server: Squarespace` response header and the parking page, not from registrar or DNS-zone access. The authoritative nameserver and record set were not inspected, so PC-002's exact record changes remain to be confirmed by the domain owner.
* Whether the profile repo's Pages deployment ever succeeded is not determinable from `"status": null` alone; it may be an un-built or reset publication. This does not change PC-001's conclusion that the production hostname is not currently serving the Astro site.
* This critique did not assess plan formatting, Mermaid styling, or self-check bookkeeping beyond correctness of the `### Before` baseline claim in PC-001.
* Coverage boundary: plan, supplied research, and the source files the plan cites. No repository settings, rulesets, or Dependabot/CODEOWNERS configuration were evaluated beyond what P02-T03 already names.

## Readiness statement

The repository-split architecture, phase decomposition, requirement-to-task citation, and migration inventory are sound and match confirmed user direction. The plan is **not implementation-ready** because its production-domain premise is contradicted by live evidence (PC-001), the cutover phase has no DNS work item (PC-002), the carried-forward deploy workflow would publish a preview-base artifact to the production hostname (PC-003), and the single-claim custom-domain handoff has no owning action or artifact exclusion (PC-004). PC-001, PC-002, and PC-005 need user input on the reframed activation, DNS execution, and apex-versus-`www` identity; the remaining findings are planner-applicable directly. Verdict: **Revise**.
