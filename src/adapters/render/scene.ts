import {
  BoxGeometry,
  DirectionalLight,
  Group,
  Fog,
  HemisphereLight,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  WebGLRenderer,
} from 'three';
import type { World } from '../../core/world';
import { buildLevelMeshes } from './levelView';
import { HAZE, buildMountains, buildSkyView } from './skyView';

export type HelloScene = {
  resize: () => void;
  frame: (timeSec: number) => void;
};

function coarsePointer(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
}

/** ADR 0005 D4: pixel ratio capped at 1.5 on touch devices, 2 elsewhere. */
export function pixelRatioFor(devicePixelRatio: number, coarse: boolean): number {
  return Math.min(devicePixelRatio, coarse ? 1.5 : 2);
}

export function createHelloScene(canvas: HTMLCanvasElement): HelloScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(pixelRatioFor(window.devicePixelRatio, coarsePointer()));

  const scene = new Scene();
  scene.add(buildSkyView());

  const ground = new Mesh(
    new PlaneGeometry(200, 200),
    new MeshStandardMaterial({ color: '#d8c9b8' }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.position.y = -1;
  scene.add(ground);

  const box = new Mesh(new BoxGeometry(2, 2, 2), new MeshStandardMaterial({ color: '#f2f2f2' }));
  scene.add(box);
  const band = new Mesh(
    new BoxGeometry(2.04, 0.2, 2.04),
    new MeshStandardMaterial({ color: '#ff3b1f' }),
  );
  scene.add(band);

  const sun = new DirectionalLight('#ffc080', 3.5);
  sun.position.set(-20, 10, 10);
  scene.add(sun);
  scene.add(new HemisphereLight('#ffb27a', '#2a3a55', 0.6));

  const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
  camera.position.set(6, 4, 8);
  camera.lookAt(0, 0, 0);

  function resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function frame(timeSec: number): void {
    const a = timeSec * 0.15;
    const r = Math.sqrt(6 * 6 + 8 * 8);
    camera.position.set(Math.cos(a) * r, 4, Math.sin(a) * r);
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  resize();
  return { resize, frame };
}

export type GameScene = {
  scene: Scene;
  camera: PerspectiveCamera;
  renderer: WebGLRenderer;
  resize: () => void;
  /** Builds the level meshes (replacing any previous level) and returns their group. */
  buildWorld: (world: World) => Group;
  render: () => void;
  dispose: () => void;
};

// ADR 0005 D4: haze fog, warm key light ~78 degrees off the -Z descent axis so roofs and
// pads are lit, not backlit (ADR 0001), cool hemisphere fill. No shadows, no tone mapping.
const FOG_NEAR = 45;
const FOG_FAR = 260;

export function createGameScene(canvas: HTMLCanvasElement): GameScene {
  const renderer = new WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(pixelRatioFor(window.devicePixelRatio, coarsePointer()));

  const scene = new Scene();
  scene.fog = new Fog(HAZE, FOG_NEAR, FOG_FAR);
  const sky = buildSkyView();
  scene.add(sky);
  scene.add(buildMountains());
  const sun = new DirectionalLight('#ffb469', 3.0);
  // Horizontal light vector (70, -15) is ~78 degrees off the -Z descent axis.
  sun.position.set(70, 38, -15);
  scene.add(sun);
  scene.add(new HemisphereLight('#ffc99c', '#5b4656', 1.0));

  const camera = new PerspectiveCamera(60, 1, 0.1, 1000);
  let level: Group | null = null;

  function resize(): void {
    const w = window.innerWidth;
    const h = window.innerHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }

  function buildWorld(world: World): Group {
    if (level !== null) scene.remove(level);
    level = buildLevelMeshes(world);
    scene.add(level);
    return level;
  }

  function render(): void {
    // The sky dome follows the camera so the long descent never leaves it.
    sky.position.copy(camera.position);
    renderer.render(scene, camera);
  }

  function dispose(): void {
    renderer.dispose();
  }

  resize();
  return { scene, camera, renderer, resize, buildWorld, render, dispose };
}
