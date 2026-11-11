// Scripted bot for the Dragon Chase tests: perfect aim at the next route anchor, fires near the
// downhill edge of the current row ("casual") or releases inside the window ("expert").
import { DEFAULT_TUNING } from '../../src/core/config';
import type { Tuning } from '../../src/core/config';
import { HERO_ATTACHED, HERO_GROUNDED, HeroState } from '../../src/core/hero';
import { HOOK_ATTACHED, HOOK_IDLE } from '../../src/core/hook';
import { AXIS_MAX, BTN_HOOK, BTN_JUMP, InputFrame } from '../../src/core/input';
import { ChaseState, chaseScore, chaseStep, newChaseState } from '../../src/core/chase/chase';
import { slotOf } from '../../src/core/chase/chaseWorld';
import { HOUSE_LEN } from '../../src/core/chase/rows';
import { step } from '../../src/core/sim';

export type BotLine = 'casual' | 'chain' | 'expert';

export type BotResult = {
  cs: ChaseState;
  hero: HeroState;
  ticks: number;
  dead: boolean;
  caught: boolean;
  deadCause: number;
  score: number;
  zSpeed: number; // mean metres/second of fall-line progress
  trace: number[]; // hero z, sampled once per second (determinism checks)
};

const HEAD = 0.9;
const EDGE_FIRE_DIST = 3;
const EXPERT_RELEASE_FRAC = 0.72;

export function cfgWith(over: Partial<Tuning['chase']>): Tuning {
  return { ...DEFAULT_TUNING, chase: { ...DEFAULT_TUNING.chase, ...over } };
}

/** A dragon that never moves and never catches: for measuring the bot itself. */
export const NO_DRAGON: Partial<Tuning['chase']> = {
  v0: 0,
  vMax: 0,
  accel: 0,
  rubberK: 0,
  gapMax: 1e9,
  catchGap: -1e9,
  startGap: 1e6,
};

export function runBot(
  seed: number,
  line: BotLine,
  cfg: Tuning,
  maxTicks: number,
  stopAtRow = 1e9,
  probe?: (tick: number, hero: HeroState, cs: ChaseState) => void,
  forceDifficulty = -1,
): BotResult {
  const hero = new HeroState();
  const cs = newChaseState(seed, 0, cfg);
  cs.rw.forceDifficulty = forceDifficulty;
  const w = cs.rw.world;
  hero.px = w.spawn.x;
  hero.py = w.spawn.y;
  hero.pz = w.spawn.z;
  hero.yaw = w.spawnYaw;
  hero.camYaw = w.spawnYaw;
  hero.camPitch = 0;
  hero.grounded = 1;
  const trace: number[] = [];
  let ticks = 0;
  let nextPress = 0;
  for (; ticks < maxTicks; ticks++) {
    if (hero.dead === 1 || cs.dragon.caught === 1 || cs.heroRow >= stopAtRow) break;
    const f = new InputFrame();
    const a = w.anchors[w.route[0]];
    if (a !== undefined) {
      const dx = a.px - hero.px;
      const dy = a.py - (hero.py + cfg.hero.height * HEAD);
      const dz = a.pz - hero.pz;
      hero.camYaw = Math.atan2(dx, dz);
      hero.camPitch = Math.atan2(dy, Math.hypot(dx, dz));
    }
    const slot = slotOf(cs.rw, cs.heroRow);
    const edge = cs.rw.slotZTop[slot] - HOUSE_LEN * cs.rw.spec[slot].n;
    if (hero.hook.state === HOOK_IDLE && hero.mode === HERO_GROUNDED) {
      f.moveY = AXIS_MAX;
      let want = hero.pz - edge <= EDGE_FIRE_DIST;
      if (line !== 'casual' && hero.chainT > 0 && a !== undefined) {
        // chained fire right after a landing, when the anchor is already in rope reach
        const d = Math.hypot(a.px - hero.px, a.py - hero.py, a.pz - hero.pz);
        if (d <= cfg.rope.maxLen - 2) want = true;
      }
      if (want && ticks >= nextPress) {
        f.pressed = BTN_HOOK;
        f.buttons = BTN_HOOK;
        nextPress = ticks + 15;
      }
    } else if (hero.hook.state === HOOK_IDLE) {
      f.moveY = AXIS_MAX;
    }
    if (line === 'expert' && hero.mode === HERO_ATTACHED && hero.hook.state === HOOK_ATTACHED) {
      const frac = hero.hook.s / (hero.hook.len - cfg.rope.trolleyStop);
      if (frac >= EXPERT_RELEASE_FRAC) f.pressed |= BTN_JUMP;
    }
    step(hero, f, w, cfg);
    chaseStep(cs, hero, w, cfg);
    if (probe !== undefined) probe(ticks, hero, cs);
    if (ticks % cfg.fixedHz === 0) trace.push(hero.pz);
  }
  const secs = ticks / cfg.fixedHz;
  return {
    cs,
    hero,
    ticks,
    dead: hero.dead === 1,
    caught: cs.dragon.caught === 1,
    deadCause: hero.deadCause,
    score: chaseScore(cs, cfg),
    zSpeed: secs > 0 ? cs.maxProgress / secs : 0,
    trace,
  };
}
