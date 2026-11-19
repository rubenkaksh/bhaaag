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

describe('builder dressing: review fixes', () => {
  it('keeps step blocks (style 1, not a house body) drawn by the collider view', () => {
    const src = sampleLevel();
    const level = compileLevel(src);
    const home = builderHome(src, level);
    const keep = home.graph.keep;
    expect(keep).toBeDefined();
    const sty = level.style ?? [];
    let bodies = 0;
    let kept = 0;
    for (let i = 0; i < level.solids.length; i++) {
      if (sty[i] !== 1) continue;
      if (keep?.(i)) kept++;
      else bodies++;
    }
    expect(bodies).toBe(src.houses.length); // exactly the house bodies are left to the kit
    expect(kept).toBeGreaterThan(0); // the sample's box-step link: its blocks stay drawn
  });

  it('opens the downhill face of a roof with a zipline or trampoline and the uphill face of a balcony', () => {
    const src = sampleLevel();
    const home = builderHome(src, compileLevel(src));
    const zipFrom = new Set(src.edges.filter((e) => e.kind === 'zip').map((e) => e.a));
    src.houses.forEach((h, i) => {
      if (zipFrom.has(h.id)) expect(home.graph.houses[i].guard).not.toContain(3);
      if (h.balcony) expect(home.graph.houses[i].guard).not.toContain(2);
    });
  });
});
