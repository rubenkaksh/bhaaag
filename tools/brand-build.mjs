/* global console */
// Renders the link-preview card and the home-screen icons from the lobby's own art
// (src/adapters/ui/lobby.ts ART svg), so the share image matches the game.
//   node tools/brand-build.mjs
// Writes public/og.png (1200x630), public/apple-touch-icon.png (180), public/icon-512.png, public/favicon.png (64).
// Not part of the build: re-run only when the lobby look changes. Needs playwright's chromium.
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const lobbySrc = readFileSync(resolve(root, 'src/adapters/ui/lobby.ts'), 'utf8');
const art = /const ART = `([\s\S]*?<\/svg>)`/.exec(lobbySrc)?.[1];
if (art === undefined) throw new Error('ART svg not found in lobby.ts');

const TITLE_SHADOW = (em) =>
  `0 ${0.05 * em}px 0 #a8443f, 0 ${0.1 * em}px 0 #5b2b53, 0 ${0.14 * em}px ${0.3 * em}px rgba(40,14,30,0.7)`;

const card = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;width:1200px;height:630px;overflow:hidden;background:#3b2a5c}
#lobby-art{position:absolute;inset:0;width:100%;height:100%}
.t{position:absolute;left:430px;right:30px;top:40px;text-align:center}
h1{margin:0;font:900 150px/1 Georgia,'Times New Roman',serif;letter-spacing:.04em;text-transform:uppercase;color:#ffd35a;text-shadow:${TITLE_SHADOW(150)}}
p{margin:22px auto 0;max-width:640px;font:600 28px/1.35 -apple-system,'Helvetica Neue',Arial,sans-serif;letter-spacing:.18em;text-transform:uppercase;color:#fff6e4;text-shadow:0 2px 8px rgba(40,14,30,.9)}
</style>${art}<div class="t"><h1>Bhaaag</h1><p>Slide the Kathmandu rooftops at sunset</p></div>`;

const icon = `<!doctype html><meta charset="utf-8"><style>
html,body{margin:0;width:512px;height:512px;overflow:hidden}
#lobby-art{position:absolute;inset:0;width:100%;height:100%}
b{position:absolute;left:0;right:0;top:50px;text-align:center;font:900 380px/1 Georgia,'Times New Roman',serif;color:#ffd35a;text-shadow:${TITLE_SHADOW(380)}}
</style><svg id="lobby-art" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2a5c"/><stop offset=".5" stop-color="#a8443f"/><stop offset="1" stop-color="#ee9a4a"/></linearGradient></defs><rect width="160" height="90" fill="url(#g)"/><path d="M0 90 L0 74 Q30 68 60 74 T120 70 T160 76 L160 90Z" fill="#2a1430"/></svg><b>B</b>`;

async function shot(page, html, w, h, out, scale = 1) {
  await page.setViewportSize({ width: w, height: h });
  await page.setContent(html);
  await page.screenshot({ path: resolve(root, 'public', out), clip: { x: 0, y: 0, width: w, height: h } });
  void scale;
}

const browser = await chromium.launch();
const page = await browser.newPage();
await shot(page, card, 1200, 630, 'og.png');
await shot(page, icon, 512, 512, 'icon-512.png');
// Smaller icons: render the 512 icon at a lower viewport via device scale factor.
for (const [size, out] of [
  [180, 'apple-touch-icon.png'],
  [64, 'favicon.png'],
]) {
  const p = await browser.newPage({ viewport: { width: 512, height: 512 }, deviceScaleFactor: size / 512 });
  await p.setContent(icon);
  await p.screenshot({ path: resolve(root, 'public', out), clip: { x: 0, y: 0, width: 512, height: 512 } });
  await p.close();
}
await browser.close();
console.log('wrote public/og.png, icon-512.png, apple-touch-icon.png, favicon.png');
