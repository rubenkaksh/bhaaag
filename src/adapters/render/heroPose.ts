// Hero pose maths (ADR 0004). Pure TS: no three, no DOM, no per-frame allocation.
// A pose is a flat row of joint channels (radians, or metres for HIPS_*).
// Seven poses are blended by exponential smoothing of one weight per pose.
// The hang row is rebuilt each frame (sway, yaw lean, leg swing, arm IK; ADR 0005 D7).

// Hero states as seen by the view. Mirrors core/hero.ts; ATTACHED is added
// to the sim later with the same value.
export const GROUNDED = 0;
export const AIRBORNE = 1;
export const DEAD = 2;
export const ATTACHED = 3;
export const CLINGING = 4; // equals core HERO_HANGING (wall / rope-end cling)
export const VAULTING = 5; // equals core HERO_VAULT (ADR 0013)

export interface HeroPoseInput {
  state: number;
  speed: number; // horizontal speed, m/s
  vy: number; // vertical speed, m/s
  brake: boolean; // REEL held while attached (hand-brake)
  rolling: boolean; // landing roll in progress
  ropeDirX: number; // world-space unit vector from the hands to the hook
  ropeDirY: number;
  ropeDirZ: number;
  dt: number; // render frame time, s
  events: number; // AE_* bits latched since the last render frame
  ropeLen: number; // current rope length, m (a long rope swings harder on attach)
  impact: number; // downward landing speed, m/s (for AE_LAND)
  deadCause: number; // core deadCause (1 fell, 2 wall, 3 hard landing, 4 hazard)
  win: number; // 1 = level complete
  hookFlying: number; // 1 = hook in flight
  sliding: boolean; // landing slide in progress (core slideT > 0)
}

export function newHeroPoseInput(): HeroPoseInput {
  return {
    state: GROUNDED,
    speed: 0,
    vy: 0,
    brake: false,
    rolling: false,
    ropeDirX: 0,
    ropeDirY: 1,
    ropeDirZ: 0,
    dt: 0,
    events: 0,
    ropeLen: ATTACH_LEN_REF,
    impact: 0,
    deadCause: 0,
    win: 0,
    hookFlying: 0,
    sliding: false,
  };
}

// Poses.
export const POSE_IDLE = 0;
export const POSE_RUN = 1;
export const POSE_AIR = 2; // jump and fall, mixed by vy
export const POSE_HANG = 3; // rope hang
export const POSE_BRAKE = 4; // rope hand-brake
export const POSE_ROLL = 5;
export const POSE_DEAD = 6;
export const POSE_WIN = 7;
export const POSE_CLING = 8;
export const POSE_COUNT = 9;

// Channels. Frame: +x is the hero's left, +y up, +z forward (facing).
// Sign conventions (the rig converts to three rotations):
//   *_FLEX: + swings the limb forward/up (PI = arm straight overhead)
//   *_RAISE / *_SPREAD: + lifts the limb outward, away from the body
//   ELBOW / KNEE: + bends
//   BODY_PITCH / SPINE_PITCH / HEAD_PITCH: + leans or nods forward
//   SWING_PITCH: + swings the feet back about the grip point (rope only)
export const CH_HIPS_Y = 0; // pelvis height offset, m
export const CH_HIPS_Z = 1; // pelvis forward offset, m
export const CH_BODY_PITCH = 2; // whole body about the hips
export const CH_BODY_ROLL = 3;
export const CH_SPINE_PITCH = 4;
export const CH_SPINE_TWIST = 5;
export const CH_HEAD_PITCH = 6;
export const CH_SHOULDER_FLEX_L = 7;
export const CH_SHOULDER_RAISE_L = 8;
export const CH_ELBOW_L = 9;
export const CH_SHOULDER_FLEX_R = 10;
export const CH_SHOULDER_RAISE_R = 11;
export const CH_ELBOW_R = 12;
export const CH_HIP_FLEX_L = 13;
export const CH_HIP_SPREAD_L = 14;
export const CH_KNEE_L = 15;
export const CH_HIP_FLEX_R = 16;
export const CH_HIP_SPREAD_R = 17;
export const CH_KNEE_R = 18;
export const CH_SWING_PITCH = 19;
export const CH_SWING_ROLL = 20;
export const CH_SCARF = 21; // scarf tail trail angle, not blended
export const CH_HEM_PITCH = 22; // tunic yoke pitch, after the blend
export const CH_HEM_ROLL = 23;
export const CH_SQUASH = 24; // body scale squash (+ = shorter), overlays only
export const CH_COUNT = 25;

// Skeleton dimensions (metres), shared with heroRig.ts so the hang pose can
// place the hands on the trolley point by inverse kinematics. Origin at the
// feet, +z forward, +x the hero's left.
export const HERO_HIP_H = 0.965; // pelvis pivot above the soles
export const HERO_GRIP_H = 2.0; // swing pivot: hands on the trolley (= cfg.rope.handToFeet)
export const HERO_SPINE_Y = 0.08; // spine pivot above the pelvis
export const HERO_SHOULDER_X = 0.2;
export const HERO_SHOULDER_Y = 0.5; // above the spine pivot
export const HERO_UPPER_ARM = 0.29; // shoulder to elbow
export const HERO_FOREARM = 0.28; // elbow to the grip (hand centre)
export const HERO_GRIP_X = 0.07; // half the gap between the two hands on the handle

// Fade-in time constants per target pose, s (63% of the way after one tau).
const FADE_TAU = [0.12, 0.1, 0.08, 0.08, 0.07, 0.04, 0.2, 0.15, 0.06];

