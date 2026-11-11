/* global process, fetch, setTimeout, console, localStorage, window, document */
// Dragon Chase screenshots: node tools/shots-chase.mjs [label]
// Serves dist/ via vite preview on port 4183, writes art/shots/auto/<label>-<shot>.png.
// Prints __ztStats per shot, exits 1 on console errors or when a shot is over the chase budget.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const label = process.argv[2] ?? 'chase';
const port = 4183;
mkdirSync('art/shots/auto', { recursive: true });
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
const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
let errors = 0;
let over = 0;
// Budget (plan A3): chase may add at most +6 calls and +12k tris over Classic at the same tier.
// Classic is measured first in this run, so the check stays valid while Track 1 lowers the caps.
const classic = {};

async function shoot(name, { query = '', vp = { width: 1280, height: 720 }, touch = false, mode = 'chase', waitMs = 4000, tier = 'medium', setup } = {}) {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: touch, isMobile: touch });
  await ctx.addInitScript((m) => localStorage.setItem('zt.mode', m), mode);
  const page = await ctx.newPage();
  page.on('console', (m) => {
    if (m.type() === 'error') {
      errors++;
      console.log(`[${name}] console error: ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => {
    errors++;
    console.log(`[${name}] page error: ${e.message}`);
  });
  await page.goto(`${base}?gfx=${tier}&debug${query}`);
  await page.waitForTimeout(2000);
  await page.getByText('PLAY', { exact: true }).first().click({ timeout: 4000 }).catch(() => {});
  if (setup) await setup(page);
  await page.waitForTimeout(waitMs);
  await page.screenshot({ path: `art/shots/auto/${label}-${name}.png` });
  const stats = await page.evaluate(() => window.__ztStats ?? null);
  console.log(name, JSON.stringify(stats));
  if (stats && mode === 'classic') classic[tier] = stats;
  if (stats && mode === 'chase' && classic[tier] && stats.calls > 1) {
    const c = classic[tier].calls + 6;
    const t = classic[tier].triangles + 12000;
    if (stats.calls > c || stats.triangles > t) {
      over++;
      console.log(`[${name}] OVER BUDGET: calls ${stats.calls}/${c}, tris ${stats.triangles}/${t}`);
    }
  }
  await ctx.close();
}

async function shootCatch(suffix, vp, touch, tier = 'medium') {
  const ctx = await browser.newContext({ viewport: vp, hasTouch: touch, isMobile: touch });
  await ctx.addInitScript((m) => localStorage.setItem('zt.mode', m), 'chase');
  const page = await ctx.newPage();
  const name = `catch${suffix}`;
  page.on('console', (m) => {
    if (m.type() === 'error' || m.type() === 'warning') {
      if (m.type() === 'error') errors++;
      console.log(`[${name}] console ${m.type()}: ${m.text()}`);
    }
  });
  page.on('pageerror', (e) => {
    errors++;
    console.log(`[${name}] page error: ${e.message}`);
  });
  await page.goto(`${base}?gfx=${tier}&debug&seed=7&dragonGap=6`);
  await page.waitForTimeout(2000);
  await page.getByText('PLAY', { exact: true }).first().click({ timeout: 4000 }).catch(() => {});
  const cardUp = () => page.evaluate(() => { const c = document.querySelector('#chase-over'); return !!c && !c.classList.contains('off'); });
  let last = null;
  let found = false;
  for (let i = 0; i < 400 && !found; i++) {
    if (await cardUp()) { found = true; break; }
    last = await page.screenshot();
    await page.waitForTimeout(100);
  }
  if (!found || !last) {
    console.log(`[${name}] card never appeared`);
    errors++;
    await ctx.close();
    return;
  }
  const { writeFileSync } = await import('node:fs');
  writeFileSync(`art/shots/auto/${label}-catch-fill${suffix}.png`, last);
  await page.waitForTimeout(900);
  await page.screenshot({ path: `art/shots/auto/${label}-game-over-face${suffix}.png` });
  console.log(name, 'ok');
  await ctx.close();
}

await shoot('classic-spawn', { mode: 'classic', waitMs: 4200 });
await shoot('classic-spawn-high', { mode: 'classic', waitMs: 4200, tier: 'high' });
await shoot('pan-dragon', { query: '&seed=7', waitMs: 700 });
await shoot('pan-dragon-high', { query: '&seed=7', waitMs: 900, tier: 'high' });
await shoot('play-landscape', { query: '&seed=7', waitMs: 5200 });
await shoot('play-portrait', { query: '&seed=7', vp: { width: 390, height: 844 }, touch: true, waitMs: 5200 });
await shoot('cloud-creep', { query: '&seed=7&dragonGap=8', waitMs: 4600 });
await shoot('game-over', { query: '&seed=7&dragonGap=6', waitMs: 8000 });
await shoot('game-over-portrait', { query: '&seed=7&dragonGap=6', vp: { width: 390, height: 844 }, touch: true, waitMs: 8000 });
await shootCatch('', { width: 844, height: 390 }, false);
await shootCatch('-portrait', { width: 390, height: 844 }, true);
await shootCatch('-medium', { width: 844, height: 390 }, false, 'medium');
await shootCatch('-high', { width: 844, height: 390 }, false, 'high');
await browser.close();
srv.kill();
console.log(`done, ${errors} console errors, ${over} over budget`);
process.exit(errors > 0 || over > 0 ? 1 : 0);
