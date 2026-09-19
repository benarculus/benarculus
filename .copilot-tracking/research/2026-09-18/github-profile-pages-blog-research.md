# Task Research: github-profile-pages-blog

| Field              | Value |
|--------------------|-------|
| Date               | 2026-09-18 |
| Researcher / agent | rpi-research |
| Output mode        | convergence |

## Executive Summary

* Bottom line: If you want a true split between your GitHub profile and your blog/site project, make `benarculus/benarculus` a small profile-only repository and move the Astro/GitHub Pages site to a dedicated website repository such as `benarculus/benarculus.com`. If you want the least migration work, keep this repo but move the site source under `site/` and keep the root `README.md` profile-focused.
* Why this matters: GitHub's profile README behavior is based on the root `README.md` of a public repository named exactly like the username. That behavior is not controlled by GitHub Pages and cannot be redirected to another file in the same repository.
* Research status: Complete after one balanced three-wave cycle covering official GitHub behavior, current repository mechanics, option-specific trade-offs, and contrarian cases.
* Confidence and uncertainty: High confidence that the profile README must remain root-profile content in this repository and that the current blog is an Astro static site deployed by Actions. Medium confidence on the final preference because it depends on whether the primary goal is clean boundaries or minimum migration.

## What You May Not Know

* The current repo name, `benarculus/benarculus`, makes it special for profile README display, but it is not a GitHub Pages user-site repository. Official Pages docs say user sites use `<owner>.github.io`; this repo is currently treated as a project site for preview purposes.
* Your current Astro config and tests already account for that project-site preview by using `https://benarculus.github.io/benarculus/` before production custom-domain cutover.
* A dedicated website repo gives the blog its own repository README and issue/project context. A subfolder split keeps the same repo and workflow but the repository landing page on GitHub will still show the profile README.

## Findings

### The profile README is inseparable from the root README in this repo

GitHub displays a profile README when a public repository has the same name as the username and contains a non-empty root `README.md`. Because this repository is `benarculus/benarculus`, root `README.md` is the profile surface. There is no evidence of a GitHub setting that lets this special profile repository use one Markdown file for the profile and a different root README for the repository landing page.

The practical effect is direct: keep `README.md` short, profile-oriented, and link out to the site or repo documentation. Put long repository documentation elsewhere.

* Questions: Q1, Q2
* Evidence state: evidence-backed finding
* Evidence: W1 establishes the profile README prerequisites; C1 shows the current root README is already profile-style but also describes the repository as the site source.
* Confidence and limits: High. The finding applies while the repo remains public, named `benarculus`, and has a non-empty root `README.md`.

### The current Pages/blog setup is an Astro static site deployed by Actions from this same repo

The repository has an Astro project at the root, content under `src/content/posts/`, a static build, and a Pages workflow that installs Node dependencies, validates, builds `dist`, and uploads a Pages artifact. The site config uses production `https://www.benarculus.com/` and preview `https://benarculus.github.io/benarculus/`, which matches a project-site setup with a custom production domain.

This means moving to a separate repo is feasible but not just a README shuffle. It requires moving the app, workflow, tests, dependencies, content, media, docs, and Pages/custom-domain settings. By contrast, moving the Astro app into a `site/` subfolder changes build paths and tests but keeps the repository and Pages project continuity.

* Questions: Q2, Q3
* Evidence state: evidence-backed finding
* Evidence: C2 shows the Pages artifact deployment; C3 and C4 show Astro, content, and site URL/base configuration; C5 and C6 show documentation/tests already encode the production and project-preview split; W2 and W3 establish Pages can publish through Actions and distinguish user sites from project sites.
* Confidence and limits: High for the checked workspace. Live GitHub Pages settings were not changed or inspected through the UI.

### A dedicated website repo is the cleanest long-term separation

