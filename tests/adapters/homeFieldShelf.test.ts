// Owner 2026-11-18: the east land of nagarkot-home stood as a flat shelf above the descending lane and
// covered the painted foothills. The real bent field must not stay level while the lane keeps falling.
import { afterEach, describe, expect, it } from 'vitest';
import { buildNagarkotHome } from '../../src/content/strategy/home';
import { dressNagarkotHome } from '../../src/adapters/render/decor/homeDress';
import { planeY, setTerrainField, setTerrainProfile, terrainY } from '../../src/adapters/render/terrain';

const s = buildNagarkotHome();
const d = dressNagarkotHome(s);
const zr = s.world?.zr ?? 0;

afterEach(() => {
  setTerrainProfile(null);
  setTerrainField(null);
});

describe('nagarkot-home bent field', () => {
  it('east land south of the turned road stays within 45 m of the valley the lane descends into', () => {
    setTerrainProfile(d.profile);
    setTerrainField(d.field ?? null);
    for (let z = zr - 80; z >= zr - 220; z -= 20)
      for (const x of [60, 100, 160, 220]) expect(terrainY(x, z) - planeY(z)).toBeLessThan(45);
  });

  it('keeps the field height on the road (d = 0)', () => {
    const f = d.field;
    expect(f).toBeDefined();
    setTerrainProfile(d.profile);
    setTerrainField(f ?? null);
    for (const [x, z] of [[0, -50], [10, -150], [60, zr], [120, zr + 10]]) {
      const v = f?.(x, z);
      if (v !== undefined && v.d === 0) expect(terrainY(x, z)).toBe(v.h);
    }
  });
});
