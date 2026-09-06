# ĀRK Visual System v3 — The Civilizational Synthesis

*Internal Master Specification. Ratified 2026-09-04 following cross-document architectural audit and reconciliation ([`RECONCILE.md`](file:///c:/Users/ojass/OneDrive/Documents/Web%20Development/ARK/app/lab2/docs/RECONCILE.md)). Supersedes v2 typography, textures, and motion. Derives all color, geometry, and texture values directly from the master plate visual canon in `/app/lab2/images` (`ARK IMG 1`–`5`) while enforcing constitutional layer discipline and anti-cosplay laws.*

---

## 0. The Canonical Reading & Principles

Derived directly from the master visual plates in `/app/lab2/images`:

### 1. The Inhabited Frame (The Reader as the Operative Archetype) — RECONCILE.md Issue 1.3
Every plate holds one human, solitary, composed, and almost always turned away against colossal scale (observatories, mountain ridges, manuscript archives, spacecraft bridges, or desert highways).
* **The Perspective:** The reader is the operative figure in the frame; the interface is the window.
* **The Human Archetype:** Merges the **Complete Human Archetype** (physical discipline, executive mastery, warrior poise of Arjuna and Harvey Specter) with contemplative humility. The visitor does not gaze *at* a hero's ego; the visitor stands in their shoes, looking out at the horizon of civilizational possibility.
* **Chrome Rule:** Strict ban on vanity founder portraits, influencer headshots, and smiling stock testimonial grids.

### 2. One Warm Source in a Cold Field
Measured across the plate set: **78% of every frame sits below 18% luminance**, and warm pixels—a desk lamp, a torch line, a sail, a headlamp, or starlight—never exceed a small fraction of the image.
* **Viewport Ratio:** Amber and ember tones are strictly rationed to **~3%–5% of any viewport**. Never two competing warm elements on screen.

### 3. Clear Separation of Function: The Instrument vs. The Archive
* Things you **operate** (reading text, buttons, controls, navigation) are razor-sharp, high-contrast, and grain-free.
* Things you **contemplate** (illustrative fine art plates, celestial horizons) carry authentic tactile printmaking textures and Bayer dithering.

---

## 1. Colour Tokens (Canonical Plate Palette) — RECONCILE.md Issue 2.1 & 2.2

Color values sampled via k-means clustering directly from `/app/lab2/images` (`ARK IMG 1` through `ARK IMG 5`), calibrated to guarantee WCAG AAA contrast for reading.

| CSS Token | Hex Value | Role & Allocation | Contrast Ratio |
|---|---|---|---|
| `--ark-ground` | `#050917` | Base canvas ground (cool deep indigo night sky) | Canvas root |
| `--ark-ground-deep` | `#03060F` | Cosmic abyss, lowest elevation ground | — |
| `--ark-surface` | `#0D1730` | Elevated module surface, container fill, card backdrops | — |
| `--ark-line` | `#22305A` | Mid slate-violet structural border, 1px rules | — |
| `--ark-line-soft` | `#182642` | Subtle internal section dividers and secondary lines | — |
| `--ark-amber` | `#F0B657` | **Legible Primary Accent:** interactive controls, active reading beads, primary CTAs, active filter states | **7:1 AAA** on `#050917` |
| `--ark-ember-glow` | `#CE8236` | **Atmospheric Warmth Only:** radial plate glow, edge lighting. Never text, borders, or control labels. | Ambient only |
| `--ark-ember-glow-deep`| `#8A5227` | Deep ambient glow base for plate backdrops | Ambient only |
| `--ark-ink-bright` | `#EFF2FA` | Primary high-contrast reading text, headings, prominent typography | **>13.5:1 AAA** |
| `--ark-ink-muted` | `#8F9BB7` | Secondary metadata, marginalia, labels, inactive states | **>5.2:1 AA** |
| `--ark-signal-red` | `#BA3C0F` | Unmapped ground markers, `UNSURVEYED` voids, critical alerts | **4.6:1 AA** |

### Ratio & Usage Rules
* **No Rainbow Splitting:** Eliminated proposals to inject multi-colored sky accents (rose, teal, violet). The palette remains disciplined, cinematic, and unified: deep cool indigo grounds illuminated exclusively by warm starlight, torchlight, and lamplight.
* **Warmth Quota:** Amber/ember tones must never exceed 5% of any viewport surface area.

---

## 2. Typography — "The Civilizational Synthesis" — RECONCILE.md Issues 2.3, 2.4, 2.5

Orbitron (banned as "sci-fi gaming cosplay") and Pixelify Sans (rejected as "8-bit arcade kitsch") are **completely purged**. The system implements an architectural, high-fluency dual-sans structure paired with an authentic scholarly reading serif and functional monospaced typefaces.

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        THE CIVILIZATIONAL SYNTHESIS TYPOGRAPHY STACK                   │
├──────────────────────┬───────────────────────┬─────────────────────────┬───────────────┤
│ Role                 │ Font Family           │ CSS Token               │ Setting       │
├──────────────────────┼───────────────────────┼─────────────────────────┼───────────────┤
│ Primary Wordmark     │ Bespoke SVG Vector    │ —                       │ Custom Vector │
│ Sub-Display Brand    │ Rajdhani (ITF)        │ --ark-font-sub-display  │ Bold 700      │
│ Monumental Hero H1   │ Syne                  │ --ark-font-display      │ ExtraBold 800 │
│ Headings (H2 / H3)   │ Space Grotesk         │ --ark-font-heading      │ SemiBold 600  │
│ UI Controls & Nav    │ Inter Variable        │ --ark-font-ui           │ Medium 500    │
│ Prose & Monographs   │ Source Serif 4        │ --ark-font-prose        │ Regular 400   │
│ Archival Marginalia  │ Space Mono            │ --ark-font-marginalia   │ Regular 400   │
│ Code & System URIs   │ IBM Plex Mono         │ --ark-font-code         │ Regular 400   │
│ Devanāgarī Script    │ Noto Serif Devanagari │ --ark-font-deva         │ Regular 400   │
└──────────────────────┴───────────────────────┴─────────────────────────┴───────────────┘
```

### Font Allocations & Rationale
1. **Primary Wordmark ("ĀRK"):** Dedicated mathematical **Bespoke SVG Vector Mark** matching the heavy rounded-voxel silhouette with macron (`Ā`) seen in `ARK IMG 1`–`5`. Eliminates commercial font licensing failures.
2. **Sub-Display Brand ("VEDIC FUTURISM"):** `'Rajdhani', sans-serif` (`--ark-font-sub-display`). Created by the Indian Type Foundry. Condensed, modular, flat-sided geometry. All-caps, Bold 700, wide letter-spacing `0.18em`.
3. **Monumental Hero H1:** `'Syne', sans-serif` (`--ark-font-display`). ExtraBold 800, tracking `0.02em` to `0.04em`. Sculptural mass and architectural gravitas resembling titanium or granite monumental inscriptions.
4. **Section Headings & Card Titles (H2, H3):** `'Space Grotesk', sans-serif` (`--ark-font-heading`). SemiBold 600, tight tracking `-0.01em` to `0.00em`. Architectural precision without gaming HUD clichés.
5. **Interactive Controls, Navigation, Buttons & Form Inputs:** `'Inter Variable', -apple-system, sans-serif` (`--ark-font-ui`). Medium 500 / SemiBold 600. Flawless micro-legibility at 11–14px on dark indigo grounds.
6. **Long-Form Reading Prose & Monographs:** `'Source Serif 4', Georgia, serif` (`--ark-font-prose`). Regular 400, optical size 14, line-height 1.65. Conveys the authority of an elite private research library. Verified 100% native glyph coverage for Sanskrit IAST diacritics (`ā, ī, ū, ṛ, ṃ, ḥ, ś, ṣ, ṭ, ḍ`).
7. **Editorial Marginalia & Telemetry:** `'Space Mono', monospace` (`--ark-font-marginalia`). Law L4 provenance furniture, margin notes, astronomical coordinates, timestamps, observatory dials.
8. **Technical Data & System Identifiers:** `'IBM Plex Mono', monospace` (`--ark-font-code`). `urn:arka:` canonical addresses, database keys, API endpoints, raw numerical metrics, and formal code blocks.
9. **Original Sanskrit & Hindi Script:** `'Noto Serif Devanagari', serif` (`--ark-font-deva`).

### Google Fonts Import
```css
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,400;0,500;1,400&family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Noto+Serif+Devanagari:wght@400;600&family=Rajdhani:wght@600;700&family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Space+Grotesk:wght@500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&family=Syne:wght@700;800&display=swap');
```

---

## 3. Container Geometry & Border Radius — RECONCILE.md Issue 2.6

Establishes instantaneous visual-cognitive differentiation between architectural boundaries and discrete taxonomy labels:

1. **Structural Containers & Action Controls (`border-radius: 0`):**
   * Strict `border-radius: 0` enforced across all section viewports, layout columns, cards, editorial split-screens, modal dialogs, data tables, structural dividers, input fields, and primary/secondary CTA buttons.
   * Preserves the monumental architectural grid, civilizational research station tone, and broadsheet discipline.
2. **Taxonomy, Filter Chips & Metadata Badges (`border-radius: 9999px`):**
   * Pill-shaped geometry (`border-radius: 9999px` / `rounded-full`) is standardized *exclusively* for semantic metadata chips, category tags (e.g., `THEORY`, `SPECULATIVE DESIGN`, `OPEN-ACCESS`), and active filter selectors.
   * Distinguishes discrete, non-structural semantic tags from rectilinear structural containers.

---

## 4. Atmospheric Textures — RECONCILE.md Issue 2.7

1. **Page Canvas & Reading Surfaces (Grain-Free Canvas):**
   * Global page-level inline SVG noise/film grain and jitter are **eliminated from the main HTML/body canvas**.
   * Backgrounds remain pure, sharp, clean CSS color fields (`#050917` to `#03060F`), guaranteeing maximum text contrast, battery/GPU efficiency, and strict compliance with `eslint-rules/no-atmosphere.js`.
2. **Artwork Scope & Progressive Image Reveals (Tactile Dither Retained):**
   * Bayer dithering (8×8 Bayer matrix / 8px tile) and textured print overlays are retained *exclusively* within visual artwork containers, plate frames, hero image compositions, and progressive image loading states.
   * Delivers tactile printmaking and cosmic haze within the art without contaminating UI readability.

---

## 5. Motion Language — RECONCILE.md Issue 2.8

Hybrid motion architecture balancing cinematic atmospheric gravitas with instantaneous operational precision:

1. **Atmospheric Reveals & Section Fades (Smooth & Deliberate):**
   * Page reveals, section viewports, hero transitions, and ambient fades use continuous cubic-bezier easing:
     * Token: `--ark-ease-atmos: cubic-bezier(0.16, 1, 0.3, 1)` (duration 400–800ms).
2. **Interactive UI Feedback (Fast & Tactile):**
   * Navigation chrome, buttons, filter toggles, dropdowns, and hover focus rings use rapid continuous easing:
     * Token: `--ark-ease-ui: cubic-bezier(0.2, 0, 0, 1)` (duration 100–150ms).
3. **Telemetry Readouts, Dials & Progressive Loaders (Stepped Mechanical):**
   * Quantized stepped motion is reserved strictly for mechanical data readouts: coordinate changes, timestamp tickers, capacity counters, observatory dials, and progressive Bayer-dither artwork loading passes:
     * Tokens: `--ark-ease-step: steps(6, end)`, `--ark-ease-step-fine: steps(9, end)`.

---

## 6. Curated Plates & Devotional Demarcation — RECONCILE.md Issue 3.1

### The Strict Demarcation Rule
* **Functional UI Chrome:** The constitutional ban on religious and devotional iconography (Anti-List #7) is strictly enforced across all platform chrome: navigation bars, logos, favicons, button icons, editorial markers, cards, typography watermarks, and promotional copy. Zero sectarian symbols.
* **Curated Illustrative Fine Art:** Symbolic motifs (e.g., the *Om*-marked sail in `ceto-darpana`, cosmic geometry in `mandala`, or ancient architectural structures in `uttisthata-jagrata`) are fully authorized *within authentic fine art compositions*, treated as profound philosophical and cosmic archetypes.

### Canonical Plates & Verified Anchors
| Entry | Canonical Master Plate (`/app/lab2/images`) | Anchor & Epistemic Meaning |
|---|---|---|
| `athato-brahma-jijnasa` | `ARK IMG 1` (Fixed Flagship Hero Anchor) — Portal / Stone Observatory | *Vedānta-sūtra 1.1.1* — "Now, therefore, the inquiry into Brahman." |
| `ceto-darpana` | `ARK IMG 2` — Coastal Night / Mandala Sea / Distant Sails | *Śikṣāṣṭaka 1* — Cleansing the mirror of consciousness. |
| `uttisthata-jagrata` | `ARK IMG 3` — Mountain Citadel / Comet / Torch-Bearers | *Kaṭha Upaniṣad 1.3.14* — "Arise, awake, approach the great." |
| `ananyas-cintayanto` | `ARK IMG 4` — Desert Highway / Solitary Navigator / Distant Citadel | *Bhagavad-gītā 9.22* — Unalloyed focus and divine provision. |
| `dehino-smin` | `ARK IMG 5` — Jantar Mantar Instruments / Astronomical Horizon | *Bhagavad-gītā 2.13* — The continuity of consciousness across bodily changes. |
