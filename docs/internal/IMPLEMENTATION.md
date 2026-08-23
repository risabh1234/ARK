# Implementation Status

## `ARK_Redesign_Specification.md` — phase status (started 2026-08-23)

A second, much larger spec supersedes the original build-order table below for anything it
covers (design system, IA, auth/Articles/admin). The original table is kept as-is underneath for
history; treat this section as current.

| Phase | Spec area | Status |
|---|---|---|
| 1 | Design tokens, variable fonts | ✅ Done — `tailwind.config.ts`, `app/globals.css`, `app/layout.tsx` |
| 2 | Global chrome + Home | ✅ Done — `Header.tsx`, `Footer.tsx`, `app/page.tsx` |
| 3 | Research/Studio/Vision re-skin + first 3D element | ✅ Done — filter bar, live slots indicator, Vision icosahedron |
| 3a | `/docs` expansion (user request, mid-session) | ✅ Done — TOC, full brief structure, Articles FAQ (written ahead of Phase 6) |
| 4 | Library placeholder | ✅ Done — `app/library/page.tsx`, particle-cluster 3D form |
| 5 | Auth foundation (Supabase) | ✅ Done — project provisioned, schema+RLS live and **tested against the real database** (caught and fixed a real role-escalation bug, see `DEVELOPMENT_LOG.md`), sign-in/up/OAuth/reset wired. First Owner not yet set (no real user exists yet — needs someone to actually sign up first, per spec §25.2 "one-time manual step, never a UI"). |
| 6 | Articles + comments | ✅ Done — index/single/composer/edit, Tiptap rich text, sanitized render, one-level comment threading, Storage cover uploads. |
| 7 | `/account` dashboard | ✅ Done — Overview, My Articles, My Comments, Settings (email/password/OAuth-status/soft-delete). Found and fixed a second RLS interaction bug while building self-delete — see `DEVELOPMENT_LOG.md`. |
| 8 | Admin control plane | ✅ Done as `/control` (not a subdomain — see domain note above), with a real live-tested authorization design worked around the missing service-role key: RLS for role changes, a `SECURITY DEFINER` RPC for status changes, a scoped INSERT policy for audit logging, re-auth required before hard-delete. Hard-delete is honestly best-effort (can't remove `auth.users` without the service-role key — documented in the UI itself, not hidden). |
| 9 | Motion/cursor polish | ✅ Done — custom cursor (touch-excluded), Lenis smooth scroll (reduced-motion excluded), ambient audio toggle (ships with no audio file — no network access to source one; toggle degrades to disabled rather than silently breaking). |
| 10 | Hardening | ✅ Done — found and fixed a real gap where Framer Motion animations weren't respecting `prefers-reduced-motion` (the global CSS rule doesn't cover JS-driven animations), added same-origin checks to the two hand-rolled API routes, confirmed no secrets reach the client bundle. Cloudflare rate limiting and Owner/Admin 2FA remain manual steps outside what code can do here. |

### Deviations/decisions specific to this redesign

- **Single cream theme, everywhere.** The former dark "ink" (home/studio/vision) vs. light
  "paper" (briefs/Primer/docs/privacy) dual mode is retired, at the user's explicit direction —
  see `DEVELOPMENT_LOG.md` 2026-08-23. `DOCUMENTATION.md`'s "instrument vs. reader" framing no
  longer describes the live site.
- **Admin panel as `app/control/*`, not a real subdomain.** No custom domain is configured yet
  (see "Domain — undecided" below), so `control.<domain>` isn't buildable. Same RLS security
  model either way — only the URL differs. Move it once a domain exists.
- **"Continue with Google" will be built but non-functional until real OAuth credentials exist.**
  Documented here rather than hidden, per the user's explicit choice.
- **Domain — undecided, do not act unilaterally.** User described nesting ĀRK under an existing
  `arohaomniscorp.com` property; the SEO/brand-recall tradeoff of that vs. a dedicated domain was
  raised (the code already assumes `ark.study` in `metadataBase`). User chose to leave this open.
  **No DNS/Cloudflare domain changes without asking again.**
- **Research keeps its list layout (`BriefRow`), not a card grid.** Pre-existing, logged
  deviation from any generic card pattern — unrelated to this redesign, not reversed by it.
- **Every page is now dynamically rendered (`ƒ`), not static (`○`).** Direct consequence of
  `Header.tsx` reading the session via cookies on every render (needed to avoid a flash of the
  wrong signed-in state, spec §20.3) — confirmed via `next build`'s route summary. Not a
  regression; an inherent tradeoff of session-aware chrome. Revisit with PPR/Suspense boundaries
  in Phase 10 if it becomes a real perf problem, not before.
- **RLS caught a real bug via live testing, not just code review** — see `DEVELOPMENT_LOG.md`'s
  2026-08-23 "Phase 5" entry for the full transcript. Any future RLS policy change should be
  re-verified the same way (simulate `request.jwt.claims` + `SET LOCAL ROLE` via
  `execute_sql`, not just "the migration applied cleanly").
