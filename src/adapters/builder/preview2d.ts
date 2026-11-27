// Builder 2D preview: draws a kit HouseSpec (archetype features) on the top-down canvas. Pure canvas
// drawing, no three. Screen mapping: face 0 = +x right, 1 = -x left, 2 = +z up, 3 = -z down.
import type { Face, HouseSpec } from '../../content/house/houseSpec';

/** The side of face `f` on a square at (x, y) of side s pixels, as [x0, y0, x1, y1] plus the outward unit (ox, oy). */
function side(
  f: Face,
  x: number,
  y: number,
  s: number,
): [number, number, number, number, number, number] {
  if (f === 0) return [x + s, y, x + s, y + s, 1, 0];
  if (f === 1) return [x, y, x, y + s, -1, 0];
  if (f === 2) return [x, y, x + s, y, 0, -1];
  return [x, y + s, x + s, y + s, 0, 1];
}

/** Draw the archetype features of `spec` over a house square with top-left (x, y) and side s pixels. */
export function drawHouseSpec(
  ctx: CanvasRenderingContext2D,
  spec: HouseSpec,
  x: number,
  y: number,
  s: number,
): void {
  ctx.save();
  const t = Math.max(2, s * 0.06);
  // Gable: ridge line across the middle (two ramps), no deck.
  if (spec.roof === 'gable') {
    ctx.strokeStyle = '#3a2a1c';
    ctx.lineWidth = Math.max(2, s * 0.05);
    ctx.beginPath();
    ctx.moveTo(x, y + s / 2);
    ctx.lineTo(x + s, y + s / 2);
    ctx.stroke();
    ctx.lineWidth = 1;
    for (let i = 1; i < 6; i++) {
      const yy = y + (s * i) / 6;
      if (i === 3) continue;
      ctx.beginPath();
      ctx.moveTo(x + s * 0.06, yy);
      ctx.lineTo(x + s * 0.94, yy);
      ctx.stroke();
    }
  }
  // Eave skirt: dashed inset outline.
  if (spec.eave === true) {
    ctx.strokeStyle = '#7a3b22';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.strokeRect(x + s * 0.07, y + s * 0.07, s * 0.86, s * 0.86);
    ctx.setLineDash([]);
  }
  // Takeoff (low) and tall parapets.
  ctx.strokeStyle = '#3a2a1c';
  for (const f of spec.takeoff) {
    const [x0, y0, x1, y1] = side(f, x, y, s);
    ctx.lineWidth = t * 0.8;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }
  for (const f of spec.tall) {
    const [x0, y0, x1, y1] = side(f, x, y, s);
    ctx.lineWidth = t * 1.8;
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }
  // Awnings: a lean-to strip outside the face.
  for (const f of spec.awnings) {
    const [x0, y0, x1, y1, ox, oy] = side(f, x, y, s);
    const d = s * 0.14;
    ctx.fillStyle = '#c9743c';
    ctx.fillRect(
      Math.min(x0, x1 + ox * d, x0 + ox * d),
      Math.min(y0, y1 + oy * d, y0 + oy * d),
      Math.abs(x1 - x0) + Math.abs(ox) * d,
      Math.abs(y1 - y0) + Math.abs(oy) * d,
    );
  }
  // Balcony strip outside its face; the verandah (C1) shows its 3 posts.
  if (spec.balcony !== -1) {
    const [x0, y0, x1, y1, ox, oy] = side(spec.balcony, x, y, s);
    const d = s * 0.2;
    const full = spec.balconyFull === true;
    const len = full ? 1 : 0.5;
    const inset = (1 - len) / 2;
    const bx = ox === 0 ? x0 + (x1 - x0) * inset : ox > 0 ? x0 : x0 - d;
    const by = oy === 0 ? y0 + (y1 - y0) * inset : oy > 0 ? y0 : y0 - d;
    const bw = ox === 0 ? (x1 - x0) * len : d;
    const bh = oy === 0 ? (y1 - y0) * len : d;
    ctx.fillStyle = '#7a5a3c';
    ctx.fillRect(bx, by, bw, bh);
    if (full) {
      ctx.fillStyle = '#2b1d12';
      const r = Math.max(2, s * 0.025);
      for (let i = 0; i < 3; i++) {
        const k = (i + 0.5) / 3;
        const px = ox === 0 ? bx + bw * k : bx + bw / 2;
        const py = oy === 0 ? by + bh * k : by + bh / 2;
        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }
  // Outside stairs: stepped ticks along the face.
  if (spec.stairs !== null) {
    const [x0, y0, x1, y1, ox, oy] = side(spec.stairs.face, x, y, s);
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    ctx.strokeStyle = '#3a2a1c';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 4; i++) {
      const o = (i + 0.5) * s * 0.05;
      const px = mx + ox * o;
      const py = my + oy * o;
      const hw = s * 0.09;
      ctx.beginPath();
      if (ox === 0) {
        ctx.moveTo(px - hw, py);
        ctx.lineTo(px + hw, py);
      } else {
        ctx.moveTo(px, py - hw);
        ctx.lineTo(px, py + hw);
      }
      ctx.stroke();
    }
  }
  // Zip pole on the roof.
  if (spec.pole) {
    ctx.fillStyle = '#ffcf3a';
    ctx.strokeStyle = '#3a2a1c';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(x + s / 2, y + s / 2, Math.max(3, s * 0.05), 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
  // Party walls: a heavy bar on the shared sides.
  ctx.strokeStyle = '#5a4630';
  ctx.lineWidth = t * 2.4;
  for (let f = 0; f < 4; f++) {
    if (!spec.party[f]) continue;
    const [x0, y0, x1, y1] = side(f as Face, x, y, s);
    ctx.beginPath();
    ctx.moveTo(x0, y0);
    ctx.lineTo(x1, y1);
    ctx.stroke();
  }
  ctx.restore();
}
