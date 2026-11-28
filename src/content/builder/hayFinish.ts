// Haystack finish geometry (builder-sync plan 2(a)): a cream hay square on a ground patch just downhill of the
// goal house. Mirrors place.ts' goal hay without editing it. Pure TS: compile.ts and dress.ts share it so the
// collider and the drawn patch never drift.
import { HK } from '../house/houseSpec';
import type { PropSpec } from '../house/houseSpec';
import { planeY } from '../strategy/gen';
import { HOUSE_HALF } from './format';
import type { BuilderLevel, BuilderProp } from './format';

export interface HayPatch {
  x0: number;
  x1: number;
  z0: number;
  z1: number;
  y: number;
}

export interface HayBox {
  min: [number, number, number];
  max: [number, number, number];
}

export interface HayFinish {
  patch: HayPatch;
  hay: PropSpec;
  goal: HayBox;
}

const PATCH_HALF_X = 4;
const PATCH_DEPTH = 5;
const HAY_OFFSET = 1.6; // hay centre this far below the goal house's downhill wall
const GOAL_HALF = 1.2;
const GOAL_REACH = 3;
const PROP_MARGIN = 1.5; // ground patch reaches this far past a prop's footprint
const round6 = (v: number): number => Math.round(v * 1e6) / 1e6;

/** The haystack of a level whose finish is 'hay' (null for the roof finish or without a goal house). */
export function hayFinish(l: BuilderLevel): HayFinish | null {
  if (l.finish !== 'hay') return null;
  const g = l.houses.find((h) => h.id === l.goal);
  if (g === undefined) return null;
  const zEdge = g.z - HOUSE_HALF;
  const y = round6(planeY(zEdge - PATCH_DEPTH));
  const hayZ = zEdge - HAY_OFFSET;
  const top = y + HK.hayTop;
  return {
    patch: {
      x0: round6(g.x - PATCH_HALF_X),
      x1: round6(g.x + PATCH_HALF_X),
      z0: round6(zEdge - PATCH_DEPTH),
      z1: round6(zEdge),
      y,
    },
    hay: { kind: 'hay', x: g.x, z: round6(hayZ), groundY: y, yaw: 0 },
    goal: {
      min: [round6(g.x - GOAL_HALF), round6(top - 0.5), round6(hayZ - GOAL_HALF)],
      max: [round6(g.x + GOAL_HALF), round6(top + GOAL_REACH), round6(hayZ + GOAL_HALF)],
    },
  };
}

/** True when the patch rectangle strictly overlaps house `h` (a 0.01 m skin, as place.ts). */
export function patchHitsHouse(p: HayPatch, h: { x: number; z: number }): boolean {
  const pad = -0.01;
  return (
    p.x0 < h.x + HOUSE_HALF + pad &&
    p.x1 > h.x - HOUSE_HALF - pad &&
    p.z0 < h.z + HOUSE_HALF + pad &&
    p.z1 > h.z - HOUSE_HALF - pad
  );
}

const PROP_SIZE: Record<BuilderProp['kind'], number> = {
  crate: HK.crate,
  boxPile: HK.boxPileSize,
  hay: HK.haySize,
  shed: HK.shedSize,
};

/** Footprint side of a builder prop, metres (the kit's own sizes). */
export function propSize(kind: BuilderProp['kind']): number {
  return PROP_SIZE[kind];
}

/** The ground patch under a prop (footprint + 1.5 m each side) and the kit prop standing on it. */
export function propPlacement(p: BuilderProp): { patch: HayPatch; prop: PropSpec } {
  const half = PROP_SIZE[p.kind] / 2 + PROP_MARGIN;
  const y = round6(planeY(p.z - half));
  return {
    patch: {
      x0: round6(p.x - half),
      x1: round6(p.x + half),
      z0: round6(p.z - half),
      z1: round6(p.z + half),
      y,
    },
    prop: { kind: p.kind, x: p.x, z: p.z, groundY: y, yaw: 0 },
  };
}

/** True when two patches strictly overlap. */
export function patchesOverlap(a: HayPatch, b: HayPatch): boolean {
  return a.x0 < b.x1 - 0.01 && a.x1 > b.x0 + 0.01 && a.z0 < b.z1 - 0.01 && a.z1 > b.z0 + 0.01;
}
