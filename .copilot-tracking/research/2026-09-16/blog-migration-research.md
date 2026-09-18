<!-- markdownlint-disable-file -->
# Task Research: blog-migration

| Field              | Value       |
|--------------------|-------------|
| Date               | 2026-09-16  |
| Researcher / agent | rpi-research |
| Output mode        | convergence |

## Executive Summary

* Bottom line: Use Astro as a fully static site in `benarculus/benarculus`, deploy it to GitHub Pages with GitHub Actions, keep ordinary posts in validated Markdown content collections, preserve `www.benarculus.com`, `/blog`, and the existing post slug, and redesign the site around a warm, approachable, story-led “human leadership” visual system.
* Why this matters: This direction gives the visual freedom needed for a more distinctive editorial site without adding a client-side application runtime, while making every article portable, reviewable Markdown with explicit metadata.
* Research status: Complete after two balanced cycles. Cycle 2 added Wider, Deeper, and Contrarian research on public-repository security.
* Confidence and uncertainty: High confidence that a public repository is appropriate for this static blog if the repository is treated as publication-ready, workflows are hardened, and the current permissive repository defaults are corrected before deployment.

## What You May Not Know

* The target repository is empty, so no existing framework constrains the choice.
* GitHub Pages does not require Jekyll; GitHub Actions can deploy any static generator.
* Squarespace's export is not a full site backup. It omits style settings, custom CSS, drafts, and several page elements, so the migration must cross-check the export against the live RSS feed, sitemap, metadata, and downloaded assets.
* The public migration surface is currently tiny: the sitemap exposes `/blog` and one article. Exact URL preservation is simpler and safer than introducing redirects.
* “Upscale” should come from a coherent editorial design system—not animation or a heavy JavaScript framework. Astro components render to HTML with zero client JavaScript by default.
* A public repository is not a safe drafts folder. Deleting a committed draft or credential later does not reliably erase it from clones, forks, pull-request references, or cached history.
* The repository's current Actions default grants write permissions and allows workflows to approve pull requests; there are no rulesets, and secret scanning/push protection report disabled. These defaults should be hardened before the deployment workflow is introduced.

## Findings

### The repository is a greenfield target

The `benarculus/benarculus` repository has no tracked files at the research start. That removes compatibility constraints but makes explicit decisions about the generator, URL structure, content schema, design system, deployment, and migration tooling necessary.

* Questions: Q1, Q2, Q4
* Evidence state: evidence-backed finding
* Evidence: C1 establishes the empty repository baseline.
* Confidence and limits: High confidence for the current checkout; remote-only or uncommitted content outside this worktree is not assumed.

### The public migration surface is small but metadata-rich

The current sitemap exposes only `/blog` and one post at `/blog/generate-clarity-by-establishing-a-writing-practice`. The article and RSS feed provide the complete prose plus title, author, publication and modification dates, description, hero image, canonical URL, affiliate disclosure, headings, citations, and social identity links. Preserve those paths and fields rather than treating the post as an unstructured HTML copy.

* Questions: Q1, Q3
* Evidence state: evidence-backed finding
* Evidence: W1, W2, and W11 establish the public URL and content inventory.
* Confidence and limits: High for public indexed content. Drafts, private pages, analytics history, and unindexed assets still require owner-side checks before cancellation.

### Astro is the strongest overall fit

Astro directly supports static GitHub Pages deployment, schema-validated Markdown collections, custom slugs, static routes, reusable zero-runtime components, responsive image optimization, RSS, sitemaps, and optional MDX. Those capabilities map closely to the stated goals: Markdown ownership, a polished custom visual system, strong performance, and low operational overhead.

* Questions: Q2, Q4
* Evidence state: evidence-backed finding
* Evidence: W3, W7, W8, W12-W15, and W25 establish the hosting, content, design-system, and publishing capabilities.
* Confidence and limits: High for the current site size and goals. Astro carries a Node/package dependency surface and is more framework than a minimal Jekyll or Eleventy site.

### The content contract should be plain Markdown first

Store each post as a `.md` file with validated frontmatter such as `title`, `description`, `publishedDate`, optional `updatedDate`, `author`, `heroImage`, `heroAlt`, `tags`, `draft`, and an explicit `slug` when URL preservation requires it. Use MDX only for a post that genuinely needs a custom component; making every post MDX would weaken portability and increase authoring complexity without helping normal essays.

* Questions: Q2, Q4
* Evidence state: evidence-backed finding
* Evidence: W8 and W15 distinguish standard Markdown capabilities from optional component-rich MDX.
* Confidence and limits: High. The final field names are an implementation-level design choice for planning.

### Migration quality depends on preservation checks, not just content conversion

The new site should keep the current domain and exact public paths, copy images into the repository, emit self-canonical metadata, recreate social metadata and `BlogPosting` structured data, generate RSS and a sitemap, preserve the affiliate disclosure, enforce HTTPS, and verify the cutover with Search Console and link/asset checks. Squarespace should remain active until these checks pass because its XML export is incomplete and remote image references can fail after cancellation.

* Questions: Q1, Q3
* Evidence state: evidence-backed finding
* Evidence: W2, W4, W10-W17, and W24 establish the current metadata, export gaps, domain support, search-migration expectations, and HTTPS concerns.
* Confidence and limits: High. GitHub Pages cannot provide arbitrary server-side redirect rules; exact path preservation is therefore preferable.

### A warm, story-led leadership design can remain lightweight and accessible

The selected “human leadership” direction should use a purposeful editorial system: warm but sufficiently contrasting color, personable imagery, distinctive display typography paired with highly readable body text, generous rhythm, story-forward article framing, clear author/topic context, and a focused blog index. It should avoid generic corporate stock imagery and “cyber neon” visual clichés. Accessibility constraints—contrast, visible focus, reflow, adaptable spacing, and usable targets—should be design tokens and component acceptance criteria, not a late audit.

* Questions: Q4
* Evidence state: partially supported claim
* Evidence: W14, W18, and W25 support the performance and accessibility constraints; “premium editorial” is a design interpretation of the user's request rather than an externally provable preference.
* Confidence and limits: High confidence in the constraints; the user selected the visual character, while specific design tokens remain for implementation planning.

### The alternatives are credible but less aligned

