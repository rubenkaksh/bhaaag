// House kit v2 (ADR 0013 section 1, T311): the data a house is built from and the numbers every
// house shares. Pure TypeScript, no three, no DOM. `houseKit.ts` turns a HouseSpec into level JSON
// fragments; `houseV2.ts` draws the same spec. Both read the geometry helpers here, so what is
// drawn and what is solid cannot drift apart.

export type Face = 0 | 1 | 2 | 3; // +x, -x, +z, -z

export interface HouseSpec {
  id: number;
  cx: number;
  cz: number;
  groundY: number;
  storeys: 1 | 2;
  /** Shared wall with an adjoining house, per face. No parapet, window, balcony, stairs or awning there. */
  party: [boolean, boolean, boolean, boolean];
  /** Face carrying the first-floor balcony (2-storey only), or -1. */
  balcony: Face | -1;
  /** Outside stairs. `to` 'balcony' needs the balcony on the same face; 'roof' is 1-storey only. */
  stairs: { face: Face; to: 'balcony' | 'roof' } | null;
  awnings: Face[];
  /** Route takeoff sides: 0.45 m parapet. */
  takeoff: Face[];
  /** Zipline pole on the roof (anchor, see poleAnchor). */
  pole: boolean;
  /** 1.2 m (not vaultable) parapet sides. Disjoint from `takeoff`. */
  tall: Face[];
  /**
   * Zipline run-out gaps: the parapet on `face` (a non-party face) is cut for 1.6 m centred at
   * tangent offset `s`, where the rope chord leaves the deck. The rest of the face stays closed.
   */
  runout?: { face: Face; s: number; w?: number }[];
}

export const RUNOUT_GAP = 1.6;

export interface PropSpec {
  kind: 'crate' | 'boxPile' | 'hay' | 'tramp';
  x: number;
  z: number;
  groundY: number;
  yaw: number;
}

type Box3 = { min: [number, number, number]; max: [number, number, number] };
type RampDraft = Box3 & { slopeAxis: number; rise: number; slip: number };

/** The level JSON fields a house or prop writes into (a subset of `LevelJson`). `style` runs parallel to `solids`. */
export interface LevelJsonDraft {
  solids: Box3[];
  style: number[];
  ramps: RampDraft[];
  anchors: { pos: [number, number, number] }[];
  tramps: Box3[];
  cushions: Box3[];
  /** House id -> index of its pole anchor in `anchors`. */
  poleAnchorIds: Record<number, number>;
}

export function newDraft(): LevelJsonDraft {
  return {
    solids: [],
    style: [],
    ramps: [],
    anchors: [],
    tramps: [],
    cushions: [],
    poleAnchorIds: {},
  };
}

// Style codes (ADR 0013 section 4.1). 1 is the house body (existing code).
export const STYLE_BODY = 1;
export const STYLE_PARAPET = 4; // parapets and balcony rails
export const STYLE_BALCONY = 5;
export const STYLE_PROP = 6;

/** ADR 0013 section 1.1: one size for every house. */
export const HK = {
  half: 4.0, // footprint 8 x 8
  plinth: 0.4, // equals hero.stepUp
  storey: 2.8,
  bodyBelow: 2.0, // body starts this far under the local ground
  parapetThick: 0.25,
  parapetLow: 0.45, // vaultable
  parapetTall: 1.2, // not vaultable
  balconyW: 3.0,
  balconyD: 1.2,
  balconyThick: 0.2,
  balconyTop: 3.2, // above ground: first floor line
  railH: 0.9,
  railThick: 0.1,
  railGap: 1.0,
  stairW: 1.0,
  stairRun: 4.57, // 35 degrees at a rise of 3.2
  stairRise: 3.2,
  stairHighBalcony: 1.5, // stairs meet the balcony end
  stairHighRoof: 0.5, // 1-storey stairs top out here, parapet gap around them
  stairTreads: 16,
  awningW: 3.6,
  awningD: 1.5,
  awningHigh: 2.7,
  awningLow: 2.2,
  windowW: 1.0,
  windowH: 1.3,
  windowSill: 0.9,
  windowAt: 1.8,
  poleHeight: 2.6,
  poleIn: 2.5,
  crate: 0.9,
  boxPileSize: 1.6,
  boxPileTop: 0.8,
  haySize: 2.4,
  hayTop: 0.9,
  trampSize: 1.8,
  trampTop: 0.5,
  slab: 0.02, // cushion and tramp slab thickness (inside the sim's slab tolerance)
} as const;

