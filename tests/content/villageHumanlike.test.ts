// Casual-human playthrough of the Cloud Village (copy of humanlike.test.ts): sloppy aim, imprecise timing, spammed clicks.
// Deterministic (seeded) so it is a regression gate for "the first hop must be easy".
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import { HERO_GROUNDED, HERO_HANGING, HeroState } from '../../src/core/hero';
import { HOOK_IDLE } from '../../src/core/hook';
import { AXIS_MAX, BTN_HOOK, BTN_JUMP, InputFrame } from '../../src/core/input';
import { aabbContainsPoint } from '../../src/core/math/aabb';
import { step } from '../../src/core/sim';
import { loadWorldFromJson } from '../../src/content/load';

const cfg = DEFAULT_TUNING;
const text = readFileSync(new URL('../../content/levels/village.json', import.meta.url), 'utf8');
const DEG = Math.PI / 180;
const HEAD = 0.9;
const VARIANTS = 50;
const MAX_TICKS = 1200;

function rng(seed: number): () => number {
  let a = (seed * 2654435761) >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export type Outcome = { hops: boolean[]; finished: boolean; cause: string[] };

type Style = { frozenAim: boolean; singleShot: boolean; lateTicks: number };

function play(v: number, style: Style): Outcome {
  const r = rng(v + 1);
  const u = (lo: number, hi: number): number => lo + (hi - lo) * r();
  const w = loadWorldFromJson(text);
  const s = new HeroState();
  s.px = w.spawn.x;
  s.py = w.spawn.y;
  s.pz = w.spawn.z;
  s.yaw = w.spawnYaw;
  s.camYaw = w.spawnYaw;
  s.camPitch = 0; // the real game spawns at cfg.camera.frontPitchDeg; the bot re-aims anyway
  s.grounded = 1;
  const yawErr = u(-10, 10) * DEG;
  const pitchErr = u(-5, 5) * DEG;
  const startDelay = Math.floor(u(0, 1.2) * 60);
  const out: Outcome = { hops: [], finished: false, cause: [] };
  const idle = new InputFrame();

  // The human aims the camera at the next target (plus a persistent sloppy error).
  const aimAt = (tx: number, ty: number, tz: number): void => {
    const dx = tx - s.px;
    const dy = ty - (s.py + cfg.hero.height * HEAD);
    const dz = tz - s.pz;
    s.camYaw = Math.atan2(dx, dz) + yawErr;
    s.camPitch = Math.atan2(dy, Math.hypot(dx, dz)) + pitchErr;
  };
  const tick = (f: InputFrame): void => {
    step(s, f, w, cfg);
  };
  for (let i = 0; i < startDelay; i++) tick(idle);

  for (let hop = 0; hop < w.route.length; hop++) {
    const a = w.anchors[w.route[hop]];
    const roof = w.solids[1 + 2 * (2 * hop + 1)]; // last roof of this row (rope leaves from its edge)
    const target = w.solids[1 + 2 * (2 * (hop + 1))]; // first roof of the next row
    // Metres before the edge when the thumb comes down (negative = after leaving the edge).
    const fireDist = u(0, 5) - (style.lateTicks > 0 ? u(0, 1) * (style.lateTicks / 60) * cfg.hero.run : 0);
    if (style.frozenAim) aimAt(a.px, a.py, a.pz); // aim once at hop start, then just run
    let attempts = 0;
    let nextAttempt = -1;
    let hangWait = 0;
    let ok = false;
    for (let t = 0; t < MAX_TICKS && s.dead === 0; t++) {
      const f = new InputFrame();
      if (!style.frozenAim) aimAt(a.px, a.py, a.pz);
      if (s.hook.state === HOOK_IDLE && s.mode !== HERO_HANGING) {
        f.moveY = AXIS_MAX;
        const near = s.pz - roof.min.z <= fireDist;
        if (near && attempts < (style.singleShot ? 1 : 5) && t >= nextAttempt) {
          f.pressed = BTN_HOOK;
          f.buttons = BTN_HOOK;
          attempts++;
          nextAttempt = t + 15;
        }
      }
      if (s.mode === HERO_HANGING && ++hangWait > 18) f.pressed = BTN_JUMP;
      tick(f);
      if (
        s.dead === 0 &&
        s.grounded === 1 &&
        s.mode === HERO_GROUNDED &&
        s.hook.state === HOOK_IDLE &&
        Math.abs(s.py - target.max.y) < 0.01 &&
        s.pz > target.min.z &&
        s.pz < target.max.z
      ) {
        ok = true;
        break;
      }
    }
    out.hops.push(ok);
    if (!ok) {
      out.cause.push(`hop${hop + 1}:dead${s.deadCause}@${s.pz.toFixed(0)},${s.py.toFixed(0)}`);
      return out;
    }
  }
  // Leap of faith: run off the last roof toward the haystack.
  const gx = (w.goal.min.x + w.goal.max.x) / 2;
  const gz = (w.goal.min.z + w.goal.max.z) / 2;
  for (let t = 0; t < MAX_TICKS && s.dead === 0; t++) {
    const f = new InputFrame();
    s.camYaw = Math.atan2(gx - s.px, gz - s.pz) + yawErr;
    s.camPitch = 0;
    f.moveY = AXIS_MAX;
    tick(f);
    if (aabbContainsPoint(w.goal, s.px, s.py, s.pz)) {
      out.finished = true;
      break;
    }
  }
  if (!out.finished) out.cause.push(`leap:dead${s.deadCause}`);
  return out;
}

const STYLES: Record<string, Style> = {
  tracked: { frozenAim: false, singleShot: false, lateTicks: 0 },
  'tracked, one click': { frozenAim: false, singleShot: true, lateTicks: 0 },
  'frozen aim, spam': { frozenAim: true, singleShot: false, lateTicks: 0 },
  'late (airborne) fire': { frozenAim: false, singleShot: false, lateTicks: 24 },
};

describe('village casual-human playthrough', () => {
  for (const name of Object.keys(STYLES)) {
    // A player who never re-aims gets the wide assist on the opening hops only (fun-pass 2.4):
    // past them aim has to matter, so that style is gated on hops 1-2 and need not finish.
    const openingOnly = STYLES[name].frozenAim;
    const gate = openingOnly
      ? 'survives hops 1-2 >= 90%'
      : 'survives each hop >= 90% and finishes >= 70% of variants';
    it(`${name}: ${gate}`, () => {
      const results: Outcome[] = [];
      for (let v = 0; v < VARIANTS; v++) results.push(play(v, STYLES[name]));
      const rows: string[] = [];
      const hopRate: number[] = [];
      for (let h = 0; h < 3; h++) {
        const reached = results.filter((o) => o.hops.length > h);
        const okc = reached.filter((o) => o.hops[h]).length;
        hopRate.push(reached.length === 0 ? 0 : okc / reached.length);
        rows.push(`h${h + 1} ${okc}/${reached.length}`);
      }
      const finished = results.filter((o) => o.finished).length;
      const report = `[${name}] ${rows.join('  ')}  finished ${finished}/${VARIANTS}\n  failures: ${results.flatMap((o) => o.cause).join(' ')}\n`;
      const gatedHops = openingOnly ? cfg.aim.routeAssistEarlyHops : hopRate.length;
      for (let h = 0; h < gatedHops; h++) expect(hopRate[h], report).toBeGreaterThanOrEqual(0.9);
      if (!openingOnly) expect(finished / VARIANTS, report).toBeGreaterThanOrEqual(0.7);
    });
  }
});
