// Parkour helpers (ADR 0013): auto-vault geometry and path, slide speed. Pure functions on plain
// numbers; the sweeps that test the end point live in sim.ts. No three/DOM, no allocation per
// call (callers pass a reusable VaultPlan).
import type { Tuning } from './config';
import type { HeroState } from './hero';
import type { AABB } from './math/aabb';

const DEG2RAD = Math.PI / 180;
const RISE_FRAC = 0.4; // the vault gains its height over this fraction of its duration
const OVER_MARGIN = 0.05; // clearance past the far face when vaulting over
const ONTO_INSET = 0.3; // how far past the near face the hero lands when vaulting onto

// End point of a planned vault.
export class VaultPlan {
  onto = 0; // 1: land on top, 0: clear the obstacle and fall on the far side
  x1 = 0;
  y1 = 0;
  z1 = 0;
}

// True when the stick direction (sx, sz; unit) lies within coneDeg of (dx, dz; unit).
export function inCone(sx: number, sz: number, dx: number, dz: number, coneDeg: number): boolean {
  return sx * dx + sz * dz >= Math.cos(coneDeg * DEG2RAD);
}

// Plans a vault of box b whose side face (unit axis normal nax/naz pointing from the wall toward
// the hero) blocks the hero standing at (px, py, pz). Deep obstacles (crates, steps) are vaulted
// onto, thin ones (parapets, rails) over.
export function planVault(
  p: VaultPlan,
  b: AABB,
  nax: number,
  naz: number,
  px: number,
  pz: number,
  cfg: Tuning,
): void {
  const r = cfg.hero.radius;
  const top = b.max.y;
  const alongX = nax !== 0;
  const depth = alongX ? b.max.x - b.min.x : b.max.z - b.min.z;
  const dir = alongX ? -nax : -naz; // travel direction along the blocked axis
  const nearPos = alongX ? (nax > 0 ? b.max.x : b.min.x) : naz > 0 ? b.max.z : b.min.z;
  const farPos = alongX ? (nax > 0 ? b.min.x : b.max.x) : naz > 0 ? b.min.z : b.max.z;
  p.onto = depth <= cfg.vault.maxDepth ? 0 : 1;
  let c: number;
  if (p.onto === 1) {
    c = nearPos + dir * (r + ONTO_INSET);
    p.y1 = top;
  } else {
    c = farPos + dir * (r + OVER_MARGIN);
    p.y1 = top + cfg.vault.clearH;
  }
  p.x1 = alongX ? c : px;
  p.z1 = alongX ? pz : c;
}

// Smooth 0..1 rise: eases in and out.
function smooth(u: number): number {
  const c = u < 0 ? 0 : u > 1 ? 1 : u;
  return c * c * (3 - 2 * c);
}

// Writes the hero position at time t (seconds) along the stored vault path: xz linear over
// vault.sec, y rises to the end height over the first 40 % and then holds.
export function vaultPosition(s: HeroState, cfg: Tuning, t: number): void {
  const u = t / cfg.vault.sec;
  const k = u < 0 ? 0 : u > 1 ? 1 : u;
  s.px = s.vaultX0 + (s.vaultX1 - s.vaultX0) * k;
  s.pz = s.vaultZ0 + (s.vaultZ1 - s.vaultZ0) * k;
  s.py = s.vaultY0 + (s.vaultY1 - s.vaultY0) * smooth(u / RISE_FRAC);
}

// Slide speed after dt: decel applied, never dropped below minKeep (a slower hero is left alone).
export function slideSpeed(sp: number, decel: number, minKeep: number, dt: number): number {
  const n = sp - decel * dt;
  if (n >= sp) return sp;
  const floor = sp < minKeep ? sp : minKeep;
  return n < floor ? floor : n;
}
