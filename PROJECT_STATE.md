# PROJECT_STATE.md

Официальный источник актуального состояния проекта ASTRO CONSTRUCTION для новых чатов Codex.

Последнее обновление: 2026-07-28.

## 0. Правила ведения этого файла

`PROJECT_STATE.md` является рабочей документацией проекта и должен быть частью Git repository. Его цель — позволить открыть новый чат Codex в этом же проекте и продолжить работу практически без потери контекста.

Правила:

- Перед началом любой новой задачи сначала прочитать `PROJECT_STATE.md`.
- Если существует `DECISIONS.md`, прочитать его сразу после `PROJECT_STATE.md`.
- Если существует `TASKS.md`, прочитать его после `DECISIONS.md`.
- Не полагаться на историю предыдущих чатов, если информация уже содержится здесь.
- После каждой логически завершенной задачи обновлять `PROJECT_STATE.md`, но только после успешного завершения работы.
- После каждого завершенного этапа проверять, появилось ли новое долгосрочное решение, которое нужно внести в `DECISIONS.md`.
- После каждого завершенного этапа проверять, нужно ли обновить задачу или приоритет в `TASKS.md`.
- Не превращать файл в журнал изменений: хранить только текущее состояние проекта.
- Если информация устарела, удалить ее; если решение изменилось, заменить старое новым.
- Сохранять стабильную структуру документа и не менять разделы без необходимости.
- Если принято новое архитектурное, UX, SEO, техническое или организационное решение, внести его сюда.
- Если найдено противоречие между `PROJECT_STATE.md` и текущим состоянием репозитория, не исправлять файл автоматически; сначала сообщить о расхождении и предложить способ синхронизации.
- Не хранить здесь секреты: токены, пароли, приватные ключи, client secrets, private backend URLs или credentials.
- После каждого обновления кратко сообщать, какие разделы были обновлены, какие записи удалены и какие добавлены.

Стабильная структура:

```text
0. Правила ведения этого файла
1. Текущее состояние проекта
2. Git / опубликованные commit
3. Локальные незакоммиченные изменения
4. Значение текущих локальных diff
5. Архитектурные решения
6. Forms / lead system
7. UX/UI решения
8. Brand / positioning
9. SEO / AI SEO решения
10. Терминология и legal/compliance
11. Company facts
12. Ограничения проекта
13. Файлы, которые нельзя коммитить
14. Известные проблемы и риски
15. Ближайшие задачи
16. Выполненные задачи
17. Изменения в работе
18. Рабочий процесс для следующих задач
```

Связанный файл:

```text
DECISIONS.md -> долгосрочные решения и причины, почему проект устроен именно так
TASKS.md -> план работ, приоритеты, статусы, владельцы, зависимости и related files
```

## 1. Текущее состояние проекта

Проект находится в папке:

```text
C:\Users\Pjotrs\Desktop\CODEX &CLOUDE
```

Это plain static HTML/CSS/JS website без Astro framework build-процесса.
Название ASTRO относится к бренду ASTRO CONSTRUCTION, а не к фреймворку.

Репозиторий:

```text
https://github.com/povsjannikov-oss/astroconstruction-website.git
```

Production URL Cloudflare Pages:

```text
https://astroconstruction-website.pages.dev/
```

Custom domain:

```text
https://astroconstruction.lv/
```

Последняя проверенная информация: technical domain Cloudflare Pages работает и показывает новую главную страницу. Custom domain ранее из среды Codex нормально не резолвился; не считать его рабочим без отдельной проверки.

Активный сайт состоит из 40 tracked HTML-файлов в корне проекта. Папки `_backup_stage3_20260722-125654/`, `prototype-v2/`, `CLAUDE BAZA ZNANIJ/`, `integrations/`, QA PNG/JSON и внутренние документы не считать опубликованной частью сайта.

## 2. Git / опубликованные commit

Текущая ветка:

```text
main
```

Текущее состояние Git:

```text
tracked working tree clean
staging empty
main and origin/main synchronized after the latest push
```

Последний опубликованный website commit:

```text
f953175 Update homepage positioning and service flow
```

Project management documentation commit:

```text
docs: add project management documentation
```

Service cleanup commit:

```text
7ab57b7 Remove hero trust strips from service pages
```

Minor cleanup commit:

