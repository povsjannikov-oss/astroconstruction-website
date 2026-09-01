const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('riki.js', 'utf8');
const calendar2025Html = fs.readFileSync('darba-dienu-kalendars-2025.html', 'utf8');
const calendar2026Html = fs.readFileSync('darba-dienu-kalendars-2026.html', 'utf8');
const calendar2027Html = fs.readFileSync('darba-dienu-kalendars-2027.html', 'utf8');
const sitemapXml = fs.readFileSync('sitemap.xml', 'utf8');
const context = {
  window: {},
  document: {
    getElementById: () => null,
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener: () => {}
  },
  navigator: { clipboard: { writeText: async () => {} } },
  Intl,
  Number,
  Math,
  Date,
  String,
  setTimeout: () => {}
};
context.window = context;
vm.createContext(context);
vm.runInContext(source, context);

const riki = context.AstroRiki;

assert.strictEqual(riki.moneyWords('0,00'), 'nulle eiro un 00 centi');
assert.strictEqual(riki.moneyWords('1,00'), 'viens eiro un 00 centi');
assert.strictEqual(riki.moneyWords('2,00'), 'divi eiro un 00 centi');
assert.strictEqual(riki.moneyWords('5,00'), 'pieci eiro un 00 centi');
assert.strictEqual(riki.moneyWords('21,00'), 'divdesmit viens eiro un 00 centi');
assert.strictEqual(riki.moneyWords('0,01'), 'nulle eiro un 01 cents');
assert.strictEqual(riki.moneyWords('0,02'), 'nulle eiro un 02 centi');
assert.strictEqual(riki.moneyWords('0,05'), 'nulle eiro un 05 centi');
assert.strictEqual(riki.moneyWords('0,11'), 'nulle eiro un 11 centi');
assert.strictEqual(riki.moneyWords('0,21'), 'nulle eiro un 21 cents');
assert.strictEqual(riki.moneyWords('125,05'), 'simts divdesmit pieci eiro un 05 centi');
assert.strictEqual(riki.moneyWords('125,36'), 'simts divdesmit pieci eiro un 36 centi');
assert.strictEqual(riki.moneyWords('12 458,36'), 'divpadsmit tūkstoši četri simti piecdesmit astoņi eiro un 36 centi');
assert.strictEqual(riki.moneyWords('12 458,36', { centsAsWords: true }), 'divpadsmit tūkstoši četri simti piecdesmit astoņi eiro un trīsdesmit seši centi');
assert.strictEqual(riki.moneyWords('-1000001,05'), 'mīnus viens miljons viens eiro un 05 centi');
assert.strictEqual(riki.moneyWords('12,345'), null);
assert.strictEqual(riki.moneyWords('12 458.36'), 'divpadsmit tūkstoši četri simti piecdesmit astoņi eiro un 36 centi');
assert.strictEqual(riki.moneyWords('', { emptyMessage: '' }), '');
assert.strictEqual(riki.moneyWords('', { emptyAsZero: true }), 'nulle eiro un 00 centi');
assert.strictEqual(riki.moneyWords('', { emptyAsZero: true, language: 'en' }), 'zero euros and 00 cents');
assert.strictEqual(riki.moneyWords('', { emptyAsZero: true, language: 'ru' }), 'ноль евро и 00 центов');

assert.strictEqual(riki.moneyWords('1.01', { language: 'en', currency: 'USD' }), 'one US dollar and 01 cent');
assert.strictEqual(riki.moneyWords('0.00', { language: 'en', currency: 'EUR' }), 'zero euros and 00 cents');
assert.strictEqual(riki.moneyWords('2.02', { language: 'en', currency: 'USD' }), 'two US dollars and 02 cents');
assert.strictEqual(riki.moneyWords('125.36', { language: 'en', currency: 'GBP', centsAsWords: true }), 'one hundred twenty-five British pounds and thirty-six pence');
assert.strictEqual(riki.moneyWords('21,11', { language: 'ru', currency: 'EUR' }), 'двадцать один евро и 11 центов');
assert.strictEqual(riki.moneyWords('0,00', { language: 'ru', currency: 'EUR' }), 'ноль евро и 00 центов');
assert.strictEqual(riki.moneyWords('22,21', { language: 'ru', currency: 'USD' }), 'двадцать два доллара США и 21 цент');
assert.strictEqual(riki.moneyWords('125,36', { language: 'ru', currency: 'GBP', centsAsWords: true }), 'сто двадцать пять британских фунтов и тридцать шесть пенсов');

