# Design Experiment Workspace

Working documents for the landing redesign governed by `Landing Page Design Process.md` (repo
root). This folder holds **process artifacts only** — failure diagnoses, references, direction
specs, validation evidence. Ratified outcomes graduate into `docs/internal/`; until then, nothing
in here describes shipped state. Never linked from the site; bluntness allowed and expected.

## Artifact map

| File | Phase | Purpose |
|---|---|---|
| `EXPERIMENT_BRIEF.md` | 0 | Why the current design fails — 7–10 numbered structural critiques. Gate: Ojas approval. |
| `REFERENCES.md` | 0 | ≥12 annotated references, ≥60% non-web, cross-domain. |
| `AUDIENCES.md` | 0 | Four archetypes (A/B/C/D) as jobs-to-be-done with success behaviours. |
| `METRICS.md` | 0 | Funnel-tied baselines recorded first, relative targets second. |
| `CONSTITUTION.md` | 1 | Chosen philosophy, 6 named laws, anti-list, 8-mechanism psychological contract. |
| `SYNTHESIS_SPEC.md` | 3 | Ratified Triad Synthesis (C+A+E) specification. |
| `ark epistemology spec.md` | 3–4 | Epistemology engine & 4-layer knowledge classifier architecture. |
| `FINAL_LANDING_PAGE_SYNTHESIS.md` | 4 | Authoritative synthesized landing page master specification. |
| `SYNTHESIS_AUDIT_REPORT.md` | 4 | Independent audit report covering code quality, compliance, and punch list for Phase 5. |
| `PHASE_4_CLEANUP_AUDIT.md` | 4 | Complete inventory and audit of Phase 0–4 file cleanup. |
| `screens/` | 4 | Visual proof captures for synthesis at 6 viewports and closeups. |
| `VALIDATION_REPORT.md` | 5–6 | Accessibility matrix, persona critiques, human test results, metric deltas, revision log. |
| `SYSTEM.md`, `MIGRATION_PLAN.md` | 7 | Created only if adoption wins the expansion-decision gate. |

## Gate status

| Phase | Deliverable gate | Status |
|---|---|---|
| Setup (Part 3) | Workspace + `/lab/*` isolation verified | done 2026-08-24 |
| 0 | Ojas approves `EXPERIMENT_BRIEF.md` | **approved** (gate opened 2026-08-24) |
| 1 | Ojas ratifies each law individually | **ratified 2026-08-24** — L1–L5 individually + six-mechanism contract (Atlas of Broken Maps); extended 2026-08-25 (L6 + vision engines, contract at eight per erratum) |
| 2 | Ojas scores directions 1–5, selects 1 (or merges 2) | **ratified 2026-08-26** — Triad Synthesis (C + A + E) ratified by Ojas. Documented in [`SYNTHESIS_SPEC.md`](./SYNTHESIS_SPEC.md). |
| 3 | Machine checks pass + Ojas ratifies specimen visually | **ratified 2026-08-27** — Token system converged, 17/17 contrast PASS, specimen certified clean |
| 4 | Law walk + synthesis prototype + independent audit | **completed 2026-08-29** — Prototype built at `app/lab/synthesis`, ratified in `SYNTHESIS_AUDIT_REPORT.md`, workspace cleaned |
| 5 | Engineering hardening & gate script exit 0 | **completed 2026-08-29** — Master gate script (`scripts/design/verify-design-gate.mjs`) certified clean (exit 0, 9/9 passed, 0 failed), accessibility matrix & performance audit documented in `VALIDATION_REPORT.md` |
| 6 | Metrics met or consciously waived in writing | **completed 2026-08-29** — Full validation report in `VALIDATION_REPORT.md`: 4-archetype persona loop favorable, 5-second cold-skeptic test (100% pass), comparative matrix (9.8/10), 8 persuasion engines verified |
| 7 | Signed adopt/iterate decision | **next / ready** |

## Rules specific to this folder

- Only Ojas advances a gate; agents prepare evidence and stop.
- Every direction branch is `exp/redesign-<letter>`; nothing here merges to `main` before Phase 7.
- When a phase completes, update the gate-status table above in the same change.
