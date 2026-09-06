# ĀRK Design System Synthesis — The Triad Specification (C + A + E)

**Status: RATIFIED — Phase 2 Gate Output (2026-08-26)**  
**Authority:** Ojas (Phase 2 Scores: A: 5/5, C: 5/5, E: 4/5)  
**Governing Documents:** [`ARK_Vision_Document.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/ARK_Vision_Document.md), [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md), [`Landing Page Design Process.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/Landing%20Page%20Design%20Process.md)

---

## 1. Vision & Architectural Thesis

> *"The landing is an operational civilization-scale instrument: navigation itself is a stratigraphic altimeter (C) descending from empirical soundings to declared unmapped ground; the hero is a dual-engine apparatus pairing live labour instrumentation and tactile depth-switching (A) with an interactive critical atlas of human knowledge (E); and the atmosphere is the quiet, high-voltage precision of a spacecraft research station and private library at night (C)."*

### The Four Worlds Unified (Vision §0, §6)
The Triad Synthesis resolves the fundamental challenge set out in the [Vision Document](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/ARK_Vision_Document.md)—unifying four distinct registers into one coherent universe without religious sentimentalism or sterile reductionism:

1. **The Executive & Lab Precision (from Direction A):** Braun 3-key `DepthControl`, 6-row live labour ledger (`R-01…R-06`), and the 63-source tally diagram. Rigour is inspected before asking for belief.
2. **The Operating System & Stratigraphic Descent (from Direction C):** The persistent **Strata Ruler** makes the four-layer method (*Source → Evidence → Interpretation → Unresolved*) the literal scroll navigation, enacting progressive disclosure (Constitution L6, Vision §4–5).
3. **The Planetary & Cosmic Horizon Scale (from Direction E):** The **Fig. 1 Four-Territory Map** (with the Cartographer's Hand) and **H·01–H·03 Horizon Insets** frame human potential from individual mastery to cosmic scale, embedding the ambition engine (*"Do not make yourself smaller than you are capable of becoming"*) alongside the humility engine (*"I am not the center of existence"*).
4. **The Atmosphere (from Direction C):** Warm ink-dark ground (`#181310`), high-contrast display ink (`#f0e7d8`), and phosphor-warm amber signals (`#ffb000`) adhering to the **Tektronix Rule** (glow emitted only by the measurement signal, never by chrome).

---

## 2. Triad Component Matrix

| Axis | Direction C (The Strata Ruler) | Direction A (The Instrument Panel) | Direction E (The Horizon Plate) | **The Triad Synthesis (Ratified)** |
|---|---|---|---|---|
| **Ground & Light** | Warm ink-dark (`#181310`) + Amber (`#ffb000`) | Paper-white (`#FAFAF8`) + Signal red | Grey-paper (`#F3F2ED`) + Red (`#B83A0E`) | **Warm ink-dark instrument ground (`#181310`) + Phosphor Amber + Signal Red (C)** |
| **Navigational Spine** | Vertical engraved Strata Ruler + Top strip | — | Header plate index | **Persistent Strata Ruler Altimeter (C)** |
| **Hero Machinery** | Single-column teaser | Readings panel + 3-key `DepthControl` | Diagram-as-hero (Fig. 1) | **Integrated Split Hero: DepthControl Ledger (A) + Territory Map (E)** |
| **Typography** | Inter + Fraunces quotation | Space Mono + Source Serif 4 | IBM Plex 3-role | **Technical Triad: Inter + Space Mono + Source Serif 4 (Verified Diacritics)** |
| **Imagery & Diagrams** | Stratigraphic fills (stipple/bedding) | 63-stroke tally diagram | Fig. 1 Territories + Insets | **Engineering Blueprint & Stratigraphic Engraving (C + A + E)** |
| **Scale Engine** | Evidence scale (63 sources) | True labour counts | Horizon insets H·01–H·03 | **Dual Engine: Labour Transparency (A) + Horizon Cosmos Inset (E)** |

---

## 3. Token System Architecture (Phase 3 Foundation)

### 3.1 Color Palette & Roles

```css
:root, [data-dir="synthesis"] {
  /* Ground & Surfaces */
  --ark-bg: #181310;             /* Warm near-black instrument ground (never sterile #000) */
  --ark-bg-raised: #211a14;      /* Active panels, toolbars, mobile ruler strip */
  --ark-bg-plate: #282018;       /* Embedded diagram insets, callout frames */
  
  /* Ink Hierarchy */
  --ark-ink-hi: #f0e7d8;         /* Primary headings, H1/H2, CTA surface, focus rings (15.03:1) */
  --ark-ink: #d9cdb9;            /* Body reading prose, diagram labels (11.75:1) */
  --ark-muted: #a3957d;          /* Meta, sigla, captions, ruler ticks, units (6.28:1) */
  --ark-faint: #5e5445;          /* Decorative ticks, inactive borders, grid background */

  /* Hot Signals (Strictly Rationed) */
  --ark-amber: #ffb000;          /* Phosphor-warm signal: reading bead & live measurement (10.06:1) */
  --ark-signal-red: #BA3C0F;     /* Action marker & declared UNSURVEYED boundaries (4.58:1 on hi, 3.28:1 on bg) */


  /* Structural Hairlines (Never Wallpaper) */
  --ark-rule: rgba(240, 231, 216, 0.15);
  --ark-rule-strong: rgba(240, 231, 216, 0.34);
}
```

### 3.2 The Tektronix Glow Law (Named Subversion of AI-Default #2)
* **Law:** Glow is physically emitted **only by the signal/datum**, never by the bezel, card border, or container chrome.
* **Execution:** Only the live amber reading bead (`.ark-ruler-bead`) and active sensor indicators carry a subtle luminous blur (`box-shadow: 0 0 12px rgba(255, 176, 0, 0.45)`). All buttons, borders, frames, and background panels remain strictly matte.
* **Reduced Motion:** Glow is suppressed and animation duration collapses to `0.01ms` under `prefers-reduced-motion: reduce`.

---

## 4. Typography & Diacritic Specification

### 4.1 Type Roles

| Role | Family | Weights | Case & Tracking | Purpose |
|---|---|---|---|---|
| **Display & UI** | **Inter Variable** | 500, 600, 660 | Sentence case, `letter-spacing: -0.02em` | H1, H2, section leads, button actions |
| **Apparatus & Data** | **Space Mono** | 400, 700 | Uppercase & Tabular | Numerals, readings `R-01…`, sigla, DepthControl keys, legend labels, title blocks |
| **Quotation / Reflection** | **Source Serif 4 Variable** | 400 italic | Italic prose | Strictly rationed to quiet philosophical quotes (max 2 per page) |

### 4.2 Verified Glyph Coverage
Both **Space Mono** and **Source Serif 4** (with Next.js `latin-ext` subsetting) have been mathematically and empirically verified via `cmap` audits to include **100% full native glyph coverage** for all critical Sanskrit transliteration characters and currency symbols:
$$\text{Verified Glyphs: } \text{Ā (U+0100), ā (U+0101), Ī (U+012A), ī (U+012B), Ṃ (U+1E42), ṃ (U+1E43), Ṛ (U+1E5A), ṛ (U+1E5B), ₹ (U+20B9)}$$

*Specimen Proof String (displayed on-page):*  
`ĀRK · Vimāna · Sāṃkhya — Ā ā Ī ī Ṃ ṃ Ṛ ṛ · ₹1,299`

---

## 5. Hero Screen Blueprint (The Integrated Split Hero)

```
┌─────────────────────────────────────────────────────────────────────────────────────────────┐
│ TOP BAR: [ĀRK WORDMARK]                       [INSTRUMENT STATUS: ACTIVE]   [PRIMER LINK]  │
├───────┬──────────────────────────────────────────┬──────────────────────────────────────────┤
│ STRATA│ LEFT COLUMN (5/12) — THE APPARATUS       │ RIGHT COLUMN (7/12) — THE ATLAS          │
│ RULER │                                          │                                          │
│       │ [Eyebrow] DISCIPLINE OF INTEGRATION      │ FIG. 1: THE FOUR BROKEN TERRITORIES      │
│ [ I ] │                                          │ ┌──────────────────────────────────────┐ │
│       │ H1: "You are not short of                │ │       [ MEASURABLE ]   [ MARKETABLE ] │ │
│ [II ] │      information. You are                │ │          (Hatch A)        (Hatch B)   │ │
│   ●───┼──►   short of integration."              │ │                  ╳ Seam               │ │
│ [III] │                                          │ │       [ WANTED ]       [ INHERITED ]  │ │
│       │ [DepthControl] [QUICK | EXPLAIN | DEEP]  │ │          (Hatch C)        (Hatch D)   │ │
│ [IV ] │                                          │ └──────────────────────────────────────┘ │
│       │ READINGS LEDGER (R-01 … R-06):           │ ▣ CARTOGRAPHER'S FRAME:                  │
│       │ • R-01 Sources Read: 63 [Tally Diagram]  │ "Every map asserts. Ours is declared,    │
│       │ • R-02 Pages Typeset: 48                 │  not erased. Named at depth."            │
│       │ • R-03 Studio Capacity: 3 / month        │                                          │
│       │ • R-04 Open Questions: — (Unsettled)     │ [NASA GSM Drawing-Office Title Block]    │
│       │                                          │ Scale: 1:1 · Rev: 2026.08 · Coord: 28°N  │
│       │ [PRIMARY CTA: READ THE PRIMER — FREE]    │                                          │
└───────┴──────────────────────────────────────────┴──────────────────────────────────────────┘
```

### Key Interactive Mechanics:
1. **The Strata Ruler Altimeter:** Rests along the left margin (desktop) or fixed top-strip (mobile). As the user scrolls, the amber bead tracks document progress, lighting up Strata I (*Source*), II (*Evidence*), III (*Interpretation*), and IV (*Unresolved/Cartographer*).
2. **The Braun 3-key `DepthControl`:** Clicking `QUICK`, `EXPLAIN`, or `DEEP` expands/collapses the provenance sigla (`[B1]`, `[S3]`) and reveals the **63-stroke tally diagram** under R-01 via smooth CSS grid transitions.
3. **The Four-Territory Map (Fig. 1):** Interactive SVG regions representing the fractured landscape of modern thought. Seams are disputed; hovering highlights the corresponding failure mode and the Cartographer's declared fifth frame.

---

## 6. Diagram & Flowchart Architecture (Phase 4 Foundation)

For all upcoming flowcharts, data graphs, and structural diagrams, the Triad strictly adheres to the **Engineering Blueprint & Stratigraphic Engraving** model:

```
┌────────────────────────────────────────────────────────┐
│ STANDARD SVG STRATIGRAPHIC PATTERN FILLS               │
├─────────────────────────┬──────────────────────────────┤
│ I. SOURCE               │ Fine dot stipple (#d9cdb9)   │
│ II. EVIDENCE            │ Horizontal bedding rules     │
│ III. INTERPRETATION     │ 45° diagonal hatch lines     │
│ IV. UNRESOLVED GROUND   │ Dashed perimeter, empty void │
└─────────────────────────┴──────────────────────────────┘
```

* **No Generic SaaS Visuals:** Zero gradients, zero floating wireframe blobs, zero glassmorphic cards.
* **Documentary-Grade Precision:** Every chart includes coordinate ticks, dimension lines, and a standard **NASA-GSM Title Block** (Document ID, Date, Rev, Classification).
* **Open Questions Bounded:** All unmapped or unsettled concepts are rendered with a dashed boundary and marked `UNSURVEYED`, satisfying **Constitution Law L3** (*Unmapped ground stays drawn*).

---

## 7. Constitution Laws & Psychological Contract Mapping

### 7.1 Ratified Laws (L1–L6) Enforced
* **L1 (Legend Precedes Terrain):** The Strata Ruler key and Territory Map legend are immediately visible before any complex data.
* **L2 (Coordinates on Every Claim):** All figures (63 sources, 48 pages, ₹1,299/$19) carry origin sigla.
* **L3 (Unmapped Ground Drawn):** Stratum IV and the Cosmos Horizon inset feature bounded, declared unknown territory.
* **L4 (Load-Bearing Marginalia):** Space Mono handles all metadata, sigla, and readings in dedicated layout columns.
* **L5 (Honest Scale):** Visual weight strictly tracks evidential weight; the loudest numeral on screen is the best-supported fact (63 sources).
* **L6 (Depth Reveals Cartographer):** The spiritual framework (Vedānta/Kṛṣṇa consciousness) is progressively disclosed as the deepest substrate/DNA through strata descent, never shouted on surface chrome.

### 7.2 The Eight Psychological Mechanisms
1. **Labour Illusion / Operational Transparency:** 63-source tally diagram + live readings ledger.
2. **Awe / Small-Self:** H·01–H·03 Horizon Insets (Humanity → Civilization → Cosmos) with quiet-serif vast claims.
3. **Possible-Self Expansion:** Concrete trajectories for the ambitious builder anchored to real artefacts.
4. **Information-Gap Curiosity:** Unresolved list visible pre-purchase in Stratum IV.
5. **Choice Paralysis (Hick's Law):** Exactly one primary CTA per screen (`Read the Primer — Free`).
6. **Von Restorff Isolation:** Only one amber reading signal / red action mark per screen.
7. **Peak-End Rule:** Journey culminates in the strongest philosophical thesis before the single ask.
8. **Processing Fluency:** 65ch reading measure, razor-sharp alignment, and zero decorative fluff.

---

## 8. Anti-List (1–14) Conformance Audit

| Anti-List Item | Triad Disposition | Status |
|---|---|:---:|
| 1. Cream + serif + terracotta triad | Escaped via warm ink-dark ground (`#181310`) + amber phosphor. | **PASS** |
| 2. Near-black + acid/neon | Escaped via warm brown-black tone & Tektronix signal-only glow rule. | **PASS** |
| 3. Broadsheet hairline wallpaper | Hairlines appear only where structurally separating data rows/plates. | **PASS** |
| 4. Purple gradient SaaS / glass / bento | Flat matte surfaces, SVG hatch fills, zero glassmorphism. | **PASS** |
| 5. Floating 3D wireframe placeholders | Replaced by diagram-native SVG arguments and working ledgers. | **PASS** |
| 6. Marquees / word-stagger / hover-lift | All killed; stillness-first motion model with 220ms state transitions. | **PASS** |
| 7. Devotional branding in chrome | Surface is strictly epistemic; tradition disclosed progressively at depth. | **PASS** |
| 8. Sanskrit in H1 / nav / buttons | H1 and nav in English prose; diacritics in type proof strip only. | **PASS** |
| 9. Fake scarcity / countdown timers | Capacity stated as operational fact ("3 commissions/mo", CCPA compliant). | **PASS** |
| 10. Two competing CTAs on one screen | Strictly one primary CTA per screen. | **PASS** |
| 11. Emoji / stock photos pointing at screens | Diagram-native vector arguments only; zero stock images. | **PASS** |
| 12. Panorama without a key | All expansive moments are bounded insets with scale lines. | **PASS** |
| 13. Motivational-poster hustle register | Ambition shown as concrete work and rigorous discipline, not slogans. | **PASS** |
| 14. Sci-fi cosplay / rocket HUD | Instrumental grandeur via NASA-GSM typographic reduction. | **PASS** |

---

## 9. Directives for Phase 3 Execution

1. **Token File:** Create the unified CSS token block in `app/lab/synthesis/synthesis.css` (or `lab.css`).
2. **Contrast Audit Script:** Implement `scripts/design/contrast.mjs` to mathematically certify that all text-on-ground pairs exceed WCAG AA standards.
3. **Specimen Route:** Build `/lab/synthesis/specimen` rendering the full token palette, type specimens, button states, `DepthControl` switches, and SVG hatch samples.
4. **Verification Gate:** Run `npm run typecheck && npm run build` and certify zero errors before visual inspection by Ojas.

---

## 10. Phase 3 Convergence Decisions & Verification Certification

**Status: EXECUTED & CERTIFIED (2026-08-26)**  
**Specimen Live Route:** `/lab/synthesis/specimen`  

### 10.1 Key System Decisions
1. **Dark-Ground Usage:** Warm ink-dark ground (`#181310`) is ratified as the primary surface across the entire synthesis layout, supported by `#211a14` (raised instrument modules) and `#282018` (embedded plate insets). The cold sterile `#000000` is rejected; the warm brown-black tone embodies the "spacecraft + private library at night" atmosphere (Vision §6).
2. **Hot Signals & Color Retirement:** Phosphor amber (`#ffb000`, 10.06:1 AAA) is dedicated exclusively to the live reading signal/datum under the Tektronix Glow Law. Signal Red is calibrated to `#BA3C0F` (4.58:1 on `#f0e7d8` AA text, 3.28:1 on ground UI) for action indicators and UNSURVEYED boundaries. All blue/gold gradient defaults are permanently killed.
3. **Radius 0 Standing Law:** `* { border-radius: 0 !important; }` is preserved globally as a non-negotiable architectural decision. Precision instruments and stratigraphic engravings do not use soft border radiuses.

### 10.2 Contrast Audit Certification Table (`scripts/design/contrast.mjs`)

| Token Pairing | Hex Values | Calculated Ratio | Target Standard | Status | Functional UI Role |
|---|---|---|---|:---:|---|
| `--ark-ink-hi` on `--ark-bg` | `#f0e7d8` on `#181310` | **15.03:1** | AAA (≥7.0) | **PASS** | Display / Headings (H1/H2) |
| `--ark-ink-hi` on `--ark-bg-raised` | `#f0e7d8` on `#211a14` | **14.01:1** | AAA (≥7.0) | **PASS** | Headings on Raised Modules |
| `--ark-ink-hi` on `--ark-bg-plate` | `#f0e7d8` on `#282018` | **13.07:1** | AAA (≥7.0) | **PASS** | Headings on Diagram Plates |
| `--ark-ink` on `--ark-bg` | `#d9cdb9` on `#181310` | **11.75:1** | AAA (≥7.0) | **PASS** | Body Reading Prose |
| `--ark-ink` on `--ark-bg-raised` | `#d9cdb9` on `#211a14` | **10.95:1** | AAA (≥7.0) | **PASS** | Body Prose on Raised Modules |
| `--ark-ink` on `--ark-bg-plate` | `#d9cdb9` on `#282018` | **10.22:1** | AAA (≥7.0) | **PASS** | Body Prose on Diagram Plates |
| `--ark-muted` on `--ark-bg` | `#a3957d` on `#181310` | **6.28:1** | AA (≥4.5) | **PASS** | Meta / Sigla / Captions / Units |
| `--ark-muted` on `--ark-bg-raised` | `#a3957d` on `#211a14` | **5.85:1** | AA (≥4.5) | **PASS** | Meta / Sigla on Raised Modules |
| `--ark-muted` on `--ark-bg-plate` | `#a3957d` on `#282018` | **5.46:1** | AA (≥4.5) | **PASS** | Meta / Sigla on Diagram Plates |
| `--ark-amber` on `--ark-bg` | `#ffb000` on `#181310` | **10.06:1** | AAA (≥7.0) | **PASS** | Phosphor Amber Reading Signal |
| `--ark-bg` on `--ark-ink-hi` | `#181310` on `#f0e7d8` | **15.03:1** | AAA (≥7.0) | **PASS** | Inverted Primary Action Surface |
| `--ark-ink-hi` on `--ark-signal-red` | `#f0e7d8` on `#BA3C0F` | **4.58:1** | AA (≥4.5) | **PASS** | Inverted Signal Red Key/Pill |
| `--ark-signal-red` on `--ark-bg` | `#BA3C0F` on `#181310` | **3.28:1** | UI (≥3.0) | **PASS** | Signal Red Boundary Line on Ground |
| `--ark-signal-red` on `--ark-bg-raised` | `#BA3C0F` on `#211a14` | **3.06:1** | UI (≥3.0) | **PASS** | Signal Red Boundary Line on Raised Module |

### 10.3 Machine Verification & Playwright Summary

| Verification Step | Command | Result | Evidence |
|---|---|---|---|
| Contrast Audit | `node scripts/design/contrast.mjs` | **0 errors (14/14 PASS)** | Table printed above |
| TypeScript Check | `npm run typecheck` | **0 errors (clean)** | Output log |
| Production Build | `npx next build` | **36/36 static pages (clean)** | Build output |
| Playwright Desktop (1440×900) | `node scripts/design/verify-specimen.mjs` | **0 console errors, 0 hydration warnings** | `docs/design/screens/synthesis-specimen-desktop.jpeg` |
| Playwright Mobile (390×844) | `node scripts/design/verify-specimen.mjs` | **0 console errors, 0 hydration warnings, touch ≥44px** | `docs/design/screens/synthesis-specimen-mobile.jpeg` |

