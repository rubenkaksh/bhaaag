/* global process, fetch, setTimeout, console, localStorage, document, window */
// Touch control screenshots: node tools/shots-touch.mjs [label]
// Serves dist/ on port 4184, shoots each mode in portrait (390x844) and landscape (844x390) with
// the floating stick down and the single right-hand button visible. Writes art/shots/auto/.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const label = process.argv[2] ?? 'touch';
const port = 4184;
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
const ptr = (id, x, y) => ({
  pointerId: id,
  pointerType: 'touch',
  isPrimary: true,
  bubbles: true,
  cancelable: true,
  clientX: x,
  clientY: y,
});

for (const mode of ['classic', 'chase']) {
  for (const [tag, vp] of [
    ['portrait', { width: 390, height: 844 }],
    ['landscape', { width: 844, height: 390 }],
  ]) {
    const ctx = await browser.newContext({
      viewport: vp,
      hasTouch: true,
      isMobile: true,
      deviceScaleFactor: 2,
    });
    await ctx.addInitScript((m) => localStorage.setItem('zt.mode', m), mode);
    const page = await ctx.newPage();
    page.on('console', (m) => {
      if (m.type() === 'error') {
        errors++;
        console.log(`[${mode}-${tag}] console error: ${m.text()}`);
      }
    });
    page.on('pageerror', (e) => {
      errors++;
      console.log(`[${mode}-${tag}] page error: ${e.message}`);
    });
    await page.goto(`${base}?gfx=low&seed=7`);
    await page.waitForTimeout(1500);
    await page.getByText('PLAY', { exact: true }).first().click({ timeout: 4000 }).catch(() => {});
    await page.waitForTimeout(3000);
    // Left thumb lands: the floating stick appears under it and pushes up-right.
    const sx = vp.width * 0.22;
    const sy = vp.height * 0.72;
    await page.dispatchEvent('#stick-zone', 'pointerdown', ptr(11, sx, sy));
    await page.dispatchEvent('#stick-zone', 'pointermove', ptr(11, sx + 30, sy - 40));
    await page.waitForTimeout(500);
    const info = await page.evaluate(() => {
      const b = document.querySelector('#btn-jump').getBoundingClientRect();
      return {
        w: Math.round(b.width),
        right: Math.round(window.innerWidth - b.right),
        bottom: Math.round(window.innerHeight - b.bottom),
        label: document.querySelector('#btn-jump .lbl')?.textContent,
        legacy: document.querySelector('#btn-action') !== null,
      };
    });
    console.log(`${mode}-${tag}`, JSON.stringify(info));
    await page.screenshot({ path: `art/shots/auto/${label}-${mode}-${tag}.png` });
    await page.dispatchEvent('#stick-zone', 'pointerup', ptr(11, sx + 30, sy - 40));
    await ctx.close();
  }
}
await browser.close();
srv.kill();
console.log(`done, ${errors} errors`);
process.exit(errors > 0 ? 1 : 0);
