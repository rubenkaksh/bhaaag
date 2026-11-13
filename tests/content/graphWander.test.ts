// Wanderer guard (review S6, M1, M3): from every house deck centre, hold full stick at each closed
// face for 3 s. The hero must survive (blocked, or vaulting onto something safe), the spawn hero
// must not be able to walk off the roof straight ahead, and every non-party face keeps its windows.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { InputFrame, quantizeAxis } from '../../src/core/input';
import { step } from '../../src/core/sim';
import { deckY, parapetSegments, windowSlots } from '../../src/content/house/houseSpec';
import type { Face } from '../../src/content/house/houseSpec';
import { GRAPH_LEVELS, loadGraph } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { loadWorldFromObject } from '../../src/content/load';

const cfg = DEFAULT_TUNING;
// Face normals in world xz: 0 +x, 1 -x, 2 +z (uphill), 3 -z (downhill).
const DIR: [number, number][] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

for (const entry of GRAPH_LEVELS) {
  describe('graph wanderer: ' + entry.id, () => {
    const g = loadGraph(entry.id);
    const placed = placeGraph(g);

    it('survives 3 s of full stick at every closed face from every deck centre', () => {
      const bad: string[] = [];
      for (const h of placed.houses) {
        for (let f = 0; f < 4; f++) {
          const face = f as Face;
          if (h.party[f] || h.takeoff.indexOf(face) >= 0 || h.balcony === f) continue;
          if (h.stairs !== null && h.stairs.face === f) continue;
          if (parapetSegments(h, face).length === 0) continue;
          // a run-out gap on the aimed line is the player's own choice, not a trap
          if ((h.runout ?? []).some((r) => r.face === f && Math.abs(r.s) < 1.4)) continue;
          const w = loadWorldFromObject(placed.level);
          const s = new HeroState();
          s.px = h.cx;
          s.py = deckY(h);
          s.pz = h.cz;
          s.grounded = 1;
          s.mode = HERO_GROUNDED;
          const inp = new InputFrame();
          inp.moveX = quantizeAxis(DIR[f][0]);
          inp.moveY = quantizeAxis(DIR[f][1]);
          for (let i = 0; i < 180 && s.dead === 0; i++) step(s, inp, w, cfg);
          if (s.dead === 1) bad.push(`house ${h.id} face ${f}: died cause ${s.deadCause}`);
        }
      }
      expect(bad).toEqual([]);
    });

    it('the spawn hero cannot walk off the roof straight ahead', () => {
      const w = loadWorldFromObject(placed.level);
      const s = new HeroState();
      s.px = w.spawn.x;
      s.py = w.spawn.y;
      s.pz = w.spawn.z;
      s.grounded = 1;
      s.mode = HERO_GROUNDED;
      const inp = new InputFrame();
      inp.moveY = quantizeAxis(-1);
      for (let i = 0; i < 240 && s.dead === 0; i++) step(s, inp, w, cfg);
      expect(s.dead).toBe(0);
    });

    it('places awnings on decoy houses only where nothing else stands (review S4)', () => {
      const withAwning = placed.houses.filter((h) => h.awnings.length > 0);
      expect(withAwning.length).toBeGreaterThan(0);
      for (const h of withAwning) expect(h.id).toBeGreaterThanOrEqual(100);
    });

    it('zip source roofs have real geometry: not a party wall, windows kept, gap cut in the parapet', () => {
      let n = 0;
      for (const e of placed.edges) {
        if (e.kind !== 'zip') continue;
        const h = placed.houses.find((k) => k.id === e.a);
        if (h === undefined) continue;
        n++;
        expect(h.party[3], `house ${h.id}`).toBe(false);
        expect((h.runout ?? []).length, `house ${h.id} run-out`).toBe(1);
        expect(windowSlots(h).some((k) => k.face === 3)).toBe(true);
        const segs = parapetSegments(h, 3);
        expect(segs.length).toBeGreaterThan(0);
        const gap = (h.runout ?? [])[0].s;
        for (const [a, b] of segs) expect(gap < a || gap > b).toBe(true);
      }
      expect(n).toBeGreaterThan(0);
    });

    it('every non-party face keeps its windows (zip source roofs included)', () => {
      for (const h of placed.houses) {
        const faces = new Set(windowSlots(h).map((k) => k.face));
        for (let f = 0; f < 4; f++) {
          if (h.party[f]) continue;
          // an awning face shows a shop opening instead of its ground-floor windows
          const shop = h.awnings.indexOf(f as Face) >= 0;
          expect(faces.has(f as Face) || shop, `house ${h.id} face ${f}`).toBe(true);
        }
      }
    });
  });
}
