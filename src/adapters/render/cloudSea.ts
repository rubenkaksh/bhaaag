import {
  Color,
  DynamicDrawUsage,
  Group,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  PlaneGeometry,
  Quaternion,
  SphereGeometry,
  Vector3,
} from 'three';

// Cloud sea for the Cloud Village level (amendment 2026-11-12). Zero textures: one flat haze
// plane plus one InstancedMesh of squashed spheres (2 draw calls). Cream and cool grey only;
// gold stays reserved for interactive things. The level kills the hero a few metres below
// CLOUD_TOP_Y, so a fall reads as sinking into the clouds.

/** Height of the cloud surface; must match CLOUD_TOP_Y in tools/genVillage.mjs. */
export const VILLAGE_CLOUD_TOP_Y = -58;

const PLANE_SIZE = 900;
const COLOR_PLANE = '#e9e1d6';
const COLOR_PUFF = '#f7f1e8';
const COLOR_PUFF_SHADE = '#cfd3da';

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Puff count per quality tier. */
export function puffCountFor(tier: string): number {
  return tier === 'low' ? 60 : tier === 'medium' ? 110 : 160;
}

export function buildCloudSea(tier: string, seed = 297): Group {
  const g = new Group();
  g.name = 'cloudSea';
  const plane = new Mesh(
    new PlaneGeometry(PLANE_SIZE, PLANE_SIZE),
    new MeshBasicMaterial({ color: new Color(COLOR_PLANE) }),
  );
  plane.rotation.x = -Math.PI / 2;
  plane.position.set(0, VILLAGE_CLOUD_TOP_Y - 1.2, -40);
  plane.userData.cast = false;
  plane.frustumCulled = false;
  g.add(plane);

  const n = puffCountFor(tier);
  const puffs = new InstancedMesh(
    new SphereGeometry(1, 10, 6),
    new MeshLambertMaterial({ color: new Color('#ffffff') }),
    n,
  );
  puffs.instanceMatrix.setUsage(DynamicDrawUsage);
  const rnd = mulberry32(seed);
  const m = new Matrix4();
  const q = new Quaternion();
  const pos = new Vector3();
  const scl = new Vector3();
  const c = new Color();
  const light = new Color(COLOR_PUFF);
  const shade = new Color(COLOR_PUFF_SHADE);
  for (let i = 0; i < n; i++) {
    // Ring-ish scatter over the village footprint and far beyond it.
    const near = i < n * 0.45;
    const span = near ? 110 : 380;
    pos.set(
      (rnd() - 0.5) * 2 * span,
      VILLAGE_CLOUD_TOP_Y - 1 + rnd() * 3,
      -40 + (rnd() - 0.5) * 2 * span,
    );
    const w = 7 + rnd() * 16;
    scl.set(w, 2 + rnd() * 3.2, w * (0.7 + rnd() * 0.6));
    q.setFromAxisAngle(new Vector3(0, 1, 0), rnd() * Math.PI);
    m.compose(pos, q, scl);
    puffs.setMatrixAt(i, m);
    c.copy(light).lerp(shade, rnd() * 0.55);
    puffs.setColorAt(i, c);
  }
  puffs.instanceMatrix.needsUpdate = true;
  if (puffs.instanceColor !== null) puffs.instanceColor.needsUpdate = true;
  puffs.frustumCulled = false;
  puffs.name = 'cloudPuffs';
  g.add(puffs);
  return g;
}

/**
 * A cloud bank under every house body (wall solids at least 5 m tall: style 1 and 3 boxes; thin
 * balconies are skipped). Houses stand on the clouds, with void below. One InstancedMesh.
 */
export function buildCloudBanks(
  boxes: readonly {
    min: { x: number; y: number; z: number };
    max: { x: number; y: number; z: number };
  }[],
  style: readonly number[],
  seed = 7,
): Mesh | null {
  const bodies = boxes.filter(
    (b, i) => (style[i] === 1 || style[i] === 3) && b.max.y - b.min.y >= 5,
  );
  if (bodies.length === 0) return null;
  const PER = 9;
  const mesh = new InstancedMesh(
    new SphereGeometry(1, 10, 6),
    new MeshLambertMaterial({ color: new Color('#ffffff') }),
    bodies.length * PER,
  );
  const rnd = mulberry32(seed);
  const m = new Matrix4();
  const q = new Quaternion();
  const pos = new Vector3();
  const scl = new Vector3();
  const c = new Color();
  const light = new Color(COLOR_PUFF);
  const shade = new Color(COLOR_PUFF_SHADE);
  let k = 0;
  for (const b of bodies) {
    const cx = (b.min.x + b.max.x) / 2;
    const cz = (b.min.z + b.max.z) / 2;
    const hx = (b.max.x - b.min.x) / 2;
    const hz = (b.max.z - b.min.z) / 2;
    for (let j = 0; j < PER; j++) {
      pos.set(
        cx + (rnd() - 0.5) * 2 * (hx + 3),
        b.min.y + 0.4 - rnd() * 1.6,
        cz + (rnd() - 0.5) * 2 * (hz + 3),
      );
      const w = 3.5 + rnd() * 4;
      scl.set(w, 1.6 + rnd() * 1.6, w * (0.8 + rnd() * 0.5));
      q.setFromAxisAngle(new Vector3(0, 1, 0), rnd() * Math.PI);
      m.compose(pos, q, scl);
      mesh.setMatrixAt(k, m);
      c.copy(light).lerp(shade, rnd() * 0.5);
      mesh.setColorAt(k, c);
      k++;
    }
  }
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor !== null) mesh.instanceColor.needsUpdate = true;
  mesh.frustumCulled = false;
  mesh.name = 'cloudBanks';
  return mesh;
}
