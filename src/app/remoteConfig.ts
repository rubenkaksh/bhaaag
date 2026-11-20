// Remote config rows (leaderboards plan section 8, L2). Pure: rows in, a nested tuning overlay out.
// Rows are flat `game_config` rows, key = dotted Tuning path. Only keys listed in CLAMPS are accepted
// (an allow-list: a new tunable is not remotely changeable until someone decides its range), values are
// clamped into range, everything else is dropped with a warning. The overlay then goes through
// applyTuningOverrides, which still checks each path against the baked Tuning. Kept out of the initial
// chunk: only src/app/online and tools/publish-config.mjs import it.
import type { TuningWarn } from './tuningOverrides';

export interface ConfigRow {
  key: string;
  value: number;
}

/** Allowed range per remote key, [min, max] inclusive. A clamp keeps a bad value from breaking the level; it does not judge fairness. */
export const CLAMPS: Readonly<Record<string, readonly [number, number]>> = {
  'hero.run': [4, 8],
  'hero.runAccel': [6, 40],
  'hero.airSteer': [4, 30],
  'hero.airSteerCap': [3, 10],
  'hero.sprintSpeed': [7, 14],
  'hero.sprintAccel': [2, 20],
  'release.jumpUp': [3, 7],
  'release.jumpFwd': [0, 4],
  'release.perfectBoost': [0, 4],
  'rope.terminal': [12, 28],
  'rope.brakeDecel': [5, 20],
  'landing.vyClean': [5, 9],
  'landing.vyRoll': [10, 16],
  'landing.carryCap': [8, 14],
  'wall.vCling': [7, 8],
};

/** A nested overlay for applyTuningOverrides, or undefined when no row is usable (nothing changes). */
export function rowsToOverrides(
  rows: unknown,
  warn: TuningWarn = () => undefined,
): Record<string, Record<string, number>> | undefined {
  if (!Array.isArray(rows)) return undefined;
  const out: Record<string, Record<string, number>> = {};
  let n = 0;
  for (const r of rows as Partial<ConfigRow>[]) {
    const key = typeof r?.key === 'string' ? r.key : '';
    const range = Object.prototype.hasOwnProperty.call(CLAMPS, key) ? CLAMPS[key] : undefined;
    const v = typeof r?.value === 'string' ? Number(r.value) : r?.value;
    if (!range) warn(`remote config key ${key || '?'} is not allowed; ignored`);
    else if (typeof v !== 'number' || !Number.isFinite(v))
      warn(`remote config key ${key} is not a number; ignored`);
    else {
      const [section, name] = key.split('.');
      (out[section] ??= {})[name] = Math.min(range[1], Math.max(range[0], v));
      n++;
    }
  }
  return n > 0 ? out : undefined;
}
