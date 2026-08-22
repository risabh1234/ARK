# Working in this repo

Aroha — see `docs/internal/DOCUMENTATION.md` for what the product is and the brand/methodology
rules it follows, and `docs/internal/TECHNICAL_DOCUMENTATION.md` for the architecture. Read both
before making non-trivial changes; they exist so you don't have to re-derive project context
from scratch each session.

## Standing rule: keep the private docs current

`docs/internal/` holds four files, deliberately outside `app/` so Next.js never routes to them
(they must never become public pages — that's distinct from the public `/docs` and `/privacy`
routes, which are a different thing and intentionally public):

- `DEVELOPMENT_LOG.md` — dated, reverse-chronological entries. Add one per work session,
  factual and terse, not a diary.
- `TECHNICAL_DOCUMENTATION.md` — architecture reference. Update whenever the stack, schema,
  routes, env vars, or deploy process change.
- `IMPLEMENTATION.md` — status tracker (done / stubbed / missing) against the original spec and
  anything added since. Update whenever something moves from stubbed to done, or a new gap is
  found.
- `DOCUMENTATION.md` — product/brand/methodology reference. Update only when the actual
  positioning, pricing, catalogue, or voice rules change — not on every code change.

**After every substantive change to this repo, update whichever of these four are affected
before ending the turn.** Small copy fixes and pure refactors don't need a log entry; new
features, schema changes, deploy changes, new pages, and scope decisions do.

## Other conventions established so far

- Design tokens, copy, and structure for the four original pages (`/`, `/research`, `/studio`,
  `/vision`) plus `/primer` come from a spec PDF that is not in this repo — treat
  `DOCUMENTATION.md` and `TECHNICAL_DOCUMENTATION.md` as the durable record of it, since the PDF
  itself won't be available in future sessions.
- `npm run build` must stay a plain `next build` — the Cloudflare-specific build is
  `npm run pages:build`. Do not alias `build` to the OpenNext command; it recurses into itself
  (see DEVELOPMENT_LOG.md, 2026-08-22 entry, for why).
- Nav is 4 items (`Research · Studio · Vision · Docs`), a deliberate, logged deviation from the
  source spec's "three nav items maximum" — see IMPLEMENTATION.md § Deviations.
- No screenshot tooling is available in this environment (network policy blocks the
  Playwright/Chromium download). Verify UI changes via `next build`, `tsc --noEmit`, and
  `curl` against a local `next dev` server; say so plainly if a change needs an actual browser
  to confirm and note that as unverified rather than claiming visual confirmation you don't have.
