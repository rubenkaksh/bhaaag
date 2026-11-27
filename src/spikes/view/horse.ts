import {
  BoxGeometry,
  CapsuleGeometry,
  ConeGeometry,
  CylinderGeometry,
  Group,
  SphereGeometry,
  Vector3,
} from 'three';
import type { Object3D } from 'three';
import { MOUNT_COLORS as C, joint, packSkinned, part } from './kit';

/** What RiderView needs from a horse: the primitive pony or the GLB trial (horseGlb.ts). */
export interface HorseLike {
  readonly root: Object3D;
  readonly seat: Vector3;
  readonly stirrup: Vector3[];
  readonly reins: Vector3;
  update(phase: number, tuck: number, speed01: number): void;
}

/** Toy-like mountain pony, about 2 m long. +z is forward. Stock parts, packed to a few skinned draws. */
export class HorseView implements HorseLike {
  readonly root = new Group();
  readonly body: Group;
  readonly neck: Group;
  readonly tail: Group;
  readonly head: Group;
  readonly tail2: Group;
  /** [front-left, front-right, hind-left, hind-right] */
  readonly hips: Group[] = [];
  readonly knees: Group[] = [];
  /** Saddle seat centre, mount space. */
  readonly seat = new Vector3(0, 1.43, -0.05);
  /** Stirrup foot targets, mount space ([left, right]). */
  readonly stirrup = [new Vector3(0.33, 0.78, 0.0), new Vector3(-0.33, 0.78, 0.0)];
  /** Where the bow hand rests on the neck when not aiming. */
  readonly reins = new Vector3(0.0, 1.5, 0.45);

  constructor(hi = false) {
    const r = this.root;
    this.body = joint(r, 0, 0, 0);
    const b = this.body;
    const seg = hi ? 12 : 8;
    part(b, new CapsuleGeometry(0.33, 0.7, 3, seg).rotateX(Math.PI / 2), C.coat, 0, 1.0, 0);
    part(b, new SphereGeometry(0.37, seg, hi ? 8 : 5), C.coat, 0, 1.01, 0.42);
    part(b, new SphereGeometry(0.35, seg, hi ? 8 : 5), C.coat, 0, 1.02, -0.42);
    // neck, head, ears, face
    this.neck = joint(b, 0, 1.2, 0.55);
    part(
      this.neck,
      new CylinderGeometry(0.16, 0.23, 0.64, seg).translate(0, 0.32, 0),
      C.coat,
      0,
      0,
      0,
    );
    const head = joint(this.neck, 0, 0.64, 0.02);
    this.head = head;
    part(head, new SphereGeometry(0.2, seg, hi ? 8 : 5), C.coat, 0, 0.02, 0.12).scale.set(
      0.92,
      1.05,
      1.35,
    );
    part(head, new SphereGeometry(0.125, hi ? 8 : 6, hi ? 6 : 4), C.cream, 0, -0.09, 0.4);
    part(head, new BoxGeometry(0.06, 0.1, 0.4), C.cream, 0, 0.1, 0.2).rotation.x = -0.35; // blaze
    for (const sx of [-1, 1]) {
      part(head, new ConeGeometry(0.05, 0.17, 4), C.coat, 0.09 * sx, 0.22, 0.0);
      part(head, new SphereGeometry(0.028, 5, 4), C.eye, 0.15 * sx, 0.07, 0.15);
    }
    // mane along the neck crest
    for (let i = 0; i < 6; i++) {
      part(
        this.neck,
        new BoxGeometry(0.05, 0.12, 0.11),
        C.mane,
        0,
        0.08 + i * 0.1,
        -0.15,
      ).rotation.x = 0.3;
    }
    part(head, new BoxGeometry(0.2, 0.09, 0.08), C.mane, 0, 0.2, 0.0);
    // tail, two segments so it can lag
    this.tail = joint(b, 0, 1.1, -0.72);
    part(
      this.tail,
      new ConeGeometry(0.09, 0.45, 5).translate(0, -0.22, 0),
      C.mane,
      0,
      0,
      0,
    ).rotation.x = 0.0;
    this.tail2 = joint(this.tail, 0, -0.42, 0);
    part(this.tail2, new ConeGeometry(0.06, 0.3, 5).translate(0, -0.15, 0), C.mane, 0, 0, 0);
    // legs
    const legs: [number, number][] = [
      [0.2, 0.5],
      [-0.2, 0.5],
      [0.2, -0.5],
      [-0.2, -0.5],
    ];
    for (const [lx, lz] of legs) {
      const hip = joint(b, lx, 0.92, lz);
      const knee = joint(hip, 0, -0.44, 0);
      part(hip, new CapsuleGeometry(0.115, 0.28, 1, 7).translate(0, -0.2, 0), C.coat, 0, 0, 0);
      part(knee, new CapsuleGeometry(0.078, 0.3, 1, 7).translate(0, -0.2, 0), C.coat, 0, 0, 0);
      part(knee, new CylinderGeometry(0.09, 0.098, 0.12, 7, 1, true), C.cream, 0, -0.35, 0);
      part(knee, new CylinderGeometry(0.092, 0.105, 0.08, 7), C.hoof, 0, -0.43, 0.01);
      this.hips.push(hip);
      this.knees.push(knee);
    }
    // blanket, saddle, stirrups
    part(b, new BoxGeometry(0.54, 0.035, 0.62), C.ochre, 0, 1.335, -0.05);
    part(b, new BoxGeometry(0.5, 0.04, 0.56), C.blanket, 0, 1.36, -0.05);
    part(b, new BoxGeometry(0.34, 0.07, 0.4), C.leather, 0, 1.4, -0.05);
    part(b, new BoxGeometry(0.34, 0.1, 0.06), C.leather, 0, 1.43, -0.27);
    part(b, new BoxGeometry(0.1, 0.1, 0.06), C.leather, 0, 1.43, 0.14);
    for (const sx of [-1, 1]) {
      part(b, new BoxGeometry(0.03, 0.46, 0.04), C.leather, 0.32 * sx, 1.1, 0.0);
      part(b, new BoxGeometry(0.1, 0.03, 0.1), C.metal, 0.33 * sx, 0.85, 0.0);
    }
    packSkinned(r, 0.6, 1.8);
  }

  /** Gallop animation. phase in radians (distance / stride), tuck 0..1 while airborne. */
  update(phase: number, tuck: number, speed01: number): void {
    const amp = 0.35 + 0.5 * speed01;
    const offs = [0, 0.5, 2.4, 2.9];
    for (let i = 0; i < 4; i++) {
      const p = phase + offs[i];
      const swing = Math.sin(p) * amp;
      const lift = Math.max(0, Math.cos(p)) * (0.5 + 0.7 * speed01);
      // forward swing is a negative x rotation; fore legs fold the knee back, so +x on the knee
      this.hips[i].rotation.x = -(swing * (1 - tuck)) - tuck * (i < 2 ? 0.8 : -0.5);
      this.knees[i].rotation.x = lift * (1 - tuck) + tuck * (i < 2 ? 1.3 : 0.9);
    }
    this.body.position.y = Math.abs(Math.sin(phase)) * 0.05 * speed01 * (1 - tuck);
    this.neck.rotation.x = 0.62 + Math.sin(phase) * 0.05;
    this.head.rotation.x = 0.25;
    this.tail.rotation.x = 0.5 + 0.35 * speed01 + Math.sin(phase * 2) * 0.08;
    this.tail2.rotation.x = 0.25 + Math.sin(phase * 2 - 1) * 0.12;
  }
}
