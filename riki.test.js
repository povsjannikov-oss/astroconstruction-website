const assert = require('assert');
const fs = require('fs');
const vm = require('vm');

const source = fs.readFileSync('riki.js', 'utf8');
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

assert.strictEqual(riki.moneyWords('0'), 'nulle eiro');
assert.strictEqual(riki.moneyWords('1,01'), 'viens eiro un viens cents');
assert.strictEqual(riki.moneyWords('2,02'), 'divi eiro un divi centi');
assert.strictEqual(riki.moneyWords('12 458,36'), 'divpadsmit tūkstoši četri simti piecdesmit astoņi eiro un trīsdesmit seši centi');
assert.strictEqual(riki.moneyWords('-1000001,05'), 'mīnus viens miljons viens eiro un pieci centi');
assert.strictEqual(riki.moneyWords('12,345'), null);

const jan = riki.countRange(riki.parseDate('2026-01-01'), riki.parseDate('2026-01-31'), true, true);
assert.deepStrictEqual(JSON.parse(JSON.stringify(jan)), { calendar: 31, work: 21, free: 10, holidays: 1, hours: 168 });
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-01-02')), false);
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-01-17')), true);
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-06-22')), false);
assert.strictEqual(riki.isWorkday(riki.parseDate('2026-06-27')), true);

assert.ok(Math.abs(riki.rebarKgm(12) - 0.888) < 0.001);
assert.strictEqual(riki.profileWeights.IPE[200], 22.4);
assert.strictEqual(riki.profileWeights.HEB[300], 117);

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
