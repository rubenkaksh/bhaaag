// The cloud dragon: a huge sunlit grey-white dragon built from stock-material puffs
// (InstancedMesh icosahedra), a bat-like wing (bone puffs + a flat membrane), a coiling tail and a
// glowing orange eye. No shaders. Local frame: head at the origin facing -z, body running +z.
import {
  AdditiveBlending,
  BufferGeometry,
  CanvasTexture,
  Color,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  Quaternion,
  Sprite,
  SpriteMaterial,
  Vector3,
} from 'three';
import type { GraphicsTier } from '../graphicsTier';
import { hillY } from '../../../core/chase/rows';

const NODES = 24;
const LENGTH = 74;
const SCALE = 1.3; // the whole dragon is drawn this much bigger than its local frame
const HOVER = 15; // metres above the hill surface
const SHOULDER = 6; // spine node the wings hang from

/** Body + head puff budget per tier (the brief: 48 / 110 / 160). */
export const PUFFS_BY_TIER: Record<GraphicsTier, number> = { low: 48, medium: 110, high: 160 };
const WING_PUFFS_BY_TIER: Record<GraphicsTier, number> = { low: 48, medium: 90, high: 120 };

const LIGHT = new Color('#fffaf0');
const MID = new Color('#e4e4ea');
const SHADE = new Color('#b4bbcc');
const EYE = '#ff7a14';

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function radiusAt(t: number): number {
  // fat head, thick chest, long taper to a thin tail tip
  const body = 1 + 5.6 * Math.pow(1 - t, 1.35);
  const head = t < 0.08 ? 4.2 - t * 12 : 0;
  return Math.max(body, head);
}

type Puff = { node: number; ox: number; oy: number; oz: number; r: number };

function puffColor(oy: number, r: number, rand: () => number, out: Color): void {
  const k = Math.min(1, Math.max(0, 0.5 + oy / (2 * r + 2)));
  if (k > 0.55) out.copy(MID).lerp(LIGHT, (k - 0.55) / 0.45);
  else out.copy(SHADE).lerp(MID, k / 0.55);
  out.multiplyScalar(0.94 + rand() * 0.12);
}

function makeGlowTexture(): CanvasTexture {
  const c = document.createElement('canvas');
  c.width = 64;
  c.height = 64;
  const g = c.getContext('2d');
  if (g !== null) {
    const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255,170,60,1)');
    grad.addColorStop(0.35, 'rgba(255,120,20,0.55)');
    grad.addColorStop(1, 'rgba(255,90,0,0)');
    g.fillStyle = grad;
    g.fillRect(0, 0, 64, 64);
  }
  return new CanvasTexture(c);
}

type Wing = { group: Group; puffs: InstancedMesh; membrane: Mesh };

export class DragonView {
  readonly group = new Group();
  private tier: GraphicsTier;
  private readonly puffGeo = new IcosahedronGeometry(1, 1);
  private readonly puffMat = new MeshLambertMaterial({ color: '#ffffff', emissive: '#6d7080' });
  private body: InstancedMesh | null = null;
  private puffs: Puff[] = [];
  private wings: Wing[] = [];
  private readonly membraneMat = new MeshLambertMaterial({
    color: '#d8d6de',
    emissive: '#5a5e70',
    side: DoubleSide,
    flatShading: true,
  });
  private readonly eyeMat = new MeshBasicMaterial({ color: EYE, fog: false });
  private readonly eyeGeo = new IcosahedronGeometry(0.9, 1);
  private readonly glowTex = makeGlowTexture();
  private readonly glowMat = new SpriteMaterial({
    map: this.glowTex,
    blending: AdditiveBlending,
    transparent: true,
    depthWrite: false,
    fog: false,
  });
  private readonly eyes: Mesh[] = [];
  private readonly glows: Sprite[] = [];
  private readonly nodes: Vector3[] = [];
  private readonly m4 = new Matrix4();
  private readonly q = new Quaternion();
  private readonly p = new Vector3();
  private readonly s = new Vector3();

  constructor(tier: GraphicsTier) {
    this.tier = tier;
    this.group.name = 'chase_dragon';
    this.group.scale.setScalar(SCALE);
    for (let i = 0; i < NODES; i++) this.nodes.push(new Vector3());
    // One eye (the near side) and one wing, like the reference: 5 draw calls in total.
    const e = new Mesh(this.eyeGeo, this.eyeMat);
    this.eyes.push(e);
    this.group.add(e);
    const gl = new Sprite(this.glowMat);
    this.glows.push(gl);
    this.group.add(gl);
    this.build();
    this.update(0, 0, 0, 0);
  }

