import { attachAmbient } from './ambient';
import {
  BufferGeometry,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
  Mesh,
  MeshLambertMaterial,
} from 'three';
import type { AABB } from '../../../core/math/aabb';
import type { World } from '../../../core/world';
import { buildBirds } from './birds';
import { CLUSTER_STOREY, planCluster } from './cluster';
import type { ClusterPlan } from './cluster';
import {
  DecorKit,
  RAIL_LEN,
  RAIL_POST_H,
  PIECE_CAP,
  PIECE_IDS,
  ROOF_UNIT_H,
  ROOF_UNIT_W,
  TANK_UNIT_H,
  mulberry32,
} from './kit';
import type { PieceId } from './kit';

// ADR 0005 D1/D5: deterministic city around the hill terraces. Pure given (world, seed).

export const LANE_HALF_X = 16;
const COL0_X = 17.05; // first column starts here so roof overhang (0.5) and balconies (1.0) stay >= 16
const TERRACE_HALF_X = 30;
const STOREY = 2.8;
const ROOF_H = 1.2; // pitched roof height
export const CLUSTER_MIN_X = 35;
export const LOT_OUTER_X = 60;
const LOT_COLOR = '#7d4a3a'; // RETAIN
const LOT_CAP = 0.15;
const MARGIN = 0.5; // collider clearance
const SLOPE = 0.365;
const SLOPE_BASE = -20;

const BRICK = ['#9c5640', '#8c4a38', '#a8634a'];
const LIME = ['#d9c6aa', '#cfb99a', '#e0cfb4'];
const WOOD = ['#4a2c1c', '#5a3622'];
const TILE = ['#b5441c', '#a33d1a', '#c04e22'];
const CONCRETE = '#a99a88';
const TANKS = ['#26282c', '#2e6b47'];
const SOLAR = '#2b4a73';
const SHUTTERS = ['#4a2c1c', '#5a3622', '#7c3e2e', '#2e6b47'];
const PAVING = '#8e7a66';
const HILL = '#8b7a56'; // hillside earth between the playable houses
/** The flanking town is gone: houses exist only where the hero can reach them (see dressHouses). */
const SCENERY_HOUSES = false;
const WIN_D = 0.118; // window depth unit: sticks out 1.6 x this = 0.19 m
const CANOPY = ['#5d7a3a', '#6f8a3f', '#4f6b34'];
const TRUNK = '#4a3424';
const FLAGS = ['#2f62b8', '#f2efe4', '#c8322f', '#2f8a4f', '#d0a12e'];
const FAR_LIME = '#cdb59a';
const FAR_BRICK = '#a87a62';
const FAR_TILE = '#a2705a';
const BRASS = '#9a7a3a';
const GROUND = '#9a8068';
const STRING = '#3a2a20';

export interface DecorBox {
  kind: string;
  /** True for detail on the level's own (playable) houses; exempt from the lane and collider rules. */
  house?: boolean;
  min: [number, number, number];
  max: [number, number, number];
}

export interface DecorStats {
  triangles: number;
  instancedMeshes: number;
  drawCalls: number;
  dropped: number;
}

export { mulberry32 };

/** Terrace colliders: style-0 solids after the ground (index 0) that are 60 m wide. */
export function terraceBoxes(world: World): AABB[] {
  const out: AABB[] = [];
  for (let i = 1; i < world.solids.length; i++) {
    const s = world.solids[i];
    const st = i < world.style.length ? world.style[i] : 1;
    if (st === 0 && s.max.x - s.min.x <= 2 * TERRACE_HALF_X + 1) out.push(s);
  }
  out.sort((a, b) => b.max.y - a.max.y);
  return out;
}

export function farPlaneY(z: number): number {
  return SLOPE * z + SLOPE_BASE;
}

export interface LotParams {
  step: number;
  sliceZ: number;
  z0: number;
  y0: number;
  floor: number;
  zMin: number;
  zMax: number;
}

/** ADR 0007 section 7 constants, derived from the style-0 terraces. */
export function lotParams(world: World): LotParams {
  const t = terraceBoxes(world);
  let floor = Infinity;
  let zMin = Infinity;
  let zMax = -Infinity;
  for (let i = 0; i < t.length; i++) {
    floor = Math.min(floor, t[i].max.y);
    zMin = Math.min(zMin, t[i].min.z);
    zMax = Math.max(zMax, t[i].max.z);
  }
  return {
    step: (t[0].max.y - t[1].max.y) / 2,
    sliceZ: (t[0].min.z - t[1].min.z) / 2,
    z0: t[0].min.z,
    y0: t[0].max.y,
    floor,
    zMin,
    zMax,
  };
}

/** Global staircase: each terrace's downhill half sits at T, its uphill half at T + step. */
export function lotY(p: LotParams, z: number): number {
  return Math.max(p.floor, p.y0 + p.step * Math.floor((z - p.z0) / p.sliceZ));
}

/** Ground height under (x, z): terrace top inside |x| <= 30, sloped far plane outside. */
export function groundAt(world: World, x: number, z: number): number {
  const t = terraceBoxes(world);
  for (let i = 0; i < t.length; i++) {
    const b = t[i];
    if (x >= b.min.x && x <= b.max.x && z >= b.min.z && z <= b.max.z) return b.max.y;
  }
  return farPlaneY(z);
}

export function laneZRange(world: World): { zMin: number; zMax: number } {
  let zMax = world.spawn.z;
  for (let i = 0; i < world.solids.length; i++) {
    const st = i < world.style.length ? world.style[i] : 1;
    if (st === 2 && world.solids[i].max.z > zMax) zMax = world.solids[i].max.z;
  }
  return { zMin: world.goal.min.z - 8, zMax: zMax + 8 };
}

/** True when the box overlaps a collider expanded by 0.5 m (resting on its top face is fine). */
export function hitsCollider(world: World, b: DecorBox): boolean {
  const m = b.kind === 'lot' ? 0 : MARGIN; // terrace-adjoining lots touch, never overlap
  for (let i = 0; i < world.solids.length; i++) {
    const s = world.solids[i];
    if (b.max[0] <= s.min.x - m || b.min[0] >= s.max.x + m) continue;
    if (b.max[2] <= s.min.z - m || b.min[2] >= s.max.z + m) continue;
    if (b.min[1] >= s.max.y - 1e-3) continue;
    if (b.max[1] <= s.min.y - m || b.min[1] >= s.max.y + m) continue;
    return true;
  }
  return false;
}

