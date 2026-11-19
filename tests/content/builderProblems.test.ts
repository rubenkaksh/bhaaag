import { describe, expect, it } from 'vitest';
import { linkOptions, newProblem, validate } from '../../src/content/builder/compile';
import { addEdge, addHouse, moveHouse, setGoal, setStart } from '../../src/content/builder/model';
import { emptyLevel } from '../../src/content/builder/format';
import type { BuilderLevel } from '../../src/content/builder/format';

function two(gapZ: number): BuilderLevel {
  let l = emptyLevel('t', 'T');
  l = addHouse(l, 0, 0);
  l = addHouse(l, 0, -(8 + gapZ));
  l = setStart(l, 0);
  return setGoal(l, 1);
}

describe('problems', () => {
  it('every error carries plain text, a fix, and where it is', () => {
    const l = addEdge(two(14), 0, 1, 'gap', 'jump');
    const r = validate(l);
    const p = r.problems.find((q) => q.key.startsWith('edge:'));
    expect(p?.text).toMatch(/Jump from house 0 to 1 doesn't work/);
    expect(p?.fix.length).toBeGreaterThan(10);
    expect(p?.houses).toEqual([0, 1]);
    expect(p?.edges).toHaveLength(1);
    expect(r.errors.length).toBe(r.problems.filter((q) => q.level === 'error').length);
  });

  it('global problems have no location but still a fix', () => {
    const r = validate(emptyLevel('e', 'E'));
    const p = r.problems.find((q) => q.key === 'nostart');
    expect(p?.houses).toEqual([]);
    expect(p?.fix).toMatch(/Set start/);
  });

  it('newProblem flags an edit that breaks a link, not one that keeps things as they were', () => {
    const ok = addEdge(two(3), 0, 1, 'gap', 'jump');
    const before = validate(ok);
    expect(before.ok).toBe(true);
    expect(newProblem(before, validate(moveHouse(ok, 1, 0, -30)))?.key).toMatch(/^edge:/);
    expect(newProblem(before, before)).toBeNull();
    // already-broken links do not block unrelated edits
    const bad = addEdge(two(14), 0, 1, 'gap', 'jump');
    const rb = validate(bad);
    expect(newProblem(rb, validate(moveHouse(bad, 1, 0, -23)))).toBeNull();
  });

  it('linkOptions says which link types would be accepted', () => {
    const near = linkOptions(two(3), 0, 1);
    expect(near.jump).toBe(true);
    const far = linkOptions(two(14), 0, 1);
    expect(far.jump).toBe(false);
    expect(far.zip).toBe(true);
  });
});
