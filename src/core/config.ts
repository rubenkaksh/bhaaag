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
    tapRadiusNdc: number;
    hintSec: number; // how long a HINT highlight stays on a zipline anchor (T299)
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
    airSteer: number; // m/s^2 the stick turns horizontal velocity while airborne (not after a bounce)
    airSteerCap: number; // horizontal speed it pulls toward at full stick, m/s; faster heroes keep their speed
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
    frontPitchDeg: number;
    zipYawDeg: number;
    zipYawMinDiagDeg: number;
    zipYawEase: number;
    sideYawDeg: number; // yaw toward the side of lateral travel at sideYawSpeed m/s sideways (T300)
    sideYawSpeed: number; // sideways speed that reaches the full offset, m/s
    sideYawEase: number; // per fixed tick ease toward a larger side-look target
    sideYawEaseBack: number; // per fixed tick ease back toward 0 (slower = smoother return)
    overviewHeight: number; // hold-MAP bird's eye: camera height above the framed centre, m (before span gain)
    overviewPullBack: number; // extra metres the overview camera sits back from the framed centre
    overviewPitchDeg: number; // nominal overview pitch down, deg (sets the base back-off from the height)
    overviewEase: number; // per fixed tick ease of the overview blend (0..1) in and out
    overviewMaxExtent: number; // max horizontal reach from the hero that the overview frames, m
    overviewSpanScale: number; // extra camera height per metre of framed span, so a long run still fits
    tiltDeg: number; // render-only pitch-down of the view (deg), all modes; ?tilt= overrides for debugging
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
  // --- Dragon Chase (Track 3, appended) ---
  chase: {
    startGap: number;
    v0: number;
    accel: number;
    vMax: number;
    gapMax: number;
    rubberK: number;
    catchGap: number;
    fogGap: number;
    slots: number;
    scoreHop: number;
    scoreClean: number;
    scorePerfect: number;
    // Row difficulty as a function of dragon speed (difficultyFor, rows.ts rowSpecInto).
    gapBase: number; // open hillside between rows (m), minimum
    gapSpanLo: number; // random extra gap at difficulty 0
    gapSpanHi: number; // random extra gap at difficulty 1
    decoyBase: number; // chance of a terracotta decoy wall at difficulty 0
    decoyGain: number; // added chance at difficulty 1
    oneHouseBase: number; // chance of a one-house (short rest) row at difficulty 0
    oneHouseGain: number; // added chance at difficulty 1
    frontPov: number; // 0 (default) = camera behind the hero looking downhill, 1 = ahead of the hero looking back at the dragon
  };
  // --- Strategy maze (ADR 0011, appended) ---
  line: {
    zoneTol: number; // feet may be this far above/below a zone slab and still count
  };
  tramp: {
    vUp: number; // bounce vertical speed, m/s
    jumpBonus: number; // added when JUMP is held at contact
    airSteer: number; // m/s^2 the stick steers the hero in the air after a bounce
    airSteerCap: number; // horizontal speed the air steer pulls toward at full stick, m/s
  };
  cushion: {
    lockSec: number; // move input ignored this long after a cushion landing
  };
  climb: {
    reachMin: number; // ledge top at least this far above the feet to grab
    reachMax: number; // ...and at most this far
    holdSec: number; // CLIMB held this long while hanging mantles
    vyMax: number; // |vy| above this is too fast to grab
    mantleFwd: number; // extra inward push past the radius when standing up
  };
  // Parkour (ADR 0013); global, act only when World.parkour is 1.
  vault: {
    minSpeed: number; // horizontal speed needed to auto-vault, m/s
    maxH: number; // tallest vaultable top above the feet, m
    maxDepth: number; // deepest obstacle that can be vaulted, m
    sec: number; // vault duration, s
    keep: number; // fraction of speed kept through the vault
    coneDeg: number; // heading/stick cone toward the obstacle, degrees
    clearH: number; // clearance above the obstacle top, m
  };
  slide: {
    minSpeed: number; // landing speed that starts a slide, m/s
    sec: number; // slide duration, s
    height: number; // hero height while sliding, m
    decel: number; // slide deceleration, m/s^2
    minKeep: number; // speed floor kept while sliding, m/s
  };
  parkour: {
    airStepUp: number; // airborne step-up onto a ledge this high, m
    grabProbe: number; // ledge grab probe distance, m
    autoMantleSec: number; // stick held this long while hanging mantles, s
    stickDot: number; // stick/heading dot needed for the auto moves
  };
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
    tapRadiusNdc: 0.18,
    hintSec: 4,
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
    airSteer: 14,
    airSteerCap: 6,
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
    frontPitchDeg: -12,
    zipYawDeg: 45,
    zipYawMinDiagDeg: 20,
    zipYawEase: 0.06,
    sideYawDeg: 40,
    sideYawSpeed: 2.5,
    sideYawEase: 0.07,
    sideYawEaseBack: 0.035,
    overviewHeight: 45,
    overviewPullBack: 12,
    overviewPitchDeg: 60,
    overviewEase: 0.08,
    overviewMaxExtent: 120,
    overviewSpanScale: 0.35,
    tiltDeg: 20,
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
  chase: {
    startGap: 36,
    v0: 4.4,
    accel: 0.045,
    vMax: 13.5,
    gapMax: 45,
    rubberK: 0.4,
    catchGap: 2.5,
    fogGap: 22,
    slots: 6,
    scoreHop: 25,
    scoreClean: 10,
    scorePerfect: 10,
    gapBase: 11,
    gapSpanLo: 2,
    gapSpanHi: 6,
    decoyBase: 0.2,
    decoyGain: 0.3,
    oneHouseBase: 0.2,
    oneHouseGain: 0.15,
    frontPov: 0,
  },
  line: {
    zoneTol: 0.6,
  },
  tramp: {
    vUp: 9,
    jumpBonus: 1.5,
    airSteer: 12,
    airSteerCap: 6,
  },
  cushion: {
    lockSec: 0.5,
  },
  climb: {
    reachMin: 0.6,
    reachMax: 2.2,
    holdSec: 0.35,
    vyMax: 8,
    mantleFwd: 0.3,
  },
  vault: {
    minSpeed: 2.5,
    maxH: 1.1,
    maxDepth: 0.7,
    sec: 0.28,
    keep: 0.9,
    coneDeg: 45,
    clearH: 0.1,
  },
  slide: { minSpeed: 7, sec: 0.6, height: 1.0, decel: 4, minKeep: 2 },
  parkour: { airStepUp: 0.5, grabProbe: 0.3, autoMantleSec: 0.25, stickDot: 0.7 },
};
