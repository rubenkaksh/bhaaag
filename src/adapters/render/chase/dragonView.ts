// T304: the Dragon Chase dragon as a real 3D model. A golden serpent dragon built from stock
// materials and procedural meshes only (no textures, no custom shaders, no GLB):
//
//   - body: one continuous tube (elliptic rings rewritten every frame, analytic normals, vertex
//     colours: dark gold back, gold flanks, banded cream belly plates = the segment read);
//   - cloud flanks: instanced icosahedron puffs riding the spine (the "cloud dragon" of the sprite);
//   - flames: instanced cones for the dorsal spines and the tail tuft;
//   - head: merged primitives (skull, jowls, brows, snout, mouth, fangs, antlers, whiskers), a
//     hinged lower jaw, glowing eyes and an instanced flame mane.
//
// Movement: the head leaves a breadcrumb trail; every ring sits at a fixed arc length behind the
// head ALONG that trail, so the body really follows the path the head flew (it steers after the
// hero, then the curve travels down the body). A small travelling swim wave rides on top.
//
// Size (owner brief T304): the body envelope (core + cloud flanks + spines) is the T290 sprite
// segment quad x1.3 in width and height at the same place along the chain; the face is the
// sprite's face crop x1.3. The sim is untouched: the catch rule in src/core/chase/dragon.ts is
// 1-D (gap <= catchGap), so the visual scale has no hitbox to move.
//
// Local frame of the head: origin at the centre of the frontal silhouette, forward -z, up +y.
// The group itself stays at identity, so every child's local pose is its world pose.
import {
  BufferAttribute,
  BufferGeometry,
  CatmullRomCurve3,
  Color,
  ConeGeometry,
  CylinderGeometry,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PerspectiveCamera,
  Quaternion,
  SphereGeometry,
  TubeGeometry,
  Vector3,
} from 'three';
import type { Material } from 'three';
import type { GraphicsTier } from '../graphicsTier';
import { hillY } from '../../../core/chase/rows';
import { CATCH_DIST, FACE_FRAC, HEAD_H_OVER_W, catchPose, easeOutBack } from './catchPose';
import type { CatchPose } from './catchPose';

/** Visual scale versus the T290 sprite dragon (owner brief T304: width and height x1.3). */
export const SPRITE_SCALE = 1.3;
const SPRITE_HEAD_W = 20; // T290 head sprite width (m); segments were HEAD_W * (0.85 - 0.55 t)
const SPRITE_CHAIN = 48; // T290 segment chain length (m)
/** Frontal width / height of the 3D face (skull + antlers): the sprite face crop x1.3. */
export const FRONT_W = SPRITE_SCALE * SPRITE_HEAD_W * FACE_FRAC; // 7.54 m
export const FRONT_H = SPRITE_SCALE * SPRITE_HEAD_W * HEAD_H_OVER_W; // 8.70 m

const HOVER = 7; // metres above the hill line at the head (same as the sprite)
const HEAD_AHEAD = 14; // pin mode: head held this far in front of the camera
const NECK_S = 2; // the tube starts this far behind the head origin (inside the skull)
const TAIL_TIP = 9; // tail tip beyond the sprite chain (m)
const BODY_LEN = SPRITE_CHAIN + TAIL_TIP;
const CORE_W = 0.4; // serpent core width as a share of the envelope width
const CORE_H = 0.62; // serpent core height as a share of the envelope height
const SEG_LEN = 3.2; // body segment (belly plate) length
const WEAVE_A = 3; // head weave (m); the body inherits it through the trail
const WEAVE_W = 0.8;
const SWIM_LAT = 2.2; // travelling swim wave on top of the trail
const SWIM_VERT = 1.1;
const SWIM_K = (Math.PI * 2) / 30;
const SWIM_W = 1.7;
const TRAIL_CAP = 256;
const TRAIL_STEP = 0.6;
const TRAIL_RESET_D = 40; // a head jump bigger than this (restart) rebuilds the trail
const CATCH_ORDER = 999;
const CATCH_FIT_H = 0.9; // the face never exceeds this share of the visible height
const CATCH_SQUASH = 0.45; // depth squash at full lunge, keeps the snout's perspective in frame

export type TierSpec = {
  rings: number;
  radial: number;
  clouds: number;
  spines: number;
  mane: number;
  seg: number;
};

/** Per-tier mesh budget. Every tier: 7 draw calls, 0 textures. */
export const DRAGON_TIERS: Record<GraphicsTier, TierSpec> = {
  low: { rings: 30, radial: 10, clouds: 34, spines: 12, mane: 16, seg: 10 },
  medium: { rings: 44, radial: 14, clouds: 64, spines: 18, mane: 24, seg: 14 },
  high: { rings: 60, radial: 18, clouds: 96, spines: 24, mane: 32, seg: 18 },
};

const GOLD = new Color('#d89b34');
const GOLD_DARK = new Color('#9c5f1a');
const CREAM = new Color('#f2dcaa');
const IVORY = new Color('#f1e3bd');
const ANTLER = new Color('#e2c588');
const MOUTH = new Color('#3e0c08');
const TONGUE = new Color('#a3302a');
const FLAME = new Color('#f0a43a');
const EYE = new Color('#ffb02e');
const PUPIL = new Color('#2a0800');
const CLOUD_TOP = new Color('#f6efe2');
const CLOUD_LOW = new Color('#e4a85a');

const UP = new Vector3(0, 1, 0);
const Q_FLIP = new Quaternion().setFromAxisAngle(UP, Math.PI);

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}

function smooth01(x: number): number {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
}

/**
 * Full body envelope (core + cloud flanks + spines) at u = 0 (neck) .. 1 (end of the sprite
 * chain): the T290 sprite segment quad (width HEAD_W * (0.85 - 0.55 u), height 0.62 * width) x1.3.
 */
export function bodyEnvelope(u: number, out: { w: number; h: number }): { w: number; h: number } {
  const w = SPRITE_SCALE * SPRITE_HEAD_W * Math.max(0.05, 0.85 - 0.55 * Math.max(0, u));
  out.w = w;
  out.h = w * 0.62;
  return out;
}