const FACE_N: readonly (readonly [number, number])[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];
// Tangent of each face; s along it. Face 0 runs +z, 1 runs -z, 2 runs -x, 3 runs +x.
const FACE_T: readonly (readonly [number, number])[] = [
  [0, 1],
  [0, -1],
  [-1, 0],
  [1, 0],
];

export function faceNormal(f: Face): readonly [number, number] {
  return FACE_N[f];
}
export function faceTangent(f: Face): readonly [number, number] {
  return FACE_T[f];
}

/** Ramp slopeAxis (uphill direction) pointing along -tangent of a face (toward the s = 0 end). */
const AXIS_ALONG_NEG_T: readonly number[] = [3, 2, 0, 1];

/** Ramp slopeAxis pointing from a face back into the house (the opposite face's outward axis). */
export function axisIntoWall(f: Face): number {
  return f ^ 1;
}

export function round6(v: number): number {
  return Math.round(v * 1e6) / 1e6;
}

/** World (x, z) of the point at tangent offset `s` and outward depth `d` measured from the house centre. */
export function facePoint(h: HouseSpec, f: Face, s: number, d: number): [number, number] {
  return [
    round6(h.cx + FACE_N[f][0] * d + FACE_T[f][0] * s),
    round6(h.cz + FACE_N[f][1] * d + FACE_T[f][1] * s),
  ];
}

export interface Rect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
}

/** Axis-aligned world rect of the strip s in [s0, s1], d in [d0, d1] on face f. */
export function faceRect(
  h: HouseSpec,
  f: Face,
  s0: number,
  s1: number,
  d0: number,
  d1: number,
): Rect {
  const a = facePoint(h, f, s0, d0);
  const b = facePoint(h, f, s1, d1);
  return {
    x0: Math.min(a[0], b[0]),
    x1: Math.max(a[0], b[0]),
    z0: Math.min(a[1], b[1]),
    z1: Math.max(a[1], b[1]),
  };
}

/** Roof deck height (flat terrace): ground + plinth + storeys. 3.2 m or 6.0 m. */
export function deckY(h: HouseSpec): number {
  return round6(h.groundY + HK.plinth + HK.storey * h.storeys);
}

export function validateHouse(h: HouseSpec): void {
  const fail = (msg: string): never => {
    throw new Error('house ' + h.id + ': ' + msg);
  };
  if (h.storeys !== 1 && h.storeys !== 2) fail('storeys must be 1 or 2');
  const open = (f: number, what: string): void => {
    if (h.party[f]) fail(what + ' on party face ' + f);
  };
  if (h.balcony !== -1) {
    if (h.storeys !== 2) fail('balcony needs 2 storeys');
    open(h.balcony, 'balcony');
  }
  if (h.stairs !== null) {
    open(h.stairs.face, 'stairs');
    if (h.stairs.to === 'balcony') {
      if (h.balcony !== h.stairs.face) fail('stairs to balcony must share the balcony face');
    } else if (h.storeys !== 1) {
      fail('stairs to roof need a 1-storey house');
    }
  }
  for (let i = 0; i < h.awnings.length; i++) {
    const f = h.awnings[i];
    open(f, 'awning');
    if (f === h.balcony) fail('awning under the balcony');
    if (h.stairs !== null && f === h.stairs.face) fail('awning on the stairs face');
  }
  for (let i = 0; i < h.takeoff.length; i++) {
    open(h.takeoff[i], 'takeoff');
    if (h.tall.indexOf(h.takeoff[i]) >= 0) fail('face ' + h.takeoff[i] + ' is takeoff and tall');
  }
  for (let i = 0; i < h.tall.length; i++) open(h.tall[i], 'tall parapet');
  const ro = h.runout;
  if (ro !== undefined) for (let i = 0; i < ro.length; i++) open(ro[i].face, 'runout');
}

