import { ENEMY_DEFS, spawnEnemy, stepEnemy, type Enemy, type EnemyKind } from './enemies';
import { Rng } from './rng';
import { groundY, trailHeading, trailX, waterDepth, type TrailField, type TrailSpec } from './trail';
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
  /** Jump take-off speed; 0 = no jump (the bike, owner 2026-11-28: "bikes don't really jump"). */
  jumpV: number;
  /** Rides over logs with a bump instead of crashing (dirt bike: "can go through logs with their build"). */
  overLogs?: boolean;
  gravity: number;
  radius: number;
  /** Bike runs zombies over above 8 m/s. */
  trample: boolean;
  /** Falls (trails): lateral load speed * yaw rate (m/s^2) that throws you on flat ground; less downhill. */
  fallLat: number;
  /** Side slope (rise over run across the heading) that rolls you over. */
  sideMax: number;
  /** Hitting the ford faster than this (m/s) is a fall. */
  fordSafe: number;
}

/** A spike's trail shape; distance and camp come from the ride config. */
export type TrailShape = Omit<TrailSpec, 'distance' | 'campZ'>;

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
  /** Chance of a boulder on the trail bank after each trail obstacle (trails only). */
  bankRocks?: number;
  /** Falls allowed before the ride ends (owner 2026-11-27: 3 lives). */
  lives: number;
  /** Absent: the old flat corridor along x = 0 (unit tests). */
  trail?: TrailShape;
}

export type FallCause = 'bend' | 'slope' | 'ford' | 'river';

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
  trail: TrailField | null;
  /** Ground height under the mount; y is absolute. */
  ground: number;
  /** Grade along the heading (+ uphill) and water depth under the mount, for the view and HUD. */
  grade: number;
  water: number;
  lives: number;
  falls: number;
  /** > 0 while down after a fall; respawn when it runs out. */
  fallT: number;
  /** 0..1 balance lost to over-hard turning; a fall at 1. The view wobbles the mount with it. */
  tip: number;
  fallCause: FallCause | null;
}

const OBSTACLE_SHAPE: Record<ObstacleKind, { r: number; h: number }> = {
  log: { r: 1.4, h: 0.8 },
  rock: { r: 1.2, h: 2.5 },
  ramp: { r: 2.2, h: 0 },
  mud: { r: 3, h: 0 },
};
const CRASH_DAMAGE: Record<ObstacleKind, number> = { log: 1, rock: 2, ramp: 0, mud: 0 };
const HURT_COOLDOWN = 1;
/** Speed kept rolling a bike over a log. */
const LOG_ROLL_KEEP = 0.85;
const TRAMPLE_SPEED = 8;
const BOOST_MIN = 0.05;
const BOOST_RECOVER = 0.3;
/** Grade pull along the slope, m/s^2 per unit grade. */
const GRADE_G = 6;
const UPHILL_CAP = 2.5;
const DOWNHILL_CAP = 1.5;
const DOWNHILL_FALL = 2.5;
const ROUGH_CAP = 0.75;
const FALL_TIME = 1.4;
/** Most live enemies within 60 m of the rider before spawns pause. */
const MAX_PACK = 3;
const RESPAWN_BACK = 8;
const RESPAWN_GRACE = 2;
/** Tip meter: gain per second per unit of overload, and recovery per second. */
const TIP_GAIN = 2;
const TIP_RECOVER = 1.5;

/** Largest |steer| that does not overload the turn at the current speed and grade. */
export function safeSteer(s: RideState): number {
  const m = s.cfg.mount;
  const rate = m.turnLow + (m.turnHigh - m.turnLow) * Math.min(1, s.speed / m.maxSpeed);
  const limit = m.fallLat * Math.max(0.35, 1 + DOWNHILL_FALL * Math.min(0, s.grade));
  return s.speed * rate <= 1e-6 ? 1 : Math.min(1, limit / (s.speed * rate));
}

export function trailSpecFor(cfg: RideCfg): TrailSpec | null {
  if (cfg.trail === undefined) return null;
  return { ...cfg.trail, distance: cfg.distance, campZ: cfg.distance + 40 };
}

const centreX = (s: RideState, z: number): number =>
  s.trail === null ? 0 : trailX(s.trail.spec, z);
const groundAt = (s: RideState, x: number, z: number): number =>
  s.trail === null ? 0 : groundY(s.trail, x, z);

