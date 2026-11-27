import {
  ENEMY_DEFS,
  alertPrey,
  spawnEnemy,
  stepEnemy,
  type Enemy,
  type EnemyKind,
  type FireZone,
} from './enemies';
import { Rng } from './rng';
import type { SpikeInput } from './types';
import { stepProjectiles, stepWeapon, type Projectile, type WeaponState } from './weapons';

export interface CampCfg {
  /** Seconds from dusk to dawn. */
  nightLength: number;
  maxHp: number;
  playerSpeed: number;
  fireRadius: number;
  fuelMax: number;
  fuelStart: number;
  fuelPerWood: number;
  startWood: number;
  woodPiles: number;
  cookTime: number;
  cookedHeal: number;
  rawHeal: number;
  /** Eating raw meat blocks regen for this long. */
  sickTime: number;
  regenTime: number;
  regenPerSec: number;
  /** Seconds between waves, first wave delay, base count, extra per wave. */
  waveEvery: number;
  firstWave: number;
  waveBase: number;
  waveGrowth: number;
  /** Chance a wave member is undead. The rest are animals. */
  zombieShare: number;
  /** Blood moon: one big horde at this fraction of the night. */
  bloodMoonAt: number;
  bloodMoonCount: number;
  spawnRadius: number;
  preyCap: number;
  preyEvery: number;
  /** Loud weapons: heat added per shot, decay per second, cap. Heat speeds the wave timer. */
  heatPerShot: number;
  heatDecay: number;
  heatMax: number;
  /** Chance a missed arrow can be picked up again. */
  arrowRecover: number;
  hurtCooldown: number;
}

export type PickupKind = 'wood' | 'ammo' | 'meat';

export interface Pickup {
  kind: PickupKind;
  x: number;
  z: number;
  amount: number;
}

export type CampResult = 'playing' | 'dawn' | 'dead';

export interface CampState {
  cfg: CampCfg;
  rng: Rng;
  t: number;
  hp: number;
  x: number;
  z: number;
  aimX: number;
  aimZ: number;
  raw: number;
  cooked: number;
  wood: number;
  fuel: number;
  cooking: boolean;
  cookT: number;
  regenT: number;
  sickT: number;
  hurtCd: number;
  heat: number;
  waveTimer: number;
  waveLevel: number;
  bloodMoonDone: boolean;
  preyTimer: number;
  nextId: number;
  prevInteract: boolean;
  prevEat: boolean;
  kills: number;
  preyKilled: number;
  meatEaten: number;
  enemies: Enemy[];
  projectiles: Projectile[];
  pickups: Pickup[];
  weapon: WeaponState;
  result: CampResult;
}

const PICKUP_RADIUS = 1.2;
const FIRE_USE_RADIUS = 3;

export function fireZone(s: CampState): FireZone | null {
  return s.fuel > 0 ? { x: 0, z: 0, r: s.cfg.fireRadius } : null;
}

export function createCamp(
  cfg: CampCfg,
  seed: number,
  weapon: WeaponState,
  hp: number,
  bonusWood = 0,
): CampState {
  const rng = new Rng(seed);
  const pickups: Pickup[] = [];
  for (let i = 0; i < cfg.woodPiles; i++) {
    const a = rng.range(0, Math.PI * 2);
    const r = rng.range(cfg.fireRadius + 3, cfg.fireRadius + 20);
    pickups.push({ kind: 'wood', x: Math.cos(a) * r, z: Math.sin(a) * r, amount: 1 });
  }
  weapon.charge = 0;
  weapon.wasFire = false;
  return {
    cfg,
    rng,
    t: 0,
    hp: Math.min(hp, cfg.maxHp),
    x: 1.5,
    z: 0,
    aimX: 1,
    aimZ: 0,
    raw: 0,
    cooked: 0,
    wood: cfg.startWood + bonusWood,
    fuel: cfg.fuelStart,
    cooking: false,
    cookT: 0,
    regenT: 0,
    sickT: 0,
    hurtCd: 0,
    heat: 0,
    waveTimer: cfg.firstWave,
    waveLevel: 0,
    bloodMoonDone: false,
    preyTimer: 4,
    nextId: 1,
    prevInteract: false,
    prevEat: false,
    kills: 0,
    preyKilled: 0,
    meatEaten: 0,
    enemies: [],
    projectiles: [],
    pickups,
    weapon,
    result: 'playing',
  };
}

function pickHostile(s: CampState, level: number): EnemyKind {
  const r = s.rng.next();
  if (s.rng.next() < s.cfg.zombieShare) {
    if (level >= 6 && r < 0.15) return 'brute';
    if (level >= 3 && r < 0.45) return 'runner';
    return 'zombie';
  }
  return level >= 2 && r < 0.35 ? 'boar' : 'wolf';
}

function spawnAtRing(s: CampState, kind: EnemyKind): void {
  const a = s.rng.range(0, Math.PI * 2);
  const r = s.cfg.spawnRadius + s.rng.range(0, 6);
  s.enemies.push(spawnEnemy(s.nextId++, kind, Math.cos(a) * r, Math.sin(a) * r));
}

function hurt(s: CampState, dmg: number): void {
  if (dmg <= 0 || s.hurtCd > 0) return;
  s.hp -= dmg;
  s.hurtCd = s.cfg.hurtCooldown;
  if (s.hp <= 0) {
    s.hp = 0;
    s.result = 'dead';
  }
}

function dropMeat(s: CampState, e: Enemy): void {
  const meat = ENEMY_DEFS[e.kind].meat;
  if (meat > 0) s.pickups.push({ kind: 'meat', x: e.x, z: e.z, amount: meat });
}

