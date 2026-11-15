// Fixtures for the house kit v2 tests (ADR 0013 section 4.1). Not shipped in any level.
import { archetype } from './archetypes';
import type { HouseSpec, PropSpec } from './houseSpec';

function house(
  id: number,
  cx: number,
  cz: number,
  groundY: number,
  over: Partial<HouseSpec>,
): HouseSpec {
  return {
    id,
    cx,
    cz,
    groundY,
    storeys: 1,
    party: [false, false, false, false],
    balcony: -1,
    stairs: null,
    awnings: [],
    takeoff: [],
    pole: false,
    tall: [],
    ...over,
  };
}

/**
 * Six houses and four props showing every piece kind: a touching row of three (party walls), a row
 * across a street patch, balcony + balcony stairs, roof stairs, awnings with shop openings, takeoff
 * and tall parapets, poles, crate, box pile, hay and trampoline.
 */
export function demoStreet(): { houses: HouseSpec[]; props: PropSpec[] } {
  const houses: HouseSpec[] = [
    house(1, 0, 0, 0, {
      storeys: 2,
      party: [true, false, false, false],
      balcony: 2,
      stairs: { face: 2, to: 'balcony' },
      awnings: [3],
      tall: [1],
    }),
    house(2, 8, 0, 0, {
      storeys: 1,
      party: [true, true, false, false],
      stairs: { face: 2, to: 'roof' },
      awnings: [3],
    }),
    house(3, 16, 0, 0, {
      storeys: 2,
      party: [false, true, false, false],
      balcony: 3,
      takeoff: [0],
      tall: [2],
      pole: true,
    }),
    house(4, 0, -16, -4, {
      storeys: 1,
      takeoff: [3],
      tall: [0, 1, 2],
      pole: true,
    }),
    house(5, 8, -16, -4, {
      storeys: 2,
      party: [true, false, false, false],
      balcony: 3,
      awnings: [2],
      tall: [1],
    }),
    house(6, 16, -16, -4, {
      storeys: 1,
      party: [false, true, false, false],
      takeoff: [3],
      tall: [0],
    }),
  ];
  const props: PropSpec[] = [
    { kind: 'crate', x: 2, z: -7, groundY: -2, yaw: 0 },
    { kind: 'boxPile', x: 6, z: -7, groundY: -2, yaw: 0 },
    { kind: 'hay', x: 10.5, z: -8, groundY: -2, yaw: 0 },
    { kind: 'tramp', x: 15, z: -7, groundY: -2, yaw: Math.PI / 2 },
  ];
  return { houses, props };
}

/** Street terrace height of `homeStreet`: 3 m below the row's ground (hay, crate and box pile stand on it). */
export const HOME_STREET_Y = -3;

/** A ground slab of a fixture (not a kit piece; the level builder adds it as a style-0 solid). */
export interface GroundSlab {
  min: [number, number, number];
  max: [number, number, number];
}

/**
 * Home street fixture (handoff H2) built from the archetype presets, for tests and budgets. Row
 * along +x at ground 0: A1 (2 storeys, deck 6.0, awning on face 3) touching A2 (1 storey, deck 3.2,
 * so A1 drops 2.8 m onto A2); a 3.5 m gap to A3 (1 storey) behind A2's 0.45 parapet; B1 (balcony and
 * shop awning) and B2 (balcony, stairs, pole) further on, all touching. A front yard (top 0) lies on
 * the -z side and a street terrace 3 m lower (top HOME_STREET_Y) on the +z side, with a hay stack,
 * crate and box pile on it. `ground` holds the two slabs; they sit outside the house bodies.
 */
export function homeStreet(): { houses: HouseSpec[]; props: PropSpec[]; ground: GroundSlab[] } {
  const gap = 3.5;
  const a3x = 12 + gap + 4; // A2 ends at x = 12; A3 starts after the gap
  const houses: HouseSpec[] = [
    archetype('A1', 1, 0, 0, 0, { party: [true, false, false, false] }),
    archetype('A2', 2, 8, 0, 0, { party: [false, true, false, false], takeoff: [0] }),
    archetype('A3', 3, a3x, 0, 0, { party: [true, false, false, false], takeoff: [1] }),
    archetype('B1', 4, a3x + 8, 0, 0, { party: [true, true, false, false] }),
    archetype('B2', 5, a3x + 16, 0, 0, { party: [false, true, false, false] }),
  ];
  const g = HOME_STREET_Y;
  const props: PropSpec[] = [
    // the hay sits where a run-and-jump off A1's +z edge lands (the sim test pins this)
    { kind: 'hay', x: 0, z: 12.5, groundY: g, yaw: 0 },
    { kind: 'crate', x: -4.5, z: 9, groundY: g, yaw: 0 },
    { kind: 'boxPile', x: 5, z: 9, groundY: g, yaw: 0 },
  ];
  const ground: GroundSlab[] = [
    { min: [-30, -8, -40], max: [70, 0, -4] },
    { min: [-30, -8, 4], max: [70, g, 40] },
  ];
  return { houses, props, ground };
}

/** Deterministic PRNG for fixtures (mulberry32). */
function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * A descending row of `count` houses: storeys come from the seeded rng only, never from altitude
 * (ADR 0013 1.3). Ground drops `drop` metres per house. Used for the 20-house cap check and the
 * 200-seed storey independence check.
 */
export function hillRow(seed: number, count: number, drop = 3): HouseSpec[] {
  const r = rng(seed);
  const out: HouseSpec[] = [];
  let x = 0;
  let z = 0;
  let g = 0;
  for (let i = 0; i < count; i++) {
    const touching = i > 0 && r() < 0.5; // shares a wall with the previous house along -x
    if (touching) x += 8;
    else if (i > 0) {
      x = 0;
      z -= 20;
      g -= drop;
    }
    const storeys: 1 | 2 = r() < 0.5 ? 1 : 2;
    const stairs = storeys === 2 && r() < 0.5;
    out.push(
      house(i + 1, x, z, g, {
        storeys,
        party: [false, touching, false, false],
        balcony: storeys === 2 ? 2 : -1,
        stairs: stairs ? { face: 2, to: 'balcony' } : null,
        awnings: r() < 0.3 ? [3] : [],
        takeoff: [3],
      }),
    );
    if (touching) out[i - 1].party[0] = true;
  }
  return out;
}
