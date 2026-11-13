import {
  BufferAttribute,
  BoxGeometry,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Group,
  Mesh,
  MeshLambertMaterial,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { World } from '../core/world';

// Carved tie post beside the spawn roof (ADR 0006 section 3). The rope starts at the
// post, so the first zipline reads as one rope: tie -> hands -> anchor.

export const TWIST_DARK = 0x6e5232;
export const TWIST_LIGHT = 0xb08850;
export const GOLD = 0xffc83a;

const POST_BASE = 0x6b4426;
const CAP_COLOR = 0x4a2c1c;
const CORBEL_COLOR = 0x8a4b38;
const BAND_PERIOD = 0.9;
const BAND_FRACTION = 0.18;
const BAND_DARK = 0.72;
const SPAN_SEG = 40;
const SPAN_SIDES = 8;
const SPAN_RADIUS = 0.06;
const SPAN_SAG = 0.012;
const SPAN_GOLD_START = 0.8;

/** Shared mutable tie state: written by buildRopePost, read and updated by RopeView. */
export const ROPE_TIE = { x: 0, y: 0, z: 0, anchorId: -1, set: false, live: false };

const dark = new Color();
const light = new Color();
const gold = new Color();
dark.setHex(TWIST_DARK); // setHex converts sRGB to linear, matching the vertex-colour buffer
light.setHex(TWIST_LIGHT);
gold.setHex(GOLD);

/** Twist stripe colour for ring i, side j, lerped k (0..1) toward gold. Writes into out. */
export function twistColor(i: number, j: number, k: number, out: Color): Color {
  return out.copy((i + j) % 3 === 0 ? dark : light).lerp(gold, k);
}

// Flat colour; with bandBottom set, vertices in the carved bands (by world y) are darkened.
function bakeColors(g: BufferGeometry, hex: number, bandBottom: number | null = null): void {
  const pos = g.getAttribute('position');
  const colors = new Float32Array(pos.count * 3);
  const c = new Color().setHex(hex);
  for (let v = 0; v < pos.count; v++) {
    let f = 1;
    if (bandBottom !== null) {
      const u = (pos.getY(v) - bandBottom) / BAND_PERIOD;
      if (u - Math.floor(u) < BAND_FRACTION) f = BAND_DARK;
    }
    colors[v * 3] = c.r * f;
    colors[v * 3 + 1] = c.g * f;
    colors[v * 3 + 2] = c.b * f;
  }
  g.setAttribute('color', new BufferAttribute(colors, 3));
}

// Box from (x0,y0,z0) to (x1,y1,z1), coloured.
function colouredBox(
  x0: number,
  y0: number,
  z0: number,
  x1: number,
  y1: number,
  z1: number,
  hex: number,
  segs = 1,
  bandBottom: number | null = null,
): BufferGeometry {
  const g = stripUv(new BoxGeometry(x1 - x0, y1 - y0, z1 - z0, 1, segs, 1));
  g.translate((x0 + x1) / 2, (y0 + y1) / 2, (z0 + z1) / 2);
  bakeColors(g, hex, bandBottom);
  return g;
}

function stripUv(g: BufferGeometry): BufferGeometry {
  g.deleteAttribute('uv');
  return g;
}

export function buildSpan(
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
): BufferGeometry {
  const rings = SPAN_SEG + 1;
  const verts = rings * (SPAN_SIDES + 1);
  const pos = new Float32Array(verts * 3);
  const nrm = new Float32Array(verts * 3);
  const col = new Float32Array(verts * 3);
  const len = Math.hypot(bx - ax, by - ay, bz - az);
  const drop = len * SPAN_SAG;
  const cx: number[] = [];
  const cy: number[] = [];
  const cz: number[] = [];
  for (let i = 0; i <= SPAN_SEG; i++) {
    const t = i / SPAN_SEG;
    cx.push(ax + (bx - ax) * t);
    cy.push(ay + (by - ay) * t - 4 * drop * t * (1 - t));
    cz.push(az + (bz - az) * t);
  }
  const c = new Color();
  for (let i = 0; i <= SPAN_SEG; i++) {
    const i0 = Math.max(0, i - 1);
    const i1 = Math.min(SPAN_SEG, i + 1);
    let tx = cx[i1] - cx[i0];
    let ty = cy[i1] - cy[i0];
    let tz = cz[i1] - cz[i0];
    const tl = Math.hypot(tx, ty, tz) || 1;
    tx /= tl;
    ty /= tl;
    tz /= tl;
    // N = normalize(T x up), B = T x N.
    let nx = -tz;
    const ny = 0;
    let nz = tx;
    const nl = Math.hypot(nx, ny, nz);
    if (nl < 1e-6) {
      nx = 1;
      nz = 0;
    } else {
      nx /= nl;
      nz /= nl;
    }
    const bx2 = ty * nz - tz * ny;
    const by2 = tz * nx - tx * nz;
    const bz2 = tx * ny - ty * nx;
    const t = i / SPAN_SEG;
    const k = t > SPAN_GOLD_START ? (t - SPAN_GOLD_START) / (1 - SPAN_GOLD_START) : 0;
    for (let j = 0; j <= SPAN_SIDES; j++) {
      const a = (j / SPAN_SIDES) * Math.PI * 2;
      const co = Math.cos(a);
      const si = Math.sin(a);
      const ox = co * nx + si * bx2;
      const oy = co * ny + si * by2;
      const oz = co * nz + si * bz2;
      const o = (i * (SPAN_SIDES + 1) + j) * 3;
      pos[o] = cx[i] + ox * SPAN_RADIUS;
      pos[o + 1] = cy[i] + oy * SPAN_RADIUS;
      pos[o + 2] = cz[i] + oz * SPAN_RADIUS;
      nrm[o] = ox;
      nrm[o + 1] = oy;
      nrm[o + 2] = oz;
      twistColor(i, j, k, c);
      col[o] = c.r;
      col[o + 1] = c.g;
      col[o + 2] = c.b;
    }
  }
  const index: number[] = [];
  for (let i = 0; i < SPAN_SEG; i++) {
    for (let j = 0; j < SPAN_SIDES; j++) {
      const a = i * (SPAN_SIDES + 1) + j;
      const b = (i + 1) * (SPAN_SIDES + 1) + j;
      index.push(a, a + 1, b + 1, a, b + 1, b);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new BufferAttribute(pos, 3));
  g.setAttribute('normal', new BufferAttribute(nrm, 3));
  g.setAttribute('color', new BufferAttribute(col, 3));
  g.setIndex(index);
  return g;
}

/**
 * One rope post per level beside the spawn roof (the style-2 solid containing
 * world.spawn). Writes ROPE_TIE. Returns an empty Group if there is no such roof or
 * no route.
 */
export function buildRopePost(world: World): Group {
  const group = new Group();
  ROPE_TIE.set = false;
  ROPE_TIE.live = false;
  ROPE_TIE.anchorId = -1;
  const sp = world.spawn;
  let roofIdx = -1;
  for (let i = 0; i < world.solids.length; i++) {
    const s = world.solids[i];
    if (world.style[i] !== 2) continue;
    if (
      sp.x >= s.min.x - 1e-6 &&
      sp.x <= s.max.x + 1e-6 &&
      sp.z >= s.min.z - 1e-6 &&
      sp.z <= s.max.z + 1e-6 &&
      sp.y >= s.min.y - 1e-6 &&
      sp.y <= s.max.y + 3
    ) {
      roofIdx = i;
      break;
    }
  }
  if (roofIdx < 0 || world.route.length === 0) return group;
  const roof = world.solids[roofIdx];
  const anchor = world.anchors[world.route[0]];
  if (!anchor) return group;

  const T = roof.max.y;
  // ADR says 0.75; the span then passes ~0.4 m from the roof edge, so 1.05 m meets the 0.5 m rule.
  const px = roof.min.x - 2.6; // wide of the roof: the 20 deg span then clears the roof corner by 0.5 m
  const pz = roof.max.z - 1.2;
  const bottom = T - 6;
  const top = T + 2.4;
  const parts: BufferGeometry[] = [];
  const hx = 0.17;

  parts.push(colouredBox(px - hx, bottom, pz - hx, px + hx, top, pz + hx, POST_BASE, 6, bottom));
  for (const dy of [0.4, 1.2, 1.9]) {
    parts.push(
      colouredBox(px - 0.2, T + dy - 0.04, pz - 0.2, px + 0.2, T + dy + 0.04, pz + 0.2, CAP_COLOR),
    );
  }
  parts.push(colouredBox(px - 0.23, top, pz - 0.23, px + 0.23, top + 0.16, pz + 0.23, CAP_COLOR));
  const cone = stripUv(new ConeGeometry(0.34, 0.32, 4));
  cone.rotateY(Math.PI / 4);
  cone.translate(px, top + 0.16 + 0.16, pz);
  bakeColors(cone, CAP_COLOR);
  parts.push(cone);

  for (const dy of [2.0, 2.15, 2.3]) {
    const w = stripUv(new CylinderGeometry(0.25, 0.25, 0.08, 8, 1, true));
    w.translate(px, T + dy, pz);
    bakeColors(w, TWIST_DARK);
    parts.push(w);
  }

  // Brackets tie the shaft to the roof's -x face; the corbel carries the foot.
  for (const cy of [T - 3.6, T - 5.6]) {
    parts.push(
      colouredBox(px + hx, cy - 0.09, pz - 0.11, roof.min.x, cy + 0.09, pz + 0.11, CAP_COLOR),
    );
  }
  parts.push(
    colouredBox(
      px - 0.3,
      bottom - 0.4,
      pz - 0.3,
      roof.min.x,
      bottom,
      pz + 0.3,
      CORBEL_COLOR,
    ),
  );

  const tx = px + 0.2;
  const ty = T + 2.2;
  ROPE_TIE.x = tx;
  ROPE_TIE.y = ty;
  ROPE_TIE.z = pz;
  ROPE_TIE.anchorId = world.route[0];
  ROPE_TIE.set = true;

  // mergeGeometries needs matching index state: convert every part to indexed (they are).
  const postMerged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  const postIndexCount = postMerged.getIndex()?.count ?? 0;
  const span = buildSpan(tx, ty, pz, anchor.px, anchor.py, anchor.pz);
  const merged = mergeGeometries([postMerged, span], false);
  postMerged.dispose();
  span.dispose();

  const mesh = new Mesh(merged, new MeshLambertMaterial({ vertexColors: true }));
  mesh.name = 'ropePost';
  mesh.frustumCulled = false;
  mesh.userData.postIndexCount = postIndexCount;
  mesh.onBeforeRender = () => {
    merged.setDrawRange(0, ROPE_TIE.live ? postIndexCount : Infinity);
  };
  group.add(mesh);
  return group;
}

/**
 * One rope mesh for every fixed zip line (lineOnly worlds): the same twisted, sagging,
 * gold-ended span as the pre-tied rope, from the hand-height point above each launch zone to
 * its anchor. Sag is visual only (the sim rope is the straight chord). One merged draw call;
 * null when the world has no lines.
 */
export function buildFixedRopes(world: World, handY: number): Mesh | null {
  const parts: BufferGeometry[] = [];
  for (let i = 0; i < world.lines.length; i++) {
    const L = world.lines[i];
    const a = world.anchors[L.anchorId];
    if (a === undefined) continue;
    const z = L.zone;
    parts.push(
      buildSpan(
        (z.min.x + z.max.x) / 2,
        z.max.y + handY,
        (z.min.z + z.max.z) / 2,
        a.px,
        a.py,
        a.pz,
      ),
    );
  }
  if (parts.length === 0) return null;
  const merged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  const mesh = new Mesh(merged, new MeshLambertMaterial({ vertexColors: true }));
  mesh.name = 'lineRopes';
  mesh.frustumCulled = false; // spans run tens of metres; one cheap call
  return mesh;
}
