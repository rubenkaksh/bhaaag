import { ENEMY_DEFS, spawnEnemy, stepEnemy, type Enemy, type EnemyKind } from './enemies';
import { Rng } from './rng';
import type { SpikeInput } from './types';
import {
  createWeapon,
  stepProjectiles,
  stepWeapon,
  type Projectile,
  type WeaponCfg,
  type WeaponState,
} from './weapons';

export interface MountCfg {
  name: string;
  maxSpeed: number;
  boostSpeed: number;
  accel: number;
  /** Speed lost per second with no throttle. */
  drag: number;
  brake: number;
  /** rad/s at a standstill and at max speed. */
  turnLow: number;
  turnHigh: number;
  /** 1/s: how fast velocity catches up with heading. High = planted (horse), low = drift (bike). */
  grip: number;
  /** Boost meter per second, 0..1. */
  boostDrain: number;
  boostRegen: number;
  jumpV: number;
  gravity: number;
  radius: number;
  /** Bike runs zombies over above 8 m/s. */
  trample: boolean;
}

export type ObstacleKind = 'log' | 'rock' | 'ramp' | 'mud';

export interface Obstacle {
  kind: ObstacleKind;
  x: number;
  z: number;
  r: number;
  /** Clear it by being higher than this. */
  h: number;
}

export interface RideCfg {
  mount: MountCfg;
  weapon: WeaponCfg;
  reserve: number;
  /** Metres to the camp site along +z. */
  distance: number;
  halfWidth: number;
  hp: number;
  obstacleKinds: ObstacleKind[];
  obstacleGap: [number, number];
  /** What chases or blocks the route. */
  enemyKinds: EnemyKind[];
  spawnIntervalStart: number;
  spawnIntervalEnd: number;
  /** Arrive faster than this for a bonus wood bundle at camp. */
  parTime: number;
}

export interface RideState {
  cfg: RideCfg;
  rng: Rng;
  x: number;
  z: number;
  heading: number;
  vx: number;
  vz: number;
  speed: number;
  y: number;
  vy: number;
  boost: number;
  exhausted: boolean;
  hp: number;
  hurtCd: number;
  time: number;
  crashes: number;
  kills: number;
  spawnTimer: number;
  nextId: number;
  aimX: number;
  aimZ: number;
  obstacles: Obstacle[];
  enemies: Enemy[];
  projectiles: Projectile[];
  weapon: WeaponState;
  finished: boolean;
  dead: boolean;
}

const OBSTACLE_SHAPE: Record<ObstacleKind, { r: number; h: number }> = {
  log: { r: 1.4, h: 0.8 },
  rock: { r: 1.2, h: 2.5 },
  ramp: { r: 2.2, h: 0 },
  mud: { r: 3, h: 0 },
};
const CRASH_DAMAGE: Record<ObstacleKind, number> = { log: 1, rock: 2, ramp: 0, mud: 0 };
const HURT_COOLDOWN = 1;
const TRAMPLE_SPEED = 8;
const BOOST_MIN = 0.05;
const BOOST_RECOVER = 0.3;

export function createRide(cfg: RideCfg, seed: number): RideState {
  const rng = new Rng(seed);
  const obstacles: Obstacle[] = [];
  let z = 40;
  while (z < cfg.distance - 30) {
    const kind = cfg.obstacleKinds[Math.floor(rng.next() * cfg.obstacleKinds.length)];
    const shape = OBSTACLE_SHAPE[kind];
    obstacles.push({ kind, x: rng.range(-0.8, 0.8) * cfg.halfWidth, z, r: shape.r, h: shape.h });
    z += rng.range(cfg.obstacleGap[0], cfg.obstacleGap[1]);
  }
  return {
    cfg,
    rng,
    x: 0,
    z: 0,
    heading: 0,
    vx: 0,
    vz: 0,
    speed: 0,
    y: 0,
    vy: 0,
    boost: 1,
    exhausted: false,
    hp: cfg.hp,
    hurtCd: 0,
    time: 0,
    crashes: 0,
    kills: 0,
    spawnTimer: cfg.spawnIntervalStart,
    nextId: 1,
    aimX: 0,
    aimZ: 1,
    obstacles,
    enemies: [],
    projectiles: [],
    weapon: createWeapon(cfg.weapon, cfg.reserve),
    finished: false,
    dead: false,
  };
}

function hurt(s: RideState, dmg: number): void {
  if (s.hurtCd > 0 || dmg <= 0) return;
  s.hp -= dmg;
  s.hurtCd = HURT_COOLDOWN;
  if (s.hp <= 0) {
    s.hp = 0;
    s.dead = true;
  }
}

