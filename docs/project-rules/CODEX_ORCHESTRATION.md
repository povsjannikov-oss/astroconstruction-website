# ASTRO CONSTRUCTION - CODEX ORCHESTRATION

## 1. Purpose

This file defines how Codex must be used for the ASTRO CONSTRUCTION website project.

The goal is to achieve agency-level engineering quality while using models, reasoning levels, context and subagents rationally.

High model cost or maximum reasoning is not a quality strategy by itself.

The correct strategy is:

- use the cheapest capable model for routine work;
- use stronger reasoning when the problem is genuinely difficult;
- use Astra / Maximum selectively for architecture, hard root-cause analysis and critical review;
- avoid repeatedly loading or analyzing parts of the repository that are irrelevant to the current task.

The website quality target remains equivalent to a professional 50,000-100,000 EUR digital agency engagement.

## 2. Core principle

Never escalate because a task is large.

Escalate because the reasoning is difficult, the uncertainty is high, or the cost of a wrong decision is material.

Examples:

Large but simple:
- updating the same canonical pattern across many pages;
- replacing an approved string in many files;
- adding an existing component pattern to multiple routes;
- applying a known metadata rule repeatedly.

These should not use Astra / Maximum by default.

Small but difficult:
- choosing a new information architecture that affects 100 future pages;
- diagnosing a cross-browser mobile overflow with several shared dependencies;
- deciding how a new shared component affects SEO, accessibility, CWV and many routes;
- identifying a production-only regression with unclear root cause.

These may justify High or Astra / Maximum.

## 3. Roles

ChatGPT acts as:

- product lead;
- technical lead;
- UX lead;
- SEO/GEO/AEO lead;
- implementation planner;
- reviewer of consequential changes.

Codex acts as:

- repository investigator;
- implementation engineer;
- test and verification agent;
- targeted technical analyst.

Codex should not independently redefine:

- approved product strategy;
- approved copy;
- page purpose;
- service positioning;
- information architecture;
- design direction;
- commercial logic.

When implementation reveals a conflict with an approved decision, report the conflict instead of silently changing the decision.

For major UX, SEO, GEO/AEO, navigation, page-strategy or conversion decisions, current market/search/analytics evidence should be gathered at the strategy stage before Codex implementation when that evidence can materially change the decision.

Codex must not invent missing analytics, SERP, competitor or business evidence.

## 4. Default workflow

Use this sequence for meaningful implementation work:

1. Strategy
2. Scope
3. Investigation
4. Decision
5. Implementation
6. Checks
7. Review
8. Verification

In shorthand:

strategy -> scoped prompt -> inspect -> decide -> implement -> checks -> review -> verify

Do not combine every stage into one large Codex task unless the task is genuinely trivial.

## 5. Task levels

### LEVEL 0 - Mechanical

Use for:

- exact search and replace;
- copying approved content;
- updating known metadata values;
- changing an already-approved URL;
- renaming a file when dependencies are known;
- applying an existing component without design changes;
- simple repetitive fixes.

Preferred approach:

- cheapest capable model;
- low or medium reasoning;
- narrow scope;
- no architectural investigation;
- no Astra.

Required behavior:

- inspect only affected files;
- preserve approved text;
- verify exact output;
- do not refactor.

### LEVEL 1 - Standard implementation

Use for:

- implementing an approved section;
- adding a known page pattern;
- modifying local CSS;
- adding an existing UI behavior;
- schema changes with a known pattern;
- internal linking updates;
- known responsive adjustments;
- normal page-level development.

Preferred approach:

- standard strong Codex model;
- Medium reasoning;
- targeted inspection first;
- implementation in a second step when useful.

Astra is normally unnecessary.

### LEVEL 2 - Engineering investigation

Use for:

- unclear root cause;
- multi-file dependencies;
- shared components;
- responsive regressions;
- JavaScript interaction bugs;
- accessibility problems with several possible causes;
- performance regressions;
- unclear build/deployment behavior;
- dependency conflicts.

Preferred approach:

- strong Codex model;
- Medium first;
- High when the problem remains ambiguous after normal inspection;
- separate investigation from implementation.

Do not escalate to Astra before the relevant evidence has been collected.

### LEVEL 3 - Architecture / critical review

Use for:

- shared architecture changes;
- new design-system primitives;
- navigation architecture;
- major page-template strategy;
- structural SEO changes affecting many routes;
- migration of shared frontend behavior;
- complex production regressions;
- high-impact performance architecture;
- security-sensitive implementation;
- changes that are expensive to reverse later.

Preferred approach:

- first collect evidence with normal/High Codex;
- prepare a concise architecture package;
- use Astra / Maximum only for the difficult reasoning or independent review;
- return to normal Codex for implementation unless the implementation itself remains unusually difficult.

## 6. Model routing

The default model choice should be the least expensive model that can reliably complete the task.

