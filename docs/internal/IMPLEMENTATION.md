# Implementation Status

Internal. What's actually done vs. stubbed vs. missing, checked against the source spec's own
build order (`Design.pdf` § 11) and Phase 2 list. Update the relevant row whenever a gap closes
or a new one opens — don't let this drift into aspirational fiction.

## Spec build order (§ 11) — status

| # | Spec step | Status |
|---|---|---|
| 01 | Tokens and type — palette as CSS variables, three fonts, spacing scale, radius 0 | ✅ Done — `tailwind.config.ts`, `app/globals.css` |
| 02 | Header, footer, section wrapper, three buttons, email field | ✅ Done — `components/*`. Nav is 4 items, not 3 (deviation, see below) |
| 03 | Home, whole page, copy verbatim | ✅ Done — `app/page.tsx` |
| 04 | Email capture end to end — field → Drizzle → Resend D0 | ⚠️ Partial. Field → API → Drizzle insert works. Resend send works *if* `RESEND_API_KEY` is set (not set anywhere yet — untested against a real inbox). The full 5-letter sequence (D0/D1/D3/D5/D7 from spec § "The five letters") is **not built** — only D0 (the Primer link) exists. `subscriber.sequence_step` exists in the schema but nothing advances it. |
| 05 | Studio page and commission form | ✅ Page and form done. ⚠️ Form has no reply-to field — see "Known gaps" below. |
| 06 | Research index and Brief 001 page, Unresolved list visible, buy button live | ✅ Page/list/Unresolved section done. ❌ Buy button renders but **does not charge anyone** — no Razorpay/Stripe integration, clicking it does nothing. |
| 07 | Vision page and waitlist field | ✅ Done — `app/vision/page.tsx` |
| 08 | Ten public Primer questions as a static page | ✅ Done — `app/primer/page.tsx`, `content/primer.ts` |

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

## Deviations from the spec, acknowledged

1. **Header nav is 4 items, not "three maximum."** Added `/docs` to `Research · Studio ·
   Vision`. Done at the user's explicit, direct request on 2026-08-23 — a live instruction
   takes precedence over a static rule in a design brief. If this ever needs to shrink back to
   three, the obvious move is folding Docs into the footer only and dropping it from the header.
2. **Primer's 50 questions were never specified verbatim in the source PDF** (it only described
   their structure — 8 categories, a closing copper line pointing at the brief that "takes this
   one apart"). The 10 public ones in `content/primer.ts` were written to match the spec's stated
   voice test ("could a curious atheist read this and nod") — they're original copy, not
   transcribed from the PDF, unlike every other page's copy which is verbatim per the spec's own
   instruction ("copy is written to ship... change names and numbers, not structure or rhythm").
3. **Brief 001's contents (provocation, 7-bullet "what's inside," sample excerpt) were written
   editorially**, following the spec's description of what Brief 001 is about, not transcribed —
   the PDF gave the brief's title, dek, and Unresolved-question themes, not its full body copy.

## Known gaps (bugs, not deviations)

- **Studio commission form collects no contact method.** Per the spec's literal instruction
  ("Four fields: project, deadline, budget range, the question" — no email listed), the form as
  built has no way for Aroha to reply to a submission unless the requester volunteers contact
  info inside the free-text "question" field. This is very likely an oversight in the original
  spec rather than an intentional constraint. Flagged, not fixed — fixing it (adding a 5th
  field) is a one-line change if/when the human owner wants it.
- **No unsubscribe mechanism.** `subscriber` rows can only be removed by someone manually
  deleting them (or, once built, by a human actioning a `privacy@aroha.study` request per the
  privacy policy). No self-serve unsubscribe link or endpoint exists.
- **No admin/founder notification** when a commission request or new order comes in — you have
  to check the Supabase table directly.
