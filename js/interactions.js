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
  const form = $('#contact-form');

  if (!form) return;

  const status = $('#form-status');
  const submitButton = form.querySelector('button[type="submit"]');


  form.addEventListener('submit', async event => {
    event.preventDefault();

    if (!form.reportValidity()) return;

    const originalButtonHTML = submitButton.innerHTML;

    submitButton.disabled = true;
    submitButton.innerHTML =
      'Sending... <span aria-hidden="true">↗</span>';

    status.textContent = 'Sending your message...';

    try {
      const formData = new FormData(form);

      const response = await fetch(
        'https://api.web3forms.com/submit',
        {
          method: 'POST',
          body: formData
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || 'Unable to send message.'
        );
      }

      form.reset();

      status.textContent =
        'Message sent successfully. Thank you — I’ll get back to you soon.';

    } catch (error) {
      console.error('Contact form error:', error);

      status.textContent =
        'Message could not be sent. Please try again or email me directly at jannajustiniano1@gmail.com';

    } finally {
      submitButton.disabled = false;
      submitButton.innerHTML = originalButtonHTML;
    }
  });
}
