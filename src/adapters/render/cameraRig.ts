import type { Tuning } from '../../core/config';
import { AABB, SweepHit, sweptCapsuleVsAabb } from '../../core/math/aabb';
import { Vec3 } from '../../core/math/vec3';

export type CameraCfg = Tuning['camera'];

const DEG = Math.PI / 180;
const CAPSULE_HEIGHT_FACTOR = 2;

export class CameraRig {
  pos: Vec3 = new Vec3(0, 0, 0);
  lookAt: Vec3 = new Vec3(0, 0, 0);
  focus: Vec3 = new Vec3(0, 0, 0);
  arm = 0;
  yaw = 0;
  pitch = 0;
  fov = 0;
  initialized = 0;
}

const scratchHit = new SweepHit();
const scratchBase = new Vec3(0, 0, 0);
const scratchDelta = new Vec3(0, 0, 0);

function clamp(v: number, lo: number, hi: number): number {
  if (v < lo) return lo;
  if (v > hi) return hi;
  return v;
}

/**
 * Advance the rig one fixed tick. Angles in radians, yaw 0 faces -Z, +yaw turns right,
 * +pitch looks up. heroPos is the feet position. Result in rig.pos / rig.lookAt / rig.fov.
 * `out` is an optional SweepHit scratch (avoids the module scratch when callers share one).
 */
export function updateCamera(
  rig: CameraRig,
  heroPos: Vec3,
  yaw: number,
  pitch: number,
  heroSpeed: number,
  boxes: AABB[],
  cfg: CameraCfg,
  out?: SweepHit,
): void {
  const hit = out === undefined ? scratchHit : out;
  const speedFrac = clamp(heroSpeed / cfg.fovSpeed, 0, 1);
  let pitchWanted = pitch - cfg.downhillBias * DEG * speedFrac;
  pitchWanted = clamp(pitchWanted, cfg.pitchMin * DEG, cfg.pitchMax * DEG);
  const fovWanted = cfg.fov + (cfg.fovMax - cfg.fov) * speedFrac;

  if (rig.initialized === 0) {
    rig.initialized = 1;
    rig.focus.x = heroPos.x;
    rig.focus.y = heroPos.y;
    rig.focus.z = heroPos.z;
    rig.fov = fovWanted;
    rig.arm = cfg.dist;
  } else {
    const k = cfg.smooth;
    rig.focus.x += (heroPos.x - rig.focus.x) * k;
    rig.focus.y += (heroPos.y - rig.focus.y) * k;
    rig.focus.z += (heroPos.z - rig.focus.z) * k;
    rig.fov += (fovWanted - rig.fov) * k;
  }
  // Yaw/pitch follow the input every tick with no smoothing: the view must
  // match the direction the hero actually moves (m1-review F2). Smoothing
  // stays on focus, fov and the arm release only.
  rig.yaw = yaw;
  rig.pitch = pitchWanted;

  const sy = Math.sin(rig.yaw);
  const cy = Math.cos(rig.yaw);
  const sp = Math.sin(rig.pitch);
  const cp = Math.cos(rig.pitch);
  const headX = rig.focus.x;
  const headY = rig.focus.y + cfg.height;
  const headZ = rig.focus.z;

  // Camera sits opposite the look direction, shifted along the right vector.
  const wantX = headX - sy * cp * cfg.dist + cy * cfg.shoulder;
  const wantY = headY - sp * cfg.dist;
  const wantZ = headZ + cy * cp * cfg.dist + sy * cfg.shoulder;
  const dx = wantX - headX;
  const dyy = wantY - headY;
  const dz = wantZ - headZ;
  const len = Math.sqrt(dx * dx + dyy * dyy + dz * dz);

  let allowed = len;
  if (len > 0) {
    scratchBase.x = headX;
    scratchBase.y = headY - cfg.probeRadius;
    scratchBase.z = headZ;
    scratchDelta.x = dx;
    scratchDelta.y = dyy;
    scratchDelta.z = dz;
    let bestT = 1;
    for (let i = 0; i < boxes.length; i++) {
      sweptCapsuleVsAabb(
        scratchBase,
        CAPSULE_HEIGHT_FACTOR * cfg.probeRadius,
        cfg.probeRadius,
        scratchDelta,
        boxes[i],
        hit,
      );
      if (!hit.hit) continue;
      if (hit.t === 0) {
        // Corner collapse guard (m1-review F8): a t=0 hit whose normal does
        // not face the sweep means we are already touching/penetrating but
        // the motion does not go into the surface — ignore it so running
        // round a corner never collapses the arm to 0.
        const into = hit.nx * dx + hit.ny * dyy + hit.nz * dz;
        if (into >= 0) continue;
      }
      if (hit.t < bestT) bestT = hit.t;
    }
    allowed = len * bestT;
  }

  // Snap in instantly, ease out slowly.
  if (allowed < rig.arm) {
    rig.arm = allowed;
  } else {
    rig.arm += (allowed - rig.arm) * cfg.armRelease;
  }
  if (rig.arm > len) rig.arm = len;

  const f = len > 0 ? rig.arm / len : 0;
  rig.pos.x = headX + dx * f;
  rig.pos.y = headY + dyy * f;
  rig.pos.z = headZ + dz * f;
  rig.lookAt.x = headX;
  rig.lookAt.y = headY;
  rig.lookAt.z = headZ;
}
