// Landing pads, render only (colliders untouched): the cushion is a stack of cream puffs with dark
// seams and a gold edge ring; the trampoline is a framed taut mat with legs, spring ticks and a
// gold concentric bounce ring. Primitives only, vertex colours, stock Lambert, no textures.
// Colour language: cream = safe (puffs, mat), gold = interactive (edge ring, bounce ring),
// brown = structure (frame, legs, seams).
import { BufferGeometry, Color, Float32BufferAttribute, Mesh, MeshLambertMaterial } from 'three';
import type { World } from '../../core/world';

export const PAD_CREAM = '#f1e9d2';
export const PAD_CREAM_LIGHT = '#fbf6e6';
export const PAD_SEAM = '#d8c9a0';
export const PAD_GOLD = '#ffc83a';
export const PAD_FRAME = '#5a3622';
export const PAD_LEG = '#3a2c24';

const PUFF_CELL = 1.4; // target puff footprint (m)
const PUFF_RISE = 0.3; // puff top over the slab top; the old flat cushion rose 0.3
const PUFF_SINK = 0.06; // puffs sit this far into the slab so no gap shows
const SEAM_H = 0.1; // dark base slab the puffs sit on: reads as the seams between them
const RING_W = 0.13;
const RING_LIFT = 0.02;
const FRAME_W = 0.14;
const FRAME_H = 0.17;
const FRAME_PAD = 0.15; // frame sits this far outside the pad collider
const MAT_LIFT = 0.05; // taut mat top over the pad top
const LEG_W = 0.13;
const SPRING_STEP = 0.42;
const SPRING_W = 0.05;

type Box = [number, number, number, number, number, number]; // x0 y0 z0 x1 y1 z1

class PadBuilder {
  private pos: number[] = [];
  private nor: number[] = [];
  private col: number[] = [];
  private idx: number[] = [];

  private vert(x: number, y: number, z: number, nx: number, ny: number, nz: number, c: Color): number {
    const i = this.pos.length / 3;
    this.pos.push(x, y, z);
    this.nor.push(nx, ny, nz);
    this.col.push(c.r, c.g, c.b);
    return i;
  }

  box(b: Box, hex: string): void {
    const c = new Color(hex);
    const [x0, y0, z0, x1, y1, z1] = b;
    const faces: [number[], number[]][] = [
      [[0, 1, 0], [x0, y1, z0, x0, y1, z1, x1, y1, z1, x1, y1, z0]],
      [[0, -1, 0], [x0, y0, z0, x1, y0, z0, x1, y0, z1, x0, y0, z1]],
      [[0, 0, 1], [x0, y0, z1, x1, y0, z1, x1, y1, z1, x0, y1, z1]],
      [[0, 0, -1], [x1, y0, z0, x0, y0, z0, x0, y1, z0, x1, y1, z0]],
      [[1, 0, 0], [x1, y0, z1, x1, y0, z0, x1, y1, z0, x1, y1, z1]],
      [[-1, 0, 0], [x0, y0, z0, x0, y0, z1, x0, y1, z1, x0, y1, z0]],
    ];
    for (const [n, p] of faces) {
      const a = this.vert(p[0], p[1], p[2], n[0], n[1], n[2], c);
      const b2 = this.vert(p[3], p[4], p[5], n[0], n[1], n[2], c);
      const c2 = this.vert(p[6], p[7], p[8], n[0], n[1], n[2], c);
      const d = this.vert(p[9], p[10], p[11], n[0], n[1], n[2], c);
      this.idx.push(a, b2, c2, a, c2, d);
    }
  }

  /** Upper half of an ellipsoid, smooth normals; `shade` is the colour at the equator ring. */
  dome(cx: number, cy: number, cz: number, rx: number, ry: number, rz: number, hex: string, shade: string): void {
    const top = new Color(hex);
    const low = new Color(shade);
    const seg = 12;
    const rings = 4;
    const base = this.pos.length / 3;
    for (let r = 0; r <= rings; r++) {
      const phi = (r / rings) * (Math.PI / 2); // 0 = equator, pi/2 = pole
      const ring = Math.cos(phi);
      const y = Math.sin(phi);
      const c = low.clone().lerp(top, Math.min(1, r / (rings - 1)));
      for (let s = 0; s < (r === rings ? 1 : seg + 1); s++) {
        const th = (s / seg) * Math.PI * 2;
        const ux = Math.cos(th) * ring;
        const uz = Math.sin(th) * ring;
        this.vert(cx + ux * rx, cy + y * ry, cz + uz * rz, ux / rx, y / ry, uz / rz, c);
      }
    }
    // indices: rows of (seg+1) verts, last row is the single pole vertex
    const rowStart = (r: number): number => base + r * (seg + 1);
    for (let r = 0; r < rings; r++) {
      for (let s = 0; s < seg; s++) {
        const a = rowStart(r) + s;
        const b = a + 1;
        if (r === rings - 1) {
          this.idx.push(a, rowStart(rings), b);
        } else {
          const c2 = rowStart(r + 1) + s;
          const d = c2 + 1;
          this.idx.push(a, c2, b, b, c2, d);
        }
      }
    }
  }

