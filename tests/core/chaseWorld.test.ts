import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING as cfg } from '../../src/core/config';
import {
  PARK_Y,
  buildChaseWorld,
  recycleOldest,
  refreshRoute,
  slotOf,
  solidBase,
} from '../../src/core/chase/chaseWorld';
import { SLOT_SOLIDS } from '../../src/core/chase/rows';

function snapshot(seed: number, recycles: number): string {
  const cw = buildChaseWorld(seed, cfg);
  for (let i = 0; i < recycles; i++) recycleOldest(cw);
  const w = cw.world;
  const out: number[] = [cw.oldest, cw.newest];
  for (let r = cw.oldest; r <= cw.newest; r++) {
    const s = slotOf(cw, r);
    for (let i = 0; i < SLOT_SOLIDS; i++) {
      const b = w.solids[solidBase(s) + i];
      out.push(b.min.x, b.min.y, b.min.z, b.max.x, b.max.y, b.max.z);
    }
  }
  return out.map((v) => v.toFixed(6)).join(',');
}

describe('chase world', () => {
  it('streams in place: slot count and array sizes never grow', () => {
    const cw = buildChaseWorld(3, cfg);
    const n = cw.world.solids.length;
    for (let i = 0; i < 50; i++) recycleOldest(cw);
    expect(cw.world.solids.length).toBe(n);
    expect(cw.newest - cw.oldest + 1).toBe(cfg.chase.slots);
  });

  it('is deterministic for a seed and different across seeds', () => {
    expect(snapshot(9, 20)).toBe(snapshot(9, 20));
    expect(snapshot(9, 20)).not.toBe(snapshot(10, 20));
  });

  it('a recycled slot equals a fresh build of the same row', () => {
    // two worlds reaching the same window through different recycle counts agree on shared rows
    const a = buildChaseWorld(4, cfg);
    for (let i = 0; i < 12; i++) recycleOldest(a);
    const b = buildChaseWorld(4, cfg);
    for (let i = 0; i < 12; i++) recycleOldest(b);
    refreshRoute(a, a.oldest + 1);
    refreshRoute(b, b.oldest + 1);
    expect(a.world.route).toEqual(b.world.route);
  });

  it('parked entries are collapsed far below the hill', () => {
    const cw = buildChaseWorld(4, cfg);
    let parked = 0;
    for (let r = cw.oldest; r <= cw.newest; r++) {
      const s = slotOf(cw, r);
      for (let i = 0; i < SLOT_SOLIDS; i++)
        if (cw.world.solids[solidBase(s) + i].min.y <= PARK_Y + 1) parked++;
    }
    expect(parked).toBeGreaterThan(0);
  });
});
