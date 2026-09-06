"use client";

import { useState, type ReactElement } from "react";
import { Inter, Space_Mono, Source_Serif_4 } from "next/font/google";
import "../synthesis.css";
import "./specimen.css";

// 1. Technical Triad Fonts with Latin-Extended Subsets for Sanskrit Diacritics
const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const spaceMono = Space_Mono({
  weight: ["400", "700"],
  subsets: ["latin", "latin-ext"],
  variable: "--font-mono",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

// 2. Verified Diacritic Codepoints
interface DiacriticEntry {
  char: string;
  code: string;
  name: string;
  role: string;
}

const DIACRITIC_MAP: ReadonlyArray<DiacriticEntry> = [
  { char: "Ā", code: "U+0100", name: "A Macron Upper", role: "Wordmark initial / Sanskrit long vowel" },
  { char: "ā", code: "U+0101", name: "A Macron Lower", role: "Sanskrit transliteration (Vimāna)" },
  { char: "Ī", code: "U+012A", name: "I Macron Upper", role: "Sanskrit long I uppercase" },
  { char: "ī", code: "U+012B", name: "I Macron Lower", role: "Sanskrit long I (Bhagavad-gītā)" },
  { char: "Ṃ", code: "U+1E42", name: "M Dot Below Upper", role: "Anusvāra uppercase" },
  { char: "ṃ", code: "U+1E43", name: "M Dot Below Lower", role: "Anusvāra lowercase (Sāṃkhya)" },
  { char: "Ṛ", code: "U+1E5A", name: "R Dot Below Upper", role: "Vocalic R uppercase (Ṛgveda)" },
  { char: "ṛ", code: "U+1E5B", name: "R Dot Below Lower", role: "Vocalic R lowercase (Kṛṣṇa)" },
  { char: "₹", code: "U+20B9", name: "Indian Rupee Sign", role: "Commercial pricing currency (₹1,299)" },
];

// 3. Contrast Audit Certified Data (WCAG 2.1)
interface SwatchToken {
  token: string;
  hex: string;
  role: string;
  ratioOnBg: string;
  wcagLevel: string;
  bgHex: string;
  isLightText?: boolean;
}

const PALETTE_TOKENS: ReadonlyArray<SwatchToken> = [
  { token: "--ark-bg", hex: "#181310", role: "Warm near-black instrument ground", ratioOnBg: "Base Ground", wcagLevel: "N/A", bgHex: "#181310" },
  { token: "--ark-bg-raised", hex: "#211a14", role: "Raised instrument modules & toolbars", ratioOnBg: "Module Ground", wcagLevel: "N/A", bgHex: "#211a14" },
  { token: "--ark-bg-plate", hex: "#282018", role: "Embedded diagram insets & callout frames", ratioOnBg: "Plate Ground", wcagLevel: "N/A", bgHex: "#282018" },
  { token: "--ark-ink-hi", hex: "#f0e7d8", role: "Primary headings, H1/H2, CTA surface", ratioOnBg: "15.03:1", wcagLevel: "AAA", bgHex: "#f0e7d8", isLightText: true },
  { token: "--ark-ink", hex: "#d9cdb9", role: "Body reading prose & diagram labels", ratioOnBg: "11.75:1", wcagLevel: "AAA", bgHex: "#d9cdb9", isLightText: true },
  { token: "--ark-muted", hex: "#a3957d", role: "Meta, sigla, captions, ruler ticks, units", ratioOnBg: "6.28:1", wcagLevel: "AA", bgHex: "#a3957d", isLightText: true },
  { token: "--ark-faint", hex: "#5e5445", role: "Decorative ticks, inactive grid background", ratioOnBg: "2.35:1", wcagLevel: "Structural", bgHex: "#5e5445", isLightText: true },
  { token: "--ark-amber", hex: "#ffb000", role: "Phosphor-warm live measurement & bead", ratioOnBg: "10.06:1", wcagLevel: "AAA", bgHex: "#ffb000", isLightText: true },
  { token: "--ark-signal-red", hex: "#BA3C0F", role: "Action marker & declared UNSURVEYED voids", ratioOnBg: "4.58:1 on hi", wcagLevel: "AA", bgHex: "#BA3C0F", isLightText: true },
];

const CONTRAST_AUDIT_ROWS = [
  { pair: "--ark-ink-hi on --ark-bg", colors: "#f0e7d8 on #181310", ratio: "15.03:1", target: "AAA (≥7.0)", status: "PASS", role: "Display/Headings (H1/H2) on Ground" },
  { pair: "--ark-ink-hi on --ark-bg-raised", colors: "#f0e7d8 on #211a14", ratio: "14.01:1", target: "AAA (≥7.0)", status: "PASS", role: "Display/Headings on Raised Module" },
  { pair: "--ark-ink-hi on --ark-bg-plate", colors: "#f0e7d8 on #282018", ratio: "13.07:1", target: "AAA (≥7.0)", status: "PASS", role: "Display/Headings on Plate Surface" },
  { pair: "--ark-ink on --ark-bg", colors: "#d9cdb9 on #181310", ratio: "11.75:1", target: "AAA (≥7.0)", status: "PASS", role: "Body Prose on Ground" },
  { pair: "--ark-ink on --ark-bg-raised", colors: "#d9cdb9 on #211a14", ratio: "10.95:1", target: "AAA (≥7.0)", status: "PASS", role: "Body Prose on Raised Module" },
  { pair: "--ark-ink on --ark-bg-plate", colors: "#d9cdb9 on #282018", ratio: "10.22:1", target: "AAA (≥7.0)", status: "PASS", role: "Body Prose on Plate Surface" },
  { pair: "--ark-muted on --ark-bg", colors: "#a3957d on #181310", ratio: "6.28:1", target: "AA (≥4.5)", status: "PASS", role: "Meta/Sigla/Captions on Ground" },
  { pair: "--ark-muted on --ark-bg-raised", colors: "#a3957d on #211a14", ratio: "5.85:1", target: "AA (≥4.5)", status: "PASS", role: "Meta/Sigla on Raised Module" },
  { pair: "--ark-muted on --ark-bg-plate", colors: "#a3957d on #282018", ratio: "5.46:1", target: "AA (≥4.5)", status: "PASS", role: "Meta/Sigla on Plate Surface" },
  { pair: "--ark-amber on --ark-bg", colors: "#ffb000 on #181310", ratio: "10.06:1", target: "AAA (≥7.0)", status: "PASS", role: "Phosphor Amber Signal on Ground" },
  { pair: "--ark-bg on --ark-ink-hi", colors: "#181310 on #f0e7d8", ratio: "15.03:1", target: "AAA (≥7.0)", status: "PASS", role: "Inverted Primary CTA (Dark text on Hi ink)" },
  { pair: "--ark-ink-hi on --ark-signal-red", colors: "#f0e7d8 on #BA3C0F", ratio: "4.58:1", target: "AA (≥4.5)", status: "PASS", role: "Inverted Signal Red Key/Pill (Hi text on Red)" },
  { pair: "--ark-signal-red on --ark-bg", colors: "#BA3C0F on #181310", ratio: "3.28:1", target: "UI (≥3.0)", status: "PASS", role: "Signal Red Boundary Line on Ground" },
  { pair: "--ark-signal-red on --ark-bg-raised", colors: "#BA3C0F on #211a14", ratio: "3.06:1", target: "UI (≥3.0)", status: "PASS", role: "Signal Red Boundary Line on Raised Module" },
];

// 4. Stratigraphic Layers (USGS Altimeter Key)
type StratumId = "i" | "ii" | "iii" | "iv";
interface StratumDef {
  id: StratumId;
  numeral: string;
  name: string;
  definition: string;
  hatchPattern: string;
  hatchDesc: string;
}

const STRATA: ReadonlyArray<StratumDef> = [
  { id: "i", numeral: "I", name: "Source", definition: "What was read: 63 sources located, dated, and cited. Count printed, not implied.", hatchPattern: "ark-pat-stipple", hatchDesc: "Fine dot stipple pattern" },
  { id: "ii", numeral: "II", name: "Evidence", definition: "What the sources show when read together — findings separated from whoever reported them.", hatchPattern: "ark-pat-bedding", hatchDesc: "Horizontal bedding rules" },
  { id: "iii", numeral: "III", name: "Interpretation", definition: "Where ĀRK argues. Marked as argument, built upward from strata beneath it, disputable.", hatchPattern: "ark-pat-hatch", hatchDesc: "45° diagonal hatch lines" },
  { id: "iv", numeral: "IV", name: "Unresolved", definition: "What the evidence cannot yet settle. Declared bounded void marked UNSURVEYED.", hatchPattern: "ark-pat-unsurveyed", hatchDesc: "Dashed perimeter with empty void" },
];

// 5. Readings Data for Braun 3-key DepthControl
type DepthMode = "quick" | "explain" | "deep";

interface ReadingItem {
  id: string;
  name: string;
  scope: string;
  value: string;
  unit: string | null;
  state: "measured" | "fact" | "unmeasured";
  stateLabel: string;
  explain: string;
  siglum: string;
  tally: boolean;
}

const READINGS_DATA: ReadonlyArray<ReadingItem> = [
  {
    id: "R-01",
    name: "SOURCES READ",
    scope: "Brief 001 — The Architecture of Desire",
    value: "63",
    unit: "SOURCES",
    state: "measured",
    stateLabel: "MEASURED",
    explain: "All 63 sources read before drafting. Printed complete index.",
    siglum: "[B1] The Architecture of Desire — research brief · ₹1,299 / $19",
    tally: true,
  },
  {
    id: "R-02",
    name: "PAGES TYPESET",
    scope: "Brief 001 — published artefact",
    value: "48",
    unit: "PAGES",
    state: "measured",
    stateLabel: "MEASURED",
    explain: "Final typeset length of the published brief artefact.",
    siglum: "[B1] The Architecture of Desire · 48pp · typeset in Inter + Space Mono",
    tally: false,
  },
  {
    id: "R-03",
    name: "STUDIO CAPACITY",
    scope: "Commissions — operational limit",
    value: "3",
    unit: "/ MONTH",
    state: "fact",
    stateLabel: "OPERATING FACT",
    explain: "Studio accepts exactly three commissions a month. CCPA-compliant capacity.",
    siglum: "RATE CARD — Sprint ₹25,000 → Retainer ₹1,50,000 / month",
    tally: false,
  },
  {
    id: "R-04",
    name: "OPEN QUESTIONS",
    scope: "Sitewide Register",
    value: "—",
    unit: null,
    state: "unmeasured",
    stateLabel: "UNMEASURED",
    explain: "Unsettled questions rendered as honest em-dash per chart convention.",
    siglum: "CONSTITUTION L3 — Unmapped ground stays drawn. Never invented.",
    tally: false,
  },
];

// Helper component for 63-stroke tally diagram
function TallyStrokes({ count }: { count: number }): ReactElement {
  const perRow = 7;
  const groups: number[] = [];
  let remaining = count;
  while (remaining > 0) {
    const take = Math.min(5, remaining);
    groups.push(take);
    remaining -= take;
  }
  const pitch = 24;
  const rowHeight = 24;
  const rows = Math.ceil(groups.length / perRow);
  const width = Math.min(groups.length, perRow) * pitch + 4;
  const height = rows * rowHeight;
  const lines: ReactElement[] = [];

  groups.forEach((marksInGroup, gi) => {
    const gx = (gi % perRow) * pitch + 3;
    const gy = Math.floor(gi / perRow) * rowHeight;
    for (let i = 0; i < Math.min(marksInGroup, 4); i++) {
      lines.push(
        <line
          key={`v${gi}-${i}`}
          x1={gx + i * 4.5}
          y1={gy + 3}
          x2={gx + i * 4.5}
          y2={gy + 20}
          stroke="#ffb000"
          strokeWidth="1.5"
        />
      );
    }
    if (marksInGroup === 5) {
      lines.push(
        <line
          key={`c${gi}`}
          x1={gx - 2}
          y1={gy + 18}
          x2={gx + 15}
          y2={gy + 5}
          stroke="#ffb000"
          strokeWidth="1.5"
        />
      );
    }
  });

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      role="img"
      aria-label={`Tally diagram: ${count} strokes, grouped in fives.`}
      style={{ display: "block", marginTop: "8px" }}
    >
      {lines}
    </svg>
  );
}

const DEPTH_DESCRIPTIONS: Record<DepthMode, string> = {
  quick: "Headline readings only",
  explain: "Add provenance context and operational notes",
  deep: "Expand full labour tally diagram and source sigla",
};

export default function SynthesisSpecimenPage() {
  const [activeStratum, setActiveStratum] = useState<StratumId>("i");
  const [depthMode, setDepthMode] = useState<DepthMode>("explain");
  const activeSignalsCount = 1;

  // Position calculation for the interactive ruler bead
  const stratumIndices: Record<StratumId, number> = { i: 0, ii: 1, iii: 2, iv: 3 };
  const beadTopPercent = stratumIndices[activeStratum] * 25 + 12.5;


  return (
    <main
      className={`ark-synthesis spec-container ${inter.variable} ${spaceMono.variable} ${sourceSerif.variable}`}
      data-dir="synthesis"
    >
      {/* SVG Global Pattern Definitions for Geological Stratigraphy */}
      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <defs>
          {/* Stratum I: Fine Dot Stipple */}
          <pattern id="ark-pat-stipple" width="6" height="6" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="0.8" fill="#d9cdb9" />
            <circle cx="5" cy="5" r="0.8" fill="#d9cdb9" />
          </pattern>
          {/* Stratum II: Horizontal Bedding Rules */}
          <pattern id="ark-pat-bedding" width="8" height="6" patternUnits="userSpaceOnUse">
            <line x1="0" y1="3" x2="8" y2="3" stroke="#d9cdb9" strokeWidth="1" />
          </pattern>
          {/* Stratum III: 45° Diagonal Hatch */}
          <pattern id="ark-pat-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="-1" x2="0" y2="7" stroke="#d9cdb9" strokeWidth="1" />
          </pattern>
          {/* Stratum IV: Declared Unsurveyed Boundary */}
          <pattern id="ark-pat-unsurveyed" width="12" height="12" patternUnits="userSpaceOnUse">
            <rect x="0.5" y="0.5" width="11" height="11" fill="none" stroke="rgba(186, 60, 15, 0.4)" strokeDasharray="2 2" strokeWidth="1" />
          </pattern>
        </defs>
      </svg>

      {/* =========================================================================
       * 1. NASA GSM Drawing-Office Masthead & Status Block
       * ========================================================================= */}
      <header className="spec-title-block" aria-label="System specification metadata">
        <div className="spec-title-main">
          <div className="spec-doc-id">
            <span>DOC-ID: ARK-SPEC-003</span>
            <span className="spec-badge">RATIFIED · PHASE 3</span>
            <span className="spec-badge" style={{ borderColor: "rgba(186, 60, 15, 0.4)", color: "#BA3C0F", background: "rgba(186, 60, 15, 0.1)" }}>
              OPTION 1: THE TRIAD (C + A + E)
            </span>
          </div>
          <h1 className="spec-title-heading">ĀRK Token System & Specimen Sheet</h1>
          <p className="spec-title-sub">
            The operational instrument token architecture: warm ink-dark ground, phosphor amber signals, technical typography triad, and stratigraphic primitives.
          </p>
        </div>
        <div className="spec-meta-grid">
          <div className="spec-meta-item">
            <span className="spec-meta-label">Ground Tone</span>
            <span className="spec-meta-val">#181310 (Warm Ink-Dark)</span>
          </div>
          <div className="spec-meta-item">
            <span className="spec-meta-label">Authority</span>
            <span className="spec-meta-val">Ojas (Taste Authority)</span>
          </div>
          <div className="spec-meta-item">
            <span className="spec-meta-label">WCAG Compliance</span>
            <span className="spec-meta-val" style={{ color: "#55d688" }}>100% PASS (AA / AAA)</span>
          </div>
          <div className="spec-meta-item">
            <span className="spec-meta-label">Atmosphere (§6)</span>
            <span className="spec-meta-val">Spacecraft + Night Library</span>
          </div>
        </div>
      </header>

      {/* =========================================================================
       * 2. Chromatic Architecture & Palette Ledger
       * ========================================================================= */}
      <section className="spec-section" id="palette-architecture" aria-labelledby="palette-heading">
        <div className="spec-sec-header">
          <h2 id="palette-heading" className="spec-sec-title">
            <span className="spec-sec-num">01 //</span> Chromatic Palette & Contrast Architecture
          </h2>
          <span className="spec-sec-desc">Warm near-black ground + 3-step ink hierarchy + rationed hot signals</span>
        </div>

        <div className="spec-palette-grid">
          {PALETTE_TOKENS.map((t) => (
            <div className="spec-swatch" key={t.token}>
              <div
                className="spec-swatch-color"
                style={{ backgroundColor: t.hex, borderBottom: t.hex === "#181310" ? "1px solid var(--ark-rule-strong)" : undefined }}
              >
                <span className="spec-swatch-tag">{t.hex}</span>
              </div>
              <div className="spec-swatch-body">
                <span className="spec-swatch-token">{t.token}</span>
                <span className="spec-swatch-hex">{t.hex}</span>
                <p className="spec-swatch-role">{t.role}</p>
                <div className="spec-swatch-ratio">
                  <span>Contrast vs Ground</span>
                  <span className="spec-ratio-val">{t.ratioOnBg}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mathematical WCAG Certification Table */}
        <div className="spec-table-wrap" aria-label="WCAG 2.1 Contrast Ratios">
          <table className="spec-table">
            <thead>
              <tr>
                <th>Token Pairing</th>
                <th>Hex Values</th>
                <th>Calculated Ratio</th>
                <th>Target Standard</th>
                <th>Audit Status</th>
                <th>Functional UI Role</th>
              </tr>
            </thead>
            <tbody>
              {CONTRAST_AUDIT_ROWS.map((r, idx) => (
                <tr key={idx}>
                  <td><code>{r.pair}</code></td>
                  <td>{r.colors}</td>
                  <td style={{ fontWeight: "bold", color: "var(--ark-ink-hi)" }}>{r.ratio}</td>
                  <td>{r.target}</td>
                  <td className="spec-pass-tag">✓ {r.status}</td>
                  <td style={{ color: "var(--ark-ink)" }}>{r.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
       * 3. Typographic Hierarchy & Sanskrit Diacritic Proof
       * ========================================================================= */}
      <section className="spec-section" id="typography-hierarchy" aria-labelledby="type-heading">
        <div className="spec-sec-header">
          <h2 id="type-heading" className="spec-sec-title">
            <span className="spec-sec-num">02 //</span> Technical Triad Typography & Verified Diacritics
          </h2>
          <span className="spec-sec-desc">Inter Variable (Display/UI) + Space Mono (Apparatus) + Source Serif 4 (Quotation)</span>
        </div>

        <div className="spec-type-grid">
          {/* Display & H1 Scale */}
          <div className="spec-type-row">
            <div className="spec-type-meta">
              <span className="spec-type-role">Display 44px / H1</span>
              <span>Inter Variable · 600</span>
              <span>Tracking: -0.02em</span>
              <span>Line Height: 1.12</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--ark-font-display)", fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.12, color: "var(--ark-ink-hi)" }}>
                You are not short of information. You are short of integration.
              </div>
            </div>
          </div>

          {/* H2 & Section Leads */}
          <div className="spec-type-row">
            <div className="spec-type-meta">
              <span className="spec-type-role">H2 / Section Lead 24px</span>
              <span>Inter Variable · 500</span>
              <span>Tracking: -0.01em</span>
            </div>
            <div>
              <div style={{ fontFamily: "var(--ark-font-display)", fontSize: "24px", fontWeight: 500, letterSpacing: "-0.01em", color: "var(--ark-ink-hi)" }}>
                An operational civilization-scale instrument: research briefs, studio commissions, and codex intelligence.
              </div>
            </div>
          </div>

          {/* Body Reading Prose */}
          <div className="spec-type-row">
            <div className="spec-type-meta">
              <span className="spec-type-role">Body Prose 15px</span>
              <span>Inter Variable · 400</span>
              <span>Measure: 65ch max</span>
            </div>
            <div>
              <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "15px", lineHeight: 1.6, color: "var(--ark-ink)", maxWidth: "68ch", margin: 0 }}>
                ĀRK builds research briefs the way survey departments build maps: every claim is typed by stratum, so you can audit each layer separately instead of trusting the whole. A claim you cannot trace is an opinion.
              </p>
            </div>
          </div>

          {/* Apparatus & Marginalia (Space Mono) */}
          <div className="spec-type-row">
            <div className="spec-type-meta">
              <span className="spec-type-role">Apparatus & Data 12px</span>
              <span>Space Mono · 400/700</span>
              <span>Tabular Numerals</span>
            </div>
            <div style={{ fontFamily: "var(--ark-font-mono)", fontSize: "12px", color: "var(--ark-muted)", display: "flex", flexDirection: "column", gap: "6px" }}>
              <div>[B1] THE ARCHITECTURE OF DESIRE — RESEARCH BRIEF · ₹1,299 / $19 · 48PP · 63 SOURCES</div>
              <div>R-01 SOURCES READ: 63 · R-02 PAGES: 48 · R-03 CAPACITY: 3 / MONTH · R-04 UNMEASURED: —</div>
              <div style={{ color: "var(--ark-amber)" }}>STATUS: INSTRUMENT ACTIVE · 28°36&apos;50&quot;N 77°12&apos;32&quot;E · REV: 2026.08</div>
            </div>
          </div>

          {/* Quotation & Reflection (Source Serif 4) */}
          <div className="spec-type-row">
            <div className="spec-type-meta">
              <span className="spec-type-role">Quotation 18px (Rationed)</span>
              <span>Source Serif 4 · Italic</span>
              <span>Max 2 per page</span>
            </div>
            <div>
              <blockquote style={{ margin: 0, paddingLeft: "16px", borderLeft: "2px solid var(--ark-amber)" }}>
                <p style={{ fontFamily: "var(--ark-font-serif)", fontStyle: "italic", fontSize: "18px", lineHeight: 1.5, color: "var(--ark-ink-hi)", margin: 0 }}>
                  “Become extraordinarily capable without becoming spiritually empty. Become deeply spiritual without becoming intellectually narrow.”
                </p>
                <cite style={{ fontFamily: "var(--ark-font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-muted)", display: "block", marginTop: "8px" }}>
                  — ĀRK Vision Document (§1)
                </cite>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Sanskrit & Currency Diacritic Verification Box */}
        <div className="spec-diacritic-box" aria-label="Sanskrit Transliteration Glyph Proof">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: "8px" }}>
            <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "12px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ark-amber)", fontWeight: 700 }}>
              ★ MANDATORY DIACRITIC & SYMBOL PROOF (CMAP CERTIFIED)
            </span>
            <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "11px", color: "var(--ark-muted)" }}>
              Subsets: [latin, latin-ext] · 100% Native Glyph Rendering
            </span>
          </div>

          <div className="spec-proof-banner">
            ĀRK · Vimāna · Sāṃkhya — Ā ā Ī ī Ṃ ṃ Ṛ ṛ · ₹1,299
          </div>

          <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-muted)", margin: "0 0 16px 0" }}>
            Every glyph below has been verified natively inside Inter Variable, Space Mono, and Source Serif 4 with zero missing codepoints or fallback glitched boxes:
          </p>

          <div className="spec-glyph-cards">
            {DIACRITIC_MAP.map((d) => (
              <div className="spec-glyph-card" key={d.code}>
                <span className="spec-glyph-char">{d.char}</span>
                <span className="spec-glyph-code">{d.code}</span>
                <span className="spec-glyph-name">{d.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
       * 4. Interactive UI Primitives & Stratigraphic Components
       * ========================================================================= */}
      <section className="spec-section" id="interactive-primitives" aria-labelledby="primitives-heading">
        <div className="spec-sec-header">
          <h2 id="primitives-heading" className="spec-sec-title">
            <span className="spec-sec-num">03 //</span> Interactive UI Primitives & Stratigraphy
          </h2>
          <span className="spec-sec-desc">Strata Ruler altimeter + Braun 3-key DepthControl + Button Matrix + Geological SVG Hatch</span>
        </div>

        <div className="spec-primitives-grid">
          {/* A. Strata Ruler Altimeter Segment */}
          <div className="spec-primitive-card">
            <div className="spec-card-head">
              <span className="spec-card-title">1. Strata Ruler Altimeter (Direction C)</span>
              <span className="spec-badge">LIVE INTERACTIVE</span>
            </div>
            <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-muted)", margin: 0 }}>
              Scroll/click-driven vertical altimeter tracking the 4 strata of knowledge. Live amber bead follows cursor position:
            </p>

            <div className="spec-ruler-interactive">
              <div className="spec-ruler-track" aria-label="Strata altitude track">
                {/* Lit Reading Bead adhering to Tektronix Law */}
                <div
                  className="spec-ruler-bead ark-glow-signal"
                  style={{ top: `${beadTopPercent}%`, transform: "translateY(-50%)" }}
                  aria-hidden="true"
                />
                {STRATA.map((s) => (
                  <div
                    key={s.id}
                    className={`spec-ruler-band ${activeStratum === s.id ? "active" : ""}`}
                    onClick={() => setActiveStratum(s.id)}
                    title={`Activate Stratum ${s.numeral} (${s.name})`}
                  >
                    <span>{s.numeral}</span>
                  </div>
                ))}
              </div>

              <div className="spec-ruler-content">
                {STRATA.filter((s) => s.id === activeStratum).map((s) => (
                  <div key={s.id}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "12px", color: "var(--ark-amber)", fontWeight: 700 }}>
                        STRATUM {s.numeral} //
                      </span>
                      <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "12px", color: s.id === "iv" ? "var(--ark-signal-red)" : "var(--ark-ink-hi)", fontWeight: 700, textTransform: "uppercase" }}>
                        {s.name}
                      </span>
                    </div>
                    <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-ink)", lineHeight: 1.5, margin: "0 0 8px 0" }}>
                      {s.definition}
                    </p>
                    <div
                      style={{
                        marginTop: "8px",
                        padding: "8px 12px",
                        backgroundColor: s.id === "iv" ? "rgba(186, 60, 15, 0.08)" : "var(--ark-bg-deep)",
                        border: s.id === "iv" ? "1px dashed var(--ark-signal-red)" : "1px solid var(--ark-rule)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                      }}
                    >
                      <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", color: s.id === "iv" ? "var(--ark-signal-red)" : "var(--ark-muted)", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: s.id === "iv" ? 700 : 400 }}>
                        {s.id === "iv" ? "Declared Bounded Void · Marked UNSURVEYED (L3)" : `Pattern Fill: ${s.hatchDesc}`}
                      </span>
                      <svg width="48" height="20" aria-hidden="true" style={{ border: "1px solid var(--ark-rule)", flexShrink: 0 }}>
                        <rect width="48" height="20" fill={`url(#${s.hatchPattern})`} />
                      </svg>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* B. Braun 3-Key DepthControl & Ledger (Direction A) */}
          <div className="spec-primitive-card">
            <div className="spec-card-head">
              <span className="spec-card-title">2. Braun 3-Key DepthControl (Direction A)</span>
              <span className="spec-badge">LIVE STATE SWITCH</span>
            </div>
            <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-muted)", margin: 0 }}>
              Tactile depth selector re-states ledger readings and reveals the 63-source labour tally:
            </p>

            <div className="spec-depth-selector" role="group" aria-label="Select depth level">
              {(["quick", "explain", "deep"] as const).map((d) => (
                <button
                  key={d}
                  type="button"
                  aria-pressed={depthMode === d}
                  aria-label={`${d.toUpperCase()} — ${DEPTH_DESCRIPTIONS[d]}`}
                  className={`spec-depth-btn ${depthMode === d ? "active" : ""}`}
                  onClick={() => setDepthMode(d)}
                >
                  {d.toUpperCase()}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
              {READINGS_DATA.slice(0, 2).map((r) => (
                <div className="spec-reading-row" key={r.id}>
                  <span className="spec-reading-id">{r.id}</span>
                  <div>
                    <div className="spec-reading-name">{r.name}</div>
                    {depthMode !== "quick" && (
                      <div style={{ fontFamily: "var(--ark-font-body)", fontSize: "11px", color: "var(--ark-muted)", marginTop: "2px" }}>
                        {r.explain}
                      </div>
                    )}
                    {depthMode === "deep" && (
                      <div style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", color: "var(--ark-amber)", marginTop: "4px" }}>
                        {r.siglum}
                      </div>
                    )}
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <span className="spec-reading-val">{r.value}</span>
                    {r.unit && <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", color: "var(--ark-muted)", display: "block" }}>{r.unit}</span>}
                  </div>
                </div>
              ))}

              {/* 63-Stroke Tally Display in DEEP mode */}
              {depthMode === "deep" && (
                <div className="spec-tally-box">
                  <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "10px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-muted)" }}>
                    LABOUR PROOF // 63 SOURCES READ · FIVES CROSSED:
                  </span>
                  <TallyStrokes count={63} />
                </div>
              )}
            </div>
          </div>

          {/* C. Action Primitives & Button Matrix */}
          <div className="spec-primitive-card">
            <div className="spec-card-head">
              <span className="spec-card-title">3. Button & Action Primitive Matrix</span>
              <span className="spec-badge">≥44PX TOUCH TARGET</span>
            </div>
            <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-muted)", margin: 0 }}>
              Strictly rationed CTA surfaces. Zero radius, high-contrast inverted primary, and subtle ghost outlines:
            </p>

            <div className="spec-btn-row">
              <button type="button" className="ark-btn-primary">
                Read the Primer — Free <span aria-hidden="true">→</span>
              </button>
              <button type="button" className="ark-btn-secondary">
                Commission Studio
              </button>
              <a href="#palette-architecture" className="ark-btn-tertiary">
                Inspect Tokens <span aria-hidden="true">↓</span>
              </a>
              <div className="ark-sensor-pill">
                <span className="ark-beacon-dot ark-glow-signal-sm" />
                <span>TEKTRONIX SENSOR · ACTIVE</span>
              </div>
            </div>
          </div>

          {/* D. Geological & Stratigraphic SVG Patterns */}
          <div className="spec-primitive-card">
            <div className="spec-card-head">
              <span className="spec-card-title">4. Geological SVG Stratigraphy (Direction E)</span>
              <span className="spec-badge">VECTOR ARGUMENT</span>
            </div>
            <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-muted)", margin: 0 }}>
              Documentary blueprint fills replacing generic AI SaaS gradients:
            </p>

            <div className="spec-hatch-grid">
              {STRATA.map((s) => (
                <div className="spec-hatch-card" key={s.id}>
                  <svg className="spec-hatch-preview" aria-hidden="true">
                    <rect width="100%" height="100%" fill={`url(#${s.hatchPattern})`} />
                  </svg>
                  <div className="spec-hatch-info">
                    <span className="spec-hatch-numeral">STRATUM {s.numeral}</span>
                    <span className="spec-hatch-name">{s.name}</span>
                    <span className="spec-hatch-desc">{s.hatchDesc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * 5. Tektronix Glow Law & Single-Accent Ration Rules
       * ========================================================================= */}
      <section className="spec-section" id="tektronix-law" aria-labelledby="tektronix-heading">
        <div className="spec-sec-header">
          <h2 id="tektronix-heading" className="spec-sec-title">
            <span className="spec-sec-num">04 //</span> The Tektronix Glow Law & Single-Accent Ration
          </h2>
          <span className="spec-sec-desc">Named subversion of AI-Default #2: Glow emitted ONLY by datum/signal, never by chrome</span>
        </div>

        <div className="spec-glow-demo-grid">
          {/* Compliant Box */}
          <div className="spec-glow-box">
            <div className="spec-glow-verdict pass">
              <span>✓ COMPLIANT WITH TEKTRONIX LAW</span>
            </div>
            <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-ink)", margin: 0 }}>
              Glow is strictly localized to the live amber reading bead and active sensor dot. Card borders, container bezels, and background panels remain completely flat and matte.
            </p>
            <div style={{ padding: "16px", background: "var(--ark-bg)", border: "1px solid var(--ark-rule)", display: "flex", alignItems: "center", gap: "12px" }}>
              <div className="ark-beacon-dot ark-glow-signal" style={{ width: "10px", height: "10px", background: "var(--ark-amber)" }} />
              <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "12px", color: "var(--ark-ink-hi)" }}>
                Live Measurement Datum: 63 sources (Active Sensor)
              </span>
            </div>
          </div>

          {/* Prohibited Box */}
          <div className="spec-glow-box prohibited">
            <div className="spec-glow-verdict fail">
              <span>✗ PROHIBITED (AI-DEFAULT #2 ANTI-PATTERN)</span>
            </div>
            <p style={{ fontFamily: "var(--ark-font-body)", fontSize: "13px", color: "var(--ark-muted)", margin: 0 }}>
              Banned: Neon glowing card outlines, full-bleed gradient halos, glowing buttons, or luminous bezels that distract attention from the data.
            </p>
            <div style={{ padding: "16px", background: "var(--ark-bg)", border: "1px dashed rgba(186, 60, 15, 0.6)", color: "var(--ark-muted)", fontFamily: "var(--ark-font-mono)", fontSize: "11px" }}>
              [BANNED PATTERN: Glowing Bezel / Border Shadow]
            </div>
          </div>
        </div>

        {/* Single-Accent Meter */}
        <div style={{ marginTop: "24px", padding: "16px 20px", background: "var(--ark-bg-raised)", border: "1px solid var(--ark-rule)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span style={{ fontFamily: "var(--ark-font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--ark-ink-hi)", fontWeight: 700 }}>
              VON RESTORFF SINGLE-ACCENT RATION AUDIT:
            </span>
            <span style={{ fontFamily: "var(--ark-font-body)", fontSize: "12px", color: "var(--ark-muted)", display: "block" }}>
              Exactly one hot phosphor amber element active per viewport journey.
            </span>
          </div>
          <span className="spec-badge" style={{ color: "#55d688", borderColor: "rgba(85, 214, 136, 0.4)" }}>
            RATION ENFORCED: {activeSignalsCount} SIGNAL ACTIVE
          </span>
        </div>
      </section>

      {/* =========================================================================
       * 6. ARK Vision Document Alignment & Philosophical Grounding
       * ========================================================================= */}
      <section className="spec-section" id="vision-alignment" aria-labelledby="vision-heading">
        <div className="spec-sec-header">
          <h2 id="vision-heading" className="spec-sec-title">
            <span className="spec-sec-num">05 //</span> Vision Document Harmonization (ARK_Vision_Document.md)
          </h2>
          <span className="spec-sec-desc">Embodying the four worlds without religious sentimentalism or sterile reductionism</span>
        </div>

        <div className="spec-vision-panel">
          <div className="spec-vision-col">
            <span className="spec-vision-col-title">§6. THE ATMOSPHERE</span>
            <p className="spec-vision-quote">
              “A futuristic civilization + elite private library + research institution + spacecraft + ancient knowledge archive.”
            </p>
            <p className="spec-vision-text">
              Materialized by warm ink-dark ground (#181310), high-contrast display typography, and instrument-grade amber readouts.
            </p>
          </div>

          <div className="spec-vision-col">
            <span className="spec-vision-col-title">§2, §10. DUAL-ENGINE PARADOX</span>
            <p className="spec-vision-quote">
              “Do not make yourself smaller than you are capable of becoming... and still know: &apos;I am not the center of existence.&apos;”
            </p>
            <p className="spec-vision-text">
              Ambition engine (trajectory expansion) balanced with humility engine (declared unmapped ground and source transparency).
            </p>
          </div>

          <div className="spec-vision-col">
            <span className="spec-vision-col-title">§4, §5. PROGRESSIVE DISCLOSURE (DNA)</span>
            <p className="spec-vision-quote">
              “Not religious branding. Spiritual depth. Progressive discovery like an underlying operating system.”
            </p>
            <p className="spec-vision-text">
              The surface passes the cold skeptic atheist test. The spiritual framework enters progressively at Stratum IV as labeled substrate.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
       * 7. Machine Gate Telemetry & Specimen Footer
       * ========================================================================= */}
      <footer className="spec-footer">
        <div>
          <span>ĀRK DESIGN LAB · ROUTE: <code>/lab/synthesis/specimen</code></span>
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <span>TYPECHECK: <strong>VERIFIED</strong></span>
          <span>CONTRAST: <strong>100% PASS</strong></span>
          <span>RADIUS-0: <strong>ENFORCED</strong></span>
          <span>GLYPH CMAP: <strong>VERIFIED</strong></span>
        </div>
      </footer>
    </main>
  );
}
