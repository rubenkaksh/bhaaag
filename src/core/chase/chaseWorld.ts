// Fixed-capacity endless world: a ring of row slots rewritten in place. Ids never change; unused
// entries are parked (collapsed boxes far below, anchors beyond rope reach). Pure, no three/DOM.
import { AABB } from '../math/aabb';
import { Vec3 } from '../math/vec3';
import type { Tuning } from '../config';
import { RIDGE_Z, World, addRoof, addSolid, addRamp, addAnchor } from '../world';
import {
  GRADE,
  HILL_HALF_X,
  HILL_Z_MAX,
  RowBoxes,
  RowSpec,
  ROW0_ZTOP,
  SLOT_ANCHORS,
  SLOT_PADS,
  SLOT_SOLIDS,
  STYLE_HIDDEN,
  hillY,
  nextZTop,
  rowBoxes,
  rowSpecInto,
  difficultyFor,
  WALL_T,
} from './rows';

export const PARK_Y = -1e4;
export const HILL_Z_MIN = -60000; // the ramp ends here (nothing reaches it)
export const FIXED_SOLIDS = 3; // back wall and two fixed side walls (behind row 0)

export class ChaseWorld {
  world: World;
  seed = 0;
  slots = 6;
  slotRow: Int32Array;
  slotZTop: Float64Array;
  spec: RowSpec[];
  /** Bumped every time a slot is rewritten; the render side rebuilds when `epoch` changes. */
  version: Int32Array;
  epoch = 0;
  oldest = 0; // oldest live row
  newest = 0; // newest live row
  scratch = new RowBoxes();
  /** Difficulty [0,1] applied to rows written from now on (set from the dragon speed). */
  difficulty = 0;
  /** Test hook: when >= 0, chaseStep uses it instead of the dragon-speed difficulty. */
  forceDifficulty = -1;
  cfg: Tuning['chase'] | null = null;

  constructor(world: World, slots: number) {
    this.world = world;
    this.slots = slots;
    this.slotRow = new Int32Array(slots).fill(-1);
    this.slotZTop = new Float64Array(slots);
    this.spec = [];
    for (let i = 0; i < slots; i++) this.spec.push(new RowSpec());
    this.version = new Int32Array(slots);
  }
}

export function slotOf(cw: ChaseWorld, row: number): number {
  return row % cw.slots;
}
export function solidBase(slot: number): number {
  return FIXED_SOLIDS + slot * SLOT_SOLIDS;
}
export function padBase(slot: number): number {
  return slot * SLOT_PADS;
}
export function anchorBase(slot: number): number {
  return slot * SLOT_ANCHORS;
}
export function routeAnchorId(slot: number): number {
  return slot * SLOT_ANCHORS;
}
export function rampBase(slot: number): number {
  return 1 + slot * 2; // ramp 0 is the hill
}

function setBox(b: AABB, x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): void {
  b.min.x = x0;
  b.min.y = y0;
  b.min.z = z0;
  b.max.x = x1;
  b.max.y = y1;
  b.max.z = z1;
}
function parkBox(b: AABB): void {
  setBox(b, 0, PARK_Y, 0, 0, PARK_Y, 0);
}

function box(x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB {
  return new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));
}

