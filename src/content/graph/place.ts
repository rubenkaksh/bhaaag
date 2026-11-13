// Graph level placer v1 (ADR 0013 section 3.3). Pure TS: graph file + seed -> houses, props, patches,
// lines and the level JSON. Frozen once a level ships (`placer: 1`); see tests/content/graphFreeze.test.ts.
import { emitHouse, emitProp, newDraft } from '../house/houseKit';
import { HK, deckY, poleAnchor, round6 } from '../house/houseSpec';
import type { Face, HouseSpec, PropSpec } from '../house/houseSpec';
import type { LevelJson } from '../load';
import type { GraphEdge, GraphLevel } from './format';

export type P3 = [number, number, number];

export interface Patch {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  y: number;
}

export interface PlacedEdge {
  a: number;
  b: number;
  kind: GraphEdge['kind'];
  via?: GraphEdge['via'];
  /** b's roof is higher than a's by more than 0.3 m. */
  up: boolean;
  /** Where the hero stands/leaves on a. */
  takeoff: P3;
  /** Where the hero should end up (b roof point, zip landing, hay centre). */
  landing: P3;
  /** Prop centre (hay / tramp top) for gap edges. */
  prop?: P3;
  /** Foot of b's stairs on the patch (cushion/stairs). */
  stairsFoot?: P3;
  zone?: P3;
  anchor?: P3;
}

