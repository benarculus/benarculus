<!-- markdownlint-disable-file -->
# RPI Plan Critique: Blog migration

## Metadata

* Task ID: BLOG-MIGRATION-001
* Critique date: 2026-09-16
* Plan: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md
* Critique execution status: Complete
* Critique depth: standard
* Depth provenance: default from the RPI Plan contract; the user did not request deep
* Invocation consumed: yes
* Attempt ID and kind: `BLOG-MIGRATION-001-critique-initial-20260916T2119`; initial
* Candidate identity and saved hash boundary: saved pre-reservation SHA-256 `1cba472697de038b69ef7e37fd1593b425ed46b11e1c0d64c19137a117a078bd`; reservation metadata added after that boundary is excluded
* Current-dispatch provenance: immediate planning-parent dispatch in one uninterrupted execution after the started reservation was persisted and read back; no recovery involved
* Original attempt and recovery approval: Not applicable

## Inputs and Criterion Boundary

* Task context and caller requirements: Migrate `https://www.benarculus.com/` from Squarespace to GitHub Pages in the public `benarculus/benarculus` repository; Astro static output with GitHub Actions; plain Markdown with validated frontmatter by default; preserve the `www` domain, `/blog`, and the existing article path; warm, approachable, story-led human-leadership visual system; keep drafts, secrets, and sensitive assets outside public history; harden workflow and repository security. No implementation authorized.
* Research and evidence considered: .copilot-tracking/research/2026-09-16/blog-migration-research.md (C1-C3, W1-W43, D1-D3, contradictions log, risk table); read-only `git log`/`git ls-tree` inspection of the current worktree to confirm the greenfield baseline (HEAD has no tracked files; history shows `Delete README.md`).
* Decisions, dependencies, task Goals, and task Requirements considered: D1-D3; the full P01-P05 phase set and all fifteen `Pxx-Txx` blocks including Goals, Requirements, Details, References, and Dependencies; FR-001..FR-009; NFR-001..NFR-008; the risk, dependency, and Validation and Change Boundaries sections; all Before, After, and phase diagrams.
* Assessment boundary: This critique can assess internal consistency, requirement-to-task traceability, dependency ordering, checkability of stated conditions, and alignment with the supplied research. It cannot verify live GitHub repository settings beyond C2/C3, Squarespace account-side inventory, current DNS records, or the live behavior of `https://www.benarculus.com/` discovery endpoints, and it performed no open-ended web research. Findings about legacy discovery URLs rest on the research evidence log (W1, W11, W13) rather than a fresh fetch.

## Coverage Assessment

