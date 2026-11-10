import { site } from '../site.mjs';
import { esc, md, img, beginDedupe, endDedupe } from '../lib/html.mjs';
import { layout } from './layout.mjs';
import { leadForm, phoneLink } from './parts.mjs';
import { services } from '../content/services/index.mjs';

const faqGroups = [
  {
    id: 'garage', label: 'Garages',
    items: [
      { q: 'My home is only a few years old. Does the garage still need grinding?', a: 'Yes. Builders often apply a curing compound or sealer to new garage slabs, and the surface layer of fresh concrete is weak and powdery. Both stop a coating from bonding properly. Diamond grinding removes them and opens the concrete so the coating can grip.' },
      { q: 'What causes the white haze and flaking near my garage door?', a: 'Usually winter. Snowmelt and deicer from the roads drip off vehicles, soak into the concrete and freeze overnight. Over a few seasons, that breaks down the surface. A sealed, coated floor keeps water and salt out of the slab.' },
      { q: 'Can I still park in the garage during the project?', a: 'Not while we work, but most garages are back in use quickly. With a fast-curing topcoat, many are ready for foot traffic the same day and vehicles within a day or two, depending on temperature.' },
    ],
  },
  {
    id: 'cost', label: 'Cost and timing',
    items: [
      { q: 'What does a garage floor coating cost in Prescott Valley?', a: 'Every garage prices differently. A recent build with a clean slab is a simpler job than an older three-car garage with paint to strip and winter damage to fix. We come out, measure and put two or three options in writing so you can choose.' },
      { q: 'What is the best time of year for a floor project here?', a: 'Spring and fall are ideal: mild days, cool nights and dry air. Summer works well with early starts. Winter is fine for heated garages and interiors; unheated spaces may need temporary heat or a cold-tolerant system.' },
      { q: 'Do you charge for estimates?', a: 'No. Estimates are free, done in person and given in writing, with no obligation.' },
      { q: 'How far out are you booking?', a: 'It varies by season. The best way to find out is to request an estimate. When we follow up, we will give you a realistic install window.' },
    ],
  },
  {
    id: 'care', label: 'Living with it',
    items: [
      { q: 'How do I clean a coated floor?', a: 'Sweep or dust mop regularly, and mop with warm water and a pH-neutral cleaner when needed. Avoid citrus degreasers and harsh solvents. In winter, squeegee meltwater out of the garage and rinse off deicer residue now and then.' },
      { q: 'Will it be slippery?', a: 'We add slip-resistant texture to garage and entry floors as standard. Flake floors also have natural grip. Interior floors can be given a fine texture where needed.' },
      { q: 'Does my HOA need to approve it?', a: 'Interior garage floors usually do not need approval, but anything visible from the street, such as driveways or front walks, often does. Check your community guidelines. We can provide product information for any submission.' },
    ],
  },
];