// ---- build-time geometry helpers (allocation is fine here, never per frame) ----

type Part = { geo: BufferGeometry; color: Color };

const tmpM = new Matrix4();
const tmpQ = new Quaternion();
const tmpV = new Vector3();
const tmpS = new Vector3();

function ellipsoid(
  parts: Part[],
  seg: number,
  color: Color,
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number,
  rotZ = 0,
): void {
  const g = new SphereGeometry(1, seg, Math.max(6, Math.round(seg * 0.7)));
  tmpQ.setFromAxisAngle(tmpV.set(0, 0, 1), rotZ);
  tmpM.compose(tmpV.set(x, y, z), tmpQ, tmpS.set(rx, ry, rz));
  g.applyMatrix4(tmpM);
  parts.push({ geo: g, color });
}

/** Tapered cylinder from a (radius r0) to b (radius r1). */
function limb(
  parts: Part[],
  seg: number,
  color: Color,
  a: Vector3,
  b: Vector3,
  r0: number,
  r1: number,
): void {
  const d = new Vector3().subVectors(b, a);
  const len = d.length();
  const g = new CylinderGeometry(r1, r0, len, Math.max(5, Math.round(seg * 0.5)), 1);
  g.translate(0, len / 2, 0);
  tmpQ.setFromUnitVectors(UP, d.normalize());
  tmpM.compose(a, tmpQ, tmpS.set(1, 1, 1));
  g.applyMatrix4(tmpM);
  parts.push({ geo: g, color });
}

/** Cone with its base centre at `base`, pointing along `dir`. */
function spike(
  parts: Part[],
  seg: number,
  color: Color,
  base: Vector3,
  dir: Vector3,
  len: number,
  r: number,
): void {
  const g = new ConeGeometry(r, len, Math.max(5, Math.round(seg * 0.5)));
  g.translate(0, len / 2, 0);
  tmpQ.setFromUnitVectors(UP, tmpV.copy(dir).normalize());
  tmpM.compose(base, tmpQ, tmpS.set(1, 1, 1));
  g.applyMatrix4(tmpM);
  parts.push({ geo: g, color });
}

function mergeParts(parts: Part[]): BufferGeometry {
  const flat: BufferGeometry[] = [];
  let n = 0;
  for (const p of parts) {
    const g = p.geo.index !== null ? p.geo.toNonIndexed() : p.geo;
    flat.push(g);
    n += g.getAttribute('position').count;
  }
  const pos = new Float32Array(n * 3);
  const nor = new Float32Array(n * 3);
  const col = new Float32Array(n * 3);
  let o = 0;
  for (let i = 0; i < flat.length; i++) {
    const pa = flat[i].getAttribute('position');
    const na = flat[i].getAttribute('normal');
    const c = parts[i].color;
    for (let v = 0; v < pa.count; v++) {
      pos[o * 3] = pa.getX(v);
      pos[o * 3 + 1] = pa.getY(v);
      pos[o * 3 + 2] = pa.getZ(v);
      nor[o * 3] = na.getX(v);
      nor[o * 3 + 1] = na.getY(v);
      nor[o * 3 + 2] = na.getZ(v);
      col[o * 3] = c.r;
      col[o * 3 + 1] = c.g;
      col[o * 3 + 2] = c.b;
      o++;
    }
    if (flat[i] !== parts[i].geo) flat[i].dispose();
    parts[i].geo.dispose();
  }
  const out = new BufferGeometry();
  out.setAttribute('position', new BufferAttribute(pos, 3));
  out.setAttribute('normal', new BufferAttribute(nor, 3));
  out.setAttribute('color', new BufferAttribute(col, 3));
  out.computeBoundingSphere();
  return out;
}

function v3(x: number, y: number, z: number): Vector3 {
  return new Vector3(x, y, z);
}

function buildSkull(seg: number): BufferGeometry {
  const p: Part[] = [];
  for (let k = 0; k < 2; k++) {
    const sg = k === 0 ? -1 : 1;
    // antlers: a main beam sweeping up and back, two tines
    const a0 = v3(sg * 1.2, 2.0, 1.3);
    const a1 = v3(sg * 2.5, 3.3, 2.3);
    const a2 = v3(sg * 3.75, 4.4, 3.6);
    limb(p, seg, ANTLER, a0, a1, 0.42, 0.32);
    limb(p, seg, ANTLER, a1, a2, 0.32, 0.1);
    limb(p, seg, ANTLER, a1, v3(sg * 2.0, 4.25, 1.7), 0.22, 0.07);
    limb(p, seg, ANTLER, v3(sg * 3.12, 3.85, 2.95), v3(sg * 3.7, 3.3, 2.0), 0.18, 0.06);
    ellipsoid(p, seg, ANTLER, a1.x, a1.y, a1.z, 0.34, 0.34, 0.34);
  }
  ellipsoid(p, seg, GOLD, 0, 0.7, 0.9, 2.5, 2.1, 2.6); // cranium
  for (let k = 0; k < 2; k++) {
    const sg = k === 0 ? -1 : 1;
    ellipsoid(p, seg, GOLD, sg * 1.85, -0.35, -0.3, 1.0, 1.1, 1.35); // jowls
    ellipsoid(p, seg, GOLD_DARK, sg * 1.3, 1.6, -1.2, 1.05, 0.42, 1.1, sg * 0.32); // angry brows
  }
  ellipsoid(p, seg, MOUTH, 0, -1.0, -2.2, 1.15, 0.8, 2.3); // throat / palate
  ellipsoid(p, seg, GOLD, 0, 0.05, -2.6, 1.45, 0.85, 2.5); // snout
  ellipsoid(p, seg, CREAM, 0, 0.55, -4.75, 1.15, 0.55, 0.65); // nose pad
  const down = v3(0, -1, -0.15);
  for (let k = 0; k < 2; k++) {
    const sg = k === 0 ? -1 : 1;
    ellipsoid(p, seg, MOUTH, sg * 0.5, 0.62, -5.3, 0.22, 0.16, 0.12); // nostrils
    spike(p, seg, IVORY, v3(sg * 0.95, -0.55, -4.3), down, 1.1, 0.22); // fangs
    spike(p, seg, IVORY, v3(sg * 1.15, -0.5, -3.4), down, 0.55, 0.15);
    // whiskers: long curling barbels from the snout
    const curve = new CatmullRomCurve3([
      v3(sg * 1.2, 0.1, -4.4),
      v3(sg * 2.6, -0.6, -4.2),
      v3(sg * 3.6, -1.6, -2.8),
      v3(sg * 3.9, -2.8, -0.8),
    ]);
    p.push({ geo: new TubeGeometry(curve, Math.max(8, seg), 0.12, 4, false), color: CREAM });
  }
  return mergeParts(p);
}