Jekyll is the simplest conventional GitHub Pages blog and Eleventy offers a lightweight, flexible Markdown pipeline with strong image tooling. Hugo is fast and mature. They are not poor choices; Astro leads because this request combines Markdown content with an explicitly ambitious visual redesign, and its typed content layer plus component model reduce the amount of custom assembly.

* Questions: Q5
* Evidence state: evidence-backed finding
* Evidence: W6, W9, W19-W23, and W25 establish the alternatives' strengths and the comparative trade-off.
* Confidence and limits: Medium-high because framework preference is partly subjective; the recommendation would change if minimizing dependencies outweighed design-system ergonomics.

### Public source is appropriate only for publication-ready material

The repository can safely remain public because the site is static, the source is intended to be inspectable, and the deployment does not require application credentials. Public visibility does not let strangers push to `main`, but it permanently exposes committed posts, drafts, media, configuration, commit metadata, and history. Keep unpublished or sensitive writing in a separate private workspace until it is ready for a publication pull request.

* Questions: Q6
* Evidence state: evidence-backed finding
* Evidence: C2, W26, W31, and W35 establish the current visibility, public Pages model, scanning benefit, and difficulty of removing disclosed history.
* Confidence and limits: High. If private drafts must be versioned in the same repository, the visibility recommendation should change.

### The deployment workflow should be secretless and privilege-separated

The Astro Pages workflow needs repository read access during build and only `pages: write` plus `id-token: write` in the dedicated deploy job. It should not use a personal access token, custom cloud credential, or repository secret. Every Action should be pinned to a reviewed full commit SHA, while Dependabot tracks both npm and Actions updates. Pull-request validation may build untrusted code only with a read-only token and no secrets; it must not deploy and must not use `pull_request_target` to check out contributor code.

* Questions: Q6
* Evidence state: evidence-backed finding
* Evidence: W27-W30, W32, W33, W36-W39 establish least privilege, untrusted-code risks, immutable Action references, official Pages permissions, and reproducible installs.
* Confidence and limits: High for the planned static deployment. Future analytics, CMS, form, or cloud integrations would require a new secrets and trust-boundary assessment.

### The current repository security defaults need hardening

The repository currently grants Actions a default read/write token, permits Actions to approve pull requests, has no rulesets, and reports secret scanning and push protection disabled. Before publication, set the default workflow token to read-only, prevent workflows from approving pull requests, protect `main` against force pushes/deletion, require the build/check workflow before merge, and enable secret scanning plus push protection where the repository settings allow it. For a solo-owned blog, required independent review may be impractical; required checks and protected workflow paths still provide meaningful safeguards.

* Questions: Q6
* Evidence state: evidence-backed finding
* Evidence: C3, W27, W31, W34, W40, and W41 establish the live posture and available controls.
* Confidence and limits: High for the observed settings. Some GitHub security features vary by plan and repository state; exact settings must be confirmed during implementation.

### Dependency compromise is a larger technical risk than the public source itself

Astro produces a static site, so there is no persistent application server to attack after deployment. The build still executes npm package lifecycle code and GitHub Actions, making the dependency and CI supply chain the main technical trust boundary. Commit the lockfile, use `npm ci`, keep dependencies intentionally small, review dependency updates, and avoid unnecessary remark/rehype, analytics, comment, and UI-framework packages.

* Questions: Q6
* Evidence state: evidence-backed finding
* Evidence: W25, W29, W32, W33, W39, and W42 support the static-runtime reduction and build-time supply-chain controls.
* Confidence and limits: High. A static page can still serve malicious JavaScript if a trusted dependency, workflow, or merged change is compromised.

### Repository visibility is not a substitute for web security controls

Making the source private would conceal drafts and implementation details but would not make the GitHub Pages site private. It also would not remove dependency, workflow, domain, or published-script risks. A private source repository is justified only if same-repository private drafts are a firm requirement and the account plan supports private Pages; otherwise it adds cost or cross-repository deployment complexity without materially improving the public site's runtime security.

* Questions: Q6
* Evidence state: evidence-backed finding
* Evidence: W26, W28-W30, W36-W38, and W43 support the visibility and deployment trade-off.
* Confidence and limits: High for the current static-blog scope.

## Recommendation and Alternatives

* Recommendation or decision state: Confirmed architecture remains appropriate: Astro static output + GitHub Actions + GitHub Pages in the public repository, validated plain Markdown content collections, optional MDX by exception, local assets, exact URL preservation, and a warm, story-led design. Add a publication boundary and hardened repository/workflow controls.
* Rationale: The public repository provides transparency and free Pages/security capabilities without increasing the static site's runtime attack surface, provided only publication-ready content enters history and the workflow uses least privilege, immutable Actions, deterministic dependencies, protected `main`, and no custom secrets (C2, C3, W25-W43).
* What could change this result: A requirement to version private drafts or sensitive assets in the same repository would justify private source hosting on an eligible plan or a separate private authoring repository.

| Option | Benefits | Costs and risks | Evidence | Disposition |
|--------|----------|-----------------|----------|-------------|
| Astro static site | Typed Markdown collections, component-rich custom design, zero client JS by default, first-party Pages action, integrated images/RSS/sitemap | Node dependency surface and more concepts than a minimal blog | W3, W7, W8, W12-W15, W25 | selected |
| Jekyll | Conventional Markdown blog model, native heritage, small architecture | Ruby toolchain, fixed conventions, less compelling typed-content/design ergonomics | W6, W19, W20 | rejected for this goal; viable if minimalism dominates |
| Eleventy | Lightweight and flexible, direct templates, capable image plugin | More manual assembly and no equivalent built-in typed collection contract | W9, W21 | viable fallback |
| Hugo | Fast builds and mature content/frontmatter model | Different Go-template ecosystem and no decisive benefit at this scale | W22, W23 | viable fallback |
| Preserve Squarespace | Lowest immediate migration effort | Does not satisfy GitHub Pages or repository-owned Markdown goals | Caller direction | rejected |
| Public source and public Pages | Transparent source, simple deployment, free public-repository security features, no cross-repository credential | All committed history and assets are disclosed; requires strict publication discipline | C2, C3, W26-W42 | selected |
| Private source with private-repository Pages | Conceals source history and drafts | Pages output remains public, plan-dependent, and does not remove workflow/dependency risk | W26, W43 | viable only if private drafts must share the repo |
| Private authoring repo deploying to a separate public Pages repo | Strong separation between drafts and published source/output | More repositories, cross-repository authentication, synchronization, and secret complexity | W27-W30, W43 | rejected for current scope |