const RUN_ENTER_SPEED = 0.5;
const RUN_EXIT_SPEED = 0.3;
const ROLL_TIME = 0.4; // one full forward roll, s
const MAX_DT = 0.1;
const SPRING_STEP = 1 / 120;
const SWING_OMEGA = 4.5; // rad/s, rope swing spring
const SWING_ZETA = 0.3; // under-damped: overshoots like a pendulum
const SWING_ACCEL_GAIN = 0.035; // rad per m/s^2 of horizontal acceleration
const SWING_DRAG_GAIN = 0.012; // rad per m/s of speed (feet trail)
const SWING_MAX = 0.45;
const ATTACH_KICK = 1.2; // rad/s of swing velocity at the reference rope length
const ATTACH_LEN_REF = 20; // m
const ATTACH_LEN_MIN = 0.6; // kick scale on a short rope
const ATTACH_LEN_MAX = 1.6; // kick scale on a long rope
const LEAN_MAX = 0.7;
const ACCEL_TAU = 0.08;
const SCARF_TAU = 0.15;
const TWO_PI = Math.PI * 2;
// Hang layer (ADR 0005 D7): sway, yaw lean and leg swing on top of the row.
const HANG_SWAY_AMP = 0.08; // rad of swing pitch at full speed
const HANG_SWAY_HZ = 0.75;
const HANG_SPEED_REF = 10; // m/s at which the hang motion is at full amplitude
const HANG_LEG_HZ = 0.9;
const HANG_LEG_AMP = 0.14; // hip flex, rad at full speed
const HANG_LEG_TRAIL = 0.12; // hip flex per rad/s of swing velocity (legs lag the swing)
const HANG_LEAN_GAIN = 0.6; // fraction of the centripetal tilt applied as roll
const HANG_LEAN_MAX = 0.35;
const YAW_TAU = 0.12;
const GRAVITY = 9.81;
const HEM_OMEGA = 14;
const HEM_ZETA = 0.35;
const REACH_TAU_ON = 0.05;
const REACH_TAU_OFF = 0.1;
const BREATH_HZ = 0.28;

// Event bits (mirror animEvents.ts; kept local so this file has no imports).
const EV_LAND = 1;
const EV_JUMP = 2;
const EV_RELEASE = 4;
const EV_ATTACH = 16;
const EV_CLING = 32;
const EV_DIE = 64;
const EV_MANTLE = 256;

// Parkour (ADR 0013): vault and slide are blended in over the base pose by weight; the mantle
// climb-up is a timed overlay (the sim mantle is instantaneous).
const MANTLE_END = 0.35; // s, same as climb.holdSec
const MANTLE_DROP = 0.9; // m the hips start below their rest height
const VAULT_TAU_ON = 0.04;
const VAULT_TAU_OFF = 0.08;
const SLIDE_TAU_ON = 0.05;
const SLIDE_TAU_OFF = 0.1;

// Static pose rows (channels not listed are 0).
function row(values: number[][]): Float64Array {
  const r = new Float64Array(CH_COUNT);
  for (let i = 0; i < values.length; i++) r[values[i][0]] = values[i][1];
  return r;
}

const IDLE = row([
  [CH_SPINE_PITCH, 0.04],
  [CH_HEAD_PITCH, -0.04],
  [CH_SHOULDER_RAISE_L, 0.12],
  [CH_SHOULDER_RAISE_R, 0.12],
  [CH_SHOULDER_FLEX_L, 0.08],
  [CH_SHOULDER_FLEX_R, -0.04],
  [CH_ELBOW_L, 0.3],
  [CH_ELBOW_R, 0.22],
  [CH_HIP_SPREAD_L, 0.06],
  [CH_HIP_SPREAD_R, 0.06],
  [CH_HIP_FLEX_L, 0.08],
  [CH_KNEE_L, 0.14],
  [CH_KNEE_R, 0.06],
]);

// Air: two key rows mixed by vy (rising = jump, falling = fall).
const JUMP = row([
  [CH_HIPS_Y, -0.04],
  [CH_SPINE_PITCH, 0.2],
  [CH_HEAD_PITCH, -0.15],
  [CH_SHOULDER_FLEX_L, -0.5],
  [CH_SHOULDER_FLEX_R, 1.0],
  [CH_SHOULDER_RAISE_L, 0.5],
  [CH_SHOULDER_RAISE_R, 0.35],
  [CH_ELBOW_L, 0.5],
  [CH_ELBOW_R, 0.7],
  [CH_HIP_FLEX_L, 1.1],
  [CH_KNEE_L, 1.3],
  [CH_HIP_FLEX_R, -0.25],
  [CH_KNEE_R, 0.7],
]);

const FALL = row([
  [CH_HIPS_Y, -0.06],
  [CH_SPINE_PITCH, 0.08],
  [CH_HEAD_PITCH, 0.25],
  [CH_SHOULDER_FLEX_L, 0.35],
  [CH_SHOULDER_FLEX_R, 0.2],
  [CH_SHOULDER_RAISE_L, 1.15],
  [CH_SHOULDER_RAISE_R, 1.05],
  [CH_ELBOW_L, 0.45],
  [CH_ELBOW_R, 0.35],
  [CH_HIP_FLEX_L, 0.7],
  [CH_KNEE_L, 1.0],
  [CH_HIP_FLEX_R, 0.2],
  [CH_KNEE_R, 0.55],
  [CH_HIP_SPREAD_L, 0.1],
  [CH_HIP_SPREAD_R, 0.1],
]);

// Hang (ADR 0005 D7): both hands up on the trolley, body hanging a little low
// so the arms are almost straight, slight arch, knees tucked. The arm channels
// here are only the starting values: writeHang solves them so the hands land
// on the grip point.
const HANG = row([
  [CH_HIPS_Y, -0.075],
  [CH_BODY_PITCH, -0.1],
  [CH_SPINE_PITCH, -0.04],
  [CH_HEAD_PITCH, -0.12],
  [CH_SHOULDER_FLEX_L, 2.95],
  [CH_SHOULDER_FLEX_R, 2.95],
  [CH_ELBOW_L, 0.15],
  [CH_ELBOW_R, 0.15],
  [CH_HIP_FLEX_L, 0.4],
  [CH_HIP_SPREAD_L, 0.06],
  [CH_KNEE_L, 1.15],
  [CH_HIP_FLEX_R, 0.3],
  [CH_HIP_SPREAD_R, 0.06],
  [CH_KNEE_R, 1.0],
]);

// Hand-brake: left hand up on the hook, leaning back, knees up, right arm out.
const BRAKE = row([
  [CH_HIPS_Z, 0.05],
  [CH_BODY_PITCH, -0.25],
  [CH_SPINE_PITCH, -0.3],
  [CH_SPINE_TWIST, 0.2],
  [CH_HEAD_PITCH, 0.2],
  [CH_SHOULDER_FLEX_L, 3.0],
  [CH_SHOULDER_RAISE_L, 0.1],
  [CH_ELBOW_L, 0.15],
  [CH_SHOULDER_FLEX_R, -0.45],
  [CH_SHOULDER_RAISE_R, 0.95],
  [CH_ELBOW_R, 0.5],
  [CH_HIP_FLEX_L, 1.15],
  [CH_KNEE_L, 1.25],
  [CH_HIP_FLEX_R, 0.85],
  [CH_KNEE_R, 1.5],
]);