### Routine work

Use a fast / standard Codex model when:

- the pattern already exists;
- scope is local;
- the desired result is explicit;
- root cause is known;
- implementation is mechanical or conventional.

### Medium reasoning

Medium is the default reasoning level for most engineering tasks.

Use it for:

- normal implementation;
- repository inspection;
- dependency tracing;
- page-level responsive work;
- metadata/schema updates;
- most accessibility fixes;
- most SEO implementation work.

### High reasoning

Use High when one or more are true:

- several plausible root causes exist;
- shared dependencies make regressions likely;
- architecture is unclear;
- a normal inspection did not resolve the issue;
- the change affects multiple systems;
- the implementation has meaningful production risk;
- there is a difficult interaction between UX, SEO, accessibility, performance and code architecture.

Do not use High automatically for every large task.

### Astra / Maximum

Astra / Maximum is reserved for tasks where deeper reasoning materially reduces risk or improves a consequential decision.

Good uses:

- architecture review;
- difficult root-cause analysis after evidence has been collected;
- independent review of a major implementation;
- resolving a complex tradeoff between several system-level options;
- reviewing a proposed migration;
- evaluating a difficult shared-component redesign;
- critical pre-production review.

Poor uses:

- search and replace;
- adding an approved block;
- changing text;
- basic CSS changes;
- simple metadata;
- copying an existing pattern;
- running ordinary tests;
- routine verification.

Astra should behave like a senior architect or senior reviewer, not like the default implementation worker.

## 7. Escalation rules

Escalation must be evidence-based.

Use this sequence:

1. Standard model + Medium
2. Inspect the relevant scope
3. Identify what remains uncertain
4. Use High if deeper technical reasoning is needed
5. Use Astra / Maximum only if the unresolved issue is genuinely consequential

Do not escalate because the first answer was imperfect.

Refine the scope first.

Before escalating, summarize:

- the problem;
- current architecture;
- relevant files;
- evidence already collected;
- attempted explanations;
- constraints;
- unresolved questions;
- risks of a wrong decision.

This package should be given to the stronger model instead of asking it to rediscover the repository from zero.

## 8. Context efficiency

Do not load the entire repository unless the task genuinely requires repository-wide understanding.

For each task, identify:

- exact route;
- exact component;
- exact stylesheet;
- relevant shared dependencies;
- relevant tests;
- relevant schema/metadata;
- relevant build configuration.

Prefer a context package with only the files needed for the decision.

Avoid repeated broad repository scans.

If one Codex step already established the architecture, reuse that summary in the next step.

Do not force every model to independently rediscover:

- file structure;
- design-system patterns;
- routing;
- deployment process;
- shared components;
- known constraints.

## 9. Investigation first

When root cause or architecture is unclear, run an investigation task before implementation.

Investigation task must:

- inspect;
- trace dependencies;
- identify root cause or likely causes;
- list affected files;
- identify regression risks;
- identify tests required;
- make no code changes unless explicitly requested.

Typical investigation prompt structure:

```text
Inspect only the implementation relevant to [route / component / problem].

Inspect:
- [file / route]
- shared dependencies
- relevant styles
- relevant scripts
- related implementation patterns
- relevant tests

Do not modify files.

Report:
1. current architecture
2. root cause or strongest evidence
3. affected files
4. reusable existing patterns
5. regression risks
6. accessibility / SEO / CWV implications where relevant
7. recommended minimal implementation scope
```

Investigation is especially useful before High or Astra.

## 10. Implementation tasks

Implementation tasks should begin only after the desired solution is sufficiently clear.

Implementation prompt must state:

- exact goal;
- exact scope;
- files or routes in scope where known;
- approved copy constraints;
- existing pattern to reuse;
- what must not change;
- required checks;
- expected report.

Example structure:

```text
Implement the approved change for [route/component].

Scope:
- [files/routes]

Requirements:
- preserve approved user-facing copy exactly;
- reuse existing project patterns;
- no unrelated refactoring;
- preserve responsive behavior;
- preserve accessibility;
- preserve SEO metadata unless explicitly in scope;
- follow AGENTS.md and AGENTS.override.md.

Verify:
- desktop;
- mobile;
- overflow;
- interactions;
- console;
- accessibility;
- relevant metadata/schema;
- affected shared dependencies.

Report:
- changed files;
- implementation summary;
- checks;
- remaining risks.
```

## 11. Approved copy protection

Approved user-facing copy is immutable.

Codex must not:

- rewrite;
- improve;
- shorten;
- paraphrase;
- translate;
- normalize;
- complete missing thoughts

unless the task explicitly authorizes content editing.

If a UI implementation would require shortening or changing approved copy, Codex must preserve the copy and report the layout conflict.

## 12. Subagents

Use subagents only when parallel investigation improves quality or reduces repeated work.

