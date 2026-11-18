/* global document, Image, btoa, console, Buffer */
// Backdrop texture build (owner decision 2026-11-18). No sharp in the lockfile, so the pixel work
// runs in headless Chromium canvas through playwright (already a devDependency).
//   node tools/backdrop-build.mjs
// Reads art-src/backdrop/{plate,ridges-sheet,ridge3}.webp and writes per-tier WebP files to
// public/assets/textures/backdrop/:
//   plate_{low,medium,high}.webp   far snow range, seam cross-faded so it wraps 360 degrees,
//                                  top rows fade to alpha 0 into the sky gradient
//   far_{...}.webp                 hazy foothills card (ridge3), chroma-keyed
//   near_{...}.webp                pine hill with houses (top half of the sheet), chroma-keyed
// The forest card (bottom half of the sheet) is not used in game; it is not exported.
// Key: #00FF00 -> alpha with a soft threshold, alpha eroded 1 px, edge-ring colours rebuilt from
// the nearest solid pixels so no green halo survives (premultiplied canvas storage means RGB under
// alpha 0 is lost: the dark-pine bleed at silhouettes is intended).
// Byte targets keep each tier under its texture cap (Low 150 / Medium 300 / High 600 KB, whole
// tier incl. the wall tiles, see src/adapters/render/textureManifest.ts).
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const SRC = 'art-src/backdrop/';
const OUT = 'public/assets/textures/backdrop/';
mkdirSync(OUT, { recursive: true });

// width (px) and byte target per tier and asset; height follows the aspect
const PLAN = {
  low: { plate: [768, 21000], near: [512, 24000] },
  medium: { plate: [1024, 44000], far: [1024, 42000], near: [800, 52000] },
  high: { plate: [1800, 130000], far: [1600, 100000], near: [1774, 125000] },
};
// haze baked into the cards (0 = untouched), colour is the foothill haze of the plate
const HAZE = { far: [0.18, '#c7a9a4'], near: [0.1, '#c7a9a4'] };
const SEAM = 0.1; // fraction of the plate width cross-faded
const FADE_TOP = 0.16; // plate rows faded to alpha 0
const b64 = (f) => readFileSync(SRC + f).toString('base64');

const browser = await chromium.launch();
const page = await browser.newPage();
await page.setContent('<canvas id="c"></canvas>');

