// "No limits" look-dev for the hunting spikes (owner ask 2026-11-28: get as close to the GPT reference
// renders as possible). Lifts the locked "stock materials, no post" rule for this spike only:
// physical materials (sheen cloth, clear-coated paint, clay satin), a studio environment map, soft
// shadows, ambient occlusion, bloom, SMAA and a neutral tone map. Same geometry as the normal look,
// so the gap left over is the geometry (see docs/spikes/ultra-look.md).
import {
  Color,
  Mesh,
  MeshPhysicalMaterial,
  NeutralToneMapping,
  PMREMGenerator,
  Vector2,
  VSMShadowMap,
  type Camera,
  type Material,
  type MeshStandardMaterial,
  type Object3D,
  type Scene,
  type WebGLRenderer,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
import { toCreasedNormals } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { MOUNT_COLORS as C } from './kit';

type Role = 'clay' | 'cloth' | 'paint' | 'metal' | 'rubber' | 'gloss';

const ROLES: Record<string, Role> = {
  [C.blanket]: 'cloth',
  [C.ochre]: 'cloth',
  [C.cream]: 'cloth',
  [C.mane]: 'cloth',
  [C.bike]: 'paint',
  [C.metal]: 'metal',
  [C.rubber]: 'rubber',
  [C.hoof]: 'rubber',
  [C.eye]: 'gloss',
  [C.leather]: 'clay',
};

const cache = new Map<string, MeshPhysicalMaterial>();

function physicalFor(src: MeshStandardMaterial): MeshPhysicalMaterial {
  const hex = `#${src.color.getHexString()}`;
  const role = ROLES[hex] ?? 'clay';
  const key = `${hex}|${role}|${src.vertexColors ? 1 : 0}|${src.transparent ? src.opacity : 1}`;
  const hit = cache.get(key);
  if (hit !== undefined) return hit;
  const m = new MeshPhysicalMaterial({
    color: src.color.clone(),
    vertexColors: src.vertexColors,
    transparent: src.transparent,
    opacity: src.opacity,
    side: src.side,
  });
  switch (role) {
    case 'cloth': // woven blanket and felt: soft rim sheen, no gloss
      m.roughness = 0.85;
      m.sheen = 1;
      m.sheenRoughness = 0.5;
      m.sheenColor = new Color(hex).lerp(new Color('#ffffff'), 0.25);
      break;
    case 'paint': // toy-bike lacquer
      m.roughness = 0.4;
      m.clearcoat = 1;
      m.clearcoatRoughness = 0.12;
      break;
    case 'metal':
      m.metalness = 0.9;
      m.roughness = 0.32;
      break;
    case 'rubber':
      m.roughness = 0.75;
      m.clearcoat = 0.2;
      m.clearcoatRoughness = 0.6;
      break;
    case 'gloss': // eyes
      m.roughness = 0.2;
      m.clearcoat = 1;
      m.clearcoatRoughness = 0.05;
      break;
    default: // the "smooth clay finish" of the references: satin, a faint broad highlight
      m.roughness = 0.6;
      m.clearcoat = 0.18;
      m.clearcoatRoughness = 0.5;
  }
  cache.set(key, m);
  return m;
}

/**
 * Swaps every stock material under `root` for a physical one (by colour role), smooths the shading
 * across soft edges and turns on shadows. Call once after the view is built.
 */
export function ultraMaterials(root: Object3D, crease = Math.PI / 3): void {
  root.traverse((o) => {
    if (!(o instanceof Mesh)) return;
    const swap = (mm: Material): Material =>
      (mm as MeshStandardMaterial).isMeshStandardMaterial === true
        ? physicalFor(mm as MeshStandardMaterial)
        : mm;
    o.material = Array.isArray(o.material) ? o.material.map(swap) : swap(o.material);
    if (crease > 0 && o.geometry.getAttribute('normal') !== undefined && !o.userData.creased) {
      o.geometry = toCreasedNormals(o.geometry, crease);
      o.userData.creased = true;
    }
    o.castShadow = true;
    o.receiveShadow = true;
  });
}

export interface UltraPipeline {
  render(): void;
  setSize(w: number, h: number): void;
}

/**
 * Studio environment light, soft shadows and the post chain. `envIntensity` scales the image-based
 * light (the harness uses it as the main light; the ride keeps its sun and sky).
 */
export function ultraPipeline(
  renderer: WebGLRenderer,
  scene: Scene,
  camera: Camera,
  w: number,
  h: number,
  envIntensity: number,
  aoRadius = 0.35,
): UltraPipeline {
  renderer.toneMapping = NeutralToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = VSMShadowMap;
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = envIntensity;
  pmrem.dispose();

  const pr = renderer.getPixelRatio();
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene, camera));
  const ao = new GTAOPass(scene, camera, w * pr, h * pr);
  ao.updateGtaoMaterial({ radius: aoRadius, distanceExponent: 1.5, thickness: 1, scale: 1.2 });
  ao.blendIntensity = 0.9;
  composer.addPass(ao);
  composer.addPass(new UnrealBloomPass(new Vector2(w, h), 0.05, 0.4, 0.97));
  composer.addPass(new OutputPass());
  composer.addPass(new SMAAPass());
  composer.setSize(w, h);
  return {
    render: () => composer.render(),
    setSize: (ww, hh) => composer.setSize(ww, hh),
  };
}
