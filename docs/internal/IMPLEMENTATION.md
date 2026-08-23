# Implementation Status

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