## Scope and Questions

* Goal: Recommend an evidence-supported approach for migrating https://www.benarculus.com/ from Squarespace to GitHub Pages in benarculus/benarculus, improving visual design, and managing blog posts as Markdown.
* Audience and use: The site owner will use the research to choose a technical direction and prepare a later implementation plan.
* In scope: Current public-site structure and content signals; repository baseline and public visibility; GitHub Pages constraints; static-site generator options; Markdown/MDX content models; custom-domain, SEO, redirect, asset, design-system, accessibility, migration, workflow, secrets, dependency, contribution, and repository-governance considerations.
* Out of scope: Editing source or production documentation, exporting or scraping private Squarespace data, implementation, planning task sequences, and publishing or DNS changes.
* Decision and evidence criteria: GitHub Pages compatibility, Markdown-first authoring, visual design flexibility, maintainability, migration fidelity, performance/accessibility/SEO support, ecosystem health, public-source confidentiality, least privilege, supply-chain integrity, and operational simplicity.
* Requested output: Convergence research with one recommended direction, alternatives, risks, user-owned decisions, and planning readiness.

| ID | Question | Source | Status |
|----|----------|--------|--------|
| Q1 | What content, navigation, URLs, assets, metadata, and design characteristics must be preserved or deliberately changed? | Inferred from migration goal | answered by W1, W2, W10, W11, W16-W18 |
| Q2 | Which GitHub Pages-compatible stack best balances Markdown authoring, design quality, maintainability, and deployment simplicity? | Inferred from stated goals | answered by W3, W6-W9, W12-W15, W19-W25 |
| Q3 | What migration constraints apply to custom domains, SEO, redirects, feeds, images, and Squarespace-exported content? | Inferred from platform move | answered by W4, W10-W17, W24 |
| Q4 | What content model and visual-system approach will support a high-quality personal blog without unnecessary complexity? | Inferred from design and CMS goals | answered by W8, W14, W15, W18, W25 and confirmed by D2 |
| Q5 | What credible counterarguments or alternatives could make the leading approach a poor fit? | Required contrarian wave | answered by W6, W9, W19-W23 |
| Q6 | What security risks and controls apply when the blog source, content, dependencies, and deployment workflow live in a public repository? | Explicit caller addition | answered by C2, C3 and W26-W43 |

## Decisions and Feedback

| Group | Decision or feedback item | Status | Owner | Rationale or input needed | Evidence | Impact of answer |
|-------|---------------------------|--------|-------|---------------------------|----------|------------------|
| D1 | Adopt Astro static output, GitHub Actions, GitHub Pages, and plain Markdown by default | confirmed | user | User selected the evidence-backed recommendation; Jekyll/Eleventy remain documented alternatives | W3, W6-W9, W12-W15, W19-W25 | Architecture gate passed |
| D2 | Select the visual character for the redesign | confirmed | user | User selected “Human leadership — warm, approachable, story-led” over editorial authority, modern security, and personal minimalism | W18, W25 | Design-direction gate passed |
| D3 | Retain the public repository with a publication-only content boundary and hardened automation | confirmed | user/research | The caller explicitly scoped the repository as public; Cycle 2 found no material security benefit from changing visibility for this public static site | C2, C3, W26-W43 | Security gate passed; private drafts remain outside the repository |

## Risks and Open Questions

| Priority | Type | Risk, question, or research item | Impact | Smallest action or evidence needed | Owner |
|----------|------|---------------------------------|--------|------------------------------------|-------|
| H | risk | Private, draft, unindexed, analytics-relevant, or unsupported Squarespace content may not appear in the sitemap or export | Incomplete migration or lost assets | Before cancellation, export XML and inventory Squarespace pages, drafts, media, analytics, and Search Console URLs | user/downstream |
| H | risk | DNS/custom-domain cutover can cause downtime or certificate delay if changed before the Pages deployment is verified | Site availability and trust | Validate the generated site on the GitHub Pages URL, verify the domain, then change DNS and enforce HTTPS | downstream |
| M | risk | GitHub Pages cannot provide arbitrary server-side redirect rules for a static site | Legacy paths may be difficult to redirect cleanly | Preserve current paths exactly and inventory any additional URLs before design changes | downstream |
| M | risk | A component-heavy MDX authoring model could undermine the requested Markdown simplicity | Higher authoring friction and lower portability | Keep `.md` as default and require evidence for each MDX use | downstream |
| L | open question | Exact typography, palette, and imagery are not selected | Planning can define candidate tokens and validate them against the confirmed human-leadership direction | Produce and validate concrete design-system choices during implementation planning | downstream |
| L | further research | Analytics and comment requirements were not specified | Could add privacy or third-party service decisions | Confirm only if these capabilities are required in the new site | user/downstream |
| H | risk | The current repository Actions token defaults to write and can approve pull requests | A compromised or unsafe workflow could modify repository state or weaken review | Change default token to read-only and disable workflow PR approval before enabling deployment | downstream |
| H | risk | Secret scanning and push protection report disabled | Credentials could enter public history before detection | Enable available secret scanning/push protection and use local/pre-commit prevention | downstream |
| H | risk | No ruleset currently protects `main` | Accidental force pushes, deletion, or unchecked deployment changes remain possible | Protect `main`, require build checks, block force pushes/deletion, and protect workflow changes | downstream |
| H | risk | Drafts, private images, location metadata, or personal data committed to Git become public history | Confidentiality or privacy loss that is difficult to reverse | Keep drafts in a separate private workspace; strip unnecessary image metadata before publication | user/downstream |
| M | risk | Mutable Action tags or unnecessary npm packages expand the build supply chain | Upstream compromise could publish malicious output | Pin Actions to full SHAs, commit the lockfile, use `npm ci`, enable Dependabot, and minimize dependencies | downstream |
| M | risk | A future fork-PR preview or automation could execute untrusted content with privileges | Repository takeover or secret theft | Keep PR checks read-only/secretless; never combine `pull_request_target` with untrusted checkout | downstream |

