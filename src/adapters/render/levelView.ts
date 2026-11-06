import {
  BufferGeometry,
  Color,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
} from 'three';
import { AABB } from '../../core/math/aabb';
import { Vec3 } from '../../core/math/vec3';
import type { World } from '../../core/world';
import { buildRopePost } from '../../app/ropePost';
import { buildDecor, groundAt } from './decor/placeDecor';

// Palette: desaturated warm world, three-colour language on top (gold interactive,
// cream safe, terracotta danger).
// ADR 0005 D3: terrace paving, whitewash walls, walkable roof, hot terracotta danger.
const COLOR_STYLE = ['#8e7a66', '#d9c6aa', '#b9a68c', '#c4472a']; // ground, wall, roof, danger
const DANGER_STYLE = 3;
const COLOR_BRICK = '#9c5640';
const COLOR_WOOD = '#4a2c1c';
const COLOR_PAD = '#f1e9d2';
const COLOR_GOAL = '#efe2b4';
const COLOR_ANCHOR = '#ffc83a';
const ANCHOR_R = 0.35;
const PAD_LIFT = 0.03;

// Appends the 12 triangles of an axis-aligned box to flat position/index arrays.
function pushBox(pos: number[], idx: number[], b: AABB): void {
  const x0 = b.min.x;
  const y0 = b.min.y;
  const z0 = b.min.z;
  const x1 = b.max.x;
  const y1 = b.max.y;
  const z1 = b.max.z;
  const base = pos.length / 3;
  pos.push(
    x0,
    y0,
    z0,
    x1,
    y0,
    z0,
    x1,
    y1,
    z0,
    x0,
    y1,
    z0,
    x0,
    y0,
    z1,
    x1,
    y0,
    z1,
    x1,
    y1,
    z1,
    x0,
    y1,
    z1,
  );
  const f = [
    0, 2, 1, 0, 3, 2, 4, 5, 6, 4, 6, 7, 0, 4, 7, 0, 7, 3, 1, 2, 6, 1, 6, 5, 3, 7, 6, 3, 6, 2, 0, 1,
    5, 0, 5, 4,
  ];
  for (let i = 0; i < f.length; i++) idx.push(base + f[i]);
}

function mergedMesh(boxes: AABB[], color: string, emissiveScale = 0): Mesh {
  const pos: number[] = [];
  const idx: number[] = [];
  for (let i = 0; i < boxes.length; i++) pushBox(pos, idx, boxes[i]);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const mat = new MeshLambertMaterial({ color: new Color(color), flatShading: true });
  if (emissiveScale > 0) mat.emissive = new Color(color).multiplyScalar(emissiveScale);
  return new Mesh(geo, mat);
}

const box = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB =>
  new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));

function overlap(a0: number, a1: number, b0: number, b1: number): number {
  return Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
}

// True if a style-1 wall (xz overlap >= 50 % of the roof, top within 0.1 m of its underside) supports it.
function hasWallBelow(world: World, r: AABB): boolean {
  const area = (r.max.x - r.min.x) * (r.max.z - r.min.z);
  for (let j = 0; j < world.solids.length; j++) {
    const sj = j < world.style.length ? world.style[j] : 1;
    if (sj !== 1) continue;
    const w = world.solids[j];
    if (Math.abs(w.max.y - r.min.y) > 0.1) continue;
    const ov =
      overlap(r.min.x, r.max.x, w.min.x, w.max.x) * overlap(r.min.z, r.max.z, w.min.z, w.max.z);
    if (ov >= 0.5 * area) return true;
  }
  return false;
}

// Highest style-0 top under (x, z) that is below maxY; -Infinity if none.
function highestGroundUnder(world: World, x: number, z: number, maxY: number): number {
  let best = -Infinity;
  for (let j = 0; j < world.solids.length; j++) {
    const sj = j < world.style.length ? world.style[j] : 1;
    if (sj !== 0) continue;
    const g = world.solids[j];
    if (x < g.min.x || x > g.max.x || z < g.min.z || z > g.max.z) continue;
    if (g.max.y <= maxY && g.max.y > best) best = g.max.y;
  }
  return best;
}

/**
 * Visual dressing for walkable houses and the goal house (ADR 0005 D5). Never above top - 0.3 m of
 * a wall collider, at most 0.12 m proud of its faces, so collider tops and edges stay honest.
 */
