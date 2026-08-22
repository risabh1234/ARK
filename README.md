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

This app targets **Cloudflare Workers** via [OpenNext](https://opennext.js.org/cloudflare), not
Cloudflare Pages, and not a plain `next build`. That distinction matters — see below.

### Auto-deploy: GitHub Actions, not Cloudflare's git integration

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. It needs one repo
secret: **`CLOUDFLARE_API_TOKEN`** (Cloudflare dashboard → My Profile → API Tokens → create one
with Workers Scripts: Edit permission on this account → add it at GitHub repo Settings → Secrets
and variables → Actions). The account ID is already committed in `wrangler.jsonc` (account IDs
aren't secret) so that's the only secret needed for deploys to work.

**If a Cloudflare *Pages* project is connected to this GitHub repo, its builds will always fail**
— that's expected, not a bug to chase. Pages expects a static `pages_build_output_dir`; this app
is a server-rendered Worker (API routes, SSR) built by OpenNext, which is a fundamentally
different deploy shape. Pages and OpenNext-for-Workers can't share one config. Either disconnect
that Pages project's git integration (GitHub Actions now owns deploys) or ignore its failing
build checks — it isn't wired to anything real.

### Runtime secrets — separate from the GitHub Actions secret above

`CLOUDFLARE_API_TOKEN` only authenticates *deploys*. For the deployed Worker to actually reach
Supabase/Resend at request time, set the same variables from `.env.example` as Worker secrets:

```bash
npx wrangler secret put DATABASE_URL
npx wrangler secret put RESEND_API_KEY
```

(Repeat for any other `.env.example` variable once that integration is wired up.)

### Deploying from your own machine

`npm run deploy` — runs the OpenNext build, then `wrangler deploy`. Requires `wrangler login`
first (or `CLOUDFLARE_API_TOKEN` set in your shell env, same as CI).

`npm run build` deliberately stays a plain `next build` — OpenNext's build step shells out to it
internally, so aliasing `build` to the Cloudflare bundle causes infinite recursion. The Cloudflare
bundle is `npm run pages:build`, a separate script for exactly this reason.
