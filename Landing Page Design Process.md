# Landing Page Design Process — AI-Executable Methodology for ĀRK

**v2, 2026-08-24 — rewritten against this actual codebase.** The previous version of this file was
curated for a different project (a Vedantic reading portal with Sanskrit display type and
seeker/scholar archetypes) and inherited infrastructure that does not exist here. Following it in
this repo would produce a design that violates ĀRK's own voice laws. This version replaces it
entirely.

This is a gate-enforced, phase-structured process adapted from how Netflix, Disney, Google, and
Apple actually ship design — executed by AI agents end-to-end, with **Ojas as the sole taste
authority at every decision gate**. Every phase is a contract: **Inputs → Steps → Deliverables →
Gate → Decision Owner**. An agent may not advance past a gate; only Ojas opens it.

Before executing anything, read (in this order): `CLAUDE.md`,
`docs/internal/DOCUMENTATION.md`, `docs/internal/TECHNICAL_DOCUMENTATION.md`. They are the durable
record of positioning, voice law, and architecture. This file governs *process*; those govern
*facts*.

---

## Part 0 — The Subject, Pinned

No design work begins until these are stated. They are pinned here so no executor re-derives them
worse:

| Field | Value |
| - | - |
| **Subject** | ĀRK — a knowledge-instrument company and civilization-scale knowledge platform. Research briefs (₹1,299/$19, e.g. *The Architecture of Desire*, 63 sources, 48 pages), Studio commissions (Sprint ₹25k → Retainer ₹1.5L/mo), Codex (future platform, waitlisted). **Not a religious brand, and not spiritual branding**: the tradition enters as the deepest labelled layer, progressively disclosed (L6; `docs/design/ARK_Vision_Document.md`). |
| **Audience** | (a) **Commissioning professionals** — filmmakers, authors, journalists who need research that has to be right; judge rigour signals and handover artifacts. (b) **Serious readers** — intellectually ambitious, allergic to self-help tone, Brief 001 buyers. (c) **The cold skeptic** — arrives from a share, decides in seconds; passes only if a curious atheist could nod at every *surface-layer* sentence. (d) **The ambitious builder** — student, programmer, athlete, founder; arrives for capability, must feel trajectory-expand without motivation-content smell (vision §2). |
| **The page's single job** | Convert unresolved curiosity into one action: read the Primer (free), commission Studio (cash-now), or join the Codex waitlist — in that revenue order: `Studio (now) → Briefs (volume) → Codex (later)`. |
| **Thesis the design must embody** | *"People are not uninformed. They are unintegrated."* The site demonstrates integration — labelled claims, shown sources, declared uncertainty — rather than asserting it — and emits ignition through honest scale: a larger possible self and a smaller ego in the same breath (vision §2, §10). |
| **Non-negotiable voice law** | Surface layer (H1s, nav, CTAs, home beats): every sentence passes *could a curious atheist read this and nod?* Deeper layers may name the tradition — always labelled as the stated framework, always stratified, never assumed agreement anywhere (constitution L6; DOCUMENTATION.md layer discipline). |

---

## Part 1 — What the Best Organizations Actually Do

| Org | Core Method | What You Steal |
| - | - | - |
| **Disney (Imagineering)** | *Blue Sky → Concept → Design Development → Build.* Story-first; "weenies" (visual magnets pulling guests forward); kinetic narrative. | The home page is a **scroll-narrative with beats**, not a feature list. One weenie per beat. |
| **Apple** | Work backwards from the desired *emotional response*. Prototype in the real medium. Principles as single words. | Judge in **real code early**, not mockups. 3–5 one-word principles before pixels. |
| **Google (GV Sprint)** | *Understand → Diverge → Decide → Prototype → Test.* Divergence is mandatory. HEART metrics defined before designing. | **Generate breadth, then converge with data.** Metrics before pixels. Never settle on the first direction. |
| **Netflix** | Tokens as the design/engineering contract; relentless testing; motion and imagery carry emotion, not copy. | **Token-first architecture** (this repo already retokenized 3× in one day — the muscle exists). Test, don't guess. |
| **This repo's own precedent** | Gate-enforced work: RLS bugs caught by *testing the database, not the UI*; deviations logged with rationale; retokenization passes recorded in DEVELOPMENT_LOG.md. | Apply the **same gate discipline to design**: verifiable acceptance criteria, honest logs, no silent drift. |