  setTier(tier: GraphicsTier): void {
    if (tier === this.tier) return;
    this.tier = tier;
    this.build();
  }

  private clearBuilt(): void {
    if (this.body !== null) {
      this.group.remove(this.body);
      this.body.dispose();
      this.body = null;
    }
    for (const w of this.wings) {
      this.group.remove(w.group);
      w.puffs.dispose();
      w.membrane.geometry.dispose();
    }
    this.wings = [];
  }

  private build(): void {
    this.clearBuilt();
    const rand = rng(0xd7a60);
    const total = PUFFS_BY_TIER[this.tier];
    const headN = Math.round(total * 0.2);
    const puffs: Puff[] = [];
    // head: skull, snout, jaw, brow horns
    const headSpec: [number, number, number, number][] = [
      [0, 0, 0, 4.6],
      [0, -0.4, -4.2, 3.4],
      [0, -1.2, -7.6, 2.6],
      [0, -2.6, -4.5, 2.4],
      [1.6, 3.2, 1.5, 1.6],
      [-1.6, 3.2, 1.5, 1.6],
      [2.6, 4.2, 3.8, 1.1],
      [-2.6, 4.2, 3.8, 1.1],
      [0, -3.2, -8.5, 1.5],
      [0, 1.5, -9.2, 1.4],
    ];
    for (let i = 0; i < headN; i++) {
      const h = headSpec[i % headSpec.length];
      const jitter = i < headSpec.length ? 0 : 0.8;
      puffs.push({
        node: 0,
        ox: h[0] + (rand() - 0.5) * jitter * 2,
        oy: h[1] + (rand() - 0.5) * jitter * 2,
        oz: h[2] + (rand() - 0.5) * jitter * 2,
        r: h[3] * (i < headSpec.length ? 1 : 0.7),
      });
    }
    // neck, torso and tail: spread along the spine, weighted toward the thick end
    const bodyN = total - headN;
    for (let i = 0; i < bodyN; i++) {
      const u = (i + 0.5) / bodyN;
      const node = Math.min(NODES - 1, Math.max(1, Math.floor(Math.pow(u, 0.8) * (NODES - 1)) + 1));
      const r = radiusAt(node / (NODES - 1));
      const ang = rand() * Math.PI * 2;
      const rad = r * (0.2 + rand() * 0.4);
      puffs.push({
        node,
        ox: Math.cos(ang) * rad,
        oy: Math.sin(ang) * rad * 0.9,
        oz: (rand() - 0.5) * 3,
        r: Math.max(1.6, r * (0.95 + rand() * 0.35)),
      });
    }
    this.puffs = puffs;
    const body = new InstancedMesh(this.puffGeo, this.puffMat, puffs.length);
    const col = new Color();
    for (let i = 0; i < puffs.length; i++) {
      puffColor(puffs[i].oy, puffs[i].r, rand, col);
      body.setColorAt(i, col);
    }
    body.frustumCulled = false;
    body.name = 'dragon_body';
    this.body = body;
    this.group.add(body);

    this.wings.push(this.buildWing(1, rand));
  }

