// House kit v2 renderer (ADR 0013 section 1.4, T311). Draws HouseSpec[] + PropSpec[] into the
// existing instanced decor kit. It never reads solids: the same spec feeds houseKit.emitHouse for
// the sim and this module for the look, through the shared helpers in houseSpec.ts.
import { Color, Group } from 'three';
import { DecorKit, RAIL_LEN, mulberry32 } from './kit';
import type { PieceId } from './kit';
import {
  HK,
  balconyDoor,
  balconyRails,
  deckY,
  faceNormal,
  faceRect,
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

function dressHouse(o: Out, h: HouseSpec, seed: number, shutterIdx: { n: number }): void {
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
      c(AWNING[(h.id + i) % AWNING.length]),
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

function dressProp(o: Out, p: PropSpec): void {
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

/** Draws every house and prop through one instanced kit. userData: stats (HouseDecorStats), boxes. */
export function buildHouseDecor(houses: HouseSpec[], props: PropSpec[], seed = 1): Group {
  const o = new Out(houses.length);
  const shutterIdx = { n: 0 };
  let windows = 0;
  let shops = 0;
  let doors = 0;
  for (let i = 0; i < houses.length; i++) {
    dressHouse(o, houses[i], seed, shutterIdx);
    windows += windowSlots(houses[i]).length;
    shops += houses[i].awnings.length;
    if (houses[i].balcony !== -1) doors++;
  }
  for (let i = 0; i < props.length; i++) dressProp(o, props[i]);

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
