// House kit v2 renderer (ADR 0013 section 1.4, T311). Draws HouseSpec[] + PropSpec[] into the
// existing instanced decor kit. It never reads solids: the same spec feeds houseKit.emitHouse for
// the sim and this module for the look, through the shared helpers in houseSpec.ts.
import { Color, Group } from 'three';
import { DecorKit, RAIL_LEN, TANK_UNIT_H, mulberry32 } from './kit';
import type { PieceId } from './kit';
import { FLAGS } from './placeDecor';
import {
  HK,
  balconyDoor,
  balconyRails,
  deckY,
  faceNormal,
  faceRect,
  facePoint,
  parapetHeight,
  parapetSegments,
  poleAnchor,
  shopOpenings,
  stairsHighS,
  windowSlots,
} from '../../../content/house/houseSpec';
import type { Face, HouseSpec, Opening, PropSpec, Rect } from '../../../content/house/houseSpec';

const WIN_D = 0.118; // window depth unit (same as kit v1): sticks out 1.6 x this
const SHUTTERS_PER_HOUSE = 5; // kit cap is 6 per house; keep the 90 % margin

const PLASTER = ['#d8c7a6', '#cfb892', '#e0cfae', '#c9a98a', '#d9b99a', '#bfb59f'];
const BRICK = '#9c5640';
const STONE = '#b3a58f';
const WOOD = ['#4a2c1c', '#5a3622'];
const SHUTTER = ['#4a2c1c', '#7c3e2e', '#2e6b47'];
const TERRACOTTA = '#c0603a'; // 1.2 m parapets: not vaultable
const CONCRETE = '#a99a88'; // 0.45 m parapets
const AWNING = ['#b8432f', '#2f62b8', '#d0a12e', '#2e6b47'];
const CREAM = '#e6d9a8'; // safe: crates, boxes, hay, tramp mat
const HAY = '#e2c872';
const TRAMP_RIM = '#3a2c24';
const POLE = '#4a3424';

// look 'home' (home-assets handoff H4+): flat tints only, no textures. None of them is the gold
// affordance, cream (safe) or terracotta (danger); tests/adapters/palette.test.ts checks.
const HOME_TIN = '#8c949a'; // desaturated corrugated tin / tarp
const HOME_STRAW = '#b8975a'; // straw bands on a hay stack
const HOME_TANK = ['#26282c', '#2e6b47']; // black and green plastic drums (as the v1 tanks)

/** Prayer-flag colours: the v1 FLAGS minus the gold one, so no flag reads as the gold affordance. */
const GOLD_FLAG = '#d0a12e';
export const HOME_FLAG_COLOURS: readonly string[] = FLAGS.filter((f) => f !== GOLD_FLAG);
const FLAG_CHANCE = 0.6;
const FLAG_COUNT = 8;
const FLAG_POST_H = 2.3;
const FLAG_INSET = 0.5; // line and posts stand this far inside the deck edge

// look 'home' crop dressing: muted dried-crop tones, none of them gold, cream or terracotta.
const CROP_CORN = '#c2a04e';
const CROP_CHILI = '#6e2f26';
const BANANA_STEM = '#6b7a3a';
const BANANA_LEAF = '#4e7d35';
const CROP_FACE_CHANCE = 0.5;
const BANANA_CHANCE = 0.4;
const BANANA_REACH = 0.8; // plant centre this far out from the wall; leaves reach 0.7 m round it

const TANK_SCALE = 1.2; // v1 tank unit is 1.0 m of platform and 2.18 m tall
const TANK_HALF = 0.8; // conservative half footprint of a scaled tank (ladder included), m
const TANK_CHANCE = 0.5;
const TANK_RUN_UP = 3.2; // no tank within this depth of a takeoff, runout or party edge

/** Per-level look. 'home' is the opt-in Kathmandu hill-house dressing; absent keeps v1 output exactly. */
export interface HouseDecorOptions {
  look?: 'home';
}

export interface HouseDecorStats {
  houses: number;
  windows: number;
  shops: number;
  doors: number;
  /** Adds refused because a piece's capacity was spent (must stay 0). */
  refused: number;
  used: Record<string, number>;
}

