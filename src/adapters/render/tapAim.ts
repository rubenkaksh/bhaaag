// Tap-to-aim: pick the anchor nearest a screen tap. The player has no view control, so a tap on
// an anchor is the aim input. Adapter layer (three allowed).
import { Vector3 } from 'three';
import type { Camera } from 'three';

export interface TapAnchor {
  px: number;
  py: number;
  pz: number;
}

const scratch = new Vector3();

/**
 * Index of the anchor whose projected position is nearest (ndcX, ndcY), or -1 when none lies
 * within radiusNdc (distance measured with x scaled by aspect so the tolerance is round on
 * screen). Anchors behind the camera or farther than maxDist from (ox, oy, oz) are ignored.
 */
export function pickAnchorAtNdc(
  camera: Camera,
  anchors: readonly TapAnchor[],
  ndcX: number,
  ndcY: number,
  aspect: number,
  radiusNdc: number,
  ox: number,
  oy: number,
  oz: number,
  maxDist: number,
): number {
  let best = -1;
  let bestD = radiusNdc;
  for (let i = 0; i < anchors.length; i++) {
    const a = anchors[i];
    const dx = a.px - ox;
    const dy = a.py - oy;
    const dz = a.pz - oz;
    if (dx * dx + dy * dy + dz * dz > maxDist * maxDist) continue;
    scratch.set(a.px, a.py, a.pz).project(camera);
    if (scratch.z > 1 || scratch.z < -1) continue;
    const sx = (scratch.x - ndcX) * aspect;
    const sy = scratch.y - ndcY;
    const d = Math.sqrt(sx * sx + sy * sy);
    if (d < bestD) {
      bestD = d;
      best = i;
    }
  }
  return best;
}