/** Lane rule (D1): only trees (and terrace steps, see below) may enter |x| < 16 inside the lane z-range, up to terraceTop + 6. */
export function violatesLane(world: World, b: DecorBox): boolean {
  const lane = laneZRange(world);
  if (b.max[2] <= lane.zMin || b.min[2] >= lane.zMax) return false;
  if (b.min[0] >= LANE_HALF_X || b.max[0] <= -LANE_HALF_X) return false;
  const cx = (b.min[0] + b.max[0]) / 2;
  const cz = (b.min[2] + b.max[2]) / 2;
  if (b.kind === 'stair') {
    // ADR 0006 D1 exception: terrace steps may sit in the lane up to the upper terrace top
    const minAbs = b.min[0] >= 0 ? b.min[0] : b.max[0] <= 0 ? -b.max[0] : 0;
    const up = groundAt(world, cx, b.max[2] + 0.6);
    const ok = minAbs >= 7.9 && b.max[1] <= up + 1e-6 && up > groundAt(world, cx, cz);
    return !ok;
  }
  if (b.kind !== 'tree') return true;
  return b.max[1] > groundAt(world, cx, cz) + 6 + 1e-6;
}

class Builder {
  kit = new DecorKit();
  lots: LotParams;
  boxes: DecorBox[] = [];
  strings: number[] = [];
  private tmp = new Color();
  /** Detail stream: extras draw from it so the base layout (and its budgets) stays unchanged. */
  readonly fx = mulberry32(0x7a11);
  /** While true, recorded boxes are tagged `house` (see dressHouses). */
  onHouse = false;
  constructor(
    readonly world: World,
    readonly rng: () => number,
  ) {
    this.lots = lotParams(world);
  }

  /** True when `n` more instances of `piece` still fit under its cap, with the budget test's 90 % margin. */
  room(piece: PieceId, n: number): boolean {
    return this.kit.used[piece] + n <= 0.9 * PIECE_CAP[piece];
  }
  U(a: number, b: number): number {
    return a + (b - a) * this.rng();
  }
  pick<T>(arr: T[]): T {
    return arr[Math.min(arr.length - 1, Math.floor(this.rng() * arr.length))];
  }
  /** Colour with +-5 % value jitter. */
  col(hex: string): Color {
    return this.tmp.set(hex).multiplyScalar(1 + this.U(-0.05, 0.05));
  }
  colRaw(hex: string): Color {
    return this.tmp.set(hex);
  }

  private rec(kind: string, a: number[], b: number[]): void {
    const box: DecorBox = { kind, min: [a[0], a[1], a[2]], max: [b[0], b[1], b[2]] };
    if (this.onHouse) box.house = true;
    this.boxes.push(box);
  }

  /** Axis-aligned box piece from corner coordinates. */
  box(
    piece: PieceId,
    kind: string,
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number,
    c: Color,
  ): boolean {
    const ok = this.kit.add(
      piece,
      (x0 + x1) / 2,
      y0,
      (z0 + z1) / 2,
      x1 - x0,
      y1 - y0,
      z1 - z0,
      0,
      c,
    );
    if (ok) this.rec(kind, [x0, y0, z0], [x1, y1, z1]);
    return ok;
  }

  roof(
    kind: string,
    cx: number,
    y0: number,
    cz: number,
    w: number,
    d: number,
    h: number,
    c: Color,
  ): void {
    const ok = this.kit.add(
      'roof',
      cx,
      y0,
      cz,
      w / ROOF_UNIT_W,
      h / ROOF_UNIT_H,
      d / ROOF_UNIT_W,
      0,
      c,
    );
    if (ok) this.rec(kind, [cx - w / 2, y0, cz - d / 2], [cx + w / 2, y0 + h, cz + d / 2]);
  }

  tank(cx: number, y0: number, cz: number, r: number, h: number, c: Color): void {
    const ok = this.kit.add('tank', cx, y0, cz, 2 * r, h / TANK_UNIT_H, 2 * r, 0, c);
    if (ok) this.rec('tank', [cx - r, y0, cz - r], [cx + r, y0 + h, cz + r]);
  }

  canopy(kind: string, cx: number, cy: number, cz: number, r: number, c: Color): void {
    const ok = this.kit.add('canopy', cx, cy, cz, r, r, r, 0, c);
    if (ok) this.rec(kind, [cx - r, cy - r, cz - r], [cx + r, cy + r, cz + r]);
  }

  trunk(kind: string, cx: number, y0: number, cz: number, h: number, c: Color): void {
    const ok = this.kit.add('trunk', cx, y0, cz, 1, h, 1, 0, c);
    if (ok) this.rec(kind, [cx - 0.2, y0, cz - 0.2], [cx + 0.2, y0 + h, cz + 0.2]);
  }

  /** Rail unit scaled to `len`, running along z (alongZ) or x. */
  rail(cx: number, y0: number, cz: number, len: number, alongZ: boolean, c: Color): void {
    const ok = this.kit.add('rail', cx, y0, cz, len / RAIL_LEN, 1, 1, alongZ ? Math.PI / 2 : 0, c);
    if (!ok) return;
    const hx = alongZ ? 0.04 : len / 2;
    const hz = alongZ ? len / 2 : 0.04;
    this.rec('rail', [cx - hx, y0, cz - hz], [cx + hx, y0 + RAIL_POST_H, cz + hz]);
  }

  flag(cx: number, cy: number, cz: number, c: Color, rotY = Math.PI / 2): void {
    const ok = this.kit.add('flag', cx, cy, cz, 1, 1, 1, rotY, c);
    if (!ok) return;
    const ex = Math.abs(Math.cos(rotY)) * 0.175 + Math.abs(Math.sin(rotY)) * 0.02;
    const ez = Math.abs(Math.sin(rotY)) * 0.175 + Math.abs(Math.cos(rotY)) * 0.02;
    this.rec('flag', [cx - ex, cy - 0.125, cz - ez], [cx + ex, cy + 0.125, cz + ez]);
  }

  /** Planter trough with its long side along z (against a parapet). */
  planter(cx: number, y0: number, cz: number): void {
    const ok = this.kit.add(
      'planter',
      cx,
      y0,
      cz,
      1,
      1,
      1,
      Math.PI / 2,
      this.tmp.setScalar(this.U(0.9, 1)),
    );
    if (ok) this.rec('pot', [cx - 0.3, y0, cz - 0.65], [cx + 0.3, y0 + 0.85, cz + 0.65]);
  }

  pot(cx: number, y0: number, cz: number): void {
    const ok = this.kit.add('pot', cx, y0, cz, 1, 1, 1, 0, this.tmp.setScalar(this.U(0.88, 1)));
    if (ok) this.rec('pot', [cx - 0.24, y0, cz - 0.24], [cx + 0.24, y0 + 0.66, cz + 0.24]);
  }