export interface HouseDecorBox {
  kind: string;
  min: [number, number, number];
  max: [number, number, number];
  house?: number;
}

const c = (hex: string): Color => new Color(hex);

class Out {
  readonly kit: DecorKit;
  readonly boxes: HouseDecorBox[] = [];
  constructor(houses: number) {
    this.kit = new DecorKit(houses);
  }
  box(
    piece: PieceId,
    kind: string,
    x0: number,
    y0: number,
    z0: number,
    x1: number,
    y1: number,
    z1: number,
    col: Color,
    house?: number,
  ): void {
    const ok = this.kit.add(
      piece,
      (x0 + x1) / 2,
      y0,
      (z0 + z1) / 2,
      x1 - x0,
      y1 - y0,
      z1 - z0,
      0,
      col,
    );
    if (!ok) return;
    const b: HouseDecorBox = { kind, min: [x0, y0, z0], max: [x1, y1, z1] };
    if (house !== undefined) b.house = house;
    this.boxes.push(b);
  }
  rect(
    piece: PieceId,
    kind: string,
    r: Rect,
    y0: number,
    y1: number,
    col: Color,
    house?: number,
  ): void {
    this.box(piece, kind, r.x0, y0, r.z0, r.x1, y1, r.z1, col, house);
  }
}

function yawOf(f: Face): number {
  const n = faceNormal(f);
  return Math.atan2(n[0], n[1]);
}

/** Window-style piece on a wall: (x, z) on the wall plane, y the base, +z of the unit points out. */
function onWall(
  o: Out,
  piece: 'window' | 'shutter',
  kind: string,
  f: Face,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  col: Color,
  house: number,
): void {
  const n = faceNormal(f);
  const off = piece === 'window' ? 0.5 * WIN_D : 0;
  const depth = piece === 'window' ? WIN_D : 1;
  const sw = piece === 'window' ? w : 1;
  const sh = piece === 'window' ? h : 1;
  const ox = x + n[0] * off;
  const oz = z + n[1] * off;
  if (!o.kit.add(piece, ox, y, oz, sw, sh, depth, yawOf(f), col)) return;
  const reach = piece === 'window' ? 1.6 * WIN_D : 0.04;
  const half = piece === 'window' ? 0.6 * w : 0.93;
  const t = faceNormal(f);
  const ax = Math.abs(t[0]); // wall normal on x: the opening runs along z
  const x0 = ax === 1 ? Math.min(x, x + n[0] * reach) : x - half;
  const x1 = ax === 1 ? Math.max(x, x + n[0] * reach) : x + half;
  const z0 = ax === 1 ? z - half : Math.min(z, z + n[1] * reach);
  const z1 = ax === 1 ? z + half : Math.max(z, z + n[1] * reach);
  o.boxes.push({
    kind,
    min: [x0, y, z0],
    max: [x1, y + (piece === 'window' ? h : 1.3), z1],
    house,
  });
}

function opening(o: Out, kind: string, op: Opening, col: Color, house: number): void {
  onWall(o, 'window', kind, op.face, op.x, op.y, op.z, op.w, op.h, col, house);
}