/** Lower jaw, local to its hinge (rotation.x < 0 opens it). */
function buildJaw(seg: number): BufferGeometry {
  const p: Part[] = [];
  ellipsoid(p, seg, GOLD, 0, -0.45, -2.9, 1.25, 0.45, 2.4);
  ellipsoid(p, seg, CREAM, 0, -0.6, -4.9, 0.8, 0.4, 0.5); // chin
  ellipsoid(p, seg, TONGUE, 0, -0.05, -2.8, 0.65, 0.18, 1.7);
  const up = v3(0, 1, -0.1);
  const beard = v3(0, -1, 0.35);
  for (let k = 0; k < 2; k++) {
    const sg = k === 0 ? -1 : 1;
    spike(p, seg, IVORY, v3(sg * 0.85, -0.1, -4.6), up, 0.8, 0.18);
    spike(p, seg, FLAME, v3(sg * 0.6, -0.75, -3.9), beard, 2.6, 0.35);
  }
  spike(p, seg, FLAME, v3(0, -0.8, -4.2), beard, 3.0, 0.42);
  return mergeParts(p);
}

function buildEyes(seg: number): BufferGeometry {
  const p: Part[] = [];
  for (let k = 0; k < 2; k++) {
    const sg = k === 0 ? -1 : 1;
    ellipsoid(p, seg, EYE, sg * 1.5, 1.05, -1.6, 0.45, 0.4, 0.4);
    ellipsoid(p, seg, PUPIL, sg * 1.62, 1.05, -1.95, 0.07, 0.3, 0.08);
  }
  return mergeParts(p);
}

type Built = {
  spec: TierSpec;
  body: Mesh;
  bodyPos: Float32Array;
  bodyNor: Float32Array;
  clouds: InstancedMesh;
  flames: InstancedMesh;
  skull: Mesh;
  jaw: Mesh;
  eyes: Mesh;
  mane: InstancedMesh;
};

export class DragonView {
  readonly group = new Group();
  private tier: GraphicsTier;
  private built: Built | null = null;
  private catching = false;

  // materials survive tier rebuilds
  private readonly bodyMat = new MeshLambertMaterial({ vertexColors: true, emissive: '#3a2408' });
  private readonly cloudMat = new MeshLambertMaterial({ color: '#ffffff', emissive: '#4a3a26' });
  private readonly flameMat = new MeshLambertMaterial({ color: FLAME, emissive: '#a8480a' });
  // Head: fog off, it is the source of the white-out and must stay readable through it (T290).
  private readonly headMat = new MeshLambertMaterial({
    vertexColors: true,
    emissive: '#3a2410',
    fog: false,
  });
  private readonly maneMat = new MeshLambertMaterial({
    color: FLAME,
    emissive: '#b8520c',
    fog: false,
  });
  private readonly eyeMat = new MeshBasicMaterial({
    vertexColors: true,
    fog: false,
    toneMapped: false,
  });
  private readonly headMats: Material[] = [this.headMat, this.maneMat, this.eyeMat];
  private readonly bodyMats: Material[] = [this.bodyMat, this.cloudMat, this.flameMat];
  private readonly cloudGeo = new IcosahedronGeometry(1, 1);
  private readonly coneGeo = new ConeGeometry(1, 1, 5).translate(0, 0.5, 0);

  private readonly head = new Group();
  private readonly jawPivot = new Group();

  // trail of head positions: x, height above the hill, z (newest = closest to the head)
  private readonly trX = new Float32Array(TRAIL_CAP);
  private readonly trY = new Float32Array(TRAIL_CAP);
  private readonly trZ = new Float32Array(TRAIL_CAP);
  private trCount = 0;
  private trNewest = 0;

  // spine rings (sized per tier)
  private ringS = new Float32Array(0);
  private ringU = new Float32Array(0);
  private ringRx = new Float32Array(0);
  private ringRy = new Float32Array(0);
  private ds = 1;
  private cx = new Float32Array(0);
  private cy = new Float32Array(0);
  private cz = new Float32Array(0);
  private tx = new Float32Array(0);
  private ty = new Float32Array(0);
  private tz = new Float32Array(0);
  private sx = new Float32Array(0);
  private sy = new Float32Array(0);
  private sz = new Float32Array(0);
  private ux = new Float32Array(0);
  private uy = new Float32Array(0);
  private uz = new Float32Array(0);
  private cosA = new Float32Array(0);
  private sinA = new Float32Array(0);

  // per-instance rest data
  private cloudData = new Float32Array(0); // s, side, up, r, phase
  private spineData = new Float32Array(0); // s, len, base
  private tuftData = new Float32Array(0); // side, up, len, base
  private maneData = new Float32Array(0); // px py pz qx qy qz qw len r phase

  private readonly catchPoseScratch: CatchPose = { cx: 0, cy: 0, h: 0 };
  private readonly m4 = new Matrix4();
  private readonly q = new Quaternion();
  private readonly qCam = new Quaternion();
  private readonly p = new Vector3();
  private readonly s = new Vector3();
  private readonly fC = new Vector3();
  private readonly fT = new Vector3();
  private readonly fS = new Vector3();
  private readonly fU = new Vector3();
  private readonly ax = new Vector3();
  private readonly ay = new Vector3();
  private readonly az = new Vector3();
  private readonly pTop = new Vector3();
  private readonly pBot = new Vector3();
  private readonly target = new Vector3();
  private readonly env = { w: 0, h: 0 };

