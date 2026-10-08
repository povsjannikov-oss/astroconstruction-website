const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
function requirePlaywright() {
  try { return require('playwright'); }
  catch (error) { return require(path.join(os.homedir(), '.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright')); }
}
const { chromium } = requirePlaywright();
const sourceRoot = process.env.ASTRO_TEST_ROOT || __dirname;
const consentSource = fs.readFileSync(path.join(sourceRoot, 'astro-consent.js'), 'utf8');

(async () => {
  const browser = await chromium.launch({ headless: true });
  let scenarios = 0;
  try {
    for (const filename of ['index.html', 'bun-izpilde.html', 'bis-dokumentacija.html']) {
      const home = fs.readFileSync(path.join(sourceRoot, filename), 'utf8');
      const bootstrap = home.match(/<script>([\s\S]*?)<\/script>/)[1];
      const originalLoader = home.match(/<script async src="https:\/\/www.googletagmanager.com[^>]*><\/script>/)?.[0] || '';
    for (const stored of [null, 'rejected', 'necessary', 'accepted']) {
      for (const existingLoader of [false, true]) {
        const context = await browser.newContext();
        try {
          const page = await context.newPage();
          const requests = [], errors = [];
          page.on('pageerror', e => errors.push(e.message));
          await page.route('**/*', async route => {
            const url = route.request().url();
            if (url === 'http://astro-consent-test.local/') {
              const loader = existingLoader ? '<script async src="https://www.googletagmanager.com/gtag/js?id=G-EMQY2FGLHD"></script>' : originalLoader;
              await route.fulfill({ contentType: 'text/html', body: `<!doctype html><html><head><title>Consent test</title><script>${bootstrap}</script>${loader}<script defer src="/astro-consent.js"></script></head><body><footer class="footer"><div class="footer__bottom"></div></footer></body></html>` });
            } else if (url === 'http://astro-consent-test.local/astro-consent.js') {
              await route.fulfill({ contentType: 'application/javascript', body: consentSource });
            } else {
              requests.push(url);
              await route.fulfill({ contentType: 'application/javascript', body: '' });
            }
          });
          await page.addInitScript(value => { if (value) localStorage.setItem('astro_cookie_consent', value); }, stored);
          await page.goto('http://astro-consent-test.local/', { waitUntil: 'networkidle' });
          const loaders = () => page.evaluate(() => ({
            ga: [...document.scripts].filter(s => s.src.startsWith('https://www.googletagmanager.com/gtag/js')).length,
            clarity: [...document.scripts].filter(s => s.src.startsWith('https://www.clarity.ms/tag/')).length,
            views: window.dataLayer.filter(e => e[0] === 'event' && e[1] === 'page_view').length
          }));
          const initial = await loaders();
          assert.equal(initial.ga, existingLoader || stored === 'accepted' ? 1 : 0, `${filename}/${stored}: only accepted opted-in page loads GA`);
          assert.equal(initial.clarity, stored === 'accepted' ? 1 : 0);
          assert.equal(initial.views, stored === 'accepted' ? 1 : 0);
          if (stored !== 'accepted') {
            if (stored) await page.locator('#astro-consent-footer-settings').click();
            await page.locator('[data-consent="accepted"]').click();
          }
          await page.waitForLoadState('networkidle');
          assert.deepEqual(await loaders(), { ga: 1, clarity: 1, views: 1 });
          await page.locator('#astro-consent-footer-settings').click();
          await page.locator('[data-consent="accepted"]').click();
          assert.deepEqual(await loaders(), { ga: 1, clarity: 1, views: 1 }, 'repeated acceptance is idempotent');
          await page.locator('#astro-consent-footer-settings').click();
          await page.locator('[data-consent="rejected"]').click();
          assert.equal(await page.evaluate(() => localStorage.getItem('astro_cookie_consent')), 'rejected');
          assert.equal(await page.evaluate(() => window.dataLayer.filter(e => e[0] === 'consent').at(-1)[2].analytics_storage), 'denied');
          assert.equal(await page.locator('#astro-consent-banner').count(), 0);
          assert.deepEqual(await loaders(), { ga: 1, clarity: 1, views: 1 });
          assert.equal(requests.filter(u => u.startsWith('https://www.googletagmanager.com/gtag/js')).length, 1);
          assert.equal(requests.filter(u => u.startsWith('https://www.clarity.ms/tag/')).length, 1);
          assert.deepEqual(errors, []);
          scenarios++;
        } finally { await context.close(); }
      }
    }
    }
    console.log(`Consent loader regression tests passed (${scenarios} scenarios; external services mocked)`);
  } finally { await browser.close(); }
})().catch(error => { console.error(error); process.exitCode = 1; });
