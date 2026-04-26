import type { VercelRequest, VercelResponse } from '@vercel/node';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_PRODUCTS = 10;
const MAX_PRODUCT_LEN = 128;

type Body = { email?: unknown; products?: unknown };

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'method_not_allowed' });
  }

  const body: Body = typeof req.body === 'string' ? safeParse(req.body) : (req.body ?? {});
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const products = body.products;

  if (!EMAIL_RE.test(email)) {
    return res.status(400).json({ ok: false, error: 'invalid_email' });
  }
  if (
    !Array.isArray(products) ||
    products.length === 0 ||
    products.length > MAX_PRODUCTS ||
    !products.every((p) => typeof p === 'string' && p.length > 0 && p.length <= MAX_PRODUCT_LEN)
  ) {
    return res.status(400).json({ ok: false, error: 'invalid_products' });
  }

  const secret = process.env.LANDING_PURCHASE_KEY;
  const webhookUrl = process.env.PRODUCT_WEBHOOK_URL;
  if (!secret || !webhookUrl) {
    console.error('purchase: missing env (LANDING_PURCHASE_KEY or PRODUCT_WEBHOOK_URL)');
    return res.status(500).json({ ok: false, error: 'server_misconfigured' });
  }

  try {
    const upstream = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, products, secret }),
    });

    if (!upstream.ok) {
      const text = await upstream.text().catch(() => '');
      console.error('purchase: upstream error', upstream.status, text.slice(0, 500));
      return res.status(502).json({ ok: false, error: 'upstream_failed' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('purchase: upstream fetch threw', err);
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