  constructor(tier: GraphicsTier) {
    this.tier = tier;
    this.group.name = 'chase_dragon';
    this.head.name = 'dragon_head';
    this.jawPivot.position.set(0, -0.6, 0.6);
    this.head.add(this.jawPivot);
    this.group.add(this.head);
    this.build();
    this.update(0, 0, 0, 0, 30, 0, false);
  }

  setTier(tier: GraphicsTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    this.build();
  }

  /** Number of spine rings at the current tier. */
  get ringCount(): number {
    return this.ringS.length;
  }

  /** World centre of spine ring i (0 = neck, ringCount - 1 = tail tip). */
  spinePoint(i: number, out: Vector3): Vector3 {
    return out.set(this.cx[i], this.cy[i], this.cz[i]);
  }

  private clearBuilt(): void {
    // Fresh meshes start with normal material state; the next setCatch re-applies the beat.
    this.endCatch();
    const b = this.built;
    if (b === null) return;
    this.group.remove(b.body, b.clouds, b.flames);
    this.head.remove(b.skull, b.eyes, b.mane);
    this.jawPivot.remove(b.jaw);
    b.body.geometry.dispose();
    b.skull.geometry.dispose();
    b.jaw.geometry.dispose();
    b.eyes.geometry.dispose();
    b.clouds.dispose();
    b.flames.dispose();
    b.mane.dispose();
    this.built = null;
  }

  private build(): void {
    this.clearBuilt();
    const spec = DRAGON_TIERS[this.tier];
    const rand = rng(0xd7a60);
    const R = spec.rings;
    const M = spec.radial;

    // spine rings: arc length, sprite-chain u, core radii (neck pinch, segment bulge, tail taper)
    this.ringS = new Float32Array(R);
    this.ringU = new Float32Array(R);
    this.ringRx = new Float32Array(R);
    this.ringRy = new Float32Array(R);
    this.ds = BODY_LEN / (R - 1);
    this.cx = new Float32Array(R);
    this.cy = new Float32Array(R);
    this.cz = new Float32Array(R);
    this.tx = new Float32Array(R);
    this.ty = new Float32Array(R);
    this.tz = new Float32Array(R);
    this.sx = new Float32Array(R);
    this.sy = new Float32Array(R);
    this.sz = new Float32Array(R);
    this.ux = new Float32Array(R);
    this.uy = new Float32Array(R);
    this.uz = new Float32Array(R);
    for (let i = 0; i < R; i++) {
      const sb = i * this.ds;
      const u = sb / SPRITE_CHAIN;
      bodyEnvelope(u, this.env);
      const neck = 0.62 + 0.38 * smooth01(sb / 10);
      const tip =
        sb <= SPRITE_CHAIN ? 1 : Math.pow(Math.max(0, 1 - (sb - SPRITE_CHAIN) / TAIL_TIP), 0.7);
      const bulge = 1 + 0.05 * Math.cos((sb / SEG_LEN) * Math.PI * 2);
      this.ringS[i] = NECK_S + sb;
      this.ringU[i] = u;
      this.ringRx[i] = 0.5 * CORE_W * this.env.w * neck * tip * bulge;
      this.ringRy[i] = 0.5 * CORE_H * this.env.h * neck * tip * bulge;
    }
    this.cosA = new Float32Array(M);
    this.sinA = new Float32Array(M);
    for (let j = 0; j < M; j++) {
      this.cosA[j] = Math.cos((j / M) * Math.PI * 2);
      this.sinA[j] = Math.sin((j / M) * Math.PI * 2);
    }

    // body tube: static index + colours, positions/normals rewritten per frame
    const bodyPos = new Float32Array(R * M * 3);
    const bodyNor = new Float32Array(R * M * 3);
    const bodyCol = new Float32Array(R * M * 3);
    const idx: number[] = [];
    const c = new Color();
    for (let i = 0; i < R; i++) {
      const band = Math.floor((i * this.ds) / SEG_LEN) % 2 === 0 ? 1 : 0.9;
      for (let j = 0; j < M; j++) {
        const up = this.sinA[j];
        if (up < -0.4) c.copy(CREAM).multiplyScalar(band);
        else c.copy(GOLD).lerp(GOLD_DARK, clamp01((up + 0.4) / 1.4));
        const o = (i * M + j) * 3;
        bodyCol[o] = c.r;
        bodyCol[o + 1] = c.g;
        bodyCol[o + 2] = c.b;
        if (i < R - 1) {
          const a = i * M + j;
          const b = i * M + ((j + 1) % M);
          const cc = (i + 1) * M + j;
          const d = (i + 1) * M + ((j + 1) % M);
          idx.push(a, b, cc, b, d, cc);
        }
      }
    }
    const bodyGeo = new BufferGeometry();
    bodyGeo.setAttribute('position', new BufferAttribute(bodyPos, 3));
    bodyGeo.setAttribute('normal', new BufferAttribute(bodyNor, 3));
    bodyGeo.setAttribute('color', new BufferAttribute(bodyCol, 3));
    bodyGeo.setIndex(idx);
    const body = new Mesh(bodyGeo, this.bodyMat);
    body.name = 'dragon_body';
    body.frustumCulled = false;

    // cloud flanks: sides (most), below, upper flanks; each puff touches the envelope edge
    const nc = spec.clouds;
    this.cloudData = new Float32Array(nc * 5);
    const clouds = new InstancedMesh(this.cloudGeo, this.cloudMat, nc);
    clouds.name = 'dragon_clouds';
    for (let i = 0; i < nc; i++) {
      const u = Math.min(1, Math.max(0.02, (i + 0.5 + (rand() - 0.5) * 0.8) / nc));
      bodyEnvelope(u, this.env);
      const r = Math.min(this.env.w, this.env.h) * (0.2 + rand() * 0.12);
      const zone = rand();
      const sg = rand() < 0.5 ? -1 : 1;
      let ang: number;
      if (zone < 0.62) ang = (sg > 0 ? 0 : Math.PI) + (rand() - 0.5) * 0.9;
      else if (zone < 0.9) ang = -Math.PI / 2 + (rand() - 0.5) * 1.6;
      else ang = (sg > 0 ? 0.55 : Math.PI - 0.55) + (rand() - 0.5) * 0.4;
      const o = i * 5;
      this.cloudData[o] = NECK_S + u * SPRITE_CHAIN;
      this.cloudData[o + 1] = Math.cos(ang) * (this.env.w / 2 - r);
      this.cloudData[o + 2] = Math.sin(ang) * (this.env.h / 2 - r);
      this.cloudData[o + 3] = r;
      this.cloudData[o + 4] = rand() * Math.PI * 2;
      c.copy(CLOUD_LOW).lerp(CLOUD_TOP, clamp01(0.5 + Math.sin(ang) * 0.7));
      c.multiplyScalar(0.95 + rand() * 0.08);
      clouds.setColorAt(i, c);
    }
    clouds.frustumCulled = false;

    // flames: dorsal spines (tips reach the envelope top) + a tail tuft
    const ns = spec.spines;
    const nt = 7;
    this.spineData = new Float32Array(ns * 3);
    for (let i = 0; i < ns; i++) {
      const u = (i + 0.7) / (ns + 0.4);
      bodyEnvelope(u, this.env);
      const s = NECK_S + 4 + u * (SPRITE_CHAIN - 4);
      const ry = this.ringRyAt(s);
      const len = Math.max(0.6, (this.env.h / 2 - ry) * 1.1);
      this.spineData[i * 3] = s;
      this.spineData[i * 3 + 1] = len;
      this.spineData[i * 3 + 2] = len * 0.3;
    }
    this.tuftData = new Float32Array(nt * 4);
    for (let i = 0; i < nt; i++) {
      const a = ((i - (nt - 1) / 2) / ((nt - 1) / 2)) * 1.1;
      this.tuftData[i * 4] = Math.sin(a) * 0.9;
      this.tuftData[i * 4 + 1] = 0.25 * Math.cos(a * 2);
      this.tuftData[i * 4 + 2] = 5.5 - Math.abs(a) * 1.6;
      this.tuftData[i * 4 + 3] = 0.85 - Math.abs(a) * 0.2;
    }
    const flames = new InstancedMesh(this.coneGeo, this.flameMat, ns + nt);
    flames.name = 'dragon_flames';
    flames.frustumCulled = false;

    // head
    const skull = new Mesh(buildSkull(spec.seg), this.headMat);
    skull.name = 'dragon_skull';
    const jaw = new Mesh(buildJaw(spec.seg), this.headMat);
    jaw.name = 'dragon_jaw';
    const eyes = new Mesh(buildEyes(spec.seg), this.eyeMat);
    eyes.name = 'dragon_eyes';

    // flame mane around the back of the skull (not straight down: the beard lives there)
    const nm = spec.mane;
    this.maneData = new Float32Array(nm * 10);
    const dir = new Vector3();
    for (let i = 0; i < nm; i++) {
      const phi = -Math.PI / 2 + Math.PI / 6 + ((i + 0.5) / nm) * (Math.PI * 2 - Math.PI / 3);
      const layer = i % 2;
      const rr = 2.2 + layer * 0.25;
      dir.set(Math.cos(phi), Math.sin(phi) * 0.9 + 0.2, 0.9 + layer * 0.4).normalize();
      this.q.setFromUnitVectors(UP, dir);
      const o = i * 10;
      this.maneData[o] = Math.cos(phi) * rr;
      this.maneData[o + 1] = 0.7 + Math.sin(phi) * rr * 0.9;
      this.maneData[o + 2] = 1.4 + layer;
      this.maneData[o + 3] = this.q.x;
      this.maneData[o + 4] = this.q.y;
      this.maneData[o + 5] = this.q.z;
      this.maneData[o + 6] = this.q.w;
      this.maneData[o + 7] = 2.4 + rand() * 1.5 - (Math.sin(phi) < -0.5 ? 0.8 : 0);
      this.maneData[o + 8] = 0.5 + rand() * 0.25;
      this.maneData[o + 9] = rand() * Math.PI * 2;
    }
    const mane = new InstancedMesh(this.coneGeo, this.maneMat, nm);
    mane.name = 'dragon_mane';
    mane.frustumCulled = false;

    this.group.add(body, clouds, flames);
    this.head.add(skull, eyes, mane);
    this.jawPivot.add(jaw);
    this.built = { spec, body, bodyPos, bodyNor, clouds, flames, skull, jaw, eyes, mane };
    this.trCount = 0; // re-seed the trail at the next update
  }