function dressHouse(
  o: Out,
  h: HouseSpec,
  seed: number,
  shutterIdx: { n: number },
  home: boolean,
): void {
  const rng = mulberry32((h.id * 7919 + seed) >>> 0);
  const g = h.groundY;
  const deck = deckY(h);
  const k = HK.half;
  const plaster = c(PLASTER[Math.min(PLASTER.length - 1, Math.floor(rng() * PLASTER.length))]);
  const wood = c(WOOD[Math.floor(rng() * WOOD.length)]);

  // Shell: brick plinth (sunk so a sloping street shows no gap) and plaster walls to the deck.
  o.box(
    'wallBrick',
    'plinth',
    h.cx - k - 0.05,
    g - 1.0,
    h.cz - k - 0.05,
    h.cx + k + 0.05,
    g + HK.plinth,
    h.cz + k + 0.05,
    c(BRICK),
    h.id,
  );
  o.box(
    'wallPlaster',
    'body',
    h.cx - k,
    g + HK.plinth,
    h.cz - k,
    h.cx + k,
    deck,
    h.cz + k,
    plaster,
    h.id,
  );

  // Storey band at the first-floor line and a cornice at the roof edge.
  const band = k + 0.15;
  if (h.storeys === 2) {
    const y = g + HK.balconyTop - 0.2;
    o.box(
      'cornice',
      'cornice',
      h.cx - band,
      y,
      h.cz - band,
      h.cx + band,
      y + 0.15,
      h.cz + band,
      c(STONE),
      h.id,
    );
  }
  o.box(
    'cornice',
    'cornice',
    h.cx - band,
    deck - 0.3,
    h.cz - band,
    h.cx + band,
    deck - 0.12,
    h.cz + band,
    c(STONE),
    h.id,
  );

  // Parapets.
  for (let f = 0; f < 4; f++) {
    const segs = parapetSegments(h, f as Face);
    const hgt = parapetHeight(h, f as Face);
    const col = c(hgt > 1 ? TERRACOTTA : CONCRETE);
    for (let i = 0; i < segs.length; i++) {
      const r = faceRect(h, f as Face, segs[i][0], segs[i][1], k - HK.parapetThick, k);
      o.rect('parapet', hgt > 1 ? 'parapetTall' : 'parapet', r, deck, deck + hgt, col, h.id);
    }
  }

  // Windows on every visible wall, shutters on a few.
  const slots = windowSlots(h);
  let shutters = 0;
  for (let i = 0; i < slots.length; i++) {
    const sl = slots[i];
    onWall(o, 'window', 'window', sl.face, sl.x, sl.y, sl.z, sl.w, sl.h, wood, h.id);
    shutterIdx.n++;
    if (shutters < SHUTTERS_PER_HOUSE && shutterIdx.n % 2 === 0) {
      shutters++;
      onWall(
        o,
        'shutter',
        'shutter',
        sl.face,
        sl.x,
        sl.y,
        sl.z,
        1,
        1,
        c(SHUTTER[Math.floor(rng() * SHUTTER.length)]),
        h.id,
      );
    }
  }
  const shops = shopOpenings(h);
  for (let i = 0; i < shops.length; i++) opening(o, 'shop', shops[i], c('#2a1f18'), h.id);
  const door = balconyDoor(h);
  if (door !== null) opening(o, 'door', door, wood, h.id);

  // Balcony deck and rails.
  if (h.balcony !== -1) {
    const b = h.balcony;
    const hw = HK.balconyW / 2;
    const top = g + HK.balconyTop;
    o.rect(
      'deck',
      'balcony',
      faceRect(h, b, -hw, hw, k, k + HK.balconyD),
      top - HK.balconyThick,
      top,
      c(STONE),
      h.id,
    );
    const rails = balconyRails(h);
    for (let i = 0; i < rails.length; i++) {
      const rr = rails[i];
      const r = faceRect(h, b, rr.s0, rr.s1, rr.d0, rr.d1);
      const alongZ = r.z1 - r.z0 > r.x1 - r.x0;
      const len = alongZ ? r.z1 - r.z0 : r.x1 - r.x0;
      if (len < 0.5) continue; // a 0.1 m post: solid only
      const cx = (r.x0 + r.x1) / 2;
      const cz = (r.z0 + r.z1) / 2;
      if (o.kit.add('guard', cx, top, cz, len / RAIL_LEN, 1, 1, alongZ ? Math.PI / 2 : 0, wood)) {
        o.boxes.push({
          kind: 'rail',
          min: [r.x0, top, r.z0],
          max: [r.x1, top + HK.railH, r.z1],
          house: h.id,
        });
      }
    }
  }

  // Outside stairs: 16 tread blocks along the ramp (tops on the ramp surface at mid-tread).
  if (h.stairs !== null) {
    const sh = stairsHighS(h);
    const n = HK.stairTreads;
    const run = HK.stairRun / n;
    for (let i = 0; i < n; i++) {
      // tread 0 is the lowest (far end); its top is the ramp height at its middle
      const s0 = sh + HK.stairRun - (i + 1) * run;
      const r = faceRect(h, h.stairs.face, s0, s0 + run, k, k + HK.stairW);
      const top = ((i + 0.5) * HK.stairRise) / n;
      o.rect('stair', 'stair', r, g, g + top, c(i % 2 === 0 ? STONE : '#a89b86'), h.id);
    }
  }

  // Awnings: tilted slabs over the shop opening, high edge at the wall.
  for (let i = 0; i < h.awnings.length; i++) {
    const f = h.awnings[i];
    const n = faceNormal(f);
    const len = Math.hypot(HK.awningD, HK.awningHigh - HK.awningLow);
    const pitch = Math.atan2(HK.awningHigh - HK.awningLow, HK.awningD);
    const d = k + HK.awningD / 2;
    const midY = g + (HK.awningHigh + HK.awningLow) / 2 - 0.04;
    const ok = o.kit.add(
      'cornice',
      h.cx + n[0] * d,
      midY,
      h.cz + n[1] * d,
      HK.awningW,
      0.08,
      len,
      yawOf(f),
      // look 'home': corrugated tin, a flat desaturated tint (the kit's awning is the canopy piece)
      c(home ? HOME_TIN : AWNING[(h.id + i) % AWNING.length]),
      pitch,
    );
    if (ok) {
      const r = faceRect(h, f, -HK.awningW / 2, HK.awningW / 2, k, k + HK.awningD);
      o.boxes.push({
        kind: 'awning',
        min: [r.x0, g + HK.awningLow, r.z0],
        max: [r.x1, g + HK.awningHigh, r.z1],
        house: h.id,
      });
    }
  }

  if (home) {
    roofTank(o, h, seed);
    flagLine(o, h, seed);
    cropDress(o, h, seed);
  }

  // Zipline pole: a post and a short crossbar at the anchor.
  if (h.pole) {
    const a = poleAnchor(h);
    o.box(
      'trim',
      'pole',
      a[0] - 0.08,
      deck,
      a[2] - 0.08,
      a[0] + 0.08,
      a[1],
      a[2] + 0.08,
      c(POLE),
      h.id,
    );
    o.box(
      'trim',
      'pole',
      a[0] - 0.6,
      a[1] - 0.1,
      a[2] - 0.05,
      a[0] + 0.6,
      a[1],
      a[2] + 0.05,
      c(POLE),
      h.id,
    );
  }
}

