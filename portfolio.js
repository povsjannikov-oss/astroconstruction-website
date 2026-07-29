(function(){
  'use strict';
  const nav = document.getElementById('nav');
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const stickyBar = document.querySelector('.sticky-bar');

  function updateNav() {
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
    if (stickyBar) stickyBar.classList.toggle('visible', window.scrollY > 520);
  }

  function setMobileMenuState(isOpen) {
    if (!nav || !navToggle || !mobileMenu) return;
    nav.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenu.hidden = !isOpen;
    mobileMenu.inert = !isOpen;
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();
  setMobileMenuState(false);

  if (navToggle) {
    navToggle.addEventListener('click', () => setMobileMenuState(!nav.classList.contains('open')));
  }
  document.querySelectorAll('.nav__mobile-link').forEach(link => {
    link.addEventListener('click', () => setMobileMenuState(false));
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') setMobileMenuState(false);
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    document.querySelectorAll('.reveal').forEach(element => observer.observe(element));
  } else {
    document.querySelectorAll('.reveal').forEach(element => element.classList.add('visible'));
  }
})();
