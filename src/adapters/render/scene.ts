import {
  ACESFilmicToneMapping,
  DirectionalLight,
  Group,
  Fog,
  HemisphereLight,
  Material,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  NoToneMapping,
  Object3D,
  PCFShadowMap,
  PerspectiveCamera,
  Scene,
  Texture,
  Vector2,
  Vector3,
  WebGLRenderer,
  MeshLambertMaterial,
} from 'three';
import type { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { createComposer } from './postFx';
import { buildBlob, placeBlob } from './blob';
import type { World } from '../../core/world';
import { buildLevelMeshes } from './levelView';
import { buildDust, buildSkyView, updateDust } from './skyView';
import {
  GRAPHICS_TIER_EVENT,
  isTierAuto,
  loadGraphicsTier,
  parseTier,
  pixelRatioFor,
  renderConfigFor,
} from './graphicsTier';
import type { GraphicsTier, RenderConfig } from './graphicsTier';

export { pixelRatioFor };

function coarsePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

export type GameScene = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  /**
   * Empty group for distant scenery (Himalaya range, hills: render/backdrop.ts). Children are
   * never given shadow flags and the group is not moved; add meshes built for `getTier()`.
   */
  backdropRoot: Group;
  getTier: () => GraphicsTier;
  /** Applies a tier live (also driven by the GRAPHICS_TIER_EVENT window event). */
  setTier: (tier: GraphicsTier) => void;
  resize: () => void;
  /** Builds the level meshes (replacing any previous level) and returns their group. */
  buildWorld: (world: World) => Group;
  setBlobWorld: (world: World) => void;
  render: () => void;
  dispose: () => void;
  /** Cloud opacity scale 0..1 (re-applied after every applyConfig). */
  setCloudCover: (k: number) => void;
  /** Vertical lens shift as a fraction of the viewport height (camera.setViewOffset); 0 clears it. */
  setLensShift: (fracY: number) => void;
  /** Re-runs shadow flags and material swaps for groups added after buildWorld. */
  refreshFlags: () => void;
  frameStats: () => FrameStats;
};

export type FrameStats = {
  calls: number;
  triangles: number;
  shadowCasters: number;
  pixelRatio: number;
  width: number;
  height: number;
  textures: number;
  geometries: number;
  programs: number;
};

// ADR 0005 D4 + graphics-spec "Implemented tiers". Low: haze fog, warm key light ~78 degrees
// off the -Z descent axis so roofs and pads are lit, not backlit (ADR 0001), cool hemisphere
// fill, no shadows, no tone mapping. Medium/High: see renderConfigFor in graphicsTier.ts.
/** Shadow focus sits this far ahead of the camera, roughly on the hero (third-person rig). */
const SHADOW_FOCUS_AHEAD = 10;

function isLit(o: Mesh): boolean {
  const m = o.material;
  const first: Material | undefined = Array.isArray(m) ? m[0] : m;
  if (first === undefined) return false;
  return !(first instanceof MeshBasicMaterial) && !first.transparent;
}

