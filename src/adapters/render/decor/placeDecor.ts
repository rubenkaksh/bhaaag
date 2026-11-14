import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  LineBasicMaterial,
  LineSegments,
} from 'three';
import type { AABB } from '../../../core/math/aabb';
import type { World } from '../../../core/world';
import { attachAmbient } from './ambient';
import { buildBirds } from './birds';
import { buildGroundMesh } from './groundMesh';
import {
  DecorKit,
  RAIL_LEN,
  RAIL_POST_H,
  PIECE_IDS,
  ROOF_UNIT_H,
  ROOF_UNIT_W,
  TANK_UNIT_H,
  mulberry32,
} from './kit';
import type { PieceId } from './kit';
import {
  HILL_HALF_X,
  TERRAIN_HALF_X,
  TERRAIN_Z_MAX,
  TERRAIN_Z_MIN,
  planeY,
  terrainY,
} from '../terrain';

// Scenery for the one-hill level (docs/level-layout.md, redesign 2026-11-10): dressing for the ten
// houses, a wooded hillside (instanced trees on the flanks), prayer-flag strings. The hillside
// itself is groundMesh.ts over terrain.ts. Pure given (world, seed). No side village, no plots.

/** Half width of the reserved corridor around the fall line: only low trees (<= 6 m) may stand in it. */
export const LANE_HALF_X = 4.5;
const STOREY = 2.8;
const MARGIN = 0.5; // collider clearance

const BRICK = ['#9c5640', '#8c4a38', '#a8634a'];
const WOOD = ['#4a2c1c', '#5a3622'];
const CONCRETE = '#a99a88';
const TANKS = ['#26282c', '#2e6b47'];
const SHUTTERS = ['#4a2c1c', '#5a3622', '#7c3e2e', '#2e6b47'];
const STONE = '#8e8574';
const PLASTER = [
  '#d9c6aa',
  '#cfb99a',
  '#e0cfb4',
  '#e6d9c0',
  '#d8b98e',
  '#c9a27a',
  '#e3c9b0',
  '#b9c4a0',
  '#d4a89a',
  '#c8c0a8',
];
const BROADLEAF = ['#46683a', '#587a3a', '#3f5e34', '#6a8a3e'];
const CONIFERS = ['#2f4a2f', '#35553a', '#2a4430', '#3b5a36'];
const TRUNK = '#4a3424';
const WIN_D = 0.118; // window depth unit: sticks out 1.6 x this = 0.19 m
// Laundry lines: muted cloth tones only, so gold/cream/terracotta keep their meaning.
const LAUNDRY = ['#6b8fb5', '#8fae8a', '#a98fb8', '#7aa3a0'];
export const FLAGS = ['#2f62b8', '#f2efe4', '#c8322f', '#2f8a4f', '#d0a12e'];
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

/** Ground height under (x, z): the collider plane inside |x| <= 34, the foothills outside. */
export function groundAt(_world: World, x: number, z: number): number {
  return terrainY(x, z);
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
  const m = MARGIN;
  for (let i = 0; i < world.solids.length; i++) {
    const s = world.solids[i];
    if (b.max[0] <= s.min.x - m || b.min[0] >= s.max.x + m) continue;
    if (b.max[2] <= s.min.z - m || b.min[2] >= s.max.z + m) continue;
    if (b.min[1] >= s.max.y - 1e-3) continue;
    if (b.max[1] <= s.min.y - m || b.min[1] >= s.max.y + m) continue;
    return true;
  }
  // pitched roofs (ADR 0002) are ramps, not solids: keep decor out of their bounding prism
  for (let i = 0; i < world.roofs.length; i++) {
    const r = world.roofs[i].aabb;
    if (b.max[0] <= r.min.x - m || b.min[0] >= r.max.x + m) continue;
    if (b.max[2] <= r.min.z - m || b.min[2] >= r.max.z + m) continue;
    if (b.max[1] <= r.min.y - m || b.min[1] >= r.max.y + m) continue;
    return true;
  }
  return false;
}