// ---- parapets -------------------------------------------------------------------------------

export function parapetHeight(h: HouseSpec, f: Face): number {
  return h.tall.indexOf(f) >= 0 ? HK.parapetTall : HK.parapetLow;
}

type Span = [number, number];

function subtract(spans: Span[], cut: Span): Span[] {
  const out: Span[] = [];
  for (let i = 0; i < spans.length; i++) {
    const [a, b] = spans[i];
    if (cut[1] <= a || cut[0] >= b) {
      out.push([a, b]);
      continue;
    }
    if (cut[0] > a) out.push([a, cut[0]]);
    if (cut[1] < b) out.push([cut[1], b]);
  }
  return out;
}

/**
 * Parapet segments on face f as tangent intervals [s0, s1] (empty on party faces). Gaps: the 3.4 m
 * span over the balcony and the stair landing on a 1-storey roof. z faces stop 0.25 short at a
 * corner where the x face has its own strip, so strips never overlap.
 */
export function parapetSegments(h: HouseSpec, f: Face): Span[] {
  if (h.party[f]) return [];
  const half = HK.half;
  let lo = -half;
  let hi = half;
  if (f >= 2) {
    // face 2 runs -x: s = +half is the -x end (face 1), s = -half the +x end (face 0).
    // face 3 runs +x: s = +half is the +x end (face 0), s = -half the -x end (face 1).
    const hiFace = f === 2 ? 1 : 0;
    const loFace = f === 2 ? 0 : 1;
    if (!h.party[hiFace]) hi -= HK.parapetThick;
    if (!h.party[loFace]) lo += HK.parapetThick;
  }
  let spans: Span[] = [[lo, hi]];
  if (h.balcony === f) spans = subtract(spans, [-1.7, 1.7]);
  if (h.stairs !== null && h.stairs.face === f && h.stairs.to === 'roof') {
    spans = subtract(spans, [HK.stairHighRoof - 1.2, HK.stairHighRoof + 1.2]);
  }
  const ro = h.runout;
  if (ro !== undefined) {
    for (let i = 0; i < ro.length; i++) {
      if (ro[i].face === f)
        {
        const half = (ro[i].w ?? RUNOUT_GAP) / 2;
        spans = subtract(spans, [ro[i].s - half, ro[i].s + half]);
      }
    }
  }
  const out: Span[] = [];
  for (let i = 0; i < spans.length; i++) if (spans[i][1] - spans[i][0] >= 0.05) out.push(spans[i]);
  return out;
}

// ---- balcony rails --------------------------------------------------------------------------

export interface RailRect {
  s0: number;
  s1: number;
  d0: number;
  d1: number;
}

/** Rails on the three open sides of the balcony; a 1.0 m gap on the stairs side. */
export function balconyRails(h: HouseSpec): RailRect[] {
  if (h.balcony === -1) return [];
  const hw = HK.balconyW / 2;
  const front = HK.half + HK.balconyD;
  const t = HK.railThick;
  const out: RailRect[] = [{ s0: -hw, s1: hw, d0: front - t, d1: front }];
  out.push({ s0: -hw, s1: -hw + t, d0: HK.half, d1: front - t });
  const stairsHere = h.stairs !== null && h.stairs.to === 'balcony' && h.stairs.face === h.balcony;
  const d0 = stairsHere ? HK.half + HK.railGap : HK.half;
  if (front - t - d0 >= 0.05) out.push({ s0: hw - t, s1: hw, d0, d1: front - t });
  return out;
}

