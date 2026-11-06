import {
  BoxGeometry,
  BufferGeometry,
  Color,
  CylinderGeometry,
  DoubleSide,
  Float32BufferAttribute,
  Group,
  IcosahedronGeometry,
  InstancedMesh,
  LatheGeometry,
  Matrix4,
  MeshLambertMaterial,
  PlaneGeometry,
  Quaternion,
  Vector2,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// ADR 0005 D5 / ADR 0006 section 4 city kit: one InstancedMesh per piece, unit geometry scaled per instance.
export type PieceId =
  | 'body'
  | 'cornice'
  | 'window'
  | 'roof'
  | 'rail'
  | 'deck'
  | 'tank'
  | 'parapet'
  | 'canopy'
  | 'trunk'
  | 'flag'
  | 'shutter'
  | 'pot';

export const PIECE_IDS: PieceId[] = [
  'body',
  'cornice',
  'window',
  'roof',
  'rail',
  'deck',
  'tank',
  'parapet',
  'canopy',
  'trunk',
  'flag',
  'shutter',
  'pot',
];

export const PIECE_CAP: Record<PieceId, number> = {
  body: 1650,
  cornice: 300,
  window: 700,
  roof: 400,
  rail: 80,
  deck: 60,
  tank: 60,
  parapet: 260,
  canopy: 110,
  trunk: 120,
  flag: 800,
  shutter: 160,
  pot: 140,
};

/** Tiled eave unit: apex height 0.49, corner radius 0.74 (4 sides, edges axis-aligned). */
export const ROOF_UNIT_H = 0.49;
export const ROOF_UNIT_W = 0.74 * Math.SQRT2;
export const TANK_UNIT_H = 2.18;
export const RAIL_LEN = 2.4;
export const RAIL_H = 0.9;
export const RAIL_POST_H = 1.05;

/** Deterministic PRNG (no Math.random, no time). */
export function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function paint(geo: BufferGeometry, fn: (y: number) => [number, number, number]): void {
  const pos = geo.getAttribute('position');
  const col: number[] = [];
  for (let i = 0; i < pos.count; i++) {
    const c = fn(pos.getY(i));
    col.push(c[0], c[1], c[2]);
  }
  geo.setAttribute('color', new Float32BufferAttribute(col, 3));
}

function paintConst(geo: BufferGeometry, v: number): void {
  paint(geo, () => [v, v, v]);
}

function paintColor(geo: BufferGeometry, hex: string): void {
  const c = new Color(hex);
  paint(geo, () => [c.r, c.g, c.b]);
}

/** Vertical gradient (bottom 0.72, top 1.0) over [y0, y1]: fake ambient occlusion. */
function paintGrad(geo: BufferGeometry, y0: number, y1: number): void {
  const span = Math.max(1e-6, y1 - y0);
  paint(geo, (y) => {
    const c = 0.72 + 0.28 * Math.min(1, Math.max(0, (y - y0) / span));
    return [c, c, c];
  });
}

/** Box part with optional dropped faces (BoxGeometry face order: +x, -x, +y, -y, +z, -z). */
function boxPart(
  sx: number,
  sy: number,
  sz: number,
  x: number,
  y: number,
  z: number,
  skip: number[] = [],
): BufferGeometry {
  const b = new BoxGeometry(sx, sy, sz);
  b.translate(x, y, z);
  b.deleteAttribute('uv');
  if (skip.length > 0) {
    const idx = b.index!;
    const out: number[] = [];
    for (let f = 0; f < 6; f++) {
      if (skip.indexOf(f) >= 0) continue;
      for (let j = 0; j < 6; j++) out.push(idx.getX(f * 6 + j));
    }
    b.setIndex(out);
  }
  return b;
}

function merge(parts: BufferGeometry[]): BufferGeometry {
  const m = mergeGeometries(parts, false);
  for (let i = 0; i < parts.length; i++) parts[i].dispose();
  return m;
}

function unitBox(): BufferGeometry {
  const g = new BoxGeometry(1, 1, 1);
  g.translate(0, 0.5, 0);
  g.deleteAttribute('uv');
  paintGrad(g, 0, 1);
  return g;
}

function white(g: BufferGeometry): BufferGeometry {
  g.deleteAttribute('uv');
  paintConst(g, 1);
  return g;
}

function railUnit(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  const add = (g: BufferGeometry, v: number | null): void => {
    if (v === null) paintGrad(g, 0, RAIL_POST_H);
    else paintConst(g, v);
    parts.push(g);
  };
  add(boxPart(RAIL_LEN, 0.06, 0.06, 0, RAIL_H - 0.03, 0), null); // top rail
  add(boxPart(RAIL_LEN, 0.06, 0.06, 0, 0.25, 0), null); // low rail
  for (let i = 0; i < 6; i++)
    add(boxPart(0.05, RAIL_H, 0.05, -1.0 + i * 0.4, RAIL_H / 2, 0, [2, 3]), null);
  add(boxPart(0.12, RAIL_POST_H, 0.12, -1.14, RAIL_POST_H / 2, 0), null);
  add(boxPart(0.12, RAIL_POST_H, 0.12, 1.14, RAIL_POST_H / 2, 0), null);
  add(boxPart(RAIL_LEN, 0.18, 0.03, 0, 0.71, 0), 0.7); // carved frieze plank
  return merge(parts);
}

function windowUnit(): BufferGeometry {
  const frame = boxPart(1, 1, 1, 0, 0.5, 0, [5]);
  paintGrad(frame, 0, 1);
  const pane = new PlaneGeometry(0.76, 0.8);
  pane.translate(0, 0.5, 0.75);
  pane.deleteAttribute('uv');
  paintConst(pane, 0.4);
  const sill = boxPart(1.2, 0.08, 1.6, 0, -0.04, 0.3, [5]);
  paintConst(sill, 0.72);
  return merge([frame, pane, sill]);
}

function roofUnit(): BufferGeometry {
  const ys = [0, 0.04, 0.1, 0.28, 0.49];
  const bands = [0.5, 0.78, 1.0, 0.88, 1.0];
  const pts = [
    new Vector2(0.56, 0),
    new Vector2(0.74, 0.04),
    new Vector2(0.58, 0.1),
    new Vector2(0.34, 0.28),
    new Vector2(0, 0.49),
  ];
  const g = new LatheGeometry(pts, 4, Math.PI / 4);
  g.deleteAttribute('uv');
  paint(g, (y) => {
    let best = 0;
    for (let i = 1; i < ys.length; i++) if (Math.abs(ys[i] - y) < Math.abs(ys[best] - y)) best = i;
    const v = bands[best];
    return [v, v, v];
  });
  return g;
}

function tankUnit(): BufferGeometry {
  const parts: BufferGeometry[] = [];
  for (let sx = -1; sx <= 1; sx += 2) {
    for (let sz = -1; sz <= 1; sz += 2) {
      const s = boxPart(0.08, 1.0, 0.08, sx * 0.42, 0.5, sz * 0.42, [2, 3]);
      paintConst(s, 0.55);
      parts.push(s);
    }
  }
  const plat = boxPart(1.0, 0.08, 1.0, 0, 1.04, 0);
  paintConst(plat, 0.55);
  parts.push(plat);
  const cyl = new CylinderGeometry(0.5, 0.5, 1.1, 8);
  cyl.translate(0, 1.08 + 0.55, 0);
  parts.push(white(cyl));
  return merge(parts);
}

function canopyUnit(): BufferGeometry {
  const g = new IcosahedronGeometry(1, 1);
  const pos = g.getAttribute('position');
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    const h =
      (Math.imul(Math.round(x * 1000), 73856093) ^
        Math.imul(Math.round(y * 1000), 19349663) ^
        Math.imul(Math.round(z * 1000), 83492791)) >>>
      0;
    const k = 1 + (mulberry32(h)() * 2 - 1) * 0.06;
    pos.setXYZ(i, x * k, y * k, z * k);
  }
  return white(g);
}

