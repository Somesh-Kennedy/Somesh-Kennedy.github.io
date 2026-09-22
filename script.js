const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ===== Local clock (Dallas) ===== */
const clock = document.querySelector('#clock');
function updateClock() {
  if (!clock) return;
  clock.textContent = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true
  }).format(new Date()).replace(':', ' ').toUpperCase();
}
updateClock();
setInterval(updateClock, 30000);

/* ===== Menu overlay ===== */
const menuButton = document.querySelector('.menu-button');
const menu = document.querySelector('#menu');
function setMenu(open) {
  menu.classList.toggle('open', open);
  menu.setAttribute('aria-hidden', String(!open));
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  document.body.classList.toggle('menu-open', open);
}
menuButton.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

/* ===== Marquee: duplicate items for a seamless loop ===== */
document.querySelectorAll('.marquee-track').forEach(track => {
  [...track.children].forEach(node => {
    const clone = node.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  track.classList.add('ready');
});

/* ===== Scroll reveal (with stagger groups) ===== */
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
document.querySelectorAll('.reveal, .stagger').forEach(el => revealObserver.observe(el));

/* ===== Count-up stats ===== */
function animateCount(el) {
  const target = Number(el.dataset.count);
  const duration = 1300;
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}
if (!reduceMotion) {
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animateCount(entry.target);
      countObserver.unobserve(entry.target);
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));
} else {
  document.querySelectorAll('[data-count]').forEach(el => { el.textContent = el.dataset.count; });
}

/* ===== Nav: glass-on-scroll + progress bar + active link ===== */
const nav = document.querySelector('#nav');
const progress = document.querySelector('#progress');
function onScroll() {
  const y = window.scrollY;
  nav.classList.toggle('scrolled', y > 8);
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.width = (max > 0 ? Math.min(100, (y / max) * 100) : 0) + '%';
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });

const navLinks = document.querySelectorAll('.nav-links a');
const sections = [...navLinks].map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
if (sections.length) {
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const link = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
  sections.forEach(s => sectionObserver.observe(s));
}

/* ===== Hero role cycler ===== */
const cycleWords = ['reason.', 'retrieve.', 'decide.', 'orchestrate.', 'ship.'];
const cycleWord = document.querySelector('#cycleWord');
const cycleWrap = document.querySelector('#cycleWrap');
if (cycleWord && cycleWrap && !reduceMotion) {
  // Pre-measure the widest word so the layout doesn't jitter.
  const measurer = document.createElement('span');
  measurer.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
  measurer.style.font = getComputedStyle(cycleWord).font;
  document.body.appendChild(measurer);
  let maxWidth = 0;
  cycleWords.forEach(w => { measurer.textContent = w; maxWidth = Math.max(maxWidth, measurer.offsetWidth); });
  measurer.remove();
  cycleWrap.style.width = maxWidth + 'px';

  let i = 0;
  setInterval(() => {
    i = (i + 1) % cycleWords.length;
    cycleWord.style.transform = 'translateY(-100%)';
    cycleWord.style.opacity = '0';
    setTimeout(() => {
      cycleWord.textContent = cycleWords[i];
      cycleWord.style.transform = 'translateY(100%)';
      requestAnimationFrame(() => {
        cycleWord.style.transition = 'none';
        cycleWord.offsetHeight; // reflow
        cycleWord.style.transition = '';
        cycleWord.style.transform = 'translateY(0)';
        cycleWord.style.opacity = '1';
      });
    }, 500);
  }, 2200);
}

/* ===== Magnetic buttons ===== */
if (!reduceMotion && matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.magnetic').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const x = (e.clientX - r.left - r.width / 2) * 0.28;
      const y = (e.clientY - r.top - r.height / 2) * 0.5;
      btn.style.setProperty('--tx', x + 'px');
      btn.style.setProperty('--ty', y + 'px');
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.setProperty('--tx', '0px');
      btn.style.setProperty('--ty', '0px');
    });
  });
}

/* ===== Cursor-spotlight on cards / tiles ===== */
if (matchMedia('(hover:hover)').matches) {
  document.querySelectorAll('.pcard, .tool-tile').forEach(el => {
    el.addEventListener('mousemove', e => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });
}