Moving the Astro site to a dedicated repo, for example `benarculus/benarculus.com`, leaves `benarculus/benarculus` as a simple profile repo and gives the website/blog its own README, workflow, issue scope, docs, and source history. This best matches the mental model "profile repo is profile; site repo is site."

The cost is a one-time migration: repository creation, file movement, workflow path verification, branch protection or settings recreation, and custom-domain handoff. The current custom domain can be used with GitHub Pages, but custom-domain verification and DNS/Pages settings must be handled deliberately to avoid downtime or domain-takeover risk.

* Questions: Q2, Q3
* Evidence state: evidence-backed finding
* Evidence: W1 confirms why the profile repo remains special; W3 confirms Pages sites can be project sites or user sites; W4 confirms custom domains are supported and should be verified; C2-C6 establish what must move.
* Confidence and limits: Medium-high. The architecture is well supported, but exact migration effort depends on repository settings and DNS state not changed during research.

### A `site/` subfolder is the best low-migration compromise

Keeping this repo but moving the Astro app into `site/` separates profile content from Pages source inside one repository. The root can hold a small profile README and repository-level files, while `site/README.md`, `site/src/`, `site/package.json`, and related tests/docs describe the blog implementation.

This option preserves existing repository continuity and likely requires less GitHub settings work than a dedicated repo. The trade-off is conceptual: the GitHub repository page and profile still both use the same root `README.md`, so repo-level documentation must live in `site/README.md`, `docs/`, or `CONTRIBUTING.md` rather than replacing the root README.

* Questions: Q1, Q2, Q3
* Evidence state: evidence-backed finding
* Evidence: W1 explains why root README still remains profile-facing; W2 confirms an Actions workflow can publish a build artifact from a custom build process; C2-C6 show the current build/test surfaces that would need path updates.
* Confidence and limits: Medium-high. This is an inferred implementation pattern from the current repo and GitHub Actions support; exact path changes belong in a later plan, not this research phase.

### Keeping the current root layout is workable but keeps the confusion

The current setup can work if the root `README.md` stays concise and profile-oriented, with repository details in `docs/` and authoring docs. This has the least immediate cost and preserves all current build paths.

It does not truly split the profile from the repository landing page. Anyone visiting the profile repo sees the same root README that GitHub can display on the profile, and the Astro application files remain mixed into the special profile repository root.

* Questions: Q1, Q2, Q3
* Evidence state: evidence-backed finding
* Evidence: C1 shows the current README is already profile-oriented; C2-C6 show the current build works around the existing root layout; W1 explains why the display behavior remains.
* Confidence and limits: High. This option is operationally valid but does not satisfy a strong separation goal.

## Recommendation and Alternatives

* Recommendation or decision state: Select option 1, a dedicated website/blog repository, if the goal is to clearly separate your GitHub profile identity from the Pages/blog project. Use option 2, a `site/` subfolder in this repo, only if you want a lower-risk intermediate step before a later repo split.
* Rationale: Option 1 is the only option that gives the profile repo and the website repo independent root READMEs, repository contexts, and long-term ownership boundaries. Option 2 separates Pages source from the profile README but still leaves the special profile repo as the container for the site. Option 3 is acceptable only if the root README confusion is tolerable.
* What could change this result: If preserving current GitHub Pages settings and avoiding repo migration matters more than clean separation, option 2 becomes the better immediate choice.

| Option | Benefits | Costs and risks | Evidence | Disposition |
|--------|----------|-----------------|----------|-------------|
| Option 1: profile-only `benarculus/benarculus` plus dedicated site repo such as `benarculus/benarculus.com` | Cleanest separation; independent website README/docs/issues/workflows; profile repo remains intentionally small | One-time migration; recreate or move Pages settings; verify custom domain/DNS; update preview base if repo name changes | C1-C6, W1-W4 | Selected for true separation |
| Option 2: keep one repo but move Astro/Pages source into `site/` | Lower migration risk; root README can stay profile-only; current repo settings mostly remain relevant | Repo landing still uses profile README; workflow/tests/docs need path updates; site and profile still share one repo | C1-C6, W1-W3 | Viable low-migration compromise |
| Option 3: keep current root layout and make README profile-focused | Lowest effort; no build path changes; works with existing workflow | Does not split profile from repo landing; site source remains in profile repo root; future repo docs can crowd profile README again | C1-C6, W1-W2 | Rejected for a strong split; viable if simplicity dominates |