/**
 * Rects (world xz) of a deck where a render-only rooftop tank must not stand: a strip along every
 * takeoff, run-out and party edge, the zipline launch zone (3 x 3 m, 2 m toward -z of the centre,
 * with a margin) and the foot of the pole.
 */
export function tankKeepOut(h: HouseSpec): Rect[] {
  const k = HK.half;
  const out: Rect[] = [];
  for (let f = 0; f < 4; f++) {
    const face = f as Face;
    const run = h.runout !== undefined && h.runout.some((r) => r.face === face);
    if (h.party[f] || h.takeoff.indexOf(face) >= 0 || run) {
      out.push(faceRect(h, face, -k, k, k - TANK_RUN_UP, k));
    }
  }
  if (h.runout !== undefined && h.runout.length > 0) {
    out.push({ x0: h.cx - 1.75, x1: h.cx + 1.75, z0: h.cz - 3.75, z1: h.cz - 0.25 });
  }
  if (h.pole) {
    const a = poleAnchor(h);
    out.push({ x0: a[0] - 1.5, x1: a[0] + 1.5, z0: a[2] - 1.5, z1: a[2] + 1.5 });
  }
  return out;
}

/** look 'home': a water tank in one free deck corner of some 2-storey houses (seeded). Render only. */
function roofTank(o: Out, h: HouseSpec, seed: number): void {
  if (h.storeys !== 2) return;
  const rng = mulberry32((h.id * 104729 + seed * 31 + 7) >>> 0);
  const roll = rng();
  const start = Math.floor(rng() * 4);
  const col = c(HOME_TANK[Math.floor(rng() * HOME_TANK.length)]);
  const yaw = Math.floor(rng() * 4) * (Math.PI / 2);
  if (roll >= TANK_CHANCE) return;
  const keep = tankKeepOut(h);
  const inset = HK.half - HK.parapetThick - TANK_HALF - 0.1;
  const deck = deckY(h);
  for (let i = 0; i < 4; i++) {
    const q = (start + i) % 4;
    const x = h.cx + (q % 2 === 0 ? -inset : inset);
    const z = h.cz + (q < 2 ? -inset : inset);
    const r: Rect = { x0: x - TANK_HALF, x1: x + TANK_HALF, z0: z - TANK_HALF, z1: z + TANK_HALF };
    const clear = keep.every((k) => r.x1 <= k.x0 || r.x0 >= k.x1 || r.z1 <= k.z0 || r.z0 >= k.z1);
    if (!clear) continue;
    if (o.kit.add('homeTank', x, deck, z, TANK_SCALE, TANK_SCALE, TANK_SCALE, yaw, col)) {
      o.boxes.push({
        kind: 'tank',
        min: [r.x0, deck, r.z0],
        max: [r.x1, deck + TANK_UNIT_H * TANK_SCALE, r.z1],
        house: h.id,
      });
    }
    return;
  }
}

