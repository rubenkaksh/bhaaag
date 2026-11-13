import levelText from '../../content/levels/l1.json?raw';
import { resolveCfg } from './tuning';
import {
  copyHeroState,
  DEAD_FELL,
  DEAD_HARD_LANDING,
  DEAD_HAZARD,
  DEAD_WALL,
  HERO_AIRBORNE,
  HERO_ATTACHED,
  HERO_HANGING,
  HERO_EV_CLING,
  HERO_EV_DIED,
  HERO_EV_HOOKED,
  HERO_EV_LANDED,
  HERO_EV_PERFECT,
  HERO_EV_MANTLE,
  HERO_EV_VAULT,
  HERO_EV_SLIDE,
  HERO_EV_RELEASED,
  newHeroState,
} from '../core/hero';
import {
  HOOK_FLYING,
  HOOK_IDLE,
  NO_ANCHOR,
  AimResult,
  aimReason,
  lineAt,
  pickAnchorAssisted,
} from '../core/hook';
import { BTN_REEL, BTN_RESTART, newInputFrame, quantizeTurn } from '../core/input';
import { aabbContainsPoint } from '../core/math/aabb';
import { PreviewResult, PREVIEW_NONE, previewShot } from '../core/preview';
import { step } from '../core/sim';
import { Vec3 } from '../core/math/vec3';
import { loadWorldFromJson, loadWorldFromObject } from '../content/load';
import { STRATEGY_SEED, generateStrategyLevel } from '../content/strategy/gen';
import { builderPlayLevel } from '../content/builder/store';
import { DesktopInput } from '../adapters/input/desktop';
import { TouchInput, type ActionMode } from '../adapters/input/touch';
import { Sfx } from '../adapters/audio/sfx';
import { CameraRig, updateCamera } from '../adapters/render/cameraRig';
import { chaseRigYaw, tickYawOffsets } from '../adapters/render/cameraYaw';
import type { YawOffsets } from '../adapters/render/cameraYaw';
import {
  blendPose,
  newOverviewPose,
  overviewAvailable,
  overviewPose,
  overviewWeight,
  stepOverview,
} from '../adapters/render/overviewCam';
import type { Pt } from '../adapters/render/overviewCam';
import { pickAnchorAtNdc } from '../adapters/render/tapAim';
import { HeroView } from '../adapters/render/heroView';
import { updateLevelView } from '../adapters/render/levelView';
import type { VillageAssets } from './villageAssets';
import { createGameScene } from '../adapters/render/scene';
import { DebugHud } from '../adapters/ui/debugHud';
import { Hud } from '../adapters/ui/hud';
import { pickHintAnchor } from './hint';
import { altitudeFraction } from '../adapters/ui/progress';
import { aimReasonText } from '../adapters/ui/aimReasonText';
import { AimPreviewView } from '../adapters/render/aimPreviewView';
import { WaypointView } from '../adapters/render/waypointView';
import {
  formatDistance,
  newWaypointScreen,
  padHeightBelow,
  projectWaypoint,
  waypointTopPx,
  WAYPOINT_HIDE_M,
} from '../adapters/ui/waypointMath';
import { Color, DirectionalLight, Fog, Vector3 } from 'three';
import type { Group } from 'three';
import { ChaseState, DEAD_CAUGHT, chaseScore, chaseStep, newChaseState } from '../core/chase/chase';
import { routeIndexFor } from '../core/chase/chaseWorld';
import { cloudCoverFor } from '../core/chase/dragon';
import { GRADE as HILL_GRADE, hillY } from '../core/chase/rows';
import { ChaseRowsView } from '../adapters/render/chase/chaseRowsView';
import { DragonSpriteView } from '../adapters/render/chase/dragonSpriteView';
import { EndlessGround } from '../adapters/render/chase/endlessGround';
import { ChaseHud } from '../adapters/ui/chaseHud';
import { RopeView } from './ropeView';
import {
  AE_ATTACH,
  AE_CLING,
  AE_DIE,
  AE_FIRE,
  AE_JUMP,
  AE_LAND,
  AE_PERFECT,
  AE_MANTLE,
  AE_VAULT,
  AE_SLIDE,
  AE_RELEASE,
  landAmp,
} from '../adapters/render/animEvents';
import { CameraFx } from '../adapters/render/cameraFx';
import { DustPuff } from '../adapters/render/dustPuff';
import { GameLoop } from './loop';
import { framingFor } from '../adapters/render/framing';
import { MODE_INFO, graphIdOf, isGraphMode, readBest, writeBest } from './modes/mode';
import { loadGraph } from '../content/graph/registry';
import { placeGraph } from '../content/graph/place';
import type { GameMode } from './modes/mode';
import { readViewport, watchViewport } from './viewport';
import { viewportSize } from '../adapters/ui/orientation';
import type { ViewportLayout } from './viewport';