```text
3b60808 Fix residential construction CTA aria label
```

Full-cycle construction page commit:

```text
ad89265 Add full-cycle construction service page
```

Опубликованные commit в `origin/main`:

```text
fd0130c Initial Astro Construction website release
3b57624 PageSpeed and accessibility optimization
a904827 Unified site-wide lead form
274d818 Add city autocomplete combobox
c277ad9 Improve tablet and mobile responsive UX
91a457c Add concrete handover timelines costs and Latvia city autocomplete
d904bb1 Update construction service terminology
6c34a82 fix: remove mobile horizontal overflow
f953175 Update homepage positioning and service flow
docs: add project management documentation
7ab57b7 Remove hero trust strips from service pages
3b60808 Fix residential construction CTA aria label
docs: update minor cleanup status
ad89265 Add full-cycle construction service page
docs: record full-cycle construction page
```

Не републиковать и не пересоздавать старые commit.

## 3. Локальные незакоммиченные изменения

Рабочее дерево сейчас не чистое. Перед любой задачей обязательно выполнить:

```bash
git status --short
git branch --show-current
```

Текущие modified tracked HTML files:

```text
none
```

Текущий staging:

```text
empty
```

Project management documentation files are intended to be tracked in Git:

```text
PROJECT_STATE.md
DECISIONS.md
TASKS.md
```

Текущие untracked QA/strategy artifacts:

```text
HOME_PAGE_STRATEGY.md
QA PNG/JSON files
screenshot/QA artifacts
entry-path-links-*.png
entry-path-links-qa.json
flow-links-*.png
hero-copy-*.png
hero-final-*.png
lh-phase1-mobile*.json
lifecycle-links-*.png
lifecycle-links-*.json
no-responsibility-*.png
phase1-*.png
phase2-*.png
phase21-*.png
prototype-v2/
remove-trust-home-*.png
```

Не удалять и не добавлять эти файлы автоматически.

## 4. Значение текущих локальных diff

Service-page hero trust strip cleanup завершен в commit:

```text
7ab57b7 Remove hero trust strips from service pages
```

`bun-izpilde.html` was restored to `HEAD` after audit and no longer has a local diff.

`privatmaju-buvnieciba.html` CTA `aria-label` cleanup завершен в commit:

```text
3b60808 Fix residential construction CTA aria label
```

Approved wording:

```text
Sazināties par dzīvojamās ēkas būvniecību
```

`pilna-cikla-buvnieciba.html` создана как broad flagship SEO/service page for pilna cikla ēku būvniecība в commit:

```text
ad89265 Add full-cycle construction service page
```

Интеграция:

```text
index.html -> primary service card now links to /pilna-cikla-buvnieciba.html
pakalpojumi.html -> broad construction card now links to /pilna-cikla-buvnieciba.html
sitemap.xml -> new URL added
```

QA для `pilna-cikla-buvnieciba.html`:

```text
desktop 1440 passed
mobile 320/360/375/390/430 passed
horizontal overflow absent
FAQ accordion works
CTA modal works
local links valid
JSON-LD BreadcrumbList, Service and FAQPage valid
canonical and OG URL correct
hero trust strip absent
```

## 5. Архитектурные решения

- Сайт остается static HTML/CSS/JS.
- Долгосрочные причины архитектурных, UX, SEO, технических и workflow решений хранятся в `DECISIONS.md`.
- План работ и приоритеты хранятся в `TASKS.md`.
- Не вводить build system, framework или новые компоненты без явной причины и согласования.
- Сохранять текущую структуру HTML-файлов в корне.
- Routing, `sitemap.xml`, `robots.txt`, legal pages и `404.html` уже настроены; не трогать без отдельной задачи.
- Canonical strategy соответствует реальным `.html` static URLs.
- Не менять URL `privatmaju-buvnieciba.html`, даже если visible title использует `Dzīvojamo ēku būvniecība`.
- Не менять forms backend, Google Apps Script endpoint, status polling и idempotency без отдельной задачи.
- Не создавать новые страницы, пока не проверено, что аналогичного решения нет.

## 6. Forms / lead system

Frontend files:

```text
astro-lead-modal.js
astro-lead-modal.css
astro-forms.js
```

Backend:

```text
Google Apps Script Web App
```

Production public frontend endpoint:

