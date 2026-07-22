(function () {
  'use strict';

  const ENDPOINT_PLACEHOLDER = 'PASTE_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE';
  const WEB_APP_URL = window.ASTRO_FORM_ENDPOINT || 'https://script.google.com/macros/s/AKfycbyJffuU0zuLpn3bpt0qQpSEpsJVf_x55GsWQKNoGD8UICt4OigA_sfbROWMTkLuOcRY/exec';
  const PRIVACY_URL = '/privatuma-politika.html';
  const SUBMIT_TIMEOUT_MS = 45000;
  const STATUS_POLL_INITIAL_DELAY_MS = 800;
  const STATUS_POLL_INTERVAL_MS = 1500;
  const MAX_FILE_BYTES = 8 * 1024 * 1024;
  const MAX_TOTAL_FILE_BYTES = 18 * 1024 * 1024;
  const CONSENT_TEXT = 'Nosūtot pieteikumu, jūs piekrītat mūsu Privātuma politikai.';
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];

  function pushDataLayer(eventName, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({
      event: eventName,
      page_path: window.location.pathname
    }, params || {}));
  }

  function persistUtmParams() {
    try {
      const params = new URLSearchParams(window.location.search);
      const saved = {};
      let hasUtm = false;
      UTM_KEYS.forEach(function (key) {
        const value = params.get(key);
        if (value) {
          saved[key] = value;
          hasUtm = true;
        }
      });
      if (hasUtm) sessionStorage.setItem('astro_utm_params', JSON.stringify(saved));
    } catch (error) {
      // UTM persistence is best-effort only.
    }
  }

  function getStoredUtmParams() {
    try {
      return JSON.parse(sessionStorage.getItem('astro_utm_params') || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function base64EncodeUtf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    const chunkSize = 0x8000;
    for (let index = 0; index < bytes.length; index += chunkSize) {
      binary += String.fromCharCode.apply(null, bytes.subarray(index, index + chunkSize));
    }
    return btoa(binary);
  }

  const FORM_CONFIG = {
    '/index.html': { type: 'Galvenā kontaktforma', service: 'Vispārīgs pieprasījums' },
    '/': { type: 'Galvenā kontaktforma', service: 'Vispārīgs pieprasījums' },
    '/bis-dokumentacija.html': { type: 'BIS dokumentācija', service: 'BIS dokumentācija' },
    '/bun-izpilde.html': { type: 'BUN prasību pieteikums', service: 'Būvdarbu uzsākšanas nosacījumu izpilde' },
    '/buvuzraudziba.html': { type: 'Būvuzraudzība', service: 'Būvuzraudzība' },
    '/elektroinstalaciju-parbaudes.html': { type: 'Elektroinstalācijas pārbaude', service: 'Elektroinstalācijas pārbaudes' },
    '/geodezija.html': { type: 'Ģeodēzija', service: 'Ģeodēzijas darbi' },
    '/izpilddokumentacija.html': { type: 'Izpilddokumentācija', service: 'Izpilddokumentācija' },
    '/legalizacija.html': { type: 'Legalizācija', service: 'Ēkas legalizācija' },
    '/nodosana-ekspluatacija.html': { type: 'Nodošana ekspluatācijā', service: 'Nodošana ekspluatācijā' },
    '/nodosanas-procesa-vadisana.html': { type: 'Nodošanas procesa vadīšana', service: 'Nodošanas procesa vadīšana' },
    '/tames-apdrosinasanas-gadijumiem.html': { type: 'Apdrošināšanas tāme', service: 'Tāme apdrošināšanas gadījumam' }
  };

  const styles = document.createElement('style');
  styles.textContent = [
    '.astro-form-consent{font-size:12.5px;line-height:1.55;color:rgba(255,255,255,.62);margin:14px 0 14px;}',
    '.astro-form-consent a{color:#dfc9a6;text-decoration:underline;text-underline-offset:2px;}',
    '.astro-form-error{display:none;margin-top:14px;padding:14px 15px;border-radius:4px;border:1px solid rgba(224,106,87,.45);background:rgba(224,106,87,.12);color:rgba(255,255,255,.88);font-size:14px;line-height:1.55;}',
    '.astro-form-error.visible{display:block;}',
    '.astro-form-error a{color:#fff;text-decoration:underline;text-underline-offset:2px;}',
    '.astro-form-request-id{margin-top:12px;font-size:12px;line-height:1.45;color:rgba(255,255,255,.58);}',
    '.astro-form-honeypot{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important;}',
    '.astro-form-sending{opacity:.72;cursor:wait!important;}'
  ].join('');
  document.head.appendChild(styles);

  function getConfig() {
    return FORM_CONFIG[window.location.pathname] || {
      type: document.title || 'Kontaktforma',
      service: ''
    };
  }

  function addConsent(form, submitButton) {
    if (form.querySelector('.astro-form-consent')) return;
    const consent = document.createElement('p');
    consent.className = 'astro-form-consent';
    consent.innerHTML = 'Nosūtot pieteikumu, jūs piekrītat mūsu <a href="' + PRIVACY_URL + '">Privātuma politikai</a>.';
    submitButton.insertAdjacentElement('afterend', consent);
  }

  function addHoneypot(form) {
    if (form.querySelector('[name="company_url"]')) return;
    const wrap = document.createElement('div');
    wrap.className = 'astro-form-honeypot';
    wrap.setAttribute('aria-hidden', 'true');
    const label = document.createElement('label');
    label.textContent = 'Neaizpildīt šo lauku';
    const input = document.createElement('input');
    input.type = 'text';
    input.name = 'company_url';
    input.tabIndex = -1;
    input.autocomplete = 'off';
    label.appendChild(input);
    wrap.appendChild(label);
    form.appendChild(wrap);
  }

  function addErrorBox(form, submitButton) {
    let error = form.querySelector('.astro-form-error');
    if (error) return error;
    error = document.createElement('div');
    error.className = 'astro-form-error';
    error.setAttribute('role', 'alert');
    error.setAttribute('aria-live', 'assertive');
    submitButton.insertAdjacentElement('afterend', error);
    return error;
  }

  function findSuccessElement(form) {
    return form.querySelector('.form-success') ||
      form.parentElement.querySelector('.form-success') ||
      document.getElementById('form-success') ||
      document.getElementById('formSuccess');
  }

  function setSending(button, sending) {
    if (!button) return;
    if (!button.dataset.astroOriginalHtml) {
      button.dataset.astroOriginalHtml = button.innerHTML;
    }
    button.disabled = sending;
    button.classList.toggle('astro-form-sending', sending);
    if (sending) {
      const textNode = button.querySelector('.submit-text');
      if (textNode) textNode.textContent = 'Nosūta...';
      else button.textContent = 'Nosūta...';
    } else {
      button.innerHTML = button.dataset.astroOriginalHtml;
    }
  }

  function showError(errorBox, button, message) {
    setSending(button, false);
    errorBox.innerHTML = message;
    errorBox.classList.add('visible');
  }

  function showSuccess(form, successElement, button, requestId) {
    setSending(button, false);
    if (successElement) {
      if (requestId) {
        let requestNote = successElement.querySelector('.astro-form-request-id');
        if (!requestNote) {
          requestNote = document.createElement('p');
          requestNote.className = 'astro-form-request-id';
          successElement.appendChild(requestNote);
        }
        requestNote.textContent = 'Pieteikuma ID: ' + requestId;
      }
      successElement.classList.add('visible');
      successElement.setAttribute('tabindex', '-1');
      successElement.focus();
      if (!form.contains(successElement)) form.style.display = 'none';
      const fields = form.querySelector('#formFields');
      if (fields) fields.style.display = 'none';
    }
    form.reset();
  }

  function valuesFromForm(form) {
    const values = {};
    new FormData(form).forEach(function (value, key) {
      if (key === 'company_url' || value instanceof File) return;
      if (Object.prototype.hasOwnProperty.call(values, key)) {
        if (!Array.isArray(values[key])) values[key] = [values[key]];
        values[key].push(value);
      } else {
        values[key] = value;
      }
    });
    return values;
  }

  function toDataUrl(file) {
    return new Promise(function (resolve, reject) {
      const reader = new FileReader();
      reader.onload = function () { resolve(reader.result); };
      reader.onerror = function () { reject(new Error('file_read_failed')); };
      reader.readAsDataURL(file);
    });
  }

  function acceptsFile(file, acceptValue) {
    if (!acceptValue) return true;
    const fileName = String(file.name || '').toLowerCase();
    const fileType = String(file.type || '').toLowerCase();
    return acceptValue.toLowerCase().split(',').some(function (token) {
      const rule = token.trim();
      if (!rule) return false;
      if (rule.charAt(0) === '.') return fileName.endsWith(rule);
      if (rule.endsWith('/*')) return fileType.indexOf(rule.slice(0, -1)) === 0;
      return fileType === rule;
    });
  }

  async function attachmentsFromForm(form) {
    const files = [];
    let totalBytes = 0;
    form.querySelectorAll('input[type="file"]').forEach(function (input) {
      Array.prototype.forEach.call(input.files || [], function (file) {
        if (!acceptsFile(file, input.getAttribute('accept') || '')) {
          throw new Error('unsupported_file_type');
        }
        files.push(file);
        totalBytes += file.size;
      });
    });
    if (files.some(function (file) { return file.size > MAX_FILE_BYTES; }) || totalBytes > MAX_TOTAL_FILE_BYTES) {
      throw new Error('files_too_large');
    }
    return Promise.all(files.map(async function (file) {
      return {
        name: file.name,
        type: file.type || 'application/octet-stream',
        size: file.size,
        dataUrl: await toDataUrl(file)
      };
    }));
  }

  function buildPayload(form, values, attachments, requestId) {
    const config = getConfig();
    const known = ['name', 'phone', 'email', 'message', 'city', 'service', 'need', 'requirements', 'source_cta', 'source_page', 'page_url', 'page_title', 'referrer', 'company_url']
      .concat(UTM_KEYS);
    const extra = {};
    const enteredContact = String(values.phone || '').trim();
    const enteredEmail = String(values.email || '').trim();
    const contactIsEmail = !enteredEmail && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(enteredContact);
    Object.keys(values).forEach(function (key) {
      if (known.indexOf(key) === -1) extra[key] = values[key];
    });
    const selected = values.service || values.need || values.requirements || config.service;
    const storedUtm = getStoredUtmParams();
    UTM_KEYS.forEach(function (key) {
      if (!values[key] && storedUtm[key]) values[key] = storedUtm[key];
    });

    return {
      timestamp: new Date().toISOString(),
      requestId: requestId,
      sourcePage: values.source_page || window.location.href,
      sourcePath: window.location.pathname,
      formType: config.type,
      name: values.name || '',
      phone: contactIsEmail ? '' : enteredContact,
      email: enteredEmail || (contactIsEmail ? enteredContact : ''),
      service: Array.isArray(selected) ? selected.join(', ') : (selected || config.service),
      message: values.message || '',
      extraFields: Object.assign(extra, {
        city: values.city || '',
        source_cta: values.source_cta || form.dataset.sourceCta || '',
        page_url: values.page_url || window.location.href,
        page_title: values.page_title || document.title,
        referrer: values.referrer || document.referrer || '',
        utm_source: values.utm_source || '',
        utm_medium: values.utm_medium || '',
        utm_campaign: values.utm_campaign || '',
        utm_term: values.utm_term || '',
        utm_content: values.utm_content || ''
      }),
      consent: CONSENT_TEXT,
      userAgent: navigator.userAgent,
      attachments: attachments
    };
  }

  function submitToAppsScript(payload, requestId) {
    const iframeName = 'astroFormFrame_' + requestId;
    const frame = document.createElement('iframe');
    frame.name = iframeName;
    frame.className = 'astro-form-honeypot';
    frame.setAttribute('title', 'Formas nosūtīšana');
    const transport = document.createElement('form');
    transport.method = 'POST';
    transport.action = WEB_APP_URL;
    transport.target = iframeName;
    transport.className = 'astro-form-honeypot';
    const payloadInput = document.createElement('input');
    payloadInput.type = 'hidden';
    payloadInput.name = 'payloadBase64';
    payloadInput.value = base64EncodeUtf8(JSON.stringify(payload));
    const legacyPayloadInput = document.createElement('input');
    legacyPayloadInput.type = 'hidden';
    legacyPayloadInput.name = 'payload';
    legacyPayloadInput.value = JSON.stringify(payload);
    const requestInput = document.createElement('input');
    requestInput.type = 'hidden';
    requestInput.name = 'requestId';
    requestInput.value = requestId;
    transport.appendChild(payloadInput);
    transport.appendChild(legacyPayloadInput);
    transport.appendChild(requestInput);
    document.body.appendChild(frame);
    document.body.appendChild(transport);
    transport.submit();

    window.setTimeout(function () {
      transport.remove();
      frame.remove();
    }, SUBMIT_TIMEOUT_MS + 10000);
  }

  function statusUrl(requestId, callbackName) {
    const separator = WEB_APP_URL.indexOf('?') === -1 ? '?' : '&';
    return WEB_APP_URL + separator +
      'action=status' +
      '&request_id=' + encodeURIComponent(requestId) +
      '&callback=' + encodeURIComponent(callbackName) +
      '&_=' + encodeURIComponent(String(Date.now()));
  }

  function pollStatusOnce(requestId) {
    return new Promise(function (resolve, reject) {
      const callbackName = '__astroFormStatus_' + Date.now() + '_' + Math.random().toString(36).slice(2);
      const script = document.createElement('script');
      let settled = false;

      const cleanup = function () {
        settled = true;
        try { delete window[callbackName]; } catch (error) { window[callbackName] = undefined; }
        script.remove();
      };

      window[callbackName] = function (response) {
        if (settled) return;
        cleanup();
        resolve(response || { ok: false, found: false, requestId: requestId, error: 'empty_status_response' });
      };

      script.onerror = function () {
        if (settled) return;
        cleanup();
        resolve({ ok: false, found: false, requestId: requestId, error: 'status_network_error' });
      };

      window.setTimeout(function () {
        if (settled) return;
        cleanup();
        resolve({ ok: false, found: false, requestId: requestId, error: 'status_timeout' });
      }, 10000);

      script.async = true;
      script.src = statusUrl(requestId, callbackName);
      document.head.appendChild(script);
    });
  }

  function pollForConfirmation(requestId) {
    const startedAt = Date.now();

    return new Promise(function (resolve, reject) {
      function poll() {
        pollStatusOnce(requestId).then(function (response) {
          if (response && response.ok && response.found && response.requestId === requestId) {
            resolve(response);
            return;
          }

          if (Date.now() - startedAt >= SUBMIT_TIMEOUT_MS) {
            reject(new Error('confirmation_timeout'));
            return;
          }

          window.setTimeout(poll, STATUS_POLL_INTERVAL_MS);
        }).catch(function () {
          if (Date.now() - startedAt >= SUBMIT_TIMEOUT_MS) {
            reject(new Error('confirmation_timeout'));
            return;
          }

          window.setTimeout(poll, STATUS_POLL_INTERVAL_MS);
        });
      }

      window.setTimeout(poll, STATUS_POLL_INITIAL_DELAY_MS);
    });
  }

  function setupForm(form) {
    if (form.dataset.astroFormReady === 'true') return;
    const button = form.querySelector('button[type="submit"], input[type="submit"]');
    if (!button) return;
    form.dataset.astroFormReady = 'true';
    addConsent(form, button);
    addHoneypot(form);
    const errorBox = addErrorBox(form, button);
    const successElement = findSuccessElement(form);
    const config = getConfig();

    form.querySelectorAll('input[type="file"]').forEach(function (input) {
      input.addEventListener('change', function () {
        const files = Array.prototype.slice.call(input.files || []);
        if (!files.length) return;
        pushDataLayer('file_upload_added', {
          form_type: config.type,
          service: config.service,
          file_count: files.length,
          total_size_bucket: files.reduce(function (sum, file) { return sum + file.size; }, 0) > MAX_FILE_BYTES ? 'large' : 'small'
        });
      });
    });

    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (form.dataset.astroSending === 'true') return;
      errorBox.classList.remove('visible');
      if (!form.reportValidity()) return;

      const honeypot = form.querySelector('[name="company_url"]');
      if (honeypot && honeypot.value.trim()) {
        showSuccess(form, successElement, button);
        return;
      }

      if (WEB_APP_URL === ENDPOINT_PLACEHOLDER) {
        pushDataLayer('form_submit_error', {
          form_type: config.type,
          service: config.service,
          error_type: 'endpoint_not_configured'
        });
        showError(errorBox, button, 'Tiešsaistes nosūtīšana vēl nav pieslēgta. Lūdzu, rakstiet uz <a href="mailto:info@astroconstruction.lv">info@astroconstruction.lv</a> vai zvaniet <a href="tel:+37129963618">+371 29 963 618</a>.');
        return;
      }

      form.dataset.astroSending = 'true';
      setSending(button, true);
      try {
        const values = valuesFromForm(form);
        const attachments = await attachmentsFromForm(form);
        const requestId = form.dataset.astroPendingRequestId || String(Date.now()) + '-' + Math.random().toString(36).slice(2);
        form.dataset.astroPendingRequestId = requestId;
        const payload = buildPayload(form, values, attachments, requestId);
        submitToAppsScript(payload, requestId);
        const response = await pollForConfirmation(requestId);
        pushDataLayer('form_submit_success', {
          form_type: payload.formType,
          service: payload.service,
          request_id: requestId,
          duplicate_acknowledgement: response && response.duplicate ? 'yes' : 'no',
          file_upload_used: attachments.length > 0 ? 'yes' : 'no',
          is_test: /test|tests|тест|pārbaude/i.test([payload.name, payload.phone, payload.email, payload.message].join(' ')) ? 'yes' : 'no'
        });
        pushDataLayer('generate_lead', {
          page_location: payload.extraFields.page_url || window.location.href,
          page_title: payload.extraFields.page_title || document.title,
          source_page: payload.sourcePage,
          source_cta: payload.extraFields.source_cta || '',
          service: payload.service || '',
          city: payload.extraFields.city || '',
          request_id: requestId
        });
        form.dataset.astroSubmittedRequestId = requestId;
        delete form.dataset.astroPendingRequestId;
        showSuccess(form, successElement, button, requestId);
      } catch (error) {
        pushDataLayer('form_submit_error', {
          form_type: config.type,
          service: config.service,
          error_type: error.message || 'client_error'
        });
        const fileMessage = error.message === 'files_too_large'
          ? 'Pievienotie faili ir par lielu nosūtīšanai formā. Viena faila maksimālais izmērs ir 8 MB, visu failu kopā - 18 MB. Lūdzu, rakstiet uz <a href="mailto:info@astroconstruction.lv">info@astroconstruction.lv</a> vai zvaniet <a href="tel:+37129963618">+371 29 963 618</a>.'
          : error.message === 'unsupported_file_type'
            ? 'Izvēlētais faila formāts nav atbalstīts. Pievienojiet failu norādītajā formātā vai rakstiet uz <a href="mailto:info@astroconstruction.lv">info@astroconstruction.lv</a>.'
            : error.message === 'confirmation_timeout'
              ? 'Neizdevās automātiski apstiprināt pieteikumu. Lūdzu, nepārsūtiet to atkārtoti uzreiz. Pieteikuma ID: ' + (form.dataset.astroPendingRequestId || '')
              : 'Pieprasījumu neizdevās nosūtīt. Lūdzu, mēģiniet vēlreiz vai rakstiet uz <a href="mailto:info@astroconstruction.lv">info@astroconstruction.lv</a>.';
        showError(errorBox, button, fileMessage);
      } finally {
        form.dataset.astroSending = 'false';
      }
    }, true);
  }

  function initializeForms() {
    document.querySelectorAll('form').forEach(setupForm);
  }

  persistUtmParams();
  window.AstroForms = window.AstroForms || {};
  window.AstroForms.initializeForms = initializeForms;
  window.AstroForms.setupForm = setupForm;

  initializeForms();
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeForms, { once: true });
  }
  document.addEventListener('astro:forms-ready-request', initializeForms);
})();
