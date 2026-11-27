// Shared three.js helpers for the spike views: mount materials and a skinned packer that merges
// every rigid part into one SkinnedMesh per material (the same idea as adapters/render/heroRig.ts).
// Stock MeshStandardMaterial only, no textures, no shaders.
import {
  Bone,
  BufferGeometry,
  Float32BufferAttribute,
  Group,
  Matrix4,
  Mesh,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  Uint16BufferAttribute,
} from 'three';
import type { Material } from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

export const MOUNT_COLORS = {
  coat: '#a85a2c',
  mane: '#4a3426',
  cream: '#e3d3b0',
  hoof: '#4a4640',
  blanket: '#b8483c',
  ochre: '#c9963d',
  leather: '#6b4a2f',
  bike: '#d4562a',
  rubber: '#2b2a28',
  metal: '#8a8780',
  wood: '#8a5a32',
  eye: '#1f1a17',
};

const cache = new Map<string, Material>();

/** Flat stock material with a faint self-glow (same trick as the hero) and baked vertex shading. */
export function mat(color: string, glow = 0.16): Material {
  const key = `${color}|${glow}`;
  let m = cache.get(key);
  if (m === undefined) {
    m = new MeshStandardMaterial({
      color,
      roughness: 0.85,
      metalness: 0,
      emissive: color,
      emissiveIntensity: glow,
      vertexColors: true,
    });
    cache.set(key, m);
  }
  return m;
}

export function joint(parent: Group, x: number, y: number, z: number): Group {
  const g = new Group();
  g.position.set(x, y, z);
  parent.add(g);
  return g;
}

export function part(
  parent: Group,
  geo: BufferGeometry,
  color: string,
  x: number,
  y: number,
  z: number,
): Mesh {
  const m = new Mesh(geo, mat(color));
  m.position.set(x, y, z);
  parent.add(m);
  return m;
}

/**
 * Bakes every Mesh under `root` into its parent Group's bone and merges per material. Call once,
 * after the whole tree is built. `clay` darkens low vertices a little (0 = flat colour).
 */
export function packSkinned(root: Group, clay = 0.6, height = 1.6): Group[] {
  root.updateMatrixWorld(true);
  const bones: Group[] = [];
  root.traverse((o) => {
    if (o !== root && o instanceof Group) bones.push(o);
  });
  const byMat = new Map<Material, { geos: BufferGeometry[]; meshes: Mesh[] }>();
  root.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    const m = o.material as Material;
    let e = byMat.get(m);
    if (e === undefined) {
      e = { geos: [], meshes: [] };
      byMat.set(m, e);
    }
    const g = o.geometry.clone();
    g.deleteAttribute('uv');
    g.applyMatrix4(o.matrixWorld);
    const n = g.getAttribute('position').count;
    const bi = bones.indexOf(o.parent as Group);
    const si = new Uint16Array(n * 4);
    const sw = new Float32Array(n * 4);
    const col = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      si[i * 4] = Math.max(0, bi);
      sw[i * 4] = 1;
      const y = g.getAttribute('position').getY(i);
      const f = 1 - clay * 0.16 * (1 - Math.min(1, Math.max(0, y / height)));
      col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = f;
    }
    g.setAttribute('skinIndex', new Uint16BufferAttribute(si, 4));
    g.setAttribute('skinWeight', new Float32BufferAttribute(sw, 4));
    g.setAttribute('color', new Float32BufferAttribute(col, 3));
    e.geos.push(g);
    e.meshes.push(o);
  });
  const skeleton = new Skeleton(bones as unknown as Bone[]);
  for (const [m, e] of byMat) {
    for (const mesh of e.meshes) {
      mesh.parent?.remove(mesh);
      mesh.geometry.dispose();
    }
    const merged = mergeGeometries(e.geos);
    for (const g of e.geos) g.dispose();
    const sm = new SkinnedMesh(merged, m);
    sm.frustumCulled = false;
    root.add(sm);
    sm.bind(skeleton, new Matrix4());
  }
  return bones;
}
