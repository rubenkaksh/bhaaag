import { ENEMY_DEFS, type Enemy } from './enemies';

export interface WeaponCfg {
  name: string;
  kind: 'bow' | 'rifle';
  /** Seconds to a full draw. 0 = fires on press (rifle). */
  chargeTime: number;
  /** Minimum seconds between shots. */
  fireInterval: number;
  damageMin: number;
  damageMax: number;
  speedMin: number;
  speedMax: number;
  /** Metres a shot travels before it drops. */
  range: number;
  magSize: number;
  reloadTime: number;
  /** Metres. 0 = silent. Loud shots spook prey and raise the camp's heat. */
  noiseRadius: number;
  /** Extra enemies a shot passes through. */
  pierce: number;
}

export const BOW: WeaponCfg = {
  name: 'Hunting bow',
  kind: 'bow',
  chargeTime: 0.7,
  fireInterval: 0.2,
  damageMin: 1,
  damageMax: 3,
  speedMin: 28,
  speedMax: 55,
  range: 70,
  magSize: 1,
  reloadTime: 0.45,
  noiseRadius: 0,
  pierce: 0,
};

export const RIFLE: WeaponCfg = {
  name: 'Lever rifle',
  kind: 'rifle',
  chargeTime: 0,
  fireInterval: 0.3,
  damageMin: 2,
  damageMax: 2,
  speedMin: 140,
  speedMax: 140,
  range: 110,
  magSize: 8,
  reloadTime: 2,
  noiseRadius: 40,
  pierce: 1,
};

export interface WeaponState {
  cfg: WeaponCfg;
  mag: number;
  reserve: number;
  /** Bow draw 0..1. */
  charge: number;
  cooldown: number;
  reloadLeft: number;
  wasFire: boolean;
}

export function createWeapon(cfg: WeaponCfg, reserve: number): WeaponState {
  return { cfg, mag: cfg.magSize, reserve, charge: 0, cooldown: 0, reloadLeft: 0, wasFire: false };
}

export interface Projectile {
  x: number;
  z: number;
  vx: number;
  vz: number;
  damage: number;
  /** Seconds left before it drops. */
  life: number;
  pierceLeft: number;
  alive: boolean;
}

/**
 * Advances the weapon. Pushes any new shot onto `out`. Returns the noise radius of a shot fired this
 * step (0 when none or silent).
 */
export function stepWeapon(
  w: WeaponState,
  fire: boolean,
  reload: boolean,
  dt: number,
  ox: number,
  oz: number,
  ax: number,
  az: number,
  out: Projectile[],
): number {
  const c = w.cfg;
  w.cooldown = Math.max(0, w.cooldown - dt);
  if (w.reloadLeft > 0) {
    w.reloadLeft -= dt;
    if (w.reloadLeft <= 0) {
      const take = Math.min(c.magSize - w.mag, w.reserve);
      w.mag += take;
      w.reserve -= take;
      w.reloadLeft = 0;
    }
    w.wasFire = fire;
    w.charge = 0;
    return 0;
  }
  if (
    (reload || w.mag === 0) &&
    w.mag < c.magSize &&
    w.reserve > 0 &&
    !(c.chargeTime > 0 && w.charge > 0)
  ) {
    w.reloadLeft = c.reloadTime;
    w.wasFire = fire;
    return 0;
  }
  const len = Math.hypot(ax, az);
  let shot = false;
  let power = 1;
  if (c.chargeTime > 0) {
    if (fire && w.mag > 0) w.charge = Math.min(1, w.charge + dt / c.chargeTime);
    if (!fire && w.wasFire && w.charge >= 0.15 && w.cooldown <= 0 && w.mag > 0) {
      shot = true;
      power = w.charge;
    }
    if (!fire) w.charge = 0;
  } else if (fire && w.cooldown <= 0 && w.mag > 0) {
    shot = true;
  }
  w.wasFire = fire;
  if (!shot || len < 1e-6) return 0;
  w.mag -= 1;
  w.cooldown = c.fireInterval;
  w.charge = 0;
  const speed = c.speedMin + (c.speedMax - c.speedMin) * power;
  out.push({
    x: ox,
    z: oz,
    vx: (ax / len) * speed,
    vz: (az / len) * speed,
    damage: c.damageMin + (c.damageMax - c.damageMin) * power,
    life: c.range / speed,
    pierceLeft: c.pierce,
    alive: true,
  });
  return c.noiseRadius;
}

/** Swept segment-vs-circle so a 140 m/s round cannot tunnel. Returns the enemies killed. */
export function stepProjectiles(
  list: Projectile[],
  enemies: Enemy[],
  dt: number,
  expired: Projectile[],
): Enemy[] {
  const kills: Enemy[] = [];
  for (const p of list) {
    if (!p.alive) continue;
    const sx = p.vx * dt;
    const sz = p.vz * dt;
    const l2 = sx * sx + sz * sz;
    const hit: Enemy[] = [];
    for (const e of enemies) {
      if (e.dead) continue;
      const r = ENEMY_DEFS[e.kind].radius;
      let t = l2 > 0 ? ((e.x - p.x) * sx + (e.z - p.z) * sz) / l2 : 0;
      t = Math.max(0, Math.min(1, t));
      if (Math.hypot(p.x + sx * t - e.x, p.z + sz * t - e.z) <= r) hit.push(e);
    }
    hit.sort((a, b) => Math.hypot(a.x - p.x, a.z - p.z) - Math.hypot(b.x - p.x, b.z - p.z));
    for (const e of hit) {
      e.hp -= p.damage;
      if (e.hp <= 0) {
        e.dead = true;
        kills.push(e);
      }
      if (p.pierceLeft > 0) p.pierceLeft -= 1;
      else {
        p.alive = false;
        break;
      }
    }
    if (!p.alive) continue;
    p.x += sx;
    p.z += sz;
    p.life -= dt;
    if (p.life <= 0) {
      p.alive = false;
      expired.push(p);
    }
  }
  for (let i = list.length - 1; i >= 0; i--) if (!list[i].alive) list.splice(i, 1);
  return kills;
}