  private ringRyAt(s: number): number {
    const fi = Math.min(this.ringS.length - 1, Math.max(0, (s - NECK_S) / this.ds));
    const i0 = Math.min(this.ringS.length - 2, Math.floor(fi));
    const f = fi - i0;
    return this.ringRy[i0] + (this.ringRy[i0 + 1] - this.ringRy[i0]) * f;
  }

  /**
   * dragonZ: head z (world). time: seconds. lunge 0..1: head dips toward the hero (caught).
   * heroX: the head drifts after the hero; the body follows the head's path.
   * gap: dragonZ - heroZ; the head looms larger and lower as it closes.
   * camZ / pin: pin the head HEAD_AHEAD in front of the camera (unused by the reversed camera).
   */
  update(
    dragonZ: number,
    time: number,
    lunge: number,
    heroX: number,
    gap: number,
    camZ: number,
    pin: boolean,
  ): void {
    const b = this.built;
    if (b === null) return;
    const prox = clamp01((22 - gap) / 19.5);
    const hz = pin ? Math.min(dragonZ, camZ - HEAD_AHEAD) : dragonZ;
    const hillRef = pin ? hillY(camZ) : hillY(hz);
    const hx = heroX * 0.4 + Math.sin(time * WEAVE_W) * WEAVE_A + Math.sin(time * 0.37 + 1) * 0.8;
    const hy = hillRef + HOVER - prox * 3 + Math.sin(time * 0.9) * 1.2 - lunge * 7;
    const hyA = hy - hillY(hz);
    this.feedTrail(hx, hyA, hz);
    this.solveSpine(hx, hyA, hz, time);
    this.writeBody(b, time);
    this.writeClouds(b, time);
    this.writeFlames(b, time);
    this.poseHead(b, hx, hy, hz, time, prox, lunge);
  }

