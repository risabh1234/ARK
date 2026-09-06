# FINAL_LANDING_PAGE_SYNTHESIS.md — The Ratified Synthesis of V2 + V3

**Status:** AUTHORITATIVE. This is the final landing-page specification. It is the merge of `app/lab/v2` and `app/lab/v3` — **not** a new or distinct design. Every page built after this one (`/`, and the pattern for `/research`, `/studio`, `/vision`, `/primer`, `/docs`, article surfaces) inherits the structure, tokens, voice, and mechanics defined here.
**Date:** 2026-08-28
**Supersedes for the landing page:** the two lab spec suites (`app/lab/v2/*.md`, `app/lab/v3/*.md`). Where they conflict, this document wins.
**Build target:** `app/lab/synthesis/page.tsx` + `app/lab/synthesis/synthesis.css` (tokens already ratified there) → then promoted to the production home route.
**Governing law (unchanged, non-negotiable):** [`CONSTITUTION.md`](./CONSTITUTION.md) v3 — L1–L6, the 14-point anti-list, the 8 psychological mechanisms · [`ARK_Vision_Document.md`](./ARK_Vision_Document.md) · [`ark epistemology spec.md`](./ark%20epistemology%20spec.md) · [`AUDIENCES.md`](./AUDIENCES.md) · [`DOCUMENTATION.md`](../internal/DOCUMENTATION.md) §2–§5 · [`Landing Page Design Process.md`](../../Landing%20Page%20Design%20Process.md).
**Input analysis:** [`V2_V3_COMPARATIVE_ANALYSIS.md`](./V2_V3_COMPARATIVE_ANALYSIS.md) — this synthesis executes that document's §7 harvest list.

---

## 0. The Synthesis Rule (read first)

> **V3 is the spine. V2 is the texture. Nothing new is invented.**

