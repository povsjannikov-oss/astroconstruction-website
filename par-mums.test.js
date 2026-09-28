const assert = require('assert');
const fs = require('fs');
const path = require('path');

const root = __dirname;
const about = fs.readFileSync(path.join(root, 'par-mums.html'), 'utf8');
const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const contact = fs.readFileSync(path.join(root, 'kontakti.html'), 'utf8');
const main = about.match(/<main>([\s\S]*?)<\/main>/)?.[1];

assert(main, 'About page must have main content');
assert.strictEqual(main.match(/<p class="hero__lead">([^<]+)<\/p>/)?.[1], 'Būvējam, vadām būvniecības projektus, veicam būvuzraudzību, projektējam, sakārtojam būvniecības dokumentāciju un BIS, legalizējam ēkas.');
assert.strictEqual(main.match(/<section class="about-intro">[\s\S]*?<p>([^<]+)<\/p>/)?.[1], 'ASTRO CONSTRUCTION ir Latvijas būvniecības uzņēmums. Strādājam ar dažādas nozīmes ēkām, no privātmājām līdz lieliem un tehniski sarežģītiem objektiem.');

function jsonLd(html) {
  return [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .map((match) => JSON.parse(match[1]));
}

function headingAndRoute(html) {
  const match = html.match(/<h3>(?:<a href="([^"]+)">)?([^<]+)(?:<\/a>)?<\/h3>/);
  assert(match, 'each service or project needs a visible heading');
  return [match[2], match[1] || null];
}

const services = [
  ['Būvniecība', '/pilna-cikla-buvnieciba', 'Būvējam komercēkas, ražošanas ēkas un privātmājas. Veicam ēku būvniecību, pārbūvi un atjaunošanu no būvdarbu sākuma līdz ēkas nodošanai ekspluatācijā.'],
  ['Būvniecības dokumentācija un BIS', '/bis-dokumentacija', 'Sagatavojam, uzturam un nodrošinām būvniecības dokumentāciju: saņemam būvatļauju, izpildām BUN, aizpildām būvdarbu žurnālu, uzturam BIS sistēmu, izstrādājam DVP, sagatavojam izpilddokumentāciju un dokumentus objekta nodošanai ekspluatācijā.'],
  ['Patvaļīgas būvniecības legalizācija', '/legalizacija', 'Legalizējam ēkas, piebūves un pārbūves, kas uzbūvētas bez projekta, neatbilst projektam vai uzceltas bez vajadzīgās būvniecības dokumentācijas. Sakārtojam īpašumu līdz likumīgam statusam.'],
  ['Būvuzraudzība', '/buvuzraudziba', 'Būvuzraudzību veic sertificēti būvuzraugi ar praktisku būvdarbu vadības un projektu vadības pieredzi. Kontrolējam būvdarbu kvalitāti un tehnoloģiju ievērošanu, lai laikus pasargātu klientu no dīkstāves, pārbūves un papildu izmaksām.'],
  ['Projektēšana', null, 'Projektējam dzīvojamās ēkas, komercēkas un ražošanas ēkas. No pirmās idejas un skices līdz gatavam būvprojektam, būvniecībai un ēkas nodošanai ekspluatācijā.'],
  ['Topogrāfija', null, 'Veicam topogrāfisko uzmērīšanu un sagatavojam topogrāfisko plānu projektēšanai un būvniecībai.'],
  ['Ģeodēzija', '/geodezija', 'Veicam ģeodēziskos darbus būvniecībai: būvasu un būvju nospraušanu, augstuma atzīmju pārnešanu, nivelēšanu, ģeodēziskā atbalsta tīkla ierīkošanu, kontrolmērījumus, horizontālos un vertikālos izpildmērījumus ēkām, būvēm un inženiertīkliem, būvkonstrukciju novietojuma kontroli, deformāciju novērojumus, kā arī būvdarbu apjomu un tilpumu uzmērījumus.'],
  ['Ģeoloģija', '/geologija', 'Veicam ģeoloģisko un ģeotehnisko izpēti būvniecībai: grunts izpēti, urbumus, grunts slāņu noteikšanu, gruntsūdens līmeņa noteikšanu un sagatavojam ģeotehniskās izpētes pārskatu projektēšanai.'],
  ['EDLUS', '/edlus-organizesana', 'Ieviešam un uzturam elektronisko darba laika uzskaites sistēmu būvlaukumā, veicam darbinieku un apakšuzņēmēju reģistrāciju, ikdienas darba laika uzskaiti, datu kontroli un nodošanu VEDLUDB.'],
  ['Mērījumi un tehniskās pārbaudes', null, 'Veicam elektroinstalāciju pārbaudes un mērījumus, ēku tehnisko apsekošanu un ēku energoefektivitātes novērtēšanu.'],
  ['Tāmes apdrošināšanas gadījumiem', '/tames-apdrosinasanas-gadijumiem', 'Pēc īpašuma bojājumiem apsekojam objektu, nosakām remonta un atjaunošanas darbu apjomu un sagatavojam tehniski pamatotu tāmi apdrošinātājam. Pārbaudām arī bojājumus, kas nav uzreiz redzami, lai tāmē būtu iekļauts reālais remonta apjoms. Pēc atlīdzības saņemšanas varam veikt arī remonta un atjaunošanas darbus.'],
  ['Nodošana ekspluatācijā', '/nodosana-ekspluatacija', 'Pārņemam objekta nodošanas procesu, sakārtojam BIS un izpilddokumentāciju, saņemam nodošanai vajadzīgos atzinumus un sagatavojam objektu pieņemšanai ekspluatācijā. Procesu vedam līdz ēkas nodošanai ekspluatācijā.']
];
const serviceList = main.match(/<ul class="about-services__list">([\s\S]*?)<\/ul>/)?.[1];
assert(serviceList, 'service directions use an unordered list');
const serviceRows = [...serviceList.matchAll(/<li class="about-service">([\s\S]*?)<\/li>/g)];
assert.strictEqual(serviceRows.length, 12);
assert.deepStrictEqual(serviceRows.map((row) => [...headingAndRoute(row[1]), row[1].match(/<p>([^<]+)<\/p>/)?.[1]]), services);
for (const [, route] of services) {
  if (route) assert(fs.existsSync(path.join(root, route.slice(1) + '.html')), 'service route exists: ' + route);
}

const projects = [
  ['Ražošanas ēka, Ventspils iela 63D, Rīga', '/projekti/razosanas-ekas-parbuves-sakartosana', 'BIS dokumentācija, projekta izmaiņu sakārtošana un nodošanas procesa noformēšana. Objekts nodots ekspluatācijā 13.12.2024.'],
  ['Pagraba konstrukciju pastiprināšana, Brīvības iela 74, Rīga', '/projekti/pagraba-konstrukciju-pastiprinasana', 'Būvdarbu procesa vadība, dokumentācija un nodošanas procesa noformēšana. Objekts nodots ekspluatācijā 28.05.2026.'],
  ['Dzīvojamās ēkas fasādes atjaunošana, Salaspils iela 16B, Rīga', '/projekti/dzivojamas-ekas-fasades-atjaunosana', 'BUN, BIS dokumentācija, būvdarbu žurnāls, būvuzrauga piesaiste un nodošanas dokumenti. Objekts nodots ekspluatācijā 2024. gadā.'],
  ['Privātmāja “Piktdienas”', null, 'Sakārtojām nodošanas procesu un nodevām privātmāju ekspluatācijā.'],
  ['Atpūtas ēka “Dzērves”, Jelgavas novads', '/projekti/dzerves-buvatlauja-un-bun', 'Būvatļaujas, BUN un BIS procesa noformēšana. Būvatļauja un BUN saņemti divu dienu laikā.'],
  ['Komercelpas, Blaumaņa iela 38/40, Rīga', '/projekti/komercelpu-parbuve', 'BUN sakārtošana, procesa noformēšana un darbu secības kontrole.'],
  ['Privātmāja Imantā, Rīga', '/projekti/privatmajas-bojajumu-apdrosinasanas-tame', 'Bojājumu un tehniskā stāvokļa izvērtēšana, apdrošināšanas tāmes sagatavošana. Klientam piešķirta atlīdzība pilna remonta veikšanai.']
];
const projectRows = [...main.matchAll(/<article class="about-project-(?:feature|row)">([\s\S]*?)<\/article>/g)];
assert.strictEqual(projectRows.length, 7);
assert.deepStrictEqual(projectRows.map((row) => [...headingAndRoute(row[1]), row[1].match(/<p>([^<]+)<\/p>/)?.[1]]), projects);
for (const [, route] of projects) {
  if (route) assert(fs.existsSync(path.join(root, route.slice(1) + '.html')), 'project route exists: ' + route);
}

const process = main.match(/<section class="about-process"[\s\S]*?<\/section>/)?.[0];
assert(process, 'process section exists');
assert.strictEqual(process.match(/<h2 id="process-heading">([^<]+)<\/h2>/)?.[1], 'Kā mēs strādājam');
assert.deepStrictEqual([...process.matchAll(/<p(?: class="about-process__lead")?>([^<]+)<\/p>/g)].map((match) => match[1]), [
  'Varam pārņemt visu būvniecības procesu vai iesaistīties vienā konkrētā posmā.',
  'Sākumā noskaidrojam objekta stadiju, dokumentācijas stāvokli un klienta mērķi. Pēc tam pārņemam posmus, par kuriem vienojamies.',
  'Projektēšanu, būvdarbus, dokumentāciju, BIS, būvuzraudzību, mērījumus un nodošanu ekspluatācijā skatām kā vienu būvniecības procesu, lai darbi objektā un dokumentācija virzītos kopā.'
]);

const knowledge = main.match(/<section class="about-knowledge"[\s\S]*?<\/section>/)?.[0];
assert(knowledge, 'knowledge section exists');
assert.strictEqual(knowledge.match(/<h2 id="knowledge-heading"><a href="\/buvniecibas-celvedis">([^<]+)<\/a><\/h2>/)?.[1], 'Būvniecības dokumentu un procesu katalogs');
assert.strictEqual(knowledge.match(/<p>([^<]+)<\/p>/)?.[1], 'Skaidrojam būvniecības dokumentus un to vietu būvniecības procesā. Katram dokumentam norādām, kad tas vajadzīgs, kas to sagatavo un paraksta, kur to iesniedz un kas jādara pēc tam.');

const cta = main.match(/<section class="cta"[\s\S]*?<\/section>/)?.[0];
assert(cta, 'contact CTA exists');
assert.strictEqual(cta.match(/<h2 id="contact-heading">([^<]+)<\/h2>/)?.[1], 'Sazinieties ar mūsu komandu');
assert.strictEqual(cta.match(/<p>([^<]+)<\/p>/)?.[1], 'Pastāstiet, ko vēlaties paveikt vai atrisināt. Ja ir foto, rasējumi vai dokumenti, pievienojiet tos. Mēs iepazīsimies ar informāciju un sazināsimies ar jums.');
assert.strictEqual(cta.match(/<a href="#astro-lead-modal" class="btn-primary">([^<]+)<\/a>/)?.[1], 'Sazināties ar komandu');

const organizationId = 'https://astroconstruction.lv/#organization';
const aboutPage = jsonLd(about).find((item) => item['@type'] === 'AboutPage');
assert(aboutPage, 'AboutPage schema exists');
assert.strictEqual(aboutPage.mainEntity['@id'], organizationId);
assert(jsonLd(about).some((item) => item['@type'] === 'BreadcrumbList'));
const organization = jsonLd(home).find((item) => item['@type'] === 'LocalBusiness' && item['@id'] === organizationId);
assert(organization, 'homepage defines the canonical LocalBusiness');
assert(!('serviceType' in organization), 'homepage LocalBusiness does not contain serviceType');
assert(jsonLd(contact).some((item) => item['@type'] === 'ContactPage' && item.mainEntity['@id'] === organizationId));

assert.strictEqual((main.match(/<h1\b/g) || []).length, 1);
assert(main.includes('<h1>ASTRO CONSTRUCTION</h1>'));
assert(main.includes('href="https://bis.gov.lv/bisp/lv/construction_companies/19975"'));
assert(main.includes('href="/buvniecibas-celvedis"'));
assert(main.includes('href="#astro-lead-modal"'));
assert(about.includes('<meta name="robots" content="index, follow">'));
assert(about.includes('<link rel="canonical" href="https://astroconstruction.lv/par-mums">'));
assert(about.includes('<meta property="og:url" content="https://astroconstruction.lv/par-mums">'));
for (const name of ['og:image', 'og:image:secure_url', 'og:image:type', 'og:image:width', 'og:image:height', 'og:image:alt', 'twitter:image', 'twitter:image:alt']) {
  const tag = home.match(new RegExp(`<meta (?:property|name)="${name}" content="[^"]+">`))?.[0];
  assert(tag, 'homepage social image metadata exists: ' + name);
  assert(about.includes(tag), 'About page shares homepage social image metadata: ' + name);
}
assert(fs.existsSync(path.join(root, 'assets/social/astro-construction-og.jpg')));
assert(about.includes('<a href="/par-mums" class="nav__link" aria-current="page">Par mums</a>'));
assert(about.includes('<a href="/par-mums" class="nav__mobile-link" aria-current="page">Par mums</a>'));
assert(about.includes('<a href="/par-mums" class="footer__link" aria-current="page">Par mums</a>'));
for (const absent of ['2007', 'Baloži', 'MKD', 'BIS lietas numurs']) {
  assert(!main.includes(absent), 'excluded claim: ' + absent);
}
for (const route of ['/projektesana', '/topografija', '/merijumi']) {
  assert(!main.includes('href="' + route + '"'), 'future route must not be linked: ' + route);
}

console.log('About page contract tests passed');
