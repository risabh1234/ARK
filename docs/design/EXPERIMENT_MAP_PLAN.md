# Implementation Plan — Option B: High-Fidelity Interactive Astrolabe Four-Territory Map

## 1. Executive Summary & Architectural Vision

This plan details the end-to-end design, implementation, and automated verification of **Option B** for replicating the AI-generated *"Fig. 1 The Four Territories of Human Knowledge"* map with 100% visual fidelity, refined interactive animations, and deep epistemological data.

Per user directive, the entire implementation will be built and tested in an isolated experiment sandbox (**`app/lab/experiment`**) before touching the main synthesized landing page or production routes. It will be verified against a comprehensive Playwright automated test suite covering multi-viewport responsiveness, WCAG 2.2 AA accessibility, keyboard navigation, contrast ratios, and reduced motion.

---

## 2. Foundational Law & Constraint Adherence Matrix

Every detail of this design is governed by the repo's foundational documents:

| Document | Governing Law / Principle | Concrete Implementation in this Map |
|---|---|---|
| [`Landing Page Design Process.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/Landing%20Page%20Design%20Process.md) | Gate-enforced process; Ojas as sole taste authority; token-first; diacritic verification (`Ā ā Ī ī Ṃ ṃ Ṛ ṛ ₹`); wall rules for `/lab`. | Isolated under `app/lab/experiment/`; no cross-imports from production `components/`; diacritic specimen rendering tested. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **The Atlas of Broken Maps** philosophy: "Four terrains mapped by institutions that deny each other's borders." | 4 organic territory lobes with disputed border seams meeting at a central navigational astrolabe. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **L1 — Legend precedes the terrain.** | Visible quadrant index and symbology key in the same viewport. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **L2 — Every claim carries coordinates.** | Each territory displays quadrant coordinates (e.g. `NW · 28°N · Strata I–II`), failure modes, and primary source counts. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **L3 — Unmapped ground stays drawn.** | Disputed seams between quadrants rendered with dashed signal-red lines and declared unresolved boundaries. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **L4 — Marginalia is load-bearing.** | Technical drafting metadata set in monospace (`Space Mono`), distinctly separated from reading typography. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **L5 — Scale is honest & Tektronix Glow Law.** | Glow emitted **only** by active signal/measurement points (active lobe border & reticle star), never container bezels or cards. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **L6 — Depth reveals the cartographer.** | The Cartographer's Hand box is framed at the base with the stated interpretive framework declared, not smuggled. |
| [`CONSTITUTION.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/CONSTITUTION.md) | **Anti-List #1–#14.** | No generic purple/blue SaaS gradients, no glassmorphism, no fake countdowns, no ungrounded particle clutter, no devotional branding in chrome. |
| [`ark epistemology spec.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/ark%20epistemology%20spec.md) | 4-layer classifier: Pramāṇa, Topic (5 Tattvas), Darśana Lineage, Puruṣārtha. | Quad breakdown mapped directly to the 4 Puruṣārthas & Epistemic domains: Measurable (Prakṛti/Anumāna), Marketable (Artha/Karma), Wanted (Kāma/Jīva), Inherited (Dharma/Īśvara). |
| [`ARK_Vision_Document.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/ARK_Vision_Document.md) & [`AUDIENCES.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/docs/design/AUDIENCES.md) | Ambition + Humility engine; 4 archetypes (Commissioning pro, Serious reader, Cold skeptic, Ambitious builder). | Scientific & philosophical rigour visible up front; curiosity gap with immediate evidentiary depth. |

---

## 3. Visual & Technical Architecture (Option B)

Option B combines a **pre-rendered high-resolution texture plate** with an **interactive multi-layered SVG / Canvas overlay engine**:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ LAYER 1: Deep obsidian ground (#0e0b08) + High-res golden celestial-        │
│          cartographic filament web base plate                               │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 2: Multi-stage SVG Filters (feGaussianBlur, feDropShadow,             │
│          feColorMatrix) for warm phosphor-gold electric contours            │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 3: Interactive SVG Organic Lobes (4 Quadrants) with hit-testing,      │
│          focus outlines, and energy pulse animations                        │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 4: Central Precision Astrolabe Reticle (Concentric degree rings,      │
│          calibrated azimuth ticks, crosshairs, and 8-point compass star)    │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 5: Typography Overlay (Fig. 1 Serif Header, Domain Sub-labels,        │
│          and Technical Cartographer's Hand drafting box)                    │
├─────────────────────────────────────────────────────────────────────────────┤
│ LAYER 6: Telemetry HUD / Expanding Detail Drawer (Live quadrant readout,    │
│          failure modes, epistemology tags, research brief links)            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Detailed Visual Elements & Visual Match

1. **Top Figure Title:**
   * Text: `Fig. 1  The Four Territories of Human Knowledge`
   * Typography: `Source Serif 4` / `Fraunces`, golden-sand tone (`#d9cdb9`), tracking `0.02em`.
2. **Four Organic Territories (Lobes):**
   * **Northwest:** `THE MEASURABLE` — `Science · Data · Matter`
     * *Epistemology:* Empirical domain (Pratyakṣa / Anumāna), Tattva: Prakṛti, Puruṣārtha: Mokṣa/Material substrate.
     * *Failure Mode:* *"Explains the mechanism. Denies the meaning."*
   * **Northeast:** `THE MARKETABLE` — `Ambition · Power · Systems`
     * *Epistemology:* Economic domain (Anumāna / Deśa-Kāla), Tattva: Karma, Puruṣārtha: Artha.
     * *Failure Mode:* *"Optimises the outcome. Skips the cost."*
   * **Southwest:** `THE WANTED` — `Desire · Psychology · Experience`
     * *Epistemology:* Psychological domain (Pratyakṣa / Mind), Tattva: Jīva, Puruṣārtha: Kāma.
     * *Failure Mode:* *"Maps the feeling. Cannot rank it."*
   * **Southeast:** `THE INHERITED` — `Meaning · Ethics · Consciousness`
     * *Epistemology:* Philosophical domain (Śabda / Lineage), Tattva: Īśvara & Jīva, Puruṣārtha: Dharma.
     * *Failure Mode:* *"Carries the purpose. Distrusts the method."*
3. **The Organic Glowing Contours & Plasma Edges:**
   * Exact fractal / coastal Bézier path geometry contouring around the central circular reticle.
   * Resting state: Warm antique gold stroke (`#b58a45`) at 60% opacity with subtle ambient glow.
   * Hover / Active state: Phosphor amber ignition (`#ffb000`) with multi-stage blur bloom (`box-shadow` / SVG filter) and animated perimeter energy pulse (`stroke-dashoffset` cycle).
   * Inactive territories gracefully dim to 35% opacity to maximize contrast and visual focus.
4. **Central Astrolabe & Navigational Reticle:**
   * Concentric circular rings with precision graduation ticks (`stroke-dasharray="1 3"`, `2 6"`).
   * Micro-animation: Ultra-slow continuous rotation (0.2 RPM / 300s cycle) on inner degree ring, instantly frozen when `prefers-reduced-motion: reduce` is active.
   * Center 8-pointed star with radiant amber core (`#ffb000`) and soft gold radial bloom.
   * Axis crosshairs extending outward into the four quadrant seams.
5. **Cartographer's Hand Technical Box:**
   * Drafting blueprint boundary box with corner tick marks (`+` / `L` calibration brackets).
   * Header: `CARTOGRAPHER'S HAND` (small-caps, accent rust/amber `#d94a16` / `#ffb000`).
   * Body: *"These maps were drawn by different civilizational institutions. They disagree. This atlas is an attempt to navigate all four."*

---

## 4. Proposed Changes & File Organization

### [Component / Sandbox Layer]

#### [NEW] [`public/images/territory-map-plate.webp`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/public/images/territory-map-plate.webp)
* High-resolution, optimized WebP base plate carrying the warm obsidian background and filament web texture.

#### [NEW] [`app/lab/experiment/page.tsx`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/experiment/page.tsx)
* The isolated experiment lab page hosting the full-bleed high-fidelity interactive map, telemetry controls, and specimen inspect panels.

#### [NEW] [`app/lab/experiment/experiment.css`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/experiment/experiment.css)
* Dedicated CSS for the experiment: Tektronix glow law, SVG filter transitions, responsive media queries (320px to 1440px+), and reduced-motion overrides.

#### [NEW] [`app/lab/experiment/_components/AstrolabeMap.tsx`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/experiment/_components/AstrolabeMap.tsx)
* The core high-fidelity interactive component:
  * Organic SVG path geometry with multi-layered glow filter.
  * Central astrolabe reticle with rotating degree marks and compass star.
  * Interactive quadrant hit-zones with full keyboard accessibility (`aria-label`, `tabIndex`, `onKeyDown`, `aria-expanded`).
  * Live telemetry HUD and failure-mode display drawer.

#### [NEW] [`app/lab/experiment/_components/AstrolabeTelemetry.tsx`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/experiment/_components/AstrolabeTelemetry.tsx)
* Detailed readout panel showing the four epistemological layers (Pramāṇa, Tattva, Darśana, Puruṣārtha), failure modes, and primary source linkages for the active territory.

#### [MODIFY] [`app/lab/page.tsx`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab/page.tsx)
* Add a navigation card pointing to `/lab/experiment` (`"Option B: Astrolabe Four-Territory Map Experiment"`).

---

## 5. Verification & Playwright Test Suite Plan

We will create a dedicated Playwright test script [`scripts/design/test-astrolabe-experiment.mjs`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/scripts/design/test-astrolabe-experiment.mjs) verifying:

1. **Multi-Viewport Responsiveness & Zero Console Errors:**
   * Test across 6 viewports: `1440x900`, `1280x800`, `834x1112` (Tablet), `390x844` (iPhone), `360x740`, `320x568` (Small Mobile).
   * 0 console errors, 0 unhandled promise rejections, 0 page errors.
   * Zero horizontal scroll overflow across all widths (`scrollWidth <= clientWidth`).
2. **Interactive State Verification:**
   * Hover and click on all 4 quadrants (`measurable`, `marketable`, `wanted`, `inherited`).
   * Verify telemetry HUD updates immediately with correct failure modes and epistemological tags.
   * Verify active glowing border state and inactive opacity dimming.
3. **Keyboard Navigation & Accessibility (WCAG 2.2 AA):**
   * Tab progression moves sequentially through all 4 quadrants.
   * `Enter` and `Space` keypresses successfully activate quadrants.
   * ARIA labels and live region announcements (`aria-live="polite"`) verified.
4. **Contrast & Color Compliance:**
   * Text-to-background contrast check ensuring >= 4.5:1 for body copy and >= 3.0:1 for large display titles/borders.
5. **Reduced Motion Compliance:**
   * Simulate `prefers-reduced-motion: reduce`.
   * Verify reticle rotation animation is disabled (`animation-duration: 0.001ms` or `none`).
6. **Visual Inspection & Screenshot Capture:**
   * Capture high-resolution full-page and component close-up screenshots in `docs/design/screens/experiment-*.png` for visual match verification.

---

## 6. Execution Steps & Phasing

1. **Phase 1 — Asset & Geometry Preparation:**
   * Extract and optimize the base background plate (`public/images/territory-map-plate.webp`).
   * Model the organic 4-lobed Bézier curves and the central astrolabe reticle vector coordinates.
2. **Phase 2 — Build the Experiment Component & Page:**
   * Create `app/lab/experiment/_components/AstrolabeMap.tsx`, `AstrolabeTelemetry.tsx`, `experiment.css`, and `app/lab/experiment/page.tsx`.
   * Integrate all epistemological data, failure modes, and Cartographer's Hand framing.
3. **Phase 3 — Automated Verification:**
   * Run `npm run typecheck` to ensure zero TypeScript errors.
   * Execute Playwright test suite `node scripts/design/test-astrolabe-experiment.mjs`.
   * Review screenshots and accessibility audit scores.
4. **Phase 4 — Presentation & Approval Gate:**
   * Present the live `/lab/experiment` prototype and test results to Ojas for approval before merging into the main synthesis / landing page.