const RESTART_ACCEPT_S = 0.3; // death: accept restart input after this
const RESTART_AUTO_S = 0.8; // death: auto-restart after this
const PAN_S = 2.5; // opening flyover from the goal back to the hero
const CHASE_PAN_S = 3.2; // chase opening: the dragon reveal, then back behind the hero
const CHASE_OVER_DELAY_S = 1.1; // caught: the camera turns back before the card shows
const CLOUD_FOG_COLOR = '#cdd0da';
const cloudColor = new Color(CLOUD_FOG_COLOR);
const HEAD_FRAC = 0.9; // same aim-ray origin the sim uses (core/sim.ts)

export type GameHandle = {
  mode: GameMode;
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
  [DEAD_CAUGHT]: 'The dragon caught you',
};

/** Best time for the lobby (0 = none yet). Thin wrapper kept for older callers. */
export function readBestTime(): number {
  return readBest('classic');
}

function smooth(p: number): number {
  const c = p < 0 ? 0 : p > 1 ? 1 : p;
  return c * c * (3 - 2 * c);
}

const DEG2RAD = Math.PI / 180;

// YAW CONVENTION (the one conversion between sim and camera rig).
// Sim: forward = (sin c, cos c) in (x, z), yaw 0 faces +z, no player view control (the sim camYaw is fixed).
// Rig: look dir = (sin r, -cos r), yaw 0 faces -z, +r turns right.
// Matching look directions gives r = PI - c. That is a mirror, so moveX flips with it
// (D/stick-right must move toward screen-right). Applied in onStep.
function camYawToRig(simCamYaw: number): number {
  return Math.PI - simCamYaw;
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

export function startGame(
  canvas: HTMLCanvasElement,
  root: HTMLElement,
  mode: GameMode = 'classic',
  village?: VillageAssets,
): GameHandle {
  const cfg = resolveCfg(mode);
  let camCfg = cfg.camera;
  const params = new URLSearchParams(location.search);
  // ?tilt=15|20|30: render-only camera pitch-down (deg) so more of the drop below shows. Default is camera.tiltDeg (global).
  const tiltParam = Number(params.get('tilt'));
  const tiltDeg = params.has('tilt') && Number.isFinite(tiltParam) ? tiltParam : cfg.camera.tiltDeg;
  const camTilt = Math.min(Math.max(tiltDeg, 0), 45) * DEG2RAD;
  const isChase = mode === 'chase';
  const isStrategy = mode === 'strategy';
  const isVillage = mode === 'village';
  const isGraph = isGraphMode(mode);
  const placed = isGraph ? placeGraph(loadGraph(graphIdOf(mode))) : null;
  if (isVillage && village === undefined) throw new Error('village assets not loaded');
  const seedParam = params.get('seed');
  const fixedSeed = seedParam !== null && Number.isFinite(Number(seedParam));
  let chaseSeed = fixedSeed ? Number(seedParam) | 0 : (Math.random() * 2147483647) | 0;
  const gapParam = Number(params.get('dragonGap'));
  if (isChase && params.has('dragonGap') && Number.isFinite(gapParam) && gapParam > 0) {
    cfg.chase.startGap = gapParam;
  }
  let cs: ChaseState | null = isChase ? newChaseState(chaseSeed, 0, cfg) : null;
  let world =
    cs !== null
      ? cs.rw.world
      : placed !== null
        ? loadWorldFromObject(placed.level)
        : isStrategy
          ? loadWorldFromObject(
              builderPlayLevel(params) ??
                generateStrategyLevel(fixedSeed ? Number(seedParam) | 0 : STRATEGY_SEED),
            )
          : loadWorldFromJson(village !== undefined && isVillage ? village.villageText : levelText);
  const gs = createGameScene(canvas);
  const level: Group | null =
    cs === null
      ? gs.buildWorld(world, {
          houseDress: placed === null,
          graph:
            placed === null
              ? undefined
              : {
                  houses: placed.houses,
                  props: placed.props,
                  profile: placed.profile,
                  seed: placed.seed,
                  patches: placed.patches,
                },
          floorY: village !== undefined && isVillage ? village.VILLAGE_CLOUD_TOP_Y : undefined,
        })
      : null;
  // Chase views: no classic scenery; own rows, endless ground and dragon.
  if (cs !== null) gs.setBlobWorld(world);
  const rowsView = isChase ? new ChaseRowsView(() => gs.refreshFlags()) : null;
  const treesFor = (t: string): number => (t === 'low' ? 8 : t === 'medium' ? 16 : 26);
  let viewTier = gs.getTier();
  let ground = isChase ? new EndlessGround(treesFor(viewTier)) : null;
  const dragonView = isChase ? new DragonSpriteView(viewTier) : null;
  if (village !== undefined && isVillage) {
    gs.scene.add(village.buildCloudSea(viewTier));
    const banks = village.buildCloudBanks(world.solids, world.style);
    if (banks !== null) gs.scene.add(banks);
  }
  if (rowsView !== null) gs.scene.add(rowsView.root);
  if (ground !== null) gs.scene.add(ground.group);
  if (dragonView !== null) gs.scene.add(dragonView.group);
  let sunLight: DirectionalLight | null = null;
  gs.scene.traverse((o) => {
    if (sunLight === null && o instanceof DirectionalLight) sunLight = o;
  });
  const fogBase = { near: 0, far: 0, color: '' };
  let sunBase = 0;
  let baseTier = '';
  let cloudK = 0;
  let roared = false;
  let windT = 0;
  let overShown = false;
  let overAtT = 0; // deadT when the game-over card was shown
  const headScr = { x: 0.5, y: 0.5 };

  const heroView = new HeroView();
  gs.scene.add(heroView.group);
  const waypointView = new WaypointView();
  gs.scene.add(waypointView.group);
  const wpScreen = newWaypointScreen();
  const wpView = new Vector3();
  const ropeView = new RopeView(world.lineOnly === 1);
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
  // Debug-only (with ?debug): &catchHold=1 freezes the catch beat at k = 1, card never shows.
  const catchHold = debug && new URLSearchParams(location.search).has('catchHold');
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
  let brakeWas = false;
  let viewport: ViewportLayout = readViewport();
  let lensShiftPx = 0;
  // Hold-to-zoom-out bird's eye (MAP button / L or M key): k eases 0..1 per fixed tick, render-only.
  let ovHeld = false;
  let ovK = 0;
  let ovLit = false;
  let ovEnabled = true; // MAP button enabled (grounded or riding the rope)
  const ovFollow = newOverviewPose();
  const ovTarget = newOverviewPose();
  const ovAhead: Pt[] = [];
  const yawOff: YawOffsets = { zip: 0, side: 0 }; // auto camera yaw offsets (rig radians): zipline diagonal + side look (T300)
  let hintId = NO_ANCHOR; // anchor highlighted by HINT (T299); render-only, never read by the sim
  let hintT = 0;
  let tapAnchor = NO_ANCHOR; // anchor picked by tap-to-aim, sticky until fired or cleared
  let aimYaw = 0;
  let aimPitch = 0;
  let aimId = NO_ANCHOR;
  let jsMs = 0;
  let stepMs = 0;
  let best = readBest(mode);

  function resetHero(): void {
    copyHeroState(cur, newHeroState());
    cur.px = world.spawn.x;
    cur.py = world.spawn.y;
    cur.pz = world.spawn.z;
    cur.yaw = world.spawnYaw;
    // Fixed view: no player view control, so the sim camera never changes after this.
    // Camera sits BEHIND the hero looking downhill (Chase frontPov 1 flips it ahead, see tickCamera).
    cur.camYaw = world.spawnYaw;
    cur.camPitch = cfg.camera.frontPitchDeg * DEG2RAD;
    yawOff.zip = 0;
    yawOff.side = 0;
    ovHeld = false;
    ovK = 0;
    ovLit = false;
    hudUi.setOverviewActive(false);
    hintId = NO_ANCHOR;
    hintT = 0;
    tapAnchor = NO_ANCHOR;
    hudUi.setHintActive(false);
    cur.grounded = 1;
    cur.mode = HERO_AIRBORNE;
    copyHeroState(prev, cur);
  }

  function tickCamera(): void {
    feet.x = cur.px;
    feet.y = cur.py;
    feet.z = cur.pz;
    const speed = Math.sqrt(cur.vx * cur.vx + cur.vz * cur.vz);
    // One camera path for every mode: base rig yaw, then the shared auto yaw offsets (zip + side look).
    // Chase frontPov 0 (default) is the behind view, same rig as classic (r = PI - c), looking
    // downhill along the run; frontPov 1 is the old camera ahead of the hero, tilted up the slope.
    const front = isChase && cfg.chase.frontPov >= 0.5;
    const base = isChase ? chaseRigYaw(cur.camYaw, cfg.chase.frontPov) : camYawToRig(cur.camYaw);
    tickYawOffsets(
      yawOff,
      base,
      cur.vx,
      cur.vz,
      cur.mode === HERO_ATTACHED,
      cur.dead !== 0,
      camCfg,
    );
    updateCamera(
      curRig,
      feet,
      base + yawOff.zip + yawOff.side,
      cur.camPitch - camTilt + (front ? 0.14 : 0),
      speed,
      world.solids,
      camCfg,
    );
    if (ovK > 0) applyOverview(base);
  }

  /** Blend the follow pose toward the bird's eye pose: hero + the path ahead (next anchors, pads, finish). */
  function applyOverview(baseYaw: number): void {
    const fx = Math.sin(baseYaw);
    const fz = -Math.cos(baseYaw);
    let n = 0;
    const add = (x: number, y: number, z: number): void => {
      // Only what lies ahead of the hero along the view direction (a little behind is fine).
      if ((x - cur.px) * fx + (z - cur.pz) * fz >= -4) {
        if (n === ovAhead.length) ovAhead.push({ x: 0, y: 0, z: 0 });
        const p = ovAhead[n++];
        p.x = x;
        p.y = y;
        p.z = z;
      }
    };
    const first = cs !== null ? 0 : nextRouteIndex;
    for (let i = first; i < world.route.length; i++) {
      const a = world.anchors[world.route[i]];
      if (a !== undefined) add(a.px, a.py, a.pz);
    }
    for (let i = 0; i < world.pads.length; i++) {
      const b = world.pads[i];
      add((b.min.x + b.max.x) / 2, b.max.y, (b.min.z + b.max.z) / 2);
    }
    if (hasGoal) add(goalCx, goalCy, goalCz);
    ovAhead.length = n; // keep the pool small; entries are re-created on demand
    ovFollow.px = curRig.pos.x;
    ovFollow.py = curRig.pos.y;
    ovFollow.pz = curRig.pos.z;
    ovFollow.lx = curRig.lookAt.x;
    ovFollow.ly = curRig.lookAt.y;
    ovFollow.lz = curRig.lookAt.z;
    overviewPose(feet, ovAhead, baseYaw, camCfg, ovTarget);
    blendPose(ovFollow, ovTarget, overviewWeight(ovK));
    curRig.pos.x = ovFollow.px;
    curRig.pos.y = ovFollow.py;
    curRig.pos.z = ovFollow.pz;
    curRig.lookAt.x = ovFollow.lx;
    curRig.lookAt.y = ovFollow.ly;
    curRig.lookAt.z = ovFollow.lz;
  }

  const hudUi = new Hud(root, debug, () => restart(), {
    hint: MODE_INFO[mode].hint,
    hopChip: MODE_INFO[mode].hopChip,
    onHint: isStrategy || isGraph ? null : showHint,
    onOverview: setOverviewHeld,
  });
  // Cloud Village never showed the reticle (its tilted view has no aim dot); every other mode keeps
  // it, including the gold target-found state. The HUD hides it while the overview is held.
  if (isVillage && camTilt > 0) hudUi.hideReticle();
  const chaseHud = isChase ? new ChaseHud(root, () => restart()) : null;

  /** MAP button / L / M key: hold = zoom out to the bird's eye view, release = ease back. */
  function setOverviewHeld(held: boolean): void {
    ovHeld = held && !(phase === 'dead' && cs !== null);
  }

  /** HINT: highlight the best takeable zipline anchor for hintSec. No sim state is touched. */
  function showHint(): void {
    if (phase !== 'play' || world.lineOnly === 1) return;
    const id = pickHintAnchor(
      world,
      cfg,
      cur.px,
      cur.py,
      cur.pz,
      nextRouteIndex,
      coarse ? cfg.aim.magnetDegTouch : cfg.aim.magnetDegDesktop,
    );
    if (id === NO_ANCHOR) {
      hudUi.toast('No zipline in reach');
      return;
    }
    hintId = id;
    hintT = cfg.aim.hintSec;
    tapAnchor = id; // desktop HOOK fires at the hinted anchor
    hudUi.setHintActive(true);
  }

  /** Canonical respawn: spawn point, zero velocity, hook idle, camera facing spawnYaw. */
  function restart(): void {
    if (cs !== null) {
      if (!fixedSeed) chaseSeed = (Math.random() * 2147483647) | 0;
      cs = newChaseState(chaseSeed, 0, cfg);
      world = cs.rw.world;
      gs.setBlobWorld(world);
      rowsView?.invalidate();
      ground?.snap(0, true);
      roared = false;
      overShown = false;
      cloudK = 0;
      chaseHud?.hideOver();
    }
    resetHero();
    phase = 'play';
    deadT = 0;
    runT = 0;
    nextRouteIndex = 0;
    anyInput = false;
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
    const t0 = debug ? performance.now() : 0;
    stepBody();
    if (debug) stepMs += performance.now() - t0;
  }

  function stepBody(): void {
    copyHeroState(prev, cur);
    input.sample(frame);
    frame.moveX = -frame.moveX;
    // Overview (hold MAP): only grounded on a roof or riding the rope; elsewhere it releases and eases back.
    const ovOk = overviewAvailable(cur.mode);
    if (ovOk !== ovEnabled) {
      ovEnabled = ovOk;
      hudUi.setOverviewEnabled(ovOk);
    }
    const ovOn = ovHeld && ovOk;
    ovK = stepOverview(ovK, ovOn, camCfg);
    if (ovOn !== ovLit) {
      ovLit = ovOn;
      hudUi.setOverviewActive(ovOn);
    }

    if (phase === 'pan') {
      // Drain input so nothing pressed during the flyover fires on the first play tick.
      panT += stepDt;
      if (panSkip || panT >= (cs !== null ? CHASE_PAN_S : PAN_S)) {
        phase = 'play';
        anyInput = false;
        hudUi.objectiveIn();
      }
    } else if (phase === 'dead') {
      deadT += stepDt;
      if (cs !== null) {
        // Chase: the card owns the restart (RETRY / MENU); R also retries. No auto-restart.
        if (
          !overShown &&
          !catchHold &&
          deadT >= (cur.deadCause === DEAD_CAUGHT ? CHASE_OVER_DELAY_S : 0.4)
        ) {
          showChaseOver();
        }
        if (overShown && (frame.pressed & BTN_RESTART) !== 0) {
          restart();
          return;
        }
      } else {
        const wants = anyInput || (frame.pressed & BTN_RESTART) !== 0;
        if (deadT >= RESTART_AUTO_S || (deadT >= RESTART_ACCEPT_S && wants)) {
          restart();
          return;
        }
      }
    } else if (phase === 'play') {
      if (input instanceof TouchInput) {
        // One right-hand button; its press mapping lives in TouchInput (docs/controls.md).
        let mode: ActionMode = 'jump';
        if (cur.mode === HERO_ATTACHED) mode = 'brake';
        else if (cur.mode === HERO_HANGING && cur.hasLedge === 1) mode = 'climb';
        else if (
          world.lineOnly === 1 &&
          cur.grounded === 1 &&
          lineAt(world, cfg, cur.px, cur.py, cur.pz) >= 0
        ) {
          mode = 'hook';
        }
        input.actionMode = mode;
        hudUi.setActionDim(cur.mode === HERO_ATTACHED); // JUMP is ignored on the rope (T303)
        hudUi.setActionLabel(mode.toUpperCase());
      }
      if (hintId !== NO_ANCHOR) {
        hintT -= stepDt;
        if (hintT <= 0 || cur.mode === HERO_ATTACHED) {
          hintId = NO_ANCHOR;
          hudUi.setHintActive(false);
        }
      }
      consumeTap();
      computeAim();
      if (aimId !== NO_ANCHOR && cur.mode !== HERO_ATTACHED) {
        frame.hasAim = 1;
        frame.aimYaw = quantizeTurn(aimYaw);
        frame.aimPitch = quantizeTurn(aimPitch);
      }
      step(cur, frame, world, cfg);
      if ((cur.eventBits & HERO_EV_HOOKED) !== 0 || cur.mode === HERO_ATTACHED)
        tapAnchor = NO_ANCHOR;
      if (cs !== null) chaseStep(cs, cur, world, cfg);
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
      if ((ev & HERO_EV_MANTLE) !== 0) animEv |= AE_MANTLE;
      if ((ev & HERO_EV_VAULT) !== 0) animEv |= AE_VAULT;
      if ((ev & HERO_EV_SLIDE) !== 0) animEv |= AE_SLIDE;
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
      if (cs !== null) {
        nextRouteIndex = routeIndexFor(cs.rw, cs.heroRow);
      } else if (cur.mode === HERO_ATTACHED) {
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
        if (cs === null) hudUi.toast(DEATH_MSG[cur.deadCause] ?? 'You fell');
      } else if (
        cs === null &&
        cur.dead === 0 &&
        world.goal.max.y > world.goal.min.y &&
        aabbContainsPoint(world.goal, cur.px, cur.py, cur.pz)
      ) {
        phase = 'won';
        if (best === 0 || runT < best) {
          best = runT;
          writeBest(mode, best);
        }
        hudUi.showWin(runT, best);
        hudUi.pulseTimer();
      }
      updateReticle();
      updatePreview();
    } else {
      previewTarget = NO_ANCHOR;
    }

    copyRig(prevRig, curRig);
    tickCamera();
  }

  function showChaseOver(): void {
    if (cs === null || chaseHud === null) return;
    overShown = true;
    overAtT = deadT;
    const score = chaseScore(cs, cfg);
    const isBest = score > best;
    if (isBest) {
      best = score;
      writeBest('chase', score);
    }
    chaseHud.showOver(
      score,
      cs.maxProgress,
      cs.hops,
      best,
      isBest,
      DEATH_MSG[cur.deadCause] ?? 'You fell',
    );
  }

  /** Fog, sun and the white-out layer follow the dragon's gap (setCloudCover only dims sky clouds). */
  function applyCloud(k: number): void {
    const fog = gs.scene.fog;
    if (!(fog instanceof Fog)) return;
    const tier = gs.getTier();
    if (tier !== baseTier) {
      // applyConfig just reset fog and sun for the new tier: re-capture the pristine values.
      baseTier = tier;
      fogBase.near = fog.near;
      fogBase.far = fog.far;
      fogBase.color = '#' + fog.color.getHexString();
      sunBase = sunLight !== null ? (sunLight as DirectionalLight).intensity : 0;
    }
    fog.near = fogBase.near * (1 - 0.92 * k);
    fog.far = fogBase.far * (1 - 0.85 * k) + 40 * k;
    fog.color.set(fogBase.color).lerp(cloudColor, k);
    if (sunLight !== null) (sunLight as DirectionalLight).intensity = sunBase * (1 - 0.55 * k);
    chaseHud?.setCloud(k);
  }

  /** Gold + big when pickAnchor (same args the sim uses on press) finds a target. */
  function isLineOnly(): boolean {
    return world.lineOnly === 1;
  }

  /** Tap on an anchor = aim at it (touch). The tap is consumed either way. */
  function consumeTap(): void {
    if (!(input instanceof TouchInput) || !input.tapPending) return;
    input.tapPending = false;
    if (ovK > 0.05 || isLineOnly()) return; // zoomed out: a tap never aims
    if (cur.mode === HERO_ATTACHED) return;
    const i = pickAnchorAtNdc(
      gs.camera,
      world.anchors,
      input.tapNdcX,
      input.tapNdcY,
      gs.camera.aspect,
      cfg.aim.tapRadiusNdc,
      cur.px,
      cur.py,
      cur.pz,
      cfg.rope.maxLen * 1.5,
    );
    tapAnchor = i < 0 ? NO_ANCHOR : i;
  }

  /**
   * Aim without a look control: the tapped anchor, else the glowing next route anchor. Writes
   * aimId / aimYaw / aimPitch (direction from the head); with no target the fixed front view.
   */
  function computeAim(): void {
    if (isLineOnly()) {
      // Strategy levels: ziplines are fixed (line zones), aim is bypassed entirely.
      aimId = NO_ANCHOR;
      aimYaw = cur.camYaw;
      aimPitch = cur.camPitch;
      return;
    }
    let id = tapAnchor;
    if (id === NO_ANCHOR) {
      const r = world.route[nextRouteIndex];
      id = r === undefined ? NO_ANCHOR : r;
    }
    aimId = id;
    aimYaw = cur.camYaw;
    aimPitch = cur.camPitch;
    if (id === NO_ANCHOR) return;
    const a = world.anchors[id];
    if (a === undefined) {
      aimId = NO_ANCHOR;
      return;
    }
    const dx = a.px - cur.px;
    const dy = a.py - (cur.py + cfg.hero.height * HEAD_FRAC);
    const dz = a.pz - cur.pz;
    aimYaw = Math.atan2(dx, dz);
    aimPitch = Math.atan2(dy, Math.sqrt(dx * dx + dz * dz));
  }

  function updateReticle(): void {
    previewTarget = NO_ANCHOR;
    if (
      phase !== 'play' ||
      isLineOnly() ||
      cur.mode === HERO_ATTACHED ||
      cur.hook.state !== HOOK_IDLE
    ) {
      hudUi.setReticle(0);
      hudUi.setAimReason('');
      return;
    }
    computeAim();
    const cp = Math.cos(aimPitch);
    pickAnchorAssisted(
      world,
      cfg,
      cur.px,
      cur.py + cfg.rope.handToFeet,
      cur.pz,
      cur.px,
      cur.py + cfg.hero.height * HEAD_FRAC,
      cur.pz,
      Math.sin(aimYaw) * cp,
      Math.sin(aimPitch),
      Math.cos(aimYaw) * cp,
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
            Math.sin(aimYaw) * cp,
            Math.sin(aimPitch),
            Math.cos(aimYaw) * cp,
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

  // Chase pan: start in front of the dragon's head and look up its body, then settle behind the hero.
  const chasePanStart = new Vec3(46, 18, -44);
  const chasePanLook = new Vec3(0, 24, cfg.chase.startGap + 34);

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
    const wpIdx = cs !== null ? 0 : nextRouteIndex; // chase: route[0] is always the next row
    if (hintId !== NO_ANCHOR) {
      const a = world.anchors[hintId];
      if (a !== undefined) {
        tx = a.px;
        ty = a.py;
        tz = a.pz;
        have = true;
      }
    } else if (wpIdx < world.route.length) {
      const a = world.anchors[world.route[wpIdx]];
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
    waypointView.update(
      show,
      tx,
      ty,
      tz,
      padHeightBelow(world.solids, tx, ty, tz),
      performance.now() / 1000,
    );
    if (!show) {
      hudUi.setWaypoint(false, 0, 0, false, 0, '', false);
      return;
    }
    const cam = gs.camera;
    cam.updateMatrixWorld();
    wpView.set(tx, ty + 2.2, tz).applyMatrix4(cam.matrixWorldInverse);
    const { w, h } = viewportSize();
    // Keep clear of the timer pill.
    const top = waypointTopPx(w, h, viewport.orientation === 'portrait');
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
      lensShiftPx,
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

  /** Chase-only per-frame work: streamed rows, ground, dragon, cloud cover, HUD, backdrop. */
  function renderChase(nowSec: number, frameDt: number): void {
    const c = cs;
    if (c === null || rowsView === null || ground === null || dragonView === null) return;
    if (gs.getTier() !== viewTier) {
      viewTier = gs.getTier();
      dragonView.setTier(viewTier);
      gs.scene.remove(ground.group);
      ground.dispose();
      ground = new EndlessGround(treesFor(viewTier));
      gs.scene.add(ground.group);
      rowsView.invalidate();
    }
    rowsView.sync(c.rw);
    rowsView.update(nowSec, routeIndexFor(c.rw, c.heroRow));
    ground.snap(heroView.group.position.z);
    const d = c.dragon;
    // Reversed chase camera: the real dragon is already in front of the rig, no pinning.
    dragonView.update(
      d.z,
      nowSec,
      phase === 'dead' && cur.deadCause === DEAD_CAUGHT ? 1 : 0,
      cur.px,
      d.gap,
      gs.camera.position.z,
      false,
    );
    const k = phase === 'pan' ? 0 : cloudCoverFor(d.gap, cfg);
    cloudK = k;
    applyCloud(cloudK);
    // Distant scenery rides along with the descent so the endless slope never leaves it behind.
    const bz = heroView.group.position.z;
    gs.backdropRoot.position.set(0, HILL_GRADE * bz, bz);
    if (!roared && d.gap < cfg.chase.fogGap && phase === 'play') {
      roared = true;
      sfx.roar();
    }
    windT -= frameDt;
    if (windT <= 0 && phase === 'play') {
      windT = 0.35;
      sfx.wind(k);
    }
    const score = chaseScore(c, cfg);
    chaseHud?.setScore(score, c.maxProgress);
    chaseHud?.setGap((d.gap - cfg.chase.catchGap) / (cfg.chase.startGap - cfg.chase.catchGap));
  }

  function onRender(alpha: number, frameDt: number): void {
    const r0 = debug ? performance.now() : 0;
    const hv = heroView.input;
    hv.brake = cur.mode === HERO_ATTACHED && (frame.buttons & BTN_REEL) !== 0;
    hv.rolling = cur.rollT > 0;
    hv.sliding = cur.slideT > 0;
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
      previewView.update(
        previewOut.outcome,
        hx,
        hy,
        hz,
        pa.px,
        pa.py,
        pa.pz,
        previewOut.x,
        previewOut.y,
        previewOut.z,
      );
    } else {
      previewView.hide();
    }
    const nowSec = performance.now() / 1000;
    if (cs !== null && rowsView !== null && ground !== null && dragonView !== null) {
      renderChase(nowSec, frameDt);
    } else if (level !== null) {
      updateLevelView(level, nowSec, nextRouteIndex, hintId);
      hudUi.setTime(runT);
      hudUi.setHop(nextRouteIndex, world.route.length);
      hudUi.setAltitude(altitudeFraction(cur.py, world.spawn.y, hasGoal ? goalCy : world.spawn.y));
    }
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
      const k = smooth((panT + alpha * stepDt) / (cs !== null ? CHASE_PAN_S : PAN_S));
      const ps = cs !== null ? chasePanStart : panStart;
      const pl = cs !== null ? chasePanLook : world.spawn;
      camX = ps.x + (camX - ps.x) * k;
      camY = ps.y + (camY - ps.y) * k;
      camZ = ps.z + (camZ - ps.z) * k;
      lookX = pl.x + (lookX - pl.x) * k;
      lookY = pl.y + (lookY - pl.y) * k;
      lookZ = pl.z + (lookZ - pl.z) * k;
    } else if (cs !== null && phase === 'dead' && cur.deadCause === DEAD_CAUGHT) {
      // Caught: swing round in front of the hero and look back up at the jaws.
      const k = smooth((deadT + alpha * stepDt) / CHASE_OVER_DELAY_S);
      const dz = cs.dragon.z;
      camX += (cur.px + 7 - camX) * k;
      camY += (cur.py + 5 - camY) * k;
      camZ += (cur.pz - 11 - camZ) * k;
      lookX += (0 - lookX) * k;
      lookY += (hillY(dz) + 14 - lookY) * k;
      lookZ += (dz + 6 - lookZ) * k;
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
    if (debug) {
      jsMs += (stepMs + (performance.now() - r0) - jsMs) * 0.1;
      stepMs = 0;
    }
    if (dragonView !== null) {
      if (phase === 'dead' && cur.deadCause === DEAD_CAUGHT) {
        const t = deadT + alpha * stepDt;
        const ck = Math.min(1, Math.max(0, t / CHASE_OVER_DELAY_S));
        const cSettle = overShown ? Math.min(1, Math.max(0, (t - overAtT) / 0.35)) : 0;
        dragonView.setCatch(gs.camera, ck, cSettle, nowSec);
        gs.setBloomScale(ck > 0 ? 0 : 1); // painted face must not bloom to white (High tier)
        dragonView.headScreen(gs.camera, headScr);
        chaseHud?.setCatch(ck, cSettle, headScr.x, headScr.y);
      } else {
        dragonView.setCatch(gs.camera, 0, 0, nowSec);
        gs.setBloomScale(1);
        chaseHud?.setCatch(0, 0, 0.5, 0.5);
      }
    }
    gs.render();
    if (debug) {
      const extra =
        cs !== null && rowsView !== null
          ? {
              rows: rowsView.rebuilds,
              rebuildMs: rowsView.lastRebuildMs,
              dragonGap: cs.dragon.gap,
              heroRow: cs.heroRow,
              newest: cs.rw.newest,
              score: chaseScore(cs, cfg),
              cloud: cloudK,
            }
          : {};
      (window as unknown as { __ztStats?: unknown }).__ztStats = {
        ...gs.frameStats(),
        jsMs,
        ...extra,
      };
    }
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
  const onHintKey = (e: KeyboardEvent): void => {
    if (e.code === 'KeyH' && !e.repeat && !isStrategy && !isGraph) showHint();
    if ((e.code === 'KeyL' || e.code === 'KeyM') && !e.repeat) setOverviewHeld(true);
  };
  const onMapKeyUp = (e: KeyboardEvent): void => {
    if (e.code === 'KeyL' || e.code === 'KeyM') setOverviewHeld(false);
  };
  const onBlurRelease = (): void => setOverviewHeld(false);
  window.addEventListener('keydown', onHintKey);
  window.addEventListener('keyup', onMapKeyUp);
  window.addEventListener('blur', onBlurRelease);
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

  // Portrait and landscape are both playable: re-frame on every viewport change.
  const applyViewport = (v: ViewportLayout, flipped: boolean): void => {
    viewport = v;
    gs.resize();
    const fr = framingFor(v, cfg.camera);
    camCfg = fr.camera;
    gs.setLensShift(fr.lensShiftY);
    lensShiftPx = -fr.lensShiftY * v.h; // positive view offset moves the image up
    document.documentElement.style.setProperty('--lens-shift', String(fr.lensShiftY));
    if (flipped && input instanceof TouchInput) input.reset();
  };
  applyViewport(viewport, false);
  const unwatchViewport = watchViewport(applyViewport);

  return {
    mode,
    pause(): void {
      loop.pause();
      if (input instanceof TouchInput) input.reset();
    },
    resume(): void {
      loop.resume();
    },
    restart,
    destroy(): void {
      loop.stop();
      unwatchViewport();
      window.removeEventListener('keydown', onHintKey);
      window.removeEventListener('keyup', onMapKeyUp);
      window.removeEventListener('blur', onBlurRelease);
      window.removeEventListener('keydown', onAnyInput, true);
      window.removeEventListener('pointerdown', onAnyInput, true);
      window.removeEventListener('pointerup', onUnlockGesture, true);
      input.dispose();
      hudUi.destroy();
      chaseHud?.destroy();
      if (rowsView !== null) {
        gs.scene.remove(rowsView.root);
        rowsView.dispose();
      }
      if (ground !== null) {
        gs.scene.remove(ground.group);
        ground.dispose();
      }
      if (dragonView !== null) {
        gs.scene.remove(dragonView.group);
        dragonView.dispose();
        gs.setBloomScale(1);
      }
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
