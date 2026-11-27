/* global fetch, setTimeout, console, window, process */
// node tools/shots-spikes.mjs [outDir]  -> renders each spike rider at the reference views
// (SwiftShader, not a device test). Prints draw calls and triangles per shot.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const out = process.argv[2] ?? 'art/shots/auto';
mkdirSync(out, { recursive: true });
const port = 4197;
const srv = spawn('pnpm', ['exec', 'vite', '--port', String(port), '--strictPort'], {
  stdio: 'ignore',
});
const base = `http://localhost:${port}/tools/spikes-harness.html`;
for (let i = 0; i < 80; i++) {
  try {
    if ((await fetch(base)).ok) break;
  } catch {
    await new Promise((r) => setTimeout(r, 250));
  }
}
const b = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
  args: [
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    '--no-sandbox',
  ],
});
const shots = [
  ['hero', 'three', '&yaw=0'],
  ['hero', 'side', '&yaw=0'],
  ['horse-bow', 'side', '&yaw=0'],
  ['horse-bow', 'three', '&yaw=-1.1'],
  ['bike-rifle', 'side', '&yaw=0'],
  ['bike-rifle', 'three', '&yaw=-0.9'],
  ['horse-bow', 'front', '&yaw=0'],
  ['horse-bow', 'back', '&yaw=0'],
];
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
for (const detail of process.env.DETAIL ? [Number(process.env.DETAIL)] : [0, 1]) {
  for (const [kind, view, extra] of shots) {
    if (only && !only.includes(`${kind}-${view}`)) continue;
    const p = await b.newPage({ viewport: { width: 1024, height: 1024 } });
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto(`${base}?kind=${kind}&view=${view}&detail=${detail}${extra}${process.env.EXTRA ?? ''}`);
    await p
      .waitForFunction(() => window.__ready === true, null, { timeout: 30000 })
      .catch(() => {});
    const info = await p.evaluate(() => window.__info);
    await p.screenshot({ path: `${out}/spike-${kind}-${view}-d${detail}.png` });
    console.log(kind, view, 'detail', detail, JSON.stringify(info), errs.join(' | '));
    await p.close();
  }
}
await b.close();
srv.kill();
