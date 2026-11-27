// Slice 1 of the builder-sync plan: the haystack finish.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HeroState } from '../../src/core/hero';
import { AXIS_MAX, InputFrame } from '../../src/core/input';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { step } from '../../src/core/sim';
import { loadWorldFromObject } from '../../src/content/load';
import { HK } from '../../src/content/house/houseSpec';
import { compileLevel, roofHeight, validate } from '../../src/content/builder/compile';
import { hayFinish } from '../../src/content/builder/hayFinish';
import { parseBuilderLevel, serializeBuilderLevel } from '../../src/content/builder/format';
import type { BuilderLevel } from '../../src/content/builder/format';
import { kitSampleLevel, sampleLevel } from '../../src/content/builder/sample';
import { builderHome } from '../../src/adapters/builder/dress';

function fnv(t: string): string {
  let h = 2166136261;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 16777619);
  return (h >>> 0).toString(16);
}

const roofOnly = (l: BuilderLevel): BuilderLevel => {
  const { finish: _finish, ...rest } = l;
  void _finish;
  return rest;
};

describe('haystack finish', () => {
  it('a v1 file without `finish` compiles byte-identical to before the field existed', () => {
    // fingerprints taken from main@968a67a (before the field)
    expect(fnv(JSON.stringify(compileLevel(roofOnly(sampleLevel()))))).toBe('6b79b5ce');
    expect(fnv(JSON.stringify(compileLevel(roofOnly(kitSampleLevel()))))).toBe('61ea0b7a');
    const text = serializeBuilderLevel(roofOnly(sampleLevel()));
    expect(parseBuilderLevel(text).finish).toBeUndefined();
    expect(parseBuilderLevel(serializeBuilderLevel(sampleLevel())).finish).toBe('hay');
  });

  it('hay finish: one cushion in the goal box, hazards lowered under the patch, no goal-roof cushion', () => {
    const l = sampleLevel();
    const hf = hayFinish(l);
    expect(hf).not.toBeNull();
    const f = hf as NonNullable<typeof hf>;
    const json = compileLevel(l);
    const goal = json.goal as { min: number[]; max: number[] };
    expect(goal.min).toEqual(f.goal.min);
    const top = f.patch.y + HK.hayTop;
    const inGoal = (json.cushions ?? []).filter(
      (c) =>
        c.min[0] >= goal.min[0] &&
        c.max[0] <= goal.max[0] &&
        c.min[2] >= goal.min[2] &&
        c.max[2] <= goal.max[2],
    );
    expect(inGoal.length).toBe(1);
    expect(inGoal[0].max[1]).toBeCloseTo(top, 5);
    // the goal roof has no cushion
    const gh = l.houses.find((h) => h.id === l.goal) as BuilderLevel['houses'][number];
    const roofY = roofHeight(gh);
    expect(
      (json.cushions ?? []).filter((c) => Math.abs(c.max[1] - roofY) < 0.1 && c.min[2] < gh.z + 4)
        .length,
    ).toBe(0);
    // no hazard top above patch.y - 0.5 inside the patch z-range
    for (const h of json.hazards ?? []) {
      if (h.max[2] > f.patch.z0 && h.min[2] < f.patch.z1)
        expect(h.max[1]).toBeLessThanOrEqual(f.patch.y - 0.5 + 1e-9);
    }
  });

  it('validate: a house just below the goal blocks the hay', () => {
    const l = sampleLevel();
    const gh = l.houses.find((h) => h.id === l.goal) as BuilderLevel['houses'][number];
    const blocked: BuilderLevel = {
      ...l,
      houses: [...l.houses, { id: 50, x: gh.x, z: gh.z - 8, lift: 0, storeys: 1, balcony: false }],
    };
    const errs = validate(blocked).errors.join(' | ');
    expect(errs).toMatch(/haystack needs an open downhill side/);
    expect(errs).toMatch(/haystack patch overlaps house 50/);
    expect(validate(roofOnly(blocked)).errors.join(' | ')).not.toMatch(/haystack/);
  });

  it('a hero who walks off the worst-case goal roof (2 storeys, lift 12) lands in the hay and wins', () => {
    const house = (id: number, z: number) => ({
      id,
      x: 0,
      z,
      lift: 12,
      storeys: 2 as const,
      balcony: false,
    });
    const l: BuilderLevel = {
      format: 'bhaaag-level-builder',
      version: 1,
      id: 'worst-drop',
      name: 'Worst drop',
      houses: [house(0, 0), house(1, -8)],
      edges: [],
      start: 0,
      goal: 1,
      finish: 'hay',
    };
    const hf = hayFinish(l) as NonNullable<ReturnType<typeof hayFinish>>;
    const w = loadWorldFromObject(compileLevel(l));
    const s = new HeroState();
    s.px = w.spawn.x;
    s.py = w.spawn.y;
    s.pz = w.spawn.z;
    s.yaw = Math.PI;
    s.grounded = 1;
    const gx = hf.hay.x;
    const gz = hf.hay.z;
    let won = false;
    for (let i = 0; i < 1500 && s.dead === 0 && !won; i++) {
      const f = new InputFrame();
      s.camYaw = Math.atan2(gx - s.px, gz - s.pz);
      if (s.grounded === 1) f.moveY = Math.round(AXIS_MAX * 0.5);
      else {
        const d = Math.hypot(gx - s.px, gz - s.pz);
        const vt = d > 0.01 ? (s.vx * (gx - s.px) + s.vz * (gz - s.pz)) / d : 0;
        f.moveY = Math.round(AXIS_MAX * Math.min(1, Math.max(0, 0.5 * d - 0.35 * vt)));
      }
      step(s, f, w, DEFAULT_TUNING);
      const goal = w.goal;
      won = goal !== null && aabbContainsPoint(goal, s.px, s.py, s.pz);
    }
    expect(s.dead, `dead cause ${s.deadCause}`).toBe(0);
    expect(won).toBe(true);
  });

  it('builderHome dresses a hay finish with one hay prop and one patch (none for the roof finish)', () => {
    const src = sampleLevel();
    const home = builderHome(src, compileLevel(src));
    expect(home.graph.props.length).toBe(1);
    expect(home.graph.props[0].kind).toBe('hay');
    expect(home.graph.patches.length).toBe(1);
    const goalIdx = src.houses.findIndex((h) => h.id === src.goal);
    expect(home.graph.houses[goalIdx].guard ?? []).not.toContain(3);
    const plain = roofOnly(src);
    const h2 = builderHome(plain, compileLevel(plain));
    expect(h2.graph.props.length).toBe(0);
    expect(h2.graph.patches.length).toBe(0);
  });

  it('both samples validate with the hay finish', () => {
    expect(validate(sampleLevel()).errors).toEqual([]);
    expect(validate(kitSampleLevel()).errors).toEqual([]);
  });
});