// Roll: tight tuck; BODY_PITCH is overwritten with the roll angle.
const ROLL = row([
  [CH_HIPS_Y, -0.45],
  [CH_SPINE_PITCH, 0.9],
  [CH_HEAD_PITCH, 0.6],
  [CH_SHOULDER_FLEX_L, 0.9],
  [CH_SHOULDER_FLEX_R, 0.9],
  [CH_SHOULDER_RAISE_L, 0.1],
  [CH_SHOULDER_RAISE_R, 0.1],
  [CH_ELBOW_L, 1.6],
  [CH_ELBOW_R, 1.6],
  [CH_HIP_FLEX_L, 2.0],
  [CH_HIP_FLEX_R, 2.0],
  [CH_KNEE_L, 2.2],
  [CH_KNEE_R, 2.2],
]);

// Dead: slumped on the back, asymmetric limbs (ragdoll-ish).
const DEAD_ROW = row([
  [CH_HIPS_Y, -0.8],
  [CH_HIPS_Z, -0.1],
  [CH_BODY_PITCH, -1.45],
  [CH_BODY_ROLL, 0.22],
  [CH_SPINE_PITCH, 0.15],
  [CH_SPINE_TWIST, 0.3],
  [CH_HEAD_PITCH, 0.45],
  [CH_SHOULDER_FLEX_L, 0.35],
  [CH_SHOULDER_RAISE_L, 1.35],
  [CH_ELBOW_L, 0.35],
  [CH_SHOULDER_FLEX_R, -0.2],
  [CH_SHOULDER_RAISE_R, 0.55],
  [CH_ELBOW_R, 1.0],
  [CH_HIP_FLEX_L, 0.65],
  [CH_HIP_SPREAD_L, 0.2],
  [CH_KNEE_L, 1.25],
  [CH_HIP_FLEX_R, -0.05],
  [CH_HIP_SPREAD_R, 0.12],
  [CH_KNEE_R, 0.15],
]);

const WIN_ROW = row([
  [CH_SPINE_PITCH, -0.12],
  [CH_HEAD_PITCH, -0.25],
  [CH_SHOULDER_FLEX_L, 2.6],
  [CH_SHOULDER_FLEX_R, 2.6],
  [CH_SHOULDER_RAISE_L, 0.5],
  [CH_SHOULDER_RAISE_R, 0.5],
  [CH_ELBOW_L, 0.25],
  [CH_ELBOW_R, 0.25],
  [CH_HIP_SPREAD_L, 0.12],
  [CH_HIP_SPREAD_R, 0.12],
  [CH_KNEE_L, 0.05],
  [CH_KNEE_R, 0.05],
]);

const CLING_ROW = row([
  [CH_HIPS_Y, -0.075],
  [CH_BODY_PITCH, 0.15],
  [CH_SPINE_PITCH, -0.05],
  [CH_HEAD_PITCH, -0.3],
  [CH_SHOULDER_FLEX_L, 2.95],
  [CH_SHOULDER_FLEX_R, 2.95],
  [CH_ELBOW_L, 0.2],
  [CH_ELBOW_R, 0.2],
  [CH_HIP_FLEX_L, 0.75],
  [CH_HIP_FLEX_R, 0.6],
  [CH_KNEE_L, 0.95],
  [CH_KNEE_R, 0.8],
]);

// Hard-landing death: crumpled forward.
const CRUMPLE = row([
  [CH_HIPS_Y, -0.55],
  [CH_BODY_PITCH, 1.2],
  [CH_BODY_ROLL, 0.35],
  [CH_SPINE_PITCH, 0.35],
  [CH_SPINE_TWIST, -0.25],
  [CH_HEAD_PITCH, -0.3],
  [CH_SHOULDER_FLEX_L, 1.6],
  [CH_SHOULDER_RAISE_L, 0.4],
  [CH_ELBOW_L, 1.9],
  [CH_SHOULDER_FLEX_R, 0.9],
  [CH_SHOULDER_RAISE_R, 0.9],
  [CH_ELBOW_R, 1.2],
  [CH_HIP_FLEX_L, 1.5],
  [CH_KNEE_L, 2.1],
  [CH_HIP_FLEX_R, 0.6],
  [CH_KNEE_R, 0.9],
]);

// Overlay key tables: [t0, v0, t1, v1, ...]. Module-level, never reallocated.
const K_J_HIPS = new Float64Array([0, 0, 0.05, -0.07, 0.12, 0.02, 0.24, 0]);
const K_J_KNEE = new Float64Array([0, 0, 0.05, 0.6, 0.12, -0.15, 0.24, 0]);
const K_J_HIPF = new Float64Array([0, 0, 0.05, 0.45, 0.12, -0.1, 0.24, 0]);
const K_J_SHO = new Float64Array([0, 0, 0.05, -0.5, 0.12, 1.1, 0.24, 0]);
const K_J_SPINE = new Float64Array([0, 0, 0.05, 0.15, 0.12, -0.05, 0.24, 0]);
const K_J_SQ = new Float64Array([0, 0, 0.05, 0.1, 0.12, -0.08, 0.24, 0]);
const JUMP_END = 0.24;

const K_L_SQ = new Float64Array([0, 0, 0.25, 0.14, 0.6, -0.03, 1, 0]);
const K_L_HIPS = new Float64Array([0, 0, 0.3, -0.22, 1, 0]);
const K_L_KNEE = new Float64Array([0, 0, 0.3, 0.9, 1, 0]);
const K_L_HIPF = new Float64Array([0, 0, 0.3, 0.7, 1, 0]);
const K_L_SPINE = new Float64Array([0, 0, 0.3, 0.35, 1, 0]);
const K_L_RAISE = new Float64Array([0, 0, 0.3, 0.3, 1, 0]);

const K_A_SQ = new Float64Array([0, 0, 0.05, -0.06, 0.15, 0]);
const K_A_ELB = new Float64Array([0, 0, 0.05, -0.15, 0.2, 0]);
const K_A_HIPS = new Float64Array([0, 0, 0.06, -0.05, 0.25, 0]);
const ATTACH_END = 0.25;

const K_R_SHO = new Float64Array([0, 1.6, 0.35, 0]);
const K_R_HIPF = new Float64Array([0, 0, 0.12, 0.5, 0.35, 0]);
const K_R_SPINE = new Float64Array([0, -0.25, 0.3, 0]);
const K_R_HEAD = new Float64Array([0, -0.2, 0.3, 0]);
const RELEASE_END = 0.35;

const K_C_SQ = new Float64Array([0, 0, 0.05, 0.06, 0.18, 0]);
const K_C_SPINE = new Float64Array([0, 0, 0.05, 0.2, 0.25, 0]);
const CLING_END = 0.25;