## Scope and Questions

* Goal: Compare the three options for managing the GitHub profile README and GitHub Pages blog, then select the best-supported direction.
* Audience and use: Ben, to decide how to structure the GitHub profile repo and personal blog source before implementation.
* In scope: The current `benarculus/benarculus` repository layout, GitHub profile README behavior, GitHub Pages deployment behavior, Astro blog source layout, existing research/planning records, and the three options previously identified in chat.
* Out of scope: Implementing the selected option, changing source files, creating a PR, changing DNS, or changing GitHub repository settings.
* Decision and evidence criteria: Clear separation between profile and blog content, low operational complexity, minimal migration risk, compatibility with GitHub Pages and the current Astro workflow, and maintainability for future writing.
* Requested output: Evidence-backed comparison and selected recommendation.

| ID | Question | Source | Status |
|----|----------|--------|--------|
| Q1 | Why is `README.md` appearing on the GitHub profile, and can the same profile repo use a separate repo landing README? | Explicit from chat | Answered by W1 and C1 |
| Q2 | Which of the three options best separates profile content from blog/Pages content while preserving maintainability? | Explicit from chat | Answered by C1-C6 and W1-W4 |
| Q3 | What migration or operational risks does each option introduce for the current Astro/GitHub Pages setup? | Inferred from repo context | Answered by C2-C6, W2-W4 |

## Decisions and Feedback

| Group | Decision or feedback item | Status | Owner | Rationale or input needed | Evidence | Impact of answer |
|-------|---------------------------|--------|-------|---------------------------|----------|------------------|
| D1 | Preferred repository/content split pattern | Confirmed: dedicated website repo | User | User selected the recommended true-separation target after research synthesis; option 2 remains the lower-migration fallback. | C1-C6, W1-W4; user answer 2026-09-18 | Follow-on planning should target moving the Astro/GitHub Pages site to a dedicated website repository while keeping `benarculus/benarculus` profile-only. |

## Risks and Open Questions

| Priority | Type | Risk, question, or research item | Impact | Smallest action or evidence needed | Owner |
|----------|------|----------------------------------|--------|------------------------------------|-------|
| H | Risk | Moving to a dedicated site repo requires custom-domain and Pages settings migration. | Incorrect sequencing could cause downtime or broken preview URLs. | During planning, inventory current Pages settings, verify domain ownership, and stage preview before DNS/custom-domain cutover. | User/downstream |
| M | Risk | Moving the Astro app into `site/` changes build, test, and workflow paths. | CI or deploy can break if any path remains root-assumed. | Plan path updates for workflow cache, install/build commands, Playwright paths, tests, docs, and generated artifacts. | Downstream |
| L | Open question | Exact dedicated repo name is not yet selected. | Repo name affects default project-site preview path. | Choose between `benarculus.com`, `site`, or `benarculus.github.io` during planning. | User |

## Planning Readiness and Next Step

| Field | Record |
|-------|--------|
| Research disposition | executed |
| Decision participation | user-owned; standalone rpi-research invocation from explicit `/hve-core:rpi-research` request |
| Planning Readiness | Ready for planning toward option 1, a dedicated website/blog repository; evidence C1-C6 and W1-W4 identify the decision boundary and migration risks, and D1 records user confirmation. |
| Research depth and lanes | One inline balanced cycle completed: Wider, Deeper, Contrarian. No delegation because the evidence set was small and tightly coupled. |
| Blockers | None for planning. |
| Output mode and planning support | convergence; supports planning because a recommendation and viable fallback are recorded. |
| Continuation owner | user |
| Required gates or confirmations | Artifact self-check complete; user-owned implementation choice recorded in D1. |
| Next action | If continuing through RPI, run `/rpi-plan` for the dedicated website repo migration target. |
| Primary evidence file | .copilot-tracking/research/2026-09-18/github-profile-pages-blog-research.md |

