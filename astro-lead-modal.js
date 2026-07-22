(function () {
  'use strict';

  const CTA_TEXT = /sazināties|nosūtīt|aprakstīt|pieteikt|pieteik|konsult|rakstīt/i;
  const CTA_CLASS = /btn|button|cta|sticky|nav__button/i;
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  let modal;
  let form;
  let opener = null;

  function nativeForm() {
    return document.querySelector('form:not(.astro-lead-form):not(.astro-form-honeypot)');
  }

  function hasNativeForm() {
    return !!nativeForm();
  }

  function serviceFromPage() {
    const title = document.querySelector('h1')?.textContent.trim() || document.title || 'Vispārīgs pieprasījums';
    return title.replace(/\s+/g, ' ');
  }

  function storedUtm() {
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
      return JSON.parse(sessionStorage.getItem('astro_utm_params') || '{}') || {};
    } catch (error) {
      return {};
    }
  }

  function createField(type, name, label, required, placeholder) {
    const row = document.createElement('div');
    row.className = 'astro-lead-form__row';
    const id = 'astro-lead-' + name;
    const labelEl = document.createElement('label');
    labelEl.setAttribute('for', id);
    labelEl.textContent = label;
    const field = type === 'textarea' ? document.createElement('textarea') : document.createElement('input');
    field.id = id;
    field.name = name;
    if (type !== 'textarea') field.type = type;
    if (required) field.required = true;
    if (placeholder) field.placeholder = placeholder;
    row.appendChild(labelEl);
    row.appendChild(field);
    return row;
  }

  function ensureModal() {
    if (modal) return modal;

    modal = document.createElement('div');
    modal.className = 'astro-lead-modal';
    modal.id = 'astro-lead-modal';
    modal.hidden = true;
    modal.inert = true;
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'astro-lead-modal-title');

    modal.innerHTML = [
      '<div class="astro-lead-modal__panel" role="document">',
      '<div class="astro-lead-modal__head">',
      '<h2 class="astro-lead-modal__title" id="astro-lead-modal-title">Aprakstiet savu situāciju</h2>',
      '<button class="astro-lead-modal__close" type="button" aria-label="Aizvērt">×</button>',
      '</div>',
      '<form class="astro-lead-form" id="astro-lead-form" novalidate>',
      '<input type="hidden" name="service">',
      '<input type="hidden" name="source_cta">',
      '<input type="hidden" name="source_page">',
      '<input type="hidden" name="page_url">',
      '<input type="hidden" name="page_title">',
      '<input type="hidden" name="referrer">',
      '<input type="hidden" name="utm_source">',
      '<input type="hidden" name="utm_medium">',
      '<input type="hidden" name="utm_campaign">',
      '<input type="hidden" name="utm_term">',
      '<input type="hidden" name="utm_content">',
      '<button class="astro-lead-form__submit" type="submit"><span class="submit-text">Nosūtīt pieteikumu</span></button>',
      '<p class="astro-lead-form__privacy astro-form-consent">Nosūtot pieteikumu, jūs piekrītat mūsu <a href="/privatuma-politika.html">Privātuma politikai</a>.</p>',
      '</form>',
      '<div class="form-success" aria-live="polite" tabindex="-1">Paldies! Jūsu pieteikums ir nosūtīts.</div>',
      '</div>'
    ].join('');

    form = modal.querySelector('form');
    const submit = form.querySelector('button[type="submit"]');
    form.insertBefore(createField('text', 'name', 'Vārds', true), submit);
    form.insertBefore(createField('tel', 'phone', 'Telefons', true), submit);
    form.insertBefore(createField('email', 'email', 'E-pasts', false), submit);
    form.insertBefore(createField('text', 'city', 'Pilsēta', false), submit);
    form.insertBefore(createField('textarea', 'message', 'Komentārs', false, 'Īsi aprakstiet savu situāciju...'), submit);

    document.body.appendChild(modal);
    modal.querySelector('.astro-lead-modal__close').addEventListener('click', closeModal);
    modal.addEventListener('click', function (event) {
      if (event.target === modal && !isDirty()) closeModal();
    });
    form.addEventListener('input', function () {
      form.dataset.dirty = 'true';
    });
    form.querySelector('button[type="submit"]').addEventListener('click', function (event) {
      if (form.dataset.astroSending === 'true') {
        event.preventDefault();
        return;
      }
      event.preventDefault();
      form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    });
    document.addEventListener('keydown', onKeydown);

    if (window.AstroForms?.initializeForms) window.AstroForms.initializeForms();
    document.dispatchEvent(new CustomEvent('astro:forms-ready-request'));
    return modal;
  }

  function isDirty() {
    return form && form.dataset.dirty === 'true';
  }

  function focusableInModal() {
    return Array.prototype.slice.call(modal.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (element) {
      return element.offsetParent !== null || element === document.activeElement;
    });
  }

  function setHidden(name, value) {
    const field = form.querySelector('[name="' + name + '"]');
    if (field) field.value = value || '';
  }

  function fillContext(sourceCta) {
    const utm = storedUtm();
    setHidden('service', serviceFromPage());
    setHidden('source_cta', sourceCta || '');
    setHidden('source_page', window.location.href);
    setHidden('page_url', window.location.href);
    setHidden('page_title', document.title);
    setHidden('referrer', document.referrer || '');
    UTM_KEYS.forEach(function (key) {
      setHidden(key, utm[key] || '');
    });
    form.dataset.sourceCta = sourceCta || '';
  }

  function openModal(sourceCta, trigger) {
    ensureModal();
    opener = trigger || document.activeElement;
    fillContext(sourceCta);
    modal.hidden = false;
    modal.inert = false;
    document.body.classList.add('astro-modal-open');
    window.setTimeout(function () {
      form.querySelector('[name="name"]').focus();
    }, 0);
  }

  function closeModal() {
    if (!modal) return;
    modal.inert = true;
    modal.hidden = true;
    document.body.classList.remove('astro-modal-open');
    if (opener && typeof opener.focus === 'function') opener.focus({ preventScroll: true });
  }

  function onKeydown(event) {
    if (!modal || modal.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeModal();
      return;
    }
    if (event.key !== 'Tab') return;
    const items = focusableInModal();
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function ctaText(link) {
    return (link.textContent || link.getAttribute('aria-label') || '').replace(/\s+/g, ' ').trim();
  }

  function isFooterOrLegal(link) {
    return !!link.closest('footer, .footer, .legal, .contact-option, .cta-contact, .contact-card');
  }

  function isConversionCta(link) {
    const href = link.getAttribute('href') || '';
    const text = ctaText(link);
    const className = link.className || '';
    if (href.startsWith('tel:')) return false;
    if (isFooterOrLegal(link) && href.startsWith('mailto:')) return false;
    if (CTA_TEXT.test(text)) return true;
    if (CTA_CLASS.test(className) && !/Uzzināt vairāk|Lasīt vairāk/i.test(text)) return true;
    if (href.startsWith('mailto:') && !isFooterOrLegal(link)) return true;
    return false;
  }

  function scrollToNativeForm(sourceCta) {
    const target = nativeForm();
    if (!target) return false;
    target.dataset.sourceCta = sourceCta || '';
    const section = target.closest('section[id], div[id]') || target;
    section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    const first = target.querySelector('input:not([type="hidden"]), textarea, select');
    if (first) window.setTimeout(function () { first.focus({ preventScroll: true }); }, 450);
    return true;
  }

  function setupCtaInterception() {
    document.addEventListener('click', function (event) {
      const link = event.target.closest('a');
      if (!link || !isConversionCta(link)) return;
      const href = link.getAttribute('href') || '';
      const hasForm = hasNativeForm();
      const source = ctaText(link);

      if (hasForm && (href.startsWith('#') || href.includes('#') || href.startsWith('/kontakti.html') || href.startsWith('mailto:'))) {
        event.preventDefault();
        scrollToNativeForm(source);
        return;
      }

      if (!hasForm && (href.startsWith('#') || href.startsWith('/kontakti.html') || href.startsWith('mailto:'))) {
        event.preventDefault();
        openModal(source, link);
      }
    }, true);
  }

  function setupFloatingCta() {
    if (hasNativeForm() || document.querySelector('.astro-floating-lead')) return;
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'astro-floating-lead';
    button.textContent = 'Nosūtīt pieteikumu';
    button.addEventListener('click', function () {
      openModal('Nosūtīt pieteikumu', button);
    });
    document.body.appendChild(button);
  }

  function init() {
    storedUtm();
    if (!hasNativeForm()) ensureModal();
    setupCtaInterception();
    setupFloatingCta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
