import './lobby.css';
import {
  GRAPHICS_TIERS,
  TIER_INFO,
  loadGraphicsTier,
  saveGraphicsTier,
} from '../render/graphicsTier';
import type { GraphicsTier } from '../render/graphicsTier';
import { GAME_MODES, MODE_INFO, loadMode, saveMode } from '../../app/modes/mode';
import type { GameMode } from '../../app/modes/mode';

// Lobby / start page (T273). DOM + inline SVG only: no images, no network.
// The game is created by the caller on the first PLAY, so nothing ticks
// behind the lobby; Esc or the MENU button comes back here.

const ART = `<svg id="lobby-art" viewBox="0 0 160 90" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
<defs>
<linearGradient id="lb-sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3b2a5c"/><stop offset="0.38" stop-color="#a8443f"/><stop offset="0.7" stop-color="#ee9a4a"/><stop offset="1" stop-color="#ffe3a8"/></linearGradient>
<radialGradient id="lb-sun" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#fff6e4"/><stop offset="0.4" stop-color="#ffd35a"/><stop offset="1" stop-color="#ffd35a" stop-opacity="0"/></radialGradient>
</defs>
<rect width="160" height="90" fill="url(#lb-sky)"/>
<circle cx="116" cy="50" r="26" fill="url(#lb-sun)"/>
<circle cx="116" cy="50" r="6" fill="#fff6e4"/>
<path d="M0 58 L18 44 L34 54 L56 38 L80 52 L104 42 L130 54 L148 44 L160 52 L160 90 L0 90Z" fill="#7a3f5c"/>
<path d="M0 66 L22 54 L46 64 L72 50 L100 62 L128 52 L160 64 L160 90 L0 90Z" fill="#5b2b53"/>
<path d="M0 90 L0 70 Q30 64 60 70 T120 66 T160 72 L160 90Z" fill="#3a1d44"/>
<g id="lb-roofs">
<g transform="translate(10 62)"><rect x="1" y="6" width="22" height="22" fill="#6e2c3a"/><path d="M-3 6 L26 6 L21 0 L2 0Z" fill="#c4553a"/><path d="M1 0 L24 0 L19 -5 L5 -5Z" fill="#a8443f"/><path d="M5 -5 L19 -5 L12 -11Z" fill="#c4553a"/><rect x="11" y="-14" width="2" height="4" fill="#ffd35a"/></g>
<g transform="translate(40 68)"><rect x="1" y="5" width="18" height="22" fill="#7a3340"/><path d="M-3 5 L23 5 L18 0 L2 0Z" fill="#d1633f"/><path d="M2 0 L18 0 L10 -6Z" fill="#a8443f"/><rect x="9" y="-9" width="2" height="3" fill="#ffd35a"/></g>
<g transform="translate(66 72)"><rect x="0" y="4" width="26" height="20" fill="#6e2c3a"/><path d="M-4 4 L30 4 L24 -1 L2 -1Z" fill="#c4553a"/><path d="M3 -1 L23 -1 L18 -6 L8 -6Z" fill="#a8443f"/><path d="M8 -6 L18 -6 L13 -11Z" fill="#d1633f"/><rect x="12" y="-14" width="2" height="4" fill="#ffd35a"/></g>
<g transform="translate(104 70)"><rect x="1" y="6" width="22" height="22" fill="#7a3340"/><path d="M-3 6 L27 6 L21 0 L3 0Z" fill="#d1633f"/><path d="M4 0 L20 0 L12 -7Z" fill="#a8443f"/><rect x="11" y="-10" width="2" height="4" fill="#ffd35a"/></g>
<g transform="translate(134 66)"><rect x="1" y="6" width="20" height="26" fill="#6e2c3a"/><path d="M-3 6 L25 6 L20 0 L2 0Z" fill="#c4553a"/><path d="M3 0 L19 0 L13 -6 L9 -6Z" fill="#a8443f"/><path d="M8 -6 L14 -6 L11 -11Z" fill="#d1633f"/><rect x="10" y="-14" width="2" height="4" fill="#ffd35a"/></g>
</g>
<path d="M0 82 Q40 76 80 82 T160 80 L160 90 L0 90Z" fill="#2a1430"/>
<path d="M-2 16 L162 52" stroke="#ffd35a" stroke-width="0.7" fill="none"/>
<path d="M-2 16 L162 52" stroke="#fff6e4" stroke-width="0.2" fill="none" opacity="0.7"/>
<g transform="translate(34 23.6) rotate(12.4) scale(1.55)">
<rect x="-3" y="-1.2" width="6" height="2.4" rx="1" fill="#ffd35a"/>
<path d="M-1.5 0 L-3 7 M1.5 0 L3 7" stroke="#2a2e35" stroke-width="0.8" stroke-linecap="round"/>
<ellipse cx="0" cy="12" rx="3.4" ry="5.2" fill="#3a3f48"/>
<circle cx="0" cy="5.6" r="2.4" fill="#3a3f48"/>
<path d="M-2.8 8.2 Q0 9.6 2.8 8.2 L2.8 9.6 Q0 11 -2.8 9.6Z" fill="#5fb5ad"/>
<path d="M2.6 8.8 Q9 8 12 11 Q8 11 3 10.4Z" fill="#5fb5ad"/>
<path d="M-1.6 16 L-4 22 M1.6 16 L4.5 21" stroke="#2a2e35" stroke-width="1.5" stroke-linecap="round"/>
<path d="M-3 10 L-1.8 3 M3 10 L1.8 3" stroke="#3a3f48" stroke-width="1.2" stroke-linecap="round"/>
</g>
</svg>`;