/** Lane rule: inside |x| < 4.5 along the route only trees up to 6 m above the ground may stand. */
export function violatesLane(world: World, b: DecorBox): boolean {
  const lane = laneZRange(world);
  if (b.max[2] <= lane.zMin || b.min[2] >= lane.zMax) return false;
  if (b.min[0] >= LANE_HALF_X || b.max[0] <= -LANE_HALF_X) return false;
  if (b.kind !== 'tree') return true;
  const cx = (b.min[0] + b.max[0]) / 2;
  const cz = (b.min[2] + b.max[2]) / 2;
  return b.max[1] > groundAt(world, cx, cz) + 6 + 1e-6;
}

class Builder {
  kit: DecorKit;
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
    houses = 0,
  ) {
    this.kit = new DecorKit(houses);
  }

  /** True when `n` more instances of `piece` still fit under its cap, with the budget test's 90 % margin. */
  room(piece: PieceId, n: number): boolean {
    return this.kit.used[piece] + n <= 0.9 * this.kit.cap[piece];
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

  conifer(kind: string, cx: number, y0: number, cz: number, r: number, h: number, c: Color): void {
    const ok = this.kit.add('conifer', cx, y0, cz, r, h, r, 0, c);
    if (ok) this.rec(kind, [cx - r, y0, cz - r], [cx + r, y0 + h, cz + r]);
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
interface Body {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  yBase: number; // wall bottom (the hill at its downhill edge)
  yE: number; // eaves: roof underside
  top: number; // roof top
  decoy: boolean;
}

/** The style-1 wall carrying roof r (xz overlap >= 50 % of the roof, top within 0.1 m of its underside). */
function wallUnder(w: World, r: AABB): AABB | null {
  const area = (r.max.x - r.min.x) * (r.max.z - r.min.z);
  for (let j = 0; j < w.solids.length; j++) {
    if ((j < w.style.length ? w.style[j] : 1) !== 1) continue;
    const c = w.solids[j];
    if (Math.abs(c.max.y - r.min.y) > 0.1) continue;
    const ox = Math.min(r.max.x, c.max.x) - Math.max(r.min.x, c.min.x);
    const oz = Math.min(r.max.z, c.max.z) - Math.max(r.min.z, c.min.z);
    if (ox > 0 && oz > 0 && ox * oz >= 0.5 * area) return c;
  }
  return null;
}

/** The ten houses: route houses (style-2 roof over a style-1 wall) and danger decoys (style 3). */
function collectBodies(w: World): Body[] {
  const out: Body[] = [];
  for (let i = 1; i < w.solids.length; i++) {
    const st = i < w.style.length ? w.style[i] : 1;
    const r = w.solids[i];
    if (st === 2 && r.max.x - r.min.x >= 6) {
      const body = wallUnder(w, r);
      if (body === null) continue;
      out.push({
        x0: r.min.x,
        x1: r.max.x,
        z0: r.min.z,
        z1: r.max.z,
        yBase: body.min.y,
        yE: r.min.y,
        top: r.max.y,
        decoy: false,
      });
    } else if (st === 3 && r.max.y - r.min.y > 5) {
      out.push({
        x0: r.min.x,
        x1: r.max.x,
        z0: r.min.z,
        z1: r.max.z,
        yBase: r.min.y,
        yE: r.max.y,
        top: r.max.y,
        decoy: true,
      });
    }
  }
  out.sort((a, b) => b.z1 - a.z1);
  return out;
}

// Ground height used by house dressing. buildDecor swaps it to the flat plane when scenery is off
// (the chase mode draws its own endless ground), then restores the hillside.
let groundY: (x: number, z: number) => number = terrainY;
// Cloud Village: houses float, so foot props stand on the house base, not on the far cloud sea.
let housesFloat = false;

/** Lowest visible wall height at a point just outside a face: the ground, or a neighbour's roof. */
function visLow(bodies: Body[], x: number, z: number): number {
  let y = groundY(x, z);
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    if (x > b.x0 && x < b.x1 && z > b.z0 && z < b.z1 && b.top > y) y = b.top;
  }
  return y;
}

function flagString(B: Builder, a: number[], b: number[], laundry: boolean): void {
  const len = Math.sqrt((b[0] - a[0]) ** 2 + (b[2] - a[2]) ** 2);
  const sag = (laundry ? 0.05 : 0.08) * len;
  const palette = laundry ? LAUNDRY : FLAGS;
  const N = 12;
  const rotY = Math.atan2(-(b[2] - a[2]), b[0] - a[0]);
  let px = a[0];
  let py = a[1];
  let pz = a[2];
  for (let k = 1; k <= N; k++) {
    const u = k / N;
    const sx = a[0] + (b[0] - a[0]) * u;
    const sy = a[1] + (b[1] - a[1]) * u - sag * 4 * u * (1 - u);
    const sz = a[2] + (b[2] - a[2]) * u;
    B.strings.push(px, py, pz, sx, sy, sz);
    px = sx;
    py = sy;
    pz = sz;
  }
  const world = B.world;
  for (let k = 0; k < N; k++) {
    const u = (k + 0.5) / N;
    const fx = a[0] + (b[0] - a[0]) * u;
    const fy = a[1] + (b[1] - a[1]) * u - sag * 4 * u * (1 - u) - 0.2;
    const fz = a[2] + (b[2] - a[2]) * u;
    let near = false;
    for (let i = 0; i < world.anchors.length; i++) {
      const an = world.anchors[i];
      const dx = an.px - fx;
      const dy = an.py - fy;
      const dz = an.pz - fz;
      if (dx * dx + dy * dy + dz * dz < 9) near = true;
    }
    if (!near) B.flag(fx, fy, fz, B.colRaw(palette[k % palette.length]), rotY + (k % 2) * Math.PI);
  }
}

const MAST_H = 1.5;

/** Detail for the ten houses; every box is tagged `house` and bypasses the lane rule. */
function dressHouses(B: Builder, bodies: Body[]): void {
  const w = B.world;
  B.onHouse = true;
  const faces: ('x-' | 'x+' | 'z+' | 'z-')[] = ['x-', 'x+', 'z+', 'z-'];
  const nrm = { 'x-': [-1, 0], 'x+': [1, 0], 'z+': [0, 1], 'z-': [0, -1] };
  for (let n = 0; n < bodies.length; n++) {
    const h = bodies[n];
    const { x0, x1, z0, z1, yBase, yE } = h;
    const cxh = (x0 + x1) / 2;
    const czh = (z0 + z1) / 2;
    // an attached neighbour downhill hides this house's downhill skin from its roof down
    const abutsDown = bodies.some(
      (o) => o !== h && Math.abs(o.z1 - z0) < 0.05 && o.x0 < x1 && o.x1 > x0,
    );
    const zA = abutsDown ? z0 : z0 - 0.05;

    if (!h.decoy) {
      // brick plinth up to the first floor, lime/plaster skin above it, wood cornices
      const hB = Math.min(1.5, yE - yBase - 4);
      B.box(
        'wallBrick',
        'base',
        x0 - 0.08,
        yBase,
        abutsDown ? z0 : z0 - 0.08,
        x1 + 0.08,
        yBase + hB,
        z1 + 0.08,
        B.col(BRICK[n % 3]),
      );
      B.box(
        'wallPlaster',
        'plaster',
        x0 - 0.05,
        yBase + hB,
        zA,
        x1 + 0.05,
        yE - 0.35,
        z1 + 0.05,
        B.col(PLASTER[(n * 3 + 1) % PLASTER.length]),
      );
      B.box(
        'cornice',
        'cornice',
        x0 - 0.12,
        yBase + hB - 0.05,
        abutsDown ? z0 : z0 - 0.12,
        x1 + 0.12,
        yBase + hB + 0.2,
        z1 + 0.12,
        B.colRaw(WOOD[1]),
      );
      B.box(
        'cornice',
        'cornice',
        x0 - 0.25,
        yE - 0.35,
        abutsDown ? z0 : z0 - 0.25,
        x1 + 0.25,
        yE,
        z1 + 0.25,
        B.colRaw(WOOD[0]),
      );
    }

    // windows (and doors on exposed downhill faces)
    for (let f = 0; f < 4; f++) {
      const face = faces[f];
      const [nx, nz] = nrm[face];
      const alongX = face === 'z+' || face === 'z-';
      const span = alongX ? x1 - x0 : z1 - z0;
      const k = Math.floor(span / 2.8);
      const at = (u: number): [number, number] => [
        face === 'x-' ? x0 : face === 'x+' ? x1 : x0 + u,
        face === 'z+' ? z1 : face === 'z-' ? z0 : z0 + u,
      ];
      for (let st = 0; st < 3; st++) {
        const wy = yBase + st * STOREY + 1.0;
        if (wy + 1.3 > yE - 0.45) continue;
        for (let j = 0; j < k; j++) {
          const [wx, wz] = at((span * (j + 0.5)) / k);
          let low = -Infinity;
          for (let t = -1; t <= 1; t++) {
            const px = wx + nx * 0.35 + (alongX ? t * 0.5 : 0);
            const pz = wz + nz * 0.35 + (alongX ? 0 : t * 0.5);
            low = Math.max(low, visLow(bodies, px, pz));
          }
          if (wy < low + 0.3) continue;
          B.facing('window', 'window', face, wx, wy, wz, 0.9, 1.3, WIN_D, B.colRaw(B.pick(WOOD)));
          if (!h.decoy && B.room('trim', 2)) {
            // lintel and sill: readable frames around the lane-side windows (hidden on Low)
            const hw = alongX ? 0.62 : 0.1;
            const hd = alongX ? 0.1 : 0.62;
            const tc = B.colRaw(WOOD[1]);
            const ox = nx * 0.14;
            const oz = nz * 0.14;
            B.box(
              'trim',
              'trim',
              wx - hw + ox,
              wy + 1.3,
              wz - hd + oz,
              wx + hw + ox,
              wy + 1.46,
              wz + hd + oz,
              tc,
            );
            B.box(
              'trim',
              'trim',
              wx - hw + ox,
              wy - 0.16,
              wz - hd + oz,
              wx + hw + ox,
              wy - 0.04,
              wz + hd + oz,
              tc,
            );
          }
          if (!h.decoy && B.fx() < 0.35) {
            B.facing('shutter', 'shutter', face, wx, wy, wz, 1, 1, 1, B.colRaw(B.pick(SHUTTERS)));
          }
        }
      }
      if (face === 'z-' && visLow(bodies, cxh, z0 - 0.35) <= yBase + 0.2) {
        // plank door with a stone step, flanked by pots
        B.box(
          'body',
          'door',
          cxh - 0.55,
          yBase,
          z0 - 0.1,
          cxh + 0.55,
          yBase + 2.1,
          z0,
          B.colRaw(WOOD[0]),
        );
        B.box(
          'body',
          'step',
          cxh - 0.9,
          yBase,
          z0 - 0.45,
          cxh + 0.9,
          yBase + 0.16,
          z0 - 0.1,
          B.colRaw(STONE),
        );
        if (!h.decoy && B.room('trim', 3)) {
          const tc = B.colRaw(WOOD[1]);
          B.box('trim', 'trim', cxh - 0.7, yBase, z0 - 0.2, cxh - 0.55, yBase + 2.3, z0, tc);
          B.box('trim', 'trim', cxh + 0.55, yBase, z0 - 0.2, cxh + 0.7, yBase + 2.3, z0, tc);
          B.box('trim', 'trim', cxh - 0.7, yBase + 2.1, z0 - 0.2, cxh + 0.7, yBase + 2.3, z0, tc);
        }
        if (!h.decoy && B.room('pot', 2)) {
          B.pot(cxh - 1.5, housesFloat ? yBase : groundY(cxh - 1.5, z0 - 0.5), z0 - 0.5);
          B.pot(cxh + 1.5, housesFloat ? yBase : groundY(cxh + 1.5, z0 - 0.5), z0 - 0.5);
        }
      }
      if (!h.decoy) {
        // eave brackets under the roof edge
        const bn = Math.max(2, Math.floor(span / 2.6));
        if (B.room('bracket', bn)) {
          for (let j = 0; j < bn; j++) {
            const [bx, bz] = at((span * (j + 0.5)) / bn);
            if (visLow(bodies, bx + nrm[face][0] * 0.3, bz + nrm[face][1] * 0.3) > yE - 1) continue;
            B.facing('bracket', 'bracket', face, bx, yE - 0.55, bz, 1, 1, 1, B.colRaw(WOOD[1]));
          }
        }
      }
    }
    if (h.decoy) continue;

    // balcony ledges on a side wall (level style-1 slabs): rail, pots, underside brackets
    for (let j = 1; j < w.solids.length; j++) {
      if ((j < w.style.length ? w.style[j] : 1) !== 1) continue;
      const p = w.solids[j];
      if (p.max.y - p.min.y > 0.5 || p.max.y > h.top - 1 || p.max.y < yE - 6) continue;
      if (p.min.z < z0 - 1e-3 || p.max.z > z1 + 1e-3) continue;
      const dir = Math.abs(p.min.x - x1) < 1e-3 ? 1 : Math.abs(p.max.x - x0) < 1e-3 ? -1 : 0;
      if (dir === 0) continue;
      const ledgeTop = p.max.y;
      const outX = dir > 0 ? p.max.x - 0.08 : p.min.x + 0.08;
      const len = p.max.z - p.min.z;
      const m = Math.ceil(len / RAIL_LEN);
      if (B.room('rail', m + 2)) {
        for (let q = 0; q < m; q++) {
          B.rail(outX, ledgeTop, p.min.z + (len / m) * (q + 0.5), len / m, true, B.colRaw(WOOD[0]));
        }
        B.rail(
          (p.min.x + p.max.x) / 2,
          ledgeTop,
          p.min.z + 0.05,
          p.max.x - p.min.x,
          false,
          B.colRaw(WOOD[0]),
        );
        B.rail(
          (p.min.x + p.max.x) / 2,
          ledgeTop,
          p.max.z - 0.05,
          p.max.x - p.min.x,
          false,
          B.colRaw(WOOD[0]),
        );
      }
      B.pot((p.min.x + p.max.x) / 2, ledgeTop, czh - 1.2);
      B.pot((p.min.x + p.max.x) / 2, ledgeTop, czh + 1.2);
      for (let q = 0; q < 3; q++) {
        B.facing(
          'bracket',
          'bracket',
          dir > 0 ? 'x+' : 'x-',
          dir > 0 ? x1 : x0,
          ledgeTop - 0.8,
          p.min.z + (len * (q + 0.5)) / 3,
          1,
          1,
          1,
          B.colRaw(WOOD[1]),
        );
      }
    }

    // roof rim: timber rail on each parapet curb (style 4), a tank on the plinth, planter and pots
    const top = h.top;
    B.box('parapet', 'parapet', x0, top, z1 - 0.2, x1, top + 0.2, z1, B.colRaw(CONCRETE));
    let tankX = x0 + 1.1;
    let tankZ = czh - 0.8;
    let tankY = top;
    if (B.room('rail', 40)) {
      for (let j = 0; j < w.solids.length; j++) {
        const p = w.solids[j];
        if ((j < w.style.length ? w.style[j] : 1) !== 4) continue;
        if (Math.abs(p.min.y - top) > 1e-3) continue;
        if (
          p.min.x < x0 - 1e-3 ||
          p.max.x > x1 + 1e-3 ||
          p.min.z < z0 - 1e-3 ||
          p.max.z > z1 + 1e-3
        )
          continue;
        if (p.max.y - p.min.y > 0.5) {
          tankX = (p.min.x + p.max.x) / 2;
          tankZ = (p.min.z + p.max.z) / 2;
          tankY = p.max.y;
        } else if (p.max.z - p.min.z > p.max.x - p.min.x) {
          const xr = (p.min.x + p.max.x) / 2;
          const nn = Math.max(1, Math.ceil((p.max.z - p.min.z) / RAIL_LEN));
          for (let q = 0; q < nn; q++) {
            B.rail(
              xr,
              top + 0.4,
              p.min.z + ((p.max.z - p.min.z) * (q + 0.5)) / nn,
              (p.max.z - p.min.z) / nn,
              true,
              B.colRaw(WOOD[0]),
            );
          }
        }
      }
    }
    // Roof props never sit on a gold line pad, trampoline or cushion: those colours must read.
    const free = (px: number, pz: number, r: number): boolean => {
      const pads: AABB[] = [...w.tramps, ...w.cushions];
      for (let q = 0; q < w.lines.length; q++) pads.push(w.lines[q].zone);
      for (const a of pads) {
        if (px > a.min.x - r && px < a.max.x + r && pz > a.min.z - r && pz < a.max.z + r)
          return false;
      }
      return true;
    };
    if (free(tankX, tankZ, 0.7))
      B.tank(tankX, tankY, tankZ, 0.5, TANK_UNIT_H * 0.8, B.colRaw(B.pick(TANKS)));
    if (free(tankX, czh + 1.6, 0.7) && B.room('planter', 1)) B.planter(tankX, top, czh + 1.6);
    if (free(tankX, z1 - 0.8, 0.4)) B.pot(tankX, top, z1 - 0.8);
  }
  B.onHouse = false;
}

/** Prayer-flag strings along attached rows and across the open hillside between rows, laundry lines. */
function stringHouses(B: Builder, bodies: Body[]): void {
  const houses = bodies.filter((b) => !b.decoy);
  B.onHouse = true;
  const masts = new Map<string, number[]>();
  const mast = (h: Body, s: number, z: number, key: string): number[] => {
    const id = `${key}:${s}:${z.toFixed(2)}`;
    const got = masts.get(id);
    if (got !== undefined) return got;
    const x = s * ((h.x1 - h.x0) / 2 - 0.15) + (h.x0 + h.x1) / 2;
    B.trunk('mast', x, h.top + 0.4, z, MAST_H, B.colRaw(WOOD[0]));
    const tip = [x, h.top + 0.4 + MAST_H, z];
    masts.set(id, tip);
    return tip;
  };
  for (let i = 0; i + 1 < houses.length; i++) {
    const a = houses[i];
    const b = houses[i + 1];
    const attached = Math.abs(b.z1 - a.z0) < 0.05;
    const s = i % 2 === 0 ? 1 : -1;
    if (!B.room('flag', 12)) break;
    flagString(
      B,
      mast(a, s, (a.z0 + a.z1) / 2, 'h' + i),
      mast(b, s, (b.z0 + b.z1) / 2, 'h' + (i + 1)),
      false,
    );
    if (!attached) {
      // a second string across the gap on the other side
      flagString(
        B,
        mast(a, -s, (a.z0 + a.z1) / 2, 'h' + i),
        mast(b, -s, (b.z0 + b.z1) / 2, 'h' + (i + 1)),
        false,
      );
    }
  }
  // laundry on the side away from the balcony, along the roof edge
  for (let i = 1; i < houses.length; i += 2) {
    const h = houses[i];
    if (!B.room('flag', 12)) break;
    const s = i % 4 === 1 ? -1 : 1;
    flagString(B, mast(h, s, h.z0 + 1.0, 'l' + i), mast(h, s, h.z1 - 1.0, 'l' + i), true);
  }
  B.onHouse = false;
}

function inAnyBody(bodies: Body[], x: number, z: number, pad: number): boolean {
  for (let i = 0; i < bodies.length; i++) {
    const b = bodies[i];
    if (x > b.x0 - pad && x < b.x1 + pad && z > b.z0 - pad && z < b.z1 + pad) return true;
  }
  return false;
}

interface ForestTree {
  x: number;
  z: number;
  r: number;
  con: boolean;
  tint: number;
  pick: number;
}

/** Adds one broadleaf tree (trunk + canopy) if it fits; returns whether it was placed. */
function broadleaf(
  B: Builder,
  cx: number,
  cz: number,
  r: number,
  kind: string,
  tint: number,
  pick: number,
): boolean {
  const base = terrainY(cx, cz);
  const trunkH = 2.0 + 0.4 * r;
  const cy = base + trunkH + r * 0.6;
  if (!B.room('canopy', 1) || !B.room('trunk', 1)) return false;
  if (!B.allowed(kind, [cx - r, base, cz - r], [cx + r, cy + r, cz + r])) return false;
  B.trunk(kind, cx, base - 0.3, cz, trunkH + 0.3, B.colRaw(TRUNK));
  B.canopy(kind, cx, cy, cz, r, B.col(BROADLEAF[pick]).multiplyScalar(tint));
  return true;
}

function pine(
  B: Builder,
  cx: number,
  cz: number,
  r: number,
  kind: string,
  tint: number,
  pick: number,
): boolean {
  const base = terrainY(cx, cz);
  const h = r * 3.4;
  if (!B.room('conifer', 1)) return false;
  if (!B.allowed(kind, [cx - r, base, cz - r], [cx + r, base + h, cz + r])) return false;
  B.conifer(kind, cx, base - 0.4, cz, r, h, B.col(CONIFERS[pick]).multiplyScalar(tint));
  return true;
}

/** Trees and shrubs on the hill itself: sparse, beside the lane and the houses, never on a collider. */
function hillTrees(B: Builder, bodies: Body[], seed: number): void {
  const fr = mulberry32(seed ^ 0x7ee5);
  const pitch = 11;
  for (let s = -1; s <= 1; s += 2) {
    for (let z = 24; z > -104; z -= pitch) {
      for (let x = 7; x < HILL_HALF_X - 3; x += pitch) {
        const tx = s * (x + (fr() - 0.5) * 6);
        const tz = z + (fr() - 0.5) * 7;
        const r = 1.3 + 0.9 * fr();
        const pick = Math.floor(fr() * BROADLEAF.length);
        const tint = 0.95 + 0.1 * fr();
        const roll = fr();
        if (roll < 0.35) continue;
        if (inAnyBody(bodies, tx, tz, 3.5 + r)) continue;
        if (Math.abs(tx) > HILL_HALF_X - 2.5 - r) continue;
        if (roll < 0.55) pine(B, tx, tz, r * 0.9, 'tree', tint, pick);
        else if (roll < 0.9) broadleaf(B, tx, tz, r, 'tree', tint, pick);
        else {
          // shrub
          const sr = 0.6 + 0.4 * fr();
          const gy = terrainY(tx, tz);
          if (
            B.allowed('tree', [tx - sr, gy, tz - sr], [tx + sr, gy + sr * 1.6, tz + sr]) &&
            B.room('canopy', 1)
          ) {
            B.canopy('tree', tx, gy + sr * 0.7, tz, sr, B.col(BROADLEAF[pick]));
          }
        }
      }
    }
  }
}

/** Dry-stone field walls along the contours of the foothills (visual only). */
function fieldWalls(B: Builder, seed: number): void {
  const fr = mulberry32(seed ^ 0x57a9);
  for (let s = -1; s <= 1; s += 2) {
    for (let z = 80; z > -300; z -= 17) {
      const xa = 40 + 26 * fr();
      const len = 6 + 8 * fr();
      if (fr() < 0.35) continue;
      if (!B.room('body', 1)) return;
      const x0 = s > 0 ? xa : -xa - len;
      const x1 = x0 + len;
      let lo = Infinity;
      let hi = -Infinity;
      for (let t = 0; t <= 4; t++) {
        const g = terrainY(x0 + (len * t) / 4, z);
        lo = Math.min(lo, g);
        hi = Math.max(hi, g);
      }
      if (!B.allowed('terrace', [x0, lo - 0.3, z - 0.3], [x1, hi + 0.9, z + 0.3])) continue;
      B.box('body', 'terrace', x0, lo - 0.3, z - 0.3, x1, hi + 0.8, z + 0.3, B.col(STONE));
    }
  }
}

/** The wooded foothills: broadleaf low, conifers higher, thinning with distance. Shuffled for tier thinning. */
function forest(B: Builder, bodies: Body[], seed: number): number[] {
  const fr = mulberry32(seed ^ 0xf0e57);
  const list: ForestTree[] = [];
  for (let s = -1; s <= 1; s += 2) {
    for (let z = TERRAIN_Z_MAX - 6; z > TERRAIN_Z_MIN + 6; z -= 9) {
      for (let x = 37; x < TERRAIN_HALF_X - 6;) {
        const pitch = x < 110 ? 9 : x < 190 ? 13 : 20;
        const tx = s * (x + (fr() - 0.5) * pitch * 0.8);
        const tz = z + (fr() - 0.5) * 7;
        const rr = fr();
        const rt = fr();
        const rp = fr();
        const rc = fr();
        x += pitch;
        const ax = Math.abs(tx);
        const dens = 0.78 - 0.5 * Math.min(1, (ax - 37) / 280);
        // the valley floor below the last house stays an open meadow beside the stream
        if (tz < -140 && ax < 90 && rt < 0.55) continue;
        if (rt > dens) continue;
        const up = terrainY(tx, tz) - planeY(tz);
        const scale = ax > 110 ? 1.45 : 1;
        const con = up > 50 || (up > 22 && rc < (up - 22) / 28);
        list.push({
          x: tx,
          z: tz,
          r: (con ? 1.7 + 0.8 * rr : 2.3 + 1.1 * rr) * scale,
          con,
          tint: 0.94 + 0.12 * rp,
          pick: Math.floor(rc * 4) % 4,
        });
      }
    }
  }
  // the shoulder behind the spawn and the valley sides inside the collider width
  for (let i = 0; i < 60; i++) {
    const side = i % 2 === 0 ? 1 : -1;
    const tx = side * (8 + 26 * fr());
    const tz = fr() < 0.5 ? 30 + 80 * fr() : -112 - 120 * fr();
    if (inAnyBody(bodies, tx, tz, 4)) continue;
    list.push({
      x: tx,
      z: tz,
      r: 1.6 + 1.2 * fr(),
      con: fr() < 0.4,
      tint: 0.95 + 0.1 * fr(),
      pick: Math.floor(fr() * 4),
    });
  }
  // Fisher-Yates so a prefix of the list is a uniform thinning of the whole forest
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(fr() * (i + 1));
    const t = list[i];
    list[i] = list[j];
    list[j] = t;
  }
  const base: Record<string, number> = {
    canopy: B.kit.used.canopy,
    trunk: B.kit.used.trunk,
    conifer: B.kit.used.conifer,
  };
  for (let i = 0; i < list.length; i++) {
    const t = list[i];
    if (t.con) pine(B, t.x, t.z, t.r, 'tree', t.tint, t.pick);
    else broadleaf(B, t.x, t.z, t.r, 'tree', t.tint, t.pick);
  }
  return [base.canopy, base.trunk, base.conifer];
}

