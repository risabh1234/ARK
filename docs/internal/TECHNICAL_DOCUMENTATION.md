# Technical Documentation

Internal. Architecture reference — how the thing is actually built, kept in sync with the code.
If this drifts from reality, trust the code and fix this file, not the other way round.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js 15, App Router, TypeScript | Prescribed by the source spec ("carried over, nothing new to learn"). |
| Styling | Tailwind CSS v3, hand-authored design tokens | 2026-08-23: retokenized to `ARK_Redesign_Specification.md` §6–10 (single cream/terracotta theme, replacing the former dark "ink"/light "paper" dual mode). Tailwind's `theme.extend` still maps 1:1 onto the token tables. |
| Fonts | `next/font/google` — Fraunces Variable (serif/display), Inter Variable (sans/UI) | Swapped 2026-08-23 from Spectral/Geist/Geist Mono per the redesign spec's §7.1 pairing. Loaded with no fixed `weight` array so the true variable-axis file ships (needed for the scroll-tied weight interpolation on the home hero, §30.1). |
| Motion | `framer-motion` | Scroll reveals (`whileInView` + stagger), the hero's word-stagger + scroll-tied `font-variation-settings`, the Research filter bar's spring-in active pill. Added 2026-08-23. |
| 3D | `three` + `@react-three/fiber` + `@react-three/drei` | One abstract wireframe/particle form per page (Vision, Library), lazy-mounted in-viewport only, static SVG fallback under `prefers-reduced-motion`/no-WebGL. See `components/three/`. Added 2026-08-23. |
| Database (legacy tables) | Postgres (Supabase-hosted) via `drizzle-orm` + `postgres` (postgres-js driver) | `subscriber`, `order`, `commission_request` — no RLS, no per-user ownership, so a plain Drizzle connection is fine. |
| Database (auth-owned tables) | Supabase (`@supabase/supabase-js` + `@supabase/ssr`) | `profiles`, `articles`, `comments`, `admin_audit_log` — RLS-protected, keyed to `auth.uid()`. **Must** go through Supabase's connection path (PostgREST/`supabase-js`, running as `anon`/`authenticated`), never the Drizzle connection, which authenticates as a role that would silently bypass RLS. Project: `ark`, ref `qosdbcvdqtlcinetxdbh`, `ap-south-1`, free tier — dedicated to ĀRK, separate from any other project on this account. See `DEVELOPMENT_LOG.md`'s 2026-08-23 "Phase 5" entry for how the RLS policies were actually tested (a real role-escalation bug was caught and fixed this way — re-test any future policy change the same way, `get_advisors` alone did not catch it). |
| Rich text | `@tiptap/react` + `@tiptap/starter-kit` + link/image extensions | Article composer body editor, output as JSON matching `articles.body_richtext jsonb`. Sanitized server-side before render (`isomorphic-dompurify`) per the spec's XSS requirement (§33). |
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
  docs/page.tsx            /docs               PUBLIC methodology page (not the private docs below) —
                                                 expanded 2026-08-23 with a TOC, full brief-structure
                                                 section, and an Articles/comments FAQ
  library/page.tsx         /library            "The Library" — coming-soon placeholder, added 2026-08-23
  privacy/page.tsx         /privacy            privacy policy
  api/
    subscribe/route.ts     POST — email capture → subscriber table + Resend
    commission/route.ts    POST — Studio form → commission_request table

