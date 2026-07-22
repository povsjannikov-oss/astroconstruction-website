(function () {
  'use strict';

  window.__astroOptimizationLoaded = true;

  function focusableElements(root) {
    if (!root) return [];
    return Array.prototype.slice.call(root.querySelectorAll(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter(function (element) {
      return !element.hasAttribute('disabled') && element.getAttribute('aria-hidden') !== 'true';
    });
  }

  function setupMobileNavigation() {
    const nav = document.querySelector('.nav');
    const toggle = document.querySelector('.nav__toggle, .nav__hamburger, #hamburger, [aria-controls="mobileMenu"], [aria-controls="mobile-menu"]');
    const menu = document.getElementById('mobileMenu') || document.getElementById('mobile-menu') || document.querySelector('.nav__mobile');

    if (!toggle || !menu) return;

    if (!menu.id) menu.id = 'mobile-menu';
    toggle.setAttribute('aria-controls', menu.id);
    toggle.setAttribute('aria-expanded', 'false');
    menu.setAttribute('role', menu.getAttribute('role') || 'dialog');
    menu.setAttribute('aria-modal', 'true');
    menu.setAttribute('aria-hidden', 'true');
    menu.hidden = true;
    menu.inert = true;

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
      menu.hidden = false;
      menu.inert = false;
      menu.setAttribute('aria-hidden', 'false');
      setMenuFocusable(true);
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      const first = focusableElements(menu)[0];
      if (first) first.focus({ preventScroll: true });
    }

    function closeMenu(returnFocus) {
      setMenuFocusable(false);
      if (nav) nav.classList.remove('open');
      menu.classList.remove('open');
      menu.inert = true;
      menu.setAttribute('aria-hidden', 'true');
      menu.hidden = true;
      toggle.setAttribute('aria-expanded', 'false');
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
      if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
        closeMenu(true);
      }
    });
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
      setupMobileNavigation();
      setupFaqAccordions();
    }, { once: true });
  } else {
    setupMobileNavigation();
    setupFaqAccordions();
  }
})();