/** Writes row `row` into its slot (in place) and bumps the slot version. */
export function writeRow(cw: ChaseWorld, row: number, zTop: number): void {
  const slot = slotOf(cw, row);
  const w = cw.world;
  const spec = cw.spec[slot];
  if (cw.cfg === null) rowSpecInto(cw.seed, row, spec, cw.difficulty);
  else rowSpecInto(cw.seed, row, spec, cw.difficulty, cw.cfg);
  const o = cw.scratch;
  rowBoxes(spec, zTop, row > 0, o);
  cw.slotRow[slot] = row;
  cw.slotZTop[slot] = zTop;
  const sb = solidBase(slot);
  for (let i = 0; i < SLOT_SOLIDS; i++) {
    const b = w.solids[sb + i];
    if (o.solidUsed[i] === 1) {
      const j = i * 6;
      setBox(b, o.solid[j], o.solid[j + 1], o.solid[j + 2], o.solid[j + 3], o.solid[j + 4], o.solid[j + 5]);
    } else {
      parkBox(b);
    }
    w.style[sb + i] = o.style[i];
  }
  const pb = padBase(slot);
  for (let i = 0; i < SLOT_PADS; i++) {
    const b = w.pads[pb + i];
    if (o.padUsed[i] === 1) {
      const j = i * 6;
      setBox(b, o.pad[j], o.pad[j + 1], o.pad[j + 2], o.pad[j + 3], o.pad[j + 4], o.pad[j + 5]);
    } else {
      parkBox(b);
    }
  }
  const ab = anchorBase(slot);
  for (let i = 0; i < SLOT_ANCHORS; i++) {
    const a = w.anchors[ab + i];
    if (o.anchorUsed[i] === 1) {
      a.px = o.anchor[i * 3];
      a.py = o.anchor[i * 3 + 1];
      a.pz = o.anchor[i * 3 + 2];
    } else {
      a.px = 0;
      a.py = PARK_Y;
      a.pz = 0;
    }
  }
  const rb = rampBase(slot);
  const roof = w.roofs[slot];
  const ra = w.ramps[rb];
  const rbb = w.ramps[rb + 1];
  if (o.roofUsed === 1) {
    const x0 = o.roof[0];
    const y0 = o.roof[1];
    const z0 = o.roof[2];
    const x1 = o.roof[3];
    const y1 = o.roof[4];
    const z1 = o.roof[5];
    const cx = (x0 + x1) * 0.5;
    setBox(roof.aabb, x0, y0, z0, x1, y1, z1);
    setBox(ra.aabb, x0, y0, z0, cx, y1, z1);
    setBox(rbb.aabb, cx, y0, z0, x1, y1, z1);
    ra.rise = y1 - y0;
    rbb.rise = y1 - y0;
  } else {
    parkBox(roof.aabb);
    parkBox(ra.aabb);
    parkBox(rbb.aabb);
    ra.rise = 0;
    rbb.rise = 0;
  }
  cw.version[slot]++;
  cw.epoch++;
}

/** Route anchor ids of live rows with row > heroRow, ascending, refilled in place. */
export function refreshRoute(cw: ChaseWorld, heroRow: number): void {
  const route = cw.world.route;
  route.length = 0;
  let from = heroRow + 1;
  if (from < 1) from = 1;
  for (let r = from; r <= cw.newest; r++) {
    if (r < cw.oldest) continue;
    route.push(routeAnchorId(slotOf(cw, r)));
  }
}

/** Rewrites the oldest slot with row newest+1. */
export function recycleOldest(cw: ChaseWorld): void {
  const nSlot = slotOf(cw, cw.newest);
  const next = nextZTop(cw.slotZTop[nSlot], cw.spec[nSlot]);
  cw.oldest++;
  cw.newest++;
  writeRow(cw, cw.newest, next);
}

