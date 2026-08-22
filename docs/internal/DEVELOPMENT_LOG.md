# Development Log

Internal. Not linked from the site, not part of any public route. Reverse-chronological —
newest entry on top. One entry per work session; keep entries factual and terse, not a diary.

---

## 2026-08-23 — Diagnosed Pages-vs-Workers deploy split, added GitHub Actions auto-deploy

- The user pasted a *third* Cloudflare build failure, from commit `c5bf199` (the "Live Cloudflare
  Worker deployment verified" entry below, pushed by a session other than this one — not
  something this session did). Its error was different from the 2026-08-22 failure: build
  succeeded this time (`npm run build` correctly resolved to plain `next build` and completed),
  but deploy failed with `Error: Output directory "dist" not found`, preceded by
  `"did you mean to use wrangler.toml to configure Pages? ... contains the pages_build_output_dir
  property"`.
- That phrasing is Cloudflare-**Pages**-specific — it revealed that the GitHub-connected
  Cloudflare project is a **Pages** project, not the Workers Builds product this session's
  2026-08-22 fix assumed. Pages expects a static `pages_build_output_dir`; this app is an
  OpenNext-built Worker (SSR, API routes) — a structurally different deploy shape. The two
  cannot share one `wrangler.jsonc`, and Pages can't be reconfigured into Workers Builds from the
  dashboard (they're different resource types; you'd create a new Workers Builds project instead
  of converting the Pages one).
- Rather than fight Pages into a shape it can't take, added `.github/workflows/deploy.yml`:
  checks out, `npm ci`, `npm run pages:build`, `npx wrangler deploy`, triggered on every push to
  `main`. This runs the exact same build+deploy that already succeeded manually (see the entry
  below — live at `ark.harekrishnachaitanya8.workers.dev`), just automated. Needs one GitHub
  Actions secret: `CLOUDFLARE_API_TOKEN`.
- Added `account_id` (`54619660799a58f43b4c0b54b2e83ef8`, from the successful manual deploy
  below) directly to `wrangler.jsonc` — account IDs aren't secret, and committing it means CI
  doesn't need a second secret just to resolve which account to deploy into.
- **Action required from the human owner** (again, no dashboard access from here): add
  `CLOUDFLARE_API_TOKEN` as a GitHub Actions secret (repo Settings → Secrets and variables →
  Actions), scoped to Workers Scripts: Edit. Separately — and this is a different secret store
  entirely — `DATABASE_URL` / `RESEND_API_KEY` still need to be set as actual Cloudflare Worker
  secrets (`npx wrangler secret put ...`) for the *deployed* site's forms to persist anywhere;
  neither is set yet, so the live Worker's forms currently no-op the same way local dev does.
  The old Pages project, if still connected, will keep failing its own build checks — that's
  expected now, not a signal to keep debugging it; disconnect its git integration or ignore it.

## 2026-08-23 — Live Cloudflare Worker deployment verified

- Ran `npm run deploy` via `@opennextjs/cloudflare` and `wrangler` under authenticated Cloudflare account (`54619660799a58f43b4c0b54b2e83ef8`).
- Worker successfully uploaded and deployed to Cloudflare: `https://ark.harekrishnachaitanya8.workers.dev` (Version `0e14b700-2c1b-4634-b64a-31fb65922d60`).
- Tested live endpoints via `curl`: `/`, `/research`, `/primer`, `/studio`, `/vision`, `/docs`, `/privacy` — all responding with HTTP/2 200.
- Confirmed GitHub remote `origin/main` (`risabh1234/ARK`) is in full sync with latest commits.

## 2026-08-23 — Rebrand to ĀRK, animated logo mark

