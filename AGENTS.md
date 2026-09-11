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

## Static Site Architecture
Public pages are physical `.html` source files.

Shared styling and behavior live in shared CSS and JavaScript files.

Before adding page-specific CSS or JavaScript, inspect the existing shared implementation that controls the same behavior.

Do not create competing page-local behavior when an existing shared script or stylesheet already owns the pattern.

Keep page-local changes page-local unless the shared implementation is the confirmed source of the problem.

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

ASTRO website copy should be concise, concrete, professional, and natural for the Latvian construction market.

Avoid generic AI-style filler.

Do not invent claims, experience, client counts, results, deadlines, certificates, statistics, advantages, or guarantees.

Avoid unsupported legal, pricing, timeline, or performance promises.

Do not use em dash `—` or en dash `–` as stylistic dashes in public website copy.

Use normal hyphen `-` only where natural.

Preserve these wording restrictions unless the user explicitly overrides them:

- avoid `jāsagatavo nepieciešamā dokumentācija`
- avoid `pārējie dokumenti`
- avoid `var būt`
- use `koordinējam` only when ASTRO actually coordinates rather than performs the work
- avoid `Anonimizēti` as a marketing label

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

## Consent, Analytics, Modals
Analytics must respect existing consent gating.

Before changing analytics, consent, GA4, Clarity, or event tracking behavior, inspect the current consent implementation.

Do not bypass consent checks, duplicate analytics initialization, or activate restricted analytics behavior when consent is denied.

Shared lead modal and CTA behavior exists. Inspect and reuse it where appropriate before adding page-specific modal or CTA logic.

Preserve modal accessibility, including focus trap, Escape handling, and focus restoration.

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