## Planning Readiness and Next Step

| Field                            | Record |
|----------------------------------|--------|
| Research disposition             | executed |
| Decision participation           | user-owned; standalone explicit skill invocation |
| Planning Readiness               | Ready; Q1-Q6 are answered, architecture/design decisions remain confirmed, and public-repository security controls are defined |
| Research depth and lanes         | Two complete inline balanced cycles; Cycle 2 completed security Wider, Deeper, and Contrarian waves with no delegated lanes because repository and workflow evidence was tightly coupled |
| Blockers                         | None |
| Output mode and planning support | convergence; supports planning when Ready |
| Continuation owner               | user |
| Required gates or confirmations  | Architecture, visual direction, public visibility, and required security controls recorded |
| Next action                      | User may run `/rpi-plan`; the plan must include the security controls in Q6 |
| Primary evidence file            | .copilot-tracking/research/2026-09-16/blog-migration-research.md |

## Research Record

### Method and Boundaries

| Field                            | Record |
|----------------------------------|--------|
| Research posture and provenance  | balanced; inferred from a bounded migration goal with meaningful adjacent uncertainty |
| Completion basis                 | Cover all material questions with current primary evidence, evaluate credible alternatives, complete the contrarian wave, and stop when further likely sources are redundant |
| Explicit limits or deadline      | No caller-provided limit or deadline |
| Codebase and external scope      | Current benarculus/benarculus worktree; public benarculus.com pages and official platform/framework documentation |
| Initial candidate areas          | Repository baseline and visibility, current site information architecture and URLs, GitHub Pages, Jekyll, Astro, Eleventy, Markdown/MDX, Squarespace export, SEO/redirects, accessibility, visual design, Actions permissions, secrets, dependency supply chain, contribution trust, and repository governance |
| Evidence root                    | Default .copilot-tracking/research/ |
| Constraints and excluded sources | Research-only; no source edits, implementation, private Squarespace access, DNS changes, or publication |
| Prior knowledge                  | User states the site is on Squarespace and wants GitHub Pages plus Markdown content; treated as caller direction. No existing repository artifact was available for reuse. |

### Extensions and Participation

#### Extension Registry