  /**
   * Oriented piece (window, shutter). (cx, cz) is the point on the wall plane, y0 the base.
   * face 'x-' / 'x+' / 'z+' / 'z-' is the outward wall normal; the unit +z points out of the wall.
   */
  facing(
    piece: 'window' | 'shutter' | 'bracket',
    kind: string,
    face: 'x-' | 'x+' | 'z+' | 'z-',
    cx: number,
    y0: number,
    cz: number,
    w: number,
    h: number,
    depth: number,
    c: Color,
  ): void {
    const isWin = piece === 'window';
    const off = isWin ? 0.5 * depth : 0;
    const isBr = piece === 'bracket';
    const along = isWin ? 0.6 * w : isBr ? 0.06 : 0.93;
    const outEnd = isWin ? 1.6 * depth : isBr ? 0.5 : 0.04;
    const yLo = isWin ? y0 - 0.08 * h : y0;
    const yHi = isWin ? y0 + h : isBr ? y0 + 0.5 : y0 + 1.3;
    let rot = 0;
    let ox = cx;
    let oz = cz;
    if (face === 'x-') {
      rot = -Math.PI / 2;
      ox = cx - off;
    } else if (face === 'x+') {
      rot = Math.PI / 2;
      ox = cx + off;
    } else if (face === 'z+') {
      oz = cz + off;
    } else {
      rot = Math.PI;
      oz = cz - off;
    }
    const ok = this.kit.add(piece, ox, y0, oz, w, h, depth, rot, c);
    if (!ok) return;
    if (face === 'x-') this.rec(kind, [cx - outEnd, yLo, cz - along], [cx, yHi, cz + along]);
    else if (face === 'x+') this.rec(kind, [cx, yLo, cz - along], [cx + outEnd, yHi, cz + along]);
    else if (face === 'z+') this.rec(kind, [cx - along, yLo, cz], [cx + along, yHi, cz + outEnd]);
    else this.rec(kind, [cx - along, yLo, cz - outEnd], [cx + along, yHi, cz]);
  }

  /** Lane and collider gate for a candidate bounding box. */
  allowed(kind: string, a: number[], b: number[]): boolean {
    const box: DecorBox = {
      kind,
      min: [a[0], a[1], a[2]],
      max: [b[0], b[1], b[2]],
    };
    return !violatesLane(this.world, box) && !hitsCollider(this.world, box);
  }
}

interface HouseInfo {
  side: number;
  col: number;
  z0: number;
  z1: number;
  xFace: number;
  roofTop: number;
}

/** Pitched-roof house, n storeys (1..3) on a paved lot at baseY. a, b are unsigned lane distances. */
function house(
  B: Builder,
  side: number,
  col: number,
  a: number,
  b: number,
  z0: number,
  z1: number,
  baseY: number,
  n: number,
): HouseInfo | null {
  const w = b - a;
  const d = z1 - z0;
  const xa = side > 0 ? a : -b;
  const xb = side > 0 ? b : -a;
  const brickRoll = B.rng();
  const nb = Math.min(n, brickRoll < 0.25 ? n : brickRoll < 0.6 ? 1 : 2);
  const balcony = col === 0 && n >= 2 && B.rng() < 0.5;
  const yTop = baseY + n * STOREY;
  const lipLane = balcony ? 1.0 : 0.5;
  const loX = xa - (side > 0 ? lipLane : 0.5);
  const hiX = xb + (side > 0 ? 0.5 : lipLane);
  if (!B.allowed('house', [loX, baseY, z0 - 0.5], [hiX, yTop + ROOF_H, z1 + 0.5])) return null;

  // body: brick base, whitewash above, dark wood cornices at the join and under the roof
  const yBrick = baseY + nb * STOREY;
  B.box('wallBrick', 'body', xa, baseY, z0, xb, yBrick, z1, B.col(B.pick(BRICK)));
  if (n > nb) {
    B.box('wallPlaster', 'body', xa, yBrick, z0, xb, yTop, z1, B.col(B.pick(LIME)));
    B.box(
      'cornice',
      'cornice',
      xa - 0.15,
      yBrick - 0.1,
      z0 - 0.15,
      xb + 0.15,
      yBrick + 0.25,
      z1 + 0.15,
      B.colRaw(B.pick(WOOD)),
    );
  }
  B.box(
    'cornice',
    'cornice',
    xa - 0.15,
    yTop - 0.3,
    z0 - 0.15,
    xb + 0.15,
    yTop + 0.05,
    z1 + 0.15,
    B.colRaw(B.pick(WOOD)),
  );
  B.roof('roof', (xa + xb) / 2, yTop, (z0 + z1) / 2, w + 1, d + 1, ROOF_H, B.col(B.pick(TILE)));
  // eave struts along the lane face (reference: carved brackets under deep eaves)
  {
    const bf = side > 0 ? xa : xb;
    const bn = Math.max(2, Math.floor(d / 1.8));
    if (B.room('bracket', bn)) {
      for (let j = 0; j < bn; j++) {
        B.facing(
          'bracket',
          'bracket',
          side > 0 ? 'x-' : 'x+',
          bf,
          yTop - 0.5,
          z0 + (d * (j + 0.5)) / bn,
          1,
          1,
          1,
          B.colRaw(WOOD[1]),
        );
      }
    }
  }

  // windows (0.12 proud): column 0 on every storey, column 1 on the top storey only
  const laneFaceX = side > 0 ? xa : xb;
  const out = side > 0 ? -1 : 1;
  const winCol = (): Color => B.colRaw(B.pick(WOOD));
  const k = Math.min(3, Math.floor(d / 2.4));
  const lf = out < 0 ? 'x-' : 'x+';
  for (let st = col === 0 ? 0 : n - 1; st < n; st++) {
    const wy = baseY + st * STOREY + 0.8;
    for (let j = 0; j < k; j++) {
      const zc = z0 + (d * (j + 0.5)) / k;
      B.facing('window', 'window', lf, laneFaceX, wy, zc, 0.9, 1.3, WIN_D, winCol());
      if (col === 0 && B.rng() < 0.4) {
        B.facing('shutter', 'shutter', lf, laneFaceX, wy, zc, 1, 1, 1, B.colRaw(B.pick(SHUTTERS)));
      }
    }
  }
  if (col === 0) {
    const wy = baseY + (n - 1) * STOREY + 0.8;
    for (let j = 0; j < 1; j++) {
      if (B.rng() < 0.5) continue;
      B.facing('window', 'window', 'z+', xa + w * 0.5, wy, z1, 0.9, 1.3, WIN_D, winCol());
    }
  }

  // wooden balcony on the lane face, top-storey floor, 85 % of the face width (reference b06/b08:
  // balconies run nearly the full facade), 1 m deep
  if (balcony) {
    const wide = B.room('rail', Math.ceil((0.85 * d) / RAIL_LEN));
    const len = (wide ? 0.85 : 0.6) * d;
    const zc = (z0 + z1) / 2;
    const dx0 = out < 0 ? laneFaceX - 1.0 : laneFaceX;
    const rx = out < 0 ? laneFaceX - 0.95 : laneFaceX + 0.95;
    const m = Math.ceil(len / RAIL_LEN);
    const seg = len / m;
    const fy = baseY + (n - 1) * STOREY;
    B.box(
      'deck',
      'deck',
      dx0,
      fy,
      zc - len / 2,
      dx0 + 1.0,
      fy + 0.15,
      zc + len / 2,
      B.colRaw(WOOD[1]),
    );
    for (let j = 0; j < m; j++) {
      B.rail(rx, fy + 0.15, zc - len / 2 + seg * (j + 0.5), seg, true, B.colRaw(WOOD[0]));
    }
    B.pot(dx0 + 0.5, fy + 0.15, zc - (len / 2 - 0.4));
    B.pot(dx0 + 0.5, fy + 0.15, zc + (len / 2 - 0.4));
  }
  return { side, col, z0, z1, xFace: laneFaceX, roofTop: yTop + ROOF_H };
}