```text
https://script.google.com/macros/s/AKfycbyJffuU0zuLpn3bpt0qQpSEpsJVf_x55GsWQKNoGD8UICt4OigA_sfbROWMTkLuOcRY/exec
```

Принятые решения:

- hidden iframe POST + JSONP status polling by `request_id`;
- success только после backend acknowledgement;
- не использовать fake success;
- `postMessage` не использовать как primary acknowledgement;
- server-side idempotency;
- retry использует тот же `request_id`;
- timeout message должен быть нейтральным, не false failure.

Apps Script source, credentials и internal setup docs не публиковать.

## 7. UX/UI решения

Сайт должен ощущаться как premium engineering construction company: спокойный, практичный, современный, надежный, без дешевого маркетинга и без generic contractor template.

Принятые решения:

- mobile-first;
- не допускать horizontal overflow;
- не делать крупный redesign без явного запроса;
- не дублировать generic trust bar по сайту;
- trust bar под hero главной страницы удален;
- generic trust strip с `20+ gadu praktiska pieredze`, `Darbs visā Latvijā`, `Sertificēti speciālisti`, `Būvkomersants` не возвращать без явного запроса;
- trust лучше интегрировать естественно в блоки вроде `Kāpēc izvēlas ASTRO CONSTRUCTION`;
- director photo не добавлять;
- не использовать AI portraits, fake staff images или placeholder faces.

Homepage после commit `f953175`:

- Hero H1: `Viens partneris visam būvniecības procesam.`
- Supporting line: `No pirmajiem dokumentiem līdz būvdarbiem un ēkas nodošanai ekspluatācijā.`
- Flow: Hero -> Three Entry Paths -> Construction Lifecycle -> Primary Services.
- Есть секция `#papildu-pakalpojumi`.
- Responsibility disclaimer и trust bar с главной удалены.
- QA ранее проходил на 320, 360, 390, 768, 1024 и 1440 px без horizontal overflow.

## 8. Brand / positioning

Основное позиционирование:

```text
Viens partneris visam būvniecības procesam
No idejas līdz nodošanai ekspluatācijā
```

ASTRO CONSTRUCTION должен восприниматься как:

- реальная строительная компания;
- эксперт в строительной документации;
- партнер полного цикла;
- команда, способная решать сложные строительные ситуации;
- один ответственный партнер от идеи до nodošana ekspluatācijā.

Важно сохранять баланс: construction и documentation одинаково важны коммерчески. Сайт не должен звучать только как consulting/project management или только как documentation office.

Не возвращать старое позиционирование через `inženiertehniski risinājumi`.

Избегать чрезмерного употребления:

```text
procesu vadība
projektu vadība
vadām projektus
uzņemas procesa vadību
izvērtējam situāciju
sagatavojam rīcības plānu
```

Допустимые формулировки, если подходят по смыслу:

```text
risinām sarežģītas būvniecības situācijas
sakārtojam dokumentāciju
koordinējam speciālistus
virzām objektu tālāk
sagatavojam dokumentus
nodrošinām praktisku izpildi
palīdzam nonākt līdz praktiskam risinājumam
```

## 9. SEO / AI SEO решения

Сайт должен оставаться SEO-strong и AI-search friendly.

Принципы:

- problem-first и service-first pages;
- clear H1;
- clear H2/H3 hierarchy;
- unique title/meta description;
- canonical URL соответствует реальному `.html` URL;
- FAQ visible text должен соответствовать FAQ schema;
- internal links между problem pages и service pages;
- definitions blocks для BIS/BUN/EDLUS/BVKB/būvvalde;
- избегать keyword stuffing;
- использовать корректную латышскую строительную терминологию.

Важные SEO clusters:

```text
BIS dokumentācija
BUN izpilde
Būvdarbu uzsākšanas nosacījumu izpilde
Nodošana ekspluatācijā
Izpilddokumentācija
Tāmes apdrošināšanas gadījumiem
Legalizācija
Būvuzraudzība
Būvdarbu vadība
Būvkomersants
Dzīvojamo ēku būvniecība
Dzīvojamo māju un industriālo ēku būvniecība
Ģeodēzija
Ģeoloģija
Elektroinstalāciju pārbaudes
Darba aizsardzība
DVP izstrāde
Būvdarbu žurnāls BIS
Kalendārie grafiki
EDLUS
```

