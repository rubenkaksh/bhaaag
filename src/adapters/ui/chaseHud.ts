import './chaseHud.css';

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

  constructor(root: HTMLElement, onRetry: () => void) {
    document.body.classList.add('mode-chase');
    this.cloud = el(root, 'div', 'chase-cloud');
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
    const d = f < 0.3;
    if (d !== this.danger) {
      this.danger = d;
      this.gap.classList.toggle('danger', d);
    }
  }

  /** Full-screen cloud layer: 0 clear, 1 white-out. */
  setCloud(k: number): void {
    const v = Math.round(Math.min(1, Math.max(0, k)) * 100) / 100;
    if (v === this.cloudV) return;
    this.cloudV = v;
    this.cloud.style.opacity = String(v * 0.9);
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
  }

  hideOver(): void {
    this.over.classList.add('off');
  }

  get overVisible(): boolean {
    return !this.over.classList.contains('off');
  }

  destroy(): void {
    document.body.classList.remove('mode-chase');
    this.cloud.remove();
    this.score.remove();
    this.gap.remove();
    this.over.remove();
  }
}
