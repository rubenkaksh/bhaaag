// One coherent mountain system around the whole horizon (forward, both sides and behind the
// spawn). Scenery only. Six deterministic heightfield rings, far to near:
//   massif   snow-capped Himalayan peaks (authored peaks + ridged noise), strongly hazed
//   mid x3   bluish-purple hazy ridges, paler and bluer the farther they are
//   forest x2 dark conifer-green ridges that start AT the terrain edge (render/terrain.ts) and rise
// Each ring is a grid of vertices (angular segments x radial rings) laid along the terrain's
// rectangular edge, so the geometry is real 3D and the descent gives true parallax. Colours are
// pre-blended towards HAZE (fog ends at 320 m, the range is beyond it): unfogged stock
// MeshBasicMaterial with vertex colours, like the sky dome. No textures, no shaders.
import {
  BufferAttribute,
  BufferGeometry,
  Color,
  DoubleSide,
  Group,
  Mesh,
  MeshBasicMaterial,
} from 'three';
import { HAZE, SUN_AZ_DEG, SUN_DIR, SUN_EL_DEG } from './skyView';
import { TERRAIN_HALF_X, TERRAIN_Z_MAX, TERRAIN_Z_MIN, terrainY } from './terrain';

export type BackdropTier = 'low' | 'medium' | 'high';

export type BackdropLayer = {
  name: string;
  /** Non-indexed triangles, xyz per vertex. */
  positions: Float32Array;
  /** rgb per vertex. */
  colors: Float32Array;
  triangles: number;
};

/** Angular segments around the full horizon, per tier. */
export const RING_SEGMENTS: Record<BackdropTier, number> = { low: 96, medium: 192, high: 380 };

const DEG = Math.PI / 180;
/** Rings are centred here; distances below are metres beyond the terrain rectangle's edge. */
export const RING_CENTER = { x: 0, z: (TERRAIN_Z_MAX + TERRAIN_Z_MIN) / 2 };
const HALF_Z = (TERRAIN_Z_MAX - TERRAIN_Z_MIN) / 2;
const BASE_Y = -120; // far rings start (buried) at this height

// Sun valley (ADR 0006 L-SKY, simplified): from reference eyes along the route the surface is
// kept below SUN_VALLEY_CAP_DEG elevation within SUN_VALLEY_CORE_DEG of the sun azimuth, then
// the cap opens smoothly to SUN_VALLEY_OPEN_DEG. SUN_EL_DEG is 8, so the sun sits clear.
export const SUN_VALLEY_CAP_DEG = 4.5;
const SUN_VALLEY_CORE_DEG = 6;
const SUN_VALLEY_OPEN_DEG = 26;
const EYE_X = [-7, 0, 7];
const EYE_Z = [10, -35, -110];
/** Eye height above the world origin as the camera follows the descent (ADR 0006). */
const eyeY = (z: number): number => 4 + 0.37 * z;

/** Distance from the ring centre to the terrain rectangle edge along azimuth phi (0 = -Z, + = +X). */
export function edgeRadius(phi: number): number {
  const s = Math.abs(Math.sin(phi));
  const c = Math.abs(Math.cos(phi));
  const rx = s > 1e-6 ? TERRAIN_HALF_X / s : Infinity;
  const rz = c > 1e-6 ? HALF_Z / c : Infinity;
  return Math.min(rx, rz);
}

function ringPoint(phi: number, dist: number): [number, number] {
  return [RING_CENTER.x + Math.sin(phi) * dist, RING_CENTER.z - Math.cos(phi) * dist];
}

function wrapPi(a: number): number {
  const twoPi = Math.PI * 2;
  let x = a % twoPi;
  if (x > Math.PI) x -= twoPi;
  if (x <= -Math.PI) x += twoPi;
  return x;
}