const K_W_HEAD = new Float64Array([0, 0, 0.06, -0.6, 0.3, 0]);
const K_W_RAISE = new Float64Array([0, 0, 0.08, 0.8, 0.4, 0]);
const DIE_WALL_END = 0.4;

const K_H_SQ = new Float64Array([0, 0, 0.06, 0.18, 0.2, 0]);
const K_H_HIPS = new Float64Array([0, 0, 0.08, -0.25, 0.3, 0]);
const DIE_HARD_END = 0.3;

const FLAIL_END = 1.2;

const K_WIN_SQ = new Float64Array([0, 0, 0.1, 0.08, 0.25, -0.06, 0.4, 0]);
const K_WIN_HIPS = new Float64Array([0, 0, 0.25, 0.05, 0.4, 0]);
const WIN_END = 0.4;

// Value of a key table at t: 0 outside [t0, tn], smoothstep between keys.
export function overlayValue(keys: Float64Array, t: number): number {
  const n = keys.length;
  if (t < keys[0] || t > keys[n - 2]) return 0;
  for (let i = 2; i < n; i += 2) {
    if (t <= keys[i]) {
      const t0 = keys[i - 2];
      const span = keys[i] - t0;
      const u = span > 0 ? (t - t0) / span : 1;
      const w = u * u * (3 - 2 * u);
      return keys[i - 1] + (keys[i + 1] - keys[i - 1]) * w;
    }
  }
  return keys[n - 1];
}

export class HeroPoseState {
  readonly weights = new Float64Array(POSE_COUNT);
  readonly channels = new Float64Array(CH_COUNT);
  readonly rows = new Float64Array(POSE_COUNT * CH_COUNT); // per-frame pose rows
  active = POSE_IDLE; // current target pose
  phase = 0; // run cycle, [0, 1)
  time = 0;
  rollT = 0;
  prevState = -1;
  prevSpeed = 0;
  accel = 0; // smoothed horizontal acceleration, m/s^2
  swing = 0; // rope swing spring, rad
  swingVel = 0;
  scarf = 0.3;
  prevYaw = 0;
  yawRate = 0; // smoothed facing turn rate, rad/s
  initialized = 0;
  reach = 0; // continuous grab-the-rope reach, 0..1
  hemP = 0; // hem springs
  hemPV = 0;
  hemR = 0;
  hemRV = 0;
  // Overlay timers (s, -1 = idle).
  tJump = -1;
  tLand = -1;
  tAttach = -1;
  tRelease = -1;
  tCling = -1;
  tDie = -1;
  tWin = -1;
  tMantle = -1;
  vaultW = 0; // 0..1 blend of the vault pose over the base pose
  slideW = 0; // 0..1 blend of the slide pose
  landA = 0; // landing amplitude of the running LAND overlay
  landRoll = 0; // 1 if the landing was a roll
  attachS = 1;
  dieCause = 0;
}

export function newHeroPoseState(): HeroPoseState {
  return new HeroPoseState();
}

// Run cycles per second for a horizontal speed (one cycle = two steps).
export function runCadence(speed: number): number {
  if (!(speed > 0)) return 0;
  return Math.min(2.4, speed / (1.6 + 0.3 * speed));
}

export function selectPose(st: HeroPoseState, inp: HeroPoseInput): number {
  if (inp.state === DEAD) return POSE_DEAD;
  if (inp.win === 1) return POSE_WIN;
  if (inp.state === ATTACHED) return inp.brake ? POSE_BRAKE : POSE_HANG;
  if (inp.state === CLINGING) return POSE_CLING;
  if (inp.state === VAULTING) return POSE_AIR;
  if (inp.rolling) return POSE_ROLL;
  if (inp.state === AIRBORNE) return POSE_AIR;
  const wasRun = st.active === POSE_RUN;
  if (inp.speed > RUN_ENTER_SPEED || (wasRun && inp.speed > RUN_EXIT_SPEED)) return POSE_RUN;
  return POSE_IDLE;
}

function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

function copyRow(st: HeroPoseState, pose: number, src: Float64Array): number {
  const o = pose * CH_COUNT;
  for (let c = 0; c < CH_COUNT; c++) st.rows[o + c] = src[c];
  return o;
}

function writeRun(st: HeroPoseState, speed: number): void {
  const r = st.rows;
  const o = pose0(POSE_RUN);
  for (let c = 0; c < CH_COUNT; c++) r[o + c] = 0;
  const amp = clamp(speed / 6, 0.3, 1);
  const a = st.phase * TWO_PI;
  const s = Math.sin(a);
  const k = Math.cos(a);
  const lean = 0.12 + 0.22 * amp;
  r[o + CH_HIPS_Y] = -0.05 * amp + 0.04 * amp * Math.cos(2 * a);
  r[o + CH_SPINE_PITCH] = lean;
  r[o + CH_SPINE_TWIST] = 0.18 * amp * s;
  r[o + CH_HEAD_PITCH] = -0.6 * lean;
  r[o + CH_HIP_FLEX_L] = 0.2 + 0.85 * amp * s;
  r[o + CH_HIP_FLEX_R] = 0.2 - 0.85 * amp * s;
  r[o + CH_KNEE_L] = 0.25 + 1.15 * amp * (0.5 + 0.5 * k);
  r[o + CH_KNEE_R] = 0.25 + 1.15 * amp * (0.5 - 0.5 * k);
  r[o + CH_SHOULDER_FLEX_L] = -0.9 * amp * s;
  r[o + CH_SHOULDER_FLEX_R] = 0.9 * amp * s;
  r[o + CH_SHOULDER_RAISE_L] = 0.15;
  r[o + CH_SHOULDER_RAISE_R] = 0.15;
  r[o + CH_ELBOW_L] = 1.2 + 0.25 * amp;
  r[o + CH_ELBOW_R] = 1.2 + 0.25 * amp;
}

// Idle breathing, added to the IDLE and CLING rows.
function addBreath(st: HeroPoseState, o: number): void {
  const r = st.rows;
  const t = st.time;
  const b = Math.sin(TWO_PI * BREATH_HZ * t);
  r[o + CH_SPINE_PITCH] -= 0.025 * b;
  r[o + CH_HEAD_PITCH] += 0.015 * b;
  r[o + CH_SHOULDER_RAISE_L] += 0.02 * b;
  r[o + CH_SHOULDER_RAISE_R] += 0.02 * b;
  r[o + CH_HIPS_Y] += 0.004 * b;
  r[o + CH_BODY_ROLL] += 0.02 * Math.sin(TWO_PI * 0.11 * t);
}

