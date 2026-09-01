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

  const MONTH_NAMES = ['Janvāris', 'Februāris', 'Marts', 'Aprīlis', 'Maijs', 'Jūnijs', 'Jūlijs', 'Augusts', 'Septembris', 'Oktobris', 'Novembris', 'Decembris'];
  const MONTH_NAMES_LOWER = ['janvāris', 'februāris', 'marts', 'aprīlis', 'maijs', 'jūnijs', 'jūlijs', 'augusts', 'septembris', 'oktobris', 'novembris', 'decembris'];
  const WEEKDAY_LABELS = ['P', 'O', 'T', 'C', 'P', 'S', 'Sv'];
  const CALENDAR_DATA = {
    2025: {
      minMonthlyWage: 740,
      mslPaidHours: [184, 160, 168, 176, 168, 168, 184, 168, 176, 184, 160, 184],
      holidays: {
        '2025-01-01': 'Jaungada diena',
        '2025-04-18': 'Lielā Piektdiena',
        '2025-04-20': 'Pirmās Lieldienas',
        '2025-04-21': 'Otrās Lieldienas',
        '2025-05-01': 'Darba svētki',
        '2025-05-04': 'Latvijas Republikas Neatkarības atjaunošanas diena',
        '2025-05-05': 'Latvijas Republikas Neatkarības atjaunošanas dienas brīvdiena',
        '2025-05-11': 'Mātes diena',
        '2025-06-08': 'Vasarsvētki',
        '2025-06-23': 'Līgo diena',
        '2025-06-24': 'Jāņu diena',
        '2025-11-18': 'Latvijas Republikas proklamēšanas diena',
        '2025-12-24': 'Ziemassvētku vakars',
        '2025-12-25': 'Pirmie Ziemassvētki',
        '2025-12-26': 'Otrie Ziemassvētki',
        '2025-12-31': 'Vecgada diena'
      },
      transferredOff: {
        '2025-05-02': 'Pārcelta darba diena uz 10. maiju',
        '2025-11-17': 'Pārcelta darba diena uz 8. novembri'
      },
      transferredWork: {
        '2025-05-10': 'Pārcelta darba diena no 2. maija',
        '2025-11-08': 'Pārcelta darba diena no 17. novembra'
      },
      shortDays: {
        '2025-04-17': 'Pirmssvētku darba diena',
        '2025-04-30': 'Pirmssvētku darba diena',
        '2025-05-10': 'Pārceltā pirmssvētku darba diena',
        '2025-11-08': 'Pārceltā pirmssvētku darba diena',
        '2025-12-23': 'Pirmssvētku darba diena',
        '2025-12-30': 'Pirmssvētku darba diena'
      }
    },
    2026: {
      minMonthlyWage: 780,
      mslPaidHours: [176, 160, 176, 176, 168, 176, 184, 168, 176, 176, 168, 184],
      holidays: {
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
      },
      transferredOff: { '2026-01-02': 'Pārcelta darba diena uz 17. janvāri', '2026-06-22': 'Pārcelta darba diena uz 27. jūniju' },
      transferredWork: { '2026-01-17': 'Pārcelta darba diena no 2. janvāra', '2026-06-27': 'Pārcelta darba diena no 22. jūnija' },
      shortDays: {
        '2026-04-02': 'Pirmssvētku darba diena',
        '2026-04-30': 'Pirmssvētku darba diena',
        '2026-06-27': 'Pārceltā pirmssvētku darba diena',
        '2026-11-17': 'Pirmssvētku darba diena',
        '2026-12-23': 'Pirmssvētku darba diena',
        '2026-12-30': 'Pirmssvētku darba diena'
      }
    },
    2027: {
      minMonthlyWage: null,
      mslPaidHours: [168, 160, 184, 176, 168, 176, 176, 176, 176, 168, 176, 184],
      transferStatus: '2027. gada darba dienu pārcelšanas rīkojums oficiālajos avotos nav apstiprināts; 26-TA-1023 izskatīšana atlikta.',
      holidays: {
        '2027-01-01': 'Jaungada diena',
        '2027-03-26': 'Lielā Piektdiena',
        '2027-03-28': 'Pirmās Lieldienas',
        '2027-03-29': 'Otrās Lieldienas',
        '2027-05-01': 'Darba svētki',
        '2027-05-04': 'Latvijas Republikas Neatkarības atjaunošanas diena',
        '2027-05-09': 'Mātes diena',
        '2027-05-16': 'Vasarsvētki',
        '2027-06-23': 'Līgo diena',
        '2027-06-24': 'Jāņu diena',
        '2027-11-18': 'Latvijas Republikas proklamēšanas diena',
        '2027-12-24': 'Ziemassvētku vakars',
        '2027-12-25': 'Pirmie Ziemassvētki',
        '2027-12-26': 'Otrie Ziemassvētki',
        '2027-12-31': 'Vecgada diena'
      },
      transferredOff: {},
      transferredWork: {},
      shortDays: {
        '2027-03-25': 'Pirmssvētku darba diena',
        '2027-04-30': 'Pirmssvētku darba diena',
        '2027-05-03': 'Pirmssvētku darba diena',
        '2027-06-22': 'Pirmssvētku darba diena',
        '2027-11-17': 'Pirmssvētku darba diena',
        '2027-12-23': 'Pirmssvētku darba diena',
        '2027-12-30': 'Pirmssvētku darba diena'
      }
    }
  };
  const HOLIDAYS_2026 = CALENDAR_DATA[2026].holidays;
  const TRANSFERRED_OFF_2026 = CALENDAR_DATA[2026].transferredOff;
  const TRANSFERRED_WORK_2026 = CALENDAR_DATA[2026].transferredWork;
  const SHORT_DAYS_2026 = CALENDAR_DATA[2026].shortDays;
  const MONTH_NAMES_2026 = MONTH_NAMES;
  const MONTH_NAMES_LOWER_2026 = MONTH_NAMES_LOWER;
  const WEEKDAY_LABELS_2026 = WEEKDAY_LABELS;
  const EXTRA_HOLIDAYS_FOR_BREAKS = {
    '2027-01-01': 'Jaungada diena',
    '2028-01-01': 'Jaungada diena'
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
  function yearData(year) { return CALENDAR_DATA[year] || CALENDAR_DATA[2026]; }
  function isHolidayForYear(year, date) { return !!yearData(year).holidays[iso(date)]; }
  function isTransferredOffForYear(year, date) { return !!yearData(year).transferredOff[iso(date)]; }
  function isTransferredWorkForYear(year, date) { return !!yearData(year).transferredWork[iso(date)]; }
  function isHoliday(date) { return isHolidayForYear(2026, date); }
  function isTransferredOff(date) { return isTransferredOffForYear(2026, date); }
  function isTransferredWork(date) { return isTransferredWorkForYear(2026, date); }
  function isWorkdayForYear(year, date) {
    if (isTransferredWorkForYear(year, date)) return true;
    if (isTransferredOffForYear(year, date) || isHolidayForYear(year, date)) return false;
    return !isWeekend(date);
  }
  function isWorkday(date) { return isWorkdayForYear(2026, date); }
  function isVacationWorkdayForYear(year, date) {
    const key = iso(date);
    if (EXTRA_HOLIDAYS_FOR_BREAKS[key]) return false;
    if (date.getFullYear() === year) return isWorkdayForYear(year, date);
    return !isWeekend(date);
  }
  function isVacationWorkday(date) { return isVacationWorkdayForYear(2026, date); }
  function countRangeForYear(year, start, end, includeStart, includeEnd) {
    let from = includeStart ? start : addDays(start, 1);
    const to = includeEnd ? end : addDays(end, -1);
    if (from > to) return null;
    const counts = { calendar: dayDiff(from, to) + 1, work: 0, free: 0, holidays: 0, hours: 0 };
    for (let d = new Date(from); d <= to; d = addDays(d, 1)) {
      const key = iso(d);
      if (isHolidayForYear(year, d)) counts.holidays++;
      if (isWorkdayForYear(year, d)) {
        counts.work++;
        counts.hours += yearData(year).shortDays[key] ? 7 : 8;
      } else {
        counts.free++;
      }
    }
    return counts;
  }
  function countRange(start, end, includeStart, includeEnd) { return countRangeForYear(2026, start, end, includeStart, includeEnd); }
  function formatDateLv(date) {
    return new Intl.DateTimeFormat('lv-LV', { day: 'numeric', month: 'long', year: 'numeric' }).format(date);
  }
  function formatDateShortLv(value) {
    const date = typeof value === 'string' ? parseDate(value) : value;
    return date.getDate() + '. ' + MONTH_NAMES_LOWER[date.getMonth()];
  }
  function formatRangeShortLv(start, end) {
    const from = typeof start === 'string' ? parseDate(start) : start;
    const to = typeof end === 'string' ? parseDate(end) : end;
    if (iso(from) === iso(to)) return formatDateShortLv(from);
    if (from.getMonth() === to.getMonth() && from.getFullYear() === to.getFullYear()) {
      return from.getDate() + '.-' + to.getDate() + '. ' + MONTH_NAMES_LOWER[from.getMonth()];
    }
    return formatDateShortLv(from) + ' - ' + formatDateShortLv(to);
  }
  function workdayLabel(count) {
    return count % 10 === 1 && count % 100 !== 11 ? count + ' darba diena' : count + ' darba dienas';
  }
  function workdayUnitLabel(count) {
    return count % 10 === 1 && count % 100 !== 11 ? 'darba diena' : 'darba dienas';
  }
  function vacationDayLabel(count) {
    return count === 1 ? ' atvaļinājuma diena' : ' atvaļinājuma dienas';
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

  function isoWeek(date) {
    const target = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    const day = target.getUTCDay() || 7;
    target.setUTCDate(target.getUTCDate() + 4 - day);
    const yearStart = new Date(Date.UTC(target.getUTCFullYear(), 0, 1));
    return { year: target.getUTCFullYear(), week: Math.ceil((((target - yearStart) / MS_DAY) + 1) / 7) };
  }

  function mslLabel(year, month) {
    const data = yearData(year);
    if (!data.minMonthlyWage || !data.mslPaidHours || !data.mslPaidHours[month]) return 'nav apstiprināta';
    const value = data.minMonthlyWage / data.mslPaidHours[month];
    return value.toLocaleString('lv-LV', { minimumFractionDigits: 4, maximumFractionDigits: 4 }) + ' €';
  }

  function calendarDayInfoForYear(year, date) {
    const key = iso(date);
    const data = yearData(year);
    const labels = [];
    const classes = ['day'];
    if (isWeekend(date)) classes.push('day--weekend');
    if (data.holidays[key]) { classes.push('day--holiday'); labels.push(data.holidays[key]); }
    if (data.transferredOff[key]) { classes.push('day--transferred-off'); labels.push(data.transferredOff[key]); }
    if (data.transferredWork[key]) { classes.push('day--transferred-work'); labels.push(data.transferredWork[key]); }
    if (data.shortDays[key]) { classes.push('day--short'); labels.push(data.shortDays[key]); }
    return {
      date: key,
      day: date.getDate(),
      classes: classes,
      labels: labels,
      isWorkday: isWorkdayForYear(year, date),
      isHoliday: !!data.holidays[key],
      isShort: !!data.shortDays[key]
    };
  }
  function calendarDayInfo(date) { return calendarDayInfoForYear(2026, date); }

  function buildCalendarYear(year) {
    let totalWorkdays = 0;
    let totalHours = 0;
    const months = MONTH_NAMES.map(function (name, month) {
      const first = new Date(year, month, 1);
      const days = new Date(year, month + 1, 0).getDate();
      const offset = (first.getDay() + 6) % 7;
      const cells = [];
      const notes = [];
      let workdays = 0;
      let hours = 0;
      for (let day = 1; day <= days; day++) {
        const date = new Date(year, month, day);
        const key = iso(date);
        const info = calendarDayInfoForYear(year, date);
        if (info.labels.length) notes.push({ day: day, date: key, label: info.labels.join('; ') });
        if (info.isWorkday) {
          workdays++;
          hours += yearData(year).shortDays[key] ? 7 : 8;
        }
        cells.push(info);
      }
      totalWorkdays += workdays;
      totalHours += hours;
      const rows = [];
      const totalSlots = Math.ceil((offset + days) / 7) * 7;
      for (let slot = 0; slot < totalSlots; slot += 7) {
        const monday = addDays(first, slot - offset);
        rows.push({
          week: isoWeek(monday),
          cells: Array.from({ length: 7 }, function (_, index) {
            const slotDate = addDays(monday, index);
            return slotDate.getMonth() === month ? calendarDayInfoForYear(year, slotDate) : null;
          })
        });
      }
      return { name: name, month: month, days: days, offset: offset, workdays: workdays, hours: hours, mslLabel: mslLabel(year, month), cells: cells, rows: rows, notes: notes };
    });
    return { year: year, months: months, totalWorkdays: totalWorkdays, totalHours: totalHours };
  }
  function buildCalendar2026() { return buildCalendarYear(2026); }

  function dayMarker(day) {
    const classes = day.classes;
    if (classes.indexOf('day--transferred-work') !== -1) return 'D';
    if (classes.indexOf('day--transferred-off') !== -1) return 'P';
    if (classes.indexOf('day--holiday') !== -1) return 'S';
    return '';
  }

  function generateVacationCandidatesForYear(year) {
    const candidates = [];
    const endLimit = parseDate((year + 1) + '-01-04');
    for (let start = parseDate(year + '-01-01'); start <= parseDate(year + '-12-31'); start = addDays(start, 1)) {
      for (let end = new Date(start); end <= endLimit && dayDiff(start, end) < 20; end = addDays(end, 1)) {
        const leaveDates = [];
        let hasSpecialFreeDay = false;
        for (let date = new Date(start); date <= end; date = addDays(date, 1)) {
          const key = iso(date);
          const data = CALENDAR_DATA[date.getFullYear()];
          if (isVacationWorkdayForYear(year, date)) leaveDates.push(key);
          if ((data && (data.holidays[key] || data.transferredOff[key])) || EXTRA_HOLIDAYS_FOR_BREAKS[key]) hasSpecialFreeDay = true;
        }
        const totalDaysOff = dayDiff(start, end) + 1;
        if (
          leaveDates.length >= 1 &&
          leaveDates.length <= 6 &&
          totalDaysOff >= 4 &&
          hasSpecialFreeDay &&
          !isVacationWorkdayForYear(year, start) &&
          !isVacationWorkdayForYear(year, end) &&
          isVacationWorkdayForYear(year, addDays(start, -1)) &&
          isVacationWorkdayForYear(year, addDays(end, 1))
        ) {
          candidates.push({
            breakStart: iso(start),
            breakEnd: iso(end),
            leaveDates: leaveDates,
            leaveDays: leaveDates.length,
            totalDaysOff: totalDaysOff,
            efficiency: totalDaysOff / leaveDates.length
          });
        }
      }
    }
    return candidates.sort(function (a, b) {
      return b.efficiency - a.efficiency || b.totalDaysOff - a.totalDaysOff || a.leaveDays - b.leaveDays;
    });
  }
  function generateVacationCandidates2026() { return generateVacationCandidatesForYear(2026); }

  function countVacationBreakForYear(year, leaveDates, breakStart, breakEnd) {
    const leaveSet = new Set(leaveDates);
    const start = parseDate(breakStart);
    const end = parseDate(breakEnd);
    let required = 0;
    for (let date = new Date(start); date <= end; date = addDays(date, 1)) {
      const key = iso(date);
      if (isVacationWorkdayForYear(year, date)) {
        required++;
        if (!leaveSet.has(key)) return null;
      }
    }
    if (required !== leaveSet.size) return null;
    return { leaveDays: required, totalDaysOff: dayDiff(start, end) + 1, breakStart: breakStart, breakEnd: breakEnd };
  }
  function countVacationBreak2026(leaveDates, breakStart, breakEnd) { return countVacationBreakForYear(2026, leaveDates, breakStart, breakEnd); }

  const VACATION_RECOMMENDATION_SPECS = {
    2026: [
      { id: 'ziemassvetki-jaunais-gads', title: 'Ziemassvētki un Jaunais gads', start: '2026-12-24', end: '2027-01-03' },
      { id: 'jani', title: 'Jāņi', start: '2026-06-20', end: '2026-06-28' },
      { id: 'lieldienas', title: 'Lieldienas', start: '2026-04-03', end: '2026-04-12' },
      { id: 'maija-svetki', title: 'Maija svētki', start: '2026-05-01', end: '2026-05-10' },
      { id: 'novembris', title: '18. novembris', start: '2026-11-18', end: '2026-11-22' },
      { id: 'janvaris', title: 'Janvāra sākums', start: '2026-01-01', end: '2026-01-11' }
    ],
    2027: [
      { id: 'ziemassvetki-jaunais-gads', title: 'Ziemassvētki un Jaunais gads', start: '2027-12-24', end: '2028-01-02' },
      { id: 'lieldienas', title: 'Lieldienas', start: '2027-03-26', end: '2027-04-04' },
      { id: 'jani', title: 'Jāņi', start: '2027-06-19', end: '2027-06-27' },
      { id: 'maija-svetki', title: 'Maija svētki', start: '2027-05-01', end: '2027-05-09' },
      { id: 'novembris', title: '18. novembris', start: '2027-11-18', end: '2027-11-21' }
    ]
  };

  function buildVacationRecommendationsForYear(year) {
    const candidates = generateVacationCandidatesForYear(year);
    const specs = VACATION_RECOMMENDATION_SPECS[year] || [];
    return specs.map(function (spec) {
      const candidate = candidates.find(function (item) { return item.breakStart === spec.start && item.breakEnd === spec.end; });
      if (!candidate) return null;
      return Object.assign({}, candidate, {
        id: spec.id,
        title: spec.title,
        breakRangeLabel: formatRangeShortLv(candidate.breakStart, candidate.breakEnd),
        leaveRangeLabel: formatRangeShortLv(candidate.leaveDates[0], candidate.leaveDates[candidate.leaveDates.length - 1])
      });
    }).filter(Boolean);
  }
  function buildVacationRecommendations2026() { return buildVacationRecommendationsForYear(2026); }

  function buildFinancialVacation(calendar) {
    const ranked = calendar.months
      .map(function (month) { return { name: month.name, workdays: month.workdays, order: month.month }; })
      .sort(function (a, b) { return b.workdays - a.workdays || a.order - b.order; });
    const maxWorkdays = ranked[0].workdays;
    const minWorkdays = ranked[ranked.length - 1].workdays;
    const topThreshold = ranked.filter(function (month) { return month.workdays === maxWorkdays; }).length >= 4 ? maxWorkdays : maxWorkdays - 1;
    function publicMonth(month) { return { name: month.name, workdays: month.workdays }; }
    return {
      metric: 'fixed_monthly_salary_workday_ratio',
      highestWorkdayMonths: ranked.filter(function (month) { return month.workdays >= topThreshold; }).map(publicMonth),
      lowestWorkdayMonths: calendar.months
        .filter(function (month) { return month.workdays <= minWorkdays + 1; })
        .sort(function (a, b) { return a.workdays - b.workdays || a.month - b.month; })
        .map(function (month) { return { name: month.name, workdays: month.workdays }; })
    };
  }
  function buildFinancialVacation2026(calendar) { return buildFinancialVacation(calendar); }

  const lvOnes = {
    masc: ['', 'viens', 'divi', 'trīs', 'četri', 'pieci', 'seši', 'septiņi', 'astoņi', 'deviņi'],
    fem: ['', 'viena', 'divas', 'trīs', 'četras', 'piecas', 'sešas', 'septiņas', 'astoņas', 'deviņas']
  };
  const lvTeens = ['desmit', 'vienpadsmit', 'divpadsmit', 'trīspadsmit', 'četrpadsmit', 'piecpadsmit', 'sešpadsmit', 'septiņpadsmit', 'astoņpadsmit', 'deviņpadsmit'];
  const lvTens = ['', '', 'divdesmit', 'trīsdesmit', 'četrdesmit', 'piecdesmit', 'sešdesmit', 'septiņdesmit', 'astoņdesmit', 'deviņdesmit'];
  const enOnes = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const enTeens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const enTens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  const ruOnes = {
    masc: ['', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'],
    fem: ['', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять']
  };
  const ruTeens = ['десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать'];
  const ruTens = ['', '', 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто'];
  const ruHundreds = ['', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот'];
  const CURRENCIES = {
    EUR: {
      precision: 2,
      display: { lv: 'EUR - Euro', en: 'EUR - Euro', ru: 'EUR - Евро' },
      major: { lv: { one: 'eiro', other: 'eiro', gender: 'masc' }, en: { one: 'euro', other: 'euros' }, ru: { one: 'евро', few: 'евро', many: 'евро', gender: 'masc' } },
      minor: { lv: { one: 'cents', other: 'centi', gender: 'masc' }, en: { one: 'cent', other: 'cents' }, ru: { one: 'цент', few: 'цента', many: 'центов', gender: 'masc' } }
    },
    USD: {
      precision: 2,
      display: { lv: 'USD - ASV dolārs', en: 'USD - US Dollar', ru: 'USD - Доллар США' },
      major: { lv: { one: 'ASV dolārs', other: 'ASV dolāri', gender: 'masc' }, en: { one: 'US dollar', other: 'US dollars' }, ru: { one: 'доллар США', few: 'доллара США', many: 'долларов США', gender: 'masc' } },
      minor: { lv: { one: 'cents', other: 'centi', gender: 'masc' }, en: { one: 'cent', other: 'cents' }, ru: { one: 'цент', few: 'цента', many: 'центов', gender: 'masc' } }
    },
    GBP: {
      precision: 2,
      display: { lv: 'GBP - Lielbritānijas mārciņa', en: 'GBP - British Pound', ru: 'GBP - Британский фунт' },
      major: { lv: { one: 'Lielbritānijas mārciņa', other: 'Lielbritānijas mārciņas', gender: 'fem' }, en: { one: 'British pound', other: 'British pounds' }, ru: { one: 'британский фунт', few: 'британских фунта', many: 'британских фунтов', gender: 'masc' } },
      minor: { lv: { one: 'penss', other: 'pensi', gender: 'masc' }, en: { one: 'penny', other: 'pence' }, ru: { one: 'пенс', few: 'пенса', many: 'пенсов', gender: 'masc' } }
    },
    CHF: {
      precision: 2,
      display: { lv: 'CHF - Šveices franks', en: 'CHF - Swiss Franc', ru: 'CHF - Швейцарский франк' },
      major: { lv: { one: 'Šveices franks', other: 'Šveices franki', gender: 'masc' }, en: { one: 'Swiss franc', other: 'Swiss francs' }, ru: { one: 'швейцарский франк', few: 'швейцарских франка', many: 'швейцарских франков', gender: 'masc' } },
      minor: { lv: { one: 'santīms', other: 'santīmi', gender: 'masc' }, en: { one: 'centime', other: 'centimes' }, ru: { one: 'сантим', few: 'сантима', many: 'сантимов', gender: 'masc' } }
    },
    PLN: {
      precision: 2,
      display: { lv: 'PLN - Polijas zlots', en: 'PLN - Polish Zloty', ru: 'PLN - Польский злотый' },
      major: { lv: { one: 'Polijas zlots', other: 'Polijas zloti', gender: 'masc' }, en: { one: 'Polish zloty', other: 'Polish zlotys' }, ru: { one: 'польский злотый', few: 'польских злотых', many: 'польских злотых', gender: 'masc' } },
      minor: { lv: { one: 'grošs', other: 'groši', gender: 'masc' }, en: { one: 'grosz', other: 'groszy' }, ru: { one: 'грош', few: 'гроша', many: 'грошей', gender: 'masc' } }
    },
    SEK: {
      precision: 2,
      display: { lv: 'SEK - Zviedrijas krona', en: 'SEK - Swedish Krona', ru: 'SEK - Шведская крона' },
      major: { lv: { one: 'Zviedrijas krona', other: 'Zviedrijas kronas', gender: 'fem' }, en: { one: 'Swedish krona', other: 'Swedish kronor' }, ru: { one: 'шведская крона', few: 'шведские кроны', many: 'шведских крон', gender: 'fem' } },
      minor: { lv: { one: 'ēre', other: 'ēres', gender: 'fem' }, en: { one: 'ore', other: 'ore' }, ru: { one: 'эре', few: 'эре', many: 'эре', gender: 'fem' } }
    },
    NOK: {
      precision: 2,
      display: { lv: 'NOK - Norvēģijas krona', en: 'NOK - Norwegian Krone', ru: 'NOK - Норвежская крона' },
      major: { lv: { one: 'Norvēģijas krona', other: 'Norvēģijas kronas', gender: 'fem' }, en: { one: 'Norwegian krone', other: 'Norwegian kroner' }, ru: { one: 'норвежская крона', few: 'норвежские кроны', many: 'норвежских крон', gender: 'fem' } },
      minor: { lv: { one: 'ēre', other: 'ēres', gender: 'fem' }, en: { one: 'ore', other: 'ore' }, ru: { one: 'эре', few: 'эре', many: 'эре', gender: 'fem' } }
    },
    DKK: {
      precision: 2,
      display: { lv: 'DKK - Dānijas krona', en: 'DKK - Danish Krone', ru: 'DKK - Датская крона' },
      major: { lv: { one: 'Dānijas krona', other: 'Dānijas kronas', gender: 'fem' }, en: { one: 'Danish krone', other: 'Danish kroner' }, ru: { one: 'датская крона', few: 'датские кроны', many: 'датских крон', gender: 'fem' } },
      minor: { lv: { one: 'ēre', other: 'ēres', gender: 'fem' }, en: { one: 'ore', other: 'ore' }, ru: { one: 'эре', few: 'эре', many: 'эре', gender: 'fem' } }
    },
    CZK: {
      precision: 2,
      display: { lv: 'CZK - Čehijas krona', en: 'CZK - Czech Koruna', ru: 'CZK - Чешская крона' },
      major: { lv: { one: 'Čehijas krona', other: 'Čehijas kronas', gender: 'fem' }, en: { one: 'Czech koruna', other: 'Czech korunas' }, ru: { one: 'чешская крона', few: 'чешские кроны', many: 'чешских крон', gender: 'fem' } },
      minor: { lv: { one: 'halērs', other: 'halēri', gender: 'masc' }, en: { one: 'haler', other: 'halers' }, ru: { one: 'геллер', few: 'геллера', many: 'геллеров', gender: 'masc' } }
    },
    JPY: {
      precision: 0,
      display: { lv: 'JPY - Japānas jena', en: 'JPY - Japanese Yen', ru: 'JPY - Японская иена' },
      major: { lv: { one: 'Japānas jena', other: 'Japānas jenas', gender: 'fem' }, en: { one: 'Japanese yen', other: 'Japanese yen' }, ru: { one: 'японская иена', few: 'японские иены', many: 'японских иен', gender: 'fem' } },
      minor: null
    },
    CNY: {
      precision: 2,
      display: { lv: 'CNY - Ķīnas juaņa', en: 'CNY - Chinese Yuan', ru: 'CNY - Китайский юань' },
      major: { lv: { one: 'Ķīnas juaņa', other: 'Ķīnas juaņas', gender: 'fem' }, en: { one: 'Chinese yuan', other: 'Chinese yuan' }, ru: { one: 'китайский юань', few: 'китайских юаня', many: 'китайских юаней', gender: 'masc' } },
      minor: { lv: { one: 'feņs', other: 'feņi', gender: 'masc' }, en: { one: 'fen', other: 'fen' }, ru: { one: 'фэнь', few: 'фэня', many: 'фэней', gender: 'masc' } }
    }
  };
  const UI_TEXT = {
    copy: 'Kopēt',
    copied: 'Nokopēts',
    invalid: 'Ievadiet skaitli vai summu korektā formātā.',
    precision: 'Šai valūtai jāievada vesels skaitlis.'
  };
  function lvUnderThousand(n, gender) {
    const parts = [];
    const h = Math.floor(n / 100);
    const r = n % 100;
    const ones = lvOnes[gender || 'masc'];
    if (h) parts.push(h === 1 ? 'simts' : lvOnes.masc[h] + ' simti');
    if (r >= 10 && r < 20) parts.push(lvTeens[r - 10]);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      if (t) parts.push(lvTens[t]);
      if (o) parts.push(ones[o]);
    }
    return parts.join(' ');
  }
  function enUnderThousand(n) {
    const parts = [];
    const h = Math.floor(n / 100);
    const r = n % 100;
    if (h) parts.push(enOnes[h] + ' hundred');
    if (r >= 10 && r < 20) parts.push(enTeens[r - 10]);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      if (t && o) parts.push(enTens[t] + '-' + enOnes[o]);
      else {
        if (t) parts.push(enTens[t]);
        if (o) parts.push(enOnes[o]);
      }
    }
    return parts.join(' ');
  }
  function ruUnderThousand(n, gender) {
    const parts = [];
    const h = Math.floor(n / 100);
    const r = n % 100;
    const ones = ruOnes[gender || 'masc'];
    if (h) parts.push(ruHundreds[h]);
    if (r >= 10 && r < 20) parts.push(ruTeens[r - 10]);
    else {
      const t = Math.floor(r / 10);
      const o = r % 10;
      if (t) parts.push(ruTens[t]);
      if (o) parts.push(ones[o]);
    }
    return parts.join(' ');
  }
  function lvScaleForm(value, singular, plural) {
    return value % 10 === 1 && value % 100 !== 11 ? singular : plural;
  }
  function ruFormIndex(value) {
    const mod10 = value % 10;
    const mod100 = value % 100;
    if (mod10 === 1 && mod100 !== 11) return 'one';
    if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return 'few';
    return 'many';
  }
  function integerWords(n, language, gender) {
    language = language || 'lv';
    if (n === 0) return language === 'ru' ? 'ноль' : language === 'en' ? 'zero' : 'nulle';
    if (language === 'en') return enIntegerWords(n);
    if (language === 'ru') return ruIntegerWords(n, gender);
    return lvIntegerWords(n, gender);
  }
  function lvIntegerWords(n, gender) {
    if (n === 0) return 'nulle';
    const scales = [{ value: 1000000000, singular: 'miljards', plural: 'miljardi' }, { value: 1000000, singular: 'miljons', plural: 'miljoni' }, { value: 1000, singular: 'tūkstotis', plural: 'tūkstoši' }];
    const parts = [];
    let rest = n;
    scales.forEach(function (scale) {
      const count = Math.floor(rest / scale.value);
      if (!count) return;
      parts.push(lvUnderThousand(count, 'masc') + ' ' + lvScaleForm(count, scale.singular, scale.plural));
      rest %= scale.value;
    });
    if (rest) parts.push(lvUnderThousand(rest, gender || 'masc'));
    return parts.join(' ');
  }
  function enIntegerWords(n) {
    if (n === 0) return 'zero';
    const scales = [{ value: 1000000000, name: 'billion' }, { value: 1000000, name: 'million' }, { value: 1000, name: 'thousand' }];
    const parts = [];
    let rest = n;
    scales.forEach(function (scale) {
      const count = Math.floor(rest / scale.value);
      if (!count) return;
      parts.push(enUnderThousand(count) + ' ' + scale.name);
      rest %= scale.value;
    });
    if (rest) parts.push(enUnderThousand(rest));
    return parts.join(' ');
  }
  function ruIntegerWords(n, gender) {
    if (n === 0) return 'ноль';
    const scales = [
      { value: 1000000000, forms: { one: 'миллиард', few: 'миллиарда', many: 'миллиардов' }, gender: 'masc' },
      { value: 1000000, forms: { one: 'миллион', few: 'миллиона', many: 'миллионов' }, gender: 'masc' },
      { value: 1000, forms: { one: 'тысяча', few: 'тысячи', many: 'тысяч' }, gender: 'fem' }
    ];
    const parts = [];
    let rest = n;
    scales.forEach(function (scale) {
      const count = Math.floor(rest / scale.value);
      if (!count) return;
      parts.push(ruUnderThousand(count, scale.gender) + ' ' + scale.forms[ruFormIndex(count)]);
      rest %= scale.value;
    });
    if (rest) parts.push(ruUnderThousand(rest, gender || 'masc'));
    return parts.join(' ');
  }
  function unitForm(value, forms, language) {
    if (language === 'en') return value === 1 ? forms.one : forms.other;
    if (language === 'ru') return forms[ruFormIndex(value)];
    return value % 10 === 1 && value % 100 !== 11 ? forms.one : forms.other;
  }
  function getCurrency(code) {
    return CURRENCIES[code] || CURRENCIES.EUR;
  }
  function parseMoneyInput(raw, currencyCode) {
    const currency = getCurrency(currencyCode);
    const cleaned = String(raw || '').trim().replace(/\s+/g, '');
    if (!cleaned) return null;
    if (!/^-?\d+([,.]\d*)?$/.test(cleaned)) return null;
    const negative = cleaned[0] === '-';
    const absolute = negative ? cleaned.slice(1) : cleaned;
    const decimalMatch = absolute.match(/[,.](\d*)$/);
    const wholeText = decimalMatch ? absolute.slice(0, decimalMatch.index) : absolute;
    const fractionText = decimalMatch ? decimalMatch[1] : '';
    if (!wholeText || !/^\d+$/.test(wholeText)) return null;
    if (currency.precision === 0 && /[1-9]/.test(fractionText)) return null;
    if (currency.precision > 0 && fractionText.length > currency.precision) return null;
    const major = Number(wholeText);
    const minor = currency.precision ? Number(fractionText.padEnd(currency.precision, '0') || '0') : 0;
    if (!Number.isSafeInteger(major) || major > 999999999999) return null;
    return { negative: negative, major: major, minor: minor, precision: currency.precision };
  }
  function moneyWords(raw, options) {
    options = options || {};
    if (String(raw || '').trim() === '' && options.emptyMessage !== undefined) return options.emptyMessage;
    raw = options.emptyAsZero && String(raw || '').trim() === '' ? '0' : raw;
    const language = options.language || 'lv';
    const currency = getCurrency(options.currency || 'EUR');
    const parsed = parseMoneyInput(raw, options.currency || 'EUR');
    if (!parsed) return null;
    const major = currency.major[language];
    const words = [];
    if (parsed.negative && (parsed.major || parsed.minor)) words.push(language === 'ru' ? 'минус' : language === 'en' ? 'minus' : 'mīnus');
    words.push(integerWords(parsed.major, language, major.gender));
    words.push(unitForm(parsed.major, major, language));
    if (currency.precision > 0 && currency.minor) {
      const minor = currency.minor[language];
      words.push('un');
      if (language === 'en') words[words.length - 1] = 'and';
      if (language === 'ru') words[words.length - 1] = 'и';
      words.push(options.centsAsWords ? integerWords(parsed.minor, language, minor.gender) : String(parsed.minor).padStart(currency.precision, '0'));
      words.push(unitForm(parsed.minor, minor, language));
    }
    return words.join(' ');
  }
  function initNumberWords() {
    const wrap = $('numberWordsConverter');
    if (!wrap) return;
    const input = $('numberWordsInput');
    const currencySelect = $('numberWordsCurrency');
    const output = $('numberWordsOutput');
    const error = $('numberWordsError');
    const copy = $('copyNumberWords');
    const centsMode = $('numberWordsCentsMode');
    const centsWrap = $('numberWordsCentsWrap');
    const languageButtons = Array.prototype.slice.call(document.querySelectorAll('[data-number-words-lang]'));
    let language = 'lv';
    let trackTimer = 0;
    function fillCurrencies() {
      if (!currencySelect || currencySelect.options.length) return;
      Object.keys(CURRENCIES).forEach(function (code) {
        const option = document.createElement('option');
        option.value = code;
        currencySelect.appendChild(option);
      });
    }
    function syncText() {
      Array.prototype.forEach.call(currencySelect.options, function (option) {
        option.textContent = CURRENCIES[option.value].display.lv;
      });
      languageButtons.forEach(function (button) {
        const active = button.getAttribute('data-number-words-lang') === language;
        button.setAttribute('aria-pressed', active ? 'true' : 'false');
      });
    }
    function scheduleTrack(valid) {
      clearTimeout(trackTimer);
      trackTimer = setTimeout(function () {
        track('tool_calculation', { tool_name: 'cipari_vardiem', tool_language: language, tool_currency: currencySelect.value, cents_mode: centsMode.checked ? 'words' : 'numeric', valid: !!valid });
      }, 1200);
    }
    function convert() {
      const currency = getCurrency(currencySelect.value);
      const raw = input.value.trim() === '' ? '0' : input.value;
      const parsed = parseMoneyInput(raw, currencySelect.value);
      error.textContent = '';
      centsWrap.hidden = currency.precision === 0;
      if (!parsed) {
        output.value = '';
        error.textContent = currency.precision === 0 && /[,.]/.test(input.value || '') ? UI_TEXT.precision : UI_TEXT.invalid;
        scheduleTrack(false);
        return;
      }
      output.value = moneyWords(raw, { language: language, currency: currencySelect.value, centsAsWords: centsMode.checked });
      scheduleTrack(true);
    }
    fillCurrencies();
    syncText();
    input.addEventListener('input', convert);
    currencySelect.addEventListener('change', convert);
    centsMode.addEventListener('change', convert);
    languageButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        language = button.getAttribute('data-number-words-lang') || 'lv';
        syncText();
        convert();
      });
    });
    copy.addEventListener('click', function () {
      navigator.clipboard.writeText(output.value).then(function () {
        copy.textContent = UI_TEXT.copied;
        setTimeout(function () { copy.textContent = UI_TEXT.copy; }, 1400);
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

  function initCalendarPage() {
    const target = $('calendar2027') || $('calendar2026') || $('calendar2025') || $('calendarYear');
    if (!target) return;
    const year = Number(target.getAttribute('data-calendar-year') || (document.body && document.body.getAttribute('data-calendar-year')) || 2026);
    const calendar = calendars[year] || buildCalendarYear(year);
    const monthsHtml = calendar.months.map(function (month) {
      let cells = '<div class="week-head">Nr.</div>' + WEEKDAY_LABELS.map(function (d, index) {
        return '<div class="weekday-head' + (index > 4 ? ' weekday-head--weekend' : '') + '">' + d + '</div>';
      }).join('');
      month.rows.forEach(function (row) {
        cells += '<div class="week-number" aria-label="ISO nedēļa ' + row.week.week + '">' + String(row.week.week).padStart(2, '0') + '</div>';
        row.cells.forEach(function (day) {
          if (!day) {
            cells += '<div class="day day--empty" aria-hidden="true"></div>';
            return;
          }
          const labels = day.labels.join('; ');
          const marker = dayMarker(day);
          cells += '<div class="' + day.classes.join(' ') + '" data-date="' + day.date + '" title="' + labels + '" aria-label="' + (labels ? day.day + '. ' + labels : day.day) + '">' +
            (marker ? '<em class="day__mark" aria-hidden="true">' + marker + '</em>' : '') +
            '<b>' + day.day + '</b>' + (labels ? '<span>' + labels + '</span>' : '') + '</div>';
        });
      });
      const notes = month.notes.length ? '<div class="month-notes">' + month.notes.map(function (note) {
        return '<p><time class="month-note__date" datetime="' + note.date + '">' + note.day + '. ' + MONTH_NAMES_LOWER[month.month] + '</time><span>' + note.label + '</span></p>';
      }).join('') + '</div>' : '';
      return '<section class="month" aria-labelledby="calendar-month-' + month.month + '">' +
        '<div class="month-head"><h2 id="calendar-month-' + month.month + '">' + month.name + ' ' + year + '</h2></div>' +
        '<div class="calendar">' + cells + '</div>' +
        '<div class="month-totals"><strong class="month-totals__metric"><span class="month-totals__number">' + month.workdays + '</span><span class="month-totals__unit">' + workdayUnitLabel(month.workdays) + '</span></strong><span class="month-totals__metric month-totals__metric--hours"><b>' + month.hours + '</b><span class="month-totals__unit">darba stundas</span></span></div>' +
        notes +
        '<p class="month-msl">MSL ' + month.mslLabel + '</p>' +
        '</section>';
    }).join('');
    const data = yearData(year);
    const mslNote = data.minMonthlyWage
      ? 'MSL - minimālā stundas tarifa likme pie 5 darba dienu nedēļas un 40 stundām nedēļā, aprēķināta pēc LM norādītās formulas.'
      : 'MSL - minimālā stundas tarifa likme. ' + year + '. gada oficiālā minimālā mēneša darba alga šim aprēķinam vēl nav apstiprināta kopīgajā kalendāra datu kopā.';
    target.innerHTML = '<div class="month-grid">' + monthsHtml + '</div>' +
      '<p class="msl-note">' + mslNote + '</p>';
  }
  function initCalendar2026() { initCalendarPage(); }

  function initVacationTeaser(year) {
    const target = $('vacationTeaser' + year);
    if (!target) return;
    const recommendations = vacationRecommendationsByYear[year] || buildVacationRecommendationsForYear(year);
    const best = recommendations[0];
    if (!best) return;
    target.innerHTML = '<div><strong>Kad visizdevīgāk ņemt atvaļinājumu ' + year + '. gadā?</strong><span>' + best.leaveDays + ' atvaļinājuma dienas → ' + best.totalDaysOff + ' brīvas dienas</span><em>Labākais ' + year + '. gada periods: ņemt ' + best.leaveRangeLabel + '</em></div><a href="#atvalinajums-' + year + '" data-tool-cta="darba_dienu_kalendars_' + year + '_vacation_teaser">Skatīt visus periodus ↓</a>';
  }
  function initVacationTeaser2026() { initVacationTeaser(2026); }

  function initVacation(year) {
    const target = $('vacation' + year);
    if (!target) return;
    const recommendations = vacationRecommendationsByYear[year] || buildVacationRecommendationsForYear(year);
    const vacationBasis = Object.keys(yearData(year).transferredOff).length || Object.keys(yearData(year).transferredWork).length
      ? 'Vairāk brīvdienu ar mazāk atvaļinājuma dienām, izmantojot svētku dienas, nedēļas nogales un pārceltās darba dienas.'
      : 'Vairāk brīvdienu ar mazāk atvaļinājuma dienām, izmantojot svētku dienas un nedēļas nogales.';
    target.innerHTML = '<section class="vacation-planner" id="atvalinajums-' + year + '" aria-labelledby="vacation-planner-title-' + year + '">' +
      '<div class="vacation-planner__intro"><h2 id="vacation-planner-title-' + year + '">Kad izdevīgāk ņemt atvaļinājumu ' + year + '. gadā?</h2>' +
      '<p>' + vacationBasis + '</p></div>' +
      '<div class="vacation-list">' + recommendations.map(function (item) {
        return '<article class="vacation-item" data-vacation-id="' + item.id + '">' +
          '<span class="vacation-item__rank">' + String(recommendations.indexOf(item) + 1).padStart(2, '0') + '</span>' +
          '<div><h3>' + item.title + '</h3><p>Brīvs: ' + item.breakRangeLabel + '</p></div>' +
          '<strong aria-label="' + item.leaveDays + vacationDayLabel(item.leaveDays) + ' uz ' + item.totalDaysOff + ' brīvām dienām"><span>' + item.leaveDays + '</span><small>' + vacationDayLabel(item.leaveDays) + '</small><i aria-hidden="true"> → </i><span>' + item.totalDaysOff + '</span><small> brīvas dienas</small></strong>' +
          '<p>Ņemt: ' + item.leaveRangeLabel + '</p>' +
          '</article>';
      }).join('') + '</div>' +
      '<p class="vacation-note">Šis ir kalendāra aprēķins, nevis individuāla darba tiesību vai finanšu konsultācija.</p>' +
      '</section>';
  }
  function initVacation2026() { initVacation(2026); }

  function initFinancialVacation(year) {
    const target = $('financialVacation' + year);
    if (!target) return;
    const data = financialVacationByYear[year] || buildFinancialVacation(calendars[year]);
    const next = data.highestWorkdayMonths.slice(1).map(function (month) { return month.name; }).join(' · ');
    const low = data.lowestWorkdayMonths.slice(0, 3).map(function (month) { return month.name + ' - ' + workdayLabel(month.workdays); }).join('; ');
    target.innerHTML = '<section class="financial-vacation" aria-labelledby="financial-vacation-title-' + year + '">' +
      '<h2 id="financial-vacation-title-' + year + '">Kad finansiāli izdevīgāk ņemt atvaļinājumu?</h2>' +
      '<div class="financial-vacation__result"><span>Ja ir fiksēta mēnešalga </span><strong>' + data.highestWorkdayMonths[0].name + '</strong><em> ' + workdayLabel(data.highestWorkdayMonths[0].workdays) + '</em></div>' +
      '<p>Nākamie pēc darba dienu attiecības: ' + next + '. Mazāk darba dienu: ' + low + '.</p>' +
      '<p class="vacation-note">Pie fiksētas mēnešalgas mēneši ar vairāk darba dienām pēc darba dienu attiecības var būt labvēlīgāki, bet konkrēto atvaļinājuma naudu nosaka vidējā izpeļņa.</p>' +
      '</section>';
  }
  function initFinancialVacation2026() { initFinancialVacation(2026); }

  function initToolCtaTracking() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest && event.target.closest('[data-tool-cta]');
      if (!link) return;
      track('tool_cta_click', { tool_name: link.getAttribute('data-tool-cta') || 'riki' });
    });
  }

  const calendars = { 2025: buildCalendarYear(2025), 2026: buildCalendarYear(2026), 2027: buildCalendarYear(2027) };
  const calendar2025 = calendars[2025];
  const calendar2026 = calendars[2026];
  const calendar2027 = calendars[2027];
  const vacationRecommendationsByYear = {
    2026: buildVacationRecommendationsForYear(2026),
    2027: buildVacationRecommendationsForYear(2027)
  };
  const financialVacationByYear = {
    2026: buildFinancialVacation(calendar2026),
    2027: buildFinancialVacation(calendar2027)
  };
  const vacationRecommendations2026 = buildVacationRecommendations2026();
  const financialVacation2026 = buildFinancialVacation2026(calendar2026);
  const vacationRecommendations2027 = vacationRecommendationsByYear[2027];
  const financialVacation2027 = financialVacationByYear[2027];

  window.AstroRiki = {
    holidays2026: HOLIDAYS_2026,
    transferredOff2026: TRANSFERRED_OFF_2026,
    transferredWork2026: TRANSFERRED_WORK_2026,
    shortDays2026: SHORT_DAYS_2026,
    calendarData: CALENDAR_DATA,
    calendars: calendars,
    calendar2025: calendar2025,
    calendar2026: calendar2026,
    calendar2027: calendar2027,
    vacationRecommendations2026: vacationRecommendations2026,
    financialVacation2026: financialVacation2026,
    vacationRecommendations2027: vacationRecommendations2027,
    financialVacation2027: financialVacation2027,
    integerWords: integerWords,
    moneyWords: moneyWords,
    parseDate: parseDate,
    isoWeek: isoWeek,
    isWorkday: isWorkday,
    isWorkdayForYear: isWorkdayForYear,
    countRange: countRange,
    countRangeForYear: countRangeForYear,
    calendarDayInfoForYear: calendarDayInfoForYear,
    countVacationBreakForYear: countVacationBreakForYear,
    countVacationBreak2026: countVacationBreak2026,
    rebarKgm: rebarKgm,
    profileWeights: PROFILE_WEIGHTS
  };

  initNumberWords();
  initBusinessDays();
  initCalendarDays();
  initRebar();
  initMetal();
  initVacationTeaser(2026);
  initVacationTeaser(2027);
  initCalendar2026();
  initVacation(2026);
  initVacation(2027);
  initFinancialVacation(2026);
  initFinancialVacation(2027);
  initToolCtaTracking();
})();
