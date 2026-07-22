(function () {
  'use strict';

  const STORAGE_KEY = 'astro_cookie_consent';
  const BANNER_ID = 'astro-consent-banner';
  const SETTINGS_ID = 'astro-consent-settings';
  const GTM_ID = 'GTM-PKFJTQJ7';

  function gtagConsent(command, value) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', command, value);
  }

  function loadGtm() {
    if (window.__astroGtmLoaded) return;
    window.__astroGtmLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      'gtm.start': new Date().getTime(),
      event: 'gtm.js'
    });
    const firstScript = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  function applyConsent(value) {
    const granted = value === 'accepted';
    gtagConsent('update', {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
    if (granted) loadGtm();
  }

  function saveConsent(value) {
    localStorage.setItem(STORAGE_KEY, value);
    applyConsent(value);
    hideBanner();
    showSettingsButton();
  }

  function hideBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (banner) banner.remove();
  }

  function showBanner() {
    if (document.getElementById(BANNER_ID)) return;

    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.className = 'astro-consent';
    banner.innerHTML = [
      '<div class="astro-consent__text">',
      '<strong>Sīkdatņu izvēle</strong>',
      '<span>Mēs izmantojam analītiku, lai saprastu, kuras lapas un pieteikuma formas palīdz klientiem atrast vajadzīgo risinājumu. Jūs varat piekrist vai atteikties.</span>',
      '<a href="/privatuma-politika.html">Privātuma politika</a>',
      '</div>',
      '<div class="astro-consent__actions">',
      '<button type="button" class="astro-consent__button astro-consent__button--ghost" data-consent="rejected">Atteikties</button>',
      '<button type="button" class="astro-consent__button" data-consent="accepted">Piekrist</button>',
      '</div>'
    ].join('');

    document.body.appendChild(banner);
    banner.querySelectorAll('[data-consent]').forEach(function (button) {
      button.addEventListener('click', function () {
        saveConsent(button.getAttribute('data-consent'));
      });
    });
  }

  function showSettingsButton() {
    if (document.getElementById(SETTINGS_ID)) return;

    const button = document.createElement('button');
    button.id = SETTINGS_ID;
    button.type = 'button';
    button.className = 'astro-consent-settings';
    button.textContent = 'Sīkdatnes';
    button.addEventListener('click', function () {
      localStorage.removeItem(STORAGE_KEY);
      showBanner();
      button.remove();
    });
    document.body.appendChild(button);
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = [
      '.astro-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;display:flex;gap:18px;align-items:center;justify-content:space-between;max-width:980px;margin:auto;padding:16px;border:1px solid rgba(255,255,255,.16);border-radius:6px;background:rgba(15,15,14,.96);box-shadow:0 18px 60px rgba(0,0,0,.35);color:#fff;font-family:Inter,Arial,sans-serif}',
      '.astro-consent__text{display:grid;gap:6px;font-size:13px;line-height:1.5;color:rgba(255,255,255,.78)}',
      '.astro-consent__text strong{color:#fff;font-size:14px}.astro-consent__text a{color:#dfc9a6;text-decoration:underline;text-underline-offset:2px}',
      '.astro-consent__actions{display:flex;gap:10px;flex-shrink:0}.astro-consent__button{border:1px solid #dfc9a6;background:#dfc9a6;color:#101010;border-radius:4px;padding:10px 14px;font-weight:700;cursor:pointer}.astro-consent__button--ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.3)}',
      '.astro-consent-settings{position:fixed;right:14px;bottom:14px;z-index:9998;border:1px solid rgba(255,255,255,.18);background:rgba(15,15,14,.86);color:#fff;border-radius:999px;padding:8px 12px;font-size:12px;cursor:pointer}',
      '@media(max-width:680px){.astro-consent{display:grid;bottom:10px;left:10px;right:10px}.astro-consent__actions{display:grid;grid-template-columns:1fr 1fr}.astro-consent__button{width:100%}}'
    ].join('');
    document.head.appendChild(style);
  }

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    const consent = localStorage.getItem(STORAGE_KEY);

    if (consent === 'accepted' || consent === 'rejected') {
      applyConsent(consent);
      showSettingsButton();
    } else {
      showBanner();
    }
  });
})();