| Requirement, research, phase, or task ID | Coverage | Evidence or concern |
|------------------------------------------|----------|---------------------|
| FR-001, FR-002, FR-004, FR-006, FR-007, FR-009 | Covered | Each is cited by at least one task and traced to research findings; FR-006 has three P02 tasks plus P05-T01 review. |
| FR-003 | Partial | Route preservation names `/blog` and the exact article slug (W1, W2), but the project-site base path for `benarculus/benarculus` is never addressed (PC-001). |
| FR-005 | Partial | Canonical, social, RSS, sitemap, and `BlogPosting` generation are specified, but the currently published feed and sitemap URLs are not preserved (PC-002). |
| FR-008 | Covered | P05-T02 and P05-T03 cover DNS capture, verification order, HTTPS, and rollback. |
| NFR-001 | Partial | Contrast, focus, reflow, and text spacing have named checks; the 24-by-24 target-size clause has no named automated or manual check (PC-007). |
| NFR-002 | Partial | The zero-JavaScript default is checked, but the "documented island" exception has no documentation target or gate (PC-007). |
| NFR-003, NFR-006, NFR-007 | Covered | Deterministic install, publication boundary, and URL/HTTPS conditions appear in P01, P03, P04, and P05 requirements. |
| NFR-004, NFR-005 | Partial | Controls are complete in content but are applied only in P04-T03, after all P01-P03 commits and after the deployment workflow exists, contradicting the research sequencing (PC-003). |
| NFR-008 | Partial | Thresholds are explicit, but no permitted tool, run count, or device/throttling profile makes "reproducible" and "median" checkable, and the tool is excluded by Maximum additions (PC-005). |
| P01, P01-T01..T03 | Covered | Foundation goals, contract, and check surface are coherent and grounded in W3, W7, W8, W25, W39. |
| P02-T03 | Partial | Its NFR-008 requirement has no owned evidence; Validation ownership assigns Lighthouse to P05-T01 (PC-007), and its Details depend on P03-T01 output across a declared phase boundary (PC-006). |
| P03-T01, P03-T02 | Partial | Article and metadata fidelity are well specified; feed/sitemap URL continuity is missing (PC-002). |
| P03-T03 | Partial | Documents "draft handling outside public history" while P01-T02 mandates a committed `draft` field; the two are not reconciled (PC-004). |
| P04-T01, P04-T02 | Covered | Least privilege, no secrets, no `pull_request_target` checkout, SHA pins, split build/deploy jobs, and artifact inspection match W27-W30 and W36-W38. |
| P04-T03 | Partial | Control set matches W31-W34, W40-W42, but sequencing is late (PC-003) and the research-recorded Dependabot-versus-SHA-pin resolution is not carried forward (PC-010). |
| P05-T01..T03 | Partial | Validation, inventory, and cutover are thorough; pre-cutover verification at the GitHub Pages URL is undermined by PC-001, and cutover does not cover legacy discovery URLs (PC-002). |
| D1, D2, D3 | Covered | Decision groups, owners, and downstream gating match research D1-D3. |
| Risk table | Partial | Five risks with owners and actions; the public-history draft risk (research "H") and the feed/sitemap URL continuity risk are not represented (PC-002, PC-004). |
| Exact removals / Maximum additions / Canonical and Generated targets | Partial | Removals and generated targets are correct for the verified greenfield baseline; Maximum additions omits tooling that plan requirements mandate (PC-005). |
| Diagrams | Covered | Before and After reuse stable node IDs, every phase diagram highlights its slice, initialization objects carry the prescribed `fontFamily` and `fontSize`, and custom fills declare explicit text color. Dual-theme rendering evidence is not recorded (PC-008). |
| Artifact Self-Check | Missing | Every box is unchecked and the section declares the phase checklist, diagrams, task blocks, and readiness "missing or limited" while the summary claims a complete final candidate (PC-008). |

## Verdict

* Verdict: Revise
* Rationale: The architecture, security model, validation ownership, and change boundaries are strong and well traced to research. Three issues would surface as concrete implementation blockers or irreversible migration regressions: the plan never resolves that `benarculus/benarculus` publishes as a project site under a `/benarculus/` base path, so its own "verify at the GitHub Pages URL before DNS" gate cannot work as written (PC-001); the currently published feed and sitemap endpoints are silently dropped at cutover on a host with no redirect capability (PC-002); and the repository hardening that research says must precede deployment is scheduled after every content commit and after both workflows exist (PC-003). A `draft` field that contradicts the confirmed publication boundary (PC-004) and an unbuildable performance gate (PC-005) also need disposition before implementation.

## Findings

<!-- rpi:critique id=PC-001 -->
### PC-001 [High]: Project-site base path and pre-cutover preview URL are unaddressed

