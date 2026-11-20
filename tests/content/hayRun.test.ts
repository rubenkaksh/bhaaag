// Hay Run (hay-run verdict 2026-11-20, section 3): sketch route, ADR 0013 reach table, bot to the goal.
import { describe, expect, it } from 'vitest';
import { loadGraph, graphEntry, GRAPH_LEVELS } from '../../src/content/graph/registry';
import { placeGraph } from '../../src/content/graph/place';
import { deckY } from '../../src/content/house/houseSpec';
import { playRoute } from './graphBot';
import type { HouseSpec } from '../../src/content/house/houseSpec';

const g = loadGraph('hay-run');
const placed = placeGraph(g);
const byId = new Map<number, HouseSpec>(placed.houses.map((h) => [h.id, h]));
const house = (id: number): HouseSpec => byId.get(id) as HouseSpec;
const dy = (a: number, b: number): number => deckY(house(b)) - deckY(house(a));
const EPS = 1e-6;

describe('hay-run level', () => {
  it('is registered in the Classic row with the home look and path camera', () => {
    expect(GRAPH_LEVELS.map((e) => e.id)).toContain('hay-run');
    const e = graphEntry('hay-run');
    expect(e?.label).toBe('Hay Run');
    expect(e?.look).toBe('home');
    expect(e?.pathCamera).toBe(true);
  });

  it('has 3 segments with a bend, 12 route nodes and the sketch mechanics', () => {
    const segs = g.segments as NonNullable<typeof g.segments>;
    expect(segs.length).toBe(3);
    expect(new Set(segs.map((s) => s.heading)).size).toBe(3);
    expect(g.nodes.filter((n) => n.id <= 12).length).toBe(12);
    expect(g.edges.filter((e) => e.kind === 'zip').length).toBe(1);
    expect(g.edges.filter((e) => e.via === 'cushion').length).toBe(1);
    expect(g.edges.filter((e) => e.via === 'tramp').length).toBe(1);
    expect(g.nodes.filter((n) => n.archetype === 'C3').length).toBeGreaterThanOrEqual(2);
  });

  it('has a mantle climb C2lo -> C2hi of exactly one storey (2.8 m) with a ladder on the party wall', () => {
    const lo = g.nodes.find((n) => n.archetype === 'C2lo' && g.edges.some((e) => e.kind === 'touch' && e.a === n.id && g.nodes.find((m) => m.id === e.b)?.archetype === 'C2hi'));
    expect(lo).toBeDefined();
    const e = g.edges.find((x) => x.a === lo?.id && g.nodes.find((m) => m.id === x.b)?.archetype === 'C2hi');
    const hi = house((e as { b: number }).b);
    expect(dy(lo?.id as number, hi.id)).toBeCloseTo(2.8, 5);
    expect(hi.ladder).toBeDefined();
    expect(hi.party[hi.ladder as number]).toBe(true);
  });

  it('every placed edge is inside the ADR 0013 reach table', () => {
    for (const e of placed.edges) {
      if (e.b === 0) continue; // the goal hay
      const label = `${e.kind} ${e.via ?? ''} ${e.a}-${e.b}`;
      const d = dy(e.a, e.b);
      if (e.kind === 'touch') {
        expect(d, label).toBeLessThanOrEqual(2.8 + EPS); // jump + grab one storey
        expect(d, label).toBeGreaterThanOrEqual(-6 - EPS); // drop <= two storeys onto a party roof
      } else if (e.kind === 'gap' && e.via === 'jump') {
        expect(d, label).toBeLessThanOrEqual(EPS);
        expect(d, label).toBeGreaterThanOrEqual(-3 - EPS); // jump drop under one storey + hill
        const a = house(e.a);
        const b = house(e.b);
        expect(Math.abs(a.cz - b.cz) - 8, label).toBeLessThanOrEqual(3.5 + EPS); // clear gap
      } else if (e.via === 'tramp') {
        expect(d, label).toBeLessThanOrEqual(2.8 + EPS);
      } else if (e.via === 'cushion') {
        expect(d, label).toBeLessThanOrEqual(2.8 + EPS); // stairs rise out of the hay
      } else if (e.kind === 'zip') {
        const rise = (e.anchor as number[])[1] - (e.takeoff as number[])[1];
        expect(rise, label).toBeLessThan(2.6 + 2); // rope runs downhill from the hook
        const hd = Math.hypot((e.anchor as number[])[0] - e.takeoff[0], (e.anchor as number[])[2] - e.takeoff[2]);
        const drop = e.takeoff[1] + 2 - (e.anchor as number[])[1];
        const slope = (Math.atan2(drop, hd) * 180) / Math.PI;
        expect(slope, label).toBeGreaterThanOrEqual(13);
        expect(slope, label).toBeLessThanOrEqual(35);
        expect(Math.hypot(hd, drop), label).toBeLessThanOrEqual(32);
      }
    }
  });

  it('a scripted precise run reaches the goal', () => {
    const r = playRoute(g, placed, 'precise', 0);
    expect(r.ok, r.ok ? '' : r.cause).toBe(true);
  });
});
