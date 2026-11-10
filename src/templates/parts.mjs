import { site } from '../site.mjs';
import { esc } from '../lib/html.mjs';
import { services } from '../content/services/index.mjs';

export const phoneLink = (cls = '') => `<a class="${cls}" href="${site.phoneHref}">${esc(site.phone)}</a>`;

export function leadForm({ id, heading, intro, button = 'Request estimate', withMessage = false, preset = '', variant = 'card' }) {
  const f = (n) => `${id}-${n}`;
  const ph = (t) => (variant === 'bar' ? ` placeholder="${t}"` : '');
  const opts = site.projectTypes.map((t) => `<option${t === preset ? ' selected' : ''}>${esc(t)}</option>`).join('');
  return `<form class="ef ef--${variant}" id="${id}" action="/api/lead" method="post" novalidate data-lead-form>
  ${heading ? `<p class="ef__title">${esc(heading)}</p>` : ''}
  ${intro ? `<p class="ef__intro">${esc(intro)}</p>` : ''}
  <div class="ef__row">
    <div class="ff"><label for="${f('name')}">Name</label><input id="${f('name')}" name="name" type="text" autocomplete="name" required maxlength="80"${ph('Your name')}><p class="ff__err" aria-live="polite"></p></div>
    <div class="ff"><label for="${f('phone')}">Phone</label><input id="${f('phone')}" name="phone" type="tel" autocomplete="tel" inputmode="tel" required${ph('Phone')}><p class="ff__err" aria-live="polite"></p></div>
    <div class="ff"><label for="${f('email')}">Email</label><input id="${f('email')}" name="email" type="email" autocomplete="email" required maxlength="120"${ph('Email')}><p class="ff__err" aria-live="polite"></p></div>
    <div class="ff"><label for="${f('project')}">Floor type</label><select id="${f('project')}" name="project" required><option value="">${variant === 'bar' ? 'Floor type' : 'Select…'}</option>${opts}</select><p class="ff__err" aria-live="polite"></p></div>
    ${withMessage ? `<div class="ff ff--wide"><label for="${f('message')}">About the space <span class="ff__opt">(optional)</span></label><textarea id="${f('message')}" name="message" rows="3" maxlength="2000" placeholder="Size, age of the home, any existing coating, timing"></textarea></div>` : ''}
    <div class="hp" aria-hidden="true"><label for="${f('company')}">Company</label><input id="${f('company')}" name="company" type="text" tabindex="-1" autocomplete="off"></div>
    <button class="btn btn--olive ef__go" type="submit"><span>${esc(button)}</span></button>
  </div>
  <p class="ef__note">We reply about your floor only. <a href="/privacy-policy/">Privacy policy</a></p>
  <div class="ef__msg" role="status" aria-live="polite"></div>
</form>`;
}

export function header(current = '') {
  return `<a class="skip" href="#main">Skip to content</a>
<header class="hd" data-header>
  <div class="wrap hd__bar">
    <a class="mark" href="/" aria-label="${esc(site.name)} home">
      <!-- Logo placeholder: swap these spans for the final logo image. -->
      <span class="mark__box" aria-hidden="true"></span><span class="mark__name">${esc(site.name)}</span>
    </a>
    <nav class="nv" aria-label="Main">
      <ul>
        <li class="nv__has"><button type="button" class="nv__btn" aria-expanded="false" aria-controls="nv-svc">Services</button>
          <div class="nv__panel" id="nv-svc"><ul>${services.map((s) => `<li><a href="/${s.slug}/"${current === s.slug ? ' aria-current="page"' : ''}>${esc(s.name)}</a></li>`).join('')}</ul></div></li>
        <li><a href="/about-us/"${current === 'about' ? ' aria-current="page"' : ''}>About us</a></li>
        <li><a href="/service-areas/"${current === 'areas' ? ' aria-current="page"' : ''}>Service areas</a></li>
        <li><a href="/contact-us/"${current === 'contact' ? ' aria-current="page"' : ''}>Contact</a></li>
      </ul>
    </nav>
    <a class="hd__tel" href="${site.phoneHref}">${esc(site.phone)}</a>
    <button class="btn btn--olive btn--sm hd__est" type="button" data-bar-toggle aria-expanded="true" aria-controls="est-bar">Estimate</button>
    <button class="hd__menu" type="button" data-menu aria-expanded="false" aria-controls="hd-m">Menu</button>
  </div>
  <div class="bar" id="est-bar" data-bar>
    <div class="wrap bar__in">
      <p class="bar__lbl"><b>Free estimate</b><span>We will follow up to book a visit.</span></p>
      ${leadForm({ id: 'bar-form', variant: 'bar', button: 'Send' })}
    </div>
  </div>
  <div class="hd-m" id="hd-m" hidden>
    <div class="wrap">
      <p class="hd-m__lbl">Services</p>
      <ul>${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul>
      <ul class="hd-m__pg"><li><a href="/">Home</a></li><li><a href="/about-us/">About us</a></li><li><a href="/service-areas/">Service areas</a></li><li><a href="/contact-us/">Contact</a></li></ul>
      <a class="btn btn--olive btn--block" href="${site.phoneHref}">Call ${esc(site.phone)}</a>
    </div>
  </div>
</header>`;
}

export function footer() {
  const m = site.map;
  const src = `https://maps.google.com/maps?q=${encodeURIComponent(m.query)}&ll=${m.lat},${m.lng}&z=${m.zoom}&output=embed`;
  return `<footer class="ft">
  <div class="wrap ft__top">
    <div class="ft__intro">
      <a class="mark mark--ft" href="/"><span class="mark__box" aria-hidden="true"></span><span class="mark__name">${esc(site.name)}</span></a>
      <p>Garage, home and business floor coatings for Prescott Valley and the Quad Cities area.</p>
      <p><a class="ft__tel" href="${site.phoneHref}">${esc(site.phone)}</a></p>
    </div>
    <div class="ft__map"><iframe title="Map of Prescott Valley, Arizona" src="${src}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
  </div>
  <div class="wrap ft__cols">
    <nav aria-label="Footer services"><p class="ft__h">Services</p><ul>${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a></li>`).join('')}</ul></nav>
    <nav aria-label="Footer pages"><p class="ft__h">Company</p><ul><li><a href="/about-us/">About us</a></li><li><a href="/service-areas/">Service areas</a></li><li><a href="/contact-us/">Contact</a></li><li><a href="/privacy-policy/">Privacy policy</a></li><li><a href="/sitemap.xml">Sitemap</a></li></ul></nav>
    <div><p class="ft__h">Areas</p><ul>${site.serviceAreas.map((a) => `<li>${esc(a.name)}</li>`).join('')}</ul></div>
  </div>
  <div class="wrap ft__base"><p>© <span data-year>2026</span> ${esc(site.name)}</p></div>
</footer>
<a class="mcall" href="${site.phoneHref}" aria-label="Call ${esc(site.phone)}">Call</a>`;
}
