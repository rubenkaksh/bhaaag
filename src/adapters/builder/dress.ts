// Nagarkot dressing for a builder level (ADR 0016 addendum): the same house kit, roof guard rails and stepped
// terrain that Nagarkot Home uses, built from the builder source plus its compiled level. Render only: the
// collider level is untouched. Lazy chunk (imported from main.ts when a builder level starts).
import type { BuilderLevel } from '../../content/builder/format';
import { HOUSE_HALF } from '../../content/builder/format';
import { buildNodeSet } from '../../content/builder/compile';
import type { LevelJson } from '../../content/load';
import { NODE_ROOF, relation } from '../../content/strategy/graph';
import { HK } from '../../content/house/houseSpec';
import type { Face } from '../../content/house/houseSpec';
import { terrainProfile, tileFootprint } from '../render/decor/homeDress';
import type { HomeBundle } from '../../app/homeAssets';

const STYLE_ROOF = 2;
const EPS = 1e-3;
const near = (a: number, b: number): boolean => Math.abs(a - b) < EPS;

/** Local face (0 +x, 1 -x, 2 +z uphill, 3 -z downhill) of `from` that points at `to`; the dominant axis wins. */
function faceToward(
  from: { x0: number; x1: number; z0: number; z1: number },
  to: { x0: number; x1: number; z0: number; z1: number },
): Face {
  const dx = (to.x0 + to.x1) / 2 - (from.x0 + from.x1) / 2;
  const dz = (to.z0 + to.z1) / 2 - (from.z0 + from.z1) / 2;
  if (Math.abs(dx) > Math.abs(dz)) return dx > 0 ? 0 : 1;
  return dz > 0 ? 2 : 3;
}
const OPPOSITE: readonly Face[] = [1, 0, 3, 2];

function hash(text: string): number {
  let h = 2166136261;
  for (let i = 0; i < text.length; i++) h = Math.imul(h ^ text.charCodeAt(i), 16777619);
  return h >>> 0;
}

/** Kit dressing and the level, in the shape startGame's `home` argument takes (no path camera). */
export function builderHome(src: BuilderLevel, level: LevelJson): HomeBundle {
  const ns = buildNodeSet(src);
  const used = ns.nodes.map(() => [false, false, false, false]);
  // Touching houses are walked across, not linked: both faces stay open (Nagarkot's usedFaces does the same).
  for (let i = 0; i < ns.nodes.length; i++) {
    for (let j = i + 1; j < ns.nodes.length; j++) {
      const a = ns.nodes[i];
      const b = ns.nodes[j];
      if (a.kind !== NODE_ROOF || b.kind !== NODE_ROOF || relation(a, b) === null) continue;
      const f = faceToward(a, b);
      used[i][f] = true;
      used[j][OPPOSITE[f]] = true;
    }
  }
  // A line or a trampoline leaves by the downhill face whatever way its target lies; a balcony is climbed from the uphill one.
  for (const n of ns.nodes) {
    if (n.kind !== NODE_ROOF) continue;
    if (n.zipTo >= 0 || n.tramps.length > 0) used[n.id][3] = true;
    if (n.balc >= 0) used[n.id][2] = true;
  }
  for (const e of src.edges) {
    const a = ns.roofOf.get(e.a);
    const b = ns.roofOf.get(e.b);
    if (a === undefined || b === undefined) continue;
    const f = faceToward(ns.nodes[a], ns.nodes[b]);
    used[a][f] = true; // the face the move leaves by, and the one it arrives on, stay open
    used[b][OPPOSITE[f]] = true;
  }
  const houses = [];
  const bodies = new Set<number>();
  const skip = new Set<number>();
  const sol = level.solids;
  const sty = level.style ?? [];
  for (const n of ns.nodes) {
    if (n.kind !== NODE_ROOF) continue;
    const h = src.houses.find((x) => x.id === n.house);
    if (h === undefined) continue;
    const guard: Face[] = [];
    if (!n.cushion) for (let f = 0; f < 4; f++) if (!used[n.id][f]) guard.push(f as Face);
    // groundY from the deck so the kit deck equals the collider deck exactly
    const groundY = n.y - HK.plinth - HK.storey * h.storeys;
    const tiles = tileFootprint(
      n.x0,
      n.x1,
      n.z0,
      n.z1,
      groundY,
      h.storeys,
      houses.length,
      guard,
      n.balc >= 0 ? 2 : -1,
    );
    // The base reaches down to the hill: the collider body's foot (a builder roof is 7 m or more up, the kit only 3).
    let foot = groundY - 1;
    for (let k = 0; k < sol.length; k++) {
      if (
        sty[k] === 1 &&
        near(sol[k].min[0], n.x0) &&
        near(sol[k].max[0], n.x1) &&
        near(sol[k].min[2], n.z0)
      )
        foot = Math.min(foot, sol[k].min[1]);
    }
    for (let k = 0; k < sol.length; k++) {
      if (
        sty[k] === 1 &&
        near(sol[k].min[0], n.x0) &&
        near(sol[k].max[0], n.x1) &&
        near(sol[k].min[2], n.z0) &&
        near(sol[k].max[2], n.z1)
      )
        bodies.add(k);
    }
    for (const t of tiles) {
      t.below = groundY - foot + 0.5;
      houses.push(t);
    }
    for (let k = 0; k < sol.length; k++) {
      if (sty[k] !== STYLE_ROOF) continue;
      const b = sol[k];
      if (
        near(b.min[0], n.x0) &&
        near(b.max[0], n.x1) &&
        near(b.min[2], n.z0) &&
        near(b.max[2], n.z1) &&
        near(b.max[1], n.y)
      )
        skip.add(k);
    }
  }
  if (HOUSE_HALF !== HK.half) throw new Error('builder house size differs from the kit');
  // Step blocks (boxes, stairs) share the body style but are not house bodies: no kit draws them.
  const keep = (i: number): boolean => sty[i] === 1 && !bodies.has(i);
  return {
    level,
    graph: {
      keep,
      houses,
      props: [],
      profile: terrainProfile(level.hazards ?? []),
      seed: hash(src.id),
      look: 'home',
      patches: [],
      kitSkip: (i: number) => skip.has(i),
      field: undefined,
    },
    pathCam: null,
  };
}
