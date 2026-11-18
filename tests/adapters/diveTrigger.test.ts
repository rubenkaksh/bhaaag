import { describe, expect, it } from 'vitest';
import { cushionBelow, diveStep } from '../../src/adapters/render/diveTrigger';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  AIRBORNE,
  GROUNDED,
  POSE_AIR,
  CH_BODY_PITCH,
  newHeroPoseInput,
  newHeroPoseState,
  stepHeroPose,
} from '../../src/adapters/render/heroPose';

const pad = { min: { x: 0, y: 10, z: 0 }, max: { x: 4, y: 10.02, z: 4 } };
const MIN = DEFAULT_TUNING.hero.diveMinFall;

describe('cushionBelow', () => {
  it('returns the height over the cushion top, or -1', () => {
    expect(cushionBelow([pad], 2, 2, 20.02, 0.35)).toBeCloseTo(10, 5);
    expect(cushionBelow([pad], 9, 2, 20, 0.35)).toBe(-1); // beside it
    expect(cushionBelow([pad], 2, 2, 9, 0.35)).toBe(-1); // cushion above the feet
    expect(cushionBelow([], 2, 2, 20, 0.35)).toBe(-1);
  });
});

describe('diveStep', () => {
  it('uses a 6 m tuning threshold', () => expect(MIN).toBe(6));
  it('starts above the threshold, not below it', () => {
    expect(diveStep(false, true, -3, MIN + 0.1, MIN)).toBe(true);
    expect(diveStep(false, true, -3, MIN - 0.1, MIN)).toBe(false);
  });
  it('needs a cushion and the air', () => {
    expect(diveStep(false, true, -3, -1, MIN)).toBe(false);
    expect(diveStep(false, false, -3, 20, MIN)).toBe(false);
  });
  it('waits out a fast rise (jump)', () => {
    expect(diveStep(false, true, 4, 20, MIN)).toBe(false);
    expect(diveStep(false, true, 0.5, 20, MIN)).toBe(true);
  });
  it('latches until landing even when the cushion is lost or low', () => {
    expect(diveStep(true, true, -9, 2, MIN)).toBe(true);
    expect(diveStep(true, true, -9, -1, MIN)).toBe(true);
    expect(diveStep(true, false, -9, 2, MIN)).toBe(false);
  });
});

describe('dive pose', () => {
  it('pitches the body near horizontal in a dive and returns upright after landing', () => {
    const st = newHeroPoseState();
    const inp = newHeroPoseInput();
    inp.state = AIRBORNE;
    inp.vy = -8;
    inp.dt = 1 / 60;
    for (let i = 0; i < 60; i++) stepHeroPose(st, inp, 0);
    const base = st.channels[CH_BODY_PITCH];
    expect(st.active).toBe(POSE_AIR);
    inp.dive = true;
    for (let i = 0; i < 60; i++) stepHeroPose(st, inp, 0);
    expect(st.channels[CH_BODY_PITCH]).toBeGreaterThan(1.2);
    expect(st.channels[CH_BODY_PITCH]).toBeGreaterThan(base + 1);
    inp.dive = false;
    inp.state = GROUNDED;
    for (let i = 0; i < 90; i++) stepHeroPose(st, inp, 0);
    expect(Math.abs(st.channels[CH_BODY_PITCH])).toBeLessThan(0.1);
  });
});
