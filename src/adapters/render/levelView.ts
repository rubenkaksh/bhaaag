import {
  BufferGeometry,
  Color,
  DoubleSide,
  DynamicDrawUsage,
  Float32BufferAttribute,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshLambertMaterial,
  SphereGeometry,
  Vector3,
} from 'three';
import type { Camera } from 'three';
import { AABB } from '../../core/math/aabb';
import { Vec3 } from '../../core/math/vec3';
import { RIDGE_Z } from '../../core/world';
import type { World } from '../../core/world';
import { ROPE_TIE, buildRopePost } from '../../app/ropePost';
import { buildDecor, groundAt } from './decor/placeDecor';
import { buildStrategyFeatures, minSolidZ } from './strategyView';
import { setTerrainExtent } from './terrain';
import { tileNormal, tileTexture } from './tileTexture';

// Palette: desaturated warm world, three-colour language on top (gold interactive,
// cream safe, terracotta danger).
// ADR 0005 D3: terrace paving, whitewash walls, walkable roof, hot terracotta danger.
const COLOR_STYLE = ['#8e7a66', '#d9c6aa', '#b9a68c', '#c4472a', '#a99a88']; // ground, wall, roof, danger, parapet
const DANGER_STYLE = 3;
const STYLE_HIDDEN = 5; // invisible barrier walls around the hill
const STYLE_TEXTURE = ['stone_warm', '', 'terracotta_a', '', '']; // per style; '' keeps the flat colour
const COLOR_BRICK = '#9c5640';
const COLOR_WOOD = '#4a2c1c';
const COLOR_PAD = '#f1e9d2';
const COLOR_GOAL = '#efe2b4';
const COLOR_ANCHOR = '#ffc83a';
const COLOR_TILE_ROOF = '#b5523a'; // pitched tile roofs (ADR 0002): slippery, so danger-leaning red
// ADR 0009: anchors read from a phone at the far end of the lane: 0.5 m sphere plus a gold ring.
const ANCHOR_R = 0.5;
const RING_IN = 0.72;
const RING_OUT = 0.92;
const RING_SEGS = 16;
// Per-vertex cos/sin * radius for the ring quads (a0 in, a0 out, a1 out, a1 in), built once.
const RING_COS = new Float64Array(RING_SEGS * 4);
const RING_SIN = new Float64Array(RING_SEGS * 4);
for (let s = 0; s < RING_SEGS; s++) {
  const a0 = (s / RING_SEGS) * Math.PI * 2;
  const a1 = ((s + 1) / RING_SEGS) * Math.PI * 2;
  const angs = [a0, a0, a1, a1];
  const rs = [RING_IN, RING_OUT, RING_OUT, RING_IN];
  for (let v = 0; v < 4; v++) {
    RING_COS[s * 4 + v] = Math.cos(angs[v]) * rs[v];
    RING_SIN[s * 4 + v] = Math.sin(angs[v]) * rs[v];
  }
}
const COLOR_PAD_EDGE = '#6b4a30'; // dark timber border so a cream pad reads against cream roofs
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
  const mat = new MeshLambertMaterial({
    color: tint,
    flatShading: true,
    map,
    normalMap: map ? tileNormal(texture) : null,
  });
  if (emissiveScale > 0) mat.emissive = new Color(color).multiplyScalar(emissiveScale);
  const mesh = new Mesh(geo, mat);
  mesh.userData.cast = true; // opt-in shadow caster (render/scene.ts applyFlags)
  return mesh;
}

// Appends one gable prism (two tiled slopes, two gable triangles) for a pitched roof whose
// footprint is b (min.y eave, max.y ridge). Exactly the collider: no overhang, so the drawn eave is
// where the hero slips off. UVs run along the ridge and up the slope in world metres.
export function pushGable(
  pos: number[],
  idx: number[],
  uv: number[],
  b: AABB,
  ridge: number,
): void {
  // Work in a local frame: u along the ridge, v across it; map back to (x, z) at the end.
  const alongZ = ridge === RIDGE_Z;
  const u0 = alongZ ? b.min.z : b.min.x;
  const u1 = alongZ ? b.max.z : b.max.x;
  const v0 = alongZ ? b.min.x : b.min.z;
  const v1 = alongZ ? b.max.x : b.max.z;
  const vc = (v0 + v1) / 2;
  const y0 = b.min.y;
  const y1 = b.max.y;
  const slope = Math.hypot(vc - v0, y1 - y0);
  const put = (u: number, v: number, y: number, tu: number, tv: number): void => {
    if (alongZ) pos.push(v, y, u);
    else pos.push(u, y, v);
    uv.push(tu / TILE_M, tv / TILE_M);
  };
  // slopes: eave edge (v0 or v1) up to the ridge (vc)
  for (let side = 0; side < 2; side++) {
    const ve = side === 0 ? v0 : v1;
    const base = pos.length / 3;
    put(u0, ve, y0, u0, 0);
    put(u1, ve, y0, u1, 0);
    put(u1, vc, y1, u1, slope);
    put(u0, vc, y1, u0, slope);
    // outward winding: the normal must point away from the ridge line
    const flip = (side === 0) === alongZ;
    if (flip) idx.push(base, base + 1, base + 2, base, base + 2, base + 3);
    else idx.push(base, base + 2, base + 1, base, base + 3, base + 2);
  }
  // gable ends
  for (let end = 0; end < 2; end++) {
    const ue = end === 0 ? u0 : u1;
    const base = pos.length / 3;
    put(ue, v0, y0, v0, y0);
    put(ue, v1, y0, v1, y0);
    put(ue, vc, y1, vc, y1);
    const flip = (end === 0) !== alongZ;
    if (flip) idx.push(base, base + 1, base + 2);
    else idx.push(base, base + 2, base + 1);
  }
}

