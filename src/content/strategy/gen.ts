// Strategy maze level generator (ADR 0011, track S1). Seeded, pure TS, emits a LevelJson
// that loadWorldFromObject validates. STUB: a three-house fixture while the generator lands;
// the signature is final.
import type { LevelJson } from '../load';

export const STRATEGY_SEED = 20261110;

export function generateStrategyLevel(seed: number = STRATEGY_SEED): LevelJson {
  void seed;
  return {
    version: 1,
    spawn: [0, 10.01, 0],
    spawnYaw: Math.PI,
    killPlaneY: -60,
    solids: [
      { min: [-4, -20, -4], max: [4, 10, 4] },
      { min: [-4, -20, -24], max: [4, 4, -16] },
      { min: [-4, -20, -44], max: [4, 0, -36] },
    ],
    style: [1, 1, 1],
    ramps: [],
    anchors: [{ pos: [0, 6.6, -18.5] }],
    lineOnly: 1,
    climb: 1,
    lines: [{ zone: { min: [-1.5, 10, -4], max: [1.5, 10.05, -1] }, anchor: 0 }],
    tramps: [{ min: [-1.5, 4, -24], max: [1.5, 4.02, -21] }],
    cushions: [{ min: [-4, 0, -44], max: [4, 0.02, -36] }],
    hazards: [{ min: [-40, -30, -60], max: [40, -10, 10] }],
    goal: { min: [-4, 0, -44], max: [4, 3, -36] },
    route: [],
  };
}
