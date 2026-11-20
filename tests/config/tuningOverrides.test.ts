import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import type { Tuning } from '../../src/core/config';
import { applyTuningOverrides, LOCKED_TUNING_KEYS } from '../../src/app/tuningOverrides';

const base = (): Tuning => structuredClone(DEFAULT_TUNING);

/** Every numeric leaf of `t` as a dotted path. */
function leaves(t: unknown, prefix = ''): string[] {
  if (typeof t === 'number') return [prefix];
  if (typeof t !== 'object' || t === null) return [];
  return Object.entries(t).flatMap(([k, v]) => leaves(v, prefix ? `${prefix}.${k}` : k));
}

/** A nested object holding `value` at dotted `path`. */
function at(path: string, value: unknown): Record<string, unknown> {
  return path.split('.').reduceRight<unknown>((acc, k) => ({ [k]: acc }), value) as Record<
    string,
    unknown
  >;
}

describe('applyTuningOverrides: merge', () => {
  it('no overrides gives an equal copy, never the same object', () => {
    const b = base();
    for (const none of [undefined, null]) {
      const out = applyTuningOverrides(b, none);
      expect(out).toEqual(DEFAULT_TUNING);
      expect(out).not.toBe(b);
    }
  });

  it('a partial file changes only the keys it names', () => {
    const warn: string[] = [];
    const b = base();
    const out = applyTuningOverrides(b, { rope: { drag: 0.2 } }, (m) => warn.push(m));
    expect(out.rope.drag).toBe(0.2);
    expect(out.rope.terminal).toBe(DEFAULT_TUNING.rope.terminal);
    expect(out.hero).toEqual(DEFAULT_TUNING.hero);
    expect(warn).toEqual([]);
  });

  it('never mutates the base it was given', () => {
    const b = base();
    applyTuningOverrides(b, { rope: { drag: 0.9 } });
    expect(b).toEqual(DEFAULT_TUNING);
  });

  it('is deterministic: the same file gives the same tuning', () => {
    const file = { camera: { fov: 55 }, wall: { vCling: 8 } };
    expect(applyTuningOverrides(base(), file)).toEqual(applyTuningOverrides(base(), file));
  });

  it('a full copy of tuning.json applies to nothing new', () => {
    const out = applyTuningOverrides(base(), structuredClone(DEFAULT_TUNING));
    expect(out).toEqual(DEFAULT_TUNING);
  });

  it('every numeric leaf in the baked tuning can be overridden', () => {
    const paths = leaves(DEFAULT_TUNING).filter((p) => !LOCKED_TUNING_KEYS.includes(p));
    const warn: string[] = [];
    let file: Record<string, unknown> = {};
    for (const p of paths) file = mergeDeep(file, at(p, 1234.5));
    const out = applyTuningOverrides(base(), file, (m) => warn.push(m));
    for (const p of paths) expect(getPath(out, p)).toBe(1234.5);
    expect(warn).toEqual([]);
  });
});

describe('applyTuningOverrides: validation and fallback', () => {
  it('unknown top-level and nested keys are ignored with a warning, the rest still applies', () => {
    const warn: string[] = [];
    const out = applyTuningOverrides(
      base(),
      { rope: { drag: 0.3, bogus: 1 }, nope: { x: 1 } },
      (m) => warn.push(m),
    );
    expect(out.rope.drag).toBe(0.3);
    expect(warn).toHaveLength(2);
    expect(warn.join('\n')).toContain('rope.bogus');
    expect(warn.join('\n')).toContain('nope');
    expect(Object.keys(out)).toEqual(Object.keys(DEFAULT_TUNING));
  });

  it('a non-number, NaN or infinite value keeps the baked value and warns', () => {
    const warn: string[] = [];
    const out = applyTuningOverrides(
      base(),
      { rope: { drag: '0.3', terminal: Number.NaN, launchSpeed: Number.POSITIVE_INFINITY, minLen: null } },
      (m) => warn.push(m),
    );
    expect(out.rope).toEqual(DEFAULT_TUNING.rope);
    expect(warn).toHaveLength(4);
    expect(warn.every((m) => m.includes('finite number'))).toBe(true);
  });

  it('a section given as a number or array is ignored, and a number given an object too', () => {
    const warn: string[] = [];
    const out = applyTuningOverrides(
      base(),
      { rope: 3, aim: [1, 2], physics: { g: { x: 1 } } },
      (m) => warn.push(m),
    );
    expect(out.rope).toEqual(DEFAULT_TUNING.rope);
    expect(out.aim).toEqual(DEFAULT_TUNING.aim);
    expect(out.physics).toEqual(DEFAULT_TUNING.physics);
    expect(warn).toHaveLength(3);
  });

  it('fixedHz is locked: the sim stays at 60 Hz', () => {
    const warn: string[] = [];
    const out = applyTuningOverrides(base(), { fixedHz: 120 }, (m) => warn.push(m));
    expect(out.fixedHz).toBe(60);
    expect(warn).toEqual(['tuning key fixedHz is locked; ignored']);
  });

  it('a __proto__ key is an unknown key and does not pollute prototypes', () => {
    const warn: string[] = [];
    const file = JSON.parse('{"__proto__": {"polluted": 1}, "rope": {"drag": 0.4}}') as unknown;
    const out = applyTuningOverrides(base(), file, (m) => warn.push(m));
    expect(out.rope.drag).toBe(0.4);
    expect(({} as Record<string, unknown>).polluted).toBeUndefined();
    expect(warn.some((m) => m.includes('__proto__'))).toBe(true);
  });

  it('a file that is not an object (array, string, number) gives the defaults and one warning', () => {
    for (const bad of [[1, 2], 'tuning', 42, true]) {
      const warn: string[] = [];
      const out = applyTuningOverrides(base(), bad, (m) => warn.push(m));
      expect(out).toEqual(DEFAULT_TUNING);
      expect(warn).toHaveLength(1);
    }
  });
});

function getPath(t: unknown, path: string): unknown {
  return path.split('.').reduce<unknown>((acc, k) => (acc as Record<string, unknown>)[k], t);
}

function mergeDeep(a: Record<string, unknown>, b: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...a };
  for (const [k, v] of Object.entries(b)) {
    const cur = out[k];
    out[k] =
      typeof v === 'object' && v !== null && typeof cur === 'object' && cur !== null
        ? mergeDeep(cur as Record<string, unknown>, v as Record<string, unknown>)
        : v;
  }
  return out;
}
