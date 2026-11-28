import { createCamp, stepCamp, type CampCfg, type CampState } from './camp';
import {
  createRide,
  stepRide,
  trailSpecFor,
  type MountCfg,
  type RideCfg,
  type RideState,
} from './ride';
import { buildTrailField } from './trailGen';
import { DT, type SpikeInput } from './types';
import { BOW, RIFLE } from './weapons';

export interface SpikeCfg {
  id: 'horse-bow' | 'bike-rifle';
  title: string;
  ride: RideCfg;
  camp: CampCfg;
}

export type Phase = 'ride' | 'camp' | 'dawn' | 'dead';

export interface RunState {
  cfg: SpikeCfg;
  seed: number;
  phase: Phase;
  ride: RideState;
  camp: CampState | null;
  tick: number;
}

export const HORSE: MountCfg = {
  name: 'Mountain horse',
  maxSpeed: 13,
  boostSpeed: 17,
  accel: 6,
  drag: 3,
  brake: 12,
  turnLow: 2.2,
  turnHigh: 0.9,
  grip: 9,
  boostDrain: 0.22,
  boostRegen: 0.12,
  jumpV: 8,
  gravity: 20,
  radius: 0.9,
  trample: false,
  fallLat: 14,
  sideMax: 0.5,
  fordSafe: 7,
};

export const DIRT_BIKE: MountCfg = {
  name: 'Dirt bike',
  maxSpeed: 22,
  boostSpeed: 30,
  accel: 9,
  drag: 4,
  brake: 20,
  turnLow: 1.9,
  turnHigh: 0.9,
  grip: 4.5,
  boostDrain: 0.35,
  boostRegen: 0.08,
  jumpV: 0, // no jump (owner 2026-11-28); logs are ridden over instead
  overLogs: true,
  gravity: 18,
  radius: 1,
  trample: true,
  fallLat: 24,
  sideMax: 0.4,
  fordSafe: 8,
};

const BASE_CAMP: CampCfg = {
  nightLength: 240,
  maxHp: 10,
  playerSpeed: 4.5,
  fireRadius: 7,
  fuelMax: 120,
  fuelStart: 80,
  fuelPerWood: 40,
  startWood: 1,
  woodPiles: 8,
  cookTime: 4,
  cookedHeal: 4,
  rawHeal: 1,
  sickTime: 10,
  regenTime: 10,
  regenPerSec: 0.5,
  waveEvery: 22,
  firstWave: 8,
  waveBase: 2,
  waveGrowth: 1,
  zombieShare: 0.5,
  bloodMoonAt: 0.8,
  bloodMoonCount: 8,
  spawnRadius: 38,
  preyCap: 3,
  preyEvery: 15,
  heatPerShot: 0,
  heatDecay: 0.05,
  heatMax: 1.5,
  cacheAmmo: 0,
  ammoCrates: 5,
  crateAmount: 5,
  ammoDropChance: 0.15,
  ammoDropAmount: 2,
  arrowRecover: 0.75,
  hurtCooldown: 0.5,
};

/** Spike 1: horse and bow. Quiet, animal-heavy nights; arrows are scarce but recoverable. */
export const HORSE_SPIKE: SpikeCfg = {
  id: 'horse-bow',
  title: 'Horse and bow',
  ride: {
    mount: HORSE,
    weapon: BOW,
    reserve: 44, // trail ride is ~35 s longer (was 32)
    distance: 900,
    halfWidth: 14,
    hp: 10,
    obstacleKinds: ['log', 'log', 'rock', 'mud'],
    obstacleGap: [12, 22], // owner 2026-11-28: "a lot more obstacles" (was [22, 38])
    enemyKinds: ['wolf', 'wolf', 'boar'],
    spawnIntervalStart: 7,
    spawnIntervalEnd: 3,
    parTime: 100, // trail ride: hills and the ford add ~10 s (was 90 on the flat)
    lives: 3,
    bankRocks: 0.3,
    // fixed trail (owner 2026-11-27): S-bends down to a ford at 520 m, then a climb to camp
    trail: {
      seed: 1907,
      waves: [
        { amp: 30, cycles: 1.5, phase: 0.4 },
        { amp: 12, cycles: 4, phase: 1.1 },
      ],
      band: 3.5,
      blend: 16,
      maxHeight: 30,
      minHeight: -4,
      maxGrade: 0.16,
      ford: { z: 520, halfWidth: 7, valleyDepth: 6, valleyWidth: 55 },
    },
  },
  camp: {
    ...BASE_CAMP,
    zombieShare: 0.4,
    heatPerShot: 0,
    cacheAmmo: 24,
    ammoCrates: 8,
    waveGrowth: 0.65,
  },
};

/** Spike 2: dirt bike and rifle. Loud shots, so every shot speeds up the horde. */
export const BIKE_SPIKE: SpikeCfg = {
  id: 'bike-rifle',
  title: 'Dirt bike and rifle',
  ride: {
    mount: DIRT_BIKE,
    weapon: RIFLE,
    reserve: 52, // trail ride is longer (was 40)
    distance: 1600,
    halfWidth: 16,
    hp: 10,
    obstacleKinds: ['log', 'log', 'ramp', 'rock', 'mud'],
    obstacleGap: [16, 28], // "a lot more obstacles" (was [30, 50]); logs are ridden over
    enemyKinds: ['zombie', 'runner', 'zombie', 'wolf'],
    spawnIntervalStart: 5,
    spawnIntervalEnd: 2,
    parTime: 115, // trail ride (was 100 on the flat)
    lives: 3,
    bankRocks: 0.2,
    // fixed trail: longer, wider swings, a ford at 980 m in a deeper valley
    trail: {
      seed: 2207,
      waves: [
        { amp: 40, cycles: 2, phase: 0.2 },
        { amp: 16, cycles: 6, phase: 2.0 },
      ],
      band: 4,
      blend: 18,
      maxHeight: 36,
      minHeight: -4,
      maxGrade: 0.18,
      ford: { z: 980, halfWidth: 8, valleyDepth: 8, valleyWidth: 70 },
    },
  },
  camp: {
    ...BASE_CAMP,
    zombieShare: 0.7,
    heatPerShot: 0.08,
    startWood: 2,
    cacheAmmo: 24,
    crateAmount: 8,
    ammoDropAmount: 4,
    ammoDropChance: 0.25,
    waveGrowth: 0.8,
  },
};

export function createRun(cfg: SpikeCfg, seed: number): RunState {
  const spec = trailSpecFor(cfg.ride);
  const trail = spec === null ? null : buildTrailField(spec);
  return { cfg, seed, phase: 'ride', ride: createRide(cfg.ride, seed, trail), camp: null, tick: 0 };
}

export function stepRun(run: RunState, input: SpikeInput, dt: number = DT): void {
  if (run.phase === 'dead' || run.phase === 'dawn') return;
  run.tick += 1;
  if (run.phase === 'ride') {
    stepRide(run.ride, input, dt);
    if (run.ride.dead) run.phase = 'dead';
    else if (run.ride.finished) {
      const bonus = run.ride.time < run.cfg.ride.parTime ? 1 : 0;
      run.camp = createCamp(run.cfg.camp, run.seed + 1, run.ride.weapon, run.ride.hp, bonus);
      run.phase = 'camp';
    }
    return;
  }
  const camp = run.camp;
  if (camp === null) return;
  stepCamp(camp, input, dt);
  if (camp.result === 'dead') run.phase = 'dead';
  else if (camp.result === 'dawn') run.phase = 'dawn';
}
