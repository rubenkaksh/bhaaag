// Small toy-style models for the animals, the undead and the camp pickups. Each kind is ONE merged
// geometry with baked vertex colours, drawn through one InstancedMesh per kind, so a crowd costs a
// handful of draw calls. Stock material, no textures. Reference art for these does not exist yet
// (owner to generate); these are placeholders in the same shape language as the riders.
import {
  BoxGeometry,
  BufferGeometry,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DynamicDrawUsage,
  Float32BufferAttribute,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  Object3D,
  SphereGeometry,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Enemy, EnemyKind } from '../enemies';

function paint(g: BufferGeometry, hex: string): BufferGeometry {
  const c = new Color(hex);
  const n = g.getAttribute('position').count;
  const a = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    a[i * 3] = c.r;
    a[i * 3 + 1] = c.g;
    a[i * 3 + 2] = c.b;
  }
  g.setAttribute('color', new Float32BufferAttribute(a, 3));
  g.deleteAttribute('uv');
  return g;
}

function at<T extends BufferGeometry>(
  g: T,
  x: number,
  y: number,
  z: number,
  rx = 0,
  ry = 0,
  rz = 0,
): T {
  g.rotateX(rx);
  g.rotateY(ry);
  g.rotateZ(rz);
  g.translate(x, y, z);
  return g;
}

function quad(
  body: string,
  head: string,
  legs: string,
  len: number,
  h: number,
  w: number,
  hr: number,
): BufferGeometry {
  const parts: BufferGeometry[] = [
    paint(at(new SphereGeometry(0.5, 7, 5).scale(w, h * 0.55, len * 0.5), 0, h, 0), body),
    paint(at(new SphereGeometry(hr, 6, 5), 0, h * 1.12, len * 0.5), head),
    paint(
      at(new ConeGeometry(hr * 0.45, hr * 1.1, 4), 0, h * 1.1, len * 0.5 + hr * 1.1, Math.PI / 2),
      head,
    ),
    paint(
      at(new ConeGeometry(hr * 0.28, hr * 0.7, 3), -hr * 0.5, h * 1.12 + hr, len * 0.5 - 0.02),
      body,
    ),
    paint(
      at(new ConeGeometry(hr * 0.28, hr * 0.7, 3), hr * 0.5, h * 1.12 + hr, len * 0.5 - 0.02),
      body,
    ),
  ];
  for (const sx of [-1, 1]) {
    for (const sz of [-1, 1]) {
      parts.push(
        paint(
          at(
            new CylinderGeometry(w * 0.13, w * 0.1, h * 0.8, 5),
            sx * w * 0.32,
            h * 0.4,
            sz * len * 0.3,
          ),
          legs,
        ),
      );
    }
  }
  return mergeGeometries(parts);
}

function humanoid(skin: string, cloth: string, pants: string, s: number): BufferGeometry {
  const parts: BufferGeometry[] = [
    paint(at(new CylinderGeometry(0.2 * s, 0.24 * s, 0.7 * s, 6), 0, 1.05 * s, 0), cloth),
    paint(at(new SphereGeometry(0.2 * s, 6, 5), 0, 1.6 * s, 0), skin),
    paint(at(new CylinderGeometry(0.1 * s, 0.09 * s, 0.7 * s, 5), -0.11 * s, 0.35 * s, 0), pants),
    paint(at(new CylinderGeometry(0.1 * s, 0.09 * s, 0.7 * s, 5), 0.11 * s, 0.35 * s, 0), pants),
    // arms out in front: the zombie reach
    paint(
      at(
        new CylinderGeometry(0.07 * s, 0.06 * s, 0.7 * s, 5),
        -0.26 * s,
        1.25 * s,
        0.32 * s,
        Math.PI / 2 - 0.2,
      ),
      skin,
    ),
    paint(
      at(
        new CylinderGeometry(0.07 * s, 0.06 * s, 0.7 * s, 5),
        0.26 * s,
        1.25 * s,
        0.32 * s,
        Math.PI / 2 - 0.2,
      ),
      skin,
    ),
  ];
  return mergeGeometries(parts);
}

export const CREATURE_GEO: Record<EnemyKind, () => BufferGeometry> = {
  wolf: () => quad('#6e6a66', '#7d7873', '#55514d', 1.3, 0.62, 0.5, 0.2),
  boar: () => quad('#4a3326', '#5a4030', '#3a281e', 1.4, 0.7, 0.72, 0.26),
  deer: () => quad('#a86f3d', '#b98550', '#8a5a30', 1.2, 1.0, 0.45, 0.2),
  rabbit: () => quad('#cbbfae', '#d8cdbd', '#b3a794', 0.5, 0.28, 0.24, 0.12),
  zombie: () => humanoid('#7d9566', '#5b5f54', '#3c3f46', 1),
  runner: () => humanoid('#8aa070', '#7a4a42', '#2f3340', 0.95),
  brute: () => humanoid('#6e8960', '#4a5148', '#34373d', 1.45),
};

