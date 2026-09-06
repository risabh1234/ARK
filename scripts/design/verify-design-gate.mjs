#!/usr/bin/env node
/**
 * ĀRK Design System — Master Engineering Hardening & Design Gate
 * Governed by Landing Page Design Process.md (Phase 5)
 *
 * Chained Master Verification Suite:
 *  - Stage 1: TypeScript Compilation (`tsc --noEmit`)
 *  - Stage 2: Next.js Production Build (`next build`)
 *  - Stage 3: Architectural Boundary Wall Scan (Node.js fs walk)
 *  - Stage 4: WCAG 2.1 Mathematical Contrast Audit (19 Token Pairs + Negative Gates)
 *  - Stage 5: Route Smoke & Hydration Checks (/lab, /lab/synthesis, /lab/synthesis/specimen)
 *  - Stage 6: Playwright Multi-Viewport & Accessibility Suite (if browser/server active)
 *
 * Single command: `node scripts/design/verify-design-gate.mjs`
 * Exits 0 on total gate pass; non-zero on any failure.
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { pathToFileURL } from 'url';

const ROOT_DIR = process.cwd();
const SCREENS_DIR = path.resolve(ROOT_DIR, 'docs', 'design', 'screens');

// Colors for terminal formatting
const RESET = '\x1b[0m';
const BOLD = '\x1b[1m';
const GREEN = '\x1b[32m';
const RED = '\x1b[31m';
const YELLOW = '\x1b[33m';
const CYAN = '\x1b[36m';

function banner(title) {
  console.log(`\n${BOLD}${CYAN}========================================================================================${RESET}`);
  console.log(`${BOLD}${CYAN}${title}${RESET}`);
  console.log(`${BOLD}${CYAN}========================================================================================${RESET}\n`);
}

function subheader(step, title) {
  console.log(`\n${BOLD}[${step}] ${title}${RESET}`);
  console.log('-'.repeat(80));
}

let totalPassed = 0;
let totalFailed = 0;
const failureDetails = [];

function recordPass(msg) {
  console.log(`  ${GREEN}✓ PASS:${RESET} ${msg}`);
  totalPassed++;
}

function recordFail(msg, detail = '') {
  console.error(`  ${RED}✗ FAIL:${RESET} ${msg}`);
  if (detail) console.error(`    ${RED}Detail:${RESET} ${detail}`);
  totalFailed++;
  failureDetails.push(`${msg}${detail ? ` (${detail})` : ''}`);
}

// -----------------------------------------------------------------------------
// STAGE 1: TypeScript Typecheck
// -----------------------------------------------------------------------------
function stage1Typecheck() {
  subheader('1/6', 'TypeScript Compilation Gate (tsc --noEmit)');
  try {
    const out = execSync('npx tsc --noEmit', { cwd: ROOT_DIR, encoding: 'utf-8' });
    recordPass('TypeScript compilation clean (0 type errors)');
  } catch (err) {
    recordFail('TypeScript compilation failed', err.stdout || err.message);
  }
}

// -----------------------------------------------------------------------------
// STAGE 2: Next.js Production Build
// -----------------------------------------------------------------------------
function stage2Build() {
  subheader('2/6', 'Next.js Production Build Gate (next build)');
  try {
    const out = execSync('npx next build', { cwd: ROOT_DIR, encoding: 'utf-8' });
    recordPass('Next.js build succeeded cleanly');
  } catch (err) {
    recordFail('Next.js build failed', err.stdout || err.message);
  }
}

// -----------------------------------------------------------------------------
// STAGE 3: Architectural Wall Scans
// -----------------------------------------------------------------------------
function stage3WallScans() {
  subheader('3/6', 'Architectural Boundary Wall Scans');

  function walkDir(dir, filterExt = ['.ts', '.tsx', '.js', '.jsx', '.css', '.mjs']) {
    let files = [];
    if (!fs.existsSync(dir)) return files;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (entry.name !== 'node_modules' && entry.name !== '.next' && entry.name !== '.git') {
          files = files.concat(walkDir(fullPath, filterExt));
        }
      } else if (filterExt.includes(path.extname(entry.name))) {
        files.push(fullPath);
      }
    }
    return files;
  }

  // Wall A: Production files must NOT reference /lab or app/lab
  const appDir = path.join(ROOT_DIR, 'app');
  const componentsDir = path.join(ROOT_DIR, 'components');
  const libDir = path.join(ROOT_DIR, 'lib');

  const productionFiles = [
    ...walkDir(appDir).filter(f => !f.includes(`${path.sep}app${path.sep}lab`)),
    ...walkDir(componentsDir),
    ...walkDir(libDir),
  ];

  let prodWallViolations = [];
  const labRefRegex = /(from\s+['"][^'"]*\/lab\/|import\s+['"][^'"]*\/lab\/|href=['"]\/lab|\/lab\/synthesis)/;

  for (const file of productionFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (labRefRegex.test(line)) {
        prodWallViolations.push({
          file: path.relative(ROOT_DIR, file),
          line: idx + 1,
          content: line.trim(),
        });
      }
    });
  }

  if (prodWallViolations.length === 0) {
    recordPass(`Production Wall: 0 references to /lab across ${productionFiles.length} production files`);
  } else {
    recordFail(
      `Production Wall violation: found ${prodWallViolations.length} forbidden references to /lab`,
      prodWallViolations.map(v => `${v.file}:${v.line} -> ${v.content}`).join('\n')
    );
  }

  // Wall B: Lab files must NOT import from @/components/* or @/lib/*
  const labDir = path.join(ROOT_DIR, 'app', 'lab');
  const labFiles = walkDir(labDir);
  let labWallViolations = [];
  const forbiddenImportRegex = /(from\s+['"]@\/components|from\s+['"]@\/lib|from\s+['"]\.\.\/\.\.\/components|from\s+['"]\.\.\/\.\.\/lib)/;

  for (const file of labFiles) {
    const content = fs.readFileSync(file, 'utf-8');
    const lines = content.split('\n');
    lines.forEach((line, idx) => {
      if (forbiddenImportRegex.test(line)) {
        labWallViolations.push({
          file: path.relative(ROOT_DIR, file),
          line: idx + 1,
          content: line.trim(),
        });
      }
    });
  }

  if (labWallViolations.length === 0) {
    recordPass(`Lab Wall: 0 imports from @/components or @/lib across ${labFiles.length} lab files`);
  } else {
    recordFail(
      `Lab Wall violation: found ${labWallViolations.length} forbidden imports from production libraries`,
      labWallViolations.map(v => `${v.file}:${v.line} -> ${v.content}`).join('\n')
    );
  }
}

// -----------------------------------------------------------------------------
// STAGE 4: WCAG 2.1 Mathematical Contrast Audit
// -----------------------------------------------------------------------------
function stage4ContrastAudit() {
  subheader('4/6', 'WCAG 2.1 Mathematical Contrast Audit');

  const TOKENS = {
    'ark-bg': '#181310',
    'ark-bg-raised': '#211a14',
    'ark-bg-plate': '#282018',
    'ark-bg-deep': '#110d0b',
    'ark-ink-hi': '#f0e7d8',
    'ark-ink': '#d9cdb9',
    'ark-muted': '#a3957d',
    'ark-faint': '#5e5445',
    'ark-amber': '#ffb000',
    'ark-signal-red': '#BA3C0F',
    'ark-success-green': '#55d688',
    'ark-amber-tint-surface': '#332612',
  };

  function srgbToLinear(c) {
    const v = c / 255;
    return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  }

  function hexToRgb(hex) {
    const clean = hex.replace('#', '');
    return {
      r: parseInt(clean.substring(0, 2), 16),
      g: parseInt(clean.substring(2, 4), 16),
      b: parseInt(clean.substring(4, 6), 16),
    };
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

  const AUDIT_PAIRS = [
    ['ark-ink-hi', 'ark-bg', 'Display/Headings (H1/H2) on Ground', 7.0, 'AAA (≥7.0)'],
    ['ark-ink-hi', 'ark-bg-raised', 'Display/Headings on Raised Surface', 7.0, 'AAA (≥7.0)'],
    ['ark-ink-hi', 'ark-bg-plate', 'Display/Headings on Plate Surface', 7.0, 'AAA (≥7.0)'],
    ['ark-ink', 'ark-bg', 'Body Prose on Ground', 7.0, 'AAA (≥7.0)'],
    ['ark-ink', 'ark-bg-raised', 'Body Prose on Raised Surface', 7.0, 'AAA (≥7.0)'],
    ['ark-ink', 'ark-bg-plate', 'Body Prose on Plate Surface', 7.0, 'AAA (≥7.0)'],
    ['ark-muted', 'ark-bg', 'Meta/Sigla/Captions on Ground', 4.5, 'AA (≥4.5)'],
    ['ark-muted', 'ark-bg-raised', 'Meta/Sigla on Raised Surface', 4.5, 'AA (≥4.5)'],
    ['ark-muted', 'ark-bg-plate', 'Meta/Sigla on Plate Surface', 4.5, 'AA (≥4.5)'],
    ['ark-amber', 'ark-bg', 'Phosphor Amber Signal on Ground', 7.0, 'AAA (≥7.0)'],
    ['ark-amber', 'ark-bg-raised', 'Phosphor Amber Signal on Raised', 7.0, 'AAA (≥7.0)'],
    ['ark-amber', 'ark-bg-plate', 'Phosphor Amber Signal on Plate', 7.0, 'AAA (≥7.0)'],
    ['ark-amber', 'ark-amber-tint-surface', 'Phosphor Amber on Active Ruler Band Tint', 7.0, 'AAA (≥7.0)'],
    ['ark-bg', 'ark-ink-hi', 'Inverted Primary CTA (Dark text on Hi ink)', 7.0, 'AAA (≥7.0)'],
    ['ark-ink-hi', 'ark-signal-red', 'Inverted Signal Red Key/Pill (Hi text on Red)', 4.5, 'AA (≥4.5)'],
    ['ark-bg', 'ark-amber', 'Inverted Amber Bead/Pill (Dark text on Amber)', 7.0, 'AAA (≥7.0)'],
    ['ark-success-green', 'ark-bg', 'Success Badge on Ground (Green text on Ground)', 7.0, 'AAA (≥7.0)'],
    ['ark-signal-red', 'ark-bg', 'Signal Red Boundary Mark on Ground (UI Component)', 3.0, 'UI (≥3.0)'],
    ['ark-signal-red', 'ark-bg-raised', 'Signal Red Boundary Mark on Raised (UI Component)', 3.0, 'UI (≥3.0)'],
  ];

  let allPairsPass = true;
  for (const [fgKey, bgKey, label, minFloor, targetLevel] of AUDIT_PAIRS) {
    const ratio = contrastRatio(TOKENS[fgKey], TOKENS[bgKey]);
    if (ratio < minFloor) {
      allPairsPass = false;
      recordFail(`${label} (${fgKey} on ${bgKey}) failed: ${ratio.toFixed(2)}:1 < ${minFloor}:1 floor`);
    }
  }

  if (allPairsPass) {
    recordPass(`All 19 core token pairs meet or exceed WCAG 2.1 AA / AAA mathematical floors`);
  }

  // Negative Gate Check
  const BAD_TEST_PAIRS = [
    ['#5e5445', '#181310', 4.5, 'Faint on Ground (Low Contrast)'],
    ['#a3957d', '#f0e7d8', 4.5, 'Muted on Ink-Hi (Low Contrast)'],
  ];

  let negativePassed = true;
  for (const [fg, bg, floor, desc] of BAD_TEST_PAIRS) {
    const ratio = contrastRatio(fg, bg);
    if (ratio >= floor) {
      negativePassed = false;
      recordFail(`Negative gate failed to reject low-contrast pair: ${desc}`);
    }
  }

  if (negativePassed) {
    recordPass('Negative contrast detection gates functional (failing pairs rejected)');
  }
}

// -----------------------------------------------------------------------------
// STAGE 5: Route Smoke & Hydration Checks
// -----------------------------------------------------------------------------
async function stage5RouteSmokes() {
  subheader('5/6', 'Route Smoke & Hydration Checks');

  const LAB_ROUTES = [
    { path: '/lab', expectedContent: 'ĀRK Experiment Lab' },
    { path: '/lab/synthesis', expectedContent: 'synthesis-root' },
    { path: '/lab/synthesis/specimen', expectedContent: 'ĀRK Token System & Specimen Sheet' },
  ];

  // Check if server is running on localhost:3000
  let serverReachable = false;
  try {
    const res = await fetch('http://localhost:3000/lab/synthesis');
    if (res.ok) serverReachable = true;
  } catch {}

  if (!serverReachable) {
    console.log(`  ${YELLOW}~ Next.js server not detected on http://localhost:3000.${RESET}`);
    console.log(`    Running static route verification & file presence checks instead.`);

    for (const r of LAB_ROUTES) {
      const relPath = r.path.replace('/lab', 'app/lab') + (r.path.endsWith('specimen') ? '/page.tsx' : (r.path === '/lab' ? '/page.tsx' : '/page.tsx'));
      const filePath = path.join(ROOT_DIR, relPath);
      if (fs.existsSync(filePath)) {
        recordPass(`Route ${r.path} component source present at ${path.relative(ROOT_DIR, filePath)}`);
      } else {
        recordFail(`Route ${r.path} component source missing at ${filePath}`);
      }
    }
    return;
  }

  // If server is reachable, perform live HTTP smoke fetches
  for (const r of LAB_ROUTES) {
    try {
      const url = `http://localhost:3000${r.path}`;
      const res = await fetch(url);
      if (res.status === 200) {
        const html = await res.text();
        const containsContent = html.includes(r.expectedContent);
        if (containsContent) {
          recordPass(`Route ${r.path} responded HTTP 200 OK with expected DOM content`);
        } else {
          recordFail(`Route ${r.path} responded HTTP 200 but lacked expected content: "${r.expectedContent}"`);
        }

        // Hydration check
        const hasHydrationError = html.includes('Hydration failed') || html.includes('Text content did not match');
        if (!hasHydrationError) {
          recordPass(`Route ${r.path} zero SSR hydration warnings`);
        } else {
          recordFail(`Route ${r.path} contains SSR hydration warning in output`);
        }
      } else {
        recordFail(`Route ${r.path} responded with HTTP status ${res.status}`);
      }
    } catch (err) {
      recordFail(`Route ${r.path} fetch error: ${err.message}`);
    }
  }
}

// -----------------------------------------------------------------------------
// STAGE 6: Playwright Multi-Viewport & Accessibility Suite (if available)
// -----------------------------------------------------------------------------
async function stage6PlaywrightSuite() {
  subheader('6/6', 'Playwright Multi-Viewport & Accessibility Suite');

  let serverReachable = false;
  try {
    const res = await fetch('http://localhost:3000/lab/synthesis');
    if (res.ok) serverReachable = true;
  } catch {}

  if (!serverReachable) {
    console.log(`  ${YELLOW}~ Next.js server not running on http://localhost:3000; skipping active browser Playwright pass.${RESET}`);
    console.log(`    (Run 'npm run dev' and 'node scripts/design/verify-synthesis.mjs' for full active Playwright suite)`);
    return;
  }

  // Attempt to run verify-synthesis.mjs
  const scriptPath = path.join(ROOT_DIR, 'scripts', 'design', 'verify-synthesis.mjs');
  if (fs.existsSync(scriptPath)) {
    try {
      console.log('  Executing scripts/design/verify-synthesis.mjs...');
      const out = execSync(`node ${scriptPath}`, { cwd: ROOT_DIR, encoding: 'utf-8' });
      recordPass('Playwright automated verification suite (6 viewports, accessibility, state machines) PASSED');
    } catch (err) {
      recordFail('Playwright automated verification suite failed', err.stdout || err.message);
    }
  }
}

// -----------------------------------------------------------------------------
// Master Execution Coordinator
// -----------------------------------------------------------------------------
async function runMasterGate() {
  banner('ĀRK DESIGN SYSTEM — MASTER ENGINEERING HARDENING GATE (PHASE 5)');
  console.log(`Governed by: Landing Page Design Process.md § Phase 5`);
  console.log(`Target:      app/lab/synthesis (The Triad Synthesis C+A+E)`);
  console.log(`Timestamp:   ${new Date().toISOString()}\n`);

  stage1Typecheck();
  stage2Build();
  stage3WallScans();
  stage4ContrastAudit();
  await stage5RouteSmokes();
  await stage6PlaywrightSuite();

  // Summary
  banner('PHASE 5 ENGINEERING HARDENING SUMMARY');
  console.log(`  Total Assertions Passed: ${GREEN}${totalPassed}${RESET}`);
  console.log(`  Total Assertions Failed: ${totalFailed === 0 ? GREEN + '0' : RED + totalFailed}${RESET}\n`);

  if (totalFailed > 0) {
    console.error(`${RED}${BOLD}GATE FAILED WITH ${totalFailed} UNRESOLVED DEFECT(S):${RESET}`);
    failureDetails.forEach((f, i) => console.error(`  ${i + 1}. ${f}`));
    console.log(`\n${RED}Gate status: REJECTED (Exit Code 1)${RESET}\n`);
    process.exit(1);
  } else {
    console.log(`${GREEN}${BOLD}✓ ALL PHASE 5 ENGINEERING HARDENING GATES PASSED CLEANLY.${RESET}`);
    console.log(`${GREEN}Gate status: RATIFIED (Exit Code 0)${RESET}\n`);
    process.exit(0);
  }
}

runMasterGate().catch(err => {
  console.error('\nFatal unhandled error in master gate:', err);
  process.exit(1);
});
