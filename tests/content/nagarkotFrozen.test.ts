// Frozen means frozen (ADR 0013 section 3.3): the default Nagarkot Run output may not drift while the
// nagarkot-home generator shares gen.ts / graph.ts. Written before any gen.ts edit (T336a, review F7).
import { describe, expect, it } from 'vitest';
import { buildStrategy } from '../../src/content/strategy/gen';

function fnv1a(text: string): string {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}

describe('Nagarkot Run freeze', () => {
  it('default level JSON hash and graph counts are unchanged', () => {
    const s = buildStrategy();
    expect(fnv1a(JSON.stringify(s.level))).toBe('7342278a');
    expect(s.graph.n).toBe(118);
    expect(s.graph.edges.length).toBe(261);
    expect(s.stats.deadEnds.length).toBe(14);
  });
});
