import { describe, expect, it } from 'vitest';
import {
  BIKE_SPIKE,
  DT,
  HORSE_SPIKE,
  botInput,
  createRun,
  newBotMem,
  stepRun,
  type SpikeCfg,
} from '../../src/spikes';
import { SpikeView } from '../../src/spikes/play/view';

// Headless (no WebGL, no DOM): the view must follow a whole run without throwing or going non-finite.
describe('playable spike view', () => {
  it.each([
    ['horse-bow', HORSE_SPIKE],
    ['bike-rifle', BIKE_SPIKE],
  ] as [string, SpikeCfg][])('%s: syncs through ride, camp and the end', (_n, cfg) => {
    const run = createRun(cfg, 4);
    const view = new SpikeView(run, 'low');
    view.resize(390, 844);
    const mem = newBotMem();
    const phases = new Set<string>();
    for (let i = 0; i < 60 * 400 && run.phase !== 'dawn' && run.phase !== 'dead'; i++) {
      const inp = botInput(run, mem);
      stepRun(run, inp, DT);
      if (i % 6 === 0) {
        if (!phases.has(run.phase)) view.snapCamera();
        phases.add(run.phase);
        view.sync(inp, 6 * DT);
        const p = view.camera.position;
        expect(Number.isFinite(p.x + p.y + p.z)).toBe(true);
        const hit = view.project(195, 400, 390, 844);
        if (hit !== null) expect(Number.isFinite(hit.x + hit.z)).toBe(true);
      }
    }
    expect(phases.has('ride')).toBe(true);
  });
});
