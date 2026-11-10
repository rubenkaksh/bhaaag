export type Tuning = {
  physics: {
    g: number;
    airDrag: number;
    killPlaneBelowMin: number;
  };
  rope: {
    gravityFactor: number;
    drag: number;
    terminal: number;
    launchSpeed: number;
    minLen: number;
    maxLen: number;
    minSlopeDeg: number;
    maxSlopeDeg: number;
    trolleyStop: number;
    handToFeet: number;
    hookSpeed: number;
    brakeDecel: number;
  };
  aim: {
    magnetDegDesktop: number;
    magnetDegTouch: number;
    routeAssistDeg: number;
    routeAssistLateDeg: number;
    routeAssistEarlyHops: number;
    snapRadius: number;
    previewHz: number;
    previewMaxSec: number;
    previewReleaseSamples: number;
  };
  release: {
    inputBufferMs: number;
    coyoteMs: number;
    jumpUp: number;
    jumpFwd: number;
    carry: number;
    hookCooldownSec: number;
    hookIntentSec: number;
    perfectLo: number;
    perfectHi: number;
    perfectBoost: number;
    perfectUp: number;
  };
  landing: {
    vyClean: number;
    vyRoll: number;
    skidDecel: number;
    vhStumble: number;
    pad: number;
    carryCap: number;
    rollSec: number;
    chainWindowMs: number;
    edgeGrabH: number;
    edgeGrabBelowMin: number;
    edgeGrabBelowMax: number;
    edgeGrabVyMax: number;
  };
  wall: {
    vCling: number;
  };
  roof: {
    slipDeg: number;
    mu: number;
    control: number;
    uphillRun: number;
  };
  hero: {
    walk: number;
    run: number;
    radius: number;
    stepUp: number;
    jump: number;
    height: number;
    accel: number;
    friction: number;
  };
  camera: {
    dist: number;
    distSlide: number;
    fov: number;
    fovMax: number;
    shoulder: number;
    pitchMin: number;
    pitchMax: number;
    height: number;
    probeRadius: number;
    smooth: number;
    armRelease: number;
    downhillBias: number;
    fovSpeed: number;
  };
  validator: {
    minReleaseWindowTicks: number;
    minAimBand: number;
    aimSamples: number;
    releaseStride: number;
  };
  assist: {
    slowmoScale: number;
    slowmoSec: number;
  };
  fixedHz: number;
};

export const DEFAULT_TUNING: Tuning = {
  physics: {
    g: 9.81,
    airDrag: 0.05,
    killPlaneBelowMin: 5,
  },
  rope: {
    gravityFactor: 1.0,
    drag: 0.05,
    terminal: 20,
    launchSpeed: 3,
    minLen: 4,
    maxLen: 35,
    minSlopeDeg: 10,
    maxSlopeDeg: 55,
    trolleyStop: 0.6,
    handToFeet: 2.0,
    hookSpeed: 320,
    brakeDecel: 10,
  },
  aim: {
    magnetDegDesktop: 4,
    magnetDegTouch: 6,
    routeAssistDeg: 16,
    routeAssistLateDeg: 10,
    routeAssistEarlyHops: 2,
    snapRadius: 1.2,
    previewHz: 15,
    previewMaxSec: 8,
    previewReleaseSamples: 12,
  },
  release: {
    inputBufferMs: 100,
    coyoteMs: 120,
    jumpUp: 5,
    jumpFwd: 2,
    carry: 1.0,
    hookCooldownSec: 0.15,
    hookIntentSec: 0.5,
    perfectLo: 0.7,
    perfectHi: 1.0,
    perfectBoost: 2,
    perfectUp: 2,
  },
  landing: {
    vyClean: 7,
    vyRoll: 13,
    skidDecel: 7,
    vhStumble: 16,
    pad: 0.5,
    carryCap: 12,
    rollSec: 0.35,
    chainWindowMs: 400,
    edgeGrabH: 0.6,
    edgeGrabBelowMin: 0.2,
    edgeGrabBelowMax: 1.4,
    edgeGrabVyMax: 9,
  },
  wall: {
    vCling: 7.5,
  },
  roof: {
    slipDeg: 15,
    mu: 0.2,
    control: 0.3,
    uphillRun: 0.4,
  },
  hero: {
    walk: 3.5,
    run: 6,
    radius: 0.35,
    stepUp: 0.4,
    jump: 4.5,
    height: 1.8,
    accel: 40,
    friction: 30,
  },
  camera: {
    dist: 4.5,
    distSlide: 6.5,
    fov: 60,
    fovMax: 75,
    shoulder: 0.6,
    pitchMin: -60,
    pitchMax: 50,
    height: 1.6,
    probeRadius: 0.25,
    smooth: 0.25,
    armRelease: 0.05,
    downhillBias: 8,
    fovSpeed: 20,
  },
  validator: {
    minReleaseWindowTicks: 12,
    minAimBand: 0.4,
    aimSamples: 6,
    releaseStride: 3,
  },
  assist: {
    slowmoScale: 0.35,
    slowmoSec: 0.4,
  },
  fixedHz: 60,
};