components/
  Header.tsx               sync server shell (logo, nav, Primer pill) — no data dependency
  HeaderSessionCorner.tsx  the actual Supabase session lookup, wrapped in <Suspense> by
                            Header.tsx so it streams independently rather than blocking the
                            whole page — see DEVELOPMENT_LOG.md's "damn slow" fix, 2026-08-23
  HeaderClient.tsx         client-side scroll behavior, renders whatever sessionSlot it's given
  Footer.tsx               chrome — see "Nav" below for the 3→4 item deviation
  Logo.tsx                 the animated mark — server component, pure CSS. Paired with the "ĀRK"
                            wordmark in Header.tsx/Footer.tsx as of 2026-08-23 (was icon-only for
                            one day; see DEVELOPMENT_LOG.md)
  BrokenMapDiagram.tsx     home-page-only: the circular "three broken maps" diagram (SVG arcs +
                            absolutely-positioned labels), added 2026-08-23
  Primitives.tsx           Container, Section, Panel, Eyebrow — layout/typography helpers
  Button.tsx               ButtonLink / Button — the three-and-only-three variants (primary/secondary/tertiary)
  EmailCapture.tsx          client component, single-field capture used on home/footer/vision/primer
  CommissionForm.tsx        client component, the 4-field Studio form
  BriefRow.tsx              list-row brief unit (Research index) — NOT a card/thumbnail grid, per spec
  DepthControl.tsx          Quick/Explain/Deep/Complete tabs on a brief page
  ReadingProgress.tsx        the one continuously-animated element — 2px accent top bar on brief pages
  Card.tsx                  standard hover-lift card (spec §31.1) — Home's "three lines of work",
                              reused wherever a card grid is needed
  ResearchList.tsx           client component — Research's topic filter bar + BriefRow list
  motion/Reveal.tsx          whileInView fade-up wrapper, triggers once (spec §30.2)
  motion/HeroHeadline.tsx    home hero — word-stagger on mount + scroll-tied variable font weight
  motion/StickyNumerals.tsx  sticky-numeral pattern (spec §30.5), used by "The method" on Home
  motion/Marquee.tsx         CSS-only infinite marquee, pause on hover (spec §30.6)
  three/Scene3D.tsx          lazy-mount wrapper for R3F canvases — in-viewport only, static SVG
                              fallback under prefers-reduced-motion/no-WebGL (spec §30.3)
  three/IcosahedronScene.tsx  Vision's wireframe icosahedron (dynamically imported, ssr:false)
  three/ParticleClusterScene.tsx  Library's "assembling" particle cluster (same lazy-load pattern)
  three/StaticShapeSVG.tsx   the two static fallback shapes
  three/VisionOrb.tsx, three/LibraryOrb.tsx  page-level wrappers wiring Scene3D + the dynamic import

content/
  briefs.ts                Brief type + the 5-brief catalogue (001 available, 002-005 queued placeholders)
  primer.ts                 the 10 public Primer questions

db/
  schema.ts                 Drizzle schema: subscriber, order, commission_request

lib/
  db.ts                      getDb() — lazy Drizzle client, returns null if DATABASE_URL unset
  resend.ts                  sendPrimerLetter() — no-ops if RESEND_API_KEY unset
  supabase/client.ts          browser Supabase client (anon role — RLS applies)
  supabase/server.ts          server Supabase client for server components/route handlers/actions,
                               cookie-bound per request (@supabase/ssr)
  supabase/middleware.ts      session-refresh logic, called from root middleware.ts
  supabase/session.ts         getSessionProfile() — server-side session+profile read, used by
                               Header and any future protected-route layout

app/auth/
  actions.ts                 server actions — signUpWithPassword, signInWithPassword,
                               signInWithGoogle, signOut, requestPasswordReset
  callback/route.ts          handles both OAuth (?code=) and email-link (?token_hash&type=)
                               confirmation redirects

app/forgot-password/page.tsx  request a reset email (components/auth/ForgotPasswordForm.tsx)

app/articles/
  page.tsx                    /articles           index — filter/sort client component
  [slug]/page.tsx              /articles/[slug]    single article + comment thread
  [slug]/edit/page.tsx          /articles/[slug]/edit  author/moderator+ only
  new/page.tsx                  /articles/new       composer, auth required
  actions.ts                    server actions — saveArticle, deleteArticle, postComment,
                                  deleteComment (all via supabase-js, RLS-enforced)

app/account/                  auth-required dashboard (layout.tsx redirects if signed out)
  layout.tsx, page.tsx (Overview), articles/page.tsx, comments/page.tsx, settings/page.tsx,
  reset-password/page.tsx, actions.ts (updateProfile, changeEmail, changePassword,
  softDeleteOwnAccount)

app/control/                  admin control plane — protected route group, NOT a subdomain (no
                                custom domain configured yet — see IMPLEMENTATION.md)
  layout.tsx                    server-side role gate (owner/admin/moderator), 404s otherwise
  users/page.tsx, content/page.tsx, settings/page.tsx (owner-only), audit-log/page.tsx (owner-only)
  actions.ts                    changeUserRole (owner, direct RLS-enforced UPDATE),
                                  setUserStatus (admin/owner, via the admin_set_user_status RPC),
                                  bestEffortHardDeleteUser (owner, re-auth required — see
                                  "no service-role key" note below), removeArticle, removeComment

lib/articles.ts                Tiptap extension list (shared composer/renderer), ARTICLE_TAGS,
                                 shared types, readTimeMinutes()
lib/same-origin.ts              same-origin check for the two hand-rolled API routes (spec §33)

