// Quality checks for the built site: node scripts/check.mjs [other-site/public ...]
// - word counts (main content), title/description uniqueness and length
// - one H1 per page, no skipped heading levels, alt text on every image
// - internal links and assets resolve, canonical present
// - repeated paragraphs inside this site and against any other built sites passed as args
import { readFile, readdir, stat } from 'node:fs/promises';
import { join, relative } from 'node:path';

const root = new URL('../public/', import.meta.url).pathname;
const others = process.argv.slice(2);
const MIN = { home: 2500, service: 1500 };

async function walk(dir) {
  const out = [];
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) out.push(...(await walk(p)));
    else if (e.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const text = (h) => h.replace(/<script[\s\S]*?<\/script>/g, ' ').replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ');
const words = (h) => text(h).split(/\s+/).filter((w) => /[a-z0-9]/i.test(w)).length;
const main = (h) => (h.match(/<main[\s\S]*?<\/main>/) || [''])[0];
// Unique page content only: strip forms, sidebars, navs and the related-links strip.
const content = (h) => main(h).replace(/<form[\s\S]*?<\/form>/g, ' ').replace(/<aside[\s\S]*?<\/aside>/g, ' ').replace(/<nav[\s\S]*?<\/nav>/g, ' ').replace(/<div class="related">[\s\S]*?<\/div>\s*<\/div>\s*<\/section>/g, ' ');
const paras = (h) => [...content(h).matchAll(/<(p|li|dd|td)[^>]*>([\s\S]*?)<\/\1>/g)].map((m) => text(m[2]).replace(/\s+/g, ' ').trim().toLowerCase()).filter((p) => p.split(' ').length >= 12);
const exists = async (p) => stat(p).then(() => true, () => false);

let fail = 0;
const warn = (m) => { console.log('  ✗ ' + m); fail++; };
const files = await walk(root);
const titles = new Map(), descs = new Map(), paraIndex = new Map();
const report = [];

for (const f of files) {
  const rel = '/' + relative(root, f).replace(/index\.html$/, '');
  const h = await readFile(f, 'utf8');
  const is404 = rel === '/404.html';
  const title = (h.match(/<title>([^<]*)<\/title>/) || [])[1] || '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] || '';
  const wc = words(content(h));
  const type = rel === '/' ? 'home' : h.includes('"@type":"Service"') ? 'service' : 'page';
  report.push({ rel, wc, type });
  if (MIN[type] && wc < MIN[type]) warn(`${rel}: ${wc} words in main (< ${MIN[type]})`);
  if (!is404) {
    if (titles.has(title)) warn(`${rel}: duplicate title with ${titles.get(title)}`); else titles.set(title, rel);
    if (descs.has(desc)) warn(`${rel}: duplicate description`); else descs.set(desc, rel);
    if (title.length > 70) warn(`${rel}: title ${title.length} chars`);
    if (desc.length < 110 || desc.length > 170) warn(`${rel}: description ${desc.length} chars`);
    if (!h.includes('rel="canonical"')) warn(`${rel}: no canonical`);
  }
  const h1s = (h.match(/<h1[\s>]/g) || []).length;
  if (h1s !== 1) warn(`${rel}: ${h1s} h1 tags`);
  const levels = [...main(h).matchAll(/<h([1-6])[\s>]/g)].map((m) => +m[1]);
  levels.forEach((l, i) => { if (i && l > levels[i - 1] + 1) warn(`${rel}: heading jumps h${levels[i - 1]}→h${l}`); });
  for (const m of h.matchAll(/<img\b[^>]*>/g)) if (!/\salt="/.test(m[0])) warn(`${rel}: img without alt`);
  for (const m of h.matchAll(/(?:href|src)="(\/[^"#?]*)/g)) {
    const u = m[1];
    const target = u.endsWith('/') ? join(root, u, 'index.html') : join(root, u);
    if (!(await exists(target))) warn(`${rel}: broken link ${u}`);
  }
  for (const m of h.matchAll(/href="#([^"]+)"/g)) if (!h.includes(`id="${m[1]}"`) && m[1] !== 'main') warn(`${rel}: missing anchor #${m[1]}`);
  if (!h.includes('id="main"')) warn(`${rel}: no #main`);
  if (!is404) for (const p of new Set(paras(h))) { if (!paraIndex.has(p)) paraIndex.set(p, []); paraIndex.get(p).push(rel); }
}

for (const [p, where] of paraIndex) if (where.length > 1) warn(`repeated text on ${where.join(', ')}: "${p.slice(0, 70)}…"`);

for (const other of others) {
  const ofiles = await walk(other);
  const theirs = new Set();
  for (const f of ofiles) (paras(await readFile(f, 'utf8'))).forEach((p) => theirs.add(p));
  const shingles = (p) => { const w = p.split(' '); const s = new Set(); for (let i = 0; i + 8 <= w.length; i++) s.add(w.slice(i, i + 8).join(' ')); return s; };
  const theirShingles = new Set(); theirs.forEach((p) => shingles(p).forEach((s) => theirShingles.add(s)));
  let hits = 0;
  for (const p of paraIndex.keys()) {
    const sh = [...shingles(p)];
    const overlap = sh.filter((s) => theirShingles.has(s)).length;
    if (sh.length && overlap / sh.length > 0.2) { hits++; if (hits <= (process.env.FULL ? 999 : 15)) warn(`overlap with ${other}: "${process.env.FULL ? p : p.slice(0, 80) + "…"}"`); }
  }
  console.log(`  cross-check vs ${other}: ${hits} overlapping passages`);
}

console.log('\nWord counts (main content):');
report.sort((a, b) => a.rel.localeCompare(b.rel)).forEach((r) => console.log(`  ${String(r.wc).padStart(5)}  ${r.type.padEnd(7)} ${r.rel}`));
console.log(fail ? `\n${fail} issue(s) found` : '\nAll checks passed');
process.exit(fail ? 1 : 0);
