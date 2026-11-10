// Small, dependency-free helpers used by every template.
import { site, images } from '../site.mjs';

export const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Inline formatting: **bold**, *em*, [text](url)
export const inline = (s = '') =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*(?!\s)(.+?)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, t, u) => `<a href="${u}">${t}</a>`);

// Minimal block markdown: paragraphs, "- " lists, "1. " ordered lists, "### " sub-headings.
export function md(src = '') {
  const blocks = String(src).trim().split(/\n\s*\n/);
  return blocks
    .map((b) => {
      const lines = b.trim().split('\n').map((l) => l.trim());
      if (lines.every((l) => l.startsWith('- '))) {
        return `<ul>${lines.map((l) => `<li>${inline(l.slice(2))}</li>`).join('')}</ul>`;
      }
      if (lines.every((l) => /^\d+\.\s/.test(l))) {
        return `<ol>${lines.map((l) => `<li>${inline(l.replace(/^\d+\.\s/, ''))}</li>`).join('')}</ol>`;
      }
      if (lines[0].startsWith('## ')) {
        const rest = lines.slice(1).join(' ');
        return `<h2>${inline(lines[0].slice(3))}</h2>${rest ? `<p>${inline(rest)}</p>` : ''}`;
      }
      if (lines[0].startsWith('### ')) {
        const rest = lines.slice(1).join(' ');
        return `<h3>${inline(lines[0].slice(4))}</h3>${rest ? `<p>${inline(rest)}</p>` : ''}`;
      }
      return `<p>${inline(lines.join(' '))}</p>`;
    })
    .join('\n');
}

// Self-hosted images: each entry lists the widths generated as /assets/img/<file>-<width>.webp
const pickW = (im, w) => im.widths.find((x) => x >= w) ?? im.widths[im.widths.length - 1];
const localPath = (im, w) => `/assets/img/${im.file}-${pickW(im, w)}.webp`;

export const imgUrl = (key, w = 1200, h) => {
  const im = typeof key === 'string' ? images[key] : key;
  if (!im) throw new Error(`Unknown image: ${key}`);
  if (im.file) return localPath(im, w);
  if (im.src) return im.src;
  return `https://images.unsplash.com/${im.id}?auto=format&fit=crop&w=${w}${h ? `&h=${h}` : ''}&q=70`;
};

// Responsive <img>. `ratio` (w/h) crops consistently across widths.
// Page-level de-duplication: between beginDedupe() and endDedupe(), a photo that has already
// appeared (or is reserved for a captioned spot) is swapped for an unused photo from the same group.
let dd = null;
export const beginDedupe = (reserve = []) => { dd = { used: new Set(), reserve: new Set(reserve) }; };
export const endDedupe = () => { dd = null; };
function resolveKey(key, keep) {
  if (!dd) return key;
  if (keep || (!dd.used.has(key) && !dd.reserve.has(key))) { dd.used.add(key); return key; }
  const g = images[key]?.group;
  const alt = g && Object.keys(images).find((k) => images[k].group === g && !dd.used.has(k) && !dd.reserve.has(k));
  if (alt) { dd.used.add(alt); return alt; }
  return key;
}

export function img(key, { sizes = '100vw', widths = [480, 800, 1200, 1600], ratio, cls = '', eager = false, alt, keep = false } = {}) {
  key = resolveKey(key, keep);
  const im = images[key];
  if (!im) throw new Error(`Unknown image: ${key}`);
  if (im.file) {
    const ws = [...new Set(widths.map((w) => pickW(im, w)))];
    const mid = pickW(im, widths[Math.min(2, widths.length - 1)]);
    const hh = ratio ? Math.round(mid / ratio) : Math.round((mid * im.h) / im.w);
    return `<img src="${localPath(im, mid)}" srcset="${ws.map((w) => `${localPath(im, w)} ${w}w`).join(', ')}" sizes="${sizes}" alt="${esc(alt ?? im.alt)}" width="${mid}" height="${hh}"${
      ratio ? ` style="aspect-ratio:${+ratio.toFixed(4)};object-fit:cover"` : ''
    } ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
  }
  const h = (w) => (ratio ? Math.round(w / ratio) : undefined);
  const srcset = widths.map((w) => `${imgUrl(key, w, h(w))} ${w}w`).join(', ');
  const mid = widths[Math.min(2, widths.length - 1)];
  return `<img src="${imgUrl(key, mid, h(mid))}" srcset="${srcset}" sizes="${sizes}" alt="${esc(alt ?? im.alt)}"${
    ratio ? ` width="${mid}" height="${h(mid)}"` : ''
  } ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"${cls ? ` class="${cls}"` : ''}>`;
}

export const abs = (path = '/') => site.domain + path;

export const wordCount = (html) =>
  html
    .replace(/<script[\s\S]*?<\/script>/g, ' ')
    .replace(/<style[\s\S]*?<\/style>/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z#0-9]+;/gi, ' ')
    .split(/\s+/)
    .filter((w) => /[a-z0-9]/i.test(w)).length;
