/* global process, fetch, setTimeout, console */
// Strategy maze (?mode=strategy) screenshots: node tools/shots-strategy.mjs [phaseLabel]
// Serves dist/ via vite preview, shoots ?gfx=low|medium|high at 1920x1080 and 640x360 (touch),
// logs console errors, writes art/shots/auto/<label>-<tier>-<size>.png (gitignored).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const label = process.argv[2] ?? 'shot';
const port = Number(process.env.PORT ?? 4183);
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
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
let errors = 0;
for (const tier of ['low', 'medium', 'high']) {
  for (const [name, vp, touch] of [
    ['1080', { width: 1920, height: 1080 }, false],
    ['360', { width: 640, height: 360 }, true],
    ['portrait', { width: 390, height: 844 }, true],
  ]) {
    const ctx = await browser.newContext({ viewport: vp, hasTouch: touch, isMobile: touch });
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
    await page.goto(`${base}?mode=strategy&gfx=${tier}&debug`);
    await page.waitForTimeout(2500);
    await page.getByText('PLAY', { exact: true }).first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `art/shots/auto/${label}-strategy-${tier}-${name}.png` });
    await ctx.close();
  }
}
// Best-effort action shots (medium, desktop): hook press, then run forward until something happens.
{
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 } });
  const page = await ctx.newPage();
  page.on('pageerror', (e) => {
    errors++;
    console.log(`[action] page error: ${e.message}`);
  });
  await page.goto(`${base}?mode=strategy&gfx=medium&debug`);
  await page.waitForTimeout(2500);
  await page.getByText('PLAY', { exact: true }).first().click({ timeout: 3000 }).catch(() => {});
  await page.waitForTimeout(2000);
  await page.keyboard.down('KeyE');
  await page.waitForTimeout(150);
  await page.keyboard.up('KeyE');
  await page.waitForTimeout(1200);
  await page.screenshot({ path: `art/shots/auto/${label}-strategy-action-hook.png` });
  await page.keyboard.down('KeyW');
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `art/shots/auto/${label}-strategy-action-run.png` });
  await page.keyboard.up('KeyW');
  await ctx.close();
}
await browser.close();
srv.kill();
console.log(`done, ${errors} console errors`);
process.exit(errors > 0 ? 1 : 0);
