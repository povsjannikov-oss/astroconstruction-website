# ASTRO CONSTRUCTION - DECISIONS

## 1. Purpose

This file records approved ASTRO CONSTRUCTION website decisions and current baselines.

Current baseline review date: 2026-09-18.

It is not a brainstorming file.

Use it to prevent previously approved decisions from being reopened or silently changed by a new chat, Codex task or later implementation.

Decision priority:

1. Current explicit user instruction
2. Project Instructions
3. Latest approved decision in this file
4. Earlier approved decision
5. Drafts, proposals and historical chats

If a later decision conflicts with an earlier one, the later approved decision wins.

## 2. Decision types

Use these labels:

- `STABLE` - long-term approved rule or direction
- `CURRENT BASELINE` - current approved implementation/state that may evolve later
- `PAGE BASELINE` - approved state for a specific page
- `CONTENT BASELINE` - approved user-facing wording/structure
- `TECH BASELINE` - approved technical implementation state
- `REVIEW REQUIRED` - useful historical decision that should be rechecked before reuse

Do not treat an unlabelled historical note as approved.

---

# A. PRODUCT AND BUSINESS

## A1. Primary market

**Status: STABLE**

ASTRO CONSTRUCTION website is primarily designed for the Latvian market.

SEO, search intent, competitor analysis, language, local business signals and service discovery should be evaluated primarily for Latvia.

## A2. Website quality target

**Status: STABLE**

Treat the website as a serious long-term digital product.

Target quality level: professional digital agency engagement approximately in the 50,000-100,000 EUR range.

This means decisions must consider:

- product strategy;
- UX/UI;
- development;
- architecture;
- SEO;
- GEO/AEO;
- Image SEO;
- conversion;
- analytics;
- accessibility;
- Core Web Vitals;
- privacy;
- security;
- maintainability.

This does not mean using the most expensive model for every task.

## A3. Main business goals

**Status: STABLE**

The website should support:

- visibility;
- trust;
- qualified leads;
- conversion;
- maintainability;
- long-term scalability.

## A4. Search and content strategy

**Status: STABLE**

Do not create new service or SEO pages without a real reason.

Before a major new page or content direction, evaluate:

- search demand;
- intent;
- SERP;
- competitors;
- GSC;
- overlap with existing pages;
- commercial value.

Avoid pages with duplicate intent.

---

# B. WORKING MODEL

## B1. ChatGPT and Codex roles

**Status: STABLE**

ChatGPT owns:

- strategy;
- product decisions;
- UX/UI direction;
- SEO/GEO/AEO strategy;
- content;
- task scoping;
- approval logic.

Codex owns:

- repository investigation;
- implementation;
- checks;
- regression testing;
- verification.

## B2. Codex workflow

**Status: STABLE**

Use:

strategy -> scoped prompt -> inspect -> minimal implementation -> checks -> review -> verification

Codex prompts must be in English.

Codex must:

- report in English;
- preserve approved user-facing language;
- obey `AGENTS.md` and `AGENTS.override.md`;
- avoid unrelated changes;
- inspect dependencies before modifying;
- verify the actual scope.

## B3. Reasoning level

**Status: STABLE**

Default Codex reasoning: Medium.

Use High for:

- difficult root-cause work;
- complex shared dependencies;
- architecture uncertainty;
- meaningful regression risk.

Use Maximum only when deeper reasoning materially reduces risk.

Astra / maximum-cost reasoning must not be the default worker.

Use it selectively as a senior architect or reviewer.

## B4. Approved copy protection

**Status: STABLE**

Approved user-facing copy is immutable unless the user explicitly requests a change.

Codex must not:

- rewrite;
- shorten;
- improve;
- paraphrase;
- translate;
- complete;
- normalize

approved copy during implementation.

---

# C. CONTENT AND LANGUAGE

## C1. Main language style

**Status: STABLE**

ASTRO user-facing Latvian should sound like an experienced construction specialist speaking normally with a client.

It must remain professional but understandable to a non-professional adult.

Lead with practical meaning.

Avoid legalistic, bureaucratic, textbook, corporate and AI-style wording.

## C2. Exact information over generalisation

**Status: STABLE**

When the exact composition is known, write it in full.

