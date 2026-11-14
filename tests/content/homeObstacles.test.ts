// Home obstacle numbers (handoff H3), run through the real step() on the H2 home street.
import { describe, expect, it } from 'vitest';
import { homeStreet, HOME_STREET_Y } from '../../src/content/house/demoStreet';
import { emitHouse, emitProp, newDraft } from '../../src/content/house/houseKit';
import { deckY } from '../../src/content/house/houseSpec';
import { loadWorldFromObject } from '../../src/content/load';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  HERO_AIRBORNE,
  HERO_EV_CUSHION,
  HERO_EV_LANDED,
  HERO_EV_ROLLED,
  HERO_GROUNDED,
  HeroState,
} from '../../src/core/hero';
import { BTN_JUMP, InputFrame, quantizeAxis } from '../../src/core/input';
import { step } from '../../src/core/sim';
import type { World } from '../../src/core/world';

const cfg = DEFAULT_TUNING;
const { houses, props, ground } = homeStreet();
const [a1, a2, a3] = houses;

function homeWorld(): World {
  const d = newDraft();
  for (const h of houses) emitHouse(h, d);
  for (const p of props) emitProp(p, d);
  return loadWorldFromObject({
    version: 1,
    spawn: [0, 7, 0],
    spawnYaw: 0,
    killPlaneY: -60,
    solids: [...d.solids, ...ground],
    ramps: d.ramps,
    anchors: d.anchors,
    style: [...d.style, ...ground.map(() => 0)],
    lineOnly: 1,
    climb: 1,
    parkour: 1,
    tramps: d.tramps,
    cushions: d.cushions,
  });
}

function hero(x: number, y: number, z: number, grounded: number, vx = 0, vz = 0): HeroState {
  const s = new HeroState();
  s.px = x;
  s.py = y;
  s.pz = z;
  s.vx = vx;
  s.vz = vz;
  s.grounded = grounded;
  s.mode = grounded === 1 ? HERO_GROUNDED : HERO_AIRBORNE;
  return s;
}

/**
 * Runs the stick forward along `yaw` (0 = +z, PI/2 = +x) for n ticks. With `jumpAt` the hero jumps
 * once, the first grounded tick its coordinate along the run (`axis`) reaches that value.
 */
function run(
  s: HeroState,
  w: World,
  yaw: number,
  n: number,
  jumpAt?: { axis: 'x' | 'z'; at: number },
  stopOn = 0,
): number {
  s.camYaw = yaw;
  s.yaw = yaw;
  const f = new InputFrame();
  f.moveY = quantizeAxis(1);
  let ev = 0;
  let jumped = false;
  let airborne = false;
  for (let i = 0; i < n; i++) {
    const c = jumpAt === undefined ? 0 : jumpAt.axis === 'x' ? s.px : s.pz;
    const doJump: boolean = jumpAt !== undefined && !jumped && s.grounded === 1 && c >= jumpAt.at;
    jumped = jumped || doJump;
    f.buttons = doJump ? BTN_JUMP : 0;
    f.pressed = doJump ? BTN_JUMP : 0;
    step(s, f, w, cfg);
    ev |= s.eventBits;
    if (jumped && s.grounded === 0) airborne = true;
    if (airborne && (s.eventBits & stopOn) !== 0) break; // stop on the first such event after takeoff
  }
  return ev;
}

describe('home obstacles through step() (handoff H3)', () => {
  it('a 2.8 m drop (A1 deck 6.0 to A2 deck 3.2) lands alive and rolls', () => {
    expect(deckY(a1) - deckY(a2)).toBeCloseTo(2.8, 6);
    const s = hero(2, deckY(a1), 0, 1);
    const ev = run(s, homeWorld(), Math.PI / 2, 120);
    expect(s.dead).toBe(0);
    expect(s.py).toBeCloseTo(deckY(a2), 2);
    expect(ev & HERO_EV_ROLLED).toBe(HERO_EV_ROLLED);
    expect(ev & HERO_EV_CUSHION).toBe(0);
  });

  it('a 6.0 m deck run-and-jump onto the hay is absorbed (HERO_EV_CUSHION), not lethal', () => {
    expect(deckY(a1)).toBe(6);
    const s = hero(0, deckY(a1), 0, 1, 0, 6);
    const ev = run(s, homeWorld(), 0, 220, { axis: 'z', at: 3 }, HERO_EV_LANDED);
    expect(s.dead).toBe(0);
    expect(ev & HERO_EV_CUSHION).toBe(HERO_EV_CUSHION);
    expect(s.py).toBeCloseTo(HOME_STREET_Y + 0.9, 2); // standing on the hay top
    expect(s.grounded).toBe(1);
  });

  it('a drop onto the awning slides off alive', () => {
    const w = homeWorld();
    const s = hero(0, 5.2, -4.75, 0); // over the A1 awning (2.2 to 2.7 m, face -z)
    const ev = run(s, w, Math.PI, 150);
    expect(ev & HERO_EV_LANDED).toBe(HERO_EV_LANDED);
    expect(s.dead).toBe(0);
    expect(s.grounded).toBe(1);
    expect(s.py).toBeCloseTo(0, 2); // slid off the low edge (z < -5.5) onto the yard
    expect(s.pz).toBeLessThan(-5.5);
  });

  it('a 3.5 m jump gap from a 0.45 parapet lands on the next deck', () => {
    expect(a3.cx - 4 - (a2.cx + 4)).toBeCloseTo(3.5, 6);
    // the jump lands on A3's 0.45 parapet lip, then the run steps down onto the deck
    const s = hero(4.6, deckY(a2), 0, 1);
    run(s, homeWorld(), Math.PI / 2, 200, { axis: 'x', at: 10.4 });
    expect(s.dead).toBe(0);
    expect(s.grounded).toBe(1);
    expect(s.py).toBeCloseTo(deckY(a3), 2);
    expect(s.px).toBeGreaterThan(a3.cx - 4);
    expect(s.px).toBeLessThanOrEqual(a3.cx + 4);
  });

  it('a fall of about 9 m from the 6.0 deck to bare ground kills', () => {
    const s = hero(-2, deckY(a1), 0, 1, 0, 6);
    run(s, homeWorld(), 0, 220, { axis: 'z', at: 3 });
    expect(deckY(a1) - HOME_STREET_Y).toBe(9);
    expect(s.dead).toBe(1);
  });
});