export function renderHome() {
  beginDedupe(['autoShop', 'garageBright', 'garageSport', 'garageTwo', 'housePool', 'laundry', 'livingRoom', 'livingWindows', 'vintageGarage']);
  const ledger = services
    .map((s, i) => `<details${i === 0 ? ' open' : ''}>
      <summary><div><h3>${esc(s.name)}</h3><span>${esc(s.tagline)}</span></div><i aria-hidden="true">+</i></summary>
      <div class="ledger__body"><div><p>${esc(s.homeBlurb)}</p><a class="more" href="/${s.slug}/">Read about ${esc(s.name.toLowerCase())}</a></div><div class="ledger__pic">${img(s.image, { widths: [300, 520], sizes: '260px', ratio: 4 / 3, alt: '' })}</div></div>
    </details>`)
    .join('');
  const allFaqs = faqGroups.flatMap((g) => g.items);

  const body = `
<section class="hero" aria-labelledby="hero-h">
  <div class="wrap">
    <div class="hero__top">
      <h1 id="hero-h" class="in vis">Floor coatings for Prescott Valley homes, garages and businesses</h1>
      <div class="hero__side in vis w1">
        <p class="big dim">Epoxy, flake, metallic and polyaspartic floors installed over properly prepared concrete. Built for four real seasons at five thousand feet.</p>
        <div class="hero__btns"><button class="btn btn--olive" type="button" data-open-bar>Get a free estimate</button><a class="btn btn--plain" href="#services">See services</a></div>
      </div>
    </div>
    <div class="hero__grid">
      <div class="hero__img wipe">${img('garageTwo', { keep: true, eager: true, sizes: '(max-width: 980px) 92vw, 780px', widths: [600, 900, 1300, 1600], ratio: 16 / 8.5 })}</div>
      <div class="hero__stack">
        <div class="fact in"><b><span data-count="5100">5,100</span> ft</b><span class="fact__lbl">Roughly the valley's elevation: warm summers, freezing winter nights and real snow some years.</span></div>
        <div class="fact in w1"><b><span data-count="9">9</span> systems</b><span class="fact__lbl">From garage flake floors to commercial and warehouse coatings.</span></div>
        <div class="fact fact--img in w2">${img('valley', { sizes: '(max-width: 980px) 92vw, 380px', widths: [400, 700], ratio: 4 / 3, alt: 'Grassland and mountains near Prescott Valley' })}</div>
      </div>
    </div>
  </div>
</section>

<section class="s" aria-labelledby="intro-h">
  <div class="wrap intro">
    <h2 id="intro-h" class="intro__h in">A floor company that starts with the slab</h2>
    <div class="intro__body col in w1">
      <p>Prescott Valley has grown fast, and a lot of its homes are relatively new. That is good news for floor coatings: newer slabs are often in great shape. But it also means many garages still have the builder's sealer on them, and many owners have already tried a quick coating that did not last through the first winter.</p>
      <p>We do this work differently. Every project starts with an honest look at the concrete. We check for curing compounds, sealers, moisture, cracks and winter damage, then grind and repair the slab before any coating goes down. Only then do we choose a system, and we choose it for how you actually use the space.</p>
      <p>That might be a <a href="/garage-floor-coatings/">garage floor coating</a> with a decorative flake finish, a seamless <a href="/residential-epoxy-flooring/">residential floor</a> for a basement, laundry room or casita, a <a href="/metallic-epoxy-flooring/">metallic epoxy</a> feature floor, a fast-curing <a href="/polyaspartic-floor-coatings/">polyaspartic</a> system, a tough <a href="/polyurea-floor-coatings/">polyurea</a> base for a workshop, a textured <a href="/patio-concrete-coatings/">patio coating</a>, or a durable floor for a <a href="/commercial-epoxy-flooring/">business</a> or <a href="/warehouse-floor-coatings/">warehouse</a>. Estimates are free, done in person and always in writing.</p>
    </div>
  </div>
</section>

<section class="s s--sm" aria-labelledby="age-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="age-h">New build or older home: what changes</h2><p>The approach depends on the age and history of the slab.</p></div>
    <div class="bens">
      <div class="in"><h3>Homes built in the last few years</h3><p>The slab is usually in good shape, but builder sealers and a weak, powdery top layer must be ground off. We also confirm the concrete has cured long enough before coating.</p></div>
      <div class="in w1"><h3>Homes ten to twenty years old</h3><p>Expect some winter flaking near the door, oil stains and hairline cracks. Grinding and repairs take a little longer, and a flexible base may be worth it.</p></div>
      <div class="in w2"><h3>Older homes and previous coatings</h3><p>Paint, failed kits and old sealers all come off first. Cracks and spalls are repaired so the new floor starts on a sound surface.</p></div>
    </div>
  </div>
</section>

<section class="s s--paper" id="services" aria-labelledby="svc-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="svc-h">Our flooring services</h2><p>Open any service for a quick summary, or follow the link for the full details, finishes and FAQs.</p></div>
    <div class="ledger">${ledger}</div>
  </div>
</section>

<section class="s" aria-labelledby="gar-h">
  <div class="wrap gar">
    <div class="gar__pic wipe">${img('garageCouple', { sizes: '(max-width: 980px) 92vw, 700px', widths: [600, 900, 1200], ratio: 4 / 3.3 })}</div>
    <div class="gar__card in">
      <h2 id="gar-h">Garage epoxy flooring that survives a valley winter</h2>
      <p>In Prescott Valley, the garage floor takes the hardest hits. Snow and slush ride in on wheels a few times each winter, bringing deicer and grit with them. Summer brings hot tires and strong afternoon sun through the door. Spring brings wind and dust. Bare concrete slowly stains, pits and flakes under all of it.</p>
      <p>Our garage systems start with diamond grinding to remove the builder's sealer and open the concrete, followed by crack repair. Then comes a bonding base coat, a decorative flake broadcast and a UV-stable, slip-resistant topcoat.</p>
      <ul class="list-c"><li>Removes builder sealers that block adhesion</li><li>Repairs winter flaking and pitting before coating</li><li>Texture for safe footing when snowmelt comes in</li></ul>
      <a class="more" href="/garage-floor-coatings/">Garage floor coatings</a>
    </div>
  </div>
</section>

<section class="s s--sm" aria-labelledby="res-h">
  <div class="wrap">
    <div class="lead-in in">
      <h2 id="res-h">Residential epoxy flooring inside the house</h2>
      <p class="dim">Coated concrete is not just for garages. In many Prescott Valley homes, the rooms that work hardest sit right on the slab, and a seamless floor makes them easier to keep clean and nicer to live in. See our <a href="/residential-epoxy-flooring/">residential epoxy flooring</a> page for details on finishes and moisture testing.</p>
    </div>
    <div class="rooms">
      <article class="room in"><figure>${img('laundryWindow', { sizes: '(max-width: 640px) 92vw, 380px', widths: [400, 700], ratio: 4 / 3 })}</figure><div><h3>Laundry and mudrooms</h3><p>Water, detergent and muddy boots, handled by one seamless, washable surface.</p></div></article>
      <article class="room in w1"><figure>${img('livingRoom', { sizes: '(max-width: 640px) 92vw, 380px', widths: [400, 700], ratio: 4 / 3 })}</figure><div><h3>Living and family rooms</h3><p>Satin or metallic finishes as an alternative to tile or carpet over the slab.</p></div></article>
      <article class="room in w2"><figure>${img('dining', { sizes: '(max-width: 640px) 92vw, 380px', widths: [400, 700], ratio: 4 / 3 })}</figure><div><h3>Casitas and guest spaces</h3><p>Low-maintenance floors for rooms that host family and visitors.</p></div></article>
    </div>
  </div>
</section>

<section class="s s--olive" aria-labelledby="biz-h">
  <div class="wrap">
    <div class="lead-in in"><h2 id="biz-h">Commercial and industrial flooring</h2><p>Prescott Valley's business corridors along Glassford Hill Road and Highway 69 keep growing, and so does demand for floors that are tough, clean and quick to install.</p></div>
    <div class="biz">
      <div class="in"><h3>Commercial epoxy flooring</h3><p>Seamless resin floors for retail stores, restaurants, medical and dental offices, salons, fitness studios and auto showrooms. We plan around your hours, phase larger jobs and add texture where floors get wet.</p><ul><li>Retail and showrooms</li><li>Restaurants and kitchens</li><li>Clinics and offices</li><li>Gyms and studios</li></ul><a class="more" href="/commercial-epoxy-flooring/">Commercial floors</a></div>
      <div class="in w1"><h3>Industrial flooring solutions</h3><p>High-build epoxy and polyurea for warehouses, auto service bays, fabrication shops and storage buildings across the valley. Joint repair, dust-proofing and safety striping included where you need them.</p><ul><li>Warehouses and storage</li><li>Auto and fleet service</li><li>Fabrication shops</li><li>Lane and zone striping</li></ul><a class="more" href="/warehouse-floor-coatings/">Warehouse coatings</a></div>
    </div>
    <div class="biz__strip">
      <div class="wipe">${img('autoShop', { sizes: '(max-width: 640px) 92vw, 520px', widths: [500, 900], ratio: 1.6 })}</div>
      <div class="wipe">${img('liftCar', { sizes: '(max-width: 640px) 46vw, 360px', widths: [400, 700], ratio: 1.6 })}</div>
      <div class="wipe">${img('warehouseSun', { sizes: '(max-width: 640px) 46vw, 360px', widths: [400, 700], ratio: 1.6 })}</div>
    </div>
  </div>
</section>

<section class="s" aria-labelledby="deco-h">
  <div class="wrap deco">
    <div class="in">
      <h2 id="deco-h">Decorative and metallic epoxy flooring</h2>
      <p>A coated floor can be a design choice, not just a practical one. Decorative flake floors scatter colored chips through the coating for a speckled, stone-like look that hides dust and wear. Metallic epoxy goes further: reflective pigments are worked by hand into clear resin, creating flowing patterns with real depth.</p>
      <p>For Prescott Valley homes, earthy palettes tend to work best. Sage, stone and warm tan flake blends suit the valley's grassland setting, and metallic floors in pewter, bronze or soft pearl pair well with modern farmhouse and craftsman interiors.</p>
      <p><a class="more" href="/decorative-flake-flooring/">Decorative flake</a></p>
      <p><a class="more" href="/metallic-epoxy-flooring/">Metallic epoxy</a></p>
    </div>
    <div class="tiles4">
      <figure class="in">${img('garageSport', { keep: true, widths: [300, 520], sizes: '(max-width: 640px) 92vw, 300px', ratio: 1 })}<figcaption>High-gloss garage</figcaption></figure>
      <figure class="in w1">${img('livingWindows', { keep: true, widths: [300, 520], sizes: '(max-width: 640px) 92vw, 300px', ratio: 1 })}<figcaption>Satin interior</figcaption></figure>
      <figure class="in">${img('vintageGarage', { keep: true, widths: [300, 520], sizes: '(max-width: 640px) 92vw, 300px', ratio: 1 })}<figcaption>Showcase garage</figcaption></figure>
      <figure class="in w1">${img('laundry', { keep: true, widths: [300, 520], sizes: '(max-width: 640px) 92vw, 300px', ratio: 1 })}<figcaption>Laundry and utility room</figcaption></figure>
    </div>
  </div>
</section>

<section class="s s--paper" aria-labelledby="why-h">
  <div class="wrap why">
    <div class="in">
      <h2 id="why-h">Why choose our epoxy flooring services?</h2>
      <p class="why__quote">Most floors that fail were never bonded to the concrete in the first place. We spend our time making sure yours is.</p>
    </div>
    <div class="why__list">
      <div class="in"><h3>Real surface prep</h3><p>Diamond grinding on every floor removes builder sealers and weak concrete so coatings bond into the slab.</p></div>
      <div class="in w1"><h3>Honest recommendations</h3><p>We suggest the system your space needs, which is not always the most expensive one.</p></div>
      <div class="in"><h3>Written, itemized estimates</h3><p>Prep, repairs, each layer and cure times listed clearly so you can compare.</p></div>
      <div class="in w1"><h3>Season-aware scheduling</h3><p>We plan installs around temperature, from summer heat to cold nights.</p></div>
      <div class="in"><h3>Tidy, respectful crews</h3><p>Dust-controlled grinding, protected walls and a clean space at the end of each day.</p></div>
      <div class="in w1"><h3>Clear aftercare</h3><p>You get written cure times and cleaning tips so the floor keeps looking right.</p></div>
    </div>
  </div>
</section>

<section class="vista" aria-labelledby="vista-h">
  <div class="vista__bg" data-parallax aria-hidden="true">${img('grassPines', { widths: [800, 1400, 2000, 2600], alt: '' })}</div>
  <div class="wrap vista__in">
    <div class="in">
      <h2 id="vista-h">Local climate and what it means for your floor</h2>
      <p>At about five thousand feet, Prescott Valley gets a little of everything. Summers are warm with strong sun, monsoon storms bring heavy rain and dust, and winters bring freezing nights and the occasional snowfall. Spring can be windy and dry. Each season leaves its mark on concrete.</p>
      <button class="btn btn--light" type="button" data-open-bar>Plan a floor for all four seasons</button>
    </div>
    <ul class="seasonal in w1">
      <li><b>Winter</b><span>Freeze-thaw and deicer cause flaking near the garage door. Sealed floors keep moisture out.</span></li>
      <li><b>Spring</b><span>Wind blows fine dust into every garage. Flake finishes hide it between cleanings.</span></li>
      <li><b>Summer</b><span>Strong UV yellows standard epoxy. We use UV-stable topcoats.</span></li>
      <li><b>Monsoon</b><span>Storm water and mud come in fast. Textured topcoats keep floors safe.</span></li>
    </ul>
  </div>
</section>

<section class="s" aria-labelledby="proc-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="proc-h">Our flooring installation process</h2><p>A typical two-car garage takes one to two days. Interior rooms and larger projects get a written schedule.</p></div>
    <ol class="zig">
      <li class="in"><div class="card"><h3>Estimate visit</h3><p>We measure the space, check for sealers, moisture, cracks and winter damage, and bring flake and color samples.</p></div></li>
      <li class="in"><div class="card"><h3>Written proposal</h3><p>You receive options with clear pricing, the layers in each system and expected cure times.</p></div></li>
      <li class="in"><div class="card"><h3>Grinding and repairs</h3><p>Dust-controlled diamond grinding, then crack, pit and spall repair for a sound, even surface.</p></div></li>
      <li class="in"><div class="card"><h3>Coating layers</h3><p>Base coat, then flake, metallic or color layers, depending on your system.</p></div></li>
      <li class="in"><div class="card"><h3>Topcoat and walkthrough</h3><p>A UV-stable, textured topcoat, followed by a walkthrough and written care instructions.</p></div></li>
    </ol>
  </div>
</section>

<section class="s s--sage" aria-labelledby="ben-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="ben-h">Benefits of professional epoxy flooring</h2><p>What changes once the job is done properly.</p></div>
    <div class="bens">
      <div class="in"><h3>A floor that stays put</h3><p>Ground, bonded systems resist peeling from hot tires and freeze-thaw.</p></div>
      <div class="in w1"><h3>No more concrete dust</h3><p>Sealed floors stop shedding powder onto stored items and into the house.</p></div>
      <div class="in w2"><h3>Easy cleaning</h3><p>Oil, deicer, mud and spills wipe up rather than soaking in.</p></div>
      <div class="in"><h3>Safer footing</h3><p>Slip-resistant topcoats help when snowmelt or rain gets in.</p></div>
      <div class="in w1"><h3>A brighter space</h3><p>Coated floors reflect light, making garages and basements feel larger.</p></div>
      <div class="in w2"><h3>Better presentation</h3><p>A finished garage stands out when friends visit or when you sell.</p></div>
    </div>
  </div>
</section>

<section class="s" aria-labelledby="local-h">
  <div class="wrap local">
    <div class="in">
      <h2 id="local-h">Why property owners in Prescott Valley choose us</h2>
      <p>Prescott Valley homeowners tend to be practical. Many have moved here for the climate, the views of Glassford Hill and Mingus Mountain, and the space to spread out a bit. They take care of their homes and expect the same from the people they hire.</p>
      <p>What they ask us for is consistent: a floor that will not peel, a clear price, honest advice about what their space needs and a crew that is respectful of their home and their neighbors. Many live in communities with HOA guidelines, so we are used to working cleanly, parking considerately and keeping noise to reasonable hours.</p>
      <p>Retirees, young families and second-career owners all bring different priorities. Some want a floor that is easy on aging knees and safe for grandchildren; others want a garage gym or a workshop that can take a beating. We listen first, then recommend.</p>
      <p>We regularly work in neighborhoods including:</p>
      <ul class="hoods"><li>StoneRidge</li><li>Pronghorn Ranch</li><li>Viewpoint</li><li>Granville</li><li>Quailwood</li><li>Prescott Country Club area</li><li>Lynx Creek area</li><li>The town center</li></ul>
    </div>
    <aside class="notebox in w1">
      <h3>Just moved into a new build?</h3>
      <p>New garages are one of the best times to coat. The slab is usually in good condition, and you can coat before cabinets and storage go in. Most builders recommend waiting until the concrete has fully cured; we will check the slab and tell you if it is ready.</p>
      <button class="btn btn--olive btn--sm" type="button" data-open-bar>Ask about a new-home garage</button>
    </aside>
  </div>
</section>

<section class="s s--paper" aria-labelledby="gal-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="gal-h">Featured floor finishes</h2><p>A look at the kinds of floors we install. Samples come to every estimate.</p></div>
    <div class="gal">
      <figure class="wipe">${img('garageBright', { keep: true, widths: [600, 900], sizes: '(max-width: 980px) 92vw, 600px', ratio: 1.2 })}<figcaption>Bright, sealed garage floor</figcaption></figure>
      <figure class="wipe">${img('livingRoom', { keep: true, widths: [600, 900], sizes: '(max-width: 980px) 92vw, 600px', ratio: 2.4 })}<figcaption>Seamless living area</figcaption></figure>
      <figure class="wipe">${img('autoShop', { keep: true, widths: [300, 500], sizes: '(max-width: 980px) 46vw, 300px', ratio: 1.2 })}<figcaption>Service bay</figcaption></figure>
      <figure class="wipe">${img('housePool', { keep: true, widths: [300, 500], sizes: '(max-width: 980px) 46vw, 300px', ratio: 1.2 })}<figcaption>Pool and patio decks</figcaption></figure>
    </div>
  </div>
</section>

<section class="s" aria-labelledby="areas-h">
  <div class="wrap areas">
    <div class="in"><h2 id="areas-h">Service areas</h2><p class="dim">We are based in Prescott Valley and work across the Quad Cities and surrounding communities. Larger commercial projects can take us further.</p><a class="more" href="/service-areas/">More about our service areas</a></div>
    <ul class="alist in w1">${site.serviceAreas.map((a) => `<li><b>${esc(a.name)}</b><span>${esc(a.note)}</span></li>`).join('')}</ul>
  </div>
</section>

<section class="s s--sage" aria-labelledby="faq-h">
  <div class="wrap">
    <div class="rule-h in"><h2 id="faq-h">Frequently asked questions</h2><p>Pick a topic. Anything else, call ${phoneLink()}.</p></div>
    <div data-ftabs>
      <div class="ftabs__list" role="tablist" aria-label="FAQ topics">${faqGroups.map((g, i) => `<button class="ftab" type="button" role="tab" id="ft-${g.id}" aria-controls="fp-${g.id}" aria-selected="${i === 0}" tabindex="${i ? -1 : 0}">${esc(g.label)}</button>`).join('')}</div>
      ${faqGroups.map((g, i) => `<div class="qa" role="tabpanel" id="fp-${g.id}" aria-labelledby="ft-${g.id}"${i ? ' hidden' : ''}>${g.items.map((f) => `<details><summary>${esc(f.q)}</summary><div class="qa__a">${md(f.a)}</div></details>`).join('')}</div>`).join('')}
    </div>
  </div>
</section>

<section class="s end" id="estimate" aria-labelledby="est-h">
  <div class="end__bg" aria-hidden="true">${img('brownMountain', { widths: [700, 1100], alt: '' })}</div>
  <div class="wrap end__grid">
    <div class="in">
      <h2 id="est-h">Let's take a look at your floor</h2>
      <p>Share a few details about the floor and we will book a visit at a time that suits you. Afterward you will have a written price, real samples to hold up against your walls and our honest opinion on what will hold up.</p>
      <ul class="end__facts"><li><span>Phone</span>${phoneLink()}</li><li><span>Estimates</span><span>Free and in person</span></li><li><span>Area</span><span>Prescott Valley &amp; Quad Cities</span></li></ul>
    </div>
    <div class="end__card in w1">${leadForm({ id: 'home-form', heading: 'Request your free estimate', intro: 'Takes a minute. We will be in touch to schedule.', withMessage: true })}</div>
  </div>
</section>`;

  endDedupe();
  return layout({
    path: '/',
    title: 'Prescott Valley Epoxy | Garage & Concrete Floor Coatings',
    description: 'Epoxy, flake, metallic and polyaspartic floor coatings for Prescott Valley garages, homes and businesses. Proper slab prep, written estimates and four-season systems.',
    body,
    image: 'garageTwo',
    schema: [{ '@type': 'FAQPage', mainEntity: allFaqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) }],
  });
}