export function stepCamp(s: CampState, input: SpikeInput, dt: number): void {
  if (s.result !== 'playing') return;
  const c = s.cfg;
  s.t += dt;
  s.hurtCd = Math.max(0, s.hurtCd - dt);
  s.heat = Math.max(0, s.heat - c.heatDecay * dt);
  s.fuel = Math.max(0, s.fuel - dt);
  const lit = s.fuel > 0;

  // Walk.
  let mx = input.moveX;
  let mz = input.moveZ;
  const ml = Math.hypot(mx, mz);
  if (ml > 1) {
    mx /= ml;
    mz /= ml;
  }
  s.x += mx * c.playerSpeed * dt;
  s.z += mz * c.playerSpeed * dt;

  // Shoot.
  const al = Math.hypot(input.aimX, input.aimZ);
  if (al > 1e-6) {
    s.aimX = input.aimX / al;
    s.aimZ = input.aimZ / al;
  }
  const noise = stepWeapon(
    s.weapon,
    input.fire,
    input.reload,
    dt,
    s.x,
    s.z,
    s.aimX,
    s.aimZ,
    s.projectiles,
  );
  if (noise > 0) {
    s.heat = Math.min(c.heatMax, s.heat + c.heatPerShot);
    alertPrey(s.enemies, s.x, s.z, noise);
  }
  const expired: Projectile[] = [];
  for (const e of stepProjectiles(s.projectiles, s.enemies, dt, expired)) {
    s.kills += 1;
    if (!ENEMY_DEFS[e.kind].hostile) s.preyKilled += 1;
    dropMeat(s, e);
  }
  if (s.weapon.cfg.kind === 'bow') {
    for (const p of expired) {
      if (s.rng.next() < c.arrowRecover)
        s.pickups.push({ kind: 'ammo', x: p.x, z: p.z, amount: 1 });
    }
  }

  // Enemies. Zombies ignore the fire; animals hold at its edge.
  const fire: FireZone | null = lit ? { x: 0, z: 0, r: c.fireRadius } : null;
  for (const e of s.enemies) {
    if (e.dead) continue;
    hurt(s, stepEnemy(e, s.x, s.z, fire, dt));
  }
  for (let i = s.enemies.length - 1; i >= 0; i--) if (s.enemies[i].dead) s.enemies.splice(i, 1);

  // Walk-over pickups.
  for (let i = s.pickups.length - 1; i >= 0; i--) {
    const p = s.pickups[i];
    if (Math.hypot(p.x - s.x, p.z - s.z) > PICKUP_RADIUS) continue;
    if (p.kind === 'wood') s.wood += p.amount;
    else if (p.kind === 'meat') s.raw += p.amount;
    else s.weapon.reserve += p.amount;
    s.pickups.splice(i, 1);
  }

  // Interact (edge): cook if you carry raw meat and the pot is free, otherwise feed the fire.
  const nearFire = Math.hypot(s.x, s.z) <= FIRE_USE_RADIUS;
  if (input.interact && !s.prevInteract && nearFire) {
    if (!s.cooking && s.raw > 0 && lit) {
      s.raw -= 1;
      s.cooking = true;
      s.cookT = 0;
    } else if (s.wood > 0 && s.fuel < c.fuelMax) {
      s.wood -= 1;
      s.fuel = Math.min(c.fuelMax, s.fuel + c.fuelPerWood);
    }
  }
  s.prevInteract = input.interact;
  if (s.cooking && lit) {
    s.cookT += dt;
    if (s.cookT >= c.cookTime) {
      s.cooking = false;
      s.cooked += 1;
    }
  }

  // Eat (edge): cooked first. Cooked heals and starts regen; raw heals a little and makes you sick.
  if (input.eat && !s.prevEat) {
    if (s.cooked > 0 && s.hp < c.maxHp) {
      s.cooked -= 1;
      s.hp = Math.min(c.maxHp, s.hp + c.cookedHeal);
      s.regenT = c.regenTime;
      s.meatEaten += 1;
    } else if (s.cooked === 0 && s.raw > 0 && s.hp < c.maxHp) {
      s.raw -= 1;
      s.hp = Math.min(c.maxHp, s.hp + c.rawHeal);
      s.sickT = c.sickTime;
      s.meatEaten += 1;
    }
  }
  s.prevEat = input.eat;
  s.sickT = Math.max(0, s.sickT - dt);
  if (s.regenT > 0) {
    s.regenT = Math.max(0, s.regenT - dt);
    if (s.sickT <= 0) s.hp = Math.min(c.maxHp, s.hp + c.regenPerSec * dt);
  }

  // Director.
  s.waveTimer -= dt * (1 + s.heat);
  if (s.waveTimer <= 0) {
    const n = Math.round(c.waveBase + s.waveLevel * c.waveGrowth);
    for (let i = 0; i < n; i++) spawnAtRing(s, pickHostile(s, s.waveLevel));
    s.waveLevel += 1;
    s.waveTimer = c.waveEvery;
  }
  if (!s.bloodMoonDone && s.t >= c.nightLength * c.bloodMoonAt) {
    s.bloodMoonDone = true;
    for (let i = 0; i < c.bloodMoonCount; i++)
      spawnAtRing(s, i % 4 === 0 ? 'brute' : i % 2 === 0 ? 'runner' : 'zombie');
  }
  s.preyTimer -= dt;
  if (s.preyTimer <= 0) {
    s.preyTimer = c.preyEvery;
    let prey = 0;
    for (const e of s.enemies) if (!ENEMY_DEFS[e.kind].hostile) prey += 1;
    if (prey < c.preyCap) spawnAtRing(s, s.rng.next() < 0.6 ? 'rabbit' : 'deer');
  }

  if (s.result === 'playing' && s.t >= c.nightLength) s.result = 'dawn';
}
