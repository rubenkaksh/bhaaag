import { afterEach, describe, expect, it } from 'vitest';
import {
  planeY,
  setTerrainField,
  setTerrainProfile,
  terrainY,
} from '../../src/adapters/render/terrain';

const HILL_HALF = 34;
const SEAM0 = 26;
const SEAM1 = 40;

function profileAt(p: [number, number][], z: number): number {
  if (z >= p[0][0]) return p[0][1] + ((z - p[0][0]) * (p[1][1] - p[0][1])) / (p[1][0] - p[0][0]);
  for (let i = 1; i < p.length; i++) {
    if (z >= p[i][0])
      return p[i - 1][1] + ((z - p[i - 1][0]) / (p[i][0] - p[i - 1][0])) * (p[i][1] - p[i - 1][1]);
  }
  const n = p.length;
  return p[n - 1][1];
}

function bentField(
  p: [number, number][],
  zr: number,
  xE: number,
): (x: number, z: number) => { h: number; d: number } {
  return (x, z) => {
    const h1 = profileAt(p, z);
    const d1 = Math.max(0, Math.abs(x) - HILL_HALF);
    const h2 = profileAt(p, zr + xE - x);
    const d2 = Math.max(0, Math.abs(z - zr) - HILL_HALF);
    const t = Math.max(0, Math.min(1, (x - SEAM0) / (SEAM1 - SEAM0)));
    const w = t * t * (3 - 2 * t);
    return { h: h1 + w * (h2 - h1), d: d1 + w * (d2 - d1) };
  };
}

const profile: [number, number][] = [
  [60, 0],
  [-120, -65],
  [-300, -130],
];
const field = bentField(profile, -120, 60);

afterEach(() => {
  setTerrainProfile(null);
  setTerrainField(null);
});

describe('terrainShape (bent-field reshape)', () => {
  it('matches field.h exactly where d === 0', () => {
    setTerrainProfile(profile);
    setTerrainField(field);
    for (let x = -320; x <= 320; x += 4) {
      for (let z = -360; z <= 200; z += 4) {
        const f = field(x, z);
        if (f.d === 0) expect(terrainY(x, z)).toBe(f.h);
      }
    }
  });

  it('keeps neighbouring slope |dy|/4 <= 0.70 for |x| > 40', () => {
    setTerrainProfile(profile);
    setTerrainField(field);
    const maxSlope = 0.7;
    for (let x = -320; x <= 320; x += 4) {
      for (let z = -360; z <= 200; z += 4) {
        if (Math.abs(x) <= 40) continue;
        const y0 = terrainY(x, z);
        if (x + 4 <= 320 && Math.abs(x + 4) > 40) {
          expect(Math.abs(terrainY(x + 4, z) - y0) / 4).toBeLessThanOrEqual(maxSlope);
        }
        if (z + 4 <= 200) {
          expect(Math.abs(terrainY(x, z + 4) - y0) / 4).toBeLessThanOrEqual(maxSlope);
        }
      }
    }
  });

  it('stays within CAP above max(field.h, planeY(z))', () => {
    setTerrainProfile(profile);
    setTerrainField(field);
    for (let x = -320; x <= 320; x += 4) {
      for (let z = -360; z <= 200; z += 4) {
        const f = field(x, z);
        expect(terrainY(x, z) - Math.max(f.h, planeY(z))).toBeLessThanOrEqual(24.001);
      }
    }
  });

  it('leaves the stock branch untouched at (100, -50)', () => {
    setTerrainProfile(null);
    setTerrainField(null);
    expect(terrainY(100, -50)).toBe(-17.07275326795433);
  });
});
