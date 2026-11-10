import { site } from '../site.mjs';
import { esc, md, inline, img, abs } from '../lib/html.mjs';
import { layout, crumbs } from './layout.mjs';
import { leadForm, phoneLink } from './parts.mjs';
import { bySlug } from '../content/services/index.mjs';

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function row(b) {
  const id = b.id || slugify(b.heading);
  let inner = '';
  switch (b.kind) {
    case 'split':
      inner = `${md(b.body)}<figure class="wipe">${img(b.image, { sizes: '(max-width: 980px) 92vw, 700px', widths: [500, 900, 1200], ratio: 16 / 9 })}</figure>`;
      break;
    case 'options':
      inner = `${md(b.body || '')}<div class="optlist">${b.items.map((o) => `<article><h3>${esc(o.name)}</h3><p>${inline(o.body)}</p></article>`).join('')}</div>${b.after ? `<div style="margin-top:1.25rem">${md(b.after)}</div>` : ''}`;
      break;
    case 'uses':
      inner = `${md(b.body || '')}<ul class="uselist">${b.items.map((u) => `<li><b>${esc(u.name)}</b><span>${inline(u.body)}</span></li>`).join('')}</ul>`;
      break;
    case 'steps':
      inner = `${md(b.body || '')}<ol class="stepl">${b.items.map((s) => `<li><div><h3>${esc(s.name)}</h3><p>${inline(s.body)}</p></div></li>`).join('')}</ol>`;
      break;
    case 'callout':
      inner = `<div class="boxnote">${md(b.body)}</div>`;
      break;
    case 'local':
      inner = `<div class="vnote"><div class="vnote__bg" aria-hidden="true">${img(b.image || 'valley', { widths: [700, 1100], alt: '' })}</div>${md(b.body)}</div>`;
      break;
    case 'table':
      inner = `${md(b.body || '')}<div class="tblx"><table class="tbl"><thead><tr>${b.cols.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>${b.after ? `<div style="margin-top:1.25rem">${md(b.after)}</div>` : ''}`;
      break;
    default:
      inner = md(b.body);
  }
  return `<section class="ed in" aria-labelledby="${id}"><h2 id="${id}">${esc(b.heading)}</h2><div class="ed__body">${inner}</div></section>`;
}

export function renderService(s) {
  const path = `/${s.slug}/`;
  const rel = (s.related || []).map((r) => bySlug[r]).filter(Boolean);
  const body = `
<section class="sh">
  <div class="wrap">
    ${crumbs([{ name: 'Home', path: '/' }, { name: s.name, path }])}
    <div class="sh__grid">
      <div class="in vis">
        <h1>${esc(s.h1)}</h1>
        <p class="big dim">${inline(s.lede)}</p>
        <div class="sh__btns"><a class="btn btn--olive" href="#estimate">Book a free estimate</a><a class="btn btn--plain" href="${site.phoneHref}">${esc(site.phone)}</a></div>
      </div>
      <div class="sh__pic"><div>${img(s.image, { eager: true, sizes: '(max-width: 980px) 92vw, 520px', widths: [480, 800, 1100], ratio: 1.25 })}</div>${s.chips ? `<div class="sh__box"><ul>${s.chips.map((c) => `<li>${esc(c)}</li>`).join('')}</ul></div>` : ''}</div>
    </div>
  </div>
</section>
<nav class="toc-row" aria-label="On this page"><div class="wrap"><ol>${s.blocks.map((b) => `<li><a href="#${b.id || slugify(b.heading)}">${esc(b.toc || b.heading)}</a></li>`).join('')}<li><a href="#faq">Questions</a></li></ol></div></nav>
<div class="wrap">
  <section class="ed ed--open" aria-label="Introduction"><p class="h2-spacer" aria-hidden="true"></p><div class="ed__body">${md(s.intro)}</div></section>
  ${s.blocks.map(row).join('\n')}
</div>
<section class="s s--sage" id="faq" aria-labelledby="faq-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="faq-h">${esc(s.faqHeading)}</h2><p>Straight answers. If yours is missing, call ${phoneLink()}.</p></div>
    <div class="qa2">${s.faqs.map((f) => `<details><summary>${esc(f.q)}</summary><div class="qa__a">${md(f.a)}</div></details>`).join('')}</div>
  </div>
</section>
${rel.length ? `<section class="s s--sm" aria-labelledby="rel-h"><div class="wrap"><h2 id="rel-h" class="in" style="font-size:1.6rem">${esc(s.relatedHeading || 'Related services')}</h2>
<div class="rel-rows">${rel.map((r) => `<a href="/${r.slug}/"><figure>${img(r.image, { widths: [240, 400], sizes: '120px', ratio: 1.6, alt: '' })}</figure><div><b>${esc(r.name)}</b><span>${esc(r.tagline)}</span></div><i aria-hidden="true">→</i></a>`).join('')}</div></div></section>` : ''}
<section class="s end" id="estimate" aria-labelledby="est-h">
  <div class="end__bg" aria-hidden="true">${img(s.closerImage || 'grassSunset', { widths: [700, 1100], alt: '' })}</div>
  <div class="wrap end__grid">
    <div class="in"><h2 id="est-h">${esc(s.cta.heading)}</h2>${md(s.cta.body)}<ul class="end__facts"><li><span>Phone</span>${phoneLink()}</li><li><span>Estimates</span><span>Free, on site, in writing</span></li><li><span>Area</span><a href="/service-areas/">Prescott Valley &amp; Quad Cities</a></li></ul></div>
    <div class="end__card in w1">${leadForm({ id: `${s.slug}-form`, heading: 'Request an estimate', withMessage: true, preset: s.formPreset })}</div>
  </div>
</section>`;
  const schema = [
    { '@type': 'Service', '@id': abs(path) + '#service', name: s.name, serviceType: s.serviceType, description: s.description, provider: { '@id': abs('/#business') }, areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: `${a.name}, AZ` })), url: abs(path) },
    { '@type': 'FAQPage', mainEntity: s.faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/\*\*/g, '') } })) },
  ];
  return layout({ path, title: s.title, description: s.description, body, current: s.slug, image: s.image, schema, breadcrumbs: [{ name: 'Home', path: '/' }, { name: s.name, path }] });
}
