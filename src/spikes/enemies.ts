export type EnemyKind = 'wolf' | 'boar' | 'zombie' | 'runner' | 'brute' | 'deer' | 'rabbit';

export interface EnemyDef {
  hp: number;
  speed: number;
  radius: number;
  damage: number;
  attackCd: number;
  /** Hostiles hunt the target; prey flees from it. */
  hostile: boolean;
  /** Animals hold at the edge of a lit fire. Zombies walk straight through. */
  fearsFire: boolean;
  /** Raw meat dropped on death. */
  meat: number;
}

export const ENEMY_DEFS: Record<EnemyKind, EnemyDef> = {
  wolf: {
    hp: 3,
    speed: 7.5,
    radius: 0.5,
    damage: 1,
    attackCd: 1,
    hostile: true,
    fearsFire: true,
    meat: 1,
  },
  boar: {
    hp: 6,
    speed: 5.5,
    radius: 0.7,
    damage: 2,
    attackCd: 1.2,
    hostile: true,
    fearsFire: true,
    meat: 2,
  },
  zombie: {
    hp: 4,
    speed: 2.6,
    radius: 0.5,
    damage: 1,
    attackCd: 1,
    hostile: true,
    fearsFire: false,
    meat: 0,
  },
  runner: {
    hp: 2,
    speed: 6,
    radius: 0.5,
    damage: 1,
    attackCd: 0.8,
    hostile: true,
    fearsFire: false,
    meat: 0,
  },
  brute: {
    hp: 14,
    speed: 2.2,
    radius: 0.85,
    damage: 3,
    attackCd: 1.5,
    hostile: true,
    fearsFire: false,
    meat: 0,
  },
  deer: {
    hp: 2,
    speed: 9,
    radius: 0.6,
    damage: 0,
    attackCd: 1,
    hostile: false,
    fearsFire: false,
    meat: 3,
  },
  rabbit: {
    hp: 1,
    speed: 6.5,
    radius: 0.3,
    damage: 0,
    attackCd: 1,
    hostile: false,
    fearsFire: false,
    meat: 1,
  },
};

export interface Enemy {
  id: number;
  kind: EnemyKind;
  x: number;
  z: number;
  hp: number;
  cd: number;
  /** Prey only: spooked by a shot, flees until dead. */
  alert: boolean;
  dead: boolean;
}

export interface FireZone {
  x: number;
  z: number;
  r: number;
}

/** Reach added to the radius when a hostile attacks the player. */
export const MELEE_REACH = 0.6;

export function spawnEnemy(id: number, kind: EnemyKind, x: number, z: number): Enemy {
  return { id, kind, x, z, hp: ENEMY_DEFS[kind].hp, cd: 0.5, alert: false, dead: false };
}

/** Moves one enemy toward (or, for prey, away from) the target. Returns damage dealt this step. */
export function stepEnemy(
  e: Enemy,
  tx: number,
  tz: number,
  fire: FireZone | null,
  dt: number,
): number {
  const def = ENEMY_DEFS[e.kind];
  e.cd = Math.max(0, e.cd - dt);
  const dx = tx - e.x;
  const dz = tz - e.z;
  const d = Math.hypot(dx, dz);
  let mx = 0;
  let mz = 0;
  if (!def.hostile) {
    if (!e.alert && d >= 14) return 0;
    if (d > 1e-6) {
      mx = -dx / d;
      mz = -dz / d;
    }
  } else if (d > 1e-6) {
    mx = dx / d;
    mz = dz / d;
  }
  let nx = e.x + mx * def.speed * dt;
  let nz = e.z + mz * def.speed * dt;
  if (fire !== null && def.fearsFire) {
    const fd = Math.hypot(e.x - fire.x, e.z - fire.z);
    if (fd < fire.r) {
      const ux = fd > 1e-6 ? (e.x - fire.x) / fd : 1;
      const uz = fd > 1e-6 ? (e.z - fire.z) / fd : 0;
      nx = e.x + ux * def.speed * dt;
      nz = e.z + uz * def.speed * dt;
    } else if (Math.hypot(nx - fire.x, nz - fire.z) < fire.r) {
      nx = e.x;
      nz = e.z;
    }
  }
  e.x = nx;
  e.z = nz;
  if (def.hostile && d < def.radius + MELEE_REACH && e.cd <= 0) {
    e.cd = def.attackCd;
    return def.damage;
  }
  return 0;
}

/** A loud shot spooks every prey animal in range. */
export function alertPrey(list: Enemy[], x: number, z: number, radius: number): void {
  for (const e of list) {
    if (!ENEMY_DEFS[e.kind].hostile && Math.hypot(e.x - x, e.z - z) <= radius) e.alert = true;
  }
}