* Related IDs: FR-001, FR-003, FR-005, NFR-007, P01-T01, P01-T02, P03-T02, P04-T02, P05-T03
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (P03-T02 Requirements: "The production configuration declares `https://www.benarculus.com` as the site origin"; P04-T02 Details: "Keep custom-domain activation separate from the first successful Pages deployment so the site can be verified at its GitHub Pages URL"); .copilot-tracking/research/2026-09-16/blog-migration-research.md (W7, W26, C2); repository baseline confirms owner and repository names are both `benarculus`.
* Concern: `benarculus/benarculus` is not a `<user>.github.io` repository, so GitHub Pages serves it as a project site at `https://benarculus.github.io/benarculus/` until a custom domain is attached. The plan sets the Astro `site` origin to the production domain and never mentions `base`, a `public/CNAME` artifact, or how absolute canonical, sitemap, RSS, and asset URLs behave during the pre-domain verification window.
* Impact: The plan's own sequencing gate becomes unreliable: the first Pages deployment will render with root-absolute paths under a `/benarculus/` prefix, producing broken assets and links exactly when the implementer is supposed to prove the build before touching DNS. The team either skips the verification gate or debugs a base-path problem during cutover, which is the one activity P05-T03 explicitly says to isolate.
* Smallest useful change: Add an explicit requirement to P04-T02 (and a matching Detail in P03-T02) stating how the custom domain and base path are handled: either attach the custom domain before first deployment and verify on `www` with DNS still pointed at Squarespace where possible, or define a documented preview configuration and accept that absolute-URL surfaces are verified only after the domain is attached. Name the custom-domain artifact (Pages setting and/or `public/CNAME`) in Canonical targets.
* Action owner: planning parent
* Exact resolving evidence: P04-T02 Requirements name the project-site base-path handling and the custom-domain artifact; P03-T02 states which metadata surfaces are verifiable before domain attachment; Canonical targets include the CNAME or Pages domain configuration.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-002 -->
### PC-002 [High]: Legacy feed and sitemap URLs are not preserved and cannot be redirected

