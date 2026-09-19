/* Editable portfolio content and shared browser helpers. */
export const PORTFOLIO = {
  name: 'Janna Andrea Justiniano',
  email: 'jannajustiniano1@gmail.com',
  location: 'Taguig City, Philippines',
  availability: 'Open for Software Engineering Roles',
  // Replace null with a verified https:// URL. Empty links remain disabled.
  socials: { github: null, linkedin: null, resume: null },
  projects: {
    dashboard: {
      title: 'Full-Stack Portfolio & Dynamic Admin Dashboard',
      anchor: '#project-dashboard', status: 'Project concept', live: null, repo: null
    },
    resume: {
      title: 'AI Resume / CV Builder',
      anchor: '#project-resume', status: 'Project concept', live: null, repo: null
    },
    commerce: {
      title: 'E-Commerce Engine',
      anchor: '#project-commerce', status: 'Project concept', live: null, repo: null
    },
    xeeai: {
      title: 'XeeAI — Explainable AI Platform',
      anchor: '#project-xeeai', status: 'Best Thesis Award', live: null, repo: null
    }
  }
};

export const $ = (selector, scope = document) => scope.querySelector(selector);
export const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
export const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
export const mobileQuery = window.matchMedia('(max-width: 850px)');
export const pointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
export const motion = { enabled: !reducedMotionQuery.matches, userChoice: null };
export const runningEffects = new Set();

export function safeURL(value) {
  if (typeof value !== 'string' || !value.trim()) return null;
  try {
    const url = new URL(value, window.location.href);
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;
    return url.href;
  } catch {
    return null;
  }
}