**Meta-principle:** constraints are written down before pixels exist, and enforced by machines
where the machine can check — by named human judgment where it can't. Both kinds of check are
recorded, never vibes.

---

## Part 2 — Ground Truth of This Repo

Facts that bind any direction. An agent that violates these has failed before designing.

### Stack realities

- Next.js 15 App Router at repo **root** — there is no `src/`, no route groups. Pages live in
  `app/`, components in `components/`.
- Design tokens: `tailwind.config.ts` (colors, fontSize names `display/h1/h2/lead/body/small/ui/eyebrow`,
  spacing scale 8/16/24/32/56/88/140, elevation `shadow-0…4`, easing `standard`/`editorial`,
  durations fast/base/slow) + CSS custom properties in `app/globals.css` (`--rule`, motion vars).
  This is the whole pipeline — there is no `tokens/` TS namespace to mirror.
- Fonts: **Fraunces Variable** (serif/display) + **Inter Variable** (sans/UI) via
  `next/font/google`, no fixed weight array (the variable axis powers the scroll-tied weight on
  the home hero). Any direction proposing different faces edits `app/layout.tsx` and must test
  diacritics (Ā, ā, ī, ṃ, ṛ) in candidate faces — "ĀRK", "Vimāna", "Sāṃkhya" render everywhere.
- Radius 0 is enforced globally (`* { border-radius: 0 !important }` in globals.css). A direction
  wanting radius must consciously remove that rule and own the consequences.
- Available and already-installed: `framer-motion`, `three` + `@react-three/fiber` + drei,
  `lenis`, `howler` (installed, unused), Tiptap, zod. Using installed deps costs nothing; adding
  deps needs justification in the direction spec.
- Deploy: **push to `main` auto-deploys to production** (`ark.harekrishnachaitanya8.workers.dev`
  via GitHub Actions + OpenNext). Experiment branches therefore never merge to main before their
  gate passes.

### Verification reality (honesty rules)

- Available: `npm run typecheck`, `npm run build` (plain `next build` — never alias
  it to OpenNext), `next dev` + curl per route, and dependency-free Node scripts.
- Not available: `npm run lint` prompts interactively (the repo has never had an ESLint config —
  build/typecheck/curl are the house verification set per CLAUDE.md), and `rg` is not installed
  on this machine — wall greps and the contrast audit must be implemented inside the
  dependency-free Node gate script, not as shell one-liners.
- Browser automation/screenshots have been network-blocked in past sessions (see CLAUDE.md). If
  tooling works in your environment, use it and say so; if not, verify by the means above and
  **mark every visual claim unverified rather than claiming confirmation you don't have**. This
  house rule outranks looking good in a summary.
- Local environment notes (2026-08-24): a placeholder `.env.local` is required or the Supabase
  middleware 500s every route; local Node is v23 while CI pins v22.

### The shipped-device inventory (re-judge, don't inherit)

These exist today. Each was a deliberate choice once; several now coincide with mass-produced
AI-design tropes. Phase 2 directions may retain **at most two** of them; the rest must be
re-decided from evidence, not inertia:

1. Warm near-white ground `#FAF8F4` + serif display (Fraunces) + terracotta-orange accent `#D94A16`
   — this combination **is** the current default look of AI-generated web design (cream + serif +
   terracotta). Its distinctiveness presently lives in copy and structure, not palette.