## Research Record

### Method and Boundaries

| Field | Record |
|-------|--------|
| Research posture and provenance | balanced; inferred from a bounded decision with three known options and adjacent GitHub Pages/profile behavior that could affect the answer |
| Completion basis | Complete: all three options were compared against profile README behavior, Pages behavior, current repo structure, existing migration records, and contrarian trade-offs. |
| Explicit limits or deadline | None supplied |
| Codebase and external scope | Current workspace only for internal evidence; official GitHub documentation for external behavior |
| Initial candidate areas | Internal: `README.md`, `.github/workflows/pages.yml`, `package.json`, `astro.config.mjs`, `src/pages`, `src/lib/site.ts`, `docs/authoring.md`, prior `.copilot-tracking` research/plans; external: GitHub profile README docs, GitHub Pages source/site-type/custom-domain docs |
| Evidence root | Default repository research root: `.copilot-tracking/research/2026-09-18/` |
| Constraints and excluded sources | Research-only; no source edits, no settings changes, no planning or implementation handoff outside final advisory |
| Prior knowledge | Previous chat answer and existing blog migration artifacts were treated as claims to verify against current files and official docs. |

### Extensions and Participation

#### Extension Registry

| Kind | Candidate | Provenance and scoped contract | Selected or skipped reason |
|------|-----------|--------------------------------|----------------------------|
| instruction | rpi-research reference and template | Explicit skill invocation; governs artifact, evidence, and three-wave research cycle | Selected |
| skill | hve-core:rpi-research | Explicitly invoked by user | Selected as parent skill |
| specialist | hve-core:rpi-researcher | Available research lane subagent; can execute delegated research lanes | Skipped: evidence is low-volume and tightly coupled, so inline research is more efficient |
| specialist | research | Built-in research agent; web/source research | Skipped: official docs and local repo can be checked directly |

#### Direction and Participation Log

| Checkpoint or change | Question, direction, or rationale | Answer or no-interaction reason | Result and revalidation effect |
|----------------------|-----------------------------------|---------------------------------|--------------------------------|
| Intake | Compare the three options for managing profile README and Pages blog. | Sufficient context supplied in chat; no clarification required before research. | Proceeded with convergence mode and balanced posture. |
| Synthesis | Choose one recommendation despite preference sensitivity. | Evidence supports option 1 when "split" means true repo/content separation; option 2 remains viable for lower migration. | Planning readiness is Ready after the user selects which implementation target to pursue. |
| Decision walkthrough | Which direction should be treated as the selected target for follow-on planning? | User selected "Dedicated website repo (Recommended for true separation)." | D1 confirmed; planning target is a dedicated site repo with `benarculus/benarculus` profile-only. |

### Research Cycle Log

#### Cycle 1

* Active posture, controls, and limits: Balanced posture; compare only the three known options; research-only write boundary.

##### Wave 1: Wider

* Focus and lanes: Identify relevant internal structures and official GitHub behavior for profile README and Pages deployment.
* Evidence or worker pointers: Inline evidence C1-C4 and W1-W3. GitHub profile README display depends on a public same-name repository with root `README.md`. GitHub Pages can publish with Actions and distinguishes user/org sites from project sites. Current repo uses Astro and Actions artifact deployment.
* Reflection: The profile README behavior is the hard constraint. The current repo is already a project-site style Pages deployment, so the option comparison must include migration cost and not only content cleanliness.