  private resetTrail(x: number, yA: number, z: number): void {
    const n = Math.min(TRAIL_CAP, Math.ceil((NECK_S + BODY_LEN + 8) / TRAIL_STEP) + 2);
    for (let i = 0; i < n; i++) {
      // index 0 = oldest (farthest uphill), n - 1 = newest
      this.trX[i] = x;
      this.trY[i] = yA;
      this.trZ[i] = z + (n - i) * TRAIL_STEP;
    }
    this.trNewest = n - 1;
    this.trCount = n;
  }

  private feedTrail(x: number, yA: number, z: number): void {
    if (this.trCount === 0) {
      this.resetTrail(x, yA, z);
      return;
    }
    let i = this.trNewest;
    let dx = x - this.trX[i];
    let dy = yA - this.trY[i];
    let dz = z - this.trZ[i];
    if (dx * dx + dy * dy + dz * dz > TRAIL_RESET_D * TRAIL_RESET_D) {
      this.resetTrail(x, yA, z);
      return;
    }
    // The head moved back uphill over its own trail (pin swap, a stall): drop those crumbs so the
    // body never folds through the head.
    while (this.trCount > 1 && this.trZ[this.trNewest] <= z + 0.01) {
      this.trNewest = (this.trNewest - 1 + TRAIL_CAP) % TRAIL_CAP;
      this.trCount--;
    }
    if (this.trZ[this.trNewest] <= z + 0.01) {
      this.resetTrail(x, yA, z);
      return;
    }
    i = this.trNewest;
    dx = x - this.trX[i];
    dy = yA - this.trY[i];
    dz = z - this.trZ[i];
    if (dx * dx + dy * dy + dz * dz >= TRAIL_STEP * TRAIL_STEP) {
      this.trNewest = (this.trNewest + 1) % TRAIL_CAP;
      this.trX[this.trNewest] = x;
      this.trY[this.trNewest] = yA;
      this.trZ[this.trNewest] = z;
      this.trCount = Math.min(TRAIL_CAP, this.trCount + 1);
    }
  }

  /** Ring centres at fixed arc lengths along the trail, then swim wave, lift and ground clearance. */
  private solveSpine(hx: number, hyA: number, hz: number, time: number): void {
    const n = this.ringS.length;
    let ax = hx;
    let ay = hyA;
    let az = hz;
    let acc = 0;
    let k = 0;
    let bx = ax;
    let by = ay;
    let bz = az + 1000;
    if (this.trCount > 0) {
      bx = this.trX[this.trNewest];
      by = this.trY[this.trNewest];
      bz = this.trZ[this.trNewest];
    }
    let seg = Math.hypot(bx - ax, by - ay, bz - az);
    for (let i = 0; i < n; i++) {
      const s = this.ringS[i];
      while (acc + seg < s && k < this.trCount) {
        acc += seg;
        ax = bx;
        ay = by;
        az = bz;
        k++;
        if (k < this.trCount) {
          const ti = (this.trNewest - k + TRAIL_CAP) % TRAIL_CAP;
          bx = this.trX[ti];
          by = this.trY[ti];
          bz = this.trZ[ti];
        } else {
          bx = ax;
          by = ay;
          bz = az + 1000; // past the oldest crumb: straight on uphill
        }
        seg = Math.hypot(bx - ax, by - ay, bz - az);
      }
      const f = seg > 1e-6 ? clamp01((s - acc) / seg) : 0;
      const z = az + (bz - az) * f;
      this.cx[i] = ax + (bx - ax) * f;
      this.cy[i] = ay + (by - ay) * f + hillY(z);
      this.cz[i] = z;
    }
    this.frames();
    // swim wave in the base frame, then a gentle lift and ground clearance
    for (let i = 0; i < n; i++) {
      const u = this.ringU[i];
      const s = this.ringS[i];
      const grow = smooth01(u / 0.3);
      const ph = SWIM_K * s - SWIM_W * time;
      const lat = SWIM_LAT * grow * (0.6 + 0.4 * Math.min(1, u)) * Math.sin(ph);
      const vert = SWIM_VERT * grow * Math.sin(ph * 0.8 + 1.3);
      this.cx[i] += this.sx[i] * lat + this.ux[i] * vert;
      this.cy[i] +=
        this.sy[i] * lat + this.uy[i] * vert + 2 * Math.sin(Math.min(1, u) * Math.PI * 0.5);
      this.cz[i] += this.sz[i] * lat + this.uz[i] * vert;
      bodyEnvelope(u, this.env);
      const floor = hillY(this.cz[i]) + this.env.h * 0.45; // cloud flanks stay off the grass
      if (this.cy[i] < floor) this.cy[i] = floor;
    }
    this.frames();
  }

  /** Tangent (tail-ward), side and up per ring from the current centres. */
  private frames(): void {
    const n = this.ringS.length;
    for (let i = 0; i < n; i++) {
      const i0 = i > 0 ? i - 1 : 0;
      const i1 = i < n - 1 ? i + 1 : n - 1;
      this.az.set(this.cx[i1] - this.cx[i0], this.cy[i1] - this.cy[i0], this.cz[i1] - this.cz[i0]);
      if (this.az.lengthSq() < 1e-9) this.az.set(0, 0, 1);
      this.az.normalize();
      this.ax.crossVectors(UP, this.az);
      if (this.ax.lengthSq() < 1e-9) this.ax.set(1, 0, 0);
      this.ax.normalize();
      this.ay.crossVectors(this.az, this.ax);
      this.tx[i] = this.az.x;
      this.ty[i] = this.az.y;
      this.tz[i] = this.az.z;
      this.sx[i] = this.ax.x;
      this.sy[i] = this.ax.y;
      this.sz[i] = this.ax.z;
      this.ux[i] = this.ay.x;
      this.uy[i] = this.ay.y;
      this.uz[i] = this.ay.z;
    }
  }