const CLUSTER_PALETTE = [...BRICK, ...LIME];

/** Flat-roofed cluster of adjoining houses (x values mirrored by plan.side). */
function buildCluster(B: Builder, plan: ClusterPlan): void {
  const s = plan.side;
  const hs = plan.houses;
  let prevHex = '';
  let maxRoof = -Infinity;
  for (let k = 0; k < hs.length; k++) {
    const h = hs[k];
    const xa = s > 0 ? h.x0 : -h.x1;
    const xb = s > 0 ? h.x1 : -h.x0;
    const d = h.z1 - h.z0;
    let hex = B.pick(CLUSTER_PALETTE);
    if (hex === prevHex) hex = B.pick(CLUSTER_PALETTE);
    prevHex = hex;
    maxRoof = Math.max(maxRoof, h.roofY);
    B.box(
      BRICK.includes(hex) ? 'wallBrick' : 'wallPlaster',
      'body',
      xa,
      plan.baseY,
      h.z0,
      xb,
      h.roofY,
      h.z1,
      B.col(hex),
    );
    const inner = k > 0 ? hs[k - 1] : null;
    const hidden = h.shareIn === 1 && inner !== null && inner.storeys >= h.storeys;
    const laneX = s > 0 ? xa : xb;
    if (!hidden) {
      const px = s > 0 ? xa : xb - 0.25;
      B.box(
        'parapet',
        'parapet',
        px,
        h.roofY,
        h.z0,
        px + 0.25,
        h.roofY + 0.6,
        h.z1,
        B.colRaw(CONCRETE),
      );
      const cnt = Math.min(3, Math.floor(d / 2.4));
      const wy = plan.baseY + (h.storeys - 1) * CLUSTER_STOREY + 0.8;
      for (let j = 0; j < cnt; j++) {
        const zc = h.z0 + (d * (j + 0.5)) / cnt;
        B.facing(
          'window',
          'window',
          s > 0 ? 'x-' : 'x+',
          laneX,
          wy,
          zc,
          0.9,
          1.3,
          WIN_D,
          B.colRaw(B.pick(WOOD)),
        );
      }
    }
    if (k === hs.length - 1) {
      const px = s > 0 ? xb - 0.25 : xa;
      B.box(
        'parapet',
        'parapet',
        px,
        h.roofY,
        h.z0,
        px + 0.25,
        h.roofY + 0.6,
        h.z1,
        B.colRaw(CONCRETE),
      );
    }
    if (B.rng() < 0.35) {
      B.tank(s * (h.x1 - 0.8), h.roofY, h.z1 - 1.2, 0.8, TANK_UNIT_H, B.colRaw(B.pick(TANKS)));
    }
    if (B.room('planter', 2) && B.fx() < 0.45) {
      const lx = s > 0 ? xa + 0.7 : xb - 0.7;
      const pz = h.z0 + d * (0.3 + 0.4 * B.fx());
      B.planter(lx, h.roofY, pz);
    }
    if (B.rng() < 0.25) {
      const px = s * (h.x0 + 0.8);
      B.pot(px, h.roofY, h.z0 + 0.4);
      B.pot(px, h.roofY, h.z1 - 0.4);
    }
    // terrace furniture from the flat-roof references (r02, r07, r10): stair hatch, solar heater
    if (h.x1 - h.x0 >= 3.5 && d >= 4 && B.room('parapet', 1) && B.fx() < 0.5) {
      const hx = (xa + xb) / 2;
      B.box(
        'parapet',
        'parapet',
        hx - 0.55,
        h.roofY,
        h.z0 + 0.5,
        hx + 0.55,
        h.roofY + 1.1,
        h.z0 + 1.5,
        B.colRaw(CONCRETE),
      );
    }
    if (h.x1 - h.x0 >= 4 && d >= 4 && B.room('parapet', 1) && B.room('deck', 1) && B.fx() < 0.4) {
      const sx = s * (h.x0 + 1.6);
      const zc = (h.z0 + h.z1) / 2;
      B.box(
        'parapet',
        'parapet',
        sx - 0.5,
        h.roofY,
        zc - 0.4,
        sx + 0.5,
        h.roofY + 0.35,
        zc + 0.4,
        B.colRaw(CONCRETE),
      );
      B.box(
        'deck',
        'deck',
        sx - 0.7,
        h.roofY + 0.35,
        zc - 0.55,
        sx + 0.7,
        h.roofY + 0.45,
        zc + 0.55,
        B.colRaw(SOLAR),
      );
    }
  }
  if (hs.length >= 2 && B.rng() < 0.3) {
    const a = hs[0];
    const z = hs[hs.length - 1];
    const len = Math.abs((z.x0 + z.x1 - a.x0 - a.x1) / 2);
    const y = maxRoof + 0.8 + 0.08 * len;
    flagString(
      B,
      (s * (a.x0 + a.x1)) / 2,
      y,
      (a.z0 + a.z1) / 2,
      (s * (z.x0 + z.x1)) / 2,
      y,
      (z.z0 + z.z1) / 2,
    );
  }
}

interface PagodaInfo {
  cx: number;
  cz: number;
  s: number;
  fx: number;
  fy: number;
  fz: number;
  plinthTop: number;
}

