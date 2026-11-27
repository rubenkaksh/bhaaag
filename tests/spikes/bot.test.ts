import { describe, expect, it } from 'vitest';
import {
  BIKE_SPIKE,
  DT,
  HORSE_SPIKE,
  botInput,
  createRun,
  neutralInput,
  newBotMem,
  stepRun,
  type SpikeCfg,
} from '../../src/spikes';

function play(cfg: SpikeCfg, seed: number, bot: boolean): { phase: string; ridden: boolean } {
  const run = createRun(cfg, seed);
  const mem = newBotMem();
  for (let i = 0; i < 60 * 600 && run.phase !== 'dawn' && run.phase !== 'dead'; i++) {
    stepRun(run, bot ? botInput(run, mem) : neutralInput(), DT);
  }
  return { phase: run.phase, ridden: run.camp !== null };
}

describe('one full run per spike (scripted player)', () => {
  it.each([
    ['horse-bow', HORSE_SPIKE],
    ['bike-rifle', BIKE_SPIKE],
  ] as const)('%s: ride to camp and survive to dawn on a good share of seeds', (_n, cfg) => {
    let dawn = 0;
    let arrived = 0;
    const N = 12;
    for (let seed = 1; seed <= N; seed++) {
      const r = play(cfg, seed, true);
      expect(['dawn', 'dead']).toContain(r.phase);
      if (r.ridden) arrived++;
      if (r.phase === 'dawn') dawn++;
    }
    expect(arrived).toBeGreaterThanOrEqual(N - 2); // the ride is survivable
    expect(dawn).toBeGreaterThanOrEqual(3); // the night is winnable...
    expect(dawn).toBeLessThanOrEqual(N - 1); // ...but not a walk-over
  });

  it.each([
    ['horse-bow', HORSE_SPIKE],
    ['bike-rifle', BIKE_SPIKE],
  ] as const)('%s: doing nothing never reaches dawn', (_n, cfg) => {
    for (let seed = 1; seed <= 3; seed++) expect(play(cfg, seed, false).phase).not.toBe('dawn');
  });
});
