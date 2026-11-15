import { describe, expect, it } from 'vitest';
import { GRAPH_LEVELS, graphEntry, loadGraph } from '../../src/content/graph/registry';

describe('graph registry', () => {
  it('lists valley-1 as Valley Run and parses every file', () => {
    expect(GRAPH_LEVELS.map((g) => g.id)).toEqual(['valley-1', 'home-street']);
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
