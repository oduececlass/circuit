(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  const config = window.CIRCUIT_SITE;
  const gate = $('access-screen'), site = $('site');
  const next = CircuitAccess.safeNext(new URLSearchParams(location.search).get('next'));
  let initialized = false;
  function showSite() {
    if (next) { location.replace(next); return; }
    gate.hidden = true; site.hidden = false;
    if (!initialized) {
      initialized = true;
      for (const study of CIRCUIT_STUDIES) {
        const article = document.createElement('article'); article.className = 'study-card';
        article.innerHTML = `<div class="study-meta"><span>${study.family}</span><span>${study.time}</span></div><div class="study-number">${study.number}</div><h3>${study.title}</h3><p>${study.description}</p><div class="tool-tags">${study.tools.map(t => `<span>${t}</span>`).join('')}</div><a class="study-link" href="studio.html?study=${encodeURIComponent(study.id)}">Open study <span aria-hidden="true">↗</span></a>`;
        $('study-grid').append(article);
      }
      $('guide-video').src = config.guideVideo;
      $('written-guide').href = config.writtenGuide;
      $('guide-video').addEventListener('error', () => { $('video-error').hidden = false; });
    }
    const target = location.hash === '#guide' ? $('guide') : location.hash === '#studies' ? $('studies') : null;
    if (target) requestAnimationFrame(() => target.scrollIntoView());
  }
  $('access-form').addEventListener('submit', async event => {
    event.preventDefault(); $('access-submit').disabled = true; $('access-error').textContent = '';
    try {
      if (await CircuitAccess.verify($('password').value)) { $('password').value = ''; showSite(); if (!next) $('main').focus({ preventScroll: true }); }
      else { $('access-error').textContent = 'That password is not correct. Please try again.'; $('password').select(); }
    } catch (error) { $('access-error').textContent = error.message; }
    finally { $('access-submit').disabled = false; }
  });
  $('reveal-password').addEventListener('click', () => {
    const show = $('password').type === 'password'; $('password').type = show ? 'text' : 'password';
    $('reveal-password').textContent = show ? 'Hide' : 'Show'; $('reveal-password').setAttribute('aria-pressed', String(show));
    $('reveal-password').setAttribute('aria-label', show ? 'Hide password' : 'Show password');
  });
  function lock() { CircuitAccess.lock(); $('guide-video').pause(); site.hidden = true; gate.hidden = false; $('password').value = ''; $('password').focus(); window.scrollTo(0, 0); }
  document.querySelectorAll('[data-lock]').forEach(button => button.addEventListener('click', lock));
  window.addEventListener('pageshow', () => { if (!CircuitAccess.unlocked()) { site.hidden = true; gate.hidden = false; } });
  if (CircuitAccess.unlocked()) showSite();
})();
