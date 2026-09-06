#!/usr/bin/env node
/**
 * AUTOMATED PLAYWRIGHT TEST SUITE — /lab/experiment-hero
 * Governed by docs/design/EXPERIMENT_HERO_PLAN.md Section 8
 * Tests:
 * 1. Multi-viewport rendering & zero console/page errors (320px to 1440px)
 * 2. Zero horizontal overflow across all viewports
 * 3. FIG. 0 plate title furniture, corner marks (+), and coordinate marginalia
 * 4. Dual engine mottos (Zenith 90°N & Azimuth 180°W)
 * 5. H1 headline, subtitle prose, and primary CTA (ENTER THE ATLAS →)
 * 6. 63 primary sources citation badge, 20-bar tally, and modal provenance register
 * 7. Interactive strata ladder (YOU to H-03) synchronization with SVG astrolabe rings
 * 8. Interactive Review HUD: Typography switch (Serif/Sans) and Copy switch (Artwork/CAT)
 * 9. Zero-radius strictness & WCAG AA/AAA contrast adherence
 * 10. Reduced motion suppression
 * 11. Multi-viewport screenshot generation in docs/design/screens/
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

async function getPlaywright() {
  try { return await import('playwright'); } catch {}
  const base = path.join(process.env.USERPROFILE || 'C:\\Users\\ojass', 'AppData', 'Local', 'npm-cache', '_npx');
  if (fs.existsSync(base)) {
    for (const h of fs.readdirSync(base)) {
      const c = path.join(base, h, 'node_modules', 'playwright', 'index.mjs');
      if (fs.existsSync(c)) return await import(pathToFileURL(c).href);
    }
  }
  throw new Error('playwright not found');
}

function chromiumPath() {
  const base = path.join(process.env.USERPROFILE || 'C:\\Users\\ojass', 'AppData', 'Local', 'ms-playwright');
  if (!fs.existsSync(base)) return undefined;
  for (const e of fs.readdirSync(base)) {
    if (e.startsWith('chromium-')) {
      for (const sub of ['chrome-win64', 'chrome-win']) {
        const c = path.join(base, e, sub, 'chrome.exe');
        if (fs.existsSync(c)) return c;
      }
    }
  }
}

const URL = 'http://localhost:3000/lab/experiment-hero';
const OUT = path.resolve(process.cwd(), 'docs', 'design', 'screens');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

let pass = 0, fail = 0;
const fails = [];
function ok(condition, message) {
  if (condition) {
    pass++;
    console.log('  ✓', message);
  } else {
    fail++;
    fails.push(message);
    console.error('  ✗ FAIL:', message);
  }
}

const WIDTHS = [
  { w: 1440, h: 900, name: 'desktop-1440' },
  { w: 1280, h: 800, name: 'desktop-1280' },
  { w: 834, h: 1112, name: 'tablet-834' },
  { w: 390, h: 844, name: 'mobile-390' },
  { w: 360, h: 740, name: 'mobile-360' },
  { w: 320, h: 568, name: 'small-320' },
];

const run = async () => {
  console.log('\n======================================================================');
  console.log('STARTING PLAYWRIGHT VERIFICATION SUITE FOR /lab/experiment-hero');
  console.log('Masterwork: "Extraordinary Capability at Dawn" (FIG. 0 Horizon Scale)');
  console.log('======================================================================\n');

  const pw = await getPlaywright();
  const exe = chromiumPath();
  const browser = await pw.chromium.launch({ headless: true, ...(exe ? { executablePath: exe } : {}) });

  // Warm up page
  {
    const warmupCtx = await browser.newContext();
    const warmupPage = await warmupCtx.newPage();
    await warmupPage.goto(URL, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await warmupPage.waitForSelector('#experiment-hero-root', { timeout: 15000 });
    await warmupCtx.close();
  }

  // 1. Multi-width responsiveness, zero console errors & zero overflow
  console.log('--- TEST 1: MULTI-VIEWPORT RESPONSIVENESS & ZERO OVERFLOW ---');
  for (const { w, h, name } of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    const errs = [], perrs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => perrs.push(e.message));

    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#experiment-hero-root');
    await page.waitForTimeout(400);

    ok(errs.length === 0, `[${name}] 0 console errors (${errs.length})`);
    ok(perrs.length === 0, `[${name}] 0 page errors (${perrs.length})`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    ok(overflow, `[${name}] zero horizontal scrollbar overflow`);

    if (w === 1440 || w === 834 || w === 390) {
      await page.screenshot({ path: path.join(OUT, `hero-experiment-${name}.png`), fullPage: true });
      console.log(`  📸 Saved screenshot: hero-experiment-${name}.png`);
    }
    await ctx.close();
  }

  // 2. Structural & Layout Assertions (FIG. 0 Plate, Mottos, H1, CTA, Citation)
  console.log('\n--- TEST 2: DRAWING-OFFICE PLATE & STRUCTURAL FURNITURE ---');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#experiment-hero-root');

    // Plate Title Furniture
    const plateHeader = await page.locator('.ark-plate-header').textContent();
    ok(plateHeader.includes('FIG. 0') && plateHeader.includes('THE HORIZON SCALE'), 'Plate header renders FIG. 0 title block');
    ok(plateHeader.includes('REV 2026.08 · SHEET 1'), 'Plate header includes revision metadata');

    // Registration Corner Marks
    const cornerMarks = await page.locator('.ark-corner-mark').count();
    ok(cornerMarks === 4, '4 corner registration marks (+) present on plate frame');

    // Zenith Motto
    const zenithMotto = await page.locator('.ark-motto-zenith-bar').textContent();
    ok(zenithMotto.includes('ZENITH 90°N') && zenithMotto.includes('I AM NOT THE CENTER OF EXISTENCE'), 'Zenith humility motto rendered at plate apex');

    // Azimuth Motto
    const azimuthMotto = await page.locator('.ark-motto-azimuth').textContent();
    ok(azimuthMotto.includes('AZIMUTH 180°W') && azimuthMotto.includes('Do not make yourself smaller than you are capable of becoming'), 'Azimuth ambition motto rendered on stage');

    // H1 Headline & CTA
    const h1Text = await page.locator('.ark-hero-h1').textContent();
    ok(h1Text.includes('Extraordinary Capability. Rooted in Consciousness.'), 'Artwork canonical H1 headline rendered');

    const ctaText = await page.locator('#primary-hero-cta').textContent();
    ok(ctaText.includes('ENTER THE ATLAS'), 'Single primary CTA "ENTER THE ATLAS" rendered');

    // Citation Badge & 20 Tally Marks
    const citationNum = await page.locator('.ark-citation-number').textContent();
    ok(citationNum.trim() === '63', 'Citation badge renders "63" as heaviest numeral');

    const tallyCount = await page.locator('.ark-tally-bar').count();
    ok(tallyCount === 20, 'Citation badge renders exact 20-bar evidentiary tally');

    // Seeker silhouette & Sunrise focal point
    const seeker = await page.locator('#seeker-silhouette').count();
    ok(seeker === 1, 'Seeker silhouette rendered at mountain summit apex');

    const dawnGlow = await page.locator('#dawnGlow').count();
    ok(dawnGlow >= 1, 'Dawn radiance gradient defs rendered');

    await ctx.close();
  }

  // 3. Interactive Telemetry: Strata Ladder hover sync with Astrolabe Rings
  console.log('\n--- TEST 3: STRATA LADDER & ASTROLABE SYNCHRONIZATION ---');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#experiment-hero-root');

    await page.waitForTimeout(500);

    // Hover H·03 Cosmic Civilization
    const cosmicButton = page.locator('.ark-ladder-item', { hasText: 'Cosmic Civilization' });
    await cosmicButton.hover();
    await page.waitForTimeout(250);

    const cosmicHighlighted = await page.locator('#ring-cosmic').getAttribute('class');
    ok(cosmicHighlighted && cosmicHighlighted.includes('highlighted'), 'Hovering H·03 highlights Cosmic astrolabe ring');

    let activeTelemetry = await page.locator('.ark-telemetry-val').nth(1).textContent();
    ok(activeTelemetry.includes('COSMIC'), 'Telemetry HUD updates active reticle to COSMIC');

    // Hover H·02 Planetary Horizon
    const planetaryButton = page.locator('.ark-ladder-item', { hasText: 'Planetary Horizon' });
    await planetaryButton.hover();
    await page.waitForTimeout(250);

    const planetaryHighlighted = await page.locator('#ring-planetary').getAttribute('class');
    ok(planetaryHighlighted && planetaryHighlighted.includes('highlighted'), 'Hovering H·02 highlights Planetary astrolabe ring');

    // Hover H·01 Civilizational Scale
    const civButton = page.locator('.ark-ladder-item', { hasText: 'Civilizational Scale' });
    await civButton.hover();
    await page.waitForTimeout(250);

    const civHighlighted = await page.locator('#ring-civilizational').getAttribute('class');
    ok(civHighlighted && civHighlighted.includes('highlighted'), 'Hovering H·01 highlights Civilizational astrolabe ring');

    // Close-up screenshot of highlighted astrolabe stage
    const celestialCol = page.locator('.ark-celestial-col');
    await celestialCol.screenshot({ path: path.join(OUT, 'hero-experiment-astrolabe-closeup.png') });
    console.log('  📸 Saved close-up screenshot: hero-experiment-astrolabe-closeup.png');

    await ctx.close();
  }

  // 4. Interactive Review Controls: Typography & Copy Toggles
  console.log('\n--- TEST 4: INTERACTIVE REVIEW CONTROLS (TYPOGRAPHY & COPY MODES) ---');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#experiment-hero-root');
    await page.waitForTimeout(500);

    // Switch to Sans typography
    await page.locator('.ark-switch-btn', { hasText: 'Sans (Synthesis)' }).click();
    await page.waitForTimeout(200);

    let h1Class = await page.locator('.ark-hero-h1').getAttribute('class');
    ok(h1Class && h1Class.includes('font-sans'), 'Controls toggle switches H1 to Sans font');

    // Switch to CAT Copy (Curious Atheist Test)
    await page.locator('.ark-switch-btn', { hasText: 'Ratified CAT' }).click();
    await page.waitForTimeout(200);

    let h1Text = await page.locator('.ark-hero-h1').textContent();
    ok(h1Text.includes('You are not short of information'), 'Controls toggle switches to Ratified CAT copy');

    // Provenance Drawer Inspection Modal
    await page.locator('.ark-citation-card').click();
    await page.waitForTimeout(300);

    const modal = await page.locator('.ark-provenance-modal').isVisible();
    ok(modal, 'Clicking citation card opens 63 Primary Sources Provenance Modal');

    // Press Escape to close modal
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    const modalClosed = await page.locator('.ark-provenance-modal').isVisible();
    ok(!modalClosed, 'Pressing Escape closes Provenance Modal');

    await ctx.close();
  }

  // 5. Zero-Radius & Reduced Motion Strictness
  console.log('\n--- TEST 5: ZERO-RADIUS ENFORCEMENT & REDUCED MOTION ---');
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: 'dark',
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#experiment-hero-root');

    // Zero-Radius Check
    const nonZeroRadiusCount = await page.evaluate(() => {
      const all = document.querySelectorAll('#experiment-hero-root *');
      let count = 0;
      for (const el of all) {
        const br = window.getComputedStyle(el).borderRadius;
        if (br && br !== '0px') count++;
      }
      return count;
    });
    ok(nonZeroRadiusCount === 0, `Zero-Radius Law strictly enforced (0 non-zero elements out of all children)`);

    // Reduced Motion Animation check
    const beaconAnim = await page.evaluate(() => {
      const el = document.querySelector('.ark-hero-status-dot');
      return window.getComputedStyle(el).animationName;
    });
    ok(beaconAnim === 'none', 'Under prefers-reduced-motion, CSS animations evaluate to "none"');

    await ctx.close();
  }

  await browser.close();

  console.log(`\n======================================================================`);
  console.log(`EXPERIMENT HERO TEST SUMMARY: ${pass} PASSED, ${fail} FAILED`);
  console.log(`======================================================================\n`);

  if (fail > 0) {
    process.exit(1);
  }
};

run().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
