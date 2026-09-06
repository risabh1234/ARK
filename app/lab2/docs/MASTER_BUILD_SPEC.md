# ĀRK Master Platform & Build Specification (The Unified Spec)

*The Definitive Engineering, Architectural, and UI Specification for `arkfuturism.com`. Consolidated and ratified 2026-09-06. Consolidated master document superseding all prior build specs. Synthesizes all ratified Architect Rulings and convergence blueprints from [`RECONCILE.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/RECONCILE.md) into a single, comprehensive construction document.*

---

## 0. Scope, Governance & Architectural Sovereignty — RECONCILE.md Issue 6.1

- **Dedicated Standalone Web Property:** ĀRK operates as an independent, standalone web destination deployed at **`arkfuturism.com`** (dedicated codebase and deployment pipeline), served directly from the domain root.
- **Visual & Conceptual Register:** ĀRK possesses its own distinct aesthetic signature: *an interplanetary civilization + elite private library + futuristic research station + ancient Sanskrit manuscript archive*. It does NOT reuse the parent corporate theme wholesale.
- **Core Public Route Footprint (Launch Architecture):** Focuses engineering exclusively on high-performance frontend architecture across four primary public surfaces:
  1. `/` — Monumental Landing Page (The Unified 7-Beat Narrative Sequence)
  2. `/gallery` — Visual Wallpaper Archive & Plate Contemplation
  3. `/research` — Research Press, Whitepapers & Published Briefs
  4. `/studio` — Bespoke Strategic Research Commissions
  *Monolithic administrative suites (`/control`, `/account`, database auth sessions) are excluded from the initial platform launch.*
- **Cross-Brand Navigation Rule:** Any link crossing from `arkfuturism.com` to Aroha Omnis Corp's technical environment (`arohaomniscorp.com`), or vice versa, opens in a new tab (`target="_blank"`, with `rel="noopener"`). Navigation *within* `arkfuturism.com` stays in the same tab.

---

## 1. Site Information Architecture & Route Map

```
arkfuturism.com (Standalone Domain Root)
├── /                                Monumental Landing Page (The Unified 7-Beat Progression)
├── /gallery                         Visual Wallpaper Archive & High-Resolution Plate Viewer
│   └── /gallery/[slug]              Individual Plate Detail & 4K/8K Download Gate
├── /research                        Research Press & Brief Catalogue
│   └── /research/[slug]             Analytical Monograph Reader (e.g. Brief 001: The Architecture of Desire)
├── /studio                          Bespoke Research Commissions, Live Capacity Counter & Booking
└── /subscribe                       Direct Email Subscription & Cultural Outposts
```

---

## 2. Master CSS Token Sheet & Foundation (`:root`)

Build strictly to these CSS custom properties. No arbitrary hex values, ad-hoc font families, or unratified border radii may be introduced.

```css
:root {
  /* ==========================================================================
     CANONICAL PLATE GROUND PALETTE (Sampled from /app/lab2/images ARK IMG 1–5)
     ========================================================================== */
  --ark-ground: #050917;              /* Base canvas: deep cold indigo night sky */
  --ark-ground-deep: #03060F;         /* Cosmic abyss: lowest elevation container */
  --ark-surface: #0D1730;             /* Elevated module surface: card backdrops */
  --ark-surface-raised: #131E3D;      /* Hover states and raised interactive plates */
  --ark-line: #22305A;                /* Structural hairlines, 1px module borders */
  --ark-line-soft: #182642;           /* Subtle internal section rules and dividers */

  /* ==========================================================================
     ACCENT & WARMTH HIERARCHY (Ratio capped at ~4% viewport surface)
     ========================================================================== */
  --ark-amber: #F0B657;               /* Primary Legible Accent: 7:1 AAA on #050917 */
  --ark-amber-hover: #F8C87A;         /* Interactive hover state */
  --ark-ember-glow: #CE8236;          /* Ambient warmth only: gradients, edge lighting */
  --ark-ember-glow-deep: #8A5227;     /* Deep radial glow backdrop */
  --ark-signal-red: #BA3C0F;          /* Unmapped ground, UNSURVEYED voids, alerts */

  /* ==========================================================================
     READABILITY & TYPOGRAPHY INK
     ========================================================================== */
  --ark-ink-bright: #EFF2FA;          /* Headings, high-contrast reading (>13.5:1 AAA) */
  --ark-ink-base: #C8D1E6;            /* Primary body prose and card descriptions */
  --ark-ink-muted: #8F9BB7;           /* Metadata, telemetry, labels (>5.2:1 AA) */
  --ark-ink-faint: #536285;           /* Inactive borders, placeholder text */

  /* ==========================================================================
     "THE CIVILIZATIONAL SYNTHESIS" TYPOGRAPHY STACK
     ========================================================================== */
  --ark-font-display: 'Syne', sans-serif;
  --ark-font-sub-display: 'Rajdhani', sans-serif;
  --ark-font-heading: 'Space Grotesk', sans-serif;
  --ark-font-ui: 'Inter Variable', -apple-system, sans-serif;
  --ark-font-prose: 'Source Serif 4', Georgia, serif;
  --ark-font-marginalia: 'Space Mono', monospace;
  --ark-font-code: 'IBM Plex Mono', monospace;
  --ark-font-deva: 'Noto Serif Devanagari', serif;

  /* ==========================================================================
     GEOMETRY & BORDER-RADIUS DISCIPLINE (RECONCILE.md Issue 2.6)
     ========================================================================== */
  --ark-radius-structural: 0px;       /* All cards, frames, columns, viewports, buttons */
  --ark-radius-pill: 9999px;          /* Dedicated exclusively to metadata/filter tags */

  /* ==========================================================================
     HYBRID MOTION & EASING ARCHITECTURE (RECONCILE.md Issue 2.8)
     ========================================================================== */
  --ark-ease-atmos: cubic-bezier(0.16, 1, 0.3, 1); /* Continuous slow atmospheric reveals (400–800ms) */
  --ark-ease-ui: cubic-bezier(0.2, 0, 0, 1);       /* Rapid continuous UI feedback (<150ms) */
  --ark-ease-step: steps(6, end);                  /* Stepped mechanical data readouts */
  --ark-ease-step-fine: steps(9, end);
}
```

### Web Fonts Import
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Serif+Devanagari:wght@400;600&family=Rajdhani:wght@600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap" rel="stylesheet">
```

---

## 3. Canonical Asset Allocation (`/app/lab2/images`)

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                 CANONICAL ASSET MAPPING                                │
├─────────────────┬──────────────────────────────┬───────────────────────────────────────┤
│ Image File      │ Page Surface / Beat          │ Symbolic Role & Philosophical Anchor  │
├─────────────────┼──────────────────────────────┼───────────────────────────────────────┤
│ ARK IMG 1.PNG   │ Beat 1: Hero Section         │ Fixed Flagship Anchor: The Portal &   │
│                 │ (Permanent Anchor Plate)     │ Stone Observatory looking into Cosmos │
├─────────────────┼──────────────────────────────┼───────────────────────────────────────┤
│ ARK IMG 2.PNG   │ Beat 3: Visual Archive       │ Plate 01: Coastal Night & Mandala Sea │
│                 │ Card 1                       │ (Śikṣāṣṭaka 1 — ceto-darpana)         │
├─────────────────┼──────────────────────────────┼───────────────────────────────────────┤
│ ARK IMG 3.PNG   │ Beat 3: Visual Archive       │ Plate 02: Mountain Citadel & Comet    │
│                 │ Card 2 & Press Backdrop      │ (Kaṭha Upaniṣad 1.3.14 — uttiṣṭhata)  │
├─────────────────┼──────────────────────────────┼───────────────────────────────────────┤
│ ARK IMG 4.PNG   │ Beat 3: Visual Archive       │ Plate 03: Desert Highway & Megalith   │
│                 │ Card 3 & Studio Backdrop     │ (Bhagavad-gītā 9.22 — ananyāś)        │
├─────────────────┼──────────────────────────────┼───────────────────────────────────────┤
│ ARK IMG 5.PNG   │ Beat 3: Visual Archive       │ Plate 04: Jantar Mantar Instruments   │
│                 │ Card 4 & Epistemology Card   │ (Bhagavad-gītā 2.13 — dehino 'smin)   │
└─────────────────┴──────────────────────────────┴───────────────────────────────────────┘
```

---

## 4. Global Navigation Header Component

* **Container:** Height `60px`, full width, sticky (`top: 0; z-index: 100`). Background `--ark-ground: #050917`, 1px bottom border `--ark-line: #22305A`.
* **Brand Lockup (Left):**
  - Bespoke SVG Wordmark: `"ĀRK"` (rounded-voxel glyphs with macron, height `22px`, fill `--ark-ink-bright`).
  - Architectural Sub-Wordmark: `"VEDIC FUTURISM"` set in Rajdhani, Bold 700, All-Caps, tracking `0.18em`, font-size `12px`, color `--ark-amber: #F0B657`, margin-left `12px`.
* **Navigation Links (Center):**
  - Items: `Visual Archive` (`#gallery`), `Research Press` (`#research`), `Epistemology` (`#epistemology`), `Studio Desk` (`#studio`).
  - Typography: Inter Variable, Medium 500, font-size `13px`, color `--ark-ink-muted`, hover color `--ark-ink-bright`.
* **Primary Header CTA (Right):**
  - Label: `"EXPLORE BRIEFS"` (Inter Variable, SemiBold 600, 12px uppercase, border: `1px solid var(--ark-amber)`, radius: 0).

---

## 5. The Unified 7-Beat Landing Page Construction Blueprint

```
=========================================================================================
BEAT 1: MONUMENTAL HERO (Awe, Ambition & Personal Capability)
=========================================================================================
```
* **Target Audience:** Archetype D (The Ambitious Builder) + Visual Seekers.
* **Governing Rule:** Fixed Flagship Anchor plate (`ARK IMG 1.PNG`) provides permanent visual stability. Zero daily randomization.
* **Telemetry Marginalia (Top of Hero Frame):**
  - Space Mono, 11px, uppercase: `SYS.ID: ARK-OBSERVATORY-01 // EPOCH: 2026.09 // ELEV: 2400M // GRID: 28.5983°N 77.2090°E`
* **Visual Frame (Left / Upper):**
  - Houses `ARK IMG 1.PNG`. Ambient radial gradient `--ark-ember-glow` (opacity `0.15`) at the threshold.
* **Textual Instrument Desk (Right / Lower):**
  - **Monumental H1:** Syne ExtraBold 800, line-height 1.1, size `44px` (desktop: `56px`), color `--ark-ink-bright`:
    *"Research and intelligence instruments for people who would rather understand something completely than believe it quickly."*
  - **Provocation Dek:** Source Serif 4, 18px, line-height 1.6, color `--ark-ink-base`:
    *"Modern institutions hand you broken maps—separating science from consciousness, and ambition from meaning. ĀRK constructs the single architecture in which extraordinary human capability and spiritual depth coexist."*
  - **CTAs:** Primary button `"ENTER ARCHIVE"` (Amber fill, zero radius) + Secondary button `"READ RESEARCH PRESS"` (Slate line border) + Provenance note in Space Mono (`[ 5 MASTER PLATES // 1 MONOGRAPH AVAILABLE // 3 STUDIO SLOTS ]`).

```
=========================================================================================
BEAT 2: PLATFORM ARCHITECTURE (The Three Unified Verticals)
=========================================================================================
```
* **Section Heading:** Space Grotesk, SemiBold 600, size `28px`: *"Three Disciplines. One Civilizational Architecture."*
* **3-Column Structural Grid (Zero Border-Radius):**
  1. **Vertical 1: The Research Press & Studio** (`DEPT.01 // APPLIED INQUIRY`): Bespoke cultural-philosophical research commissions and published 48-page analytical monographs.
  2. **Vertical 2: Visual Archive & Media** (`DEPT.02 // VISUAL CANON`): Illuminated cartographic contemplation plates and high-resolution master wallpaper releases.
  3. **Vertical 3: Civilization Platform & Knowledge Engine** (`DEPT.03 // EPISTEMIC ROOT`): The underlying 4-layer epistemology classifier, progressive reasoning models, and personal intellectual development trajectories.

```
=========================================================================================
BEAT 3: VISUAL GALLERY ARCHIVE (Illuminated Contemplation Plates)
=========================================================================================
```
* **Target Audience:** Archetype E (Visual Art Seekers) & Contemplative Patrons.
* **Section Header:** Space Grotesk, 28px: *"The Visual Archive: Contemplation Plates"*
* **Interactive Taxonomy Filter Bar:** Pill-shaped geometry (`border-radius: 9999px`) exclusively for filter chips: `[ ALL ]`, `[ ŚABDA / TESTIMONY ]`, `[ ANUMĀNA / INFERENCE ]`, `[ JĪVA / CONSCIOUSNESS ]`, `[ PRAKṚTI / MATTER ]`.
* **Plate Exhibition Grid (2×2 Responsive Grid):**
  - Structural cards, border `1px solid var(--ark-line)`, background `--ark-surface: #0D1730`, zero radius.
  - Scoped 8×8 Bayer dithering loading reveal.
  - Metadata: Plate numeral (`PL.01`–`PL.04`), system URN (`urn:arka:plate:001`), access badge (`FREE PREVIEW` / `4K MASTER`).
  - Action: `"Inspect Plate & 4K Download Gate →"`.

```
=========================================================================================
BEAT 4: THE RESEARCH PRESS (Monographs & Evidence Strata)
=========================================================================================
```
* **Target Audience:** Archetype B (The Serious Reader) & Scholars.
* **Section Header:** Space Grotesk, 28px: *"The Research Press: Rigour Without Reductionism"*
* **Flagship Monograph Showcase: Brief 001:**
  - Container: Asymmetric 2-column broadsheet container, zero radius, border `--ark-line`.
  - Title: `The Architecture of Desire` (Syne, Bold 700, 32px).
  - Dek: *"Why getting everything you wanted left you flat—and the four-part classical model of human aims that explains it."*
  - Hard Evidence Metrics: `[ 48 PAGES TYPESET ]` · `[ 63 PRIMARY SOURCES ]` · `[ 3 UNRESOLVED QUESTIONS ]`.
  - Pricing: `₹1,299 / $19` — Instant Digital Pass & PDF Dossier.
  - Four Strata Tabbed Preview: Stratum I (Source) $\rightarrow$ Stratum II (Evidence) $\rightarrow$ Stratum III (Interpretation) $\rightarrow$ Stratum IV (Unresolved Questions).

```
=========================================================================================
BEAT 5: EPISTEMOLOGY ENGINE SHOWCASE (Methodology & Resolver Bridge)
=========================================================================================
```
* **Target Audience:** Archetype C (The Cold Skeptic) & Epistemic Inquirers.
* **Section Header:** Space Grotesk, 28px: *"The Epistemology Engine: A 4-Layer Taxonomy"*
* **Interactive Onboarding Module (Accessible Dual-Labeling):**
  - *Layer 1: Pramāṇa (Epistemic Source):* "How do we verify this truth?" (Perception / Inference / Testimony).
  - *Layer 2: Topic (Domain of Reality):* "What layer of existence is explored?" (The 5 Tattvas).
  - *Layer 3: Darśana (Philosophical Lens):* "Which analytical system speaks?" (Nyāya / Sāṅkhya / Vedānta).
  - *Layer 4: Puruṣārtha (Human Telos):* "What human purpose does it serve?" (Ethics / Capability / Fulfillment / Transcendence).
* **Dialectical Contradiction Protocol Sample:** Shows provisional scientific observation (`current-anumāna`) beside the classical anchor with darśana gap analysis.
* **External Bridge Action:** Button `"OPEN LIVE CITATION RESOLVER (arohaomniscorp.com) ↗"` (`target="_blank"`).

```
=========================================================================================
BEAT 6: STUDIO COMMISSIONS DESK (Bespoke Research Services)
=========================================================================================
```
* **Target Audience:** Archetype A (The Commissioning Professional).
* **Section Header:** Space Grotesk, 28px: *"The Studio: Bespoke Research Desk"*
* **Operational Scarcity Indicator:** `● OPERATIONAL CAPACITY: 1 OF 3 COMMISSIONS AVAILABLE THIS MONTH`.
* **Three Published Tiers:**
  1. *Sprint Desk (₹25,000 / 5 days):* Specific inquiry, Research Memo + Annotated Source Ledger + Terminology Sheet.
  2. *Dossier Desk (₹75,000 / 3 weeks):* 40-page Dossier + Counterargument File + Timeline + Debrief Call.
  3. *Retainer Desk (₹1,50,000 / month):* Dedicated embedded desk for productions.
* **4-Field Commission Form:** Name, Organization, Inquiry Scope, Timeline. Button: `"SUBMIT COMMISSION INQUIRY"`.

```
=========================================================================================
BEAT 7: DIGNIFIED CONVERSION & CULTURAL OUTPOSTS
=========================================================================================
```
* **Target Audience:** All visitors seeking sustained intellectual engagement.
* **Clean Single-Input Subscription:** Single email field (zero gamification, zero waitlist numbers).
* **Post-Submission:** Single-click un-gamified peer endorsement: `"Circulate this inquiry with a colleague: [ Copy Link ]"`.
* **Persistent Footer:** Official outposts (Substack, LinkedIn, X, Instagram). Zero physical merchandise or dropshipping.

---

## 6. Commercial Engine & Monetization Architecture — RECONCILE.md Issue 4.1

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                          THE INTEGRATED 3-TIER COMMERCIAL FUNNEL                       │
├──────────────────────────────┬──────────────────────────────┬──────────────────────────┤
│ Tier 1: Studio Commissions   │ Tier 2: Research Press       │ Tier 3: Visual Archive   │
├──────────────────────────────┼──────────────────────────────┼──────────────────────────┤
│ Bespoke Executive Research   │ Published Analytical Briefs  │ Master Wallpaper Drops   │
│ Sprint: ₹25,000              │ Brief 001: ₹1,299 / $19      │ Free Web Contemplation   │
│ Dossier: ₹75,000             │ 48 pages · 63 sources        │ 4K/8K Downloads via      │
│ Retainer: ₹1,50,000 / month  │ Self-serve volume engine     │ Substack Membership      │
│ Scarcity: 3 slots / month    │ Unresolved list pre-purchase │ High-volume cultural reach│
└──────────────────────────────┴──────────────────────────────┴──────────────────────────┘
```

---

## 7. Phased Implementation Roadmap

- **Phase 1 (Immediate Launch / MVP):**
  - Standalone deployment at `arkfuturism.com`.
  - The Unified 7-Beat Landing Page (`/`).
  - Visual Wallpaper Archive (`/gallery`) with 4-layer taxonomy filter chips.
  - Research Press Showcase (`/research`) featuring Brief 001.
  - Studio Commissions Desk (`/studio`) with live slot capacity counter.
  - Interactive Epistemology Showcase on `/` with external bridge to `arohaomniscorp.com`.
  - External Substack community integration (Substack Chat / comments).
- **Phase 2 (Growth Roadmap):**
  - Native on-site articles and long-form reader essays (`/articles`).
  - Authenticated user accounts and threaded discussion infrastructure.
  - Direct on-site digital checkout for research briefs.
- **Phase 3 (Scale & Expansion):**
  - Full-stack native Epistemology Engine migration (reasoning algorithms and citation databases running natively on `arkfuturism.com`).
  - AI reasoning assistant and interactive knowledge graph tools.

---

## 8. Security, Metadata & Asset Standards

- **Open Access Browsing:** Browsing the landing page, gallery previews, and research summaries requires zero login or authentication.
- **Diacritics Integrity:** Ensure all web fonts render standard Sanskrit IAST transliteration (`ā, ī, ū, ṛ, ṃ, ḥ, ś, ṣ, ṭ, ḍ`) without fallback-square glyphs.
- **OG Metadata Assets (`/public/og/`):**
  - `main.jpg` — `/` (Landing) and `/subscribe`
  - `gallery.jpg` — `/gallery`
  - `research.jpg` — `/research`
  - `studio.jpg` — `/studio`

---

## 9. Constitutional Compliance Checklist (Pre-Deployment Audit)

- [ ] **Law L1 (Legend Precedes Terrain):** All visual data encodings have an adjacent visible key.
- [ ] **Law L2 (Every Claim Carries Coordinates):** Every assertion carries Space Mono provenance furniture or an explicit `UNRESOLVED` marker.
- [ ] **Law L3 (Unmapped Ground Stays Drawn):** Uncertainty is explicitly marked as bounded space (`UNSURVEYED` voids).
- [ ] **Law L4 (Marginalia Is Load-Bearing):** Provenance and telemetry furniture are set in Space Mono (`--ark-font-marginalia`).
- [ ] **Law L5 (Scale Is Honest):** Typographic weight tracks evidential weight.
- [ ] **Law L6 (Depth Reveals the Cartographer):** Landing page chrome and controls are in clear English (*"Could a curious atheist read this and nod?"*); the philosophical framework appears progressively and is explicitly labelled at depth.
- [ ] **Anti-List #3 (Geometry):** Strict `border-radius: 0` on structural containers and buttons; pill geometry (`9999px`) reserved exclusively for metadata tags.
- [ ] **Anti-List #7 (Devotional Demarcation):** Zero devotional symbols (Om, mandalas, tilaks, temples) in UI chrome, navigation, or buttons. Authentic motifs permitted only in fine art plates.
- [ ] **Anti-List #8 (Language):** Zero untransliterated Sanskrit in landing page navigation or primary buttons. Architectural sub-wordmark `"ĀRK — VEDIC FUTURISM"` in Rajdhani is authorized.
- [ ] **Anti-List #9 (Zero Dark Patterns):** Zero fake scarcity counters, zero countdown timers, zero gamified referral waitlist queues.
- [ ] **Anti-List #14 (Zero Sci-Fi Cosplay):** Zero neon HUD pastiche, radar crosshairs, or spacecraft cockpit chrome. Scale is expressed through architectural grids, real telemetry coordinates, and monumental horizons.
- [ ] **Typography Audit:** Zero occurrences of Orbitron, Pixelify Sans, or Cosmic-octo. Full compliance with "The Civilizational Synthesis" 8-role stack.
- [ ] **Texture Audit:** Body canvas is clean and grain-free (`eslint-rules/no-atmosphere.js` clean); Bayer dithering restricted strictly to artwork frames.
