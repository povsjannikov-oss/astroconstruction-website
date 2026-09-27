# ASTRO CONSTRUCTION Repository Instructions

## Project Identity
This repository contains the ASTRO CONSTRUCTION public website.

It is a plain static HTML/CSS/JavaScript site. It is not the Astro framework.

Do not introduce a framework, bundler, package build system, or broad architecture rewrite without an explicit architecture decision.

Production baseline is `main` / `origin/main`.

Primary production domain: `https://astroconstruction.lv/`

Cloudflare Pages is used, but repository files alone do not prove current deployment state, settings, or production success.

## Existing Documentation
For changing project state, read the relevant parts of:

- `PROJECT_STATE.md`
- `DECISIONS.md`
- `TASKS.md`

Use these files as project context instead of duplicating their changing details in new instructions or reports.

If documentation and current implementation disagree, verify the implementation and report the discrepancy.

## Approved Decisions and Baselines
The latest explicit user-approved decision takes priority over drafts, older repository guidance and historical proposals.

Do not silently reopen or replace an approved decision. If it creates a material technical, SEO, UX, accessibility, security, privacy, performance or maintainability risk, report the risk and propose the smallest safe correction before implementation.

Approved public-facing copy is immutable unless the user explicitly reopens it for editing.

Approved content determines the layout. If approved user-facing copy does not fit an existing component or layout, adapt the component or layout instead of shortening, paraphrasing, restructuring or removing the approved copy.

## Static Site Architecture
Public pages are physical `.html` source files.

Shared styling and behavior live in shared CSS and JavaScript files.

Before adding page-specific CSS or JavaScript, inspect the existing shared implementation that controls the same behavior.

Do not create competing page-local behavior when an existing shared script or stylesheet already owns the pattern.

Keep page-local changes page-local unless the shared implementation is the confirmed source of the problem.

## Product, UX, and Page Decisions
Treat the website as one product. New work must solve a real user, business, SEO, technical, accessibility, security or maintenance problem.

Users should quickly understand:

- what ASTRO does;
- whether the service fits their situation;
- what happens next;
- what they provide;
- what they receive.

Where relevant, site architecture should support discovery through services, client problems and construction documents. Avoid walls of similar cards when a clearer hierarchy or continuous content structure works better.

The first viewport should clearly communicate the page purpose, practical result and next action. Major redesigns require evidence and regression awareness, not visual novelty alone.

Keep the visual direction modern, calm and technically credible. Prefer real work, documents, drawings, diagrams, tables, plans and process visuals. Avoid filler stock, fake projects or metrics, obviously AI-looking scenes, excessive decorative effects and unnecessary animation.

## URLs
Public URLs use clean extensionless paths.

Source files remain physical `.html` files.

When changing SEO-relevant URLs or navigation, keep these aligned where affected:

- canonical URL
- `og:url`
- internal public links
- sitemap URL
- final public URL

Do not introduce `.html` public links unless there is a confirmed reason.

Do not infer live redirect behavior from source files alone. Verify URL behavior in the relevant environment when it matters.

## SEO
SEO edits must keep visible page content, metadata, structured data, sitemap entries, and public URL conventions consistent where touched.

For scoped SEO work, verify only the relevant affected elements rather than expanding into a full-site audit.

The repository uses JSON-LD structured data patterns such as local business, breadcrumb, service, FAQ, item-list, and page-specific schema.

Visible content and structured data must not contradict each other.

If visible FAQ content changes, verify `FAQPage` JSON-LD parity.

Do not add structured data for claims, services, FAQs, images, prices, or guarantees that are not visible or otherwise supported.

Open Graph metadata should match the page's public URL, title intent, and selected preview image where affected.

For major SEO, information-architecture, navigation, page, content or marketing decisions, use relevant current evidence where available, including GSC, GA4, Google Business Profile, Core Web Vitals, indexing state, SERP evidence, competitors, search intent and conversion paths.

Before creating a new service, expert, glossary or SEO page, assess:

- search demand and intent;
- overlap with existing pages and cannibalization risk;
- commercial and user value;
- internal-link role;
- conversion path.

Do not create a page merely because a keyword exists. Do not create thin pages or pages with substantially duplicate intent.

Hub pages must have standalone value. Internal links should use useful descriptive anchors. Important facts should be extractable and understandable outside the full page context.

Keep entity, document, role and action names consistent across page content, FAQ, metadata, schema and internal links where relevant.

Do not create unsupported city or doorway-page networks. Use `noindex` deliberately, not as a casual fix for weak content.

## Image SEO
For SEO-relevant images, preserve strong image SEO and performance practices where applicable:

- descriptive filenames
- accurate natural Latvian `alt`
- relevant surrounding copy
- efficient formats such as WebP where suitable
- responsive `srcset` / `sizes`
- explicit `width` and `height`
- suitable lazy loading and decoding
- LCP and CLS awareness
- appropriate `og:image` and structured-data image references

Prefer real project, work, document, technical, process, defect, or construction imagery over generic stock or obviously AI-generated visuals.

Do not add images merely to increase image count.

Before publishing real project materials or documents, check confidentiality and anonymization.

## Public Copy
Preserve Latvian public copy unless rewriting or translation is explicitly requested.

Do not silently rewrite approved copy during technical work.

ASTRO website copy should sound like an experienced Latvian construction professional explaining the subject to a normal client. Ordinary people must understand it, and construction professionals should be able to scan it quickly.

Keep copy concise, concrete, professional and natural for the Latvian construction market. Do not write like legislation, a government institution, bureaucratic correspondence or generic AI marketing.

Give the simple practical answer first. Use short sentences where useful, keep one main idea per sentence and prefer concrete nouns and verbs. Preserve legal and technical accuracy without copying the style of regulations.

Explain difficult construction topics through practical meaning, sequence, responsibility, documents and result. State what is prepared, submitted, checked and signed, when work may start, what happens next and what the client receives.

Every sentence should add information, trust, SEO value or conversion value. Remove filler, repetition, generic marketing, fake FAQ text and decorative conclusions.

When the complete document, work, action, role, condition or variant list is known, provide it instead of an umbrella term or an incomplete list. If information is unverified or genuinely incomplete, state exactly what remains unconfirmed.

Do not use `pierādījumi` as a generic substitute when the actual evidence can be named. Prefer the real item, such as `dokumenti`, `fotofiksācija`, `rasējumi`, `protokoli`, `BIS ieraksti`, `materiālu dokumenti`, `mērījumi`, `akti` or `izpildshēmas`.

Do not invent claims, experience, clients, projects, results, deadlines, certificates, statistics, prices, savings, advantages, guarantees or unsupported benefits.

Avoid unsupported legal, pricing, timeline or performance promises.

Do not use em dash `—` or en dash `–` as stylistic dashes in public website copy.

Use normal hyphen `-` only where natural.

Preserve these wording restrictions unless the user explicitly overrides them:

- avoid `jāsagatavo nepieciešamā dokumentācija`
- avoid `pārējie dokumenti`
- avoid `var būt` where a more precise factual statement is possible; use it when genuinely required by meaning
- `piemēram` is allowed, but do not use it to avoid providing a complete known list
- for visible ASTRO copy, use the real action ASTRO performs. Prefer concrete verbs such as `veicam`, `vadām`, `izpildām`, `pievienojam`, `nododam`, `mēram`, `komunicējam` and `kontrolējam`; do not substitute vague service verbs such as `koordinējam`, `konsultējam`, `organizējam` or `izvērtējam` when ASTRO actually performs the work or produces the result
- avoid `Anonimizēti` as a marketing label
- avoid `audit` / `audits` in visible ASTRO copy when a precise natural construction term is available

Avoid bureaucratic wording such as `atbilstoši`, `attiecīgais`, `konkrētajā gadījumā`, `ņemot vērā` and `ciktāl` when clearer direct wording works.

