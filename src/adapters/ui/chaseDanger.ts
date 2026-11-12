// Dragon Chase danger cue: pure mapping from the gap fraction to a 0..1 vignette strength.
// The dragon chases from uphill, so in the behind view it is off screen; this is the only warning.

/** gapFrac: 1 = dragon far, 0 = on top of you. Silent while gapFrac >= onset, full at 0. */
export function dangerLevel(gapFrac: number, onset = 0.55): number {
  if (!(gapFrac < onset)) return 0;
  const k = (onset - Math.max(0, gapFrac)) / onset;
  return Math.min(1, k * k * 0.4 + k * 0.6);
}
