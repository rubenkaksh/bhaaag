// The 100-house Nagarkot -> Bhaktapur level (ADR 0011): schema, graph invariants, budgets.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import {
  HOUSE_COUNT,
  MOVE_NAMES,
  STRATEGY_SEED,
  buildStrategy,
  generateStrategyLevel,
  levelValid,
} from '../../src/content/strategy/gen';
import { NODE_ROOF } from '../../src/content/strategy/graph';

describe('strategy level', () => {
  const s = buildStrategy(STRATEGY_SEED);

  it('validates with the level schema and is deterministic', () => {
    const w = loadWorldFromObject(s.level);
    expect(w.lineOnly).toBe(1);
    expect(w.climb).toBe(1);
    const again = generateStrategyLevel(STRATEGY_SEED);
    expect(JSON.stringify(again)).toBe(JSON.stringify(s.level));
  });

  it('has 100 houses, lines, tramps, cushions and hazards', () => {
    expect(s.layout.houses.length).toBe(HOUSE_COUNT);
    expect(s.level.lines!.length).toBeGreaterThan(0);
    expect(s.level.tramps!.length).toBeGreaterThan(0);
    expect(s.level.cushions!.length).toBeGreaterThan(0);
    expect(s.level.hazards!.length).toBeGreaterThan(0);
    expect(s.layout.roads.length).toBe(3);
  });

  it('BFS: the goal is reachable, every house is reachable, there are dead ends', () => {
    const counts = [0, 0, 0, 0];
    for (const e of s.edges) counts[e.move]++;
    const summary = MOVE_NAMES.map((n, i) => n + ' ' + counts[i]).join(', ');
    // Printed once so a re-roll can be judged: seed used, moves, dead ends, escape paths.
    console.log(
      `strategy seed ${s.seed}: ${s.nodes.length} nodes, ${s.edges.length} edges (${summary}), ` +
        `${s.stats.deadEnds.length} dead ends, ${s.stats.escapePaths} escape paths, ` +
        `${s.level.lines!.length} lines, ${s.level.tramps!.length} tramps, ${s.level.cushions!.length} cushions`,
    );
    expect(s.stats.goalReached).toBe(true);
    expect(s.stats.escapePaths).toBeGreaterThanOrEqual(1);
    expect(s.stats.deadEnds.length).toBeGreaterThanOrEqual(1);
    for (const n of s.nodes) if (n.kind === NODE_ROOF) expect(s.stats.reach[n.id]).toBe(true);
    expect(levelValid(s)).toBe(true);
    expect(s.seed).toBe(STRATEGY_SEED);
  });

  it('uses every move type at least once', () => {
    const seen = new Set<number>();
    for (const e of s.edges) seen.add(e.move);
    expect(seen.size).toBe(4);
  });

  it('stays inside the renderer budgets (one merged draw per feature list)', () => {
    expect(s.level.solids.length).toBeLessThan(320);
    expect(s.level.lines!.length).toBeLessThan(80);
    expect(s.level.anchors.length).toBe(s.level.lines!.length);
  });

  it('spawns on the first roof facing downhill and ends on a cushioned goal roof', () => {
    expect(s.level.spawn[2]).toBe(-4);
    expect(s.level.spawnYaw).toBeCloseTo(Math.PI, 6);
    const last = s.layout.houses[HOUSE_COUNT - 1];
    expect(last.cushion).toBe(true);
    expect(s.level.goal!.min[2]).toBeLessThan(-400);
  });
});
