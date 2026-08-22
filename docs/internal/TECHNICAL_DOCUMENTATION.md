# Technical Documentation

Internal. Architecture reference — how the thing is actually built, kept in sync with the code.
If this drifts from reality, trust the code and fix this file, not the other way round.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15, App Router, TypeScript | Prescribed by the source spec ("carried over, nothing new to learn"). |
| Styling | Tailwind CSS v3, hand-authored design tokens | Exact colour/type/spacing values came from the spec's colour-system and typography pages; Tailwind's `theme.extend` maps 1:1 onto them. |
| Fonts | `next/font/google` — Spectral, Geist, Geist Mono | All three ship on Google Fonts now; no separate `geist` npm package needed. |
| Database | Postgres (Supabase-hosted) via `drizzle-orm` + `postgres` (postgres-js driver) | Spec-prescribed. Not using `@supabase/supabase-js` — plain Drizzle against the connection string is simpler for three tables and no auth/realtime needs. |
| Email | `resend` | Spec-prescribed, for the Primer letter / future 5-letter sequence. |
| Hosting | Cloudflare Workers via `@opennextjs/cloudflare` + `wrangler` | Spec-prescribed. See "Cloudflare deploy" below — this is not a plain `next build`. |
| Payments (scaffolded, not wired) | Razorpay (India) / Stripe (rest of world) | Env vars reserved in `.env.example`; no checkout flow implemented yet. |
| Bot protection (scaffolded, not wired) | Cloudflare Turnstile | Env vars reserved; not on either form yet. |
| File delivery (scaffolded, not wired) | Cloudflare R2, presigned URLs | For brief PDFs once checkout exists. |

## Directory map

```
app/
  layout.tsx            root layout — fonts, metadata, grain overlay
  globals.css           CSS custom properties, grain texture, reading-progress bar, resets
  page.tsx               /            home
  research/
    page.tsx              /research           brief catalogue (list, not a card grid — per spec)
    [slug]/page.tsx        /research/[slug]    single brief (ink meta + paper reading sample)
  studio/page.tsx          /studio             commission tiers + CommissionForm
  vision/page.tsx          /vision             Codex pitch + waitlist EmailCapture
  primer/page.tsx          /primer             10 public Primer questions (paper ground)
  docs/page.tsx            /docs               PUBLIC methodology page (not the private docs below)
  privacy/page.tsx         /privacy            privacy policy
  api/
    subscribe/route.ts     POST — email capture → subscriber table + Resend
    commission/route.ts    POST — Studio form → commission_request table

components/
  Header.tsx, Footer.tsx   chrome — see "Nav" below for the 3→4 item deviation
  Logo.tsx                 the animated mark — server component, pure CSS, icon-only (no wordmark)
  Primitives.tsx           Container, Section, Panel, Eyebrow — layout/typography helpers
  Button.tsx               ButtonLink / Button — the three-and-only-three variants (primary/secondary/tertiary)
  EmailCapture.tsx          client component, single-field capture used on home/footer/vision/primer
  CommissionForm.tsx        client component, the 4-field Studio form
  BriefRow.tsx              list-row brief unit (Research index) — NOT a card/thumbnail grid, per spec
  DepthControl.tsx          Quick/Explain/Deep/Complete tabs on a brief page
  ReadingProgress.tsx        the one continuously-animated element — 2px copper top bar on brief pages

content/
  briefs.ts                Brief type + the 5-brief catalogue (001 available, 002-005 queued placeholders)
  primer.ts                 the 10 public Primer questions

db/
  schema.ts                 Drizzle schema: subscriber, order, commission_request

lib/
  db.ts                      getDb() — lazy Drizzle client, returns null if DATABASE_URL unset
  resend.ts                  sendPrimerLetter() — no-ops if RESEND_API_KEY unset

supabase/
  config.toml                local Supabase CLI config (from the original Gemini scaffold)
  migrations/0001_init.sql   hand-written SQL mirroring db/schema.ts exactly

drizzle.config.ts            drizzle-kit config — schema in, migrations out to supabase/migrations
open-next.config.ts          OpenNext Cloudflare adapter config (currently defaults only)
wrangler.jsonc                Cloudflare Worker config — name, compat date/flags, assets binding
```

## Design tokens

