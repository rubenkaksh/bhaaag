// Dragon Chase dragon, owner decision 2026-11-15: the TripoSR draft dragon (baked typed arrays,
// no GLB) replaces the procedural serpent of dragonView.ts. Same public surface as DragonView, so
// src/app/game.ts is unchanged apart from the import. The geometry loads lazily; until it lands
// the group is empty. One rigid mesh, one draw call, no sim impact (the catch rule is 1-D).
//
// Frame: head origin at the group-space point the serpent's head used ((hx, hy, hz)), forward -z,
// up +y. The model is 9 m nose-to-tail; MODEL_SCALE makes it about the old head-plus-neck size.
import { Group, Mesh, MeshLambertMaterial, Quaternion, Vector3 } from 'three';
import type { PerspectiveCamera } from 'three';
import type { GraphicsTier } from '../graphicsTier';
import { hillY } from '../../../core/chase/rows';
import { CATCH_DIST, FACE_FRAC, HEAD_H_OVER_W, catchPose, easeOutBack } from './catchPose';
import type { CatchPose } from './catchPose';

const MODEL_SCALE = 3.4; // ~30 m dragon: wingspan/height in line with the old 26 m envelope
const HEAD_OFFSET = 3.6; // model-space z shift that puts the snout at the group origin
const FRONT_W = 3.3 * MODEL_SCALE; // frontal width of the baked model at normal scale
const FRONT_H = 5.7 * MODEL_SCALE;
const HOVER = 7; // metres above the hill line at the head (same as the serpent)
const WEAVE_A = 3;
const WEAVE_W = 0.8;
const CATCH_FIT_H = 0.9;
const UP = new Vector3(0, 1, 0);
const Q_FLIP = new Quaternion().setFromAxisAngle(UP, Math.PI);

function clamp01(x: number): number {
  return Math.min(1, Math.max(0, x));
}

export class DragonModelView {
  readonly group = new Group();
  /** Pose node: world position of the snout, scaled and banked. */
  private readonly head = new Group();
  private readonly mat = new MeshLambertMaterial({
    vertexColors: true,
    emissive: '#3a2410',
    fog: false, // the dragon is the source of the white-out and must read through it
  });
  private mesh: Mesh | null = null;
  private disposed = false;
  private catching = false;
  private readonly target = new Vector3();
  private readonly pTop = new Vector3();
  private readonly pBot = new Vector3();
  private readonly qCam = new Quaternion();
  private readonly catchPoseScratch: CatchPose = { cx: 0, cy: 0, h: 0 };

  constructor(tier: GraphicsTier) {
    void tier;
    this.group.name = 'chase_dragon';
    this.head.name = 'dragon_head';
    this.head.scale.setScalar(MODEL_SCALE);
    this.group.add(this.head);
    void import('../decor/dragonGeometry').then((m) => {
      if (this.disposed) return;
      const mesh = new Mesh(m.decodeDragonGeometry(), this.mat);
      mesh.name = 'dragon_model';
      mesh.frustumCulled = false;
      mesh.position.z = HEAD_OFFSET;
      this.mesh = mesh;
      this.head.add(mesh);
    });
    this.update(0, 0, 0, 0, 30, 0, false);
  }

  /** One mesh for every tier. */
  setTier(tier: GraphicsTier): void {
    void tier;
  }

  /** dragonZ: head z. lunge 0..1: dips toward the hero. heroX: the head drifts after the hero. gap: dragonZ - heroZ. */
  update(
    dragonZ: number,
    time: number,
    lunge: number,
    heroX: number,
    gap: number,
    camZ: number,
    pin: boolean,
  ): void {
    const prox = clamp01((22 - gap) / 19.5);
    const hz = pin ? Math.min(dragonZ, camZ - 14) : dragonZ;
    const hillRef = pin ? hillY(camZ) : hillY(hz);
    const hx = heroX * 0.4 + Math.sin(time * WEAVE_W) * WEAVE_A + Math.sin(time * 0.37 + 1) * 0.8;
    const hy = hillRef + HOVER - prox * 3 + Math.sin(time * 0.9) * 1.2 - lunge * 7;
    if (this.catching) return; // setCatch owns the pose until it ends
    this.head.position.set(hx, hy, hz);
    this.head.quaternion.identity();
    this.head.rotation.z = Math.cos(time * WEAVE_W) * 0.22; // bank into the weave
    this.head.rotation.x = 0.08 + Math.sin(time * 1.3) * 0.04;
    this.head.scale.setScalar(MODEL_SCALE);
    this.lastX = hx;
    this.lastY = hy;
    this.lastZ = hz;
  }
  private lastX = 0;
  private lastY = 0;
  private lastZ = 0;

  /** Game-over catch beat: the snout lunges into camera space facing the lens (see catchPose.ts). */
  setCatch(camera: PerspectiveCamera, k: number, settle: number, time: number): void {
    if (k <= 0) {
      if (this.catching) {
        this.catching = false;
        this.head.position.set(this.lastX, this.lastY, this.lastZ);
      }
      return;
    }
    this.catching = true;
    camera.updateMatrixWorld();
    const p = catchPose(camera.aspect, settle, this.catchPoseScratch);
    let cy = p.cy;
    if (settle > 0) cy += Math.sin(time * 1.6) * 0.01;
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy, this.target);
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy + p.h, this.pTop);
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy - p.h, this.pBot);
    const spriteH = this.pTop.distanceTo(this.pBot);
    this.ndcOnPlane(camera, 0, 1, this.pTop);
    this.ndcOnPlane(camera, 0, -1, this.pBot);
    const visH = this.pTop.distanceTo(this.pBot);
    const faceW = (FACE_FRAC * spriteH) / HEAD_H_OVER_W;
    const sT = Math.min(faceW / FRONT_W, (CATCH_FIT_H * visH) / FRONT_H) * MODEL_SCALE;
    const e = easeOutBack(k);
    const er = Math.min(1, e);
    const head = this.head;
    head.position.lerp(this.target, e);
    camera.getWorldQuaternion(this.qCam).multiply(Q_FLIP);
    head.quaternion.slerp(this.qCam, er);
    const s = head.scale.x + (sT - head.scale.x) * e;
    head.scale.setScalar(s);
  }

  private ndcOnPlane(camera: PerspectiveCamera, x: number, y: number, out: Vector3): void {
    out.set(x, y, 0.5).applyMatrix4(camera.projectionMatrixInverse);
    out.multiplyScalar(CATCH_DIST / -out.z).applyMatrix4(camera.matrixWorld);
  }

  /** Snout centre as viewport fractions from the top-left (valid after setCatch). */
  headScreen(camera: PerspectiveCamera, out: { x: number; y: number }): void {
    this.pTop.copy(this.head.position).project(camera);
    out.x = 0.5 + this.pTop.x / 2;
    out.y = 0.5 - this.pTop.y / 2;
  }

  dispose(): void {
    this.disposed = true;
    this.mesh?.geometry.dispose();
    this.mat.dispose();
  }
}