function pagoda(B: Builder, cx: number, cz: number, s: number, tiers: number): PagodaInfo | null {
  const hb0 = 4.6 * s;
  let y0 = lotY(B.lots, cz + hb0) + LOT_CAP;
  let yBase = lotY(B.lots, cz - hb0) + LOT_CAP;
  // a collider slab under the site (the far-plane ground can sit below it) is the real floor
  for (let i = 0; i < B.world.solids.length; i++) {
    const sd = B.world.solids[i];
    if (cx >= sd.min.x && cx <= sd.max.x && cz >= sd.min.z && cz <= sd.max.z && sd.max.y > y0) {
      y0 = sd.max.y;
      yBase = y0;
    }
  }
  const hb = 4.6 * s;
  if (!B.allowed('pagoda', [cx - hb, yBase, cz - hb], [cx + hb, y0 + 26 * s, cz + hb])) return null;
  // brick plinth: three steps
  const pw = [9, 7.6, 6.4];
  for (let i = 0; i < pw.length; i++) {
    const hw = (pw[i] * s) / 2;
    B.box(
      'body',
      'pagoda',
      cx - hw,
      i === 0 ? yBase : y0 + 0.5 * s * i,
      cz - hw,
      cx + hw,
      y0 + 0.5 * s * (i + 1),
      cz + hw,
      B.col(BRICK[i % BRICK.length]),
    );
  }
  let y = y0 + 1.5 * s;
  const plinthTop = y;
  const widths = [6.0, 4.4, 3.0, 2.0];
  const heights = [3.6, 3.0, 2.6, 2.2];
  for (let i = 0; i < tiers; i++) {
    const w = widths[i] * s;
    const h = heights[i] * s;
    B.box(
      'body',
      'pagoda',
      cx - w / 2,
      y,
      cz - w / 2,
      cx + w / 2,
      y + h,
      cz + w / 2,
      B.col(LIME[1]),
    );
    B.box(
      'cornice',
      'cornice',
      cx - w / 2 - 0.1,
      y + h - 0.3,
      cz - w / 2 - 0.1,
      cx + w / 2 + 0.1,
      y + h + 0.05,
      cz + w / 2 + 0.1,
      B.colRaw(WOOD[0]),
    );
    if (i === 0) {
      const faces: ('x-' | 'x+' | 'z+' | 'z-')[] = ['x-', 'x+', 'z+', 'z-'];
      for (let f = 0; f < faces.length; f++) {
        for (let j = 0; j < 2; j++) {
          const u = (j === 0 ? -0.25 : 0.25) * w;
          const face = faces[f];
          const wx = face === 'x-' ? cx - w / 2 : face === 'x+' ? cx + w / 2 : cx + u;
          const wz = face === 'z+' ? cz + w / 2 : face === 'z-' ? cz - w / 2 : cz + u;
          B.facing(
            'window',
            'window',
            face,
            wx,
            y + 1.0 * s,
            wz,
            0.9,
            1.3,
            WIN_D,
            B.colRaw(WOOD[0]),
          );
        }
      }
    }
    y += h;
    const rw = w + 2.2 * s;
    B.roof('pagoda', cx, y, cz, rw, rw, 1.4 * s, B.col(TILE[i % TILE.length]));
    y += 1.4 * s * 0.98;
  }
  B.box(
    'parapet',
    'finial',
    cx - 0.15 * s,
    y,
    cz - 0.15 * s,
    cx + 0.15 * s,
    y + 2.4 * s,
    cz + 0.15 * s,
    B.colRaw(BRASS),
  );
  return { cx, cz, s, fx: cx, fy: y + 2.4 * s, fz: cz, plinthTop };
}

/** Flag string a -> b: 12 flags, 8 % sag, 4 m anchor exclusion, never inside the lane. */
function flagString(
  B: Builder,
  ax: number,
  ay: number,
  az: number,
  bx: number,
  by: number,
  bz: number,
): void {
  const world = B.world;
  const len = Math.sqrt((bx - ax) ** 2 + (bz - az) ** 2);
  const sag = 0.08 * len;
  const N = 12;
  for (let k = 0; k <= N; k++) {
    const u = k / N;
    if (Math.abs(ax + (bx - ax) * u) < LANE_HALF_X) return;
  }
  const rotY = Math.atan2(-(bz - az), bx - ax);
  let px = ax;
  let py = ay;
  let pz = az;
  for (let k = 1; k <= N; k++) {
    const u = k / N;
    const sx = ax + (bx - ax) * u;
    const sy = ay + (by - ay) * u - sag * 4 * u * (1 - u);
    const sz = az + (bz - az) * u;
    B.strings.push(px, py, pz, sx, sy, sz);
    px = sx;
    py = sy;
    pz = sz;
  }
  for (let k = 0; k < N; k++) {
    const u = (k + 0.5) / N;
    const fx = ax + (bx - ax) * u;
    const fy = ay + (by - ay) * u - sag * 4 * u * (1 - u) - 0.2;
    const fz = az + (bz - az) * u;
    let near = false;
    for (let a = 0; a < world.anchors.length; a++) {
      const an = world.anchors[a];
      const dx = an.px - fx;
      const dy = an.py - fy;
      const dz = an.pz - fz;
      if (dx * dx + dy * dy + dz * dz < 16) near = true;
    }
    if (!near) B.flag(fx, fy, fz, B.colRaw(FLAGS[k % FLAGS.length]), rotY + (k % 2) * Math.PI);
  }
}

/** Steps between consecutive terraces, in the lane's x 8..15.5 band (ADR 0006 D1 exception). */
function terraceSteps(B: Builder, terraces: AABB[]): void {
  for (let p = 0; p + 1 < terraces.length; p++) {
    const U = terraces[p];
    const L = terraces[p + 1];
    const delta = U.max.y - L.max.y;
    if (delta <= 0.6) continue;
    const side = p % 2 === 0 ? 1 : -1;
    const n = Math.min(24, Math.ceil(delta / 0.5));
    const r = delta / n;
    const t = Math.min(0.45, 7.5 / n);
    const z0 = U.min.z - 2.1;
    const z1 = U.min.z - 0.55;
    let ok = true;
    for (let k = 0; k < n && ok; k++) {
      const xa = side * (8 + k * t);
      const xb = side * (8 + (k + 1) * t);
      ok = B.allowed(
        'stair',
        [Math.min(xa, xb), L.max.y, z0],
        [Math.max(xa, xb), L.max.y + (k + 1) * r, z1],
      );
    }
    if (!ok) continue;
    for (let k = 0; k < n; k++) {
      const xa = side * (8 + k * t);
      const xb = side * (8 + (k + 1) * t);
      B.box(
        'body',
        'stair',
        Math.min(xa, xb),
        L.max.y,
        z0,
        Math.max(xa, xb),
        L.max.y + (k + 1) * r,
        z1,
        B.col(PAVING),
      );
    }
  }
}

function treeAt(
  B: Builder,
  cx: number,
  cz: number,
  base: number,
  kind: string,
  big: boolean,
): void {
  const trunkH = big ? 2.2 : 2.0;
  const r = big ? B.U(1.4, 1.7) : B.U(1.0, 1.3);
  const cy = base + trunkH + r * 0.7;
  const top = cy + r;
  if (!B.allowed(kind, [cx - r, base, cz - r], [cx + r, top, cz + r])) return;
  B.trunk(kind, cx, base, cz, trunkH + 0.3, B.colRaw(TRUNK));
  B.canopy(kind, cx, cy, cz, r, B.col(B.pick(CANOPY)));
  if (!big && B.rng() < 0.4) {
    const r2 = r * 0.7;
    const cy2 = top + r2 * 0.2;
    if (B.allowed(kind, [cx - r2, cy2 - r2, cz - r2], [cx + r2, cy2 + r2, cz + r2])) {
      B.canopy(kind, cx, cy2, cz, r2, B.col(B.pick(CANOPY)));
    }
  }
}