function writeWin(st: HeroPoseState): void {
  const o = copyRow(st, POSE_WIN, WIN_ROW);
  const w = Math.sin(TWO_PI * 1.2 * st.time);
  st.rows[o + CH_SHOULDER_FLEX_L] += 0.2 * w;
  st.rows[o + CH_SHOULDER_FLEX_R] -= 0.2 * w; // sin(x + PI)
}

function pose0(pose: number): number {
  return pose * CH_COUNT;
}

function writeAir(st: HeroPoseState, vy: number): void {
  const r = st.rows;
  const o = pose0(POSE_AIR);
  const m = 0.5 + 0.5 * clamp(vy / 5, -1, 1); // 1 = rising, 0 = falling
  for (let c = 0; c < CH_COUNT; c++) r[o + c] = FALL[c] + (JUMP[c] - FALL[c]) * m;
  // Leg cycle while falling (ADR 0003 layer): 1.5 Hz, 0.17 rad.
  const cyc = 0.17 * (1 - m) * Math.sin(st.time * 1.5 * TWO_PI);
  r[o + CH_HIP_FLEX_L] += cyc;
  r[o + CH_HIP_FLEX_R] -= cyc;
}

function writeRope(
  st: HeroPoseState,
  pose: number,
  src: Float64Array,
  inp: HeroPoseInput,
  yaw: number,
): void {
  const o = copyRow(st, pose, src);
  // Rope direction in the hero's local frame (inverse yaw about y).
  let rx = inp.ropeDirX;
  let ry = inp.ropeDirY;
  let rz = inp.ropeDirZ;
  if (!(ry > 0.2)) {
    rx = 0;
    ry = 1;
    rz = 0;
  }
  const cy = Math.cos(yaw);
  const sy = Math.sin(yaw);
  const lx = rx * cy - rz * sy;
  const lz = rx * sy + rz * cy;
  const leanPitch = clamp(Math.atan2(lz, ry), -LEAN_MAX, LEAN_MAX);
  const leanRoll = clamp(Math.atan2(-lx, ry), -LEAN_MAX, LEAN_MAX);
  st.rows[o + CH_SWING_PITCH] = leanPitch + st.swing;
  st.rows[o + CH_SWING_ROLL] = leanRoll;
}

// Two-bone arm solve in the hang row: put both hand centres on the grip point
// (±HERO_GRIP_X, HERO_GRIP_H, 0) in the body frame. The swing pivot is the
// grip point, so swing pitch/roll never move the hands. Assumes zero body
// roll and spine twist in the row. The raise is small, so the sagittal solve
// uses lengths scaled by cos(raise) (error under 1 cm).
function solveHangArms(r: Float64Array, o: number): void {
  const bp = r[o + CH_BODY_PITCH];
  const p = bp + r[o + CH_SPINE_PITCH];
  const shY =
    HERO_HIP_H + r[o + CH_HIPS_Y] + HERO_SPINE_Y * Math.cos(bp) + HERO_SHOULDER_Y * Math.cos(p);
  const shZ = r[o + CH_HIPS_Z] + HERO_SPINE_Y * Math.sin(bp) + HERO_SHOULDER_Y * Math.sin(p);
  const dy = HERO_GRIP_H - shY;
  const dz = -shZ;
  // Into the spine frame (inverse pitch about x).
  const cp = Math.cos(p);
  const sp = Math.sin(p);
  const ly = dy * cp + dz * sp;
  const lz = -dy * sp + dz * cp;
  const reach = Math.sqrt(ly * ly + lz * lz);
  const aim = Math.atan2(lz, -ly); // angle from -y toward +z, PI = straight up
  let raise = 0;
  let flex = Math.PI;
  let elbow = 0;
  for (let i = 0; i < 2; i++) {
    const c = Math.cos(raise);
    const a = HERO_UPPER_ARM * c;
    const b = HERO_FOREARM * c;
    const d = clamp(reach, Math.abs(a - b) + 1e-3, a + b - 1e-4);
    const inner = Math.acos(clamp((a * a + b * b - d * d) / (2 * a * b), -1, 1));
    const alpha = Math.acos(clamp((a * a + d * d - b * b) / (2 * a * d), -1, 1));
    elbow = Math.PI - inner;
    flex = aim - alpha; // elbows forward of the shoulder-hand line
    const span = HERO_UPPER_ARM + HERO_FOREARM * Math.cos(elbow);
    raise = Math.asin(clamp((HERO_GRIP_X - HERO_SHOULDER_X) / span, -1, 1));
  }
  r[o + CH_SHOULDER_FLEX_L] = flex;
  r[o + CH_SHOULDER_FLEX_R] = flex;
  r[o + CH_SHOULDER_RAISE_L] = raise;
  r[o + CH_SHOULDER_RAISE_R] = raise;
  r[o + CH_ELBOW_L] = elbow;
  r[o + CH_ELBOW_R] = elbow;
}

// Hang = rope lean + a pendulum sway that grows with rope speed, a roll lean
// away from the turn when the facing yaws, legs trailing the swing with a
// slow out-of-phase kick, then the arm solve.
function writeHang(st: HeroPoseState, inp: HeroPoseInput, yaw: number, speed: number): void {
  writeRope(st, POSE_HANG, HANG, inp, yaw);
  const r = st.rows;
  const o = pose0(POSE_HANG);
  const k = clamp(speed / HANG_SPEED_REF, 0, 1);
  const t = st.time;
  const sway = Math.sin(TWO_PI * HANG_SWAY_HZ * t);
  r[o + CH_SWING_PITCH] += HANG_SWAY_AMP * (0.3 + 0.7 * k) * sway;
  r[o + CH_SPINE_PITCH] += 0.03 * k * Math.sin(TWO_PI * HANG_SWAY_HZ * t - 0.8);
  const lean = Math.atan((speed * st.yawRate) / GRAVITY) * HANG_LEAN_GAIN;
  r[o + CH_SWING_ROLL] -= clamp(lean, -HANG_LEAN_MAX, HANG_LEAN_MAX);
  const trail = clamp(HANG_LEG_TRAIL * st.swingVel, -0.25, 0.25);
  const legAmp = HANG_LEG_AMP * (0.35 + 0.65 * k);
  const lp = TWO_PI * HANG_LEG_HZ * t;
  r[o + CH_HIP_FLEX_L] += trail + legAmp * Math.sin(lp);
  r[o + CH_HIP_FLEX_R] += trail + legAmp * Math.sin(lp + 1.1);
  r[o + CH_KNEE_L] += 0.6 * legAmp * Math.sin(lp - 0.7);
  r[o + CH_KNEE_R] += 0.6 * legAmp * Math.sin(lp + 0.4);
  r[o + CH_KNEE_L] += 0.12 * k * Math.sin(TWO_PI * HANG_LEG_HZ * t + Math.PI / 2);
  r[o + CH_KNEE_R] += 0.12 * k * Math.sin(TWO_PI * HANG_LEG_HZ * t - Math.PI / 2);
  solveHangArms(r, o);
}

