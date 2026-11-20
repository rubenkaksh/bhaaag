// nagarkot-home render dressing (T336b): turns the generator's StrategyLevel into the kit inputs
// levelView needs (HouseSpec[], stepped ground profile, which collider solids the kit replaces).
// Pure TypeScript, no three. Lazy: the level view imports this module only when the level starts, so
// it stays out of the initial chunk (PRODUCT.md 17g).
//
// What is dressed, and what stays a collider box (never both at the same coordinates):
//  - every roof node (style 1 body + style 2 deck) -> 1..N joined kit houses; the collider body and
//    deck are skipped in levelView (`kitSkip`), the kit draws walls, plinth and deck at the same spot;
//  - a long node (4 x 8 m, the sprint runs) tiles into a terrace of joined houses with party walls and one roofline;
//  - roof guards: a render-only 0.45 m parapet on every face no route move crosses (the sim has no solid for it, so a
//    crossed face stays open); cushion roofs get none. Faces turn with the bend;
//  - a node with a balcony node gets the kit balcony (door, deck, rails) on its uphill face over the collider slab, which
//    stays drawn: it is 8 m wide, the kit balcony 3 m, and the hero can stand on all of the slab;
//  - roads, tramps, cushions, zones and rope posts keep their collider look;
//  - the 1 m hazard bands are not drawn; the stepped terrain follows them and the gully fringe marks
//    the lethal ground beside each house.
import type { StrategyLevel } from '../../../content/strategy/gen';
import { HAZARD_LIP } from '../../../content/strategy/gen';
import type { Box } from '../../../content/strategy/gen';
import { NODE_ROOF, relation } from '../../../content/strategy/graph';
import type { MazeNode } from '../../../content/strategy/graph';
import { HK, deckY } from '../../../content/house/houseSpec';
import type { Face, HouseSpec, PropSpec } from '../../../content/house/houseSpec';
import type { GullyPatch } from '../gully';

const STYLE_ROOF = 2;
const EPS = 1e-3;
const SLOPE_M = 0.5; // a terrace step is drawn over this much z, so the profile stays strictly decreasing

export interface HomeDressing {
  houses: HouseSpec[];
  props: PropSpec[];
  profile: [number, number][];
  patches: GullyPatch[];
  seed: number;
  look: 'home';
  /** Level solid indices the kit replaces (roof decks); bodies are skipped by style in levelView. */
  skip: Set<number>;
  /** Same set as a predicate, the shape levelView's `graph.kitSkip` takes. */
  kitSkip: (solidIndex: number) => boolean;
  /** Bent level (T337): the view-only ground that follows the turned run; absent for a straight level. */
  field?: (x: number, z: number) => { h: number; d: number };
  /** Kit houses per roof node, in node order (1 for every 8 x 8 node). */
  perNode: number[];
}

/** Kit houses tiling a footprint: one per 8 m cell, joined by party walls on shared faces. */
export function tileFootprint(
  x0: number,
  x1: number,
  z0: number,
  z1: number,
  groundY: number,
  storeys: 1 | 2,
  idBase: number,
  guard: readonly Face[] = [],
  balcony: Face | -1 = -1,
): HouseSpec[] {
  const cell = 2 * HK.half;
  const nx = Math.max(1, Math.round((x1 - x0) / cell));
  const nz = Math.max(1, Math.round((z1 - z0) / cell));
  const out: HouseSpec[] = [];
  for (let iz = 0; iz < nz; iz++) {
    for (let ix = 0; ix < nx; ix++) {
      const party: [boolean, boolean, boolean, boolean] = [
        ix < nx - 1, // +x
        ix > 0, // -x
        iz < nz - 1, // +z
        iz > 0, // -z
      ];
      out.push({
        id: idBase + out.length,
        cx: x0 + ((ix + 0.5) * (x1 - x0)) / nx,
        cz: z0 + ((iz + 0.5) * (z1 - z0)) / nz,
        groundY,
        storeys,
        party,
        // the balcony hangs on the uphill face of the uphill-most tile only, and only on a 2-storey house
        balcony: storeys === 2 && balcony !== -1 && !party[balcony] ? balcony : (-1 as Face | -1),
        stairs: null,
        awnings: [],
        takeoff: [],
        pole: false,
        tall: [],
        guard: guard.slice(),
      });
    }
  }
  return out;
}

