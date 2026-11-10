// Shape of the one-hillside level (docs/level-layout.md): a single planar ramp, ten houses in a
// straight line down the fall line, rows of two attached houses, rope hops within the rope limits.
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  GRADE as TERRAIN_GRADE,
  GROUND_Y0 as TERRAIN_GROUND_Y0,
  HILL_HALF_X as TERRAIN_HILL_HALF_X,
} from '../../src/adapters/render/terrain';
// @ts-expect-error plain JS tool, no types
import * as gen from '../../tools/genLevel.mjs';

type Box = { min: number[]; max: number[] };
type Level = {
  solids: Box[];
  style: number[];
  ramps: (Box & { slopeAxis: number; rise: number })[];
  anchors: { pos: number[] }[];
  route: number[];
  goal: Box;
};

const level = JSON.parse(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
) as Level;
const cfg = DEFAULT_TUNING;
const HALF_Z = 3.5;
const HAND = cfg.rope.handToFeet;
const bodies = (s: number): Box[] => level.solids.filter((_, i) => level.style[i] === s);

describe('l1 hillside layout', () => {
  it('ten houses: 8 route roofs and 2 decoy bodies', () => {
    expect(bodies(2)).toHaveLength(8);
    expect(bodies(3)).toHaveLength(2);
  });

  it('route houses all stand on the lane x = 0', () => {
    for (const b of bodies(2)) expect((b.min[0] + b.max[0]) / 2).toBeCloseTo(0, 6);
  });

  it('all houses sit within |x| <= 16', () => {
    for (const b of [...bodies(2), ...bodies(3)]) {
      expect(Math.max(Math.abs(b.min[0]), Math.abs(b.max[0]))).toBeLessThanOrEqual(16);
    }
  });

  it('rows of two are attached and the second roof steps down GRADE * 7 + ROW_DROP', () => {
    const roofs = bodies(2);
    for (let row = 0; row < 4; row++) {
      const a = roofs[2 * row];
      const b = roofs[2 * row + 1];
      expect(b.max[2], 'attached: b starts where a ends').toBeCloseTo(a.min[2], 6);
      expect(a.max[1] - b.max[1]).toBeCloseTo(gen.GRADE * 2 * HALF_Z + gen.ROW_DROP, 2);
    }
  });

  it('rows are separated by open hillside (no house between them)', () => {
    const roofs = bodies(2);
    for (let row = 0; row < 3; row++) {
      const gap = roofs[2 * row + 1].min[2] - roofs[2 * row + 2].max[2];
      expect(gap).toBeCloseTo(13, 6);
    }
  });

  it('exactly one ramp whose plane equals hillY(z)', () => {
    expect(level.ramps).toHaveLength(1);
    const r = level.ramps[0];
    expect(r.slopeAxis).toBe(2);
    expect(r.min[1]).toBeCloseTo(gen.hillY(r.min[2]), 3);
    expect(r.min[1] + r.rise).toBeCloseTo(gen.hillY(r.max[2]), 3);
    expect(r.rise / (r.max[2] - r.min[2])).toBeCloseTo(gen.GRADE, 3);
  });

  it('ramp constants match the terrain renderer', () => {
    expect(gen.GRADE).toBeCloseTo(TERRAIN_GRADE, 12);
    expect(gen.GROUND_Y0).toBe(TERRAIN_GROUND_Y0);
    expect(gen.HILL_HALF_X).toBe(TERRAIN_HILL_HALF_X);
    expect(level.ramps[0].min[0]).toBe(-TERRAIN_HILL_HALF_X);
    expect(level.ramps[0].max[0]).toBe(TERRAIN_HILL_HALF_X);
  });

  it('the only style-0 solid is the kill slab', () => {
    const s0 = bodies(0);
    expect(s0).toHaveLength(1);
    expect(s0[0].max[1]).toBeLessThan(-100);
  });

  it('style-5 barrier walls enclose the ramp on all four sides', () => {
    const w = bodies(5);
    const r = level.ramps[0];
    expect(w).toHaveLength(4);
    expect(w.some((b) => b.max[0] === r.min[0])).toBe(true);
    expect(w.some((b) => b.min[0] === r.max[0])).toBe(true);
    expect(w.some((b) => b.min[2] === r.max[2])).toBe(true);
    expect(w.some((b) => b.max[2] === r.min[2])).toBe(true);
    for (const b of w) {
      expect(b.max[1]).toBeGreaterThan(20);
      expect(b.min[1]).toBeLessThan(r.min[1]);
    }
  });

  it('every rope hop is within the rope limits from the launch roof edge', () => {
    const roofs = bodies(2);
    expect(level.route).toHaveLength(3);
    level.route.forEach((id, hop) => {
      const from = roofs[2 * hop + 1]; // last roof of the row before the anchor's row
      const a = level.anchors[id].pos;
      const dh = Math.hypot(a[0] - (from.min[0] + from.max[0]) / 2, a[2] - from.min[2]);
      const dy = from.max[1] + HAND - a[1];
      const len = Math.hypot(dh, dy);
      const deg = (Math.atan2(dy, dh) * 180) / Math.PI;
      expect(len, `hop ${hop} length`).toBeLessThanOrEqual(cfg.rope.maxLen);
      expect(len, `hop ${hop} length`).toBeGreaterThanOrEqual(cfg.rope.minLen);
      expect(deg, `hop ${hop} slope`).toBeGreaterThanOrEqual(cfg.rope.minSlopeDeg);
      expect(deg, `hop ${hop} slope`).toBeLessThanOrEqual(cfg.rope.maxSlopeDeg);
    });
  });

  it('footprint (houses to goal) is under 130 m of z', () => {
    const zs = [...bodies(2), ...bodies(3)].map((b) => b.max[2]).concat([level.goal.min[2]]);
    expect(Math.max(...zs) - Math.min(...zs)).toBeLessThan(130);
  });
});
