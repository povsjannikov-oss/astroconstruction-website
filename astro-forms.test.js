const assert = require('assert');
const fs = require('fs');
const os = require('os');
const path = require('path');

function requirePlaywright() {
  try {
    return require('playwright');
  } catch (error) {
    const bundled = path.join(os.homedir(), '.cache', 'codex-runtimes', 'codex-primary-runtime', 'dependencies', 'node', 'node_modules', 'playwright');
    return require(bundled);
  }
}

const { chromium } = requirePlaywright();

const source = fs.readFileSync(path.join(__dirname, 'astro-forms.js'), 'utf8');

async function withFormPage(test, options = {}) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  try {
    if (options.endpoint) {
      await page.addInitScript((endpoint) => {
        window.ASTRO_FORM_ENDPOINT = endpoint;
      }, options.endpoint);
    }
    await page.route('http://astro-form-test.local/**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'text/html',
        body: `<!doctype html>
      <html>
        <head><title>ASTRO form test</title></head>
        <body>
          <form id="contact-form" novalidate>
            <input name="name" required>
            <input name="phone" required>
            <textarea name="message"></textarea>
            <button type="submit"><span class="submit-text">Nosūtīt</span></button>
          </form>
          <div class="form-success" id="form-success">Paldies! Pieprasījums saņemts.</div>
        </body>
      </html>`
      });
    });
    await page.goto('http://astro-form-test.local/', { waitUntil: 'domcontentloaded' });
    await page.addScriptTag({ content: options.source || source });
    await test(page);
  } finally {
    await browser.close();
  }
}