Do not replace exact documents, actions, works, roles, conditions or steps with umbrella wording.

## C3. Prohibited vague wording

**Status: STABLE**

The following types of wording are not allowed in visible ASTRO copy:

- atbilstošas darbības sfēras
- attiecīgās prasības
- nepieciešamie dokumenti
- paredzētie darbi
- konkrētajā situācijā
- atkarībā no apstākļiem
- veikt nepieciešamās darbības
- nodrošināt atbilstošu risinājumu
- ievērot noteiktās prasības
- iesniegt attiecīgo dokumentāciju
- prasītos dokumentus
- piemēram

`Piemēram` is intentionally excluded from visible ASTRO website copy under the current approved style direction.

Do not replace them with a synonymous vague phrase.

## C4. Negative-contrast style

**Status: STABLE**

Do not use stylistic constructions such as:

- Tas nav...
- Šis nav...
- Šī nav...
- nav tikai...
- X nav tikai Y, bet arī Z...
- Runa nav par...
- Nevis X, bet Y...
- Patiesībā...
- Īstenībā...
- X nenozīmē Y...
- Ar X vien nepietiek...
- Nepietiek tikai ar...
- Nevajag jaukt X ar Y...

`nav tikai` is prohibited regardless of context.

Normal factual negation remains allowed.

## C5. Long dash

**Status: STABLE**

Do not use the long dash in user-facing website copy.

Use normal punctuation or a hyphen.

## C6. Marketing language restrictions

**Status: STABLE**

Do not use "Anonimizēti" as a marketing label.

Do not use "audit" / "audits" as a generic marketing label where a more exact service name exists.

Do not use "koordinējam" when ASTRO itself performs the work.

Do not invent:

- experience;
- clients;
- results;
- certificates;
- statistics;
- deadlines;
- prices;
- savings;
- guarantees.

## C7. Formal role labels in visible copy

**Status: STABLE**

Do not use `ierosinātājs` or `būvniecības ierosinātājs` in visible customer-facing ASTRO copy.

Do not use `būvdarbu veicējs` or `galvenais būvdarbu veicējs` in visible customer-facing ASTRO copy.

Use the approved natural-language role for the exact situation.

If no replacement has been approved, flag it for content review instead of inventing wording.

---

# D. UX AND DESIGN

## D1. Site navigation

**Status: STABLE**

Navigation should be understandable to an ordinary client.

The site should not become a collection of similar card grids.

Prefer clear hierarchy and intuitive discovery.

Users should be able to find:

- a known service;
- a solution to a problem even if they do not know the professional term;
- BIS/documentation explanations;
- the next contact action.

## D2. Major UI changes

**Status: STABLE**

For major UI work evaluate:

- desktop;
- mobile;
- navigation;
- hierarchy;
- typography;
- interactions;
- accessibility;
- Core Web Vitals.

## D3. Visual direction

**Status: STABLE**

Prefer:

- real work;
- real documents;
- drawings;
- technical diagrams;
- tables;
- process visuals.

Avoid:

- filler stock;
- obviously AI-looking construction scenes;
- overly polished artificial scenes;
- cinematic sunset look.

Realistic visuals should look like normal daylight and real construction environments.

## D4. Image authenticity

**Status: STABLE**

Generated imagery must not create false evidence of:

- ASTRO projects;
- ASTRO employees;
- real clients;
- actual completed work.

## D5. Image SEO

**Status: STABLE**

Image implementation should consider:

- filename;
- alt;
- crawlability;
- dimensions;
- responsive behavior;
- LCP;
- CLS;
- Open Graph usage where relevant.

---

# E. TECHNICAL AND REPOSITORY

## E1. Repository instructions

**Status: CURRENT BASELINE**

ASTRO repository contains `AGENTS.md`.

It is part of the Codex operating contract and must be respected.

## E2. Development discipline

**Status: STABLE**

Before implementation:

- inspect dependencies;
- confirm root cause;
- preserve architecture unless evidence justifies change;
- avoid unrelated refactoring;
- keep changes scoped.

## E3. Dirty worktree handling

**Status: STABLE**

Never reset, delete, commit or overwrite unrelated changes.

If the active checkout is dirty or diverged and release work is required, use a clean worktree from production.

