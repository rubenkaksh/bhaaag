// nagarkot-home render dressing (T336b): turns the generator's StrategyLevel into the kit inputs
// levelView needs (HouseSpec[], stepped ground profile, which collider solids the kit replaces).
// Pure TypeScript, no three. Lazy: the level view imports this module only when the level starts, so
// it stays out of the initial chunk (PRODUCT.md 17g).
//
// What is dressed, and what stays a collider box (never both at the same coordinates):
//  - every roof node (style 1 body + style 2 deck) -> 1..N joined kit houses; the collider body and
//    deck are skipped in levelView (`kitSkip`), the kit draws walls, plinth and deck at the same spot;
//  - balcony slabs, roads, tramps, cushions, zones and rope posts keep their collider look (their
//    size differs from the kit's, so a kit copy would show an edge the hero cannot stand on);
//  - the 1 m hazard bands are not drawn; the stepped terrain follows them and the gully fringe marks
//    the lethal ground beside each house.
import type { StrategyLevel } from '../../../content/strategy/gen';
import { HAZARD_LIP } from '../../../content/strategy/gen';
import { NODE_ROOF } from '../../../content/strategy/graph';
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
        balcony: -1 as Face | -1,
        stairs: null,
        awnings: [],
        takeoff: [],
        pole: false,
        tall: [],
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

// The bent ground: the straight hill (local frame) west of the corner, the same hill turned 90 degrees east of it.
function bentField(
  p: [number, number][],
  zr: number,
  xE: number,
): (x: number, z: number) => { h: number; d: number } {
  return (x, z) => {
    const h1 = profileAt(p, z);
    const d1 = Math.max(0, Math.abs(x) - HILL_HALF);
    const h2 = profileAt(p, zr + xE - x);
    const d2 = Math.max(0, Math.abs(z - zr) - HILL_HALF);
    const t = Math.max(0, Math.min(1, (x - SEAM0) / (SEAM1 - SEAM0)));
    const w = t * t * (3 - 2 * t);
    return { h: h1 + w * (h2 - h1), d: d1 + w * (d2 - d1) };
  };
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
    const tiles = tileFootprint(n.x0, n.x1, n.z0, n.z1, groundY, storeys, houses.length);
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

  // Ground: one flat terrace per hazard band, 0.2 m under the lethal top, stepping between bands.
  const bands = (s.world?.local.hazards ?? s.level.hazards ?? [])
    .slice()
    .sort((a, b) => b.max[2] - a.max[2]);
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
