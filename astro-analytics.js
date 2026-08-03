(function () {
  'use strict';

  const FORM_STARTS = new WeakSet();
  const GA_ID = 'G-EMQY2FGLHD';
  const EVENT_PARAMS = {
    form_start: ['form_id', 'form_name', 'page_path', 'page_title'],
    generate_lead: ['form_id', 'form_name', 'lead_source', 'page_path', 'page_title'],
    contact_phone_click: ['link_location', 'page_path', 'page_title'],
    contact_email_click: ['link_location', 'page_path', 'page_title']
  };

  function hasAnalyticsConsent() {
    try {
      return localStorage.getItem('astro_cookie_consent') === 'accepted';
    } catch (error) {
      return false;
    }
  }

  function cleanText(value, maxLength) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, maxLength || 90);
  }

  function pagePath() {
    return window.location.pathname || '/';
  }

  function pageLocation() {
    return window.location.origin + pagePath();
  }

  function currentPageParams() {
    return {
      page_path: pagePath(),
      page_title: cleanText(document.title, 120)
    };
  }

  function filteredParams(eventName, params) {
    const allowed = EVENT_PARAMS[eventName];
    if (!allowed) return null;
    const merged = Object.assign({}, currentPageParams(), params || {});
    const output = {};
    allowed.forEach(function (key) {
      if (merged[key] === undefined || merged[key] === null) return;
      output[key] = cleanText(merged[key], key === 'page_title' ? 120 : 80);
    });
    if (eventName === 'generate_lead') output.lead_source = 'website_form';
    return output;
  }

  function track(eventName, params) {
    if (!hasAnalyticsConsent()) return false;
    if (typeof window.gtag !== 'function') return false;
    const safeParams = filteredParams(eventName, params);
    if (!safeParams) return false;
    safeParams.send_to = GA_ID;
    window.gtag('set', 'page_location', pageLocation());
    window.gtag('event', eventName, safeParams);
    return true;
  }

  function formParams(form, params) {
    return {
      form_id: cleanText(params && params.form_id || form && form.id || form && form.dataset.astroFormId || 'lead-form', 80),
      form_name: cleanText(params && params.form_name || form && form.dataset.astroFormName || 'Kontaktforma', 80)
    };
  }

  function trackFormStart(form, params) {
    if (!form || FORM_STARTS.has(form)) return false;
    const tracked = track('form_start', formParams(form, params));
    if (tracked) FORM_STARTS.add(form);
    return tracked;
  }

  function trackGenerateLead(form, params) {
    const safeParams = formParams(form, params);
    safeParams.lead_source = 'website_form';
    return track('generate_lead', safeParams);
  }

  function linkLocation(link) {
    if (link.closest('header')) return 'header';
    if (link.closest('footer')) return 'footer';
    if (link.closest('.sticky-bar')) return 'sticky';
    if (link.closest('.hero')) return 'hero';
    if (link.closest('.cta')) return 'cta';
    return 'content';
  }

  function isValidSchemeLink(href, scheme) {
    const normalized = String(href || '').trim().toLowerCase();
    return normalized.indexOf(scheme) === 0 && normalized.slice(scheme.length).trim().length > 0;
  }

  window.AstroAnalytics = Object.assign({}, window.AstroAnalytics || {}, {
    hasAnalyticsConsent: hasAnalyticsConsent,
    track: track,
    formStart: trackFormStart,
    generateLead: trackGenerateLead
  });

  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const location = linkLocation(link);

    if (isValidSchemeLink(href, 'tel:')) {
      track('contact_phone_click', { link_location: location });
      return;
    }

    if (isValidSchemeLink(href, 'mailto:')) {
      track('contact_email_click', { link_location: location });
    }
  }, true);
})();