Terminology decision from `d904bb1`:

- `Dzīvojamo ēku būvniecība` использовать там, где контекст только про residential houses.
- `Dzīvojamo māju un industriālo ēku būvniecība` использовать для общего construction direction компании.
- Не заменять эти термины механически.

## 10. Терминология и legal/compliance

Использовать:

```text
Būvniecības informācijas sistēma (BIS)
Būvdarbu uzsākšanas nosacījumu izpilde
Būvvalde
BVKB
būvatļauja
būvdarbu žurnāls
būvkomersants
būvdarbu vadītājs
būvuzraugs
autoruzraudzība
izpilddokumentācija
izpilduzmērījumi
nodošana ekspluatācijā
segtie darbi
segto darbu pārbaude
būtiskie būvdarbu posmi
EDLUS
VEDLUDB
VID
Darba aizsardzības koordinators
darbi ar paaugstinātu risku
bīstamie darbi
```

Не использовать:

```text
slēptie darbi
riskantie darbi
izpildmērījumi
```

Правильная фраза:

```text
Segto darbu pārbaude un būtisko būvdarbu posmu kontrole
```

Не писать `reģistrēts būvkomersants`, если нет специальной причины. Если компания `būvkomersants`, регистрация подразумевается.

Нельзя использовать unsafe guarantees:

```text
garantējam
garantē
100%
pilnīga atlīdzība
taisnīga atlīdzība
garantēta nodošana
garantēts apstiprinājums
panāksim apstiprinājumu
mēs ietekmēsim būvvaldi
atrisinām jebkuru problēmu
```

Не обещать approval от būvvalde/BVKB, insurance payout или commissioning. Допустимо писать, что ASTRO professionally prepares, coordinates and executes, while final decisions are made by competent institutions / insurer.

Approved insurance caution:

```text
Lēmumu par atlīdzību pieņem apdrošinātājs. Mēs sagatavojam tehniski pamatotu tāmi un dokumentāciju bojājumu un atjaunošanas darbu skaidrai iesniegšanai.
```

Никогда не упоминать RERE на сайте.

## 11. Company facts

Использовать последовательно:

```text
SIA ASTRO CONSTRUCTION
Reģ. Nr: 50203660251
Būvkomersanta reģ. nr.: 19981
PVN maksātājs: yes
Juridiskā adrese: Zentenes iela 18-29, Rīga, LV-1069
Tālrunis: +371 29 963 618
E-pasts: info@astroconstruction.lv
```

Footer format:

```text
© 2026 SIA ASTRO CONSTRUCTION
Būvkomersanta reģ. nr. 19981
Reģ. nr. 50203660251
```

Company registration не использовать как primary trust-bar item above the fold.

## 12. Ограничения проекта

- Всегда предпочитать небольшие локальные изменения крупным рефакторингам.
- Не создавать новый компонент, если аналогичная функциональность уже есть.
- Перед новой страницей или блоком проверить наличие аналогичного решения.
- Если задача неоднозначна, сначала предложить план и дождаться подтверждения.
- Если обнаружены потенциальные проблемы архитектуры, UX, UI, SEO, производительности, безопасности или доступности, сначала сообщить и предложить варианты; не менять самостоятельно без одобрения.
- Любое изменение должно быть совместимо с опубликованной частью сайта и не ухудшать существующее поведение.
- `PROJECT_STATE.md` обновлять как живую документацию проекта после успешного завершения логических этапов.
- `DECISIONS.md` обновлять только для долгосрочных решений, которые должны сохраняться независимо от текущего статуса проекта.
- `TASKS.md` обновлять для статусов, приоритетов, dependencies, owners и related files текущих или ближайших задач.

Приоритеты:

```text
1. Надежность
2. Качество архитектуры и кода
3. UX
4. SEO и AI SEO
5. Производительность
6. Визуальная составляющая
```

## 13. Файлы, которые нельзя коммитить

Не включать в public GitHub без явного одобрения:

