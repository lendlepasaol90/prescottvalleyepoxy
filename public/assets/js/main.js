/* Prescott Valley Epoxy — interactions */
(() => {
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const quiet = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const narrow = matchMedia('(max-width: 980px)');

  /* Header estimate bar: open at the top of the page on desktop, tucks away on scroll */
  const bar = $('[data-bar]');
  const barBtn = $('[data-bar-toggle]');
  let userChoice = null;
  const setBar = (open) => { if (!bar) return; bar.classList.toggle('shut', !open); bar.classList.toggle('force-open', open); bar.toggleAttribute('inert', !open); barBtn?.setAttribute('aria-expanded', String(open)); };
  const autoBar = () => {
    if (scrollY < 24 && !narrow.matches) userChoice = null;
    if (userChoice !== null) return;
    setBar(!narrow.matches && scrollY < 160);
  };
  autoBar();
  addEventListener('scroll', autoBar, { passive: true });
  narrow.addEventListener?.('change', () => { userChoice = null; autoBar(); });
  barBtn?.addEventListener('click', () => {
    userChoice = bar.classList.contains('shut');
    setBar(userChoice);
    if (userChoice) setTimeout(() => $('input', bar)?.focus(), 250);
  });

  /* Services panel */
  const nb = $('.nv__btn'), np = $('#nv-svc');
  const setNP = (o) => { if (!nb) return; nb.setAttribute('aria-expanded', String(o)); np.classList.toggle('on', o); };
  if (nb) {
    const li = nb.parentElement; let t;
    nb.addEventListener('click', () => setNP(nb.getAttribute('aria-expanded') !== 'true'));
    li.addEventListener('mouseenter', () => { if (matchMedia('(hover: hover)').matches) { clearTimeout(t); setNP(true); } });
    li.addEventListener('mouseleave', () => { if (matchMedia('(hover: hover)').matches) t = setTimeout(() => setNP(false), 180); });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) setNP(false); });
    document.addEventListener('click', (e) => { if (!li.contains(e.target)) setNP(false); });
  }

  /* Mobile menu */
  const mb = $('[data-menu]'), mm = $('#hd-m');
  mb?.addEventListener('click', () => { const o = mm.hidden; mm.hidden = !o; mb.setAttribute('aria-expanded', String(o)); mb.textContent = o ? 'Close' : 'Menu'; if (o) { userChoice = false; setBar(false); } });
  document.addEventListener('keydown', (e) => { if (e.key !== 'Escape') return; setNP(false); if (mm && !mm.hidden) { mm.hidden = true; mb.setAttribute('aria-expanded', 'false'); mb.textContent = 'Menu'; mb.focus(); } });

  /* Any "open estimate" trigger opens the header bar and focuses it */
  $$('[data-open-bar]').forEach((b) => b.addEventListener('click', () => { userChoice = true; setBar(true); scrollTo({ top: 0, behavior: quiet ? 'auto' : 'smooth' }); setTimeout(() => $('input', bar)?.focus({ preventScroll: true }), 450); }));

  /* Reveal */
  const els = $$('.in, .wipe');
  if (quiet || !('IntersectionObserver' in window)) els.forEach((e) => e.classList.add('vis'));
  else { const io = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('vis'); io.unobserve(en.target); } }), { rootMargin: '0px 0px -8% 0px', threshold: 0.06 }); els.forEach((e) => io.observe(e)); }

  /* Parallax */
  const px = $$('[data-parallax]');
  if (px.length && !quiet) { let q = false; const go = () => { const vh = innerHeight; px.forEach((el) => { const r = el.parentElement.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) return; el.style.transform = `translate3d(0,${(((r.top + r.height / 2 - vh / 2) / vh) * -60).toFixed(1)}px,0)`; }); q = false; }; addEventListener('scroll', () => { if (!q) { q = true; requestAnimationFrame(go); } }, { passive: true }); go(); }

  /* Counters */
  const run = (el) => { const end = +el.dataset.count, suf = el.dataset.suffix || ''; if (quiet) { el.textContent = end.toLocaleString('en-US') + suf; return; } const t0 = performance.now(); const f = (t) => { const p = Math.min(1, (t - t0) / 1400); el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('en-US') + suf; if (p < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); };
  if ('IntersectionObserver' in window) { const co = new IntersectionObserver((es) => es.forEach((en) => { if (en.isIntersecting) { run(en.target); co.unobserve(en.target); } }), { threshold: 0.6 }); $$('[data-count]').forEach((c) => co.observe(c)); }

  /* FAQ topic tabs */
  $$('[data-ftabs]').forEach((root) => {
    const tabs = $$('[role="tab"]', root);
    const pick = (tab, f) => { tabs.forEach((t) => { const on = t === tab; t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; $('#' + t.getAttribute('aria-controls')).hidden = !on; }); if (f) tab.focus(); };
    tabs.forEach((t, i) => { t.addEventListener('click', () => pick(t)); t.addEventListener('keydown', (e) => { const d = { ArrowRight: 1, ArrowLeft: -1 }[e.key]; if (d) { e.preventDefault(); pick(tabs[(i + d + tabs.length) % tabs.length], true); } }); });
  });

  /* Forms */
  const rules = {
    name: (v) => (v.trim().length >= 2 ? '' : 'Name, please.'),
    phone: (v) => (v.replace(/\D/g, '').length >= 10 ? '' : 'Ten digits, including area code.'),
    email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? '' : 'Double-check this email.'),
    project: (v) => (v ? '' : 'Pick a floor type.'),
  };
  const vet = (el) => { const r = rules[el.name]; if (!r) return true; const m = r(el.value), box = el.closest('.ff'), err = $('.ff__err', box); box.classList.toggle('bad', !!m); el.setAttribute('aria-invalid', m ? 'true' : 'false'); if (err) { err.id ||= el.id + '-err'; el.setAttribute('aria-describedby', err.id); err.textContent = m; } return !m; };
  $$('[data-lead-form]').forEach((form) => {
    const ph = form.elements.phone;
    ph?.addEventListener('input', () => { const d = ph.value.replace(/\D/g, '').replace(/^1/, '').slice(0, 10); ph.value = d.length > 6 ? `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}` : d.length > 3 ? `(${d.slice(0, 3)}) ${d.slice(3)}` : d; });
    $$('input, select', form).forEach((el) => { el.addEventListener('blur', () => el.value && vet(el)); el.addEventListener('input', () => el.closest('.ff')?.classList.contains('bad') && vet(el)); });
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const msg = $('.ef__msg', form), fs = $$('[name]', form).filter((el) => rules[el.name]);
      if (!fs.map(vet).every(Boolean)) { fs.find((f) => f.getAttribute('aria-invalid') === 'true')?.focus(); return; }
      const btn = $('.ef__go', form), lbl = $('span', btn), txt = lbl.textContent;
      btn.disabled = true; lbl.textContent = 'Sending…'; msg.className = 'ef__msg'; msg.textContent = '';
      const data = Object.fromEntries(new FormData(form)); data.page = location.pathname;
      try {
        const res = await fetch(form.action, { method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' }, body: JSON.stringify(data) });
        const out = await res.json().catch(() => ({}));
        if (!res.ok || !out.ok) throw new Error();
        form.classList.add('done'); msg.classList.add('ok');
        msg.textContent = `Thank you, ${data.name.trim().split(' ')[0]}. We have your request and will be in touch to book your estimate.`;
        msg.tabIndex = -1; msg.focus({ preventScroll: true });
      } catch {
        msg.classList.add('no');
        const t = $('.hd__tel');
        msg.innerHTML = `That did not go through. Please try again, or call <a href="${t?.getAttribute('href') || '#'}">${t?.textContent || 'us'}</a>.`;
      } finally { btn.disabled = false; lbl.textContent = txt; }
    });
  });
  $$('[data-year]').forEach((y) => (y.textContent = new Date().getFullYear()));
})();