/**
 * look 'home': one prayer-flag line along a free deck edge (Medium/High only: posts, string and
 * flags are the `trim` and `flag` pieces, both hidden on Low). Never on a takeoff, run-out, party
 * or roof-stairs edge, and never within 3 m of the zipline pole anchor.
 */
function flagLine(o: Out, h: HouseSpec, seed: number): void {
  const rng = mulberry32((h.id * 15485863 + seed * 17 + 3) >>> 0);
  const roll = rng();
  const start = Math.floor(rng() * 4);
  if (roll >= FLAG_CHANCE) return;
  const k = HK.half;
  const deck = deckY(h);
  const y = deck + FLAG_POST_H;
  const reach = k - FLAG_INSET; // half length of the line and its depth from the centre
  for (let i = 0; i < 4; i++) {
    const f = ((start + i) % 4) as Face;
    const run = h.runout !== undefined && h.runout.some((r) => r.face === f);
    if (h.party[f] || h.takeoff.indexOf(f) >= 0 || run) continue;
    if (h.stairs !== null && h.stairs.face === f) continue;
    const a = facePoint(h, f, -reach, reach);
    const b = facePoint(h, f, reach, reach);
    if (h.pole) {
      const an = poleAnchor(h);
      // distance from the anchor to the horizontal string
      const dx = Math.max(Math.min(an[0], Math.max(a[0], b[0])), Math.min(a[0], b[0])) - an[0];
      const dz = Math.max(Math.min(an[2], Math.max(a[1], b[1])), Math.min(a[1], b[1])) - an[2];
      if (Math.hypot(dx, dz, y - an[1]) < 3) continue;
    }
    const alongZ = Math.abs(b[1] - a[1]) > Math.abs(b[0] - a[0]);
    const len = 2 * reach;
    const post = c(POLE);
    for (const e of [a, b]) {
      o.box(
        'trim',
        'flagPost',
        e[0] - 0.05,
        deck,
        e[1] - 0.05,
        e[0] + 0.05,
        y,
        e[1] + 0.05,
        post,
        h.id,
      );
    }
    const mx = (a[0] + b[0]) / 2;
    const mz = (a[1] + b[1]) / 2;
    o.kit.add('trim', mx, y - 0.03, mz, len, 0.03, 0.03, alongZ ? Math.PI / 2 : 0, post);
    for (let n = 0; n < FLAG_COUNT; n++) {
      const u = (n + 0.5) / FLAG_COUNT - 0.5;
      const fx = mx + (b[0] - a[0]) * u;
      const fz = mz + (b[1] - a[1]) * u;
      const col = c(HOME_FLAG_COLOURS[n % HOME_FLAG_COLOURS.length]);
      o.kit.add('flag', fx, y - 0.25, fz, 1.3, 1.3, 1.3, yawOf(f) + (n % 2) * Math.PI, col);
    }
    o.boxes.push({
      kind: 'flagLine',
      min: [Math.min(a[0], b[0]) - 0.05, y - 0.5, Math.min(a[1], b[1]) - 0.05],
      max: [Math.max(a[0], b[0]) + 0.05, y, Math.max(a[1], b[1]) + 0.05],
      house: h.id,
    });
    return;
  }
}

