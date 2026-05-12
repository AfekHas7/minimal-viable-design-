# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Hebrew-language landing page for "עוצמה שקטה" — a 21-day self-worth program. Live at `otzmashketa.com`, deployed to Vercel. A single Vite SPA plus a few serverless functions under `api/`. The `README.md` is the AI Studio scaffold (predates the rewrite) — the real product is `src/` + `api/` + `supabase/`.

## Commands

- `npm run dev` — Vite dev server on port 3000. Note: `api/` functions are **not** served here; they run only via `vercel dev` or in deployed environments. For end-to-end testing of an endpoint, push to a branch and use a preview URL, or run `vercel dev` locally.
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve `dist/` for smoke-testing the build.
- `npm run lint` — **type-check only** (`tsc --noEmit`). There is no ESLint, no Prettier, no test runner. Type-check + build are the verification gates.

## Stack

- React 19 + react-router-dom v7 (BrowserRouter), Vite 6, TypeScript.
- Tailwind CSS 4 via `@tailwindcss/vite`, with `@theme` tokens defined directly in `src/index.css` (no `tailwind.config.*` file).
- `motion/react` (Framer Motion successor), `lucide-react`.
- Vercel serverless functions in `api/` using `@vercel/node` (default Node runtime).
- Supabase as the lead / abandoned-checkout store. **Accessed by server endpoints via plain `fetch` to the PostgREST RPC surface — `@supabase/supabase-js` is deliberately not a dependency** (one RPC call per endpoint, not worth the bundle weight).

## Routing

Five routes registered in `src/App.tsx` (BrowserRouter): `/`, `/terms`, `/privacy`, `/checkout`, `/success`. There is no `vercel.json` — Vercel's Vite framework preset provides SPA fallback (unknown path → `index.html`). If a new route 404s on hard refresh in production, that's the first thing to check.

## Purchase / lead-capture flow

```
Home modal (email + 2 consents)
  → navigate('/checkout?email=…')
  → Checkout POSTs /api/purchase
  → api/purchase forwards { email, products, secret } to PRODUCT_WEBHOOK_URL (external, e.g. Make/n8n)
  → on 200 → navigate('/success?email=…')
```

Two background captures fire **fire-and-forget** from `Home.tsx` `handleProceed` the moment the user clicks "להמשך לתשלום":

- `POST /api/marketing-leads` → Supabase `upsert_marketing_lead` RPC. OR-merges `consent_marketing` so a previously-true value cannot be downgraded.
- `POST /api/abandoned-checkout/start` → Supabase `upsert_abandoned_checkout` RPC. Only `last_seen_at` is updated on conflict; lifetime fields (`started_at`, `completed*`, `*_email_sent_at`) are never reset.

These are fire-and-forget on purpose: SPA navigation does not unload the page, so the in-flight `fetch` completes after `navigate()` runs. **Do not convert them to `await`** — that would couple checkout latency to two third-party calls and add new failure modes to the buy flow.

The marketing-consent checkbox state lives in `Home.tsx` only and is captured server-side at the modal moment. It is **not** plumbed through `/checkout` via router state or query params.

`api/purchase.ts` is **not a payment processor** — it forwards to an external webhook that delivers program-access email. There is no card form anywhere in this repo.

## API layer conventions

All endpoints under `api/` follow the same shape — mirror it for new ones:

- Method guard returning 405 with `Allow: POST` for non-POST.
- Inline validation; failures return `400 { ok: false, error: '<snake_code>' }`.
- Env-var read at top of handler; missing → `500 { ok: false, error: 'server_misconfigured' }` and a `console.error` naming the missing var(s).
- Upstream non-2xx → `502 { ok: false, error: 'upstream_failed' }`. Thrown fetch → `502 'upstream_unreachable'`.
- Success → `200 { ok: true }`.

Env vars are **server-only**. Never prefix with `VITE_`. Never read via `import.meta.env`. `SUPABASE_SERVICE_ROLE_KEY` in particular must never reach the browser.

## Supabase data layer

SQL lives in `supabase/migrations/*.sql`, numbered sequentially. **There is no Supabase CLI integration** — apply migrations by pasting the file contents into the linked project's SQL editor. Migrations are written to be idempotent (`create … if not exists`, `create or replace function …`).

Pattern per table:
1. Table + indexes (including any partial / expression indexes the access pattern needs).
2. A `security definer` SQL function (`upsert_<thing>`) that performs the upsert with the desired conflict semantics (OR-merge a boolean, last-seen-only, etc.).
3. `enable row level security`, no policies. Service role bypasses RLS; anon/auth can't touch.
4. Optionally, stricter: `revoke all … from public, anon, authenticated; grant execute/select/insert/update … to service_role;`.

Endpoints call the RPC, never raw tables. This keeps merge logic atomic in Postgres so the server can't accidentally race-condition itself.

**Common gotcha**: when a new RPC is added, PostgREST's schema cache may be stale — the function works in the SQL editor but the REST surface 404s it. Workaround: run `notify pgrst, 'reload schema';` in the SQL editor.

## Design / RTL

Hebrew RTL site. The `<html>` tag has `lang="en"` for historical reasons; **RTL is applied via a `.rtl` class on each page's root `<div>`**, defined in `src/index.css:27-29` as `direction: rtl`. Match this pattern on new pages.

Brand tokens in `src/index.css` `@theme`:
- `--color-primary: #0b3c5d` (deep navy — headings, primary CTAs)
- `--color-accent: #17b7ae` (calm teal — checkmarks, soft success, accents)
- `--color-premium: #d4a373` (warm gold — premium indicators)
- `--color-bg-light: #F7F9FB` (off-white alt section bg)
- Font: `Assistant` (Google Fonts, imported at `index.css:1`)

`docs/design-system.md` has the full design rationale (spacing rhythm, button shapes, card radii). `.idx/airules.md` is its short pointer file. **Read both before designing new screens**, and do not duplicate their content here.

## Path alias

`@/` resolves to the repo root (`vite.config.ts` + `tsconfig.json paths`). Most existing imports are relative; use `@/` sparingly.

## Deployment

Push to `main` → Vercel auto-builds and promotes to `otzmashketa.com`. There is no preview-promote workflow. **Env-var changes in the Vercel dashboard do not retrigger existing deploys** — you must redeploy (or push a no-op commit) for new env values to apply.

Vercel CLI is not assumed installed locally; testing is typically against the deployed URL. **Hard-refresh (Cmd-Shift-R) or Incognito is required after each deploy** to bypass cached JS bundles in the browser.

## Things that look weird but are intentional

- **`README.md` is the AI Studio scaffold** (mentions Gemini, `GEMINI_API_KEY`). The product does not call Gemini at runtime. The actual env contract is in `.env.example`.
- **`<html lang="en">`** on a Hebrew page — RTL is per-page via `.rtl` class. Don't "fix" without confirming.
- **No per-route `<title>` or `<meta>`** — `index.html` sets the brand title once; no `react-helmet`. Adding per-route metadata is a new dependency, not a small change.
- **Fire-and-forget POSTs in `handleProceed`** — see Purchase flow above. Intentional, not a bug.
- **No tests.** Verification is `npm run lint` + `npm run build` + manual smoke.
