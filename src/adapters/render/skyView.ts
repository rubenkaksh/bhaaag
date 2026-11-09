import {
  AdditiveBlending,
  BackSide,
  BufferGeometry,
  CircleGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  Quaternion,
  SphereGeometry,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mulberry32 } from './decor/placeDecor';

// ADR 0005 D4: sunset sky, visible sun, clouds and layered mountains. Stock materials,
// vertex colours, no textures, no per-frame allocation. Fog is off for every piece here
// because the colours are already pre-fogged towards HAZE.

export const HAZE = '#eaa978';
const SKY_RADIUS = 500;
const SKY_SEED = 7;
const MOUNTAIN_SEED = 11;
const DEG = Math.PI / 180;
const FORWARD = new Vector3(0, 0, 1);

/** Sun direction: 32 degrees right of -Z and 8 degrees up (ADR 0006 L-SKY, was 5°). Decoupled from the key light. */
export const SUN_EL_DEG = 8;
export const SUN_AZ_DEG = 32;
const SUN_EL = SUN_EL_DEG * DEG;
const SUN_AZ = SUN_AZ_DEG * DEG;
export const SUN_DIR = new Vector3(
  Math.sin(SUN_AZ) * Math.cos(SUN_EL),
  Math.sin(SUN_EL),
  -Math.cos(SUN_AZ) * Math.cos(SUN_EL),
);
/** Horizontal sun direction in the (x, z) plane, unit length. Used by the valley carve and the haze. */
const SUN_H = { x: Math.sin(SUN_AZ), z: -Math.cos(SUN_AZ) };
const SUN_DIST = 470;
const CLOUD_DIST = 440;
const CLOUD_COUNT = 7;

const BELOW_HORIZON = new Color('#e6a77a');
const SUN_BOOST = new Color('#ffd890');
// Stops by normalised height h (sphere radius 500, so h = dir.y).
const SKY_STOPS: [number, Color][] = [
  [0, new Color(HAZE)],
  [0.1, new Color('#f2a050')],
  [0.3, new Color('#d77a45')],
  [0.6, new Color('#9c5a4c')],
];

/** Sky colour for normalised height h. Writes into `out` and returns it. */
export function skyColorAt(h: number, out: Color): Color {
  if (h < 0) return out.copy(BELOW_HORIZON);
  let prevH = SKY_STOPS[0][0];
  let prevC = SKY_STOPS[0][1];
  for (let i = 1; i < SKY_STOPS.length; i++) {
    const [nh, nc] = SKY_STOPS[i];
    if (h <= nh) return out.copy(prevC).lerp(nc, (h - prevH) / (nh - prevH));
    prevH = nh;
    prevC = nc;
  }
  return out.copy(prevC);
}

/** Warms the sky on the sun side. Writes into `c` and returns it. */
export function sunBoost(dir: Vector3, c: Color): Color {
  const d = Math.max(0, dir.dot(SUN_DIR));
  return c.lerp(SUN_BOOST, 0.5 * d * d * d * d);
}

function buildDome(): Mesh {
  const geo = new SphereGeometry(SKY_RADIUS, 32, 16);
  const pos = geo.attributes.position;
  const colors: number[] = [];
  const dir = new Vector3();
  const c = new Color();
  for (let i = 0; i < pos.count; i++) {
    dir.fromBufferAttribute(pos, i).normalize();
    skyColorAt(dir.y, c);
    sunBoost(dir, c);
    colors.push(c.r, c.g, c.b);
  }
  geo.setAttribute('color', new Float32BufferAttribute(colors, 3));
  const mesh = new Mesh(
    geo,
    new MeshBasicMaterial({ vertexColors: true, side: BackSide, depthWrite: false, fog: false }),
  );
  mesh.name = 'skyDome';
  // ADR 0006 L-SKY draw order: dome first (-2), then the core (-1), then mountains (0).
  mesh.renderOrder = -2;
  return mesh;
}

/** Sun disc and additive glow, both at SUN_DIST along SUN_DIR, facing the group origin. */
function buildSun(): Group {
  const g = new Group();
  const glowGeo = new CircleGeometry(170, 32);
  const glowCol = new Color('#ffc070');
  const gc: number[] = [];
  // CircleGeometry index 0 is the centre: alpha 0.5 there, 0 on the rim.
  for (let i = 0; i < glowGeo.attributes.position.count; i++) {
    gc.push(glowCol.r, glowCol.g, glowCol.b, i === 0 ? 0.65 : 0);
  }
  glowGeo.setAttribute('color', new Float32BufferAttribute(gc, 4));
  const glow = new Mesh(
    glowGeo,
    new MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      fog: false,
    }),
  );
  glow.name = 'sunGlow';
  const core = new Mesh(
    new CircleGeometry(9, 24),
    new MeshBasicMaterial({ color: '#fff1c4', depthWrite: false, fog: false }),
  );
  core.name = 'sunCore';
  // ADR 0006 L-SKY: the opaque core draws before the mountains (renderOrder 0), after the dome.
  core.renderOrder = -1;
  const facing = SUN_DIR.clone().negate();
  for (const m of [glow, core]) {
    m.position.copy(SUN_DIR).multiplyScalar(SUN_DIST);
    m.quaternion.setFromUnitVectors(FORWARD, facing);
    g.add(m);
  }
  return g;
}