export function stepRide(s: RideState, input: SpikeInput, dt: number): void {
  if (s.finished || s.dead) return;
  const m = s.cfg.mount;
  s.time += dt;
  s.hurtCd = Math.max(0, s.hurtCd - dt);
  const grounded = s.y <= 0 && s.vy <= 0;

  // Boost meter: drains while held, locks out at empty until it recovers a little.
  const wantBoost = input.boost && !s.exhausted && s.boost > BOOST_MIN && input.throttle > 0;
  if (wantBoost) {
    s.boost = Math.max(0, s.boost - m.boostDrain * dt);
    if (s.boost <= BOOST_MIN) s.exhausted = true;
  } else {
    s.boost = Math.min(1, s.boost + m.boostRegen * dt);
    if (s.exhausted && s.boost >= BOOST_RECOVER) s.exhausted = false;
  }

  if (grounded) {
    const rate = m.turnLow + (m.turnHigh - m.turnLow) * Math.min(1, s.speed / m.maxSpeed);
    s.heading += Math.max(-1, Math.min(1, input.steer)) * rate * dt;
    const top = wantBoost ? m.boostSpeed : m.maxSpeed;
    if (input.throttle > 0) {
      const target = top * input.throttle;
      s.speed =
        s.speed < target
          ? Math.min(target, s.speed + m.accel * dt)
          : Math.max(target, s.speed - m.drag * dt);
    } else if (input.throttle < 0) {
      s.speed = Math.max(0, s.speed - m.brake * -input.throttle * dt);
    } else {
      s.speed = Math.max(0, s.speed - m.drag * dt);
    }
    const fx = Math.sin(s.heading) * s.speed;
    const fz = Math.cos(s.heading) * s.speed;
    const k = 1 - Math.exp(-m.grip * dt);
    s.vx += (fx - s.vx) * k;
    s.vz += (fz - s.vz) * k;
    if (input.jump) s.vy = m.jumpV;
  }
  s.vy -= m.gravity * dt;
  s.y += s.vy * dt;
  if (s.y <= 0) {
    s.y = 0;
    s.vy = 0;
  }
  s.x += s.vx * dt;
  s.z += s.vz * dt;

  // Corridor walls scrub speed instead of killing.
  const hw = s.cfg.halfWidth;
  if (Math.abs(s.x) > hw) {
    s.x = Math.sign(s.x) * hw;
    s.vx *= 0.5;
    s.speed *= 0.97;
  }
  if (s.z < 0) {
    s.z = 0;
    s.vz = Math.max(0, s.vz);
  }

  for (const o of s.obstacles) {
    if (Math.abs(o.z - s.z) > o.r + m.radius + 1) continue;
    const dx = s.x - o.x;
    const dz = s.z - o.z;
    const d = Math.hypot(dx, dz);
    if (d >= o.r + m.radius) continue;
    if (o.kind === 'mud') {
      s.speed = Math.min(s.speed, m.maxSpeed * 0.5);
    } else if (o.kind === 'ramp') {
      if (grounded && s.speed > 3) s.vy = 3 + s.speed * 0.25;
    } else if (s.y < o.h) {
      hurt(s, CRASH_DAMAGE[o.kind]);
      s.crashes += 1;
      s.speed *= 0.35;
      s.vx *= 0.35;
      s.vz *= 0.35;
      const nd = d > 1e-6 ? d : 1;
      s.x = o.x + (dx / nd) * (o.r + m.radius);
      s.z = o.z + (dz / nd) * (o.r + m.radius);
    }
  }

  // Weapon: aim is independent of heading. No aim input means shoot where you ride.
  const alen = Math.hypot(input.aimX, input.aimZ);
  if (alen > 1e-6) {
    s.aimX = input.aimX / alen;
    s.aimZ = input.aimZ / alen;
  }
  stepWeapon(s.weapon, input.fire, input.reload, dt, s.x, s.z, s.aimX, s.aimZ, s.projectiles);
  const kills = stepProjectiles(s.projectiles, s.enemies, dt, []);
  s.kills += kills.length;

  // Escalating spawns: one lane ahead of you, one behind, closer together the further you ride.
  s.spawnTimer -= dt;
  if (s.spawnTimer <= 0) {
    const p = Math.min(1, s.z / s.cfg.distance);
    s.spawnTimer =
      s.cfg.spawnIntervalStart + (s.cfg.spawnIntervalEnd - s.cfg.spawnIntervalStart) * p;
    const kinds = s.cfg.enemyKinds;
    const kind = kinds[Math.floor(s.rng.next() * kinds.length)];
    const ahead = s.rng.next() < 0.5;
    const ex = Math.max(-hw, Math.min(hw, s.x + s.rng.range(-8, 8)));
    s.enemies.push(spawnEnemy(s.nextId++, kind, ex, s.z + (ahead ? 45 : -40)));
  }
  for (const e of s.enemies) {
    if (e.dead) continue;
    stepEnemy(e, s.x, s.z, null, dt);
    const def = ENEMY_DEFS[e.kind];
    if (!def.hostile || s.y > 1) continue;
    if (Math.hypot(e.x - s.x, e.z - s.z) < def.radius + m.radius) {
      if (m.trample && s.speed > TRAMPLE_SPEED && e.kind !== 'brute') {
        e.dead = true;
        s.kills += 1;
        s.speed *= 0.9;
      } else hurt(s, def.damage);
    }
  }
  for (let i = s.enemies.length - 1; i >= 0; i--) {
    const e = s.enemies[i];
    if (e.dead || e.z < s.z - 70 || e.z > s.z + 120) s.enemies.splice(i, 1);
  }

  if (s.z >= s.cfg.distance) s.finished = true;
}
