import { startGame } from './game';
import { bestLabel, readBest } from './modes/mode';
import type { GameHandle } from './game';
import type { GameMode } from './modes/mode';
import { createLobby } from '../adapters/ui/lobby';
import { createOrientation } from '../adapters/ui/orientation';

const gameCanvas = document.getElementById('game');
if (!(gameCanvas instanceof HTMLCanvasElement)) {
  throw new Error('canvas#game not found');
}
const canvas: HTMLCanvasElement = gameCanvas;

// Touch devices: ask for fullscreen where the browser allows it. Orientation follows the device unless
// the player forces Landscape / Portrait in the menu (orientation.ts).
function requestImmersive(): void {
  if (!window.matchMedia('(pointer: coarse)').matches) return;
  try {
    void document.documentElement.requestFullscreen?.().catch(() => undefined);
  } catch {
    // Fullscreen unsupported or denied: just play.
  }
}

// The game is created on the first PLAY, so nothing ticks behind the lobby.
// GameLoop pauses on document.hidden; game.ts wires the viewport watcher.
let game: GameHandle | null = null;
let starting = false;
const orientation = createOrientation(document.body);
const lobby = createLobby(document.body, {
  orientation,
  getBestLabel: (mode) => bestLabel(mode, readBest(mode)),
  onPlay: (mode) => play(mode),
  onMenu: () => {
    game?.pause();
    lobby.show();
  },
});
function play(mode: GameMode): void {
  lobby.hide();
  requestImmersive();
  if (orientation.pref() !== 'auto') orientation.setPref(orientation.pref()); // retry the lock inside this tap
  if (game !== null && game.mode !== mode) {
    game.destroy();
    game = null;
  }
  if (game !== null) {
    game.resume();
    return;
  }
  if (mode !== 'village') {
    game = startGame(canvas, document.body, mode);
    return;
  }
  // Cloud Village: fetch its level and cloud renderer on demand (kept out of the initial chunk).
  if (starting) return;
  starting = true;
  void import('./villageAssets')
    .then(({ village }) => {
      if (game === null) game = startGame(canvas, document.body, mode, village);
    })
    .finally(() => {
      starting = false;
    });
}
// HUD pause button (hud.ts) asks for the same menu path as the lobby's onMenu.
window.addEventListener('zt-menu', () => {
  game?.pause();
  lobby.show();
});

// Dev-only (ADR 0013): ?builder opens the level builder; ?level=builder plays its last compiled level.
const q = new URLSearchParams(location.search);
if (import.meta.env.DEV && q.has('builder')) {
  lobby.hide();
  void import('../adapters/builder/builderPage').then((m) => m.mountBuilder(document.body));
} else if (import.meta.env.DEV && q.get('level') === 'builder') {
  play('strategy');
}
