# ĀRK — Hero Section Experiment Plan ("Extraordinary Capability at Dawn")

**Document Path**: `docs/design/EXPERIMENT_HERO_PLAN.md`  
**Target Route**: `/lab/experiment-hero`  
**Reference Asset**: [`app/lab/Extraordinary Capability at Dawn.png`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/Extraordinary%20Capability%20at%20Dawn.png)  
**Status**: APPROVED SPECIFICATION — READY FOR IMPLEMENTATION  
**Governing Documents**:
- [`ARK_Vision_Document.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/ARK_Vision_Document.md) (Ambition & Humility Dual Engines, Horizon Scale)
- [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) (Laws L1–L6, Anti-List 1–14, 8 Psychological Mechanisms)
- [`ark epistemology spec.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/ark%20epistemology%20spec.md) (Tier 1 Domain Entry, Pramāṇa Provenance)
- [`AUDIENCES.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/AUDIENCES.md) (Rigour for Pros, 5-Second Test for Skeptics, Trajectory for Builders)
- [`SYNTHESIS_SPEC.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/SYNTHESIS_SPEC.md) & [`FINAL_LANDING_PAGE_SYNTHESIS.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/FINAL_LANDING_PAGE_SYNTHESIS.md)
- [`app/lab/synthesis/synthesis.css`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/synthesis/synthesis.css) & [`app/lab/synthesis/synthesis-layout.css`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/synthesis/synthesis-layout.css)

---

## 1. Executive Summary & Architectural Thesis

The objective of this experiment is to achieve a **100% visual, typographic, and atmospheric replication** of the masterwork hero artwork (`Extraordinary Capability at Dawn.png`) while strictly anchoring every token, margin rule, and interaction model in the **ratified ĀRK Design System & Constitution**:

$$\text{Visual Magnificence (Artwork)} + \text{Instrumental Rigour (Design System)} = \text{ĀRK Hero Stage}$$

### The Core Synthesis
1. **Atmosphere of Ignition & Depth**: A solitary seeker on a high mountain ridge at sunrise, looking out over luminous golden valley networks into an infinite cosmos mapped by precision astrolabe coordinate rings.
2. **Drawing-Office Plate Framing (`FIG. 0`)**: Escapes Anti-List #12 (*"Never a panorama without a key"*) by framing the stage as a bounded scientific plate with coordinate ticks, corner registration marks (`+`), and an authentic NASA-GSM title block (`FIG. 0 · THE HORIZON SCALE · INDIVIDUAL → COSMIC · REV 2026.08`).
3. **Epistemic Provenance**: The bottom-left citation badge (`RESEARCHED. SOURCED. CITED.`, `63 PRIMARY SOURCES`, `100% TRACEABLE`, 20 amber tally bars) grounds the vastness of the headline in concrete scholarship before asking for belief (Laws L2, L5).
4. **Dual Psychological Engine**: Co-emits the Azimuth ambition motto (*"Do not make yourself smaller than you are capable of becoming"*) and Zenith humility motto (*"I am not the center of existence"*).
5. **Zero-Radius & Tektronix Glow Discipline**: Preserves `border-radius: 0 !important` globally and restricts luminous glow strictly to active data beads and sunrise focal points.

---

## 2. Governing Constitutional & Philosophical Laws

### 2.1 Ratified Laws (L1–L6) Enforced
* **L1 (Legend Precedes Terrain)**: All coordinate rings, astrolabe degrees, and strata dots arrive with explicit labels and hover keys.
* **L2 (Every Claim Carries Coordinates)**: Headline assertions are directly linked to the `63 PRIMARY SOURCES · 100% TRACEABLE` provenance block and sheet coordinate markers (`LAT 28°36'N · LON 77°12'E`).
* **L3 (Unmapped Ground Drawn)**: The outer astrolabe boundary dissolves into bounded starlit space, marking the cosmic horizon.
* **L4 (Marginalia Load-Bearing)**: All metadata, coordinates, mottos, and ladder tiers are set in `Space Mono` (`--ark-font-mono`), maintaining strict separation from editorial prose.
* **L5 (Scale is Honest)**: The number `63` in the citation card is the heaviest numeral on screen, proving that visual weight tracks evidential weight.
* **L6 (Depth Reveals Cartographer)**: The surface maintains Tier 1 domain language. To respect the Curious Atheist Test (CAT), the lab route provides an interactive switch between **Artwork Canonical Copy** and **Ratified CAT Synthesis Copy**.

### 2.2 Anti-List Compliance Matrix
* **#1 (No Cream/Terracotta Triad)**: Escaped via warm near-black instrument ground (`#181310`) and phosphor amber (`#ffb000`).
* **#2 (No Acid/Neon Glow)**: Escaped via Tektronix Glow Law (glow is physically emitted only by the sunrise/bead signal).
* **#4 (No SaaS Gradients/Glass/Bento)**: Flat matte panels, precision SVG vector lines, and crisp drawing-office borders.
* **#7 & #8 (No Devotional Branding in Chrome / No Sanskrit in H1)**: Surface language is purely epistemic and philosophical.
* **#10 (No Competing CTAs)**: Exactly one primary CTA button (`ENTER THE ATLAS →`).
* **#12 (No Panorama Without a Key)**: The visual is rendered inside a bounded, titled, coordinate-marked plate.
* **#13 (No Motivational Hustle Slogans)**: Ambition is framed as rigorous inner mastery, counterbalanced by humility.
* **#14 (No Sci-Fi Cosplay / Neon HUD)**: Astrolabe geometry is rendered as fine cartographic hairlines (0.75px–1px).

---

## 3. Visual & Spatial Layout Architecture

```
+─────────────────────────────────────────────────────────────────────────────────────────────────────────────+
│ TOP BAR: [ĀRK WORDMARK]                           [INSTRUMENT · ACTIVE ●]             [ENTER THE ATLAS →]   │
├─────────────────────────────────────────────────────────────────────────────────────────────────────────────┤
│ FIG. 0 · THE HORIZON SCALE · INDIVIDUAL → COSMIC                                      REV 2026.08 · SHEET 1 │
│ +                                                                                                         + │
│                                         [ZENITH MOTTO: 90°N]                                                │
│                                    "I AM NOT THE CENTER OF EXISTENCE."                                      │
│                                                                                                             │
│ [LEFT HERO APPARATUS (5/12)]            [CENTER CELESTIAL STAGE (7/12)]       [RIGHT STRATA LADDER]         │
│                                                                                                             │
│ Extraordinary                                       .  :  *  :  .             • H · 03                      │
│ Capability.                          [AZIMUTH MOTTO: 180°W]     /  |  \         COSMIC CIVILIZATION         │
│ Rooted in                           "DO NOT MAKE YOURSELF     (  Arc 3 )                                    │
│ Consciousness.                       SMALLER THAN YOU ARE      \   |  /       • H · 02                      │
│                                      CAPABLE OF BECOMING."       \|/            PLANETARY HORIZON           │
│ A knowledge platform uniting                                  ==( SUN )==                                   │
│ science and philosophy, ambition                             /     |     \    • H · 01                      │
│ and meaning, evidence and                                   /      |      \     CIVILIZATIONAL SCALE        │
│ interpretation...                           [SEEKER]       /       |       \                                │
│                                           (Summit Peak)   /        |        \ • YOU                         │
│ [ ENTER THE ATLAS  → ]                      /\      /\   [ Winding Filaments ]  INDIVIDUAL MASTERY          │
│                                            /  \____/  \  [ Valley Roads      ]                              │
│ +─────────────────────────────────────+   /            \                                                    │
│ │ RESEARCHED. SOURCED. CITED.         │  /  Summit Ridge\                                                   │
│ │ 63             |||||||||||||||||||| │ /                \                                                  │
│ │ PRIMARY SOURCES      100% TRACEABLE │/                  \                                                 │
│ +─────────────────────────────────────+                                                                     │
│ +                                                                                                         + │
│ SCALE: 1:1 · COORDINATES: 28°36'N, 77°12'E · AZIMUTH: 090°                          END OF PLATE 0 · ĀRK   │
+─────────────────────────────────────────────────────────────────────────────────────────────────────────────+
```

---

## 4. Design System Tokens & Typography Bindings

### 4.1 Color Tokens (`synthesis.css` Certified)
```css
[data-dir="experiment-hero"],
.ark-experiment-hero {
  /* Ground & Cavities */
  --ark-bg: #181310;             /* Warm near-black base ground (never cold #000) */
  --ark-bg-raised: #211a14;      /* Raised instrument cards, citation box background */
  --ark-bg-plate: #282018;       /* Embedded diagram plate frames */
  --ark-bg-deep: #110d0b;        /* Deep cosmic night sky cavity */

  /* Ink Hierarchy (WCAG AAA Certified) */
  --ark-ink-hi: #f0e7d8;         /* Headline, CTA surface, focal points (15.03:1) */
  --ark-ink: #d9cdb9;            /* Subtitle body prose (11.75:1) */
  --ark-muted: #a3957d;          /* Marginalia, coordinates, mottos, ladder labels (6.28:1) */
  --ark-faint: #5e5445;          /* Astrolabe degree ticks, inactive rings, grid hairlines */

  /* Signals & Dawn Radiance (Tektronix Rule) */
  --ark-amber: #ffb000;          /* Phosphor sunrise focal point, tally ticks, active beads (10.06:1) */
  --ark-amber-glow: rgba(255, 176, 0, 0.45);
  --ark-signal-red: #BA3C0F;     /* Action marks & boundary indicators */

  /* Structural Hairlines */
  --ark-rule: rgba(240, 231, 216, 0.15);
  --ark-rule-strong: rgba(240, 231, 216, 0.34);
  --ark-rule-faint: rgba(240, 231, 216, 0.08);

  /* Typography Stacks */
  --ark-font-display: var(--font-inter), system-ui, sans-serif;
  --ark-font-display-serif: var(--font-serif), 'Source Serif 4', Georgia, serif;
  --ark-font-body: var(--font-inter), system-ui, sans-serif;
  --ark-font-mono: var(--font-mono), 'Space Mono', monospace;
}
```

### 4.2 Typography Hierarchy & The Headline Specification
* **H1 Headline Option Toggle**:
  - **Mode A (Artwork Editorial Serif)**: `Source Serif 4 Display` (Weight 600/700, optical size 72pt, `letter-spacing: -0.015em`). Replicates the high-contrast luxury curves of the original PNG artwork.
  - **Mode B (Synthesis Precision Sans)**: `Inter Variable` (Weight 600, `letter-spacing: -0.025em`). Matches the ratified landing page display stack.
* **Marginalia & Data Furniture**: Set exclusively in `Space Mono` (Uppercase, tabular figures, `letter-spacing: 0.08em–0.12em`).
* **Verified Glyph Coverage**: Full native support for IAST Sanskrit transliterations (`Ā, ā, Ī, ī, Ṃ, ṃ, Ṛ, ṛ`) and currency (`₹`).

---

## 5. 4-Layer Rendering Pipeline & Component Architecture

### 5.1 Component File Hierarchy
```
app/lab/experiment-hero/
├── page.tsx                             # Master page with typography fonts & layout scaffold
├── hero-experiment.css                  # Scoped layout grid, tokens, animations, and media queries
└── _components/
    ├── HeroExperimentStage.tsx          # Master composition container with plate title furniture
    ├── CelestialAstrolabe.tsx           # Multi-ring SVG polar coordinate reticle & interactive arcs
    ├── ParticleSkyCanvas.tsx            # 60fps HTML5 Canvas with drifting golden dust motes & twinkling stars
    ├── TerrainRidges.tsx                # Layered SVG vector terrain (summit peak, valley, light filaments)
    ├── InstrumentCitationCard.tsx       # Bounded citation card with 20-bar tally & provenance modal
    ├── HorizonStrataLadder.tsx          # Right-hand vertical ladder (YOU → H·03) linked to SVG rings
    └── ExperimentControls.tsx           # Interactive review toolbar (Serif vs Sans, CAT vs Artwork copy)
```

### 5.2 Layer Pipeline (Back to Front)
```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ LAYER 4 (Top): Interactive Typography & UI Overlay                                     │
│ • H1 Headline + Subtitle prose                                                         │
│ • Primary CTA Button [ENTER THE ATLAS →]                                               │
│ • Bounded Citation Badge (63 Primary Sources, Tally Bar)                               │
│ • Zenith ("90°N") & Azimuth ("180°W") Motto Cards                                      │
│ • Right-hand Horizon Strata Ladder (YOU → H·01 → H·02 → H·03)                          │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: Dynamic Celestial Astrolabe & Polar Coordinates (SVG)                         │
│ • Concentric degree circles (0° to 360°) centered on sunrise                           │
│ • Radial azimuth lines & coordinate crosshairs                                         │
│ • Interactive hover state linking Horizon Strata Ladder to respective ring             │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: Ambient Particle Sky & Dawn Lighting (HTML5 Canvas + CSS)                      │
│ • 60fps lightweight physics engine for upward-drifting golden dust motes               │
│ • Micro-twinkling background stars in deep night sky                                   │
│ • Radial dawn gradient glow (warm golden radiance behind ridge)                        │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ LAYER 1 (Base): Silhouetted Terrain & Valley Light Filaments (SVG)                     │
│ • Foreground summit rocky peak with standing Seeker silhouette                         │
│ • Midground mountain ridges with atmospheric haze                                     │
│ • Golden glowing light filaments / winding road network across valley floor            │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 6. Subtle Motion Contract & Keyframes

All animations are governed by the **Stillness-First Contract** and collapse instantly under `prefers-reduced-motion: reduce`:

| Motion Element | Mechanism | Timing / Duration | Purpose & Effect |
| :--- | :--- | :--- | :--- |
| **Astrolabe Ring Drift** | CSS `transform: rotate(360deg)` | 180s linear infinite | Hypnotic, nearly imperceptible orbital drift of outer coordinate ring. |
| **Dawn Horizon Pulse** | CSS `opacity: 0.85 ↔ 1.0` | 8s ease-in-out infinite | Gentle breathing sensation of sunrise radiance. |
| **Valley Light Shimmer** | CSS `opacity: 0.7 ↔ 1.0` | 6s ease-in-out infinite | Subtle glint of human civilization in the valley below. |
| **Sky Dust Motes** | HTML5 Canvas `requestAnimationFrame` | 60fps physics | 35 floating particles with random drift and golden sheen. |
| **Citation Counter Draw** | Viewport Entry (`IntersectionObserver`) | 1.4s ease-out | Numerals count 0 $\to$ 63; tally ticks fill sequentially. |
| **Ladder Hover Sync** | SVG `stroke-opacity` + phosphor glow | 200ms ease-out | Hovering `H·02` highlights the matching concentric SVG ring. |
| **Reduced Motion Fallback** | `@media (prefers-reduced-motion)` | 0.01ms | All motion disabled; static vectors pre-drawn; zero box-shadows. |

---

## 7. Responsive Layout Breakdown

* **Ultra-Wide & Desktop ($\ge 1200\text{px}$)**:
  - Full 3-column instrument layout: Left Apparatus Stack (5/12) + Center Celestial Stage (5/12) + Right Strata Ladder (2/12).
  - Both Zenith (90°N) and Azimuth (180°W) motto cards float at exact coordinate positions.
* **Laptop ($1024\text{px} - 1199\text{px}$)**:
  - Proportional grid scaling, compacting horizontal margins while keeping all coordinate reticles aligned to the sunrise.
* **Tablet ($768\text{px} - 1023\text{px}$)**:
  - 2-column layout: Left text stack & citation card; Right stage with integrated strata ladder docked along the right edge.
* **Mobile ($< 768\text{px}$)**:
  - Single-column linear vertical stack:
    1. Plate Header & Coordinate Title Block.
    2. Celestial Stage (Seeker silhouette, sunrise, astrolabe rings).
    3. Zenith & Azimuth Mottos rendered as structured captions directly below the stage.
    4. H1 Headline, Subtitle prose, and Primary CTA button.
    5. Provenance Citation Badge with full 20-bar tally.
    6. Horizontal or stacked Horizon Strata Ladder (`YOU` $\to$ `H·03`).

---

## 8. Verification & Playwright Testing Matrix

```typescript
// Test Suite: e2e/experiment-hero.spec.ts
describe('Hero Section Experiment ("Extraordinary Capability at Dawn")', () => {
  // 1. Visual & Layout Assertions
  test('renders FIG. 0 bounded plate with title block and coordinate furniture');
  test('renders H1 headline, subtext, and single primary CTA');
  test('renders 63 primary sources tally box with 20 tick marks');
  test('renders seeker silhouette on summit ridge with golden valley filaments');
  test('renders 4-tier horizon strata ladder (YOU to H-03)');

  // 2. Interactive Telemetry
  test('hovering strata ladder item highlights corresponding astrolabe ring');
  test('mode toggles switch between Serif/Sans and Artwork/CAT copy correctly');

  // 3. Contrast & Accessibility (WCAG AA/AAA)
  test('certifies text contrast >= 7.0:1 for headings and >= 4.5:1 for marginalia');
  test('verifies all interactive targets >= 48px min dimension');
  test('verifies zero border-radius on all components');

  // 4. Reduced Motion & Performance
  test('suppresses all rotations and canvas loops under prefers-reduced-motion');
  test('maintains stable 60fps without layout shifts (CLS = 0)');
});
```

---

## 9. Implementation & Approval Roadmap

1. **Step 1: Scaffolding & Tokens (`app/lab/experiment-hero/hero-experiment.css`)**:
   - Establish CSS tokens, zero-radius overrides, Tektronix glow utilities, and drawing-office plate rules.
2. **Step 2: Celestial Vector & Canvas Engine**:
   - Build `TerrainRidges.tsx`, `ParticleSkyCanvas.tsx`, and `CelestialAstrolabe.tsx`.
3. **Step 3: UI Machinery & Interactive Furniture**:
   - Build `InstrumentCitationCard.tsx`, `HorizonStrataLadder.tsx`, `HeroExperimentStage.tsx`, and `ExperimentControls.tsx`.
4. **Step 4: Page Assembly & Routing (`app/lab/experiment-hero/page.tsx`)**:
   - Integrate components with Next.js Google Fonts (`Inter`, `Space Mono`, `Source Serif 4`).
5. **Step 5: Automated & Visual Verification**:
   - Execute TypeScript check, production build, contrast audit, and Playwright multi-viewport captures for final review by Ojas.
