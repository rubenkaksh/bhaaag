// One global tuning source for every mode. resolveCfg(mode) = DEFAULT_TUNING merged with
// content/config/tuning.json, then MODE_OVERRIDES[mode]. A mode may override ONLY what is listed
// in MODE_OVERRIDES (and documented in docs/config-scope.md); the test in
// tests/config/configScope.test.ts fails on any other per-mode difference.
import tuningJson from '../../content/config/tuning.json';
import { DEFAULT_TUNING } from '../core/config';
import type { Tuning } from '../core/config';
import type { GameMode } from './modes/mode';

export type TuningOverride = { [K in keyof Tuning]?: Partial<Tuning[K]> };

/** Explicit per-mode overrides of global tuning keys. Empty: no mode overrides any key today. */
export const MODE_OVERRIDES: Record<GameMode, TuningOverride> = {
  classic: {},
  chase: {},
  strategy: {},
  village: {},
};

/** Render-only camera pitch-down (deg) default per mode; ?tilt= beats it. Not a Tuning key. */
export const MODE_TILT_DEG: Record<GameMode, number> = {
  classic: 0,
  chase: 0,
  strategy: 0,
  village: 20, // owner-approved Cloud Village framing (T297): more of the drop below
};

export function mergeTuning(): Tuning {
  const src = tuningJson as unknown as Record<string, Record<string, number>>;
  const out = { ...DEFAULT_TUNING } as unknown as Record<string, Record<string, number>>;
  for (const key of Object.keys(out)) {
    const base = out[key];
    // Skip non-object keys (e.g. fixedHz): spreading a number yields {}
    // and would silently wipe the default (m1-review F14).
    if (typeof base !== 'object' || base === null) continue;
    out[key] = { ...base, ...src[key] };
  }
  const fixedHz = (tuningJson as unknown as { fixedHz?: number }).fixedHz;
  const merged = out as unknown as Tuning;
  if (typeof fixedHz === 'number') merged.fixedHz = fixedHz;
  return merged;
}

export function resolveCfg(mode: GameMode): Tuning {
  const cfg = mergeTuning() as unknown as Record<string, Record<string, number>>;
  const ov = MODE_OVERRIDES[mode] as unknown as Record<string, Record<string, number>>;
  for (const key of Object.keys(ov)) cfg[key] = { ...cfg[key], ...ov[key] };
  return cfg as unknown as Tuning;
}