function shutterUnit(): BufferGeometry {
  const a = boxPart(0.45, 1.3, 0.04, -0.705, 0.65, 0.02, [5]);
  const b = boxPart(0.45, 1.3, 0.04, 0.705, 0.65, 0.02, [5]);
  paintConst(a, 0.8);
  paintConst(b, 0.8);
  return merge([a, b]);
}

function potUnit(): BufferGeometry {
  const cyl = new CylinderGeometry(0.16, 0.12, 0.28, 6, 1, true);
  cyl.translate(0, 0.14, 0);
  cyl.deleteAttribute('uv');
  const pot = cyl.toNonIndexed();
  cyl.dispose();
  paintColor(pot, '#9a4a2e');
  const bush = new IcosahedronGeometry(0.24, 0);
  bush.translate(0, 0.42, 0);
  bush.deleteAttribute('uv');
  paintColor(bush, '#5d7a3a');
  return merge([pot, bush]);
}

function geometries(): Record<PieceId, BufferGeometry> {
  const trunk = new CylinderGeometry(0.15, 0.2, 1, 5, 1, true);
  trunk.translate(0, 0.5, 0);
  const flag = new PlaneGeometry(0.35, 0.25);
  return {
    body: unitBox(),
    cornice: unitBox(),
    window: windowUnit(),
    roof: roofUnit(),
    rail: railUnit(),
    deck: unitBox(),
    tank: tankUnit(),
    parapet: unitBox(),
    canopy: canopyUnit(),
    trunk: white(trunk),
    flag: white(flag),
    shutter: shutterUnit(),
    pot: potUnit(),
  };
}

