// ============================================
//  NAV DROPDOWN TOGGLE
// ============================================
const dropdown = document.querySelector('.dropdown');

function hamburg() {
  dropdown.classList.add('active');
}

function cancel() {
  dropdown.classList.remove('active');
}

// Close dropdown when clicking a mobile nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => cancel());
});

// Close dropdown when clicking outside of nav
document.addEventListener('click', (e) => {
  const nav = document.querySelector('nav');
  if (!nav.contains(e.target)) cancel();
});

// ============================================
//  SMOOTH SCROLL — nav links → sections
// ============================================
function scrollToSection(e) {
  const href = e.currentTarget.getAttribute('href');
  if (!href || href === '#') return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  cancel(); // close mobile dropdown if open
  const navHeight = document.querySelector('nav').offsetHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Apply to ALL nav links (desktop + mobile)
document.querySelectorAll('.home-link a, .nav-links a').forEach(link => {
  link.addEventListener('click', scrollToSection);
});

// ============================================
//  ACTIVE NAV HIGHLIGHT ON SCROLL
// ============================================
const sections = document.querySelectorAll('section[id]');
const desktopLinks = document.querySelectorAll('.home-link a');

window.addEventListener('scroll', () => {
  let current = '';
  const navH = document.querySelector('nav').offsetHeight + 20;
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - navH) {
      current = section.getAttribute('id');
    }
  });
  desktopLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}, { passive: true });

// ============================================
//  SCROLL REVEAL — safe: mark ready, then observe
// ============================================
const revealContents = document.querySelectorAll('.about .content, .skills .content, .projects .content, .contacts .content');

// Step 1: Add reveal-ready so CSS hides them
revealContents.forEach(el => el.classList.add('reveal-ready'));

// Step 2: Observe parent sections
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(s => revealObserver.observe(s));

// ============================================
//  LETS CHAT BUTTON → mailto
//  Replace 'youremail@gmail.com' with your real email!
// ============================================
const letsChatBtn = document.getElementById('lets-chat');
if (letsChatBtn) {
  letsChatBtn.addEventListener('click', () => {
    window.location.href = 'mailto:salviathingbaijam@gmail.com?subject=Hello Salvia!&body=Hi Salvia, I would like to connect with you.';
  });
}