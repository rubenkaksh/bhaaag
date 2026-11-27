import { Quaternion, Vector3 } from 'three';
import type { Group } from 'three';

const DOWN = new Vector3(0, -1, 0);
const _d = new Vector3();
const _p = new Vector3();
const _e = new Vector3();
const _u = new Vector3();
const _f = new Vector3();
const _q = new Quaternion();

/**
 * Two-bone solve for a limb that hangs along -y in its rest pose (the hero's arms and legs).
 * `root.position` is the shoulder/hip, in the same frame as `target` and `pole` (the parent frame of
 * `root`). `pole` is the direction the elbow/knee bends toward. Writes quaternions; no allocation.
 */
export function ik2(
  root: Group,
  mid: Group,
  a: number,
  b: number,
  target: Vector3,
  pole: Vector3,
): void {
  const S = root.position;
  _d.copy(target).sub(S);
  let len = _d.length();
  const lo = Math.abs(a - b) + 1e-3;
  const hi = a + b - 1e-3;
  len = Math.min(hi, Math.max(lo, len));
  _d.normalize();
  const x = (a * a - b * b + len * len) / (2 * len);
  const h = Math.sqrt(Math.max(0, a * a - x * x));
  _p.copy(pole).addScaledVector(_d, -pole.dot(_d));
  if (_p.lengthSq() < 1e-8) _p.set(1, 0, 0).addScaledVector(_d, -_d.x);
  _p.normalize();
  _e.copy(S).addScaledVector(_d, x).addScaledVector(_p, h);
  _u.copy(_e).sub(S).normalize();
  root.quaternion.setFromUnitVectors(DOWN, _u);
  _f.copy(S).addScaledVector(_d, len).sub(_e).normalize();
  _q.copy(root.quaternion).invert();
  _f.applyQuaternion(_q);
  mid.quaternion.setFromUnitVectors(DOWN, _f);
}
