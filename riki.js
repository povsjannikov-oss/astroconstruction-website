(function () {
  'use strict';

  const MS_DAY = 86400000;
  const STEEL_DENSITY = 7850;
  const REBAR_DIAMETERS = [6, 8, 10, 12, 14, 16, 18, 20, 22, 25, 28, 32, 36, 40];
  const PROFILE_WEIGHTS = {
    IPE: { 80: 6.0, 100: 8.1, 120: 10.4, 140: 12.9, 160: 15.8, 180: 18.8, 200: 22.4, 220: 26.2, 240: 30.7, 270: 36.1, 300: 42.2, 330: 49.1, 360: 57.1, 400: 66.3, 450: 77.6, 500: 90.7, 550: 106, 600: 122 },
    HEA: { 100: 16.7, 120: 19.9, 140: 24.7, 160: 30.4, 180: 35.5, 200: 42.3, 220: 50.5, 240: 60.3, 260: 68.2, 280: 76.4, 300: 88.3, 320: 97.6, 340: 105, 360: 112, 400: 125, 450: 140, 500: 155, 550: 166, 600: 178 },
    HEB: { 100: 20.4, 120: 26.7, 140: 33.7, 160: 42.6, 180: 51.2, 200: 61.3, 220: 71.5, 240: 83.2, 260: 93.0, 280: 103, 300: 117, 320: 127, 340: 134, 360: 142, 400: 155, 450: 171, 500: 187, 550: 199, 600: 212 },
    UPN: { 50: 5.59, 65: 7.09, 80: 8.64, 100: 10.6, 120: 13.4, 140: 16.0, 160: 18.8, 180: 22.0, 200: 25.3, 220: 29.4, 240: 33.2, 260: 37.9, 280: 41.8, 300: 46.2, 320: 59.5, 350: 60.6, 380: 63.1, 400: 71.8 },
    UPE: { 80: 7.90, 100: 9.82, 120: 12.1, 140: 14.5, 160: 17.0, 180: 19.7, 200: 22.8, 220: 26.6, 240: 30.2, 270: 35.2, 300: 44.4, 330: 53.2, 360: 61.2, 400: 72.2 }
  };

  const HOLIDAYS_2026 = {
    '2026-01-01': 'Jaungada diena',
    '2026-04-03': 'Lielā Piektdiena',
    '2026-04-05': 'Pirmās Lieldienas',
    '2026-04-06': 'Otrās Lieldienas',
    '2026-05-01': 'Darba svētki',
    '2026-05-04': 'Latvijas Republikas Neatkarības atjaunošanas diena',
    '2026-05-10': 'Mātes diena',
    '2026-05-24': 'Vasarsvētki',
    '2026-06-23': 'Līgo diena',
    '2026-06-24': 'Jāņu diena',
    '2026-11-18': 'Latvijas Republikas proklamēšanas diena',
    '2026-12-24': 'Ziemassvētku vakars',
    '2026-12-25': 'Pirmie Ziemassvētki',
    '2026-12-26': 'Otrie Ziemassvētki',
    '2026-12-31': 'Vecgada diena'
  };
  const TRANSFERRED_OFF_2026 = { '2026-01-02': 'Pārcelta darba diena uz 17. janvāri', '2026-06-22': 'Pārcelta darba diena uz 27. jūniju' };
  const TRANSFERRED_WORK_2026 = { '2026-01-17': 'Pārcelta darba diena no 2. janvāra', '2026-06-27': 'Pārcelta darba diena no 22. jūnija' };
  const SHORT_DAYS_2026 = {
    '2026-04-02': 'Pirmssvētku darba diena',
    '2026-04-30': 'Pirmssvētku darba diena',
    '2026-06-27': 'Pārceltā pirmssvētku darba diena',
    '2026-11-17': 'Pirmssvētku darba diena',
    '2026-12-23': 'Pirmssvētku darba diena',
    '2026-12-30': 'Pirmssvētku darba diena'
  };

  function $(id) { return document.getElementById(id); }
  function iso(date) {
    return date.getFullYear() + '-' + String(date.getMonth() + 1).padStart(2, '0') + '-' + String(date.getDate()).padStart(2, '0');
  }
  function parseDate(value) {
    if (!value) return null;
    const parts = value.split('-').map(Number);
    if (parts.length !== 3) return null;
    const date = new Date(parts[0], parts[1] - 1, parts[2]);
    return Number.isNaN(date.getTime()) ? null : date;
  }
  function addDays(date, days) {
    const copy = new Date(date.getFullYear(), date.getMonth(), date.getDate());
    copy.setDate(copy.getDate() + days);
    return copy;
  }
  function dayDiff(start, end) {
    return Math.round((Date.UTC(end.getFullYear(), end.getMonth(), end.getDate()) - Date.UTC(start.getFullYear(), start.getMonth(), start.getDate())) / MS_DAY);
  }
  function isWeekend(date) { return date.getDay() === 0 || date.getDay() === 6; }
  function isHoliday(date) { return !!HOLIDAYS_2026[iso(date)]; }
  function isTransferredOff(date) { return !!TRANSFERRED_OFF_2026[iso(date)]; }
  function isTransferredWork(date) { return !!TRANSFERRED_WORK_2026[iso(date)]; }
  function isWorkday(date) {
    if (isTransferredWork(date)) return true;
    if (isTransferredOff(date) || isHoliday(date)) return false;
    return !isWeekend(date);
  }
  function countRange(start, end, includeStart, includeEnd) {
    let from = includeStart ? start : addDays(start, 1);
    const to = includeEnd ? end : addDays(end, -1);
    if (from > to) return null;
    const counts = { calendar: dayDiff(from, to) + 1, work: 0, free: 0, holidays: 0, hours: 0 };
    for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
      const key = iso(d);
      if (isHoliday(d)) counts.holidays++;
      if (isWorkday(d)) {
        counts.work++;
        counts.hours += SHORT_DAYS_2026[key] ? 7 : 8;
      } else {
        counts.free++;
      }
    }
    return counts;
  }
  function formatDateLv(date) {
    return new Intl.DateTimeFormat('lv-LV', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }
  function numberValue(id, fallback) {
    const el = $(id);
    if (!el) return fallback || 0;
    const value = String(el.value || '').replace(/\s/g, '').replace(',', '.');
    return Number(value);
  }
  function fmt(num, digits) {
    if (!Number.isFinite(num)) return '-';
    return new Intl.NumberFormat('lv-LV', { maximumFractionDigits: digits ?? 2, minimumFractionDigits: digits ?? 0 }).format(num);
  }
  function track(name, params) {
    if (window.AstroAnalytics && typeof window.AstroAnalytics.track === 'function') {
      window.AstroAnalytics.track(name, params || {});
    }
  }

  const ones = ['', 'viens', 'divi', 'trīs', 'četri', 'pieci', 'seši', 'septiņi', 'astoņi', 'deviņi'];
  const teens = ['desmit', 'vienpadsmit', 'divpadsmit', 'trīspadsmit', 'četrpadsmit', 'piecpadsmit', 'sešpadsmit', 'septiņpadsmit', 'astoņpadsmit', 'deviņpadsmit'];
  const tens = ['', '', 'divdesmit', 'trīsdesmit', 'četrdesmit', 'piecdesmit', 'sešdesmit', 'septiņdesmit', 'astoņdesmit', 'deviņdesmit'];
  function underThousand(n) {
    const parts = [];
    const h = Math.floor(n / 100);
    const r = n % 100;
    if (h) parts.push(h === 1 ? 'simts' : ones[h] + ' simti');
    if (r >= 10 && r < 20) parts.push(teens[r - 10]);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      if (t) parts.push(tens[t]);
      if (o) parts.push(ones[o]);
    }
    return parts.join(' ');
  }
  function scaleForm(value, singular, plural) {
    return value === 1 ? singular : plural;
  }
  function integerWords(n) {
    if (n === 0) return 'nulle';
    const scales = [
      { value: 1000000000, singular: 'miljards', plural: 'miljardi' },
      { value: 1000000, singular: 'miljons', plural: 'miljoni' },
      { value: 1000, singular: 'tūkstotis', plural: 'tūkstoši' }
    ];
    const parts = [];
    let rest = n;
    scales.forEach(function (scale) {
      const count = Math.floor(rest / scale.value);
      if (!count) return;
      parts.push(underThousand(count) + ' ' + scaleForm(count, scale.singular, scale.plural));
      rest %= scale.value;
    });
    if (rest) parts.push(underThousand(rest));
    return parts.join(' ');
  }
  function moneyNoun(value, singular, plural) { return value === 1 ? singular : plural; }
  function parseMoneyInput(raw) {
    const cleaned = String(raw || '').trim().replace(/\s/g, '').replace(',', '.');
    if (!cleaned || !/^-?\d+(\.\d{1,2})?$/.test(cleaned)) return null;
    const negative = cleaned[0] === '-';
    const absolute = negative ? cleaned.slice(1) : cleaned;
    const parts = absolute.split('.');
    const euros = Number(parts[0]);
    const cents = Number((parts[1] || '').padEnd(2, '0'));
    if (!Number.isSafeInteger(euros) || euros > 999999999999) return null;
    return { negative, euros, cents };
  }
  function moneyWords(raw) {
    const parsed = parseMoneyInput(raw);
    if (!parsed) return null;
    const words = [];
    if (parsed.negative && (parsed.euros || parsed.cents)) words.push('mīnus');
    words.push(integerWords(parsed.euros));
    words.push(moneyNoun(parsed.euros, 'eiro', 'eiro'));
    if (parsed.cents) {
      words.push('un');
      words.push(integerWords(parsed.cents));
      words.push(moneyNoun(parsed.cents, 'cents', 'centi'));
    }
    return words.join(' ');
  }
  function initNumberWords() {
    const form = $('numberWordsForm');
    if (!form) return;
    const input = $('numberWordsInput');
    const output = $('numberWordsOutput');
    const error = $('numberWordsError');
    const copy = $('copyNumberWords');
    function convert() {
      const parsed = parseMoneyInput(input.value);
      error.textContent = '';
      if (!parsed) {
        output.textContent = 'Ievadiet skaitli vai summu ar ne vairāk kā divām decimāldaļām.';
        error.textContent = 'Atbalstīts formāts: 12458,36 vai -12458,36.';
        return;
      }
      output.textContent = moneyWords(input.value);
      track('tool_calculation', { tool_name: 'cipari_vardiem', tool_mode: 'eur' });
    }
    form.addEventListener('submit', function (event) { event.preventDefault(); convert(); });
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText(output.textContent).then(function () {
        copy.textContent = 'Nokopēts';
        setTimeout(function () { copy.textContent = 'Kopēt'; }, 1400);
        track('tool_copy_result', { tool_name: 'cipari_vardiem' });
      });
    });
    convert();
  }

  function initBusinessDays() {
    const form = $('businessDaysForm');
    if (!form) return;
    const result = $('businessDaysResult');
    const modeEls = document.querySelectorAll('input[name="businessMode"]');
    const range = $('businessRangeFields');
    const add = $('businessAddFields');
    function syncMode() {
      const mode = document.querySelector('input[name="businessMode"]:checked').value;
      range.hidden = mode !== 'range';
      add.hidden = mode !== 'add';
    }
    function calculate() {
      const mode = document.querySelector('input[name="businessMode"]:checked').value;
      if (mode === 'add') {
        const start = parseDate($('workStartDate').value);
        const amount = Math.max(0, Math.floor(numberValue('workDaysToAdd')));
        if (!start || !Number.isFinite(amount) || start.getFullYear() !== 2026) {
          result.innerHTML = '<p class="error">Ievadiet 2026. gada sākuma datumu un darba dienu skaitu.</p>';
          return;
        }
        let d = new Date(start);
        let left = amount;
        while (left > 0) {
          d = addDays(d, 1);
          if (d.getFullYear() !== 2026) {
            result.innerHTML = '<p class="error">Rīks pašlaik pieskaita darba dienas tikai 2026. gada robežās.</p>';
            return;
          }
          if (isWorkday(d)) left--;
        }
        result.innerHTML = '<h2>Rezultāts</h2><div class="result-output">' + formatDateLv(d) + '</div><p class="hint">Datums aprēķināts pēc Latvijas svētku dienām un pārceltajām darba dienām, kas iekļautas rīkā.</p>';
        track('tool_calculation', { tool_name: 'darba_dienu_kalkulators', tool_mode: 'add' });
        return;
      }
      const start = parseDate($('businessStart').value);
      const end = parseDate($('businessEnd').value);
      if (!start || !end || start > end || start.getFullYear() !== 2026 || end.getFullYear() !== 2026) {
        result.innerHTML = '<p class="error">Ievadiet korektu datumu intervālu 2026. gada robežās.</p>';
        return;
      }
      const counts = countRange(start, end, $('includeBusinessStart').checked, $('includeBusinessEnd').checked);
      if (!counts) {
        result.innerHTML = '<p class="error">Pēc iekļaušanas opcijām intervālā nav nevienas dienas.</p>';
        return;
      }
      result.innerHTML = metricsHtml([
        ['Kalendāra dienas', counts.calendar],
        ['Darba dienas', counts.work],
        ['Brīvdienas', counts.free],
        ['Svētku dienas', counts.holidays],
        ['Darba stundas', counts.hours]
      ]);
      track('tool_calculation', { tool_name: 'darba_dienu_kalkulators', tool_mode: 'range' });
    }
    modeEls.forEach(function (el) { el.addEventListener('change', syncMode); });
    form.addEventListener('submit', function (event) { event.preventDefault(); calculate(); });
    syncMode();
    calculate();
  }

  function initCalendarDays() {
    const form = $('daysForm');
    if (!form) return;
    const result = $('daysResult');
    function calculate() {
      const start = parseDate($('daysStart').value);
      const end = parseDate($('daysEnd').value);
      if (!start || !end || start > end || start.getFullYear() !== 2026 || end.getFullYear() !== 2026) {
        result.innerHTML = '<p class="error">Ievadiet korektu datumu intervālu 2026. gada robežās.</p>';
        return;
      }
      const calendar = dayDiff(start, end) + 1;
      const counts = countRange(start, end, true, true);
      result.innerHTML = metricsHtml([
        ['Kalendāra dienas', calendar],
        ['Pilnas nedēļas', Math.floor(calendar / 7)],
        ['Atlikušās dienas', calendar % 7],
        ['Darba dienas', counts.work]
      ]);
      track('tool_calculation', { tool_name: 'dienu_kalkulators', tool_mode: 'range' });
    }
    form.addEventListener('submit', function (event) { event.preventDefault(); calculate(); });
    calculate();
  }
  function metricsHtml(items) {
    return '<h2>Rezultāts</h2><div class="result-grid result-grid--four">' + items.map(function (item) {
      return '<div class="metric"><span>' + item[0] + '</span><strong>' + fmt(item[1], 0) + '</strong></div>';
    }).join('') + '</div>';
  }

  function rebarKgm(d) { return Math.PI * Math.pow(d / 1000, 2) / 4 * STEEL_DENSITY; }

  function initRebar() {
    const form = $('rebarForm');
    if (!form) return;
    const diameter = $('rebarDiameter');
    const result = $('rebarResult');
    REBAR_DIAMETERS.forEach(function (d) {
      const option = document.createElement('option');
      option.value = d;
      option.textContent = d + ' mm';
      diameter.appendChild(option);
    });
    function calculate() {
      const d = Number(diameter.value);
      const length = numberValue('rebarLength');
      const qty = numberValue('rebarQty');
      const totalWeight = numberValue('rebarKnownWeight');
      const perM = rebarKgm(d);
      if (length <= 0 || qty <= 0) {
        result.innerHTML = '<p class="error">Garumam un stieņu skaitam jābūt lielākam par nulli.</p>';
        return;
      }
      const one = perM * length;
      const total = one * qty;
      const reverse = totalWeight > 0 ? totalWeight / perM : 0;
      result.innerHTML = '<h2>Rezultāts</h2><div class="result-grid result-grid--four">' +
        metric('kg/m', fmt(perM, 3)) + metric('Viena stieņa svars', fmt(one, 2) + ' kg') +
        metric('Kopējais svars', fmt(total, 2) + ' kg') + metric('Kopā tonnās', fmt(total / 1000, 3) + ' t') +
        '</div>' + (reverse ? '<p class="hint">No ' + fmt(totalWeight, 2) + ' kg pie ' + d + ' mm sanāk aptuveni ' + fmt(reverse, 2) + ' m armatūras.</p>' : '');
      track('tool_calculation', { tool_name: 'armaturas_svara_kalkulators', tool_mode: reverse ? 'reverse' : 'standard' });
    }
    form.addEventListener('submit', function (event) { event.preventDefault(); calculate(); });
    calculate();
  }

  function initMetal() {
    const form = $('metalForm');
    if (!form) return;
    const type = $('metalType');
    const standardWrap = $('standardProfileFields');
    const geometryWrap = $('geometryFields');
    const size = $('metalSize');
    const result = $('metalResult');
    const dims = ['metalWidth', 'metalHeight', 'metalThickness', 'metalDiameter'];
    function sync() {
      const value = type.value;
      const standard = !!PROFILE_WEIGHTS[value];
      standardWrap.hidden = !standard;
      geometryWrap.hidden = standard;
      size.innerHTML = '';
      if (standard) {
        Object.keys(PROFILE_WEIGHTS[value]).forEach(function (key) {
          const option = document.createElement('option');
          option.value = key;
          option.textContent = value + ' ' + key;
          size.appendChild(option);
        });
      }
      dims.forEach(function (id) { const el = $(id); if (el) el.closest('.field').hidden = true; });
      if (value === 'square-tube') { showDims(['metalWidth', 'metalThickness']); }
      if (value === 'rect-tube') { showDims(['metalWidth', 'metalHeight', 'metalThickness']); }
      if (value === 'round-tube') { showDims(['metalDiameter', 'metalThickness']); }
      if (value === 'round-bar') { showDims(['metalDiameter']); }
      if (value === 'flat-bar' || value === 'plate') { showDims(['metalWidth', 'metalThickness']); }
    }
    function showDims(ids) { ids.forEach(function (id) { $(id).closest('.field').hidden = false; }); }
    function kgmGeometry() {
      const t = type.value;
      const w = numberValue('metalWidth') / 1000;
      const h = numberValue('metalHeight') / 1000;
      const th = numberValue('metalThickness') / 1000;
      const d = numberValue('metalDiameter') / 1000;
      let area = 0;
      if (t === 'square-tube') area = w * w - Math.pow(Math.max(w - 2 * th, 0), 2);
      if (t === 'rect-tube') area = w * h - Math.max(w - 2 * th, 0) * Math.max(h - 2 * th, 0);
      if (t === 'round-tube') area = Math.PI * (Math.pow(d, 2) - Math.pow(Math.max(d - 2 * th, 0), 2)) / 4;
      if (t === 'round-bar') area = Math.PI * Math.pow(d, 2) / 4;
      if (t === 'flat-bar' || t === 'plate') area = w * th;
      return area * STEEL_DENSITY;
    }
    function calculate() {
      const standard = !!PROFILE_WEIGHTS[type.value];
      const perM = standard ? PROFILE_WEIGHTS[type.value][size.value] : kgmGeometry();
      const length = numberValue('metalLength');
      const qty = numberValue('metalQty');
      if (!Number.isFinite(perM) || perM <= 0 || length <= 0 || qty <= 0) {
        result.innerHTML = '<p class="error">Pārbaudiet profilu, izmērus, garumu un daudzumu.</p>';
        return;
      }
      const one = perM * length;
      const total = one * qty;
      result.innerHTML = '<h2>Rezultāts</h2><div class="result-grid result-grid--four">' +
        metric('kg/m', fmt(perM, 3)) + metric('Viena elementa svars', fmt(one, 2) + ' kg') +
        metric('Kopējais svars', fmt(total, 2) + ' kg') + metric('Kopā tonnās', fmt(total / 1000, 3) + ' t') + '</div>';
      track('tool_calculation', { tool_name: 'metala_svara_kalkulators', tool_mode: standard ? 'standard_profile' : 'geometry' });
    }
    type.addEventListener('change', function () { sync(); calculate(); });
    form.addEventListener('submit', function (event) { event.preventDefault(); calculate(); });
    sync();
    calculate();
  }
  function metric(label, value) { return '<div class="metric"><span>' + label + '</span><strong>' + value + '</strong></div>'; }

  function initCalendar2026() {
    const target = $('calendar2026');
    if (!target) return;
    const monthNames = ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'];
    const weekday = ['P', 'O', 'T', 'C', 'P', 'S', 'Sv'];
    let totalWork = 0;
    let totalHours = 0;
    const monthsHtml = monthNames.map(function (name, month) {
      const first = new Date(2026, month, 1);
      const days = new Date(2026, month + 1, 0).getDate();
      let work = 0, hours = 0, holidays = 0;
      const monthNotes = [];
      let cells = weekday.map(function (d) { return '<div class="weekday-head">' + d + '</div>'; }).join('');
      const offset = (first.getDay() + 6) % 7;
      for (let i = 0; i < offset; i++) cells += '<div aria-hidden="true"></div>';
      for (let day = 1; day <= days; day++) {
        const date = new Date(2026, month, day);
        const key = iso(date);
        const classes = ['day'];
        const labels = [];
        if (isWeekend(date)) classes.push('day--weekend');
        if (HOLIDAYS_2026[key]) { classes.push('day--holiday'); labels.push(HOLIDAYS_2026[key]); holidays++; }
        if (TRANSFERRED_OFF_2026[key]) { classes.push('day--transferred-off'); labels.push(TRANSFERRED_OFF_2026[key]); }
        if (TRANSFERRED_WORK_2026[key]) { classes.push('day--transferred-work'); labels.push(TRANSFERRED_WORK_2026[key]); }
        if (SHORT_DAYS_2026[key]) { classes.push('day--short'); labels.push(SHORT_DAYS_2026[key]); }
        if (labels.length) monthNotes.push('<li><strong>' + day + '. ' + name + '</strong> - ' + labels.join('; ') + '</li>');
        if (isWorkday(date)) { work++; hours += SHORT_DAYS_2026[key] ? 7 : 8; }
        cells += '<div class="' + classes.join(' ') + '" title="' + labels.join('; ') + '" aria-label="' + (labels.length ? day + '. ' + labels.join('; ') : day) + '">' + day + (labels.length ? '<span>' + labels.join('; ') + '</span>' : '') + '</div>';
      }
      totalWork += work;
      totalHours += hours;
      return '<section class="month"><h2>' + name + '</h2><div class="month-meta"><span class="chip">' + days + ' dienas</span><span class="chip">' + work + ' darba dienas</span><span class="chip">' + hours + ' h</span><span class="chip">' + holidays + ' svētku dienas</span></div><div class="calendar">' + cells + '</div>' + (monthNotes.length ? '<ul class="month-notes">' + monthNotes.join('') + '</ul>' : '') + '</section>';
    }).join('');
    target.innerHTML = '<div class="calendar-summary">' +
      metric('Darba dienas 2026', totalWork) + metric('Darba stundas', totalHours) +
      metric('Pārceltās brīvdienas', 2) + metric('Pārceltās sestdienas', 2) +
      '</div><div class="month-grid">' + monthsHtml + '</div>';
  }

  function initToolCtaTracking() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest && event.target.closest('[data-tool-cta]');
      if (!link) return;
      track('tool_cta_click', { tool_name: link.getAttribute('data-tool-cta') || 'riki' });
    });
  }

  window.AstroRiki = {
    holidays2026: HOLIDAYS_2026,
    transferredOff2026: TRANSFERRED_OFF_2026,
    transferredWork2026: TRANSFERRED_WORK_2026,
    shortDays2026: SHORT_DAYS_2026,
    integerWords: integerWords,
    moneyWords: moneyWords,
    parseDate: parseDate,
    isWorkday: isWorkday,
    countRange: countRange,
    rebarKgm: rebarKgm,
    profileWeights: PROFILE_WEIGHTS
  };

  initNumberWords();
  initBusinessDays();
  initCalendarDays();
  initRebar();
  initMetal();
  initCalendar2026();
  initToolCtaTracking();
})();