function writeRoll(st: HeroPoseState): void {
  const o = copyRow(st, POSE_ROLL, ROLL);
  let a = TWO_PI * Math.min(1, st.rollT / ROLL_TIME);
  if (a > Math.PI) a -= TWO_PI; // ends at 0, so fading out never spins
  st.rows[o + CH_BODY_PITCH] = a;
}

function resetPose(st: HeroPoseState, target: number, speed: number, yaw: number): void {
  for (let i = 0; i < POSE_COUNT; i++) st.weights[i] = i === target ? 1 : 0;
  st.phase = 0;
  st.rollT = 0;
  st.prevSpeed = speed;
  st.prevYaw = yaw;
  st.yawRate = 0;
  st.accel = 0;
  st.swing = 0;
  st.swingVel = 0;
  st.reach = 0;
  st.hemP = 0;
  st.hemPV = 0;
  st.hemR = 0;
  st.hemRV = 0;
  st.tJump = -1;
  st.tLand = -1;
  st.tAttach = -1;
  st.tRelease = -1;
  st.tCling = -1;
  st.tDie = -1;
  st.tWin = -1;
  st.tMantle = -1;
  st.vaultW = 0;
  st.slideW = 0;
  st.initialized = 1;
}

function stepSwing(st: HeroPoseState, inp: HeroPoseInput, dt: number): void {
  const attached = inp.state === ATTACHED;
  const goal = attached
    ? clamp(SWING_ACCEL_GAIN * st.accel + SWING_DRAG_GAIN * inp.speed, -SWING_MAX, SWING_MAX)
    : 0;
  let n = Math.ceil(dt / SPRING_STEP);
  if (n > 12) n = 12;
  const h = n > 0 ? dt / n : 0;
  const w2 = SWING_OMEGA * SWING_OMEGA;
  const damp = 2 * SWING_ZETA * SWING_OMEGA;
  for (let i = 0; i < n; i++) {
    st.swingVel += (w2 * (goal - st.swing) - damp * st.swingVel) * h;
    st.swing += st.swingVel * h;
  }
}

// Start overlays from the latched event bits.
function startOverlays(st: HeroPoseState, inp: HeroPoseInput): void {
  const ev = inp.events | 0;
  if (ev === 0) return;
  if ((ev & EV_JUMP) !== 0) st.tJump = 0;
  if ((ev & EV_LAND) !== 0) {
    const a = (inp.impact - 2) / 9;
    st.landA = a < 0 ? 0 : a > 1 ? 1 : a;
    st.landRoll = inp.rolling ? 1 : 0;
    st.tLand = 0;
  }
  if ((ev & EV_ATTACH) !== 0) {
    st.attachS = clamp(inp.speed / 10, 0.3, 1);
    st.tAttach = 0;
  }
  if ((ev & EV_RELEASE) !== 0) st.tRelease = 0;
  if ((ev & EV_CLING) !== 0) st.tCling = 0;
  if ((ev & EV_MANTLE) !== 0) st.tMantle = 0;
  if ((ev & EV_DIE) !== 0) {
    st.dieCause = inp.deadCause;
    st.tDie = 0;
  }
}

// Additive overlays on the blended channels, then timer advance.
function applyOverlays(st: HeroPoseState, dt: number): void {
  const ch = st.channels;
  if (st.tJump >= 0) {
    const t = st.tJump;
    ch[CH_HIPS_Y] += overlayValue(K_J_HIPS, t);
    const kn = overlayValue(K_J_KNEE, t);
    ch[CH_KNEE_L] += kn;
    ch[CH_KNEE_R] += kn;
    const hf = overlayValue(K_J_HIPF, t);
    ch[CH_HIP_FLEX_L] += hf;
    ch[CH_HIP_FLEX_R] += hf;
    const sh = overlayValue(K_J_SHO, t);
    ch[CH_SHOULDER_FLEX_L] += sh;
    ch[CH_SHOULDER_FLEX_R] += sh;
    ch[CH_SPINE_PITCH] += overlayValue(K_J_SPINE, t);
    ch[CH_SQUASH] += overlayValue(K_J_SQ, t);
    st.tJump = t + dt > JUMP_END ? -1 : t + dt;
  }
  if (st.tLand >= 0) {
    const a = st.landA;
    const d = 0.12 + 0.18 * a;
    const t = st.tLand / d;
    if (st.landRoll === 1) {
      ch[CH_SQUASH] += 0.5 * a * overlayValue(K_L_SQ, t);
    } else {
      ch[CH_SQUASH] += a * overlayValue(K_L_SQ, t);
      ch[CH_HIPS_Y] += a * overlayValue(K_L_HIPS, t);
      const kn = a * overlayValue(K_L_KNEE, t);
      ch[CH_KNEE_L] += kn;
      ch[CH_KNEE_R] += kn;
      const hf = a * overlayValue(K_L_HIPF, t);
      ch[CH_HIP_FLEX_L] += hf;
      ch[CH_HIP_FLEX_R] += hf;
      ch[CH_SPINE_PITCH] += a * overlayValue(K_L_SPINE, t);
      const rs = a * overlayValue(K_L_RAISE, t);
      ch[CH_SHOULDER_RAISE_L] += rs;
      ch[CH_SHOULDER_RAISE_R] += rs;
    }
    st.tLand = st.tLand + dt > d ? -1 : st.tLand + dt;
  }
  if (st.tAttach >= 0) {
    const t = st.tAttach;
    const s = st.attachS;
    ch[CH_SQUASH] += s * overlayValue(K_A_SQ, t);
    const el = overlayValue(K_A_ELB, t);
    ch[CH_ELBOW_L] += el;
    ch[CH_ELBOW_R] += el;
    ch[CH_HIPS_Y] += s * overlayValue(K_A_HIPS, t);
    st.tAttach = t + dt > ATTACH_END ? -1 : t + dt;
  }
  if (st.tRelease >= 0) {
    const t = st.tRelease;
    const sh = overlayValue(K_R_SHO, t);
    ch[CH_SHOULDER_FLEX_L] += sh;
    ch[CH_SHOULDER_FLEX_R] += sh;
    const hf = overlayValue(K_R_HIPF, t);
    ch[CH_HIP_FLEX_L] += hf;
    ch[CH_HIP_FLEX_R] += hf;
    ch[CH_SPINE_PITCH] += overlayValue(K_R_SPINE, t);
    ch[CH_HEAD_PITCH] += overlayValue(K_R_HEAD, t);
    st.tRelease = t + dt > RELEASE_END ? -1 : t + dt;
  }
  if (st.tCling >= 0) {
    const t = st.tCling;
    ch[CH_SQUASH] += overlayValue(K_C_SQ, t);
    ch[CH_SPINE_PITCH] += overlayValue(K_C_SPINE, t);
    st.tCling = t + dt > CLING_END ? -1 : t + dt;
  }
  if (st.tDie >= 0) {
    const t = st.tDie;
    let end = FLAIL_END;
    if (st.dieCause === 2) {
      ch[CH_HEAD_PITCH] += overlayValue(K_W_HEAD, t);
      const rs = overlayValue(K_W_RAISE, t);
      ch[CH_SHOULDER_RAISE_L] += rs;
      ch[CH_SHOULDER_RAISE_R] += rs;
      end = DIE_WALL_END;
    } else if (st.dieCause === 3) {
      ch[CH_SQUASH] += overlayValue(K_H_SQ, t);
      ch[CH_HIPS_Y] += overlayValue(K_H_HIPS, t);
      end = DIE_HARD_END;
    } else if (t <= FLAIL_END) {
      const e = Math.exp(-t / 0.6);
      const sr = 0.4 * e * Math.sin(TWO_PI * 3 * t);
      const hf = 0.3 * e * Math.sin(TWO_PI * 2.5 * t);
      ch[CH_SHOULDER_RAISE_L] += sr;
      ch[CH_SHOULDER_RAISE_R] -= sr;
      ch[CH_HIP_FLEX_L] += hf;
      ch[CH_HIP_FLEX_R] -= hf;
    }
    st.tDie = t + dt > end ? -1 : t + dt;
  }
  if (st.tWin >= 0) {
    const t = st.tWin;
    ch[CH_SQUASH] += overlayValue(K_WIN_SQ, t);
    ch[CH_HIPS_Y] += overlayValue(K_WIN_HIPS, t);
    st.tWin = t + dt > WIN_END ? -1 : t + dt;
  }
}

