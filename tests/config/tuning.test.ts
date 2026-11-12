import { describe, expect, it } from 'vitest';
import { z } from 'zod';
import { DEFAULT_TUNING } from '../../src/core/config';
import tuningText from '../../content/config/tuning.json?raw';

const raw: unknown = JSON.parse(tuningText);

const num = z.number();
const schema = z.strictObject({
  physics: z.strictObject({ g: num, airDrag: num, killPlaneBelowMin: num }),
  rope: z.strictObject({
    gravityFactor: num,
    drag: num,
    terminal: num,
    launchSpeed: num,
    minLen: num,
    maxLen: num,
    minSlopeDeg: num,
    maxSlopeDeg: num,
    trolleyStop: num,
    handToFeet: num,
    hookSpeed: num,
    brakeDecel: num,
  }),
  aim: z.strictObject({
    magnetDegDesktop: num,
    magnetDegTouch: num,
    routeAssistDeg: num,
    routeAssistLateDeg: num,
    routeAssistEarlyHops: num,
    snapRadius: num,
    previewHz: num,
    previewMaxSec: num,
    previewReleaseSamples: num,
    tapRadiusNdc: num,
    hintSec: num,
  }),
  release: z.strictObject({
    inputBufferMs: num,
    coyoteMs: num,
    jumpUp: num,
    jumpFwd: num,
    carry: num,
    hookCooldownSec: num,
    hookIntentSec: num,
    perfectLo: num,
    perfectHi: num,
    perfectBoost: num,
    perfectUp: num,
  }),
  landing: z.strictObject({
    vyClean: num,
    vyRoll: num,
    skidDecel: num,
    vhStumble: num,
    pad: num,
    carryCap: num,
    rollSec: num,
    chainWindowMs: num,
    edgeGrabH: num,
    edgeGrabBelowMin: num,
    edgeGrabBelowMax: num,
    edgeGrabVyMax: num,
  }),
  wall: z.strictObject({ vCling: num }),
  roof: z.strictObject({ slipDeg: num, mu: num, control: num, uphillRun: num }),
  hero: z.strictObject({
    walk: num,
    run: num,
    radius: num,
    stepUp: num,
    jump: num,
    height: num,
    accel: num,
    friction: num,
    airSteer: num,
    airSteerCap: num,
  }),
  camera: z.strictObject({
    dist: num,
    distSlide: num,
    fov: num,
    fovMax: num,
    shoulder: num,
    pitchMin: num,
    pitchMax: num,
    height: num,
    probeRadius: num,
    smooth: num,
    armRelease: num,
    downhillBias: num,
    fovSpeed: num,
    frontPitchDeg: num,
    zipYawDeg: num,
    zipYawMinDiagDeg: num,
    zipYawEase: num,
    sideYawDeg: num,
    sideYawSpeed: num,
    sideYawEase: num,
    tiltDeg: num,
  }),
  validator: z.strictObject({
    minReleaseWindowTicks: num,
    minAimBand: num,
    aimSamples: num,
    releaseStride: num,
  }),
  assist: z.strictObject({ slowmoScale: num, slowmoSec: num }),
  fixedHz: num,
  chase: z.strictObject({
    startGap: num,
    v0: num,
    accel: num,
    vMax: num,
    gapMax: num,
    rubberK: num,
    catchGap: num,
    fogGap: num,
    slots: num,
    scoreHop: num,
    scoreClean: num,
    scorePerfect: num,
    gapBase: num,
    gapSpanLo: num,
    gapSpanHi: num,
    decoyBase: num,
    decoyGain: num,
    oneHouseBase: num,
    oneHouseGain: num,
    frontPov: num,
  }),
  line: z.strictObject({ zoneTol: num }),
  tramp: z.strictObject({ vUp: num, jumpBonus: num, airSteer: num, airSteerCap: num }),
  cushion: z.strictObject({ lockSec: num }),
  climb: z.strictObject({
    reachMin: num,
    reachMax: num,
    holdSec: num,
    vyMax: num,
    mantleFwd: num,
  }),
});

describe('tuning.json', () => {
  it('parses with zod', () => {
    expect(schema.safeParse(raw).success).toBe(true);
  });
  it('has the ADR 0001 defaults', () => {
    const t = schema.parse(raw);
    expect(t.rope.gravityFactor).toBe(1.0);
    expect(t.rope.drag).toBe(0.05);
    expect(t.rope.launchSpeed).toBe(3);
    expect(t.rope.hookSpeed).toBe(320);
    expect(t.rope.brakeDecel).toBe(10);
    expect(t.wall.vCling).toBe(7.5);
    expect(t.landing.carryCap).toBe(12);
    expect(t.landing.chainWindowMs).toBe(400);
    expect(t.landing.vhStumble).toBe(16);
    expect(t.fixedHz).toBe(60);
  });
  it('matches DEFAULT_TUNING', () => {
    expect(DEFAULT_TUNING).toEqual(raw);
  });
  it('has no vLethal or pipsAt keys', () => {
    const text = tuningText;
    expect(text).not.toContain('vLethal');
    expect(text).not.toContain('pipsAt');
  });
});