## E4. Release sequence

**Status: STABLE**

Use:

state -> scoped diff -> checks -> scoped commit -> push -> deployment -> live verification

Commit, push and deploy only when explicitly requested.

## E5. Final implementation report

**Status: STABLE**

Final Codex/release reporting should include:

- changes;
- files;
- checks;
- commit;
- deployment;
- live verification;
- remaining risks or blockers.

---

# F. ANALYTICS, SEARCH AND PLATFORM

## F1. GA4 and GSC

**Status: CURRENT BASELINE**

GA4 and Google Search Console are connected.

Use them for meaningful product and SEO decisions when the task requires current evidence.

## F2. Google Business Profile

**Status: CURRENT BASELINE**

Google Business Profile exists.

Service area is Latvia.

Website and GBP data should remain consistent.

## F3. robots.txt

**Status: CURRENT BASELINE**

`robots.txt` has been added.

Do not change crawl directives casually.

## F4. Favicon

**Status: TECH BASELINE**

The current published favicon baseline is `favicon-v3.ico`.

Tracked HTML favicon references were changed from `/favicon-v2.ico` to `/favicon-v3.ico`.

The older `favicon-v2.ico` was intentionally left untouched.

Do not revert this without a reason.

---

# G. PAGE BASELINES

## G1. `/izpilddokumentacija`

**Status: PAGE BASELINE**

This page has been completed and published.

Approved page direction includes:

- a main block explaining what is included;
- "60+ projekti" as an approved current claim only while it remains factually valid;
- ASTRO performs the work for the client rather than merely describing the process;
- FAQ structure has been approved.

Do not rewrite approved page copy during technical work.

## G2. `/dvp-izstrade`

**Status: PAGE BASELINE**

The page has undergone an approved content and UI rebuild.

Current approved behavior includes:

- carousel with 5 slides;
- carousel moved to the second screen;
- autoplay approximately 3000 ms;
- mobile horizontal floating/overflow issue fixed;
- CTA scrolls to the form;
- desktop autoplay is not paused on hover.

Do not change this behavior as incidental cleanup.

## G3. `/buvdarbu-zurnals-bis`

**Status: PAGE BASELINE**

The page has been published.

Treat the current approved content and structure as baseline unless the user explicitly requests a new iteration.

## G4. `/bis-dokumentacija`

**Status: PAGE BASELINE**

The page direction is a terminology/explanation guide.

Approved structural direction:

- Q&A-oriented explanations;
- terms organized into categories;
- practical language;
- terms reviewed and approved progressively;
- page should help a user understand exact BIS/construction documents and actions.

Do not convert it into a generic article or card catalogue.

## G5. `segto-darbu-akti-jaunie-buvnoteikumi-2025.html`

**Status: PAGE BASELINE**

This page and related BIS images have already been released and verified.

Treat existing approved user-facing copy as immutable unless a new content task explicitly changes it.

---

# H. APPROVED CONTENT PRINCIPLES FOR CONSTRUCTION TERMS

## H1. Practical term format

**Status: STABLE**

For construction/BIS terms, prefer practical questions such as:

- Kas tas ir?
- Kad to dara?
- Kas jādara?
- Ko saņem beigās?

Do not force the exact same template on every term when another structure is clearer.

## H2. Term opening

**Status: STABLE**

Each term should normally begin with a short practical hook, approximately 8-14 words.

Reference style:

`Būvatļauja - būvvalde atļauj būvēt objektu.`

The wording must remain exact to the real legal/technical meaning.

## H3. "Svarīgi"

**Status: STABLE**

Use `Svarīgi` only for:

- a real limitation;
- an exception;
- a transition rule;
- an obsolete term;
- a condition that changes user action.

Do not use it as decorative emphasis.

---

# I. SPECIFIC APPROVED CONTENT KNOWLEDGE

## I1. `Būvdarbu kvalitātes kontroles sistēma`

**Status: CONTENT BASELINE**

When explaining this term, use the practical verified composition already approved in project work.

Do not reduce it to a vague description such as "quality documentation".

If the exact approved composition is required in a new task, retrieve the approved version rather than reconstructing it from memory.

## I2. `Fakta konstatācijas akts`

**Status: CONTENT BASELINE**