- **From V3, kept whole:** the 7-beat vertical stratigraphic descent; the entire copy deck (grounded in `content/briefs.ts`, CAT-laddered, banned-words-audited); the Beat 7 peak-end claim; the DepthControl wired to the ResearchPanel; the Strata Ruler as an *IntersectionObserver depth indicator* with `aria-live` announcements; the `CartographersHand` as a declared `<aside>`; the demoted (secondary-weight) header CTA; the `UNSURVEYED` void with no CTA inside it; the reduced-motion path that suppresses real animation.
- **From V2, harvested (component-local only):** the detailed celestial hero SVG (seeker figure + layered ridges + crosshairs + bracketed motto cards) — with the dawn opacity pulled down to V3's restraint; the richer Fig. 1 readout panel (per-territory detail box) — with the invented "survey stream" tags re-sourced to real research areas; the `Śabda / Pratyakṣa / Anumāna` pramāṇa terms shown inside the labelled `STRATUM I–III` panels; fuller quadrant descriptions (V2 substance, V3 cadence); the ruler-node keyboard roving (arrow / Home / End); the drawing-office footer furniture (`LAT/LON/ALT`, edition mark, `REV` line) — minus the slogans; 320px viewport testing.
- **Explicitly discarded (V2):** "spirituality / devotion" in the hero lead (L6 surface leak); the Beats-3–5 fusion into one Lower Instrument Deck; all invented data presented as instrumentation; "SEAL OF EPISTEMIC INTEGRITY", "REGISTERED ATLAS MARK", "RIGOUR IN RESEARCH. DEPTH IN WISDOM. EXCELLENCE IN LIFE." (anti-list #13); the header CTA at primary fill weight; the `VIEW UNRESOLVED →` link inside the void; the Strata Ruler bound to scroll percentage; `© ĀRK 2024`.

If a future contributor wants to add something that is in neither V2 nor V3, that is a **new proposal** and goes through the Constitution's review, not into this page silently.

---

## 1. The Page in One Screen

```
        STRATA RULER          BEAT                         DOMINANT APPARATUS                       RULER READS
        ┌─────────┐
   ●    │  I      │  ← 1  PROVOCATION      Split hero · celestial horizon plate (V2 art) ·        I · SOURCE
   │    │ SOURCE  │       63-source traceable tally · one primary CTA                            (amber bead ignites)
   │    ├─────────┤    2  DIAGNOSIS        Fig. 1 Four Territories (V3 SVG + V2 readout) ·         I · SOURCE
   ▼    │  II     │       Cartographer's Hand (declared aside)                                    → travelling to II
        │EVIDENCE │    3  THE METHOD       4 rules · LIVE RESEARCH PANEL ← DepthControl drives it  II · EVIDENCE
        │         │    4  ANATOMY          4-strata table (with pramāṇa terms) · Ruler explained  II · EVIDENCE
        ├─────────┤    5  THE PROOF        Brief 001 card · UNSURVEYED void (no CTA) ·             III · INTERPRETATION
        │  III    │       radial 63-dial · aphorism (serif #2)                                    
        │ INTERP. │    6  THE WORK         Briefs · Codex · Studio · Library (0 primary CTAs)      III · INTERPRETATION
        ├─────────┤    7  ENTRY            PEAK-END CLAIM (alone) · Weekly Letter (one field) ·    IV · UNRESOLVED
   ●    │  IV     │       drawing-office footer                                                   (bead → signal red)
   red  │UNRESOLV.│
        └─────────┘       END OF SECTION · SURVEY CONTINUES
```

**Emotional arc (Vision Document §2, Constitution v3 addendum §3):** ignition through honest scale → orientation-as-relief → earned trust → comprehension & control → conviction → grounded trajectory expansion → quiet high-conviction resolve. The reader should finish thinking *"I don't want to waste my potential — and I am not the center of that,"* arrived at soberly, never sold.

**Cognitive-load curve (V3 `UX_PSYCHOLOGY_SPEC` §2):** ≤3 new chunks per beat; a single deliberate load peak at Beat 4 (~40% scroll); Beat 6 is a rest; the last emotional event is the peak claim's calm, immediately before the one ask.

---

## 2. Design System — Tokens (already ratified, do not re-invent)

Source of truth: `app/lab/synthesis/synthesis.css`. Every color pairing on the page is drawn only from the 19 certified pairs in `scripts/design/contrast.mjs`. No new pairing ships without adding a row and re-running the audit.

| Role | Token | Value | Contrast note |
|---|---|---|---|
| Instrument ground | `--ark-bg` | `#181310` | never sterile `#000` |
| Raised modules / panels | `--ark-bg-raised` | `#211a14` | |
| Plate insets / diagram frames | `--ark-bg-plate` | `#282018` | |
| Deep recessed wells | `--ark-bg-deep` | `#110d0b` | |
| Primary headings, CTA surface | `--ark-ink-hi` | `#f0e7d8` | 15.03:1 on bg (AAA) |
| Body reading prose | `--ark-ink` | `#d9cdb9` | 11.75:1 (AAA) |
| Meta / sigla / captions / ruler ticks | `--ark-muted` | `#a3957d` | 6.28:1 (AA) |
| Decorative ticks, inactive borders | `--ark-faint` | `#5e5445` | non-text only |
| **Phosphor amber** — live reading signal ONLY | `--ark-amber` | `#ffb000` | 10.06:1 (AAA); rationed |
| **Signal red** — action markers + `UNSURVEYED` voids ONLY | `--ark-signal-red` | `#BA3C0F` | 4.58:1 on ink-hi (AA); 3.06:1 on raised (UI floor — **no headroom, annotate the token**) |
| Structural hairline | `--ark-rule` | `rgba(240,231,216,0.15)` | |
| Strong hairline | `--ark-rule-strong` | `rgba(240,231,216,0.34)` | |

**Typography — the technical triad (verified `latin` + `latin-ext` subsets, native IAST + `₹` coverage):**
- `--ark-font-display` / `--ark-font-body` = **Inter** — all UI, headings, body prose, H1.
- `--ark-font-mono` = **Space Mono** — ALL marginalia: sigla, coordinates, counts, timestamps, table furniture, eyebrows, ruler numerals, void stamps, footer chain. (L4.)
- `--ark-font-serif` = **Source Serif 4** — **exactly 2 uses on the entire page**, both italic pull quotes: the Brief 001 sample excerpt (Beat 5) and the aphorism (Beat 5). **Nowhere else** — the `ĀRK` wordmark is Inter (V3's ratified fix; V2 set it in serif — do not).

**Standing laws (global, `!important` scoped to the page root):**
- **Radius Law:** `border-radius: 0` on every container, input, button, card, `::before`, `::after`.
- **Tektronix Glow Law:** `box-shadow` with a glow color appears on **exactly three element types** — the Strata Ruler reading bead (`.ark-ruler-bead`, +`.bead-iv`), the mobile strip dot, and the TopBar `INSTRUMENT · ACTIVE` sensor dot. Never on a card bezel, button frame, container outline, or the active DepthControl key. `box-shadow: 0 0 12px rgba(255,176,0,0.45)` for amber; `0 0 12px rgba(186,60,15,0.5)` for the red bead at Stratum IV.
- **Serif Ration Law:** the 2 pull quotes, verified by a `getComputedStyle` sweep for `--ark-font-serif`, not a class count.
- **Motion contract:** stillness-first. `--ark-dur-base: 220ms`. The amber bead is the *only* element permitted scroll-linked movement. All draw-ins are enter-once (`whileInView`, `once: true`), ≤900ms. `prefers-reduced-motion: reduce` → all durations `0.01ms`, all `box-shadow: none`, bead jumps instead of travels, SVG strokes render pre-drawn (`stroke-dashoffset: 0`), fade-ups render at final position. This path must be **exercised** — there must be real motion for it to suppress (V3's approach; V2 had almost nothing to suppress).
- **Von Restorff ration:** exactly ~one hot element (amber bead OR red action marker) lit at full strength per viewport. Beat 6 deliberately rests the accent so Beat 7's field owns it.
- **Touch targets:** every interactive element ≥ **48px** min dimension (exceeds WCAG 2.5.5's 44px). Sub-48 visual controls (DepthControl keys, ruler nodes) get a `::after` hit-expansion pseudo-element to 48×48.

---

## 3. Global Chrome

### 3.1 TopBar (masthead) — from V3, `TopBar.tsx`

- **Left:** `ĀRK` wordmark (Inter 700, `letter-spacing: 0.05em`, links to `#beat-1`) · primary nav: `Briefs · Method · Studio · Codex · Library · Journal` — **English domain language only** (L6 / anti-list #8). Each nav item points at the beat/anchor it actually names (fix the V3 residual mismatch — see §11).
- **Right:** `INSTRUMENT · ACTIVE` sensor pill (`role="status"`, amber dot with the *only* permitted TopBar glow) · `Search` · `Sign in` · **`Enter the Atlas`** header action.
- **Header CTA weight:** **secondary/bordered** (`background: transparent; border: 1px solid var(--ark-rule-strong)`), NOT the inverted `--ark-ink-hi` fill. Only the Beat 1 hero CTA carries primary fill → satisfies anti-list #10 (no two competing primary CTAs on one screen).
- **Header CTA + hero CTA destination:** must NOT both scroll to `#beat-7`. `Enter the Atlas` scrolls to `#beat-2` (into the content / the diagnosis — "entering the atlas" = starting to read it). The Weekly Letter Subscribe is the only thing that acts on `#beat-7`. (Fixes the shared V2/V3 bug — analysis §8.)
- **Mobile (`< 1024px`):** nav collapses to a locally-authored disclosure drawer (☰ / ✕), `aria-expanded`, `aria-controls`. No `@/components/*` import — lab isolation wall.
- Sticky, `height: 56px`, `z-index: 1000`, bottom hairline `--ark-rule-strong`.

### 3.2 Strata Ruler Altimeter — from V3 (`StrataRuler.tsx` + `useActiveStratum.ts`), with V2's keyboard roving added

**This is the single most distinctive device on the page (Direction C). It re-casts the scrollbar as a coordinate axis. It is NOT a progress bar.**

- **Desktop (`≥ 1024px`):** 48px fixed left rail (`<main>` gets `padding-left: 48px`). Four equal bands, top → bottom: `I · SOURCE`, `II · EVIDENCE`, `III · INTERPRETATION`, `IV · UNRESOLVED`. Space Mono roman numerals. Per-band hover tooltip (`STRATUM II · EVIDENCE`). `aria-current="true"` on the active band.
- **Mobile (`< 1024px`):** 44px sticky top strip docked directly below the TopBar, `z-index: 850`, horizontal `I · II · III · IV` with the active one carrying the amber dot + underline.
- **Depth detection:** a single `IntersectionObserver` (`rootMargin: "-45% 0px -45% 0px"`, `threshold: 0`, **empty dependency array** — no scroll listener, no `[active]` churn) maps the centered beat → stratum: `beat-1,2 → I` · `beat-3,4 → II` · `beat-5,6 → III` · `beat-7 → IV`. The bead **snaps to the active band's centre** (`activeIndex * 25 + 12.5%`), it does not track scroll fraction.
- **Bead:** phosphor amber (`#ffb000`, 12px Tektronix glow) for I–III; **flips to signal red** (`#BA3C0F`) at Stratum IV / Beat 7. `transition: top 220ms` (`none` under reduced motion).
- **Accessibility:** a visually-hidden `aria-live="polite"` region announces `Now reading: Stratum II, Evidence — <one-line definition>` on every change. Bands are keyboard-focusable; **Arrow / Home / End roving** (harvested from V2's `StrataRulerRail`) moves focus band-to-band and `scrollIntoView({behavior:"smooth"})` to the first beat of that stratum. Every band has a valid target (no orphans — the V2 defect that came from fusing beats).
- **L1 compliance:** the ruler's own full key is spelled out in Beat 4's `StrataRulerExplainer` card, in the viewport where it matters most.

---

## 4. The Seven Beats

Every beat is a discrete `<section id="beat-N" class="v3-section" aria-labelledby="...">`. Padding `clamp(64px, 8vw, 112px) clamp(24px, 5vw, 80px)`. Bottom hairline `--ark-rule`. Structure per beat: eyebrow (Space Mono, `THE METHOD` etc.) → H2 (Inter 600, `max-width: 32ch`) → lead prose (Inter, `max-width: 65ch`, 60–68ch measure, never full width) → dominant apparatus.

**All copy below is verbatim from V3's `COPY_DECK.md` unless a line is marked `[HARVEST]` (V2 substance folded in) or `[FIX]` (analysis correction).** Every surface string has passed the §3 line-by-line Curious Atheist Test ledger in that deck. The banned-words audit stands: no "ancient wisdom / sacred / divine / timeless / eternal / spiritual technology / Vedic AI / 10x / transform your life / unlock your potential", no Sanskrit or Devanāgarī in any H1/H2/nav/button/product name, no assumed-agreement sentences.

---

### BEAT 1 — PROVOCATION  ·  Ruler: I · SOURCE (bead ignites)

**Emotional goal:** ignition through honest scale — *"my life has a larger possible trajectory"* AND *"I am not the center of that"* in one breath. Survive the 5-second cold-skeptic test on every visible word.

**Layout:** 5/7 split grid (`clamp(32px, 4vw, 64px)` gap), collapses to 1 column `< 1200px`.

**Left column (5/12) — the apparatus deck:**
- Eyebrow: `A KNOWLEDGE INSTRUMENT FOR THE COMPLETE HUMAN`
- H1 (Inter 600, `clamp(38px, 5.2vw, 64px)`, `--ark-ink-hi`, 15.03:1):
  `Extraordinary Capability.` / `Rooted in Consciousness.`
- Hook (≤55 words, verbatim V3 — **replaces V2's "science and spirituality, ambition and devotion" which was an L6 surface leak**):
  > *A research platform that unites science and philosophy, ambition and meaning, evidence and interpretation — so you can understand something completely instead of believing it quickly. Every claim is sourced, dated, and typed by the kind of evidence behind it. Where the work is unfinished, we mark it and say so.*
- **Provenance Tally strip** (`TallyBar`): `RESEARCHED. SOURCED. CITED.` · big `63` (Space Mono, `clamp(28px,3.2vw,38px)`, 700 — provably the heaviest datum in this viewport, L5) · `PRIMARY SOURCES IN THIS BRIEF` · `100% TRACEABLE` · rendered as 63 amber ticks grouped in fives.
- **Single primary CTA:** `Enter the Atlas →` (inverted — `--ark-ink-hi` ground, `--ark-bg` text — the one loud button on the screen). Scrolls to `#beat-2` `[FIX]`.
- **Tertiary link:** `Read a sample brief →` (demoted text link → `#beat-5`). No `NO REGISTRATION REQUIRED · OPEN ARCHIVE` sub-note (V2 invention — cut).

**Right column (7/12) — the Celestial Horizon plate:** `[HARVEST — V2 `CelestialHorizonCanvas` art, V3 frame discipline]`
- A bordered `FIG. 0` plate (NOT full-bleed — anti-list #12). Plate title block: `FIG. 0 · THE HORIZON SCALE          SHEET 1/1`. Bottom scale line: `SCALE: INDIVIDUAL → COSMIC · REV 2026.08`.
- **The V2 SVG, adopted:** the solitary seeker silhouette on the summit ridge (head + cloak + staff + a single amber datum light at the staff tip), the two layered mountain-ridge paths, the coordinate crosshairs at the ring centre, and the four concentric coordinate rings labelled inner→outer:
  `YOU · INDIVIDUAL MASTERY` → `H·01 · CIVILIZATIONAL SCALE` → `H·02 · PLANETARY HORIZON` → `H·03 · COSMIC CIVILIZATION`
  Rings draw outward from the `YOU` centre (`stroke-dashoffset` 1→0, 900ms, once; pre-drawn under reduced motion).
- **Dawn treatment — MUST be pulled down from V2's `0.28` core opacity to V3's restraint:** the radial dawn glow tops out at `rgba(255,176,0,0.06)`, arcs `≤ rgba(255,176,0,0.04)`. This is a *treated plate with a scale line*, not a sunrise spectacle — anti-list #12/#14. It is the Vision Document's "lone human before the mountains … solitude, humility and the infinite," rendered as an instrument, not a poster.
- **Two motto annotations** (Space Mono marginalia, `--ark-muted`, 11px), each in a small bracketed card:
  - Upper-right: `[ 90°N · ZENITH ]` / `I AM NOT THE CENTER OF EXISTENCE.` (awe / small-self)
  - Mid-left, pointing into the rings: `[ 180°W · AZIMUTH ]` / `DO NOT MAKE YOURSELF SMALLER THAN YOU ARE CAPABLE OF BECOMING.` (possible-self)
  - On mobile these become captions directly under the plate (they cannot float in a margin that doesn't exist). Neither is ever dropped.

**Psychological laws:** Awe & small-self (Keltner & Haidt / Piff — vastness from *coordinate scale*, not cinematics) · Possible-self (Markus & Nurius — left motto, immediately bounded by the right motto and the tally) · Hick's Law (one primary action) · Labour illusion (the 63-tick bar is first contact with instrumentation-as-proof).

---

### BEAT 2 — DIAGNOSIS  ·  Ruler: I · SOURCE → travelling to II

**Emotional goal:** orientation-as-relief. *"That dissonance I feel constantly and never name — it has a name and a map."*

**Layout:** 1fr / 1fr grid. Left = prose stack; right = Fig. 1.

**Left column — prose:**
- Eyebrow: `THE DIAGNOSIS`
- H2: `You are not short of information. You are short of integration.`
- Lead (verbatim V3):
  > *Every day you cross four territories that were mapped by people who deny each other's borders. Science explains the mechanism and stops at the meaning. Markets optimise the outcome and skip the cost. Psychology maps the feeling and cannot rank it. Inherited tradition carries the purpose and distrusts the method. You are handed four maps and no shared legend. The dissonance you feel and rarely name is the gap between them.*
- Para 2: *ĀRK's work is to draw one legend across all four — not by pretending they agree, but by showing exactly where they touch, and what each one gets right.*
- **The Cartographer's Hand** — a declared `<aside>` (V3's `CartographersHand`, **not** V2's mid-page "► ARK INTERPRETIVE FRAMEWORK ◄" band):
  `⌖ THE CARTOGRAPHER'S HAND` /
  > *These maps were drawn by different civilisational institutions. They disagree. This atlas is an attempt to navigate all four — and it names its own standpoint wherever that standpoint shapes the reading.*
  This is the **L6 surface disclosure device**: it declares that a standpoint exists and will be labelled — it does not name Vedānta / Kṛṣṇa at the surface. (Constitution v3 addendum §1; epistemology spec §7.2 — the page is strictly Tier 1.)
- Tertiary bridge link: `How the method works ↓` → `#beat-3`.

**Right column — Fig. 1 · The Four Territories:** `[V3 SVG + V2 readout, re-sourced]`
- Title block: `FIG. 1 · THE FOUR TERRITORIES OF HUMAN KNOWLEDGE · SCALE 1:1 · REV 2026.08 · SHEET 1/1`
- **The SVG is V3's:** four quadrant `<g role="button" tabindex="0">` with geological hatch fills — `THE MEASURABLE` (stipple), `THE MARKETABLE` (bedding rules), `THE WANTED` (45° hatch), `THE INHERITED` (dashed-perimeter field); **disputed internal seams drawn as dashed `--ark-signal-red` at 40%** (the institutions deny each other's edges); central navigational reticle with `YOU ARE HERE`; hovered/focused quadrant gets an amber selection border + `fill-opacity` bump. Keyboard: Tab to reach, Enter/Space to select, visible amber focus ring.
- **The readout panel is V2's richer structure, re-sourced:** beside/below the map, a detail box that updates on hover/focus/select with:
  - quadrant name + triad sub-label (`Science · Data · Matter`)
  - **a fuller 1–2 sentence description** `[HARVEST — V2 substance, V3 cadence]`, e.g. *"The empirical domain: physical mechanism, biological substrate, reproducible observation."*
  - the **failure-mode line** (V3, `aria-live="polite"`, one at a time): `THE MEASURABLE — Explains the mechanism. Denies the meaning.` / `THE MARKETABLE — Optimises the outcome. Skips the cost.` / `THE WANTED — Maps the feeling. Cannot rank it.` / `THE INHERITED — Carries the purpose. Distrusts the method.`
  - **NO "ACTIVE SURVEY STREAMS" tag list** unless every tag is a real, current ĀRK research area (it is not, in V2 — cut, or replace with the real `R-01…R-06` stream names from Beat 3, which *are* real). Default: cut. Do not ship invented instrumentation (L2, L5, anti-list #6).
- The caption slot has a permanent default (`measurable`) so it is never empty (L1 — a legend is always showing).

**Psychological laws:** Information-gap (the map poses *"what connects these four?"* and withholds the answer until Beat 3 — real, closable) · Awe (four whole territories at once, quiet type, keyed) · Processing fluency (one thesis sentence, one diagram) · L1 (Fig. 1 ships its four-label key in the same viewport).

---

### BEAT 3 — THE METHOD  ·  Ruler: II · EVIDENCE

**Emotional goal:** earned trust through operational transparency. *"Their process is public. Their sources are visible. This is not an opinion factory."*

- Eyebrow: `THE METHOD`
- H2: `Our process is public. Our sources are visible.` (verbatim V3 — **not** V2's "The method is the message" McLuhan pun.)
- Lead: *Four rules govern every brief. They are not a philosophy of research; they are things you can check on the page.*

**The Four Rules** — 4 numbered plates (`FourRules`), Space Mono numeral `01–04` + one-line rule + one-line gloss. These are the reader-facing translation of L1–L4:
1. `The legend comes before the terrain.` — *Anything that carries meaning — a colour, a mark, a counter — arrives with a key you can see.*
2. `Every claim carries its coordinates.` — *No sentence stands without its source, its count, its date, or an honest mark saying the question is still open.*
3. `Unmapped ground stays on the map.` — *What we could not settle is drawn as bounded, named space — never left blank, never written around.*
4. `The margin carries the proof.` — *Sources and working notes live in the margin, in their own typeface, quiet but never absent.*

**The instrument deck — DepthControl + Live Research Panel in ONE viewport dialogue** `[HARVEST — V2's "deck" instinct, WITHOUT fusing beats]`:
The three-key DepthControl and the panel it drives sit visually adjacent (side-by-side ≥1024px, stacked with the control pinned above ≤1024px) so the reader sees the control *act on* the instrument. This is V2's best structural instinct, applied without collapsing Beats 4–5 back in.

- **Braun 3-key `DepthControl`** (`[ SOURCE ] [ EVIDENCE ] [ INTERPRETATION ]`): `aria-pressed`, ArrowLeft/Right roving, `min-height: 48px` (hit-expanded), active key = solid `--ark-signal-red` fill with `--ark-ink-hi` text, **matte — no glow** (Tektronix Law; V2's spec-sanctioned active-key glow is dropped here per the analysis). Helper text changes with selection:
  - `SOURCE` → *Headline readings only.*
  - `EVIDENCE` → *Add the provenance behind each reading.*
  - `INTERPRETATION` → *Add our reading of it, and open the full 63-source tally.*
- **`LIVE RESEARCH INSTRUMENT PANEL`** (`ResearchPanel`) — the DepthControl **actually filters it** (V3 mechanic, the whole point — V2's was inert):
  - Title: `LIVE RESEARCH INSTRUMENT PANEL` · subtitle: `A true snapshot of what is being read and written right now.`
  - Columns: `ID · WORK STREAM · STATUS · SOURCES · LAST UPDATE`. 6 rows verbatim:
    `R-01 · Consciousness Studies · Reading · 12 · 2h ago`
    `R-02 · Bhagavad-gītā Analytics · Reading · 9 · 3h ago`
    `R-03 · Psychology & Desire · Writing · 7 · 5h ago`
    `R-04 · Civilizational History · Reading · 14 · 1h ago`
    `R-05 · Technology & Ethics · Mapping · 8 · 4h ago`
    `R-06 · Leadership & Dharma · Writing · 13 · 30m ago`
  - At `EVIDENCE`: each row gains its provenance sigla. At `INTERPRETATION`: each row gains a one-line interpretive note AND the **63-stroke `TallyStrokes`** diagram appears (`LABOUR PROOF · 63 SOURCES READ BEFORE DRAFTING · GROUPED IN FIVES`).
  - Footnote (marginalia): `Snapshot taken at build. The research is continuous; these figures are real, not incremented for effect.` (L5 — zero vanity metrics.)
  - **`aria-live` is scoped to a concise status line** (`Depth: interpretation — provenance and tally shown`), NOT the whole table body (V3 remediation — avoids a long screen-reader announcement).
  - **R-02 / R-06 L6 note:** `Bhagavad-gītā Analytics` and `Leadership & Dharma` are admissible here — marginalia in a data table, a *text/topic under study* in its own domain register, paired with English, not a devotional claim, not in any heading. This passes the atheist test (*"we are running analytics on the Gītā" — nod*). **`Leadership & Dharma` carries a standing Phase-6 fallback of `Leadership & Duty`** (COPY_DECK §3 row 10) — if persona review flags it, one-cell swap.

**Stratigraphic Pattern Key** (`PatternKey`) — the four SVG hatch fills shown as a legend with their stratum names: `Stipple — Stratum I · Source` / `Bedding rules — Stratum II · Evidence` / `Diagonal hatch — Stratum III · Interpretation` / `Dashed void — Stratum IV · Unresolved`. This is the L1 key for every diagram downstream.

**Psychological laws:** Labour illusion / operational transparency (Buell & Norton — the panel with timestamps + per-stream counts, and the control that visibly makes the machinery respond) · Rams "good design makes a product understandable" (the panel needs no caption) · Tufte data-ink (no zebra fills, hairline rules only where they separate data) · L2, L4, L5.

---

### BEAT 4 — ANATOMY OF A CLAIM  ·  Ruler: II · EVIDENCE (the load peak, ~40% scroll)

**Emotional goal:** comprehension and control. *"I understand exactly how a claim is built here, and I can audit each layer separately."* (Lynch imageability — the reader could sketch the four strata from memory afterward.)

- Eyebrow: `ANATOMY OF A CLAIM`
- H2: `Every claim is built in four layers. You can audit each one separately.`
- Lead: *A claim you cannot take apart is just an opinion with good posture. Here is how a claim is assembled in a brief — from what a text actually says, up to what we argue it means, and out to what we still cannot answer.*

**Layout:** 8fr / 4fr grid. Left = the strata table; right = the `StrataRulerExplainer` card.

**The Four Strata table** (`StrataTable`) — the load-bearing diagram of the page. An **independent second DepthControl instance** (`depth4`) governs how much of each row shows (progressive disclosure, NN/g ≤2 levels past default):
- `SOURCE` → the four layers, named (name + "what it holds").
- `EVIDENCE` → + a worked example column.
- `INTERPRETATION` → + `[SIGLA] <provenance>` per row, + the 63-stroke `TallyStrokes` under Stratum I.

| | Stratum | What it holds | Example (EVIDENCE+) |
|---|---|---|---|
| **I** | Source | What a text says — quoted, located, dated, and given in its original transliteration where the wording matters. | *Bhagavad-gītā 2.20, on the self that is neither born nor dies. (Gītā: the 700-verse dialogue at the centre of the Mahābhārata.)* |
| **II** | Evidence | What independent data shows when read together — findings kept separate from whoever first reported them. | *Cellular turnover replaces most tissue on a scale of years; consolidated memory persists far longer.* |
| **III** | Interpretation | Where ĀRK argues. Marked as argument, built up from the strata beneath it, and open to dispute. | *"Wanting is not the problem. Ranking is."* |
| **IV** | Unresolved | What the evidence cannot yet settle. Drawn as a bounded space and marked UNSURVEYED — not left off the map. | *Whether the four aims are discovered, or just a useful way to cut the pie.* |

- Stratum IV row: `border-left: 2px solid --ark-signal-red`, red numeral + name.
- Desktop table ⇄ 4 stacked cards at `< 768px`.
- **`[HARVEST — V2's deeper epistemology-engine demonstration]`** At `INTERPRETATION` depth, the per-row `[SIGLA]` provenance for Strata I–III names the classical pramāṇa it corresponds to, inside the already-labelled stratum — this is exactly the L6 disclosure model (framework terms only at depth, in labelled strata, defined on first use):
  - Stratum I `[SIGLA]`: *Śabda (testimony) — Sanskrit text corpus with verified IAST transliteration: na jāyate mriyate vā kadācin.*
  - Stratum II `[SIGLA]`: *Pratyakṣa (perception, instrument-mediated) — longitudinal biological & cognitive-psychology data sets (1998–2024).*
  - Stratum III `[SIGLA]`: *Anumāna (inference) — ĀRK Synthesis Framework: hierarchical ordering of material, psychological, and transcendental aims.*
  - First-use gloss carried once, as a footnote under the table: *Śabda, pratyakṣa, anumāna: testimony, perception, and inference — the three classical tests of a valid claim (pramāṇa-śāstra), used here as an analytical tool.* (DOCUMENTATION.md §3.2 — "Classical logic taught as an analytical thinking tool.")
  - This deepens V3's table with V2's substance **without** putting any of it in chrome and **without** the epistemology spec's Tier-2/Tier-3 material (tattvas, darśana, Kṛṣṇa) which stays off the landing page entirely (epistemology spec §7.2, Constitution L6).

**Strata Ruler Explainer card** (`StrataRulerExplainer`) — satisfies L1 for the ruler itself:
> *The rail on the left is an altimeter. As you read, the amber bead descends through the four strata — Source, Evidence, Interpretation — and turns red at Unresolved, the edge of what is known. It is where you are in the descent, not how far you have scrolled.*

**Psychological laws:** Imageability / wayfinding (Lynch — the four-strata model is the page's districts & landmarks) · Progressive disclosure (NN/g — QUICK/EXPLAIN/DEEP, 2 steps past default; 30–50% faster initial comprehension) · L3 (Stratum IV is a *row in the table*, not an omission) · L5 (Stratum I's example set at the same weight as Stratum III's — the argument is not louder than its evidence).

---

### BEAT 5 — THE PROOF  ·  Ruler: III · INTERPRETATION (bead about to shift colour)

**Emotional goal:** conviction. *"Here is one finished instrument — its dimensions, its sources, and the questions it could not answer, before I have paid anything."* The open questions are the trust hinge.

- Eyebrow: `THE PROOF`
- H2: `One finished instrument. Its dimensions, its sources, and the questions it could not close.`

**Row 1 — 1fr / 1fr:**

**Brief 001 specimen card** (`BriefCard`) — a drawing-office plate, real data from `content/briefs.ts`:
- Kicker: `BRIEF 001`  ·  status `AVAILABLE`
- Title: `The Architecture of Desire`
- Dek (verbatim from `briefs.ts`): *Why getting what you wanted did not settle anything — and the four-part model of human aims that explains it.*
- Dimension line (Space Mono, measured-drawing annotation): `48 PAGES · 63 SOURCES · 3 UNRESOLVED`
- **Serif pull quote #1 of 2** (Source Serif 4 italic, verbatim from `briefs.ts` `sampleExcerpt`, trimmed to 2 sentences):
  > *"Materialism says consume, and leaves them hollow. Inherited moral systems say suppress, and leave them guilty. Neither is a system — and the result is a permanent low-grade dissonance that people feel constantly and describe almost never."*
- Foot: `Read sample →` (tertiary)  ·  `₹1,299 / $19`

**`UNRESOLVED FRONTIER` bounded void** (`UnsurveyedVoid`) — dashed `--ark-signal-red` perimeter (`1px dashed`, NOT a glow — L3), `rgba(186,60,15,0.06)` fill:
- Header row: `UNRESOLVED FRONTIER`  ·  `⌖ STRATUM IV`
- Sub-header: `Questions we have not yet answered. This is not a weakness. It is an honest map.`
- List (verbatim from `briefs.ts` `unresolved[]`):
  `— Whether the four aims are discovered or merely a useful partition`
  `— What happens to the model under chosen, permanent scarcity`
  `— Whether ranking can be taught or only caught`
- Footer stamp: `UNSURVEYED · REV 2026.08 · 3 OPEN`
- **NO CTA inside the void** (V3 — the discomfort is the persuasion; V2's `VIEW UNRESOLVED →` link is cut).

**Row 2 — 5fr / 7fr:**

**Circular 63-source radial tally dial** (`RadialTally`) — segmented SVG dial, 63 ticks in a 360° ring, grouped-in-fives emphasis, centre `63` / `100% TRACEABLE`. Ticks sweep in once clockwise (600ms, once; static under reduced motion). This is the Von Restorff amber element for this viewport. Caption: *Every source in Brief 001, and every one of them cited in the text.*

**Aphorism** (`Aphorism`) — **serif pull quote #2 of 2** (Source Serif 4 italic, `border-left: 2px solid --ark-amber`):
> *"When you know the map, you stop reacting to the terrain."*
> `— ĀRK`
No added explainer paragraph (V2's "Orientation precedes action…" is cut).

**Psychological laws:** Information-gap (closable) — 3 genuine gaps published before purchase · Labour illusion — the radial 63-dial + `48 PAGES` dimension line as true counts · NOAA Chart No. 1 convention — blank water *marked and bounded*, never disguised as certainty (L3) · L3 + L5 (the void is the most structurally deliberate element in the beat; its honesty is its weight).

---

### BEAT 6 — THE WORK  ·  Ruler: III · INTERPRETATION (accent rested)

**Emotional goal:** trajectory expansion, grounded. *"There is an entire universe of work here, and it is built the way the brief I just inspected was built."* (Archetype D — the ambitious builder — sees a path anchored to real artifacts, not vibes.)

- Eyebrow: `THE WORK`
- H2: `Four surfaces. One way of working.`
- Lead: *Everything ĀRK makes is built the way that brief was built: sourced, layered, and honest about its edges.*

**Four modular cards** (`ProductCard ×4`), 4→2→1 grid, each with a pure-SVG technical line engraving (Tufte-clean, no gradient, no glass, no bento nesting), border-color hover only (no lift). **Zero primary CTAs — tertiary links only** (Hick's Law; the choice is deferred to Beat 7's single ask). The accent is *rested* here (no amber) so Beat 7 owns it.

| Card | Sub | List | Engraving | Link |
|---|---|---|---|---|
| **Briefs** | *Researched essays that go deep without losing clarity.* | mini-row: `001 · The Architecture of Desire · Read sample →` | icosahedral wireframe node-graph | `All briefs →` (`#beat-5`) |
| **Codex** | *A living curriculum for the complete human.* | `Consciousness · Action · Wisdom · Leadership · Technology · & more` | concentric orbital rings | `See the plan →` (`/vision`) |
| **Studio** | *Research for people who need it to be right in public.* | `Documentaries · Books · Podcasts · Articles · Reports · & more` | surveyor's theodolite line-drawing | `Commission research →` (`/studio`) |
| **Library** | *Texts that outlasted their centuries. Modern minds. One searchable archive.* | `Bhagavad-gītā · Upaniṣads · Science · Philosophy · Civilizations · & more` | stacked-strata book-spine section | `Enter the library →` (`/library`) |

- **Library L6 note:** `Bhagavad-gītā · Upaniṣads` appear as *catalogue contents of a library* — defined by function, IAST diacritics verified (`ī`, `ṣ`), first-use gloss carried once as a footnote: *Upaniṣads: the concluding philosophical texts of the Vedic corpus.* An accurate table of contents is not devotional branding (COPY_DECK §3 row 11). "Timeless" was caught and replaced with "Texts that outlasted their centuries" (banned-word audit).
- Card links point at real routes/anchors, not all at `#beat-7` (fix the V3 residual — see §11).

**Psychological laws:** Possible-self expansion (four concrete surfaces = four visible trajectories, each anchored to a real artifact — Brief 001 exists, the catalogue 002–005 is named, Studio's rate card is real; ambition shown as *work*, anti-list #13 honored) · Hick's Law (four *equal* cards, zero primary CTAs) · Von Restorff (accent rested) · Rams "as little design as possible."

---

### BEAT 7 — ENTRY  ·  Ruler: IV · UNRESOLVED (bead → signal red)

**Emotional goal:** resolve into a quiet, high-conviction decision. The strongest claim of the page rings, then exactly one low-friction honest ask. No triumph, no urgency — the "pilot's trust": the next action was designed before the reader arrived.

**Layout:** centered, `background: --ark-bg-deep` (one deepened ground step, gradient-free). Eyebrow `THE ENTRY`.

**The peak-end claim** (`PeakClaim`) — the single loudest sentence on the page (Inter 600, near-H1 scale, `--ark-ink-hi`, no ornament), alone, held for a full viewport-third of scroll before anything else appears. **This is V3's payload — V2 has nothing equivalent and must not be used here:**
> *Become everything you are capable of becoming —*
> *then find out who is doing the becoming.*

Sigil beneath (L2 coordinate, Space Mono): `— ĀRK · THE WORKING THESIS`

This lands the Vision Document's exact thesis (Vision §"deepest version"; DOCUMENTATION.md §3.3 Translation Table final row) and ends inside an identity question — a real, closable Loewenstein gap (the same question as Primer Q1 / Parfit's personal-identity problem; the Primer and the briefs exist to work on it).

**THE WEEKLY LETTER** (`WeeklyLetter`) — the one primary CTA of the final screen:
- Title `THE WEEKLY LETTER` · sub *Ideas worth your attention. One letter. Every week.*
- Single email field + `Subscribe` button. `type="email"`, `noValidate`, RFC-5322-ish regex, `aria-invalid`, `aria-describedby`, inline blur validation. POSTs `/api/subscribe` `{ email, source: "landing-weekly-letter" }`, `credentials: "same-origin"`.
- States: invalid → `That doesn't look like an email address yet.` (`aria-live="assertive"`); success → `✓ Check your inbox — the first letter is on its way.` (`role="status"`); network error → a **real error message**, not a silently-swallowed success (V3 remediation — do not `catch {} → done`).
- Reassurance (CCPA-compliant, real commitments — anti-list #9, India CCPA Dark Patterns Guidelines 2023):
  `No spam. No noise. Only signal.`
  `One click unsubscribes. We never sell the list.`
- No pre-checked box, no "no thanks I don't want to become extraordinary" guilt option, no countdown, no cookie theatre.

**Drawing-office footer** (`FooterStrip`) — `[HARVEST — V2 furniture, V2 slogans cut]`:
- Tagline: `© ĀRK 2026 · Built on truth · Driven by curiosity · Guided by consciousness`  (`2026`, not `2024`; "Guided by consciousness" passes the atheist test — secular; "Guided by Kṛṣṇa consciousness" would fail and is not used — COPY_DECK §3 row 12.)
- Coordinate line (V2 furniture, kept): `LAT 28°36'N · LON 77°12'E`
- Edition / revision line (V2 furniture, kept): `REV 2026.08`
- Links: `Privacy` · `Terms` · `Contact`
- **Cut:** `SEAL OF EPISTEMIC INTEGRITY`, `REGISTERED ATLAS MARK`, `RIGOUR IN RESEARCH. DEPTH IN WISDOM. EXCELLENCE IN LIFE.` (anti-list #13 — motivational-poster register; L5 — loud slogans not attached to a supported claim).

**Strata Ruler end label:** `END OF SECTION · SURVEY CONTINUES` closes the rail (L3 in miniature — even the page's own end is drawn, not blank).

**End state:** bead at rail base in signal red. Page does not auto-scroll, does not pop a modal, does nothing else. The instrument is at rest.

**Psychological laws:** Peak-End (Kahneman — the page ends on its strongest claim, *then* the single ask; the peak gets its own screen-third; the footer is below the field, not competing) · Hick's Law (exactly one action; unsubscribe honesty is a link) · Information-gap closing the loop (the claim ends inside "who is doing the becoming?") · L2 (even the closing aphorism carries a coordinate).

---

## 5. The Eight Psychological Mechanisms — Verification Matrix

Every mechanism triggered, bound to a law, within its hard limit, free of dark-pattern expression. This is the Phase 6 review checklist for the synthesis page.

| # | Mechanism | Trigger on the synthesis page | Bound law | Hard limit honored |
|---|---|---|---|---|
| 1 | Information-gap curiosity (Loewenstein) | Fig. 1 poses "what connects these four?" (B2); `UNRESOLVED FRONTIER` shows 3 real open questions before purchase (B5); peak claim **ends inside** "who is doing the becoming?" (B7) | L3 | Gaps are Brief 001's actual `unresolved[]`, closable by reading; no clickbait tease; void has no CTA |
| 2 | Labour illusion / operational transparency (Buell & Norton) | 63-tick traceable bar (B1); Live Research Panel with timestamps + counts, **DepthControl visibly makes it respond** (B3); `48 PAGES · 63 SOURCES` dimension line + radial dial (B5) | L5 | 63/48 are Brief 001's real figures; panel footnote states "real, not incremented for effect"; no "10,000+ hours" |
| 3 | Choice paralysis (Hick's Law) | Hero = 1 primary CTA + demoted (bordered) header CTA; B6 = 0 primary CTAs; B7 = 1 (`Subscribe`) | Standing rule | No screen shows two competing primaries; header CTA is secondary-weight and goes to `#beat-2`, not `#beat-7` |
| 4 | Von Restorff (isolation) | Amber OR red rationed to ~1 element/viewport: reading bead, active DepthControl key, radial dial, hero CTA; B6 rests the accent | L5 | Glow only on bead + strip dot + sensor dot (Tektronix); no slogans competing at display weight |
| 5 | Peak-End (Kahneman) | B7 places the Vision thesis sentence alone, holds it a viewport-third, *then* one field | L3 | Peak is not buried under newsletter noise; footer is below, not competing; the powerful sentence is present (V3's, not V2's newsletter H2) |
| 6 | Processing fluency + aesthetics-as-credibility | Strict grid, one type system, 60–68ch measure, Space Mono marginalia, hairlines only where structural | L4 | The disfluent 5% (void box, dense strata table at Beat 4) is deliberate and bounded; 95% maximally fluent |
| 7 | Possible-self expansion (Markus & Nurius) | Left hero motto (B1); 4 real product trajectories each anchored to a real artifact (B6); peak claim frames a larger self (B7) | L6 + L5 | Every ambition line sits adjacent to proof; no "10x / unlock / transform"; dignity register for Archetype D — equip, never inflame |
| 8 | Awe & small-self (Keltner & Haidt; Piff et al.) | Celestial horizon rings YOU→H·03 (B1, the V2 seeker art); Fig. 1 four whole territories at once (B2); both quiet-type, bounded, keyed | L3 + L5 | Horizon is a bounded `FIG. 0` plate with a scale line, dawn `≤ rgba(255,176,0,0.06)` — no full-bleed panorama, no rocket-glow; small-self motto co-present with possible-self motto |

---

## 6. Constitution Compliance Ledger (L1–L6 + anti-list)

| Law | How the synthesis page satisfies it |
|---|---|
| **L1 Legend precedes terrain** | Strata Ruler key spelled out in Beat 4's explainer card; Fig. 1 ships its four-label key in-viewport; `PatternKey` component in Beat 3 before any hatched diagram downstream; radial dial captioned; void header + stamp |
| **L2 Claims carry coordinates** | `63` sourced everywhere it appears; `48 PAGES · 63 SOURCES · 3 UNRESOLVED` dimension line; `₹1,299 / $19`; `REV 2026.08`; `— ĀRK · THE WORKING THESIS` sigil under the peak claim; per-row `SOURCES / LAST UPDATE`. **No decorative/invented coordinates** (V2's fake per-quadrant coords and DepthControl point-coords are cut — anti-list #6) |
| **L3 Unmapped ground drawn** | `UNRESOLVED FRONTIER` void: `1px dashed --ark-signal-red`, real questions, **no CTA inside**; Stratum IV is a table row; `END OF SECTION · SURVEY CONTINUES` end label |
| **L4 Marginalia load-bearing** | All sigla / IDs / timestamps / coordinates / eyebrows / ruler numerals / void stamp / footer chain in Space Mono, visually distinct from Inter prose |
| **L5 Scale is honest** | The `63` counter is the heaviest datum in Beat 1; secondary metrics set smaller; amber rationed to the bead + active states; **no "EXCELLENCE IN LIFE" slogans at display weight** |
| **L6 Depth reveals cartographer** | Surface chrome is 100% domain language (Curious Atheist Test ledger, COPY_DECK §3, all PASS); framework *declared* (not named) via `CartographersHand`; `Śabda/Pratyakṣa/Anumāna` appear **only** inside labelled Strata I–III at `INTERPRETATION` depth, glossed on first use; `Gītā`/`Upaniṣads` only as table-of-contents / text-under-study, glossed; **no "spirituality/devotion" in the hero** (V2 leak fixed); **no "► ARK INTERPRETIVE FRAMEWORK ◄" band** (V2 chrome assertion cut); zero tattva/darśana/Kṛṣṇa on the surface (epistemology spec §7.2 — page is strictly Tier 1) |

**Anti-list:** #1 (warm dark ground breaks the cream/serif triad) ✅ · #2 (phosphor amber is a signal, not neon; glow only on the datum) ✅ · #3 (hairlines only where structural) ✅ · #4 (no bento/glass/gradient) ✅ · #5 (all SVG hand-authored, no particle placeholders) ✅ · #6 (no hover-glow affordances; numerals are real sequences; **invented coordinates cut**) ✅ · #7 (no devotional visuals or register; tradition terms only at depth, glossed) ✅ · #8 (no Sanskrit in H1/nav/buttons/product names) ✅ · #9 (no fake scarcity/timer/cookie theatre; CCPA reassurance real) ✅ · #10 (**header CTA demoted to secondary; one primary per viewport**) ✅ · #11 (no emoji iconography, no stock photos) ✅ · #12 (`FIG. 0` is a bounded plate with a scale line, not a panorama) ✅ · #13 (**"EXCELLENCE IN LIFE" / seal slogans cut**; ambition shown as work) ✅ · #14 (dawn opacity pulled to `≤0.06`; grandeur is typographic, not sci-fi set-dressing) ✅

---

## 7. Audience Fit (`AUDIENCES.md`)

| Archetype | What this page does for them | Failure mode guarded |
|---|---|---|
| **A — Commissioning professional** | Beat 3's live panel + Beat 5's Brief 001 dimension line prove work-product exists before the hero scrolls off; `Studio` card → `/studio` (rate card, slot counter live there, not faked on the landing) | "leaves after the hero because nothing proves work product exists" — Beat 1's 63-tally + Beat 3's panel are visible early |
| **B — Serious reader** | Beat 5 shows a readable sample excerpt (serif pull quote) + the Unresolved list before any paywall; `Read a sample brief →` from the hero | "skims the contents list, finds no readable proof of depth, leaves" — the excerpt is on the page |
| **C — Cold skeptic** | Every surface sentence passes the atheist test (COPY_DECK §3); the framework is *labelled as framework* only at depth (Beat 4 `INTERPRETATION`), which paradoxically raises trust; warm-dark + Space Mono + engineering diagram breaks the cream-serif AI-content pattern-match in the first fixation | "pattern-matches to generic AI content site and dismisses" — the instrument aesthetic + real 63 in the first 5 seconds; **no "devotion" in the hook** |
| **D — Ambitious builder** | Beat 1 mottos + Beat 6 four grounded trajectories + Beat 7 peak claim = trajectory expansion anchored to real artifacts; dignity register throughout (equip, never inflame) | "pattern-matches to motivation content, distrusts it" — no hustle vocabulary, no "EXCELLENCE IN LIFE", ambition is always adjacent to shown work |

---

## 8. Accessibility Contract (WCAG 2.2 AA, targeting AAA on text)

- Skip link → `<main id="main-content" tabindex="-1">` (V2's semantic target + V3's placement).
- Strata Ruler: `aria-live="polite"` "Now reading: Stratum…" announcement; keyboard band roving (Arrow/Home/End); `aria-current` on the active band.
- DepthControl (both instances): `aria-pressed`, ArrowLeft/Right roving, helper text in a live region, 48px hit targets.
- Fig. 1 quadrants: `role="button" tabindex="0"`, Enter/Space, visible amber focus ring, `aria-label` includes the failure line; caption slot `aria-live="polite"` with a permanent default.
- Weekly Letter: `<label>` (sr-only), `aria-invalid`, `aria-describedby`, inline error `aria-live="assertive"`, success `role="status"`, **real network-error state**.
- All text pairings from the 19 certified contrast pairs; `--ark-signal-red` on `--ark-bg-raised` (3.06:1) annotated in the token file as having no headroom.
- `prefers-reduced-motion: reduce` → durations `0.01ms`, `box-shadow: none`, bead jumps, strokes pre-drawn, fade-ups at final position — and this is a real code path with real motion to suppress.
- `prefers-contrast: more` → `--ark-muted` boosts to `#c4b69d` (8.8:1), rules strengthen.
- Zero horizontal overflow at 1440 / 768 / 390 / **320** (V2's extra-narrow check, kept).
- Touch targets ≥ 48px everywhere.

---

## 9. Technical Architecture

- **Route:** built in `app/lab/synthesis/page.tsx` (`"use client"` — owns `depth3`, `depth4`, `hoveredTerritory` state), then promoted to the production home route `app/page.tsx`.
- **Styles:** `app/lab/synthesis/synthesis.css` (tokens, ratified) + a `synthesis-layout.css` for the layout/component rules merged from `v2.css` + `v3.css`. Container scoped `data-dir="synthesis"`.
- **Components** (`app/lab/synthesis/_components/`): `TopBar`, `StrataRuler`, `HeroBeat` + `CelestialPlate` (V2 SVG, V3 frame) + `TallyBar`, `DiagnosisBeat` + `FourTerritoryMap` (V3 SVG + V2 readout) + `CartographersHand`, `MethodBeat` + `FourRules` + `DepthControl` + `ResearchPanel` + `PatternKey` + `TallyStrokes`, `AnatomyBeat` + `StrataTable` + `StrataRulerExplainer`, `ProofBeat` + `BriefCard` + `UnsurveyedVoid` + `RadialTally` + `Aphorism`, `WorkBeat` + `ProductCard`, `EntryBeat` + `PeakClaim` + `WeeklyLetter` + `FooterStrip`. SVG primitives under `_components/svg/`.
- **Hooks** (`_components/hooks/`): `useActiveStratum` (single IntersectionObserver, `[]` deps — V3's remediated version), `useReducedMotion`.
- **Data:** real, from `content/briefs.ts` (Brief 001) and `content/primer.ts`. Research-panel figures declared static-at-build. **No fabricated data anywhere.**
- **Isolation:** no import from `@/components/*` or `@/lib/*` while in `/lab`; the mobile nav disclosure is authored locally. On promotion to `app/page.tsx` this relaxes to the normal app boundary.
- **Fonts:** `next/font/google` — Inter, Space Mono, Source Serif 4, each with `subsets: ["latin", "latin-ext"]`.
- **Radius Law:** `#synthesis-root, #synthesis-root *, ::before, ::after { border-radius: 0 !important; }`.
- Build must stay `next build` (plain) — Cloudflare build is `npm run pages:build` (CLAUDE.md standing rule).

---

## 10. Verification Gates (all must pass before promotion)

1. `npm run typecheck` — 0 errors.
2. `npm run build` — 0 errors; the synthesis route prerenders **static** (`○`).
3. `node scripts/design/contrast.mjs` — 19/19 pairs pass + both negative gates fire.
4. `node scripts/design/verify-synthesis.mjs` (Playwright, headless Chromium) — desktop 1440×900 + mobile 390×844 + **320×568**:
   - Console & hydration: 0 errors, 0 warnings.
   - All 7 beats + ruler + every widget present and visible.
   - **Structure:** exactly 7 `<section id="beat-1..7">`; no beats fused.
   - **Interactive state machine:** DepthControl SOURCE→EVIDENCE→INTERPRETATION on Beats 3 & 4 → `aria-pressed`, panel content expands, 63-tally reveals at INTERPRETATION; Fig. 1 hover/click → caption changes; scroll → ruler stratum updates and bead flips to red at Stratum IV/Beat 7; Weekly Letter invalid→error, valid→success, network-fail→error.
   - **Ration audits:** exactly 2 `--ark-font-serif` elements (computed-style sweep); exactly 1 primary-weight CTA visible per viewport at 1440 & 390 (header CTA must be secondary); Tektronix-glow confinement (`box-shadow` glow only on bead + strip dot + sensor dot).
   - **A11y:** skip-link target; `aria-live` ruler announcement fires; keyboard band roving; Fig. 1 Tab+Enter; reduced-motion context → no glow, bead jumps, all content present; zero horizontal overflow at all four widths; touch targets ≥ 48px.
   - Screenshots → `docs/design/screens/synthesis-desktop.png`, `synthesis-mobile.png`.
5. **5-second Cold-Skeptic test** (Execution Guide §7.2): show for 5s, hide, ask "what is this?" → PASS = "a research outfit / shows its sources / sells investigated essays"; "how did it feel?" → PASS = "calm, precise, rigorous, like an aerospace lab or elite private library." Ojas signs off.

---

## 11. Open Items to Resolve During Build (carried from the analysis)

1. **Nav & card anchors** — every TopBar nav item and every Beat 6 card link points at the beat/route it names. `Studio`/`Codex`/`Library` → their real routes (`/studio`, `/vision`, `/library`); `Briefs` → `#beat-5`; `Method` → `#beat-3`; `Journal` → the future journal route or `#beat-7` explicitly. No "everything points to `#beat-6`/`#beat-7`" residue.
2. **`Enter the Atlas` destination** — hero CTA and header CTA go to `#beat-2` (into the content). Only `Subscribe` acts on `#beat-7`. (Fixes the shared V2/V3 bug.)
3. **`Leadership & Dharma`** — ship as-is with the `Leadership & Duty` one-cell fallback wired and documented; final ruling at Phase 6 persona review.
4. **`ResearchPanel` `aria-live` scope** — confirm it is on a concise status line, not the table body.
5. **`--ark-signal-red` / `--ark-bg-raised` (3.06:1)** — add a comment in `synthesis.css` that this UI pair has zero headroom; no darkening of the red or lightening of the raised ground without re-audit.
6. **Celestial plate dawn opacity** — build to `≤ rgba(255,176,0,0.06)` core; do not port V2's `0.28`.
7. **Fig. 1 "survey stream" tags** — default is to omit; only include if every tag is a real current research area (then reuse the `R-01…R-06` names).
8. **Documentation** — on completion, update `DEVELOPMENT_LOG.md` (build entry), `TECHNICAL_DOCUMENTATION.md` (new synthesis route + components), `IMPLEMENTATION.md` (landing page: stubbed → done, and any deviation from the lab specs logged), and `DOCUMENTATION.md` §9 only if the visual identity statement changes.

---

## 12. What Every Page After This One Inherits

This landing page is the pattern. New pages (`/research`, `/studio`, `/vision`, `/primer`, `/docs`, article surfaces) follow it:

- **Same tokens, same type triad, same Radius/Glow/Serif-Ration/Von-Restorff laws** — from `synthesis.css`, never re-invented.
- **Strata Ruler** on any page with a claim-bearing scroll (research briefs especially) — depth indicator, not progress bar.
- **DepthControl** wherever content has layers — wired to actually filter, `aria-pressed`, arrow roving, ≥48px.
- **The 4-strata model** (`I Source / II Evidence / III Interpretation / IV Unresolved`) is the universal structure for every brief and every argued claim.
- **`UNSURVEYED` voids** for every open question — dashed red, bounded, named, no CTA inside.
- **L6 layer discipline** — surface passes the Curious Atheist Test; framework terms (`Śabda`, `Gītā`, `Vedānta`, tattvas) only at depth, in labelled strata, glossed on first use. Tier 2/3 epistemology material (darśana comparison, Govinda-bhāṣya, Kṛṣṇa) belongs on `/root` or deep brief interiors, never on entry surfaces.
- **One primary CTA per viewport.** Header actions are secondary-weight.
- **Peak-End** — every page ends on its strongest claim, then one ask; never on a newsletter headline or a slogan ribbon.
- **No fabricated data, ever.** Every number carries a real coordinate or it does not ship.
- **The four verification gates** (typecheck / build / contrast / Playwright) + the 5-second cold-skeptic test are the definition of done for any new page.

---

*End of FINAL_LANDING_PAGE_SYNTHESIS.md — the ratified merge of V2 and V3. Build against this; do not re-litigate it without a Constitution-level review.*
