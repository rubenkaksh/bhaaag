// Strategy maze feature meshes (ADR 0011 sec. 6): line zones, rope lines + posts, tramps and
// cushions, one merged draw call each. Stock materials, no textures. Only used when
// world.lineOnly === 1; hazards are not drawn.
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshLambertMaterial } from 'three';
import type { Object3D } from 'three';
import type { World } from '../../core/world';
import { buildFixedRopes } from '../../app/ropePost';

const COLOR_GOLD = '#ffc83a'; // interactive: line zones
const COLOR_POST = '#4a2c1c';
const COLOR_CREAM = '#f1e9d2'; // safe: tramp top, cushion
const COLOR_RIM = '#6b4a30';
const STYLE_HIDDEN = 5; // invisible barrier walls (same value as levelView)
const HAND_Y = 2; // rope leaves the launch zone at hand height
const POST_W = 0.12;
const POST_DOWN = 3; // the far post reaches this far below the rope end
const ZONE_LIFT = 0.03;
const RIM_PAD = 0.15;
const RIM_LIFT = 0.05;
const TRAMP_LIFT = 0.04;
const CUSHION_THICK = 0.3;

type Box = [number, number, number, number, number, number]; // x0 y0 z0 x1 y1 z1

function pushBox(pos: number[], idx: number[], b: Box): void {
  const [x0, y0, z0, x1, y1, z1] = b;
  const base = pos.length / 3;
  pos.push(x0, y0, z0, x1, y0, z0, x1, y1, z0, x0, y1, z0);
  pos.push(x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1);
  // quads with outward winding, two triangles each
  const q = [
    [0, 3, 2, 1], // -z
    [4, 5, 6, 7], // +z
    [0, 4, 7, 3], // -x
    [1, 2, 6, 5], // +x
    [0, 1, 5, 4], // -y
    [3, 7, 6, 2], // +y
  ];
  for (let i = 0; i < q.length; i++) {
    const f = q[i];
    idx.push(base + f[0], base + f[1], base + f[2], base + f[0], base + f[2], base + f[3]);
  }
}

function boxesMesh(boxes: Box[], color: string, name: string, emissive = 0): Mesh {
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i < boxes.length; i++) pushBox(pos, idx, boxes[i]);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new MeshLambertMaterial({ color: new Color(color), flatShading: true });
  if (emissive > 0) mat.emissive = new Color(color).multiplyScalar(emissive);
  const mesh = new Mesh(geo, mat);
  mesh.name = name;
  mesh.userData.cast = false; // thin features: nothing worth shadowing
  return mesh;
}

/** Lowest z of the drawn solids (the kill slab and barrier walls excluded). */
export function minSolidZ(world: World): number {
  let z = Infinity;
  for (let i = 0; i < world.solids.length; i++) {
    const s = i < world.style.length ? world.style[i] : 1;
    if (s === STYLE_HIDDEN || world.solids[i].max.y <= world.killPlaneY) continue;
    z = Math.min(z, world.solids[i].min.z);
  }
  return Number.isFinite(z) ? z : 0;
}

/** Merged feature meshes: zones, posts, rope lines, tramps (rim + top), cushions. */
export function buildStrategyFeatures(world: World, skipProps = false): Object3D[] {
  const out: Object3D[] = [];
  const zones: Box[] = [];
  const posts: Box[] = [];
  const h = POST_W / 2;
  for (let i = 0; i < world.lines.length; i++) {
    const L = world.lines[i];
    const z = L.zone;
    const a = world.anchors[L.anchorId];
    zones.push([z.min.x, z.min.y, z.min.z, z.max.x, z.max.y + ZONE_LIFT, z.max.z]);
    const cx = (z.min.x + z.max.x) / 2;
    const cz = (z.min.z + z.max.z) / 2;
    const sy = z.max.y + HAND_Y;
    posts.push([cx - h, z.max.y, cz - h, cx + h, sy, cz + h]);
    if (a === undefined) continue;
    posts.push([a.px - h, a.py - POST_DOWN, a.pz - h, a.px + h, a.py + 0.1, a.pz + h]);
  }
  if (zones.length > 0) out.push(boxesMesh(zones, COLOR_GOLD, 'lineZones', 0.35));
  if (posts.length > 0) out.push(boxesMesh(posts, COLOR_POST, 'linePosts'));
  // Fixed lines use the old rope look (twisted tube, sag, gold end), not a thin line.
  const ropes = buildFixedRopes(world, HAND_Y);
  if (ropes !== null) out.push(ropes);
  const rims: Box[] = [];
  const tops: Box[] = [];
  // Graph levels draw tramps and cushions as house-kit props (houseV2), not as slabs.
  if (skipProps) return out;
  for (let i = 0; i < world.tramps.length; i++) {
    const t = world.tramps[i];
    const y = t.max.y + RIM_LIFT;
    rims.push([
      t.min.x - RIM_PAD,
      t.min.y,
      t.min.z - RIM_PAD,
      t.max.x + RIM_PAD,
      y,
      t.max.z + RIM_PAD,
    ]);
    tops.push([t.min.x, y, t.min.z, t.max.x, y + TRAMP_LIFT, t.max.z]);
  }
  if (rims.length > 0) {
    out.push(boxesMesh(rims, COLOR_RIM, 'trampRims'));
    out.push(boxesMesh(tops, COLOR_CREAM, 'trampTops'));
  }
  const cush: Box[] = [];
  for (let i = 0; i < world.cushions.length; i++) {
    const c = world.cushions[i];
    cush.push([c.min.x, c.min.y, c.min.z, c.max.x, c.max.y + CUSHION_THICK, c.max.z]);
  }
  if (cush.length > 0) out.push(boxesMesh(cush, COLOR_CREAM, 'cushions'));
  return out;
}