export function createGameScene(canvas: HTMLCanvasElement): GameScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.info.autoReset = false;
  const coarse = coarsePointer();
  let cfg: RenderConfig = renderConfigFor(loadGraphicsTier(), coarse);

  const scene = new Scene();
  scene.fog = new Fog(cfg.fog.color, cfg.fog.near, cfg.fog.far);
  const sky = buildSkyView();
  scene.add(sky);
  const dust = buildDust();
  scene.add(dust);
  const backdropRoot = new Group();
  backdropRoot.name = 'backdropRoot';
  // The mountain rings are generated code (~17 KB): loaded lazily to keep the initial chunk small.
  const backdropTier = cfg.tier;
  void import('./backdrop').then((m) => {
    if (!disposed) backdropRoot.add(m.buildBackdrop(backdropTier));
  });
  scene.add(backdropRoot);
  const sun = new DirectionalLight(cfg.sun.color, cfg.sun.intensity);
  scene.add(sun);
  scene.add(sun.target);
  const hemi = new HemisphereLight(cfg.hemi.sky, cfg.hemi.ground, cfg.hemi.intensity);
  scene.add(hemi);

  const camera = new PerspectiveCamera(60, 1, 0.1, 3000);
  let disposed = false;
  let level: Group | null = null;
  let worldRef: World | null = null;
  const blob = buildBlob();
  scene.add(blob);
  let heroRoot: Object3D | null = null;
  let heroLookup = 0;
  const heroPos = new Vector3();
  let composer: EffectComposer | null = null;
  let flagsDirty = true;
  let materialsDirty = false;
  let cloudCover = 1;
  let lensShift = 0;

  // Scratch for the shadow follow (no per-frame allocation).
  const sunDir = new Vector3();
  const focus = new Vector3();
  const fwd = new Vector3();
  const lr = new Vector3();
  const lu = new Vector3();
  const lf = new Vector3();
  const UP = new Vector3(0, 1, 0);
  const size = new Vector2();

  function disposeComposer(): void {
    if (composer === null) return;
    for (const p of composer.passes) p.dispose();
    composer.dispose();
    composer = null;
  }

  let composerSeq = 0;
  function buildComposer(): void {
    disposeComposer();
    const seq = ++composerSeq;
    if (cfg.bloom === null) return;
    // The post-processing chunk loads lazily; the plain render path runs until it arrives.
    void createComposer(renderer, scene, camera, cfg).then((c) => {
      if (c === null) return;
      if (disposed || seq !== composerSeq) {
        for (const p of c.passes) p.dispose();
        c.dispose();
        return;
      }
      composer = c;
      resize();
    });
  }

  function applyConfig(): void {
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, cfg.maxPixelRatio));
    renderer.toneMapping = cfg.toneMapping === 'aces' ? ACESFilmicToneMapping : NoToneMapping;
    renderer.toneMappingExposure = cfg.exposure;
    // PCFSoftShadowMap was removed in three r18x; PCFShadowMap + shadow.radius is the soft path.
    renderer.shadowMap.enabled = cfg.shadow !== null;
    renderer.shadowMap.type = PCFShadowMap;

    sun.color.set(cfg.sun.color);
    sun.intensity = cfg.sun.intensity;
    sun.position.set(cfg.sun.dir[0], cfg.sun.dir[1], cfg.sun.dir[2]);
    sun.target.position.set(0, 0, 0);
    sunDir.copy(sun.position).normalize();
    hemi.color.set(cfg.hemi.sky);
    hemi.groundColor.set(cfg.hemi.ground);
    hemi.intensity = cfg.hemi.intensity;
    if (scene.fog instanceof Fog) {
      scene.fog.color.set(cfg.fog.color);
      scene.fog.near = cfg.fog.near;
      scene.fog.far = cfg.fog.far;
    }

    const sh = cfg.shadow;
    sun.castShadow = sh !== null;
    if (sh !== null) {
      if (sun.shadow.mapSize.x !== sh.mapSize && sun.shadow.map !== null) {
        sun.shadow.map.dispose();
        sun.shadow.map = null;
      }
      sun.shadow.mapSize.set(sh.mapSize, sh.mapSize);
      const c = sun.shadow.camera;
      c.left = -sh.halfExtent;
      c.right = sh.halfExtent;
      c.top = sh.halfExtent;
      c.bottom = -sh.halfExtent;
      c.near = 1;
      c.far = sh.far;
      c.updateProjectionMatrix();
      sun.shadow.bias = sh.bias;
      sun.shadow.normalBias = sh.normalBias;
      sun.shadow.radius = sh.radius;
    }
    // Atmosphere extras (second cloud layer, god rays, dust) are off on phones: large alpha overdraw.
    const rich = cfg.atmosphere;
    for (const n of ['cloudsHigh', 'godRays']) {
      const o = sky.getObjectByName(n);
      if (o !== undefined) o.visible = rich;
    }
    dust.visible = rich;
    applyCloudCover();
    applyForest();
    flagsDirty = true;
    materialsDirty = true;
    resize();
    buildComposer();
  }

  /** High tier only: textured decor walls and roofs use MeshStandardMaterial (rough, non-metal) for a softer response to the sun. */
  function swapStandard(o: Mesh, on: boolean): void {
    if (o.name !== 'decor_wallBrick' && o.name !== 'decor_wallPlaster' && o.name !== 'decor_roof')
      return;
    const ud = o.userData as {
      lambert?: MeshLambertMaterial;
      standard?: MeshStandardMaterial;
      normalMap?: Texture | null;
    };
    if (ud.lambert === undefined && o.material instanceof MeshLambertMaterial)
      ud.lambert = o.material;
    const base = ud.lambert;
    if (base === undefined) return;
    // Normal maps are invisible at phone resolution: High only (ADR 0009).
    if (ud.normalMap === undefined) ud.normalMap = base.normalMap;
    base.normalMap = cfg.normalMaps ? ud.normalMap : null;
    base.needsUpdate = true;
    if (on) {
      if (ud.standard === undefined) {
        ud.standard = new MeshStandardMaterial({
          color: base.color,
          vertexColors: base.vertexColors,
          flatShading: base.flatShading,
          map: base.map,
          normalMap: base.normalMap,
          roughness: 0.92,
          metalness: 0,
        });
      }
      o.material = ud.standard;
    } else {
      o.material = base;
    }
  }

  /** Shadow flags on lit opaque meshes; the sky, mountains and backdrop are skipped. */
  function applyFlags(o: Object3D, on: boolean): void {
    if (o === sky || o === backdropRoot) return;
    if (o instanceof Mesh) {
      if (o.name.startsWith('decor_')) o.visible = !cfg.hideDecor.includes(o.name);
      const lit = on && isLit(o);
      o.receiveShadow = lit;
      // Casting is opt-in (userData.cast): the hero, the lane's level meshes and the house walls
      // and roofs. Everything else only receives, which keeps the shadow pass under the A3 cap.
      o.castShadow = lit && o.userData.cast === true;
      if (materialsDirty) {
        swapStandard(o, cfg.normalMaps && !coarse);
        const m = o.material;
        if (Array.isArray(m)) for (const mm of m) mm.needsUpdate = true;
        else m.needsUpdate = true;
      }
    }
    for (const c of o.children) applyFlags(c, on);
  }

  // Forest thinning per tier (decor/placeDecor exposes setForestDensity on its group).
  function applyForest(): void {
    if (level === null) return;
    const f = cfg.forestDensity;
    level.traverse((o) => {
      const fn = o.userData.setForestDensity as ((d: number) => void) | undefined;
      if (fn !== undefined) fn(f);
    });
  }

  const cloudBase = new Map<Material, number>();
  function applyCloudCover(): void {
    for (const n of ['clouds', 'cloudsHigh']) {
      const o = sky.getObjectByName(n);
      if (o === undefined) continue;
      o.traverse((c) => {
        const m = (c as Mesh).material as Material | Material[] | undefined;
        if (m === undefined) return;
        for (const mm of Array.isArray(m) ? m : [m]) {
          let b = cloudBase.get(mm);
          if (b === undefined) {
            b = mm.opacity;
            cloudBase.set(mm, b);
          }
          mm.opacity = b * cloudCover;
        }
      });
    }
  }

  function setCloudCover(k: number): void {
    cloudCover = Math.min(1, Math.max(0, k));
    applyCloudCover();
  }

  function setLensShift(fracY: number): void {
    lensShift = fracY;
    resize();
  }

  function refreshFlags(): void {
    flagsDirty = true;
    materialsDirty = true;
  }

  function frameStats(): FrameStats {
    const info = renderer.info;
    let shadowCasters = 0;
    if (cfg.shadow !== null) {
      scene.traverse((o) => {
        if ((o as Mesh).isMesh === true && o.castShadow && o.visible) shadowCasters++;
      });
    }
    renderer.getSize(size);
    return {
      calls: info.render.calls,
      triangles: info.render.triangles,
      shadowCasters,
      pixelRatio: renderer.getPixelRatio(),
      width: size.x,
      height: size.y,
      textures: info.memory.textures,
      geometries: info.memory.geometries,
      programs: info.programs?.length ?? 0,
    };
  }

  function setTier(tier: GraphicsTier): void {
    if (tier === cfg.tier) return;
    cfg = renderConfigFor(tier, coarse);
    applyConfig();
  }

  const onTierEvent = (e: Event): void => {
    const t = parseTier((e as CustomEvent<unknown>).detail);
    if (t !== null) setTier(t);
  };
  window.addEventListener(GRAPHICS_TIER_EVENT, onTierEvent);

  function resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    composer?.setPixelRatio(renderer.getPixelRatio());
    composer?.setSize(w, h);
    camera.aspect = w / h;
    if (lensShift !== 0) camera.setViewOffset(w, h, 0, lensShift * h, w, h);
    else camera.clearViewOffset();
    camera.updateProjectionMatrix();
  }

  /** Chase has no buildWorld; the blob still needs a world to find the ground. */
  function setBlobWorld(world: World): void {
    worldRef = world;
  }

  function buildWorld(world: World): Group {
    if (level !== null) scene.remove(level);
    worldRef = world;
    level = buildLevelMeshes(world);
    scene.add(level);
    applyForest();
    flagsDirty = true;
    materialsDirty = true;
    return level;
  }

  /** Centres the tight shadow frustum ahead of the camera, snapped to shadow texels. */
  function followShadow(halfExtent: number, mapSize: number, distance: number): void {
    camera.getWorldDirection(fwd);
    focus.copy(camera.position).addScaledVector(fwd, SHADOW_FOCUS_AHEAD);
    lf.copy(sunDir).negate();
    lr.crossVectors(lf, UP).normalize();
    lu.crossVectors(lr, lf);
    const texel = (2 * halfExtent) / mapSize;
    const a = Math.round(focus.dot(lr) / texel) * texel;
    const b = Math.round(focus.dot(lu) / texel) * texel;
    const d = focus.dot(lf);
    focus.set(0, 0, 0).addScaledVector(lr, a).addScaledVector(lu, b).addScaledVector(lf, d);
    sun.target.position.copy(focus);
    sun.position.copy(focus).addScaledVector(sunDir, distance);
  }

  // Frame-time governor (D-A): an auto-chosen tier above Low falls back to Low once if the
  // first seconds run slower than ~20 fps-equivalent budget. Explicit choices are never touched.
  let govActive = (isTierAuto() || (coarse && cfg.tier === 'medium')) && cfg.tier !== 'low';
  let govLast = 0;
  let govFrames = 0;
  let govSum = 0;
  function govern(): void {
    const now = performance.now();
    const dt = govLast === 0 ? 0 : now - govLast;
    govLast = now;
    if (dt === 0 || dt > 250) return; // first frame, or a tab stall
    govFrames++;
    if (govFrames <= 30) return; // warm-up (shader compile, first uploads)
    govSum += dt;
    if (govFrames < 150) return;
    govActive = false;
    if (govSum / (govFrames - 30) > cfg.governorMs) {
      window.dispatchEvent(new CustomEvent(GRAPHICS_TIER_EVENT, { detail: 'low' }));
    }
  }

  function render(): void {
    if (govActive) govern();
    // The sky dome follows the camera so the long descent never leaves it.
    sky.position.copy(camera.position);
    if (dust.visible)
      updateDust(
        dust,
        camera.position.x,
        camera.position.y,
        camera.position.z,
        performance.now() / 1000,
      );
    // Hero, rope and level are added after construction: set their shadow flags once.
    if (flagsDirty) {
      applyFlags(scene, cfg.shadow !== null);
      flagsDirty = false;
      materialsDirty = false;
    }
    const sh = cfg.shadow;
    if (sh !== null) followShadow(sh.halfExtent, sh.mapSize, sh.distance);
    // The contact blob follows the hero (found lazily: the hero is added by the game layer).
    if (worldRef !== null) {
      if (heroRoot === null && heroLookup++ % 30 === 0)
        heroRoot = scene.getObjectByName('heroRig') ?? null;
      if (heroRoot !== null) {
        heroRoot.getWorldPosition(heroPos);
        placeBlob(blob, worldRef, heroPos.x, heroPos.y, heroPos.z);
      }
    }
    // Sum every pass (shadow, composer) into one frame total for frameStats.
    renderer.info.reset();
    if (composer !== null) composer.render();
    else renderer.render(scene, camera);
  }

  function dispose(): void {
    disposed = true;
    composerSeq++;
    scene.traverse((o) => {
      const ud = o.userData as { lambert?: Material; standard?: Material };
      ud.lambert?.dispose();
      ud.standard?.dispose();
    });
    window.removeEventListener(GRAPHICS_TIER_EVENT, onTierEvent);
    disposeComposer();
    sun.shadow.map?.dispose();
    renderer.dispose();
  }

  applyConfig();
  // ?debug only: lets tools/perf.mjs and ad-hoc scripts inspect what is drawn.
  if (typeof location !== 'undefined' && new URLSearchParams(location.search).has('debug'))
    (window as unknown as { __ztScene?: Scene }).__ztScene = scene;
  return {
    scene,
    camera,
    renderer,
    backdropRoot,
    getTier: () => cfg.tier,
    setTier,
    resize,
    buildWorld,
    setBlobWorld,
    render,
    dispose,
    setCloudCover,
    setLensShift,
    refreshFlags,
    frameStats,
  };
}
