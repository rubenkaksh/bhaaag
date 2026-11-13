export const AE_LAND = 1,
  AE_JUMP = 2,
  AE_RELEASE = 4,
  AE_FIRE = 8,
  AE_ATTACH = 16,
  AE_CLING = 32,
  AE_DIE = 64,
  AE_PERFECT = 128,
  AE_MANTLE = 256, // climbed onto the held ledge (core HERO_EV_MANTLE)
  AE_VAULT = 512, // auto-vault started (core HERO_EV_VAULT)
  AE_SLIDE = 1024; // landing slide started (core HERO_EV_SLIDE)

/** Landing amplitude 0..1 from downward impact speed (m/s). 2 m/s → 0, 11 m/s → 1. */
export function landAmp(impact: number): number {
  const a = (impact - 2) / 9;
  return a < 0 ? 0 : a > 1 ? 1 : a;
}