2. Word-stagger hero headline + scroll-tied variable font weight.
3. Radial-gradient `.hero-glow` loop behind the hero.
4. Infinite marquee above the email capture.
5. Sticky-numeral method section.
6. Hover-lift bordered cards (`Card.tsx`) for the three lines of work.
7. Wireframe icosahedron (Vision) / assembling particle cluster (Library) — adjacent to the
   "floating 3D blob" trope; both are lazy-mounted with static fallbacks (good engineering).
8. Hairline-rule everything + radius 0 — adjacent to the "broadsheet" default.
9. Full-bleed ink-dark poster break ("A claim you cannot trace is an opinion.") with globe visual.
10. Reading-progress bar — the one continuously animated element; cheap, useful, likely keepable.

Note: the README's "Design system" section still describes the **retired** Spectral/Geist ink/paper
system. `TECHNICAL_DOCUMENTATION.md` is the source of truth. Fixing README is a Phase 7 deliverable.

---

## Part 3 — Critical Setup Before Phase 0

Isolation adapted to this repo (no `src/`, no route groups, auto-deploy on main):

1. **Design workspace**: all process artifacts live in `docs/design/` (new folder, committed):
   `EXPERIMENT_BRIEF.md`, `REFERENCES.md`, `AUDIENCES.md`, `METRICS.md`, `CONSTITUTION.md`,
   `directions/A…E/`, `DIVERGENCE_LOG.md`, `VALIDATION_REPORT.md`, decision docs. Keep them out of
   `docs/internal/` — that folder stays the durable product/architecture record per CLAUDE.md;
   only ratified outcomes graduate into it.
2. **Lab routes**: prototype directions at `app/lab/<direction>/page.tsx` (e.g. `/lab/a`),
   self-contained under a shared `app/lab/layout.tsx`. Lab pages import **nothing** from
   `components/` or `lib/` — they are free to rebuild primitives differently, which is the point.
3. **Token isolation without a second pipeline**: direction tokens are CSS custom properties
   scoped under `[data-dir="a"]` etc., defined in `app/lab/lab.css` and consumed only inside lab
   routes. Nothing touches `tailwind.config.ts` until Phase 7 promotion. The wall is mechanical:
   production files must not reference `/lab/`, lab files must not import `@/components/*` or
   `@/lib/*` (gate commands in Phase 5).
4. **Git isolation**: one branch per direction — `exp/redesign-a` … `exp/redesign-e`. Design in
   branches, never in prose. Never push `exp/*` to `main` (auto-deploy).
5. **Real-device viewing**: primary loop is `npm run dev` + phone on LAN. When remote eyes are
   needed, deploy a disposable preview worker (`npx wrangler deploy --name ark-lab` from the exp
   branch; `wrangler delete --name ark-lab` afterwards) — never the production worker name.
6. **Write the "why" first**: `docs/design/EXPERIMENT_BRIEF.md` records exactly what fails in the
   current design before anything new is generated. Skipping this guarantees the same failure in
   new clothes.

---

## Part 4 — The Phase Process

### Phase 0 — Diagnosis & Discovery

*Mode: Google "Understand"*

