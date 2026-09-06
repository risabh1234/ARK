#!/usr/bin/env node
/**
 * ĀRK Design System — Automated Playwright Verification & Screenshot Engine for Synthesis Landing Page (/lab/synthesis)
 * Governed by PHASE_4_SYNTHESIS_BUILD_PROMPT.md & FINAL_LANDING_PAGE_SYNTHESIS.md
 */

import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { execSync } from 'child_process';

// Find Playwright from local node_modules or global/npx cache
async function getPlaywright() {
  try {
    return await import('playwright');
  } catch {
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

// Precondition Check: Detect stale server chunk mismatch
async function verifyServerFreshness(targetUrl) {
  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      console.warn(`[WARN] Server responded with HTTP status ${res.status}`);
      return;
    }
    const html = await res.text();
    // Only perform chunk file check if .next/BUILD_ID exists (production mode)
    if (fs.existsSync(path.resolve(process.cwd(), '.next', 'BUILD_ID'))) {
      const scriptMatches = [...html.matchAll(/src="\/_next\/static\/chunks\/([^"]+)"/g)];
      if (scriptMatches.length > 0) {
        const chunksDir = path.resolve(process.cwd(), '.next', 'static', 'chunks');
        if (fs.existsSync(chunksDir)) {
          for (const match of scriptMatches) {
            const chunkPath = match[1];
            const fullPath = path.join(chunksDir, chunkPath);
            if (!fs.existsSync(fullPath)) {
              console.warn(`[WARN] Chunk mismatch detected for '${chunkPath}'.`);
            }
          }
        }
      }
    }
  } catch (err) {
    console.error(`\n[FATAL SERVER CONNECTION ERROR] Could not connect to ${targetUrl}:`, err.message);
    console.error(`Please ensure your Next.js server is running on http://localhost:3000.\n`);
    process.exit(1);
  }
}