export function createRide(cfg: RideCfg, seed: number, trail: TrailField | null = null): RideState {
  const rng = new Rng(seed);
  const obstacles: Obstacle[] = [];
  let z = trail === null ? 40 : 60;
  while (z < cfg.distance - 30) {
    const kind = cfg.obstacleKinds[Math.floor(rng.next() * cfg.obstacleKinds.length)];
    const shape = OBSTACLE_SHAPE[kind];
    if (trail === null) {
      obstacles.push({ kind, x: rng.range(-0.8, 0.8) * cfg.halfWidth, z, r: shape.r, h: shape.h });
    } else {
      // on or beside the dirt band, never in the river valley; a boulder on the bank every so often
      const sp = trail.spec;
      const off = rng.range(-1, 1) * (sp.band + 2);
      const nearFord = Math.abs(z - sp.ford.z) < sp.ford.halfWidth + 30;
      if (!nearFord) obstacles.push({ kind, x: trailX(sp, z) + off, z, r: shape.r, h: shape.h });
      if (!nearFord && rng.next() < (cfg.bankRocks ?? 0.5)) {
        const side = rng.next() < 0.5 ? -1 : 1;
        const bz = z + cfg.obstacleGap[0] * 0.5;
        const bx = trailX(sp, bz) + side * rng.range(sp.band + 3, cfg.halfWidth - 2);
        obstacles.push({ kind: 'rock', x: bx, z: bz, r: OBSTACLE_SHAPE.rock.r, h: OBSTACLE_SHAPE.rock.h });
      }
    }
    z += rng.range(cfg.obstacleGap[0], cfg.obstacleGap[1]);
  }
  const g0 = trail === null ? 0 : groundY(trail, 0, 0);
  return {
    cfg,
    rng,
    x: 0,
    z: 0,
    heading: 0,
    vx: 0,
    vz: 0,
    speed: 0,
    y: g0,
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
    trail,
    ground: g0,
    grade: 0,
    water: 0,
    lives: cfg.lives,
    falls: 0,
    fallT: 0,
    tip: 0,
    fallCause: null,
  };
}

/** A fall costs a life; the last one ends the ride. */
function fall(s: RideState, cause: FallCause): void {
  s.falls += 1;
  s.lives -= 1;
  s.fallCause = cause;
  s.speed = 0;
  s.vx = 0;
  s.vz = 0;
  s.vy = 0;
  if (s.lives <= 0) {
    s.lives = 0;
    s.dead = true;
  } else s.fallT = FALL_TIME;
}

