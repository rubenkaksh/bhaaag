// Playable hunting spike (dev and preview only, not in the production build):
//   /spike.html?spike=horse|bike  [&gfx=low|high] [&seed=N] [&bot=1] [&ff=ticks]
// bot=1 lets the scripted player drive (used by tools/shots-play.mjs); ff fast-forwards the bot
// before the first frame so a screenshot can start mid-ride or at camp.
import { WebGLRenderer } from 'three';
import { botInput, newBotMem } from '../bot';
import { createRun, stepRun, BIKE_SPIKE, HORSE_SPIKE, type RunState } from '../run';
import { DT, neutralInput } from '../types';
import { hideEnd, setPhaseClass, showEnd, updateHud } from './hud';
import { PlayInput } from './input';
import { SpikeView } from './view';
import { loadHorseTemplate } from '../view/horseGlb';
import { pixelRatioFor } from '../../adapters/render/graphicsTier';

const q = new URLSearchParams(location.search);
const cfg = q.get('spike') === 'bike' ? BIKE_SPIKE : HORSE_SPIKE;
const tier = q.get('gfx') === 'high' ? 'high' : 'low';
const botOn = q.get('bot') === '1';
let seed = Number(q.get('seed') ?? Math.floor(Math.random() * 1e6));
const ff = Number(q.get('ff') ?? 0);
const campAt = q.get('campAt') === null ? -1 : Number(q.get('campAt'));
// ?horse=glb: trial of the Wild West Town 3D horse (art/spike-assets/horse.glb, never committed).
const horseGlb = q.get('horse') === 'glb' ? await loadHorseTemplate() : null;

const canvas = document.getElementById('c') as HTMLCanvasElement;
const renderer = new WebGLRenderer({
  canvas,
  antialias: tier === 'high',
  preserveDrawingBuffer: q.get('shot') === '1',
});
// same per-tier cap as the game (ADR 0009): phones get 1 at Low, 1.5 at High
renderer.setPixelRatio(
  pixelRatioFor(window.devicePixelRatio, matchMedia('(pointer: coarse)').matches, tier),
);
const input = new PlayInput(document.getElementById('touch') as HTMLElement);
const stick = document.getElementById('stick') as HTMLElement;

let run: RunState;
let view: SpikeView;
let mem = newBotMem();
let lastPhase = '';
let acc = 0;
let last = performance.now();
let ended = false;
let hintUntil = 0;
let lastInput = neutralInput();

function size(): void {
  const w = window.innerWidth;
  const h = window.innerHeight;
  renderer.setSize(w, h, false);
  view?.resize(w, h);
}

function start(): void {
  run = createRun(cfg, seed);
  mem = newBotMem();
  if (view) view.world.dispose();
  view = new SpikeView(run, tier, horseGlb);
  size();
  ended = false;
  lastPhase = '';
  hideEnd();
  hintUntil = performance.now() + 7000;
  for (let i = 0; i < ff && run.phase !== 'dead' && run.phase !== 'dawn'; i++)
    stepRun(run, botInput(run, mem), DT);
  while (
    campAt >= 0 &&
    run.phase !== 'dead' &&
    run.phase !== 'dawn' &&
    !(run.phase === 'camp' && run.camp !== null && run.camp.t >= campAt)
  ) {
    stepRun(run, botInput(run, mem), DT);
  }
  // the world is built once the run exists; start the camera from the right place
  view.snapCamera();
}

function hintText(): string {
  if (run.phase === 'ride') {
    return run.cfg.ride.weapon.kind === 'bow'
      ? 'Left thumb steers · right thumb aims, hold to draw, release to shoot'
      : 'Left thumb steers · right thumb aims and holds to fire';
  }
  return 'Left thumb walks · aim and shoot · cook meat and feed the fire · zombies ignore the fire';
}

function frame(now: number): void {
  const dt = Math.min(0.1, (now - last) / 1000);
  last = now;
  acc += dt;
  const w = window.innerWidth;
  const h = window.innerHeight;
  const proj = (cx: number, cy: number): { x: number; z: number } | null =>
    view.project(cx, cy, w, h);
  while (acc >= DT) {
    acc -= DT;
    if (!ended) {
      const p = view.playerPos();
      lastInput = botOn
        ? botInput(run, mem)
        : input.read(run.phase === 'ride' ? 'ride' : 'camp', proj, p.x, p.z);
      if (run.phase === 'ride' && botOn === false && lastInput.aimX === 0 && lastInput.aimZ === 0)
        lastInput.aimZ = 1;
      stepRun(run, lastInput, DT);
    }
  }
  if (run.phase !== lastPhase) {
    if (lastPhase !== '') view.snapCamera();
    lastPhase = run.phase;
    setPhaseClass(run.phase === 'dead' && run.camp === null ? 'ride' : run.phase);
    hintUntil = performance.now() + 6000;
  }
  view.sync(lastInput, dt);
  renderer.render(view.world.scene, view.camera);
  updateHud(run, hintText(), now < hintUntil && !ended);
  const so = input.stickOrigin;
  stick.style.display = so ? 'block' : 'none';
  if (so) {
    stick.style.left = `${so.x}px`;
    stick.style.top = `${so.y}px`;
  }
  if (!ended && (run.phase === 'dawn' || run.phase === 'dead')) {
    ended = true;
    showEnd(run);
  }
  requestAnimationFrame(frame);
}

document.getElementById('end')?.addEventListener('pointerdown', () => {
  if (ended) {
    seed += 1;
    start();
  }
});
window.addEventListener('keydown', (e) => {
  if (ended && (e.code === 'Enter' || e.code === 'Space')) {
    seed += 1;
    start();
  }
});
window.addEventListener('resize', size);
(window as unknown as { __spike: unknown }).__spike = {
  get run() {
    return run;
  },
  get info() {
    return { calls: renderer.info.render.calls, tris: renderer.info.render.triangles };
  },
};
start();
size();
requestAnimationFrame(frame);
