# DECISIONS.md

Долгосрочные решения проекта ASTRO CONSTRUCTION.

Последнее обновление: 2026-09-27.

## Назначение файла

`DECISIONS.md` хранит устойчивые решения и причины, почему проект устроен именно так.

```text
PROJECT_STATE.md -> что происходит сейчас
DECISIONS.md     -> почему приняты ключевые долгосрочные решения
TASKS.md         -> что делать дальше и в каком порядке
```

Не хранить здесь текущие diff, временные задачи, подробный QA-журнал, secrets, credentials, private backend URLs, tokens, passwords или private keys. Добавлять только решения, которые должны пережить изменение текущего состояния проекта.

## D001. Сайт остаётся static HTML/CSS/JS

Решение: проект ведётся как plain static website без Astro/React/Vue build-процесса.

Причина: текущий сайт опубликован как набор реальных HTML/CSS/JavaScript-файлов, подходит для Cloudflare Pages, напрямую проверяется и не требует дополнительной сборочной инфраструктуры.

Следствие: не вводить framework, bundler, package build system или broad architecture rewrite без отдельного архитектурного решения.

## D002. Project-state documentation хранится в Git

Решение: `PROJECT_STATE.md`, `DECISIONS.md` и `TASKS.md` являются частью проекта и хранятся в репозитории.

Причина: новый Codex task, другой компьютер или fresh clone должны получать актуальный контекст без длинных handoff-промптов.

Следствие: файлы можно коммитить, но нельзя использовать как changelog или хранилище приватных данных.

## D003. Используется только exact-path staging

Решение: `git add .` и `git add -A` в этом проекте запрещены.

Причина: рабочие каталоги могут содержать unrelated changes, QA artifacts, prototypes, internal/private documents и local backups.

Следствие: stage только exact approved files, затем проверять staged names и staged diff. При рискованном dirty checkout использовать отдельный clean worktree.

## D004. Текущая production-реализация - baseline, но не конечный design target

Дата обновления решения: 2026-09-27.

Решение: текущий `main` / `origin/main` является рабочей production-базой. Ни августовский V1, ни Home V2 не являются автоматически утверждённой целью для восстановления или дальнейшего design development.

Причина: после августовского rollback продукт существенно изменился: расширены services и expert content, BIS/document architecture, construction guide, forms, utilities, SEO, project evidence и shared behavior. Будущий дизайн должен исходить из текущего продукта, а не из старого snapshot.

Целевое направление: distinctive, calm и technically credible construction experience, а не generic AI/SaaS/crypto/legal template. Решения должны учитывать content hierarchy, trust, conversion, accessibility, performance и реальный строительный контекст.

Следствие: systematic redesign или design-system evolution выполняется как отдельная approved и audited задача. Обычная feature, content или maintenance задача не даёт разрешения на broad redesign. Это решение заменяет прежнее утверждение, что V1 является постоянным approved design baseline.

## D005. Scope определяется coherent task, а не обязательным правилом «один компонент - один commit»

Дата обновления решения: 2026-09-27.

Решение: прежнее правило `one visual component -> one task -> one commit` больше не является постоянным ограничением проекта.

Причина: exact staging, isolation, diff review и verification уже регулируются global Codex instructions и root `AGENTS.md`. Жёсткое дробление может мешать coherent design-system или shared-component work.

Следствие: изменения остаются минимальными и reviewable, но одна отдельно утверждённая задача может охватывать несколько связанных компонентов, если это необходимо для целостного результата. Unrelated work по-прежнему не объединяется.

## D006. V1 snapshot сохраняется только как historical reference

Решение: локальный каталог `C:\Users\Pjotrs\Desktop\ASTRO LEGACY 2026-07-30` можно сохранять неизменным как исторический материал.

Проверка: наличие каталога подтверждено 2026-09-27; содержимое и соответствие прежнему tree SHA в этой задаче повторно не проверялись.

Причина: snapshot может быть полезен для сравнения прежних решений, но local filesystem path не является переносимой частью Git и не отражает текущий продукт.

Следствие: snapshot не использовать как production authority, обязательный visual baseline или автоматический источник восстановления. Не изменять и не удалять его без отдельного решения.

## D007. Codex instruction architecture остаётся компактной и разделённой по роли

Дата: 2026-09-27.

Решение: после commit `58ca3dc7283fc07d2415827e8e0d5294c12a736f` reusable working rules находятся в global Codex instructions, ASTRO-specific rules - в root `AGENTS.md`, а project state управляется тремя файлами `PROJECT_STATE.md`, `DECISIONS.md` и `TASKS.md`.

Причина: прежние пять файлов в `docs/project-rules/` дублировали и усложняли instruction hierarchy.

Следствие: `docs/project-rules/` не является действующим instruction layer. Не восстанавливать прежнюю архитектуру и не добавлять ссылки на удалённые rule files без нового явного решения. Текущие факты, durable decisions и backlog должны оставаться разделёнными между тремя project-state documents.