/** Seven flat cloud cards, merged into one mesh, placed on a ring around the sky group. */
function buildClouds(rand: () => number): Mesh {
  const parts: BufferGeometry[] = [];
  const top = new Color('#f7b98a');
  const under = new Color('#ffd9a0');
  const dir = new Vector3();
  const q = new Quaternion();
  const lerp = (a: number, b: number, t: number): number => a + (b - a) * t;
  for (let k = 0; k < CLOUD_COUNT; k++) {
    const az = lerp(-40, 60, rand()) * DEG;
    const el = lerp(4, 14, rand()) * DEG;
    const w = lerp(60, 140, rand());
    const h = lerp(8, 14, rand());
    dir.set(Math.sin(az) * Math.cos(el), Math.sin(el), -Math.cos(az) * Math.cos(el));
    const g = new CircleGeometry(1, 16);
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g.scale(w, h, 1);
    const cols: number[] = [];
    const pos = g.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const c = pos.getY(i) > 0 ? top : under;
      cols.push(c.r, c.g, c.b);
    }
    g.setAttribute('color', new Float32BufferAttribute(cols, 3));
    q.setFromUnitVectors(FORWARD, dir.clone().negate());
    g.applyQuaternion(q);
    g.translate(dir.x * CLOUD_DIST, dir.y * CLOUD_DIST, dir.z * CLOUD_DIST);
    parts.push(g);
  }
  const merged = mergeGeometries(parts, false);
  for (const p of parts) p.dispose();
  if (merged === null) throw new Error('cloud merge failed: attribute mismatch');
  const mesh = new Mesh(
    merged,
    new MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      side: DoubleSide,
      depthWrite: false,
      fog: false,
    }),
  );
  mesh.name = 'clouds';
  return mesh;
}

/**
 * ADR 0006 L-SKY: horizon haze. Open cylinder band inside every mountain (r 240, y +9,
 * spanning el -2.9° to +7.1°), additive, veils the ridge while the city occludes it.
 * Vertex alpha by row (top 0, middle 0.35, bottom 0) scaled towards the sun azimuth.
 */
function buildHaze(): Mesh {
  const geo = new CylinderGeometry(240, 240, 42, 48, 2, true);
  const pos = geo.attributes.position;
  const c = new Color('#ffb070');
  const cols: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const z = pos.getZ(i);
    const len = Math.hypot(x, z) || 1;
    const toward = Math.max(0, (x / len) * SUN_H.x + (z / len) * SUN_H.z);
    // heightSegments 2 -> three rows: y = +21 (top), 0 (middle), -21 (bottom).
    const rowAlpha = Math.abs(pos.getY(i)) < 10 ? 0.35 : 0;
    cols.push(c.r, c.g, c.b, rowAlpha * (0.4 + 0.6 * toward * toward));
  }
  geo.setAttribute('color', new Float32BufferAttribute(cols, 4));
  const mesh = new Mesh(
    geo,
    new MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: AdditiveBlending,
      depthWrite: false,
      depthTest: true,
      fog: false,
      side: BackSide,
    }),
  );
  mesh.name = 'horizonHaze';
  mesh.position.y = 9;
  return mesh;
}

/** Sky group (dome, sun, clouds, horizon haze). The caller moves it to the camera position each frame. */
export function buildSkyView(): Group {
  const g = new Group();
  g.add(buildDome());
  g.add(buildSun());
  g.add(buildHaze());
  g.add(buildClouds(mulberry32(SKY_SEED)));
  return g;
}

const MOUNTAIN_CENTER_Z = -110;
const MOUNTAIN_BASE = -110;
const MOUNTAIN_BOTTOM = -200;
export const MOUNTAIN_SEGMENTS = 160;
const RIDGE_FREQ = [3, 7, 13, 29];
const RIDGE_AMP = [0.5, 0.25, 0.15, 0.1];
const MOUNTAIN_LAYERS = [
  { radius: 360, peakLo: 30, peakHi: 70, color: '#9a5f58' },
  { radius: 420, peakLo: 60, peakHi: 110, color: '#b4766a' },
  { radius: 480, peakLo: 100, peakHi: 150, color: '#cf9a82' },
];

// ADR 0006 L-SKY sun valley: eyes every 5 m from z 10 down to -210, x in {-7, 0, 7}.
const SUN_EYE_X = [-7, 0, 7];
const SUN_EYE_Z_HI = 10;
const SUN_EYE_Z_LO = -210;
const SUN_EYE_Z_STEP = 5;
const VALLEY_INNER = 30; // arc (m) fully cut to cap
const VALLEY_OUTER = 90; // arc (m) where the cut fades back to the raw ridge
const VALLEY_EL_DROP_DEG = 3; // cap sits at SUN_EL - 3 degrees

