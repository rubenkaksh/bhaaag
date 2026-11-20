// T336a follow-up: the graph's sprint constants are derived from tuning.hero.sprint* and ADR 0018 measurements.
import { describe, expect, it } from 'vitest';
import { DEFAULT_TUNING } from '../../src/core/config';
import {
  SPRINT_JUMP_VY,
  SPRINT_RAMP_M,
  SPRINT_RUNWAY_M,
  SPRINT_SPEED,
  SPRINT_STREAK_M,
  flight,
} from '../../src/content/strategy/graph';

const H = DEFAULT_TUNING.hero;

describe('graph sprint constants == tuning.hero.sprint*', () => {
  it('speed, streak and take-off come straight from tuning', () => {
    expect(SPRINT_SPEED).toBe(H.sprintSpeed);
    expect(SPRINT_STREAK_M).toBe(H.sprintStreakM);
    expect(SPRINT_JUMP_VY).toBe(H.jump);
  });

  it('measured ramp is within 0.3 m of the analytic ramp at sprintAccel', () => {
    const analytic = (H.sprintSpeed ** 2 - H.run ** 2) / (2 * H.sprintAccel);
    expect(Math.abs(SPRINT_RAMP_M - analytic)).toBeLessThanOrEqual(0.3);
  });

  it('runway is run-up + streak + ramp (20.45 m from a standing start)', () => {
    expect(Math.abs(SPRINT_RUNWAY_M - 20.45)).toBeLessThanOrEqual(0.1);
  });

  it('flight model reproduces the ADR run and sprint jump distances', () => {
    expect(flight(H.jump, H.run, 0)!.dist).toBeCloseTo(5.6, 0);
    expect(flight(H.jump, H.sprintSpeed, 0)!.dist).toBeCloseTo(10.03, 0);
  });
});
