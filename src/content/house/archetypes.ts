// Home archetype presets (home-assets handoff, section 3, task H1): the photo-derived house types
// A1-A4, B1 and B2 as kit v2 HouseSpec presets. Pure data: sizes are the kit's (one size for every
// house, ADR 0013 section 1.1); gables, set-back storeys and tin roofs are visual only.
import type { HouseSpec } from './houseSpec';

export type ArchetypeId = 'A1' | 'A2' | 'A3' | 'A4' | 'B1' | 'B2';

/** The spec fields an archetype fixes; placement (id, position, ground height, party walls) is the caller's. */
export type ArchetypePreset = Pick<
  HouseSpec,
  'storeys' | 'balcony' | 'stairs' | 'awnings' | 'takeoff' | 'pole' | 'tall'
>;

export const ARCHETYPE_IDS: readonly ArchetypeId[] = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2'];

const PRESETS: Record<ArchetypeId, ArchetypePreset> = {
  // A1 rural two-storey house with entrance canopy: the canopy is the kit awning (slip 1) on face 3.
  A1: { storeys: 2, balcony: -1, stairs: null, awnings: [3], takeoff: [], pole: false, tall: [] },
  // A2 small mud house with porch: one storey, roof stairs on face 2, takeoff parapet opposite.
  A2: {
    storeys: 1,
    balcony: -1,
    stairs: { face: 2, to: 'roof' },
    awnings: [],
    takeoff: [3],
    pole: false,
    tall: [],
  },
  // A3 low stone-and-mud house with garden: plain one-storey deck, takeoff on the garden side.
  A3: { storeys: 1, balcony: -1, stairs: null, awnings: [], takeoff: [3], pole: false, tall: [] },
  // A4 brick and mud two-storey: tall (1.2 m, not vaultable) parapets on the lethal sides.
  A4: {
    storeys: 2,
    balcony: -1,
    stairs: null,
    awnings: [],
    takeoff: [3],
    pole: false,
    tall: [0, 1],
  },
  // B1 city brick house: first-floor balcony on face 2, shop awning on face 3 (a shop opening).
  B1: { storeys: 2, balcony: 2, stairs: null, awnings: [3], takeoff: [], pole: false, tall: [] },
  // B2 city tiled house with rooftop: balcony on face 2 with stairs, zipline pole on the roof.
  B2: {
    storeys: 2,
    balcony: 2,
    stairs: { face: 2, to: 'balcony' },
    awnings: [],
    takeoff: [],
    pole: true,
    tall: [],
  },
};

/**
 * A HouseSpec for archetype `a` at (cx, cz) over local ground `groundY`. `over` can set `party`
 * (adjoining walls) or adjust any field; the caller owns keeping it valid (`validateHouse`).
 */
export function archetype(
  a: ArchetypeId,
  id: number,
  cx: number,
  cz: number,
  groundY: number,
  over: Partial<HouseSpec> = {},
): HouseSpec {
  const p = PRESETS[a];
  return {
    id,
    cx,
    cz,
    groundY,
    party: [false, false, false, false],
    storeys: p.storeys,
    balcony: p.balcony,
    stairs: p.stairs === null ? null : { face: p.stairs.face, to: p.stairs.to },
    awnings: p.awnings.slice(),
    takeoff: p.takeoff.slice(),
    pole: p.pole,
    tall: p.tall.slice(),
    ...over,
  };
}
