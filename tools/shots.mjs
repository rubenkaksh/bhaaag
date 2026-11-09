// Screenshot capture for graphics phases: node tools/shots.mjs [phaseLabel]
// Serves dist/ via vite preview, shoots ?gfx=low|medium|high at 1920x1080 and 640x360 (touch),
// logs console errors, writes art/shots/auto/<label>-<tier>-<size>.png (gitignored).
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const label = process.argv[2] ?? 'shot';
const port = 4177;
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
    await page.goto(`${base}?gfx=${tier}&debug`);
    await page.waitForTimeout(2500);
    await page.getByText('PLAY', { exact: true }).first().click({ timeout: 3000 }).catch(() => {});
    await page.waitForTimeout(2500);
    await page.screenshot({ path: `art/shots/auto/${label}-${tier}-${name}.png` });
    await ctx.close();
  }
}
await browser.close();
srv.kill();
console.log(`done, ${errors} console errors`);
process.exit(errors > 0 ? 1 : 0);
