import type { HeroState } from '../../core/hero';

const FPS_WINDOW_S = 0.5;

// Top-left DOM overlay: fps, draw calls, triangles, hero state.
export class DebugHud {
  private readonly el: HTMLDivElement;
  private frames = 0;
  private elapsed = 0;
  private fps = 0;
  private last = performance.now();

  constructor(parent: HTMLElement = document.body) {
    this.el = document.createElement('div');
    this.el.style.cssText =
      'position:fixed;top:4px;left:4px;z-index:50;pointer-events:none;' +
      'font:11px/1.3 monospace;color:#fff;background:rgba(0,0,0,0.45);' +
      'padding:4px 6px;border-radius:4px;white-space:pre;';
    parent.appendChild(this.el);
  }

  update(hero: HeroState, calls: number, triangles: number): void {
    const now = performance.now();
    this.elapsed += (now - this.last) / 1000;
    this.last = now;
    this.frames++;
    if (this.elapsed >= FPS_WINDOW_S) {
      this.fps = this.frames / this.elapsed;
      this.frames = 0;
      this.elapsed = 0;
    }
    const speed = Math.sqrt(hero.vx * hero.vx + hero.vz * hero.vz);
    this.el.textContent =
      'fps ' +
      this.fps.toFixed(0) +
      '\n' +
      'calls ' +
      calls +
      '  tris ' +
      triangles +
      '\n' +
      'pos ' +
      hero.px.toFixed(1) +
      ' ' +
      hero.py.toFixed(1) +
      ' ' +
      hero.pz.toFixed(1) +
      '\n' +
      'speed ' +
      speed.toFixed(1) +
      '  grounded ' +
      hero.grounded;
  }
}