```text
_backup_stage3_20260722-125654/
backup_stage3_*/
*backup_stage3**/
CLAUDE BAZA ZNANIJ/
CLAUDE_BAZA_ZNANIJ/
integrations/
google-apps-script-leads.gs
GOOGLE_APPS_SCRIPT_DEPLOYMENT.md
FORM_INTEGRATION_SETUP.md
ASTRO_BRAND_CONTEXT.md
ASTRO_CONSTRUCTION_Knowledge_Base.md
ASTRO_CONSTRUCTION_Website_Audit.md
ASTRO_HOMEPAGE_BLUEPRINT.md
ASTRO_PAGE_APPROVAL_AUDIT.md
ASTRO_PAGE_APPROVAL_PROCESS.md
ASTRO_SERVICE_PAGE_SYSTEM.md
ASTRO_STRATEGY.md
ASTRO_VISUAL_SYSTEM.md
internal audit/strategy/knowledge-base documents
.env
.env.*
API keys
tokens
passwords
private keys
client secrets
Windows/editor service files
QA PNG/JSON files
prototype-v2/
HOME_PAGE_STRATEGY.md
```

`.gitignore` уже содержит многие из этих entries, но перед staging все равно проверять.

## 14. Известные проблемы и риски

1. Dirty working tree contains untracked QA/strategy/prototype artifacts. Нельзя использовать `git add .`, иначе можно случайно добавить QA screenshots, JSON, strategy docs и prototype.
2. Custom domain `https://astroconstruction.lv/` ранее не резолвился из Codex environment; нужна отдельная DNS/Cloudflare проверка.
3. Internal/private docs and backend setup files must stay out of public GitHub.

## 15. Ближайшие задачи

1. Решить судьбу QA artifacts and `HOME_PAGE_STRATEGY.md`: оставить локально, добавить в `.gitignore`, переместить в ignored archive или commit selected docs only if explicitly approved.
2. Проверить custom domain DNS/Cloudflare only if requested or if owner reports issue.

Детальный backlog и task metadata ведутся в `TASKS.md`.

## 16. Выполненные задачи

- Initial public static website release.
- PageSpeed and accessibility optimization.
- Unified site-wide lead form.
- City autocomplete combobox with `assets/data/latvia-cities.json`.
- Tablet/mobile responsive UX improvements.
- Concrete handover timelines/costs and Latvia city autocomplete improvements.
- Construction service terminology update.
- Mobile horizontal overflow fix.
- Homepage positioning and service flow update.
- Created `PROJECT_STATE.md` as official current project state source.
- Added governance rules for maintaining `PROJECT_STATE.md` as living project documentation.
- Created `DECISIONS.md` as long-term project decision record.
- Added rule to check after each completed stage whether `PROJECT_STATE.md` and `DECISIONS.md` need updates.
- Created `TASKS.md` as project backlog and priority tracker.
- Added rule to check after each completed stage whether `TASKS.md` needs updates.
- Removed hero trust strips from five service pages in `7ab57b7 Remove hero trust strips from service pages`.
- Fixed residential construction CTA `aria-label` in `3b60808 Fix residential construction CTA aria label`.
- Restored accidental whitespace-only diff in `bun-izpilde.html` to `HEAD`.
- Created and verified `pilna-cikla-buvnieciba.html` as broad flagship SEO/service page for pilna cikla ēku būvniecība in `ad89265 Add full-cycle construction service page`; updated `index.html`, `pakalpojumi.html` and `sitemap.xml`.

## 17. Изменения в работе

Pending local website work:

```text
QA/prototype artifact decision
```

## 18. Рабочий процесс для следующих задач

Для каждой задачи:

```text
1. Read PROJECT_STATE.md first
2. Read DECISIONS.md if present
3. Read TASKS.md if present
4. Audit current Git state
5. State exact scoped plan
6. Implement only approved scope
7. QA locally and/or production as appropriate
8. Stage only exact files
9. Check staged diff
10. Commit with clear message
11. Push only if explicitly requested
12. Update PROJECT_STATE.md after the successful logical stage
13. Check whether DECISIONS.md needs a new or updated long-term decision
14. Update TASKS.md when task status, priority, owner, dependencies or related files changed
15. Report which PROJECT_STATE.md sections were updated, which entries were removed, and which entries were added
16. Report whether DECISIONS.md was changed and why
17. Report whether TASKS.md was changed and why
18. Report self-review
```

Git safety rules:

```text
Do not use git add .
Do not use git reset --hard
Do not use git checkout -- .
Do not use git restore .
Do not use git clean
Do not delete local files
Do not push without explicit request
```
