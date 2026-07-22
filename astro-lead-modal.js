(function () {
  'use strict';

  const CTA_TEXT = /sazināties|nosūtīt|aprakstīt|pieteikt|pieteik|konsult|rakstīt/i;
  const CTA_CLASS = /btn|button|cta|sticky|nav__button/i;
  const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
  const CITY_PRIORITY = ['Rīga', 'Mārupe', 'Jūrmala', 'Ķekava', 'Salaspils', 'Ādaži', 'Ogre', 'Jelgava', 'Sigulda', 'Saulkrasti'];
  const CITY_LIST = CITY_PRIORITY.concat([
    'Babīte', 'Piņķi', 'Baloži', 'Ikšķile', 'Carnikava', 'Valmiera', 'Cēsis', 'Liepāja',
    'Ventspils', 'Daugavpils', 'Rēzekne', 'Jēkabpils', 'Tukums', 'Talsi', 'Saldus',
    'Kuldīga', 'Bauska', 'Dobele', 'Aizkraukle', 'Limbaži', 'Madona', 'Gulbene',
    'Alūksne', 'Preiļi', 'Ludza', 'Krāslava', 'Balvi'
  ]);
  const CITY_OPTIONS = CITY_LIST.filter(function (city, index, list) {
    return list.indexOf(city) === index;
  });
  const MAX_CITY_OPTIONS = 12;
  let modal;
  let form;
  let opener = null;
  let cityComboboxId = 0;

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

  function normalizeCity(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLocaleLowerCase('lv-LV')
      .trim();
  }

  function cityMatches(query) {
    const normalizedQuery = normalizeCity(query);
    const options = CITY_OPTIONS.map(function (city, index) {
      const normalizedCity = normalizeCity(city);
      const starts = normalizedQuery && normalizedCity.indexOf(normalizedQuery) === 0;
      const contains = normalizedQuery && normalizedCity.indexOf(normalizedQuery) > 0;
      return { city: city, index: index, starts: starts, contains: contains };
    }).filter(function (item) {
      return !normalizedQuery || item.starts || item.contains;
    });

    return options.sort(function (a, b) {
      if (a.starts !== b.starts) return a.starts ? -1 : 1;
      return a.index - b.index;
    }).slice(0, MAX_CITY_OPTIONS).map(function (item) {
      return item.city;
    });
  }

  function inferCityFromPage() {
    const source = normalizeCity([
      document.body?.dataset?.city || '',
      document.querySelector('meta[name="geo.placename"]')?.getAttribute('content') || '',
      document.title || '',
      window.location.pathname || ''
    ].join(' '));
    return CITY_OPTIONS.find(function (city) {
      return source.indexOf(normalizeCity(city)) !== -1;
    }) || '';
  }

  function setupCityCombobox(input) {
    if (!input || input.dataset.astroCityCombobox === 'true') return;
    input.dataset.astroCityCombobox = 'true';
    input.setAttribute('role', 'combobox');
    input.setAttribute('aria-autocomplete', 'list');
    input.setAttribute('aria-expanded', 'false');

    const wrapper = input.parentElement;
    if (wrapper) wrapper.classList.add('astro-combobox');

    const idBase = input.id || ('astro-city-combobox-' + (++cityComboboxId));
    if (!input.id) input.id = idBase;
    const listbox = document.createElement('div');
    listbox.className = 'astro-city-listbox';
    listbox.id = idBase + '-listbox';
    listbox.setAttribute('role', 'listbox');
    listbox.hidden = true;
    document.body.appendChild(listbox);
    input.setAttribute('aria-controls', listbox.id);

    let options = [];
    let activeIndex = -1;
    let blurTimer = null;

    if (!input.value) {
      const inferredCity = inferCityFromPage();
      if (inferredCity) input.value = inferredCity;
    }

    function positionListbox() {
      if (listbox.hidden) return;
      const rect = input.getBoundingClientRect();
      const gap = 6;
      const viewportGap = 12;
      const availableBelow = window.innerHeight - rect.bottom - viewportGap;
      const availableAbove = rect.top - viewportGap;
      const openAbove = availableBelow < 170 && availableAbove > availableBelow;
      const maxHeight = Math.max(160, Math.min(280, (openAbove ? availableAbove : availableBelow) - gap));

      listbox.style.left = Math.max(viewportGap, rect.left) + 'px';
      listbox.style.width = Math.min(rect.width, window.innerWidth - viewportGap * 2) + 'px';
      listbox.style.maxHeight = maxHeight + 'px';
      if (openAbove) {
        listbox.style.top = 'auto';
        listbox.style.bottom = (window.innerHeight - rect.top + gap) + 'px';
      } else {
        listbox.style.bottom = 'auto';
        listbox.style.top = (rect.bottom + gap) + 'px';
      }
    }

    function setExpanded(isExpanded) {
      input.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
      listbox.hidden = !isExpanded;
      if (!isExpanded) {
        input.removeAttribute('aria-activedescendant');
        activeIndex = -1;
      } else {
        positionListbox();
      }
    }

    function setActive(index) {
      activeIndex = index;
      Array.prototype.forEach.call(listbox.querySelectorAll('[role="option"]'), function (option, optionIndex) {
        const active = optionIndex === activeIndex;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-selected', active ? 'true' : 'false');
        if (active) {
          input.setAttribute('aria-activedescendant', option.id);
          option.scrollIntoView({ block: 'nearest' });
        }
      });
      if (activeIndex < 0) input.removeAttribute('aria-activedescendant');
    }

    function selectOption(value) {
      input.value = value;
      input.dispatchEvent(new Event('input', { bubbles: true }));
      input.dispatchEvent(new Event('change', { bubbles: true }));
      setExpanded(false);
    }

    function render(query) {
      options = cityMatches(query);
      listbox.innerHTML = '';
      options.forEach(function (city, index) {
        const option = document.createElement('div');
        option.id = listbox.id + '-option-' + index;
        option.className = 'astro-city-option';
        option.setAttribute('role', 'option');
        option.setAttribute('aria-selected', 'false');
        option.textContent = city;
        option.addEventListener('pointerdown', function (event) {
          event.preventDefault();
          selectOption(city);
          input.focus({ preventScroll: true });
        });
        listbox.appendChild(option);
      });
      setExpanded(options.length > 0);
      setActive(-1);
    }

    input.addEventListener('focus', function () {
      window.clearTimeout(blurTimer);
      render(input.value);
    });

    input.addEventListener('input', function () {
      render(input.value);
    });

    input.addEventListener('keydown', function (event) {
      const expanded = input.getAttribute('aria-expanded') === 'true';
      if (event.key === 'ArrowDown') {
        event.preventDefault();
        if (!expanded) render(input.value);
        if (options.length) setActive((activeIndex + 1) % options.length);
        return;
      }
      if (event.key === 'ArrowUp') {
        event.preventDefault();
        if (!expanded) render(input.value);
        if (options.length) setActive(activeIndex <= 0 ? options.length - 1 : activeIndex - 1);
        return;
      }
      if (event.key === 'Enter' && expanded && activeIndex >= 0) {
        event.preventDefault();
        selectOption(options[activeIndex]);
        return;
      }
      if (event.key === 'Escape' && expanded) {
        event.preventDefault();
        event.stopPropagation();
        setExpanded(false);
      }
      if (event.key === 'Tab') setExpanded(false);
    });

    input.addEventListener('blur', function () {
      blurTimer = window.setTimeout(function () {
        setExpanded(false);
      }, 120);
    });

    window.addEventListener('resize', positionListbox);
    window.addEventListener('scroll', positionListbox, true);
  }

  function setupCityComboboxes(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll('input[name="city"], input[data-city-combobox="true"]'), setupCityCombobox);
  }

  function closeCityComboboxes() {
    Array.prototype.forEach.call(document.querySelectorAll('.astro-city-listbox'), function (listbox) {
      listbox.hidden = true;
    });
    Array.prototype.forEach.call(document.querySelectorAll('[role="combobox"][aria-controls]'), function (input) {
      input.setAttribute('aria-expanded', 'false');
      input.removeAttribute('aria-activedescendant');
    });
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
    setupCityComboboxes(form);
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
    closeCityComboboxes();
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
    setupCityComboboxes(document);
    setupCtaInterception();
    setupFloatingCta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init, { once: true });
  } else {
    init();
  }
})();