const result = await page.evaluate(
  async ({ plan, haze, seam, fadeTop, files }) => {
    const load = async (s) => {
      const im = new Image();
      im.src = 'data:image/webp;base64,' + s;
      await im.decode();
      return im;
    };
    const mk = (w, h) => {
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      return c;
    };
    const toCanvas = (im) => {
      const c = mk(im.width, im.height);
      c.getContext('2d').drawImage(im, 0, 0);
      return c;
    };
    const px = (c) => c.getContext('2d').getImageData(0, 0, c.width, c.height);
    const put = (c, d) => c.getContext('2d').putImageData(d, 0, 0);
    const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16));
    const smooth = (a, b, v) => {
      const t = Math.min(1, Math.max(0, (v - a) / (b - a)));
      return t * t * (3 - 2 * t);
    };

    // ---- chroma key + despill: returns a canvas with alpha
    const key = (src) => {
      const w = src.width;
      const h = src.height;
      const d = px(src);
      const p = d.data;
      const n = w * h;
      const a = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const r = p[i * 4];
        const g = p[i * 4 + 1];
        const b = p[i * 4 + 2];
        const spill = g - Math.max(r, b); // 255 on the key, <= ~70 on real pines
        a[i] = 1 - smooth(55, 150, spill);
      }
      // erode 1 px (min over 3x3) to drop the half-key rim
      const e = new Float32Array(n);
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          let m = 1;
          for (let dy = -1; dy <= 1; dy++)
            for (let dx = -1; dx <= 1; dx++) {
              const xx = Math.min(w - 1, Math.max(0, x + dx));
              const yy = Math.min(h - 1, Math.max(0, y + dy));
              m = Math.min(m, a[yy * w + xx]);
            }
          e[y * w + x] = m;
        }
      // solid = alpha 1 and no non-solid pixel within 3 px: safe colour donors
      const solid = new Uint8Array(n);
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          let ok = e[y * w + x] > 0.99;
          for (let dy = -3; dy <= 3 && ok; dy += 3)
            for (let dx = -3; dx <= 3 && ok; dx += 3) {
              const xx = Math.min(w - 1, Math.max(0, x + dx));
              const yy = Math.min(h - 1, Math.max(0, y + dy));
              if (e[yy * w + xx] < 0.99) ok = false;
            }
          solid[y * w + x] = ok ? 1 : 0;
        }
      const out = new Uint8ClampedArray(p);
      for (let y = 0; y < h; y++)
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          if (solid[i]) {
            out[i * 4 + 3] = 255;
            continue;
          }
          // edge ring: average the solid donors within 5 px; no donors -> clamp the spill
          let sr = 0;
          let sg = 0;
          let sb = 0;
          let c = 0;
          for (let dy = -5; dy <= 5; dy++)
            for (let dx = -5; dx <= 5; dx++) {
              const xx = x + dx;
              const yy = y + dy;
              if (xx < 0 || yy < 0 || xx >= w || yy >= h) continue;
              const j = yy * w + xx;
              if (!solid[j]) continue;
              sr += p[j * 4];
              sg += p[j * 4 + 1];
              sb += p[j * 4 + 2];
              c++;
            }
          if (c > 0) {
            out[i * 4] = sr / c;
            out[i * 4 + 1] = sg / c;
            out[i * 4 + 2] = sb / c;
          } else {
            const r = p[i * 4];
            const b = p[i * 4 + 2];
            out[i * 4 + 1] = Math.min(p[i * 4 + 1], Math.max(r, b));
          }
          out[i * 4 + 3] = Math.round(e[i] * 255);
        }
      d.data.set(out);
      const c = mk(w, h);
      put(c, d);
      return c;
    };

    const hazeIt = (c, [k, col]) => {
      const d = px(c);
      const hz = hex(col);
      for (let i = 0; i < d.data.length; i += 4)
        for (let ch = 0; ch < 3; ch++) d.data[i + ch] = d.data[i + ch] * (1 - k) + hz[ch] * k;
      put(c, d);
      return c;
    };

    // bottom 10 percent fades to alpha 0 so the card never ends in a hard line
    const fadeBottom = (c, frac) => {
      const d = px(c);
      const h0 = Math.floor(c.height * (1 - frac));
      for (let y = h0; y < c.height; y++) {
        const f = 1 - (y - h0) / (c.height - h0);
        for (let x = 0; x < c.width; x++) d.data[(y * c.width + x) * 4 + 3] *= f;
      }
      put(c, d);
      return c;
    };

    // ---- plate: cross-fade the left/right seam over `seam` of the width, fade the top to alpha 0
    const plateSeam = (im) => {
      const w = im.width;
      const h = im.height;
      const o = Math.round(w * seam);
      const ow = w - o;
      const src = px(toCanvas(im)).data;
      const c = mk(ow, h);
      const d = c.getContext('2d').createImageData(ow, h);
      for (let y = 0; y < h; y++) {
        const fy = y / (h * fadeTop);
        const alpha = fy >= 1 ? 255 : Math.round(255 * smooth(0, 1, fy));
        for (let x = 0; x < ow; x++) {
          const t = x < o ? smooth(0, 1, x / o) : 1;
          const a = (y * w + x) * 4; // src[x]
          const b = (y * w + (w - o + x)) * 4; // tail, meets src[w-o-1] -> src[w-o+x]
          const k = (y * ow + x) * 4;
          for (let ch = 0; ch < 3; ch++)
            d.data[k + ch] = x < o ? src[b + ch] * (1 - t) + src[a + ch] * t : src[a + ch];
          d.data[k + 3] = alpha;
        }
      }
      c.getContext('2d').putImageData(d, 0, 0);
      return c;
    };

    const scale = (c, w) => {
      const h = Math.round((c.height * w) / c.width);
      const o = mk(w, h);
      const g = o.getContext('2d');
      g.imageSmoothingEnabled = true;
      g.imageSmoothingQuality = 'high';
      g.drawImage(c, 0, 0, w, h);
      return o;
    };

    const enc = async (c, target) => {
      const blob = (q) => new Promise((r) => c.toBlob(r, 'image/webp', q));
      let lo = 0.2;
      let hi = 0.95;
      let best = await blob(lo);
      for (let i = 0; i < 9; i++) {
        const mid = (lo + hi) / 2;
        const b = await blob(mid);
        if (b.size <= target) {
          best = b;
          lo = mid;
        } else hi = mid;
      }
      const buf = new Uint8Array(await best.arrayBuffer());
      let s = '';
      for (let i = 0; i < buf.length; i += 8192)
        s += String.fromCharCode(...buf.subarray(i, i + 8192));
      return { b64: btoa(s), bytes: buf.length, q: lo, w: c.width, h: c.height };
    };

    // ---- sources
    const plateIm = await load(files.plate);
    const sheetIm = await load(files.sheet);
    const ridge3 = await load(files.ridge3);

    // split the sheet at the row where the green fraction jumps up (card boundary)
    const sheet = toCanvas(sheetIm);
    const sd = px(sheet).data;
    const sw = sheet.width;
    const sh = sheet.height;
    const greenFrac = (y) => {
      let g = 0;
      for (let x = 0; x < sw; x++) {
        const i = (y * sw + x) * 4;
        if (sd[i + 1] - Math.max(sd[i], sd[i + 2]) > 150) g++;
      }
      return g / sw;
    };
    let cut = Math.floor(sh / 2);
    let jump = 0;
    for (let y = Math.floor(sh * 0.35); y < Math.floor(sh * 0.65); y++) {
      const j = greenFrac(y) - greenFrac(y - 1);
      if (j > jump) {
        jump = j;
        cut = y;
      }
    }
    const topCard = mk(sw, cut);
    topCard.getContext('2d').drawImage(sheet, 0, 0, sw, cut, 0, 0, sw, cut);

    const keyedNear = fadeBottom(hazeIt(key(topCard), haze.near), 0.08);
    const keyedFar = fadeBottom(hazeIt(key(toCanvas(ridge3)), haze.far), 0.08);
    const plate = plateSeam(plateIm);

    const out = { cut, files: {} };
    const srcs = { plate, far: keyedFar, near: keyedNear };
    for (const tier of Object.keys(plan))
      for (const [name, [w, target]] of Object.entries(plan[tier])) {
        out.files[`${name}_${tier}.webp`] = await enc(scale(srcs[name], w), target);
      }
    return out;
  },
  {
    plan: PLAN,
    haze: HAZE,
    seam: SEAM,
    fadeTop: FADE_TOP,
    files: { plate: b64('plate.webp'), sheet: b64('ridges-sheet.webp'), ridge3: b64('ridge3.webp') },
  },
);
await browser.close();

console.log('sheet split row', result.cut);
const tot = { low: 0, medium: 0, high: 0 };
for (const [f, r] of Object.entries(result.files)) {
  writeFileSync(OUT + f, Buffer.from(r.b64, 'base64'));
  tot[f.split('_')[1].replace('.webp', '')] += r.bytes;
  console.log(f.padEnd(20), `${r.w}x${r.h}`, `${(r.bytes / 1024).toFixed(1)} KB`, `q=${r.q.toFixed(2)}`);
}
for (const [t, b] of Object.entries(tot)) console.log(`${t} backdrop total ${(b / 1024).toFixed(1)} KB`);
