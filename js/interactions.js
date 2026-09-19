import { $, $$, PORTFOLIO, mobileQuery, motion, pointerQuery, safeURL } from './config.js';

export function initNavigation() {
/* 02 / NAVIGATION
   An inline mobile disclosure avoids a full-screen focus trap.
   Escape closes it and returns focus to the menu button. */
const header = $('[data-header]');
const nav = $('#site-navigation');
const menu = $('.menu-toggle');
function setMenu(open, returnFocus = false) {
  menu.setAttribute('aria-expanded', String(open));
  $('.menu-label', menu).textContent = open ? 'Close' : 'Menu';
  nav.hidden = mobileQuery.matches && !open;
  if (returnFocus) menu.focus();
}
function syncNavigation() {
  menu.hidden = !mobileQuery.matches;
  setMenu(false);
}
syncNavigation();
document.documentElement.classList.add('has-js');
mobileQuery.addEventListener('change', () => {
  const focusWasInNav = nav.contains(document.activeElement);
  syncNavigation();
  if (mobileQuery.matches && focusWasInNav) menu.focus();
});
menu.addEventListener('click', () => setMenu(menu.getAttribute('aria-expanded') !== 'true'));
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') setMenu(false, true);
});
$$('a[href^="#"]').forEach(link => {
  link.addEventListener('click', () => {
    const target = document.getElementById(link.getAttribute('href').slice(1));
    if (nav.contains(link) && mobileQuery.matches) {
      setMenu(false);
      // Preserve a sensible keyboard position after the navigation closes.
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      }
    }
  });
});

/* Active link and reading progress, updated at most once per frame. */
const sectionNodes = $$('main section[id]');
const navigationLinks = $$('a[href^="#"]', nav);
let scrollScheduled = false;
let activeSectionId = '';
function updateScrollState() {
  scrollScheduled = false;
  header.classList.toggle('is-scrolled', window.scrollY > 16);
  const total = document.documentElement.scrollHeight - window.innerHeight;
  $('.scroll-progress').style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`;
  const readingLine = header.getBoundingClientRect().height + 110;
  let current = sectionNodes[0];
  for (const section of sectionNodes) {
    if (section.getBoundingClientRect().top <= readingLine) current = section;
  }
  if (current && current.id !== activeSectionId) {
    activeSectionId = current.id;
    navigationLinks.forEach(link => {
      if (link.getAttribute('href') === `#${current.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
}
function scheduleScrollUpdate() {
  if (!scrollScheduled) {
    scrollScheduled = true;
    requestAnimationFrame(updateScrollState);
  }
}
window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
window.addEventListener('resize', scheduleScrollUpdate, { passive: true });
updateScrollState();

}

export function initPointerInteractions() {
/* 04 / POINTER INTERACTIONS
   Event-driven frames avoid a permanent cursor animation loop.
   The operating-system cursor stays visible. */
$$('[data-tilt]').forEach(card => {
  let frame = 0;
  card.addEventListener('pointermove', event => {
    if (!motion.enabled || !pointerQuery.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    const clientX = event.clientX;
    const clientY = event.clientY;
    frame = requestAnimationFrame(() => {
      const rect = card.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width;
      const y = (clientY - rect.top) / rect.height;
      card.style.setProperty('--tilt-x', `${(0.5 - y) * 3}deg`);
      card.style.setProperty('--tilt-y', `${(x - 0.5) * 3}deg`);
      card.style.setProperty('--glow-x', `${x * 100}%`);
      card.style.setProperty('--glow-y', `${y * 100}%`);
    });
  });
  card.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    card.style.setProperty('--tilt-x', '0deg');
    card.style.setProperty('--tilt-y', '0deg');
  });
});
$$('[data-magnetic]').forEach(button => {
  let frame = 0;
  button.addEventListener('pointermove', event => {
    if (!motion.enabled || !pointerQuery.matches || event.pointerType === 'touch') return;
    cancelAnimationFrame(frame);
    const clientX = event.clientX;
    const clientY = event.clientY;
    frame = requestAnimationFrame(() => {
      const rect = button.getBoundingClientRect();
      const x = Math.max(-5, Math.min(5, (clientX - rect.left - rect.width / 2) * .07));
      const y = Math.max(-4, Math.min(4, (clientY - rect.top - rect.height / 2) * .1));
      button.style.translate = `${x}px ${y}px`;
    });
  });
  button.addEventListener('pointerleave', () => {
    cancelAnimationFrame(frame);
    button.style.translate = '';
  });
});

}

export function initSkillDisclosures() {
/* 05 / SKILL DISCLOSURES */
$$('.skill-tags button').forEach((button, index) => {
  const detail = document.createElement('span');
  const inner = document.createElement('span');
  detail.className = 'skill-detail';
  detail.id = `skill-detail-${index}`;
  inner.textContent = button.dataset.detail;
  detail.append(inner);
  detail.setAttribute('aria-hidden', 'true');
  button.append(detail);
  button.setAttribute('aria-controls', detail.id);
  button.setAttribute('aria-expanded', 'false');
  button.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') !== 'true';
    button.setAttribute('aria-expanded', String(expanded));
    detail.setAttribute('aria-hidden', String(!expanded));
  });
});

}

export function initConfigurableLinks() {
function enableLink(link, value, label) {
  const url = safeURL(value);
  if (!url) return;
  link.href = url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.removeAttribute('aria-disabled');
  const suffix = $('span', link);
  if (suffix) suffix.textContent = '↗';
  if (label) link.setAttribute('aria-label', label);
}
$$('[data-project-link]').forEach(link => {
  const project = PORTFOLIO.projects[link.dataset.projectLink];
  enableLink(link, project?.[link.dataset.linkKind], `${link.dataset.linkKind === 'live' ? 'Live demo' : 'Repository'}: ${project?.title}`);
});
$$('[data-social]').forEach(link => enableLink(link, PORTFOLIO.socials[link.dataset.social]));

}

export function initContactForm() {
/* 08 / CONTACT: validated email draft, not a simulated send-success. */
$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const values = new FormData(form);
  const name = String(values.get('name') || '').trim();
  const email = String(values.get('email') || '').trim();
  const subject = String(values.get('subject') || '').trim();
  const message = String(values.get('message') || '').trim();
  if (!name || !subject || !message) {
    $('#form-status').textContent = 'Please add your name, a subject, and a message before composing your email.';
    return;
  }
  const body = `Hi Janna,\n\n${message}\n\nFrom: ${name}\nEmail: ${email}`;
  const url = `mailto:${PORTFOLIO.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  $('#form-status').textContent = 'Your email draft is ready. If no email app opens, use the email address beside this form. Your message stays here until you send it.';
  window.location.href = url;
});

}
