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

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => cancel());
});

document.addEventListener('click', (e) => {
  const nav = document.querySelector('nav');
  if (!nav.contains(e.target)) cancel();
});

// ============================================
//  SMOOTH SCROLL — only <a> tags with # hrefs
// ============================================
function scrollToSection(e) {
  const href = e.currentTarget.getAttribute('href');
  if (!href || !href.startsWith('#')) return;
  const target = document.querySelector(href);
  if (!target) return;
  e.preventDefault();
  cancel();
  const navHeight = document.querySelector('nav').offsetHeight;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: 'smooth' });
}

// Only apply to nav anchor links — NOT buttons
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
//  SCROLL REVEAL
// ============================================
const revealContents = document.querySelectorAll('.about .content, .skills .content, .projects .content, .contacts .content');
revealContents.forEach(el => el.classList.add('reveal-ready'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.05 });

document.querySelectorAll('section').forEach(s => revealObserver.observe(s));


function sendMail() {
  const name = document.getElementById('contact-name')?.value.trim() || '';
  const email = document.getElementById('contact-email')?.value.trim() || '';
  const message = document.getElementById('contact-message')?.value.trim() || '';

  if (!name || !email || !message) {
    alert('Please fill in all fields before sending.');
    return;
  }

  const subject = encodeURIComponent('Portfolio Contact from ' + name);
  const body = encodeURIComponent(
    'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
  );

  window.location.href = 'mailto:salviathingbaijam@gmail.com?subject=' + subject + '&body=' + body;
}

function openMail() { sendMail(); }