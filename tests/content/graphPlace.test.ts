import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { deckY } from '../../src/content/house/houseSpec';
import { loadGraph } from '../../src/content/graph/registry';
import { parseGraph } from '../../src/content/graph/format';
import { placeGraph } from '../../src/content/graph/place';

describe('graph placer', () => {
  const g = loadGraph('valley-1');
  const placed = placeGraph(g);
  it('shipped seed needs no retry and is deterministic', () => {
    expect(placed.seed).toBe(g.seed);
    expect(JSON.stringify(placeGraph(g).level)).toBe(JSON.stringify(placed.level));
  });
  it('loads as a lineOnly climb parkour world with one line per zip edge', () => {
    const w = loadWorldFromObject(placed.level);
    expect(w.lineOnly).toBe(1);
    expect(w.climb).toBe(1);
    expect(w.parkour).toBe(1);
    expect(w.lines.length).toBe(3);
    expect(w.goal).not.toBeNull();
  });
  it('has 18 houses, max 2 storeys, at most two uphill steps', () => {
    expect(placed.houses.length).toBe(g.nodes.length + g.decoys);
    for (const h of placed.houses) expect([1, 2]).toContain(h.storeys);
    expect(placed.edges.filter((e) => e.up).length).toBeLessThanOrEqual(2);
  });
  it('storeys come from the graph or rng, never from altitude', () => {
    const ds = placed.houses.map((h) => deckY(h) - h.groundY);
    expect(ds.every((d) => Math.abs(d - 3.2) < 1e-6 || Math.abs(d - 6) < 1e-6)).toBe(true);
  });
  it('rejects bad graph files', () => {
    expect(() => parseGraph({ ...g, goal: 99 })).toThrow();
    expect(() => parseGraph({ ...g, edges: [{ a: 1, b: 2, kind: 'gap' }] })).toThrow();
    expect(() =>
      parseGraph({
        ...g,
        profile: [
          [0, 0],
          [5, -1],
        ],
      }),
    ).toThrow();
  });
});
