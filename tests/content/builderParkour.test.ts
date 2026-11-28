// Slice 5 of the builder-sync plan: the per-level parkour toggle.
import { describe, expect, it } from 'vitest';
import { loadWorldFromObject } from '../../src/content/load';
import { compileLevel } from '../../src/content/builder/compile';
import { parseBuilderLevel, serializeBuilderLevel } from '../../src/content/builder/format';
import { sampleLevel } from '../../src/content/builder/sample';

describe('builder parkour toggle', () => {
  it('absent emits nothing and plays with parkour off', () => {
    const l = sampleLevel();
    expect(l.parkour).toBeUndefined();
    const json = compileLevel(l);
    expect('parkour' in json).toBe(false);
    expect(loadWorldFromObject(json).parkour).toBe(0);
  });

  it('on emits parkour: 1 and survives a save and load', () => {
    const l = parseBuilderLevel(serializeBuilderLevel({ ...sampleLevel(), parkour: true }));
    expect(l.parkour).toBe(true);
    const json = compileLevel(l);
    expect((json as { parkour?: number }).parkour).toBe(1);
    expect(loadWorldFromObject(json).parkour).toBe(1);
  });
});