supabase/
  config.toml                local Supabase CLI config (from the original Gemini scaffold)
  migrations/0001_init.sql   hand-written SQL mirroring db/schema.ts exactly (legacy Drizzle tables)
  migrations/0002_auth_articles_admin.sql   profiles/articles/comments/admin_audit_log + RLS
  migrations/0003_storage_buckets.sql       article-covers/avatars buckets + Storage RLS
  migrations/0004_fix_role_escalation_rls_bug.sql   the real bug fix — see DEVELOPMENT_LOG.md
  migrations/0005_audit_log_insert_policy.sql       scoped audit-log INSERT (no service-role key)
  migrations/0006_admin_status_rpc.sql              admin_set_user_status SECURITY DEFINER fn
  (0002–0006 mirror what's live on the `ark` project, ref `qosdbcvdqtlcinetxdbh` — applied via the
  Supabase MCP, not `db:push`; re-run by hand if standing up another environment)

drizzle.config.ts            drizzle-kit config — schema in, migrations out to supabase/migrations
open-next.config.ts          OpenNext Cloudflare adapter config (currently defaults only)
wrangler.jsonc                Cloudflare Worker config — name, compat date/flags, assets binding
middleware.ts                 refreshes the Supabase session cookie every request
                                (lib/supabase/middleware.ts) — standard @supabase/ssr pattern
```

## Design tokens

Source of truth: `tailwind.config.ts` (colours, font sizes, spacing scale) and `app/globals.css`
(CSS custom properties for things Tailwind utilities can't cleanly express — rule opacity, grain,
reading-progress line).

### Colour

**Retokenized three times on 2026-08-23** — see `DEVELOPMENT_LOG.md` for the full reasoning
behind each pass. v1: single cream/terracotta system, replacing the former dark "ink" vs. light
"paper" dual mode (`DOCUMENTATION.md`'s "instrument vs. reader" framing is retired). v2: "Rajo
Guna luxury-tech" push — explicitly **not** dark mode — higher contrast, hotter accent, bolder
type. v3, after directly comparing to github.com and Mona Sans: background cooled from
beige-ivory toward a crisper near-white (matches GitHub's actual white/near-white base, not a
cream tint); accent stays signal orange (the user's own deliberate choice, not reversed a second
time); a dedicated `signal-blue` token added for one specific, narrow use — the globe visual
below — not a second sitewide accent.

| Token | Hex | Use |
|---|---|---|
| `bg` | `#FAF8F4` | Page background everywhere |
| `bg-raised` | `#FFFFFF` | Cards, raised sections |
| `ink` | `#171512` | Primary text (note: no longer a background token — this was the dark page-ground color pre-redesign) |
| `muted` | `#625E57` | Secondary text, captions, meta |
| `accent` | `#D94A16` | Signal orange — links, CTAs, the only primary accent |
| `accent-deep` | `#B83A0E` | Accent hover/active |
| `gold` | `#B58A45` | Restrained secondary accent — reserved, not yet used anywhere. Use sparingly if at all; the brief this came from was explicit about not running two accent colors at once |
| `signal-blue` | `#3E7BFA` | One narrow use only — the Home page globe visual (`components/three/GlobeScene.tsx`). Not a general accent |
| `rule` | `#DDD7CA` | Hairline borders, dividers |
| `ink-dark` | `#14110C` | The one remaining dark surface — the footer, and the Home page's full-bleed poster section |

Elevation is a fixed 4-level shadow scale (`shadow-1`…`shadow-4` in `tailwind.config.ts`,
spec §9) — cards at rest use level 1, hover level 2, the scrolled sticky header level 4. Rules
are `ink` at ~12% opacity (`var(--rule)` in `globals.css`), not shadows.

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

The *original* spec (`Design.pdf`) was explicit: "Three nav items maximum." That was already
overridden once (four items, `Research · Studio · Vision · Docs`, at the user's direct request
for a public docs tab). The *new* redesign spec (`ARK_Redesign_Specification.md` §4.1) itself
specifies six: `Research · Studio · Vision · Library · Articles · Docs`, plus "The Primer" kept
as a separate highlighted pill — implemented as of 2026-08-23. So the current six-item nav is
not a deviation from the active spec; it's a deviation from the original PDF that the newer,
user-supplied spec has since superseded. See `docs/internal/IMPLEMENTATION.md` for the full list
of acknowledged deviations.

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
- ~~Icon only, no wordmark~~ — **reversed the next day (2026-08-23, later session).** The
  "Design 2.pdf" home-page redesign mockup shows `<Logo />` paired with the "ĀRK" wordmark in
  the header, so `Header.tsx` and `Footer.tsx` both render `<Logo /><span>ĀRK</span>` again.
  Kept here, struck through, as a record that this was tried and reversed within 24 hours —
  don't be surprised if it swings again.

