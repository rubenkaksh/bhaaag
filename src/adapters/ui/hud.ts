import './hud.css';
import { formatHop } from './progress';

function el(parent: HTMLElement, tag: string, id: string, cls = ''): HTMLElement {
  const e = document.createElement(tag);
  e.id = id;
  e.className = ('hud ' + cls).trim();
  parent.appendChild(e);
  return e;
}

/** Formats seconds as m:ss.t. */
export function formatTime(sec: number): string {
  const t = Math.max(0, sec);
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return m + ':' + (s < 10 ? '0' : '') + s.toFixed(1);
}

// DOM HUD: timer, one-time hint, aim reticle, death toast, win overlay and the
// contextual touch action label. Everything is created here; no index.html markup needed.
export class Hud {
  private readonly timer: HTMLElement;
  private readonly timerText_: HTMLElement;
  private readonly objective: HTMLElement;
  private readonly pause: HTMLElement;
  private readonly hint: HTMLElement;
  private readonly reticle: HTMLElement;
  private readonly reason: HTMLElement;
  private readonly toastEl: HTMLElement;
  private readonly win: HTMLElement;
  private readonly winTime: HTMLElement;
  private readonly winBest: HTMLElement;
  private readonly action: HTMLElement | null;
  private timerText = '';
  private actionText = '';
  private reticleState = -1;
  private reasonText = '';
  private readonly wp: HTMLElement;
  private readonly wpLabel: HTMLElement;
  private readonly wpArrow: HTMLElement;
  private wpShown = false;
  private wpEdge = false;
  private wpFlip = false;
  private wpX = -1e6;
  private wpY = -1e6;
  private wpAngle = 1e6;
  private wpText = '';
  private readonly hop: HTMLElement;
  private hopText = '';
  private readonly alt: HTMLElement;
  private readonly altFill: HTMLElement;
  private altPct = -1;

  constructor(root: HTMLElement, debug: boolean, onPlayAgain: () => void) {
    this.objective = el(root, 'div', 'hud-objective');
    this.objective.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span>Reach the Target</span>';
    this.hop = el(root, 'div', 'hud-hop');
    this.alt = el(root, 'div', 'hud-alt');
    this.alt.innerHTML = '<i class="alt-fill"></i><i class="alt-dot"></i>';
    this.altFill = this.alt.querySelector('.alt-fill') as HTMLElement;
    this.timer = el(root, 'div', 'hud-timer', debug ? 'debug' : '');
    this.timer.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="13.5" r="8"/><path d="M12 13.5V9.5M10 2.5h4M12 2.5v3M18.5 6.5 20 5"/></g></svg><span></span>';
    this.timerText_ = this.timer.querySelector('span') as HTMLElement;
    this.pause = el(root, 'button', 'hud-pause');
    (this.pause as HTMLButtonElement).type = 'button';
    this.pause.setAttribute('aria-label', 'Pause');
    this.pause.innerHTML =
      '<svg viewBox="0 0 24 24" aria-hidden="true"><g fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></g></svg>';
    this.pause.addEventListener('click', () => {
      window.dispatchEvent(new CustomEvent('zt-menu'));
    });
    this.wp = el(root, 'div', 'hud-waypoint', 'off');
    this.wp.innerHTML =
      '<i class="wp-stem"></i><span class="wp-arrow"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 14l4-4 4 4" fill="none" stroke="#ffc83a" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></span><svg class="wp-dia" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill="#ffc83a" stroke="#2a1a0e" stroke-width="1.5"/><path d="M12 6.5 17.5 12 12 17.5 6.5 12Z" fill="none" stroke="#2a1a0e" stroke-width="1.5"/></svg><span class="wp-label"></span>';
    this.wpLabel = this.wp.querySelector('.wp-label') as HTMLElement;
    this.wpArrow = this.wp.querySelector('.wp-arrow') as HTMLElement;
    this.hint = el(root, 'div', 'hud-hint');
    this.hint.textContent = 'Aim at a glowing anchor and hook';
    this.reticle = el(root, 'div', 'hud-reticle');
    this.reason = el(root, 'div', 'hud-reason', 'off');
    this.toastEl = el(root, 'div', 'hud-toast', 'off');
    this.win = el(root, 'div', 'hud-win', 'off');
    const h = document.createElement('h1');
    h.textContent = 'You made it!';
    this.winTime = document.createElement('p');
    this.winBest = document.createElement('p');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'PLAY AGAIN';
    btn.addEventListener('click', onPlayAgain);
    this.win.append(h, this.winTime, this.winBest, btn);
    this.action = root.querySelector<HTMLElement>('#btn-jump');
    this.setTime(0);
  }

  setTime(sec: number): void {
    const t = formatTime(sec);
    if (t === this.timerText) return;
    this.timerText = t;
    this.timerText_.textContent = t;
  }

