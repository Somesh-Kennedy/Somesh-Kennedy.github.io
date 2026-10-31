/* Somesh Kennedy · portfolio. Small, dependency-free behaviour: theme toggle, mobile menu, scroll-spy, reveal-on-scroll, image lightbox. */
(() => {
  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());

  /* ---------- theme: follows the system until the visitor picks one; the choice is remembered when storage is available ---------- */
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => (root.getAttribute('data-theme') ? root.getAttribute('data-theme') === 'dark' : systemDark.matches);
  const themeButton = $('#themeToggle');
  const syncThemeButton = () => themeButton && themeButton.setAttribute('aria-label', isDark() ? 'Switch to light theme' : 'Switch to dark theme');
  syncThemeButton();
  if (themeButton) {
    themeButton.addEventListener('click', () => {
      const next = isDark() ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (error) { /* private mode or blocked storage: the choice just is not remembered */ }
      syncThemeButton();
    });
  }
  systemDark.addEventListener('change', syncThemeButton);

  /* ---------- header shadow line once the page has scrolled ---------- */
  const header = $('#siteHeader');
  const onScroll = () => header && header.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---------- mobile menu ---------- */
  const menuButton = $('#menuToggle');
  const nav = $('#navLinks');
  const setMenu = (open) => {
    if (!menuButton || !nav) return;
    nav.classList.toggle('open', open);
    menuButton.setAttribute('aria-expanded', String(open));
    menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => setMenu(!nav.classList.contains('open')));
    nav.addEventListener('click', (event) => { if (event.target.closest('a')) setMenu(false); });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });
    window.addEventListener('resize', () => { if (window.innerWidth > 980) setMenu(false); });
  }

  /* ---------- scroll-spy: mark the nav link of the section being read (the last one whose top is above the reading line) ---------- */
  const links = $$('#navLinks a[href^="#"]');
  const sections = links.map((link) => $(link.getAttribute('href'))).filter(Boolean);
  let spyQueued = false;
  const updateSpy = () => {
    spyQueued = false;
    const line = window.innerHeight * 0.35;
    let active = null;
    sections.forEach((section) => { if (section.getBoundingClientRect().top <= line) active = section.id; });
    links.forEach((link) => link.setAttribute('aria-current', String(link.getAttribute('href') === `#${active}`)));
  };
  const queueSpy = () => { if (!spyQueued) { spyQueued = true; requestAnimationFrame(updateSpy); } };
  window.addEventListener('scroll', queueSpy, { passive: true });
  window.addEventListener('resize', queueSpy);
  updateSpy();

  /* ---------- reveal on scroll (the CSS only hides .reveal when this script is running) ---------- */
  const revealed = $$('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    const reveal = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    revealed.forEach((element) => reveal.observe(element));
  } else {
    revealed.forEach((element) => element.classList.add('in'));
  }

  /* ---------- lightbox for project screenshots ---------- */
  const dialog = $('#lightbox');
  const dialogImage = $('#lightboxImg');
  const dialogCaption = $('#lightboxCaption');
  let opener = null;
  if (dialog && dialogImage && typeof dialog.showModal === 'function') {
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-lightbox]');
      if (!trigger) return;
      opener = trigger;
      dialogImage.src = trigger.dataset.lightbox;
      dialogImage.alt = trigger.dataset.caption || '';
      dialogCaption.textContent = trigger.dataset.caption || '';
      dialog.showModal();
    });
    $('#lightboxClose').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => { if (event.target === dialog) dialog.close(); });     // a click on the backdrop
    dialog.addEventListener('close', () => { dialogImage.removeAttribute('src'); if (opener) opener.focus(); });
  } else {
    /* No <dialog> support: the screenshots simply open in a new tab. */
    document.addEventListener('click', (event) => {
      const trigger = event.target.closest('[data-lightbox]');
      if (trigger) window.open(trigger.dataset.lightbox, '_blank', 'noopener');
    });
  }
})();
