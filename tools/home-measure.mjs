/* global fetch, setTimeout, console, window */
// T336b: draw calls (Low tier, SwiftShader) and screenshots for nagarkot-home dressing.
// node tools/home-measure.mjs  -> prints calls per view, writes art/shots/auto/t336b-*.png
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
mkdirSync('art/shots/auto', { recursive: true });
const port = 4195;
const srv = spawn('pnpm', ['exec', 'vite', '--port', String(port), '--strictPort'], { stdio: 'ignore' });
const base = `http://localhost:${port}/tools/home-harness.html`;
for (let i = 0; i < 80; i++) {
  try { if ((await fetch(base)).ok) break; } catch { await new Promise((r) => setTimeout(r, 250)); }
}
const b = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader'] });
const VPS = [['p', 390, 844], ['l', 844, 390]];
for (const kit of ['1', '0']) {
  for (const [tag, w, h] of VPS) {
    const ctx = await b.newContext({ viewport: { width: w, height: h }, hasTouch: true, isMobile: true, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const errs = [];
    p.on('pageerror', (e) => errs.push(e.message));
    p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
    await p.goto(`${base}?gfx=low&kit=${kit}`);
    await p.waitForFunction(() => window.__ready === true, null, { timeout: 60000 }).catch(() => {});
    await p.waitForTimeout(1500);
    const info = await p.evaluate(() => window.__h && { n: window.__h.nodes, hs: window.__h.houses, s: window.__h.start, nl: window.__h.nodeList, pv: window.__h.pivot });
    if (!info) { console.log('no harness', errs); continue; }
    const zs = info.nl.map((n) => n.z0), ys = info.nl.map((n) => n.y);
    const zTop = Math.max(...info.nl.map((n) => n.z1)), zBot = Math.min(...zs);
    const yTop = Math.max(...ys), yBot = Math.min(...ys);
    const views = {
      start: [info.s[0], info.s[1] + 6, info.s[2] + 14, info.s[0], info.s[1], info.s[2] - 30],
      mid: [0, (yTop + yBot) / 2 + 10, (zTop + zBot) / 2 + 22, 0, (yTop + yBot) / 2, (zTop + zBot) / 2 - 20],
      wide: [0, yTop + 120, zTop + 60, 0, (yTop + yBot) / 2, (zTop + zBot) / 2],
    };
    if (info.pv) {
      const [, py, pz] = info.pv; // T337: the bend, from above the corner and along the turned run
      views.bend = [-6, py + 38, pz + 52, 42, py - 4, pz - 6];
      views.turned = [30, py + 9, pz + 4, 120, py - 16, pz - 6];
    }
    const out = [];
    for (const [k, v] of Object.entries(views)) {
      const st = await p.evaluate((a) => window.__h.view(...a), v);
      out.push(`${k} ${st.calls}c/${(st.triangles / 1000).toFixed(1)}k`);
      if (kit === '1') await p.screenshot({ path: `art/shots/auto/t337-${tag}-${k}.png` });
    }
    console.log(`kit=${kit} ${tag} nodes ${info.n} kitHouses ${info.hs} | ${out.join(' | ')} | errs ${JSON.stringify(errs.slice(0, 2))}`);
    await ctx.close();
  }
}
await b.close();
srv.kill();
