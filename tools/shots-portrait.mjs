/* global process, fetch, setTimeout, console, document, window */
// Portrait + regression screenshots: node tools/shots-portrait.mjs [label]
// Serves dist/ via vite preview on port 4182 (Track 2 only), shoots phone portrait
// (390x844, 430x932, DPR 3 touch), landscape 844x390 and desktop 1920x1080, and runs a live
// rotation (390x844 -> 844x390 -> 390x844) mid-run. Writes art/shots/auto/<label>-*.png.
// Exit 1 on page errors, console errors, or a canvas that does not follow the viewport.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync } from 'node:fs';

const label = process.argv[2] ?? 'p';
const port = 4182;
const gfx = process.env.GFX ?? 'medium';
const dpr = Number(process.env.DPR ?? 3);
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
const fail = (tag, msg) => {
  errors++;
  console.log(`[${tag}] ${msg}`);
};
const shot = (page, name) => page.screenshot({ path: `art/shots/auto/${label}-${name}.png` });

async function open(tag, vp, touch, scale) {
  const ctx = await browser.newContext({
    viewport: vp,
    hasTouch: touch,
    isMobile: touch,
    deviceScaleFactor: scale,
  });
  const page = await ctx.newPage();
  page.on('console', (m) => m.type() === 'error' && fail(tag, `console error: ${m.text()}`));
  page.on('pageerror', (e) => fail(tag, `page error: ${e.message}`));
  await page.goto(`${base}?gfx=${gfx}`);
  await page.waitForTimeout(2500);
  return { ctx, page };
}
const play = async (page) => {
  await page.locator('#lobby-play').click({ timeout: 4000 }).catch(() => {});
  await page.waitForTimeout(2500);
};
// Hold a touch button by dispatching pointer events (Playwright's touchscreen only taps).
const hold = async (page, sel, ms) => {
  const init = { pointerId: 7, pointerType: 'touch', isPrimary: true, bubbles: true, cancelable: true };
  await page.dispatchEvent(sel, 'pointerdown', init);
  await page.waitForTimeout(ms);
  await page.dispatchEvent(sel, 'pointerup', init);
};
const canvasCheck = async (page, tag) => {
  const r = await page.evaluate(() => {
    const c = document.querySelector('#game');
    const b = c.getBoundingClientRect();
    return { cw: c.width, ch: c.height, bw: b.width, bh: b.height, w: window.innerWidth, h: window.innerHeight };
  });
  const okBox = Math.abs(r.bw - r.w) < 1 && Math.abs(r.bh - r.h) < 1;
  const okAspect = Math.abs(r.cw / r.ch - r.w / r.h) < 0.02;
  if (!okBox || !okAspect) fail(tag, `canvas does not follow viewport: ${JSON.stringify(r)}`);
  return r;
};

// Phones in portrait.
for (const [name, vp] of [
  ['390x844', { width: 390, height: 844 }],
  ['430x932', { width: 430, height: 932 }],
]) {
  const { ctx, page } = await open(`portrait ${name}`, vp, true, dpr);
  await shot(page, `portrait-${name}-lobby`);
  await play(page);
  await shot(page, `portrait-${name}-spawn`);
  await hold(page, '#btn-action', 700);
  await page.waitForTimeout(900);
  await shot(page, `portrait-${name}-action`);
  await canvasCheck(page, `portrait ${name}`);
  await ctx.close();
}

// Landscape phone + desktop regression.
for (const [name, vp, touch, scale] of [
  ['844x390', { width: 844, height: 390 }, true, dpr],
  ['1920x1080', { width: 1920, height: 1080 }, false, 1],
]) {
  const { ctx, page } = await open(`landscape ${name}`, vp, touch, scale);
  await shot(page, `land-${name}-lobby`);
  await play(page);
  await shot(page, `land-${name}-spawn`);
  await canvasCheck(page, `landscape ${name}`);
  await ctx.close();
}

// Live rotation mid-run.
{
  const tag = 'rotate';
  const { ctx, page } = await open(tag, { width: 390, height: 844 }, true, dpr);
  await play(page);
  await hold(page, '#btn-action', 300);
  for (const [name, vp] of [
    ['to-land', { width: 844, height: 390 }],
    ['back-portrait', { width: 390, height: 844 }],
  ]) {
    await page.setViewportSize(vp);
    await page.waitForTimeout(1200);
    const r = await canvasCheck(page, `${tag} ${name}`);
    console.log(`[${tag}] ${name}: viewport ${r.w}x${r.h}, canvas ${r.cw}x${r.ch}`);
    await shot(page, `rotate-${name}`);
  }
  await ctx.close();
}

await browser.close();
srv.kill();
console.log(`done, ${errors} problems`);
process.exit(errors > 0 ? 1 : 0);