Source of truth: `tailwind.config.ts` (colours, font sizes, spacing scale) and `app/globals.css`
(CSS custom properties for things Tailwind utilities can't cleanly express — rule opacity, grain,
reading-progress line).

### Colour

| Token | Hex | Use |
|---|---|---|
| `ink` | `#0A0A0B` | Page ground — the instrument (home/studio/vision, all chrome) |
| `panel` | `#0E0E10` | Cards, cells |
| `raise` | `#1A1A1D` | Hover / input state |
| `bone` | `#F5F3EF` | Headings on ink |
| `ash` | `#8E8B85` | Labels, meta, secondary text |
| `copper` | `#C4694A` | The only accent — rationed, ~1 element per screen |
| `copper-dim` | `#7A3F2C` | Accent borders/washes |
| `copper-lift` | `#E08A66` | Accent hover state |
| `paper` | `#F2EEE6` | Page ground — the reader (briefs, Primer, docs, privacy) |
| `paper-edge` | `#E4DED1` | Paper card/edge |
| `paper-text` | `#211F1C` | Body text on paper |

Usage law from the spec: ink 78% · bone 16% · ash 4% · copper 2%. Rules are `bone` at 3–14%
opacity (`rgba(245,243,239,0.1)` is the workhorse, defined as `--rule` in `globals.css`), not
shadows — shadows appear only on the header after scroll.

### Type

Three fonts, three jobs, never overlapping: **Spectral** (display + long-form body, weights
300/400), **Geist** (interface — nav, buttons, forms, prices), **Geist Mono** (eyebrows,
section numerals, meta — always uppercase, `0.2em` tracking).

Named sizes live in `tailwind.config.ts` under `theme.extend.fontSize`: `hero`, `section`,
`lead`, `reader` (17px/1.75, the brief/Primer/docs body copy), `ui`, `eyebrow`.

### Grid / spacing / motion

1180px container, 56px desktop / 24px mobile gutters, 12 columns, 24px gap. Spacing scale is
literally 8/16/24/32/56/88/140 — nothing between. Radius 0 everywhere (`* { border-radius: 0 }`
in `globals.css`, belt-and-braces on top of the Tailwind config). `prefers-reduced-motion` is
respected globally. The reading-progress line (`.reading-progress` in `globals.css`) is the one
element on the site that animates continuously; everything else is hover/scroll-triggered, once.

## Nav — deviation from spec

The source spec is explicit: "Three nav items maximum." As of 2026-08-23 the header has four
(`Research · Studio · Vision · Docs`), plus the separate "The Primer" CTA link. This was done at
the user's direct, explicit request for a public docs tab — a live instruction overriding a
static rule from the original PDF. See `docs/internal/IMPLEMENTATION.md` for the full list of
acknowledged deviations.

## Logo / identity motion