// ---- stairs, awnings, pole ------------------------------------------------------------------

export function stairsHighS(h: HouseSpec): number {
  return h.stairs !== null && h.stairs.to === 'balcony' ? HK.stairHighBalcony : HK.stairHighRoof;
}

/** Slope axis of the stairs ramp: uphill toward the wall end (s = stairsHighS). */
export function stairsAxis(f: Face): number {
  return AXIS_ALONG_NEG_T[f];
}

/** Roof anchor of a pole house: 2.6 m over the deck, 2.5 m in from the +z (uphill) edge. */
export function poleAnchor(h: HouseSpec): [number, number, number] {
  return [round6(h.cx), round6(deckY(h) + HK.poleHeight), round6(h.cz + HK.half - HK.poleIn)];
}

// ---- windows --------------------------------------------------------------------------------

export interface WindowSlot {
  face: Face;
  storey: number;
  /** Tangent offset from the face centre. */
  s: number;
  /** Point on the wall plane (outer face). */
  x: number;
  z: number;
  /** Sill height (world). */
  y: number;
  w: number;
  h: number;
}

function blockedSlot(h: HouseSpec, f: Face, storey: number, s: number): boolean {
  if (storey !== 0) return false;
  if (h.awnings.indexOf(f) >= 0) return true; // shop opening instead
  return h.stairs !== null && h.stairs.face === f && s > 0; // stairs run along the +s side
}

/** Two slots per exposed face per storey, minus the ones stairs and awnings cover. */
export function windowSlots(h: HouseSpec): WindowSlot[] {
  const out: WindowSlot[] = [];
  for (let f = 0; f < 4; f++) {
    if (h.party[f]) continue;
    for (let st = 0; st < h.storeys; st++) {
      for (let k = 0; k < 2; k++) {
        const s = k === 0 ? -HK.windowAt : HK.windowAt;
        if (blockedSlot(h, f as Face, st, s)) continue;
        const p = facePoint(h, f as Face, s, HK.half);
        out.push({
          face: f as Face,
          storey: st,
          s,
          x: p[0],
          z: p[1],
          y: round6(h.groundY + HK.plinth + st * HK.storey + HK.windowSill),
          w: HK.windowW,
          h: HK.windowH,
        });
      }
    }
  }
  return out;
}

/** Windows the formula expects: 2 per storey per exposed face, minus blocked slots. */
export function expectedWindowCount(h: HouseSpec): number {
  let n = 0;
  for (let f = 0; f < 4; f++) {
    if (h.party[f]) continue;
    n += 2 * h.storeys;
    if (h.awnings.indexOf(f as Face) >= 0) n -= 2;
    else if (h.stairs !== null && h.stairs.face === f) n -= 1;
  }
  return n;
}

export interface Opening {
  face: Face;
  s: number;
  x: number;
  z: number;
  y: number;
  w: number;
  h: number;
}

/** Ground-floor shop opening on every awning face. */
export function shopOpenings(h: HouseSpec): Opening[] {
  const out: Opening[] = [];
  for (let i = 0; i < h.awnings.length; i++) {
    const f = h.awnings[i];
    const p = facePoint(h, f, 0, HK.half);
    out.push({ face: f, s: 0, x: p[0], z: p[1], y: round6(h.groundY + 0.5), w: 2.6, h: 1.8 });
  }
  return out;
}

/** Balcony door at the centre of the balcony face, first floor. */
export function balconyDoor(h: HouseSpec): Opening | null {
  if (h.balcony === -1) return null;
  const p = facePoint(h, h.balcony, 0, HK.half);
  return {
    face: h.balcony,
    s: 0,
    x: p[0],
    z: p[1],
    y: round6(h.groundY + HK.balconyTop),
    w: 1.0,
    h: 2.0,
  };
}