export type DecorOpts = {
  scenery?: boolean;
  /** Flat floor height for house dressing when scenery is off (Cloud Village: the cloud top). */
  floorY?: number;
  /** Dress house walls (decor, laundry, flags, strings). Default true; the strategy maze turns it off. */
  houseDress?: boolean;
};

/** Builds the non-collider scenery. Deterministic for a given (world, seed). */
export function buildDecor(world: World, seed = 1729, opts: DecorOpts = {}): Group {
  const scenery = opts.scenery !== false;
  const houseDress = opts.houseDress !== false;
  const bodies = collectBodies(world);
  const B = new Builder(world, mulberry32(seed), bodies.length);
  const g = new Group();
  g.name = 'decor';

  let base: number[];
  const flat = opts.floorY;
  housesFloat = flat !== undefined && !scenery;
  groundY = scenery ? terrainY : flat !== undefined ? () => flat : (_x, z) => planeY(z);
  try {
    if (houseDress) {
      dressHouses(B, bodies);
      stringHouses(B, bodies);
    }
    if (scenery) {
      hillTrees(B, bodies, seed);
      fieldWalls(B, seed);
      base = forest(B, bodies, seed);
    } else {
      base = [B.kit.used.canopy, B.kit.used.trunk, B.kit.used.conifer];
    }
  } finally {
    groundY = terrainY;
  }

  g.add(B.kit.finish());
  const ground = scenery ? buildGroundMesh() : null;
  if (ground !== null) g.add(ground);
  if (B.strings.length > 0) {
    const sg = new BufferGeometry();
    sg.setAttribute('position', new Float32BufferAttribute(B.strings, 3));
    const ls = new LineSegments(sg, new LineBasicMaterial({ color: new Color(STRING) }));
    ls.name = 'decor_strings';
    ls.frustumCulled = false;
    g.add(ls);
  }
  if (scenery) g.add(buildBirds());
  const instanced = Object.values(B.kit.meshes).filter((m) => m.count > 0).length;
  const groundTris =
    ground !== null && ground.geometry.index !== null ? ground.geometry.index.count / 3 : 0;
  const stats: DecorStats = {
    triangles: B.kit.triangles() + groundTris + 10,
    instancedMeshes: instanced,
    drawCalls: instanced + 1 + (B.strings.length > 0 ? 1 : 0) + 1,
    dropped: PIECE_IDS.reduce((n, id) => n + B.kit.dropped[id], 0),
  };
  // Tier thinning: the forest part of each tree mesh is a shuffled suffix; keep a fraction of it.
  const used = { canopy: B.kit.used.canopy, trunk: B.kit.used.trunk, conifer: B.kit.used.conifer };
  const pieces: ('canopy' | 'trunk' | 'conifer')[] = ['canopy', 'trunk', 'conifer'];
  g.userData.setForestDensity = (f: number): void => {
    for (let i = 0; i < pieces.length; i++) {
      const id = pieces[i];
      B.kit.meshes[id].count =
        base[i] + Math.floor((used[id] - base[i]) * Math.min(1, Math.max(0, f)));
    }
  };
  g.userData.boxes = B.boxes;
  g.userData.stats = stats;
  attachAmbient(g);
  return g;
}