['EUR', 'USD', 'GBP', 'CHF', 'PLN', 'SEK', 'NOK', 'DKK', 'CZK', 'CNY'].forEach((code) => {
  assert.ok(riki.moneyWords('2,05', { currency: code }), code + ' converts in Latvian');
  assert.ok(riki.moneyWords('2,05', { language: 'en', currency: code }), code + ' converts in English');
  assert.ok(riki.moneyWords('2,05', { language: 'ru', currency: code }), code + ' converts in Russian');
});
assert.strictEqual(riki.moneyWords('125,00', { currency: 'JPY' }), 'simts divdesmit piecas Japānas jenas');
assert.strictEqual(riki.moneyWords('125,36', { currency: 'JPY' }), null);
assert.strictEqual(riki.moneyWords('125', { language: 'en', currency: 'JPY' }), 'one hundred twenty-five Japanese yen');
assert.strictEqual(riki.moneyWords('125', { language: 'ru', currency: 'JPY' }), 'сто двадцать пять японских иен');

const jan = riki.countRange(riki.parseDate('2026-01-01'), riki.parseDate('2026-01-31'), true, true);
assert.deepStrictEqual(JSON.parse(JSON.stringify(jan)), { calendar: 31, work: 21, free: 10, holidays: 1, hours: 168 });
const jan2025 = riki.countRangeForYear(2025, riki.parseDate('2025-01-01'), riki.parseDate('2025-01-31'), true, true);
assert.deepStrictEqual(JSON.parse(JSON.stringify(jan2025)), { calendar: 31, work: 22, free: 9, holidays: 1, hours: 176 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.isoWeek(riki.parseDate('2026-01-01')))), { year: 2026, week: 1 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.isoWeek(riki.parseDate('2026-12-31')))), { year: 2026, week: 53 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.isoWeek(riki.parseDate('2025-12-29')))), { year: 2026, week: 1 });
const expectedMonths2026 = [
  ['Janvāris', 21, 168],
  ['Februāris', 20, 160],
  ['Marts', 22, 176],
  ['Aprīlis', 20, 158],
  ['Maijs', 19, 152],
  ['Jūnijs', 20, 159],
  ['Jūlijs', 23, 184],
  ['Augusts', 21, 168],
  ['Septembris', 22, 176],
  ['Oktobris', 22, 176],
  ['Novembris', 20, 159],
  ['Decembris', 20, 158]
];
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(riki.calendar2026.months.map((month) => [month.name, month.workdays, month.hours]))),
  expectedMonths2026
);
assert.strictEqual(riki.calendar2026.totalWorkdays, 250);
assert.strictEqual(riki.calendar2026.totalHours, 1994);
const expectedMonths2027 = [
  ['Janvāris', 20, 160, 'nav apstiprināta'],
  ['Februāris', 20, 160, 'nav apstiprināta'],
  ['Marts', 21, 167, 'nav apstiprināta'],
  ['Aprīlis', 22, 175, 'nav apstiprināta'],
  ['Maijs', 20, 159, 'nav apstiprināta'],
  ['Jūnijs', 20, 159, 'nav apstiprināta'],
  ['Jūlijs', 22, 176, 'nav apstiprināta'],
  ['Augusts', 22, 176, 'nav apstiprināta'],
  ['Septembris', 22, 176, 'nav apstiprināta'],
  ['Oktobris', 21, 168, 'nav apstiprināta'],
  ['Novembris', 21, 167, 'nav apstiprināta'],
  ['Decembris', 21, 166, 'nav apstiprināta']
];
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(riki.calendar2027.months.map((month) => [month.name, month.workdays, month.hours, month.mslLabel]))),
  expectedMonths2027
);
assert.strictEqual(riki.calendar2027.totalWorkdays, 252);
assert.strictEqual(riki.calendar2027.totalHours, 2009);
const expectedMonths2025 = [
  ['Janvāris', 22, 176, '4,0217 €'],
  ['Februāris', 20, 160, '4,6250 €'],
  ['Marts', 21, 168, '4,4048 €'],
  ['Aprīlis', 20, 158, '4,2045 €'],
  ['Maijs', 20, 159, '4,4048 €'],
  ['Jūnijs', 19, 152, '4,4048 €'],
  ['Jūlijs', 23, 184, '4,0217 €'],
  ['Augusts', 21, 168, '4,4048 €'],
  ['Septembris', 22, 176, '4,2045 €'],
  ['Oktobris', 23, 184, '4,0217 €'],
  ['Novembris', 19, 151, '4,6250 €'],
  ['Decembris', 19, 150, '4,0217 €']
];
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(riki.calendar2025.months.map((month) => [month.name, month.workdays, month.hours, month.mslLabel]))),
  expectedMonths2025
);
assert.strictEqual(riki.calendar2025.totalWorkdays, 249);
assert.strictEqual(riki.calendar2025.totalHours, 1986);
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(riki.calendar2026.months.map((month) => [month.name, month.mslLabel]))),
  [
    ['Janvāris', '4,4318 €'],
    ['Februāris', '4,8750 €'],
    ['Marts', '4,4318 €'],
    ['Aprīlis', '4,4318 €'],
    ['Maijs', '4,6429 €'],
    ['Jūnijs', '4,4318 €'],
    ['Jūlijs', '4,2391 €'],
    ['Augusts', '4,6429 €'],
    ['Septembris', '4,4318 €'],
    ['Oktobris', '4,4318 €'],
    ['Novembris', '4,6429 €'],
    ['Decembris', '4,2391 €']
  ]
);
assert.strictEqual(riki.isWorkdayForYear(2025, riki.parseDate('2025-05-02')), false);
assert.strictEqual(riki.isWorkdayForYear(2025, riki.parseDate('2025-05-10')), true);
assert.strictEqual(riki.isWorkdayForYear(2025, riki.parseDate('2025-11-17')), false);
assert.strictEqual(riki.isWorkdayForYear(2025, riki.parseDate('2025-11-08')), true);
assert.strictEqual(riki.calendarDayInfoForYear(2025, riki.parseDate('2025-05-05')).labels[0], 'Latvijas Republikas Neatkarības atjaunošanas dienas brīvdiena');
assert.strictEqual(riki.calendarDayInfoForYear(2025, riki.parseDate('2025-05-04')).labels[0], 'Latvijas Republikas Neatkarības atjaunošanas diena');
assert.strictEqual(riki.calendarDayInfoForYear(2025, riki.parseDate('2025-12-26')).isHoliday, true);
assert.strictEqual(riki.calendarDayInfoForYear(2025, riki.parseDate('2025-11-08')).isShort, true);
assert.strictEqual(riki.calendarDayInfoForYear(2026, riki.parseDate('2026-01-02')).labels[0], 'Pārcelta darba diena uz 17. janvāri');
assert.strictEqual(riki.calendarDayInfoForYear(2026, riki.parseDate('2026-06-27')).isShort, true);
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.isoWeek(riki.parseDate('2027-01-01')))), { year: 2026, week: 53 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.isoWeek(riki.parseDate('2027-01-04')))), { year: 2027, week: 1 });
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.isoWeek(riki.parseDate('2027-12-31')))), { year: 2027, week: 52 });
assert.strictEqual(riki.isWorkdayForYear(2027, riki.parseDate('2027-06-19')), false);
assert.strictEqual(riki.isWorkdayForYear(2027, riki.parseDate('2027-06-25')), true);
assert.strictEqual(riki.isWorkdayForYear(2027, riki.parseDate('2027-11-13')), false);
assert.strictEqual(riki.isWorkdayForYear(2027, riki.parseDate('2027-11-19')), true);
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-03-26')).labels[0], 'Lielā Piektdiena');
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-03-29')).isHoliday, true);
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-05-09')).labels[0], 'Mātes diena');
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-03-25')).isShort, true);
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-06-22')).isShort, true);
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-11-17')).isShort, true);
assert.strictEqual(riki.calendarDayInfoForYear(2027, riki.parseDate('2027-12-30')).isShort, true);
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.financialVacation2026.highestWorkdayMonths)), [
  { name: 'Jūlijs', workdays: 23 },
  { name: 'Marts', workdays: 22 },
  { name: 'Septembris', workdays: 22 },
  { name: 'Oktobris', workdays: 22 }
]);
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.financialVacation2026.lowestWorkdayMonths)), [
  { name: 'Maijs', workdays: 19 },
  { name: 'Februāris', workdays: 20 },
  { name: 'Aprīlis', workdays: 20 },
  { name: 'Jūnijs', workdays: 20 },
  { name: 'Novembris', workdays: 20 },
  { name: 'Decembris', workdays: 20 }
]);
assert.strictEqual(riki.financialVacation2026.metric, 'fixed_monthly_salary_workday_ratio');
assert.deepStrictEqual(JSON.parse(JSON.stringify(riki.financialVacation2027.highestWorkdayMonths)), [
  { name: 'Aprīlis', workdays: 22 },
  { name: 'Jūlijs', workdays: 22 },
  { name: 'Augusts', workdays: 22 },
  { name: 'Septembris', workdays: 22 }
]);
assert.strictEqual(riki.financialVacation2027.metric, 'fixed_monthly_salary_workday_ratio');
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-01-02')), false);
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-01-17')), true);
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-06-22')), false);
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-06-27')), true);