/**
 * look 'home': dried-crop bundles hung under the roof cornice on some walls and a banana plant at
 * the foot of one. Only on walls without a party side, and not on a balcony, awning or stairs wall
 * (those are busy). Built from `trim` and `canopy`, both hidden on Low; render only.
 */
function cropDress(o: Out, h: HouseSpec, seed: number): void {
  const rng = mulberry32((h.id * 49979687 + seed * 13 + 11) >>> 0);
  const k = HK.half;
  const deck = deckY(h);
  const free: Face[] = [];
  for (let f = 0; f < 4; f++) {
    const face = f as Face;
    if (h.party[f] || h.balcony === face || h.awnings.indexOf(face) >= 0) continue;
    if (h.stairs !== null && h.stairs.face === face) continue;
    free.push(face);
  }
  for (let i = 0; i < free.length; i++) {
    if (rng() >= CROP_FACE_CHANCE) continue;
    const lens = [0.9, 1.1, 0.8];
    for (let n = 0; n < 3; n++) {
      const s = (n - 1) * 0.45;
      const r = faceRect(h, free[i], s - 0.11, s + 0.11, k, k + 0.12);
      const col = c(n === 1 ? CROP_CHILI : CROP_CORN);
      o.rect('trim', 'cropHang', r, deck - 0.32 - lens[n], deck - 0.32, col, h.id);
    }
  }
  if (free.length > 0 && rng() < BANANA_CHANCE) {
    const f = free[Math.floor(rng() * free.length)];
    const sgn = rng() < 0.5 ? -1 : 1;
    const p = facePoint(h, f, sgn * 3.3, k + BANANA_REACH);
    const g = h.groundY;
    o.box(
      'trim',
      'bananaStem',
      p[0] - 0.07,
      g,
      p[1] - 0.07,
      p[0] + 0.07,
      g + 1.7,
      p[1] + 0.07,
      c(BANANA_STEM),
      h.id,
    );
    o.kit.add('canopy', p[0], g + 1.9, p[1], 0.7, 0.3, 0.7, 0, c(BANANA_LEAF));
    o.kit.add('canopy', p[0], g + 1.6, p[1], 0.55, 0.22, 0.55, 0.8, c(BANANA_LEAF));
    o.boxes.push({
      kind: 'banana',
      min: [p[0] - 0.7, g, p[1] - 0.7],
      max: [p[0] + 0.7, g + 2.2, p[1] + 0.7],
      house: h.id,
    });
  }
}