##### Wave 2: Deeper

* Focus and lanes: Evaluate option-specific implications for the current Astro site and workflow.
* Evidence or worker pointers: Inline evidence C2-C6 and W2-W4. The current workflow validates/builds/uploads `dist`; tests and site helpers encode production and preview origins; docs record the project-site preview and production domain behavior; custom-domain docs support use of owned domains and recommend verification.
* Reflection: Option 1 creates the cleanest boundary but has the most settings and migration work. Option 2 preserves repository continuity and is likely the fastest safe refactor. Option 3 is operationally valid but does not meet a strong separation goal.

##### Wave 3: Contrarian

* Focus and lanes: Challenge the likely dedicated-repo recommendation with reasons to keep the current repo or avoid migration.
* Evidence or worker pointers: C2-C6 show a functioning integrated repo with hardened workflow assumptions and tests. W2 supports custom Actions publishing from the current repo. C5 shows existing docs already explain the public repository boundary and project-site preview.
* Reflection: The contrarian case weakens any claim that option 1 is always best. If the near-term priority is minimal disruption, option 2 is better. It does not disprove option 1 for true separation because only option 1 separates repository identity, root README, and website source ownership.

##### Parent Synthesis and Re-entry

| Material or claim | Evidence or worker pointers | Disposition | Rationale | User-facing effect |
|-------------------|-----------------------------|-------------|-----------|--------------------|
| Root `README.md` in the same-name public repo is the profile README. | W1, C1 | Accepted | Official docs directly define this behavior. | Finding 1; rules out separate same-repo profile/repo README files. |
| Current site is Astro deployed by Actions from this repo. | C2-C6, W2 | Accepted | Current files and docs show build/deploy mechanics. | Finding 2; migration risk must be considered. |
| Dedicated site repo is the cleanest split. | C1-C6, W1-W4 | Accepted with caveat | It uniquely separates repo identities and root READMEs, but costs migration work. | Selected recommendation for true separation. |
| `site/` subfolder is the lower-migration compromise. | C1-C6, W1-W3 | Accepted | It separates source folders but not repository identity. | Viable fallback if migration risk dominates. |
| Keeping current layout is sufficient. | C1-C6, W1-W2 | Rejected for strong split; accepted as simplest operationally | It does not solve the user's separation concern. | Alternative retained only for simplicity-first priority. |

* Another complete three-wave cycle needed: No.
* Trigger or stop basis: Material questions are answered; the user selected the evidence-backed true-separation direction.
* Readiness or revalidation effect: Ready for planning toward the dedicated website repo migration target.

### Evidence Log

* Delegation: inline; no worker artifact created because the internal and official-documentation evidence set is small and tightly coupled.

