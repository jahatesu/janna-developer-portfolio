import { $, $$, motion, reducedMotionQuery, runningEffects } from './config.js';

export function initMotionPreferences() {
/* 01 / MOTION PREFERENCE */
const motionButton = $('#motion-toggle');
function applyMotionPreference() {
  document.body.classList.toggle('motion-off', !motion.enabled);
  motionButton.textContent = `Motion: ${motion.enabled ? 'on' : 'off'}`;
  motionButton.setAttribute('aria-pressed', String(motion.enabled));
  if (!motion.enabled) {
    runningEffects.forEach(finish => finish());
    $$('.is-pending').forEach(element => element.classList.remove('is-pending'));
    $$('[data-tilt]').forEach(element => {
      element.style.setProperty('--tilt-x', '0deg');
      element.style.setProperty('--tilt-y', '0deg');
    });
    $$('[data-magnetic]').forEach(element => { element.style.translate = ''; });
  }
}
motionButton.hidden = false;
motionButton.addEventListener('click', () => {
  motion.userChoice = !motion.enabled;
  motion.enabled = motion.userChoice && !reducedMotionQuery.matches;
  applyMotionPreference();
});
reducedMotionQuery.addEventListener('change', () => {
  motion.enabled = !reducedMotionQuery.matches && motion.userChoice !== false;
  applyMotionPreference();
});
applyMotionPreference();

}

export function initRevealAnimations() {
/* 03 / REVEALS & TYPEWRITER
   Content is visible by default. Only supported JS enables the effects.
   Typewriter layout reserves the full text to prevent shifting. */
function typewrite(element) {
  if (!motion.enabled || element.dataset.typed) return;
  element.dataset.typed = 'true';
  const text = element.textContent;
  const source = document.createElement('span');
  const output = document.createElement('span');
  source.className = 'typewriter-source';
  source.textContent = text;
  source.setAttribute('aria-hidden', 'true');
  output.className = 'typewriter-output';
  output.setAttribute('aria-hidden', 'true');
  const accessibleText = document.createElement('span');
  accessibleText.className = 'sr-only';
  accessibleText.textContent = text;
  element.classList.add('typewriter', 'is-typing');
  element.replaceChildren(accessibleText, source, output);
  let raf = 0;
  let start = null;
  function finish() {
    cancelAnimationFrame(raf);
    output.textContent = text;
    element.classList.remove('is-typing');
    runningEffects.delete(finish);
  }
  runningEffects.add(finish);
  function tick(time) {
    if (start === null) start = time;
    const count = Math.min(text.length, Math.floor((time - start) / 22) + 1);
    output.textContent = text.slice(0, count);
    if (count < text.length && motion.enabled) raf = requestAnimationFrame(tick);
    else finish();
  }
  raf = requestAnimationFrame(tick);
}
function animateCounter(element) {
  if (!motion.enabled || element.dataset.counted) return;
  element.dataset.counted = 'true';
  const target = Number(element.dataset.counter);
  let start = null;
  let raf = 0;
  function finish() {
    cancelAnimationFrame(raf);
    element.textContent = String(target).padStart(2, '0');
    runningEffects.delete(finish);
  }
  runningEffects.add(finish);
  function tick(time) {
    if (start === null) start = time;
    const progress = Math.min((time - start) / 1000, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased)).padStart(2, '0');
    if (progress < 1 && motion.enabled) raf = requestAnimationFrame(tick);
    else finish();
  }
  raf = requestAnimationFrame(tick);
}
if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.remove('is-pending');
      if (element.hasAttribute('data-typewriter')) typewrite(element);
      if (element.hasAttribute('data-counter')) animateCounter(element);
      observer.unobserve(element);
    });
  }, { threshold: 0, rootMargin: '0px 0px -24px 0px' });
  $$('.reveal-fade, .reveal-slide, .reveal-glow, [data-typewriter], [data-counter]').forEach(element => {
    if (motion.enabled && element.matches('.reveal-fade, .reveal-slide, .reveal-glow')) element.classList.add('is-pending');
    observer.observe(element);
  });
}

}

export function initParticles() {
/* 09 / AMBIENT PARTICLE FIELD
   Lightweight canvas noise drifting behind the content. Pauses whenever
   motion is disabled (reduced-motion preference or the manual toggle). */

  const canvas = $('#particle-canvas');
  if (!canvas || !('getContext' in canvas)) return;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  const palette = ['rgba(0,243,255,', 'rgba(176,38,255,', 'rgba(255,0,85,'];
  let particles = [];
  let width = 0;
  let height = 0;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);
  let raf = 0;

  function particleCount() {
    const area = window.innerWidth * window.innerHeight;
    return Math.max(24, Math.min(70, Math.round(area / 22000)));
  }

  function makeParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.6 + 0.4,
      speed: Math.random() * 0.18 + 0.03,
      drift: (Math.random() - 0.5) * 0.12,
      alpha: Math.random() * 0.5 + 0.15,
      hue: palette[Math.floor(Math.random() * palette.length)]
    };
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const count = particleCount();
    if (particles.length < count) {
      while (particles.length < count) particles.push(makeParticle());
    } else {
      particles.length = count;
    }
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    for (const particle of particles) {
      ctx.beginPath();
      ctx.fillStyle = `${particle.hue}${particle.alpha})`;
      ctx.arc(particle.x, particle.y, particle.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function step() {
    for (const particle of particles) {
      particle.y -= particle.speed;
      particle.x += particle.drift;
      if (particle.y < -10) {
        particle.y = height + 10;
        particle.x = Math.random() * width;
      }
      if (particle.x < -10) particle.x = width + 10;
      if (particle.x > width + 10) particle.x = -10;
    }
    draw();
    if (motion.enabled) raf = requestAnimationFrame(step);
  }

  function start() {
    cancelAnimationFrame(raf);
    if (motion.enabled) {
      raf = requestAnimationFrame(step);
    } else {
      draw();
    }
  }

  resize();
  draw();
  start();
  window.addEventListener('resize', () => { resize(); if (!motion.enabled) draw(); }, { passive: true });
  reducedMotionQuery.addEventListener('change', start);
  $('#motion-toggle').addEventListener('click', start);

}