  /** Flat ring (annulus) in the xz plane facing up, as `seg` trapezoids. */
  ring(cx: number, y: number, cz: number, r0: number, r1: number, hex: string, seg = 28): void {
    const c = new Color(hex);
    const base = this.pos.length / 3;
    for (let s = 0; s <= seg; s++) {
      const th = (s / seg) * Math.PI * 2;
      const cs = Math.cos(th);
      const sn = Math.sin(th);
      this.vert(cx + cs * r0, y, cz + sn * r0, 0, 1, 0, c);
      this.vert(cx + cs * r1, y, cz + sn * r1, 0, 1, 0, c);
    }
    for (let s = 0; s < seg; s++) {
      const a = base + s * 2;
      this.idx.push(a, a + 3, a + 1, a, a + 2, a + 3);
    }
  }

  get empty(): boolean {
    return this.idx.length === 0;
  }

  mesh(name: string): Mesh {
    const geo = new BufferGeometry();
    geo.setAttribute('position', new Float32BufferAttribute(this.pos, 3));
    geo.setAttribute('normal', new Float32BufferAttribute(this.nor, 3));
    geo.setAttribute('color', new Float32BufferAttribute(this.col, 3));
    geo.setIndex(this.idx);
    const m = new Mesh(geo, new MeshLambertMaterial({ vertexColors: true, emissive: new Color('#4a4538') }));
    m.name = name;
    m.userData.cast = false;
    return m;
  }
}

/** Puffs of one cushion slab: a seam-coloured base, a grid of domes, a gold edge ring. */
export function addCushion(b: PadBuilder, x0: number, y: number, z0: number, x1: number, z1: number): void {
  const w = x1 - x0;
  const d = z1 - z0;
  b.box([x0, y - 0.02, z0, x1, y + SEAM_H - PUFF_SINK, z1], PAD_SEAM);
  const nx = Math.max(1, Math.round(w / PUFF_CELL));
  const nz = Math.max(1, Math.round(d / PUFF_CELL));
  const cw = w / nx;
  const cd = d / nz;
  for (let iz = 0; iz < nz; iz++) {
    for (let ix = 0; ix < nx; ix++) {
      const alt = (ix + iz) % 2 === 0;
      b.dome(
        x0 + (ix + 0.5) * cw,
        y - PUFF_SINK,
        z0 + (iz + 0.5) * cd,
        cw * 0.62,
        PUFF_RISE + PUFF_SINK,
        cd * 0.62,
        alt ? PAD_CREAM_LIGHT : PAD_CREAM,
        PAD_SEAM,
      );
    }
  }
  // gold edge ring: four thin bars just above the slab edge
  const t = y + RING_LIFT;
  const h = t + 0.06;
  b.box([x0, t, z0, x1, h, z0 + RING_W], PAD_GOLD);
  b.box([x0, t, z1 - RING_W, x1, h, z1], PAD_GOLD);
  b.box([x0, t, z0 + RING_W, x0 + RING_W, h, z1 - RING_W], PAD_GOLD);
  b.box([x1 - RING_W, t, z0 + RING_W, x1, h, z1 - RING_W], PAD_GOLD);
}

