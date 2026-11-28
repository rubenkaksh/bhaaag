// Graph level placer v1 (ADR 0013 section 3.3). Pure TS: graph file + seed -> houses, props, patches,
// lines and the level JSON. Frozen once a level ships (`placer: 1`); see tests/content/graphFreeze.test.ts.
import { archetype, archetypeRoof, archetypeStoreys } from '../house/archetypes';
import { emitHouse, emitProp, newDraft } from '../house/houseKit';
import { HK, RUNOUT_GAP, deckY, poleAnchor, round6 } from '../house/houseSpec';
import type { Face, HouseSpec, PropSpec } from '../house/houseSpec';
import type { LevelJson } from '../load';
import type { GraphEdge, GraphLevel } from './format';

type GraphNode = GraphLevel['nodes'][number];

/** Storeys a node fixes: its archetype's, else its own `storeys`, else undefined (the placer rolls). */
function nodeStoreys(n: GraphNode | undefined): 1 | 2 | undefined {
  if (n === undefined) return undefined;
  return n.archetype !== undefined ? archetypeStoreys(n.archetype) : n.storeys;
}

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
  /** Quarter turns (0..3) of the segment this edge was placed in; 0 / absent on unsegmented levels. */
  rot?: number;
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
  /** Segmented levels only (ADR 0015): quarter turns of the segment holding the goal house. */
  goalRot?: number;
  /** Segmented levels only: view-only ground height field that follows the road polyline. */
  field?: (x: number, z: number) => { h: number; d: number };
  /** Segmented levels only, view-only: merged world rects whose hazard top is lowered under a patch. */
  sunk?: SunkRect[];
  /** Segmented levels only, view-only: ground-mesh grid lines (patch and sunk rect edges +-0.25 m). */
  breaks?: { xs: number[]; zs: number[] };
}

export interface SunkRect {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  y: number;
}

const SUNK_MARGIN = 1; // m: hazard lowering reaches this far past a patch rect
const SUNK_DROP = 0.5; // m: hazard top (and drawn grass) under the patch top
const BREAK_D = 0.25; // m: mesh grid lines either side of every edge

function inRect(r: { x0: number; x1: number; z0: number; z1: number }, x: number, z: number): boolean {
  return x >= r.x0 - 1e-6 && x <= r.x1 + 1e-6 && z >= r.z0 - 1e-6 && z <= r.z1 + 1e-6;
}

/** Joins rects of equal top that share a full edge, until nothing more merges. */
function mergeSunk(list: SunkRect[]): SunkRect[] {
  const out = list.map((r) => ({ ...r }));
  const eq = (a: number, b: number): boolean => Math.abs(a - b) < 1e-6;
  for (let again = true; again;) {
    again = false;
    for (let i = 0; i < out.length && !again; i++)
      for (let j = i + 1; j < out.length && !again; j++) {
        const a = out[i];
        const b = out[j];
        if (!eq(a.y, b.y)) continue;
        const sameX = eq(a.x0, b.x0) && eq(a.x1, b.x1);
        const sameZ = eq(a.z0, b.z0) && eq(a.z1, b.z1);
        if (sameX && (eq(a.z1, b.z0) || eq(b.z1, a.z0))) {
          a.z0 = Math.min(a.z0, b.z0);
          a.z1 = Math.max(a.z1, b.z1);
        } else if (sameZ && (eq(a.x1, b.x0) || eq(b.x1, a.x0))) {
          a.x0 = Math.min(a.x0, b.x0);
          a.x1 = Math.max(a.x1, b.x1);
        } else continue;
        out.splice(j, 1);
        again = true;
      }
  }
  return out;
}

function sunkBreaks(
  sunk: readonly SunkRect[],
  patches: readonly { x0: number; x1: number; z0: number; z1: number }[],
): { xs: number[]; zs: number[] } {
  const xs = new Set<number>();
  const zs = new Set<number>();
  for (const r of [...sunk, ...patches])
    for (const d of [-BREAK_D, 0, BREAK_D]) {
      for (const e of [r.x0, r.x1]) xs.add(round6(e + d));
      for (const e of [r.z0, r.z1]) zs.add(round6(e + d));
    }
  return { xs: Array.from(xs).sort((a, b) => a - b), zs: Array.from(zs).sort((a, b) => a - b) };
}

