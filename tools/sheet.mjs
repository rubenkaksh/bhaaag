/* global process, console */
// Contact sheet: node tools/sheet.mjs <out.png> <img1> <img2> ... [--cols=3] [--w=480]
// Tiles images into ONE labelled PNG (label = file name) so a review reads one image, not ten.
// For video: extract frames first (e.g. ffmpeg -i clip.mp4 -vf fps=2 f_%02d.png), then pass them here.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const args = process.argv.slice(2);
const opt = (k, d) => Number((args.find((a) => a.startsWith(`--${k}=`)) ?? '').split('=')[1] ?? d) || d;
const files = args.filter((a) => !a.startsWith('--'));
const out = files.shift();
if (!out || files.length === 0) {
  console.error('usage: node tools/sheet.mjs <out.png> <img...> [--cols=3] [--w=480]');
  process.exit(1);
}
const cols = Math.min(opt('cols', 3), files.length);
const w = opt('w', 480);
const mime = (f) => (/\.jpe?g$/i.test(f) ? 'jpeg' : 'png');
const cells = files
  .map(
    (f, i) =>
      `<figure><img src="data:image/${mime(f)};base64,${readFileSync(f).toString('base64')}"><figcaption>${i + 1}. ${basename(f)}</figcaption></figure>`,
  )
  .join('');
const html = `<body style="margin:0;background:#222;font:14px sans-serif;color:#fff">
<div style="display:grid;grid-template-columns:repeat(${cols},${w}px);gap:6px;padding:6px;width:max-content">${cells}</div>
<style>figure{margin:0}img{width:${w}px;display:block}figcaption{padding:2px 0}</style></body>`;
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: cols * (w + 6) + 6, height: 200 } });
await page.setContent(html);
await page.screenshot({ path: out, fullPage: true });
await browser.close();
console.log(`wrote ${out} (${files.length} images)`);