function gableMesh(world: World): Mesh {
  const pos: number[] = [];
  const idx: number[] = [];
  const uv: number[] = [];
  for (let i = 0; i < world.roofs.length; i++) {
    pushGable(pos, idx, uv, world.roofs[i].aabb, world.roofs[i].ridgeAxis);
  }
  const geo = new BufferGeometry();
  geo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  geo.setAttribute('uv', new Float32BufferAttribute(uv, 2));
  geo.setIndex(idx);
  geo.computeVertexNormals();
  const map = tileTexture('roof_tile');
  const tint = new Color(COLOR_TILE_ROOF);
  if (map) tint.lerp(new Color('#ffffff'), 0.55);
  const mesh = new Mesh(
    geo,
    new MeshLambertMaterial({
      color: tint,
      flatShading: true,
      map,
      normalMap: tileNormal('roof_tile'),
    }),
  );
  mesh.name = 'pitchedRoofs';
  mesh.userData.cast = true;
  return mesh;
}

const box = (x0: number, y0: number, z0: number, x1: number, y1: number, z1: number): AABB =>
  new AABB(new Vec3(x0, y0, z0), new Vec3(x1, y1, z1));

/**
 * Visual dressing for the goal haystack (ADR 0005 D5): fills the footprint down to the hill so it
 * never floats over the slope. House walls are dressed by decor/placeDecor (dressHouses).
 */
function dressingMeshes(world: World): Mesh[] {
  const brick: AABB[] = [];
  const wood: AABB[] = [];
  const P = 0.1;
  const out: Mesh[] = [];
  const g = world.goal;
  if (g.max.y > g.min.y) {
    // lowest hill point under the footprint, so the fill is never short on the downhill side
    const gy = Math.min(
      groundAt(world, g.min.x, g.min.z + 1),
      groundAt(world, g.max.x, g.min.z + 1),
      groundAt(world, (g.min.x + g.max.x) / 2, g.min.z + 1),
    );
    if (gy < g.min.y) {
      brick.push(box(g.min.x, gy - 0.3, g.min.z, g.max.x, g.min.y, g.max.z - 1));
      wood.push(
        box(g.min.x - P, g.min.y - 0.4, g.min.z - P, g.max.x + P, g.min.y - 0.1, g.max.z - 1 + P),
      );
    }
  }
  if (brick.length > 0) out.push(mergedMesh(brick, COLOR_BRICK, 0, 'brick_a'));
  if (wood.length > 0) out.push(mergedMesh(wood, COLOR_WOOD));
  return out;
}

export type BuildLevelOpts = {
  /** Hillside ground, forest, hill trees, field walls, birds and the rope post. Default true. */
  scenery?: boolean;
  /** Decor dressing of house walls (laundry, flags, strings). Default true; strategy mode uses false. */
  houseDress?: boolean;
  /** Cloud Village: no hillside or forest; houses are dressed down to this flat floor height (the cloud top). */
  floorY?: number;
};

