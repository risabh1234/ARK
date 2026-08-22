# ĀRK

The architecture of understanding.

> "People are not uninformed. They are unintegrated. ĀRK builds the integration layer."

ĀRK builds research and intelligence tools for people who would rather understand something
completely than believe it quickly. This repo is the Phase 1 site: four pages, one free asset,
one paid asset, one service.

## Design system

- **Grounds**: Ink `#0A0A0B` (the instrument — home, studio, vision, all chrome) and Paper
  `#F2EEE6` (the reader — briefs, the Primer).
- **Accent**: Copper `#C4694A`, rationed to roughly one element per screen.
- **Type**: Spectral (display / long-form body), Geist (interface), Geist Mono (eyebrows, meta,
  section numerals — always uppercase, tracked).
- **Grid**: 1180px container, 12 columns, 24px gap, radius 0 everywhere.
- Full token list in [`tailwind.config.ts`](tailwind.config.ts) and [`app/globals.css`](app/globals.css).

## Pages

| Route         | Job                                          |
| ------------- | --------------------------------------------- |
| `/`           | Name the problem, capture the email           |
| `/research`   | The brief catalogue — free Primer, paid briefs |
| `/research/[slug]` | A single brief: provocation, contents, unresolved questions, buy |
| `/studio`     | Commission research — three priced tiers       |
| `/vision`     | The Codex, and the early-access waitlist       |
| `/primer`     | Ten public Primer questions (free, SEO surface)|

## Stack

Next.js 15 (App Router) + TypeScript, Tailwind CSS, Supabase Postgres + Drizzle ORM, Resend for
transactional email. Razorpay/Stripe checkout, Cloudflare R2 (brief PDFs) and Turnstile are wired
for but need live credentials — see below.

## Local development

```bash
npm install
npm run dev
```

The site runs and renders fully with zero environment variables — the email capture and
commission form degrade to logging a warning server-side instead of persisting, so the UI never
breaks in local dev.

To wire up the backend for real:

```bash
cp .env.example .env.local
# fill in DATABASE_URL (Supabase → Project Settings → Database → Connection string)
npm run db:push   # applies db/schema.ts to your Supabase Postgres instance
```

`supabase/migrations/0001_init.sql` is the same schema as plain SQL, if you'd rather run it
through the Supabase CLI or SQL editor directly.

Fill in `RESEND_API_KEY` to actually send the Primer letter on subscribe. Razorpay/Stripe,
Turnstile and R2 are scaffolded in `.env.example` but not wired into checkout yet — that's the
next slice of Phase 1, once the four pages are live and taking emails.

## Deploying to Cloudflare

This app targets Cloudflare Workers via [OpenNext](https://opennext.js.org/cloudflare), not a
plain `next build`. `npm run build` stays as vanilla `next build` (OpenNext shells out to it
internally); the Cloudflare bundle is a separate script so the two don't recurse into each other.

In the Cloudflare dashboard, set the project's **Build command** to:

```
npm run pages:build
```

That produces `.open-next/worker.js` + `.open-next/assets`, which `wrangler.jsonc` already points
at. No other dashboard settings should be needed — `wrangler.jsonc` in this repo defines the
worker name, compatibility date/flags, and the assets binding.

To deploy from your own machine instead: `npm run deploy` (runs the OpenNext build, then
`wrangler deploy`; requires `wrangler login` first).