* Related IDs: FR-005, NFR-007, P03-T02, P05-T01, P05-T03, research W11, W13, W16
* Evidence: .copilot-tracking/research/2026-09-16/blog-migration-research.md (W11: current feed at `https://www.benarculus.com/blog?format=rss`; W1: sitemap at `https://www.benarculus.com/sitemap.xml`; W13: Astro's sitemap integration generates its own file names); .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (FR-005 and P03-T02 require valid RSS and sitemap output but never name their URLs; the risk table notes Pages lacks redirect configuration).
* Concern: NFR-007 promises preservation of current indexed URLs, but the plan's coverage stops at HTML routes. After cutover, `/blog?format=rss` will serve the blog index HTML rather than a feed, and `/sitemap.xml` will 404 unless the sitemap output path is deliberately controlled. GitHub Pages cannot redirect either, and the plan's own risk row acknowledges that limitation without connecting it to these endpoints.
* Impact: Existing feed subscribers break silently at cutover with no server-side remedy, and search-engine sitemap discovery regresses at exactly the moment Search Console is being used as cutover evidence. Both regressions are hard to detect after the fact and cannot be fixed by a redirect later.
* Smallest useful change: Add a P03-T02 requirement that the generated feed and sitemap URLs are decided explicitly against the current published endpoints, that a static `/sitemap.xml` is emitted or `robots.txt` points at the generated index, and that the feed URL change (if accepted) is a recorded, owner-approved residual limitation. Add a matching verification item to P05-T01 and P05-T03 and a row to the risk table.
* Action owner: planning parent, with a user decision only if the feed URL change is accepted rather than mitigated
* Exact resolving evidence: P03-T02 Requirements name the canonical feed and sitemap URLs relative to the current published endpoints; P05-T03 verification list includes both legacy endpoints; the risk table carries the residual-subscriber risk with an owner.
* Decision route: direct planner correction, escalating to the user only to accept a permanent feed-URL break

<!-- rpi:critique id=PC-003 -->
### PC-003 [High]: Repository hardening and pull-request checks are sequenced after all content and workflow commits

* Related IDs: NFR-003, NFR-004, NFR-005, NFR-006, P04-T01, P04-T03, research C3, W27, W31, W41
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (P04 Dependencies: P01, P03; P04-T01 Dependencies: P01-T03, P03-T02; P04-T03 Dependencies: P04-T01, P04-T02); .copilot-tracking/research/2026-09-16/blog-migration-research.md (C3 live posture; risk rows "Change default token to read-only and disable workflow PR approval before enabling deployment" and "Enable available secret scanning/push protection"; What You May Not Know: "These defaults should be hardened before the deployment workflow is introduced").
* Concern: The plan's own dependency graph places every preventive control after the work it should protect. Push protection and secret scanning are enabled in P04-T03, after all P01-P03 content, media, and documentation commits have already entered permanent public history; the read-only default workflow token and the "Actions cannot approve pull requests" setting are applied after both workflows exist rather than before, directly reversing the research instruction.
* Impact: The single control most capable of preventing an irreversible disclosure (push protection on a public repository) is inactive during the phase that commits migrated media and authored content, and the permissive default token is live while workflows are being introduced. There is also no CI gate on any P01-P03 change, so the canonical check surface built in P01-T03 goes unenforced until the end.
* Smallest useful change: Split P04-T03 so that the settings-only controls with no code dependency (read-only default workflow token, disable Actions PR approval, enable secret scanning and push protection) become a prerequisite task ahead of P01, and move the read-only pull-request workflow (P04-T01) so it depends only on P01-T03. Leave required-status-check and ruleset configuration in P04 where it depends on the workflow names.
* Action owner: planning parent
* Exact resolving evidence: A settings-hardening task exists with no upstream dependency and is listed as a dependency of the first content-committing task; P04-T01 no longer depends on P03-T02; NFR-004 and NFR-006 cite the earlier task.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-004 -->
### PC-004 [Medium]: The `draft` frontmatter field contradicts the confirmed publication-only boundary

* Related IDs: FR-002, NFR-006, P01-T02, P03-T03, D3, research W35
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (P01-T02 Requirements: schema validates `draft`, and "Draft entries are excluded from production collections"; P03-T03 Requirements: documentation covers "draft handling outside public history"; NFR-006: published output contains "no ... private drafts"; Confirmed User Direction: "drafts ... stay outside Git history").
* Concern: The plan simultaneously mandates a committed `draft` flag with draft-exclusion tests and a boundary stating drafts must never enter Git history. It never states what the `draft` field legitimately means under that boundary, and it does not note that pull-request branches in a public repository are themselves publicly readable, so an unmerged "draft" is already disclosed.
* Impact: An implementer following P01-T02 will naturally document the `draft: true` workflow in P03-T03, teaching the owner a habit that violates the confirmed boundary irreversibly. Alternatively the implementer removes the field and the P01-T02 draft-exclusion tests become dead requirements.
* Smallest useful change: Add one sentence to P01-T02 Details defining the permitted meaning of `draft` (for example, a publication-ready post staged for a scheduled merge, not unfinished private writing) and a P03-T03 requirement that the documentation states explicitly that branches and pull requests in a public repository are public.
* Action owner: planning parent
* Exact resolving evidence: P01-T02 Details define the `draft` semantics under the publication boundary; P03-T03 Requirements include the public-branch disclosure statement; NFR-006 and the draft field no longer read as contradictory.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-005 -->
### PC-005 [Medium]: NFR-008 is not buildable under Maximum additions and is not reproducible as written

* Related IDs: NFR-008, P01-T01, P01-T03, P02-T03, P05-T01, Validation and Change Boundaries
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (NFR-008 and P05-T01 require "a reproducible mobile-oriented Lighthouse run" with a "median performance" threshold; Maximum additions enumerates one framework, one unit/integration runner, one browser runner with one accessibility integration, official Astro RSS/sitemap integrations, and official Pages Actions, with no Lighthouse or performance tool; P01-T01 Details also authorize "formatting/linting" packages that Maximum additions does not list).
* Concern: The plan's addition boundary is written as an exhaustive allowance but omits two tool categories that plan requirements mandate. Separately, "median" and "reproducible" are unfalsifiable without a stated run count, device or throttling profile, and whether the run targets the local production preview or the deployed Pages URL.
* Impact: An implementer either violates the stated change boundary to satisfy NFR-008 or reports a hand-run score that cannot be reproduced, and P05-T01's performance evidence becomes non-comparable. Under a strict reading of Maximum additions, the gate cannot be implemented at all.
* Smallest useful change: Add the performance-audit tool and the formatter/linter to Maximum additions as explicitly permitted additions, and add to NFR-008 the run count, the emulated device or throttling profile, and the target under test.
* Action owner: planning parent
* Exact resolving evidence: Maximum additions lists the performance tool and lint/format tooling; NFR-008 states run count, profile, and target; P05-T01 references those parameters.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-006 -->
### PC-006 [Medium]: Phase-level dependency P03 to P02 contradicts the task graph and P02-T03's stated content need

* Related IDs: P02, P03, P02-T03, P03-T01, P03-T02
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (P03 Dependencies: P01, P02; P03-T01 Dependencies: P01-T02, P02-T02; P02-T03 Details: "Use real migrated content as soon as P03-T01 is available"; P03-T02 Dependencies include P02-T03).
* Concern: If the phase-level dependency is binding, P03-T01 cannot start until P02-T03 is complete, yet P02-T03 is told to consume P03-T01 output. The task-level graph says otherwise, so the plan offers two incompatible readings of when article migration may begin.
* Impact: The implementer must guess whether to block on the phase gate or follow the task edges, which risks either an unnecessary serialization or a phase completion claim made against fixture-only content.
* Smallest useful change: Change P03's Dependencies to the specific upstream tasks it actually requires (for example P01-T02 and P02-T02), or reword the P02-T03 Detail to use fixtures only and defer real-content review to P05-T01.
* Action owner: planning parent
* Exact resolving evidence: P03 Dependencies and the P02-T03 Detail describe one consistent ordering with no task depending on work scheduled after it.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-007 -->
### PC-007 [Medium]: Three stated conditions have no owned check

* Related IDs: NFR-001, NFR-002, NFR-008, P01-T03, P02-T01, P02-T03, P05-T01, Validation and Change Boundaries
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (NFR-001 includes the 24-by-24 CSS-pixel target-size rule, which appears in no task requirement and in neither the P05-T01 automated list nor its manual review list; NFR-002 permits an island "unless a documented feature requires" it, with no documentation target; P02-T03 requires NFR-008 budgets "before cutover" while Validation ownership assigns all Lighthouse evidence to P05-T01).
* Concern: These are requirement clauses without a named owner, check, or evidence artifact. P02-T03 in particular carries a requirement it cannot produce evidence for within its own phase.
* Impact: Target-size conformance can silently regress in the very phase that designs interactive controls; a future island could be added with no recorded justification; and P02-T03 cannot be honestly marked complete, weakening phase completion as a signal.
* Smallest useful change: Add target-size to the P02-T01 token requirements and to the P05-T01 manual review list; name the island-justification location (maintainer documentation or the changes record) in NFR-002 or P03-T03; and restate P02-T03's performance clause as a design-time constraint whose verification is owned by P05-T01.
* Action owner: planning parent
* Exact resolving evidence: Every NFR-001 clause appears in at least one task check list; NFR-002's exception names a documentation target; P02-T03 no longer asserts an unverifiable gate.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-008 -->
### PC-008 [Low]: The Artifact Self-Check contradicts the plan's readiness claims

* Related IDs: Executive Summary, Planning Readiness and Next Step, Artifact Self-Check
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (Executive Summary: "Final candidate drafted. The phase sequence, requirements, diagrams, validation ownership, and change boundaries are complete"; Artifact Self-Check: every box unchecked, "Checked sections: Initial planning state", "Missing or limited sections: Phase checklist, diagrams, task blocks, critique, and final readiness"; Next action: "Complete the implementation-ready candidate and run the single standard critique", although the critique is already dispatched).
* Concern: The self-check and the Next action row are stale relative to the artifact that was actually submitted for critique, including the unrecorded dual-theme diagram rendering evidence or its preview limitation.
* Impact: A reader cannot tell from the artifact whether the candidate is complete, and the stale Next action conflicts with the consumed critique reservation recorded two sections earlier.
* Smallest useful change: Refresh the Artifact Self-Check boxes, "Checked sections", and "Missing or limited sections" against the current content, record the dual-theme diagram evidence or its limitation, and update the Next action to critique disposition.
* Action owner: planning parent
* Exact resolving evidence: The Artifact Self-Check reflects the current artifact state and the Next action row matches the consumed critique reservation.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-009 -->
### PC-009 [Low]: A root README in this repository changes the owner's public GitHub profile

* Related IDs: FR-009, P03-T03, Canonical targets
* Evidence: .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (Canonical targets end with "maintainer documentation" without naming a path; P03-T03 requires maintainer documentation); repository baseline shows owner and repository names are both `benarculus`, and history contains a prior `Delete README.md` commit.
* Concern: In GitHub's special profile repository, a root `README.md` renders on `github.com/benarculus`. The plan never states where maintainer documentation lives, so an ordinary scaffold choice would publish build instructions on the owner's profile page.
* Impact: An unintended and highly visible public-presentation change, contrary to the plan's own care about what the public repository communicates.
* Smallest useful change: Name the maintainer documentation path in Canonical targets (for example `docs/` or `CONTRIBUTING.md`) and add a P03-T03 Detail noting the profile-README behavior of this repository name.
* Action owner: planning parent
* Exact resolving evidence: Canonical targets name an explicit documentation path and P03-T03 records the profile-README constraint.
* Decision route: direct planner correction

<!-- rpi:critique id=PC-010 -->
### PC-010 [Low]: The research-recorded Dependabot versus SHA-pinning resolution is not carried into the plan

* Related IDs: NFR-004, P04-T03, research Contradictions and Conflicts
* Evidence: .copilot-tracking/research/2026-09-16/blog-migration-research.md ("Full-SHA pinning reduces Action-reference tampering, while some automated dependency alerts work best with semantic-version references. Resolution: keep immutable SHAs as the security boundary and use Dependabot version updates plus review to propose SHA changes"); .copilot-tracking/plans/2026-09-16/blog-migration-plan.md (P04-T03 requires Dependabot for Actions; P04-T01 requires full-SHA pins with version comments) with no statement of how the two interact.
* Concern: The plan carries both halves of a known tension without the research's resolution, including the version-comment convention Dependabot relies on to update SHA-pinned Actions.
* Impact: An implementer may conclude the two requirements conflict and drop one, weakening either supply-chain pinning or update visibility.
* Smallest useful change: Add one P04-T03 Detail restating the research resolution: SHAs remain the boundary and Dependabot proposes reviewed SHA updates using the version comment convention.
* Action owner: planning parent
* Exact resolving evidence: P04-T03 Details state the SHA-plus-Dependabot resolution.
* Decision route: direct planner correction

## Strengths and Residual Risk

* The security model is the strongest part of the plan: secretless deployment, a read-only build job, a separately privileged deploy job scoped to `pages: write` and `id-token: write`, the `github-pages` environment, full-SHA pins, the explicit `pull_request_target` prohibition, and deterministic `npm ci` all trace cleanly to W27-W30 and W36-W39.
* Validation ownership, semantic-versus-regression separation, canonical-versus-generated targets, and the "exact removals: none" claim are precise and match the verified greenfield baseline; assigning Lighthouse and manual accessibility review to a single owner avoids the usual duplicated-evidence problem.
* The cutover sequencing is genuinely reversible: DNS capture before change, Pages verification before DNS, HTTPS after certificate readiness, and no Squarespace cancellation until owner inventory and production validation both pass.
* Accepted residual risk: exact design tokens (D2) and the owner-side Squarespace inventory (D3) remain downstream, which is appropriate; neither blocks implementation start.

## Questions or Blocking Evidence Gaps

* None that block plan revision. PC-002 may require one user decision if a permanent change to the published feed URL is accepted rather than mitigated; that question is answerable at cutover planning rather than now.

## Limitations

* Live GitHub repository settings, Pages configuration, DNS records, and Squarespace account contents were not inspected; findings on those surfaces rely on research C2, C3, W1, W4, W10, and W11.
* The current published feed and sitemap endpoints were not re-fetched; PC-002 rests on W1 and W11 as recorded on 2026-09-16.
* No open-ended web research was performed and no plan, research, or repository file was modified; the only write was this critique artifact.

## Recommended Next Action

* Highest-impact finding: PC-001
* Action owner: planning parent
* Smallest next action: Directly revise the plan for PC-001, PC-002, and PC-003 (base-path and custom-domain handling in P04-T02/P03-T02; legacy feed and sitemap URL disposition in P03-T02/P05-T03 plus a risk row; and a settings-hardening task sequenced ahead of P01 with P04-T01 decoupled from P03-T02), then dispose PC-004 through PC-010 in the same pass.
* User response required: no
