import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE = 'landing_purchase_modal';

type Body = { email?: unknown; consent_marketing?: unknown };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body: Body = typeof req.body === 'string' ? safeParse(req.body) : (req.body ?? {});
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const consent = body.consent_marketing;

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (typeof consent !== 'boolean') {
    return res.status(400).json({ ok: false, error: 'invalid_consent' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('marketing-leads: missing env (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)');
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  try {
    const upstream = await fetch(`${supabaseUrl}/rest/v1/rpc/upsert_marketing_lead`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        p_email: email,
        p_consent_marketing: consent,
        p_source: SOURCE,
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      console.error('marketing-leads: supabase error', upstream.status, text.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('marketing-leads: supabase fetch threw', err);
    return res.status(502).json({ ok: false, error: 'upstream_unreachable' });
  }
}

function safeParse(s: string): Body {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
