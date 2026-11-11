// Automatic zipline camera yaw (the only camera change; the player has no view control).
// Pure: no three, no DOM. Angles in radians, rig convention (+yaw turns the view right).

const DEG = Math.PI / 180;

export interface ZipYawCfg {
  zipYawDeg: number;
  zipYawMinDiagDeg: number;
  zipYawEase: number;
}

/**
 * Target yaw offset from the fixed behind view. vRight / vFwd are the hero's horizontal velocity
 * in the behind view's screen frame (right, and away from the camera, i.e. downhill). Returns 0 unless the hero
 * is attached and travelling diagonally (NE or NW on screen): at least zipYawMinDiagDeg off the
 * straight-away line, and not coming back towards the camera.
 */
export function zipYawTarget(
  attached: boolean,
  vRight: number,
  vFwd: number,
  cfg: ZipYawCfg,
): number {
  if (!attached || vFwd < 0) return 0;
  const off = Math.atan2(Math.abs(vRight), vFwd);
  if (off < cfg.zipYawMinDiagDeg * DEG) return 0;
  return (vRight > 0 ? 1 : -1) * cfg.zipYawDeg * DEG;
}

/** One fixed-tick ease of the offset toward target; snaps to it when within a hair. */
export function easeYawOffset(cur: number, target: number, cfg: ZipYawCfg): number {
  const next = cur + (target - cur) * cfg.zipYawEase;
  return Math.abs(target - next) < 1e-4 ? target : next;
}
