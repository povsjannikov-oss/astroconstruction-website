(function () {
  'use strict';

  function pushEvent(eventName, params) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(Object.assign({
      event: eventName,
      page_path: window.location.pathname
    }, params || {}));
  }

  function cleanText(value) {
    return String(value || '').replace(/\s+/g, ' ').trim().slice(0, 90);
  }

  document.addEventListener('click', function (event) {
    const link = event.target.closest && event.target.closest('a[href]');
    if (!link) return;

    const href = link.getAttribute('href') || '';
    const text = cleanText(link.textContent);
    const location = link.closest('header') ? 'header'
      : link.closest('footer') ? 'footer'
        : link.closest('.sticky-bar') ? 'sticky'
          : link.closest('.hero') ? 'hero'
            : link.closest('.cta') ? 'cta'
              : 'content';

    if (href.indexOf('tel:') === 0) {
      pushEvent('phone_click', { link_location: location });
      return;
    }

    if (href.indexOf('mailto:') === 0) {
      pushEvent('email_click', { link_location: location });
      return;
    }

    if (href.indexOf('wa.me') !== -1 || href.indexOf('whatsapp') !== -1) {
      pushEvent('whatsapp_click', { link_location: location });
      return;
    }

    if (
      link.className.indexOf('btn') !== -1 ||
      link.className.indexOf('button') !== -1 ||
      link.className.indexOf('cta') !== -1 ||
      location === 'hero' ||
      location === 'sticky'
    ) {
      pushEvent('cta_click', {
        cta_text: text,
        link_location: location,
        target_type: href.charAt(0) === '#' ? 'anchor' : href.charAt(0) === '/' ? 'internal' : 'external'
      });
    }
  }, true);
})();
