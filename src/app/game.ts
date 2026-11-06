import tuningJson from '../../content/config/tuning.json';
import levelText from '../../content/levels/l1.json?raw';
import { DEFAULT_TUNING } from '../core/config';
import type { Tuning } from '../core/config';
import {
  copyHeroState,
  DEAD_FELL,
  DEAD_HARD_LANDING,
  DEAD_HAZARD,
  DEAD_WALL,
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_EV_CLING,
  HERO_EV_DIED,
  HERO_EV_HOOKED,
  HERO_EV_LANDED,
  HERO_EV_PERFECT,
  HERO_EV_RELEASED,
  newHeroState,
} from '../core/hero';
import { HOOK_FLYING, HOOK_IDLE, NO_ANCHOR, AimResult, aimReason, pickAnchorAssisted } from '../core/hook';
import { BTN_ACTION, BTN_HOOK, BTN_REEL, BTN_RESTART, newInputFrame } from '../core/input';
import { aabbContainsPoint } from '../core/math/aabb';
import { PreviewResult, PREVIEW_NONE, previewShot } from '../core/preview';
import { step } from '../core/sim';
import { Vec3 } from '../core/math/vec3';
import { loadWorldFromJson } from '../content/load';
import { DesktopInput } from '../adapters/input/desktop';
import { TouchInput } from '../adapters/input/touch';
import { Sfx } from '../adapters/audio/sfx';
import { CameraRig, updateCamera } from '../adapters/render/cameraRig';
import { HeroView } from '../adapters/render/heroView';
import { updateLevelView } from '../adapters/render/levelView';
import { createGameScene } from '../adapters/render/scene';
import { DebugHud } from '../adapters/ui/debugHud';
import { Hud } from '../adapters/ui/hud';
import { aimReasonText } from '../adapters/ui/aimReasonText';
import { AimPreviewView } from '../adapters/render/aimPreviewView';
import { WaypointView } from '../adapters/render/waypointView';
import {
  formatDistance,
  newWaypointScreen,
  projectWaypoint,
  WAYPOINT_HIDE_M,
} from '../adapters/ui/waypointMath';
import { Vector3 } from 'three';
import { RopeView } from './ropeView';
import {
  AE_ATTACH,
  AE_CLING,
  AE_DIE,
  AE_FIRE,
  AE_JUMP,
  AE_LAND,
  AE_PERFECT,
  AE_RELEASE,
  landAmp,
} from '../adapters/render/animEvents';
import { CameraFx } from '../adapters/render/cameraFx';
import { DustPuff } from '../adapters/render/dustPuff';
import { GameLoop } from './loop';

const RESTART_ACCEPT_S = 0.3; // death: accept restart input after this
const RESTART_AUTO_S = 0.8; // death: auto-restart after this
const PAN_S = 2.5; // opening flyover from the goal back to the hero
const HEAD_FRAC = 0.9; // same aim-ray origin the sim uses (core/sim.ts)
const BEST_KEY = 'bhagdori.best.l1';

export type GameHandle = {
  pause: () => void;
  resume: () => void;
  restart: () => void;
  destroy: () => void;
};

const DEATH_MSG: Record<number, string> = {
  [DEAD_FELL]: 'Missed the roofs',
  [DEAD_WALL]: 'Too low: hit the wall too fast. Hold BRAKE to slow down',
  [DEAD_HARD_LANDING]: 'Too hard a landing',
  [DEAD_HAZARD]: 'Hit a hazard',
};

function loadBest(): number {
  try {
    const v = Number(localStorage.getItem(BEST_KEY));
    return Number.isFinite(v) && v > 0 ? v : 0;
  } catch {
    return 0;
  }
}

/** Best time for the lobby (0 = none yet). */
export function readBestTime(): number {
  return loadBest();
}

function saveBest(t: number): void {
  try {
    localStorage.setItem(BEST_KEY, String(t));
  } catch {
    // Private mode / blocked storage: best time just is not kept.
  }
}

