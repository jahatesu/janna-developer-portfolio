import { $ } from './config.js';
import { initMotionPreferences, initParticles, initRevealAnimations } from './animations.js';
import {
  initConfigurableLinks,
  initContactForm,
  initNavigation,
  initPointerInteractions,
  initSkillDisclosures
} from './interactions.js';
import { initTerminal } from './terminal.js';

initMotionPreferences();
initNavigation();
initRevealAnimations();
initPointerInteractions();
initSkillDisclosures();
initConfigurableLinks();
initTerminal();
initContactForm();

const currentYear = $('#current-year');
if (currentYear) currentYear.textContent = String(new Date().getFullYear());

initParticles();