function stepHem(
  st: HeroPoseState,
  inp: HeroPoseInput,
  dt: number,
  speed: number,
  amp: number,
): void {
  const a = st.active;
  let gp = 0;
  let gr = 0;
  if (a === POSE_HANG || a === POSE_BRAKE) {
    gp = -0.5 * st.swing;
  } else if (a !== POSE_DEAD) {
    gp =
      -clamp(0.012 * speed + 0.02 * Math.max(0, -inp.vy), 0, 0.3) -
      0.2 * clamp(st.accel / 10, -1, 1) +
      0.05 * amp * Math.sin(2 * TWO_PI * st.phase + Math.PI / 2);
    gr =
      0.06 * amp * Math.sin(TWO_PI * st.phase + Math.PI / 2) - 0.15 * clamp(st.yawRate / 3, -1, 1);
  }
  let n = Math.ceil(dt / SPRING_STEP);
  if (n > 12) n = 12;
  const h = n > 0 ? dt / n : 0;
  const w2 = HEM_OMEGA * HEM_OMEGA;
  const damp = 2 * HEM_ZETA * HEM_OMEGA;
  for (let i = 0; i < n; i++) {
    st.hemPV += (w2 * (gp - st.hemP) - damp * st.hemPV) * h;
    st.hemP += st.hemPV * h;
    st.hemRV += (w2 * (gr - st.hemR) - damp * st.hemRV) * h;
    st.hemR += st.hemRV * h;
  }
  st.channels[CH_HEM_PITCH] = clamp(st.hemP, -0.35, 0.2);
  st.channels[CH_HEM_ROLL] = clamp(st.hemR, -0.18, 0.18);
}

// Advance the pose by one render frame. yaw is the hero's facing (rad),
// used only to bring the rope direction into the hero's frame.
// Vault tuck and slide lean: target values the channels are pulled toward by a weight; plus the
// mantle climb-up (hips rise from below the ledge while the hands push).
function lerpCh(ch: Float64Array, c: number, target: number, w: number): void {
  ch[c] += (target - ch[c]) * w;
}

function applyParkour(st: HeroPoseState, inp: HeroPoseInput, dt: number): void {
  const ch = st.channels;
  if (dt > 0) {
    const vg = inp.state === VAULTING ? 1 : 0;
    st.vaultW += (vg - st.vaultW) * (1 - Math.exp(-dt / (vg === 1 ? VAULT_TAU_ON : VAULT_TAU_OFF)));
    const sg = inp.sliding && inp.state === GROUNDED ? 1 : 0;
    st.slideW += (sg - st.slideW) * (1 - Math.exp(-dt / (sg === 1 ? SLIDE_TAU_ON : SLIDE_TAU_OFF)));
  }
  const v = st.vaultW;
  if (v > 0.001) {
    lerpCh(ch, CH_BODY_PITCH, 0.3, v);
    lerpCh(ch, CH_SPINE_PITCH, 0.45, v);
    lerpCh(ch, CH_HIPS_Y, -0.12, v);
    lerpCh(ch, CH_HIP_FLEX_L, 1.4, v); // lead knee driven up and over
    lerpCh(ch, CH_KNEE_L, 1.5, v);
    lerpCh(ch, CH_HIP_FLEX_R, -0.45, v); // trail leg tucked behind
    lerpCh(ch, CH_KNEE_R, 1.0, v);
    lerpCh(ch, CH_SHOULDER_FLEX_L, 1.2, v); // one hand plants on the obstacle
    lerpCh(ch, CH_SHOULDER_FLEX_R, -0.6, v);
    lerpCh(ch, CH_ELBOW_L, 0.3, v);
  }
  const sl = st.slideW;
  if (sl > 0.001) {
    lerpCh(ch, CH_BODY_PITCH, -0.85, sl); // leaning back, feet first
    lerpCh(ch, CH_HIPS_Y, -0.55, sl);
    lerpCh(ch, CH_SPINE_PITCH, -0.2, sl);
    lerpCh(ch, CH_HIP_FLEX_L, 1.4, sl);
    lerpCh(ch, CH_HIP_FLEX_R, 1.2, sl);
    lerpCh(ch, CH_KNEE_L, 0.3, sl);
    lerpCh(ch, CH_KNEE_R, 0.5, sl);
    lerpCh(ch, CH_SHOULDER_FLEX_L, -0.7, sl);
    lerpCh(ch, CH_SHOULDER_FLEX_R, -0.7, sl);
    lerpCh(ch, CH_ELBOW_L, 0.2, sl);
    lerpCh(ch, CH_ELBOW_R, 0.2, sl);
  }
  if (st.tMantle >= 0) {
    const u = st.tMantle / MANTLE_END;
    const k = 1 - u * u * (3 - 2 * u); // 1 at the hang point, 0 once standing
    ch[CH_HIPS_Y] -= MANTLE_DROP * k;
    ch[CH_SPINE_PITCH] += 0.5 * k;
    ch[CH_SHOULDER_FLEX_L] += 1.0 * k;
    ch[CH_SHOULDER_FLEX_R] += 1.0 * k;
    ch[CH_HIP_FLEX_L] += 0.9 * k;
    ch[CH_HIP_FLEX_R] += 0.6 * k;
    ch[CH_KNEE_L] += 0.8 * k;
    ch[CH_KNEE_R] += 0.5 * k;
    st.tMantle = st.tMantle + dt > MANTLE_END ? -1 : st.tMantle + dt;
  }
}