/** Pickups and props share the same pool mechanism. */
export const PICKUP_GEO: Record<'wood' | 'ammo' | 'meat', () => BufferGeometry> = {
  wood: () =>
    mergeGeometries([
      paint(at(new CylinderGeometry(0.13, 0.13, 0.8, 6), 0, 0.14, 0, 0, 0, Math.PI / 2), '#6b4a2f'),
      paint(
        at(new CylinderGeometry(0.13, 0.13, 0.8, 6), 0, 0.14, 0.26, 0, 0.2, Math.PI / 2),
        '#7a5535',
      ),
      paint(
        at(new CylinderGeometry(0.13, 0.13, 0.8, 6), 0.05, 0.38, 0.13, 0, 0.1, Math.PI / 2),
        '#6b4a2f',
      ),
    ]),
  ammo: () =>
    mergeGeometries([
      paint(at(new BoxGeometry(0.5, 0.3, 0.32), 0, 0.15, 0), '#6b5a3a'),
      paint(at(new BoxGeometry(0.52, 0.06, 0.34), 0, 0.31, 0), '#b8483c'),
    ]),
  meat: () =>
    mergeGeometries([
      paint(at(new SphereGeometry(0.2, 6, 5).scale(1.2, 0.8, 1), 0, 0.2, 0), '#c0523f'),
      paint(at(new CylinderGeometry(0.04, 0.04, 0.34, 4), 0.2, 0.22, 0, 0, 0, 1.0), '#e3d3b0'),
    ]),
};

const mat = new MeshStandardMaterial({
  vertexColors: true,
  roughness: 0.9,
  metalness: 0,
  emissive: '#ffffff',
  emissiveIntensity: 0.08,
});

const dummy = new Object3D();
const m4 = new Matrix4();

/** A fixed-capacity InstancedMesh with per-id heading memory. */
export class Pool {
  readonly mesh: InstancedMesh;
  private readonly heading = new Map<number, { x: number; z: number; h: number }>();
  constructor(
    geo: BufferGeometry,
    readonly cap: number,
  ) {
    this.mesh = new InstancedMesh(geo, mat, cap);
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.mesh.frustumCulled = false;
    this.mesh.count = 0;
  }

  /** Writes instance i; heading follows motion (or `face` if given). */
  set(
    i: number,
    id: number,
    x: number,
    z: number,
    t: number,
    bob: number,
    face?: number,
    scale = 1,
    y0 = 0,
  ): void {
    let m = this.heading.get(id);
    if (m === undefined) {
      m = { x, z, h: 0 };
      this.heading.set(id, m);
    }
    const dx = x - m.x;
    const dz = z - m.z;
    if (face !== undefined) m.h = face;
    else if (dx * dx + dz * dz > 1e-6) m.h = Math.atan2(dx, dz);
    m.x = x;
    m.z = z;
    dummy.position.set(x, y0 + Math.abs(Math.sin(t * 9 + id)) * bob, z);
    dummy.rotation.set(0, m.h, Math.sin(t * 7 + id) * bob * 0.2);
    dummy.scale.setScalar(scale);
    dummy.updateMatrix();
    this.mesh.setMatrixAt(i, m4.copy(dummy.matrix));
  }

  commit(n: number): void {
    this.mesh.count = Math.min(n, this.cap);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  forget(live: Set<number>): void {
    for (const id of this.heading.keys()) if (!live.has(id)) this.heading.delete(id);
  }
}

export function creaturePools(): Record<EnemyKind, Pool> {
  const caps: Record<EnemyKind, number> = {
    wolf: 40,
    boar: 24,
    deer: 6,
    rabbit: 6,
    zombie: 80,
    runner: 40,
    brute: 16,
  };
  const out = {} as Record<EnemyKind, Pool>;
  for (const k of Object.keys(CREATURE_GEO) as EnemyKind[])
    out[k] = new Pool(CREATURE_GEO[k](), caps[k]);
  return out;
}

export function groupByKind(list: Enemy[]): Record<EnemyKind, Enemy[]> {
  const g: Record<EnemyKind, Enemy[]> = {
    wolf: [],
    boar: [],
    deer: [],
    rabbit: [],
    zombie: [],
    runner: [],
    brute: [],
  };
  for (const e of list) if (!e.dead) g[e.kind].push(e);
  return g;
}