function triCount(g: BufferGeometry): number {
  return g.index ? g.index.count / 3 : g.getAttribute('position').count / 3;
}

const tmpM = new Matrix4();
const tmpQ = new Quaternion();
const tmpP = new Vector3();
const tmpS = new Vector3();
const UP = new Vector3(0, 1, 0);

/** Owns the 13 instanced meshes. add() returns false once a piece's capacity is spent. */
export class DecorKit {
  readonly meshes: Record<PieceId, InstancedMesh>;
  readonly used: Record<PieceId, number>;
  /** Adds refused because a piece's capacity was spent (should stay 0). */
  readonly dropped: Record<PieceId, number>;

  constructor() {
    const geos = geometries();
    const mat = new MeshLambertMaterial({
      color: '#ffffff',
      vertexColors: true,
      flatShading: true,
    });
    const twoSided = new MeshLambertMaterial({
      color: '#ffffff',
      vertexColors: true,
      flatShading: true,
      side: DoubleSide,
    });
    const meshes = {} as Record<PieceId, InstancedMesh>;
    const used = {} as Record<PieceId, number>;
    const dropped = {} as Record<PieceId, number>;
    for (let i = 0; i < PIECE_IDS.length; i++) {
      const id = PIECE_IDS[i];
      const m = new InstancedMesh(
        geos[id],
        id === 'flag' || id === 'pot' || id === 'shutter' ? twoSided : mat,
        PIECE_CAP[id],
      );
      m.name = 'decor_' + id;
      m.count = 0;
      m.frustumCulled = false;
      meshes[id] = m;
      used[id] = 0;
      dropped[id] = 0;
    }
    this.meshes = meshes;
    this.used = used;
    this.dropped = dropped;
  }

  /** Places one instance. (cx, cy, cz) is the piece origin (bottom-centre for boxes, centre for canopy/flag). */
  add(
    id: PieceId,
    cx: number,
    cy: number,
    cz: number,
    sx: number,
    sy: number,
    sz: number,
    rotY: number,
    color: Color,
  ): boolean {
    const i = this.used[id];
    if (i >= PIECE_CAP[id]) {
      this.dropped[id]++;
      return false;
    }
    tmpP.set(cx, cy, cz);
    tmpQ.setFromAxisAngle(UP, rotY);
    tmpS.set(sx, sy, sz);
    tmpM.compose(tmpP, tmpQ, tmpS);
    const m = this.meshes[id];
    m.setMatrixAt(i, tmpM);
    m.setColorAt(i, color);
    this.used[id] = i + 1;
    return true;
  }

  triangles(): number {
    let t = 0;
    for (let i = 0; i < PIECE_IDS.length; i++) {
      const id = PIECE_IDS[i];
      t += this.used[id] * triCount(this.meshes[id].geometry);
    }
    return t;
  }

  /** Finalises counts and returns the meshes (empty pieces are left out). */
  finish(): Group {
    const g = new Group();
    for (let i = 0; i < PIECE_IDS.length; i++) {
      const id = PIECE_IDS[i];
      const m = this.meshes[id];
      m.count = this.used[id];
      m.instanceMatrix.needsUpdate = true;
      if (m.instanceColor) m.instanceColor.needsUpdate = true;
      if (m.count > 0) g.add(m);
    }
    return g;
  }
}

/** Worst-case triangles if every piece is filled to capacity. */
export function kitTriangleCeiling(): number {
  const geos = geometries();
  let t = 0;
  for (let i = 0; i < PIECE_IDS.length; i++) {
    t += PIECE_CAP[PIECE_IDS[i]] * triCount(geos[PIECE_IDS[i]]);
    geos[PIECE_IDS[i]].dispose();
  }
  return t;
}
