import './chaseHud.css';
import { irisRadius } from '../render/chase/catchPose';
import { dangerLevel } from './chaseDanger';

function el(parent: HTMLElement, tag: string, id: string, cls = ''): HTMLElement {
  const e = document.createElement(tag);
  e.id = id;
  e.className = ('chase ' + cls).trim();
  parent.appendChild(e);
  return e;
}

/** DOM HUD of Dragon Chase. Everything is created here; destroy() removes it and the body class. */
export class ChaseHud {
  private readonly cloud: HTMLElement;
  private readonly vignette: HTMLElement;
  private readonly iris: HTMLElement;
  private readonly score: HTMLElement;
  private readonly scoreText: HTMLElement;
  private readonly distText: HTMLElement;
  private readonly gap: HTMLElement;
  private readonly over: HTMLElement;
  private readonly overBody: HTMLElement;
  private scoreV = -1;
  private distV = -1;
  private gapPct = -1;
  private danger = false;
  private cloudV = -1;
  private vigV = -1;
  private catching = false;
  private irisX = -1;
  private irisY = -1;
  private irisR = -1;
  private irisO = -1;

  constructor(root: HTMLElement, onRetry: () => void) {
    document.body.classList.add('mode-chase');
    this.cloud = el(root, 'div', 'chase-cloud');
    this.vignette = el(root, 'div', 'chase-danger');
    this.iris = el(root, 'div', 'chase-iris');
    this.score = el(root, 'div', 'chase-score');
    this.score.innerHTML = '<span class="score">0</span><span class="dist">0 m</span>';
    this.scoreText = this.score.querySelector('.score') as HTMLElement;
    this.distText = this.score.querySelector('.dist') as HTMLElement;
    this.gap = el(root, 'div', 'chase-gap');
    this.gap.innerHTML = '<i class="fill"></i><span class="lbl">DRAGON</span>';
    this.over = el(root, 'div', 'chase-over', 'off');
    this.over.innerHTML =
      '<h1>Swallowed by the cloud</h1><div class="big">0</div><p class="detail"></p><p class="best"></p>' +
      '<div class="row"><button type="button" class="retry">RETRY</button><button type="button" class="alt menu">MENU</button></div>';
    this.overBody = this.over;
    (this.over.querySelector('.retry') as HTMLButtonElement).addEventListener('click', onRetry);
    (this.over.querySelector('.menu') as HTMLButtonElement).addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('zt-menu'));
    });
  }

  setScore(score: number, metres: number): void {
    const s = Math.floor(score);
    if (s !== this.scoreV) {
      this.scoreV = s;
      this.scoreText.textContent = String(s);
    }
    const m = Math.floor(metres);
    if (m !== this.distV) {
      this.distV = m;
      this.distText.textContent = m + ' m';
    }
  }

  /** frac: 1 = dragon far (full bar), 0 = on top of you. */
  setGap(frac: number): void {
    const f = Math.min(1, Math.max(0, frac));
    const pct = Math.round(f * 100);
    if (pct !== this.gapPct) {
      this.gapPct = pct;
      this.gap.style.setProperty('--gap', String(pct / 100));
    }
    const v = Math.round(dangerLevel(f) * 50) / 50;
    if (v !== this.vigV) {
      this.vigV = v;
      this.vignette.style.opacity = String(v);
      this.vignette.classList.toggle('pulse', v > 0.6);
    }
    const d = f < 0.3;
    if (d !== this.danger) {
      this.danger = d;
      this.gap.classList.toggle('danger', d);
    }
  }

  /** Full-screen cloud layer: 0 clear, 1 white-out. */
  setCloud(k: number): void {
    if (this.catching) return;
    const v = Math.round(Math.min(1, Math.max(0, k)) * 100) / 100;
    if (v === this.cloudV) return;
    this.cloudV = v;
    this.cloud.style.opacity = String(v * 0.6);
  }

  /**
   * Catch beat: k 0..1 closes an iris around the face (faceX/faceY are viewport fractions from the
   * top-left); settle 0..1 fades it out as the card scrim takes over. k = 0 restores setCloud.
   */
  setCatch(k: number, settle: number, faceX: number, faceY: number): void {
    if (k <= 0) {
      if (!this.catching) return;
      this.catching = false;
      document.body.classList.remove('chase-catching');
      this.iris.style.opacity = '0';
      this.irisO = -1;
      this.cloudV = -1; // force the next setCloud to rewrite the flat veil
      return;
    }
    if (!this.catching) {
      this.catching = true;
      document.body.classList.add('chase-catching');
      this.cloud.style.opacity = '0';
    }
    const st = this.iris.style;
    const x = Math.round(faceX * 1000) / 10;
    const y = Math.round(faceY * 1000) / 10;
    const r = Math.round(irisRadius(k) * 1000) / 10;
    const o = Math.round((1 - Math.min(1, Math.max(0, settle))) * 100) / 100;
    if (x !== this.irisX) {
      this.irisX = x;
      st.setProperty('--iris-x', x + '%');
    }
    if (y !== this.irisY) {
      this.irisY = y;
      st.setProperty('--iris-y', y + '%');
    }
    if (r !== this.irisR) {
      this.irisR = r;
      st.setProperty('--iris-r', r + 'vmin');
    }
    if (o !== this.irisO) {
      this.irisO = o;
      st.opacity = String(o);
    }
  }

  showOver(score: number, metres: number, hops: number, best: number, isBest: boolean, why: string): void {
    (this.overBody.querySelector('h1') as HTMLElement).textContent = why;
    (this.overBody.querySelector('.big') as HTMLElement).textContent = String(Math.floor(score));
    (this.overBody.querySelector('.detail') as HTMLElement).textContent =
      Math.floor(metres) + ' m, ' + hops + ' hops';
    (this.overBody.querySelector('.best') as HTMLElement).textContent = isBest
      ? 'New best!'
      : 'Best ' + Math.floor(best);
    this.over.classList.remove('off');
    document.body.classList.add('chase-card');
  }

  hideOver(): void {
    this.over.classList.add('off');
    document.body.classList.remove('chase-card');
  }

  get overVisible(): boolean {
    return !this.over.classList.contains('off');
  }

  destroy(): void {
    document.body.classList.remove('mode-chase', 'chase-card', 'chase-catching');
    this.cloud.remove();
    this.vignette.remove();
    this.iris.remove();
    this.score.remove();
    this.gap.remove();
    this.over.remove();
  }
}
