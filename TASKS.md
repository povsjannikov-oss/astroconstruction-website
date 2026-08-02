# TASKS.md

План работ ASTRO CONSTRUCTION.

Последнее обновление: 2026-08-02.

## Назначение файла

`TASKS.md` хранит текущий план работ и приоритеты.

Разница между файлами:

```text
PROJECT_STATE.md -> что происходит сейчас
DECISIONS.md     -> почему приняты ключевые долгосрочные решения
TASKS.md         -> что делать дальше и в каком порядке
```

Правила:

- это не changelog;
- каждая задача должна иметь priority, status, owner, dependencies, related files и notes;
- не хранить секреты, credentials, private backend URLs, tokens, passwords или private keys;
- не использовать `git add .`;
- один визуальный компонент — одна задача — один commit.

Статусы:

```text
Todo
In Progress
Review
Done
Blocked
Closed
```

Приоритеты:

```text
Critical
High
Medium
Low
```

## Critical

### Maintain V1 as production baseline

Priority: Critical
Status: In Progress
Owner: Codex / User

Depends on:

```text
Rollback commit dcc1594d261186cbdd8fabc43d17e60f18b2a69b
DECISIONS.md D004
```

Related files:

```text
PROJECT_STATE.md
DECISIONS.md
TASKS.md
```

Notes:

V1 is the approved production design. Future changes must be small, isolated and verified on a preview branch before entering `main`.

## High Priority

### Full Home V2 production integration

Priority: High
Status: Closed
Owner: Codex

Depends on:

```text
Home V2 experiment
Rollback to V1
DECISIONS.md D004
```

Related files:

```text
index.html
home-v2.css
assets/home-v2/
```

Notes:

Closed after 02.08.2026 decision. Home V2 must not be fully reintegrated into `main` without a new explicit decision.

### Document V1 rollback decision

Priority: High
Status: Done
Owner: Codex

Depends on:

```text
Successful rollback to V1
```

Related files:

```text
PROJECT_STATE.md
DECISIONS.md
TASKS.md
```

Notes:

Rollback to V1 completed in `dcc1594d261186cbdd8fabc43d17e60f18b2a69b`. This documentation task records V1 as the official production baseline and Home V2 as archived experiment.

## Medium Priority

### Backlog: selectively review useful Home V2 elements

Priority: Medium
Status: Todo
Owner: User / Codex

Depends on:

```text
V1 baseline remains stable
Separate approval for each element
```

Related files:

```text
Home V2 branches/worktree
preview branches
```

Notes:

Possible future work may reuse individual successful Home V2 ideas or components, but only one element at a time. Each candidate must be evaluated against V1, implemented on a preview branch and committed separately.

### Check internal linking

Priority: Medium
Status: Todo
Owner: Codex

Depends on:

```text
V1 baseline stable after rollback
```

Related files:

```text
*.html
sitemap.xml
```

Notes:

Check service pages, problem pages, homepage links and related-card links. Avoid changing URLs silently; report broken or missing destinations first.

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

### Rollback production to V1

Priority: Critical
Status: Done
Owner: Codex

Depends on:

```text
Backup verification completed
```

Related files:

```text
index.html
home-v2.css
assets/home-v2/
```

Notes:

Rollback completed 02.08.2026 in commit `dcc1594d261186cbdd8fabc43d17e60f18b2a69b`. The rollback commit tree matches V1 tree SHA `f264db051ca057a3ba18bbc09e23ea248c537dc0`.

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