function near(a: number, b: number): boolean {
  return Math.abs(a - b) < EPS;
}

function profileAt(p: [number, number][], z: number): number {
  if (z >= p[0][0]) return p[0][1] + ((z - p[0][0]) * (p[1][1] - p[0][1])) / (p[1][0] - p[0][0]);
  for (let i = 1; i < p.length; i++) {
    if (z >= p[i][0])
      return p[i - 1][1] + ((z - p[i - 1][0]) / (p[i][0] - p[i - 1][0])) * (p[i][1] - p[i - 1][1]);
  }
  const n = p.length;
  return p[n - 1][1];
}

const HILL_HALF = 34; // terrain.ts HILL_HALF_X
const SEAM0 = 26; // world X where the straight hill starts giving way to the turned run
const SEAM1 = 40;
const SOUTH_GRADE = 0.4; // m of drop per m south of the turned run (the hill's grade, about 0.4)

// The bent ground: the straight hill (local frame) west of the corner, the same hill turned 90 degrees east of it.
function bentField(
  p: [number, number][],
  zr: number,
  xE: number,
): (x: number, z: number) => { h: number; d: number } {
  return (x, z) => {
    const h1 = profileAt(p, z);
    const d1 = Math.max(0, Math.abs(x) - HILL_HALF);
    // South of the turned road (downhill of the corner) the land keeps falling at the hill's own grade
    // instead of staying level, so it never stands above the valley the lane is heading into.
    const h2 = profileAt(p, zr + xE - x) - SOUTH_GRADE * Math.max(0, zr - HILL_HALF - z);
    const d2 = Math.max(0, Math.abs(z - zr) - HILL_HALF);
    const t = Math.max(0, Math.min(1, (x - SEAM0) / (SEAM1 - SEAM0)));
    // North of the turned road (uphill of the corner) the nearer road is the first run: keep its descent
    // there, or the east land stays a flat shelf above the lane and covers the painted foothills
    // (owner 2026-11-18: "one part of the drawing is blocking the background"). r: 0 on the turned
    // road's band, 1 beside the first run.
    const dN = Math.max(0, z - zr - HILL_HALF);
    const r = dN + d1 > 0 ? dN / (dN + d1) : 0;
    const q = 1 - Math.max(0, Math.min(1, (r - 0.35) / 0.3));
    const w = t * t * (3 - 2 * t) * (q * q * (3 - 2 * q));
    return { h: h1 + w * (h2 - h1), d: d1 + w * (d2 - d1) };
  };
}

// Local-frame face (0 +x, 1 -x, 2 +z uphill, 3 -z downhill) -> world face for a node after the bend (T337 turns local -z into world +x).
const BEND_FACE: readonly Face[] = [2, 3, 1, 0];
const OPPOSITE: readonly Face[] = [1, 0, 3, 2];

/** Faces of a local node a route-graph move crosses, leaving it or arriving on it: no guard there. */
function usedFaces(s: StrategyLevel, id: number): boolean[] {
  const used = [false, false, false, false];
  const nodes = s.nodes;
  const a = nodes[id];
  for (let k = 0; k < s.graph.edges.length; k++) {
    const e = s.graph.edges[k];
    if (e.from !== id && e.to !== id) continue;
    const from: MazeNode = nodes[e.from];
    const to: MazeNode = nodes[e.to];
    const rel = relation(from, to);
    if (e.from === id && from.zipTo >= 0 && rel === null) used[3] = true; // a line leaves the downhill edge
    if (rel === null) continue;
    let f: Face = 3;
    if (rel.lateral) f = to.x0 >= from.x1 ? 0 : 1;
    else if (!rel.downhill) f = 2;
    used[e.from === id ? f : OPPOSITE[f]] = true;
  }
  if (a.tramps.length > 0 || a.zipTo >= 0) used[3] = true;
  return used;
}

