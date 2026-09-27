# PROJECT_STATE.md

Официальный источник текущего состояния проекта ASTRO CONSTRUCTION для новых задач Codex.

Последнее обновление: 2026-09-27.

## 1. Идентичность и production-база

ASTRO CONSTRUCTION - публичный сайт на plain static HTML/CSS/JavaScript. Это не Astro framework и не проект со сборочным процессом.

Production baseline хранится в `main` / `origin/main`.

На момент этого обновления актуальный `origin/main`:

```text
58ca3dc7283fc07d2415827e8e0d5294c12a736f
```

Основной production domain:

```text
https://astroconstruction.lv/
```

Сайт использует Cloudflare Pages. Репозиторий подтверждает исходные файлы и release history, но сам по себе не доказывает текущий deployment status, настройки Cloudflare или состояние live-сайта. Для production-утверждений нужна отдельная live-проверка.

## 2. Текущее состояние продукта

Сайт существенно развился после rollback-документации августа 2026 года. Текущая production-база включает взаимосвязанную систему:

- service, client-situation и expert pages;
- BIS и construction-document материалы;
- knowledge architecture с `zinasanu-centrs/` и поисковым `buvniecibas-celvedis`;
- project cases и технические изображения;
- общие lead forms, CTA и modal behavior;
- construction и calendar utilities;
- canonical, Open Graph, JSON-LD, sitemap и crawler controls;
- актуальные favicon и social preview assets;
- repository-level Codex instructions.

Это описание направлений продукта, а не исчерпывающий реестр страниц. Точное состояние определяется текущими tracked files и Git history.

## 3. Состояние дизайна и UX

Текущая реализация является рабочей production-базой, но не утверждённым конечным дизайн-направлением.

Значительная часть визуального слоя сложилась как rapid-launch и legacy implementation. По оценке владельца, сайт местами выглядит визуально недоработанным и слишком похожим на generic AI/SaaS/crypto/legal template вместо узнаваемого construction product.

Ожидаемое будущее направление - системная эволюция design system и UX на основе текущего продукта, контента, SEO, доверия, conversion, accessibility, performance и строительного позиционирования ASTRO.

Это не разрешение на redesign в рамках обычных задач. Такой этап должен быть отдельной задачей с полным product audit, утверждённым направлением, управлением scope и regression verification.

Ни V1, ни Home V2 не являются автоматической целью для восстановления. Их можно использовать только как исторический материал, если это полезно для конкретного анализа.

## 4. Архитектура инструкций

После commit `58ca3dc7283fc07d2415827e8e0d5294c12a736f` действует упрощённая архитектура инструкций:

```text
global Codex instructions -> reusable cross-project working rules
root AGENTS.md            -> ASTRO-specific repository instructions
PROJECT_STATE.md          -> current project state
DECISIONS.md              -> durable approved decisions and reasons
TASKS.md                  -> current actionable backlog
```

Каталог `docs/project-rules/` и пять прежних detailed rule files удалены из текущего production tree этим commit. Не ссылаться на них как на действующий слой инструкций и не восстанавливать их без нового явного решения.

## 5. Исторические материалы

Августовский V1 rollback и Home V2 остаются частью истории проекта, но не определяют текущую product architecture и не ограничивают будущую работу формулой «только поверх V1».

Локальный путь:

```text
C:\Users\Pjotrs\Desktop\ASTRO LEGACY 2026-07-30
```

существовал и был доступен при проверке 2026-09-27. В этой задаче проверено наличие каталога, но не проведён новый аудит его содержимого или tree equivalence. Это historical reference snapshot, а не authority для текущего production или будущего design direction. Путь является локальным и не переносится во fresh clone.

Home V2 branches/worktrees также могут сохраняться как исторический материал. Их наличие не означает одобрение на reintegration.

## 6. Актуализация состояния

- Не считать repository state доказательством live deployment.
- Обновлять `PROJECT_STATE.md`, `DECISIONS.md` и `TASKS.md` только когда materially меняется текущее состояние, durable decision или backlog.
- Не превращать эти файлы в release log или перечень каждого завершённого commit.