export function buildChaseWorld(seed: number, cfg: Tuning): ChaseWorld {
  const slots = Math.max(5, Math.floor(cfg.chase.slots));
  const w = new World();
  const cw = new ChaseWorld(w, slots);
  cw.seed = seed | 0;
  cw.cfg = cfg.chase;
  cw.difficulty = difficultyFor(cfg.chase.v0, cfg);
  w.spawn = new Vec3(0, 0, 0);
  w.spawnYaw = 3.14159;
  w.killPlaneY = -1e9;
  // Fixed part: the hill ramp, a back wall and the side walls behind row 0.
  const zLow = hillY(HILL_Z_MIN);
  addRamp(w, box(-HILL_HALF_X, zLow, HILL_Z_MIN, HILL_HALF_X, zLow, HILL_Z_MAX), 2, hillY(HILL_Z_MAX) - zLow);
  const wallTop = 80;
  const wallBot = hillY(0) - 40;
  addSolid(w, box(-HILL_HALF_X, wallBot, HILL_Z_MAX, HILL_HALF_X, wallTop, HILL_Z_MAX + WALL_T));
  addSolid(w, box(-HILL_HALF_X - WALL_T, wallBot, ROW0_ZTOP, -HILL_HALF_X, wallTop, HILL_Z_MAX + WALL_T));
  addSolid(w, box(HILL_HALF_X, wallBot, ROW0_ZTOP, HILL_HALF_X + WALL_T, wallTop, HILL_Z_MAX + WALL_T));
  for (let i = 0; i < FIXED_SOLIDS; i++) w.style.push(STYLE_HIDDEN);
  // Slots: placeholder entries (rewritten right below).
  for (let s = 0; s < slots; s++) {
    for (let i = 0; i < SLOT_SOLIDS; i++) {
      addSolid(w, box(0, PARK_Y, 0, 0, PARK_Y, 0));
      w.style.push(1);
    }
    for (let i = 0; i < SLOT_PADS; i++) w.pads.push(box(0, PARK_Y, 0, 0, PARK_Y, 0));
    for (let i = 0; i < SLOT_ANCHORS; i++) addAnchor(w, 0, PARK_Y, 0);
    addRoof(w, box(0, PARK_Y, 0, 0, PARK_Y, 0), RIDGE_Z);
  }
  let zTop = ROW0_ZTOP;
  for (let r = 0; r < slots; r++) {
    writeRow(cw, r, zTop);
    zTop = nextZTop(zTop, cw.spec[slotOf(cw, r)]);
  }
  cw.oldest = 0;
  cw.newest = slots - 1;
  refreshRoute(cw, 0);
  return cw;
}

/** Index in `world.route` of the next route anchor (the first row after heroRow). */
export function routeIndexFor(cw: ChaseWorld, heroRow: number): number {
  const first = cw.oldest < 1 ? 1 : cw.oldest;
  const n = heroRow - first + 1;
  return n < 0 ? 0 : n;
}

/**
 * A plain World holding only the live rows, in local coordinates where the oldest live row's
 * uphill edge is at ROW0_ZTOP (the L1 frame). Returns the offset dz to add to local z (and
 * GRADE*dz to local y) to get back to absolute coordinates. Parked entries are left out.
 */
export function buildRowsWorld(cw: ChaseWorld, out: World): number {
  const oldSlot = slotOf(cw, cw.oldest);
  const dz = cw.slotZTop[oldSlot] - ROW0_ZTOP;
  const dy = GRADE * dz;
  const w = cw.world;
  out.solids.length = 0;
  out.ramps.length = 0;
  out.roofs.length = 0;
  out.anchors.length = 0;
  out.pads.length = 0;
  out.route.length = 0;
  out.style.length = 0;
  out.killPlaneY = -1e9;
  for (let r = cw.oldest; r <= cw.newest; r++) {
    const slot = slotOf(cw, r);
    const sb = solidBase(slot);
    for (let i = 0; i < SLOT_SOLIDS; i++) {
      const b = w.solids[sb + i];
      const st = w.style[sb + i];
      if (b.min.y <= PARK_Y + 1 || st === STYLE_HIDDEN) continue;
      out.solids.push(box(b.min.x, b.min.y - dy, b.min.z - dz, b.max.x, b.max.y - dy, b.max.z - dz));
      out.style.push(st);
    }
    const pb = padBase(slot);
    for (let i = 0; i < SLOT_PADS; i++) {
      const b = w.pads[pb + i];
      if (b.min.y <= PARK_Y + 1) continue;
      out.pads.push(box(b.min.x, b.min.y - dy, b.min.z - dz, b.max.x, b.max.y - dy, b.max.z - dz));
    }
    const rf = w.roofs[slot];
    if (rf.aabb.min.y > PARK_Y + 1) {
      const a = rf.aabb;
      addRoof(out, box(a.min.x, a.min.y - dy, a.min.z - dz, a.max.x, a.max.y - dy, a.max.z - dz), RIDGE_Z);
    }
    const ab = anchorBase(slot);
    for (let i = 0; i < SLOT_ANCHORS; i++) {
      const a = w.anchors[ab + i];
      if (a.py <= PARK_Y + 1) continue;
      const id = addAnchor(out, a.px, a.py - dy, a.pz - dz);
      if (i === 0) out.route.push(id);
    }
  }
  return dz;
}