Usage: `<Logo height={32} />` next to a wordmark span (current header/footer usage), or alone
where a bare icon fits better (any component, server or client — it's imported plain, no
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

Both routes now check `lib/same-origin.ts`'s `isSameOrigin()` before touching the body (added
2026-08-23, spec §33) — rejects with 403 if the `Origin` header's host doesn't match the request
`Host`. Neither route currently does anything with Turnstile (not wired) or notifies a human (no
Slack/email-to-founder hook on new commission requests — you'd need to check the Supabase table
or the Cloudflare Worker logs).

Auth/articles/account/admin routes don't need this same treatment — they go through Next.js
server actions, which Next itself protects with an origin check before the action ever runs.

**Rate limiting (spec §33) is still a manual Cloudflare dashboard step, not something applied via
code in this repo** — now needed on `/sign-in`, `/sign-up`, and comment submission in addition to
the original two forms. Nobody has configured this yet; do it directly in the Cloudflare
dashboard (Security → WAF → rate limiting rules) once the site is live on a real domain.

## Cloudflare deploy

**This is not a plain `next build` deploy, and it does not go through Cloudflare Pages.** The
site targets Cloudflare **Workers** via OpenNext — a different product from Pages, with a
different deploy shape (a JS Worker script + assets binding, not a static
`pages_build_output_dir`).

- `npm run build` → plain `next build`. Kept this way on purpose — `@opennextjs/cloudflare`'s
  build step internally shells out to `npm run build`, so this script must stay a plain Next
  build or you get infinite recursion (hit and fixed on 2026-08-22 — see DEVELOPMENT_LOG.md).
- `npm run pages:build` → `opennextjs-cloudflare build`. Despite the name (kept for continuity
  with the spec's own phrasing), this has nothing to do with Cloudflare Pages — it produces
  `.open-next/worker.js` + `.open-next/assets`, which `wrangler.jsonc` points at (`main` /
  `assets.directory`). A **Workers**-shaped output.
- `npm run deploy` → build, then `wrangler deploy`. Needs either `wrangler login` (interactive,
  local machine) or `CLOUDFLARE_API_TOKEN` in the environment (CI).
- `wrangler.jsonc`: worker name `ark`, `account_id` (committed — account IDs aren't secret),
  `compatibility_flags: ["nodejs_compat", "global_fetch_strictly_public"]`, `assets` binding
  named `ASSETS`. No R2 cache binding or Cloudflare Images binding configured yet (the adapter
  supports both; skipped to avoid requiring a pre-provisioned R2 bucket for a first successful
  deploy — revisit once R2 is wired for brief PDF delivery anyway).

### Auto-deploy: GitHub Actions (`.github/workflows/deploy.yml`), not Cloudflare's git integration

**Discovered 2026-08-23** (see DEVELOPMENT_LOG.md): a Cloudflare **Pages** project was connected
to this GitHub repo via git integration, auto-building on every push. Its build always fails —
Pages reads `wrangler.jsonc`, finds it's shaped for Workers (`main`, `assets.directory`) rather
than Pages (`pages_build_output_dir`), logs "did you mean to use wrangler.toml to configure
Pages?", skips the file, falls back to guessing a static output directory, finds nothing, fails.
This is a structural mismatch, not a config bug — **Pages and OpenNext-for-Workers cannot share
one `wrangler` config**, and the earlier fix in this doc's history (pointing Cloudflare's "Build
command" at `npm run pages:build`) was written under the wrong assumption that the connected
project was Workers Builds (Cloudflare's newer git-integrated Workers CI) rather than Pages. It
was not — the error message's specific mention of `pages_build_output_dir` is Pages-only
phrasing and is what exposed the actual product.

Rather than trying to migrate that Pages project (Pages ≠ Workers Builds; you can't convert one
into the other in the dashboard — you'd create a new Workers Builds project and abandon the old
Pages one), the fix implemented is a GitHub Actions workflow that does the exact same
`opennextjs-cloudflare build` + `wrangler deploy` that already works from a local machine
(proven — see the 2026-08-23 "Live Cloudflare Worker deployment verified" log entry, live at
`ark.harekrishnachaitanya8.workers.dev`). Needs one GitHub Actions secret,
`CLOUDFLARE_API_TOKEN` (Workers Scripts: Edit permission). The old Pages project, if still
connected, will keep showing failed build checks in the GitHub PR/commit UI — those are cosmetic
noise now, not a signal anything is broken; either disconnect its git integration in the
Cloudflare dashboard or ignore it.

**Runtime secrets are separate from the CI secret above.** `CLOUDFLARE_API_TOKEN` only
authenticates the *deploy* — for the running Worker to reach Supabase/Resend at request time,
`DATABASE_URL` / `RESEND_API_KEY` need to be set as actual Worker secrets
(`npx wrangler secret put DATABASE_URL`, etc.), not GitHub Actions secrets. Not done yet — no
production database is configured.

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
