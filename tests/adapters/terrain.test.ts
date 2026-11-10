import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { loadWorldFromJson } from '../../src/content/load';
import {
  GRADE,
  GROUND_Y0,
  HILL_HALF_X,
  TERRAIN_HALF_X,
  TERRAIN_Z_MAX,
  TERRAIN_Z_MIN,
  planeY,
  terrainY,
} from '../../src/adapters/render/terrain';
import { buildGroundMesh } from '../../src/adapters/render/decor/groundMesh';

const raw = JSON.parse(
  readFileSync(new URL('../../content/levels/l1.json', import.meta.url), 'utf8'),
);
const world = loadWorldFromJson(JSON.stringify(raw));

describe('terrain (visible hillside)', () => {
  it('constants mirror the level generator', async () => {
    const path = '../../tools/genLevel.mjs';
    const gen = (await import(/* @vite-ignore */ path)) as Record<string, number>;
    expect(GRADE).toBeCloseTo(gen.GRADE, 12);
    expect(GROUND_Y0).toBe(gen.GROUND_Y0);
    expect(HILL_HALF_X).toBe(gen.HILL_HALF_X);
  });

  it('is exactly the collider ramp inside |x| <= 34', () => {
    const ramp = world.ramps[0];
    for (let z = ramp.aabb.min.z; z <= ramp.aabb.max.z; z += 3.7) {
      for (const x of [-34, -20, -3, 0, 7.5, 34]) {
        const rampY =
          ramp.aabb.min.y +
          ramp.rise * ((z - ramp.aabb.min.z) / (ramp.aabb.max.z - ramp.aabb.min.z));
        expect(terrainY(x, z)).toBeCloseTo(rampY, 2);
        expect(terrainY(x, z)).toBeCloseTo(planeY(z), 9);
      }
    }
  });

  it('rises smoothly outside the collider and ends below the mountain ranges', () => {
    expect(terrainY(120, -40)).toBeGreaterThan(planeY(-40) + 10);
    for (let z = 150; z > -340; z -= 3) {
      for (let x = 36; x < 300; x += 7) {
        expect(Math.abs(terrainY(x, z) - terrainY(x, z - 3))).toBeLessThan(5);
        expect(Math.abs(terrainY(x, z) - terrainY(x + 7, z))).toBeLessThan(8);
      }
    }
    expect(terrainY(TERRAIN_HALF_X, 0)).toBeLessThan(200);
  });

  it('the drawn mesh is one merged mesh whose surface matches the plane under the hero', () => {
    const m = buildGroundMesh();
    const pos = m.geometry.getAttribute('position');
    let inside = 0;
    let minZ = Infinity;
    let maxZ = -Infinity;
    let maxX = 0;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      minZ = Math.min(minZ, z);
      maxZ = Math.max(maxZ, z);
      maxX = Math.max(maxX, Math.abs(x));
      expect(pos.getY(i)).toBeCloseTo(terrainY(x, z), 4);
      if (Math.abs(x) <= HILL_HALF_X) inside++;
    }
    expect(inside).toBeGreaterThan(300);
    expect(minZ).toBe(TERRAIN_Z_MIN);
    expect(maxZ).toBe(TERRAIN_Z_MAX);
    expect(maxX).toBe(TERRAIN_HALF_X);
    expect(pos.count).toBeLessThan(12000);
    // fine near the lane: a vertex column at the collider edge and at the centre line
    const xsSeen = new Set<number>();
    for (let i = 0; i < pos.count; i++) xsSeen.add(pos.getX(i));
    for (const x of [-34, 0, 34]) expect(xsSeen.has(x)).toBe(true);
  });
});
