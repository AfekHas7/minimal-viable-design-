import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const SOURCE = 'landing_purchase_modal';

type Body = { email?: unknown };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body: Body = typeof req.body === 'string' ? safeParse(req.body) : (req.body ?? {});
  const email = typeof body.email === 'string' ? body.email.trim() : '';

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }

  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error('abandoned-checkout/start: missing env (SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY)');
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  try {
    const upstream = await fetch(`${supabaseUrl}/rest/v1/rpc/upsert_abandoned_checkout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify({
        p_email: email,
        p_source: SOURCE,
      }),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      console.error('abandoned-checkout/start: supabase error', upstream.status, text.slice(0, 500));
      // TEMP DEBUG: surface upstream status + body to DevTools so we can diagnose
      // without Vercel runtime logs. Remove once the 502 root cause is identified.
      return res.status(502).json({
        ok: false,
        error: 'upstream_failed',
        debug: {
          upstream_status: upstream.status,
          upstream_body: text.slice(0, 500),
        },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('abandoned-checkout/start: supabase fetch threw', err);
    // TEMP DEBUG: surface fetch error message. Remove with the block above.
    const message = err instanceof Error ? err.message : String(err);
    return res.status(502).json({
      ok: false,
      error: 'upstream_unreachable',
      debug: { message: message.slice(0, 500) },
    });
  }
}

function safeParse(s: string): Body {
  try {
    return JSON.parse(s);
  } catch {
    return {};
  }
}
