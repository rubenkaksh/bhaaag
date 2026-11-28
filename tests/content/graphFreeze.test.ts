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
  // Re-recorded 2026-11-13 for review fixes M1-M3 (run-out gaps, tall parapets, 1 m hazard bands, awnings):
  // valley-1 had not shipped yet. From now on this hash is frozen.
  // Re-recorded 2026-11-13 (owner report, hero stuck on the roof parapet on diagonal ziplines): run-out gap now spans the whole
  // launch zone, spawn moved 2.8 m left of it. A shipped-level edit by explicit owner-reported bug; future changes are new levels.
  'valley-1': '2bd8c4e1',
  // Re-recorded 2026-11-25 (owner approved, "still I can enter inside the grass"): hazard lowering under patches now
  // applies only within 1 m of each tile, so the hazard list changed. docs/briefs/terrain-glitch-design.md 2.7.
  'home-street': '884b63b0',
  // New 2026-11-20 (Hay Run, kit v2 archetypes C1/C2/C3 over placer v1); frozen from here on.
  // Re-recorded 2026-11-28 after merging climbable ladders: Hay Run's ladder houses emit climb zones (world.ladders).
  'hay-run': 'b734dcfc',
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
