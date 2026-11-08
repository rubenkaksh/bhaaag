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
import { tileTexture } from './tileTexture';

// Palette: desaturated warm world, three-colour language on top (gold interactive,
// cream safe, terracotta danger).
// ADR 0005 D3: terrace paving, whitewash walls, walkable roof, hot terracotta danger.
const COLOR_STYLE = ['#8e7a66', '#d9c6aa', '#b9a68c', '#c4472a', '#a99a88']; // ground, wall, roof, danger, parapet
const DANGER_STYLE = 3;
const STYLE_TEXTURE = ['stone_warm', '', 'terracotta_a', '', '']; // per style; '' keeps the flat colour
const COLOR_BRICK = '#9c5640';
const COLOR_WOOD = '#4a2c1c';
const COLOR_PAD = '#f1e9d2';
const COLOR_GOAL = '#efe2b4';
const COLOR_ANCHOR = '#ffc83a';
const ANCHOR_R = 0.35;
const PAD_LIFT = 0.03;

const TILE_M = 4; // one texture tile covers this many metres

// Appends the 12 triangles of an axis-aligned box (24 vertices, so each face keeps its own
// world-space planar UVs: tiles line up across neighbouring boxes with no stretching).
function pushBox(pos: number[], idx: number[], uv: number[], b: AABB): void {
  const lo = [b.min.x, b.min.y, b.min.z];
  const hi = [b.max.x, b.max.y, b.max.z];
  for (let axis = 0; axis < 3; axis++) {
    const ua = axis === 0 ? 2 : 0; // texture axes: top uses (x, z), z faces (x, y), x faces (z, y)
    const va = axis === 1 ? 2 : 1;
    for (let side = 0; side < 2; side++) {
      const c = side === 0 ? lo[axis] : hi[axis];
      const base = pos.length / 3;
      for (let k = 0; k < 4; k++) {
        const p = [0, 0, 0];
        p[axis] = c;
        p[ua] = k === 0 || k === 3 ? lo[ua] : hi[ua];
        p[va] = k < 2 ? lo[va] : hi[va];
        pos.push(p[0], p[1], p[2]);
        uv.push(p[ua] / TILE_M, p[va] / TILE_M);
      }
      // wind so the face looks outward: flip by axis parity and side
      const flip = (axis === 2 ? side === 0 : side === 1) ? 1 : 0;
      if (flip === 0) idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
      else idx.push(base, base + 2, base + 1, base, base + 3, base + 2);
    }
  }
}

function mergedMesh(boxes: AABB[], color: string, emissiveScale = 0, texture = ''): Mesh {
  const pos: number[] = [];
  const idx: number[] = [];
  const uv: number[] = [];
  for (let i = 0; i < boxes.length; i++) pushBox(pos, idx, uv, boxes[i]);
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const map = texture ? tileTexture(texture) : null;
  // the map multiplies the colour, so a textured mesh gets a lightened tint of its palette colour
  const tint = new Color(color);
  if (map) tint.lerp(new Color('#ffffff'), 0.55);
  const mat = new MeshLambertMaterial({ color: tint, flatShading: true, map });
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
  // House walls are dressed by decor/placeDecor (dressHouses); only S0 and the goal are dressed here.
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
  if (brick.length > 0) out.push(mergedMesh(brick, COLOR_BRICK, 0, 'brick_a'));
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
      g.add(mergedMesh(boxes, COLOR_STYLE[st], st === DANGER_STYLE ? 0.2 : 0, STYLE_TEXTURE[st]));
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