- Renamed the brand across the entire codebase: **Aroha → ĀRK**. This was a direct, explicit
  user instruction, not a spec-driven decision — the repo/domain were always ĀRK
  (`~/Desktop/ĀRK`, GitHub `risabh1234/ARK`); "Aroha" was the name used in the Gemini-authored
  Design.pdf spec that Claude built the site from on 2026-08-22, and the user has now reverted
  the brand text to ĀRK while keeping the rest of that spec's design system and copy intact.
  `aroha.study` → `ark.study` throughout (metadata, Resend from-address, privacy-page contact),
  `package.json`/`wrangler.jsonc` worker name `aroha` → `ark`. Applied via `sed` across
  `app/`, `components/`, `lib/`, plus hand-review of README.md, CLAUDE.md, and the three
  current-state internal docs (DOCUMENTATION.md, IMPLEMENTATION.md, TECHNICAL_DOCUMENTATION.md).
  This file's own past entries were deliberately **left saying "Aroha"** — they're an accurate
  record of what the brand was called at the time, not something to retcon.
- Built `components/Logo.tsx` — a vector rebuild of the mark described in a second spec PDF
  ("ĀRK — Identity in Motion, Doc 02 · 5-second cycle"): earth-line horizon, copper
  circumference ring, two rising legs, a horizontal plate, and a star that ignites and decays to
  a resting 62% opacity. Implemented as pure CSS (`@keyframes` in `app/globals.css`, scoped
  under `.ark-mark`) rather than JS/Framer Motion — no client component needed, and
  `prefers-reduced-motion` is handled natively by a media query rather than JS feature-detection.
  Uses `pathLength={1}` on every drawn path so every stroke-dashoffset keyframe is just `1 → 0`
  regardless of actual path geometry.
- Per spec: draws once (the seven beats, 0.0–4.3s, easing `cubic-bezier(0.16,1,0.3,1)` — "the
  house curve," same easing already used for scroll-reveal elsewhere on the site) then holds —
  deliberately **not** looping and **not** implementing the literal "dissolve to ink" beat
  (4.3–5.0s) in the header, since a header logo that periodically fades to invisible would break
  navigation. The spec's own header note ("runs once on load, then holds... two loops on one
  screen is noise") reads as license for this — the full loop-forever behavior described for a
  standalone "hero lockup" context wasn't asked for and wasn't built.
- Replaced the Header's plain-text "Aroha" wordmark link with `<Logo />` alone — **no text
  beside or under the mark**, per explicit instruction. The header is therefore icon-only now;
  there is no visible "ĀRK" wordmark anywhere in the site chrome itself (only in body copy,
  page titles, and the footer's small-print line). If that ever reads as under-labelled for new
  visitors, the fix is a wordmark next to `<Logo />` in `Header.tsx` — deliberately not done here.
- The reference render supplied alongside the spec PDF (a warm, photographic 3D sunrise/glow
  image) was treated as mood reference only, per the spec's own page 2 instruction ("vector
  rebuild · no raster assets") — nothing raster was used; the shipped mark is flat SVG/line-work
  consistent with the rest of the site's "no gradients as decoration, diagrams over
  illustrations" rules.

## 2026-08-23 — Public docs, privacy policy, private doc set

- Added `/docs` — public methodology page explaining the four method principles, how a brief
  is structured (title → provocation → contents → Unresolved → depth control), the depth-control
  levels in plain terms, and a "what we deliberately don't do" trust section. Paper ground,
  matching the reader treatment used for briefs and the Primer.
- Added `/privacy` — privacy policy covering what's actually collected (email on
  subscribe/waitlist, the four Studio commission-form fields, order data on future checkout,
  standard Cloudflare server logs), why, which processors touch it (Supabase, Resend,
  Cloudflare, Razorpay/Stripe once live), retention, and a deletion-request path via
  `privacy@aroha.study`.
- Header nav grew from 3 items to 4 (`Research · Studio · Vision · Docs`) at the user's explicit
  request. This is a deliberate, acknowledged deviation from the source spec's "three nav items
  maximum" rule — see IMPLEMENTATION.md § Deviations from spec.
- Footer nav gained `Docs` and `Privacy` links.
- Started this private doc set (this file, TECHNICAL_DOCUMENTATION.md, IMPLEMENTATION.md,
  DOCUMENTATION.md) at the user's request, plus `CLAUDE.md` at repo root instructing future
  sessions to keep all four current on every change.
- Known gap surfaced, not fixed yet: the Studio commission form collects no reply-to contact
  (project / deadline / budget / question only, per the original spec's literal four-field
  instruction) — so as built, Aroha has no way to reply to a commission request unless the
  requester happens to put contact info in the free-text question field. Flagged in
  IMPLEMENTATION.md; not fixed in this session since it wasn't in scope of the ask.

## 2026-08-22 — Cloudflare deploy fix (OpenNext + Wrangler)

- First deploy attempt failed: Cloudflare's build pulled `dd39dad` (the pre-existing Gemini
  scaffold commit) because the Phase 1 build below had never been pushed — `npm run build`
  failed with `ENOENT package.json`.
