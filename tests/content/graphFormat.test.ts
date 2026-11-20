import { describe, expect, it } from 'vitest';
import { graphLevel } from '../../src/content/graph/format';
import { placeGraph } from '../../src/content/graph/place';
import { GRAPH_LEVELS, graphEntry, loadGraph } from '../../src/content/graph/registry';

describe('graph registry', () => {
  it('lists valley-1 as Valley Run and parses every file', () => {
    expect(GRAPH_LEVELS.map((g) => g.id)).toEqual(['valley-1', 'home-street', 'hay-run']);
    expect(GRAPH_LEVELS[0].label).toBe('Valley Run');
    for (const e of GRAPH_LEVELS) expect(loadGraph(e.id).id).toBe(e.id);
  });
  it('valley-1 matches the owner graph', () => {
    const g = loadGraph('valley-1');
    expect(g.nodes).toHaveLength(10);
    expect(g.edges).toHaveLength(9);
    expect(g.decoys).toBe(8);
    expect(g.seed).toBe(20261113);
  });
  it('home look is opt-in: off for valley-1, on for home-street', () => {
    expect(graphEntry('valley-1')?.look).toBeUndefined();
    expect(graphEntry('home-street')?.look).toBe('home');
  });
});

describe('graph node archetype and ladder (hay-run kit)', () => {
  const base = JSON.parse(JSON.stringify(loadGraph('valley-1')));
  it('parses a node with archetype and ladder, rejects an unknown archetype', () => {
    const ok = {
      ...base,
      nodes: base.nodes.map((n: object, i: number) =>
        i === 1 ? { ...n, archetype: 'C2hi', ladder: 1 } : n,
      ),
    };
    expect(graphLevel.parse(ok).nodes[1]).toMatchObject({ archetype: 'C2hi', ladder: 1 });
    const bad = {
      ...base,
      nodes: base.nodes.map((n: object, i: number) => (i === 1 ? { ...n, archetype: 'Z9' } : n)),
    };
    expect(() => graphLevel.parse(bad)).toThrow();
  });
  it('place passes the archetype and ladder through to the placed house', () => {
    const id = base.nodes[1].id;
    const g = graphLevel.parse({
      ...base,
      nodes: base.nodes.map((n: { id: number }) =>
        n.id === id ? { ...n, archetype: 'C2hi', ladder: 1 } : n,
      ),
    });
    const house = placeGraph(g).houses.find((h) => h.id === id);
    expect(house?.storeys).toBe(2);
    expect(house?.eave).toBe(true);
    expect(house?.ladder).toBe(1);
  });
});
