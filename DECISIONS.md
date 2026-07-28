# DECISIONS.md

Долгосрочные решения проекта ASTRO CONSTRUCTION.

Последнее обновление: 2026-07-28.

## Назначение файла

`DECISIONS.md` хранит устойчивые решения и причины, почему проект устроен именно так.

Разница между файлами:

```text
PROJECT_STATE.md -> что происходит сейчас
DECISIONS.md     -> почему приняты ключевые долгосрочные решения
TASKS.md         -> что делать дальше и в каком порядке
```

Правила:

- Не хранить здесь текущие рабочие diff, временные задачи или статус QA.
- Не превращать файл в changelog.
- Добавлять только решения, которые должны пережить изменение текущего состояния проекта.
- Если решение меняется, заменить старое актуальным и кратко объяснить новую причину.
- Не хранить секреты, credentials, приватные backend URLs, tokens, passwords или private keys.
- После каждого завершенного этапа проверять:
  - нужно ли обновить `PROJECT_STATE.md`;
  - нужно ли обновить `TASKS.md`;
  - появилось ли новое архитектурное, UX, SEO, техническое или организационное решение;
  - если да, нужно ли добавить или обновить запись в `DECISIONS.md`.

## D001. Сайт остается static HTML/CSS/JS

Решение: проект ведется как plain static website без Astro/React/Vue build-процесса.

Причина: текущий сайт уже опубликован как набор реальных HTML/CSS/JS-файлов, хорошо подходит для Cloudflare Pages, легко проверяется, быстро грузится и не требует дополнительной сборочной инфраструктуры.

Следствие: не вводить framework, bundler или component system без отдельного архитектурного решения.

## D002. `PROJECT_STATE.md`, `DECISIONS.md` и `TASKS.md` должны быть в Git

Решение: три project management документа являются частью проекта и должны храниться в репозитории.

Причина: новый чат Codex, другой компьютер или fresh clone должны получать актуальный контекст без длинных handoff-промптов.

Следствие: эти файлы можно коммитить, но в них нельзя хранить секреты или приватные технические данные.

## D003. `PROJECT_STATE.md` описывает текущее состояние, а не историю

Решение: `PROJECT_STATE.md` является living project state, но не changelog.

Причина: если файл станет историей всех изменений, новый чат будет снова перегружен шумом и начнет хуже принимать решения.

Следствие: устаревшие сведения удаляются, измененные решения заменяются, актуальная структура сохраняется.

## D004. `DECISIONS.md` хранит причины долгосрочных решений

Решение: устойчивые архитектурные, UX, SEO, technical и workflow decisions фиксируются отдельно от текущего состояния.

Причина: через месяцы важно понимать не только что сделано, но и почему это нельзя случайно отменить.

Следствие: при новом важном решении после этапа нужно проверить, требуется ли запись или обновление в `DECISIONS.md`.

## D004a. `TASKS.md` хранит план работ и приоритеты

Решение: backlog, priority, status, owner, dependencies and related files фиксируются в `TASKS.md`.

Причина: новый чат должен видеть не только состояние проекта и причины решений, но и следующий порядок работ без анализа всей истории.

Следствие: `PROJECT_STATE.md` не должен разрастаться в task tracker; task status and priorities update in `TASKS.md`.

## D005. Каждая задача должна быть узкой и коммититься отдельно

Решение: не смешивать unrelated changes в одном commit.

Причина: в проекте есть dirty working tree, локальные QA artifacts и чувствительные внутренние файлы. Малые commit проще проверять, откатывать и публиковать.

Следствие: stage only exact files for current task; commit message должен описывать конкретную задачу.

## D006. `git add .` запрещен

Решение: не использовать `git add .` в этом проекте.

Причина: рабочая папка содержит service page diffs, QA PNG/JSON, prototypes и internal/private docs. Массовый staging может случайно опубликовать лишнее.

Следствие: использовать только точечный staging exact files, затем проверять staged diff.

## D007. Формы работают через Google Apps Script с backend acknowledgement

Решение: lead forms используют Google Apps Script Web App, hidden iframe POST и JSONP status polling by `request_id`.

