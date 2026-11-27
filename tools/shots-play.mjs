/* global fetch, setTimeout, console, window, process */
// node tools/shots-play.mjs [outDir]  -> screenshots of the playable spike (bot driving) at phone sizes.
// SwiftShader, not a device test. CHROMIUM_PATH=/opt/pw-browsers/chromium in this container.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';
const out = process.argv[2] ?? 'art/shots/auto';
mkdirSync(out, { recursive: true });
const port = 4198;
const srv = spawn('pnpm', ['exec', 'vite', '--port', String(port), '--strictPort'], {
  stdio: 'ignore',
});
const base = `http://localhost:${port}/spike.html`;
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
const VPS = [
  ['p', 390, 844],
  ['l', 844, 390],
];
const stages = [
  ['ride', '&ff=900'],
  ['camp', '&campAt=120'],
];
const only = process.env.ONLY ? process.env.ONLY.split(',') : null;
for (const spike of ['horse', 'bike']) {
  for (const [stage, extra] of stages) {
    for (const [tag, w, h] of VPS) {
      if (only && !only.includes(`${spike}-${stage}-${tag}`)) continue;
      const ctx = await b.newContext({
        viewport: { width: w, height: h },
        hasTouch: true,
        isMobile: true,
        deviceScaleFactor: 1,
      });
      const p = await ctx.newPage();
      const errs = [];
      p.on('pageerror', (e) => errs.push(e.message));
      p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
      await p.goto(
        `${base}?spike=${spike}&bot=1&seed=${process.env.SEED ?? 4}&shot=1&gfx=${process.env.GFX ?? 'low'}${extra}`,
      );
      await p.waitForTimeout(3500);
      const info = await p.evaluate(
        () =>
          window.__spike && {
            calls: window.__spike.info.calls,
            tris: window.__spike.info.tris,
            phase: window.__spike.run.phase,
          },
      );
      await p.screenshot({ path: `${out}/play-${spike}-${stage}-${tag}.png` });
      console.log(
        spike,
        stage,
        tag,
        JSON.stringify(info),
        errs.filter((e) => !e.includes('404')).join(' | '),
      );
      await ctx.close();
    }
  }
}
await b.close();
srv.kill();
