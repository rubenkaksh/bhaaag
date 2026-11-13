// Frozen means frozen (ADR 0013 section 3.3): placer v1 + kit v1 output for a shipped level may not drift.
import { describe, expect, it } from 'vitest';
import { GRAPH_LEVELS, loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';

function fnv1a(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

/** One hash per shipped level id. A new placer or kit version is a new code path, never an edit here. */
const FROZEN: Record<string, string> = {
  'valley-1': '6b305c5a',
};

describe('graph level freeze', () => {
  it('every registered level has a frozen hash', () => {
    expect(Object.keys(FROZEN).sort()).toEqual(GRAPH_LEVELS.map((g) => g.id).sort());
  });
  for (const e of GRAPH_LEVELS) {
    it(`${e.id}: JSON.stringify(level) hash is unchanged`, () => {
      const placed = placeGraph(loadGraph(e.id));
      expect(fnv1a(JSON.stringify(placed.level))).toBe(FROZEN[e.id]);
    });
  }
});