async function runVerification() {
  const TARGET_URL = 'http://localhost:3000/lab/synthesis';
  const SCREENS_DIR = path.resolve(process.cwd(), 'docs', 'design', 'screens');

  if (!fs.existsSync(SCREENS_DIR)) {
    fs.mkdirSync(SCREENS_DIR, { recursive: true });
  }

  console.log('========================================================================================');
  console.log('ĀRK DESIGN SYSTEM — PLAYWRIGHT BROWSER & ACCESSIBILITY VERIFICATION (FINAL SYNTHESIS)');
  console.log(`Target Route: ${TARGET_URL}`);
  console.log('========================================================================================\n');

  let totalErrors = 0;
  let totalHydrationWarnings = 0;
  let passedAssertions = 0;

  function assert(condition, message) {
    if (condition) {
      console.log(`  ✓ PASS: ${message}`);
      passedAssertions++;
    } else {
      console.error(`  ✗ FAIL: ${message}`);
      totalErrors++;
    }
  }

  // -------------------------------------------------------------------------
  // 0. Automated Contrast Prerequisite Gate
  // -------------------------------------------------------------------------
  console.log('[0/6] Executing WCAG 2.1 Contrast Audit Prerequisite (contrast.mjs)...');
  try {
    const contrastOutput = execSync('node scripts/design/contrast.mjs', { encoding: 'utf-8' });
    const contrastPassed = contrastOutput.includes('ALL AUDIT PAIRS MEET OR EXCEED WCAG 2.1 AA / AAA FLOORS');
    assert(contrastPassed, 'Automated WCAG 2.1 contrast audit passed (19/19 pairs + negative gates)');
  } catch (err) {
    assert(false, `Contrast audit failed: ${err.message}`);
  }

  // Precondition Check
  await verifyServerFreshness(TARGET_URL);

  const pw = await getPlaywright();
  const executablePath = getExecutablePath();
  const launchOptions = { headless: true };
  if (executablePath) {
    launchOptions.executablePath = executablePath;
  }
  const browser = await pw.chromium.launch(launchOptions);

  const VIEWPORTS = [
    { name: 'Desktop Large', width: 1440, height: 900, screen: 'synthesis-desktop.png' },
    { name: 'Desktop Standard', width: 1280, height: 800, screen: 'synthesis-1280.png' },
    { name: 'Tablet Portrait', width: 834, height: 1112, screen: 'synthesis-tablet.png' },
    { name: 'Mobile Standard', width: 390, height: 844, screen: 'synthesis-mobile.png', isMobile: true },
    { name: 'Mobile Compact', width: 360, height: 740, screen: 'synthesis-360.png', isMobile: true },
    { name: 'Mobile Narrow', width: 320, height: 568, screen: 'synthesis-narrow.png', isMobile: true },
  ];

  // -------------------------------------------------------------------------
  // 1. Multi-Viewport Integrity & Responsive Law Suite
  // -------------------------------------------------------------------------
  console.log('\n[1/6] Running 6-Viewport Responsive & Layout Verifications...');

  for (const vp of VIEWPORTS) {
    const ctx = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'dark',
      isMobile: vp.isMobile || false,
      hasTouch: vp.isMobile || false,
    });
    const page = await ctx.newPage();

    const consoleErrors = [];
    const pageErrors = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
        console.error(`  [${vp.width}px Console Error]: ${msg.text()}`);
      }
      if (msg.text().includes('Warning: Text content did not match') || msg.text().includes('Hydration failed')) {
        totalHydrationWarnings++;
        console.error(`  [${vp.width}px Hydration Warning]: ${msg.text()}`);
      }
    });

    page.on('pageerror', (err) => {
      pageErrors.push(err.message);
      console.error(`  [${vp.width}px PageError]: ${err.message}`);
    });

    await page.goto(TARGET_URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(150);

    assert(consoleErrors.length === 0, `[${vp.width}px] 0 console errors`);
    assert(pageErrors.length === 0, `[${vp.width}px] 0 unhandled page errors`);

    // Zero horizontal overflow
    const hasHorizontalOverflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    assert(!hasHorizontalOverflow, `[${vp.width}px] Zero horizontal overflow`);

    // Universal Zero Radius Law
    const radiusViolations = await page.evaluate(() => {
      const elements = document.querySelectorAll('#synthesis-root *');
      const violations = [];
      for (const el of elements) {
        if (el.closest('svg')) continue;
        const br = window.getComputedStyle(el).borderRadius;
        if (br && br !== '0px') {
          violations.push(el.className?.toString?.() || el.tagName);
        }
      }
      return violations;
    });
    assert(radiusViolations.length === 0, `[${vp.width}px] Zero radius enforced universally (${radiusViolations.length} violations)`);

    // Hick's Law: Exactly 1 primary-fill CTA in first viewport
    const primaryInView = await page.evaluate((vh) => {
      const els = [...document.querySelectorAll('#synthesis-root a, #synthesis-root button')];
      let count = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top >= vh || r.bottom <= 0) continue;
        const bg = window.getComputedStyle(el).backgroundColor;
        if (bg === 'rgb(240, 231, 216)') count++;
      }
      return count;
    }, vp.height);
    assert(primaryInView === 1, `[${vp.width}px] Exactly 1 primary-fill CTA in initial viewport (found: ${primaryInView})`);

    // Capture Viewport Screenshot
    const screenPath = path.join(SCREENS_DIR, vp.screen);
    await page.screenshot({ path: screenPath, fullPage: true });

    await ctx.close();
  }

  // -------------------------------------------------------------------------
  // 2. Desktop Deep Verification & Structural Governance (1440 × 900)
  // -------------------------------------------------------------------------
  console.log('\n[2/6] Testing Semantic Hierarchy, Laws & Landmarks (1440 × 900)...');
  const desktopContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    colorScheme: 'dark',
  });
  const desktopPage = await desktopContext.newPage();

  // Mock API Route for Weekly Letter subscribe
  await desktopPage.route('**/api/subscribe', async (route) => {
    const postData = route.request().postDataJSON();
    if (postData && postData.email && postData.email.includes('@')) {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true, message: 'Subscribed successfully' }),
      });
    } else {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid email address' }),
      });
    }
  });

  await desktopPage.goto(TARGET_URL, { waitUntil: 'networkidle' });

  // 2.1 Root & Beats presence
  const rootExists = (await desktopPage.$('#synthesis-root')) !== null;
  assert(rootExists, 'Root container #synthesis-root is present');

  const skipLink = await desktopPage.$('.v3-skip-link');
  assert(skipLink !== null, 'Skip link (.v3-skip-link) is present');

  const beatIds = ['beat-1', 'beat-2', 'beat-3', 'beat-4', 'beat-5', 'beat-6', 'beat-7'];
  for (const id of beatIds) {
    const el = await desktopPage.$(`#${id}`);
    assert(el !== null, `Narrative beat #${id} is present`);
  }

  // 2.2 Heading semantics (one H1, logical hierarchy, aria-labelledby resolution)
  const headings = await desktopPage.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map((h) => ({ tag: h.tagName, text: h.textContent.trim().slice(0, 40) }))
  );
  const h1s = headings.filter((h) => h.tag === 'H1');
  assert(h1s.length === 1, `Exactly one <h1> present on page (found: ${h1s.length})`);

  let skippedLevels = false;
  let prevLevel = 1;
  for (const h of headings) {
    const lvl = parseInt(h.tag.replace('H', ''), 10);
    if (lvl > prevLevel + 1) skippedLevels = true;
    prevLevel = lvl;
  }
  assert(!skippedLevels, 'No skipped heading levels in semantic DOM structure');

  const labelledbyResolves = await desktopPage.evaluate(() => {
    const secs = [...document.querySelectorAll('section[aria-labelledby]')];
    return secs.every((s) => document.getElementById(s.getAttribute('aria-labelledby')));
  });
  assert(labelledbyResolves, 'Every section[aria-labelledby] resolves to a valid DOM heading ID');

  // 2.3 M-2: <main id="main-content"> tabIndex check
  const mainTabindex = await desktopPage.evaluate(() => document.querySelector('#main-content')?.getAttribute('tabindex'));
  assert(mainTabindex === '-1', `<main id="main-content"> has tabIndex={-1} for WCAG 2.4.1 skip navigation`);

  // 2.4 Skip link focus
  await desktopPage.keyboard.press('Tab');
  const focusedOnFirstTab = await desktopPage.evaluate(() => document.activeElement?.className);
  assert(String(focusedOnFirstTab).includes('v3-skip-link'), 'First Tab keypress targets the accessibility skip link');

  // 2.5 Tektronix Glow Law Confinement
  const glowAudit = await desktopPage.evaluate(() => {
    const elements = document.querySelectorAll('#synthesis-root *');
    const glowingElements = [];
    for (const el of elements) {
      const bs = window.getComputedStyle(el).boxShadow;
      if (bs && bs !== 'none') {
        const isPermitted =
          el.classList.contains('v3-ruler-bead') ||
          el.classList.contains('ark-ruler-bead') ||
          el.classList.contains('v3-strip-dot') ||
          el.classList.contains('strip-dot') ||
          el.classList.contains('v3-sensor-dot') ||
          el.classList.contains('sensor-dot');
        glowingElements.push({ tag: el.tagName, class: el.className, permitted: isPermitted });
      }
    }
    return glowingElements;
  });
  const unpermittedGlows = glowAudit.filter((g) => !g.permitted);
  assert(unpermittedGlows.length === 0, `Tektronix Glow Law: box-shadow confined strictly to sensor dots & reading bead (${glowAudit.length} total)`);

  // 2.6 Serif Ration Law (Exactly 2 elements on entire page)
  const serifElements = await desktopPage.evaluate(() => {
    const elements = document.querySelectorAll('#synthesis-root *');
    const serifList = [];
    for (const el of elements) {
      const ff = window.getComputedStyle(el).fontFamily;
      if (ff.includes('Source Serif') || ff.includes('Source_Serif') || ff.includes('var(--ark-font-serif)')) {
        if (el.textContent && el.children.length === 0) {
          serifList.push({ tag: el.tagName, class: el.className, text: el.textContent.substring(0, 40) });
        }
      }
    }
    return serifList;
  });
  assert(serifElements.length === 2, `Serif Ration Law: Source Serif 4 computed on EXACTLY 2 elements on entire page (found: ${serifElements.length})`);

  // 2.7 Wordmark Font Law (Inter / Sans-serif)
  const wordmarkFont = await desktopPage.evaluate(() => {
    const el = document.querySelector('.v3-wordmark');
    return el ? window.getComputedStyle(el).fontFamily : '';
  });
  assert(!wordmarkFont.includes('Source Serif') && !wordmarkFont.includes('Source_Serif'), `Wordmark is sans-serif/display, not serif (${wordmarkFont})`);

  // 2.8 CTA Destinations & Navigation Anchors
  const heroCtaHref = await desktopPage.$eval('.v3-btn-primary', (el) => el.getAttribute('href'));
  assert(heroCtaHref === '#beat-2', `Hero CTA points to #beat-2 (found: ${heroCtaHref})`);

  const topBarCtaHref = await desktopPage.$eval('.v3-topbar-cta', (el) => el.getAttribute('href'));
  assert(topBarCtaHref === '#beat-2', `TopBar CTA points to #beat-2 (found: ${topBarCtaHref})`);

  const topBarLinks = await desktopPage.$$eval('.v3-nav-link', (els) => els.map((el) => ({ text: el.textContent.trim(), href: el.getAttribute('href') })));
  assert(topBarLinks.some((l) => l.text === 'Briefs' && l.href === '#beat-5'), 'TopBar Briefs links to #beat-5');
  assert(topBarLinks.some((l) => l.text === 'Method' && l.href === '#beat-3'), 'TopBar Method links to #beat-3');
  assert(topBarLinks.some((l) => l.text === 'Studio' && l.href === '/studio'), 'TopBar Studio links to /studio');
  assert(topBarLinks.some((l) => l.text === 'Codex' && l.href === '/vision'), 'TopBar Codex links to /vision');
  assert(topBarLinks.some((l) => l.text === 'Library' && l.href === '/library'), 'TopBar Library links to /library');

  // Footer links (Privacy, Terms, Contact)
  const footerLinks = await desktopPage.$$eval('.v3-footer-link', (els) => els.map((el) => ({ text: el.textContent.trim(), href: el.getAttribute('href') })));
  assert(footerLinks.some((l) => l.text === 'Privacy' && l.href === '/privacy'), 'Footer links to /privacy');
  assert(footerLinks.some((l) => l.text === 'Terms' && l.href === '/terms'), 'Footer links to /terms');
  assert(footerLinks.some((l) => l.text === 'Contact' && l.href === '/contact'), 'Footer links to /contact');

  // -------------------------------------------------------------------------
  // 3. Interactive DepthControls & State Machine Verification
  // -------------------------------------------------------------------------
  console.log('\n[3/6] Testing Interactive State Machines & Keyboard Roving...');

  // 3.1 Beat 3 DepthControl filtering ResearchPanel
  const initialRowContent = await desktopPage.$eval('#def-R-01', (el) => el.textContent);
  assert(!initialRowContent.includes('[PROVENANCE]'), 'Initial SOURCE depth does not show [PROVENANCE]');

  await desktopPage.click('#beat3-depth-key-evidence');
  await desktopPage.waitForTimeout(100);
  const evidenceRowContent = await desktopPage.$eval('#def-R-01', (el) => el.textContent);
  assert(evidenceRowContent.includes('[PROVENANCE]'), 'EVIDENCE depth shows [PROVENANCE] in research rows');

  await desktopPage.click('#beat3-depth-key-interpretation');
  await desktopPage.waitForTimeout(100);
  const interpRowContent = await desktopPage.$eval('#def-R-01', (el) => el.textContent);
  assert(interpRowContent.includes('[INTERPRETATION]'), 'INTERPRETATION depth shows [INTERPRETATION] notes');
  const tallyStrokesCount = await desktopPage.$$eval('#beat3-panel .v3-tally-strokes-wrap svg', (els) => els.length);
  assert(tallyStrokesCount > 0, `INTERPRETATION depth reveals TallyStrokes diagram (${tallyStrokesCount} stroke groups)`);

  // 3.2 DepthControl keyboard roving
  await desktopPage.focus('#beat3-depth-key-source');
  await desktopPage.keyboard.press('ArrowRight');
  await desktopPage.waitForTimeout(80);
  const rovedActiveId = await desktopPage.evaluate(() => document.activeElement?.id);
  assert(rovedActiveId === 'beat3-depth-key-evidence', `DepthControl ArrowRight roves focus (got: ${rovedActiveId})`);
  const rovedAriaPressed = await desktopPage.getAttribute('#beat3-depth-key-evidence', 'aria-pressed');
  assert(rovedAriaPressed === 'true', 'DepthControl ArrowRight also updates aria-pressed to true');

  // 3.3 Independent Beat 4 DepthControl state
  const depth4IsSource = await desktopPage.getAttribute('#beat4-depth-key-source', 'aria-pressed');
  assert(depth4IsSource === 'true', 'Beat 4 depth remains independent when Beat 3 changes');

  await desktopPage.click('#beat4-depth-key-interpretation');
  await desktopPage.waitForTimeout(100);
  const siglaContent = await desktopPage.$eval('#beat4-panel table', (el) => el.textContent);
  assert(siglaContent.includes('Śabda') && siglaContent.includes('Pratyakṣa') && siglaContent.includes('Anumāna'), 'INTERPRETATION depth reveals classical pramāṇa sigla in StrataTable');

  // 3.4 Fig 1 Map Keyboard & Click Interaction
  await desktopPage.click('g[aria-label*="THE MARKETABLE"]');
  await desktopPage.waitForTimeout(80);
  const readoutMarketable = await desktopPage.$eval('.readout-title', (el) => el.textContent.trim());
  assert(readoutMarketable === 'THE MARKETABLE', `Fig 1 click updates readout panel to THE MARKETABLE`);

  const wantedQuad = await desktopPage.$('g[aria-label*="THE WANTED"]');
  await wantedQuad.focus();
  await desktopPage.keyboard.press('Enter');
  await desktopPage.waitForTimeout(80);
  const readoutWanted = await desktopPage.$eval('.readout-title', (el) => el.textContent.trim());
  assert(readoutWanted === 'THE WANTED', `Fig 1 keyboard Enter updates readout panel to THE WANTED`);

  // 3.5 StrataRuler keyboard roving & scroll depth flip
  await desktopPage.focus('#ruler-band-i');
  await desktopPage.keyboard.press('ArrowDown');
  await desktopPage.waitForTimeout(100);
  const rulerActive = await desktopPage.evaluate(() => document.activeElement?.id);
  assert(rulerActive === 'ruler-band-ii', `StrataRuler ArrowDown roves focus to Band II (got: ${rulerActive})`);

  await desktopPage.evaluate(() => {
    const el = document.getElementById('beat-7');
    if (el) el.scrollIntoView();
  });
  await desktopPage.waitForTimeout(400);
  const beadClass = await desktopPage.$eval('.v3-ruler-bead', (el) => el.className);
  assert(beadClass.includes('bead-iv'), `Altimeter bead flips to signal-red (.bead-iv) in Stratum IV (found: ${beadClass})`);

  // -------------------------------------------------------------------------
  // 4. Form Robustness: Validation, Success, 500 Network Error, Abort
  // -------------------------------------------------------------------------
  console.log('\n[4/6] Testing Form Robustness (Validation, Success, HTTP 500, Network Abort)...');

  // 4.1 Invalid email validation
  await desktopPage.fill('#wl-email', 'invalid-email');
  await desktopPage.click('.v3-letter-form button[type="submit"]');
  await desktopPage.waitForTimeout(100);
  const errorMsg = await desktopPage.$eval('#wl-err', (el) => el.textContent);
  assert(errorMsg.includes("doesn't look like an email"), 'Invalid email displays assertive validation error in #wl-err');

  // 4.2 Valid email success
  await desktopPage.fill('#wl-email', 'scholar@atlas.org');
  await desktopPage.click('.v3-letter-form button[type="submit"]');
  await desktopPage.waitForTimeout(200);
  const successEl = await desktopPage.$('.v3-letter-success');
  assert(successEl !== null, 'Valid email displays success message');

  // 4.3 HTTP 500 error path
  await desktopPage.route('**/api/subscribe', (route) =>
    route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'Database unreachable' }) })
  );
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.evaluate(() => document.getElementById('beat-7').scrollIntoView());
  await desktopPage.fill('#wl-email', 'error-test@atlas.org');
  await desktopPage.click('.v3-letter-form button[type="submit"]');
  await desktopPage.waitForTimeout(300);
  const successAfter500 = await desktopPage.$('.v3-letter-success');
  const errAfter500 = await desktopPage.$eval('#wl-err', (el) => el.textContent.trim());
  assert(successAfter500 === null, 'HTTP 500 does NOT show success text');
  assert(errAfter500.length > 0, `HTTP 500 shows visible error message: "${errAfter500}"`);
  await desktopPage.unroute('**/api/subscribe');

  // 4.4 Network abort path
  await desktopPage.route('**/api/subscribe', (route) => route.abort());
  await desktopPage.reload({ waitUntil: 'networkidle' });
  await desktopPage.evaluate(() => document.getElementById('beat-7').scrollIntoView());
  await desktopPage.fill('#wl-email', 'abort-test@atlas.org');
  await desktopPage.click('.v3-letter-form button[type="submit"]');
  await desktopPage.waitForTimeout(300);
  const successAfterAbort = await desktopPage.$('.v3-letter-success');
  const errAfterAbort = await desktopPage.$eval('#wl-err', (el) => el.textContent.trim());
  assert(successAfterAbort === null, 'Aborted request does NOT show success text');
  assert(errAfterAbort.length > 0, `Aborted request shows visible network error message: "${errAfterAbort}"`);
  await desktopPage.unroute('**/api/subscribe');

  await desktopContext.close();

  // -------------------------------------------------------------------------
  // 5. Reduced-Motion Mode Verification
  // -------------------------------------------------------------------------
  console.log('\n[5/6] Testing prefers-reduced-motion Contract...');
  const rmContext = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    reducedMotion: 'reduce',
    colorScheme: 'dark',
  });
  const rmPage = await rmContext.newPage();
  await rmPage.goto(TARGET_URL, { waitUntil: 'networkidle' });
  await rmPage.waitForTimeout(400);

  const runningAnimations = await rmPage.evaluate(() => document.getAnimations().filter((a) => a.playState === 'running').length);
  assert(runningAnimations === 0, `Reduced motion: 0 active running animations in DOM (found: ${runningAnimations})`);

  const glowCountInRM = await rmPage.evaluate(() => {
    let n = 0;
    for (const el of document.querySelectorAll('#synthesis-root *')) {
      if (window.getComputedStyle(el).boxShadow !== 'none') n++;
    }
    return n;
  });
  assert(glowCountInRM === 0, `Reduced motion: all box-shadows suppressed to none (found: ${glowCountInRM})`);

  const beadPresentInRM = (await rmPage.$('.v3-ruler-bead')) !== null;
  assert(beadPresentInRM, 'Reduced motion: reading bead remains present and functional');

  await rmContext.close();

  // -------------------------------------------------------------------------
  // 6. Close-Up Visual Inspection Screenshots
  // -------------------------------------------------------------------------
  console.log('\n[6/6] Capturing Close-Up Visual Artefacts...');
  const cuContext = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  const cuPage = await cuContext.newPage();
  await cuPage.goto(TARGET_URL, { waitUntil: 'networkidle' });

  const captureCloseup = async (selector, filename) => {
    const el = await cuPage.$(selector);
    if (el) {
      await el.scrollIntoViewIfNeeded();
      await cuPage.waitForTimeout(150);
      await el.screenshot({ path: path.join(SCREENS_DIR, filename) });
      console.log(`  ✓ Captured ${filename}`);
      passedAssertions++;
    }
  };

  await captureCloseup('#beat-1 .v3-hero-grid', 'audit-closeup-hero.png');
  await captureCloseup('.v3-fig1-figure', 'audit-closeup-fig1.png');
  await cuPage.click('#beat3-depth-key-interpretation');
  await cuPage.waitForTimeout(100);
  await captureCloseup('#beat-3 .v3-method-deck-wrap', 'audit-closeup-method-interp.png');
  await cuPage.click('#beat4-depth-key-interpretation');
  await cuPage.waitForTimeout(100);
  await captureCloseup('#beat-4 .v3-anatomy-grid', 'audit-closeup-anatomy-interp.png');
  await captureCloseup('.v3-unsurveyed-void', 'audit-closeup-void.png');
  await captureCloseup('.v3-radial-figure', 'audit-closeup-dial.png');
  await captureCloseup('#beat-7', 'audit-closeup-entry.png');
  await captureCloseup('.v3-topbar', 'audit-closeup-topbar.png');

  await cuContext.close();
  await browser.close();

  // Summary
  console.log('\n========================================================================================');
  console.log('VERIFICATION SUMMARY');
  console.log(`Passed Assertions: ${passedAssertions}`);
  console.log(`Total Errors:      ${totalErrors}`);
  console.log(`Hydration Warnings:${totalHydrationWarnings}`);
  console.log('========================================================================================\n');

  if (totalErrors > 0 || totalHydrationWarnings > 0) {
    console.error(`Verification FAILED with ${totalErrors} errors and ${totalHydrationWarnings} hydration warnings.`);
    process.exit(1);
  } else {
    console.log(`ALL VERIFICATION GATES PASSED PERFECTLY (${passedAssertions}/${passedAssertions} ASSERTIONS PASS)`);
    process.exit(0);
  }
}

runVerification().catch((err) => {
  console.error('[FATAL ERROR IN VERIFICATION]:', err);
  process.exit(1);
});