Good uses:

- one agent inspects frontend architecture;
- one agent checks SEO/schema dependencies;
- one agent checks accessibility/responsive risks;
- one agent reviews tests or regression scope.

Poor uses:

- creating several agents for a simple local fix;
- asking multiple agents the same question;
- using subagents to compensate for an unclear task;
- duplicating repository scans.

For large consequential tasks:

parallel investigation -> consolidate -> decision -> implementation -> independent review -> verification

Each subagent must have a narrow responsibility.

The main agent must consolidate findings before implementation.

Do not let separate subagents independently modify overlapping files unless the workflow explicitly supports that safely.

## 13. Independent review

Use independent review when:

- shared architecture changed;
- a large UI change affects many pages;
- SEO architecture changed;
- navigation changed;
- performance-critical behavior changed;
- accessibility risk is high;
- deployment risk is significant;
- the implementation was difficult or uncertain.

The reviewer should inspect the diff and relevant dependencies, not repeat the implementation.

Reviewer questions:

- Does the implementation solve the actual problem?
- Is it the smallest maintainable solution?
- Did it create regressions?
- Did it violate approved copy?
- Did it create accessibility issues?
- Did it change SEO behavior?
- Did it create CWV risk?
- Did it duplicate existing architecture?
- Is any complexity unnecessary?
- Are tests sufficient?

Astra / Maximum is valuable here when the change is consequential.

## 14. Two-pass use of strong models

For expensive models, prefer a review role over full execution.

Efficient pattern:

Pass 1:
- normal Codex gathers evidence;
- normal Codex prepares proposed solution.

Pass 2:
- Astra / Maximum reviews the evidence and solution;
- identifies flaws, risks or better architecture.

Pass 3:
- normal Codex implements the approved solution.

Pass 4:
- normal Codex verifies;
- Astra is used again only if unresolved critical uncertainty remains.

This prevents expensive reasoning from being spent on mechanical repository work.

## 15. Root-cause discipline

Do not patch symptoms before confirming root cause when:

- the bug is recurring;
- the issue affects shared code;
- the same symptom appears on multiple routes;
- the fix would add CSS/JS overrides;
- the behavior differs across breakpoints;
- production differs from local;
- performance regressed unexpectedly.

Prefer:

root cause -> minimal correction -> regression check

Avoid:

symptom -> override -> another override -> cleanup later

## 16. Minimal implementation rule

"Minimal" means smallest maintainable change that solves the actual problem.

It does not mean:

- shortest code;
- cheapest visible patch;
- lowest effort regardless of long-term cost.

A slightly larger change is preferable when it removes a real shared root cause.

A broad refactor is not justified merely because related code is imperfect.

## 17. No unrelated changes

Codex must not:

- reformat unrelated files;
- rename unrelated classes;
- clean old code outside scope;
- update dependencies without need;
- rewrite copy;
- redesign nearby sections;
- change unrelated schema;
- change unrelated metadata;
- "improve" architecture outside the task.

If unrelated problems are discovered, report them separately.

## 18. Dependency inspection

Before changing shared code, inspect:

- all dependent routes;
- shared components;
- shared CSS;
- JS behavior;
- schema/metadata;
- tests;
- image assets where relevant;
- navigation;
- build/deployment dependencies.

Do not assume a shared component is isolated.

## 19. UI verification

For UI work, verify at minimum when relevant:

- desktop layout;
- mobile layout;
- intermediate widths where the component is sensitive;
- horizontal overflow;
- content clipping;
- navigation;
- hover;
- focus;
- touch;
- keyboard;
- forms;
- carousel behavior;
- console errors;
- missing assets;
- CLS risk;
- LCP risk.

Do not claim responsive verification after checking only one viewport.

## 20. SEO verification

When SEO-relevant files change, verify where relevant:

- title;
- meta description;
- canonical;
- robots directives;
- H1;
- heading hierarchy;
- internal links;
- structured data;
- FAQ parity;
- crawlable URLs;
- redirects;
- duplicate metadata;
- route consistency.

Do not change SEO behavior as a side effect of unrelated UI work.

## 21. Accessibility verification

When an interactive or structural component changes, check where relevant:

- semantic element choice;
- heading hierarchy;
- label associations;
- keyboard operation;
- focus visibility;
- focus order;
- ARIA only where needed;
- screen-reader naming;
- interactive target size;
- contrast;
- reduced-motion behavior.

Do not use ARIA to compensate for incorrect native semantics when native HTML can solve the issue.

## 22. Performance verification

For changes affecting shared frontend code, first viewport, images, fonts or interaction scripts, check:

- unnecessary JavaScript;
- duplicate listeners;
- blocking assets;
- image dimensions;
- image compression;
- lazy-loading behavior;
- first-view LCP candidate;
- CLS;
- interaction delay;
- dependency weight.

