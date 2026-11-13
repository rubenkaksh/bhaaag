import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { compileLevel, validate } from '../../src/content/builder/compile';
import { addEdge, addHouse, setGoal, setStart } from '../../src/content/builder/model';
import { emptyLevel } from '../../src/content/builder/format';
import type { BuilderLevel } from '../../src/content/builder/format';
import { sampleLevel } from '../../src/content/builder/sample';

function two(
  gapZ: number,
  via: 'jump' | 'cushion' | 'tramp' | 'boxes' | 'stairs' = 'jump',
): BuilderLevel {
  let l = emptyLevel('t', 'T');
  l = addHouse(l, 0, 0);
  l = addHouse(l, 0, -(8 + gapZ));
  l = setStart(l, 0);
  l = setGoal(l, 1);
  return addEdge(l, 0, 1, 'gap', via);
}

describe('validate', () => {
  it('accepts the sample level with every drawn edge legal', () => {
    const r = validate(sampleLevel());
    expect(r.errors).toEqual([]);
    expect(r.declaredReach && r.derivedReach).toBe(true);
    expect(r.touching).toEqual([[2, 3]]);
    expect(r.edgeChecks.every((c) => c.ok)).toBe(true);
  });

  it('accepts a short jump and rejects a gap no jump crosses', () => {
    expect(validate(two(3)).ok).toBe(true);
    const far = validate(two(14));
    expect(far.ok).toBe(false);
    expect(far.errors.join(' ')).toMatch(/jump out of reach/);
  });

  it('a gap too wide for a jump needs a zipline', () => {
    let l = two(14);
    l = addEdge(l, 0, 1, 'zip');
    expect(validate(l).ok).toBe(true);
  });

  it('errors without start, goal or a drawn path', () => {
    const l = addHouse(addHouse(emptyLevel('t', 'T'), 0, 0), 0, -20);
    expect(validate(l).errors.join(' ')).toMatch(/no goal|no drawn path/);
    expect(validate(setGoal(l, 1)).errors.join(' ')).toMatch(/no drawn path/);
  });

  it('flags overlapping houses', () => {
    const l = addHouse(addHouse(emptyLevel('t', 'T'), 0, 0), 4, 0);
    expect(validate(l).errors.join(' ')).toMatch(/overlap/);
  });

  it('touching houses at one height are adjoining and walkable', () => {
    let l = addHouse(addHouse(emptyLevel('t', 'T'), 0, 0), 8, 0);
    l = setGoal(l, 1);
    const r = validate(l);
    expect(r.touching).toEqual([[0, 1]]);
    expect(r.declaredReach).toBe(true);
  });

  it('boxes and stairs need room for their steps and work both ways', () => {
    expect(validate(two(3, 'stairs')).ok).toBe(false); // 4.4 m drop needs ~9 steps
    let l = addHouse(addHouse(emptyLevel('t', 'T'), 0, 0), 0, -16, 1);
    l = setStart(setGoal(l, 1), 0);
    const ok = addEdge(l, 0, 1, 'gap', 'boxes'); // gap 8, drop 5.8 - over the 4.5 m limit
    expect(validate(ok).errors.join(' ')).toMatch(/height difference/);
  });
});

describe('compileLevel', () => {
  it('emits level JSON the game loader accepts', () => {
    const json = compileLevel(sampleLevel());
    const w = loadWorldFromObject(json);
    expect(w.lines.length).toBe(2);
    expect(w.anchors.length).toBe(2);
    expect(w.cushions.length).toBeGreaterThan(0);
    expect(w.hazards.length).toBeGreaterThan(5);
    expect(w.lineOnly).toBe(1);
  });

  it('is deterministic and does not mutate its input', () => {
    const l = sampleLevel();
    const before = JSON.stringify(l);
    expect(JSON.stringify(compileLevel(l))).toBe(JSON.stringify(compileLevel(l)));
    expect(JSON.stringify(l)).toBe(before);
  });

  it('puts the spawn on the start roof and the goal box over the goal roof', () => {
    const l = sampleLevel();
    const json = compileLevel(l);
    const s = l.houses[0];
    expect(json.spawn[0]).toBe(s.x);
    expect(json.spawn[2]).toBe(s.z);
    const g = json.goal as { min: number[]; max: number[] };
    const gh = l.houses[7];
    expect((g.min[0] + g.max[0]) / 2).toBe(gh.x);
    expect((g.min[2] + g.max[2]) / 2).toBe(gh.z);
  });

  it('emits steps for boxes and a pad for a tramp edge', () => {
    const base = compileLevel(sampleLevel());
    const noBoxes = sampleLevel();
    noBoxes.edges = noBoxes.edges.filter((e) => e.via !== 'boxes');
    expect(base.solids.length).toBeGreaterThan(compileLevel(noBoxes).solids.length);
    const t = sampleLevel();
    t.edges.push({ id: 99, a: 8, b: 1, kind: 'gap', via: 'tramp' });
    expect((compileLevel(t).tramps ?? []).length).toBe(1);
  });

  it('refuses to compile without start, goal or with overlaps', () => {
    expect(() => compileLevel(emptyLevel('t', 'T'))).toThrow(/cannot compile/);
    const l = sampleLevel();
    l.houses[1].x = 4;
    l.houses[1].z = 0;
    expect(() => compileLevel(l)).toThrow(/overlap/);
  });
});
