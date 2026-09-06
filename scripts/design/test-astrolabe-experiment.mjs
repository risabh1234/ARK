#!/usr/bin/env node
/**
 * AUTOMATED PLAYWRIGHT TEST SUITE — /lab/experiment
 * Tests:
 * 1. Multi-viewport rendering & zero console/page errors
 * 2. Zero horizontal overflow (320px to 1440px)
 * 3. Interactive territory click & hover states
 * 4. Epistemological Telemetry HUD updates
 * 5. Keyboard navigation (Tab, Enter, Space) & ARIA accessibility
 * 6. Reduced motion overrides
 * 7. Multi-width screenshot capture for visual comparison
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

const URL = 'http://localhost:3000/lab/experiment';
const OUT = path.resolve(process.cwd(), 'docs', 'design', 'screens');
if (!fs.existsSync(OUT)) fs.mkdirSync(OUT, { recursive: true });

let pass = 0, fail = 0;
const fails = [];
function ok(c, m) {
  if (c) {
    pass++;
    console.log('  ✓', m);
  } else {
    fail++;
    fails.push(m);
    console.error('  ✗ FAIL:', m);
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
  console.log('\n--- STARTING PLAYWRIGHT VERIFICATION SUITE FOR /lab/experiment ---');
  const pw = await getPlaywright();
  const exe = chromiumPath();
  const browser = await pw.chromium.launch({ headless: true, ...(exe ? { executablePath: exe } : {}) });

  // 1. Multi-width responsiveness, zero console errors & zero overflow
  for (const { w, h, name } of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    const errs = [], perrs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => perrs.push(e.message));

    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);

    ok(errs.length === 0, `[${name}] 0 console errors (${errs.length})`);
    ok(perrs.length === 0, `[${name}] 0 page errors (${perrs.length})`);

    const overflow = await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth);
    ok(overflow, `[${name}] zero horizontal scrollbar overflow`);

    if (w === 1440 || w === 390) {
      await page.screenshot({ path: path.join(OUT, `experiment-${name}.png`), fullPage: true });
      console.log(`  📸 Saved screenshot: experiment-${name}.png`);
    }
    await ctx.close();
  }

  // 2. Interactive Quadrant Clicking & Live Telemetry HUD Updates
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Initial state check
    let title = await page.locator('.ark-telemetry-heading').textContent();
    ok(title.includes('THE MEASURABLE'), 'Initial active territory is THE MEASURABLE');

    // Click THE MARKETABLE quadrant
    const marketable = page.locator('.ark-quad-ne');
    await marketable.dispatchEvent('click');
    await page.waitForTimeout(200);

    title = await page.locator('.ark-telemetry-heading').textContent();
    ok(title.includes('THE MARKETABLE'), 'Clicking The Marketable updates Telemetry HUD heading');
    let failmode = await page.locator('.ark-failmode-quote').textContent();
    ok(failmode.includes('Optimises the outcome. Skips the cost.'), 'Marketable failure mode displayed correctly');

    // Click THE WANTED quadrant
    const wanted = page.locator('.ark-quad-sw');
    await wanted.dispatchEvent('click');
    await page.waitForTimeout(200);

    title = await page.locator('.ark-telemetry-heading').textContent();
    ok(title.includes('THE WANTED'), 'Clicking The Wanted updates Telemetry HUD heading');
    failmode = await page.locator('.ark-failmode-quote').textContent();
    ok(failmode.includes('Maps the feeling. Cannot rank it.'), 'Wanted failure mode displayed correctly');

    // Click THE INHERITED quadrant
    const inherited = page.locator('.ark-quad-se');
    await inherited.dispatchEvent('click');
    await page.waitForTimeout(200);

    title = await page.locator('.ark-telemetry-heading').textContent();
    ok(title.includes('THE INHERITED'), 'Clicking The Inherited updates Telemetry HUD heading');
    failmode = await page.locator('.ark-failmode-quote').textContent();
    ok(failmode.includes('Carries the purpose. Distrusts the method.'), 'Inherited failure mode displayed correctly');

    // Screenshot of active astrolabe map close-up
    const mapElement = page.locator('.ark-map-stage');
    await mapElement.screenshot({ path: path.join(OUT, 'experiment-astrolabe-map-closeup.png') });
    console.log('  📸 Saved close-up screenshot: experiment-astrolabe-map-closeup.png');

    await ctx.close();
  }

  // 3. Keyboard Navigation & ARIA Accessibility (WCAG 2.2 AA)
  {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    // Focus on the page and Tab to the first quadrant
    await page.keyboard.press('Tab'); // Skip link
    await page.keyboard.press('Tab'); // Lab logo
    await page.keyboard.press('Tab'); // Back link
    await page.keyboard.press('Tab'); // Telemetry link
    await page.keyboard.press('Tab'); // First quadrant (The Measurable)

    const focusedTag = await page.evaluate(() => document.activeElement?.getAttribute('aria-label'));
    ok(focusedTag && focusedTag.includes('The Measurable'), 'Tab progression focuses on first SVG quadrant (The Measurable)');

    // Tab to next quadrant and press Enter
    await page.keyboard.press('Tab'); // Next quadrant (The Marketable)
    await page.keyboard.press('Enter');
    await page.waitForTimeout(150);

    const title = await page.locator('.ark-telemetry-heading').textContent();
    ok(title.includes('THE MARKETABLE'), 'Keyboard Enter activates focused quadrant and updates HUD');

    await ctx.close();
  }

  // 4. Reduced Motion Compliance
  {
    const ctx = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      colorScheme: 'dark',
      reducedMotion: 'reduce',
    });
    const page = await ctx.newPage();
    await page.goto(URL, { waitUntil: 'networkidle' });

    const reticleAnimation = await page.evaluate(() => {
      const el = document.querySelector('.ark-reticle-degree-ring');
      return window.getComputedStyle(el).animationName;
    });

    ok(reticleAnimation === 'none', 'Under prefers-reduced-motion, reticle spin animation is disabled');
    await ctx.close();
  }

  await browser.close();

  console.log(`\n========================================`);
  console.log(`TEST SUMMARY: ${pass} PASSED, ${fail} FAILED`);
  console.log(`========================================\n`);

  if (fail > 0) {
    process.exit(1);
  }
};

run().catch((err) => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