| Element | Detail |
| - | - |
| **Inputs** | Live site, `tailwind.config.ts`, `app/page.tsx` and sibling pages, DOCUMENTATION.md, competitor/reference URLs |
| **Steps** | (1) Write the failure diagnosis: **7–10 numbered structural critiques**, not "it's ugly". Mandatory first item: score the current system honestly against the 2026 AI-default looks (Part 5, Appendix B) — name exactly which defaults it sits inside and which choices genuinely escape them. Audit each shipped device (Part 2 inventory) as keep/mutate/kill with one sentence each. (2) **Cross-domain audit, not competitor audit**: ≥12 annotated references, ≥60% from outside web design, mined from the subject's actual world of instruments and evidence — scientific instrument design (Braun/Rams, laboratory optics, oscilloscope faces), observatory and planetarium wayfinding, archival finding aids and library card catalogues, museum vitrine and specimen labels, cartography and atlas legend systems (a map legend *is* "sources shown"), scholarly critical editions (apparatus criticus, sigla, footnote furniture), engineering drawings and title blocks, aircraft checklists, statistical yearbooks, ISOTYPE charts, Indian technical culture (Survey of India maps, ISRO instrumentation) — **not** temple architecture, not manuscript gilding; that register is banned by voice law. (3) Write the 3 archetypes from Part 0 as jobs-to-be-done with a success behaviour each. (4) Define metrics against the documented funnel `Reach → Land → Give → Earn → Sell → Keep → Compound`: record **current baselines first** (Primer click-through from home, capture conversion, scroll-depth to the strata table, Studio form starts — cash-now, must never regress), then set relative targets (e.g. "+25% over baseline"), never invented absolutes. |
| **Deliverables** | `docs/design/EXPERIMENT_BRIEF.md`, `REFERENCES.md` (annotated, ≥12, ≥60% non-web), `AUDIENCES.md`, `METRICS.md` (baselines + targets) |
| **Gate** | Ojas approves the brief. Vague diagnosis = no pass; the brief must contain at least one uncomfortable finding. |
| **Decision owner** | **Ojas** |

### Phase 1 — Design Constitution (Blue Sky)

*Mode: Disney Blue Sky + Apple principles*

| Element | Detail |
| - | - |
| **Inputs** | All Phase 0 documents |
| **Steps** | (1) Generate **5 candidate design philosophies** — manifestos of 150–250 words describing feeling and worldview, not attributes. Force variety along axes grounded in this subject: *"the landing as calibrated instrument"* (rigour made sensuous), *"the landing as working archive"* (provenance visible), *"the landing as expedition briefing"* (a dangerous question, honestly equipped), *"the landing as atlas"* (four broken maps, one legend), *"the landing as quiet lab at night"* (instrument glow, no spectacle). (2) For the chosen philosophy extract **3–5 named laws**, each an enforceable sentence a screenshot can violate: e.g. *"L1 — Every visual element either states a claim, shows a source, or structures attention; anything else is cut."* / *"L2 — Uncertainty is rendered, not hidden: an Unresolved is always visible somewhere on screen."* / *"L3 — Motion is measurement, not decoration: something moves only when its movement informs."* (3) Write the **anti-list**: 8–12 things this system will never be, starting with all items of Appendix B plus the voice bans (devotional vocabulary, fake timers, cookie theatre, chat bubbles, notification badges). (4) Draft the **psychological contract** from Part 5: pick the 4–6 mechanisms the design will deliberately employ, each bound to one law and one hard limit. |
| **Deliverables** | `docs/design/CONSTITUTION.md` (philosophy + laws + anti-list + psychological contract), each law phrased so it can later become a review checklist item or lint/test assertion |
| **Gate** | Ojas ratifies each law individually. Every law must be point-at-able in a screenshot. |
| **Decision owner** | **Ojas** |

### Phase 2 — Divergent Exploration

*Mode: Google Sprint "Diverge"*

> ⚠️ Where AI-only pipelines fail: they produce one direction and iterate on it. Force breadth.

