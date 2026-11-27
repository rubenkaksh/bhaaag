// Pose of the Bhaaag hero while riding and shooting. Pure joint writes on a HeroRig (no heroPose.ts
// state machine): the pelvis sits on the seat, legs and arms are solved by two-bone IK, the torso
// twists toward the aim and the head follows. Targets are given in the rider's root space (the same
// space as the mount: no rotation between them). Allocation-free after the first call.
import { Vector3 } from 'three';
import type { Group } from 'three';
import { HERO_FOREARM, HERO_HIP_H, HERO_UPPER_ARM } from '../../adapters/render/heroPose';
import type { HeroRig } from '../../adapters/render/heroRig';
import { ik2 } from './ik';

const THIGH = 0.43;
const SHIN = 0.44;

export interface RiderAnchors {
  /** Pelvis target, mount space. */
  seat: Vector3;
  /** Foot (ankle) targets, mount space, [left, right]. */
  footL: Vector3;
  footR: Vector3;
  /** Where the non-weapon hand rests (rein or handlebar grip), mount space. */
  restHand: Vector3;
}

export interface RiderPoseInput {
  weapon: 'bow' | 'rifle';
  /** Radians relative to the mount heading, positive toward the rider's left (+x). */
  aimYaw: number;
  aimPitch: number;
  /** Bow draw 0..1. */
  charge: number;
  /** Rifle reload 0..1 progress (0 = idle). */
  reload: number;
  /** Rifle recoil 1..0, decays. */
  recoil: number;
  /** Forward lean, radians. */
  lean: number;
  bob: number;
  /** Scarf and sash flutter, same sign convention as the CH_SCARF channel. */
  flutter: number;
}

const V = {
  w: new Vector3(),
  t: new Vector3(),
  pole: new Vector3(),
  dir: new Vector3(),
  aimW: new Vector3(),
  hold: new Vector3(),
};

function toFrame(frame: Group, rig: HeroRig, rootLocal: Vector3, out: Vector3): Vector3 {
  out.copy(rootLocal);
  rig.root.localToWorld(out);
  return frame.worldToLocal(out);
}

/** Direction of the aim in the frame of a parent that is already twisted by `yawFrame`. */
function aimInFrame(yaw: number, pitch: number, yawFrame: number, out: Vector3): Vector3 {
  const cp = Math.cos(pitch);
  return out.set(Math.sin(yaw - yawFrame) * cp, Math.sin(pitch), Math.cos(yaw - yawFrame) * cp);
}

/**
 * Applies the pose. Returns the world-space (rider root space) position of the bow hand or rifle
 * hand in `weaponHand`, and the draw hand in `drawHand`, so the caller can place the prop.
 */
export function applyRiderPose(
  rig: HeroRig,
  a: RiderAnchors,
  p: RiderPoseInput,
  weaponHand: Vector3,
  drawHand: Vector3,
): void {
  const yaw = Math.max(-1.7, Math.min(1.7, p.aimYaw));
  const twist = yaw * 0.85;
  rig.root.position.set(a.seat.x, a.seat.y - HERO_HIP_H, a.seat.z);
  rig.pelvis.position.set(0, HERO_HIP_H + p.bob, 0);
  rig.pelvis.rotation.set(p.lean * 0.5, 0, 0);
  rig.spine.rotation.set(p.lean * 0.5 + 0.05, twist, 0);
  rig.head.rotation.set(-0.12 - p.lean * 0.4, yaw - twist, 0);
  rig.scarfTail.rotation.x = p.flutter;
  rig.scarfTip.rotation.x = p.flutter * 0.7;
  rig.sashTail.rotation.x = p.flutter * 0.6;
  rig.yoke.rotation.set(0.35, 0, 0);
  rig.root.updateMatrixWorld(true);

  // Legs: feet on the stirrups or pegs, knees forward and out.
  for (let s = 0; s < 2; s++) {
    const hip = s === 0 ? rig.hipL : rig.hipR;
    const knee = s === 0 ? rig.kneeL : rig.kneeR;
    const foot = s === 0 ? a.footL : a.footR;
    V.t.copy(foot).sub(rig.root.position);
    toFrame(rig.pelvis, rig, V.t, V.t);
    V.pole.set(s === 0 ? 0.35 : -0.35, 0.1, 1);
    ik2(hip, knee, THIGH, SHIN, V.t, V.pole);
  }

  // Arms.
  const bow = p.weapon === 'bow';
  const sh = rig.spine;
  aimInFrame(yaw, p.aimPitch, twist, V.dir);
  // Weapon arm: the left arm holds the bow, the right arm holds the rifle.
  const wSh = bow ? rig.shoulderL : rig.shoulderR;
  const wEl = bow ? rig.elbowL : rig.elbowR;
  const reach = HERO_UPPER_ARM + HERO_FOREARM - 0.06;
  V.hold.copy(wSh.position);
  V.hold.addScaledVector(V.dir, reach - p.recoil * 0.07);
  if (!bow) V.hold.y += p.recoil * 0.05 - Math.sin(p.reload * Math.PI) * 0.18;
  V.pole.set(bow ? 0.3 : -0.3, -0.6, 0.0);
  ik2(wSh, wEl, HERO_UPPER_ARM, HERO_FOREARM, V.hold, V.pole);
  weaponHand.copy(V.hold);
  sh.localToWorld(weaponHand);
  rig.root.worldToLocal(weaponHand);

  // Other arm: draws the string (bow) or rests on the rein/bar (rifle).
  const oSh = bow ? rig.shoulderR : rig.shoulderL;
  const oEl = bow ? rig.elbowR : rig.elbowL;
  if (bow) {
    // string hand: back along the aim from the bow grip, rising to the cheek with the draw
    V.t.copy(V.hold).addScaledVector(V.dir, -(0.12 + 0.42 * p.charge));
    V.t.y += 0.1 * p.charge;
    V.t.x -= 0.03 + 0.03 * p.charge;
    V.pole.set(-1, -0.15, -0.55);
    drawHand.copy(V.t);
  } else {
    V.t.copy(a.restHand).sub(rig.root.position);
    toFrame(sh, rig, V.t, V.t);
    V.pole.set(0.5, -0.8, -0.2);
    drawHand.copy(V.t);
  }
  ik2(oSh, oEl, HERO_UPPER_ARM, HERO_FOREARM, V.t, V.pole);
  if (bow) {
    sh.localToWorld(drawHand);
    rig.root.worldToLocal(drawHand);
  }
}