function farCity(B: Builder, x0: number, x1: number, z0: number, z1: number, step: number): void {
  for (let z = z0; z > z1; z -= step) {
    for (let x = x0; x < x1; x += step) {
      if (B.rng() > 0.85) continue;
      const w = B.U(6, 9);
      const d = B.U(6, 9);
      const cx = x + B.U(-1.5, 1.5);
      const cz = z + B.U(-1.5, 1.5);
      const n = 2 + Math.floor(B.rng() * 3);
      const hip = B.rng() < 0.3;
      const brick = B.rng() < 0.4;
      const ya = Math.max(farPlaneY(cz - d / 2), farPlaneY(cz + d / 2));
      const yb = ya - 0.365 * d - 0.5;
      const yt = ya + n * STOREY;
      if (!B.allowed('far', [cx - w / 2, yb, cz - d / 2], [cx + w / 2, yt + 1.5, cz + d / 2]))
        continue;
      B.box(
        'body',
        'far',
        cx - w / 2,
        yb,
        cz - d / 2,
        cx + w / 2,
        yt,
        cz + d / 2,
        B.col(brick ? FAR_BRICK : FAR_LIME),
      );
      if (hip) B.roof('far', cx, yt, cz, w + 0.8, d + 0.8, 1.4, B.col(FAR_TILE));
    }
  }
}

/**
 * Detail for the playable houses (the level's style-2 roofs and the walls under them): a stepped
 * brick base down to the hill, two storeys of lattice windows, eave brackets, a balcony rail on the
 * lane-facing ledge and rim furniture on the roof. Visual only; every box bypasses the lane rule
 * because these are the level's own buildings.
 */
function dressHouses(B: Builder): void {
  const w = B.world;
  B.onHouse = true;
  for (let i = 1; i + 1 < w.solids.length; i++) {
    const st = i < w.style.length ? w.style[i] : 1;
    const r = w.solids[i];
    if (st !== 2 || r.max.x - r.min.x < 12) continue;
    const body = w.solids[i + 1];
    const x0 = r.min.x;
    const x1 = r.max.x;
    const z0 = r.min.z;
    const z1 = r.max.z;
    const cxh = (x0 + x1) / 2;
    const czh = (z0 + z1) / 2;
    const top = r.max.y;
    const yE = r.min.y; // eaves: roof underside
    const yF = yE - 2 * STOREY; // first-floor level
    const dir = cxh < 0 ? 1 : -1; // toward the lane axis
    const laneFace = dir > 0 ? 'x+' : 'x-';
    const laneX = dir > 0 ? x1 : x0;
    const outerX = dir > 0 ? x0 : x1;

    // stepped brick base from the hill up to the first floor (wider toward the ground)
    const yB = body.min.y;
    const hB = yF - yB;
    if (hB > 1) {
      const offs = [1.6, 0.9, 0.25];
      for (let k = 0; k < 3; k++) {
        const o = offs[k];
        B.box(
          'wallBrick',
          'base',
          x0 - o,
          yB + (hB * k) / 3,
          z0 - o,
          x1 + o,
          yB + (hB * (k + 1)) / 3,
          z1 + o,
          B.col(BRICK[k % BRICK.length]),
        );
      }
      B.box(
        'cornice',
        'cornice',
        x0 - 0.4,
        yF - 0.15,
        z0 - 0.4,
        x1 + 0.4,
        yF + 0.15,
        z1 + 0.4,
        B.colRaw(WOOD[0]),
      );
    }
    // brick ground floor band, plaster above (level walls are plaster; this is a proud skin)
    B.box(
      'cornice',
      'cornice',
      x0 - 0.25,
      yE - 0.35,
      z0 - 0.25,
      x1 + 0.25,
      yE,
      z1 + 0.25,
      B.colRaw(WOOD[0]),
    );
    B.box(
      'cornice',
      'cornice',
      x0 - 0.12,
      yF + 2.65,
      z0 - 0.12,
      x1 + 0.12,
      yF + 2.9,
      z1 + 0.12,
      B.colRaw(WOOD[1]),
    );

    // windows: two storeys on every face, lattice units from the kit
    const faces: ('x-' | 'x+' | 'z+' | 'z-')[] = ['x-', 'x+', 'z+', 'z-'];
    for (let f = 0; f < 4; f++) {
      const face = faces[f];
      const alongX = face === 'z+' || face === 'z-';
      const span = alongX ? x1 - x0 : z1 - z0;
      const k = Math.floor(span / 2.8);
      for (let st2 = 0; st2 < 2; st2++) {
        const wy = yF + st2 * STOREY + 0.8;
        for (let j = 0; j < k; j++) {
          const u = (span * (j + 0.5)) / k;
          const wx = face === 'x-' ? x0 : face === 'x+' ? x1 : x0 + u;
          const wz = face === 'z+' ? z1 : face === 'z-' ? z0 : z0 + u;
          B.facing('window', 'window', face, wx, wy, wz, 0.9, 1.3, WIN_D, B.colRaw(B.pick(WOOD)));
          if (B.fx() < 0.35) {
            B.facing('shutter', 'shutter', face, wx, wy, wz, 1, 1, 1, B.colRaw(B.pick(SHUTTERS)));
          }
        }
      }
      // eave brackets under the roof edge
      const bn = Math.max(2, Math.floor(span / 1.8));
      if (B.room('bracket', bn)) {
        for (let j = 0; j < bn; j++) {
          const u = (span * (j + 0.5)) / bn;
          const wx = face === 'x-' ? x0 : face === 'x+' ? x1 : x0 + u;
          const wz = face === 'z+' ? z1 : face === 'z-' ? z0 : z0 + u;
          B.facing('bracket', 'bracket', face, wx, yE - 0.55, wz, 1, 1, 1, B.colRaw(WOOD[1]));
        }
      }
    }

    // balcony rail, pots and underside brackets on the lane-facing ledge
    const ledgeTop = top - 3;
    const outX = laneX + dir * 1.75;
    const lz0 = z0 + 1;
    const lz1 = z1 - 1;
    const len = lz1 - lz0;
    const m = Math.ceil(len / RAIL_LEN);
    if (B.room('rail', m + 2)) {
      for (let j = 0; j < m; j++) {
        B.rail(outX, ledgeTop, lz0 + (len / m) * (j + 0.5), len / m, true, B.colRaw(WOOD[0]));
      }
      B.rail(laneX + dir * 0.9, ledgeTop, lz0, 1.8, false, B.colRaw(WOOD[0]));
      B.rail(laneX + dir * 0.9, ledgeTop, lz1, 1.8, false, B.colRaw(WOOD[0]));
    }
    B.pot(laneX + dir * 0.9, ledgeTop, czh - 1.5);
    B.pot(laneX + dir * 0.9, ledgeTop, czh + 1.5);
    for (let j = 0; j < 3; j++) {
      B.facing(
        'bracket',
        'bracket',
        laneFace,
        laneX,
        ledgeTop - 0.8,
        lz0 + (len * (j + 0.5)) / 3,
        1,
        1,
        1,
        B.colRaw(WOOD[1]),
      );
    }

    // roof rim: low parapet on the sides the hero does not launch from, tank, planters, pots
    B.box(
      'parapet',
      'parapet',
      outerX - (dir > 0 ? 0 : 0.25),
      top,
      z0,
      outerX + (dir > 0 ? 0.25 : 0),
      top + 0.5,
      z1,
      B.colRaw(CONCRETE),
    );
    B.box('parapet', 'parapet', x0, top, z1 - 0.25, x1, top + 0.5, z1, B.colRaw(CONCRETE));
    // timber railing on the parapet wall: outer and uphill edges whole, launch edges with a 4 m gap
    const runZ = (xr: number, za: number, zb: number): void => {
      const n = Math.max(1, Math.ceil((zb - za) / RAIL_LEN));
      for (let j = 0; j < n; j++) {
        B.rail(
          xr,
          top + 0.5,
          za + ((zb - za) * (j + 0.5)) / n,
          (zb - za) / n,
          true,
          B.colRaw(WOOD[0]),
        );
      }
    };
    const runX = (zr: number, xa: number, xb: number): void => {
      const n = Math.max(1, Math.ceil((xb - xa) / RAIL_LEN));
      for (let j = 0; j < n; j++) {
        B.rail(
          xa + ((xb - xa) * (j + 0.5)) / n,
          top + 0.5,
          zr,
          (xb - xa) / n,
          false,
          B.colRaw(WOOD[0]),
        );
      }
    };
    if (B.room('rail', 40)) {
      const ox = outerX + (dir > 0 ? 0.12 : -0.12);
      runZ(ox, z0, z1);
      runX(z1 - 0.12, x0, x1);
      runZ(laneX - dir * 0.12, z0, czh - 2);
      runZ(laneX - dir * 0.12, czh + 2, z1);
      runX(z0 + 0.12, x0, cxh - 2);
      runX(z0 + 0.12, cxh + 2, x1);
    }
    const rimX = outerX + (dir > 0 ? 0.55 : -0.55);
    B.tank(rimX, top, czh - 2.4, 0.5, TANK_UNIT_H * 0.8, B.colRaw(B.pick(TANKS)));
    if (B.room('planter', 1)) B.planter(rimX, top, czh + 1.6);
    B.pot(rimX, top, z1 - 0.8);
    B.pot(rimX, top, z0 + 0.8);
  }
  B.onHouse = false;
}

