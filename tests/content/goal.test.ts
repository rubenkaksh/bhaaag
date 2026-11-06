import { describe, expect, it } from 'vitest';
import levelText from '../../content/levels/l1.json?raw';
import { loadWorldFromJson } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HeroState } from '../../src/core/hero';
import { InputFrame } from '../../src/core/input';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { step } from '../../src/core/sim';

describe('L1 goal (haystack)', () => {
  it('a hero falling over the goal reaches it alive before the kill plane', () => {
    const w = loadWorldFromJson(levelText);
    const g = w.goal;
    const s = new HeroState();
    s.px = (g.min.x + g.max.x) / 2;
    s.pz = (g.min.z + g.max.z) / 2;
    s.py = g.max.y + 30;
    const f = new InputFrame();
    let won = false;
    for (let i = 0; i < 1200 && s.dead === 0 && !won; i++) {
      step(s, f, w, DEFAULT_TUNING);
      won = s.dead === 0 && aabbContainsPoint(g, s.px, s.py, s.pz);
    }
    expect(won).toBe(true);
    expect(s.dead).toBe(0);
    expect(g.min.y).toBeGreaterThan(w.killPlaneY);
  });

  it('falling past the kill plane kills with DEAD_FELL', () => {
    const w = loadWorldFromJson(levelText);
    const s = new HeroState();
    s.px = 200;
    s.pz = 200;
    s.py = 0;
    const f = new InputFrame();
    for (let i = 0; i < 3000 && s.dead === 0; i++) step(s, f, w, DEFAULT_TUNING);
    expect(s.dead).toBe(1);
    expect(s.deadCause).toBe(1);
  });
});
