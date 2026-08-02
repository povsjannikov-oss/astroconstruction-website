(function () {
  'use strict';

  const STORAGE_KEY = 'astro_cookie_consent';
  const BANNER_ID = 'astro-consent-banner';
  const SETTINGS_ID = 'astro-consent-settings';
  const FOOTER_SETTINGS_ID = 'astro-consent-footer-settings';
  const GTM_ID = 'GTM-PKFJTQJ7';
  let consentResizeObserver;

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
    showSettingsControl();
  }

  function hideBanner() {
    const banner = document.getElementById(BANNER_ID);
    if (consentResizeObserver) consentResizeObserver.disconnect();
    if (banner) banner.remove();
    document.body.classList.remove('astro-consent-open');
    document.body.style.removeProperty('--astro-consent-space');
  }

  function updateConsentSpacing() {
    const banner = document.getElementById(BANNER_ID);
    if (!banner) return;
    document.body.style.setProperty('--astro-consent-space', Math.ceil(banner.getBoundingClientRect().height + 24) + 'px');
  }

  function showBanner() {
    if (document.getElementById(BANNER_ID)) return;
    document.body.classList.add('astro-consent-open');

    const banner = document.createElement('div');
    banner.id = BANNER_ID;
    banner.className = 'astro-consent';
    banner.setAttribute('role', 'region');
    banner.setAttribute('aria-labelledby', 'astro-consent-title');
    banner.setAttribute('aria-describedby', 'astro-consent-description');
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
    const title = banner.querySelector('strong');
    const description = banner.querySelector('span');
    if (title) title.id = 'astro-consent-title';
    if (description) description.id = 'astro-consent-description';
    banner.querySelectorAll('[data-consent]').forEach(function (button) {
      button.addEventListener('click', function () {
        saveConsent(button.getAttribute('data-consent'));
      });
    });
    updateConsentSpacing();
    requestAnimationFrame(updateConsentSpacing);
    if ('ResizeObserver' in window) {
      consentResizeObserver = new ResizeObserver(updateConsentSpacing);
      consentResizeObserver.observe(banner);
    }
  }

  function showSettingsButton() {
    showSettingsControl();
  }

  function openSettings() {
    localStorage.removeItem(STORAGE_KEY);
    showBanner();
  }

  function showSettingsControl() {
    const floating = document.getElementById(SETTINGS_ID);
    if (floating) floating.remove();
    if (document.getElementById(FOOTER_SETTINGS_ID)) return;

    const footerTarget = document.querySelector('.footer__bottom, footer .footer__legal, footer, .footer');
    if (!footerTarget) return;

    const button = document.createElement('button');
    button.id = FOOTER_SETTINGS_ID;
    button.type = 'button';
    button.className = 'astro-consent-footer-settings';
    button.textContent = 'Sīkdatņu iestatījumi';
    button.setAttribute('aria-label', 'Atvērt sīkdatņu iestatījumus');
    button.addEventListener('click', openSettings);
    footerTarget.appendChild(button);
  }

  function injectStyles() {
    const style = document.createElement('style');
    style.textContent = [
      '.astro-consent{position:fixed;left:16px;right:16px;bottom:16px;z-index:9999;display:flex;gap:18px;align-items:center;justify-content:space-between;max-width:980px;margin:auto;padding:16px;border:1px solid rgba(255,255,255,.16);border-radius:6px;background:rgba(15,15,14,.96);box-shadow:0 18px 60px rgba(0,0,0,.35);color:#fff;font-family:Inter,Arial,sans-serif}',
      '.astro-consent__text{display:grid;gap:6px;font-size:13px;line-height:1.5;color:rgba(255,255,255,.78)}',
      '.astro-consent__text strong{color:#fff;font-size:14px}.astro-consent__text a{color:#dfc9a6;text-decoration:underline;text-underline-offset:2px}',
      '.astro-consent__actions{display:flex;gap:10px;flex-shrink:0}.astro-consent__button{border:1px solid #dfc9a6;background:#dfc9a6;color:#101010;border-radius:4px;padding:10px 14px;font-weight:700;cursor:pointer}.astro-consent__button--ghost{background:transparent;color:#fff;border-color:rgba(255,255,255,.3)}',
      '.astro-consent__button:focus-visible{outline:2px solid #dfc9a6;outline-offset:3px}',
      '.astro-consent-footer-settings{display:inline-flex;align-items:center;min-height:32px;border:0;background:transparent;color:rgba(255,255,255,.82);font:inherit;font-size:14px;padding:4px 0;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
      '.astro-consent-footer-settings:hover,.astro-consent-footer-settings:focus-visible{color:#fff}.astro-consent-footer-settings:focus-visible{outline:2px solid #dfc9a6;outline-offset:3px}',
      '@media(max-width:680px){.astro-consent{box-sizing:border-box;display:grid;top:calc(var(--nav-h,72px) + max(6px,env(safe-area-inset-top)));bottom:auto;left:max(8px,env(safe-area-inset-left));right:max(8px,env(safe-area-inset-right));gap:8px;max-width:calc(100vw - 16px - env(safe-area-inset-left) - env(safe-area-inset-right));max-height:min(38vh,240px);overflow-y:auto;padding:8px}.astro-consent__text{display:block;font-size:12px;line-height:1.35}.astro-consent__text strong{display:inline;margin-right:6px;font-size:13px}.astro-consent__text span{display:inline}.astro-consent__text a{display:inline-block;margin-top:3px}.astro-consent__actions{display:grid;grid-template-columns:1fr 1fr;gap:8px}.astro-consent__button{min-height:44px;width:100%;padding:8px 10px}}'
    ].join('');
    document.head.appendChild(style);
  }

  window.addEventListener('resize', updateConsentSpacing, { passive: true });

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    const consent = localStorage.getItem(STORAGE_KEY);

    if (consent === 'accepted' || consent === 'rejected') {
      applyConsent(consent);
      showSettingsControl();
    } else {
      showBanner();
    }
  });
})();