  /** "HOP n/N" counter. */
  setHop(n: number, total: number): void {
    const t = formatHop(n, total);
    if (t === this.hopText) return;
    this.hopText = t;
    this.hop.textContent = t;
  }

  /** Altitude strip: 0 = level start (top), 1 = goal (bottom). */
  setAltitude(frac: number): void {
    const pct = Math.round(frac * 200) / 2;
    if (pct === this.altPct) return;
    this.altPct = pct;
    this.alt.style.setProperty('--alt', pct + '%');
  }

  /**
   * Restartable objective-pill entrance (ADR 0007 §6). Alternates two classes
   * with identical keyframes so a replay needs no forced reflow.
   */
  objectiveIn(): void {
    const wasA = this.objective.classList.contains('in-a');
    this.objective.classList.toggle('in-a', !wasA);
    this.objective.classList.toggle('in-b', wasA);
  }

  /**
   * Restartable timer pulse: scale 1 → 1.14 → 1 with a gold flash, on the
   * inner span (the container owns translateX(-50%)). Same -a/-b alternation.
   */
  pulseTimer(): void {
    const wasA = this.timerText_.classList.contains('pulse-a');
    this.timerText_.classList.toggle('pulse-a', !wasA);
    this.timerText_.classList.toggle('pulse-b', wasA);
  }

  fadeHint(): void {
    this.hint.classList.add('gone');
  }

  showHint(): void {
    this.hint.classList.remove('gone');
  }

  /** 0 = hidden, 1 = neutral, 2 = valid target (gold). */
  setReticle(state: number): void {
    if (state === this.reticleState) return;
    this.reticleState = state;
    this.reticle.classList.toggle('off', state === 0);
    this.reticle.classList.toggle('lock', state === 2);
  }

  /** Why the aimed anchor cannot be hooked; empty hides it. */
  setAimReason(text: string): void {
    if (text === this.reasonText) return;
    this.reasonText = text;
    this.reason.textContent = text;
    this.reason.classList.toggle('off', text === '');
  }

  /** Waypoint marker: screen position in px, edge = clamped (shows arrow, no stem). */
  setWaypoint(
    show: boolean,
    x: number,
    y: number,
    edge: boolean,
    angle: number,
    text: string,
    flip: boolean,
  ): void {
    if (show !== this.wpShown) {
      this.wpShown = show;
      this.wp.classList.toggle('off', !show);
      if (!show) return;
    }
    if (!show) return;
    if (edge !== this.wpEdge) {
      this.wpEdge = edge;
      this.wp.classList.toggle('edge', edge);
    }
    if (flip !== this.wpFlip) {
      this.wpFlip = flip;
      this.wp.classList.toggle('flip', flip);
    }
    if (text !== this.wpText) {
      this.wpText = text;
      this.wpLabel.textContent = text;
    }
    if (Math.abs(x - this.wpX) >= 0.5 || Math.abs(y - this.wpY) >= 0.5) {
      this.wpX = x;
      this.wpY = y;
      this.wp.style.transform = 'translate3d(' + x.toFixed(1) + 'px,' + y.toFixed(1) + 'px,0)';
    }
    if (edge && Math.abs(angle - this.wpAngle) >= 0.01) {
      this.wpAngle = angle;
      this.wpArrow.style.transform = 'rotate(' + (angle + Math.PI / 2).toFixed(3) + 'rad)';
    }
  }

  toast(msg: string): void {
    this.toastEl.textContent = msg;
    this.toastEl.classList.remove('off');
  }

  hideToast(): void {
    this.toastEl.classList.add('off');
  }

  showWin(time: number, best: number): void {
    this.winTime.textContent = 'Time ' + formatTime(time);
    this.winBest.textContent = 'Best ' + formatTime(best);
    this.win.classList.remove('off');
  }

  hideWin(): void {
    this.win.classList.add('off');
  }

  /** Right-hand touch button label: JUMP, HOOK, BRAKE or CLIMB (icon and aria-label follow). */
  setActionLabel(text: string): void {
    if (this.action === null || text === this.actionText) return;
    this.actionText = text;
    // Icons live in index.html; only the mode, visible label and accessible label change.
    this.action.dataset.mode = text.toLowerCase();
    const lbl = this.action.querySelector('.lbl');
    if (lbl !== null) lbl.textContent = text;
    this.action.setAttribute('aria-label', text.charAt(0) + text.slice(1).toLowerCase());
  }

  destroy(): void {
    this.objective.remove();
    this.hop.remove();
    this.alt.remove();
    this.pause.remove();
    this.timer.remove();
    this.hint.remove();
    this.reticle.remove();
    this.reason.remove();
    this.wp.remove();
    this.toastEl.remove();
    this.win.remove();
  }
}
