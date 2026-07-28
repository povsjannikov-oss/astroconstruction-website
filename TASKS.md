# TASKS.md

План работ ASTRO CONSTRUCTION.

Последнее обновление: 2026-07-28.

## Назначение файла

`TASKS.md` хранит текущий план работ и приоритеты.

Разница между файлами:

```text
PROJECT_STATE.md -> что происходит сейчас
DECISIONS.md     -> почему приняты ключевые долгосрочные решения
TASKS.md         -> что делать дальше и в каком порядке
```

Правила:

- Это не changelog и не место для подробной истории.
- Завершенные задачи можно держать кратко или удалять после отражения результата в `PROJECT_STATE.md`.
- Каждая задача должна иметь priority, status, owner, dependencies, related files и notes.
- Если задача выполнена, обновить `PROJECT_STATE.md`; если в задаче принято долгосрочное решение, обновить `DECISIONS.md`.
- Не хранить секреты, credentials, private backend URLs, tokens, passwords или private keys.

Статусы:

```text
Todo
In Progress
Review
Done
Blocked
```

Приоритеты:

```text
Critical
High
Medium
Low
```

## High Priority

### Create `pilna-cikla-buvnieciba.html`

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
Homepage Phase 2 published in f953175
```

Related files:

```text
pilna-cikla-buvnieciba.html
index.html
pakalpojumi.html
sitemap.xml
```

Notes:

Completed in `ad89265 Add full-cycle construction service page`.

Done:

```text
Create pilna-cikla-buvnieciba.html
Update homepage broad construction link
Update pakalpojumi broad construction link
Add new URL to sitemap.xml
Run desktop/mobile/schema/link QA
```

The page is the broad flagship SEO/service page for `pilna cikla ēku būvniecība`. QA passed on desktop 1440 and mobile 320/360/375/390/430; no horizontal overflow, valid local links, valid BreadcrumbList/Service/FAQPage JSON-LD, working FAQ accordion and CTA modal.

### Finish service page trust-strip cleanup

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
Homepage trust bar removal accepted
DECISIONS.md D010
```

Related files:

```text
bis-dokumentacija.html
buvuzraudziba.html
izpilddokumentacija.html
legalizacija.html
tames-apdrosinasanas-gadijumiem.html
```

Notes:

Completed in `7ab57b7 Remove hero trust strips from service pages`. Desktop/mobile QA passed for the five service pages; no horizontal overflow and no remaining `.hero__trust` markup.

### Review `bun-izpilde.html` local whitespace diff

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
Dirty working tree audit
```

Related files:

```text
bun-izpilde.html
```

Notes:

Audited as accidental indentation-only change and restored to `HEAD`. No commit was needed for `bun-izpilde.html`.

### Fix residential construction CTA `aria-label`

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
Audit of `privatmaju-buvnieciba.html`
```

Related files:

```text
privatmaju-buvnieciba.html
```

Notes:

Completed in `3b60808 Fix residential construction CTA aria label`. The CTA section now uses `aria-label="Sazināties par dzīvojamās ēkas būvniecību"`.

### Decide and commit project management documentation

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
PROJECT_STATE.md created
DECISIONS.md created
TASKS.md created
```

Related files:

```text
PROJECT_STATE.md
DECISIONS.md
TASKS.md
```

Notes:

These three docs are included in a separate documentation-only commit:

```text
docs: add project management documentation
```

Website HTML/CSS diffs and QA artifacts were not included.

## Medium Priority

### Check internal linking

Priority: Medium
Status: Todo
Owner: Codex

Depends on:

```text
Trust-strip cleanup resolved
Full-cycle page created
```

Related files:

```text
*.html
sitemap.xml
```

Notes:

Check service pages, problem pages, homepage lifecycle links and related-card links. Avoid changing URLs silently; report broken or missing destinations first.

### Add or review schema.org on service pages

Priority: Medium
Status: Todo
Owner: Codex

Depends on:

```text
Internal linking check
Service page content stable
```

Related files:

```text
service HTML pages
```

Notes:

Review existing structured data before adding new schema. FAQ visible text must match FAQ schema exactly.

### FAQ optimization

Priority: Medium
Status: Todo
Owner: Codex

Depends on:

```text
Service page content stable
```

Related files:

```text
service HTML pages
problem HTML pages
```

Notes:

Improve clarity for Latvian construction search intent. Avoid keyword stuffing and unsafe guarantees.

### GEO / AI Overview optimization

Priority: Medium
Status: Todo
Owner: Codex

Depends on:

```text
FAQ optimization
Schema.org review
```

Related files:

```text
service HTML pages
problem HTML pages
```

Notes:

Strengthen entity clarity, definitions and answer-oriented sections for AI search. Keep terminology exact and factual.

## Low Priority

### Add real project cases

Priority: Low
Status: Todo
Owner: User

Depends on:

```text
User provides approved case details
```

Related files:

```text
case pages or relevant service pages
```

Notes:

Use only real, approved, non-confidential project information. Do not invent clients, locations or outcomes.

### Add object/process photos

Priority: Low
Status: Todo
Owner: User

Depends on:

```text
User provides approved images or approves image sourcing direction
```

Related files:

```text
assets/
relevant HTML/CSS files
```

Notes:

Do not use director photo, AI portraits, fake staff images or fictional team photos. Prefer construction objects, documents, drawings and engineering process visuals.

## Done

### Establish project management documentation system

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
PROJECT_STATE.md
DECISIONS.md
TASKS.md
```

Related files:

```text
PROJECT_STATE.md
DECISIONS.md
TASKS.md
```

Notes:

Project documentation system established with `PROJECT_STATE.md`, `DECISIONS.md` and `TASKS.md`.
