import { describe, expect, it } from 'vitest';
import { classicLevels } from '../../src/app/modes/levels';
import { compileLevel } from '../../src/content/builder/compile';
import {
  readLibrary,
  readLibraryLevel,
  removeFromLibrary,
  saveToLibrary,
  setLibraryVisible,
  visibleLibrary,
} from '../../src/content/builder/library';
import { sampleLevel } from '../../src/content/builder/sample';

class MemStorage {
  m = new Map<string, string>();
  getItem(k: string) {
    return this.m.get(k) ?? null;
  }
  setItem(k: string, v: string) {
    this.m.set(k, v);
  }
}

describe('builder library', () => {
  const src = sampleLevel();
  const lv = compileLevel(src);

  it('saves hidden, toggles visible, replaces without losing the flag, removes', () => {
    const st = new MemStorage();
    expect(saveToLibrary(src, lv, st, 1)).toBe(true);
    expect(readLibrary(st)).toHaveLength(1);
    expect(visibleLibrary(st)).toEqual([]);
    expect(readLibraryLevel('l:' + src.id, st)).toBeNull();
    expect(setLibraryVisible(src.id, true, st)).toBe(true);
    expect(visibleLibrary(st).map((e) => e.id)).toEqual([src.id]);
    expect(readLibraryLevel('l:' + src.id, st)).toEqual(JSON.parse(JSON.stringify(lv)));
    saveToLibrary({ ...src, name: 'Renamed' }, lv, st, 2);
    expect(readLibrary(st)).toHaveLength(1);
    expect(visibleLibrary(st)[0].name).toBe('Renamed');
    expect(removeFromLibrary(src.id, st)).toBe(true);
    expect(readLibrary(st)).toEqual([]);
  });

  it('corrupt or missing storage reads as empty', () => {
    const bad = { getItem: () => '{nope', setItem: () => undefined };
    expect(readLibrary(bad)).toEqual([]);
    expect(readLibrary(undefined)).toEqual([]);
    expect(saveToLibrary(src, lv, undefined)).toBe(false);
  });

  it('lobby lists only visible saved levels, even with legacy levels off', () => {
    expect(classicLevels(false, false, []).map((e) => e.id)).toEqual(['nagarkot-home', 'hay-run']);
    const row = classicLevels(false, false, [{ id: 'x', name: 'X', visible: true }]);
    expect(row.map((e) => e.id)).toEqual(['nagarkot-home', 'hay-run', 'l:x']);
    expect(row[2].builder).toBe('library');
  });
});