`components/Logo.tsx` implements the mark described in a second spec PDF ("ĀRK — Identity in
Motion, Doc 02 · 5-second cycle"): earth-line horizon → copper circumference ring → two rising
legs → a horizontal plate → a star that ignites (overshoot to 115%, settle at 100%) and decays
to a resting 62% opacity, never fully leaving. All seven beats, all on the spec's own easing
curve `cubic-bezier(0.16, 1, 0.3, 1)`.

It's a **server component with no client JS** — every beat is a CSS `@keyframes` animation
(defined in `app/globals.css` under `.ark-mark`), using `pathLength={1}` on each drawn SVG path/
circle so every dash animation is just `stroke-dashoffset: 1 → 0` regardless of real path length.
`prefers-reduced-motion: reduce` is handled by a plain CSS media query (jumps straight to the
final state — no draw-on, star pre-lit at 62%), not JS feature-detection, so there's no
hydration flash either way.

**Deliberate deviations from the literal spec**, both because a header is not a one-off hero
lockup:

- Runs once on mount, then **holds at the fully-drawn/ignited state** — it does not loop, and
  it does not implement the spec's "dissolve to ink" beat (4.3–5.0s) in the header. A logo that
  periodically fades to invisible would break navigation. The spec's own header note ("runs
  once on load, then holds... two loops on one screen is noise") reads as license for this.
- **Icon only, no wordmark** — per explicit user instruction (2026-08-23), `<Logo />` replaces
  the header's old plain-text "Aroha"/"ĀRK" link entirely, with nothing beside or under it. There
  is currently no visible wordmark anywhere in site chrome — only in body copy, page `<title>`s,
  and the footer's small-print line. If a first-time visitor needs the brand name more visibly
  labelled in the header itself, add a wordmark next to `<Logo />` — not done here on purpose.

Usage: `<Logo height={36} />` (any component, server or client — it's imported plain, no
`"use client"` needed). `height` scales proportionally (viewBox is 200×170).

## Database

Three tables, defined in `db/schema.ts` and mirrored exactly in `supabase/migrations/0001_init.sql`:

- **`subscriber`** — `email` (unique), `source` (which form: `home` / `footer` / `vision` /
  `primer`), `sequence_step` (int, for the eventual 5-letter Primer sequence — not yet advanced
  by any code path), `created_at`.
- **`order`** — `email`, `brief_slug`, `amount`, `currency`, `provider`, `provider_ref`,
  `status` (defaults `pending`), `created_at`. **Not yet written to by any route** — no checkout
  flow exists yet. Present so the schema is ready when Razorpay/Stripe is wired.
- **`commission_request`** — `project`, `deadline`, `budget`, `question`, `email` (nullable —
  the Studio form doesn't currently collect one; see IMPLEMENTATION.md known-gaps), `created_at`.

`lib/db.ts`'s `getDb()` returns `null` when `DATABASE_URL` is unset, and both API routes check
for that and log-and-continue rather than throwing — the UI never breaks in local dev without a
live database.

To apply the schema to a real Supabase Postgres instance: `npm run db:push` (drizzle-kit push,
reads `DATABASE_URL`). The SQL file is there as a plain fallback if you'd rather run it through
the Supabase SQL editor or CLI directly — keep both in sync by hand if the schema changes.

## API routes

- **`POST /api/subscribe`** — body `{ email, source }` (zod-validated). Inserts into
  `subscriber` (`onConflictDoNothing` on the unique email), then best-effort sends the Primer
  letter via `sendPrimerLetter()` (swallows/logs errors — a failed send shouldn't fail the
  request, since the row is already saved).
- **`POST /api/commission`** — body `{ project, deadline, budget, question }` (zod-validated).
  Inserts into `commission_request`.

Neither route currently does anything with Turnstile (not wired) or notifies a human (no Slack/
email-to-founder hook on new commission requests — you'd need to check the Supabase table or the
Cloudflare Worker logs).

## Cloudflare deploy

**This is not a plain `next build` deploy.** The site targets Cloudflare Workers via OpenNext.

- `npm run build` → plain `next build`. Kept this way on purpose — `@opennextjs/cloudflare`'s
  build step internally shells out to `npm run build`, so this script must stay a plain Next
  build or you get infinite recursion (hit and fixed on 2026-08-22 — see DEVELOPMENT_LOG.md).
- `npm run pages:build` → `opennextjs-cloudflare build`. This is what the **Cloudflare
  dashboard's Build command must be set to.** Produces `.open-next/worker.js` +
  `.open-next/assets`, which `wrangler.jsonc` points at (`main` / `assets.directory`).
- `npm run deploy` → build, then `wrangler deploy` (needs `wrangler login` locally; Cloudflare's
  own CI handles auth itself).
- `wrangler.jsonc`: worker name `ark`, `compatibility_flags: ["nodejs_compat",
  "global_fetch_strictly_public"]`, `assets` binding named `ASSETS`. No R2 cache binding or
  Cloudflare Images binding configured yet (the adapter supports both; skipped to avoid requiring
  a pre-provisioned R2 bucket for a first successful deploy — revisit once R2 is wired for brief
  PDF delivery anyway).

## Environment variables

See `.env.example` for the full list with comments. Nothing is required for the site to build or
for `npm run dev` to serve every page — the two API routes degrade gracefully when their backing
services aren't configured. `DATABASE_URL` and `RESEND_API_KEY` are the two worth setting first
to make the forms actually do something.

## Known constraints of this sandbox (not the app)

Browser screenshot verification (Playwright/chromium-cli) is not available in the environment
these sessions run in — the network proxy blocks the Chromium CDN download
(`SELF_SIGNED_CERT_IN_CHAIN`). Verification has been via `next build` + `tsc --noEmit` +
`curl`-ing a local `next dev` server. If you (a human, in a normal browser) spot a visual bug
that build/typecheck/curl wouldn't catch, that's expected — say so and it'll get fixed, but it
won't get caught automatically in this environment.
