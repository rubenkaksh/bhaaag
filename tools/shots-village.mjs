/* global process, fetch, setTimeout, console */
// Cloud Village (?mode=village) screenshots: node tools/shots-village.mjs [label]
// Serves dist/ via vite preview; shoots low and medium at 390x844 and 844x390 (touch): the
// lobby, the spawn view and a mid-hop view. Writes art/shots/auto/<label>-village-<tier>-<size>-<shot>.png.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const label = process.argv[2] ?? 'shot';
const tilt = process.env.TILT ?? '0';
const port = Number(process.env.PORT ?? 4184);
mkdirSync('art/shots/auto', { recursive: true });
const srv = spawn('pnpm', ['exec', 'vite', 'preview', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
const base = `http://localhost:${port}/`;
for (let i = 0; i < 50; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {
    await new Promise((r) => setTimeout(r, 200));
  }
}
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let errors = 0;
for (const tier of (process.env.TIERS ?? 'low,medium').split(',')) {
  for (const [name, vp] of [
    ['portrait', { width: 390, height: 844 }],
    ['landscape', { width: 844, height: 390 }],
  ]) {
    const ctx = await browser.newContext({ viewport: vp, hasTouch: true, isMobile: true });
    const page = await ctx.newPage();
    page.on('console', (m) => {
      if (m.type() === 'error') {
        errors++;
        console.log(`[${tier}/${name}] console error: ${m.text()}`);
      }
    });
    page.on('pageerror', (e) => {
      errors++;
      console.log(`[${tier}/${name}] page error: ${e.message}`);
    });
    const shot = (s) => page.screenshot({ path: `art/shots/auto/${label}-village-${tier}-${name}-${s}.png` });
    await page.goto(`${base}?mode=village&gfx=${tier}&tilt=${tilt}&debug`);
    await page.waitForTimeout(2000);
    await shot('lobby');
    await page.getByText('PLAY', { exact: true }).first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(3500);
    await shot('spawn');
    await page.waitForTimeout(6000);
    await shot('later');
    await ctx.close();
  }
}
await browser.close();
srv.kill();
console.log(errors === 0 ? 'no console errors' : `${errors} console errors`);
