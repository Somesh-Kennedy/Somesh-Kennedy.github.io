const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Local time (Dallas)
const clock = document.querySelector('#clock');
function updateClock() {
  clock.textContent = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago', hour: '2-digit', minute: '2-digit', hour12: true
  }).format(new Date()).replace(':', ' ').toUpperCase();
}
updateClock();
setInterval(updateClock, 30000);

// Menu overlay
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

// Stack marquee: duplicate the items for a seamless loop
document.querySelectorAll('.marquee-track').forEach(track => {
  [...track.children].forEach(node => {
    const clone = node.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });
  track.classList.add('ready');
});

// Scroll reveal
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });
document.querySelectorAll('.section .content-shell, .section-rule').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// Count-up stats
function animateCount(el) {
  const target = Number(el.dataset.count);
  const suffix = el.dataset.suffix || '';
  const duration = 1200;
  const start = performance.now();
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    const eased = 1 - Math.pow(1 - t, 3);
    el.textContent = Math.round(target * eased) + suffix;
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
  document.querySelectorAll('[data-count]').forEach(el => {
    el.textContent = '0' + (el.dataset.suffix || '');
    countObserver.observe(el);
  });
}
