import { describe, expect, it } from 'vitest';
import { pushGable } from '../../src/adapters/render/levelView';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { RIDGE_X, RIDGE_Z } from '../../src/core/world';

// Pitched roof mesh (ADR 0002): matches the collider exactly and every face looks outward.
describe('pushGable', () => {
  for (const ridge of [RIDGE_X, RIDGE_Z]) {
    it(`ridge ${ridge}: 4 faces, outward winding, collider-exact bounds`, () => {
      const b = new AABB(new Vec3(-3.5, 1, -4.5), new Vec3(3.5, 3, 4.5));
      const pos: number[] = [];
      const idx: number[] = [];
      const uv: number[] = [];
      pushGable(pos, idx, uv, b, ridge);
      expect(idx.length).toBe(2 * 6 + 2 * 3);
      expect(uv.length / 2).toBe(pos.length / 3);
      for (let k = 0; k < pos.length; k += 3) {
        expect(pos[k]).toBeGreaterThanOrEqual(-3.5);
        expect(pos[k]).toBeLessThanOrEqual(3.5);
        expect(pos[k + 1]).toBeGreaterThanOrEqual(1);
        expect(pos[k + 1]).toBeLessThanOrEqual(3);
        expect(pos[k + 2]).toBeGreaterThanOrEqual(-4.5);
        expect(pos[k + 2]).toBeLessThanOrEqual(4.5);
      }
      const c = [0, 1.5, 0]; // inside the prism
      for (let t = 0; t < idx.length; t += 3) {
        const p = [0, 1, 2].map((j) => [
          pos[3 * idx[t + j]],
          pos[3 * idx[t + j] + 1],
          pos[3 * idx[t + j] + 2],
        ]);
        const e1 = [p[1][0] - p[0][0], p[1][1] - p[0][1], p[1][2] - p[0][2]];
        const e2 = [p[2][0] - p[0][0], p[2][1] - p[0][1], p[2][2] - p[0][2]];
        const n = [
          e1[1] * e2[2] - e1[2] * e2[1],
          e1[2] * e2[0] - e1[0] * e2[2],
          e1[0] * e2[1] - e1[1] * e2[0],
        ];
        const m = [0, 1, 2].map((k) => (p[0][k] + p[1][k] + p[2][k]) / 3 - c[k]);
        expect(n[0] * m[0] + n[1] * m[1] + n[2] * m[2], `triangle ${t / 3}`).toBeGreaterThan(0);
      }
    });
  }
});
