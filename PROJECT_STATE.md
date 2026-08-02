# PROJECT_STATE.md

Официальный источник актуального состояния проекта ASTRO CONSTRUCTION для новых задач Codex.

Последнее обновление: 2026-08-02.

## 1. Текущее состояние проекта

Проект находится в папке:

```text
C:\Users\Pjotrs\Desktop\CODEX &CLOUDE
```

Это plain static HTML/CSS/JS website без Astro framework build-процесса. Название ASTRO относится к бренду ASTRO CONSTRUCTION, а не к фреймворку.

Production URL:

```text
https://astroconstruction-website.pages.dev/
```

Custom domain:

```text
https://astroconstruction.lv/
```

Custom domain не менять без отдельной задачи.

## 2. Production baseline

Официальная production-версия после rollback:

```text
dcc1594d261186cbdd8fabc43d17e60f18b2a69b
```

Approved design:

```text
V1
```

V1 tree SHA:

```text
f264db051ca057a3ba18bbc09e23ea248c537dc0
```

Rollback к V1 выполнен 02.08.2026. `main` и `origin/main` должны оставаться на истории, где Home V2 сохранена предыдущими commit, а актуальное файловое дерево production снова совпадает с V1.

## 3. Product Snapshot

Эталонный архив V1:

```text
C:\Users\Pjotrs\Desktop\ASTRO LEGACY 2026-07-30
```

Статус:

```text
immutable reference snapshot
```

Этот архив используется как визуальный и продуктовый эталон V1. Не изменять, не перезаписывать и не использовать как рабочую папку.

## 4. Home V2

Home V2 status:

```text
archived experiment
```

Home V2 закрыта как отдельный эксперимент. Она не является approved production design и не должна автоматически возвращаться в `main`.

Сохранять Home V2 branches/worktree как архив идей и компонентов. Не удалять их без отдельного решения.

Запрещена полная повторная интеграция Home V2 в `main` без нового отдельного решения.

## 5. Рабочее правило после rollback

Дальнейшие изменения выполняются точечно поверх V1:

```text
one visual component -> one task -> one commit
```

Любые визуальные изменения сначала проверяются на отдельной preview-ветке. В `main` попадают только небольшие изолированные изменения после проверки.

## 6. Git safety

Перед любой задачей:

```bash
git status --short
git branch --show-current
```

Правила:

- не использовать `git add .`;
- stage only exact files for current task;
- не использовать force push;
- не переписывать историю `main`;
- не удалять Home V2 branches/worktree;
- не менять Cloudflare без отдельной задачи;
- не изменять Product Snapshot и backup.

## 7. Документация

Связанные файлы:

```text
DECISIONS.md -> долгосрочные решения и причины
TASKS.md -> текущий backlog, статусы и правила задач
```

После завершения логического этапа проверить, нужно ли обновить `PROJECT_STATE.md`, `DECISIONS.md` и `TASKS.md`.