function groundMesh(): Mesh {
  const pos: number[] = [];
  const idx: number[] = [];
  const zA = 40;
  const zB = -420;
  const sides = [
    [TERRACE_HALF_X, 200],
    [-200, -TERRACE_HALF_X],
  ];
  for (let s = 0; s < sides.length; s++) {
    const base = pos.length / 3;
    const xl = sides[s][0];
    const xr = sides[s][1];
    pos.push(
      xl,
      farPlaneY(zA),
      zA,
      xr,
      farPlaneY(zA),
      zA,
      xr,
      farPlaneY(zB),
      zB,
      xl,
      farPlaneY(zB),
      zB,
    );
    idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const m = new Mesh(
    geo,
    new MeshLambertMaterial({ color: new Color(GROUND), flatShading: true, side: DoubleSide }),
  );
  m.name = 'decor_ground';
  return m;
}

/** Builds the non-collider city. Deterministic for a given (world, seed). */
export function buildDecor(world: World, seed = 1729): Group {
  const B = new Builder(world, mulberry32(seed));
  const terraces = terraceBoxes(world);
  const g = new Group();
  g.name = 'decor';

  // landmarks first so houses can steer around them
  const pagodas = [
    [-48, -70, 1, 3],
    [52, -150, 1, 3],
    [-40, -200, 1.25, 4],
  ];
  const built: PagodaInfo[] = [];
  for (let i = 0; i < pagodas.length; i++) {
    const pi = pagoda(B, pagodas[i][0], pagodas[i][1], pagodas[i][2], pagodas[i][3]);
    if (pi) built.push(pi);
  }
  terraceSteps(B, terraces);
  dressHouses(B);

  const nearHouses: HouseInfo[] = [];
  const clusters: ClusterPlan[] = [];
  const LP = B.lots;
  const pagodaBlocks = (s: number, lo: number, hi: number, za: number, zb: number): boolean => {
    for (let p = 0; p < pagodas.length; p++) {
      const pr = 6 * pagodas[p][2] + 0.5;
      const px = Math.abs(pagodas[p][0]);
      const pz = pagodas[p][1];
      if (
        hi > px - pr &&
        lo < px + pr &&
        zb > pz - pr &&
        za < pz + pr &&
        pagodas[p][0] > 0 === s > 0
      )
        return true;
    }
    return false;
  };
  // lane trees on each terrace: sides -1, +1, then random, z in successive thirds
  for (let t = 0; t < terraces.length; t++) {
    const tb = terraces[t];
    const tzLo = tb.min.z + 3;
    const tzSpan = tb.max.z - 3 - tzLo;
    for (let k = 0; k < 3; k++) {
      const s = k === 0 ? -1 : k === 1 ? 1 : B.rng() < 0.5 ? -1 : 1;
      const tx = s * B.U(11.5, 14);
      const tz = B.U(tzLo + (tzSpan * k) / 3, tzLo + (tzSpan * (k + 1)) / 3);
      treeAt(B, tx, tz, tb.max.y, 'tree', false);
    }
  }
  // lot slices, uphill to downhill
  const kMin = Math.floor((LP.zMin - LP.z0) / LP.sliceZ);
  const kMax = Math.ceil((LP.zMax - LP.z0) / LP.sliceZ) - 1;
  for (let k = kMax; k >= kMin; k--) {
    const sz0 = Math.max(LP.z0 + k * LP.sliceZ, LP.zMin);
    const sz1 = Math.min(LP.z0 + (k + 1) * LP.sliceZ, LP.zMax);
    const zm = (sz0 + sz1) / 2;
    const ly = lotY(LP, zm);
    const lyUp = sz1 < LP.zMax ? lotY(LP, sz1 + 1) : ly;
    const depthS = sz1 - sz0;
    const flightSide = k % 2 === 0 ? 1 : -1;
    for (let s = -1; s <= 1; s += 2) {
      // 1. lots
      const top = groundAt(world, s * 23, zm);
      const inLo = s > 0 ? 16 : -30;
      const inHi = s > 0 ? 30 : -16;
      if (ly > top + 1e-6) {
        B.box('body', 'lot', inLo, top, sz0, inHi, ly, sz1 - 0.6, B.colRaw(LOT_COLOR));
      }
      B.box('body', 'lot', inLo, ly, sz0, inHi, ly + LOT_CAP, sz1, B.colRaw(HILL));
      const outLo = s > 0 ? 30 : -LOT_OUTER_X;
      const outHi = s > 0 ? LOT_OUTER_X : -30;
      const yb = Math.max(farPlaneY(sz0) - 0.5, -89);
      B.box('body', 'lot', outLo, yb, sz0, outHi, ly, sz1, B.colRaw(LOT_COLOR));
      B.box('body', 'lot', outLo, ly, sz0, outHi, ly + LOT_CAP, sz1, B.colRaw(HILL));
      // 2. steps
      if (s === flightSide && lyUp - ly > 0.01) {
        const rise = (lyUp - ly) / 10;
        const xa = s * 31;
        const xb = s * 33.4;
        for (let j = 0; j < 10; j++) {
          B.box(
            'body',
            'stair',
            Math.min(xa, xb),
            ly,
            sz1 - (10 - j) * 0.5,
            Math.max(xa, xb),
            ly + (j + 1) * rise,
            sz1,
            B.col(PAVING),
          );
        }
      }
      // 3. inner houses
      const base = ly + LOT_CAP;
      if (SCENERY_HOUSES && depthS >= 8) {
        let x = COL0_X;
        for (let c = 0; c < 2; c++) {
          if (c === 1) x += B.U(0.5, 1.5);
          const w = B.U(4.5, 6);
          if (x + w > 29.6) break;
          const d = Math.min(B.U(8, 11), depthS - 1.8);
          const lo = sz0 + 0.9 + d / 2;
          const hi = sz1 - 0.9 - d / 2;
          let zc = zm + B.U(-0.6, 0.6);
          zc = lo > hi ? zm : Math.min(hi, Math.max(lo, zc));
          const roll = B.rng();
          const n = roll < 0.2 ? 1 : roll < 0.6 ? 2 : 3;
          const hi2 = house(B, s, c, x, x + w, zc - d / 2, zc + d / 2, base, n);
          if (hi2) nearHouses.push(hi2);
          x += w;
        }
      }
      // alley tree
      if (depthS >= 10 && B.rng() < 0.45 && !pagodaBlocks(s, 30, 35, sz0, sz1)) {
        treeAt(B, s * B.U(32, 33.2), B.U(sz0 + 1.4, sz1 - 6.8), base, 'gaptree', false);
      }
      // hill trees on the lot (wooded slope between the playable houses)
      for (let t = 0; t < 3; t++) {
        if (!B.room('canopy', 2) || !B.room('trunk', 1)) break;
        const tx = s * B.U(19, 58);
        const tz = B.U(sz0 + 1.5, sz1 - 1.5);
        if (!pagodaBlocks(s, Math.abs(tx) - 2, Math.abs(tx) + 2, tz - 2, tz + 2)) {
          treeAt(B, tx, tz, base, 'tree', B.rng() < 0.35);
        }
      }
      // 4. cluster
      if (SCENERY_HOUSES && depthS >= 8 && !pagodaBlocks(s, CLUSTER_MIN_X, 59, sz0, sz1)) {
        const plan = planCluster(B.rng, s, CLUSTER_MIN_X, 59, sz0, sz1, base);
        clusters.push(plan);
        buildCluster(B, plan);
      }
    }
  }

  // prayer-flag strings between neighbouring column-0 roofs, parallel to the lane
  for (let s = -1; s <= 1; s += 2) {
    const list = nearHouses.filter((h) => h.col === 0 && h.side === s);
    for (let i = 0; i + 1 < list.length; i++) {
      if (B.rng() > 0.7) continue;
      const h0 = list[i];
      const h1 = list[i + 1];
      if (Math.abs(h0.z0 - h1.z1) > 8) continue; // only touching or near neighbours (same terrace)
      const x = h0.xFace + (s > 0 ? 0.6 : -0.6);
      const ye = Math.max(h0.roofTop, h1.roofTop) + 2.2;
      flagString(B, x, ye, h0.z1, x, ye, h1.z0);
    }
  }
  // four strings per pagoda, finial to the nearest rooftop height 10 m away diagonally
  for (let p = 0; p < built.length; p++) {
    const pg = built[p];
    for (let q = 0; q < 4; q++) {
      const ex = pg.cx + (q & 1 ? 1 : -1) * 7.07 * pg.s;
      const ez = pg.cz + (q & 2 ? 1 : -1) * 7.07 * pg.s;
      let best = Infinity;
      let top = -Infinity;
      for (let h = 0; h < nearHouses.length; h++) {
        const nh = nearHouses[h];
        const dx = nh.xFace - ex;
        const dz = (nh.z0 + nh.z1) / 2 - ez;
        const dd = dx * dx + dz * dz;
        if (dd < best) {
          best = dd;
          top = nh.roofTop + 2.2;
        }
      }
      const ye = Math.max(top, pg.plinthTop + 4);
      flagString(B, pg.fx, pg.fy, pg.fz, ex, ye, ez);
    }
  }

  // far city: pre-fogged coarse grid east/west, plus a valley band beyond the goal
  if (SCENERY_HOUSES) {
    for (let s = -1; s <= 1; s += 2) {
      if (s > 0) farCity(B, 60.6, 160, 40, -260, 12);
      else farCity(B, -160, -60.6, 40, -260, 12);
    }
    farCity(B, -160, 160, -236, -420, 12);
  }

  g.add(B.kit.finish());
  g.add(groundMesh());
  if (B.strings.length > 0) {
    const sg = new BufferGeometry();
    sg.setAttribute('position', new Float32BufferAttribute(B.strings, 3));
    const ls = new LineSegments(sg, new LineBasicMaterial({ color: new Color(STRING) }));
    ls.name = 'decor_strings';
    ls.frustumCulled = false;
    g.add(ls);
  }
  g.add(buildBirds());
  const instanced = Object.values(B.kit.meshes).filter((m) => m.count > 0).length;
  const stats: DecorStats = {
    triangles: B.kit.triangles() + 4 + 10,
    instancedMeshes: instanced,
    drawCalls: instanced + 1 + (B.strings.length > 0 ? 1 : 0) + 1,
    dropped: PIECE_IDS.reduce((n, id) => n + B.kit.dropped[id], 0),
  };
  g.userData.boxes = B.boxes;
  g.userData.stats = stats;
  g.userData.clusters = clusters;
  attachAmbient(g);
  return g;
}