- Added `@opennextjs/cloudflare` + `wrangler` as dev dependencies, `open-next.config.ts`,
  `wrangler.jsonc` (worker name `aroha`, `nodejs_compat` + `global_fetch_strictly_public`,
  assets binding).
- Hit an infinite-recursion bug: `defineCloudflareConfig()` from `@opennextjs/cloudflare`
  silently drops unknown top-level keys (including `buildCommand`) — it only forwards
  `incrementalCache` / `tagCache` / `queue` / `cachePurge` / `enableCacheInterception` /
  `routePreloadingBehavior`. Pointing `package.json`'s `build` script directly at
  `opennextjs-cloudflare build` therefore made the adapter's internal `npm run build` step
  call itself. Fixed by keeping `build` as plain `next build` and adding a separate
  `pages:build` script (`opennextjs-cloudflare build`) for the Cloudflare-specific bundle.
- Verified locally: `npm run pages:build` completes clean, `npx wrangler deploy --dry-run`
  resolves the config and the `env.ASSETS` binding without needing `wrangler login`.
- **Action required from the human owner** (no dashboard access from here): change the
  Cloudflare project's Build command from `npm run build` to `npm run pages:build`.
- Committed and pushed to `origin/main` (`risabh1234/ARK`) — commit `03dada6`.

## 2026-08-22 — Phase 1 build from the Design.pdf spec

- Context: a prior Gemini session had created the GitHub repo (`risabh1234/ARK`) and a local
  Supabase scaffold (`supabase/config.toml`) with a placeholder README. The user pointed to
  `~/Desktop/Design.pdf` as the actual spec to build against.
- The PDF turned out to be a full "Aroha — Design & Go-to-Market Specification" (11 numbered
  sections), not a simple mockup — positioning, exact colour tokens, type scale, grid/motion/
  texture rules, component specs, verbatim page copy for four pages, a Supabase schema, a
  funnel/revenue model, and a prescribed stack. Extracted via PyMuPDF at high zoom (the PDF's
  vector content was scaled into a ~38pt-wide strip inside an A4 page — unreadable at normal
  render resolution, legible only after cropping/zooming per-band).
- Built the full spec: design tokens (`tailwind.config.ts`, `app/globals.css`), primitives
  (`Header`, `Footer`, `Button`, `EmailCapture`, `Primitives.tsx`, `ReadingProgress`,
  `DepthControl`, `BriefRow`, `CommissionForm`), and the four pages (`/`, `/research` +
  `/research/[slug]`, `/studio`, `/vision`) plus `/primer` (the free asset), copy verbatim from
  the spec where the spec gave verbatim copy.
- Backend: Drizzle schema (`subscriber`, `order`, `commission_request`) + matching hand-written
  SQL migration, `/api/subscribe` and `/api/commission` routes. Both degrade gracefully (log a
  warning, don't throw) when `DATABASE_URL` isn't set, so local dev never breaks without a live
  backend.
- Explicitly *not* built (matches the spec's own "Phase 2 — do not build any of it tonight"
  section): the hosted reader with real depth-control gating, saved questions / per-reader
  library, the knowledge-graph visual, Codex cohort onboarding, Studio case pages, and — beyond
  the spec — live Razorpay/Stripe checkout, Turnstile, and R2-backed PDF delivery (all scaffolded
  in `.env.example`, none wired to real credentials).
- Verified via `npm run build` + `tsc --noEmit` (clean) and `curl` against a local `next dev`
  server for all six routes (200s, headings match spec copy verbatim). Could not get a real
  browser screenshot — this sandbox's network policy blocks the Playwright/Chromium CDN download
  (`SELF_SIGNED_CERT_IN_CHAIN`), and no `chromium-cli` binary was available.
