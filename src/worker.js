// Cloudflare Worker: serves the static site from ./public and handles lead form posts.
//
// Lead delivery (configure at least one in the Worker's settings → Variables and secrets):
//   LEAD_WEBHOOK_URL     Any endpoint that accepts a JSON POST (Zapier, Make, Formspree, a CRM webhook…)
//   WEB3FORMS_ACCESS_KEY Free email delivery via https://web3forms.com (sends to the address tied to the key)
// Every lead is also written to the Worker logs, so nothing is lost while delivery is being set up.

const PROJECTS = new Set([
  'Garage floor coating', 'Residential interior floor', 'Decorative flake floor', 'Metallic epoxy floor',
  'Polyaspartic coating', 'Polyurea coating', 'Patio or pool deck', 'Commercial floor', 'Warehouse or industrial floor', 'Not sure yet',
]);

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' } });

const clean = (v, max = 200) => String(v ?? '').replace(/[\u0000-\u001f\u007f]/g, ' ').trim().slice(0, max);

export function validateLead(input) {
  const lead = {
    name: clean(input.name, 80),
    phone: clean(input.phone, 30),
    email: clean(input.email, 120),
    project: clean(input.project, 60),
    message: clean(input.message, 2000),
    page: clean(input.page, 120),
  };
  const errors = {};
  if (lead.name.length < 2) errors.name = 'Name is required.';
  if (lead.phone.replace(/\D/g, '').length < 10) errors.phone = 'A 10-digit phone number is required.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(lead.email)) errors.email = 'A valid email is required.';
  if (!PROJECTS.has(lead.project)) errors.project = 'Choose a project type.';
  return { lead, errors, spam: Boolean(clean(input.company)) };
}

async function handleLead(request, env) {
  if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed' }, 405);
  let input = {};
  const type = request.headers.get('content-type') || '';
  try {
    input = type.includes('application/json') ? await request.json() : Object.fromEntries(await request.formData());
  } catch {
    return json({ ok: false, error: 'Unreadable request' }, 400);
  }
  const { lead, errors, spam } = validateLead(input);
  if (spam) return json({ ok: true }); // honeypot filled: quietly accept and drop
  if (Object.keys(errors).length) return json({ ok: false, error: 'Please check the highlighted fields.', errors }, 422);

  const record = { ...lead, site: env.SITE_NAME || 'Prescott Valley Epoxy', receivedAt: new Date().toISOString() };
  console.log('LEAD', JSON.stringify(record));

  const deliveries = [];
  if (env.LEAD_WEBHOOK_URL) {
    deliveries.push(fetch(env.LEAD_WEBHOOK_URL, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(record) }));
  }
  if (env.WEB3FORMS_ACCESS_KEY) {
    deliveries.push(
      fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          access_key: env.WEB3FORMS_ACCESS_KEY,
          subject: `New estimate request — ${record.project} (${record.site})`,
          from_name: record.site,
          replyto: record.email,
          ...record,
        }),
      }),
    );
  }
  if (deliveries.length) {
    const results = await Promise.allSettled(deliveries);
    const delivered = results.some((r) => r.status === 'fulfilled' && r.value.ok);
    if (!delivered) {
      console.error('LEAD_DELIVERY_FAILED', JSON.stringify(results.map((r) => (r.status === 'fulfilled' ? r.value.status : String(r.reason)))));
      return json({ ok: false, error: 'Delivery failed' }, 502);
    }
  }
  return json({ ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/lead') return handleLead(request, env);
    // Redirect www to the apex domain so only one canonical host is indexed.
    if (url.hostname.startsWith('www.')) {
      url.hostname = url.hostname.slice(4);
      return Response.redirect(url.toString(), 301);
    }
    return env.ASSETS.fetch(request);
  },
};