function smoothstep(a: number, b: number, v: number): number {
  const t = Math.max(0, Math.min(1, (v - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

// ---------- deterministic noise (periodic in the angular direction) ----------

function hash(i: number, j: number, seed: number): number {
  let h =
    Math.imul(i | 0, 0x27d4eb2d) ^ Math.imul(j | 0, 0x165667b1) ^ Math.imul(seed | 0, 0x9e3779b1);
  h = Math.imul(h ^ (h >>> 15), 0x85ebca6b);
  h = Math.imul(h ^ (h >>> 13), 0xc2b2ae35);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

/** Periodic value noise in [0, 1]: u in [0, 1) wraps, v is a free coordinate. */
function noise(u: number, v: number, freq: number, seed: number): number {
  const x = (u - Math.floor(u)) * freq;
  const i0 = Math.floor(x);
  const fx = x - i0;
  const j0 = Math.floor(v);
  const fy = v - j0;
  const sx = fx * fx * (3 - 2 * fx);
  const sy = fy * fy * (3 - 2 * fy);
  const a = hash(i0 % freq, j0, seed);
  const b = hash((i0 + 1) % freq, j0, seed);
  const c = hash(i0 % freq, j0 + 1, seed);
  const d = hash((i0 + 1) % freq, j0 + 1, seed);
  return a + (b - a) * sx + (c - a) * sy + (a - b - c + d) * sx * sy;
}

/** Fractal noise in [0, 1] along the angle; `ridged` folds it into sharp crests. */
function fbm(u: number, seed: number, freqs: number[], ridged: boolean): number {
  let sum = 0;
  let amp = 1;
  let norm = 0;
  for (let k = 0; k < freqs.length; k++) {
    let n = noise(u, 0, freqs[k], seed + k * 17);
    if (ridged) n = 1 - Math.abs(2 * n - 1);
    sum += amp * n;
    norm += amp;
    amp *= 0.5;
  }
  return sum / norm;
}

// ---------- colour helpers ----------

function rgb(hex: string): number[] {
  const c = new Color(hex);
  return [c.r, c.g, c.b];
}
function mix(a: number[], b: number[], t: number): number[] {
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}

const HAZE_RGB = rgb(HAZE);
const SUN_H = { x: SUN_DIR.x, y: SUN_DIR.y, z: SUN_DIR.z };

// ---------- layer specs ----------

type Spec = {
  name: string;
  seed: number;
  /** Ring distances beyond the terrain edge (m), front to back. */
  d: number[];
  /** Height fraction of each ring between the front base and the crest (1 = crest). */
  p: number[];
  /** Crest height (world y) at azimuth phi, u in [0,1), edge terrain height `edgeY`. */
  crest: (phi: number, u: number, edgeY: number, m: number) => number;
  /** True for the forest rings: they start at the terrain edge height instead of BASE_Y. */
  anchored: boolean;
  shade: number[];
  lit: number[];
  haze: number;
  /** Haze tint: cool lavender near, warm towards the far range (it meets the warm horizon). */
  hazeCol: number[];
  /** Extra haze at the lowest rings (valley mist), 0..1. */
  mist: number;
  /** Peak jitter of the ring heights, fraction of the rise. */
  ripple: number;
};

type Peak = { az: number; el: number; w: number };
// Authored massif: forward arc dense and tall, a few big ones on the sides and behind.
const PEAKS: Peak[] = [
  { az: -66, el: 15, w: 9 },
  { az: -47, el: 13.5, w: 6 },
  { az: -28, el: 18, w: 8 },
  { az: -10, el: 14.5, w: 5.5 },
  { az: 6, el: 21, w: 7.5 },
  { az: 20, el: 16, w: 5.5 },
  { az: 44, el: 17.5, w: 8 },
  { az: 63, el: 14.5, w: 7 },
  { az: 98, el: 34, w: 12 },
  { az: 133, el: 28, w: 10 },
  { az: 170, el: 22, w: 11 },
  { az: -163, el: 24, w: 10 },
  { az: -128, el: 28, w: 10 },
  { az: -98, el: 35, w: 12 },
];

const MASSIF_D = 1150;
function massifCrest(phi: number, u: number, _e: number, m: number): number {
  const dist = edgeRadius(phi) + MASSIF_D;
  const deg = phi / DEG;
  const jag = fbm(
    u,
    5,
    m >= 190 ? (m >= 300 ? [11, 29, 67, 131, 257] : [11, 29, 67, 131]) : [11, 29, 53],
    true,
  );
  let el = 10 + 2.5 * fbm(u, 3, [4, 9], false);
  for (let k = 0; k < PEAKS.length; k++) {
    const dd = Math.abs(wrapPi((deg - PEAKS[k].az) * DEG) / DEG) / PEAKS[k].w;
    if (dd >= 1) continue;
    const prof = Math.pow(1 - dd, 1.05) * (0.6 + 0.8 * jag);
    el = Math.max(el, PEAKS[k].el * prof);
  }
  el += 1.0 * (jag - 0.5);
  return -20 + dist * Math.tan(Math.max(0.5, el) * DEG);
}

function midCrest(elLo: number, elHi: number, d: number, seed: number) {
  return (phi: number, u: number, _e: number, m: number): number => {
    const dist = edgeRadius(phi) + d;
    const n = fbm(u, seed, m >= 190 ? [3, 7, 14, 31, 53] : [3, 7, 14, 31], false);
    // lower toward the forward arc so the massif shows above, taller on the sides and behind
    const side = 0.8 + 0.2 * (0.5 - 0.5 * Math.cos(phi));
    const el = (elLo + (elHi - elLo) * n) * side;
    return -20 + dist * Math.tan(el * DEG);
  };
}

function forestCrest(riseLo: number, riseHi: number, d: number, seed: number) {
  return (phi: number, u: number, edgeY: number, m: number): number => {
    const n = fbm(u, seed, m >= 190 ? [4, 9, 19, 41, 79] : [4, 9, 19, 41], false);
    // forward arc low (keeps the view open), sides and back higher
    const side = 0.42 + 0.58 * smoothstep(10, 75, Math.abs(wrapPi(phi) / DEG));
    const notch = noise(u, 0, 61, seed + 3) > 0.8 ? -6 : 0; // tree-line gap
    const fine = (noise(u, 0, 47, seed + 5) - 0.5) * 7;
    void d;
    return edgeY + (riseLo + (riseHi - riseLo) * n) * side + fine + notch;
  };
}

const SPECS: Spec[] = [
  {
    name: 'massif',
    seed: 101,
    d: [MASSIF_D - 520, MASSIF_D - 360, MASSIF_D - 220, MASSIF_D - 110, MASSIF_D - 40, MASSIF_D],
    p: [0, 0.3, 0.55, 0.77, 0.92, 1],
    crest: massifCrest,
    anchored: false,
    shade: rgb('#5a4d7c'),
    lit: rgb('#a07488'),
    haze: 0.2,
    hazeCol: rgb('#d9a9a4'),
    mist: 0.5,
    ripple: 0.25,
  },
  {
    name: 'ridgeFar',
    seed: 202,
    d: [640, 760, 850, 930],
    p: [0, 0.45, 0.85, 1],
    crest: midCrest(8.0, 11.5, 930, 31),
    anchored: false,
    shade: rgb('#8a80b0'),
    lit: rgb('#b8a4bc'),
    haze: 0.4,
    hazeCol: rgb('#bf9fb6'),
    mist: 0.3,
    ripple: 0.12,
  },
  {
    name: 'ridgeMid',
    seed: 303,
    d: [380, 500, 600, 690],
    p: [0, 0.45, 0.85, 1],
    crest: midCrest(6.5, 10.5, 690, 37),
    anchored: false,
    shade: rgb('#4c4f88'),
    lit: rgb('#7a74a8'),
    haze: 0.3,
    hazeCol: rgb('#a6a0c4'),
    mist: 0.3,
    ripple: 0.12,
  },
  {
    name: 'ridgeNear',
    seed: 404,
    d: [180, 290, 380, 450],
    p: [0, 0.45, 0.85, 1],
    crest: midCrest(5.0, 9.0, 450, 41),
    anchored: false,
    shade: rgb('#2f4270'),
    lit: rgb('#566c96'),
    haze: 0.22,
    hazeCol: rgb('#9a9cc0'),
    mist: 0.25,
    ripple: 0.1,
  },
  {
    name: 'forestFar',
    seed: 505,
    d: [-18, 0, 40, 95, 160, 215],
    p: [0, 0, 0.42, 0.82, 1, 0.8],
    crest: forestCrest(95, 170, 160, 55),
    anchored: true,
    shade: rgb('#1e3a24'),
    lit: rgb('#42683a'),
    haze: 0.12,
    hazeCol: rgb('#a8a49c'),
    mist: 0.15,
    ripple: 0.08,
  },
  {
    name: 'forestNear',
    seed: 606,
    d: [-18, 0, 28, 68, 108, 150],
    p: [0, 0, 0.45, 0.85, 1, 0.8],
    crest: forestCrest(70, 130, 108, 66),
    anchored: true,
    shade: rgb('#15301c'),
    lit: rgb('#35582f'),
    haze: 0.05,
    hazeCol: rgb('#a0a096'),
    mist: 0.1,
    ripple: 0.08,
  },
];

// ---------- build ----------

/** Cap the height so the sun stays visible from the reference eyes along the route. */
function sunValleyLimit(x: number, z: number): number {
  const sunAz = SUN_AZ_DEG * DEG;
  let limit = Infinity;
  for (let a = 0; a < EYE_X.length; a++) {
    for (let b = 0; b < EYE_Z.length; b++) {
      const dx = x - EYE_X[a];
      const dz = z - EYE_Z[b];
      const dist = Math.hypot(dx, dz);
      const az = Math.atan2(dx, -dz);
      const delta = Math.abs(wrapPi(az - sunAz)) / DEG;
      const open = smoothstep(SUN_VALLEY_CORE_DEG, SUN_VALLEY_OPEN_DEG, delta);
      const el = SUN_VALLEY_CAP_DEG + (62 - SUN_VALLEY_CAP_DEG) * open;
      limit = Math.min(limit, eyeY(EYE_Z[b]) + dist * Math.tan(el * DEG));
    }
  }
  return limit;
}

function buildRing(spec: Spec, m: number): BackdropLayer {
  const rings = spec.d.length;
  const px = new Float32Array(m * rings);
  const py = new Float32Array(m * rings);
  const pz = new Float32Array(m * rings);
  const snowRock = spec.name === 'massif';
  for (let i = 0; i < m; i++) {
    const u = i / m;
    const phi = u * Math.PI * 2;
    const edge = edgeRadius(phi);
    const [ex, ez] = ringPoint(phi, edge);
    const edgeY = terrainY(ex, ez);
    const crest = spec.crest(phi, u, edgeY, m);
    for (let j = 0; j < rings; j++) {
      const [x, z] = ringPoint(phi, edge + spec.d[j]);
      let y: number;
      if (spec.anchored && j === 0) {
        y = terrainY(x, z) - 9; // buried under the terrain, hides the seam
      } else {
        const y0 = spec.anchored ? edgeY : BASE_Y;
        const rip =
          1 +
          spec.ripple *
            (noise(u, j * 1.7, 37, spec.seed + 9) - 0.5) *
            2 *
            (j > 0 && j < rings - 1 ? 1 : 0);
        y = y0 + (crest - y0) * spec.p[j] * rip;
        if (spec.anchored && j === 1) y = edgeY - 0.3;
      }
      y = Math.min(y, Math.max(sunValleyLimit(x, z), spec.anchored && j > 0 ? edgeY : -Infinity));
      px[i * rings + j] = x;
      py[i * rings + j] = y;
      pz[i * rings + j] = z;
    }
  }
  // Per-vertex colour from the surface normal (sun side warm, shadow side cool), height and haze.
  const cols = new Float32Array(m * rings * 3);
  const at = (i: number, j: number): number =>
    ((i + m) % m) * rings + Math.max(0, Math.min(rings - 1, j));
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < rings; j++) {
      const a = at(i + 1, j);
      const b = at(i - 1, j);
      const c = at(i, j + 1);
      const d = at(i, j - 1);
      const tx = [px[a] - px[b], py[a] - py[b], pz[a] - pz[b]];
      const ty = [px[c] - px[d], py[c] - py[d], pz[c] - pz[d]];
      let nx = tx[1] * ty[2] - tx[2] * ty[1];
      let ny = tx[2] * ty[0] - tx[0] * ty[2];
      let nz = tx[0] * ty[1] - tx[1] * ty[0];
      if (ny < 0) {
        nx = -nx;
        ny = -ny;
        nz = -nz;
      }
      const len = Math.hypot(nx, ny, nz) || 1;
      nx /= len;
      ny /= len;
      nz /= len;
      const k = i * rings + j;
      const facet = (noise(i / m, j * 1.3, 71, spec.seed + 4) - 0.5) * 0.7;
      const ndl = nx * SUN_H.x + ny * SUN_H.y + nz * SUN_H.z;
      const lf = smoothstep(-0.55, 0.65, ndl + 0.25 + facet);
      const y = py[k];
      let base = mix(spec.shade, spec.lit, lf);
      if (snowRock) {
        const dist = Math.hypot(px[k] - RING_CENTER.x, pz[k] - RING_CENTER.z);
        const elv = Math.atan2(y + 20, dist) / DEG;
        const snowEl =
          12.8 + 2.2 * noise(i / m, j * 0.9, 29, 13) + 1.0 * (noise(i / m, 0, 83, 17) - 0.5);
        const s = smoothstep(snowEl - 0.9, snowEl + 0.5, elv);
        const snowLit = rgb('#ffe8bc');
        const snowShade = rgb('#c496b4');
        const snow = mix(snowShade, snowLit, smoothstep(-0.5, 0.5, ndl + 0.5 + 1.4 * facet));
        base = mix(base, snow, s);
      } else {
        const rim = smoothstep(0.7, 1, spec.p[j]) * 0.18;
        base = mix(base, spec.lit, rim);
      }
      // valley mist: the low rings sink into the haze, and so does the whole layer by distance
      const low = 1 - smoothstep(0, 0.6, spec.p[j]);
      let hz = spec.haze + spec.mist * low * (1 - spec.haze);
      if (spec.anchored && j <= 1) hz = Math.max(hz, 0.6); // seam: match the fogged terrain edge
      const jit =
        1 +
        (hash(i, j, spec.seed) - 0.5) * 0.16 +
        (noise(i / m, j * 2.1, 53, spec.seed + 8) - 0.5) * 0.2;
      const warm = spec.anchored ? 1 - smoothstep(0, 0.8, spec.p[j]) : 0;
      const col = mix(
        [base[0] * jit, base[1] * jit, base[2] * jit],
        mix(spec.hazeCol, HAZE_RGB, warm),
        hz,
      );
      cols[k * 3] = Math.min(1, col[0]);
      cols[k * 3 + 1] = Math.min(1, col[1]);
      cols[k * 3 + 2] = Math.min(1, col[2]);
    }
  }
  // Emit non-indexed triangles.
  const tris = m * (rings - 1) * 2;
  const positions = new Float32Array(tris * 9);
  const colors = new Float32Array(tris * 9);
  let o = 0;
  const put = (k: number): void => {
    positions[o] = px[k];
    positions[o + 1] = py[k];
    positions[o + 2] = pz[k];
    colors[o] = cols[k * 3];
    colors[o + 1] = cols[k * 3 + 1];
    colors[o + 2] = cols[k * 3 + 2];
    o += 3;
  };
  for (let i = 0; i < m; i++) {
    const i1 = (i + 1) % m;
    for (let j = 0; j + 1 < rings; j++) {
      const a = i * rings + j;
      const b = i1 * rings + j;
      const c = i1 * rings + j + 1;
      const d = i * rings + j + 1;
      put(a);
      put(b);
      put(c);
      put(a);
      put(c);
      put(d);
    }
  }
  return { name: spec.name, positions, colors, triangles: tris };
}

/** Pure, deterministic geometry data (no three objects), node-testable. */
export function backdropData(tier: BackdropTier): BackdropLayer[] {
  const m = RING_SEGMENTS[tier];
  return SPECS.map((s) => buildRing(s, m));
}

export function backdropTriangles(tier: BackdropTier): number {
  let t = 0;
  for (const l of backdropData(tier)) t += l.triangles;
  return t;
}

export const BACKDROP_LAYER_NAMES = SPECS.map((s) => s.name);
/** Sun elevation the valley is cut for, re-exported for tests. */
export const BACKDROP_SUN_EL_DEG = SUN_EL_DEG;

export function buildBackdrop(tier: BackdropTier): Group {
  const group = new Group();
  group.name = 'backdrop';
  const layers = backdropData(tier);
  // One draw for every ring (ADR 0009): same material, and the opaque rings sort by depth.
  let nv = 0;
  for (const l of layers) nv += l.positions.length;
  const positions = new Float32Array(nv);
  const colors = new Float32Array(nv);
  let off = 0;
  for (const l of layers) {
    positions.set(l.positions, off);
    colors.set(l.colors, off);
    off += l.positions.length;
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new BufferAttribute(positions, 3));
  geo.setAttribute('color', new BufferAttribute(colors, 3));
  const mat = new MeshBasicMaterial({
    vertexColors: true,
    side: DoubleSide,
    fog: false, // pre-tinted towards HAZE
    depthWrite: true,
  });
  const mesh = new Mesh(geo, mat);
  mesh.name = 'backdropRings';
  mesh.frustumCulled = false;
  // After the sky dome (-2), before the sun core (-1).
  mesh.renderOrder = -1.8;
  group.add(mesh);
  return group;
}
