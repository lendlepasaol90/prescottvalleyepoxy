import { site } from '../site.mjs';
import { esc, abs, imgUrl } from '../lib/html.mjs';
import { header, footer } from './parts.mjs';

export const ASSET_VERSION = Date.now().toString(36);

const orgSchema = () => ({
  '@type': 'HomeAndConstructionBusiness',
  '@id': abs('/#business'),
  name: site.name,
  url: abs('/'),
  areaServed: site.serviceAreas.map((a) => ({ '@type': 'Place', name: `${a.name}, AZ` })),
  ...(site.phoneVerified ? { telephone: site.phone } : {}),
  ...(site.email ? { email: site.email } : {}),
  knowsAbout: ['Epoxy flooring', 'Garage floor coatings', 'Polyaspartic coatings', 'Polyurea coatings', 'Metallic epoxy', 'Decorative flake flooring'],
});

export function layout({ path, title, description, body, current = '', image = 'garageTwo', schema = [], breadcrumbs, bodyClass = '' }) {
  const url = abs(path);
  const graph = [
    { '@type': 'WebSite', '@id': abs('/#website'), url: abs('/'), name: site.name, inLanguage: 'en-US' },
    orgSchema(),
    { '@type': 'WebPage', '@id': url + '#webpage', url, name: title, description, isPartOf: { '@id': abs('/#website') }, about: { '@id': abs('/#business') } },
    ...(breadcrumbs
      ? [{
          '@type': 'BreadcrumbList',
          itemListElement: breadcrumbs.map((b, i) => ({ '@type': 'ListItem', position: i + 1, name: b.name, item: abs(b.path) })),
        }]
      : []),
    ...schema,
  ];
  const ogImage = abs(imgUrl(image, 1200, 630));
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${url}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="theme-color" content="#f5f2ea">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${esc(site.name)}">
<meta property="og:locale" content="${site.locale}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${esc(ogImage)}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(ogImage)}">
<meta name="geo.region" content="US-AZ">
<meta name="geo.placename" content="${esc(site.cityLong)}, ${esc(site.region)}">
<!-- Favicon placeholder: add /favicon.ico and icon links here once the brand mark is ready. -->
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Manrope:wght@500..800&family=Source+Serif+4:ital,opsz,wght@0,8..60,400..600;1,8..60,400&display=swap">
<link rel="stylesheet" href="/assets/css/main.css?v=${ASSET_VERSION}">
<script type="application/ld+json">${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph })}</script>
</head>
<body class="${bodyClass}">
${header(current)}
<main id="main">
${body}
</main>
${footer()}
<script src="/assets/js/main.js?v=${ASSET_VERSION}" defer></script>
</body>
</html>
`;
}

export function crumbs(items) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${items
    .map((c, i) => (i === items.length - 1 ? `<li aria-current="page">${esc(c.name)}</li>` : `<li><a href="${c.path}">${esc(c.name)}</a></li>`))
    .join('')}</ol></nav>`;
}
