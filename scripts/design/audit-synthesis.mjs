#!/usr/bin/env node
/**
 * INDEPENDENT AUDIT SUITE — /lab/synthesis
 * Written by the auditor (not the builder). Covers gaps in verify-synthesis.mjs:
 * pageerror capture, network-error form path, CTA-per-viewport count, border-radius
 * sweep at multiple widths, reduced-motion getAnimations, keyboard traversal,
 * axe-core, heading order, multi-width screenshots + close-ups.
 */
import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';

async function getPlaywright() {
  try { return await import('playwright'); } catch {}
  const base = path.join(process.env.USERPROFILE || 'C:\\Users\\ojass', 'AppData', 'Local', 'npm-cache', '_npx');
  for (const h of fs.readdirSync(base)) {
    const c = path.join(base, h, 'node_modules', 'playwright', 'index.mjs');
    if (fs.existsSync(c)) return await import(pathToFileURL(c).href);
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
let pass = 0, fail = 0;
const fails = [];
function ok(c, m) { if (c) { pass++; console.log('  ✓', m); } else { fail++; fails.push(m); console.error('  ✗ FAIL:', m); } }

const WIDTHS = [
  { w: 1440, h: 900 }, { w: 1280, h: 800 }, { w: 834, h: 1112 },
  { w: 390, h: 844 }, { w: 360, h: 740 }, { w: 320, h: 568 },
];

const run = async () => {
  const pw = await getPlaywright();
  const exe = chromiumPath();
  const browser = await pw.chromium.launch({ headless: true, ...(exe ? { executablePath: exe } : {}) });

  // ---- pageerror + console across all widths ----
  for (const { w, h } of WIDTHS) {
    const ctx = await browser.newContext({ viewport: { width: w, height: h }, colorScheme: 'dark' });
    const page = await ctx.newPage();
    const errs = [], perrs = [];
    page.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    page.on('pageerror', e => perrs.push(e.message));
    await page.goto(URL, { waitUntil: 'networkidle' });
    await page.waitForTimeout(300);
    ok(errs.length === 0, `[${w}] 0 console errors (${errs.length}${errs.length ? ': ' + errs[0].slice(0, 120) : ''})`);
    ok(perrs.length === 0, `[${w}] 0 pageerror (${perrs.length}${perrs.length ? ': ' + perrs[0].slice(0, 120) : ''})`);

    // border-radius sweep (non-svg)
    const radii = await page.evaluate(() => {
      const bad = [];
      for (const el of document.querySelectorAll('#synthesis-root *')) {
        if (el.closest('svg')) continue;
        const br = getComputedStyle(el).borderRadius;
        if (br && br !== '0px') bad.push(el.className?.toString?.() || el.tagName);
      }
      return bad;
    });
    ok(radii.length === 0, `[${w}] border-radius 0 everywhere (${radii.length} violations)`);

    // horizontal overflow
    const of = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 1);
    ok(!of, `[${w}] no horizontal overflow`);

    // primary-CTA count in first viewport
    const primaryInView = await page.evaluate((vh) => {
      const els = [...document.querySelectorAll('#synthesis-root a, #synthesis-root button')];
      let n = 0;
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.top >= vh || r.bottom <= 0) continue;
        const cs = getComputedStyle(el);
        // primary fill = bg approx ink-hi (#f0e7d8) with dark text
        const bg = cs.backgroundColor;
        if (bg === 'rgb(240, 231, 216)') n++;
      }
      return n;
    }, h);
    ok(primaryInView === 1, `[${w}] exactly 1 primary-fill CTA in first viewport (found ${primaryInView})`);

    // screenshot
    await page.screenshot({ path: path.join(OUT, `audit-synthesis-${w}.png`), fullPage: true });
    await ctx.close();
  }

  // ---- heading order + landmarks (1440) ----
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: 'networkidle' });

  const headings = await page.evaluate(() =>
    [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({ t: h.tagName, x: h.textContent.trim().slice(0, 40) })));
  const h1s = headings.filter(h => h.t === 'H1');
  ok(h1s.length === 1, `exactly one <h1> (found ${h1s.length})`);
  // no skipped levels
  let skipped = false, prev = 1;
  for (const h of headings) { const lvl = +h.t[1]; if (lvl > prev + 1) skipped = true; prev = lvl; }
  ok(!skipped, 'no skipped heading levels');

  const mainTabindex = await page.evaluate(() => document.querySelector('#main-content')?.getAttribute('tabindex'));
  ok(mainTabindex === '-1', `<main id=main-content> has tabIndex=-1 (found: ${mainTabindex})`);

  const labelledbyResolves = await page.evaluate(() => {
    const secs = [...document.querySelectorAll('section[aria-labelledby]')];
    return secs.every(s => document.getElementById(s.getAttribute('aria-labelledby')));
  });
  ok(labelledbyResolves, 'every section[aria-labelledby] resolves');

  // ---- skip link focus behavior ----
  await page.keyboard.press('Tab');
  const focused1 = await page.evaluate(() => document.activeElement?.className);
  ok(String(focused1).includes('v3-skip-link'), `first Tab focuses skip link (got: ${focused1})`);

  // ---- DepthControl keyboard roving (Beat 3) ----
  await page.evaluate(() => document.getElementById('beat-3').scrollIntoView());
  await page.waitForTimeout(200);
  await page.focus('#beat3-depth-key-source');
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(100);
  const afterArrow = await page.evaluate(() => document.activeElement?.id);
  ok(afterArrow === 'beat3-depth-key-evidence', `DepthControl ArrowRight roves focus (got: ${afterArrow})`);
  const evPressed = await page.getAttribute('#beat3-depth-key-evidence', 'aria-pressed');
  ok(evPressed === 'true', 'DepthControl ArrowRight also sets aria-pressed');

  // ---- independent depth4 ----
  await page.click('#beat3-depth-key-interpretation');
  await page.waitForTimeout(80);
  const depth4StillSource = await page.getAttribute('#beat4-depth-key-source', 'aria-pressed');
  ok(depth4StillSource === 'true', 'Beat 4 depth unaffected by Beat 3 depth change (independent state)');

  // ---- Fig 1 keyboard ----
  await page.evaluate(() => document.getElementById('beat-2').scrollIntoView());
  await page.waitForTimeout(150);
  const quad = await page.$('g[aria-label*="THE WANTED"]');
  await quad.focus();
  await page.keyboard.press('Enter');
  await page.waitForTimeout(80);
  const readout = await page.$eval('.readout-title', e => e.textContent.trim());
  ok(readout === 'THE WANTED', `Fig.1 quadrant Enter selects (readout: ${readout})`);

  // ---- ruler band roving ----
  await page.focus('#ruler-band-i');
  await page.keyboard.press('ArrowDown');
  await page.waitForTimeout(200);
  const rulerFocus = await page.evaluate(() => document.activeElement?.id);
  ok(rulerFocus === 'ruler-band-ii', `ruler band ArrowDown roves focus (got: ${rulerFocus})`);

  // ---- WeeklyLetter NETWORK-ERROR path (the V3 failure mode) ----
  await page.route('**/api/subscribe', r => r.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ error: 'server exploded' }) }));
  await page.evaluate(() => document.getElementById('beat-7').scrollIntoView());
  await page.waitForTimeout(150);
  await page.fill('#wl-email', 'real@example.com');
  await page.click('.v3-letter-form button[type="submit"]');
  await page.waitForTimeout(400);
  const successAfter500 = await page.$('.v3-letter-success');
  const errAfter500 = await page.$('#wl-err');
  ok(successAfter500 === null, 'HTTP 500 does NOT show success text');
  ok(errAfter500 !== null, 'HTTP 500 shows a visible error message');
  await page.unroute('**/api/subscribe');

  // abort/network reject
  await page.route('**/api/subscribe', r => r.abort());
  await page.reload({ waitUntil: 'networkidle' });
  await page.evaluate(() => document.getElementById('beat-7').scrollIntoView());
  await page.fill('#wl-email', 'real2@example.com');
  await page.click('.v3-letter-form button[type="submit"]');
  await page.waitForTimeout(400);
  const successAfterAbort = await page.$('.v3-letter-success');
  ok(successAfterAbort === null, 'aborted request does NOT show success text');
  await page.unroute('**/api/subscribe');

  // ---- reduced motion: getAnimations ----
  const rm = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce', colorScheme: 'dark' });
  const rmp = await rm.newPage();
  await rmp.goto(URL, { waitUntil: 'networkidle' });
  await rmp.waitForTimeout(500);
  const running = await rmp.evaluate(() =>
    document.getAnimations().filter(a => a.playState === 'running').length);
  ok(running === 0, `reduced-motion: 0 running animations (found ${running})`);
  const glowCount = await rmp.evaluate(() => {
    let n = 0;
    for (const el of document.querySelectorAll('#synthesis-root *'))
      if (getComputedStyle(el).boxShadow !== 'none') n++;
    return n;
  });
  ok(glowCount === 0, `reduced-motion: 0 box-shadows (found ${glowCount})`);
  const beadPresent = await rmp.$('.v3-ruler-bead');
  ok(beadPresent !== null, 'reduced-motion: bead still present');
  await rm.close();

  // ---- axe-core ----
  const axePath = ['node_modules/axe-core/axe.min.js']
    .map(p => path.resolve(process.cwd(), p)).find(fs.existsSync);
  if (axePath) {
    for (const vw of [{ w: 1440, h: 900 }, { w: 390, h: 844 }]) {
      const ac = await browser.newContext({ viewport: { width: vw.w, height: vw.h }, colorScheme: 'dark' });
      const ap = await ac.newPage();
      await ap.goto(URL, { waitUntil: 'networkidle' });
      await ap.addScriptTag({ path: axePath });
      const res = await ap.evaluate(async () => await window.axe.run(document, { resultTypes: ['violations'] }));
      const serious = res.violations.filter(v => ['serious', 'critical'].includes(v.impact));
      ok(serious.length === 0, `[axe ${vw.w}] 0 serious/critical (found ${serious.length}: ${serious.map(v => v.id).join(', ')})`);
      for (const v of res.violations)
        console.log(`     [axe ${vw.w}] ${v.impact}: ${v.id} (${v.nodes.length}) — ${v.help}`);
      await ac.close();
    }
  } else {
    console.log('  ~ axe-core not installed; skipping axe run (install: npm i -D axe-core)');
  }

  // ---- close-up screenshots ----
  const cu = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: 'dark' });
  const cup = await cu.newPage();
  await cup.goto(URL, { waitUntil: 'networkidle' });
  const shot = async (sel, name) => {
    const el = await cup.$(sel);
    if (el) { await el.scrollIntoViewIfNeeded(); await cup.waitForTimeout(200); await el.screenshot({ path: path.join(OUT, `audit-closeup-${name}.png`) }); console.log('  ✓ closeup', name); }
    else console.log('  ~ closeup missing', name, sel);
  };
  await shot('#beat-1 .v3-hero-grid', 'hero');
  await shot('.v3-fig1-figure', 'fig1');
  await cup.click('#beat4-depth-key-interpretation'); await cup.waitForTimeout(150);
  await shot('#beat-4 .v3-anatomy-grid', 'anatomy-interp');
  await cup.click('#beat3-depth-key-interpretation'); await cup.waitForTimeout(150);
  await shot('#beat-3 .v3-method-deck-wrap', 'method-interp');
  await shot('.v3-unsurveyed-void', 'void');
  await shot('.v3-radial-figure', 'dial');
  await shot('#beat-7', 'entry');
  await shot('.v3-topbar', 'topbar');
  await cu.close();

  await browser.close();
  console.log(`\n==== AUDIT SUITE: ${pass} pass / ${fail} fail ====`);
  if (fails.length) { console.log('FAILURES:'); fails.forEach(f => console.log('  -', f)); }
  process.exit(fail > 0 ? 1 : 0);
};
run().catch(e => { console.error('FATAL', e); process.exit(1); });