function smooth(p: number): number {
  const c = p < 0 ? 0 : p > 1 ? 1 : p;
  return c * c * (3 - 2 * c);
}

// YAW CONVENTION (the one conversion between sim and camera rig).
// Sim: forward = (sin c, cos c) in (x, z), yaw 0 faces +z, +lookYaw increases c.
// Rig: look dir = (sin r, -cos r), yaw 0 faces -z, +r turns right.
// Matching look directions gives r = PI - c. That is a mirror, so two input
// signs flip with it: lookYaw (mouse right must turn the view right) and
// moveX (D/stick-right must move toward screen-right). Applied in onStep.
function camYawToRig(simCamYaw: number): number {
  return Math.PI - simCamYaw;
}

function mergeTuning(): Tuning {
  const src = tuningJson as unknown as Record<string, Record<string, number>>;
  const out = { ...DEFAULT_TUNING } as unknown as Record<string, Record<string, number>>;
  for (const key of Object.keys(out)) {
    const base = out[key];
    // Skip non-object keys (e.g. fixedHz): spreading a number yields {}
    // and would silently wipe the default (m1-review F14).
    if (typeof base !== 'object' || base === null) continue;
    out[key] = { ...base, ...src[key] };
  }
  const fixedHz = (tuningJson as unknown as { fixedHz?: number }).fixedHz;
  const merged = out as unknown as Tuning;
  if (typeof fixedHz === 'number') merged.fixedHz = fixedHz;
  return merged;
}

/** Copy a full camera pose (used for the prev/cur interpolation pair). */
function copyRig(dst: CameraRig, src: CameraRig): void {
  dst.pos.x = src.pos.x;
  dst.pos.y = src.pos.y;
  dst.pos.z = src.pos.z;
  dst.lookAt.x = src.lookAt.x;
  dst.lookAt.y = src.lookAt.y;
  dst.lookAt.z = src.lookAt.z;
  dst.focus.x = src.focus.x;
  dst.focus.y = src.focus.y;
  dst.focus.z = src.focus.z;
  dst.arm = src.arm;
  dst.yaw = src.yaw;
  dst.pitch = src.pitch;
  dst.fov = src.fov;
  dst.initialized = src.initialized;
}

type Phase = 'pan' | 'play' | 'dead' | 'won';

