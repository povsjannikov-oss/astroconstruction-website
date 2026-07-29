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

  const galleryItems = Array.from(document.querySelectorAll('[data-gallery-item]'));
  if (galleryItems.length) {
    const lightbox = document.createElement('div');
    lightbox.className = 'portfolio-lightbox';
    lightbox.hidden = true;
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-label', 'Projekta foto apskate');
    lightbox.innerHTML = '<div class="portfolio-lightbox__frame"><button class="portfolio-lightbox__button portfolio-lightbox__close" type="button" aria-label="Aizvērt">×</button><button class="portfolio-lightbox__button portfolio-lightbox__prev" type="button" aria-label="Iepriekšējais attēls">‹</button><img class="portfolio-lightbox__image" alt=""><button class="portfolio-lightbox__button portfolio-lightbox__next" type="button" aria-label="Nākamais attēls">›</button><p class="portfolio-lightbox__caption"></p></div>';
    document.body.appendChild(lightbox);

    const closeButton = lightbox.querySelector('.portfolio-lightbox__close');
    const prevButton = lightbox.querySelector('.portfolio-lightbox__prev');
    const nextButton = lightbox.querySelector('.portfolio-lightbox__next');
    const image = lightbox.querySelector('.portfolio-lightbox__image');
    const caption = lightbox.querySelector('.portfolio-lightbox__caption');
    let activeIndex = 0;
    let lastFocus = null;
    let touchStartX = 0;

    function setLightboxImage(index) {
      activeIndex = (index + galleryItems.length) % galleryItems.length;
      const item = galleryItems[activeIndex];
      image.src = item.dataset.full;
      image.alt = item.dataset.alt || '';
      caption.textContent = item.dataset.caption || '';
    }

    function openLightbox(index, trigger) {
      lastFocus = trigger;
      setLightboxImage(index);
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      closeButton.focus();
    }

    function closeLightbox() {
      lightbox.hidden = true;
      image.removeAttribute('src');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => openLightbox(index, item));
    });
    closeButton.addEventListener('click', closeLightbox);
    prevButton.addEventListener('click', () => setLightboxImage(activeIndex - 1));
    nextButton.addEventListener('click', () => setLightboxImage(activeIndex + 1));
    lightbox.addEventListener('click', event => {
      if (event.target === lightbox) closeLightbox();
    });
    lightbox.addEventListener('touchstart', event => {
      touchStartX = event.changedTouches[0].clientX;
    }, { passive: true });
    lightbox.addEventListener('touchend', event => {
      const deltaX = event.changedTouches[0].clientX - touchStartX;
      if (Math.abs(deltaX) > 48) setLightboxImage(activeIndex + (deltaX < 0 ? 1 : -1));
    }, { passive: true });
    document.addEventListener('keydown', event => {
      if (lightbox.hidden) return;
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') setLightboxImage(activeIndex - 1);
      if (event.key === 'ArrowRight') setLightboxImage(activeIndex + 1);
    });
  }
})();
