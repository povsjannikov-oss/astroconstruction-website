(function () {
  'use strict';

  window.__astroOptimizationLoaded = true;

  function setupPageState() {
    const path = window.location.pathname.replace(/\/+$/, '');
    const isHome = path === '' || path === '/index.html';
    document.body.classList.toggle('astro-page-home', isHome);
    document.body.classList.toggle('astro-page-inner', !isHome);
    setupNavigationScroll();
    syncStickyBarState();

    window.addEventListener('resize', function () {
      const stickyBar = document.querySelector('.sticky-bar');
      if (stickyBar) updateStickyBarHeight(stickyBar);
    }, { passive: true });
  }

  function syncStickyBarState() {
    const stickyBar = document.querySelector('.sticky-bar');
    const floatingLead = document.querySelector('.astro-floating-lead');
    if (stickyBar) {
      document.body.classList.add('astro-has-sticky-bar');
      updateStickyBarHeight(stickyBar);
      if (floatingLead && window.matchMedia('(max-width: 1199px)').matches) {
        floatingLead.hidden = true;
      }
    } else {
      document.body.classList.remove('astro-has-sticky-bar');
      if (floatingLead) floatingLead.hidden = false;
    }
  }

  function updateStickyBarHeight(stickyBar) {
    if (!stickyBar) return;
    const rect = stickyBar.getBoundingClientRect();
    const height = Math.max(68, Math.ceil(rect.height || stickyBar.offsetHeight || 76));
    document.documentElement.style.setProperty('--astro-mobile-cta-height', height + 'px');
  }

  function setupFloatingElementState() {
    const observer = new MutationObserver(function () {
      const consentOpen = !!document.getElementById('astro-consent-banner');
      document.body.classList.toggle('astro-consent-open', consentOpen);
      syncStickyBarState();
    });
    observer.observe(document.body, { childList: true, subtree: false });
    document.body.classList.toggle('astro-consent-open', !!document.getElementById('astro-consent-banner'));
  }

  function focusableElements(root) {
    if (!root) return [];
    return Array.prototype.slice.call(root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (element) {
      return !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true';
    });
  }

  function setupNavigationScroll() {
    const nav = document.getElementById('nav') || document.querySelector('.nav');
    if (!nav || nav.dataset.astroScrollReady === 'true') return;
    nav.dataset.astroScrollReady = 'true';

    function updateNavState() {
      nav.classList.toggle('scrolled', window.scrollY > 40);
    }

    window.addEventListener('scroll', updateNavState, { passive: true });
    updateNavState();
  }

  function setupMobileNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle, .nav__hamburger, #hamburger, [aria-controls="mobileMenu"], [aria-controls="mobile-menu"]');
    const menu = document.getElementById('mobileMenu') || document.getElementById('mobile-menu') || document.querySelector('.nav__mobile');

    if (!toggle || !menu) return;
    if (menu.dataset.astroMobileNavReady === 'true') return;
    menu.dataset.astroMobileNavReady = 'true';

    if (!menu.id) menu.id = 'mobile-menu';
    toggle.setAttribute('aria-controls', menu.id);
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('role', menu.getAttribute('role') || 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-hidden', 'true');
    menu.hidden = true;
    menu.inert = true;
    setMenuFocusable(false);

    function setMenuFocusable(enabled) {
      menu.querySelectorAll('a[href], button, input, select, textarea, [tabindex]').forEach(function (element) {
        if (enabled) {
          if (!element.hasAttribute('data-astro-tabindex')) return;
          const original = element.getAttribute('data-astro-tabindex');
          if (original) element.setAttribute('tabindex', original);
          else element.removeAttribute('tabindex');
          element.removeAttribute('data-astro-tabindex');
          return;
        }

        if (!element.hasAttribute('data-astro-tabindex')) {
          element.setAttribute('data-astro-tabindex', element.getAttribute('tabindex') || '');
        }
        element.setAttribute('tabindex', '-1');
      });
    }

    function openMenu() {
      if (nav) nav.classList.add('open');
      toggle.classList.add('open');
      menu.hidden = false;
      menu.inert = false;
      menu.setAttribute('aria-hidden', 'false');
      setMenuFocusable(true);
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      const first = focusableElements(menu)[0];
      if (first) first.focus({ preventScroll: true });
    }

    function closeMenu(returnFocus) {
      setMenuFocusable(false);
      if (nav) nav.classList.remove('open');
      toggle.classList.remove('open');
      menu.classList.remove('open');
      menu.inert = true;
      menu.setAttribute('aria-hidden', 'true');
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      if (returnFocus) toggle.focus({ preventScroll: true });
    }

    closeMenu(false);

    toggle.addEventListener('click', function (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      if (expanded) closeMenu(true);
      else openMenu();
    }, true);

    menu.addEventListener('click', function (event) {
      const link = event.target.closest('a');
      if (link) closeMenu(false);
    }, true);

    document.addEventListener('keydown', function (event) {
      if (toggle.getAttribute('aria-expanded') !== 'true') return;

      if (event.key === 'Escape') {
        closeMenu(true);
        return;
      }

      if (event.key === 'Tab') {
        const focusable = focusableElements(menu);
        if (!focusable.length) {
          event.preventDefault();
          return;
        }

        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus({ preventScroll: true });
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus({ preventScroll: true });
        }
      }
    });

    const desktopQuery = window.matchMedia('(min-width: 1024px)');
    const handleDesktopQueryChange = function (event) {
      if (!event.matches || toggle.getAttribute('aria-expanded') !== 'true') return;
      closeMenu(menu.contains(document.activeElement));
    };
    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener('change', handleDesktopQueryChange);
    } else if (desktopQuery.addListener) {
      desktopQuery.addListener(handleDesktopQueryChange);
    }
  }

  function setupFaqAccordions() {
    document.querySelectorAll('.faq__item').forEach(function (item, index) {
      const button = item.querySelector('.faq__question');
      const answer = item.querySelector('.faq__answer');
      if (!button || !answer) return;

      if (!answer.id) answer.id = 'faq-answer-' + (index + 1);
      button.setAttribute('aria-controls', answer.id);
      button.setAttribute('aria-expanded', item.classList.contains('open') ? 'true' : 'false');
      answer.setAttribute('role', answer.getAttribute('role') || 'region');
      answer.setAttribute('aria-labelledby', button.id || '');
      if (!button.id) {
        button.id = 'faq-question-' + (index + 1);
        answer.setAttribute('aria-labelledby', button.id);
      }

      button.addEventListener('keydown', function (event) {
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        const buttons = Array.prototype.slice.call(document.querySelectorAll('.faq__question'));
        const current = buttons.indexOf(button);
        const next = event.key === 'ArrowDown'
          ? buttons[(current + 1) % buttons.length]
          : buttons[(current - 1 + buttons.length) % buttons.length];
        if (next) {
          event.preventDefault();
          next.focus();
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      setupPageState();
      setupFloatingElementState();
      setupMobileNavigation();
      setupFaqAccordions();
    }, { once: true });
  } else {
    setupPageState();
    setupFloatingElementState();
    setupMobileNavigation();
    setupFaqAccordions();
  }
})();
