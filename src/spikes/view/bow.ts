import {
  BoxGeometry,
  BufferGeometry,
  ConeGeometry,
  CylinderGeometry,
  Group,
  Matrix4,
  Mesh,
  Quaternion,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MOUNT_COLORS, mat } from './kit';

const _up = new Vector3(0, 1, 0);

function bar(a: Vector3, b: Vector3, w: number): BufferGeometry {
  const d = b.clone().sub(a);
  const g = new BoxGeometry(w, d.length(), w);
  g.applyMatrix4(
    new Matrix4().compose(
      a.clone().addScaledVector(d, 0.5),
      new Quaternion().setFromUnitVectors(_up, d.clone().normalize()),
      new Vector3(1, 1, 1),
    ),
  );
  return g;
}

/**
 * Hunting bow, arrow and string. The grip is the origin, limbs run along y with the belly toward +z,
 * the string rests at z = REST behind the grip and the arrow flies along +z. No per-frame allocation
 * beyond the two string segments' scale and orientation.
 */
export class BowView {
  readonly group = new Group();
  private readonly arrow: Group;
  private readonly stringUp: Mesh;
  private readonly stringDn: Mesh;
  static readonly HALF = 0.55;
  static readonly REST = -0.12;
  /** Draw length at full charge, metres. */
  static readonly DRAW = 0.42;
  private readonly _a = new Vector3();
  private readonly _b = new Vector3();
  private readonly _q = new Quaternion();

  constructor() {
    const pts: Vector3[] = [];
    for (let i = -4; i <= 4; i++) {
      const t = i / 4;
      pts.push(new Vector3(0, t * BowView.HALF, BowView.REST * t * t));
    }
    const parts: BufferGeometry[] = [];
    for (let i = 0; i < pts.length - 1; i++) parts.push(bar(pts[i], pts[i + 1], 0.034));
    parts.push(new BoxGeometry(0.05, 0.16, 0.05));
    const wrap = new Mesh(mergeGeometries(parts), mat(MOUNT_COLORS.wood));
    this.group.add(wrap);
    this.stringUp = new Mesh(new BoxGeometry(0.008, 1, 0.008), mat(MOUNT_COLORS.cream));
    this.stringDn = new Mesh(new BoxGeometry(0.008, 1, 0.008), mat(MOUNT_COLORS.cream));
    this.group.add(this.stringUp, this.stringDn);
    this.arrow = new Group();
    const shaft = new Mesh(
      new CylinderGeometry(0.01, 0.01, 0.74, 5).rotateX(Math.PI / 2),
      mat(MOUNT_COLORS.wood),
    );
    const head = new Mesh(
      new ConeGeometry(0.026, 0.08, 4).rotateX(Math.PI / 2),
      mat(MOUNT_COLORS.metal),
    );
    head.position.z = 0.4;
    const fletch = new Mesh(new BoxGeometry(0.07, 0.005, 0.13), mat(MOUNT_COLORS.cream));
    fletch.position.z = -0.28;
    const fletch2 = new Mesh(new BoxGeometry(0.005, 0.07, 0.13), mat(MOUNT_COLORS.cream));
    fletch2.position.z = -0.28;
    this.arrow.add(shaft, head, fletch, fletch2);
    this.group.add(this.arrow);
  }

  /** charge 0..1 pulls the string; hasArrow hides the arrow while re-nocking. Returns nothing. */
  update(charge: number, hasArrow: boolean): void {
    const nockZ = BowView.REST - BowView.DRAW * charge;
    const tipZ = BowView.REST * 1;
    this.seg(this.stringUp, 0, BowView.HALF, tipZ, 0, 0, nockZ);
    this.seg(this.stringDn, 0, -BowView.HALF, tipZ, 0, 0, nockZ);
    this.arrow.visible = hasArrow;
    this.arrow.position.set(0, 0, nockZ + 0.3);
  }

  /** The nock point in bow space for the draw hand. */
  nock(charge: number, out: Vector3): Vector3 {
    return out.set(0, 0, BowView.REST - BowView.DRAW * charge);
  }

  private seg(
    m: Mesh,
    ax: number,
    ay: number,
    az: number,
    bx: number,
    by: number,
    bz: number,
  ): void {
    this._a.set(ax, ay, az);
    this._b.set(bx, by, bz).sub(this._a);
    const len = this._b.length();
    m.position.copy(this._a).addScaledVector(this._b, 0.5);
    m.scale.set(1, len, 1);
    m.quaternion.copy(this._q.setFromUnitVectors(_up, this._b.normalize()));
  }
}
