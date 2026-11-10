import type { Tuning } from '../../core/config';
import type { ViewportLayout } from '../../app/viewport';

// Camera framing per viewport. Track 0: identity (landscape and portrait frame the same).
// Track 2 replaces the body with real portrait framing.
export type Framing = { camera: Tuning['camera']; lensShiftY: number };

export function framingFor(_v: ViewportLayout, base: Tuning['camera']): Framing {
  return { camera: base, lensShiftY: 0 };
}