| Kind | Candidate | Provenance and scoped contract | Selected or skipped reason |
|------|-----------|--------------------------------|----------------------------|
| instruction | copilot-tracking.instructions.md | Applies to .copilot-tracking/research/** and governs evidence paths and conventions | selected |
| skill | accessibility | Available domain guidance for accessibility and inclusive design | skipped at intake; official standards can be researched directly and no separate assessment was requested |
| specialist | research | Built-in thorough GitHub/web research with citations | skipped; the evidence set is tightly coupled and can be investigated inline without a separate lane artifact |
| specialist | hve-core:rpi-researcher | Delegated independent RPI research lane with progressive evidence writes | skipped; no independent lane yet materially justifies delegation |

#### Direction and Participation Log

| Checkpoint or change | Question, direction, or rationale | Answer or no-interaction reason | Result and revalidation effect |
|----------------------|-----------------------------------|--------------------------------|--------------------------------|
| intake | Is the topic and initial scope sufficient to begin? | Yes; the user named the current site, target repository/host, design goal, and Markdown authoring goal | Begin balanced convergence research without intake interruption |
| intake | Decision participation mode | Standalone invocation defaults to user-owned | Material decisions will be walked through after synthesis |
| convergence D1 | Select the site generator and default content format | Astro + plain Markdown (Recommended) | Confirmed Astro static output, GitHub Actions, GitHub Pages, and `.md` as the default post format |
| convergence D2 | Select the visual character | Human leadership — warm, approachable, story-led | Confirmed design direction; planning may now define accessible typography, palette, imagery, and layout tokens |
| scope addition | Research security considerations of using a public repository | Explicit user direction | Reopened Research for Cycle 2 and added Q6; security synthesis preserved the selected architecture with additional controls |

### Research Cycle Log

#### Cycle 1

* Active posture, controls, and limits: Balanced convergence research; remain read-only outside the evidence root; no explicit deadline.

##### Wave 1: Wider

* Focus and lanes: Investigated the current public site and sitemap, GitHub Pages hosting and custom-domain constraints, and the Markdown/content/deployment capabilities of Jekyll, Astro, and Eleventy.
* Evidence or worker pointers: C1; W1-W9.
* Reflection: The migration is unusually small at the visible-content layer: the sitemap exposes only `/blog` and one article URL, while the article supplies identifiable title, author, publication dates, social metadata, hero image, disclosure text, headings, citations, and social links. GitHub Pages does not require Jekyll: official guidance supports arbitrary static generators through GitHub Actions. Astro and Eleventy both support GitHub Pages and Markdown collections; Astro adds a strongly typed content schema and first-party Pages action. Wave 2 will prioritize URL/SEO fidelity, content schema, assets, feeds, accessibility, and the operational differences among the candidates.

##### Wave 2: Deeper

* Focus and lanes: Prioritized URL and metadata preservation, Squarespace export completeness, the Markdown content contract, feeds/sitemaps, image ownership and optimization, structured data, and accessible editorial design.
* Evidence or worker pointers: W10-W18 deepen W1-W9.
* Reflection: Astro can reproduce the existing `/blog/<slug>` route, canonical metadata, RSS, sitemap, article schema, and responsive images while validating frontmatter at build time. The Squarespace export is useful as a source transcript, not a complete migration: it exports one blog and common text/image blocks in WordPress XML but omits style settings, custom CSS, drafts, page-specific chrome, and several block types. The existing RSS feed provides a cleaner machine-readable copy of the sole public article and its image. Plain `.md` should be the default authoring format; MDX is best retained as an explicit escape hatch because it adds component power and authoring/dependency complexity.

##### Wave 3: Contrarian

* Focus and lanes: Challenged Astro against Jekyll, Eleventy, and Hugo; tested whether GitHub Pages creates material hosting, routing, HTTPS, dependency, or authoring disadvantages.
* Evidence or worker pointers: W19-W25.
* Reflection: Jekyll remains the smallest platform-native choice and has excellent plain-Markdown conventions; Eleventy offers a lighter conceptual layer and capable image tooling; Hugo offers a mature content model and very fast builds. None disproves Astro's fit. For this greenfield, design-led blog, Astro's typed content collections, component model, zero-JavaScript default, official Pages action, and integrated image handling outweigh its Node dependency and larger abstraction surface. The recommendation weakens if the owner's dominant priority is the fewest dependencies or editing exclusively in GitHub's web UI.

##### Parent Synthesis and Re-entry

| Material or claim | Evidence or worker pointers | Disposition | Rationale | User-facing effect |
|-------------------|-----------------------------|-------------|-----------|--------------------|
| Repository is a greenfield target | C1 | accepted | The current branch has no tracked files | Architecture can be selected on fit rather than compatibility |
| Preserve current domain and public paths | W1, W2, W4, W16 | accepted | Keeping the same domain and exact article path minimizes migration and SEO risk | No content redirect is required for the visible article |
| Use Astro with static output and GitHub Actions | W3, W7, W8, W12-W15, W25 | accepted | Best balance of Markdown safety, visual composition, performance, and first-party deployment support | Recommended architecture |
| Use plain Markdown by default and MDX only by exception | W8, W15 | accepted | Plain Markdown minimizes authoring friction while MDX remains available for rare interactive or component-rich posts | Keeps content portable |
| Use the Squarespace export as the sole source of truth | W10, W11 | rejected | The export is incomplete; RSS, sitemap, public metadata, local asset copies, and manual verification are needed | Migration needs multiple source checks |
| Choose Jekyll solely because GitHub Pages supports it natively | W3, W6, W19, W20 | rejected | GitHub Actions removes the native-build advantage, while Astro better matches the visual and typed-content criteria | Jekyll remains a viable simplicity alternative |
| Choose Eleventy for minimal abstraction | W9, W21 | deferred | It is credible and flexible, but gains less from a typed content contract and requires more assembly for the desired polished system | Viable fallback if simplicity dominates |
| Choose Hugo for speed and mature content features | W22, W23 | deferred | Strong alternative, but introduces a different templating/toolchain ecosystem without a decisive benefit at this site's scale | Viable fallback for Go/Hugo preference |

* Another complete three-wave cycle needed: no
* Trigger or stop basis: All material questions are evidence-backed; the public site is small, official sources are consistent, alternatives have been challenged, and likely next sources are redundant. User-owned product/design preferences remain decisions rather than evidence gaps.
* Readiness or revalidation effect: Research is complete; Planning Readiness depends on resolving D1-D2.

#### Cycle 2

* Active posture, controls, and limits: Balanced, security-focused extension of the confirmed public-repository architecture; research-only boundary remains active.

##### Wave 1: Wider

* Focus and lanes: Inventoried current visibility, public-source exposure, Pages visibility, Actions permissions and untrusted-input risks, secrets, dependencies, and branch governance.
* Evidence or worker pointers: C2; W26-W34.
* Reflection: The repository is already public. Public visibility does not grant write access, but every committed file and historical revision should be treated as permanently disclosed. The basic Astro Pages deployment does not need application secrets; its workflow should use only the documented Pages permissions, a read-only build job, and a narrowly scoped deploy job. The largest avoidable risks are committing drafts/private assets, granting excessive `GITHUB_TOKEN` permissions, using mutable third-party Action tags, and executing untrusted pull-request content in a privileged context.

##### Wave 2: Deeper

* Focus and lanes: Prioritized the official Astro/Pages permission model, deployment environment, artifact handling, immutable Actions, deterministic npm installs, protected branches, CODEOWNERS, public-history cleanup, secret prevention, and the repository's live settings.
* Evidence or worker pointers: C3; W35-W42 deepen C2 and W26-W34.
* Reflection: The official Pages model supports a secretless workflow with a read-only build job and a separately privileged deployment job using only `pages: write` and `id-token: write` in the protected `github-pages` environment. The source repository's current default workflow token is broader than required, workflows can approve pull requests, no ruleset exists, and secret scanning/push protection report disabled. Deterministic installs, full-SHA Action pinning, dependency updates, and protected workflow/dependency paths are therefore implementation requirements rather than optional polish. Public-history cleanup is an incident-response measure, not a confidentiality control: prevention and prompt credential rotation matter more.

##### Wave 3: Contrarian

* Focus and lanes: Tested a private source repository, a separate private-authoring/public-output repository pair, disabling outside contributions, mandatory independent review, CodeQL, and moving away from GitHub Pages for stronger response-header control.
* Evidence or worker pointers: W26-W30, W36-W43.
* Reflection: Private source would conceal drafts but would not make the Pages site private or remove dependency/workflow risk. A split repository would add cross-repository credentials and synchronization for little benefit at the current one-author scale. Outside pull requests can remain available if checks are read-only and secretless, but no contributor preview or privileged automation is needed initially. Mandatory independent approval is not proportionate for a solo-owned personal blog; required checks, protected branches, and CODEOWNERS visibility are more practical. Code scanning is optional rather than a readiness gate for a minimal static Astro site, while dependency and workflow controls directly address the dominant risks. GitHub Pages response-header limitations are not a reason to change host while the site remains zero-JavaScript-by-default and avoids sensitive transactions; revisit hosting only if strict custom security headers become a firm requirement.

##### Parent Synthesis and Re-entry

| Material or claim | Evidence or worker pointers | Disposition | Rationale | User-facing effect |
|-------------------|-----------------------------|-------------|-----------|--------------------|
| Keep the source repository public | C2, W26, W35, W43 | accepted | The site and intended source are public, and private source does not reduce published runtime or supply-chain risk enough to justify added cost/complexity | Public visibility becomes a deliberate publication boundary |
| Treat public Git history as permanent disclosure | W31, W35, W41 | accepted | Cleanup cannot reliably recall secrets or private content from clones, forks, caches, or references | Drafts and private assets stay outside this repository |
| Use a secretless, privilege-separated Pages workflow | W27-W30, W36-W38 | accepted | Official Pages OIDC deployment needs only narrow job-scoped permissions and no personal token | Build stays read-only; only deploy can publish |
| Pin Actions to immutable SHAs and use deterministic npm installs | W29, W32, W33, W39, W42 | accepted | The build supply chain is the dominant technical trust boundary | Lockfile, `npm ci`, Dependabot, and reviewed Action updates become requirements |
| Harden the current repository settings before deployment | C3, W27, W31, W34, W40, W41 | accepted | Current workflow defaults and absent rules leave avoidable privilege and integrity risk | Read-only default token, protected `main`, required checks, and secret prevention enter the plan |
| Require an independent approving reviewer for every change | W34, W40 | rejected for current scope | The blog currently has one owner, so this could block ordinary publishing without materially improving the practical control set | Use required automated checks and optional review rather than a mandatory second person |
| Use a private authoring repository and public output repository | W27-W30, W43 | rejected | Cross-repository deployment introduces credentials and synchronization complexity disproportionate to one public post and one author | Revisit only if private drafts must be versioned |
| Make CodeQL a planning gate | W42 | deferred | Useful defense in depth, but a minimal zero-JavaScript static site benefits more directly from dependency review, type/build checks, and workflow hardening | Optional after the baseline controls |

* Another complete three-wave cycle needed: no
* Trigger or stop basis: Q6 is answered with official sources and live repository metadata; contrarian alternatives do not materially improve the selected design, and likely next sources are implementation detail rather than decision-changing evidence.
* Readiness or revalidation effect: Planning Readiness restored to Ready. The confirmed Astro/public-Pages direction remains selected with security requirements added to downstream planning.

### Evidence Log

* Delegation: inline; the tightly coupled evidence set does not justify a separate worker artifact at intake.

| ID | Claim or finding | Source or location | Retrieved and version | Tool | Confidence | Notes |
|----|------------------|--------------------|-----------------------|------|------------|-------|
| C1 | The target repository contains no tracked files at research start | Repository root and `git ls-tree -r --name-only HEAD` | not applicable | read | high | Branch benarculus-blog-migration-research; only the worktree `.git` pointer existed before this artifact |
| C2 | `benarculus/benarculus` is currently a public repository with `main` as its default branch | GitHub repository metadata for benarculus/benarculus | not applicable | GitHub read | high | Confirmed through `gh repo view`; no settings were changed |
| C3 | The repository currently has default Actions workflow permissions set to write, permits Actions to approve pull requests, has no rulesets, has Dependabot security updates enabled, reports secret scanning and push protection disabled, and has no configured Pages site | GitHub API metadata for `benarculus/benarculus`: Actions permissions, rulesets, security-and-analysis, and Pages endpoints | 2026-09-16; live repository settings | GitHub read | high | Read-only inspection; no repository setting was changed |
| W1 | The public sitemap lists only `/blog` and one article, last modified 2024-02-12 | benarculus.com sitemap, https://www.benarculus.com/sitemap.xml | 2026-09-16; live XML | external research | high | Establishes the public URL inventory visible to crawlers, not private or unindexed content |
| W2 | The visible article includes one authored long-form post with stable canonical URL, 2024 publication/modification dates, description, social metadata, hero image, disclosure, headings, citations, and author/social identity signals | Current article, https://www.benarculus.com/blog/generate-clarity-by-establishing-a-writing-practice | 2026-09-16; live page | external research | high | Public content and raw metadata were inspected; visual rendering has not yet been independently measured |
| W3 | GitHub Pages hosts static HTML/CSS/JS and supports custom static-site-generator builds through GitHub Actions; it does not support server-side application languages | GitHub Docs, https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site | 2026-09-16; current docs | external research | high | Removes Jekyll as a hosting requirement |
| W4 | GitHub Pages supports custom apex and `www` domains, recommends domain verification and `www`, and can redirect between configured apex and `www` variants | GitHub Docs, https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/about-custom-domains-and-github-pages | 2026-09-16; current docs | external research | high | Domain setup is feasible but is a later operational change |
| W5 | GitHub Pages has static-hosting constraints and published-site/build/bandwidth limits that are far above the currently visible blog scale | GitHub Docs, https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits | 2026-09-16; current docs | external research | high | The current site is a normal informational blog use case; transactional or server-side features would require another service |
| W6 | Jekyll has built-in GitHub Pages support, Markdown/frontmatter and themes, but branch builds have fixed settings and unsupported-plugin restrictions; GitHub Actions is now GitHub's recommended automation approach | GitHub Docs, https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll | 2026-09-16; current docs | external research | high | Native support is real but less decisive when Actions is used |
| W7 | Astro officially supports static GitHub Pages deployment through its maintained GitHub Action and custom domains through a public `CNAME` plus site configuration | Astro Docs, https://docs.astro.build/en/guides/deploy/github/ | 2026-09-16; current docs | external research | high | Direct fit for the requested repository and host |
| W8 | Astro supports local Markdown/MDX, build-time content collections, schema validation, type safety, custom slugs, static route generation, and build-time image processing | Astro Docs, https://docs.astro.build/en/guides/content-collections/ and https://docs.astro.build/en/guides/markdown-content/ | 2026-09-16; current docs | external research | high | Strong fit for a Markdown-first blog with richer design components |
| W9 | Eleventy supports Markdown-driven collections and GitHub Pages deployment through Actions, with comparatively direct content/template concepts | Eleventy Docs, https://www.11ty.dev/docs/collections/ and https://www.11ty.dev/docs/deployment/#deploy-an-eleventy-project-to-github-pages | 2026-09-16; current docs | external research | high | Credible lower-abstraction alternative |
| W10 | Squarespace exports one blog plus common text/image content to WordPress XML, but omits style settings, custom CSS, drafts, page-specific headers/footers/sidebars, and several block/page types; images can require separate handling | Squarespace Help Center API, https://support.squarespace.com/api/v2/help_center/en-us/articles/206566687.json | 2026-09-16; article updated 2026-08-28 | external research | high | Confirms export is an input to conversion, not a complete site backup |
| W11 | The current Squarespace RSS feed exposes the complete sole article body, author, publication date, canonical link, description, and a 1500x1126 JPEG URL | Current RSS feed, https://www.benarculus.com/blog?format=rss | 2026-09-16; live RSS | external research | high | A strong fallback or cross-check for converting the one public post to Markdown |
| W12 | Astro's official RSS helper generates a static feed from content collections and can validate feed-related properties; full-content feeds require care with sanitization and absolute asset URLs | Astro Docs, https://docs.astro.build/en/recipes/rss/ | 2026-09-16; current docs | external research | high | Supports preserving subscription capability while favoring a summary feed for simplicity |
| W13 | Astro's official sitemap integration generates sitemap files from static routes and uses the configured production `site` URL | Astro Docs, https://docs.astro.build/en/guides/integrations-guide/sitemap/ | 2026-09-16; current docs | external research | high | Supports automated crawl metadata |
| W14 | Astro can optimize local Markdown images at build time, generate responsive sizes/formats, infer dimensions to reduce layout shift, and requires alternative text in its image component | Astro Docs, https://docs.astro.build/en/guides/images/ | 2026-09-16; current docs | external research | high | Supports local ownership and improved performance of migrated Squarespace assets |
| W15 | Astro's optional MDX integration permits components and expressions inside content but adds syntax and integration complexity beyond standard Markdown | Astro Docs, https://docs.astro.build/en/guides/integrations-guide/mdx/ | 2026-09-16; current docs | external research | high | Supports keeping MDX optional rather than making it the default |
| W16 | Google recommends inventorying URLs/assets, preserving or mapping URLs, using self-canonical links, updating internal links, shipping sitemaps, testing, and monitoring Search Console during a site move; changing one major variable at a time reduces risk | Google Search Central, https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes | 2026-09-16; current docs | external research | high | Because the domain can remain unchanged, exact path preservation can avoid most redirect needs |
| W17 | `BlogPosting`/`Article` structured data can explicitly communicate author, headline, publication/modification dates, and representative images to search engines | Google Search Central, https://developers.google.com/search/docs/appearance/structured-data/article | 2026-09-16; current docs | external research | high | The existing metadata can be normalized into a reusable article layout |
| W18 | WCAG 2.2 guidance supports an editorial system with at least 4.5:1 normal-text contrast, one-dimensional reflow at 320 CSS pixels, robust text-spacing overrides, visible focus indicators, and at least 24x24 CSS-pixel targets or sufficient spacing | W3C WAI, https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html; https://www.w3.org/WAI/WCAG22/Understanding/reflow.html; https://www.w3.org/WAI/WCAG22/Understanding/text-spacing.html; https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance.html; https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html | 2026-09-16; WCAG 2.2 understanding docs | external research | high | These are design-system constraints, not a visual style prescription |
| W19 | Jekyll provides baked-in Markdown posts, frontmatter, drafts, tags/categories, assets, and configurable permalinks | Jekyll Docs, https://jekyllrb.com/docs/posts/ and https://jekyllrb.com/docs/permalinks/ | 2026-09-16; current docs | external research | high | Strong simplicity alternative, especially for a conventional blog |
| W20 | GitHub recommends Actions even for Jekyll automation, reducing the practical deployment distinction between Jekyll and other generators | GitHub Docs, https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll | 2026-09-16; current docs | external research | high | Jekyll's native platform advantage is smaller than commonly assumed |
| W21 | Eleventy has a capable build-time image plugin that can localize remote images, generate responsive formats and dimensions, and run with no server dependency | Eleventy Docs, https://www.11ty.dev/docs/plugins/image/ | 2026-09-16; current docs | external research | high | Counters any claim that Astro uniquely supports high-quality static images |
| W22 | Hugo supports GitHub Pages through Actions with static output and continuous deployment | Hugo Docs, https://gohugo.io/host-and-deploy/host-on-github-pages/ | 2026-09-16; current docs | external research | high | Establishes another mature Pages-compatible alternative |
| W23 | Hugo has mature frontmatter controls for drafts, dates, descriptions, slugs, aliases, resources, and output formats | Hugo Docs, https://gohugo.io/content-management/front-matter/ | 2026-09-16; current docs | external research | high | Strong content-model alternative, though without Astro's TypeScript schema model |
| W24 | GitHub Pages supports HTTPS for correctly configured custom domains, but mixed-content assets must be removed and DNS must be correct | GitHub Docs, https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https | 2026-09-16; current docs | external research | high | Localizing the current HTTP-declared social image avoids mixed-content risk |
| W25 | Astro components render to HTML with zero client-side JavaScript by default, while permitting isolated interactivity only where required | Astro Docs, https://docs.astro.build/en/basics/astro-components/ | 2026-09-16; current docs | external research | high | Supports a visually rich site without a SPA runtime |
| W26 | GitHub Pages sites are public even when their source repository is private; on GitHub Free, a Pages source repository must be public | GitHub Docs, https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site | 2026-09-16; current docs | external research | high | Private source can reduce source disclosure on eligible plans but does not make the deployed site private |
| W27 | GitHub recommends least-privilege `GITHUB_TOKEN` permissions because Actions can access the token through context even when it is not explicitly passed | GitHub Docs, https://docs.github.com/en/actions/tutorials/authenticate-with-github_token | 2026-09-16; current docs | external research | high | Workflow permissions must be explicit and job-scoped |
| W28 | Privileged workflows must not check out or execute untrusted pull-request code; `pull_request_target` and unsafe `workflow_run` patterns can lead to repository takeover | GitHub Docs, https://docs.github.com/en/actions/reference/security/secure-use | 2026-09-16; current docs | external research | high | Important if outside contributors or automated preview workflows are later enabled |
| W29 | Third-party Actions should be pinned to full-length commit SHAs; mutable tags can be moved if an upstream maintainer is compromised | GitHub Docs, https://docs.github.com/en/actions/reference/security/secure-use | 2026-09-16; current docs | external research | high | Applies even to a small static site because Actions execute inside the trusted build |
| W30 | Anyone with repository write access can read repository-level Actions secrets, and workflow logs can leak transformed or mishandled secret values | GitHub Docs, https://docs.github.com/en/actions/reference/security/secure-use and https://docs.github.com/en/actions/how-tos/write-workflows/choose-what-workflows-do/use-secrets | 2026-09-16; current docs | external research | high | The blog deployment should avoid custom secrets entirely unless a future integration requires them |
| W31 | Secret scanning scans full Git history and is automatically available for public repositories | GitHub Docs, https://docs.github.com/en/code-security/concepts/secret-security/secret-scanning | 2026-09-16; current docs | external research | high | Helpful detection control, but not a substitute for preventing commits |
| W32 | Dependabot can open security updates for vulnerable npm and GitHub Actions dependencies | GitHub Docs, https://docs.github.com/en/code-security/concepts/supply-chain-security/dependabot-security-updates | 2026-09-16; current docs | external research | high | Relevant to Astro/npm and workflow Actions |
| W33 | Dependabot version updates can monitor both npm and GitHub Actions on a schedule through `.github/dependabot.yml` | GitHub Docs, https://docs.github.com/en/code-security/how-tos/secure-your-supply-chain/secure-your-dependencies/configure-version-updates | 2026-09-16; current docs | external research | high | Supports proactive maintenance rather than only known-vulnerability response |
| W34 | Repository rulesets can restrict pushes, require reviews and status checks, block force pushes/deletions, and control commit metadata | GitHub Docs, https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets | 2026-09-16; current docs | external research | high | Protects `main` and deployment workflow changes from accidental or unauthorized direct changes |
| W35 | Removing sensitive data from a Git repository is disruptive and cannot reliably recall copies from forks, clones, cached views, pull-request references, or already used credentials; exposed credentials should be revoked or rotated first | GitHub Docs, https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository | 2026-09-16; current docs | external research | high | Supports treating all public history as disclosed and preventing secrets/drafts before commit |
| W36 | Astro's official GitHub Pages example uses Actions to build static output and the official Pages deployment path | Astro Docs, https://docs.astro.build/en/guides/deploy/github/ | 2026-09-16; current docs | external research | high | The planned deployment does not require a custom server or deployment credential |
| W37 | `actions/deploy-pages` requires `pages: write` and `id-token: write`, recommends deployment in a dedicated job, and uses the `github-pages` environment for protection and URL reporting | GitHub, `actions/deploy-pages`, https://github.com/actions/deploy-pages | 2026-09-16; current README | external research | high | Supports separating the privileged deployment job from the read-only build |
| W38 | `actions/upload-pages-artifact` packages the static artifact for Pages, excludes hidden files by default, and supports short retention | GitHub, `actions/upload-pages-artifact`, https://github.com/actions/upload-pages-artifact | 2026-09-16; current README | external research | high | Reduces accidental publication of hidden repository files and unnecessary artifact persistence, but generated output still requires inspection |
| W39 | `npm ci` requires an existing lockfile, performs a clean frozen install, and does not rewrite dependency manifests or the lockfile | npm Docs, https://docs.npmjs.com/cli/commands/npm-ci | 2026-09-16; current docs | external research | high | Appropriate for deterministic automated builds |
| W40 | Protected branches and CODEOWNERS can require checks or reviews and route review responsibility for sensitive paths such as workflows and dependency manifests | GitHub Docs, https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners and https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches | 2026-09-16; current docs | external research | high | Review requirements should remain proportionate for a solo-owned repository |
| W41 | Push protection can block supported secrets before they enter repository history, while secret scanning remains a detection control rather than permission to commit sensitive values | GitHub Docs, https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection | 2026-09-16; current docs | external research | high | Exact availability and status must be confirmed in repository settings |
| W42 | Code scanning can analyze GitHub Actions workflows and supported application code, while dependency review identifies vulnerable dependency changes; these controls are complementary rather than complete guarantees | GitHub Docs, https://docs.github.com/en/code-security/code-scanning/introduction-to-code-scanning/about-code-scanning and https://docs.github.com/en/code-security/supply-chain-security/understanding-your-software-supply-chain/about-dependency-review | 2026-09-16; current docs | external research | medium-high | CodeQL is useful defense in depth but not proportionate as a planning blocker for the initial minimal static site |
| W43 | Private-repository GitHub Pages depends on an eligible paid plan, while the published Pages site remains public unless GitHub Enterprise Cloud access controls apply | GitHub Docs, https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages | 2026-09-16; current docs | external research | high | Private source is primarily a source-confidentiality choice, not a general security upgrade for this public site |

#### Contradictions and Conflicts

* Full-SHA pinning reduces Action-reference tampering, while some automated dependency alerts work best with semantic-version references. Resolution: keep immutable SHAs as the security boundary and use Dependabot version updates plus review to propose SHA changes.
* GitHub documentation describes secret scanning as available for public repositories, while the live repository API reports it disabled. Resolution: record the live state as authoritative for current posture and require implementation-time enablement and verification rather than assuming protection is active.

### Artifact Self-Check

* [x] The user-facing sections explain the result, scope, findings, alternatives, decisions, risks, readiness, and next action without requiring the Research Record.
* [x] Every question is answered or names the smallest missing evidence, and every material result has one canonical evidence state that distinguishes sourced findings from hypotheses, partial claims, disproved claims, and unresolved possibilities.
* [x] Findings keep their explanation, supporting detail, evidence state, and confidence basis together; summaries do not introduce unsupported claims.
* [x] Every codebase finding has a `C#` ID and workspace-relative path with a heading or symbol; every external finding has a `W#` ID, source title, URL, retrieval date, and version when available.
* [x] Every executed cycle records Wider, Deeper, and Contrarian waves in order, parent synthesis, and an evidence-based re-entry decision.
* [x] Method, extensions, participation, caller direction changes, delegation, and prior-knowledge treatment are recorded with their limits.
* [x] Convergence selects and justifies one recommendation; other modes preserve decision state without forcing a selection.
* [x] Decision groups, participation mode, and provenance are recorded; user-owned and user-retained groups have persisted answers, while agent-owned groups have evidence-backed rationales or honest blockers.
* [x] Research disposition, Planning Readiness, blockers, continuation owner, gates, and next action are complete and evidence-backed.
* [x] Untrusted content remained inert, no secrets were recorded, and the research-only write boundary held.
* Checked sections: Executive Summary, What You May Not Know, Findings, Recommendation and Alternatives, Scope and Questions, Decisions and Feedback, Risks and Open Questions, Planning Readiness and Next Step, Method and Boundaries, Extensions and Participation, all three waves, Parent Synthesis and Re-entry, Evidence Log, Contradictions and Conflicts.
* Missing or limited sections: No private Squarespace inventory or account export was available; this is explicitly retained as a downstream pre-cancellation risk rather than a research blocker.
