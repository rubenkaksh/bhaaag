/* global process, fetch, setTimeout, console, window */
// Perf budget check (docs/three-track-plan.md A3/A4): node tools/perf.mjs [label]
// Serves dist/ via vite preview (PORT, default 4181), runs every tier on three viewports,
// reads window.__ztStats (needs ?debug) at the spawn view and 3 s into a held-W run, and
// once more under 4x CPU throttle for jsMs. Writes art/perf/<label>.json, exits 1 over a cap.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';

const label = process.argv[2] ?? 'perf';
const port = Number(process.env.PORT ?? 4181);
mkdirSync('art/perf', { recursive: true });
const srv = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(port), '--strictPort'], {
  stdio: 'ignore',
});
const base = `http://localhost:${port}/`;
for (let i = 0; i < 50; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
}

// A3: main + shadow calls, triangles (main + shadow), shadow-pass calls (casters proxy).
const CAPS = {
  low: { calls: 55, shadow: 0, tris: 60000 },
  medium: { calls: 70 + 14, shadow: 14, tris: 110000 },
  high: { calls: 85 + 24, shadow: 24, tris: 170000 },
};
const JS_MS_CAP = 4;
const VIEWPORTS = [
  ['desktop', { width: 1920, height: 1080 }, false, 1],
  ['phoneL', { width: 844, height: 390 }, true, 3],
  ['phoneP', { width: 390, height: 844 }, true, 3],
];

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const results = [];
let failed = 0;

async function stats(page) {
  return page.evaluate(() => window.__ztStats ?? null);
}

for (const [vname, vp, touch, dpr] of VIEWPORTS) {
  for (const tier of ['low', 'medium', 'high']) {
    const ctx = await browser.newContext({
      viewport: vp,
      hasTouch: touch,
      isMobile: touch,
      deviceScaleFactor: dpr,
    });
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    page.on('pageerror', (e) => errs.push(e.message));
    await page.goto(`${base}?gfx=${tier}&debug`);
    await page.waitForTimeout(2500);
    await page
      .getByText('PLAY', { exact: true })
      .first()
      .click({ timeout: 3000 })
      .catch(() => {});
    await page.waitForTimeout(2500);
    const spawn0 = await stats(page);
    await page.keyboard.down('KeyW');
    await page.waitForTimeout(3000);
    const run = await stats(page);
    await page.keyboard.up('KeyW');
    // CPU-throttled JS cost (4x).
    const cdp = await ctx.newCDPSession(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    await page.waitForTimeout(3000);
    const thr = await stats(page);
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 1 });
    const cap = CAPS[tier];
    const problems = [];
    for (const [k, s] of [
      ['spawn', spawn0],
      ['run', run],
    ]) {
      if (s === null) {
        problems.push(`${k}: no __ztStats`);
        continue;
      }
      if (s.calls > cap.calls) problems.push(`${k}: calls ${s.calls} > ${cap.calls}`);
      if (s.triangles > cap.tris) problems.push(`${k}: tris ${s.triangles} > ${cap.tris}`);
      if (s.shadowCasters > cap.shadow)
        problems.push(`${k}: casters ${s.shadowCasters} > ${cap.shadow}`);
    }
    if (thr !== null && thr.jsMs > JS_MS_CAP)
      problems.push(`jsMs(4x) ${thr.jsMs.toFixed(2)} > ${JS_MS_CAP}`);
    if (errs.length > 0) problems.push(`console errors: ${errs.slice(0, 2).join(' | ')}`);
    failed += problems.length;
    const row = { viewport: vname, tier, spawn: spawn0, run, throttled: thr, problems };
    results.push(row);
    const f = (s) =>
      s === null
        ? 'n/a'
        : `${s.calls}c/${s.shadowCasters}sc/${(s.triangles / 1000).toFixed(1)}k pr${s.pixelRatio}`;
    console.log(
      `${vname.padEnd(8)}${tier.padEnd(7)}spawn ${f(spawn0)} | run ${f(run)} | js4x ${thr ? thr.jsMs.toFixed(2) : 'n/a'}ms ${problems.length ? 'FAIL ' + problems.join('; ') : 'ok'}`,
    );
    await ctx.close();
  }
}
await browser.close();
srv.kill();
writeFileSync(`art/perf/${label}.json`, JSON.stringify(results, null, 2));
console.log(failed === 0 ? 'all budgets met' : `${failed} budget problems`);
process.exit(failed === 0 ? 0 : 1);