export function stepHeroPose(st: HeroPoseState, inp: HeroPoseInput, yaw: number): void {
  const dt = inp.dt > 0 ? Math.min(inp.dt, MAX_DT) : 0;
  const speed = inp.speed > 0 ? inp.speed : 0;
  const target = selectPose(st, inp);
  if (st.initialized === 0 || (st.prevState === DEAD && inp.state !== DEAD)) {
    resetPose(st, target, speed, yaw);
  }
  const prevActive = st.active;
  st.prevState = inp.state;
  st.active = target;
  if (target === POSE_WIN && prevActive !== POSE_WIN) st.tWin = 0;
  st.time += dt;
  st.phase += runCadence(speed) * dt;
  st.phase -= Math.floor(st.phase);
  st.rollT = inp.rolling ? st.rollT + dt : 0;

  if (dt > 0) {
    const raw = (speed - st.prevSpeed) / dt;
    st.accel += (raw - st.accel) * (1 - Math.exp(-dt / ACCEL_TAU));
    let dyaw = (yaw - st.prevYaw) % TWO_PI;
    if (dyaw > Math.PI) dyaw -= TWO_PI;
    if (dyaw < -Math.PI) dyaw += TWO_PI;
    st.yawRate += (dyaw / dt - st.yawRate) * (1 - Math.exp(-dt / YAW_TAU));
  }
  st.prevYaw = yaw;
  st.prevSpeed = speed;
  stepSwing(st, inp, dt);
  startOverlays(st, inp);
  if ((inp.events & EV_ATTACH) !== 0) {
    const lenK = clamp(inp.ropeLen / ATTACH_LEN_REF, ATTACH_LEN_MIN, ATTACH_LEN_MAX);
    st.swingVel += ATTACH_KICK * lenK * st.attachS;
  }

  // Weights: exponential approach to one-hot. Sum stays 1.
  const k = 1 - Math.exp(-dt / FADE_TAU[target]);
  let sum = 0;
  for (let i = 0; i < POSE_COUNT; i++) {
    const goal = i === target ? 1 : 0;
    st.weights[i] += (goal - st.weights[i]) * k;
    sum += st.weights[i];
  }

  const o = copyRow(st, POSE_IDLE, IDLE);
  addBreath(st, o);
  writeRun(st, speed);
  writeAir(st, inp.vy);
  writeHang(st, inp, yaw, speed);
  writeRope(st, POSE_BRAKE, BRAKE, inp, yaw);
  writeRoll(st);
  copyRow(st, POSE_DEAD, inp.deadCause === 3 ? CRUMPLE : DEAD_ROW);
  writeWin(st);
  addBreath(st, copyRow(st, POSE_CLING, CLING_ROW));

  const inv = sum > 0 ? 1 / sum : 0;
  for (let c = 0; c < CH_COUNT; c++) {
    let v = 0;
    for (let i = 0; i < POSE_COUNT; i++) v += st.weights[i] * st.rows[i * CH_COUNT + c];
    st.channels[c] = v * inv;
  }

  applyOverlays(st, dt);

  applyParkour(st, inp, dt);

  // Reach: continuous grab-for-the-rope while the hook flies.
  if (dt > 0) {
    const goal = inp.hookFlying === 1 ? 1 : 0;
    const tau = goal === 1 ? REACH_TAU_ON : REACH_TAU_OFF;
    st.reach += (goal - st.reach) * (1 - Math.exp(-dt / tau));
  }
  const reach = st.reach;
  if (reach > 0) {
    const ch = st.channels;
    const ry = inp.ropeDirY < -1 ? -1 : inp.ropeDirY > 1 ? 1 : inp.ropeDirY;
    const sf = clamp(Math.PI / 2 + Math.asin(ry), 0.6, 3.0);
    ch[CH_SHOULDER_FLEX_R] += (sf - ch[CH_SHOULDER_FLEX_R]) * reach;
    ch[CH_ELBOW_R] += (0.1 - ch[CH_ELBOW_R]) * reach;
    ch[CH_SPINE_TWIST] -= 0.15 * reach;
  }

  const runAmp = st.active === POSE_RUN ? clamp(speed / 6, 0.3, 1) : 0;
  stepHem(st, inp, dt, speed, runAmp);

  // Scarf tail trails with airspeed; drops when dead.
  const dead = inp.state === DEAD;
  const scarfGoal = dead ? 0.05 : clamp(0.2 + 0.12 * speed + 0.06 * Math.abs(inp.vy), 0.15, 1.35);
  st.scarf += (scarfGoal - st.scarf) * (1 - Math.exp(-dt / SCARF_TAU));
  let flutter = dead ? 0 : 0.08 * Math.min(1, speed / 8) * Math.sin(st.time * 17);
  if (!dead) {
    if (speed < 0.5) flutter += 0.05 * Math.sin(TWO_PI * 0.35 * st.time);
    flutter += 0.1 * runAmp * Math.sin(2 * TWO_PI * st.phase + 2.2);
  }
  st.channels[CH_SCARF] = st.scarf + flutter;

  const sq = st.channels[CH_SQUASH];
  st.channels[CH_SQUASH] = sq < -0.12 ? -0.12 : sq > 0.18 ? 0.18 : sq;
}
