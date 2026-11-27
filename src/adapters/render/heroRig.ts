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
  Float32BufferAttribute,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Quaternion,
  Skeleton,
  SkinnedMesh,
  SphereGeometry,
  TorusGeometry,
  Uint16BufferAttribute,
  Vector2,
  Vector3,
} from 'three';
import { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { BufferGeometry, Bone, Material, Side } from 'three';
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
import { HERO_HEMP, heroLook, type HeroLook, type HeroPalette } from './heroLook';

// Palette (ADR 0006 section 2, contrast pass ADR 0009) now lives in heroLook.ts. HERO_COLORS is the
// zipline-game palette (dark hemp tunic); the hunting riders use HERO_OAT.
export const HERO_COLORS = HERO_HEMP;

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

/** Tapers a vertical limb capsule: x/z scale lerps from `top` at +y to `bottom` at -y. No extra triangles. */
function taper(g: BufferGeometry, top: number, bottom: number): BufferGeometry {
  const pos = g.getAttribute('position');
  let lo = Infinity;
  let hi = -Infinity;
  for (let i = 0; i < pos.count; i++) {
    const y = pos.getY(i);
    if (y < lo) lo = y;
    if (y > hi) hi = y;
  }
  for (let i = 0; i < pos.count; i++) {
    const k = bottom + (top - bottom) * ((pos.getY(i) - lo) / (hi - lo));
    pos.setX(i, pos.getX(i) * k);
    pos.setZ(i, pos.getZ(i) * k);
  }
  pos.needsUpdate = true;
  // Capsules duplicate the seam and pole vertices; weld them so recomputed normals have no crease.
  g.deleteAttribute('uv');
  g.deleteAttribute('normal');
  const welded = mergeVertices(g, 1e-5);
  welded.computeVertexNormals();
  return welded;
}

/** Small detail sphere: 5x4 on Low/Medium, 7x5 on High. */
function ball(r: number, hi: boolean): SphereGeometry {
  return new SphereGeometry(r, hi ? 7 : 5, hi ? 5 : 4);
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
const sharedMats = new Map<HeroPalette, Mats>();

function mats(pal: HeroPalette): Mats {
  let r = sharedMats.get(pal);
  if (r === undefined) {
    // A faint self-glow of the same hue acts as a rim/fill light so the
    // silhouette never collapses to black in shade. vertexColors carries the baked clay shading.
    const m = (color: string, glow = 0.18, side: Side = FrontSide): Material =>
      new MeshStandardMaterial({
        color,
        roughness: 0.85,
        metalness: 0,
        emissive: color,
        emissiveIntensity: glow,
        side,
        vertexColors: true,
      });
    r = {
      tunic: m(pal.tunic, 0.1, DoubleSide),
      trousers: m(pal.trousers),
      crimson: m(pal.crimson, 0.35),
      skin: m(pal.skin, 0.12),
      hair: m(pal.hair),
      leather: m(pal.leather),
    };
    sharedMats.set(pal, r);
  }
  return r;
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
  readonly yoke: Group; // tunic hem joint, driven by the hem springs
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
  readonly look: HeroLook;

  constructor(lookOpts: Partial<HeroLook> = {}) {
    const look = heroLook(lookOpts);
    this.look = look;
    const hi = look.detail === 1;
    const M = mats(look.palette);
    const pelvisGeo = new BoxGeometry(0.27, 0.17, 0.19);
    const sashGeo = new CylinderGeometry(0.2, 0.195, 0.115, hi ? 14 : 10);
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
    const scarfRing = new TorusGeometry(0.125, 0.04, hi ? 6 : 4, hi ? 14 : 8);
    const tailGeo = merged([
      placed(new BoxGeometry(0.11, 0.44, 0.025), 0, -0.21, 0, 0, 0.5, 0),
      placed(new BoxGeometry(0.08, 0.3, 0.02), 0.05, -0.14, -0.01, 0, -0.6, -0.25),
    ]);
    const headGeo = new SphereGeometry(0.14, hi ? 14 : 9, hi ? 10 : 6);
    const hairGeo = new SphereGeometry(0.153, 8, 4, 0, Math.PI * 2, 0, Math.PI * 0.6);
    const upperArmGeo = taper(new CapsuleGeometry(0.07, 0.17, 1, 6), 1.15, 0.82);
    const bellGeo = new CylinderGeometry(0.062, 0.078, 0.22, hi ? 8 : 6, 1, true);
    const bracerGeo = new CylinderGeometry(0.066, 0.074, 0.15, hi ? 9 : 6, 1, true);
    const gloveL = gloveGeo(-1);
    const gloveR = gloveGeo(1);
    const thighGeo = taper(new CapsuleGeometry(0.085, 0.31, 1, 6), 1.2, 0.8);
    const panelGeo = hemCylinder(0.115, 0.135, 0.26, 8);
    const shinGeo = taper(new CapsuleGeometry(0.07, 0.3, 1, 6), 1.12, 0.72);
    const shoeGeo = new CapsuleGeometry(0.06, 0.13, 1, 6);
    const bootGeo = new CylinderGeometry(0.08, 0.072, 0.27, hi ? 9 : 6, 1, true);
    const cuffGeo = new CylinderGeometry(0.088, 0.082, 0.05, hi ? 8 : 6, 1, true);

    this.root = new Group();
    this.root.name = 'heroRig';
    this.swing = joint(this.root, 0, HERO_GRIP_H, 0);
    this.body = joint(this.swing, 0, -HERO_GRIP_H, 0);
    this.pelvis = joint(this.body, 0, HERO_HIP_H, 0);
    part(this.pelvis, pelvisGeo, M.trousers, 0, -0.01, 0);
    part(this.pelvis, sashGeo, M.crimson, 0, 0.07, 0).scale.set(1, 1, 0.82);
    this.yoke = joint(this.pelvis, 0, 0, 0);
    part(this.yoke, yokeGeo, M.tunic, 0, 0, 0).scale.set(1, 1, 0.85);
    // Sash knot and a second tail (reference images): a wide wound sash tied at the side.
    part(this.pelvis, new BoxGeometry(0.1, 0.1, 0.07), M.crimson, -0.15, 0.07, 0.11).rotation.z =
      0.4;
    this.sashTail = joint(this.pelvis, 0.15, 0.06, -0.12);
    part(this.sashTail, sashTailGeo, M.crimson, 0, -0.14, 0).rotation.z = 0.12;
    part(this.sashTail, sashTailGeo, M.crimson, 0.06, -0.12, 0.01).rotation.z = -0.3;

    this.spine = joint(this.pelvis, 0, HERO_SPINE_Y, 0);
    part(this.spine, torsoGeo, M.tunic, 0, 0, 0).scale.set(1.1, 1, 0.82);
    // Leather satchel strap, right shoulder to left hip, chest and back.
    part(this.spine, strapGeo, M.leather, 0, 0, 0);
    part(this.spine, neckGeo, M.crimson, 0, 0.55, 0).scale.set(1, 1, 0.85);
    // Thick rolled scarf wrap with a knot at the front (reference images).
    part(this.spine, scarfRing, M.crimson, 0, 0.58, 0.01).rotation.x = Math.PI / 2;
    part(this.spine, ball(0.055, hi), M.crimson, 0.07, 0.55, 0.12);
    if (look.gear === 'bandolier') {
      part(
        this.spine,
        placed(new BoxGeometry(0.045, 0.5, 0.02), 0, 0, 0, 0, 0, -0.55),
        M.leather,
        0,
        0.23,
        0.15,
      );
    } else if (look.gear === 'quiver') {
      const q = part(
        this.spine,
        new CylinderGeometry(0.048, 0.04, 0.4, hi ? 7 : 5, 1, true),
        M.leather,
        -0.07,
        0.34,
        -0.19,
      );
      q.rotation.z = 0.35;
      for (let i = 0; i < (hi ? 3 : 2); i++) {
        const f = part(
          this.spine,
          new BoxGeometry(0.05, 0.1, 0.012),
          M.tunic,
          -0.15 + i * 0.012,
          0.56 + i * 0.004,
          -0.19 + (i - 1) * 0.03,
        );
        f.rotation.z = 0.35;
      }
    }
    this.scarfTail = joint(this.spine, 0, 0.56, -0.12);
    // Two strips (merged), twisted so the tail shows a face from behind and the side.
    part(this.scarfTail, tailGeo, M.crimson, 0, 0, 0);
    this.scarfTip = joint(this.scarfTail, 0, -0.42, 0);
    part(this.scarfTip, new BoxGeometry(0.09, 0.2, 0.018), M.crimson, 0, -0.1, 0);

    this.head = joint(this.spine, 0, 0.6, 0);
    // Head 1.15x the old size, smoother, with ears and a face (reference images).
    const HS = 1.15;
    part(this.head, headGeo, M.skin, 0, 0.166, 0.008).scale.set(0.95 * HS, 1.03 * HS, 0.96 * HS);
    for (const sx of [-1, 1]) {
      part(this.head, ball(0.036, hi), M.skin, 0.152 * sx, 0.162, 0).scale.set(0.5, 1, 0.9);
      const eye = part(this.head, ball(0.02, hi), M.hair, 0.052 * sx, 0.168, 0.15);
      eye.scale.set(1, 1.25, 0.5);
      const brow = part(
        this.head,
        new BoxGeometry(0.07, 0.014, 0.016),
        M.hair,
        0.054 * sx,
        0.196,
        0.152,
      );
      brow.rotation.z = -0.22 * sx;
    }
    if (hi) part(this.head, ball(0.022, hi), M.skin, 0, 0.14, 0.162);
    // Hair: chunky side and back clumps under the hat, bangs when bare-headed.
    part(this.head, ball(0.05, hi), M.hair, 0.13, 0.19, -0.01);
    part(this.head, ball(0.05, hi), M.hair, -0.13, 0.19, -0.01);
    part(this.head, ball(0.115, hi), M.hair, 0, 0.17, -0.075);
    if (hi) {
      part(this.head, ball(0.045, hi), M.hair, 0.1, 0.12, -0.11);
      part(this.head, ball(0.045, hi), M.hair, -0.1, 0.12, -0.11);
      part(this.head, ball(0.04, hi), M.hair, 0.07, 0.22, 0.1);
      part(this.head, ball(0.04, hi), M.hair, -0.07, 0.22, 0.1);
    }
    if (look.hat === 'none') {
      part(this.head, hairGeo, M.hair, 0, 0.175, -0.012).rotation.x = -0.6;
      part(this.head, new BoxGeometry(0.2, 0.04, 0.05), M.hair, 0, 0.235, 0.125).rotation.x = 0.35;
    } else if (look.hat === 'beanie') {
      // Charcoal knit dome with a rolled brim, sitting just above the brows.
      const dome = new SphereGeometry(
        0.172,
        hi ? 12 : 9,
        hi ? 8 : 6,
        0,
        Math.PI * 2,
        0,
        Math.PI * 0.56,
      );
      part(this.head, dome, M.trousers, 0, 0.245, -0.005).rotation.x = -0.12;
      const brim = part(
        this.head,
        new TorusGeometry(0.168, 0.03, hi ? 6 : 4, hi ? 14 : 8),
        M.trousers,
        0,
        0.222,
        -0.004,
      );
      brim.rotation.x = Math.PI / 2 - 0.12;
    } else {
      // Cream open helmet with a leather band and goggles pushed up on the brow.
      part(
        this.head,
        new SphereGeometry(0.178, hi ? 12 : 8, hi ? 8 : 5, 0, Math.PI * 2, 0, Math.PI * 0.52),
        M.tunic,
        0,
        0.245,
        -0.005,
      ).rotation.x = -0.1;
      part(
        this.head,
        new CylinderGeometry(0.176, 0.18, 0.035, hi ? 14 : 8, 1, true),
        M.leather,
        0,
        0.222,
        -0.004,
      ).rotation.x = -0.1;
      for (const sx of [-1, 1]) {
        const lens = part(
          this.head,
          new CylinderGeometry(0.05, 0.05, 0.03, hi ? 8 : 6),
          M.hair,
          0.06 * sx,
          0.262,
          0.15,
        );
        lens.rotation.x = Math.PI / 2 - 0.5;
        if (hi) {
          const rim = part(
            this.head,
            new TorusGeometry(0.05, 0.012, 4, 8),
            M.leather,
            0.06 * sx,
            0.262,
            0.158,
          );
          rim.rotation.x = -0.5;
        }
      }
    }

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
      part(el, bracerGeo, M.leather, 0, -0.215, 0);
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
      part(kn, bootGeo, M.leather, 0, -0.29, 0);
      part(kn, cuffGeo, M.leather, 0, -0.165, 0);
      const shoe = part(kn, shoeGeo, M.leather, 0, -0.44, 0.04);
      shoe.rotation.x = Math.PI / 2;
      shoe.scale.set(1, 1, 0.75);
    }
    skinParts(this.root, look.palette, look.clay);
  }
}

/**
 * Draw-call packing (ADR 0009): every rigid part is baked into the rest pose and merged into one
 * SkinnedMesh per shared material (6 draws instead of 28), weighted 100 % to its parent joint.
 * The joint Groups stay the animation interface and double as the skeleton's bones (stock
 * three.js skinning, no custom shader), so the look and the pose maths are unchanged.
 */
function skinParts(root: Group, pal: HeroPalette, clay: number): void {
  root.updateMatrixWorld(true);
  const bones: Group[] = [];
  root.traverse((o) => {
    if (o !== root && o instanceof Group) bones.push(o);
  });
  const byMat = new Map<Material, { geos: BufferGeometry[]; meshes: Mesh[] }>();
  root.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    const mat = o.material as Material;
    let e = byMat.get(mat);
    if (e === undefined) {
      e = { geos: [], meshes: [] };
      byMat.set(mat, e);
    }
    const g = o.geometry.clone();
    g.deleteAttribute('uv');
    g.applyMatrix4(o.matrixWorld);
    const n = g.getAttribute('position').count;
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const y = g.getAttribute('position').getY(i);
      // Baked clay shading: darker toward the feet and under the sash (fake ambient occlusion).
      let f = 1 - clay * 0.16 * (1 - Math.min(1, Math.max(0, y / 1.7)));
      if (Math.abs(y - (HERO_HIP_H + 0.02)) < 0.07) f *= 1 - clay * 0.12;
      col[i * 3] = f;
      col[i * 3 + 1] = f;
      col[i * 3 + 2] = f;
    }
    g.setAttribute('color', new Float32BufferAttribute(col, 3));
    const bi = bones.indexOf(o.parent as Group);
    const si = new Uint16Array(n * 4);
    const sw = new Float32Array(n * 4);
    for (let i = 0; i < n; i++) {
      si[i * 4] = bi;
      sw[i * 4] = 1;
    }
    g.setAttribute('skinIndex', new Uint16BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new Float32BufferAttribute(sw, 4));
    e.geos.push(g);
    e.meshes.push(o);
  });
  const skeleton = new Skeleton(bones as unknown as Bone[]);
  for (const [mat, e] of byMat) {
    for (const m of e.meshes) {
      m.parent?.remove(m);
      m.geometry.dispose();
    }
    const sm = new SkinnedMesh(merged(e.geos), mat);
    sm.name = 'heroSkin';
    sm.frustumCulled = false;
    // Opt-in shadow caster (render/scene.ts). The head (skin, hair) is left out: the A3 shadow-pass
    // cap is 14 calls on Medium and the shoulders' shadow already carries the silhouette.
    const hex = (mat as Material & { color: { getHexString: () => string } }).color.getHexString();
    sm.userData.cast = hex !== pal.skin.slice(1) && hex !== pal.hair.slice(1);
    root.add(sm);
    sm.bind(skeleton, new Matrix4());
  }
}

export function createHeroRig(look: Partial<HeroLook> = {}): HeroRig {
  return new HeroRig(look);
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
