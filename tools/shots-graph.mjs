/* global process, fetch, setTimeout, console */
// Scratch screenshot helper: node tools/_shot.mjs <tag> [mode]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
const [, , tag, mode] = process.argv;
const port = 4190;
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
const b = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'],
});
const ctx = await b.newContext({
  viewport: { width: 390, height: 844 },
  hasTouch: true,
  isMobile: true,
  deviceScaleFactor: 2,
});
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', (e) => errs.push(e.message));
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto(mode ? `${base}?mode=${mode}&gfx=low` : `${base}?gfx=low`);
await p.waitForTimeout(3500);
if (mode) {
  await p.locator('#lobby-play').click({ timeout: 4000 }).catch(() => {});
  await p.waitForTimeout(4000);
}
await p.screenshot({ path: `art/shots/auto/${tag}.png` });
console.log(tag, 'errors:', JSON.stringify(errs));
await b.close();
srv.kill();
