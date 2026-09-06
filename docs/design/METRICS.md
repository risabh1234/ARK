# Metrics — funnel-tied baselines, then relative targets

**Status: FILLED (methods + targets) — baselines marked PENDING until first capture.**
Phase 0 rule honoured honestly: with the site pre-launch and uninstrumented, inventing baseline
numbers would be fabrication. This file fixes *what* will be measured, *how* it gets captured,
and the relative targets that activate on capture.

## Measurement reality (read first)

- **No analytics are wired.** No page-view, scroll-depth, or click-through instrumentation exists.
- **Conversion rows are queryable today**: `subscriber` (with `source` tag:
  home/footer/vision/primer), `commission_request`, `order` (unwritten — checkout unwired).
  Capture = SQL count via Supabase MCP or dashboard; needs Ojas or a credentialed session.
- **Deployment surface is split**: docs/CI describe a Cloudflare Worker
  (`ark.harekrishnachaitanya8.workers.dev`) while production currently serves from a Vercel
  project (`ark-bgxnsvmze-risabh1234s-projects.vercel.app`). Traffic measurement is impossible to
  specify until one surface owns production. **Open infrastructure decision — flagged to Ojas,
  not resolvable inside this process.**
- Therefore: prototype-stage validation relies on structured human tests + in-prototype
  observation (below); production metrics activate post-launch against these definitions.

## Funnel metrics

| Stage | Metric | Capture method | Baseline | Target |
|---|---|---|---|---|
| Reach | Shares/mentions of dangerous-question content | Manual UTM/link tracking on shares | PENDING | Direction-dependent; not gated |
| Land | Home → Primer click-through | Event instrumentation (open decision) or redirect hop | PENDING (near-zero traffic) | ≥+25% vs baseline |
| Give | Subscribe conversion per capture slot (`subscriber` by `source`) | SQL count ÷ sessions on that surface | PENDING | ≥+25% vs baseline |
| Earn | Primer sequence advancement (`sequence_step` > 1) | SQL count (field exists, no writer yet) | PENDING | Instrumentation task logged |
| Sell | Brief purchases (`order` rows) | SQL count — **checkout unwired**; proxy until then: buy-click event | PENDING | Proxy target only |
| Keep | Weekly-letter retention | Resend engagement stats (once sequence ships) | PENDING | Not gated on redesign |
| Compound | Codex waitlist joins (`subscriber` where `source=vision`) | SQL count | PENDING | ≥+25% vs baseline |

*(2026-08-25 note: the vision document widens Compound's meaning — Codex/library/courses/media are
the platform's long-term surfaces for archetype D. The landing's job remains unchanged: one
action per screen. Future services appear as labelled, not-yet-charted map regions (L3), never
as competing CTAs.)*

**Guardrail (cash-now priority):** Studio commission form starts (`commission_request` rows +
form-abandonment if instrumented) must **never regress** vs baseline. A direction that lifts
Primer numbers while flattening Studio intent has failed the revenue order.

## Prototype-stage measures (no analytics required — Phase 4/6 gates)

| Measure | Instrument | Pass bar |
|---|---|---|
| 5-second cold-skeptic identification ("what is this site?") | Moderated test, verbatim log | ≥80% correct category (research/shows-sources), ≥3 of 5 testers |
| Scroll-to-strata/anatomy reach | Moderator observes scroll in session (or screen recording) | ≥60% of participants reach Beat 4 |
| Intended-mechanism probe | Ask each employed mechanism's question by name | Mechanisms confirmed or cut — none merely accumulated |
| Keyboard walkthrough | Manual matrix in VALIDATION_REPORT.md | All beats reachable, visible focus |
| Contrast floors | `scripts/design/contrast.mjs` table | Body ≥4.5:1, display ≥3:1 |
| Depth discovery *(added 2026-08-25)* | Moderator observes whether a labelled framework marker (L6 layer) is encountered before exit | ≥60% of moderated participants encounter one; zero surface-layer violations |

## First-capture protocol

1. Resolve the hosting question (Ojas decision, outside this process).
2. Pull SQL counts for `subscriber` (by source), `commission_request`; record date + values here.
3. Wire the single highest-value event (home→Primer CTR) before redesign launch so "Land" has a
   real denominator.
4. Re-baseline immediately before any redesigned home page goes live; deltas compare like-for-like.
