# TASKS.md

Текущий backlog ASTRO CONSTRUCTION.

Последнее обновление: 2026-09-27.

## Назначение файла

`TASKS.md` хранит только актуальные следующие работы и их зависимости.

```text
PROJECT_STATE.md -> что происходит сейчас
DECISIONS.md     -> почему приняты ключевые долгосрочные решения
TASKS.md         -> что делать дальше и в каком порядке
```

Правила:

- это не changelog и не список завершённых release;
- каждая задача имеет priority, status, owner, dependencies, related files и notes;

Статусы: `Todo`, `In Progress`, `Review`, `Done`, `Blocked`, `Closed`.

Приоритеты: `Critical`, `High`, `Medium`, `Low`.

## High Priority

### ASTRO Design System / UX evolution

Priority: Medium
Status: Todo
Owner: User / Codex

Dependencies:

- отдельное явное разрешение на design/UX task;
- полный audit текущего продукта и shared implementation;
- утверждённое design direction и regression plan;
- актуальные user, business, SEO, accessibility, performance и conversion evidence, где они доступны.

Related files:

- определяются отдельным audit;
- ожидаемый scope включает homepage, services, expert/knowledge pages, utilities, navigation, forms, shared CSS/JavaScript и responsive behavior.

Notes:

Текущий production работает, но не является конечным design target. Задача должна заменить generic rapid-launch / AI-SaaS-crypto-legal visual language на construction-specific, credible и coherent system. Не восстанавливать автоматически V1 или Home V2. Документирование этой задачи не разрешает её реализацию сейчас.

### Связать expert, service и document architecture

Priority: High
Status: Todo
Owner: Codex / User

Dependencies:

- инвентаризация текущих search intents и существующих destinations;
- подтверждение приоритетных user journeys;
- отдельное одобрение любых изменений approved copy.

Related files:

- `buvniecibas-celvedis.html`
- `zinasanu-centrs.html` и `zinasanu-centrs/`
- service, client-situation, BIS и construction-document pages
- `sitemap.xml`

Notes:

Проверить contextual internal linking между связанными expert, service и document pages. Использовать небольшой high-value набор ссылок с понятными anchors, сохранять approved copy и избегать duplicate intent, cannibalization и механического mass-linking. Не считать internal linking завершённым без отдельной полной проверки tracked pages и destinations.

## Medium Priority

### Поддерживать SEO, indexation и schema parity по мере роста библиотеки

Priority: Medium
Status: Todo
Owner: Codex / User

Dependencies:

- конкретная новая или изменённая page group;
- актуальные GSC, indexing, SERP, search-intent и conversion evidence, когда они доступны;
- стабильный visible content для schema parity.

Related files:

- новые и materially изменённые expert/service pages
- `sitemap.xml`
- `robots.txt`

Notes:

Structured data уже широко используется, поэтому задача не состоит в blanket-добавлении schema. Для новых и изменённых страниц проверять visible content / JSON-LD parity, canonical и `og:url`, internal links, sitemap inclusion, indexability и intent overlap. Не создавать thin pages или новые URLs только ради keyword.

## Low Priority

### Поддерживать project-state documentation

Priority: Low
Status: Todo
Owner: Codex / User

Dependencies:

- materially changed current state, durable decision или backlog.

Related files:

- `PROJECT_STATE.md`
- `DECISIONS.md`
- `TASKS.md`

Notes:

После существенного product, architecture или workflow change проверить эти три файла. Обновлять только затронутый слой и не превращать документацию в commit log. Перед release сверять факты с текущим `origin/main` и доступными external sources.