/** Optional inputs that turn `layout` into one segment of a segmented level (ADR 0015). */
interface SegOpt {
  gy: (z: number) => number;
  /** Pre-placed start house, in this segment's local frame (the previous segment's last house). */
  start: HouseSpec;
  /** Houses and patches of earlier segments, in this segment's local frame. */
  ext: HouseSpec[];
  extPatches: Patch[];
  /** Plan rectangles earlier segments claimed (their hazard strips); new houses and patches stay out. */
  blocked: Patch[];
  last: boolean;
  /** Id of the house handed to the next segment (-1 on the last one); its finishing is left to that segment. */
  handoff: number;
  decoys: number;
  idBase: number;
}

interface Layout {
  houses: Map<number, HouseSpec>;
  props: PropSpec[];
  patches: Patch[];
  edges: PlacedEdge[];
  hayPos: P3 | null;
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

function layout(g: GraphLevel, seed: number, opt?: SegOpt): Layout {
  const rng = mulberry32(seed);
  const prof = g.profile;
  const gy = opt !== undefined ? opt.gy : (z: number): number => groundAt(prof, z);
  const extH = opt !== undefined ? opt.ext : [];
  const extP = opt !== undefined ? opt.extPatches : [];
  const blocked = opt !== undefined ? opt.blocked : [];
  const handoff = opt !== undefined ? opt.handoff : -1;
  const houses = new Map<number, HouseSpec>();
  const props: PropSpec[] = [];
  const patches: Patch[] = [];
  const edges: PlacedEdge[] = [];
  const chords: { p: P3; q: P3; a: number; b: number }[] = [];
  const nodeDef = new Map(g.nodes.map((n) => [n.id, n]));

  const rollStoreys = (id: number): 1 | 2 => {
    const d = nodeStoreys(nodeDef.get(id));
    const r = rng();
    return d ?? (r < 0.5 ? 1 : 2);
  };
  const all = (): HouseSpec[] => Array.from(houses.values());
  const freeOf = (h: HouseSpec, ignore: number): boolean => {
    for (const o of all())
      if (o.id !== ignore && o.id !== h.id && overlapsHouse(h, o)) return false;
    for (const p of patches) if (rectHitsHouse(p, h, -0.01)) return false;
    for (const o of extH) if (overlapsHouse(h, o)) return false;
    for (const p of extP) if (rectHitsHouse(p, h, -0.01)) return false;
    for (const r of blocked) if (rectHitsHouse(r, h, -0.01)) return false;
    for (const r of blocked) for (const p of patches) if (rectsHit(r, p)) return false;
    return true;
  };

  const start =
    opt !== undefined ? opt.start : newHouse(g.start, 0, 0, gy(0), rollStoreys(g.start));
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
      const def = nodeStoreys(nodeDef.get(bid));
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
        if (dy < -6.0 || dy > 2.8 + 1e-6) throw new Fail('touch roof difference ' + dy);
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
        // The launch zone is 3 x 3 m, so the chord crosses the face anywhere between its four
        // corner starts; the gap spans all of them (a hero hooking off-centre must not meet the
        // parapet, which is taller than the hero's step-up).
        let lo = Infinity;
        let hi = -Infinity;
        for (const sx of [-1.5, 1.5]) {
          for (const sz of [-1.5, 1.5]) {
            const z0 = zz + sz;
            const x0 = a.cx + sx;
            const t = (z0 - (a.cz - HALF)) / (z0 - an[2]);
            const xc = x0 + (an[0] - x0) * t - a.cx;
            lo = Math.min(lo, xc);
            hi = Math.max(hi, xc);
          }
        }
        if (!a.party[3])
          (a.runout ??= []).push({
            face: 3,
            s: round6((lo + hi) / 2),
            w: round6(hi - lo + RUNOUT_GAP),
          });
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
        if (opt !== undefined && deckA - (patch.y + HK.trampTop) > 8) throw new Fail('tramp drop');
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
    for (const h of all().concat(extH)) {
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

  // goal: hay on a patch below the goal house (the last segment only, when segmented)
  let hayOut: P3 | null = null;
  if (opt === undefined || opt.last) {
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
    for (const h of all().concat(extH))
      if (h.id !== goalH.id && rectHitsHouse(gp, h, -0.01)) throw new Fail('goal patch hit');
    for (const p of patches.concat(extP, blocked))
      if (rectsHit(gp, p)) throw new Fail('goal patch overlap');
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
    hayOut = hayPos;
  }

  // decoys: extra houses touching placed ones (x sides), away from patches and chords
  const route = new Set(placed);
  const base = all().filter((h) => h.id !== handoff);
  let nextId = opt !== undefined ? opt.idBase : 100;
  let want = opt !== undefined ? opt.decoys : g.decoys;
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
    if (h.id === handoff) continue;
    if (h.storeys === 2 && h.balcony === -1 && h.id >= 100 && !h.party[2] && rng() < 0.5) {
      const r: Patch = {
        x0: h.cx - 1.5,
        x1: h.cx + 1.5,
        z0: h.cz + HALF,
        z1: h.cz + HALF + 1.2,
        y: 0,
      };
      let ok = true;
      for (const o of all().concat(extH)) if (o.id !== h.id && rectHitsHouse(r, o, 0.2)) ok = false;
      for (const p of patches.concat(extP)) if (rectsHit(r, p)) ok = false;
      if (ok) h.balcony = 2;
    }
  }

  // awnings (review S4): a shop awning over the ground floor of the downhill face of decoy houses,
  // where nothing else stands (no house, patch, stairs, balcony, takeoff or run-out gap on that face).
  // Deterministic, no rng draw, so adding them does not reshuffle the seeded layout.
  for (const h of all()) {
    if (h.id === handoff) continue;
    if (h.id < 100 || h.party[3] || h.balcony === 3 || h.takeoff.indexOf(3) >= 0) continue;
    if (h.stairs !== null && h.stairs.face === 3) continue;
    const foot: Patch = {
      x0: h.cx - HK.awningW / 2 - 0.5,
      x1: h.cx + HK.awningW / 2 + 0.5,
      z0: h.cz - HALF - HK.awningD - 0.5,
      z1: h.cz - HALF,
      y: 0,
    };
    let ok = true;
    for (const o of all().concat(extH)) if (o.id !== h.id && rectHitsHouse(foot, o, 0)) ok = false;
    for (const p of patches.concat(extP)) if (rectsHit(foot, p)) ok = false;
    if (ok) h.awnings.push(3);
  }

  // parapets: tall (1.2 m, never vaultable) on every side the hero could fall from into the lethal
  // hillside: not party, takeoff, balcony, stairs or run-out faces (review M1 belt and braces; the
  // sim also refuses a vault that ends in a lethal drop).
  for (const h of all()) {
    if (h.id === handoff) continue;
    for (let f = 0; f < 4; f++) {
      if (h.party[f] || h.takeoff.indexOf(f as Face) >= 0 || h.balcony === f) continue;
      if (h.stairs !== null && h.stairs.face === f) continue;
      if ((h.runout ?? []).some((r) => r.face === f)) continue;
      const beyond = f === 3 ? gy(h.cz - 2 * HALF) : h.groundY;
      if (deckY(h) - beyond > 1.5) h.tall.push(f as Face);
    }
  }

  // kit v2 archetypes and ladder decor on nodes that ask for them; placement keeps party, takeoff,
  // run-out, pole and the lethal-side parapets. No rng draw, so nodes without one are unchanged.
  for (const h of all()) {
    if (h.id === handoff) continue; // already dressed by the previous run
    const def = nodeDef.get(h.id);
    if (def === undefined) continue;
    if (def.archetype !== undefined) {
      const over: Partial<HouseSpec> = {
        party: h.party,
        takeoff: h.takeoff,
        runout: h.runout,
        pole: h.pole,
        poleFace: h.poleFace,
      };
      if (archetypeRoof(def.archetype) !== 'gable') over.tall = h.tall;
      else over.runout = undefined;
      Object.assign(h, archetype(def.archetype, h.id, h.cx, h.cz, h.groundY, over));
      // a balcony cannot sit on a party wall either: mirror it to the opposite face
      if (h.balcony >= 0 && h.party[h.balcony as Face]) h.balcony = (h.balcony ^ 1) as Face;
      // an awning cannot sit on a party wall: mirror it to the opposite face, else drop it
      h.awnings = h.awnings
        .map((f) => (h.party[f] ? ((f ^ 1) as Face) : f))
        .filter((f) => !h.party[f]);
    }
    if (def.ladder !== undefined) h.ladder = def.ladder;
  }

  return { houses, props, patches, edges, hayPos: hayOut };
}

/** Unsegmented level: the v1 path, byte-identical since placer v1 froze (ADR 0013). */
function attempt(g: GraphLevel, seed: number): PlacedLevel {
  const L = layout(g, seed);
  const { houses, props, patches, edges } = L;
  const prof = g.profile;
  const gy = (z: number): number => groundAt(prof, z);
  const all = (): HouseSpec[] => Array.from(houses.values());
  const hayPos = L.hayPos as P3;
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
    spawn: [round6(sp.cx - 2.8), round6(deckY(sp)), sp.cz],
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
    ...(draft.ladders.length > 0 ? { ladders: draft.ladders } : {}),
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

// ---------------------------------------------------------------------------------------------
// Segmented layout (ADR 0015). Each run is placed by `layout` in its own local frame (downhill =
// -z, exactly like v1), then turned by whole quarter turns and moved onto the road polyline before
// anything is emitted. The core only ever sees finished world-frame boxes.

const FACE_ROT: readonly Face[] = [2, 3, 1, 0]; // face after one quarter turn (x, z) -> (-z, x)
const HAZARD_MARGIN = 5; // m of hazard beyond the houses' sides
const HAZARD_UP = 14; // m of hazard behind the first house
const HAZARD_DOWN = 30; // m of hazard past the last house

function rotXZ(x: number, z: number, k: number): [number, number] {
  let a = x;
  let b = z;
  for (let i = 0; i < k; i++) {
    const t = a;
    a = -b;
    b = t;
  }
  return [a, b];
}
function rotFace(f: Face, k: number): Face {
  let r = f;
  for (let i = 0; i < k; i++) r = FACE_ROT[r];
  return r;
}
/** Quarter turns that take the local downhill (-z) onto a heading (bearing, degrees). */
function turnsOf(heading: number): number {
  return ((((180 - heading) / 90) % 4) + 4) % 4;
}

interface Frame {
  k: number;
  ox: number;
  oz: number;
}
function toWorldXZ(f: Frame, x: number, z: number): [number, number] {
  const [a, b] = rotXZ(x, z, f.k);
  return [round6(a + f.ox), round6(b + f.oz)];
}
function toLocalXZ(f: Frame, x: number, z: number): [number, number] {
  const [a, b] = rotXZ(x - f.ox, z - f.oz, (4 - f.k) % 4);
  return [round6(a), round6(b)];
}
function toWorldP3(f: Frame, p: P3): P3 {
  const [x, z] = toWorldXZ(f, p[0], p[2]);
  return [x, p[1], z];
}
type MapXZ = (x: number, z: number) => [number, number];
function turnRect(r: Patch, map: MapXZ): Patch {
  const a = map(r.x0, r.z0);
  const b = map(r.x1, r.z1);
  return {
    x0: Math.min(a[0], b[0]),
    x1: Math.max(a[0], b[0]),
    z0: Math.min(a[1], b[1]),
    z1: Math.max(a[1], b[1]),
    y: r.y,
  };
}
/** Re-express a spec through a point map and a face map (positions and every per-face field). */
function moveSpec(h: HouseSpec, map: MapXZ, kf: number): HouseSpec {
  const [cx, cz] = map(h.cx, h.cz);
  const party: [boolean, boolean, boolean, boolean] = [false, false, false, false];
  for (let f = 0; f < 4; f++) party[rotFace(f as Face, kf)] = h.party[f];
  const rf = (f: Face): Face => rotFace(f, kf);
  return {
    ...h,
    ...(h.ladder !== undefined ? { ladder: rf(h.ladder) } : {}),
    cx,
    cz,
    party,
    balcony: h.balcony === -1 ? -1 : rf(h.balcony),
    stairs: h.stairs === null ? null : { face: rf(h.stairs.face), to: h.stairs.to },
    poleFace: h.pole ? rf(h.poleFace ?? 2) : h.poleFace,
    awnings: h.awnings.map(rf),
    takeoff: h.takeoff.map(rf),
    tall: h.tall.map(rf),
    runout: h.runout === undefined ? undefined : h.runout.map((r) => ({ ...r, face: rf(r.face) })),
  };
}

interface SegRec {
  frame: Frame;
  /** Path coordinate of the run's local z = 0 (the profile is indexed by it). */
  zOff: number;
  /** Ids of the houses this run placed, the handed-over last one included. */
  own: Set<number>;
  /** Plan box of the run's houses and patches, local frame. */
  box: Patch;
  first: boolean;
  last: boolean;
}

function segGround(prof: [number, number][], zOff: number): (z: number) => number {
  return (z: number): number => groundAt(prof, z + zOff);
}

function placeSegmentedOnce(g: GraphLevel, base: number): PlacedLevel {
  const segs = g.segments as NonNullable<GraphLevel['segments']>;
  const prof = g.profile;
  const world = new Map<number, HouseSpec>();
  const props: PropSpec[] = [];
  const patches: Patch[] = [];
  const edges: PlacedEdge[] = [];
  const recs: SegRec[] = [];
  let hay: P3 | null = null;
  let goalRot = 0;

  for (let i = 0; i < segs.length; i++) {
    const sg = segs[i];
    const last = i === segs.length - 1;
    const ids = new Set(sg.nodes);
    const sub: GraphLevel = {
      ...g,
      nodes: g.nodes.filter((n) => ids.has(n.id)),
      edges: g.edges.filter((e) => ids.has(e.a) && ids.has(e.b)),
      start: sg.nodes[0],
      goal: sg.nodes[sg.nodes.length - 1],
      segments: undefined,
    };
    const k = turnsOf(sg.heading);
    let frame: Frame = { k, ox: 0, oz: 0 };
    let zOff = 0;
    if (i > 0) {
      const h = world.get(sg.nodes[0]) as HouseSpec;
      const pf = recs[i - 1];
      frame = { k, ox: h.cx, oz: h.cz };
      zOff = pf.zOff + toLocalXZ(pf.frame, h.cx, h.cz)[1];
    }
    const gyLocal = segGround(prof, zOff);
    const decoys = Math.floor(g.decoys / segs.length) + (i === 0 ? g.decoys % segs.length : 0);
    const loc: MapXZ = (x, z) => toLocalXZ(frame, x, z);
    const back = (4 - k) % 4;
    let L: Layout | null = null;
    let lastErr = '';
    for (let t = 0; t < 64 && L === null; t++) {
      let start: HouseSpec;
      if (i > 0) start = moveSpec(world.get(sg.nodes[0]) as HouseSpec, loc, back);
      else {
        const r = mulberry32(base + t + 7777);
        const def = nodeStoreys(g.nodes.find((n) => n.id === sg.nodes[0]));
        start = newHouse(sg.nodes[0], 0, 0, gyLocal(0), def ?? (r() < 0.5 ? 1 : 2));
      }
      const opt: SegOpt = {
        gy: gyLocal,
        start,
        ext: Array.from(world.values())
          .filter((h) => h.id !== sg.nodes[0])
          .map((h) => moveSpec(h, loc, back)),
        extPatches: patches.map((p) => turnRect(p, loc)),
        blocked: recs.map((r) =>
          turnRect(
            turnRect(r.box, (x, z) => toWorldXZ(r.frame, x, z)),
            loc,
          ),
        ),
        last,
        handoff: last ? -1 : sg.nodes[sg.nodes.length - 1],
        decoys,
        idBase: 100 + i * 50,
      };
      try {
        L = layout(sub, base + i * 1000 + t, opt);
      } catch (err) {
        if (!(err instanceof Fail)) throw err;
        lastErr = err.message;
      }
    }
    if (L === null) throw new Fail('segment ' + i + ': ' + lastErr);

    // into the world frame
    const wmap: MapXZ = (x, z) => toWorldXZ(frame, x, z);
    const own = new Set<number>();
    let x0 = Infinity;
    let x1 = -Infinity;
    let z0 = Infinity;
    let z1 = -Infinity;
    for (const h of L.houses.values()) {
      own.add(h.id);
      x0 = Math.min(x0, h.cx - HALF);
      x1 = Math.max(x1, h.cx + HALF);
      z0 = Math.min(z0, h.cz - HALF);
      z1 = Math.max(z1, h.cz + HALF);
      world.set(h.id, moveSpec(h, wmap, k));
    }
    for (const p of L.patches) {
      x0 = Math.min(x0, p.x0);
      x1 = Math.max(x1, p.x1);
      z0 = Math.min(z0, p.z0);
      z1 = Math.max(z1, p.z1);
      patches.push(turnRect(p, wmap));
    }
    for (const p of L.props) {
      const [x, z] = wmap(p.x, p.z);
      props.push({ ...p, x, z, yaw: round6(p.yaw - (k * Math.PI) / 2) });
    }
    for (const e of L.edges) {
      const pt = (v: P3 | undefined): P3 | undefined => (v === undefined ? v : toWorldP3(frame, v));
      edges.push({
        ...e,
        takeoff: toWorldP3(frame, e.takeoff),
        landing: toWorldP3(frame, e.landing),
        prop: pt(e.prop),
        stairsFoot: pt(e.stairsFoot),
        zone: pt(e.zone),
        anchor: pt(e.anchor),
        rot: k,
      });
    }
    if (L.hayPos !== null) {
      hay = toWorldP3(frame, L.hayPos);
      goalRot = k;
    }
    recs.push({ frame, zOff, own, box: { x0, x1, z0, z1, y: 0 }, first: i === 0, last });
  }

  // emit
  const draft = newDraft();
  const ordered = Array.from(world.values()).sort((p, q) => p.id - q.id);
  for (const h of ordered) emitHouse(h, draft);
  for (const p of props) emitProp(p, draft);
  for (const p of patches) {
    draft.solids.push({ min: [p.x0, p.y - 1, p.z0], max: [p.x1, p.y, p.z1] });
    draft.style.push(0);
  }

  // hazards: per run, 1 m bands in the run's own frame (top = the drawn ground there), cut around
  // houses of other runs and lowered under every patch (any run's), then turned into world boxes.
  const hazards: { min: P3; max: P3 }[] = [];
  const sunk: SunkRect[] = [];
  const strips: { r: SegRec; xa: number; xb: number; za: number; zb: number }[] = [];
  for (const r of recs) {
    const back = (4 - r.frame.k) % 4;
    const lm = ordered
      .filter((h) => r.own.has(h.id))
      .map((h) => moveSpec(h, (x, z) => toLocalXZ(r.frame, x, z), back));
    strips.push({
      r,
      xa: Math.min(...lm.map((h) => h.cx)) - HALF - HAZARD_MARGIN,
      xb: Math.max(...lm.map((h) => h.cx)) + HALF + HAZARD_MARGIN,
      za: Math.min(...lm.map((h) => h.cz)) - (r.last ? HAZARD_DOWN : HALF),
      zb: Math.max(...lm.map((h) => h.cz)) + (r.first ? HAZARD_UP : HALF),
    });
  }
  // A later run owns the ground where strips overlap: it is lower, so a hero crossing it (a rope
  // chord) is never inside an earlier run's higher hazard.
  for (let ri = 0; ri < recs.length; ri++) {
    const r = recs[ri];
    const gyL = segGround(prof, r.zOff);
    const loc: MapXZ = (x, z) => toLocalXZ(r.frame, x, z);
    const back = (4 - r.frame.k) % 4;
    const foreign = ordered.filter((h) => !r.own.has(h.id)).map((h) => moveSpec(h, loc, back));
    const lp = patches.map((p) => turnRect(p, loc));
    const { xa, xb, za: zBot, zb: zTop } = strips[ri];
    const later = strips
      .slice(ri + 1)
      .map((st) =>
        turnRect({ x0: st.xa, x1: st.xb, z0: st.za, z1: st.zb, y: 0 }, (x, z) =>
          loc(...toWorldXZ(st.r.frame, x, z)),
        ),
      );
    const bands = Math.ceil((zTop - zBot) / HAZARD_BAND);
    for (let b = 0; b < bands; b++) {
      const z = zTop - b * HAZARD_BAND;
      const zl = z - HAZARD_BAND;
      const bandTop = Math.max(gyL(z), gyL(zl)) - 0.05;
      // lowering applies only within SUNK_MARGIN of a patch (not the whole band), see below
      const wins: [number, number, number][] = [];
      for (const p of lp)
        if (p.z1 > zl && p.z0 < z) wins.push([p.x0 - SUNK_MARGIN, p.x1 + SUNK_MARGIN, p.y - SUNK_DROP]);
      let spans: [number, number][] = [[xa, xb]];
      const cuts: [number, number][] = [];
      for (const h of foreign) {
        if (h.cz + HALF + 0.5 <= zl || h.cz - HALF - 0.5 >= z) continue;
        cuts.push([h.cx - HALF - 0.5, h.cx + HALF + 0.5]);
      }
      for (const q of later) if (q.z1 > zl && q.z0 < z) cuts.push([q.x0, q.x1]);
      for (const [c0, c1] of cuts) {
        const next: [number, number][] = [];
        for (const [a, e] of spans) {
          if (c1 <= a || c0 >= e) next.push([a, e]);
          else {
            if (c0 > a) next.push([a, c0]);
            if (c1 < e) next.push([c1, e]);
          }
        }
        spans = next;
      }
      // split every span at each window edge, then lower each piece under the windows covering it
      const pieces: [number, number][] = [];
      for (const [a, e] of spans) {
        const cutsX: number[] = [];
        for (const w of wins) for (const v of [w[0], w[1]]) if (v > a && v < e) cutsX.push(v);
        cutsX.sort((u, v) => u - v);
        const edges2 = [a, ...cutsX, e];
        for (let k = 0; k + 1 < edges2.length; k++)
          if (edges2[k + 1] - edges2[k] >= 1e-6) pieces.push([edges2[k], edges2[k + 1]]);
      }
      for (const [a, e] of pieces) {
        const mid = (a + e) / 2;
        let top = bandTop;
        for (const w of wins) if (mid > w[0] && mid < w[1]) top = Math.min(top, w[2]);
        const c0 = toWorldXZ(r.frame, a, zl);
        const c1 = toWorldXZ(r.frame, e, z);
        const hz = {
          min: [Math.min(c0[0], c1[0]), round6(top - 8), Math.min(c0[1], c1[1])] as P3,
          max: [Math.max(c0[0], c1[0]), round6(top), Math.max(c0[1], c1[1])] as P3,
        };
        hazards.push(hz);
        if (top < bandTop - 1e-9)
          sunk.push({ x0: hz.min[0], x1: hz.max[0], z0: hz.min[2], z1: hz.max[2], y: hz.max[1] });
      }
    }
  }

  // a house cut out of every strip still stands on ground: slab under its footprint
  for (const h of ordered) {
    const covered = hazards.some(
      (z) => h.cx >= z.min[0] && h.cx <= z.max[0] && h.cz >= z.min[2] && h.cz <= z.max[2],
    );
    if (covered) continue;
    const top = round6(h.groundY - 0.05);
    hazards.push({
      min: [h.cx - HALF, round6(top - 8), h.cz - HALF],
      max: [h.cx + HALF, top, h.cz + HALF],
    });
  }

  const lines: { zone: { min: P3; max: P3 }; anchor: number }[] = [];
  for (const pe of edges) {
    if (pe.kind === 'zip' && pe.zone !== undefined) {
      const bh = world.get(pe.b) as HouseSpec;
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

  const sp = world.get(g.start) as HouseSpec;
  const spawnXZ = toWorldXZ(recs[0].frame, -2.8, 0); // the first run starts at its local origin
  const hp = hay as P3;
  const minY = Math.min(...hazards.map((h) => h.min[1]));
  const level: LevelJson = {
    version: 1,
    spawn: [spawnXZ[0], round6(deckY(sp)), spawnXZ[1]],
    spawnYaw: round6((segs[0].heading * Math.PI) / 180),
    killPlaneY: round6(minY - 20),
    solids: draft.solids,
    ramps: draft.ramps,
    anchors: draft.anchors,
    goal: {
      min: [hp[0] - 1.2, round6(hp[1] - 0.5), hp[2] - 1.2],
      max: [hp[0] + 1.2, round6(hp[1] + 3), hp[2] + 1.2],
    },
    style: draft.style,
    lineOnly: 1,
    climb: 1,
    parkour: 1,
    lines,
    tramps: draft.tramps,
    cushions: draft.cushions,
    ...(draft.ladders.length > 0 ? { ladders: draft.ladders } : {}),
    hazards,
  };

  // view-only ground: each run's own profile, blended by distance to the run's hazard strip
  const profileField = (x: number, z: number): { h: number; d: number } => {
    for (const h of ordered)
      if (Math.abs(x - h.cx) <= HALF && Math.abs(z - h.cz) <= HALF) return { h: h.groundY, d: 0 };
    let sw = 0;
    let sh = 0;
    let dm = Infinity;
    let own: number | null = null; // a later run owns the ground where strips overlap (as the hazards do)
    for (const st of strips) {
      const [lx, lz] = toLocalXZ(st.r.frame, x, z);
      const d = Math.hypot(
        Math.max(st.xa - lx, 0, lx - st.xb),
        Math.max(st.za - lz, 0, lz - st.zb),
      );
      if (d < 1e-9) own = groundAt(prof, lz + st.r.zOff);
      const w = 1 / (d ** 8 + 1e-6);
      sw += w;
      sh += w * groundAt(prof, lz + st.r.zOff);
      dm = Math.min(dm, d);
    }
    return { h: own ?? sh / sw, d: dm };
  };
  // The drawn ground is the sim ground: inside every sunk hazard rect it sits at that hazard top, and
  // inside every patch rect 0.5 m under the tile top (no z-fight). Placement owns the region; the
  // mesh lattice gets vertices on the same edges (breaks) so no triangle straddles an edge.
  const mergedSunk = mergeSunk(sunk);
  const field = (x: number, z: number): { h: number; d: number } => {
    const f = profileField(x, z);
    let h = f.h;
    for (const r of mergedSunk) if (inRect(r, x, z)) h = Math.min(h, r.y);
    for (const p of patches) if (inRect(p, x, z)) h = Math.min(h, p.y - SUNK_DROP);
    return { h, d: h < f.h ? 0 : f.d };
  };
  const stripRects = strips.map((st) => {
    const c0 = toWorldXZ(st.r.frame, st.xa, st.za);
    const c1 = toWorldXZ(st.r.frame, st.xb, st.zb);
    return {
      x0: Math.min(c0[0], c1[0]),
      x1: Math.max(c0[0], c1[0]),
      z0: Math.min(c0[1], c1[1]),
      z1: Math.max(c0[1], c1[1]),
    };
  });
  const breaks = sunkBreaks(mergedSunk, [...patches, ...stripRects]);

  return {
    seed: base,
    houses: ordered,
    props,
    patches,
    edges,
    profile: prof,
    goalProp: hp,
    level,
    goalRot,
    field,
    sunk: mergedSunk,
    breaks,
  };
}

function placeSegmented(g: GraphLevel): PlacedLevel {
  let last = '';
  for (let j = 0; j < 24; j++) {
    try {
      return placeSegmentedOnce(g, g.seed + j * 104729);
    } catch (err) {
      if (!(err instanceof Fail)) throw err;
      last = err.message;
    }
  }
  throw new Error('graph ' + g.id + ': no seed for the segmented layout (' + last + ')');
}

/** Place a graph level. Tries seed .. seed+63 and returns the first that satisfies every rule. */
export function placeGraph(g: GraphLevel): PlacedLevel {
  if (g.segments !== undefined) return placeSegmented(g);
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
