/* global process, fetch, setTimeout, console */
// backdrop check (2026-11-18); G=low|medium|high node tools/shots-backdrop.mjs  (needs a dist/ build)
// nagarkot-home play check: serves dist/ via vite preview, loads ?level=nagarkot-home at
// 390x844 and 844x390 (SwiftShader), logs console errors, shoots before / after a scripted forward run.
// node tools/shots-home-play.mjs  -> art/shots/auto/backdrop-*.png (gitignored)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
mkdirSync('art/shots/auto', { recursive: true });
const port = Number(process.env.PORT ?? 4198);
const srv = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
const G = process.env.G ?? 'low';
const base = `http://localhost:${port}/`;
for (let i = 0; i < 50; i++) {
  try { if ((await fetch(base)).ok) break; } catch { await new Promise((r) => setTimeout(r, 200)); }
}
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let errors = 0;
for (const [tag, w, h] of [['p', 390, 844], ['l', 844, 390]]) {
  const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  p.on('console', (m) => { if (m.type() === 'error') { errors++; console.log(`[${tag}] console error: ${m.text()}`); } });
  p.on('pageerror', (e) => { errors++; console.log(`[${tag}] page error: ${e.message}`); });
  await p.goto(`${base}?mode=classic&level=nagarkot-home&gfx=${G}&debug`);
  await p.waitForTimeout(4000);
  await p.screenshot({ path: `art/shots/auto/backdrop-${G}-${tag}-1-start.png` });
  await p.getByText('PLAY', { exact: true }).first().click({ timeout: 3000 }).catch(() => {});
  await p.waitForTimeout(4500); // mid flyover: the camera is far from the start, parallax check
  await p.screenshot({ path: `art/shots/auto/backdrop-${G}-${tag}-1b-flyover.png` });
  await p.waitForTimeout(4500); // flyover
  await p.keyboard.press('Space');
  await p.waitForTimeout(1500);
  await p.screenshot({ path: `art/shots/auto/backdrop-${G}-${tag}-2-play.png` });
  const cdp = await ctx.newCDPSession(p);
  const tp = (type, x, y) => cdp.send('Input.dispatchTouchEvent', { type, touchPoints: type === 'touchEnd' ? [] : [{ x, y, id: 1 }] });
  const sx = w > h ? 75 : 80;
  const sy = h - (w > h ? 120 : 76);
  await tp('touchStart', sx, sy);
  for (let i = 1; i <= 6; i++) await tp('touchMove', sx, sy - i * 8);
  await p.waitForTimeout(5000);
  await p.screenshot({ path: `art/shots/auto/backdrop-${G}-${tag}-3-run.png` });
  await p.waitForTimeout(6000);
  await p.screenshot({ path: `art/shots/auto/backdrop-${G}-${tag}-4-later.png` });
  await tp('touchEnd');
  await ctx.close();
}
await b.close();
srv.kill();
console.log('console/page errors:', errors);
