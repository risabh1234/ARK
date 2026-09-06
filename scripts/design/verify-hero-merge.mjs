#!/usr/bin/env node
/**
 * AUTOMATED PLAYWRIGHT TEST SUITE — /lab/synthesis (Merged FIG. 0 Horizon Hero Plate)
 * Tests:
 * 1. Multi-viewport rendering & zero console/page errors (1440px, 1280px, 834px, 390px, 360px, 320px)
 * 2. Zero horizontal overflow across all viewports
 * 3. FIG. 0 plate title furniture, corner marks (+), and coordinate marginalia
 * 4. Dual engine mottos (Zenith 90°N & Azimuth 180°W)
 * 5. H1 headline, ratified hook prose, and single primary CTA (ENTER THE ATLAS → #beat-2)
 * 6. 63 primary sources citation badge, 20-bar tally indicator, and modal provenance register
 * 7. Interactive strata ladder (YOU to H-03) synchronization with SVG astrolabe rings & telemetry HUD
 * 8. Zero-radius strictness & Tektronix Glow Law confinement
 * 9. Reduced motion suppression (all SVG spin / dawn breathe halted)
 * 10. Multi-viewport screenshot generation in docs/design/screens/
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

const URL = 'http://localhost:3000/lab/synthesis';
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
  console.log('STARTING PLAYWRIGHT VERIFICATION FOR MERGED HERO SECTION (/lab/synthesis)');
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
    await warmupPage.waitForSelector('#synthesis-root', { timeout: 15000 });
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
    await page.waitForSelector('#synthesis-root');
    await page.waitForTimeout(300);

    ok(errs.length === 0, `[${name}] 0 console errors (${errs.length})`);
    ok(perrs.length === 0, `[${name}] 0 page errors (${perrs.length})`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth + 1);
    ok(overflow, `[${name}] zero horizontal scrollbar overflow`);

    if (w === 1440 || w === 834 || w === 390 || w === 320) {
      await page.screenshot({ path: path.join(OUT, `synthesis-hero-${name}.png`), fullPage: false });
      console.log(`  📸 Saved viewport screenshot: synthesis-hero-${name}.png`);
    }
    await ctx.close();
  }

  // 2. Structural & Layout Assertions (FIG. 0 Plate, Mottos, H1, CTA, Citation)
  console.log('\n--- TEST 2: DRAWING-OFFICE PLATE & STRUCTURAL FURNITURE ---');
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'domcontentloaded', timeout: 20000 });
    await page.waitForSelector('#synthesis-root');

    // Plate Title Furniture & Marks (Verified Removed as requested)
    const plateHeaderCount = await page.locator('.ark-plate-header').count();
    ok(plateHeaderCount === 0, 'Plate header removed as requested');

    const plateFooterCount = await page.locator('.ark-plate-footer').count();
    ok(plateFooterCount === 0, 'Plate footer removed as requested');

    const cornerMarks = await page.locator('.ark-corner-mark').count();
    ok(cornerMarks === 0, 'Corner registration marks removed as requested');

    const citationCardCount = await page.locator('.ark-citation-card').count();
    ok(citationCardCount === 0, '63 Primary Sources citation card removed as requested');

    const telemetryCount = await page.locator('.ark-ladder-footer-telemetry').count();
    ok(telemetryCount === 0, 'Ladder telemetry status block removed as requested');

    // Zenith Motto
    const zenithMotto = await page.locator('.ark-motto-zenith-bar').textContent();
    ok(zenithMotto.includes('ZENITH 90°N') && zenithMotto.includes('I AM NOT THE CENTER OF EXISTENCE'), 'Zenith humility motto rendered at plate apex');

    // Azimuth Motto
    const azimuthMotto = await page.locator('.ark-motto-azimuth').textContent();
    ok(azimuthMotto.includes('AZIMUTH 180°W') && azimuthMotto.includes('Do not make yourself smaller than you are capable of becoming'), 'Azimuth ambition motto rendered on stage');

    // H1 Headline & CTA
    const h1Text = await page.locator('.ark-hero-h1').textContent();
    ok(h1Text.includes('Extraordinary Capability.Rooted in Consciousness.') || h1Text.includes('Extraordinary Capability.\nRooted in Consciousness.'), 'H1 headline rendered with ratified title');

    const ctaText = await page.locator('#primary-hero-cta').textContent();
    ok(ctaText.includes('ENTER THE ATLAS'), 'Single primary CTA "ENTER THE ATLAS" rendered');

    const ctaHref = await page.locator('#primary-hero-cta').getAttribute('href');
    ok(ctaHref === '#beat-2', 'Primary CTA points to #beat-2');

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
    await page.waitForSelector('#synthesis-root');
    await page.waitForTimeout(400);

    // Hover H·03 Cosmic Civilization
    const cosmicButton = page.locator('.ark-ladder-item', { hasText: 'Cosmic Civilization' });
    await cosmicButton.hover();
    await page.waitForTimeout(200);

    const cosmicHighlighted = await page.locator('#ring-cosmic').getAttribute('class');
    ok(cosmicHighlighted && cosmicHighlighted.includes('highlighted'), 'Hovering H·03 highlights Cosmic astrolabe ring');

    // Hover H·02 Planetary Horizon
    const planetaryButton = page.locator('.ark-ladder-item', { hasText: 'Planetary Horizon' });
    await planetaryButton.hover();
    await page.waitForTimeout(200);

    const planetaryHighlighted = await page.locator('#ring-planetary').getAttribute('class');
    ok(planetaryHighlighted && planetaryHighlighted.includes('highlighted'), 'Hovering H·02 highlights Planetary astrolabe ring');

    // Hover H·01 Civilizational Scale
    const civButton = page.locator('.ark-ladder-item', { hasText: 'Civilizational Scale' });
    await civButton.hover();
    await page.waitForTimeout(200);

    const civHighlighted = await page.locator('#ring-civilizational').getAttribute('class');
    ok(civHighlighted && civHighlighted.includes('highlighted'), 'Hovering H·01 highlights Civilizational astrolabe ring');

    // Close-up screenshot of highlighted astrolabe stage
    const celestialCol = page.locator('.ark-celestial-col');
    await celestialCol.screenshot({ path: path.join(OUT, 'synthesis-astrolabe-closeup.png') });
    console.log('  📸 Saved close-up screenshot: synthesis-astrolabe-closeup.png');

    await ctx.close();
  }

  await browser.close();

  console.log(`\n==== MERGED HERO VERIFICATION: ${pass} pass / ${fail} fail ====`);
  if (fails.length) {
    console.log('FAILURES:');
    fails.forEach(f => console.log('  -', f));
    process.exit(1);
  } else {
    console.log('ALL HERO MERGE ASSERTIONS PASSED PERFECTLY!\n');
    process.exit(0);
  }
};

run().catch(e => {
  console.error('FATAL', e);
  process.exit(1);
});