const expectedVacationBreaks = [
  ['ziemassvetki-jaunais-gads', '2026-12-24', '2027-01-03', 3, 11, ['2026-12-28', '2026-12-29', '2026-12-30']],
  ['jani', '2026-06-20', '2026-06-28', 3, 9, ['2026-06-25', '2026-06-26', '2026-06-27']],
  ['lieldienas', '2026-04-03', '2026-04-12', 4, 10, ['2026-04-07', '2026-04-08', '2026-04-09', '2026-04-10']],
  ['maija-svetki', '2026-05-01', '2026-05-10', 4, 10, ['2026-05-05', '2026-05-06', '2026-05-07', '2026-05-08']],
  ['novembris', '2026-11-18', '2026-11-22', 2, 5, ['2026-11-19', '2026-11-20']],
  ['janvaris', '2026-01-01', '2026-01-11', 5, 11, ['2026-01-05', '2026-01-06', '2026-01-07', '2026-01-08', '2026-01-09']]
];
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(riki.vacationRecommendations2026.map((item) => [
    item.id,
    item.breakStart,
    item.breakEnd,
    item.leaveDays,
    item.totalDaysOff,
    item.leaveDates
  ]))),
  expectedVacationBreaks
);
for (const item of riki.vacationRecommendations2026) {
  const counted = riki.countVacationBreak2026(item.leaveDates, item.breakStart, item.breakEnd);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(counted)), {
    leaveDays: item.leaveDays,
    totalDaysOff: item.totalDaysOff,
    breakStart: item.breakStart,
    breakEnd: item.breakEnd
  });
}
const expectedVacationBreaks2027 = [
  ['ziemassvetki-jaunais-gads', '2027-12-24', '2028-01-02', 4, 10, ['2027-12-27', '2027-12-28', '2027-12-29', '2027-12-30']],
  ['lieldienas', '2027-03-26', '2027-04-04', 4, 10, ['2027-03-30', '2027-03-31', '2027-04-01', '2027-04-02']],
  ['jani', '2027-06-19', '2027-06-27', 3, 9, ['2027-06-21', '2027-06-22', '2027-06-25']],
  ['maija-svetki', '2027-05-01', '2027-05-09', 4, 9, ['2027-05-03', '2027-05-05', '2027-05-06', '2027-05-07']],
  ['novembris', '2027-11-18', '2027-11-21', 1, 4, ['2027-11-19']]
];
assert.deepStrictEqual(
  JSON.parse(JSON.stringify(riki.vacationRecommendations2027.map((item) => [
    item.id,
    item.breakStart,
    item.breakEnd,
    item.leaveDays,
    item.totalDaysOff,
    item.leaveDates
  ]))),
  expectedVacationBreaks2027
);
assert.strictEqual(riki.vacationRecommendations2027[4].leaveRangeLabel, '19. novembris');
for (const item of riki.vacationRecommendations2027) {
  const counted = riki.countVacationBreakForYear(2027, item.leaveDates, item.breakStart, item.breakEnd);
  assert.deepStrictEqual(JSON.parse(JSON.stringify(counted)), {
    leaveDays: item.leaveDays,
    totalDaysOff: item.totalDaysOff,
    breakStart: item.breakStart,
    breakEnd: item.breakEnd
  });
}

