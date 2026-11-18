// The pre-2026-11-18 ground feel: abrupt run-up (runAccel = accel) and speed above run bleeding off at the
// steering accel (carryDecay 40). Tests of legacy levels, Dragon Chase and recorded traces pin to this.
import { DEFAULT_TUNING } from '../../src/core/config';
import type { Tuning } from '../../src/core/config';

export const LEGACY_TUNING: Tuning = {
  ...DEFAULT_TUNING,
  hero: { ...DEFAULT_TUNING.hero, runAccel: DEFAULT_TUNING.hero.accel },
  landing: { ...DEFAULT_TUNING.landing, carryDecay: 40 },
};
