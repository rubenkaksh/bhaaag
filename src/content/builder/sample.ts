// Starter level for the builder: 9 houses, every edge kind once, one decoy dead end. A NEW level
// (id valley-start), not derived from Nagarkot. Houses 0..8; start 0, goal 7.
import type { ArchetypeId } from '../house/archetypes';
import type { BuilderLevel } from './format';
import { BUILDER_FORMAT, BUILDER_VERSION } from './format';

type H = [id: number, x: number, z: number, storeys: 1 | 2];
const HOUSES: H[] = [
  [0, 0, 0, 2],
  [1, 0, -30, 1],
  [2, 0, -42, 1],
  [3, 8, -42, 1],
  [4, 8, -56, 2],
  [5, 8, -68, 1],
  [6, -16, -90, 1],
  [7, -16, -102, 1],
  [8, 12, -30, 1],
];

export function sampleLevel(): BuilderLevel {
  return {
    format: BUILDER_FORMAT,
    version: BUILDER_VERSION,
    id: 'valley-start',
    name: 'Valley start',
    houses: HOUSES.map(([id, x, z, storeys]) => ({ id, x, z, lift: 0, storeys, balcony: false })),
    edges: [
      { id: 0, a: 0, b: 1, kind: 'zip' },
      { id: 1, a: 1, b: 2, kind: 'gap', via: 'jump' },
      { id: 2, a: 3, b: 4, kind: 'gap', via: 'boxes' },
      { id: 3, a: 4, b: 5, kind: 'gap', via: 'cushion' },
      { id: 4, a: 5, b: 6, kind: 'zip' },
      { id: 5, a: 6, b: 7, kind: 'gap', via: 'jump' },
      { id: 6, a: 1, b: 8, kind: 'gap', via: 'jump' },
    ],
    start: 0,
    goal: 7,
    finish: 'hay',
  };
}

/**
 * Kit v2 sample: the hay-run house types in the builder. C1 verandah start, one zip to a stepped C2
 * pair (hi touching lo: climb up, walk down), a jump to a C2lo goal, and a C3 gable decoy touching
 * the pair. Not shipped (not in content/builders); the builder page offers it as "Kit sample".
 */
export function kitSampleLevel(): BuilderLevel {
  const at = (id: number, x: number, z: number, a: ArchetypeId, storeys: 1 | 2) => ({
    id,
    x,
    z,
    lift: 0,
    storeys,
    balcony: false,
    archetype: a,
  });
  return {
    format: BUILDER_FORMAT,
    version: BUILDER_VERSION,
    id: 'kit-start',
    name: 'Kit start',
    houses: [
      at(0, 0, 0, 'C1', 2),
      at(1, 0, -30, 'C2hi', 2),
      at(2, 8, -30, 'C2lo', 1),
      at(3, -8, -30, 'C3', 2),
      at(4, 8, -42, 'C2lo', 1),
    ],
    edges: [
      { id: 0, a: 0, b: 1, kind: 'zip' },
      { id: 1, a: 2, b: 4, kind: 'gap', via: 'jump' },
    ],
    start: 0,
    goal: 4,
    finish: 'hay',
  };
}
