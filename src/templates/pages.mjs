import { site } from '../site.mjs';
import { esc, md, img } from '../lib/html.mjs';
import { layout, crumbs } from './layout.mjs';
import { leadForm, phoneLink } from './parts.mjs';
import { services } from '../content/services/index.mjs';

const intro = ({ title, lede, image, trail }) => `<section class="sh"><div class="wrap">${crumbs(trail)}<div class="sh__grid"><div><h1>${esc(title)}</h1><p class="big dim">${lede}</p></div><div class="sh__pic"><div>${img(image, { eager: true, sizes: '(max-width: 980px) 92vw, 520px', widths: [480, 800, 1100], ratio: 1.25, alt: '' })}</div></div></div></div></section>`;
const card = (id) => `<aside class="sticky-card"><div class="end__card">${leadForm({ id, heading: 'Free estimate', intro: 'We will follow up to set a time that works.' })}</div></aside>`;

export function renderAbout() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'About us', path: '/about-us/' }];
  const body = `${intro({ title: 'About Prescott Valley Epoxy', lede: 'A local floor coating team that puts the concrete first, explains things plainly and leaves your home the way we found it.', image: 'dirtRoad', trail })}
<section class="s s--sm"><div class="wrap pg2"><div class="in">
${md(`Our work rests on one idea: a coating is only as good as its bond to the concrete underneath. Most floors that peel, flake or bubble were never properly attached to the slab. They were rolled over sealer, dust or damp concrete and left to fail.

So we spend our time where it matters. We test the slab, remove builder sealers and old coatings with diamond grinding, repair cracks and winter damage, and only then choose and install a system suited to how you use the space.`)}
<h2>What we stand by</h2>
<div class="pv">
  <div><b>Prep on every job</b><span>Grinding and repair are never optional extras.</span></div>
  <div><b>Plain-language advice</b><span>We explain what we see and why we recommend a system.</span></div>
  <div><b>Written estimates</b><span>Clear line items so you can compare and decide calmly.</span></div>
  <div><b>Good neighbors</b><span>Considerate parking, contained dust and a clean site.</span></div>
</div>
${md(`## The kinds of projects we take on

Garages are the bulk of our work, from newer two-car garages in master-planned communities to oversized shops on acreage in Dewey-Humboldt and Chino Valley. We also coat laundry rooms, basements, casitas, home gyms and patios, and we work with local businesses on showrooms, service bays, offices, restaurants and warehouse space.

## What to expect

Call or fill in the estimate form. We will arrange a time to see the floor, measure, check for sealers and moisture, and show you samples. Afterward you get a written estimate. There is no pressure to decide that day, and we are happy to answer questions as you think it over.`)}
<p style="margin-top:1.5rem"><a class="btn btn--olive" href="/contact-us/">Contact us</a> <a class="btn btn--plain" href="/service-areas/">Where we work</a></p>
</div>${card('about-form')}</div></section>`;
  return layout({ path: '/about-us/', title: 'About Us | Prescott Valley Epoxy', description: 'Learn how Prescott Valley Epoxy approaches floor coatings: real slab preparation, plain-language advice, written estimates and respect for your home.', body, current: 'about', image: 'dirtRoad', breadcrumbs: trail });
}

const towns = {
  'Prescott Valley': 'Our home base. We work across the town, from established neighborhoods near the town center to newer communities like StoneRidge, Pronghorn Ranch, Viewpoint and Granville.',
  'Dewey-Humboldt': 'Larger lots, detached garages, barns and workshops along Highway 69, including homes around the Prescott Country Club.',
  Prescott: 'Garages, homes and businesses just over Glassford Hill. Older Prescott homes often have slabs that need extra repair before coating.',
  'Chino Valley': 'Rural properties with shops and outbuildings, plus new construction on the north side of the Quad Cities.',
  Mayer: 'Homes and outbuildings southeast of Prescott Valley, where garages often double as workshops.',
  'Cordes Lakes': 'Residential garages, patios and storage off I-17.',
  Paulden: 'Ranch properties and detached garages north of Chino Valley, often with heavy equipment and trailers.',
};

export function renderAreas() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Service areas', path: '/service-areas/' }];
  const body = `${intro({ title: 'Where we work', lede: 'Prescott Valley and the surrounding Quad Cities communities, with commercial projects further afield by arrangement.', image: 'grassSunset', trail })}
<section class="s s--sm"><div class="wrap">
  <div class="col in">${md(`Floor coating projects run on tight schedules. Coatings need the right temperature, crews need early starts in summer and projects sometimes shift when weather changes. Working close to home lets us stay flexible and reliable.

