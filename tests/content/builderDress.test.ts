import { describe, expect, it } from 'vitest';
import { sampleLevel } from '../../src/content/builder/sample';
import { compileLevel } from '../../src/content/builder/compile';
import { builderHome } from '../../src/adapters/builder/dress';

describe('builder dressing (Nagarkot kit)', () => {
  const src = sampleLevel();
  const level = compileLevel(src);
  const home = builderHome(src, level);

  it('dresses every builder house with a kit house and skips exactly the roof decks', () => {
    expect(home.graph.houses.length).toBe(src.houses.length);
    const skipped = level.solids.filter((_, i) => home.graph.kitSkip?.(i)).length;
    expect(skipped).toBe(src.houses.length);
  });

  it('puts roof guard rails only on faces no link crosses, none on cushion roofs', () => {
    const guarded = home.graph.houses.filter((h) => (h.guard ?? []).length > 0);
    expect(guarded.length).toBeGreaterThan(0);
    for (const h of home.graph.houses) expect((h.guard ?? []).length).toBeLessThanOrEqual(4);
    // the goal roof is a cushion roof: no guard
    const goal = src.houses.findIndex((h) => h.id === src.goal);
    expect(home.graph.houses[goal].guard ?? []).toEqual([]);
  });

  it('leaves the collider level untouched and has no path camera', () => {
    expect(home.level).toBe(level);
    expect(home.pathCam).toBeNull();
  });
});