/** Level geometry: one merged mesh per colour (styles, pads, goal, pitched roofs) plus anchor spheres. */
export function buildLevelMeshes(world: World, opts: BuildLevelOpts = {}): Group {
  const scenery = opts.scenery !== false && opts.floorY === undefined;
  const strategy = world.lineOnly === 1;
  if (scenery) setTerrainExtent(strategy ? minSolidZ(world) : null);
  const g = new Group();
  g.name = 'level';
  g.userData.route = world.route.slice();
  for (let st = 0; st < COLOR_STYLE.length; st++) {
    const boxes: AABB[] = [];
    for (let i = 0; i < world.solids.length; i++) {
      const s = i < world.style.length ? world.style[i] : 1;
      // the hidden barrier walls (style 5) are never drawn; neither is the kill slab far below
      if (s === st && s !== STYLE_HIDDEN && world.solids[i].max.y > world.killPlaneY) {
        boxes.push(world.solids[i]);
      }
    }
    if (boxes.length > 0) {
      g.add(mergedMesh(boxes, COLOR_STYLE[st], st === DANGER_STYLE ? 0.2 : 0, STYLE_TEXTURE[st]));
    }
  }
  if (world.pads.length > 0) {
    // Pads are zero-thickness surfaces: lift a thin slab so they never z-fight the roof. A dark
    // slab under a slightly smaller cream one gives a timber border (one more draw): a cream pad
    // on a cream roof otherwise vanishes.
    const slab = (p: AABB, inset: number, lift: number): AABB =>
      new AABB(
        new Vec3(p.min.x + inset, p.max.y, p.min.z + inset),
        new Vec3(p.max.x - inset, p.max.y + lift, p.max.z - inset),
      );
    const edge = mergedMesh(
      world.pads.map((p) => slab(p, 0, PAD_LIFT)),
      COLOR_PAD_EDGE,
    );
    const pads = mergedMesh(
      world.pads.map((p) => slab(p, 0.18, PAD_LIFT + 0.01)),
      COLOR_PAD,
    );
    edge.name = 'padEdge';
    for (const m of [edge, pads]) {
      m.userData.cast = false; // thin slabs: nothing to shadow
      g.add(m);
    }
  }
  if (world.goal.max.y > world.goal.min.y) g.add(mergedMesh([world.goal], COLOR_GOAL));
  if (world.roofs.length > 0) g.add(gableMesh(world));

  const dress = dressingMeshes(world);
  for (let i = 0; i < dress.length; i++) g.add(dress[i]);
  g.add(buildDecor(world, undefined, { scenery, houseDress: opts.houseDress, floorY: opts.floorY }));
  if (strategy) {
    const feats = buildStrategyFeatures(world);
    for (let i = 0; i < feats.length; i++) g.add(feats[i]);
  }
  // Cloud Village (floorY) has no pre-tied rope or post: the ziplines are the anchors themselves.
  if (scenery) g.add(buildRopePost(world));
  else ROPE_TIE.set = false;

  const sphere = new SphereGeometry(ANCHOR_R, 12, 8);
  // lineOnly worlds (strategy maze): 100 anchors would break the draw-call budget, and the
  // rope ends are drawn as posts by buildStrategyFeatures instead.
  for (let i = 0; i < (strategy ? 0 : world.anchors.length); i++) {
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
  if (world.anchors.length > 0 && !strategy) g.add(buildAnchorRings(world));
  return g;
}

/**
 * One camera-facing gold ring per anchor, all in one mesh (one draw): vertices are rewritten each
 * frame from the camera's right/up. Opaque, depth-tested, so walls still hide a far anchor.
 */
function buildAnchorRings(world: World): Mesh {
  const n = world.anchors.length;
  const per = RING_SEGS * 4; // 4 verts per segment quad
  const pos = new Float32Array(n * per * 3);
  const idx: number[] = [];
  for (let k = 0; k < n * RING_SEGS; k++) {
    const b = k * 4;
    idx.push(b, b + 1, b + 2, b, b + 2, b + 3);
  }
  const geo = new BufferGeometry();
  const attr = new Float32BufferAttribute(pos, 3);
  attr.setUsage(DynamicDrawUsage);
  geo.setAttribute('position', attr);
  geo.setIndex(idx);
  const mesh = new Mesh(
    geo,
    new MeshBasicMaterial({ color: new Color(COLOR_ANCHOR), fog: false, side: DoubleSide }),
  );
  mesh.name = 'anchorRings';
  mesh.frustumCulled = false;
  mesh.userData.target = -1;
  const right = new Vector3();
  const up = new Vector3();
  mesh.onBeforeRender = (_r, _s, camera: Camera): void => {
    const e = camera.matrixWorld.elements;
    right.set(e[0], e[1], e[2]);
    up.set(e[4], e[5], e[6]);
    const target = mesh.userData.target as number;
    for (let i = 0; i < n; i++) {
      const a = world.anchors[i];
      const k = i === target ? 1.25 : 1;
      let o = i * per * 3;
      for (let s = 0; s < RING_SEGS; s++) {
        for (let v = 0; v < 4; v++) {
          const c = RING_COS[s * 4 + v] * k;
          const sn = RING_SIN[s * 4 + v] * k;
          pos[o++] = a.px + right.x * c + up.x * sn;
          pos[o++] = a.py + right.y * c + up.y * sn;
          pos[o++] = a.pz + right.z * c + up.z * sn;
        }
      }
    }
    attr.needsUpdate = true;
  };
  return mesh;
}

/** Runner's vision: only anchor route[nextRouteIndex] pulses; the rest stay static. */
export function updateLevelView(group: Group, nowSec: number, nextRouteIndex: number): void {
  const route = group.userData.route as number[] | undefined;
  const target =
    route && nextRouteIndex >= 0 && nextRouteIndex < route.length ? route[nextRouteIndex] : -1;
  for (let i = 0; i < group.children.length; i++) {
    const c = group.children[i];
    if (c.name === 'anchorRings') c.userData.target = target;
    if (c.userData.anchorId === undefined) continue;
    const k = c.userData.anchorId === target ? 1 + 0.35 * Math.sin(nowSec * 6) : 1;
    c.scale.setScalar(k);
  }
}
