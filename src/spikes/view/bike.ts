import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  Group,
  SphereGeometry,
  TorusGeometry,
  Vector3,
} from 'three';
import { MOUNT_COLORS as C, joint, packSkinned, part } from './kit';

/** Small rugged dirt bike, wheelbase about 1.25 m. +z is forward. */
export class BikeView {
  readonly root = new Group();
  readonly lean: Group;
  readonly fork: Group;
  readonly frontWheel: Group;
  readonly rearWheel: Group;
  /** Seat centre and footpeg targets, mount space ([left, right]). */
  readonly seat = new Vector3(0, 0.95, -0.2);
  readonly pegs = [new Vector3(0.24, 0.4, -0.05), new Vector3(-0.24, 0.4, -0.05)];
  /** Handlebar grip points in fork-local space ([left, right]); use `grip(side)` for mount space. */
  private readonly gripsLocal = [new Vector3(0.36, 0.0, 0), new Vector3(-0.36, 0.0, 0)];
  private readonly forkPivot = new Vector3(0, 1.0, 0.5);
  steerAngle = 0;

  constructor(hi = false) {
    const r = this.root;
    this.lean = joint(r, 0, 0, 0);
    const L = this.lean;
    const R = 0.33;
    const tyre = (parent: Group, y: number, z: number): Group => {
      const w = joint(parent, 0, y, z);
      part(
        w,
        new TorusGeometry(R - 0.07, 0.07, hi ? 7 : 5, hi ? 20 : 12).rotateY(Math.PI / 2),
        C.rubber,
        0,
        0,
        0,
      );
      part(
        w,
        new CylinderGeometry(0.22, 0.22, 0.09, hi ? 14 : 8).rotateZ(Math.PI / 2),
        C.metal,
        0,
        0,
        0,
      );
      part(w, new CylinderGeometry(0.07, 0.07, 0.16, 6).rotateZ(Math.PI / 2), C.metal, 0, 0, 0);
      if (hi) {
        for (let i = 0; i < 14; i++) {
          const a = (i / 14) * Math.PI * 2;
          const k = part(
            w,
            new BoxGeometry(0.1, 0.05, 0.05),
            C.rubber,
            0,
            Math.cos(a) * (R + 0.0),
            Math.sin(a) * (R + 0.0),
          );
          k.rotation.x = -a;
        }
      }
      return w;
    };
    this.rearWheel = tyre(L, R, -0.62);
    // frame, engine, tank, seat, rack
    part(L, new BoxGeometry(0.12, 0.12, 0.85), C.metal, 0, 0.55, -0.02).rotation.x = 0.06;
    part(L, new BoxGeometry(0.24, 0.3, 0.32), C.metal, 0, 0.5, 0.1);
    part(L, new CylinderGeometry(0.1, 0.1, 0.2, 8).rotateZ(Math.PI / 2), C.metal, 0, 0.66, 0.08);
    part(L, new CapsuleGeometry(0.15, 0.22, 2, 8).rotateX(Math.PI / 2), C.bike, 0, 0.93, 0.2);
    part(L, new BoxGeometry(0.28, 0.08, 0.6), C.leather, 0, 0.9, -0.28);
    part(L, new BoxGeometry(0.24, 0.04, 0.5), C.bike, 0, 0.76, -0.66).rotation.x = -0.18; // rear fender
    part(L, new BoxGeometry(0.14, 0.07, 0.72), C.metal, 0, 0.86, -0.52); // subframe: seat to rack
    part(L, new BoxGeometry(0.06, 0.06, 0.78), C.metal, 0.1, 0.34, -0.38).rotation.x = -0.12; // swingarm
    part(L, new BoxGeometry(0.06, 0.06, 0.78), C.metal, -0.1, 0.34, -0.38).rotation.x = -0.12;
    part(
      L,
      new CylinderGeometry(0.035, 0.03, 0.7, 6).rotateX(Math.PI / 2),
      C.metal,
      0.19,
      0.42,
      -0.35,
    ); // exhaust
    part(L, new BoxGeometry(0.34, 0.03, 0.4), C.metal, 0, 0.9, -0.78); // rack
    part(L, new CylinderGeometry(0.1, 0.1, 0.4, 8).rotateZ(Math.PI / 2), C.cream, 0, 1.0, -0.78); // bedroll
    // steering fork with the front wheel, number plate and bars
    this.fork = joint(L, this.forkPivot.x, this.forkPivot.y, this.forkPivot.z);
    const rake = 0.4;
    const fl = joint(this.fork, 0, 0, 0);
    fl.rotation.x = -rake;
    for (const sx of [-1, 1])
      part(
        fl,
        new CylinderGeometry(0.025, 0.03, 0.8, 6).translate(0, -0.4, 0),
        C.metal,
        0.11 * sx,
        0,
        0,
      );
    part(fl, new BoxGeometry(0.3, 0.04, 0.12), C.metal, 0, -0.04, 0);
    part(
      this.fork,
      new CylinderGeometry(0.014, 0.014, 0.74, 6).rotateZ(Math.PI / 2),
      C.metal,
      0,
      0.12,
      -0.03,
    );
    for (const sx of [-1, 1])
      part(
        this.fork,
        new CylinderGeometry(0.02, 0.02, 0.12, 6).rotateZ(Math.PI / 2),
        C.rubber,
        0.37 * sx,
        0.12,
        -0.03,
      );
    part(
      this.fork,
      new CylinderGeometry(0.17, 0.17, 0.03, 10).rotateX(Math.PI / 2 - 0.1),
      C.cream,
      0,
      -0.02,
      0.1,
    );
    part(this.fork, new BoxGeometry(0.3, 0.05, 0.4), C.bike, 0, -0.5, 0.18).rotation.x = -0.2; // front fender
    this.frontWheel = joint(fl, 0, -0.77, 0.0);
    this.frontWheel.rotation.x = rake; // keep the wheel upright inside the raked fork
    const front = tyre(this.frontWheel, 0, 0);
    void front;
    void SphereGeometry;
    packSkinned(r, 0.6, 1.2);
  }

  /** Handlebar grip in mount space for the current steer (call after update). */
  grip(side: 0 | 1, out: Vector3): Vector3 {
    const g = this.gripsLocal[side];
    const c = Math.cos(this.steerAngle);
    const s = Math.sin(this.steerAngle);
    return out.set(
      this.forkPivot.x + g.x * c,
      this.forkPivot.y + 0.12,
      this.forkPivot.z - 0.03 - g.x * s,
    );
  }

  /** distance travelled this frame in metres, steer -1..1, lean -1..1, squash 0..1 on landing. */
  update(dist: number, steer: number, lean: number, squash: number): void {
    this.steerAngle = steer * 0.35;
    this.fork.rotation.y = this.steerAngle;
    this.frontWheel.rotation.x += dist / 0.33;
    this.rearWheel.rotation.x += dist / 0.33;
    this.lean.rotation.z = -lean * 0.3;
    this.lean.position.y = -squash * 0.06;
  }
}