Avoid adding libraries for behavior that can be implemented simply with the existing stack.

## 23. Test strategy

Tests must match the real risk.

For local mechanical changes:

- targeted static checks;
- exact output verification.

For page-level implementation:

- route rendering;
- desktop/mobile smoke test;
- console;
- relevant links/interactions.

For shared component changes:

- affected route set;
- regression checks;
- accessibility checks;
- responsive checks.

For architecture changes:

- broader regression set;
- build;
- tests;
- deployment verification where requested.

Do not run expensive broad test suites automatically if the task is isolated and a targeted test provides sufficient confidence.

Do not skip broad verification when shared architecture changed.

## 24. Git discipline

Before modifying:

- inspect git status;
- identify unrelated changes;
- avoid touching them.

If the active worktree is dirty or diverged and release work is required, use a clean worktree from the correct production base.

Never:

- reset unrelated work;
- delete unrelated changes;
- commit unrelated files;
- force-push;
- mix several independent changes in one release without approval.

## 25. Release workflow

Release only when explicitly requested.

Use:

1. confirm production base;
2. confirm scoped diff;
3. run relevant checks;
4. create scoped commit;
5. push;
6. observe deployment;
7. verify production;
8. report exact result.

Production verification should check the actual changed behavior, not only HTTP status.

## 26. Final Codex report

A completed implementation report should contain:

- task completed;
- changed files;
- implementation summary;
- tests/checks performed;
- desktop/mobile verification where relevant;
- SEO/accessibility/performance checks where relevant;
- commit hash if committed;
- push result if pushed;
- deployment result if deployed;
- live verification result if deployed;
- remaining blockers or risks.

Do not include speculative success claims.

## 27. Reasoning label

At the end of every prepared Codex prompt, add:

`Codex reasoning: Medium`

or

`Codex reasoning: High`

or

`Codex reasoning: Maximum`

Default:

- Medium for most work;
- High for difficult investigation, shared dependencies, root cause or meaningful regression risk;
- Maximum only when the added reasoning materially reduces risk.

If Astra is recommended, explicitly state why.

Example:

`Codex reasoning: Maximum - architecture decision affects shared page templates, SEO structure and future scalability.`

Do not recommend Maximum without a concrete reason.

## 28. Cost-control rules

To protect model limits:

- do not use Astra for routine implementation;
- do not ask expensive models to scan the whole repository by default;
- do not repeat investigations already completed;
- pass concise findings between stages;
- use targeted file lists;
- use separate inspection and implementation prompts;
- use subagents only for distinct parallel work;
- run expensive review only on consequential changes;
- use targeted tests where they provide sufficient confidence.

Model cost should be spent on difficult reasoning, not mechanical execution.

## 29. Quality-control rule

Cost optimization must not reduce engineering quality.

Do not choose a weaker model when:

- the problem remains unresolved;
- architecture risk is material;
- a production regression could affect many pages;
- accessibility or SEO impact is unclear;
- the implementation is expensive to reverse;
- evidence is conflicting.

The objective is efficient high quality, not minimum model usage.

## 30. Preferred orchestration patterns

### Simple local fix

ChatGPT scope
-> Codex Medium inspect + implement
-> targeted verification

### Normal new section

ChatGPT approves UX/content
-> Codex Medium inspect existing pattern
-> Codex Medium implement
-> verify desktop/mobile

### Complex UI bug

Codex Medium investigation
-> Codex High root-cause analysis if needed
-> ChatGPT decision
-> Codex Medium implementation
-> Codex review
-> verification

### Shared architecture change

Codex Medium/High investigation
-> consolidated evidence
-> Astra / Maximum architecture review
-> ChatGPT decision
-> Codex Medium/High implementation
-> independent review
-> broad verification

### Major production release

inspection
-> implementation
-> relevant tests
-> independent review
-> scoped commit
-> push
-> deployment
-> live verification

## 31. Anti-patterns

Avoid:

- "Analyze the entire website and improve everything."
- "Use Maximum because the task is important."
- "Let Astra implement, test and review the whole task from zero."
- combining unrelated UX, SEO, content and refactoring work in one Codex prompt;
- letting Codex change approved text while implementing UI;
- repeated whole-repository scans;
- using several subagents with overlapping responsibilities;
- fixing symptoms with layered overrides;
- broad cleanup during a targeted task;
- claiming verification without running it.

## 32. Final principle

ASTRO CONSTRUCTION should use strong models as leverage, not as brute force.

The preferred system is:

- ChatGPT makes the product and technical decision;
- standard Codex performs most investigation and implementation;
- High reasoning handles difficult engineering analysis;
- Astra / Maximum is used selectively as a senior architect or reviewer;
- verification remains scoped to real risk;
- approved decisions and user-facing copy remain protected.

This orchestration is the default unless the current task clearly requires a different approach.