- **No `SUPABASE_SERVICE_ROLE_KEY` available in this build.** The Supabase provisioning tooling
  used this session deliberately doesn't expose it. Every admin action was designed to work
  through RLS + a `SECURITY DEFINER` RPC instead (see `DEVELOPMENT_LOG.md`'s Phase 8 entry) —
  works for role/status changes and content removal, but **true hard-delete (removing the
  `auth.users` row) genuinely cannot be done without it**, since that's a GoTrue Admin API
  operation, not something RLS can reach. Set `SUPABASE_SERVICE_ROLE_KEY` as a server-only env var
  later to close this gap.
- **No `reports` table / report-flagging UI.** The spec (§22, §26.2) mentions reports as
  something the moderation queue could show, not a required schema. `/control/content` is
  direct search/browse with a remove action instead. Add a `reports` table + a public "report
  this" control if/when actually wanted — nothing was fabricated in its place.
- **No `site_settings` table** — `/control/settings` (feature flags, newsletter copy, homepage
  highlights per spec §26.2) says plainly in the UI that this isn't built, rather than faking
  controls that don't do anything.
- **No 2FA enrollment UI** for Owner/Admin accounts (spec §26.1 suggestion, not a hard
  requirement). Supabase Auth supports TOTP; not wired.
- **Ambient audio (§32) ships with no actual track.** No network access in this environment to
  source a public-domain/licensed loop, and one wasn't faked. `components/AudioToggle.tsx`
  degrades to a disabled, explained state until a real hosted URL is set.
- **`npm audit`: 4 pre-existing high-severity issues** (`drizzle-orm`, `next`'s bundled
  `postcss`/`sharp`) surfaced when installing this phase's new dependencies. None are introduced
  by the new packages; all require a major Next.js version bump to fix. Not addressed — flagged
  as a known gap, not silently fixed mid-redesign.

---


Internal. What's actually done vs. stubbed vs. missing, checked against the source spec's own
build order (`Design.pdf` § 11) and Phase 2 list. Update the relevant row whenever a gap closes
or a new one opens — don't let this drift into aspirational fiction.

## Spec build order (§ 11) — status

| # | Spec step | Status |
|---|---|---|
| 01 | Tokens and type — palette as CSS variables, three fonts, spacing scale, radius 0 | ✅ Done — `tailwind.config.ts`, `app/globals.css` |
| 02 | Header, footer, section wrapper, three buttons, email field | ✅ Done — `components/*`. Nav is 4 items, not 3 (deviation, see below) |
| 03 | Home, whole page, copy verbatim | ⚠️ Superseded 2026-08-23 — a second spec PDF ("Design 2.pdf") redesigned the home page (new hero eyebrow, circular diagram replacing the quote panels, restructured method list, new "Anatomy of a brief" section, "three doors" → "three lines of work"). Current `app/page.tsx` matches Design 2.pdf, not the original Design.pdf home copy verbatim. |
| 04 | Email capture end to end — field → Drizzle → Resend D0 | ⚠️ Partial. Field → API → Drizzle insert works. Resend send works *if* `RESEND_API_KEY` is set (not set anywhere yet — untested against a real inbox). The full 5-letter sequence (D0/D1/D3/D5/D7 from spec § "The five letters") is **not built** — only D0 (the Primer link) exists. `subscriber.sequence_step` exists in the schema but nothing advances it. |
| 05 | Studio page and commission form | ✅ Page and form done. ⚠️ Form has no reply-to field — see "Known gaps" below. |
| 06 | Research index and Brief 001 page, Unresolved list visible, buy button live | ✅ Page/list/Unresolved section done. ❌ Buy button renders but **does not charge anyone** — no Razorpay/Stripe integration, clicking it does nothing. |
| 07 | Vision page and waitlist field | ✅ Done — `app/vision/page.tsx` |
| 08 | Ten public Primer questions as a static page | ✅ Done — `app/primer/page.tsx`, `content/primer.ts` |

## Deployment

- ✅ **Manual Cloudflare Workers deploy** — `npm run deploy` works, verified live at
  `ark.harekrishnachaitanya8.workers.dev` (all 7 routes 200).
- ✅ **Automated deploy on push** — `.github/workflows/deploy.yml`, added 2026-08-23. Needs the
  `CLOUDFLARE_API_TOKEN` GitHub Actions secret to actually run (not yet confirmed set).
- ❌ **Runtime secrets not set on the Worker.** `DATABASE_URL` / `RESEND_API_KEY` aren't
  configured via `wrangler secret put`, so the *deployed* site's forms currently no-op the same
  way local dev without env vars does — they don't error, they just don't persist anything.
- ❌ **A Cloudflare Pages project connected to this repo will always fail its own build** — it's
  the wrong product for an OpenNext/Workers app. Not a bug to fix; disconnect it or ignore its
  failing checks. See TECHNICAL_DOCUMENTATION.md § Cloudflare deploy for the full diagnosis.
- ❓ **Open, unresolved: user asked to move the deploy target to Pages instead of Workers**
  (2026-08-23). Asked a clarifying question about the real cost (dropping OpenNext, Edge Runtime
  required on every dynamic route, abandoning the working Workers deploy); the user didn't
  answer it and moved to an unrelated task instead. **Do not treat this as decided in either
  direction** — the Workers deploy above is still the one that works and is live, but the user's
  stated preference for Pages hasn't been walked back either. Ask again before assuming, next
  time it's relevant.

## Phase 2 (spec explicitly says: do not build yet) — still not built, as intended

- Hosted reader with real depth-control gating (current `DepthControl` is a visual tab switcher;
  it does not actually restrict/reveal content behind Deep/Complete).
- Saved questions and a per-reader library.
- Knowledge-graph public visual.
- Codex cohort onboarding flow.
- Studio case-study pages.

## Beyond the spec — scaffolded, not wired

- **Razorpay / Stripe checkout** — env vars reserved in `.env.example`, no SDK calls, no webhook
  handlers, `order` table exists but nothing writes to it.
- **Cloudflare Turnstile** — env vars reserved, not attached to either form.
- **Cloudflare R2 presigned URLs** — for brief PDF delivery; not implemented, no bucket
  provisioned.
- **Resend 5-letter sequence** (D0/D1/D3/D5/D7) — only D0 exists.

## Added this session, beyond the original 4-page spec

- `/docs` — public methodology page (user-requested, not in the original spec's four pages).
- `/privacy` — privacy policy (user-requested).
- Private internal doc set (this folder) + `CLAUDE.md` maintenance rule.
- Brand renamed **Aroha → ĀRK** across the whole codebase (user-requested, 2026-08-23).
- `components/Logo.tsx` — the animated mark from the "Identity in Motion" spec, built as vector
  SVG + pure CSS. See TECHNICAL_DOCUMENTATION.md § Logo / identity motion — runs once then holds
  rather than looping/dissolving in the header, still true; the icon-only (no wordmark) deviation
  noted there was reversed the next day, see below.
- **Home page redesign** (2026-08-23, from "Design 2.pdf"): `components/BrokenMapDiagram.tsx`
  (the circular "three broken maps" diagram), a new "Anatomy of a brief" section, restructured
  method list and "three lines of work" rows, header wordmark restored, footer restructured to
  two nav columns. See DEVELOPMENT_LOG.md for the full breakdown.

## Deviations from the spec, acknowledged

1. **Header nav is 4 items, not "three maximum."** Added `/docs` to `Research · Studio ·
   Vision`. Done at the user's explicit, direct request on 2026-08-23 — a live instruction
   takes precedence over a static rule in a design brief. If this ever needs to shrink back to
   three, the obvious move is folding Docs into the footer only and dropping it from the header.
2. ~~Header has no visible wordmark at all, icon-only~~ — **reversed 2026-08-23.** The
   Design 2.pdf mockup shows `<Logo />` paired with the "ĀRK" wordmark in the header, so it's
   back. This item is kept (struck through) rather than deleted so the history of the decision
   isn't lost — icon-only was correct for the one day it was in effect, per instruction at the
   time.
3. **Primer's 50 questions were never specified verbatim in the source PDF** (it only described
   their structure — 8 categories, a closing copper line pointing at the brief that "takes this
   one apart"). The 10 public ones in `content/primer.ts` were written to match the spec's stated
   voice test ("could a curious atheist read this and nod") — they're original copy, not
   transcribed from the PDF, unlike every other page's copy which is verbatim per the spec's own
   instruction ("copy is written to ship... change names and numbers, not structure or rhythm").
4. **Brief 001's contents (provocation, 7-bullet "what's inside," sample excerpt) were written
   editorially**, following the spec's description of what Brief 001 is about, not transcribed —
   the PDF gave the brief's title, dek, and Unresolved-question themes, not its full body copy.

## Known gaps (bugs, not deviations)

- **Studio commission form collects no contact method.** Per the spec's literal instruction
  ("Four fields: project, deadline, budget range, the question" — no email listed), the form as
  built has no way for ĀRK to reply to a submission unless the requester volunteers contact
  info inside the free-text "question" field. This is very likely an oversight in the original
  spec rather than an intentional constraint. Flagged, not fixed — fixing it (adding a 5th
  field) is a one-line change if/when the human owner wants it.
- **No unsubscribe mechanism.** `subscriber` rows can only be removed by someone manually
  deleting them (or, once built, by a human actioning a `privacy@ark.study` request per the
  privacy policy). No self-serve unsubscribe link or endpoint exists.
- **No admin/founder notification** when a commission request or new order comes in — you have
  to check the Supabase table directly.