| ID | Claim or finding | Source or location | Retrieved and version | Tool | Confidence | Notes |
|----|------------------|--------------------|-----------------------|------|------------|-------|
| C1 | The root README is profile-oriented and also states that the repository contains the personal site source and published content. | `README.md` heading `Hi, I'm Ben.` | not applicable | read | high | Shows why profile and repo/site messaging are currently combined. |
| C2 | The repository deploys GitHub Pages from a built `dist` artifact through Actions. | `.github/workflows/pages.yml` workflow `Deploy GitHub Pages` | not applicable | read | high | The workflow runs `npm ci`, validation, preview build, generated preview tests, and `upload-pages-artifact`. |
| C3 | The project is an Astro static site with Node 24, validation scripts, unit/browser tests, and Markdown content dependencies. | `package.json` scripts and dependencies | not applicable | read | high | Establishes migration scope for a dedicated repo or `site/` move. |
| C4 | The Astro site is configured for production `www.benarculus.com` and preview `benarculus.github.io/benarculus`. | `astro.config.mjs` `site` and `base`; `src/lib/site.ts` `SITE` constants | not applicable | read | high | Confirms current project-site preview behavior. |
| C5 | Existing authoring docs record public-repo publishing boundaries and the project-site preview vs production domain model. | `docs/authoring.md` sections `Public-repository boundary` and `Hosting and recovery` | not applicable | read | high | Useful for migration risk and source-boundary implications. |
| C6 | Tests assert production and preview URL behavior and workflow trust policy. | `tests/unit/site.test.ts`; `tests/unit/workflow-policy.test.ts` | not applicable | read | high | Indicates path/domain/workflow changes need test updates if moving source. |
| C7 | Prior migration research and plan already identified the project-site preview path and custom-domain cutover considerations. | `.copilot-tracking/research/2026-09-16/blog-migration-research.md`; `.copilot-tracking/plans/2026-09-16/blog-migration-plan.md` | not applicable | read/search | medium | Tracking evidence supports continuity but was verified against current files where material. |
| W1 | GitHub displays a profile README when a public repository matches the username and has a non-empty root `README.md`; removing or emptying it removes the profile README. | GitHub Docs, `Managing your profile README`, https://docs.github.com/en/account-and-profile/how-tos/profile-customization/managing-your-profile-readme | 2026-09-18; current docs | web | high | Primary source for the profile README constraint. |
| W2 | GitHub Pages can publish from a branch or from a custom GitHub Actions workflow; custom workflows are recommended for non-Jekyll/custom build processes. | GitHub Docs, `Configuring a publishing source for your GitHub Pages site`, https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site | 2026-09-18; current docs | web | high | Supports continued Actions deployment in any option. |
| W3 | GitHub Pages user/org sites must use `<owner>.github.io`; project sites default to `https://<owner>.github.io/<repositoryname>`. | GitHub Docs, `What is GitHub Pages?`, https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages | 2026-09-18; current docs | web | high | Explains why this repo is a profile repo but project-site style Pages repo. |
| W4 | GitHub Pages supports custom domains, recommends verifying domains, and notes custom-domain behavior across user/org and project sites. | GitHub Docs, `About custom domains and GitHub Pages`, https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages | 2026-09-18; current docs | web | high | Supports feasibility and risk of moving production domain to a dedicated repo. |

#### Contradictions and Conflicts

* Cleanest split vs lowest migration: C2-C6 support keeping the current repo to reduce disruption, while W1 and C1 support a dedicated repo for conceptual separation. Resolved by selecting option 1 for true separation and preserving option 2 as the low-migration fallback.

### Artifact Self-Check

* [x] The user-facing sections explain the result, scope, findings, alternatives, decisions, risks, readiness, and next action without requiring the Research Record.
* [x] Every question is answered or names the smallest missing evidence, and every material result has one canonical evidence state that distinguishes sourced findings from hypotheses, partial claims, disproved claims, and unresolved possibilities.
* [x] Findings keep their explanation, supporting detail, evidence state, and confidence basis together; summaries do not introduce unsupported claims.
* [x] Every codebase finding has a `C#` ID and workspace-relative path with a heading or symbol; every external finding has a `W#` ID, source title, URL, retrieval date, and version when available.
* [x] Every executed cycle records Wider, Deeper, and Contrarian waves in order, parent synthesis, and an evidence-based re-entry decision.
* [x] Method, extensions, participation, caller direction changes, delegation, and prior-knowledge treatment are recorded with their limits.
* [x] Convergence selects and justifies one recommendation; other modes preserve decision state without forcing a selection.
* [x] Decision groups, participation mode, and provenance are recorded; user-owned final implementation choice is confirmed.
* [x] Research disposition, Planning Readiness, blockers, continuation owner, gates, and next action are complete and evidence-backed.
* [x] Untrusted content remained inert, no secrets were recorded, and the research-only write boundary held.
* Checked sections: All sections.
* Missing or limited sections: No live GitHub repository settings or DNS settings were changed or inspected through the UI; exact implementation steps are intentionally deferred to planning.