/** Back on the trail a few metres behind the fall, out of the water, facing along the trail. */
function respawn(s: RideState): void {
  let z = Math.max(0, s.z - RESPAWN_BACK);
  if (s.trail !== null) {
    for (let k = 0; k < 40 && z > 0 && waterDepth(s.trail, centreX(s, z), z) > 0; k++)
      z = Math.max(0, z - 3);
  }
  s.z = z;
  s.x = centreX(s, z);
  s.heading = s.trail === null ? 0 : trailHeading(s.trail.spec, z);
  s.ground = groundAt(s, s.x, s.z);
  s.y = s.ground;
  s.hurtCd = RESPAWN_GRACE;
  s.tip = 0;
  for (const e of s.enemies) if (Math.hypot(e.x - s.x, e.z - s.z) < 14) e.dead = true;
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
  if (s.fallT > 0) {
    s.fallT -= dt;
    if (s.fallT <= 0) {
      s.fallT = 0;
      respawn(s);
    }
    return;
  }
  const grounded = s.y <= s.ground + 0.01 && s.vy <= 0;
  const sh = Math.sin(s.heading);
  const ch = Math.cos(s.heading);
  // grade along the heading and side slope across it, sampled 1.5 m each way
  s.grade =
    (groundAt(s, s.x + sh * 1.5, s.z + ch * 1.5) - groundAt(s, s.x - sh * 1.5, s.z - ch * 1.5)) / 3;
  const side =
    (groundAt(s, s.x + ch * 1.5, s.z - sh * 1.5) - groundAt(s, s.x - ch * 1.5, s.z + sh * 1.5)) / 3;
  const lat = Math.abs(s.x - centreX(s, s.z));
  const wasWet = s.water > 0.05;
  s.water = s.trail === null ? 0 : waterDepth(s.trail, s.x, s.z);

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
    const yaw = Math.max(-1, Math.min(1, input.steer)) * rate;
    s.heading += yaw * dt;
    let top = wantBoost ? m.boostSpeed : m.maxSpeed;
    top *= s.grade > 0 ? 1 - UPHILL_CAP * s.grade : 1 - DOWNHILL_CAP * s.grade;
    if (s.trail !== null && lat > s.trail.spec.band + 1) top *= ROUGH_CAP;
    if (s.water > 0.05) top *= 0.45;
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
    s.speed = Math.max(0, Math.min(m.boostSpeed * 1.2, s.speed - GRADE_G * s.grade * dt));
    if (s.water > 0.05) s.speed = Math.max(0, s.speed - 6 * dt);
    // falls: a hard turn at speed (worse downhill), a steep side slope, the ford too fast, deep water
    const limit = m.fallLat * Math.max(0.35, 1 + DOWNHILL_FALL * Math.min(0, s.grade));
    const over = (s.speed * Math.abs(yaw)) / limit - 1;
    s.tip = over > 0 ? s.tip + over * TIP_GAIN * dt : Math.max(0, s.tip - TIP_RECOVER * dt);
    if (s.tip >= 1) return fall(s, 'bend');
    if (Math.abs(side) > m.sideMax && s.speed > 3) return fall(s, 'slope');
    if (s.water > 0.05 && !wasWet && s.speed > m.fordSafe) return fall(s, 'ford');
    if (s.water > 1) return fall(s, 'river');
    const fx = Math.sin(s.heading) * s.speed;
    const fz = Math.cos(s.heading) * s.speed;
    const k = 1 - Math.exp(-m.grip * dt);
    s.vx += (fx - s.vx) * k;
    s.vz += (fz - s.vz) * k;
    if (input.jump && m.jumpV > 0) s.vy = m.jumpV;
  }
  s.x += s.vx * dt;
  s.z += s.vz * dt;

  // Corridor walls either side of the trail scrub speed instead of killing.
  const hw = s.cfg.halfWidth;
  const cx = centreX(s, s.z);
  if (Math.abs(s.x - cx) > hw) {
    const out = Math.sign(s.x - cx);
    s.x = cx + out * hw;
    // scrub only while pushing outward, so riding along the wall as the trail bends away is not a trap
    if (s.vx * out > 0) {
      s.vx *= 0.5;
      s.speed *= 0.97;
    }
  }
  s.ground = groundAt(s, s.x, s.z);
  if (grounded && s.vy <= 0) {
    // stay on the ground over crests and dips
    s.y = s.ground;
  } else {
    s.vy -= m.gravity * dt;
    s.y += s.vy * dt;
  }
  if (s.y <= s.ground) {
    s.y = s.ground;
    s.vy = 0;
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
    } else if (o.kind === 'log' && m.overLogs === true) {
      // the bike rolls over: a bump and a little speed lost, once per log (airborne after the bump)
      if (grounded && s.vy <= 0) {
        s.vy = 2.5;
        s.speed *= LOG_ROLL_KEEP;
      }
    } else if (s.y - s.ground < o.h) {
      const nd = d > 1e-6 ? d : 1;
      // a crash only when riding into it; touching it slowly just slides you off (no pinning)
      const into = -(s.vx * dx + s.vz * dz) / nd;
      if (into > 2) {
        hurt(s, CRASH_DAMAGE[o.kind]);
        s.crashes += 1;
        s.speed *= 0.35;
        s.vx *= 0.35;
        s.vz *= 0.35;
      } else if (into > 0) {
        // slide along it: drop the velocity into the obstacle and the speed with it
        s.vx += (into * dx) / nd;
        s.vz += (into * dz) / nd;
        s.speed = Math.min(s.speed, Math.hypot(s.vx, s.vz));
      }
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
    const ez = s.z + (ahead ? 45 : -40);
    const ecx = centreX(s, ez);
    const ex = Math.max(ecx - hw, Math.min(ecx + hw, ecx + (s.x - cx) + s.rng.range(-8, 8)));
    // Nothing spawns in the river, and the pack stays small: a slow climb out of the ford must not
    // pile up enemies (time-based spawns outpace a rider who is crawling uphill).
    const wet = s.trail !== null && waterDepth(s.trail, ex, ez) > 0;
    let live = 0;
    for (const e of s.enemies) if (!e.dead && Math.abs(e.z - s.z) < 60) live++;
    if (!wet && live < MAX_PACK) s.enemies.push(spawnEnemy(s.nextId++, kind, ex, ez));
  }
  for (const e of s.enemies) {
    if (e.dead) continue;
    stepEnemy(e, s.x, s.z, null, dt);
    const def = ENEMY_DEFS[e.kind];
    if (!def.hostile || s.y - s.ground > 1) continue;
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