function dressProp(o: Out, p: PropSpec, home: boolean): void {
  const g = p.groundY;
  const sq = (size: number): Rect => ({
    x0: p.x - size / 2,
    x1: p.x + size / 2,
    z0: p.z - size / 2,
    z1: p.z + size / 2,
  });
  switch (p.kind) {
    case 'crate': {
      const r = sq(HK.crate);
      if (o.kit.add('crate', p.x, g, p.z, HK.crate, HK.crate, HK.crate, p.yaw, c(CREAM))) {
        o.boxes.push({ kind: 'crate', min: [r.x0, g, r.z0], max: [r.x1, g + HK.crate, r.z1] });
      }
      return;
    }
    case 'boxPile': {
      // two stacked-looking crate blocks side by side under the 1.6 x 1.6 cushion slab
      const sz = HK.boxPileSize;
      const t = HK.boxPileTop;
      for (let i = 0; i < 2; i++) {
        const z = p.z + (i === 0 ? -sz / 4 : sz / 4);
        if (!o.kit.add('crate', p.x, g, z, sz, t, sz / 2, p.yaw, c(i === 0 ? CREAM : '#d3bf8a')))
          return;
      }
      const r = sq(sz);
      o.boxes.push({ kind: 'boxPile', min: [r.x0, g, r.z0], max: [r.x1, g + t, r.z1] });
      return;
    }
    case 'hay': {
      const r = sq(HK.haySize);
      if (o.kit.add('crate', p.x, g, p.z, HK.haySize, HK.hayTop, HK.haySize, p.yaw, c(HAY))) {
        o.boxes.push({ kind: 'hay', min: [r.x0, g, r.z0], max: [r.x1, g + HK.hayTop, r.z1] });
        if (home) hayCover(o, p);
      }
      return;
    }
    case 'tramp': {
      const r = sq(HK.trampSize);
      const top = HK.trampTop;
      if (
        !o.kit.add(
          'crate',
          p.x,
          g,
          p.z,
          HK.trampSize,
          top - 0.04,
          HK.trampSize,
          p.yaw,
          c(TRAMP_RIM),
        )
      )
        return;
      o.kit.add(
        'crate',
        p.x,
        g + top - 0.04,
        p.z,
        HK.trampSize - 0.3,
        0.04,
        HK.trampSize - 0.3,
        p.yaw,
        c(CREAM),
      );
      o.boxes.push({ kind: 'tramp', min: [r.x0, g, r.z0], max: [r.x1, g + top, r.z1] });
      return;
    }
  }
}

/**
 * look 'home': a tin/tarp strip across the top and two straw bands round the body of a hay stack.
 * Made from the `trim` piece (a plain tinted unit box), which Low already hides; the cream body
 * stays and nothing rises more than 2 cm over the cushion top, so the landing height is unchanged.
 */
function hayCover(o: Out, p: PropSpec): void {
  const g = p.groundY;
  const top = g + HK.hayTop;
  const wide = HK.haySize + 0.08; // proud of the body by 4 cm a side
  let ok = o.kit.add(
    'trim',
    p.x,
    top - 0.06,
    p.z,
    HK.haySize - 0.9,
    0.08,
    HK.haySize,
    p.yaw,
    c(HOME_TIN),
  );
  const bands = [0.22, 0.52];
  for (let i = 0; i < bands.length; i++) {
    ok = o.kit.add('trim', p.x, g + bands[i], p.z, wide, 0.12, wide, p.yaw, c(HOME_STRAW)) && ok;
  }
  if (ok) {
    o.boxes.push({
      kind: 'hayCover',
      min: [p.x - wide / 2, g, p.z - wide / 2],
      max: [p.x + wide / 2, top + 0.02, p.z + wide / 2],
    });
  }
}

/** Draws every house and prop through one instanced kit. userData: stats (HouseDecorStats), boxes. */
export function buildHouseDecor(
  houses: HouseSpec[],
  props: PropSpec[],
  seed = 1,
  opts: HouseDecorOptions = {},
): Group {
  const home = opts.look === 'home';
  const o = new Out(houses.length);
  const shutterIdx = { n: 0 };
  let windows = 0;
  let shops = 0;
  let doors = 0;
  for (let i = 0; i < houses.length; i++) {
    dressHouse(o, houses[i], seed, shutterIdx, home);
    windows += windowSlots(houses[i]).length;
    shops += houses[i].awnings.length;
    if (houses[i].balcony !== -1) doors++;
  }
  for (let i = 0; i < props.length; i++) dressProp(o, props[i], home);

  const used: Record<string, number> = {};
  let refused = 0;
  for (const id of Object.keys(o.kit.used)) {
    used[id] = o.kit.used[id as PieceId];
    refused += o.kit.dropped[id as PieceId];
  }
  const g = o.kit.finish();
  g.name = 'houseV2';
  const stats: HouseDecorStats = { houses: houses.length, windows, shops, doors, refused, used };
  g.userData.stats = stats;
  g.userData.boxes = o.boxes;
  return g;
}
