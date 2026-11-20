import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HeroState } from '../../src/core/hero';
import { InputFrame } from '../../src/core/input';
import { step } from '../../src/core/sim';
import { planeY } from '../../src/content/strategy/gen';
import { loadWorldFromObject } from '../../src/content/load';
import { compileLevel, roofHeight, validate } from '../../src/content/builder/compile';
import { addEdge, addHouse, setGoal, setStart } from '../../src/content/builder/model';
import {
  emptyLevel,
  parseBuilderLevel,
  serializeBuilderLevel,
} from '../../src/content/builder/format';
import type { BuilderLevel } from '../../src/content/builder/format';
import { kitSampleLevel, sampleLevel } from '../../src/content/builder/sample';

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

describe('kit v2 archetype houses', () => {
  it('a house without archetype compiles exactly as before (sample is byte-identical in shape)', () => {
    const l = sampleLevel();
    expect(l.houses.every((h) => h.archetype === undefined)).toBe(true);
    expect(roofHeight(l.houses[0])).toBe(planeY(0) + 11);
  });

  it('archetype houses use the kit decks 3.2 / 6.0 m and the sample validates', () => {
    const l = kitSampleLevel();
    const r = validate(l);
    expect(r.errors).toEqual([]);
    expect(roofHeight(l.houses[2])).toBeCloseTo(planeY(-30) + 0.4 + 2.8, 5);
    expect(roofHeight(l.houses[1])).toBeCloseTo(planeY(-30) + 0.4 + 5.6, 5);
  });

  it('emits through emitHouse: parapets, party walls and a loadable level', () => {
    const l = kitSampleLevel();
    const json = compileLevel(l);
    const w = loadWorldFromObject(json);
    expect(w.lines.length).toBe(1);
    expect((json.ramps ?? []).length).toBeGreaterThan(0); // C1 and C3 ramps/awnings
    const plain = compileLevel(sampleLevel());
    expect(plain.ramps).toEqual([]);
    // touching C2hi/C2lo share a wall: fewer parapets than two isolated copies
    const solo = { ...l, houses: [l.houses[1], l.houses[4]], edges: [], start: 1, goal: 4 };
    const pair = { ...l, houses: [l.houses[1], { ...l.houses[2] }], edges: [], start: 1, goal: 2 };
    expect(compileLevel(pair).solids.length).toBeLessThan(compileLevel(solo).solids.length);
  });

  it('rejects an invalid kit spec and an unknown archetype', () => {
    const l = kitSampleLevel();
    expect(() =>
      parseBuilderLevel(JSON.stringify({ ...l, houses: [{ ...l.houses[0], archetype: 'Z9' }] })),
    ).toThrow(/invalid builder level/);
    expect(parseBuilderLevel(serializeBuilderLevel(l))).toEqual(l);
  });

  it('the start deck holds the hero: spawn stands on the C1 roof', () => {
    const json = compileLevel(kitSampleLevel());
    const w = loadWorldFromObject(json);
    const s = new HeroState();
    s.px = w.spawn.x;
    s.py = w.spawn.y;
    s.pz = w.spawn.z;
    const y0 = s.py;
    for (let i = 0; i < 120; i++) step(s, new InputFrame(), w, DEFAULT_TUNING);
    expect(s.dead).toBe(0);
    expect(Math.abs(s.py - y0)).toBeLessThan(0.1);
  });
});

describe('builder fixes', () => {
  const house = (id: number, x: number, z: number, balcony = false) => ({
    id,
    x,
    z,
    lift: 0,
    storeys: 1 as const,
    balcony,
  });

  it('flags a balcony that runs into an uphill neighbour', () => {
    const l = {
      ...sampleLevel(),
      houses: [house(0, 0, 0, true), house(1, 0, 8)],
      edges: [],
      start: 0,
      goal: 1,
    };
    expect(validate(l).errors.some((m) => m.includes('balcony runs into house 1'))).toBe(true);
  });

  it('flags a third house standing in a steps strip', () => {
    const l = {
      ...sampleLevel(),
      houses: [house(0, 0, 0), house(1, 0, -20), house(2, 0, -10)],
      edges: [{ id: 0, a: 0, b: 1, kind: 'gap' as const, via: 'boxes' as const }],
      start: 0,
      goal: 1,
    };
    expect(validate(l).errors.some((m) => m.includes('stands in the steps'))).toBe(true);
  });

  it('rejects duplicate edge ids and two zips from one house on import', () => {
    const base = sampleLevel();
    const dup = { ...base, edges: [base.edges[0], { ...base.edges[1], id: base.edges[0].id }] };
    expect(() => parseBuilderLevel(JSON.stringify(dup))).toThrow();
    const zips = {
      ...base,
      edges: [
        { id: 0, a: 0, b: 1, kind: 'zip' as const },
        { id: 1, a: 0, b: 2, kind: 'zip' as const },
      ],
    };
    expect(() => parseBuilderLevel(JSON.stringify(zips))).toThrow();
  });
});