Approved practical meaning:

The act records a fact, problem, hidden condition or circumstance discovered on site that was not shown in the project and could not reasonably have been accounted for beforehand.

This is especially relevant in:

- pārbūve;
- rekonstrukcija;
- restaurācija;
- work on existing buildings.

The act can serve as a basis for the designer to prepare project changes or a technical solution.

Where the unforeseen condition creates additional work that the contractor could not objectively include in the original price, the act can support later agreement of additional works and price changes.

Where the condition requires additional time or resources, it can also support schedule/time impact discussion.

Do not expand this into unsupported legal claims.

---

# J. PRICING BASELINES

## J1. Electrical installation inspection

**Status: CURRENT BASELINE**

Current approved website/internal price reference including VAT:

- up to 100 m² - 359.76 EUR;
- over 100 m² - 423.50 EUR;
- plus outbuilding: 407.76 EUR / 467.76 EUR respectively.

Known internal cost references:

- site visit - 150 EUR;
- engineer - 100 EUR.

Do not present internal costs as client prices.

Recheck before publication if pricing may have changed.

## J2. Private-house legalization cost references

**Status: CURRENT BASELINE**

Internal orientation for possible future ASTRO house legalization pricing:

- information analysis, collection, communication with authorities, legalization plan and specialist coordination - 310 EUR;
- architect / project development - from 3500 EUR;
- topography - 360 EUR;
- inventory file / state fee - approximately 800-1000 EUR; exact amount calculated by VZD;
- electrical measurements - 360 EUR;
- chimney sweep act - 350 EUR;
- BIS documentation preparation, formalization and process management - 760 EUR.

These are internal orientation values.

Do not present approximate state fees as fixed ASTRO prices.

Recheck before public use.

---

# K. TOOLS

## K1. Existing tool pages

**Status: CURRENT BASELINE**

Known ASTRO tools include:

- skaitļi-vārdos;
- darba-dienu-kalendārs-2026;
- darba-dienu-kalkulators;
- dienu-kalkulators;
- armaturas-svara-kalkulators;
- metala-svara-kalkulators.

Treat tools as product features.

Do not create additional tools without a real user need or business/search value.

---

# L. CURRENT WEBSITE OPERATING PRINCIPLES

## L1. Information + commercial value

**Status: STABLE**

Expert/informational content should provide real value for users, SEO and AI search.

The website must also convert users into commercial enquiries.

Do not build a site that only explains construction topics without clear routes to relevant ASTRO services.

Do not turn every informational page into aggressive sales copy.

## L2. Detail expansion

**Status: CURRENT BASELINE**

For short service/explanation blocks, progressive disclosure such as a clear "more details" interaction may be considered where it improves readability.

Do not hide information critical to user decision-making.

This is a UX option, not a mandatory pattern.

## L3. Site design direction

**Status: STABLE**

Future redesign work should focus on:

- intuitive navigation;
- clear hierarchy;
- understandable discovery;
- consistent design system;
- mobile-first usability;
- reducing excessive card-grid feeling;
- high perceived quality without decorative excess.

---

# M. CHANGE CONTROL

## M1. When to update this file

Update `DECISIONS.md` when:

- the user explicitly approves a new long-term direction;
- an existing baseline is intentionally replaced;
- a page reaches a new approved production baseline;
- a major content rule becomes stable;
- a significant technical implementation becomes the new reference.

Do not add every small implementation detail.

## M2. When not to update this file

Do not record:

- temporary debugging notes;
- unapproved proposals;
- rejected variants;
- speculative ideas;
- one-off Codex findings;
- outdated drafts.

## M3. Superseded decisions

When a decision is replaced:

- keep the current decision;
- move the previous one to a short historical note only if it is useful;
- clearly mark it `SUPERSEDED`.

Do not leave two conflicting decisions appearing active.

## M4. Date discipline

For volatile baselines such as:

- prices;
- page status;
- analytics setup;
- plugin/platform configuration;
- search performance;
- Google Business Profile;
- technical deployment state

add or update the date when the baseline materially changes.

## M5. Final rule

This file records what ASTRO has already decided.

Do not use it to invent decisions.

If something is not clearly approved, treat it as a hypothesis and evaluate it before implementation.
