/**
 * EDMOND LAW — main.js
 * Shared scripts: nav toggle, scroll reveal, footer year, form validation
 * Vanilla ES6+, no dependencies, defer-loaded.
 */

(function () {
  'use strict';

  /* ── Utility ─────────────────────────────────────────────── */
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* ── 1. FOOTER YEAR ──────────────────────────────────────── */
  $$('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  /* ── 2. NAV — HAMBURGER TOGGLE ───────────────────────────── */
  const menuBtn  = $('.menu-btn');
  const navLinks = $('#nav-links');

  if (menuBtn && navLinks) {
    const syncMenuState = isOpen => {
      menuBtn.setAttribute('aria-expanded', String(isOpen));
      menuBtn.setAttribute('aria-label', isOpen ? 'Close navigation menu' : 'Open navigation menu');
    };

    menuBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      syncMenuState(isOpen);
    });

    // Close on nav link click
    $$('a', navLinks).forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        syncMenuState(false);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        syncMenuState(false);
        menuBtn.focus();
      }
    });

    // Close when clicking outside nav
    document.addEventListener('click', e => {
      const nav = $('.nav');
      if (nav && !nav.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        syncMenuState(false);
      }
    });

    syncMenuState(false);
  }

  /* ── 3. NAV — SCROLLED CLASS ─────────────────────────────── */
  const nav = $('.nav');
  if (nav) {
    const toggleScrolled = () => {
      nav.classList.toggle('nav--scrolled', window.scrollY > 40);
    };
    toggleScrolled();
    window.addEventListener('scroll', toggleScrolled, { passive: true });
  }

  /* ── 4. HERO — DESKTOP-ONLY CAROUSEL IMAGE ──────────────── */
  const syncDesktopHeroImages = () => {
    const isDesktop = window.matchMedia('(min-width: 768px)').matches;
    $$('.hero__carousel-image[data-desktop-src]').forEach(img => {
      if (isDesktop && !img.getAttribute('src')) {
        img.setAttribute('src', img.dataset.desktopSrc);
      }
    });
  };

  const heroCarousel = $('.hero__carousel');
  let heroCarouselTimer = null;
  const heroCarouselImages = $$('.hero__carousel-image');

  const syncHeroCarouselState = () => {
    if (!heroCarousel || !heroCarouselImages.length) return;

    if (heroCarouselTimer) {
      window.clearInterval(heroCarouselTimer);
      heroCarouselTimer = null;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const availableImages = heroCarouselImages.filter(img => img.getAttribute('src'));

    heroCarouselImages.forEach(img => {
      img.classList.toggle('is-active', img === availableImages[0]);
    });

    heroCarousel.classList.add('hero__carousel--ready');

    if (reducedMotion || availableImages.length < 2) {
      return;
    }

    let activeIndex = 0;
    heroCarouselTimer = window.setInterval(() => {
      const currentImage = availableImages[activeIndex];
      activeIndex = (activeIndex + 1) % availableImages.length;
      const nextImage = availableImages[activeIndex];

      currentImage.classList.remove('is-active');
      nextImage.classList.add('is-active');
    }, 6400);
  };

  syncDesktopHeroImages();
  syncHeroCarouselState();
  window.addEventListener('resize', syncDesktopHeroImages, { passive: true });
  window.addEventListener('resize', syncHeroCarouselState, { passive: true });

  /* ── 5. SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = $$('.reveal');

  if (revealEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -56px 0px'
    });

    revealEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: show immediately if IntersectionObserver unavailable
    revealEls.forEach(el => el.classList.add('in'));
  }

  /* ── 6. STAGGER REVEAL CHILDREN ─────────────────────────── */
  // For grids, stagger children automatically on mobile-friendly way
  $$('[data-stagger]').forEach(parent => {
    const children = $$('.reveal', parent);
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    children.forEach((child, i) => {
      child.style.transitionDelay = isMobile ? '0s' : `${Math.min(i * 0.08, 0.4)}s`;
    });
  });

  /* ── 7. CONTACT FORM VALIDATION ──────────────────────────── */
  const contactForm = $('form[data-validate]');

  if (contactForm) {
    const statusEl = $('.form-status', contactForm) || (() => {
      const d = document.createElement('div');
      d.className = 'form-status';
      d.setAttribute('aria-live', 'polite');
      contactForm.prepend(d);
      return d;
    })();

    const showError = (input, msg) => {
      input.setAttribute('aria-invalid', 'true');
      let err = input.parentElement.querySelector('.error-msg');
      if (!err) {
        err = document.createElement('span');
        err.className = 'error-msg';
        err.setAttribute('role', 'alert');
        input.after(err);
      }
      err.textContent = msg;
    };

    const clearError = input => {
      input.removeAttribute('aria-invalid');
      const err = input.parentElement.querySelector('.error-msg');
      if (err) err.remove();
    };

    // Inline validation on blur
    $$('input, select, textarea', contactForm).forEach(field => {
      field.addEventListener('blur', () => {
        if (field.required && !field.value.trim()) {
          showError(field, 'This field is required.');
        } else if (field.type === 'email' && field.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.value)) {
          showError(field, 'Please enter a valid email address.');
        } else {
          clearError(field);
        }
      });

      field.addEventListener('input', () => clearError(field));
    });

    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      let valid = true;

      $$('[required]', contactForm).forEach(field => {
        if (!field.value.trim()) {
          showError(field, 'This field is required.');
          valid = false;
        }
      });

      const emailField = $('input[type="email"]', contactForm);
      if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
        showError(emailField, 'Please enter a valid email address.');
        valid = false;
      }

      if (!valid) {
        statusEl.className = 'form-status form-status--error';
        statusEl.textContent = 'Please correct the errors above before sending.';
        return;
      }

      const btn = $('[type="submit"]', contactForm);
      const originalText = btn.innerHTML;
      btn.disabled = true;
      btn.textContent = 'Sending...';

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });

        if (res.ok) {
          statusEl.className = 'form-status form-status--success';
          statusEl.textContent = 'Thank you. We\'ve received your message and will be in touch shortly.';
          contactForm.reset();
        } else {
          throw new Error('Server error');
        }
      } catch {
        statusEl.className = 'form-status form-status--error';
        statusEl.textContent = 'Something went wrong. Please call us at 876-827-3362 or email tamica@edmondlaw.org.';
      } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        statusEl.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      }
    });
  }

  /* ── 8. SCROLL CUE ANIMATION (pulse) ─────────────────────── */
  // Handled in CSS via @keyframes pulse — no JS needed

  /* ── 9. ACTIVE NAV LINK ──────────────────────────────────── */
  // Mark the current page link in the nav
  const normalizePath = path => {
    if (!path) return '/';
    const withoutIndex = path.replace(/index\.html$/, '');
    const trimmed = withoutIndex.replace(/\/+$/, '');
    return trimmed || '/';
  };

  const navInternalLinks = $$('.nav-links a').filter(link => {
    const href = link.getAttribute('href');
    return href && !href.startsWith('http') && !href.startsWith('tel:') && !href.startsWith('mailto:') && !href.startsWith('#');
  });

  const homeLink = navInternalLinks.find(link => normalizePath(new URL(link.getAttribute('href'), window.location.href).pathname) === normalizePath(new URL('.', window.location.href).pathname))
    || navInternalLinks[0];

  const siteRootPath = homeLink
    ? normalizePath(new URL(homeLink.getAttribute('href'), window.location.href).pathname)
    : '/';

  const toSitePath = path => {
    const normalized = normalizePath(path);
    if (siteRootPath !== '/' && (normalized === siteRootPath || normalized.startsWith(`${siteRootPath}/`))) {
      const relativePath = normalized.slice(siteRootPath.length);
      return relativePath || '/';
    }
    return normalized;
  };

  const currentPath = toSitePath(window.location.pathname);
  navInternalLinks.forEach(link => {
    link.removeAttribute('aria-current');

    const href = link.getAttribute('href');
    const linkPath = toSitePath(new URL(href, window.location.href).pathname);
    const isCurrent = linkPath === '/'
      ? currentPath === '/'
      : currentPath === linkPath || currentPath.startsWith(`${linkPath}/`);

    if (isCurrent) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* ── 10. FLOATING WHATSAPP — HIDE NEAR FOOTER ───────────── */
  const callFloat = $('.call-float');
  const footer = $('.footer');

  if (callFloat && footer && 'IntersectionObserver' in window) {
    const footerObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        callFloat.classList.toggle('is-hidden', entry.isIntersecting);
      });
    }, {
      threshold: 0.15
    });

    footerObserver.observe(footer);
  }

})();
