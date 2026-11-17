import { describe, expect, it } from 'vitest';
import type { BufferAttribute, Mesh } from 'three';
import { DOOR_HALF_W, doorwayBoxes } from '../../src/adapters/render/doorway';
import type { DoorBox } from '../../src/adapters/render/doorway';
import { buildHouseDecor } from '../../src/adapters/render/decor/houseV2';
import type { HouseDecorBox } from '../../src/adapters/render/decor/houseV2';
import { buildStrategyFeatures } from '../../src/adapters/render/strategyView';
import { demoStreet } from '../../src/content/house/demoStreet';
import { deckY, poleAnchor } from '../../src/content/house/houseSpec';
import { loadWorldFromObject } from '../../src/content/load';
import { generateStrategyLevel } from '../../src/content/strategy/gen';

const HERO_R = 0.35;
const HERO_H = 1.8;

/** True when the upright hero cylinder (as its AABB) at (x, y, z) overlaps the box. */
function hitsHero(b: DoorBox, x: number, y: number, z: number): boolean {
  return (
    b[0] < x + HERO_R &&
    b[3] > x - HERO_R &&
    b[2] < z + HERO_R &&
    b[5] > z - HERO_R &&
    b[1] < y + HERO_H &&
    b[4] > y
  );
}

describe('zipline doorway', () => {
  it('leaves the hero a clear path through the middle, rope end inside the lintel', () => {
    for (const [dx, dz] of [
      [0, -1],
      [1, 0.3],
      [-0.4, 1],
    ]) {
      const boxes = doorwayBoxes(2, -3, 10, 12, dx, dz);
      expect(boxes).toHaveLength(3);
      for (const b of boxes) expect(hitsHero(b, 2, 10, -3)).toBe(false);
      const lintel = boxes[2];
      expect(lintel[0] <= 2 && lintel[3] >= 2 && lintel[2] <= -3 && lintel[5] >= -3).toBe(true);
      expect(lintel[1] <= 12 && lintel[4] >= 12).toBe(true);
    }
  });

  it('frames the path across the rope direction (posts beside the hero, not ahead)', () => {
    const [p0, p1] = doorwayBoxes(0, 0, 0, 2, 0, -1); // rope along -z: posts on +-x
    expect((p0[0] + p0[3]) / 2).toBeCloseTo(-(DOOR_HALF_W + 0.06));
    expect((p1[0] + p1[3]) / 2).toBeCloseTo(DOOR_HALF_W + 0.06);
    expect((p0[2] + p0[5]) / 2).toBeCloseTo(0);
  });

  it('pole houses draw a doorway that the landing hero (at the anchor) passes through', () => {
    const street = demoStreet();
    const g = buildHouseDecor(street.houses, street.props);
    const boxes = (g.userData.boxes as HouseDecorBox[]).filter((b) => b.kind === 'pole');
    let poles = 0;
    for (const h of street.houses) {
      if (!h.pole) continue;
      poles++;
      const a = poleAnchor(h);
      const mine = boxes.filter((b) => b.house === h.id);
      expect(mine).toHaveLength(3);
      for (const b of mine) {
        expect(hitsHero([...b.min, ...b.max] as DoorBox, a[0], deckY(h), a[2])).toBe(false);
      }
    }
    expect(poles).toBeGreaterThan(0);
  });

  it('line zones carry a frame around the pad, never a post on the pad', () => {
    const w = loadWorldFromObject(generateStrategyLevel());
    const posts = buildStrategyFeatures(w).find((o) => o.name === 'linePosts') as Mesh;
    const pos = posts.geometry.getAttribute('position') as BufferAttribute;
    // Each box is 8 vertices; rebuild them and check none sits over a pad's interior.
    for (let v = 0; v < pos.count; v += 8) {
      let x0 = Infinity;
      let x1 = -Infinity;
      let z0 = Infinity;
      let z1 = -Infinity;
      let y0 = Infinity;
      for (let k = 0; k < 8; k++) {
        x0 = Math.min(x0, pos.getX(v + k));
        x1 = Math.max(x1, pos.getX(v + k));
        z0 = Math.min(z0, pos.getZ(v + k));
        z1 = Math.max(z1, pos.getZ(v + k));
        y0 = Math.min(y0, pos.getY(v + k));
      }
      for (const L of w.lines) {
        const zn = L.zone;
        const inside = x0 > zn.min.x && x1 < zn.max.x && z0 > zn.min.z && z1 < zn.max.z;
        const low = y0 < zn.max.y + HERO_H;
        expect(inside && low).toBe(false);
      }
    }
  });
});
