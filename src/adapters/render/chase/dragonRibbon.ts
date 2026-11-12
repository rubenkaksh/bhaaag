// T290e: pure geometry for the dragon's continuous body. One triangle strip (2 vertices per
// cross-section) lying in a world-fixed "board" plane tilted 45 degrees to the view ray, updated in
// place every frame. No materials, no textures, no allocation in layout().
import { BufferAttribute, BufferGeometry, DynamicDrawUsage } from 'three';
import type { GraphicsTier } from '../graphicsTier';

export const HEAD_SCALE = 10; // head sprite world size (square), metres

export const BOARD_ELEV_DEG = 45;
const E = (BOARD_ELEV_DEG * Math.PI) / 180;
/** Along-body direction (neck -> tail) and board normal. X (lateral) is (1, 0, 0). */
export const D_Y = Math.sin(E);
export const D_Z = Math.cos(E);
export const N_Y = -Math.cos(E);
export const N_Z = Math.sin(E);

export const RIBBON_LEN = 22;
export const SOCKET_UP = 0.18;
export const SOCKET_BACK = 0.6;
export const WAVE_K = 1.0;
export const WAVE_W = 1.4;
const A_NECK = 1.5;
const A_TAIL = 5;
const S_RAMP_U = 0.35; // (spec 0.12: neck folded, R < half-width; widened, see test)
export const V_AMP = 2.0;
export const V_PHASE = Math.PI / 2;

const W_NECK = 0.4 * HEAD_SCALE;
export const W_TAIL = 1.3;
const SHOULDER = 0.1;
const TILE_LEN_PER_W = 2; // tile is 256 x 512

export const RIBBON_SECTIONS_BY_TIER: Record<GraphicsTier, number> = { low: 24, medium: 40, high: 56 };

export type RibbonParams = {
  headX: number;
  headY: number;
  headZ: number;
  /** Head loom scale (1 far .. ~1.85 on you). */
  s: number;
  lagX: number;
  lagY: number;
  time: number;
};

function clamp01(x: number): number {
  return x < 0 ? 0 : x > 1 ? 1 : x;
}
export function smooth01(x: number): number {
  const t = clamp01(x);
  return t * t * (3 - 2 * t);
}

/** Ribbon root height for a head centre height and loom scale. */
export function ribbonRootY(headY: number, s: number): number {
  return headY + SOCKET_UP * HEAD_SCALE * s;
}

/** Width at u (0 neck .. 1 tail), for loom scale s at time t. */
export function ribbonWidth(u: number, s: number, time: number): number {
  const base = W_NECK + (W_TAIL - W_NECK) * Math.pow(u, 1.3);
  const shoulder = 1 + SHOULDER * Math.sin(Math.PI * clamp01(u / 0.35));
  const breath = 1 + 0.03 * Math.sin(2 * Math.PI * 0.8 * time - 3 * u);
  const loom = 1 + (s - 1) * (1 - smooth01(u / 0.3));
  return base * shoulder * breath * loom;
}

export class DragonRibbon {
  readonly sections: number;
  readonly geometry = new BufferGeometry();
  readonly centres: Float32Array;
  readonly widths: Float32Array;
  private readonly pos: BufferAttribute;
  private readonly uv: BufferAttribute;
  private readonly index: BufferAttribute;

