// One global tuning source for every mode. resolveCfg(mode) = DEFAULT_TUNING merged with
// content/config/tuning.json, then remote overrides (initRemoteTuning, once at boot), then
// MODE_OVERRIDES[mode]. A mode may override ONLY what is listed
// in MODE_OVERRIDES (and documented in docs/config-scope.md); the test in
// tests/config/configScope.test.ts fails on any other per-mode difference.
import tuningJson from '../../content/config/tuning.json';
import { DEFAULT_TUNING } from '../core/config';
import type { Tuning } from '../core/config';
import type { GameMode } from './modes/mode';
import { applyTuningOverrides } from './tuningOverrides';
import type { TuningWarn } from './tuningOverrides';

/** The remote-overridden base, set once at boot by initRemoteTuning; null = baked-in values only. */
let remoteBase: Tuning | null = null;

export type TuningOverride = { [K in keyof Tuning]?: Partial<Tuning[K]> };

/** Explicit per-mode overrides of global tuning keys. Today only Dragon Chase differs: sprint off (sprintSpeed = run, ADR 0018) and the old abrupt run-up and speed bleed-off (runAccel 40, carryDecay 40). */
export const MODE_OVERRIDES: Record<GameMode, TuningOverride> = {
  classic: {},
  chase: { hero: { sprintSpeed: 6, runAccel: 40 }, landing: { carryDecay: 40 } },
  strategy: {},
  village: {},
  home: {},
  'g:valley-1': {},
  'g:home-street': {},
};

/**
 * Applies remote overrides (already fetched and parsed; undefined = none) over the baked-in base.
 * Call once, before any game starts: later calls are ignored, so one run never changes its tuning.
 */
export function initRemoteTuning(overrides: unknown, warn: TuningWarn = () => undefined): void {
  if (remoteBase !== null) return;
  remoteBase = applyTuningOverrides(bakedTuning(), overrides, warn);
}

/** A fresh copy of the base tuning (remote overrides included once initRemoteTuning ran). */
export function mergeTuning(): Tuning {
  return structuredClone(remoteBase ?? bakedTuning());
}

/** DEFAULT_TUNING with content/config/tuning.json on top; no remote overrides. */
export function bakedTuning(): Tuning {
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

/** `remote`: an already clamped overlay (rowsToOverrides) applied over the base; used by tests and the publish script. Boot uses initRemoteTuning. */
export function resolveCfg(mode: GameMode, remote?: unknown): Tuning {
  const base = remote === undefined ? mergeTuning() : applyTuningOverrides(mergeTuning(), remote);
  const cfg = base as unknown as Record<string, Record<string, number>>;
  // A graph level without a MODE_OVERRIDES line plays on the base tuning (review S3).
  const ov = (MODE_OVERRIDES[mode] ?? {}) as unknown as Record<string, Record<string, number>>;
  for (const key of Object.keys(ov)) cfg[key] = { ...cfg[key], ...ov[key] };
  return cfg as unknown as Tuning;
}
