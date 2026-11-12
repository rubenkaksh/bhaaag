// Automatic zipline camera yaw (the only camera change; the player has no view control).
// Pure: no three, no DOM. Angles in radians, rig convention (+yaw turns the view right).

const DEG = Math.PI / 180;

export interface ZipYawCfg {
  zipYawDeg: number;
  zipYawMinDiagDeg: number;
  zipYawEase: number;
  sideYawDeg: number;
  sideYawSpeed: number;
  sideYawEase: number;
  sideYawEaseBack: number;
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

/**
 * Yaw offset toward the side the hero is moving sideways (T300): proportional to the sideways
 * speed vRight (screen-right m/s in the behind view), saturating at sideYawSpeed. Positive turns
 * the view right, so more of the map on that side is on screen. 0 when sideYawSpeed is 0.
 */
export function sideYawTarget(vRight: number, cfg: ZipYawCfg): number {
  if (!(cfg.sideYawSpeed > 0)) return 0;
  let k = vRight / cfg.sideYawSpeed;
  if (k > 1) k = 1;
  if (k < -1) k = -1;
  return k * cfg.sideYawDeg * DEG;
}

/** One fixed-tick ease of the side offset toward target: sideYawEase out, sideYawEaseBack (slower) back toward 0. */
export function easeSideYaw(cur: number, target: number, cfg: ZipYawCfg): number {
  const k = Math.abs(target) < Math.abs(cur) ? cfg.sideYawEaseBack : cfg.sideYawEase;
  const next = cur + (target - cur) * k;
  return Math.abs(target - next) < 1e-4 ? target : next;
}

/**
 * Dragon Chase rig yaw (rig convention) from the sim camera yaw. Behind view (default, frontPov 0): r = PI - c, the
 * same rig as classic, looking downhill along the run. Front POV (frontPov >= 0.5): the
 * camera sits ahead of the hero and looks back at the dragon (r = -c, look direction opposite to
 * the hero's travel). The sim yaw is unchanged either way,
 * so stick-up stays "hero travel direction" (towards the camera in the front view).
 */
export function chaseRigYaw(simCamYaw: number, frontPov: number): number {
  return frontPov >= 0.5 ? -simCamYaw : Math.PI - simCamYaw;
}

export interface YawOffsets {
  zip: number;
  side: number;
}

/**
 * One fixed-tick update of both automatic yaw offsets, for EVERY mode (classic, chase, strategy,
 * cloud village). Velocity is the hero's horizontal sim velocity; rig is the base rig yaw the
 * camera is built from (any view, behind or front), so vRight / vFwd are in that rig's screen
 * frame: right = (cos r, sin r), away = (sin r, -cos r) in (x, z).
 * Writes into out and returns it (no allocation per tick).
 */
export function tickYawOffsets(
  out: YawOffsets,
  rig: number,
  vx: number,
  vz: number,
  attached: boolean,
  dead: boolean,
  cfg: ZipYawCfg,
): YawOffsets {
  const vRight = vx * Math.cos(rig) + vz * Math.sin(rig);
  const vFwd = vx * Math.sin(rig) - vz * Math.cos(rig);
  out.zip = easeYawOffset(out.zip, zipYawTarget(attached && !dead, vRight, vFwd, cfg), cfg);
  // The rope has its own diagonal yaw, so the side offset eases back to 0 while attached.
  out.side = easeSideYaw(out.side, attached || dead ? 0 : sideYawTarget(vRight, cfg), cfg);
  return out;
}
