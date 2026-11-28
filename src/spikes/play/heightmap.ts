// Painted heightmaps for the ride (owner pick 2026-11-28). The page loads
// public/spikes/heightmaps/<horse|bike>.png when it exists and uses it in place of the noise hills.
// ?export=heightmap shows the current hills as a PNG to paint over, plus a guide with the trail on it.
import { gridFor, riverZ, trailX, type TrailField, type TrailSpec } from '../trail';
import { setHillMap, type HillMap } from '../trailGen';

export function heightmapUrl(name: string): string {
  return `${import.meta.env.BASE_URL}spikes/heightmaps/${name}.png`;
}

/** Loads the painted map for a spike if the file exists; returns whether one was used. */
export async function loadHillMap(name: string, seed: number): Promise<boolean> {
  try {
    const res = await fetch(heightmapUrl(name), { cache: 'no-cache' });
    if (!res.ok || !(res.headers.get('content-type') ?? '').startsWith('image/')) return false;
    const bmp = await createImageBitmap(await res.blob());
    const c = document.createElement('canvas');
    c.width = bmp.width;
    c.height = bmp.height;
    const ctx = c.getContext('2d', { willReadFrequently: true }) as CanvasRenderingContext2D;
    ctx.drawImage(bmp, 0, 0);
    const px = ctx.getImageData(0, 0, c.width, c.height).data;
    const data = new Float32Array(c.width * c.height);
    // grey: the mean of r, g and b, so a slightly tinted brush still reads as its brightness
    for (let k = 0; k < data.length; k++) data[k] = (px[k * 4] + px[k * 4 + 1] + px[k * 4 + 2]) / 765;
    const map: HillMap = { w: c.width, h: c.height, data };
    setHillMap(seed, map);
    return true;
  } catch {
    return false;
  }
}

/** World x, z of image pixel (u, v) at 1 px per metre; the ride goes up the image, left = +x. */
function pixelToWorld(spec: TrailSpec, w: number, h: number, u: number, v: number): [number, number] {
  const g = gridFor(spec);
  const x = g.x0 + g.nx * g.dx * (1 - u / (w - 1));
  const z = g.z0 + g.nz * g.dz * (1 - v / (h - 1));
  return [x, z];
}

/** Draws the uncarved hills (grey) and, on the guide, the trail, river, ford and camp. */
export function drawHeightmap(f: TrailField, guide: boolean): HTMLCanvasElement {
  const spec = f.spec;
  const w = Math.round(f.nx * f.dx) + 1;
  const h = Math.round(f.nz * f.dz) + 1;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const ctx = c.getContext('2d') as CanvasRenderingContext2D;
  const img = ctx.createImageData(w, h);
  const src = f.hills ?? f.h;
  const r = f.nx + 1;
  const span = spec.maxHeight - spec.minHeight;
  for (let v = 0; v < h; v++)
    for (let u = 0; u < w; u++) {
      const [x, z] = pixelToWorld(spec, w, h, u, v);
      const fi = Math.max(0, Math.min(f.nx - 1e-6, (x - f.x0) / f.dx));
      const fj = Math.max(0, Math.min(f.nz - 1e-6, (z - f.z0) / f.dz));
      const i = Math.floor(fi);
      const j = Math.floor(fj);
      const a = fi - i;
      const b = fj - j;
      const y =
        src[j * r + i] * (1 - a) * (1 - b) +
        src[j * r + i + 1] * a * (1 - b) +
        src[(j + 1) * r + i] * (1 - a) * b +
        src[(j + 1) * r + i + 1] * a * b;
      const g = Math.round(Math.max(0, Math.min(1, (y - spec.minHeight) / span)) * 255);
      const k = (v * w + u) * 4;
      img.data[k] = g;
      img.data[k + 1] = g;
      img.data[k + 2] = g;
      img.data[k + 3] = 255;
    }
  ctx.putImageData(img, 0, 0);
  if (!guide) return c;
  const toPx = (x: number, z: number): [number, number] => {
    const g = gridFor(spec);
    return [(1 - (x - g.x0) / (g.nx * g.dx)) * (w - 1), (1 - (z - g.z0) / (g.nz * g.dz)) * (h - 1)];
  };
  // river
  ctx.strokeStyle = 'rgba(60,140,255,0.8)';
  ctx.lineWidth = spec.ford.halfWidth * 2;
  ctx.beginPath();
  for (let x = f.x0; x <= f.x0 + f.nx * f.dx; x += 2) {
    const [px, py] = toPx(x, riverZ(spec, x));
    if (x === f.x0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  // trail band
  ctx.strokeStyle = 'rgba(255,60,40,0.85)';
  ctx.lineWidth = spec.band * 2;
  ctx.beginPath();
  for (let z = 0; z <= spec.distance; z += 2) {
    const [px, py] = toPx(trailX(spec, z), z);
    if (z === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.stroke();
  // camp disc and labels
  const [cx, cy] = toPx(0, spec.campZ);
  ctx.strokeStyle = 'rgba(255,170,40,0.9)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(cx, cy, 35, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = '#ffd040';
  ctx.font = 'bold 14px sans-serif';
  const [sx, sy] = toPx(0, 0);
  ctx.fillText('START', sx + 8, sy);
  ctx.fillText('CAMP', cx + 40, cy);
  for (let z = 100; z < spec.distance; z += 100) {
    const [, py] = toPx(0, z);
    ctx.fillText(`${z} m`, 4, py + 5);
  }
  return c;
}

/** The export page: both images with download links; no game. */
export function showExport(f: TrailField, name: string, painted: boolean): void {
  document.body.innerHTML = '';
  document.body.style.cssText = 'overflow:auto;background:#222;color:#eee;font:14px sans-serif;padding:12px';
  const note = document.createElement('p');
  note.textContent =
    `${name}: ${painted ? 'painted map in use' : 'noise hills (no painted map yet)'}. ` +
    `1 pixel = 1 metre. The ride goes up the image; the left edge is the rider's left. ` +
    `Black = ${f.spec.minHeight} m, white = ${f.spec.maxHeight} m. Paint over ${name}.png (grey only) and save it ` +
    `as public/spikes/heightmaps/${name}.png. The trail, river and camp are carved on top afterwards.`;
  document.body.append(note);
  for (const [guide, file] of [
    [false, `${name}.png`],
    [true, `${name}-guide.png`],
  ] as const) {
    const c = drawHeightmap(f, guide);
    c.id = guide ? 'guide' : 'height';
    c.style.cssText = 'margin:8px;vertical-align:top;image-rendering:pixelated';
    const a = document.createElement('a');
    a.href = c.toDataURL('image/png');
    a.download = file;
    a.textContent = `download ${file}`;
    a.style.cssText = 'display:block;color:#9cf;margin:8px';
    const box = document.createElement('div');
    box.style.display = 'inline-block';
    box.append(a, c);
    document.body.append(box);
  }
}
