// Chase state and the per-tick step: row streaming, hops/cleans/perfects scoring and the dragon.
// Called by game.ts once per fixed tick, right after sim.step(), in the play phase only.
// Pure, allocation-free per tick. No three, no DOM.
import type { Tuning } from '../config';
import {
  DEAD_FELL,
  HERO_DEAD,
  HERO_EV_DIED,
  HERO_EV_HOOKED,
  HERO_EV_LANDED,
  HERO_EV_PERFECT,
  HeroState,
} from '../hero';
import { resetHook } from '../hook';
import type { World } from '../world';
import { SLOT_ANCHORS, SLOT_PADS, difficultyFor, hillY } from './rows';
import {
  ChaseWorld,
  PARK_Y,
  buildChaseWorld,
  padBase,
  recycleOldest,
  refreshRoute,
  slotOf,
} from './chaseWorld';
import { DragonState, copyDragon, dragonStep, newDragon } from './dragon';

/** deadCause of a hero the dragon caught (hero.ts uses 0-3). */
export const DEAD_CAUGHT = 7;

const LAND_PAD_TOL = 0.25; // feet within this of a pad surface count as landed on it
const FALL_GUARD = 80; // metres under the hill surface: off the lane, never recoverable

export class ChaseState {
  rw: ChaseWorld;
  dragon: DragonState;
  spawnZ = 0;
  heroRow = 0;
  lastHopRow = 0;
  hops = 0;
  cleans = 0;
  perfects = 0;
  maxProgress = 0;
  prevVy = 0;
  ticks = 0;

  constructor(rw: ChaseWorld, dragon: DragonState) {
    this.rw = rw;
    this.dragon = dragon;
  }
}

export function newChaseState(seed: number, spawnZ: number, cfg: Tuning): ChaseState {
  const rw = buildChaseWorld(seed, cfg);
  const cs = new ChaseState(rw, newDragon(spawnZ, cfg));
  cs.spawnZ = spawnZ;
  return cs;
}

/** Copies the scalar state (not the world): used for render prev/cur interpolation. */
export function copyChaseState(dst: ChaseState, src: ChaseState): void {
  copyDragon(dst.dragon, src.dragon);
  dst.spawnZ = src.spawnZ;
  dst.heroRow = src.heroRow;
  dst.lastHopRow = src.lastHopRow;
  dst.hops = src.hops;
  dst.cleans = src.cleans;
  dst.perfects = src.perfects;
  dst.maxProgress = src.maxProgress;
  dst.prevVy = src.prevVy;
  dst.ticks = src.ticks;
}

export function chaseScore(cs: ChaseState, cfg: Tuning): number {
  const c = cfg.chase;
  return (
    Math.floor(cs.maxProgress) +
    c.scoreHop * cs.hops +
    c.scoreClean * cs.cleans +
    c.scorePerfect * cs.perfects
  );
}

function onLivePad(rw: ChaseWorld, world: World, x: number, y: number, z: number): boolean {
  for (let r = rw.oldest; r <= rw.newest; r++) {
    const pb = padBase(slotOf(rw, r));
    for (let i = 0; i < SLOT_PADS; i++) {
      const p = world.pads[pb + i];
      if (p.max.y < PARK_Y + 1) continue;
      if (
        x >= p.min.x &&
        x <= p.max.x &&
        z >= p.min.z &&
        z <= p.max.z &&
        Math.abs(y - p.max.y) <= LAND_PAD_TOL
      ) {
        return true;
      }
    }
  }
  return false;
}

/** Largest live row whose uphill edge is above the hero (the hero is on it or past it). */
function heroRowFor(rw: ChaseWorld, z: number): number {
  let row = rw.oldest;
  for (let r = rw.oldest; r <= rw.newest; r++) {
    if (rw.slotZTop[slotOf(rw, r)] < z - 0.5) break;
    row = r;
  }
  return row;
}

function killHero(hero: HeroState, cause: number): void {
  hero.dead = 1;
  hero.mode = HERO_DEAD;
  hero.deadCause = cause;
  hero.eventBits |= HERO_EV_DIED;
  hero.vx = 0;
  hero.vy = 0;
  hero.vz = 0;
  hero.grounded = 0;
  hero.perfect = 0;
  resetHook(hero.hook);
}

export function chaseStep(cs: ChaseState, hero: HeroState, world: World, cfg: Tuning): void {
  const rw = cs.rw;
  cs.ticks++;
  const ev = hero.eventBits;

  // Off the lane (only reachable by clipping past the side walls): same as a fall.
  if (hero.dead === 0 && hero.py < hillY(hero.pz) - FALL_GUARD) killHero(hero, DEAD_FELL);

  // 1-2. Streaming: recycle the oldest slot while the hero is two rows past it.
  let row = heroRowFor(rw, hero.pz);
  rw.difficulty = rw.forceDifficulty >= 0 ? rw.forceDifficulty : difficultyFor(cs.dragon.v, cfg);
  while (row >= rw.oldest + 2) {
    recycleOldest(rw);
    row = heroRowFor(rw, hero.pz);
  }
  cs.heroRow = row;
  // 3. The route shows the rows ahead of the hero.
  refreshRoute(rw, row);

  // 4. Hops: hooking the route anchor of a row ahead of the last hopped one.
  if ((ev & HERO_EV_HOOKED) !== 0) {
    const id = hero.hook.anchorId;
    if (id >= 0 && id % SLOT_ANCHORS === 0) {
      const slot = (id / SLOT_ANCHORS) | 0;
      const r = rw.slotRow[slot];
      if (r > cs.lastHopRow) {
        cs.hops++;
        cs.lastHopRow = r;
      }
    }
  }
  // 5. Clean landing on a pad.
  if ((ev & HERO_EV_LANDED) !== 0 && hero.dead === 0 && -cs.prevVy < cfg.landing.vyClean) {
    if (onLivePad(rw, world, hero.px, hero.py, hero.pz)) cs.cleans++;
  }
  // 6. Perfect release.
  if ((ev & HERO_EV_PERFECT) !== 0) cs.perfects++;
  // 7. Distance.
  const prog = cs.spawnZ - hero.pz;
  if (prog > cs.maxProgress) cs.maxProgress = prog;
  cs.prevVy = hero.vy;
  // 8. The dragon.
  dragonStep(cs.dragon, hero.pz, cfg);
  if (cs.dragon.caught === 1 && hero.dead === 0) killHero(hero, DEAD_CAUGHT);
}
