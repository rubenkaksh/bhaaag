// Painted heightmaps (owner pick 2026-11-28): the image replaces the noise hills; the trail is carved on top.
import { afterEach, describe, expect, it } from 'vitest';
import { gridFor, groundY, trailX, type TrailSpec } from '../../src/spikes/trail';
import { buildTrailField, hillsFromMap, setHillMap, type HillMap } from '../../src/spikes/trailGen';
import { HORSE_SPIKE, trailSpecFor } from '../../src/spikes';

const spec = trailSpecFor(HORSE_SPIKE.ride) as TrailSpec;
const map = (w: number, h: number, f: (u: number, v: number) => number): HillMap => {
  const data = new Float32Array(w * h);
  for (let v = 0; v < h; v++) for (let u = 0; u < w; u++) data[v * w + u] = f(u, v);
  return { w, h, data };
};

describe('painted heightmap', () => {
  afterEach(() => setHillMap(spec.seed, null));

  it('maps the image like a top-down map: left = +x, top = far end, grey = height', () => {
    const g = gridFor(spec);
    const r = g.nx + 1;
    const left = hillsFromMap(spec, map(10, 10, (u) => (u < 5 ? 1 : 0)));
    expect(left[0 * r + g.nx]).toBeCloseTo(spec.maxHeight); // x max, start row
    expect(left[0 * r + 0]).toBeCloseTo(spec.minHeight); // x min
    const top = hillsFromMap(spec, map(10, 10, (_u, v) => (v < 5 ? 1 : 0)));
    expect(top[g.nz * r + 40]).toBeCloseTo(spec.maxHeight); // far end
    expect(top[0 * r + 40]).toBeCloseTo(spec.minHeight); // start
    const mid = hillsFromMap(spec, map(4, 4, () => 0.5));
    expect(mid[123]).toBeCloseTo((spec.minHeight + spec.maxHeight) / 2);
  });

  it('builds the field from the painted map and still carves a rideable trail', () => {
    const noise = buildTrailField(spec);
    // a steep ramp up the image: 0 at the start, white at the far end, with a cliff-like wall on the left
    setHillMap(spec.seed, map(60, 300, (u, v) => (u < 10 ? 1 : 1 - v / 299)));
    const f = buildTrailField(spec);
    expect(f.h).not.toBe(noise.h);
    expect(f.hills?.length).toBe(f.h.length);
    let worst = 0;
    for (let z = 0; z < spec.distance; z += 4) {
      const a = groundY(f, trailX(spec, z), z);
      const b = groundY(f, trailX(spec, z + 4), z + 4);
      worst = Math.max(worst, Math.abs(b - a) / 4);
    }
    expect(worst).toBeLessThan(spec.maxGrade + 0.03);
    // the painted wall stands off the trail on the rider's left (+x)
    expect(groundY(f, 110, 300)).toBeGreaterThan(groundY(f, trailX(spec, 300), 300) + 5);
    setHillMap(spec.seed, null);
    expect(buildTrailField(spec).h).toEqual(noise.h); // rebuilt from the noise again
  });
});