  private buildWing(sgn: number, rand: () => number): Wing {
    const g = new Group();
    const big = sgn > 0;
    g.scale.set(sgn * (big ? 1 : 0.7), big ? 1 : 0.7, big ? 1 : 0.7);
    const sh = new Vector3(0, 0, 0);
    const el = new Vector3(13, 13, 4);
    const wr = new Vector3(26, 22, 6);
    const t1 = new Vector3(54, 33, 12);
    const t2 = new Vector3(52, 12, 26);
    const t3 = new Vector3(38, -1, 36);
    const t4 = new Vector3(20, -5, 30);
    const bodyPt = new Vector3(2, -4, 26);
    const bones: [Vector3, Vector3, number, number][] = [
      [sh, el, 4.2, 3.4],
      [el, wr, 3.4, 2.8],
      [wr, t1, 2.4, 1.1],
      [wr, t2, 2.4, 1.1],
      [wr, t3, 2.2, 1.1],
      [wr, t4, 2.1, 1.1],
    ];
    const count = WING_PUFFS_BY_TIER[this.tier];
    let totalLen = 0;
    for (const [a, b] of bones) totalLen += a.distanceTo(b);
    const counts = bones.map(([a, b]) => Math.max(2, Math.round((count * a.distanceTo(b)) / totalLen)));
    const im = new InstancedMesh(
      this.puffGeo,
      this.puffMat,
      counts.reduce((x, y) => x + y, 0),
    );
    const col = new Color();
    let n = 0;
    for (let bi = 0; bi < bones.length; bi++) {
      const [a, b, r0, r1] = bones[bi];
      const perBone = counts[bi];
      for (let i = 0; i < perBone; i++) {
        const k = (i + 0.5) / perBone;
        this.p.lerpVectors(a, b, k);
        const r = r0 + (r1 - r0) * k;
        this.s.setScalar(r);
        this.m4.compose(this.p, this.q.identity(), this.s);
        im.setMatrixAt(n, this.m4);
        puffColor(0.4 * r, r, rand, col);
        im.setColorAt(n, col);
        n++;
      }
    }
    im.frustumCulled = false;
    g.add(im);
    // membrane: a fan from the wrist over the finger tips back to the body
    const fan = [wr, t1, t2, t3, t4, bodyPt, sh];
    const pos: number[] = [];
    for (let i = 1; i + 1 < fan.length; i++) {
      pos.push(fan[0].x, fan[0].y, fan[0].z, fan[i].x, fan[i].y, fan[i].z, fan[i + 1].x, fan[i + 1].y, fan[i + 1].z);
    }
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
    geo.computeVertexNormals();
    const membrane = new Mesh(geo, this.membraneMat);
    membrane.frustumCulled = false;
    g.add(membrane);
    this.group.add(g);
    return { group: g, puffs: im, membrane };
  }

  /**
   * dragonZ: head z. time: seconds. lunge 0..1: head dips toward the hero (caught).
   * heroX is ignored for now (the dragon follows the fall line).
   */
  update(dragonZ: number, time: number, lunge: number, heroX: number): void {
    void heroX;
    const sway = Math.sin(time * 0.7) * 1.5;
    this.group.position.set(sway, hillY(dragonZ) + HOVER + Math.sin(time * 0.9) * 1.2 - lunge * 7, dragonZ);
    // spine: S-coil that grows toward the tail
    for (let i = 0; i < NODES; i++) {
      const t = i / (NODES - 1);
      const coil = t * t;
      this.nodes[i].set(
        Math.sin(t * 5.2 - time * 1.1) * 8 * coil,
        Math.sin(t * 3.4 - time * 1.3 + 0.8) * 4.5 * coil + 6 * Math.sin(t * Math.PI) * 0.5,
        t * LENGTH,
      );
    }
    const body = this.body;
    if (body !== null) {
      const breath = 1 + 0.025 * Math.sin(time * 1.6);
      for (let i = 0; i < this.puffs.length; i++) {
        const pf = this.puffs[i];
        const nd = this.nodes[pf.node];
        this.p.set(nd.x + pf.ox, nd.y + pf.oy, nd.z + pf.oz);
        this.s.setScalar(pf.r * breath);
        this.m4.compose(this.p, this.q.identity(), this.s);
        body.setMatrixAt(i, this.m4);
      }
      body.instanceMatrix.needsUpdate = true;
    }
    const flap = 0.18 + 0.28 * Math.sin(time * 1.25);
    const sn = this.nodes[SHOULDER];
    for (let i = 0; i < this.wings.length; i++) {
      const w = this.wings[i];
      const sgn = 1;
      w.group.position.set(sn.x + sgn * 3, sn.y + 4, sn.z);
      w.group.rotation.set(0, sgn * -0.12, sgn * flap);
    }
    // eyes sit on the skull sides
    for (let i = 0; i < this.eyes.length; i++) {
      const sgn = 1;
      const pulse = 1 + 0.12 * Math.sin(time * 3 + i);
      this.eyes[i].position.set(this.nodes[0].x + sgn * 4, 1.4, -3.6);
      this.eyes[i].scale.setScalar(pulse);
      this.glows[i].position.copy(this.eyes[i].position);
      this.glows[i].scale.setScalar(6.5 * pulse);
    }
  }

  dispose(): void {
    this.clearBuilt();
    this.puffGeo.dispose();
    this.puffMat.dispose();
    this.membraneMat.dispose();
    this.eyeMat.dispose();
    this.eyeGeo.dispose();
    this.glowMat.dispose();
    this.glowTex.dispose();
  }
}
