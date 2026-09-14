/* Search metadata below is copied from content manifest v3. Titles, descriptions and
   destinations for the 68 approved guide entries come from the rendered HTML. */
(function () {
  'use strict';

  // [id, aliases, legacy terms, preferred phrases, search phrases, status, replacement id]
  const approvedMetadata = [
    ["paskaidrojuma-raksts",[],[],[],["kad vajag paskaidrojuma rakstu","vienkāršotā būvniecība","kā sākt būvniecību ar paskaidrojuma rakstu"],"current",null],
    ["apliecinajuma-karte",["apliecinajuma karte"],[],[],["kas ir apliecinājuma karte","vecā apliecinājuma karte","apliecinājuma kartes II daļa"],"current",null],
    ["buvniecibas-iesniegums",["buvniecibas iesniegums"],[],[],["iesniegums būvatļaujai","ko iesniedz BIS būvatļaujai"],"current",null],
    ["buvatlauja",["buvatlauja"],[],[],["kā saņemt būvatļauju","vai ar būvatļauju drīkst sākt būvēt","būvatļaujas saņemšana"],"current",null],
    ["projektesanas-nosacijumi",["projektesanas nosacijumi"],[],[],["kas jādara pēc būvatļaujas saņemšanas","projektēšanas nosacījumu izpilde","atzīme par projektēšanas nosacījumu izpildi"],"current",null],
    ["buvdarbu-uzsaksanas-nosacijumi-bun",["buvdarbu uzsaksanas nosacijumi bun","BUN"],[],[],["nevar sākt būvdarbus","būvatļauja ir bet nevar sākt būvēt","kas vajadzīgs pirms būvdarbu sākšanas","BUN izpilde"],"current",null],
    ["buvniecibas-ierosinatajs",["buvniecibas ierosinatajs"],[],[],["kas ir būvniecības ierosinātājs","kas iesniedz dokumentus BIS","pasūtītājs BIS"],"current",null],
    ["buvvalde",["buvvalde"],[],[],["ko dara būvvalde","kurš izdod būvatļauju","būvvaldes lēmums"],"current",null],
    ["bvkb-buvniecibas-valsts-kontroles-birojs",["bvkb buvniecibas valsts kontroles birojs","BVKB"],[],[],["ko kontrolē BVKB","kad objektu kontrolē BVKB","BVKB būvinspektors"],"current",null],
    ["buvniecibas-iecere",["buvniecibas iecere"],[],[],["ko drīkst būvēt īpašumā","būvniecības iecere BIS","plānoju būvēt vai pārbūvēt"],"current",null],
    ["projektesanas-uzdevums",["projektesanas uzdevums"],[],[],["ko dot projektētājam","prasības projektam","projektēšanas uzdevuma saturs"],"current",null],
    ["buvprojekts-minimala-sastava",["buvprojekts minimala sastava"],[],[],["projekts būvatļaujas saņemšanai","minimālais būvprojekts","būvprojekts minimālajā sastāvā"],"current",null],
    ["buvprojekts",["buvprojekts"],[],[],["kas ir būvprojekts","pēc kā būvē objektu","projekta rasējumi un risinājumi"],"current",null],
    ["buvprojekta-dala",["buvprojekta dala"],[],[],["AR BK UK AVK","būvprojekta sadaļas","projekta daļas"],"current",null],
    ["buvprojekta-rasejums",["buvprojekta rasejums"],[],[],["projekta rasējums","kā lasīt būvprojekta rasējumu","asis izmēri augstuma atzīmes"],"current",null],
    ["darba-rasejums",["darba rasejums"],[],[],["detalizēts rasējums būvdarbiem","mezgla rasējums","darba rasējumi būvlaukumā"],"current",null],
    ["razosanas-rasejums",["razosanas rasejums"],[],[],["shop drawing","rasējums izgatavošanai","metāla konstrukciju ražošanas rasējums"],"current",null],
    ["buvprojekta-izmainas",["buvprojekta izmainas"],[],[],["izmaiņas projektā būvdarbu laikā","izbūvētais neatbilst projektam","kā saskaņot projekta izmaiņas"],"current",null],
    ["darbu-veiksanas-projekts-dvp",["darbu veiksanas projekts dvp","DVP"],[],[],["kad vajag DVP","darbu veikšanas projekta izstrāde","kā organizēt būvdarbus objektā"],"current",null],
    ["buvdarbu-generalplans",["buvdarbu generalplans"],[],[],["būvlaukuma ģenerālplāns","būvlaukuma organizācijas plāns","kur novietot tehniku un materiālus"],"current",null],
    ["tehniska-apsekosana",["tehniska apsekosana"],[],[],["ēkas tehniskā apsekošana","jāpārbauda ēkas stāvoklis","plaisas konstrukcijās ko darīt"],"current",null],
    ["tehniskas-apsekosanas-atzinums",["tehniskas apsekosanas atzinums"],[],[],["tehniskās apsekošanas rezultāts","ēkas tehniskā stāvokļa atzinums","apsekošanas atzinums BIS"],"current",null],
    ["bis-buvniecibas-informacijas-sistema",["bis buvniecibas informacijas sistema","BIS"],[],[],["kā strādāt BIS","kur iesniegt būvniecības dokumentus","BIS dokumentācija"],"current",null],
    ["buvniecibas-lieta",["buvniecibas lieta"],[],[],["kur BIS ir mani dokumenti","būvniecības lieta BIS","objekta dokumenti BIS"],"current",null],
    ["buves-grupa",["buves grupa"],[],[],["1 grupa 2 grupa 3 grupa","kā noteikt būves grupu","kura grupa ir privātmāja"],"current",null],
    ["buvniecibas-veids",["buvniecibas veids"],[],[],["pārbūve vai atjaunošana","jauna būvniecība pārbūve atjaunošana","kāds ir būvniecības veids"],"current",null],
    ["pazinojums-par-buvniecibu",["pazinojums par buvniecibu"],[],[],["kad pietiek ar paziņojumu","būvniecība bez būvatļaujas","paziņojums BIS"],"current",null],
    ["darbu-organizesanas-projekts-dop",["darbu organizesanas projekts dop","DOP"],[],[],["kas ir DOP","DOP un DVP atšķirība","būvdarbu organizēšanas projekts"],"current",null],
    ["tehniskie-noteikumi",[],[],[],["kādi tehniskie noteikumi vajadzīgi","Sadales tīkla tehniskie noteikumi","saskaņojumi ar inženiertīkliem"],"current",null],
    ["buvdarbu-zurnals",["buvdarbu zurnals"],[],[],["būvdarbu žurnāls BIS","kā aizpildīt būvdarbu žurnālu","ikdienas būvdarbu ieraksti"],"current",null],
    ["buvdarbu-vaditajs",["buvdarbu vaditajs"],[],[],["ko dara būvdarbu vadītājs","kas raksta būvdarbu žurnālā","darbu vadītājs objektā"],"current",null],
    ["atbildigais-buvdarbu-vaditajs",["atbildigais buvdarbu vaditajs"],[],[],["ABDV","kas atbild par būvdarbiem objektā","galvenais atbildīgais būvdarbu vadītājs"],"current",null],
    ["buvuzraugs",["buvuzraugs"],[],[],["ko dara būvuzraugs","vai vajag būvuzraugu","pasūtītāja kontrole būvlaukumā"],"current",null],
    ["autoruzraugs",[],[],[],["ko dara autoruzraugs","projekta autora uzraudzība","autoruzraudzība būvdarbu laikā"],"current",null],
    ["buvdarbu-veicejs",["buvdarbu veicejs"],[],[],["kas ir būvdarbu veicējs","būvnieks būvkomersants","kas veic būvdarbus"],"current",null],
    ["edlus",["elektroniskā darba laika uzskaites sistēma"],[],[],["darba laika uzskaite būvlaukumā","EDLUS būvlaukumā","elektroniskā darba laika uzskaite"],"current",null],
    ["buvizstradajums",["buvizstradajums"],[],[],["kas ir būvizstrādājums","materiāli būvniecībā","būvniecības materiālu atbilstība"],"current",null],
    ["buvizstradajumu-dokumenti",["buvizstradajumu dokumenti"],[],[],["materiālu sertifikāti būvniecībā","kādi dokumenti vajadzīgi materiāliem","būvizstrādājumu atbilstības dokumenti"],"current",null],
    ["eid",["eid","EID","Ekspluatācijas īpašību deklarācija"],[],[],["ekspluatācijas īpašību deklarācija","DoP būvizstrādājumam","materiāla tehniskās īpašības"],"current",null],
    ["veikto-buvdarbu-pienemsanas-akts",["veikto buvdarbu pienemsanas akts"],[],["segto darbu akts","segto darbu pieņemšanas akts","nozīmīgo konstrukciju pieņemšanas akts","nozīmīgo konstrukciju akts"],["jaunais segto darbu akts","kā pieņemt pabeigtus darbus BIS","veikto darbu pieņemšanas akts"],"current_replacement",null],
    ["segto-darbu-pienemsanas-akts",["segto darbu pienemsanas akts"],["segto darbu akts"],[],["segto darbu akts","vai segto darbu akti vēl ir","vecais segto darbu akts BIS"],"legacy","veikto-buvdarbu-pienemsanas-akts"],
    ["nozimigo-konstrukciju-pienemsanas-akts",["nozimigo konstrukciju pienemsanas akts"],["nozīmīgo konstrukciju akts"],[],["nozīmīgo konstrukciju akts","vai nozīmīgo konstrukciju akti vēl ir","vecais konstrukciju pieņemšanas akts"],"legacy","veikto-buvdarbu-pienemsanas-akts"],
    ["ugunsdrosibai-nozimigas-inzeniertehniskas-sistemas-pienemsanas-akts",["ugunsdrosibai nozimigas inzeniertehniskas sistemas pienemsanas akts"],[],[],["ugunsdrošības sistēmu pieņemšanas akts","ugunsgrēka signalizācijas pieņemšanas akts","dūmu izvades sistēmas pieņemšana"],"current",null],
    ["izpildshema",["izpildshema"],[],[],["izpildshēma būvniecībā","kur faktiski izbūvēti tīkli","izpildrasējums vai izpildshēma"],"current",null],
    ["fakta-konstatacijas-akts",["fakta konstatacijas akts"],[],[],["atklāta problēma būvdarbu laikā","neparedzēti darbi objektā","pamats papildu darbiem"],"current",null],
    ["nodosana-ekspluatacija",["nodosana ekspluatacija"],[],[],["kā nodot māju ekspluatācijā","māja gatava ko darīt","ēkas nodošana ekspluatācijā"],"current",null],
    ["apliecinajums-par-ekas-gatavibu-ekspluatacijai",["apliecinajums par ekas gatavibu ekspluatacijai"],[],[],["iesniegums ēkas nodošanai","ēka gatava ekspluatācijai BIS","ko paraksta pirms nodošanas"],"current",null],
    ["akts-par-ekas-pienemsanu-ekspluatacija",["akts par ekas pienemsanu ekspluatacija"],[],[],["gala dokuments pēc nodošanas","ēka pieņemta ekspluatācijā","pieņemšanas ekspluatācijā akts"],"current",null],
    ["paskaidrojuma-raksta-ii-dala",["paskaidrojuma raksta ii dala"],[],[],["kā pabeigt paskaidrojuma rakstu","paskaidrojuma raksta pabeigšana BIS","PR II daļa"],"current",null],
    ["iesniegums-par-pazinojuma-buvdarbu-pabeigsanu",["iesniegums par pazinojuma buvdarbu pabeigsanu"],[],[],["kā pabeigt paziņojumu par būvniecību","paziņojuma būvdarbu pabeigšana BIS","būvdarbi ar paziņojumu pabeigti"],"current",null],
    ["izpilddokumentacija",["izpilddokumentacija"],[],[],["trūkst būvdarbu dokumentu","kādi dokumenti vajadzīgi pēc būvdarbiem","izpilddokumentācija BIS"],"current",null],
    ["kadastralas-uzmerisanas-lieta",["kadastralas uzmerisanas lieta"],[],[],["kadastrālā uzmērīšanas lieta","VZD ēkas uzmērīšana","vai vajag kadastrālo lietu nodošanai"],"current",null],
    ["buvuzrauga-parskats",["buvuzrauga parskats"],[],[],["būvuzrauga gala pārskats","būvuzrauga pārskats nodošanai","ko sagatavo būvuzraugs pirms nodošanas"],"current",null],
    ["izpildmerijuma-plans",["izpildmerijuma plans"],[],[],["izpildmērījums nodošanai","mērnieka plāns pēc būvniecības","ēkas faktiskais novietojums"],"current",null],
    ["ekas-energoefektivitates-pagaidu-sertifikats",["ekas energoefektivitates pagaidu sertifikats"],[],[],["energosertifikāts nodošanai","pagaidu energosertifikāts","energoefektivitātes klase pēc būvniecības"],"current",null],
    ["inzeniertiklu-gatavibas-atzinums",["inzeniertiklu gatavibas atzinums"],[],[],["atzinums no Sadales tīkla","inženiertīklu atzinumi nodošanai","tīklu gatavības atzinums"],"current",null],
    ["skanas-izolacijas-merijumi",["skanas izolacijas merijumi"],[],[],["akustikas mērījumi nodošanai","skaņas izolācijas pārbaude","triecientrokšņa mērījumi"],"current",null],
    ["elektroinstalacijas-parbaudes-dokumentacija",["elektroinstalacijas parbaudes dokumentacija"],[],[],["elektrības mērījumi nodošanai","elektroinstalācijas pārbaude","zemējuma un izolācijas mērījumi"],"current",null],
    ["apkures-ierices-iekartas-dumvadu-un-dabiskas-ventilacijas-kanalu-tehniska-stavokla-parbaudes-akts",["apkures ierices iekartas dumvadu un dabiskas ventilacijas kanalu tehniska stavokla parbaudes akts"],[],[],["dūmvada pārbaudes akts nodošanai","ventilācijas kanālu pārbaude","apkures iekārtu pārbaude nodošanai"],"current",null],
    ["vienotais-buves-registracijas-process",["vienotais buves registracijas process"],[],[],["vienotā būves reģistrācija","reģistrācija Kadastrā pēc nodošanas","vai vajag kadastrālās uzmērīšanas lietu 2026"],"current",null],
    ["atzime-par-buvdarbu-pabeigsanu",["atzime par buvdarbu pabeigsanu"],[],[],["atzīme BIS par pabeigšanu","paskaidrojuma raksta pabeigšana","kad ēka ir pieņemta ekspluatācijā"],"current",null],
    ["buves-karta",["buves karta"],[],[],["ēku nodod pa kārtām","nodot tikai daļu objekta","būvprojekta kārta"],"current",null],
    ["patvaliga-buvnieciba",["patvaliga buvnieciba"],[],[],["nelegāla būvniecība","uzbūvēts bez saskaņošanas"],"current",null],
    ["atliktie-buvdarbi",["atliktie buvdarbi"],[],[],["ko drīkst pabeigt pēc nodošanas","ziemas nodošana ekspluatācijā","labiekārtošana pēc nodošanas"],"current",null],
    ["maksimalais-buvdarbu-veiksanas-ilgums",["maksimalais buvdarbu veiksanas ilgums"],[],[],["būvatļaujas termiņš beidzas","cik ilgi der būvatļauja","būvatļaujas pagarināšana","kā pagarināt būvatļauju"],"current",null],
    ["nodosana-ekspluatacija-bez-pilnas-ieksejas-apdares",["nodosana ekspluatacija bez pilnas ieksejas apdares"],[],[],["vai var nodot māju bez apdares","nodošana bez pilnas apdares","cik jābūt pabeigtai privātmājai"],"current",null],
    ["buves-izmantosana-pirms-pienemsanas-ekspluatacija",["buves izmantosana pirms pienemsanas ekspluatacija"],[],[],["vai drīkst dzīvot nenodotā mājā","vai drīkst lietot ēku pirms nodošanas","ēkas lietošana būvdarbu laikā"],"current",null],
    ["atteikums-pienemt-eku-ekspluatacija",["atteikums pienemt eku ekspluatacija"],[],[],["būvvalde nepieņem māju","atteikta nodošana ekspluatācijā","ko darīt ja ēku nepieņem"],"current",null]
  ];
  // Existing, approved scenario destinations; no scenario article bodies are copied.
  // [id, title, destination, aliases, legacy terms, preferred phrases, search phrases]
  const scenarioMetadata = [
    ["buvatlauja-ir-bet-nevar-sakt-buvdarbus","Būvatļauja ir, bet būvdarbus vēl nedrīkst sākt","/buvatlauja-ir-bet-nevar-sakt-buvdarbus",["buvatlauja ir bet buvdarbus vel nedrikst sakt"],[],[],["būvatļauja ir bet nevar sākt būvēt","nevar sākt būvdarbus","ko darīt pēc būvatļaujas saņemšanas","nav BUN atzīmes"]],
    ["buvdarbi-sakti-bez-bun","Būvdarbi sākti bez BUN atzīmes","/buvdarbi-sakti-bez-bun",["buvdarbi sakti bez bun atzimes"],[],[],["sāku būvēt bez BUN","būvdarbi bez atļaujas sākt","nav BUN atzīmes bet darbi sākās","ko darīt ja būvdarbi sākti par agru"]],
    ["bis-piezimes","BIS lieta iestrēgusi vai būvvalde prasa labojumus","/bis-piezimes",["bis lieta iestregusi vai buvvalde prasa labojumus"],[],[],["BIS prasa labojumus","būvvaldes piezīmes BIS","BIS lieta iestrēgusi","dokumenti BIS nav pieņemti"]],
    ["buvdarbi-aptureti","Būvdarbi apturēti","/buvdarbi-aptureti",["buvdarbi aptureti"],[],[],["apturēti būvdarbi","kā atsākt būvdarbus","būvvalde apturēja būvdarbus","būvdarbu pārtraukšana"]],
    ["maja-nav-nodota-ekspluatacija","Māja ir uzbūvēta, bet nav nodota ekspluatācijā","/maja-nav-nodota-ekspluatacija",["maja ir uzbuveta bet nav nodota ekspluatacija"],[],[],["māja gatava bet nav nodota","kā nodot vecu māju ekspluatācijā","dzīvoju nenodotā mājā","māja nav nodota ekspluatācijā"]],
    ["trukst-izpilddokumentacijas","Trūkst būvdarbu dokumentu","/trukst-izpilddokumentacijas",["trukst buvdarbu dokumentu"],[],[],["trūkst izpilddokumentācijas","nav būvdarbu dokumentu","nevar nodot jo trūkst dokumentu","jāsakārto BIS dokumenti"]],
    ["nelegalizeta-buve","Nelegalizēta būve, piebūve vai pārbūve","/nelegalizeta-buve",["nelegalizeta buve piebuve vai parbuve"],[],[],["nelegāla piebūve","uzbūvēts bez saskaņošanas","jālegalizē ēka","patvaļīga pārbūve"]],
    ["edlus-nav-sakartots","EDLUS darba laika uzskaite būvlaukumā nav sakārtota","/edlus-nav-sakartots",["edlus darba laika uzskaite buvlaukuma nav sakartota"],[],[],["nav EDLUS","EDLUS nav sakārtots","darba laika uzskaite būvlaukumā nav","kā sakārtot EDLUS"]],
    ["nepieciesams-buvkomersants","Nepieciešams būvkomersants","/nepieciesams-buvkomersants",["nepieciesams buvkomersants"],[],[],["vajag būvkomersantu","kas drīkst veikt būvdarbus","vajag būvnieku ar sertificētu vadītāju","būvdarbu veicējs"]]
  ];

  const form = document.querySelector('.guide-search__form');
  const input = document.querySelector('#guide-search-input');
  const results = document.querySelector('.guide-search__results');
  const status = document.querySelector('.guide-search__status');
  const list = document.querySelector('.guide-search__list');
  const moreButton = document.querySelector('.guide-search__more');
  if (!form || !input || !results || !status || !list || !moreButton) return;

  const normalize = value => value.toLocaleLowerCase('lv-LV')
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
  const values = items => items.map(normalize).filter(Boolean);
  const entries = [];

  for (const [id, aliases, legacy, preferred, phrases, searchStatus, replacementId] of approvedMetadata) {
    const item = document.getElementById(id);
    if (!item || !item.classList.contains('guide-entry')) continue;
    const link = item.querySelector('.guide-entry__title-link');
    if (!link) continue;
    const description = item.querySelector('.guide-entry__description');
    entries.push({
      id, title: link.textContent.trim(), href: link.getAttribute('href'),
      description: description ? description.textContent : '',
      aliases: values(aliases), legacy: values(legacy), preferred: values(preferred), phrases: values(phrases),
      searchStatus, replacementId, scenario: false
    });
  }
  for (const [id, title, href, aliases, legacy, preferred, phrases] of scenarioMetadata) {
    entries.push({
      id, title, href, description: '',
      aliases: values(aliases), legacy: values(legacy), preferred: values(preferred), phrases: values(phrases),
      searchStatus: 'current', replacementId: null, scenario: true
    });
  }
  for (const entry of entries) entry.normalizedTitle = normalize(entry.title);

  function rank(entry, query) {
    const exact = items => items.includes(query);
    if (exact(entry.preferred)) return 1000;
    if (entry.normalizedTitle === query) return 900;
    if (exact(entry.aliases)) return 800;
    if (exact(entry.legacy)) return 700;
    if (exact(entry.phrases)) return 600 + (entry.scenario ? 1 : 0);
    if (entry.normalizedTitle.startsWith(query + ' ')) return 500;

    const tokens = query.split(' ');
    const fields = [entry.normalizedTitle, ...entry.aliases, ...entry.legacy, ...entry.phrases, ...entry.preferred];
    let best = 0;
    for (let fieldIndex = 0; fieldIndex < fields.length; fieldIndex++) {
      const field = fields[fieldIndex];
      if (!field) continue;
      const words = field.split(' ');
      const allTokens = tokens.every(token => words.includes(token));
      const prefixTokens = tokens.every(token => token.length >= 3 && words.some(word => word.startsWith(token)));
      const containsPhrase = (' ' + field + ' ').includes(' ' + query + ' ');
      if (containsPhrase) best = Math.max(best, 430 - fieldIndex);
      if (allTokens) best = Math.max(best, 390 + tokens.length * 4 - fieldIndex);
      if (prefixTokens) best = Math.max(best, 280 + tokens.length * 4 - fieldIndex);
    }
    if (best && entry.searchStatus === 'legacy' && entry.replacementId) best -= 2;
    if (best) return best + (entry.scenario && best >= 390 ? 1 : 0);
    return 0;
  }

  let announceTimer;
  let ranked = [];
  let expanded = false;
  function renderResults() {
    list.replaceChildren();
    for (const { entry } of (expanded ? ranked : ranked.slice(0, 10))) {
      const item = document.createElement('li');
      item.className = 'guide-search__item';
      const link = document.createElement('a');
      link.href = entry.href;
      link.textContent = entry.title;
      item.append(link);
      if (entry.description) {
        const description = document.createElement('p');
        description.textContent = entry.description;
        item.append(description);
      }
      list.append(item);
    }
    moreButton.hidden = ranked.length <= 10;
    moreButton.textContent = expanded ? 'Rādīt mazāk' : 'Rādīt visus rezultātus';
    moreButton.setAttribute('aria-expanded', String(expanded));
  }

  function update() {
    const query = normalize(input.value);
    window.clearTimeout(announceTimer);
    status.textContent = '';
    expanded = false;
    ranked = [];
    if (!query) {
      renderResults();
      results.hidden = true;
      document.body.classList.remove('guide-search-active');
      return;
    }

    ranked = entries.map(entry => ({ entry, score: rank(entry, query) }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score || a.entry.title.localeCompare(b.entry.title, 'lv-LV'));
    renderResults();
    results.hidden = false;
    document.body.classList.add('guide-search-active');
    // Delay only the announcement; visual results remain immediate.
    announceTimer = window.setTimeout(() => {
      status.textContent = ranked.length === 0 ? 'Nekas netika atrasts.'
        : ranked.length === 1 ? 'Atrasts 1 rezultāts.' : `Atrasti ${ranked.length} rezultāti.`;
    }, 300);
  }

  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', event => {
    event.preventDefault();
    input.value = '';
    update();
    input.focus();
  });
  input.addEventListener('input', update);
  moreButton.addEventListener('click', () => {
    expanded = !expanded;
    renderResults();
  });
  input.addEventListener('keydown', event => {
    if (event.key === 'Escape' && input.value) {
      event.preventDefault();
      input.value = '';
      update();
    }
  });
  form.hidden = false;
})();