Причина: для static website это практичный backend без отдельного server hosting, с поддержкой Google Sheets, email и Drive uploads.

Следствие: success показывать только после backend acknowledgement; не использовать fake success; сохранять idempotency and retry with same `request_id`.

## D008. Главная позиционирует ASTRO как одного партнера на весь процесс

Решение: основное позиционирование:

```text
Viens partneris visam būvniecības procesam
No pirmajiem dokumentiem līdz būvdarbiem un ēkas nodošanai ekspluatācijā
```

Причина: ASTRO CONSTRUCTION должен восприниматься не только как документационный офис и не только как подрядчик, а как строительная компания с сильной документационной экспертизой и full lifecycle capability.

Следствие: не возвращать старое consulting-style позиционирование через `inženiertehniski risinājumi`; сохранять баланс construction and documentation.

## D009. Страницы строятся вокруг проблем и услуг пользователя

Решение: SEO architecture uses problem-first and service-first pages.

Причина: клиенты приходят с разными intent: построить, легализовать, закрыть BIS/BUN, подготовить izpilddokumentācija, решить страховой случай или довести объект до nodošana ekspluatācijā.

Следствие: страницы должны иметь clear H1, visible user problem/service framing, internal links, FAQ/schema consistency и корректную строительную терминологию.

## D010. Generic trust bar не должен дублироваться по сайту

Решение: generic trust strip with facts like `20+ gadu praktiska pieredze`, `Darbs visā Latvijā`, `Sertificēti speciālisti`, `Būvkomersants` не использовать как повторяющийся trust bar.

Причина: повторяющийся trust bar делает сайт более шаблонным и маркетинговым, снижает premium engineering feel и дублирует доверие без контекста.

Следствие: trust лучше интегрировать в смысловые блоки вроде `Kāpēc izvēlas ASTRO CONSTRUCTION` или контекстные service proof points.

## D011. Не использовать фотографии директора или AI-портреты

Решение: на сайте не использовать director photo, AI-generated portrait, fake staff images или placeholder faces.

Причина: такой визуальный слой может выглядеть недостоверно, отвлекать от engineering/process/documentation credibility и создать ложное ощущение персонального бренда.

Следствие: imagery should be object/process oriented: construction objects, documents, drawings, engineering details, work process without identifiable fictional staff.

## D012. Использовать корректные латышские construction terms

Решение: терминология должна соответствовать строительному контексту и латышскому употреблению.

Причина: точные термины важны для доверия, SEO, AI SEO и юридической аккуратности.

Следствие: использовать `segtie darbi`, `izpilduzmērījumi`, `bīstamie darbi`, `darbi ar paaugstinātu risku`; не использовать `slēptie darbi`, `izpildmērījumi`, `riskantie darbi`.

## D013. Construction direction wording depends on context

Решение:

```text
Dzīvojamo ēku būvniecība
```

использовать там, где речь только о residential houses.

```text
Dzīvojamo māju un industriālo ēku būvniecība
```

использовать для общего construction direction компании.

Причина: это точнее отражает scope компании и не сужает позиционирование до private houses where industrial construction is relevant.

Следствие: не делать механические замены; URL `privatmaju-buvnieciba.html` не менять без отдельного решения.

## D014. Legal wording must avoid unsafe guarantees

Решение: сайт не должен обещать гарантированные approvals, payouts или institution decisions.

Причина: final decisions are made by būvvalde, BVKB, insurer or other competent institutions. Неверные гарантии создают legal/compliance risk.

Следствие: избегать `garantējam`, `100%`, `panāksim apstiprinājumu`, `garantēta nodošana`, `taisnīga atlīdzība`; писать о professional preparation, coordination and execution.

## D015. `/pilna-cikla-buvnieciba.html` должен быть отдельной страницей

Решение: homepage link to `/pilna-cikla-buvnieciba.html` не заменять silently на existing `privatmaju-buvnieciba.html`.

Причина: homepage теперь продает full lifecycle construction as flagship path. Existing residential page has narrower historical URL/context and should not absorb the full-cycle positioning without отдельной задачи.

Следствие: missing page является known pending task; correct future action is likely to create `pilna-cikla-buvnieciba.html` after explicit instruction.