Avoid artificial contrast constructions such as `X nav tikai Y, bet arī Z`, `Runa nav par`, `Nevis X, bet Y`, `Patiesībā` and similar rhetorical templates. Normal factual negation is allowed.

In visible ASTRO website copy, do not use `ierosinātājs`, `būvniecības ierosinātājs`, `būvdarbu veicējs` or `galvenais būvdarbu veicējs`. Use approved natural client-facing wording instead. This does not prevent exact legislative quotations, source-document inspection, internal technical discussion or legal analysis that identifies the official term.

For BIS, legal, regulatory and technical content, verify official document names, actions, responsible roles, dates, exceptions, ordering, deadlines and status names before publication. Use current official terminology when it has changed.

When publishing prices, distinguish:

- ASTRO's fee from state, municipal, utility, third-party, laboratory, notary, cadastral and other external fees;
- VAT-inclusive from VAT-exclusive pricing;
- a fixed price from a `no` / starting price.

Do not publish unsupported timing statements. ASTRO should claim only work it actually performs. When a regulated external specialist must perform or sign something, identify that correctly instead of implying ASTRO performs it.

## Navigation and Shared Behavior
Navigation markup is duplicated across static pages.

Shared navigation, mobile menu, scrolling state, focus, Escape handling, breakpoint behavior, and FAQ accordion behavior may be controlled by shared JavaScript and CSS.

Before editing navigation or shared interaction patterns, inspect both the affected HTML and the relevant shared scripts/styles.

Preserve accessibility behavior such as focus management, ARIA state, focus restoration, and keyboard handling when changing shared UI.

## Forms and Integrations
Lead forms are static HTML forms enhanced by shared JavaScript and a backend integration.

Before changing forms, inspect the page markup and current shared form implementation.

Do not rename, remove, or repurpose integration fields, submission parameters, validation behavior, upload behavior, or success handling without confirming backend compatibility.

Do not show a successful lead submission unless the current implementation's backend confirmation requirements are satisfied.

Do not expose endpoint URLs, account IDs, analytics IDs, secrets, credentials, or private integration details in public reports or public website copy.

When forms, uploads, endpoints or third-party integrations materially change, review validation, spam protection, safe file handling, exposed data, consent and privacy, and failure states.

## Consent, Analytics, Modals
Analytics must respect existing consent gating.

Before changing analytics, consent, GA4, Clarity, or event tracking behavior, inspect the current consent implementation.

Do not bypass consent checks, duplicate analytics initialization, or activate restricted analytics behavior when consent is denied.

Analytics events must answer a defined business question or measure a meaningful conversion or action. Do not add vanity tracking merely because it can be tracked.

Shared lead modal and CTA behavior exists. Inspect and reuse it where appropriate before adding page-specific modal or CTA logic.

Preserve modal accessibility, including focus trap, Escape handling, and focus restoration.

## Performance
Avoid unnecessary JavaScript, dependencies, animation and blocking resources. Protect LCP, CLS and INP, and assess performance impact for shared components and first-viewport changes.

Prefer simpler implementations when decorative complexity adds little user or business value.

## Verification
For UI changes, verify actual rendered behavior when relevant, including desktop, mobile, responsive overflow, interactive states, and browser console.

Static checks alone do not prove rendered behavior.

For SEO and structured-data changes, verify affected metadata, canonical URLs, schema, visible content parity, sitemap impact, and relevant rendered content.

For form changes, verify frontend behavior and backend compatibility expectations without creating real leads unless explicitly authorized.

Run `git diff --check` on edited files before completion when files were modified.

## Releases and External Actions
Production releases require explicit authorization.

After an authorized deployment, verify the actual live result on `astroconstruction.lv`.

Successful Cloudflare deployment status alone is not sufficient.

Do not request Google Search Console indexing unless explicitly authorized.

## Graphify
`graphify-out/graph.json` and Graphify tooling may be used as secondary dependency or impact evidence.

Graphify is not authoritative coverage of the static site.

Use source files, rendered behavior, local tests, and live verification as the authoritative evidence for implementation decisions.
