// Static site build: node build.mjs → ./public
import { mkdir, writeFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { site } from './src/site.mjs';
import { services } from './src/content/services/index.mjs';
import { renderHome } from './src/templates/home.mjs';
import { renderService } from './src/templates/service.mjs';
import { renderAbout, renderAreas, renderContact, renderPrivacy, render404 } from './src/templates/pages.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const out = join(root, 'public');
const today = new Date().toISOString().slice(0, 10);

const pages = [
  { path: '/', html: renderHome(), priority: '1.0' },
  ...services.map((s) => ({ path: `/${s.slug}/`, html: renderService(s), priority: '0.9' })),
  { path: '/about-us/', html: renderAbout(), priority: '0.6' },
  { path: '/service-areas/', html: renderAreas(), priority: '0.7' },
  { path: '/contact-us/', html: renderContact(), priority: '0.7' },
  { path: '/privacy-policy/', html: renderPrivacy(), priority: '0.2' },
];

await rm(out, { recursive: true, force: true });
await mkdir(out, { recursive: true });
await cp(join(root, 'src/assets'), join(out, 'assets'), { recursive: true });

for (const p of pages) {
  const file = join(out, p.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, p.html);
}
await writeFile(join(out, '404.html'), render404());

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((p) => `  <url><loc>${site.domain}${p.path}</loc><lastmod>${today}</lastmod><priority>${p.priority}</priority></url>`).join('\n')}
</urlset>
`;
await writeFile(join(out, 'sitemap.xml'), sitemap);
await writeFile(join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${site.domain}/sitemap.xml\n`);
await writeFile(
  join(out, '_headers'),
  `/*
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
  X-Frame-Options: SAMEORIGIN

/assets/*
  Cache-Control: public, max-age=31536000, immutable
`,
);

console.log(`Built ${pages.length} pages + 404 into ./public`);