/** Stepped ground profile [z, y] from the lethal hazard bands: one flat terrace per band, 0.2 m under the lethal top. */
export function terrainProfile(hazards: readonly Box[]): [number, number][] {
  const bands = hazards.slice().sort((a, b) => b.max[2] - a.max[2]);
  const profile: [number, number][] = [];
  for (let k = 0; k < bands.length; k++) {
    const y = bands[k].max[1] - HAZARD_LIP;
    const zHi = k === 0 ? bands[k].max[2] : bands[k].max[2] - SLOPE_M / 2;
    const zLo = k === bands.length - 1 ? bands[k].min[2] : bands[k].min[2] + SLOPE_M / 2;
    if (profile.length === 0 || zHi < profile[profile.length - 1][0]) profile.push([zHi, y]);
    if (zLo < profile[profile.length - 1][0]) profile.push([zLo, y]);
  }
  if (profile.length === 0) profile.push([0, 0]);
  if (profile.length < 2) profile.push([profile[0][0] - 1, profile[0][1]]);
  return profile;
}

export function dressNagarkotHome(s: StrategyLevel): HomeDressing {
  const houses: HouseSpec[] = [];
  const perNode: number[] = [];
  const skip = new Set<number>();
  const sol = s.level.solids;
  const sty = s.level.style ?? [];
  const wn = s.world?.nodes ?? s.nodes;
  for (let i = 0; i < wn.length; i++) {
    const n = wn[i];
    if (n.kind !== NODE_ROOF) continue;
    const h = s.layout.houses[n.house];
    const storeys: 1 | 2 = h.h > 4.5 ? 2 : 1;
    // groundY from the deck so the kit deck equals the collider deck exactly
    const groundY = n.y - HK.plinth - HK.storey * storeys;
    const bent = s.world !== undefined && s.world.tail[i];
    const guard: Face[] = [];
    if (!n.cushion) {
      const used = usedFaces(s, i);
      for (let f = 0; f < 4; f++) if (!used[f]) guard.push((bent ? BEND_FACE[f] : f) as Face);
    }
    const balc: Face | -1 = n.balc >= 0 ? ((bent ? BEND_FACE[2] : 2) as Face) : -1;
    const tiles = tileFootprint(
      n.x0,
      n.x1,
      n.z0,
      n.z1,
      groundY,
      storeys,
      houses.length,
      guard,
      balc,
    );
    for (let k = 0; k < tiles.length; k++) houses.push(tiles[k]);
    perNode.push(tiles.length);
    // the collider deck slab on this footprint (style 2, same rect, top at n.y)
    for (let k = 0; k < sol.length; k++) {
      if (sty[k] !== STYLE_ROOF) continue;
      const b = sol[k];
      if (
        near(b.min[0], n.x0) &&
        near(b.max[0], n.x1) &&
        near(b.min[2], n.z0) &&
        near(b.max[2], n.z1) &&
        near(b.max[1], n.y)
      ) {
        skip.add(k);
      }
    }
  }

  const profile = terrainProfile(s.world?.local.hazards ?? s.level.hazards ?? []);

  // sanity: kit decks must match the collider decks
  for (let i = 0; i < houses.length; i++) deckY(houses[i]);

  return {
    houses,
    props: [],
    profile,
    patches: [],
    seed: s.seed,
    look: 'home',
    skip,
    field: s.world === undefined ? undefined : bentField(profile, s.world.zr, s.world.xEast),
    kitSkip: (i: number) => skip.has(i),
    perNode,
  };
}