  /** Interpolated spine frame at arc length s into fC / fT / fS / fU. */
  private frameAt(s: number): void {
    const n = this.ringS.length;
    const fi = Math.min(n - 1, Math.max(0, (s - NECK_S) / this.ds));
    const i0 = Math.min(n - 2, Math.floor(fi));
    const i1 = i0 + 1;
    const f = fi - i0;
    this.fC.set(
      this.cx[i0] + (this.cx[i1] - this.cx[i0]) * f,
      this.cy[i0] + (this.cy[i1] - this.cy[i0]) * f,
      this.cz[i0] + (this.cz[i1] - this.cz[i0]) * f,
    );
    this.fT
      .set(
        this.tx[i0] + (this.tx[i1] - this.tx[i0]) * f,
        this.ty[i0] + (this.ty[i1] - this.ty[i0]) * f,
        this.tz[i0] + (this.tz[i1] - this.tz[i0]) * f,
      )
      .normalize();
    this.fS
      .set(
        this.sx[i0] + (this.sx[i1] - this.sx[i0]) * f,
        this.sy[i0] + (this.sy[i1] - this.sy[i0]) * f,
        this.sz[i0] + (this.sz[i1] - this.sz[i0]) * f,
      )
      .normalize();
    this.fU
      .set(
        this.ux[i0] + (this.ux[i1] - this.ux[i0]) * f,
        this.uy[i0] + (this.uy[i1] - this.uy[i0]) * f,
        this.uz[i0] + (this.uz[i1] - this.uz[i0]) * f,
      )
      .normalize();
  }

  private writeBody(b: Built, time: number): void {
    const n = this.ringS.length;
    const M = this.cosA.length;
    const pos = b.bodyPos;
    const nor = b.bodyNor;
    const breath = 1 + 0.02 * Math.sin(time * 1.6);
    for (let i = 0; i < n; i++) {
      const rx = this.ringRx[i] * breath;
      const ry = this.ringRy[i] * breath;
      const nrx = Math.max(0.05, rx);
      const nry = Math.max(0.05, ry);
      for (let j = 0; j < M; j++) {
        const co = this.cosA[j];
        const si = this.sinA[j];
        const o = (i * M + j) * 3;
        pos[o] = this.cx[i] + this.sx[i] * rx * co + this.ux[i] * ry * si;
        pos[o + 1] = this.cy[i] + this.sy[i] * rx * co + this.uy[i] * ry * si;
        pos[o + 2] = this.cz[i] + this.sz[i] * rx * co + this.uz[i] * ry * si;
        const a = co / nrx;
        const c = si / nry;
        let x = this.sx[i] * a + this.ux[i] * c;
        let y = this.sy[i] * a + this.uy[i] * c;
        let z = this.sz[i] * a + this.uz[i] * c;
        const l = Math.hypot(x, y, z) || 1;
        x /= l;
        y /= l;
        z /= l;
        nor[o] = x;
        nor[o + 1] = y;
        nor[o + 2] = z;
      }
    }
    const g = b.body.geometry;
    g.getAttribute('position').needsUpdate = true;
    g.getAttribute('normal').needsUpdate = true;
  }

  private writeClouds(b: Built, time: number): void {
    const d = this.cloudData;
    const n = d.length / 5;
    for (let i = 0; i < n; i++) {
      const o = i * 5;
      const ph = d[o + 4];
      this.frameAt(d[o]);
      const side = d[o + 1] * (1 + 0.04 * Math.sin(time * 1.3 + ph));
      const up = d[o + 2] + 0.25 * Math.sin(time * 0.9 + ph * 1.7);
      this.p.copy(this.fC).addScaledVector(this.fS, side).addScaledVector(this.fU, up);
      this.s.setScalar(d[o + 3] * (1 + 0.05 * Math.sin(time * 1.2 + ph)));
      this.m4.compose(this.p, this.q.identity(), this.s);
      b.clouds.setMatrixAt(i, this.m4);
    }
    b.clouds.instanceMatrix.needsUpdate = true;
  }

  private writeFlames(b: Built, time: number): void {
    const sd = this.spineData;
    const ns = sd.length / 3;
    for (let i = 0; i < ns; i++) {
      const s = sd[i * 3];
      this.frameAt(s);
      const ry = this.ringRyAt(s);
      this.p.copy(this.fC).addScaledVector(this.fU, ry * 0.8);
      this.ax.copy(this.fU).addScaledVector(this.fT, 0.55).normalize();
      this.q.setFromUnitVectors(UP, this.ax);
      const flick = 1 + 0.08 * Math.sin(time * 6 + i * 1.9);
      this.s.set(sd[i * 3 + 2], sd[i * 3 + 1] * flick, sd[i * 3 + 2]);
      this.m4.compose(this.p, this.q, this.s);
      b.flames.setMatrixAt(i, this.m4);
    }
    const td = this.tuftData;
    const nt = td.length / 4;
    this.frameAt(NECK_S + BODY_LEN - 2.5);
    for (let i = 0; i < nt; i++) {
      this.ax
        .copy(this.fT)
        .addScaledVector(this.fS, td[i * 4])
        .addScaledVector(this.fU, td[i * 4 + 1])
        .normalize();
      this.q.setFromUnitVectors(UP, this.ax);
      const flick = 1 + 0.1 * Math.sin(time * 5 + i * 2.3);
      this.s.set(td[i * 4 + 3], td[i * 4 + 2] * flick, td[i * 4 + 3]);
      this.m4.compose(this.fC, this.q, this.s);
      b.flames.setMatrixAt(ns + i, this.m4);
    }
    b.flames.instanceMatrix.needsUpdate = true;
  }