async function run() {
  const endpoint = 'https://example.test/submit';

  await withFormPage(async (page) => {
    let postCount = 0;
    await page.route(endpoint + '*', async (route) => {
      if (route.request().method() === 'POST') {
        postCount += 1;
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html>ok' });
        return;
      }
      await route.fulfill({ status: 200, contentType: 'application/javascript', body: 'void 0;' });
    });

    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="phone"]', '+37100000000');
    await page.fill('[name="message"]', 'Honeypot regression test');
    await page.fill('[data-astro-honeypot="true"]', 'bot-filled-value');
    await page.click('button[type="submit"]');

    const state = await page.evaluate(() => ({
      successVisible: document.getElementById('form-success').classList.contains('visible'),
      errorVisible: document.querySelector('.astro-form-error').classList.contains('visible'),
      nameValue: document.querySelector('[name="name"]').value,
      phoneValue: document.querySelector('[name="phone"]').value,
      messageValue: document.querySelector('[name="message"]').value
    }));

    assert.strictEqual(state.successVisible, false, 'honeypot submissions must not show success');
    assert.strictEqual(state.errorVisible, true, 'honeypot submissions should show an error state');
    assert.strictEqual(postCount, 0, 'honeypot submissions must not create backend requests');
    assert.strictEqual(state.nameValue, 'Test User', 'failed submissions must not clear the name');
    assert.strictEqual(state.phoneValue, '+37100000000', 'failed submissions must not clear the phone');
    assert.strictEqual(state.messageValue, 'Honeypot regression test', 'failed submissions must not clear the message');
  }, { endpoint });

  await withFormPage(async (page) => {
    let postCount = 0;
    let submittedPayload = null;
    await page.route(endpoint + '*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() === 'POST') {
        postCount += 1;
        const params = new URLSearchParams(request.postData() || '');
        submittedPayload = JSON.parse(Buffer.from(params.get('payloadBase64'), 'base64').toString('utf8'));
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html>ok' });
        return;
      }
      const callback = url.searchParams.get('callback');
      const requestId = url.searchParams.get('request_id');
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `${callback}(${JSON.stringify({ ok: true, found: true, requestId, duplicate: false })});`
      });
    });

    await page.fill('[name="name"]', 'Chrome Autofill User');
    await page.fill('[name="phone"]', '+37100000004');
    await page.fill('[name="message"]', 'Chrome autofill false-positive regression test');
    await page.evaluate(() => {
      const legacyField = document.querySelector('[name="company_url"]') || document.createElement('input');
      legacyField.name = 'company_url';
      legacyField.value = 'Chrome Autofill User';
      if (!legacyField.isConnected) document.getElementById('contact-form').appendChild(legacyField);
    });
    await page.click('button[type="submit"]');
    await page.waitForSelector('#form-success.visible', { timeout: 5000 });

    assert.strictEqual(postCount, 1, 'Chrome-autofilled legacy company_url must not block submission');
    assert.strictEqual(submittedPayload.name, 'Chrome Autofill User');
    assert.strictEqual(submittedPayload.extraFields.company_url, undefined, 'legacy honeypot autofill value must not leak into payload extra fields');
  }, { endpoint });

  await withFormPage(async (page) => {
    let submittedPayload = null;
    await page.route(endpoint + '*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() === 'POST') {
        const params = new URLSearchParams(request.postData() || '');
        submittedPayload = JSON.parse(Buffer.from(params.get('payloadBase64'), 'base64').toString('utf8'));
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html>ok' });
        return;
      }
      const callback = url.searchParams.get('callback');
      const requestId = url.searchParams.get('request_id');
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `${callback}(${JSON.stringify({ ok: true, found: true, requestId, duplicate: false })});`
      });
    });

    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.name = 'files';
      input.accept = 'image/*,.pdf,.doc,.docx';
      document.getElementById('contact-form').insertBefore(input, document.querySelector('button[type="submit"]'));
    });
    await page.setInputFiles('[name="files"]', {
      name: 'prasibas.docx',
      mimeType: '',
      buffer: Buffer.from('docx test')
    });
    await page.fill('[name="name"]', 'Docx User');
    await page.fill('[name="phone"]', '+37100000003');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#form-success.visible', { timeout: 5000 });

    assert.strictEqual(submittedPayload.attachments.length, 1, 'docx upload payload must include attachment');
    assert.strictEqual(
      submittedPayload.attachments[0].type,
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'docx upload must infer an allowed MIME type when the browser omits one'
    );
  }, { endpoint });

  await withFormPage(async (page) => {
    let postCount = 0;
    let submittedPayload = null;

    await page.route(endpoint + '*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() === 'POST') {
        postCount += 1;
        const params = new URLSearchParams(request.postData() || '');
        submittedPayload = JSON.parse(Buffer.from(params.get('payloadBase64'), 'base64').toString('utf8'));
        await route.fulfill({
          status: 200,
          contentType: 'text/html',
          body: '<!doctype html><html><body>ok</body></html>'
        });
        return;
      }

      const callback = url.searchParams.get('callback');
      const requestId = url.searchParams.get('request_id');
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `${callback}(${JSON.stringify({ ok: true, found: true, requestId, duplicate: false })});`
      });
    });

    await page.evaluate(() => sessionStorage.setItem('astro_utm_params', JSON.stringify({
      utm_source: 'google',
      utm_medium: 'cpc',
      utm_campaign: 'forms',
      utm_term: 'buvnieciba',
      utm_content: 'cta'
    })));
    await page.fill('[name="name"]', 'Test User');
    await page.fill('[name="phone"]', '+37100000000');
    await page.fill('[name="message"]', 'Normal submission regression test');
    await page.click('button[type="submit"]');
    await page.evaluate(() => {
      document.getElementById('contact-form').dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    await page.waitForSelector('#form-success.visible', { timeout: 5000 });

    assert.strictEqual(postCount, 1, 'double click must submit only once');
    assert.strictEqual(submittedPayload.name, 'Test User');
    assert.strictEqual(submittedPayload.phone, '+37100000000');
    assert.strictEqual(submittedPayload.message, 'Normal submission regression test');
    assert.strictEqual(submittedPayload.extraFields.utm_source, 'google');
    assert.ok(submittedPayload.requestId, 'payload must contain requestId');
  }, { endpoint });

  await withFormPage(async (page) => {
    let submittedPayload = null;
    let submittedParams = null;
    await page.route(endpoint + '*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() === 'POST') {
        submittedParams = new URLSearchParams(request.postData() || '');
        submittedPayload = JSON.parse(Buffer.from(submittedParams.get('payloadBase64'), 'base64').toString('utf8'));
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html>ok' });
        return;
      }
      const callback = url.searchParams.get('callback');
      const requestId = url.searchParams.get('request_id');
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `${callback}(${JSON.stringify({ ok: true, found: true, requestId, duplicate: false })});`
      });
    });

    await page.evaluate(() => {
      const input = document.createElement('input');
      input.type = 'file';
      input.name = 'photos';
      input.accept = 'image/*,.pdf';
      document.getElementById('contact-form').insertBefore(input, document.querySelector('button[type="submit"]'));
    });
    await page.setInputFiles('[name="photos"]', {
      name: 'bojajums.pdf',
      mimeType: 'application/pdf',
      buffer: Buffer.from('%PDF-1.4 test')
    });
    await page.fill('[name="name"]', 'File User');
    await page.fill('[name="phone"]', '+37100000001');
    await page.click('button[type="submit"]');
    await page.waitForSelector('#form-success.visible', { timeout: 5000 });

    assert.strictEqual(submittedPayload.attachments.length, 1, 'file upload payload must include attachment');
    assert.strictEqual(submittedParams.has('payload'), false, 'file uploads must not duplicate the JSON payload');
    assert.strictEqual(submittedPayload.attachments[0].name, 'bojajums.pdf');
    assert.strictEqual(submittedPayload.attachments[0].type, 'application/pdf');
    assert.ok(submittedPayload.attachments[0].dataUrl.startsWith('data:application/pdf;base64,'), 'file upload must use data URL');
  }, { endpoint });

  await withFormPage(async (page) => {
    await page.fill('[name="name"]', 'Endpoint User');
    await page.fill('[name="phone"]', '+37100000002');
    await page.fill('[name="message"]', 'Endpoint not configured test');
    await page.click('button[type="submit"]');

    const state = await page.evaluate(() => ({
      successVisible: document.getElementById('form-success').classList.contains('visible'),
      errorVisible: document.querySelector('.astro-form-error').classList.contains('visible'),
      nameValue: document.querySelector('[name="name"]').value,
      phoneValue: document.querySelector('[name="phone"]').value,
      messageValue: document.querySelector('[name="message"]').value
    }));

    assert.strictEqual(state.successVisible, false, 'endpoint failures must not show success');
    assert.strictEqual(state.errorVisible, true, 'endpoint failures must show an error state');
    assert.strictEqual(state.nameValue, 'Endpoint User');
    assert.strictEqual(state.phoneValue, '+37100000002');
    assert.strictEqual(state.messageValue, 'Endpoint not configured test');
  }, { endpoint: 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE' });

  await withFormPage(async (page) => {
    await page.route(endpoint + '*', async (route) => {
      const request = route.request();
      const url = new URL(request.url());
      if (request.method() === 'POST') {
        await route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html>ok' });
        return;
      }
      const callback = url.searchParams.get('callback');
      const requestId = url.searchParams.get('request_id');
      await route.fulfill({
        status: 200,
        contentType: 'application/javascript',
        body: `${callback}(${JSON.stringify({ ok: true, found: false, requestId })});`
      });
    });

    await page.fill('[name="name"]', 'Backend Failure User');
    await page.fill('[name="phone"]', '+37100000005');
    await page.fill('[name="message"]', 'Backend confirmation failure test');
    await page.click('button[type="submit"]');
    await page.waitForSelector('.astro-form-error.visible', { timeout: 5000 });

    const state = await page.evaluate(() => ({
      successVisible: document.getElementById('form-success').classList.contains('visible'),
      errorText: document.querySelector('.astro-form-error').textContent,
      nameValue: document.querySelector('[name="name"]').value,
      phoneValue: document.querySelector('[name="phone"]').value,
      messageValue: document.querySelector('[name="message"]').value
    }));

    assert.strictEqual(state.successVisible, false, 'backend confirmation failures must not show success');
    assert.match(state.errorText, /Neizdevās automātiski apstiprināt pieteikumu/, 'backend confirmation failures must show the Latvian confirmation error');
    assert.strictEqual(state.nameValue, 'Backend Failure User');
    assert.strictEqual(state.phoneValue, '+37100000005');
    assert.strictEqual(state.messageValue, 'Backend confirmation failure test');
  }, {
    endpoint,
    source: source
      .replace('const SUBMIT_TIMEOUT_MS = 45000;', 'const SUBMIT_TIMEOUT_MS = 1200;')
      .replace('const STATUS_POLL_INITIAL_DELAY_MS = 800;', 'const STATUS_POLL_INITIAL_DELAY_MS = 20;')
      .replace('const STATUS_POLL_INTERVAL_MS = 1500;', 'const STATUS_POLL_INTERVAL_MS = 50;')
  });

  console.log('astro form regression tests passed');
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
