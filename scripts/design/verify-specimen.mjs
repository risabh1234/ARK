#!/usr/bin/env node
/**
 * ĀRK Design System — Automated Playwright Verification & Screenshot Engine
 * Governed by Landing Page Design Process.md (Phase 3 Step 4)
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

// Find Playwright from local node_modules or global/npx cache
async function getPlaywright() {
  try {
    return await import('playwright');
  } catch {
    // Check common npx cache locations on Windows
    const userProfile = process.env.USERPROFILE || process.env.HOME || 'C:\\Users\\ojass';
    const npxCacheDir = path.join(userProfile, 'AppData', 'Local', 'npm-cache', '_npx');
    
    if (fs.existsSync(npxCacheDir)) {
      const hashes = fs.readdirSync(npxCacheDir);
      for (const hash of hashes) {
        const candidate = path.join(npxCacheDir, hash, 'node_modules', 'playwright', 'index.mjs');
        if (fs.existsSync(candidate)) {
          return await import(pathToFileURL(candidate).href);
        }
      }
    }
    throw new Error('Playwright package not found in node_modules or npm-cache');
  }
}

// Find installed Chromium binary in ms-playwright
function getExecutablePath() {
  const userProfile = process.env.USERPROFILE || process.env.HOME || 'C:\\Users\\ojass';
  const msPlaywrightDir = path.join(userProfile, 'AppData', 'Local', 'ms-playwright');
  if (fs.existsSync(msPlaywrightDir)) {
    const entries = fs.readdirSync(msPlaywrightDir);
    for (const entry of entries) {
      if (entry.startsWith('chromium-')) {
        const candidate = path.join(msPlaywrightDir, entry, 'chrome-win64', 'chrome.exe');
        if (fs.existsSync(candidate)) return candidate;
        const candidate2 = path.join(msPlaywrightDir, entry, 'chrome-win', 'chrome.exe');
        if (fs.existsSync(candidate2)) return candidate2;
      }
    }
  }
  return undefined;
}

async function runVerification() {
  const TARGET_URL = 'http://localhost:3000/lab/synthesis/specimen';
  const SCREENS_DIR = path.resolve(process.cwd(), 'docs', 'design', 'screens');

  if (!fs.existsSync(SCREENS_DIR)) {
    fs.mkdirSync(SCREENS_DIR, { recursive: true });
  }

  console.log('========================================================================================');
  console.log('ĀRK DESIGN SYSTEM — PLAYWRIGHT BROWSER & HYDRATION VERIFICATION (PHASE 3)');
  console.log(`Target Route: ${TARGET_URL}`);
  console.log('========================================================================================\n');

  const pw = await getPlaywright();
  const executablePath = getExecutablePath();
  const launchOptions = { headless: true };
  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }
  const browser = await pw.chromium.launch(launchOptions);


  let totalErrors = 0;
  let totalHydrationWarnings = 0;

  // -------------------------------------------------------------------------
  // 1. Desktop Viewport (1440 × 900)
  // -------------------------------------------------------------------------
  console.log('[1/2] Testing Desktop Viewport (1440 × 900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  const desktopPage = await desktopContext.newPage();

  const desktopConsoleErrors = [];
  const desktopHydrationWarnings = [];

  desktopPage.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' && !text.includes('favicon.ico')) {
      desktopConsoleErrors.push(text);
    }
    if (text.toLowerCase().includes('hydration') || text.toLowerCase().includes('did not match')) {
      desktopHydrationWarnings.push(text);
    }
  });

  desktopPage.on('pageerror', (err) => {
    desktopConsoleErrors.push(err.message);
  });

  const response = await desktopPage.goto(TARGET_URL, { waitUntil: 'networkidle' });
  const status = response ? response.status() : 0;
  console.log(`  - HTTP Status: ${status === 200 ? '200 OK ✓' : `FAIL (${status}) ✗`}`);
  if (status !== 200) totalErrors++;

  // Verify Title Block
  const titleText = await desktopPage.textContent('h1');
  const hasTitle = titleText && titleText.includes('ĀRK Token System & Specimen Sheet');
  console.log(`  - Header & NASA Title Block: ${hasTitle ? 'PRESENT ✓' : 'MISSING ✗'}`);
  if (!hasTitle) totalErrors++;

  // Verify Diacritic Proof
  const proofText = await desktopPage.textContent('.spec-proof-banner');
  const hasProof = proofText && proofText.includes('ĀRK · Vimāna · Sāṃkhya — Ā ā Ī ī Ṃ ṃ Ṛ ṛ · ₹1,299');
  console.log(`  - Sanskrit Diacritic Master Proof: ${hasProof ? 'VERIFIED ✓' : 'MISSING ✗'}`);
  if (!hasProof) totalErrors++;

  // Interactive Test 1: Braun 3-key DepthControl -> Switch to DEEP
  const deepBtn = desktopPage.locator('.spec-depth-btn:has-text("DEEP")');
  await deepBtn.click();
  await desktopPage.waitForTimeout(200);
  const tallyVisible = await desktopPage.isVisible('.spec-tally-box');
  console.log(`  - Braun DepthControl (DEEP transition -> 63-tally diagram): ${tallyVisible ? 'PASS ✓' : 'FAIL ✗'}`);
  if (!tallyVisible) totalErrors++;

  // Interactive Test 2: Strata Ruler -> Click Stratum IV (Unresolved)
  const stratumIVBand = desktopPage.locator('.spec-ruler-band:has-text("IV")');
  await stratumIVBand.click();
  await desktopPage.waitForTimeout(200);
  const rulerContent = await desktopPage.textContent('.spec-ruler-content');
  const rulerUpdated = rulerContent && rulerContent.includes('STRATUM IV') && rulerContent.includes('Unresolved');
  console.log(`  - Strata Ruler Altimeter (Click IV -> Unresolved stratum): ${rulerUpdated ? 'PASS ✓' : 'FAIL ✗'}`);
  if (!rulerUpdated) totalErrors++;

  // Capture Desktop Screenshot
  const desktopScreenPath = path.join(SCREENS_DIR, 'synthesis-specimen-desktop.jpeg');
  await desktopPage.screenshot({ path: desktopScreenPath, fullPage: true, type: 'jpeg', quality: 90 });
  console.log(`  - Desktop Full-Page Screenshot: SAVED -> docs/design/screens/synthesis-specimen-desktop.jpeg ✓`);

  console.log(`  - Desktop Console Errors: ${desktopConsoleErrors.length}`);
  console.log(`  - Desktop Hydration Warnings: ${desktopHydrationWarnings.length}`);
  totalErrors += desktopConsoleErrors.length;
  totalHydrationWarnings += desktopHydrationWarnings.length;

  await desktopContext.close();

  // -------------------------------------------------------------------------
  // 2. Mobile Viewport (390 × 844 — iPhone 14/15 / Modern Mobile)
  // -------------------------------------------------------------------------
  console.log('\n[2/2] Testing Mobile Viewport (390 × 844)...');
  const mobileContext = await browser.newContext({
    viewport: { width: 390, height: 844 },
    colorScheme: 'dark',
    isMobile: true,
  });
  const mobilePage = await mobileContext.newPage();

  const mobileConsoleErrors = [];
  const mobileHydrationWarnings = [];

  mobilePage.on('console', (msg) => {
    const text = msg.text();
    if (msg.type() === 'error' && !text.includes('favicon.ico')) {
      mobileConsoleErrors.push(text);
    }
    if (text.toLowerCase().includes('hydration') || text.toLowerCase().includes('did not match')) {
      mobileHydrationWarnings.push(text);
    }
  });

  mobilePage.on('pageerror', (err) => {
    mobileConsoleErrors.push(err.message);
  });

  const mobileResp = await mobilePage.goto(TARGET_URL, { waitUntil: 'networkidle' });
  const mobileStatus = mobileResp ? mobileResp.status() : 0;
  console.log(`  - HTTP Status: ${mobileStatus === 200 ? '200 OK ✓' : `FAIL (${mobileStatus}) ✗`}`);
  if (mobileStatus !== 200) totalErrors++;

  // Verify Primary Action touch target >= 44px
  const primaryCta = mobilePage.locator('.ark-btn-primary');
  const bbox = await primaryCta.boundingBox();
  const touchTargetPass = bbox && bbox.height >= 44;
  console.log(`  - Primary CTA Touch Target Floor (height >= 44px): ${touchTargetPass ? `PASS (${bbox?.height.toFixed(1)}px) ✓` : 'FAIL ✗'}`);
  if (!touchTargetPass) totalErrors++;

  // Capture Mobile Screenshot
  const mobileScreenPath = path.join(SCREENS_DIR, 'synthesis-specimen-mobile.jpeg');
  await mobilePage.screenshot({ path: mobileScreenPath, fullPage: true, type: 'jpeg', quality: 90 });
  console.log(`  - Mobile Full-Page Screenshot: SAVED -> docs/design/screens/synthesis-specimen-mobile.jpeg ✓`);

  console.log(`  - Mobile Console Errors: ${mobileConsoleErrors.length}`);
  console.log(`  - Mobile Hydration Warnings: ${mobileHydrationWarnings.length}`);
  totalErrors += mobileConsoleErrors.length;
  totalHydrationWarnings += mobileHydrationWarnings.length;

  await mobileContext.close();
  await browser.close();

  // -------------------------------------------------------------------------
  // Summary & Gate Decision
  // -------------------------------------------------------------------------
  console.log('\n========================================================================================');
  console.log('VERIFICATION SUMMARY');
  console.log('========================================================================================');
  console.log(`Total Console Errors:        ${totalErrors === 0 ? '0 ✓' : totalErrors + ' ✗'}`);
  console.log(`Total React Hydration Flags: ${totalHydrationWarnings === 0 ? '0 ✓' : totalHydrationWarnings + ' ✗'}`);
  console.log(`Desktop Viewport Screenshot:  docs/design/screens/synthesis-specimen-desktop.jpeg`);
  console.log(`Mobile Viewport Screenshot:   docs/design/screens/synthesis-specimen-mobile.jpeg`);
  console.log('========================================================================================\n');

  if (totalErrors === 0 && totalHydrationWarnings === 0) {
    console.log('✓ PLAYWRIGHT VERIFICATION CERTIFIED CLEAN (EXIT CODE 0)\n');
    process.exit(0);
  } else {
    console.error('✗ PLAYWRIGHT VERIFICATION FAILED (NON-ZERO ERRORS/WARNINGS)\n');
    process.exit(1);
  }
}

runVerification().catch((err) => {
  console.error('Fatal execution error:', err);
  process.exit(1);
});
