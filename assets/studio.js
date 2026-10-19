(() => {
  'use strict';
  const $ = id => document.getElementById(id);
  if (!CircuitAccess.unlocked()) {
    const next = 'studio.html' + location.search;
    location.replace('index.html?next=' + encodeURIComponent(next)); return;
  }
  const study = CIRCUIT_STUDIES.find(s => s.id === new URLSearchParams(location.search).get('study'));
  const shell = $('studio-shell'), panel = $('study-panel'), frame = $('studio-frame'), toggle = $('toggle-steps');
  shell.hidden = false;
  if (study) {
    document.title = study.title + ' · Circuit Studio'; $('workspace-title').textContent = study.title;
    panel.innerHTML = `<p class="eyebrow">Study ${study.number} · ${study.family}</p><h1 id="study-title">${study.title}</h1><p class="study-duration">${study.time}</p><section class="study-step"><span>01 · Predict</span><p>${study.predict}</p></section><section class="study-step"><span>02 · Explore</span><ol>${study.explore.map(step => `<li>${step}</li>`).join('')}</ol><div id="study-actions" class="study-actions"></div><p id="action-status" class="fine" role="status"></p></section><section class="study-step"><span>03 · Explain</span><p>${study.explain}</p></section><details class="self-check"><summary>Check your reasoning</summary><p>${study.check}</p></details><p class="fine">Save your circuit and any notes before leaving the workspace.</p>`;
    for (const action of study.actions) {
      const button = document.createElement('button'); button.type = 'button'; button.className = 'small-button'; button.textContent = action.label; button.disabled = true;
      button.addEventListener('click', () => runAction(action)); $('study-actions').append(button);
    }
    toggle.hidden = false;
    setPanel(!matchMedia('(max-width: 900px)').matches);
  }
  function setPanel(open) {
    panel.hidden = !open; $('workspace-layout').classList.toggle('with-study', open);
    toggle.textContent = open ? 'Hide study steps' : 'Study steps'; toggle.setAttribute('aria-expanded', String(open));
  }
  toggle.addEventListener('click', () => setPanel(panel.hidden));
  function runAction(action) {
    const status = $('action-status');
    try {
      const app = frame.contentWindow;
      if (action.lens) {
        const availability = app.CS12.visualAidAvailability(action.lens);
        if (!availability.enabled) { status.textContent = availability.reason; return; }
        app.CS12.setLens(action.lens, true);
      } else if (action.command === 'simulation') app.CSBench.openDefault();
      else if (action.command === 'breadboard') app.CSBreadboard.open();
      else if (action.command === 'compare') { if (!app.CSBreadboard.isOpen()) app.CSBreadboard.open(); app.CSBreadboard.compare(); }
      status.textContent = action.label + ' opened in Circuit Studio.';
    } catch { status.textContent = 'Use the matching tool inside Circuit Studio. Automatic shortcuts require the app and website to be hosted together.'; }
  }
  const url = new URL(CIRCUIT_SITE.studioFile, location.href);
  if (study) url.hash = new URLSearchParams({ problem: study.route }).toString();
  frame.addEventListener('load', () => {
    try {
      if (frame.contentWindow.location.href === 'about:blank') return;
      $('loading').hidden = true;
      if (!frame.contentWindow.CS12) throw new Error('App not ready');
      panel.querySelectorAll('button').forEach(button => { button.disabled = false; });
      // A previous visit may have saved a different aid. Start each named study
      // with a clean schematic; the learner chooses its tools from this panel.
      if (study) {
        const app = frame.contentWindow;
        if (app.CSVisual?.state.open) { app.CSVisual.state.canvasResume = null; app.CSVisual.open(false); }
        app.CS12.setXray(false);
      }
    } catch {
      $('loading').hidden = true;
      $('launch-error').hidden = false;
      $('launch-error').innerHTML = 'Circuit Studio could not be initialized here. <a id="direct-studio">Open it directly</a>, or check that the app file was uploaded beside studio.html.';
      $('direct-studio').href = url.href;
    }
  });
  frame.src = url.href;
  $('workspace-lock').addEventListener('click', () => { CircuitAccess.lock(); frame.src = 'about:blank'; location.replace('index.html'); });
  window.addEventListener('pageshow', () => { if (!CircuitAccess.unlocked()) { frame.src = 'about:blank'; location.replace('index.html'); } });
})();
