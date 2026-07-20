// ============================================
// Live local time readout (status bar)
// ============================================
function updateClock() {
  const el = document.getElementById('local-time');
  if (!el) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  el.textContent = `${hh}:${mm}:${ss}`;
}
updateClock();
setInterval(updateClock, 1000);

// ============================================
// Mobile nav toggle
// ============================================
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================
// Active nav link highlighting on scroll
// ============================================
const sections = document.querySelectorAll('main .section, .hero');
const navAnchors = document.querySelectorAll('[data-nav]');

const navObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.getAttribute('id');
      navAnchors.forEach((a) => {
        a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
      });
    });
  },
  { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
);

sections.forEach((section) => {
  if (section.id) navObserver.observe(section);
});

// ============================================
// Scroll-reveal for panels, cards, and waypoints
// ============================================
const revealTargets = document.querySelectorAll(
  '.panel, .waypoint, .card, .instrument'
);
revealTargets.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealTargets.forEach((el) => revealObserver.observe(el));

// ============================================
// Copy email to clipboard
// ============================================
const copyEmailBtn = document.getElementById('copyEmail');
const copyHint = document.getElementById('copyHint');

if (copyEmailBtn && copyHint) {
  const email = 'hasnimol0319@gmail.com';
  const defaultHint = copyHint.textContent;

  copyEmailBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyHint.textContent = 'Copied to clipboard';
    } catch (err) {
      copyHint.textContent = 'Copy failed — email selected above';
    }
    setTimeout(() => {
      copyHint.textContent = defaultHint;
    }, 2000);
  });
}
