// Jointed hero mannequin (ADR 0004, look amended by ADR 0005 D7): three.js
// Groups as joint pivots, rounded capsule / sphere / cylinder parts, one
// shared stock material per colour, no textures. A stylised boy: dark hair
// cap over a small face, hemp tunic dress, crimson neck scarf and waist sash (both
// with a trailing tail), dark trousers, leather gloves and shoes.
// updateHeroRig steps the pure pose maths in heroPose.ts and writes the
// channels to the joints. No per-frame allocation.
import {
  BoxGeometry,
  CapsuleGeometry,
  CylinderGeometry,
  DoubleSide,
  FrontSide,
  Euler,
  Group,
  LatheGeometry,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  SphereGeometry,
  Vector2,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { BufferGeometry, Material, Side } from 'three';
import {
  CH_BODY_PITCH,
  CH_BODY_ROLL,
  CH_ELBOW_L,
  CH_ELBOW_R,
  CH_HEAD_PITCH,
  CH_HEM_PITCH,
  CH_HEM_ROLL,
  CH_HIPS_Y,
  CH_HIPS_Z,
  CH_HIP_FLEX_L,
  CH_HIP_FLEX_R,
  CH_HIP_SPREAD_L,
  CH_HIP_SPREAD_R,
  CH_KNEE_L,
  CH_KNEE_R,
  CH_SCARF,
  CH_SHOULDER_FLEX_L,
  CH_SHOULDER_FLEX_R,
  CH_SHOULDER_RAISE_L,
  CH_SHOULDER_RAISE_R,
  CH_SPINE_PITCH,
  CH_SPINE_TWIST,
  CH_SQUASH,
  CH_SWING_PITCH,
  CH_SWING_ROLL,
  HERO_FOREARM,
  HERO_GRIP_H,
  HERO_HIP_H,
  HERO_SHOULDER_X,
  HERO_SHOULDER_Y,
  HERO_SPINE_Y,
  HERO_UPPER_ARM,
  HeroPoseState,
  stepHeroPose,
} from './heroPose';
import type { HeroPoseInput } from './heroPose';

// Palette (ADR 0006 section 2). The straw-grey tunic is desaturated and light
// so it never reads as skin; crimson stays for scarf and sash.
export const HERO_COLORS = {
  tunic: '#c9c0a3', // torso, yoke, sleeves, thigh panels
  trousers: '#2a2f3b', // pelvis, thighs, shins
  crimson: '#c4262e', // neck scarf + tail, waist sash + tail
  skin: '#a5674a', // face
  hair: '#1f1a17', // hair cap
  leather: '#4a3426', // gloves, shoes, strap, satchel
};

const HIP_X = 0.1;
const THIGH = 0.43;
const TIP_SWING = 0.7; // scarf tip extra bend relative to the first segment
const SASH_SWING = 0.6; // sash tail follows the scarf channel at this ratio

const _q = new Quaternion();
const _e = new Euler();
const _s = new Vector3(1, 1, 1);

// Clone a geometry with its transform baked in (for mergeGeometries).
function placed(
  geo: BufferGeometry,
  x: number,
  y: number,
  z: number,
  rx = 0,
  ry = 0,
  rz = 0,
): BufferGeometry {
  const g = geo.clone();
  _q.setFromEuler(_e.set(rx, ry, rz));
  g.applyMatrix4(new Matrix4().compose(new Vector3(x, y, z), _q, _s));
  return g;
}

function merged(list: BufferGeometry[]): BufferGeometry {
  const g = mergeGeometries(list);
  for (const l of list) l.dispose();
  return g;
}

// Deterministic rough hem: the bottom ring of a lathe (ring index j = last
// profile point) or an open cylinder (second row). k wraps at the seam.
function roughHem(geo: BufferGeometry, ringStart: number, ringLen: number): void {
  const pos = geo.attributes.position;
  for (let i = 0; i < ringLen; i++) {
    const k = i % (ringLen - 1);
    const idx = ringStart + i;
    const f = k % 3 === 0 ? 1.06 : 1;
    pos.setXYZ(
      idx,
      pos.getX(idx) * f,
      pos.getY(idx) + (k % 2 === 0 ? -0.025 : 0.01),
      pos.getZ(idx) * f,
    );
  }
  pos.needsUpdate = true;
  geo.computeVertexNormals();
}

function hemLathe(profile: Vector2[], segs: number): BufferGeometry {
  const g = new LatheGeometry(profile, segs);
  const n = profile.length;
  const pos = g.attributes.position;
  for (let i = 0; i <= segs; i++) {
    const idx = i * n + (n - 1);
    const k = i % segs;
    const f = k % 3 === 0 ? 1.06 : 1;
    pos.setXYZ(
      idx,
      pos.getX(idx) * f,
      pos.getY(idx) + (k % 2 === 0 ? -0.025 : 0.01),
      pos.getZ(idx) * f,
    );
  }
  pos.needsUpdate = true;
  g.computeVertexNormals();
  return g;
}

function hemCylinder(rt: number, rb: number, h: number, segs: number): BufferGeometry {
  const g = new CylinderGeometry(rt, rb, h, segs, 1, true);
  roughHem(g, segs + 1, segs + 1);
  return g;
}

function gloveGeo(side: number): BufferGeometry {
  return merged([
    placed(new CylinderGeometry(0.05, 0.058, 0.06, 7, 1, true), 0, 0.05, 0),
    placed(new BoxGeometry(0.075, 0.085, 0.045), 0, -0.005, 0),
    placed(new BoxGeometry(0.08, 0.04, 0.05), 0, -0.055, 0.03, 0.5),
    placed(new BoxGeometry(0.025, 0.05, 0.025), 0.045 * side, -0.02, 0.025),
  ]);
}

type Mats = {
  tunic: Material;
  trousers: Material;
  crimson: Material;
  skin: Material;
  hair: Material;
  leather: Material;
};
let sharedMats: Mats | null = null;

function mats(): Mats {
  if (sharedMats === null) {
    // A faint self-glow of the same hue acts as a rim/fill light so the
    // silhouette never collapses to black in shade.
    const m = (color: string, glow = 0.18, side: Side = FrontSide): Material =>
      new MeshStandardMaterial({
        color,
        roughness: 0.85,
        metalness: 0,
        emissive: color,
        emissiveIntensity: glow,
        side,
      });
    sharedMats = {
      tunic: m(HERO_COLORS.tunic, 0.1, DoubleSide),
      trousers: m(HERO_COLORS.trousers),
      crimson: m(HERO_COLORS.crimson, 0.35),
      skin: m(HERO_COLORS.skin, 0.12),
      hair: m(HERO_COLORS.hair),
      leather: m(HERO_COLORS.leather),
    };
  }
  return sharedMats;
}

function part(
  parent: Group,
  geo: BufferGeometry,
  mat: Material,
  x: number,
  y: number,
  z: number,
): Mesh {
  const mesh = new Mesh(geo, mat);
  mesh.position.set(x, y, z);
  parent.add(mesh);
  return mesh;
}

function joint(parent: Group, x: number, y: number, z: number): Group {
  const g = new Group();
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

export class HeroRig {
  readonly root: Group; // origin at the feet
  readonly pose = new HeroPoseState();
  yaw = 0; // hero facing, rad; set by the view each frame
  readonly swing: Group;
  readonly body: Group; // joint at the feet; squash scales it
  readonly yoke: Mesh; // tunic hem, driven by the hem springs
  readonly pelvis: Group;
  readonly spine: Group;
  readonly head: Group;
  readonly scarfTail: Group;
  readonly scarfTip: Group; // second scarf segment: lags the first for a secondary swing
  readonly sashTail: Group;
  readonly shoulderL: Group;
  readonly elbowL: Group;
  readonly handL: Group; // grip point (glove centre)
  readonly shoulderR: Group;
  readonly elbowR: Group;
  readonly handR: Group;
  readonly hipL: Group;
  readonly kneeL: Group;
  readonly hipR: Group;
  readonly kneeR: Group;

  constructor() {
    const M = mats();
    const pelvisGeo = new BoxGeometry(0.27, 0.17, 0.19);
    const sashGeo = new CylinderGeometry(0.195, 0.19, 0.085, 10);
    const sashTailGeo = new BoxGeometry(0.09, 0.3, 0.022);
    const yokeGeo = hemLathe(
      [new Vector2(0.16, 0.06), new Vector2(0.19, -0.04), new Vector2(0.215, -0.16)],
      10,
    );
    const torsoGeo = new LatheGeometry(
      [
        new Vector2(0, -0.06),
        new Vector2(0.17, -0.05),
        new Vector2(0.168, 0.1),
        new Vector2(0.172, 0.3),
        new Vector2(0.158, 0.44),
        new Vector2(0.095, 0.53),
        new Vector2(0, 0.55),
      ],
      10,
    );
    const strapBox = new BoxGeometry(0.045, 0.52, 0.02);
    const strapGeo = merged([
      placed(strapBox, 0, 0.23, 0.15, 0.06, 0, 0.55),
      placed(strapBox, 0, 0.23, -0.15, -0.06, 0, 0.55),
    ]);
    const neckGeo = new CylinderGeometry(0.1, 0.13, 0.1, 8);
    const tailGeo = merged([
      placed(new BoxGeometry(0.11, 0.44, 0.025), 0, -0.21, 0, 0, 0.5, 0),
      placed(new BoxGeometry(0.08, 0.3, 0.02), 0.05, -0.14, -0.01, 0, -0.6, -0.25),
    ]);
    const satchelGeo = new BoxGeometry(0.06, 0.16, 0.2);
    const headGeo = new SphereGeometry(0.14, 8, 6);
    const hairGeo = new SphereGeometry(0.153, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const upperArmGeo = new CapsuleGeometry(0.07, 0.17, 1, 6);
    const bellGeo = new CylinderGeometry(0.065, 0.1, 0.22, 8, 1, true);
    const gloveL = gloveGeo(-1);
    const gloveR = gloveGeo(1);
    const thighGeo = new CapsuleGeometry(0.085, 0.31, 1, 6);
    const panelGeo = hemCylinder(0.115, 0.135, 0.26, 8);
    const shinGeo = new CapsuleGeometry(0.07, 0.3, 1, 6);
    const shoeGeo = new CapsuleGeometry(0.06, 0.13, 1, 6);

    this.root = new Group();
    this.root.name = 'heroRig';
    this.swing = joint(this.root, 0, HERO_GRIP_H, 0);
    this.body = joint(this.swing, 0, -HERO_GRIP_H, 0);
    this.pelvis = joint(this.body, 0, HERO_HIP_H, 0);
    part(this.pelvis, pelvisGeo, M.trousers, 0, -0.01, 0);
    part(this.pelvis, sashGeo, M.crimson, 0, 0.07, 0).scale.set(1, 1, 0.82);
    this.yoke = part(this.pelvis, yokeGeo, M.tunic, 0, 0, 0);
    this.yoke.scale.set(1, 1, 0.85);
    part(this.pelvis, satchelGeo, M.leather, 0.25, -0.05, -0.03);
    this.sashTail = joint(this.pelvis, 0.15, 0.06, -0.12);
    part(this.sashTail, sashTailGeo, M.crimson, 0, -0.14, 0).rotation.z = 0.12;

    this.spine = joint(this.pelvis, 0, HERO_SPINE_Y, 0);
    part(this.spine, torsoGeo, M.tunic, 0, 0, 0).scale.set(1.1, 1, 0.82);
    // Leather satchel strap, right shoulder to left hip, chest and back.
    part(this.spine, strapGeo, M.leather, 0, 0, 0);
    part(this.spine, neckGeo, M.crimson, 0, 0.55, 0).scale.set(1, 1, 0.85);
    this.scarfTail = joint(this.spine, 0, 0.56, -0.12);
    // Two strips (merged), twisted so the tail shows a face from behind and the side.
    part(this.scarfTail, tailGeo, M.crimson, 0, 0, 0);
    this.scarfTip = joint(this.scarfTail, 0, -0.42, 0);
    part(this.scarfTip, new BoxGeometry(0.09, 0.2, 0.018), M.crimson, 0, -0.1, 0);

    this.head = joint(this.spine, 0, 0.6, 0);
    part(this.head, headGeo, M.skin, 0, 0.14, 0.008).scale.set(0.95, 1.03, 0.96);
    // Hair cap: open hemisphere tilted back, covers the crown and nape and
    // stops at the brow, so the small face shows from the front.
    part(this.head, hairGeo, M.hair, 0, 0.156, -0.012).rotation.x = -0.6;
    // Volume: a top-knot and a short brow fringe so the head reads as hair, not a cap.
    part(this.head, new SphereGeometry(0.06, 6, 4), M.hair, 0, 0.3, -0.03);
    part(this.head, new BoxGeometry(0.2, 0.04, 0.05), M.hair, 0, 0.215, 0.115).rotation.x = 0.35;

    this.shoulderL = joint(this.spine, HERO_SHOULDER_X, HERO_SHOULDER_Y, 0);
    this.shoulderR = joint(this.spine, -HERO_SHOULDER_X, HERO_SHOULDER_Y, 0);
    this.elbowL = joint(this.shoulderL, 0, -HERO_UPPER_ARM, 0);
    this.elbowR = joint(this.shoulderR, 0, -HERO_UPPER_ARM, 0);
    this.handL = joint(this.elbowL, 0, -HERO_FOREARM, 0);
    this.handR = joint(this.elbowR, 0, -HERO_FOREARM, 0);
    for (let s = 0; s < 2; s++) {
      const sh = s === 0 ? this.shoulderL : this.shoulderR;
      const el = s === 0 ? this.elbowL : this.elbowR;
      const hd = s === 0 ? this.handL : this.handR;
      part(sh, upperArmGeo, M.tunic, 0, -0.16, 0);
      part(el, bellGeo, M.tunic, 0, -0.13, 0);
      part(hd, s === 0 ? gloveL : gloveR, M.leather, 0, 0, 0);
    }

    this.hipL = joint(this.pelvis, HIP_X, -0.05, 0);
    this.hipR = joint(this.pelvis, -HIP_X, -0.05, 0);
    this.kneeL = joint(this.hipL, 0, -THIGH, 0);
    this.kneeR = joint(this.hipR, 0, -THIGH, 0);
    for (let s = 0; s < 2; s++) {
      const hp = s === 0 ? this.hipL : this.hipR;
      const kn = s === 0 ? this.kneeL : this.kneeR;
      part(hp, thighGeo, M.trousers, 0, -0.235, 0);
      part(hp, panelGeo, M.tunic, 0, -0.13, 0);
      part(kn, shinGeo, M.trousers, 0, -0.2, 0);
      const shoe = part(kn, shoeGeo, M.leather, 0, -0.44, 0.04);
      shoe.rotation.x = Math.PI / 2;
      shoe.scale.set(1, 1, 0.75);
    }
  }
}

export function createHeroRig(): HeroRig {
  return new HeroRig();
}

// Write the blended channels to the joints (three rotation signs: a limb
// hanging along -y swings forward under a negative x rotation).
export function applyHeroChannels(rig: HeroRig, ch: Float64Array): void {
  rig.swing.rotation.set(ch[CH_SWING_PITCH], 0, ch[CH_SWING_ROLL]);
  rig.pelvis.position.set(0, HERO_HIP_H + ch[CH_HIPS_Y], ch[CH_HIPS_Z]);
  rig.pelvis.rotation.set(ch[CH_BODY_PITCH], 0, ch[CH_BODY_ROLL]);
  rig.spine.rotation.set(ch[CH_SPINE_PITCH], ch[CH_SPINE_TWIST], 0);
  rig.head.rotation.x = ch[CH_HEAD_PITCH];
  rig.scarfTail.rotation.x = ch[CH_SCARF];
  rig.scarfTip.rotation.x = ch[CH_SCARF] * TIP_SWING;
  rig.sashTail.rotation.x = ch[CH_SCARF] * SASH_SWING;
  rig.shoulderL.rotation.set(-ch[CH_SHOULDER_FLEX_L], 0, ch[CH_SHOULDER_RAISE_L]);
  rig.shoulderR.rotation.set(-ch[CH_SHOULDER_FLEX_R], 0, -ch[CH_SHOULDER_RAISE_R]);
  rig.elbowL.rotation.x = -ch[CH_ELBOW_L];
  rig.elbowR.rotation.x = -ch[CH_ELBOW_R];
  rig.hipL.rotation.set(-ch[CH_HIP_FLEX_L], 0, ch[CH_HIP_SPREAD_L]);
  rig.hipR.rotation.set(-ch[CH_HIP_FLEX_R], 0, -ch[CH_HIP_SPREAD_R]);
  rig.kneeL.rotation.x = ch[CH_KNEE_L];
  rig.kneeR.rotation.x = ch[CH_KNEE_R];
  const sq = ch[CH_SQUASH];
  const q = sq < -0.12 ? -0.12 : sq > 0.18 ? 0.18 : sq;
  rig.body.scale.set(1 + 0.5 * q, 1 - q, 1 + 0.5 * q);
  rig.yoke.rotation.set(ch[CH_HEM_PITCH], 0, ch[CH_HEM_ROLL]);
}

// Call once per render frame.
export function updateHeroRig(rig: HeroRig, input: HeroPoseInput): void {
  stepHeroPose(rig.pose, input, rig.yaw);
  applyHeroChannels(rig, rig.pose.channels);
}
