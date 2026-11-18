/* global process, fetch, setTimeout, console, window */
// Close-up shots of the redesigned cushion, trampoline and the dive pose at 390x844 (SwiftShader).
// node tools/shots-pads.mjs  -> art/shots/auto/pads-*.png (gitignored)
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
mkdirSync('art/shots/auto', { recursive: true });
const port = Number(process.env.PORT ?? 4199);
const srv = spawn('pnpm', ['exec', 'vite', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
const base = `http://localhost:${port}/tools/pads-harness.html?gfx=low`;
for (let i = 0; i < 80; i++) { try { if ((await fetch(base)).ok) break; } catch { await new Promise((r) => setTimeout(r, 250)); } }
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const p = await (await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1 })).newPage();
p.on('pageerror', (e) => console.log('page error:', e.message));
await p.goto(base);
await p.waitForFunction('window.__ready === true', null, { timeout: 60000 });
const info = await p.evaluate(() => window.__p);
console.log(JSON.stringify(info));
const shot = async (n) => p.screenshot({ path: `art/shots/auto/pads-${n}.png` });
if (info.cushion) {
  const [x, y, z] = info.cushion;
  await p.evaluate(([x, y, z]) => window.__p.view(x - 2.5, y + 2.6, z + 5.5, x, y, z), [x, y, z]);
  await shot('cushion');
}
if (info.tramp) {
  const [x, y, z] = info.tramp;
  await p.evaluate(([x, y, z]) => window.__p.view(x - 2.6, y + 1.0, z + 3.4, x, y + 0.1, z), [x, y, z]);
  await shot('tramp');
}
if (info.cushion) {
  const [x, y, z] = info.cushion;
  await p.evaluate(([x, y, z]) => { window.__p.hero(x, y + 3.2, z, true); window.__p.view(x - 4.5, y + 3.4, z + 1.2, x, y + 3.0, z); }, [x, y, z]);
  await shot('dive');
}
await b.close(); srv.kill();