  private poseHead(
    b: Built,
    hx: number,
    hy: number,
    hz: number,
    time: number,
    prox: number,
    lunge: number,
  ): void {
    const head = this.head;
    head.position.set(hx, hy, hz);
    // face along the path (from the neck to the head), pitched down at the hero
    const i1 = Math.min(2, this.ringS.length - 1);
    this.az.set(hx - this.cx[i1], hy - this.cy[i1], hz - this.cz[i1]);
    if (this.az.lengthSq() < 1e-6) this.az.set(0, 0, -1);
    this.az.normalize();
    this.az.y = Math.max(-0.6, this.az.y - 0.22 - 0.3 * lunge);
    this.az.normalize().negate(); // local +z points back down the neck
    this.ax.crossVectors(UP, this.az).normalize();
    this.ay.crossVectors(this.az, this.ax);
    this.m4.makeBasis(this.ax, this.ay, this.az);
    head.quaternion.setFromRotationMatrix(this.m4);
    head.scale.setScalar(1 + prox * 0.6 + lunge * 0.25);
    this.jawPivot.rotation.x = -(0.3 + 0.08 * Math.sin(time * 1.7) + 0.25 * lunge);
    const d = this.maneData;
    const n = d.length / 10;
    for (let i = 0; i < n; i++) {
      const o = i * 10;
      this.p.set(d[o], d[o + 1], d[o + 2]);
      this.q.set(d[o + 3], d[o + 4], d[o + 5], d[o + 6]);
      const r = d[o + 8];
      this.s.set(r, d[o + 7] * (1 + 0.1 * Math.sin(time * 5 + d[o + 9])), r);
      this.m4.compose(this.p, this.q, this.s);
      b.mane.setMatrixAt(i, this.m4);
    }
    b.mane.instanceMatrix.needsUpdate = true;
  }

  private setHeadOrder(b: Built, order: number): void {
    b.skull.renderOrder = order;
    b.jaw.renderOrder = order;
    b.eyes.renderOrder = order;
    b.mane.renderOrder = order;
  }

  private beginCatch(): void {
    this.catching = true;
    // Transparent (opacity 1) + top render order: drawn after the world's veils and clouds, but
    // still depth tested so the 3D head sorts itself (eyes over skull, mane behind). At the catch
    // the face sits CATCH_DIST in front of the lens, nearer than any ground in that part of view.
    for (const m of this.headMats) {
      m.transparent = true;
      m.needsUpdate = true;
    }
    for (const m of this.bodyMats) {
      m.transparent = true;
      m.needsUpdate = true;
    }
    if (this.built !== null) this.setHeadOrder(this.built, CATCH_ORDER);
  }

  private endCatch(): void {
    if (!this.catching) return;
    this.catching = false;
    for (const m of this.headMats) {
      m.transparent = false;
      m.needsUpdate = true;
    }
    for (const m of this.bodyMats) {
      m.transparent = false;
      m.opacity = 1;
      m.needsUpdate = true;
    }
    const b = this.built;
    if (b !== null) {
      this.setHeadOrder(b, 0);
      b.body.visible = true;
      b.clouds.visible = true;
      b.flames.visible = true;
    }
  }

  /** True while the catch beat owns the head (for tests and debugging). */
  get inCatch(): boolean {
    return this.catching;
  }

  /**
   * Game-over catch beat (see catchPose.ts). Call after update() and after the camera pose for
   * the frame is final. k 0 = normal; 0..1 = head lunges into camera space, facing the lens;
   * settle 0..1 = docked next to the card.
   */
  setCatch(camera: PerspectiveCamera, k: number, settle: number, time: number): void {
    const b = this.built;
    if (b === null) return;
    if (k <= 0) {
      this.endCatch();
      return;
    }
    if (!this.catching) this.beginCatch();
    camera.updateMatrixWorld();
    const p = catchPose(camera.aspect, settle, this.catchPoseScratch);
    let cy = p.cy;
    if (settle > 0) cy += Math.sin(time * 1.6) * 0.01;
    // catchPose sizes the T290 head sprite; the 3D face takes that sprite's face share.
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy, this.target);
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy + p.h, this.pTop);
    this.ndcOnPlane(camera, 2 * p.cx, 2 * cy - p.h, this.pBot);
    const spriteH = this.pTop.distanceTo(this.pBot);
    this.ndcOnPlane(camera, 0, 1, this.pTop);
    this.ndcOnPlane(camera, 0, -1, this.pBot);
    const visH = this.pTop.distanceTo(this.pBot);
    const faceW = (FACE_FRAC * spriteH) / HEAD_H_OVER_W;
    const sT = Math.min(faceW / FRONT_W, (CATCH_FIT_H * visH) / FRONT_H);
    const e = easeOutBack(k);
    const er = Math.min(1, e);
    const head = this.head;
    head.position.lerp(this.target, e);
    camera.getWorldQuaternion(this.qCam).multiply(Q_FLIP);
    head.quaternion.slerp(this.qCam, er);
    const s0 = head.scale.x;
    const s = s0 + (sT - s0) * e;
    head.scale.set(s, s, s * (1 - CATCH_SQUASH * er));
    // The body stays in world space; fade it before a camera-space head shears off its neck.
    const bodyOp = clamp01(1 - k / 0.4);
    for (const m of this.bodyMats) m.opacity = bodyOp;
    const vis = bodyOp > 0.01;
    b.body.visible = vis;
    b.clouds.visible = vis;
    b.flames.visible = vis;
  }

  /** World point on the plane CATCH_DIST in front of the camera that projects to NDC (x, y). */
  private ndcOnPlane(camera: PerspectiveCamera, x: number, y: number, out: Vector3): void {
    out.set(x, y, 0.5).applyMatrix4(camera.projectionMatrixInverse);
    out.multiplyScalar(CATCH_DIST / -out.z).applyMatrix4(camera.matrixWorld);
  }

  /** Face centre as viewport fractions from the top-left (valid after setCatch). */
  headScreen(camera: PerspectiveCamera, out: { x: number; y: number }): void {
    this.pTop.copy(this.head.position).project(camera);
    out.x = 0.5 + this.pTop.x / 2;
    out.y = 0.5 - this.pTop.y / 2;
  }

  dispose(): void {
    this.clearBuilt();
    for (const m of this.headMats) m.dispose();
    for (const m of this.bodyMats) m.dispose();
    this.cloudGeo.dispose();
    this.coneGeo.dispose();
  }
}
