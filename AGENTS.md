# ASTRO CONSTRUCTION Website Instructions

## Project scope

This repository contains the production ASTRO CONSTRUCTION website.

Treat the current production implementation and the current main branch as the baseline.

Work only within the scope explicitly requested by the user.

Inspect the existing implementation before making changes.

Do not redesign, refactor, rewrite, or modify unrelated parts of the website unless required to complete the task safely.

## Language and communication

Use English for:
- implementation plans;
- technical communication;
- progress reports;
- reasoning summaries;
- commit messages;
- final reports.

Keep reports concise and execution-focused.

Preserve user-facing website content in its original language.

The website contains Latvian, Russian, and English content.

Do not translate, rewrite, shorten, or otherwise alter user-facing copy unless explicitly required by the task.

When modifying shared components or content structures, verify all relevant language versions.

## Context efficiency

Use repository context efficiently.

Prefer targeted searches and relevant file sections instead of unnecessarily reading large parts of the repository.

Do not repeatedly inspect the same information unless verification requires it.

Do not reproduce large source files or logs in reports.

Use this AGENTS.md and existing project documentation instead of rediscovering established project decisions.

## Subagents

Use subagents when parallel or isolated investigation materially improves quality, speed, or main-context efficiency.

Good uses include:
- repository exploration;
- SEO and indexing audits;
- structured-data analysis;
- UX/UI review;
- mobile/responsive review;
- performance and Core Web Vitals;
- accessibility;
- security review;
- regression investigation;
- code review;
- testing and log analysis.

Do not use subagents for trivial local changes where delegation would cost more than it saves.

For substantial tasks prefer:

1. Define scope and constraints.
2. Delegate independent investigations where useful.
3. Wait for relevant subagents.
4. Consolidate findings and remove duplicates.
5. Make one coherent implementation decision.
6. Implement centrally, or delegate only clearly isolated file scopes.
7. Run relevant tests and verification.
8. Use an independent review subagent for substantial changes.
9. Fix confirmed findings.
10. Perform final verification.

Do not allow multiple subagents to modify overlapping files simultaneously unless there is a clear technical reason.

Subagents should return concise, evidence-based findings rather than long narratives.

The primary agent remains responsible for the final implementation decision.

## Existing architecture

Treat the existing working production architecture as the baseline.

Do not replace working architecture merely because another implementation appears cleaner.

Prefer the smallest coherent change that solves the actual problem.

Do not:
- revert unrelated commits;
- overwrite unrelated user changes;
- change unrelated functionality;
- introduce dependencies without necessity;
- silently alter public behavior outside the requested scope.

## Git safety

Before significant modifications:
- inspect git status;
- identify existing uncommitted changes;
- protect unrelated work.

After implementation:
- inspect the final diff;
- run relevant checks;
- verify affected functionality.

Never revert unrelated existing commits or changes.

Do not push, deploy, publish, merge, or perform other remote/destructive actions unless explicitly requested.

## SEO and indexing

Treat SEO and indexing behavior as production-critical.

Preserve or improve:
- canonical URLs;
- robots directives;
- sitemap behavior;
- clean URLs;
- hreflang where applicable;
- structured data;
- metadata;
- internal linking;
- semantic heading structure.

Never introduce noindex, canonical, redirect, robots, or sitemap changes without understanding and verifying their indexing impact.

## Analytics and consent

Treat analytics and consent behavior as production-critical.

Do not break existing:
- GA4;
- Consent Mode;
- Microsoft Clarity;
- cookie consent;
- lead/conversion tracking;
- phone/email click tracking.

Do not introduce tracking before required consent.

## UX/UI

Preserve the established ASTRO visual system unless a redesign is explicitly requested.

For relevant visual changes verify both desktop and mobile behavior.

Avoid unnecessary layout shifts.

Do not sacrifice usability, accessibility, SEO, or performance for visual effects.

## Performance

Protect website performance and Core Web Vitals.

Avoid unnecessary:
- JavaScript;
- dependencies;
- fonts;
- assets;
- animations;
- render-blocking resources.

Pay particular attention to:
- LCP;
- CLS;
- INP;
- image loading;
- responsive behavior.

## Content accuracy

Never invent:
- company claims;
- guarantees;
- response times;
- certifications;
- project facts;
- client reviews;
- statistics;
- legal claims.

If information cannot be verified from the repository or supplied source material, flag it instead of inventing it.

## Verification

Do not claim completion based only on code inspection when practical verification is possible.

For relevant website changes verify:
- desktop behavior;
- mobile behavior;
- console errors;
- broken links;
- layout regressions;
- affected language versions;
- SEO/indexing signals when relevant;
- analytics/consent when relevant.

For substantial changes, use an independent review subagent when it provides meaningful additional verification.

## Deployment

Do not push or deploy unless explicitly requested by the user.

When deployment is explicitly requested:

1. Verify git status and final diff.
2. Run relevant checks.
3. Push only the intended changes.
4. Verify deployment status.
5. Verify the live production result.

## Final reporting

Keep the final response concise.

Report only:
- what changed;
- important files affected;
- verification/tests performed;
- commit hash if a commit was created;
- blockers or real risks, if any.

Do not repeat the original task or provide unnecessary implementation narration.
