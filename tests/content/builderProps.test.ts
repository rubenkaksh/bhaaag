// Slice 4 of the builder-sync plan: free-standing props.
import { describe, expect, it } from 'vitest';
import { STYLE_PROP } from '../../src/content/house/houseSpec';
import { compileLevel, validate } from '../../src/content/builder/compile';
import { parseBuilderLevel, serializeBuilderLevel } from '../../src/content/builder/format';
import type { BuilderLevel } from '../../src/content/builder/format';
import { addProp, moveProp, removeProp } from '../../src/content/builder/model';
import { sampleLevel } from '../../src/content/builder/sample';
import { builderHome } from '../../src/adapters/builder/dress';

const solidProps = (l: BuilderLevel): number =>
  compileLevel(l).style?.filter((s) => s === STYLE_PROP).length ?? 0;

describe('builder props', () => {
  it('round-trips through parse and serialize; a file without `props` stays without', () => {
    const base = sampleLevel();
    expect(base.props).toBeUndefined();
    const a = addProp(addProp(base, 'crate', -30, -20), 'boxPile', -34, -20);
    expect(parseBuilderLevel(serializeBuilderLevel(a)).props).toEqual(a.props);
    expect(parseBuilderLevel(serializeBuilderLevel(base)).props).toBeUndefined();
    // removing the last prop returns the file to the no-props shape, compiling identically
    const gone = removeProp(addProp(base, 'crate', -60, -20), 0);
    expect(gone.props).toBeUndefined();
    expect(JSON.stringify(compileLevel(gone))).toBe(JSON.stringify(compileLevel(base)));
  });

  it('rejects duplicate prop ids', () => {
    const l = {
      ...sampleLevel(),
      props: [
        { id: 0, kind: 'crate', x: 0, z: 0 },
        { id: 0, kind: 'hay', x: 9, z: 9 },
      ],
    };
    expect(() => parseBuilderLevel(JSON.stringify(l))).toThrow(/duplicate prop id/);
  });

  it('compiles one STYLE_PROP solid per prop and one cushion per boxPile or hay', () => {
    const base = sampleLevel();
    const n0 = solidProps(base);
    const c0 = (compileLevel(base).cushions ?? []).length;
    let l = addProp(base, 'crate', -60, -20);
    l = addProp(l, 'boxPile', -70, -20);
    l = addProp(l, 'hay', -80, -20);
    l = addProp(l, 'shed', -90, -20);
    expect(validate(l).ok).toBe(true);
    expect(solidProps(l) - n0).toBe(4);
    expect((compileLevel(l).cushions ?? []).length - c0).toBe(2);
    const home = builderHome(l, compileLevel(l));
    expect(home.graph.props.length).toBe(5); // four props plus the haystack finish
    expect(home.graph.patches.length).toBe(5);
  });

  it('a prop overlapping a house is an error; move and remove work', () => {
    const base = sampleLevel();
    const h = base.houses[0];
    const bad = addProp(base, 'crate', h.x, h.z);
    expect(validate(bad).ok).toBe(false);
    const ok = moveProp(bad, 0, -60, -20);
    expect(validate(ok).ok).toBe(true);
    expect(validate(ok).warnings.join()).toMatch(/not route-checked/);
    expect(removeProp(ok, 0).props).toBeUndefined();
  });
});
