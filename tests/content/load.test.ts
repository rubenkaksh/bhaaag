import { describe, expect, it } from 'vitest';
import fixtureText from '../../content/test/testworld.json?raw';
import { loadWorldFromJson, loadWorldFromObject } from '../../src/content/load';
import { World, addSolid, addRamp, addAnchor } from '../../src/core/world';
import { Vec3 } from '../../src/core/math/vec3';
import { AABB } from '../../src/core/math/aabb';

describe('loadWorldFromJson (testworld.json fixture)', () => {
  it('builds a world with 5 solids, 2 ramps, 3 anchors', () => {
    const w = loadWorldFromJson(fixtureText);
    expect(w.solids.length).toBe(5);
    expect(w.ramps.length).toBe(2);
    expect(w.anchors.length).toBe(3);
  });

  it('reads spawn, spawnYaw and killPlaneY', () => {
    const w = loadWorldFromJson(fixtureText);
    expect(w.spawn.x).toBe(0);
    expect(w.spawn.y).toBe(0);
    expect(w.spawn.z).toBe(10);
    expect(w.spawnYaw).toBe(0);
    expect(w.killPlaneY).toBe(-20);
  });

  it('assigns anchor ids 0..n-1 in file order', () => {
    const w = loadWorldFromJson(fixtureText);
    for (let i = 0; i < w.anchors.length; i++) {
      expect(w.anchors[i].id).toBe(i);
    }
    expect(w.anchors[0].px).toBe(-11);
    expect(w.anchors[1].px).toBe(3);
    expect(w.anchors[2].px).toBe(13);
  });

  it('addSolid/addRamp/addAnchor return sequential ids', () => {
    const w = new World();
    const id0 = addSolid(w, new AABB(new Vec3(0, 0, 0), new Vec3(1, 1, 1)));
    const id1 = addSolid(w, new AABB(new Vec3(2, 0, 0), new Vec3(3, 1, 1)));
    const rampId = addRamp(w, new AABB(new Vec3(0, 0, 2), new Vec3(1, 1, 3)), 3, 1);
    const anchorId = addAnchor(w, 1, 2, 3);
    expect(id0).toBe(0);
    expect(id1).toBe(1);
    expect(rampId).toBe(0);
    expect(anchorId).toBe(0);
    expect(w.anchors[0].id).toBe(0);
  });

  it('rejects invalid JSON with a useful message', () => {
    expect(() => loadWorldFromJson('{"version":')).toThrow(/invalid JSON/);
  });

  it('rejects a missing field with the zod path in the message', () => {
    const obj = JSON.parse(fixtureText) as Record<string, unknown>;
    delete obj.spawn;
    expect(() => loadWorldFromJson(JSON.stringify(obj))).toThrow(/spawn/);
  });

  it('rejects min > max via the schema refine, naming the path', () => {
    const obj = JSON.parse(fixtureText) as {
      solids: { min: number[]; max: number[] }[];
    };
    obj.solids[0].min = [21, -1, -20];
    expect(() => loadWorldFromJson(JSON.stringify(obj))).toThrow(/solids\.0/);
    expect(() => loadWorldFromJson(JSON.stringify(obj))).toThrow(/min must be <= max/);
  });

  it('rejects a non-object payload', () => {
    expect(() => loadWorldFromObject(null)).toThrow(/invalid test world/);
    expect(() => loadWorldFromObject(42)).toThrow(/invalid test world/);
  });

  it('is deterministic: two loads of the same text are deep-equal', () => {
    const a = loadWorldFromJson(fixtureText);
    const b = loadWorldFromJson(fixtureText);
    expect(a).toEqual(b);
    expect(a.spawn).toEqual(b.spawn);
    expect(a.solids).toEqual(b.solids);
    expect(a.ramps).toEqual(b.ramps);
    expect(a.anchors).toEqual(b.anchors);
  });
});

describe('roofs (ADR 0002 pitched tile roofs)', () => {
  type Obj = { roofs?: { min: number[]; max: number[]; ridge: number }[] };
  const withRoof = (roof: { min: number[]; max: number[]; ridge: number }): string => {
    const obj = JSON.parse(fixtureText) as Obj;
    obj.roofs = [roof];
    return JSON.stringify(obj);
  };

  it('is optional: the fixture without roofs loads with none', () => {
    const w = loadWorldFromJson(fixtureText);
    expect(w.roofs.length).toBe(0);
    for (const r of w.ramps) expect(r.slip).toBe(0);
  });

  it('loads a roof as two slippery ramp halves appended after the plain ramps', () => {
    const w = loadWorldFromJson(withRoof({ min: [-4, 0, -5], max: [4, 2.3, 5], ridge: 1 }));
    expect(w.roofs.length).toBe(1);
    expect(w.ramps.length).toBe(4);
    expect(w.ramps[0].slip).toBe(0);
    expect(w.ramps[2].slip).toBe(1);
    expect(w.ramps[3].slip).toBe(1);
    expect(w.roofs[0].rampA).toBe(2);
    expect(w.roofs[0].rampB).toBe(3);
    expect(w.roofs[0].ridgeAxis).toBe(1);
    expect(w.roofs[0].aabb.max.y).toBe(2.3);
  });

  it('rejects a ridge at or below the eave', () => {
    expect(() =>
      loadWorldFromJson(withRoof({ min: [-4, 2, -5], max: [4, 2, 5], ridge: 0 })),
    ).toThrow(/roofs\.0: ridge must be above the eave/);
  });

  it('rejects a ridge axis other than 0 or 1', () => {
    expect(() =>
      loadWorldFromJson(withRoof({ min: [-4, 0, -5], max: [4, 2, 5], ridge: 2 })),
    ).toThrow(/roofs\.0\.ridge/);
  });

  it('rejects a footprint with no area', () => {
    expect(() =>
      loadWorldFromJson(withRoof({ min: [-4, 0, 5], max: [4, 2, 5], ridge: 0 })),
    ).toThrow(/footprint must have area/);
  });
});
