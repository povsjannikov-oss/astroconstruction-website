(function () {
  'use strict';

  const STORAGE_KEY = 'astro_cookie_consent';
  const BANNER_ID = 'astro-consent-banner';
  const SETTINGS_ID = 'astro-consent-settings';
  const FOOTER_SETTINGS_ID = 'astro-consent-footer-settings';
  const GA_ID = 'G-EMQY2FGLHD';
  const CLARITY_ID = 'xwlhus001w';
  let consentResizeObserver;
  let pageViewSent = false;

  function getStoredConsent() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      return value === 'accepted' || value === 'rejected' || value === 'necessary' ? value : null;
    } catch (error) {
      return null;
    }
  }

  function setStoredConsent(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
    } catch (error) {
      // If storage is unavailable, still apply the in-page consent state.
    }
  }

  function hasAnalyticsConsent(value) {
    return value === 'accepted';
  }

  function gtagConsent(command, granted) {
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    window.gtag('consent', command, {
      analytics_storage: granted ? 'granted' : 'denied',
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied'
    });
  }

  function sendGaPageView() {
    if (pageViewSent || typeof window.gtag !== 'function') return;
    pageViewSent = true;
    window.gtag('event', 'page_view', {
      send_to: GA_ID,
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname
    });
  }

  function removeCookie(name) {
    const hostParts = window.location.hostname.split('.');
    const domains = [''];
    for (let index = 0; index < hostParts.length - 1; index += 1) {
      domains.push('.' + hostParts.slice(index).join('.'));
    }
    domains.forEach(function (domain) {
      const domainPart = domain ? '; domain=' + domain : '';
      document.cookie = name + '=; Max-Age=0; path=/' + domainPart + '; SameSite=Lax';
      document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/' + domainPart;
    });
  }

  function removeAnalyticsCookies() {
    document.cookie.split(';').forEach(function (cookie) {
      const name = cookie.split('=')[0].trim();
      if (
        name === '_ga' ||
        name === '_gid' ||
        name === '_clck' ||
        name === '_clsk' ||
        name.indexOf('_ga_') === 0 ||
        name.indexOf('_gat') === 0 ||
        name.indexOf('_gcl_') === 0
      ) {
        removeCookie(name);
      }
    });
  }

  function ensureClarityQueue() {
    window.clarity = window.clarity || function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };
  }

  function clarityConsent(granted) {
    if (!granted && typeof window.clarity !== 'function') return;
    ensureClarityQueue();
    window.clarity('consentv2', {
      ad_Storage: 'denied',
      analytics_Storage: granted ? 'granted' : 'denied'
    });
    if (!granted) {
      window.clarity('consent', false);
    }
  }

  function loadClarity() {
    if (window.__astroClarityLoaded) return;
    window.__astroClarityLoaded = true;
    ensureClarityQueue();
    clarityConsent(true);

    const firstScript = document.getElementsByTagName('script')[0];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.clarity.ms/tag/' + CLARITY_ID;
    firstScript.parentNode.insertBefore(script, firstScript);
  }

  function applyConsent(value) {
    const granted = hasAnalyticsConsent(value);
    gtagConsent('update', granted);

    if (granted) {
      loadClarity();
      sendGaPageView();
    } else {
      clarityConsent(false);
      removeAnalyticsCookies();
    }
  }

  function saveConsent(value) {
    setStoredConsent(value);
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
      '<span>Analītikas sīkdatnes palīdz saprast vietnes lietošanu. Google Analytics 4 un Microsoft Clarity tiks aktivizēti tikai tad, ja piekritīsiet analītikai.</span>',
      '<a href="/privatuma-politika.html">Privātuma un sīkdatņu politika</a>',
      '</div>',
      '<div class="astro-consent__actions">',
      '<button type="button" class="astro-consent__button" data-consent="accepted">Piekrist analītikai</button>',
      '<button type="button" class="astro-consent__button" data-consent="rejected">Noraidīt analītiku</button>',
      '<button type="button" class="astro-consent__button" data-consent="necessary">Tikai nepieciešamās</button>',
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

  function openSettings() {
    hideBanner();
    showBanner();
  }

  function showSettingsControl() {
    const existingFloating = document.getElementById(SETTINGS_ID);
    const existingFooter = document.getElementById(FOOTER_SETTINGS_ID);
    if (existingFloating || existingFooter) return;

    const footerTarget = document.querySelector('.footer__bottom, footer .footer__legal, footer, .footer');
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'astro-consent-footer-settings';
    button.textContent = 'Sīkdatņu iestatījumi';
    button.setAttribute('aria-label', 'Atvērt sīkdatņu iestatījumus un mainīt analītikas piekrišanu');
    button.addEventListener('click', openSettings);

    if (footerTarget) {
      button.id = FOOTER_SETTINGS_ID;
      footerTarget.appendChild(button);
    } else {
      button.id = SETTINGS_ID;
      button.className += ' astro-consent-footer-settings--floating';
      document.body.appendChild(button);
    }
  }

  function injectStyles() {
    if (document.getElementById('astro-consent-style')) return;
    const style = document.createElement('style');
    style.id = 'astro-consent-style';
    style.textContent = [
      '.astro-consent{position:fixed;left:16px;right:16px;bottom:max(8px,env(safe-area-inset-bottom));z-index:9999;display:flex;gap:14px;align-items:center;justify-content:space-between;max-width:1080px;margin:auto;padding:12px;border:1px solid rgba(255,255,255,.16);border-radius:6px;background:rgba(15,15,14,.96);box-shadow:0 18px 60px rgba(0,0,0,.35);color:#fff;font-family:Inter,Arial,sans-serif}',
      '.astro-consent__text{display:grid;gap:6px;font-size:13px;line-height:1.5;color:rgba(255,255,255,.78)}',
      '.astro-consent__text strong{color:#fff;font-size:14px}.astro-consent__text a{color:#dfc9a6;text-decoration:underline;text-underline-offset:2px}',
      '.astro-consent__actions{display:flex;gap:10px;flex-shrink:0}.astro-consent__button{min-height:44px;border:1px solid rgba(255,255,255,.34);background:transparent;color:#fff;border-radius:4px;padding:8px 13px;font-weight:700;cursor:pointer;white-space:normal;text-align:center}.astro-consent__button:hover,.astro-consent__button:focus-visible{border-color:#dfc9a6;color:#fff}',
      '.astro-consent__button:focus-visible{outline:2px solid #dfc9a6;outline-offset:3px}',
      '.astro-consent-footer-settings{display:inline-flex;align-items:center;min-height:32px;border:0;background:transparent;color:rgba(255,255,255,.82);font:inherit;font-size:14px;padding:4px 0;cursor:pointer;text-decoration:underline;text-underline-offset:3px}',
      '.astro-consent-footer-settings:hover,.astro-consent-footer-settings:focus-visible{color:#fff}.astro-consent-footer-settings:focus-visible{outline:2px solid #dfc9a6;outline-offset:3px}.astro-consent-footer-settings--floating{position:fixed;left:16px;bottom:16px;z-index:9998;color:#fff;background:rgba(15,15,14,.9);border:1px solid rgba(255,255,255,.22);border-radius:4px;padding:8px 10px;text-decoration:none}',
      '@media(max-width:760px){.astro-consent{box-sizing:border-box;display:grid;bottom:max(8px,env(safe-area-inset-bottom));left:max(8px,env(safe-area-inset-left));right:max(8px,env(safe-area-inset-right));gap:10px;max-width:calc(100vw - 16px - env(safe-area-inset-left) - env(safe-area-inset-right));max-height:min(42vh,300px);overflow-y:auto;padding:10px}.astro-consent__text{display:block;font-size:12px;line-height:1.35}.astro-consent__text strong{display:inline;margin-right:6px;font-size:13px}.astro-consent__text span{display:inline}.astro-consent__text a{display:inline-block;margin-top:3px}.astro-consent__actions{display:grid;grid-template-columns:1fr;gap:8px}.astro-consent__button{min-height:44px;width:100%;padding:8px 10px}}'
    ].join('');
    document.head.appendChild(style);
  }

  window.addEventListener('resize', updateConsentSpacing, { passive: true });

  document.addEventListener('DOMContentLoaded', function () {
    injectStyles();
    const consent = getStoredConsent();

    if (consent) {
      applyConsent(consent);
      showSettingsControl();
    } else {
      applyConsent('necessary');
      showBanner();
    }
  });
})();