assert.ok(Math.abs(riki.rebarKgm(12) - 0.888) < 0.001);
assert.strictEqual(riki.profileWeights.IPE[200], 22.4);
assert.strictEqual(riki.profileWeights.HEB[300], 117);

[calendar2025Html, calendar2026Html, calendar2027Html].forEach((html) => {
  assert.ok(html.includes('class="calendar-conversion"'), 'calendar page has restrained ASTRO conversion section');
  assert.ok(html.includes('href="/bis-dokumentacija"'), 'calendar page links to BIS documentation');
  assert.ok(html.includes('href="/tames-apdrosinasanas-gadijumiem"'), 'calendar page links to estimates service');
  assert.ok(html.includes('href="/buvuzraudziba"'), 'calendar page links to client-interest construction supervision path');
  assert.ok(html.includes('href="/pakalpojumi"'), 'calendar page links to all services');
  assert.ok(html.includes('href="/kontakti"'), 'calendar page links to contact');
  assert.ok(html.includes('data-tool-cta="darba_dienu_kalendars_service_bis"'), 'calendar conversion service link is analytics-tagged');
});
assert.ok(calendar2027Html.includes('<h1>Darba dienu kalendārs 2027</h1>'), '2027 page has exact H1');
assert.ok(calendar2027Html.includes('rel="canonical" href="https://astroconstruction.lv/darba-dienu-kalendars-2027"'), '2027 page has self canonical');
assert.ok(calendar2027Html.includes('href="/assets/pdf/darba-dienu-kalendars-2027.pdf"'), '2027 page links to own PDF');
assert.ok(fs.existsSync('assets/pdf/darba-dienu-kalendars-2027.pdf'), '2027 PDF exists at the page download path');
assert.ok(calendar2027Html.includes('id="vacation2027"'), '2027 page has vacation section mount');
assert.ok(calendar2027Html.includes('id="financialVacation2027"'), '2027 page has financial vacation mount');
assert.ok(calendar2027Html.includes('26-TA-1023'), '2027 page discloses official transfer-order status');
[calendar2025Html, calendar2026Html, calendar2027Html].forEach((html) => {
  assert.ok(html.includes('href="/darba-dienu-kalendars-2025"'), 'year switcher links 2025');
  assert.ok(html.includes('href="/darba-dienu-kalendars-2026"'), 'year switcher links 2026');
  assert.ok(html.includes('href="/darba-dienu-kalendars-2027"'), 'year switcher links 2027');
});
assert.ok(sitemapXml.includes('https://astroconstruction.lv/darba-dienu-kalendars-2027'), 'sitemap includes 2027 page');

assert.ok(!source.includes('class="special-dates"'), 'calendar renderer does not add duplicated annual special-dates section');
assert.ok(source.includes('month-note__date'), 'month-specific special dates render as structured event rows');
assert.ok(source.includes('month-totals__metric'), 'monthly statistics render as fixed metric groups');
assert.ok(source.includes('month-totals__unit'), 'monthly workday label stays attached to its number');

let work2026 = 0;
let hours2026 = 0;
for (let date = riki.parseDate('2026-01-01'); date <= riki.parseDate('2026-12-31'); date = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)) {
  if (riki.isWorkday(date)) {
    const key = date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
    work2026 += 1;
    hours2026 += riki.shortDays2026[key] ? 7 : 8;
  }
}
assert.strictEqual(work2026, 250);
assert.strictEqual(hours2026, 1994);

console.log('riki calculator logic tests passed');