export interface PlacedLevel {
  seed: number;
  houses: HouseSpec[];
  props: PropSpec[];
  patches: Patch[];
  edges: PlacedEdge[];
  profile: [number, number][];
  goalProp: P3;
  level: LevelJson;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function groundAt(profile: [number, number][], z: number): number {
  if (z >= profile[0][0]) {
    const s = (profile[1][1] - profile[0][1]) / (profile[1][0] - profile[0][0]);
    return profile[0][1] + (z - profile[0][0]) * s;
  }
  for (let i = 1; i < profile.length; i++) {
    if (z >= profile[i][0]) {
      const t = (z - profile[i - 1][0]) / (profile[i][0] - profile[i - 1][0]);
      return profile[i - 1][1] + t * (profile[i][1] - profile[i - 1][1]);
    }
  }
  return profile[profile.length - 1][1];
}

class Fail extends Error {}

const HALF = HK.half;
const HAZARD_BAND = 1; // m of z per hazard slab

function overlapsHouse(a: HouseSpec, b: HouseSpec): boolean {
  return Math.abs(a.cx - b.cx) < 2 * HALF - 1e-6 && Math.abs(a.cz - b.cz) < 2 * HALF - 1e-6;
}
function rectHitsHouse(r: Patch, h: HouseSpec, pad: number): boolean {
  return (
    r.x0 < h.cx + HALF + pad &&
    r.x1 > h.cx - HALF - pad &&
    r.z0 < h.cz + HALF + pad &&
    r.z1 > h.cz - HALF - pad
  );
}
function rectsHit(a: Patch, b: Patch): boolean {
  return a.x0 < b.x1 && a.x1 > b.x0 && a.z0 < b.z1 && a.z1 > b.z0;
}

function segHitsBox(p: P3, q: P3, min: P3, max: P3): boolean {
  let t0 = 0;
  let t1 = 1;
  for (let i = 0; i < 3; i++) {
    const d = q[i] - p[i];
    if (Math.abs(d) < 1e-9) {
      if (p[i] < min[i] || p[i] > max[i]) return false;
    } else {
      let a = (min[i] - p[i]) / d;
      let b = (max[i] - p[i]) / d;
      if (a > b) [a, b] = [b, a];
      t0 = Math.max(t0, a);
      t1 = Math.min(t1, b);
      if (t0 > t1) return false;
    }
  }
  return true;
}

function newHouse(id: number, cx: number, cz: number, g: number, storeys: 1 | 2): HouseSpec {
  return {
    id,
    cx: round6(cx),
    cz: round6(cz),
    groundY: round6(g),
    storeys,
    party: [false, false, false, false],
    balcony: -1,
    stairs: null,
    awnings: [],
    takeoff: [],
    pole: false,
    tall: [],
    runout: [],
  };
}

function attempt(g: GraphLevel, seed: number): PlacedLevel {
  const rng = mulberry32(seed);
  const prof = g.profile;
  const gy = (z: number): number => groundAt(prof, z);
  const houses = new Map<number, HouseSpec>();
  const props: PropSpec[] = [];
  const patches: Patch[] = [];
  const edges: PlacedEdge[] = [];
  const chords: { p: P3; q: P3; a: number; b: number }[] = [];
  const nodeDef = new Map(g.nodes.map((n) => [n.id, n]));

  const rollStoreys = (id: number): 1 | 2 => {
    const d = nodeDef.get(id)?.storeys;
    const r = rng();
    return d ?? (r < 0.5 ? 1 : 2);
  };
  const all = (): HouseSpec[] => Array.from(houses.values());
  const freeOf = (h: HouseSpec, ignore: number): boolean => {
    for (const o of all())
      if (o.id !== ignore && o.id !== h.id && overlapsHouse(h, o)) return false;
    for (const p of patches) if (rectHitsHouse(p, h, -0.01)) return false;
    return true;
  };

  const start = newHouse(g.start, 0, 0, gy(0), rollStoreys(g.start));
  houses.set(g.start, start);

  const placed = new Set<number>([g.start]);
  const queue: number[] = [g.start];
  const done = new Set<GraphEdge>();
  let uphill = 0;

  const markParty = (a: HouseSpec, fa: Face, b: HouseSpec, fb: Face): void => {
    a.party[fa] = true;
    b.party[fb] = true;
  };

  const placeEdge = (e: GraphEdge, a: HouseSpec, bid: number, flip: boolean): void => {
    let tries = 0;
    for (;;) {
      const def = nodeDef.get(bid)?.storeys;
      const sb: 1 | 2 = def ?? (rng() < 0.5 ? 1 : 2);
      tries++;
      try {
        const ret = tryEdge(e, a, bid, sb, flip);
        if (ret.up && ret.dy > 0.3) {
          uphill++;
          if (uphill > Math.max(1, Math.floor(g.edges.length / 5))) throw new Fail('uphill budget');
        }
        return;
      } catch (err) {
        if (!(err instanceof Fail)) throw err;
        if (tries >= 4 || def !== undefined) throw err;
      }
    }
  };

  const tryEdge = (
    e: GraphEdge,
    a: HouseSpec,
    bid: number,
    sb: 1 | 2,
    flip: boolean,
  ): { up: boolean; dy: number } => {
    const deckA = deckY(a);
    // snapshot for rollback on failure
    const snapPatches = patches.length;
    const snapProps = props.length;
    const snapEdges = edges.length;
    const snapChords = chords.length;
    const snapParty = a.party.slice() as HouseSpec['party'];
    const snapTakeoff = a.takeoff.slice();
    const snapRunout = (a.runout ?? []).slice();
    const rollback = (): void => {
      houses.delete(bid);
      patches.length = snapPatches;
      props.length = snapProps;
      edges.length = snapEdges;
      chords.length = snapChords;
      a.party = snapParty;
      a.takeoff = snapTakeoff;
      a.runout = snapRunout;
    };
    try {
      let b: HouseSpec;
      const pe: PlacedEdge = {
        a: flip ? bid : a.id,
        b: flip ? a.id : bid,
        kind: e.kind,
        via: e.via,
        up: false,
        takeoff: [0, 0, 0],
        landing: [0, 0, 0],
      };
      if (e.kind === 'touch') {
        const side = rng() < 2 / 3;
        const sign = rng() < 0.5 ? 1 : -1;
        if (side) {
          b = newHouse(bid, a.cx + sign * 8, a.cz, gy(a.cz), sb);
          if (sign > 0) markParty(a, 0, b, 1);
          else markParty(a, 1, b, 0);
        } else {
          b = newHouse(bid, a.cx, a.cz - 8, gy(a.cz - 8), sb);
          markParty(a, 3, b, 2);
        }
        houses.set(bid, b);
        const dy = deckY(b) - deckA;
        if (dy < -6.0 || dy > 2.8) throw new Fail('touch roof difference ' + dy);
        pe.up = dy > 0.3;
        pe.takeoff = [a.cx, deckA, a.cz];
        pe.landing = [b.cx, deckY(b), b.cz];
        edges.push(pe);
        if (!freeOf(b, a.id)) throw new Fail('touch overlap');
        return { up: pe.up, dy };
      }
      if (e.kind === 'zip') {
        const zz = a.cz - 2;
        const dz = 14 + rng() * 12;
        const lat = (rng() * 2 - 1) * 8;
        const bz = zz - dz - 1.5; // anchor sits 1.5 m uphill of the house centre
        b = newHouse(bid, a.cx + lat, bz, gy(bz), sb);
        b.pole = true;
        houses.set(bid, b);
        const an = poleAnchor(b);
        const hand: P3 = [a.cx, deckA + 2, zz];
        const hd = Math.hypot(an[0] - hand[0], an[2] - hand[2]);
        const drop = hand[1] - an[1];
        const slope = (Math.atan2(drop, hd) * 180) / Math.PI;
        const len = Math.hypot(hd, drop);
        if (slope < 13 || slope > 35 || len > 32)
          throw new Fail('rope slope/len ' + slope + ' ' + len);
        if (!freeOf(b, a.id)) throw new Fail('zip overlap');
        pe.takeoff = [a.cx, deckA, zz];
        pe.zone = [a.cx, deckA, zz];
        pe.anchor = an;
        pe.landing = [an[0], deckY(b), an[2]];
        pe.up = false;
        edges.push(pe);
        chords.push({ p: hand, q: an, a: a.id, b: bid });
        // The launch face keeps its windows and parapet, cut by a 1.6 m run-out gap where the rope
        // chord crosses it (review M3); the rest of the face stays closed so a runner cannot walk off.
        a.takeoff = a.takeoff.filter((f) => f !== 3);
        const crossT = (zz - (a.cz - HALF)) / (zz - an[2]);
        if (!a.party[3]) (a.runout ??= []).push({ face: 3, s: round6((an[0] - a.cx) * crossT) });
        return { up: false, dy: deckY(b) - deckA };
      }
      // gap edges
      const via = e.via ?? 'jump';
      if (via === 'jump') {
        const gap = 2.5 + rng();
        b = newHouse(bid, a.cx, a.cz - 8 - gap, gy(a.cz - 8 - gap), sb);
        houses.set(bid, b);
        const dy = deckY(b) - deckA;
        if (dy < -3 || dy > 0) throw new Fail('jump roof difference');
        if (!freeOf(b, a.id)) throw new Fail('jump overlap');
        a.takeoff.push(3);
        pe.takeoff = [a.cx, deckA, a.cz - 3.5];
        pe.landing = [b.cx, deckY(b), b.cz];
        edges.push(pe);
        return { up: false, dy };
      }
      const gap = 4 + rng() * 2;
      const bz = a.cz - 8 - gap;
      b = newHouse(bid, a.cx, bz, gy(bz), sb);
      houses.set(bid, b);
      const dy = deckY(b) - deckA;
      const patch: Patch = {
        x0: round6(a.cx - 6.5),
        x1: round6(a.cx + 4),
        z0: round6(a.cz - HALF - gap),
        z1: round6(a.cz - HALF),
        y: round6(b.groundY),
      };
      if (via === 'tramp') {
        if (deckY(b) > b.groundY + HK.trampTop + 4.1 + 2.05 - 0.3) throw new Fail('tramp too high');
        if (dy > 2.8) throw new Fail('tramp uphill too big');
        patches.push(patch);
        props.push({ kind: 'tramp', x: a.cx, z: a.cz - HALF - 2.5, groundY: patch.y, yaw: 0 });
        b.takeoff = [];
        a.takeoff.push(3);
        pe.takeoff = [a.cx, deckA, a.cz - 3.5];
        pe.prop = [a.cx, patch.y + HK.trampTop, a.cz - HALF - 2.5];
        pe.landing = [b.cx, deckY(b), b.cz];
        pe.up = dy > 0.3;
      } else {
        // cushion / boxes / stairs: hay at the foot of a, stairs on b up from the patch
        if (dy > 2.8 + 1e-6) throw new Fail('stairs uphill too big');
        if (via !== 'stairs' && sb === 2 && via === 'cushion') {
          b.balcony = 2;
          b.stairs = { face: 2, to: 'balcony' };
        } else if (sb === 1) {
          b.stairs = { face: 2, to: 'roof' };
        } else {
          b.balcony = 2;
          b.stairs = { face: 2, to: 'balcony' };
        }
        patches.push(patch);
        if (via !== 'stairs') {
          props.push({
            kind: via === 'boxes' ? 'boxPile' : 'hay',
            x: a.cx,
            z: a.cz - HALF - 1.6,
            groundY: patch.y,
            yaw: 0,
          });
        }
        a.takeoff.push(3);
        pe.takeoff = [a.cx, deckA, a.cz - 3.5];
        pe.prop = [
          a.cx,
          patch.y + (via === 'boxes' ? HK.boxPileTop : HK.hayTop),
          a.cz - HALF - 1.6,
        ];
        pe.stairsFoot = [b.cx - 3, patch.y, bz + HALF + 0.5];
        pe.landing = [b.cx, deckY(b), b.cz];
        pe.up = dy > 0.3;
      }
      if (!freeOf(b, a.id)) throw new Fail('gap overlap');
      edges.push(pe);
      return { up: pe.up, dy };
    } catch (err) {
      rollback();
      throw err;
    }
  };

  // BFS
  while (queue.length > 0) {
    const id = queue.shift() as number;
    const a = houses.get(id) as HouseSpec;
    for (const e of g.edges) {
      if (done.has(e)) continue;
      let other: number;
      let flip = false;
      if (e.a === id) other = e.b;
      else if (e.kind === 'touch' && e.b === id) {
        other = e.a;
        flip = true;
      } else continue;
      done.add(e);
      if (placed.has(other)) continue;
      placeEdge(e, a, other, flip);
      placed.add(other);
      queue.push(other);
    }
  }

  // chord clearance against every other house
  for (const c of chords) {
    for (const h of all()) {
      if (h.id === c.a || h.id === c.b) continue;
      const top = deckY(h) + 1.2 + 0.3;
      const min: P3 = [h.cx - HALF - 0.3, h.groundY - HK.bodyBelow, h.cz - HALF - 0.3];
      const max: P3 = [h.cx + HALF + 0.3, top, h.cz + HALF + 0.3];
      for (const dy of [0, -1, -2]) {
        if (segHitsBox([c.p[0], c.p[1] + dy, c.p[2]], [c.q[0], c.q[1] + dy, c.q[2]], min, max)) {
          throw new Fail('chord blocked');
        }
      }
    }
  }

  // goal: hay on a patch below the goal house
  const goalH = houses.get(g.goal) as HouseSpec;
  const gp: Patch = {
    x0: round6(goalH.cx - 4),
    x1: round6(goalH.cx + 4),
    z0: round6(goalH.cz - HALF - 5),
    z1: round6(goalH.cz - HALF),
    y: round6(gy(goalH.cz - HALF - 5)),
  };
  const hayPos: P3 = [goalH.cx, gp.y + HK.hayTop, goalH.cz - HALF - 1.6];
  goalH.takeoff = goalH.takeoff.filter((f) => f !== 3);
  goalH.takeoff.push(3);
  if (goalH.party[3]) throw new Fail('goal downhill face is party');
  for (const h of all())
    if (h.id !== goalH.id && rectHitsHouse(gp, h, -0.01)) throw new Fail('goal patch hit');
  for (const p of patches) if (rectsHit(gp, p)) throw new Fail('goal patch overlap');
  patches.push(gp);
  props.push({ kind: 'hay', x: hayPos[0], z: hayPos[2], groundY: gp.y, yaw: 0 });
  edges.push({
    a: goalH.id,
    b: 0,
    kind: 'gap',
    via: 'cushion',
    up: false,
    takeoff: [goalH.cx, deckY(goalH), goalH.cz - 3.5],
    landing: hayPos,
    prop: hayPos,
  });

  // decoys: extra houses touching placed ones (x sides), away from patches and chords
  const route = new Set(placed);
  const base = all();
  let nextId = 100;
  let want = g.decoys;
  for (let guard = 0; guard < 200 && want > 0; guard++) {
    const host = base[Math.floor(rng() * base.length)];
    const sign = rng() < 0.5 ? 1 : -1;
    const d = newHouse(nextId, host.cx + sign * 8, host.cz, host.groundY, rng() < 0.5 ? 1 : 2);
    if (!freeOf(d, -1)) continue;
    // not under a chord
    let blocked = false;
    for (const c of chords) {
      const min: P3 = [d.cx - HALF - 0.3, d.groundY - 2, d.cz - HALF - 0.3];
      const max: P3 = [d.cx + HALF + 0.3, deckY(d) + 1.5, d.cz + HALF + 0.3];
      for (const dy of [0, -1, -2]) {
        if (segHitsBox([c.p[0], c.p[1] + dy, c.p[2]], [c.q[0], c.q[1] + dy, c.q[2]], min, max))
          blocked = true;
      }
    }
    if (blocked) continue;
    const hf: Face = sign > 0 ? 0 : 1;
    if (host.party[hf]) continue;
    host.party[hf] = true;
    d.party[(hf ^ 1) as Face] = true;
    houses.set(nextId++, d);
    base.push(d);
    want--;
  }
  void route;

  // balconies: random on free uphill faces of 2-storey houses that nothing uses
  for (const h of all()) {
    if (h.storeys === 2 && h.balcony === -1 && h.id >= 100 && !h.party[2] && rng() < 0.5) {
      const r: Patch = {
        x0: h.cx - 1.5,
        x1: h.cx + 1.5,
        z0: h.cz + HALF,
        z1: h.cz + HALF + 1.2,
        y: 0,
      };
      let ok = true;
      for (const o of all()) if (o.id !== h.id && rectHitsHouse(r, o, 0.2)) ok = false;
      for (const p of patches) if (rectsHit(r, p)) ok = false;
      if (ok) h.balcony = 2;
    }
  }

  // parapets: tall (1.2 m, never vaultable) on every side the hero could fall from into the lethal
  // hillside: not party, takeoff, balcony, stairs or run-out faces (review M1 belt and braces; the
  // sim also refuses a vault that ends in a lethal drop).
  for (const h of all()) {
    for (let f = 0; f < 4; f++) {
      if (h.party[f] || h.takeoff.indexOf(f as Face) >= 0 || h.balcony === f) continue;
      if (h.stairs !== null && h.stairs.face === f) continue;
      if ((h.runout ?? []).some((r) => r.face === f)) continue;
      const beyond = f === 3 ? gy(h.cz - 2 * HALF) : h.groundY;
      if (deckY(h) - beyond > 1.5) h.tall.push(f as Face);
    }
  }

  // emit
  const draft = newDraft();
  const ordered = all().sort((p, q) => p.id - q.id);
  for (const h of ordered) emitHouse(h, draft);
  for (const p of props) emitProp(p, draft);
  for (const p of patches) {
    draft.solids.push({ min: [p.x0, p.y - 1, p.z0], max: [p.x1, p.y, p.z1] });
    draft.style.push(0);
  }

  // hazards: 1 m bands down the hill whose top is the visible terrain (the highest point of the
  // band), so death happens where the hero touches the drawn ground (review M2). Lower under patches.
  const hazards: { min: P3; max: P3 }[] = [];
  const zTop = Math.max(...ordered.map((h) => h.cz)) + 14;
  const zBot = Math.min(...ordered.map((h) => h.cz)) - 30;
  const bands = Math.ceil((zTop - zBot) / HAZARD_BAND);
  for (let k = 0; k < bands; k++) {
    const z = zTop - k * HAZARD_BAND;
    const zl = z - HAZARD_BAND;
    let top = Math.max(gy(z), gy(zl)) - 0.05;
    for (const p of patches) if (p.z1 > zl && p.z0 < z) top = Math.min(top, p.y - 0.5);
    hazards.push({ min: [-90, round6(top - 8), round6(zl)], max: [90, round6(top), round6(z)] });
  }

  const lines: { zone: { min: P3; max: P3 }; anchor: number }[] = [];
  for (const pe of edges) {
    if (pe.kind === 'zip' && pe.zone !== undefined) {
      const bh = houses.get(pe.b) as HouseSpec;
      const zc = pe.zone;
      lines.push({
        zone: {
          min: [zc[0] - 1.5, zc[1], zc[2] - 1.5],
          max: [zc[0] + 1.5, zc[1] + 0.05, zc[2] + 1.5],
        },
        anchor: draft.poleAnchorIds[bh.id],
      });
    }
  }

  const sp = houses.get(g.start) as HouseSpec;
  const minY = Math.min(...hazards.map((h) => h.min[1]));
  const level: LevelJson = {
    version: 1,
    spawn: [sp.cx, round6(deckY(sp)), sp.cz],
    spawnYaw: Math.PI,
    killPlaneY: round6(minY - 20),
    solids: draft.solids,
    ramps: draft.ramps,
    anchors: draft.anchors,
    goal: {
      min: [hayPos[0] - 1.2, round6(hayPos[1] - 0.5), hayPos[2] - 1.2],
      max: [hayPos[0] + 1.2, round6(hayPos[1] + 3), hayPos[2] + 1.2],
    },
    style: draft.style,
    lineOnly: 1,
    climb: 1,
    parkour: 1,
    lines,
    tramps: draft.tramps,
    cushions: draft.cushions,
    hazards,
  };
  return {
    seed,
    houses: ordered,
    props,
    patches,
    edges,
    profile: prof,
    goalProp: hayPos,
    level,
  };
}

/** Place a graph level. Tries seed .. seed+63 and returns the first that satisfies every rule. */
export function placeGraph(g: GraphLevel): PlacedLevel {
  let last = '';
  for (let k = 0; k < 64; k++) {
    try {
      return attempt(g, g.seed + k);
    } catch (err) {
      if (!(err instanceof Fail)) throw err;
      last = err.message;
    }
  }
  throw new Error('graph ' + g.id + ': no seed in 64 tries (' + last + ')');
}