  constructor(tier: GraphicsTier) {
    const n = RIBBON_SECTIONS_BY_TIER[tier];
    this.sections = n;
    this.centres = new Float32Array(3 * n);
    this.widths = new Float32Array(n);
    this.pos = new BufferAttribute(new Float32Array(2 * n * 3), 3);
    this.pos.setUsage(DynamicDrawUsage);
    const uvArr = new Float32Array(2 * n * 2);
    for (let i = 0; i < n; i++) {
      uvArr[4 * i] = 0;
      uvArr[4 * i + 2] = 1;
    }
    this.uv = new BufferAttribute(uvArr, 2);
    this.uv.setUsage(DynamicDrawUsage);
    // Quads written tail -> head so the nearer neck paints over the farther body (no depth write).
    const idx = new Uint16Array(6 * (n - 1));
    let o = 0;
    for (let q = n - 2; q >= 0; q--) {
      const a = 2 * q;
      idx[o++] = a;
      idx[o++] = a + 1;
      idx[o++] = a + 2;
      idx[o++] = a + 1;
      idx[o++] = a + 3;
      idx[o++] = a + 2;
    }
    this.index = new BufferAttribute(idx, 1);
    this.geometry.setAttribute('position', this.pos);
    this.geometry.setAttribute('uv', this.uv);
    this.geometry.setIndex(this.index);
  }

  /** Centreline of section i is also readable from `centres` after layout(). */
  layout(p: RibbonParams): void {
    const n = this.sections;
    const c = this.centres;
    const w = this.widths;
    const rootX = p.headX;
    const rootY = ribbonRootY(p.headY, p.s);
    const rootZ = p.headZ + SOCKET_BACK;
    for (let i = 0; i < n; i++) {
      const u = i / (n - 1);
      const along = RIBBON_LEN * u;
      const ph = 2 * Math.PI * WAVE_K * u - WAVE_W * p.time;
      const ramp = smooth01(u / S_RAMP_U);
      const lat = (A_NECK + (A_TAIL - A_NECK) * u) * ramp * Math.sin(ph);
      const nrm = V_AMP * u * ramp * Math.sin(ph + V_PHASE);
      const f = smooth01(u);
      const bx = rootX + (p.lagX - rootX) * f;
      const by = rootY + (p.lagY - rootY) * f;
      c[3 * i] = bx + lat;
      c[3 * i + 1] = by + along * D_Y + nrm * N_Y;
      c[3 * i + 2] = rootZ + along * D_Z + nrm * N_Z;
      w[i] = ribbonWidth(u, p.s, p.time);
    }
    const pa = this.pos.array as Float32Array;
    const ua = this.uv.array as Float32Array;
    let v = 0;
    for (let i = 0; i < n; i++) {
      const a = i === 0 ? 0 : i - 1;
      const b = i === n - 1 ? n - 1 : i + 1;
      const tx = c[3 * b] - c[3 * a];
      const ty = c[3 * b + 1] - c[3 * a + 1];
      const tz = c[3 * b + 2] - c[3 * a + 2];
      // width direction = normalize(cross(T, N)); N = (0, N_Y, N_Z)
      let wx = ty * N_Z - tz * N_Y;
      let wy = -tx * N_Z;
      let wz = tx * N_Y;
      const wl = Math.hypot(wx, wy, wz) || 1;
      wx /= wl;
      wy /= wl;
      wz /= wl;
      const hw = w[i] * 0.5;
      const cx = c[3 * i];
      const cy = c[3 * i + 1];
      const cz = c[3 * i + 2];
      pa[6 * i] = cx - wx * hw;
      pa[6 * i + 1] = cy - wy * hw;
      pa[6 * i + 2] = cz - wz * hw;
      pa[6 * i + 3] = cx + wx * hw;
      pa[6 * i + 4] = cy + wy * hw;
      pa[6 * i + 5] = cz + wz * hw;
      if (i > 0) {
        const dx = cx - c[3 * (i - 1)];
        const dy = cy - c[3 * (i - 1) + 1];
        const dz = cz - c[3 * (i - 1) + 2];
        v += Math.hypot(dx, dy, dz) / (TILE_LEN_PER_W * 0.5 * (w[i] + w[i - 1]));
      }
      ua[4 * i + 1] = v;
      ua[4 * i + 3] = v;
    }
    this.pos.needsUpdate = true;
    this.uv.needsUpdate = true;
  }

  dispose(): void {
    this.geometry.dispose();
  }
}