/** Wrap an angle into (-pi, pi]. */
function wrapPi(a: number): number {
  const twoPi = Math.PI * 2;
  let x = a % twoPi;
  if (x > Math.PI) x -= twoPi;
  if (x <= -Math.PI) x += twoPi;
  return x;
}

/**
 * Carve the sun valley into one layer's top polyline (deterministic, build time).
 * `top0` stays the uncarved ridge; the result never goes below MOUNTAIN_BASE.
 */
function carveSunValley(top0: number[], radius: number): number[] {
  const top = top0.slice();
  const tanCap = Math.tan((SUN_EL_DEG - VALLEY_EL_DROP_DEG) * DEG);
  for (let z = SUN_EYE_Z_HI; z >= SUN_EYE_Z_LO; z -= SUN_EYE_Z_STEP) {
    const ey = 4 + 0.37 * z;
    for (const ex of SUN_EYE_X) {
      // Solve |E.xz + d*h - C| = R for the positive root d; h is the horizontal sun direction.
      const px = ex;
      const pz = z - MOUNTAIN_CENTER_Z;
      const ph = px * SUN_H.x + pz * SUN_H.z;
      const disc = ph * ph - (px * px + pz * pz) + radius * radius;
      const d = -ph + Math.sqrt(disc);
      const thHit = Math.atan2(z + d * SUN_H.z - MOUNTAIN_CENTER_Z, ex + d * SUN_H.x);
      const cap = ey + d * tanCap;
      for (let i = 0; i < MOUNTAIN_SEGMENTS; i++) {
        const th = (i / MOUNTAIN_SEGMENTS) * Math.PI * 2;
        const arc = radius * Math.abs(wrapPi(th - thHit));
        let lim: number;
        if (arc < VALLEY_INNER) {
          lim = cap;
        } else if (arc < VALLEY_OUTER) {
          const u = (arc - VALLEY_INNER) / (VALLEY_OUTER - VALLEY_INNER);
          lim = cap + u * u * (3 - 2 * u) * (top0[i] - cap);
        } else {
          continue;
        }
        top[i] = Math.max(MOUNTAIN_BASE, Math.min(top[i], lim));
      }
    }
  }
  return top;
}

/**
 * Three ridge strips around a fixed centre in world space (not in the sky group), so the
 * descent gives parallax. Each strip is a ring of top/bottom vertex pairs; bottoms drop to -200.
 */
export function buildMountains(seed = MOUNTAIN_SEED): Mesh {
  const rand = mulberry32(seed);
  const pos: number[] = [];
  const col: number[] = [];
  const idx: number[] = [];
  for (const L of MOUNTAIN_LAYERS) {
    const peak = L.peakLo + (L.peakHi - L.peakLo) * rand();
    const phase = RIDGE_FREQ.map(() => rand() * Math.PI * 2);
    const lc = new Color(L.color);
    const start = pos.length / 3;
    const top0: number[] = [];
    for (let i = 0; i < MOUNTAIN_SEGMENTS; i++) {
      const th = (i / MOUNTAIN_SEGMENTS) * Math.PI * 2;
      let ridge = 0;
      for (let k = 0; k < RIDGE_FREQ.length; k++) {
        ridge += RIDGE_AMP[k] * Math.sin(RIDGE_FREQ[k] * th + phase[k]);
      }
      const t = Math.min(1, Math.max(0, 0.55 + 0.45 * ridge));
      top0.push(MOUNTAIN_BASE + (peak - MOUNTAIN_BASE) * t);
    }
    // ADR 0006 L-SKY: carve the sun valley into this layer before emitting vertices.
    const top = carveSunValley(top0, L.radius);
    for (let i = 0; i < MOUNTAIN_SEGMENTS; i++) {
      const th = (i / MOUNTAIN_SEGMENTS) * Math.PI * 2;
      const x = L.radius * Math.cos(th);
      const z = MOUNTAIN_CENTER_Z + L.radius * Math.sin(th);
      pos.push(x, top[i], z, x, MOUNTAIN_BOTTOM, z);
      col.push(lc.r, lc.g, lc.b, lc.r, lc.g, lc.b);
    }
    for (let i = 0; i < MOUNTAIN_SEGMENTS; i++) {
      const a = start + 2 * i;
      const b = start + 2 * ((i + 1) % MOUNTAIN_SEGMENTS);
      idx.push(a, a + 1, b, b, a + 1, b + 1);
    }
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setAttribute('color', new Float32BufferAttribute(col, 3));
  geo.setIndex(idx);
  const mesh = new Mesh(
    geo,
    new MeshBasicMaterial({ vertexColors: true, side: DoubleSide, fog: false }),
  );
  mesh.name = 'mountains';
  return mesh;
}
