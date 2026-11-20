import { describe, expect, it } from 'vitest';
import { Group, InstancedMesh } from 'three';
import { archetype } from '../../src/content/house/archetypes';
import { emitHouse, newDraft } from '../../src/content/house/houseKit';
import { STYLE_BALCONY, STYLE_PARAPET, validateHouse } from '../../src/content/house/houseSpec';
import { buildHouseDecor } from '../../src/adapters/render/decor/houseV2';

const emit = (h: ReturnType<typeof archetype>) => {
  const d = newDraft();
  emitHouse(h, d);
  return d;
};

describe('C1 verandah house', () => {
  const h = archetype('C1', 1, 0, 0, 0);
  const d = emit(h);
  it('is a 2-storey flat deck at 6.0 with a full-width 7.6 m balcony', () => {
    expect(d.solids[0].max[1]).toBe(6);
    const bi = d.style.indexOf(STYLE_BALCONY);
    expect(d.style.filter((s) => s === STYLE_BALCONY).length).toBe(1);
    const b = d.solids[bi];
    expect(b.max[0] - b.min[0]).toBeCloseTo(7.6, 5);
    expect(b.max[2] - b.min[2]).toBeCloseTo(1.2, 5);
    expect(b.max[1]).toBeCloseTo(3.2, 5);
  });
  it('has 13 solids: body, 5 parapet strips, balcony, 3 rails, 3 solid posts under it', () => {
    expect(d.solids.length).toBe(13);
    const posts = d.solids.filter(
      (s, i) => d.style[i] === STYLE_PARAPET && s.min[1] === 0 && s.max[1] === 3,
    );
    expect(posts.length).toBe(3);
    for (const p of posts) expect(p.max[0] - p.min[0]).toBeCloseTo(0.25, 5);
  });
  it('has one slip-1 side awning ramp on face 0', () => {
    expect(d.ramps.length).toBe(1);
    expect(d.ramps[0].slip).toBe(1);
    expect(d.ramps[0].min[0]).toBeGreaterThanOrEqual(4);
  });
  it('rejects a full balcony without a balcony or with stairs', () => {
    expect(() => validateHouse(archetype('A1', 1, 0, 0, 0, { balconyFull: true }))).toThrow();
    expect(() =>
      validateHouse(archetype('C1', 1, 0, 0, 0, { stairs: { face: 2, to: 'balcony' } })),
    ).toThrow();
  });
});

describe('C2 stepped houses', () => {
  const lo = archetype('C2lo', 1, 0, 0, 0, { party: [true, false, false, false] });
  const hi = archetype('C2hi', 2, 8, 0, 0, { party: [false, true, false, false] });
  it('decks sit at 3.2 and 6.0, a 2.8 m climb (the grab-and-mantle reach)', () => {
    const dl = emit(lo);
    const dh = emit(hi);
    expect(dl.solids[0].max[1]).toBe(3.2);
    expect(dh.solids[0].max[1]).toBe(6);
    expect(dh.solids[0].max[1] - dl.solids[0].max[1]).toBeCloseTo(2.8, 5);
  });
  it('emits a body and 3 parapet strips per house (party side open), no ramps, no collider for the eave', () => {
    for (const h of [lo, hi]) {
      const d = emit(h);
      expect(d.solids.length).toBe(1 + 3);
      expect(d.ramps.length).toBe(0);
    }
  });
  it('touching: the lo house is party on face 0 and the hi house on face 1', () => {
    expect(lo.party[0] && hi.party[1]).toBe(true);
    expect(lo.eave && hi.eave).toBe(true);
  });
});

describe('C3 plain gable house', () => {
  const h = archetype('C3', 1, 0, 0, 0);
  const d = emit(h);
  it('is a solid body up to the eaves (6.0), no parapets, no balcony', () => {
    expect(d.solids.length).toBe(1);
    expect(d.solids[0].max[1]).toBe(6);
    expect(d.style.includes(STYLE_BALCONY)).toBe(false);
  });
  it('has two slip-1 ramps at about 30 degrees meeting at the ridge', () => {
    expect(d.ramps.length).toBe(2);
    for (const r of d.ramps) {
      expect(r.slip).toBe(1);
      expect(r.min[1]).toBe(6);
      expect(r.max[1]).toBeCloseTo(8.3, 5);
      expect(r.rise).toBeCloseTo(2.3, 5);
      const deg = (Math.atan2(r.rise, 4) * 180) / Math.PI;
      expect(deg).toBeGreaterThan(28);
      expect(deg).toBeLessThan(32);
    }
    expect(d.ramps.map((r) => r.slopeAxis).sort()).toEqual([2, 3]);
  });
  it('rejects a pole or takeoff on a gable', () => {
    expect(() => validateHouse(archetype('C3', 1, 0, 0, 0, { pole: true }))).toThrow();
    expect(() => validateHouse(archetype('C3', 1, 0, 0, 0, { takeoff: [0] }))).toThrow();
  });
});

describe('C archetype render (houseV2)', () => {
  const houses = [
    archetype('C1', 1, 0, 0, 0, { ladder: 1 }),
    archetype('C2lo', 2, 20, 0, 0, { party: [true, false, false, false] }),
    archetype('C2hi', 3, 28, 0, 0, { party: [false, true, false, false] }),
    archetype('C3', 4, 40, 0, 0),
  ];
  for (const look of [undefined, 'home'] as const) {
    it(`draws without refusals and within 24 instanced meshes (look ${look ?? 'v1'})`, () => {
      const g: Group = buildHouseDecor(houses, [], 1, look === undefined ? {} : { look });
      const inst = g.children.filter((o): o is InstancedMesh => o instanceof InstancedMesh);
      expect(inst.length).toBeLessThanOrEqual(24);
      expect(g.userData.stats.refused).toBe(0);
      const kinds = (g.userData.boxes as { kind: string }[]).map((b) => b.kind);
      expect(kinds.filter((k) => k === 'eave').length).toBe(6); // 3 non-party edges on each of the two C2 houses
    });
  }
  it('ladder adds two rails and rungs as decor only', () => {
    const g = buildHouseDecor(houses, [], 1, {});
    const kinds = (g.userData.boxes as { kind: string }[]).map((b) => b.kind);
    expect(kinds.filter((k) => k === 'ladderRail').length).toBe(2);
    expect(kinds.filter((k) => k === 'ladderRung').length).toBeGreaterThan(8);
    const withLadder = emit(houses[0]);
    const without = emit(archetype('C1', 1, 0, 0, 0));
    expect(withLadder.solids.length).toBe(without.solids.length);
  });
});