/** Frame + legs + spring ticks (rims) and mat + bounce ring (tops) of one trampoline slab. */
export function addTrampoline(
  rims: PadBuilder,
  tops: PadBuilder,
  x0: number,
  y0: number,
  y: number,
  z0: number,
  x1: number,
  z1: number,
): void {
  const fx0 = x0 - FRAME_PAD;
  const fx1 = x1 + FRAME_PAD;
  const fz0 = z0 - FRAME_PAD;
  const fz1 = z1 + FRAME_PAD;
  const top = y + MAT_LIFT;
  const fh = y + FRAME_H;
  // legs at the four corners, from the roof up to the frame
  const lw = LEG_W;
  const legs: [number, number][] = [
    [fx0, fz0],
    [fx1 - lw, fz0],
    [fx0, fz1 - lw],
    [fx1 - lw, fz1 - lw],
  ];
  for (const [lx, lz] of legs) rims.box([lx, y0, lz, lx + lw, fh, lz + lw], PAD_LEG);
  // gold frame rim: the visible bounce cue from far away
  rims.box([fx0, fh - 0.06, fz0, fx1, fh, fz0 + FRAME_W], PAD_GOLD);
  rims.box([fx0, fh - 0.06, fz1 - FRAME_W, fx1, fh, fz1], PAD_GOLD);
  rims.box([fx0, fh - 0.06, fz0 + FRAME_W, fx0 + FRAME_W, fh, fz1 - FRAME_W], PAD_GOLD);
  rims.box([fx1 - FRAME_W, fh - 0.06, fz0 + FRAME_W, fx1, fh, fz1 - FRAME_W], PAD_GOLD);
  // brown skirt under the rim, so the frame has body
  rims.box([fx0, y, fz0, fx1, fh - 0.06, fz0 + FRAME_W], PAD_FRAME);
  rims.box([fx0, y, fz1 - FRAME_W, fx1, fh - 0.06, fz1], PAD_FRAME);
  rims.box([fx0, y, fz0 + FRAME_W, fx0 + FRAME_W, fh - 0.06, fz1 - FRAME_W], PAD_FRAME);
  rims.box([fx1 - FRAME_W, y, fz0 + FRAME_W, fx1, fh - 0.06, fz1 - FRAME_W], PAD_FRAME);
  // spring ticks between mat edge and frame, every ~0.42 m along both long sides
  const sx0 = x0 + FRAME_PAD * 0.3;
  const sx1 = x1 - FRAME_PAD * 0.3;
  const nx = Math.max(2, Math.floor((sx1 - sx0) / SPRING_STEP));
  for (let i = 0; i <= nx; i++) {
    const sx = sx0 + ((sx1 - sx0) * i) / nx;
    rims.box([sx - SPRING_W / 2, y, fz0 + FRAME_W, sx + SPRING_W / 2, top, fz0 + FRAME_W + 0.1], PAD_LEG);
    rims.box([sx - SPRING_W / 2, y, fz1 - FRAME_W - 0.1, sx + SPRING_W / 2, top, fz1 - FRAME_W], PAD_LEG);
  }
  // taut mat (slightly domed look: lighter centre panel) and a gold concentric bounce ring
  const mx0 = fx0 + FRAME_W;
  const mx1 = fx1 - FRAME_W;
  const mz0 = fz0 + FRAME_W;
  const mz1 = fz1 - FRAME_W;
  tops.box([mx0, y, mz0, mx1, top, mz1], PAD_CREAM);
  const cx = (x0 + x1) / 2;
  const cz = (z0 + z1) / 2;
  const R = Math.min(mx1 - mx0, mz1 - mz0) / 2;
  tops.ring(cx, top + 0.012, cz, R * 0.74, R * 0.88, PAD_GOLD);
  tops.ring(cx, top + 0.012, cz, R * 0.36, R * 0.5, PAD_GOLD);
}

/** Cushion mesh and the two trampoline meshes; only the parts the world has. */
export function buildPadMeshes(world: World): Mesh[] {
  const out: Mesh[] = [];
  const rims = new PadBuilder();
  const tops = new PadBuilder();
  for (let i = 0; i < world.tramps.length; i++) {
    const t = world.tramps[i];
    addTrampoline(rims, tops, t.min.x, t.min.y, t.max.y, t.min.z, t.max.x, t.max.z);
  }
  if (!rims.empty) {
    out.push(rims.mesh('trampRims'));
    out.push(tops.mesh('trampTops'));
  }
  const cush = new PadBuilder();
  for (let i = 0; i < world.cushions.length; i++) {
    const c = world.cushions[i];
    addCushion(cush, c.min.x, c.max.y, c.min.z, c.max.x, c.max.z);
  }
  if (!cush.empty) out.push(cush.mesh('cushions'));
  return out;
}

export type { PadBuilder };