export type LobbyHandlers = {
  onPlay: (mode: GameMode) => void;
  onMenu: () => void;
  getBestLabel: (mode: GameMode) => string;
};

export type Lobby = {
  show: () => void;
  hide: () => void;
  visible: () => boolean;
};

export function createLobby(root: HTMLElement, h: LobbyHandlers): Lobby {
  const lobby = document.createElement('div');
  lobby.id = 'lobby';
  lobby.innerHTML =
    ART +
    '<div class="head"><h1>Bhaaag</h1><p class="tag">Slide the Kathmandu rooftops at sunset</p></div>' +
    '<div class="mid">' +
    '<div id="lobby-mode" role="radiogroup" aria-label="Game mode">' +
    GAME_MODES.map(
      (m) => `<button type="button" role="radio" data-mode="${m}">${MODE_INFO[m].label}</button>`,
    ).join('') +
    '</div>' +
    '<button id="lobby-play" type="button">PLAY</button><p id="lobby-best"></p>' +
    '<div id="lobby-gfx" role="radiogroup" aria-label="Graphics quality"><span class="lbl">Graphics</span>' +
    GRAPHICS_TIERS.map(
      (t) =>
        `<button type="button" role="radio" data-tier="${t}" title="${TIER_INFO[t].desc}">${TIER_INFO[t].label}</button>`,
    ).join('') +
    '</div><p id="lobby-gfx-desc"></p></div>' +
    '<div class="how">' +
    '<div class="desk"><b>Move</b> <kbd>W</kbd><kbd>A</kbd><kbd>S</kbd><kbd>D</kbd></div>' +
    '<div class="desk"><b>Hook</b> <kbd>E</kbd> or click</div>' +
    '<div class="desk"><b>Brake</b> hold <kbd>R</kbd></div>' +
    '<div class="desk"><b>Climb</b> hold <kbd>F</kbd> at a ledge</div>' +
    '<div class="desk"><b>Jump</b> <kbd>Space</kbd></div>' +
    '<div class="desk"><b>Menu</b> <kbd>Esc</kbd></div>' +
    '<div class="touch-only"><b>Move</b> left thumb</div>' +
    '<div class="touch-only"><b>Aim</b> tap an anchor</div>' +
    '<div class="touch-only"><b>JUMP</b> big button, double tap = Hook</div>' +
    '<div class="touch-only"><b>BRAKE / CLIMB</b> hold the button</div>' +
    '<div class="hint">Portrait or landscape, both work</div>' +
    '</div>';
  root.appendChild(lobby);

  const playQ = lobby.querySelector<HTMLButtonElement>('#lobby-play');
  const bestQ = lobby.querySelector<HTMLElement>('#lobby-best');
  if (playQ === null || bestQ === null) throw new Error('lobby markup');
  const playBtn: HTMLButtonElement = playQ;
  const bestEl: HTMLElement = bestQ;

  // Graphics tier (graphics-spec "Implemented tiers"): saved at once; a running scene applies
  // it live via GRAPHICS_TIER_EVENT. The lobby doubles as the pause menu (Esc / MENU).
  const gfxDesc = lobby.querySelector<HTMLElement>('#lobby-gfx-desc');
  const gfxBtns = lobby.querySelectorAll<HTMLButtonElement>('#lobby-gfx button');
  function showTier(tier: GraphicsTier): void {
    for (const b of gfxBtns) b.setAttribute('aria-checked', String(b.dataset.tier === tier));
    if (gfxDesc !== null) gfxDesc.textContent = TIER_INFO[tier].desc;
  }
  for (const b of gfxBtns) {
    b.addEventListener('click', () => {
      const t = GRAPHICS_TIERS.find((x) => x === b.dataset.tier);
      if (t === undefined) return;
      saveGraphicsTier(t);
      showTier(t);
    });
  }
  showTier(loadGraphicsTier());

  // Game mode: saved at once; PLAY / RESUME starts (or switches to) the chosen mode.
  const modeBtns = lobby.querySelectorAll<HTMLButtonElement>('#lobby-mode button');
  let mode: GameMode = loadMode(undefined, new URLSearchParams(location.search).get('mode'));
  function showMode(): void {
    for (const b of modeBtns) b.setAttribute('aria-checked', String(b.dataset.mode === mode));
    bestEl.textContent = h.getBestLabel(mode);
  }
  for (const b of modeBtns) {
    b.addEventListener('click', () => {
      const m = GAME_MODES.find((x) => x === b.dataset.mode);
      if (m === undefined) return;
      mode = m;
      saveMode(m);
      showMode();
    });
  }

  const menu = document.createElement('button');
  menu.id = 'menu-btn';
  menu.type = 'button';
  menu.className = 'off';
  menu.textContent = 'MENU';
  menu.setAttribute('aria-label', 'Back to lobby');
  root.appendChild(menu);

  let shown = true;
  let started = false;

  function show(): void {
    shown = true;
    showMode();
    playBtn.textContent = started ? 'RESUME' : 'PLAY';
    lobby.classList.remove('off');
    menu.classList.add('off');
    playBtn.focus({ preventScroll: true });
  }

  function hide(): void {
    shown = false;
    started = true;
    lobby.classList.add('off');
    menu.classList.remove('off');
  }

  playBtn.addEventListener('click', () => {
    h.onPlay(mode);
  });
  menu.addEventListener('click', () => {
    h.onMenu();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !shown) h.onMenu();
  });

  showMode();
  show();
  return { show, hide, visible: () => shown };
}
