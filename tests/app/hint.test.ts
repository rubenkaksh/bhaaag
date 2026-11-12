import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { NO_ANCHOR } from '../../src/core/hook';
import { AABB } from '../../src/core/math/aabb';
import { Vec3 } from '../../src/core/math/vec3';
import { World, addAnchor, addSolid } from '../../src/core/world';
import { anchorTakeable, pickHintAnchor } from '../../src/app/hint';

const cfg = DEFAULT_TUNING;

function world(): World {
  const w = new World();
  addSolid(w, new AABB(new Vec3(-5, 0, -10), new Vec3(5, 10, 0)));
  addAnchor(w, 0, 2.5, 26); // takeable: 22 deg-ish hop, 26 m
  addAnchor(w, 0, 2.5, -90); // beyond the rope reach
  w.killPlaneY = -30;
  return w;
}

describe('pickHintAnchor (T299)', () => {
  it('picks a takeable anchor and skips an unreachable one', () => {
    const w = world();
    expect(anchorTakeable(w, cfg, 0, 10, -1, 0, 6)).toBe(true);
    expect(anchorTakeable(w, cfg, 0, 10, -1, 1, 6)).toBe(false);
    expect(pickHintAnchor(w, cfg, 0, 10, -1, 99, 6)).toBe(0);
  });
  it('returns NO_ANCHOR in line-only worlds and when nothing is in reach', () => {
    const w = world();
    expect(pickHintAnchor(w, cfg, 0, 10, -300, 0, 6)).toBe(NO_ANCHOR);
    w.lineOnly = 1;
    expect(pickHintAnchor(w, cfg, 0, 10, -1, 0, 6)).toBe(NO_ANCHOR);
  });
});