| Element | Detail |
| - | - |
| **Inputs** | `CONSTITUTION.md`, `REFERENCES.md`, Part 2 inventory |
| **Steps** | (1) Generate **5 structurally different directions**, differing in ≥3 of these 6 axes: **layout grammar** (asymmetric editorial vs ledger/table-dominant vs single-column instrument panel vs persistent provenance margin/rail vs diagram-as-hero), **type system** (this project's defining fork: how much *instrument* vs *press* — Fraunces-led literary-hybrid vs neo-grotesk-led technical vs mono-forward edition where mono carries structural furniture and serif is rationed to quotation; every candidate passes the diacritic specimen), **motion model** (stillness-first: reading-progress bar only vs scroll-choreographed beats vs state-transition where DepthControl-style toggles are the motion star), **colour logic** (harder ration within cream+orange vs inverted ink-dark instrument ground vs paper-white lab neutrality + single hot signal vs archival duotone), **imagery model** (typography-only vs diagram-native: every visual is an SVG argument vs archival texture vs cinematic photographic plates — documentary-grade, art-directed, never stock (anti-list #11) vs hardware/instrument renders), **signature element** — one memorable device derived from product structure; seeds to mutate or reject: a *Provenance Rail* (source counts and citations as permanent margin furniture), a *Strata Ruler* (scroll position mapped to strata I–IV of the brief anatomy), an *Unresolved Ledger* (every page ends inside an open question, visually), an *Instrument Panel* hero (true live counts — sources read, questions open — as dials, not vanity stats), an *Apparatus Line* system (sigla/footnote typography as ornament-that-is-content). (2) Use multiple models/contexts across the 5 and log which produced what in `DIVERGENCE_LOG.md`; give each direction a different subset of REFERENCES. (3) Each direction ships exactly: `spec.md` (token sketch: 4–6 colours, type pairing + diacritic proof, spacing logic, one motion rule), a hero mock **in code** at `/lab/<direction>`, and a 2-sentence rationale citing ≥2 constitution laws. (4) **Anti-homogeneity check**: run every direction through Appendix B and the anti-list; any direction matching ≥1 default look without a compensating structural idea is killed or mutated before review. Enforce the two-of-ten retention cap on shipped devices (Part 2). |
| **Deliverables** | `docs/design/directions/A…E/` (`spec.md`, `rationale.md`, lab route on branch), `DIVERGENCE_LOG.md` |
| **Gate** | Ojas scores each 1–5 on constitution fit, distinctiveness, emotional pull, scalability-to-site — **before hearing any AI recommendation**. Select 1, or merge 2. |
| **Decision owner** | **Ojas** |

### Phase 3 — Converge: Token System

*Mode: Netflix/Material tokens*

| Element | Detail |
| - | - |
| **Inputs** | Winning direction spec |
| **Steps** | (1) Express the direction as `[data-dir]`-scoped custom properties in `app/lab/lab.css`: surface, ink hierarchy (incl. muted), accent + its ration rule, rule/hairline colour, type roles and sizes, spacing rhythm, elevation-or-flat decision, motion durations/easings. Mirror naming onto the existing Tailwind token vocabulary so Phase 7 promotion is a lift, not a rewrite. (2) **Contrast audit**: write `scripts/design/contrast.mjs` (dependency-free Node, ~60 lines: parse the token block, compute WCAG ratios, print a table). Body pairs ≥4.5:1, large display ≥3:1; decorative low-contrast elements allowed only if no text meaning rides on them. (3) **Specimen sheet**: a `/lab/<direction>/specimen` route rendering every colour, every type size, the diacritic set, buttons in all three variants' successors, and the ration rule demonstrated (exactly one accent element on the page). (4) Decide explicitly and record: dark-ground usage (today only footer + poster break), gold/signal-blue survival (currently reserved/narrow), and whether radius-0 survives (removing `* { border-radius: 0 }` is a system decision, not a per-component one). |
| **Deliverables** | `lab.css` token block, `scripts/design/contrast.mjs` + output table, specimen route, decisions appended to `spec.md` |
| **Gate** | Contrast table passes floors; `npm run typecheck && npm run build && npm run lint` clean; `git diff --name-only <base>...HEAD` touches nothing outside `app/lab/**`, `scripts/design/**`, `docs/design/**`; Ojas ratifies the specimen visually. |
| **Decision owner** | Machine verifies; **Ojas** ratifies feel via the specimen sheet. |

### Phase 4 — High-Fidelity Prototype

*Mode: Apple — build the real thing early*

| Element | Detail |
| - | - |
| **Inputs** | Token system, constitution, briefs/primer content |
| **Steps** | (1) **Narrative arc first**: define the scroll as **5–7 beats**, not sections, mapped to the funnel. Working example to mutate: *Beat 1 Provocation* (one dangerous question, ~30s — the reach moment) → *Beat 2 Diagnosis* (the unintegration thesis / broken-map diagram) → *Beat 3 Method* (four rules; the counter lives here) → *Beat 4 Anatomy* (strata table — the moat, shown physically) → *Beat 5 Proof* (Brief 001 as artefact: provocation, contents, unresolved) → *Beat 6 The Work* (Research/Studio/Codex as three lines, Studio's true scarcity visible) → *Beat 7 Entry* (single CTA per the one-action rule). Each beat: emotional intent, one-sentence copy direction, dominant visual, the mechanism it employs from the psychological contract. (2) Build the full home page on the winning lab route, mobile-inclusive, desktop flagship. Reuse nothing from `components/` blindly — rebuild only what the new system justifies. (3) Motion pass: every moving thing cites its law; default is restraint; one signature motion beats ten micro-interactions; reduced-motion collapses gracefully (existing global pattern holds). (4) **Copy is design**: draft copy as literature using DOCUMENTATION.md's translation table ("What the scriptures say about desire" → "*The Architecture of Desire*…"). Concrete nouns and true numbers over adjectives; the atheist-test applies to every line; button labels state the action ("Read the Primer", "Start a commission"). No "Unlock the wisdom of the ages" — or its secular twins. |
| **Deliverables** | Working `/lab/<direction>` full page, `NARRATIVE_ARC.md` (beats table), `COPY.md` |
| **Gate** | (a) Law-by-law walk documented: every beat ratified or violated-with-plan. (b) Cold-skeptic 5-second test with 3–5 humans (or written plan to run it) — "what is this site, and how did it make you feel?" (c) Viewed on a real phone and desktop, not one dev-server width; unverified claims flagged honestly. |
| **Decision owner** | **Ojas** (+ external testers for b) |

### Phase 5 — Engineering Hardening

*Mode: this repo's own gate discipline*

| Element | Detail |
| - | - |
| **Inputs** | Working prototype |
| **Steps** | (1) Accessibility floor (manual where tooling is blocked, and recorded as such): semantic landmarks, one `h1`, logical heading order, visible focus states from the new tokens (never `outline: none` bare), keyboard walkthrough of every interactive beat, `prefers-reduced-motion` honoured (global rule + per-effect fallbacks), alt text, target sizes ≥44px, colour pairs re-checked against the Phase 3 table. If axe-core becomes runnable in some environment, add `landing.a11y.spec.ts` and run it; otherwise record the manual matrix. (2) Performance sanity: LCP element identified; no new client JS on production routes; any 3D/canvas stays lazy-mounted in-viewport with static fallback (existing `Scene3D` pattern); fonts stay `next/font` with swap-safe display; CLS guarded by reserving geometry for anything that fades/slides in. (3) **Walls, mechanically checked inside the gate script** (`rg` is not installed here): production files must not reference `app/lab` or `/lab/`; lab files must not import `@/components/*` or `@/lib/*`. (4) Route smoke: `curl` every lab route for 200 and absence of React hydration errors in dev logs. (5) Assemble `verify-design-gate.mjs` (dependency-free) chaining: typecheck, build, wall scans (Node fs walk), contrast table, route smokes — one command, non-zero exit on any failure. |
| **Deliverables** | `scripts/design/verify-design-gate.mjs`, passing output, accessibility matrix in `VALIDATION_REPORT.md` (draft) |
| **Gate** | `node scripts/design/verify-design-gate.mjs` exits 0. Honest note of anything unverifiable in this environment. |
| **Decision owner** | Machine; **Ojas** signs off. |

### Phase 6 — Validation & Iteration

*Mode: Google "Test" + Netflix experimentation*

| Element | Detail |
| - | - |
| **Inputs** | Hardened prototype, `METRICS.md` |
| **Steps** | (1) Persona-critique loop: AI critiques the page **as each archetype** against their success behaviours and the metrics — hypothesis-generating, never truth. (2) Real humans wherever possible: even 3–5 people on a preview URL beat infinite simulation; run the 5-second cold-skeptic test properly and record verbatim answers. (3) Compare internally against the strongest losing direction or the incumbent home page when traffic exists; with no traffic, judge against baselines from `METRICS.md` once deployed. (4) Iterate in **bounded rounds**: max 3 revision rounds per cycle, then re-gate. Unbounded iteration is where designs regress to mush. |
| **Deliverables** | `docs/design/VALIDATION_REPORT.md` (findings, evidence, metric deltas, revision log) |
| **Gate** | Targets met, or consciously waived with written rationale. |
| **Decision owner** | **Ojas** |

### Phase 7 — Systemization & Expansion Decision

*Mode: Netflix systemization + this repo's strangler precedent*

| Element | Detail |
| - | - |
| **Inputs** | Validated design |
| **Steps** | (1) Extract the system: promoted token set, component inventory (what exists, what's reusable, what died), do/don't sheet, the ratified constitution with real screenshots-as-examples. (2) Write the **carry-forward plan as a strangler migration**, in the repo's own style: suggested order — home page first, then `/research` + brief template (the money surfaces), then Studio/Vision/Library, then chrome (Header/Footer/Logo), auth/account last; each step gets a gate (typecheck/lint/build + walls + contrast) and a DEVELOPMENT_LOG entry, exactly like the 2026-08-23 v1→v3 retokenization passes. Encode laws as review-checklist items or ESLint rules where mechanically possible. (3) Housekeeping owed by any adoption: rewrite the stale README design-system section, reconcile `DOCUMENTATION.md`'s visual-identity note with the new system, delete `app/lab/` and expired branches, remove unused deps the old design needed. (4) **Expansion decision gate**, answered honestly: (a) did validation succeed beyond personal taste? (b) do the tokens generalize to dense reading surfaces (brief reader, articles) and to utility chrome (account, control), not just the landing? (c) can the laws be enforced mechanically enough to survive future AI sessions? Any "no" → keep the landing standalone, schedule a loop back to Phase 2 with what was learned, and leave the incumbent system untouched elsewhere. |
| **Deliverables** | `docs/design/SYSTEM.md` (constitution + tokens + components + do/don't), `MIGRATION_PLAN.md` (gated strangler steps), signed adopt/iterate decision, docs/internal + README updates on adoption |
| **Gate** | Decision document signed by Ojas. On adoption: lab routes removed, walls replaced by the migration plan, old-token remnants enter a logged quarantine countdown. |
| **Decision owner** | **Ojas** |

---

## Part 5 — The Psychological Contract

The user-facing goal of this process: the page should **spark interest and produce measurable
psychological effects** — honestly. ĀRK already documents its own persuasion model (the habit loop
and six priming devices in DOCUMENTATION.md). This layer makes the mechanisms explicit and binds
each to a law and a hard limit, because an instrument company persuades the way it researches:
transparently, or not at all.

| Mechanism (named) | ĀRK device | Design obligation | Hard limit |
| - | - | - | - |
| Information-gap curiosity (Loewenstein) | The open loop; every brief shows its Unresolved list pre-purchase | Show the *shape* of missing knowledge — a visible question, a listed unknown — at least once per viewport journey | No clickbait teases; the gap must be real and later closable |
| Zeigarnik completion pull | `sequence_step`, the weekly letter | End major beats on an open question; let the Primer sequence continue loops across visits | Never fake incompleteness about product status ("Assembling" is true) |
| Labour illusion / operational transparency (Buell & Norton) | The counter — "sources read: 63" | Render real labour as first-class UI (counts, dates, source tallies), styled as instrumentation, never vanity metrics | Only true, sourced numbers; no follower/engagement counts |
| Choice paralysis (Hick's law) | Single-question landing; one field | One primary action per screen; secondary actions demoted to tertiary links | Two competing CTAs = hesitation, not choice (documented) |
| Autonomy (self-determination) | DepthControl Quick/Explain/Deep/Complete | Let readers choose exposure; make the toggle feel like an instrument control, and let it foreshadow Codex | No gating depth behind signup theatre |
| Credibility-preserving scarcity | Studio's "three commissions a month", computed live | State capacity as operational fact with the live indicator | Countdown timers, manufactured urgency: never |
| Von Restorff (isolation effect) | Accent rationed to ~one element/screen | The one distinct element per screen is the claim that matters | If everything pops, nothing is remembered |
| Peak-end rule | The poster break; the closing capture | Engineer the final beat deliberately — end on the strongest claim, then the single ask | Don't bury the peak under newsletter noise |
| Processing fluency + aesthetics-as-credibility | Reader measure 68ch; hairline discipline | Beauty signals care; care signals rigour; typographic precision *is* the trust builder | Disfluency only as a deliberate, rare marker |
| Calm as status | "Loading is a moment"; motion restraint | Stillness reads as confidence; reveal once, then leave the reader alone | No infinite scroll, badges, popups, chat bubbles, cookie theatre |
| Possible-self expansion (Markus & Nurius 1986) | The trajectory promise; who becomes capable here | Show a larger possible self anchored to demonstrated work and true paths | Never hustle register or transformation theatre (anti-list #13) |
| Awe / small-self (Keltner & Haidt 2003; Piff et al. 2015) | Horizon insets; vast claims set quiet | Vastness + accommodation co-emit ambition and humility | Awe from evidence scale only — never spectacle (anti-list #12/#14) |

Rules of use: as amended 2026-08-25, the ratified contract (CONSTITUTION.md v3 + erratum) fixes
**eight** employed mechanisms for this cycle — each appears in the narrative arc (Phase 4) by
name. In validation (Phase 6), ask testers about the *intended*
effect ("did you notice what you still don't know?") — mechanisms are confirmed or cut, not
accumulated.

---

## Appendix B — Cliché Ban-List (2026 calibration)

AI-generated design currently clusters into recognizable defaults. Any direction matching one —
or matching several partially — is killed or mutated unless it subverts the default with a
structural idea strong enough to name:

1. Warm cream background (~`#F4F1EA`) + high-contrast serif display + terracotta accent.
   **The incumbent system lives inside this one**; escaping it is Phase 0's mandatory finding.
2. Near-black background + single acid-green or vermilion accent ("dark mode with neon").
3. Broadsheet pastiche: hairline rules everywhere, zero radius, dense newspaper columns.
4. Purple/blue gradient SaaS; glassmorphism cards; floating 3D blobs; bento grids.
5. Centered hero + subtitle + two buttons; Inter/Fraunces-by-default pairing; oversized decorative
   numerals (01/02/03) where no sequence exists; marquees; scroll-jacked word-reveal heroes;
   hover-lift card grids; wireframe-polyhedron placeholders; emoji iconography; stock photography
   of people pointing at screens.

Retention cap: a direction may keep **at most two** of the ten shipped devices inventoried in
Part 2 — chosen deliberately, with the reason logged in its `rationale.md`.

---

## Standing Rules (apply throughout)

- Update the affected `docs/internal/` files after any substantive change (CLAUDE.md rule);
  add a dated DEVELOPMENT_LOG.md entry per work session on this effort.
- `npm run build` stays plain `next build`; the OpenNext path is `pages:build`/`deploy` only.
- Never claim visual verification the environment didn't provide; record unverified items
  plainly. A design process that lies about evidence produces confident garbage.
- One CTA per screen, everywhere, always.
