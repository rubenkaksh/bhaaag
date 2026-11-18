// Pure merge of remote tuning overrides over the baked-in Tuning (no fetch, no DOM).
// The shape of the overrides is the shape of content/config/tuning.json: nested sections with
// numeric leaves, any subset. The baked Tuning is the schema: a key is accepted only if the baked
// value at the same path is a number, so no separate list of keys can drift from it.
// Rules (docs/config-scope.md, "Remote overrides"): unknown keys, wrong types and locked keys are
// skipped with one warning each; the rest of the file still applies; the input is never mutated.
import type { Tuning } from '../core/config';

export type TuningWarn = (message: string) => void;

/** Top-level keys a remote file may not change. fixedHz is locked: the sim steps at 60 Hz (locked decision). */
export const LOCKED_TUNING_KEYS: readonly string[] = ['fixedHz'];

type Bag = Record<string, unknown>;

const isBag = (v: unknown): v is Bag => typeof v === 'object' && v !== null && !Array.isArray(v);

/**
 * `base` with every valid override in `overrides` applied. Always returns a new object (a deep
 * copy of `base` when nothing applies), so callers may keep or mutate it freely.
 */
export function applyTuningOverrides(
  base: Tuning,
  overrides: unknown,
  warn: TuningWarn = () => undefined,
): Tuning {
  const out = structuredClone(base) as unknown as Bag;
  if (overrides === undefined || overrides === null) return out as unknown as Tuning;
  if (!isBag(overrides)) {
    warn('tuning overrides must be a JSON object; using defaults');
    return out as unknown as Tuning;
  }
  mergeInto(out, overrides, '', true, warn);
  return out as unknown as Tuning;
}

function mergeInto(target: Bag, src: Bag, prefix: string, top: boolean, warn: TuningWarn): void {
  for (const key of Object.keys(src)) {
    const path = prefix === '' ? key : `${prefix}.${key}`;
    if (top && LOCKED_TUNING_KEYS.includes(key)) {
      warn(`tuning key ${path} is locked; ignored`);
      continue;
    }
    if (!Object.prototype.hasOwnProperty.call(target, key)) {
      warn(`unknown tuning key ${path}; ignored`);
      continue;
    }
    const current = target[key];
    const value = src[key];
    if (isBag(current)) {
      if (isBag(value)) mergeInto(current, value, path, false, warn);
      else warn(`tuning key ${path} must be an object; ignored`);
      continue;
    }
    if (typeof current === 'number') {
      if (typeof value === 'number' && Number.isFinite(value)) target[key] = value;
      else warn(`tuning key ${path} must be a finite number; ignored`);
      continue;
    }
    warn(`tuning key ${path} has an unsupported type; ignored`);
  }
}
