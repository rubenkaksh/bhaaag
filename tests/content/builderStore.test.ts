import { afterEach, describe, expect, it } from 'vitest';
import { compileLevel } from '../../src/content/builder/compile';
import { sampleLevel } from '../../src/content/builder/sample';
import { compileShipped, shippedBuilderLevels } from '../../src/content/builder/shipped';
import {
  hasLocalBuilderLevel,
  readLocalBuilderLevel,
  savePlayLevel,
} from '../../src/content/builder/store';

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
}
afterEach(() => {
  // @ts-expect-error test cleanup
  delete globalThis.localStorage;
});

describe('builder hand-off (production path)', () => {
  it('saves a compiled level and reads it back, in any build', () => {
    // @ts-expect-error minimal Storage stub
    globalThis.localStorage = new MemStorage();
    expect(hasLocalBuilderLevel()).toBe(false);
    const lv = compileLevel(sampleLevel());
    expect(savePlayLevel(lv)).toBe(true);
    expect(hasLocalBuilderLevel()).toBe(true);
    expect(readLocalBuilderLevel()).toEqual(JSON.parse(JSON.stringify(lv)));
  });
  it('blocked or corrupt storage reads as no level', () => {
    // @ts-expect-error minimal Storage stub
    globalThis.localStorage = { getItem: () => '{not json', setItem: () => undefined };
    expect(readLocalBuilderLevel()).toBeNull();
    // @ts-expect-error stub that throws
    globalThis.localStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
    };
    expect(readLocalBuilderLevel()).toBeNull();
  });
  it('shipped builder levels (content/builders) all validate and compile', () => {
    for (const l of shippedBuilderLevels()) expect(compileShipped(l.id)).not.toBeNull();
    expect(compileShipped('no-such-level')).toBeNull();
  });
});
