// Bot-guard for graph levels (ADR 0013 section 3.6): four play styles through the real step().
import { describe, expect, it } from 'vitest';
import { GRAPH_LEVELS, loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { MOVE_BITS, playEdge, playRoute } from './graphBot';
import type { Style } from './graphBot';

const VARIANTS = 25;
const MIN: Record<Style['name'], number> = { precise: 25, late: 23, sloppy: 22, spammer: 22 };

for (const entry of GRAPH_LEVELS) {
  describe('graph level bot-guard: ' + entry.id, () => {
    const g = loadGraph(entry.id);
    const placed = placeGraph(g);
    for (const style of Object.keys(MIN) as Style['name'][]) {
      it(`${style} bot finishes >= ${MIN[style]}/${VARIANTS}`, () => {
        let ok = 0;
        const causes: string[] = [];
        for (let v = 0; v < VARIANTS; v++) {
          const r = playRoute(g, placed, style, v);
          if (r.ok) ok++;
          else if (causes.length < 3) causes.push(r.cause);
        }
        expect(ok, causes.join(' | ')).toBeGreaterThanOrEqual(MIN[style]);
      });
    }
    it('every edge alone completes (precise bot)', () => {
      const bad: string[] = [];
      for (const e of g.edges) {
        const r = playEdge(placed, e.a, e.b);
        if (!r.ok) bad.push(`${e.a}-${e.b}: ${r.cause}`);
      }
      expect(bad).toEqual([]);
    });
    it('moves are used: vault, mantle and a roll or slide fire on the precise run', () => {
      const r = playRoute(g, placed, 'precise', 0);
      expect(r.events & MOVE_BITS.HERO_EV_VAULT, 'vault').toBeTruthy();
      expect(r.events & MOVE_BITS.HERO_EV_MANTLE, 'mantle').toBeTruthy();
      expect(r.events & (MOVE_BITS.HERO_EV_SLIDE | MOVE_BITS.HERO_EV_ROLLED), 'roll/slide').toBeTruthy();
    });
  });
}
