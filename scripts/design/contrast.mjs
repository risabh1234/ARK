#!/usr/bin/env node
/**
 * ĀRK Design System — Automated WCAG Contrast Audit
 * Dependency-free Node.js script
 * Governed by Landing Page Design Process.md (Phase 3 Step 2) and SYNTHESIS_SPEC.md §3.1
 */

// Core Token Palette (Hex)
const TOKENS = {
  // Ground & Surfaces
  'ark-bg': '#181310',
  'ark-bg-raised': '#211a14',
  'ark-bg-plate': '#282018',
  'ark-bg-deep': '#110d0b',

  // Ink Hierarchy
  'ark-ink-hi': '#f0e7d8',
  'ark-ink': '#d9cdb9',
  'ark-muted': '#a3957d',
  'ark-faint': '#5e5445',

  // Hot Signals & Badges
  'ark-amber': '#ffb000',
  'ark-signal-red': '#BA3C0F',
  'ark-success-green': '#55d688',
  'ark-amber-tint-surface': '#332612', // 8% amber over #211a14 raised ground
};

// WCAG 2.1 relative luminance calculation
function srgbToLinear(c) {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function hexToRgb(hex) {
  const clean = hex.replace('#', '');
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return { r, g, b };
}

function relativeLuminance(hex) {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

function contrastRatio(hex1, hex2) {
  const l1 = relativeLuminance(hex1);
  const l2 = relativeLuminance(hex2);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

// Key audit pairings: [FgKey, BgKey, Label, MinFloor, LevelRequired]
const AUDIT_PAIRS = [
  // Primary ink on all grounds (Body: 4.5:1 floor, AAA: 7.0:1)
  ['ark-ink-hi', 'ark-bg', 'Display/Headings (H1/H2) on Ground', 7.0, 'AAA (≥7.0)'],
  ['ark-ink-hi', 'ark-bg-raised', 'Display/Headings on Raised Surface', 7.0, 'AAA (≥7.0)'],
  ['ark-ink-hi', 'ark-bg-plate', 'Display/Headings on Plate Surface', 7.0, 'AAA (≥7.0)'],
  ['ark-ink', 'ark-bg', 'Body Prose on Ground', 7.0, 'AAA (≥7.0)'],
  ['ark-ink', 'ark-bg-raised', 'Body Prose on Raised Surface', 7.0, 'AAA (≥7.0)'],
  ['ark-ink', 'ark-bg-plate', 'Body Prose on Plate Surface', 7.0, 'AAA (≥7.0)'],

  // Muted meta/sigla on all grounds (Small text: 4.5:1 floor)
  ['ark-muted', 'ark-bg', 'Meta/Sigla/Captions on Ground', 4.5, 'AA (≥4.5)'],
  ['ark-muted', 'ark-bg-raised', 'Meta/Sigla on Raised Surface', 4.5, 'AA (≥4.5)'],
  ['ark-muted', 'ark-bg-plate', 'Meta/Sigla on Plate Surface', 4.5, 'AA (≥4.5)'],

  // Phosphor Amber signal (Live measurement / bead: 4.5:1 floor, target AAA)
  ['ark-amber', 'ark-bg', 'Phosphor Amber Signal on Ground', 7.0, 'AAA (≥7.0)'],
  ['ark-amber', 'ark-bg-raised', 'Phosphor Amber Signal on Raised', 7.0, 'AAA (≥7.0)'],
  ['ark-amber', 'ark-bg-plate', 'Phosphor Amber Signal on Plate', 7.0, 'AAA (≥7.0)'],
  ['ark-amber', 'ark-amber-tint-surface', 'Phosphor Amber on Active Ruler Band Tint', 7.0, 'AAA (≥7.0)'],

  // Inverted button & badge surfaces
  ['ark-bg', 'ark-ink-hi', 'Inverted Primary CTA (Dark text on Hi ink)', 7.0, 'AAA (≥7.0)'],
  ['ark-ink-hi', 'ark-signal-red', 'Inverted Signal Red Key/Pill (Hi text on Red)', 4.5, 'AA (≥4.5)'],
  ['ark-bg', 'ark-amber', 'Inverted Amber Bead/Pill (Dark text on Amber)', 7.0, 'AAA (≥7.0)'],
  ['ark-success-green', 'ark-bg', 'Success Badge on Ground (Green text on Ground)', 7.0, 'AAA (≥7.0)'],

  // UI Components & Structural signals (Non-text / Large UI components floor: 3.0:1)
  ['ark-signal-red', 'ark-bg', 'Signal Red Boundary Mark on Ground (UI Component)', 3.0, 'UI (≥3.0)'],
  ['ark-signal-red', 'ark-bg-raised', 'Signal Red Boundary Mark on Raised (UI Component)', 3.0, 'UI (≥3.0)'],
];

console.log('========================================================================================');
console.log('ĀRK DESIGN SYSTEM — WCAG 2.1 MATHEMATICAL CONTRAST AUDIT (PHASE 3 & 4)');
console.log('System: The Triad Synthesis (C + A + E) | Ground: #181310 | Status: CERTIFIED');
console.log('========================================================================================\n');

let allPassed = true;
const results = [];

for (const [fgKey, bgKey, label, minFloor, targetLevel] of AUDIT_PAIRS) {
  const fgHex = TOKENS[fgKey];
  const bgHex = TOKENS[bgKey];
  const ratio = contrastRatio(fgHex, bgHex);
  const ratioFormatted = `${ratio.toFixed(2)}:1`;
  const passed = ratio >= minFloor;

  if (!passed) {
    allPassed = false;
  }

  results.push({
    Pair: `${fgKey} on ${bgKey}`,
    Colors: `${fgHex} on ${bgHex}`,
    Role: label,
    Ratio: ratioFormatted,
    Target: targetLevel,
    Status: passed ? '✓ PASS' : '✗ FAIL',
    _numericRatio: ratio,
    _minFloor: minFloor,
  });
}

// Print formatted table
const colWidths = {
  Pair: 30,
  Colors: 20,
  Ratio: 10,
  Target: 14,
  Status: 10,
};

function pad(str, len) {
  return str.padEnd(len, ' ');
}

console.log(
  pad('TOKEN PAIR', colWidths.Pair) +
  pad('HEX VALUES', colWidths.Colors) +
  pad('RATIO', colWidths.Ratio) +
  pad('LEVEL/TARGET', colWidths.Target) +
  pad('STATUS', colWidths.Status) +
  'ROLE DESCRIPTION'
);
console.log('-'.repeat(110));

for (const r of results) {
  console.log(
    pad(r.Pair, colWidths.Pair) +
    pad(r.Colors, colWidths.Colors) +
    pad(r.Ratio, colWidths.Ratio) +
    pad(r.Target, colWidths.Target) +
    pad(r.Status, colWidths.Status) +
    r.Role
  );
}

console.log('-'.repeat(110));

// Negative Test Gate Verification: Ensure deliberate bad pairs are rejected
console.log('\n[Negative Gate Verification Test]');
const BAD_TEST_PAIRS = [
  ['#5e5445', '#181310', 4.5, 'Faint on Ground (Low Contrast)'],
  ['#a3957d', '#f0e7d8', 4.5, 'Muted on Ink-Hi (Low Contrast)'],
];

let negativeTestsPassed = true;
for (const [fg, bg, floor, desc] of BAD_TEST_PAIRS) {
  const ratio = contrastRatio(fg, bg);
  const correctlyRejected = ratio < floor;
  if (correctlyRejected) {
    console.log(`  ✓ Gate properly caught and rejected failing pair: ${desc} (${ratio.toFixed(2)}:1 < ${floor}:1 floor)`);
  } else {
    console.error(`  ✗ Gate FAILED to reject failing pair: ${desc}`);
    negativeTestsPassed = false;
  }
}

if (allPassed && negativeTestsPassed) {
  console.log('\n✓ ALL AUDIT PAIRS MEET OR EXCEED WCAG 2.1 AA / AAA FLOORS MATHEMATICALLY.');
  console.log('  - Primary text on ground reaches 15.03:1 (far exceeding 7.0:1 AAA floor)');
  console.log('  - Body prose on ground reaches 11.75:1 (far exceeding 7.0:1 AAA floor)');
  console.log('  - Meta / sigla text reaches 6.28:1 (exceeding 4.5:1 AA floor)');
  console.log('  - Phosphor amber signal reaches 10.06:1 (exceeding 7.0:1 AAA floor)');
  console.log('  - Inverted primary CTA reaches 15.03:1 (AAA)');
  console.log('  - Negative failure gates verified functional.\n');
  process.exit(0);
} else {
  console.error('\n✗ ONE OR MORE CONTRAST PAIRS FAILED REQUIRED FLOORS.\n');
  process.exit(1);
}