These are the areas we serve most often. If you are not on the list, call anyway. We will tell you honestly whether we can help.`)}</div>
  <div class="places">${site.serviceAreas.map((a) => `<article class="in"><h2>${esc(a.name)}</h2><p>${esc(towns[a.name] || a.note)}</p></article>`).join('')}</div>
  <div class="col in" style="margin-top:3rem"><h2>Services available throughout the area</h2><ul>${services.map((s) => `<li><a href="/${s.slug}/">${esc(s.name)}</a>: ${esc(s.tagline)}</li>`).join('')}</ul></div>
</div></section>
<section class="s end" id="estimate"><div class="wrap end__grid"><div><h2>Not sure you are in range?</h2><p>Send your details and we will confirm coverage when we follow up, or call ${phoneLink()}.</p></div><div class="end__card">${leadForm({ id: 'areas-form', heading: 'Request an estimate', withMessage: true })}</div></div></section>`;
  return layout({ path: '/service-areas/', title: 'Service Areas | Prescott Valley Epoxy & Quad Cities', description: 'Floor coatings in Prescott Valley, Dewey-Humboldt, Prescott, Chino Valley, Mayer, Cordes Lakes and Paulden. Garages, homes and businesses.', body, current: 'areas', image: 'grassSunset', breadcrumbs: trail });
}

export function renderContact() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Contact', path: '/contact-us/' }];
  const body = `${intro({ title: 'Contact us', lede: 'Request a free estimate or ask a question. We will get back to you to talk it through.', image: 'valley', trail })}
<section class="s s--sm" id="estimate"><div class="wrap pg2">
  <div class="in">
    <h2>Before you reach out</h2>
    <p>These details help us prepare for your estimate visit:</p>
    <ul><li>The space you want coated and its rough size</li><li>The age of the home, and whether the garage has ever been sealed or painted</li><li>Any cracks, flaking or stains</li><li>Your timing and any HOA considerations</li></ul>
    <p><strong>Phone:</strong> ${phoneLink()}${site.email ? `<br><strong>Email:</strong> <a href="mailto:${esc(site.email)}">${esc(site.email)}</a>` : ''}</p>
    <h3>Next steps</h3>
    <ol><li>We reach out to schedule a visit.</li><li>We inspect the slab, measure and bring samples.</li><li>You receive a written, itemized estimate.</li></ol>
  </div>
  <div class="end__card in w1">${leadForm({ id: 'contact-form', heading: 'Request your free estimate', withMessage: true })}</div>
</div></section>`;
  return layout({ path: '/contact-us/', title: 'Contact Us | Free Floor Estimates in Prescott Valley', description: 'Request a free, in-person estimate for garage, interior, patio or commercial floor coatings in Prescott Valley and the Quad Cities area.', body, current: 'contact', image: 'valley', breadcrumbs: trail });
}

export function renderPrivacy() {
  const trail = [{ name: 'Home', path: '/' }, { name: 'Privacy policy', path: '/privacy-policy/' }];
  const body = `${intro({ title: 'Privacy policy', lede: 'How information sent through this website is collected and used.', image: 'grassPines', trail })}
<section class="s s--sm"><div class="wrap col">${md(`## Information we collect

When you submit a form, we receive your name, phone number, email, the type of floor and any message you add, along with the page you submitted from. We do not use advertising or tracking cookies on this site.

## How it is used

Your details are used to reply to you, book an estimate and keep in touch about the job. They are never sold, rented or handed to anyone for advertising.

## Service providers

Form submissions may be delivered to us by an email or automation service. Maps on this site come from Google Maps, which may record basic technical information such as IP addresses under their own policies.

## Your rights

You can ask us to update or delete information you have sent by contacting us through our [contact page](/contact-us/).

## Changes to this policy

If this policy changes, the updated text will replace what you see on this page.`)}</div></section>`;
  return layout({ path: '/privacy-policy/', title: 'Privacy Policy | Prescott Valley Epoxy', description: 'How Prescott Valley Epoxy collects, uses and protects information submitted through the estimate and contact forms on this website.', body, breadcrumbs: trail });
}

export function render404() {
  const body = `<section class="oops"><div class="wrap col"><h1>Page not found</h1><p class="big dim">That address does not match any page on this site. These links will help you find your way.</p><p><a class="btn btn--olive" href="/">Homepage</a> <a class="btn btn--plain" href="/garage-floor-coatings/">Garage coatings</a> <a class="btn btn--plain" href="/contact-us/">Contact</a></p></div></section>`;
  return layout({ path: '/404.html', title: 'Page not found | Prescott Valley Epoxy', description: 'The page you were looking for could not be found.', body }).replace('<meta name="robots" content="index, follow, max-image-preview:large">', '<meta name="robots" content="noindex">');
}
