// Fixtures for the house kit v2 tests (ADR 0013 section 4.1). Not shipped in any level.
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