function dressingMeshes(world: World): Mesh[] {
  const brick: AABB[] = [];
  const wood: AABB[] = [];
  const P = 0.1;
  for (let i = 0; i < world.solids.length; i++) {
    const st = i < world.style.length ? world.style[i] : 1;
    if (st !== 1) continue;
    const w = world.solids[i];
    const gy = groundAt(world, (w.min.x + w.max.x) / 2, (w.min.z + w.max.z) / 2);
    if (gy < w.min.y - 0.5) brick.push(box(w.min.x, gy, w.min.z, w.max.x, w.min.y, w.max.z));
    const h = w.max.y - w.min.y;
    wood.push(box(w.min.x - P, w.max.y - 3, w.min.z - P, w.max.x + P, w.max.y - 2.7, w.max.z + P));
    const rows = [w.min.y + 1.0, w.min.y + Math.max(1.0, h - 2.3)];
    for (let r = 0; r < rows.length; r++) {
      const y = rows[r];
      for (let j = 0; j < 3; j++) {
        const u = (j + 0.5) / 3;
        const x = w.min.x + (w.max.x - w.min.x) * u;
        const z = w.min.z + (w.max.z - w.min.z) * u;
        wood.push(box(x - 0.45, y, w.min.z - 0.08, x + 0.45, y + 1.3, w.min.z));
        wood.push(box(x - 0.45, y, w.max.z, x + 0.45, y + 1.3, w.max.z + 0.08));
        wood.push(box(w.min.x - 0.08, y, z - 0.45, w.min.x, y + 1.3, z + 0.45));
        wood.push(box(w.max.x, y, z - 0.45, w.max.x + 0.08, y + 1.3, z + 0.45));
      }
    }
  }
  // S0 base (ADR 0007 section 5): a style-2 roof with no style-1 wall directly below gets a
  // flush brick box down to the highest style-0 top under its centre. Visual only.
  for (let i = 0; i < world.solids.length; i++) {
    const st = i < world.style.length ? world.style[i] : 1;
    if (st !== 2) continue;
    const r = world.solids[i];
    if (!hasWallBelow(world, r)) {
      const gy = highestGroundUnder(
        world,
        (r.min.x + r.max.x) / 2,
        (r.min.z + r.max.z) / 2,
        r.min.y,
      );
      if (gy < r.min.y) brick.push(box(r.min.x, gy, r.min.z, r.max.x, r.min.y, r.max.z));
    }
  }
  const out: Mesh[] = [];
  // goal house: fills the goal footprint down to the terrace (visual only; kept clear of the last wall)
  const g = world.goal;
  if (g.max.y > g.min.y) {
    const gy = groundAt(world, (g.min.x + g.max.x) / 2, g.min.z + 1);
    if (gy < g.min.y) {
      brick.push(box(g.min.x, gy, g.min.z, g.max.x, g.min.y, g.max.z - 1));
      wood.push(
        box(g.min.x - P, g.min.y - 0.4, g.min.z - P, g.max.x + P, g.min.y - 0.1, g.max.z - 1 + P),
      );
    }
  }
  if (brick.length > 0) out.push(mergedMesh(brick, COLOR_BRICK));
  if (wood.length > 0) out.push(mergedMesh(wood, COLOR_WOOD));
  return out;
}

/** Level geometry: one merged mesh per colour (4 styles, pads, goal) plus anchor spheres. */
export function buildLevelMeshes(world: World): Group {
  const g = new Group();
  g.name = 'level';
  g.userData.route = world.route.slice();
  for (let st = 0; st < COLOR_STYLE.length; st++) {
    const boxes: AABB[] = [];
    for (let i = 0; i < world.solids.length; i++) {
      const s = i < world.style.length ? world.style[i] : 1;
      if (s === st) boxes.push(world.solids[i]);
    }
    if (boxes.length > 0) {
      g.add(mergedMesh(boxes, COLOR_STYLE[st], st === DANGER_STYLE ? 0.2 : 0));
    }
  }
  if (world.pads.length > 0) {
    // Pads are zero-thickness surfaces: lift a thin slab so they never z-fight the roof.
    const slabs: AABB[] = [];
    for (let i = 0; i < world.pads.length; i++) {
      const p = world.pads[i];
      slabs.push(
        new AABB(
          new Vec3(p.min.x, p.max.y, p.min.z),
          new Vec3(p.max.x, p.max.y + PAD_LIFT, p.max.z),
        ),
      );
    }
    g.add(mergedMesh(slabs, COLOR_PAD));
  }
  if (world.goal.max.y > world.goal.min.y) g.add(mergedMesh([world.goal], COLOR_GOAL));

  const dress = dressingMeshes(world);
  for (let i = 0; i < dress.length; i++) g.add(dress[i]);
  g.add(buildDecor(world));
  g.add(buildRopePost(world));

  const sphere = new SphereGeometry(ANCHOR_R, 12, 8);
  for (let i = 0; i < world.anchors.length; i++) {
    const a = world.anchors[i];
    const m = new Mesh(
      sphere,
      new MeshBasicMaterial({ color: new Color(COLOR_ANCHOR), fog: false }),
    );
    m.position.set(a.px, a.py, a.pz);
    m.name = 'anchor' + i;
    m.userData.anchorId = i;
    g.add(m);
  }
  return g;
}

/** Runner's vision: only anchor route[nextRouteIndex] pulses; the rest stay static. */
export function updateLevelView(group: Group, nowSec: number, nextRouteIndex: number): void {
  const route = group.userData.route as number[] | undefined;
  const target =
    route && nextRouteIndex >= 0 && nextRouteIndex < route.length ? route[nextRouteIndex] : -1;
  for (let i = 0; i < group.children.length; i++) {
    const c = group.children[i];
    if (c.userData.anchorId === undefined) continue;
    const k = c.userData.anchorId === target ? 1 + 0.35 * Math.sin(nowSec * 6) : 1;
    c.scale.setScalar(k);
  }
}