export function startGame(canvas: HTMLCanvasElement, root: HTMLElement): GameHandle {
  const cfg = mergeTuning();
  const world = loadWorldFromJson(levelText);
  const gs = createGameScene(canvas);
  const level = gs.buildWorld(world);
  window.addEventListener('resize', gs.resize);

  const heroView = new HeroView();
  gs.scene.add(heroView.group);
  const waypointView = new WaypointView();
  gs.scene.add(waypointView.group);
  const wpScreen = newWaypointScreen();
  const wpView = new Vector3();
  const ropeView = new RopeView();
  gs.scene.add(ropeView.group);
  const previewView = new AimPreviewView();
  gs.scene.add(previewView.group);
  const cameraFx = new CameraFx();
  const dust = new DustPuff();
  gs.scene.add(dust.mesh);
  const sfx = new Sfx();
  let animEv = 0;
  let animImpact = 0;
  // Debug HUD is opt-in via ?debug (plan section 8, m1-review F6).
  const debug = new URLSearchParams(location.search).has('debug');
  const hud = debug ? new DebugHud() : null;

  const prev = newHeroState();
  const cur = newHeroState();
  const frame = newInputFrame();
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const input = coarse ? new TouchInput(root) : new DesktopInput(canvas);

  // Camera poses for render interpolation: cur advances once per fixed step,
  // onRender lerps prev -> cur with alpha so the camera moves at the same
  // rate as the interpolated hero (m1-review F3).
  const curRig = new CameraRig();
  const prevRig = new CameraRig();
  const feet = new Vec3(0, 0, 0);
  const stepDt = 1 / cfg.fixedHz;
  const aim = new AimResult();
  const previewOut = new PreviewResult();
  const previewStep = 1 / cfg.aim.previewHz;
  let previewTarget = NO_ANCHOR; // anchor the reticle found this step (NO_ANCHOR = none)
  let previewId = NO_ANCHOR; // anchor the current previewOut belongs to
  let previewAcc = 0;

  let phase: Phase = 'pan';
  let panT = 0;
  let panSkip = false;
  let deadT = 0;
  let runT = 0;
  let nextRouteIndex = 0;
  let anyInput = false;
  let brakeLatch = false;
  let brakeWas = false;
  let userPaused = false;
  let best = loadBest();

  function resetHero(): void {
    copyHeroState(cur, newHeroState());
    cur.px = world.spawn.x;
    cur.py = world.spawn.y;
    cur.pz = world.spawn.z;
    cur.yaw = world.spawnYaw;
    cur.camYaw = world.spawnYaw;
    cur.camPitch = 0;
    // Frame the first route anchor so the start view already shows what to hook.
    const first = world.anchors[world.route[0]];
    if (first !== undefined) {
      const dx = first.px - cur.px;
      const dy = first.py - (cur.py + cfg.hero.height * HEAD_FRAC);
      const dz = first.pz - cur.pz;
      cur.camYaw = Math.atan2(dx, dz);
      cur.camPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
    }
    cur.grounded = 1;
    cur.mode = HERO_AIRBORNE;
    copyHeroState(prev, cur);
  }

  function tickCamera(): void {
    feet.x = cur.px;
    feet.y = cur.py;
    feet.z = cur.pz;
    const speed = Math.sqrt(cur.vx * cur.vx + cur.vz * cur.vz);
    updateCamera(curRig, feet, camYawToRig(cur.camYaw), cur.camPitch, speed, world.solids, cfg.camera);
  }

  const hudUi = new Hud(root, debug, () => restart());

  /** Canonical respawn: spawn point, zero velocity, hook idle, camera facing spawnYaw. */
  function restart(): void {
    resetHero();
    phase = 'play';
    deadT = 0;
    runT = 0;
    nextRouteIndex = 0;
    anyInput = false;
    brakeLatch = false;
    animEv = 0;
    animImpact = 0;
    previewTarget = NO_ANCHOR;
    previewId = NO_ANCHOR;
    hudUi.setAimReason('');
    cameraFx.reset();
    hudUi.hideToast();
    hudUi.hideWin();
    hudUi.objectiveIn();
    if (input instanceof TouchInput) input.reset();
    curRig.initialized = 0;
    tickCamera();
    copyRig(prevRig, curRig);
  }

  function onStep(): void {
    copyHeroState(prev, cur);
    input.sample(frame);
    frame.moveX = -frame.moveX;
    frame.lookYaw = -frame.lookYaw;

    if (phase === 'pan') {
      // Drain input so nothing pressed during the flyover fires on the first play tick.
      panT += stepDt;
      if (panSkip || panT >= PAN_S) {
        phase = 'play';
        anyInput = false;
        hudUi.objectiveIn();
      }
    } else if (phase === 'dead') {
      deadT += stepDt;
      const wants = anyInput || (frame.pressed & BTN_RESTART) !== 0;
      if (deadT >= RESTART_AUTO_S || (deadT >= RESTART_ACCEPT_S && wants)) {
        restart();
        return;
      }
    } else if (phase === 'play') {
      if (input instanceof TouchInput) {
        // One contextual button: HOOK (press) off the rope, BRAKE (hold) on it.
        const held = (frame.buttons & BTN_ACTION) !== 0;
        if (cur.mode === HERO_ATTACHED) {
          if (!held) brakeLatch = false;
          if (held && !brakeLatch) frame.buttons |= BTN_REEL;
        } else {
          brakeLatch = held; // still holding from the hook press: no brake until re-press
          if ((frame.pressed & BTN_ACTION) !== 0) {
            frame.pressed |= BTN_HOOK;
            frame.buttons |= BTN_HOOK;
          }
        }
        hudUi.setActionLabel(cur.mode === HERO_ATTACHED ? 'BRAKE' : 'HOOK');
      }
      step(cur, frame, world, cfg);
      runT += stepDt;

      const ev = cur.eventBits;
      if ((ev & HERO_EV_LANDED) !== 0) {
        animEv |= AE_LAND;
        if (-prev.vy > animImpact) animImpact = -prev.vy;
      }
      if ((ev & HERO_EV_RELEASED) !== 0) animEv |= AE_RELEASE;
      if ((ev & HERO_EV_HOOKED) !== 0) animEv |= AE_FIRE;
      if ((ev & HERO_EV_PERFECT) !== 0) {
        animEv |= AE_PERFECT; // the release camera kick (AE_RELEASE) fires too
        hudUi.pulseTimer();
      }
      if ((ev & HERO_EV_CLING) !== 0) animEv |= AE_CLING;
      if ((ev & HERO_EV_DIED) !== 0) animEv |= AE_DIE;
      if (prev.mode !== HERO_ATTACHED && cur.mode === HERO_ATTACHED) animEv |= AE_ATTACH;
      if (
        prev.grounded === 1 &&
        cur.grounded === 0 &&
        cur.mode === HERO_AIRBORNE &&
        cur.vy > 2 &&
        (ev & HERO_EV_RELEASED) === 0
      ) {
        animEv |= AE_JUMP;
      }

      if ((cur.eventBits & HERO_EV_HOOKED) !== 0) hudUi.fadeHint();
      if (cur.mode === HERO_ATTACHED) {
        const idx = world.route.indexOf(cur.hook.anchorId);
        if (idx >= 0 && idx + 1 > nextRouteIndex) {
          nextRouteIndex = idx + 1;
          hudUi.pulseTimer();
        }
      }
      if ((cur.eventBits & HERO_EV_DIED) !== 0) {
        phase = 'dead';
        deadT = 0;
        anyInput = false;
        hudUi.toast(DEATH_MSG[cur.deadCause] ?? 'You fell');
      } else if (
        cur.dead === 0 &&
        world.goal.max.y > world.goal.min.y &&
        aabbContainsPoint(world.goal, cur.px, cur.py, cur.pz)
      ) {
        phase = 'won';
        if (best === 0 || runT < best) {
          best = runT;
          saveBest(best);
        }
        hudUi.showWin(runT, best);
        hudUi.pulseTimer();
        if (document.pointerLockElement !== null) document.exitPointerLock();
      }
      updateReticle();
      updatePreview();
    } else {
      previewTarget = NO_ANCHOR;
    }

    copyRig(prevRig, curRig);
    tickCamera();
  }

  /** Gold + big when pickAnchor (same args the sim uses on press) finds a target. */
  function updateReticle(): void {
    previewTarget = NO_ANCHOR;
    if (phase !== 'play' || cur.mode === HERO_ATTACHED || cur.hook.state !== HOOK_IDLE) {
      hudUi.setReticle(0);
      hudUi.setAimReason('');
      return;
    }
    const cp = Math.cos(cur.camPitch);
    pickAnchorAssisted(
      world,
      cfg,
      cur.px,
      cur.py + cfg.rope.handToFeet,
      cur.pz,
      cur.px,
      cur.py + cfg.hero.height * HEAD_FRAC,
      cur.pz,
      Math.sin(cur.camYaw) * cp,
      Math.sin(cur.camPitch),
      Math.cos(cur.camYaw) * cp,
      cfg.rope.maxLen,
      coarse ? cfg.aim.magnetDegTouch : cfg.aim.magnetDegDesktop,
      aim,
    );
    if (aim.anchorId !== NO_ANCHOR) {
      hudUi.setAimReason('');
    } else {
      hudUi.setAimReason(
        aimReasonText(
          aimReason(
            world,
            cfg,
            cur.px,
            cur.py + cfg.rope.handToFeet,
            cur.pz,
            cur.px,
            cur.py + cfg.hero.height * HEAD_FRAC,
            cur.pz,
            Math.sin(cur.camYaw) * cp,
            Math.sin(cur.camPitch),
            Math.cos(cur.camYaw) * cp,
            cfg.rope.maxLen,
            coarse ? cfg.aim.magnetDegTouch : cfg.aim.magnetDegDesktop,
          ),
        ),
      );
    }
    hudUi.setReticle(aim.anchorId !== NO_ANCHOR ? 2 : 1);
    previewTarget = aim.anchorId;
  }

  /**
   * Re-predicts the shot at aim.previewHz (and at once when the target changes) while an anchor is
   * targeted and the hero may fire. Runs on scratch state inside previewShot: no events, no sim
   * writes, so nothing here can reach the AE_ mapping or the sfx.
   */
  function updatePreview(): void {
    if (previewTarget === NO_ANCHOR || cur.hookCd > 0 || cur.dead === 1) {
      previewId = NO_ANCHOR;
      return;
    }
    previewAcc += stepDt;
    if (previewTarget !== previewId || previewAcc >= previewStep) {
      previewAcc = 0;
      previewId = previewTarget;
      previewShot(cur, previewId, world, cfg, previewOut);
    }
  }

  // Pan camera scratch.
  const goalCx = (world.goal.min.x + world.goal.max.x) / 2;
  const goalCy = (world.goal.min.y + world.goal.max.y) / 2;
  const goalCz = (world.goal.min.z + world.goal.max.z) / 2;
  const hasGoal = world.goal.max.y > world.goal.min.y;
  const panStart = hasGoal
    ? new Vec3(goalCx + 14, goalCy + 16, goalCz - 16)
    : new Vec3(world.spawn.x + 14, world.spawn.y + 16, world.spawn.z - 30);

  /** Marker on the next route anchor, then the goal; hidden in pan/dead/won and within 3 m. */
  function updateWaypoint(fx: number, fy: number, fz: number): void {
    let tx = goalCx;
    let ty = goalCy;
    let tz = goalCz;
    let have = hasGoal;
    if (nextRouteIndex < world.route.length) {
      const a = world.anchors[world.route[nextRouteIndex]];
      if (a !== undefined) {
        tx = a.px;
        ty = a.py;
        tz = a.pz;
        have = true;
      }
    }
    const dx = tx - fx;
    const dy = ty - fy;
    const dz = tz - fz;
    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
    const show = have && phase === 'play' && dist >= WAYPOINT_HIDE_M;
    waypointView.update(show, tx, ty, tz, performance.now() / 1000);
    if (!show) {
      hudUi.setWaypoint(false, 0, 0, false, 0, '', false);
      return;
    }
    const cam = gs.camera;
    cam.updateMatrixWorld();
    wpView.set(tx, ty + 2.2, tz).applyMatrix4(cam.matrixWorldInverse);
    const w = window.innerWidth;
    const h = window.innerHeight;
    // Keep clear of the timer pill (top pad + timer height + 8).
    const top = Math.max(10, h * 0.028) + Math.max(32, h * 0.054) + 8;
    projectWaypoint(
      wpScreen,
      wpView.x,
      wpView.y,
      wpView.z,
      Math.tan((cam.fov * Math.PI) / 360),
      cam.near,
      w,
      h,
      top,
      28,
    );
    hudUi.setWaypoint(
      true,
      wpScreen.x,
      wpScreen.y,
      wpScreen.edge,
      wpScreen.angle,
      formatDistance(dist),
      wpScreen.x > w / 2,
    );
  }

  function onRender(alpha: number, frameDt: number): void {
    const hv = heroView.input;
    hv.brake = cur.mode === HERO_ATTACHED && (frame.buttons & BTN_REEL) !== 0;
    hv.rolling = cur.rollT > 0;
    hv.events = animEv;
    hv.ropeLen = cur.hook.len;
    hv.impact = animImpact;
    hv.win = phase === 'won' ? 1 : 0;
    hv.hookFlying = cur.hook.state === HOOK_FLYING ? 1 : 0;
    heroView.update(prev, cur, alpha, frameDt);

    // Hand = interpolated feet + handToFeet; rope and rope direction both hang off it.
    const gp = heroView.group.position;
    const hx = gp.x;
    const hy = gp.y + cfg.rope.handToFeet;
    const hz = gp.z;
    const hk = cur.hook;
    if (hk.state !== HOOK_IDLE) {
      const rx = hk.ax - hx;
      const ry = hk.ay - hy;
      const rz = hk.az - hz;
      const rl = Math.sqrt(rx * rx + ry * ry + rz * rz);
      if (rl > 1e-4) {
        hv.ropeDirX = rx / rl;
        hv.ropeDirY = ry / rl;
        hv.ropeDirZ = rz / rl;
      }
    } else {
      hv.ropeDirX = 0;
      hv.ropeDirY = 1;
      hv.ropeDirZ = 0;
    }
    if ((animEv & AE_LAND) !== 0 && (animImpact >= 3 || cur.rollT > 0)) {
      dust.trigger(gp.x, gp.y, gp.z, landAmp(animImpact));
    }
    if ((animEv & AE_JUMP) !== 0) dust.trigger(gp.x, gp.y, gp.z, 0.2);
    if ((animEv & AE_FIRE) !== 0) sfx.fire();
    if ((animEv & AE_ATTACH) !== 0) sfx.attach();
    if ((animEv & AE_LAND) !== 0) sfx.land(landAmp(animImpact));
    if ((animEv & AE_DIE) !== 0) sfx.die();
    if ((animEv & AE_DIE) !== 0 && cur.deadCause === 3) dust.trigger(gp.x, gp.y, gp.z, 1);
    dust.update(frameDt);
    if ((animEv & AE_ATTACH) !== 0) {
      ropeView.pulse(0.12 * Math.min(1, Math.max(0.4, cur.hook.v / 10)));
    }
    if (hv.brake && !brakeWas) ropeView.pulse(0.05);
    brakeWas = hv.brake;
    ropeView.update(hk, hx, hy, hz, cfg.rope.hookSpeed, frameDt);
    cameraFx.update(
      frameDt,
      animEv,
      animImpact,
      Math.sqrt(cur.vx * cur.vx + cur.vz * cur.vz),
      cur.deadCause,
    );
    const pa = previewId !== NO_ANCHOR && phase === 'play' ? world.anchors[previewId] : undefined;
    if (pa !== undefined && previewOut.outcome !== PREVIEW_NONE) {
      previewView.update(previewOut.outcome, hx, hy, hz, pa.px, pa.py, pa.pz, previewOut.x, previewOut.y, previewOut.z);
    } else {
      previewView.hide();
    }
    updateLevelView(level, performance.now() / 1000, nextRouteIndex);
    hudUi.setTime(runT);
    if (phase === 'pan') {
      hudUi.setReticle(0);
      hudUi.setAimReason('');
    }

    // Lerp the camera pose with the same alpha as the hero (m1-review F3).
    let camX = prevRig.pos.x + (curRig.pos.x - prevRig.pos.x) * alpha;
    let camY = prevRig.pos.y + (curRig.pos.y - prevRig.pos.y) * alpha;
    let camZ = prevRig.pos.z + (curRig.pos.z - prevRig.pos.z) * alpha;
    let lookX = prevRig.lookAt.x + (curRig.lookAt.x - prevRig.lookAt.x) * alpha;
    let lookY = prevRig.lookAt.y + (curRig.lookAt.y - prevRig.lookAt.y) * alpha;
    let lookZ = prevRig.lookAt.z + (curRig.lookAt.z - prevRig.lookAt.z) * alpha;
    const fov = prevRig.fov + (curRig.fov - prevRig.fov) * alpha;
    if (phase === 'pan') {
      const k = smooth((panT + alpha * stepDt) / PAN_S);
      camX = panStart.x + (camX - panStart.x) * k;
      camY = panStart.y + (camY - panStart.y) * k;
      camZ = panStart.z + (camZ - panStart.z) * k;
      lookX = world.spawn.x + (lookX - world.spawn.x) * k;
      lookY = world.spawn.y + (lookY - world.spawn.y) * k;
      lookZ = world.spawn.z + (lookZ - world.spawn.z) * k;
    }
    let fovOut = fov;
    if (phase !== 'pan') {
      camX += cameraFx.offX;
      camY += cameraFx.offY;
      lookY += 0.5 * cameraFx.offY;
      fovOut += cameraFx.fovAdd;
    }
    gs.camera.position.set(camX, camY, camZ);
    gs.camera.lookAt(lookX, lookY, lookZ);
    if (Math.abs(gs.camera.fov - fovOut) > 1e-3 && fovOut > 0) {
      gs.camera.fov = fovOut;
      gs.camera.updateProjectionMatrix();
    }
    updateWaypoint(hx, hy - cfg.rope.handToFeet, hz);
    if (input instanceof TouchInput) input.render();
    gs.render();
    const info = gs.renderer.info.render;
    hud?.update(cur, info.calls, info.triangles);
    animEv = 0;
    animImpact = 0;
  }

  // Any key / pointer: skips the opening flyover and accepts the death restart.
  const onAnyInput = (): void => {
    sfx.unlock();
    anyInput = true;
    if (phase === 'pan') panSkip = true;
  };
  window.addEventListener('keydown', onAnyInput, true);
  window.addEventListener('pointerdown', onAnyInput, true);
  // pointerup (not pointerdown) is the user activation on touch browsers.
  const onUnlockGesture = (): void => {
    sfx.unlock();
  };
  window.addEventListener('pointerup', onUnlockGesture, true);

  resetHero();
  tickCamera();
  copyRig(prevRig, curRig);

  const loop = new GameLoop({ fixedHz: cfg.fixedHz, onStep, onRender });
  loop.start();

  // Portrait on a touch device shows the rotate overlay: pause the sim and
  // clear input so a held thumb cannot drive the hero under the overlay
  // (m1-review F4). Landscape resumes.
  const portrait = window.matchMedia('(orientation: portrait) and (pointer: coarse)');
  const onOrientation = (e: MediaQueryListEvent): void => {
    if (e.matches) {
      loop.pause();
      if (input instanceof TouchInput) input.reset();
    } else if (!userPaused) {
      loop.resume();
    }
  };
  portrait.addEventListener('change', onOrientation);
  if (portrait.matches) {
    loop.pause();
    if (input instanceof TouchInput) input.reset();
  }

  return {
    pause(): void {
      userPaused = true;
      loop.pause();
      if (input instanceof TouchInput) input.reset();
    },
    resume(): void {
      userPaused = false;
      if (!portrait.matches) loop.resume();
    },
    restart,
    destroy(): void {
      loop.stop();
      window.removeEventListener('resize', gs.resize);
      window.removeEventListener('keydown', onAnyInput, true);
      window.removeEventListener('pointerdown', onAnyInput, true);
      window.removeEventListener('pointerup', onUnlockGesture, true);
      portrait.removeEventListener('change', onOrientation);
      input.dispose();
      hudUi.destroy();
      ropeView.dispose();
      previewView.dispose();
      sfx.dispose();
      waypointView.dispose();
      gs.scene.remove(waypointView.group);
      gs.scene.remove(heroView.group);
      gs.scene.remove(ropeView.group);
      gs.scene.remove(previewView.group);
      gs.scene.remove(dust.mesh);
      gs.dispose();
    },
  };
}
