import { startGame } from './game';
import { bestLabel, readBest } from './modes/mode';
import { classicLevels } from './modes/levels';
import { resolvePlayKey } from './modes/registry';
import { compileShipped } from '../content/builder/shipped';
import { readLocalBuilderLevel } from '../content/builder/store';
import type { GameHandle } from './game';
import type { Selection } from './modes/levels';
import type { LevelJson } from '../content/load';
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
  getBestLabel: (sel) => {
    const key = resolvePlayKey(sel, classicLevels(true));
    return bestLabel(key, readBest(key));
  },
  onPlay: (sel) => play(sel),
  onMenu: () => {
    game?.pause();
    lobby.show();
  },
});
// What is running: the selection id (mode + level), so a level switch inside Classic restarts the game.
let runningId = '';
function levelOverrideFor(sel: Selection): LevelJson | undefined {
  const e = classicLevels(true).find((l) => l.id === sel.level);
  if (sel.mode !== 'classic' || e?.builder === undefined) return undefined;
  const lv = e.builder === 'local' ? readLocalBuilderLevel() : compileShipped(e.id.slice(2));
  return lv ?? undefined;
}
function play(sel: Selection): void {
  lobby.hide();
  requestImmersive();
  if (orientation.pref() !== 'auto') orientation.setPref(orientation.pref()); // retry the lock inside this tap
  const key = resolvePlayKey(sel, classicLevels(true));
  const id = sel.mode === 'chase' ? 'chase' : sel.level;
  if (game !== null && runningId !== id) {
    game.destroy();
    game = null;
  }
  if (game !== null) {
    game.resume();
    return;
  }
  if (key !== 'village') {
    game = startGame(canvas, document.body, key, undefined, levelOverrideFor(sel));
    runningId = id;
    return;
  }
  // Cloud Village: fetch its level and cloud renderer on demand (kept out of the initial chunk).
  if (starting) return;
  starting = true;
  void import('./villageAssets')
    .then(({ village }) => {
      if (game === null) {
        game = startGame(canvas, document.body, key, village);
        runningId = id;
      }
    })
    .catch(() => {
      // Chunk fetch failed (offline): bring the lobby back instead of a black screen.
      lobby.show();
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

// ?builder opens the level builder (lazy chunk, ADR 0016); ?level=builder / ?level=b:<id> start Classic on
// that level straight away.
const q = new URLSearchParams(location.search);
if (q.has('builder')) {
  lobby.hide();
  void import('../adapters/builder/builderPage').then((m) => m.mountBuilder(document.body));
} else if (q.get('level') === 'builder' || q.get('level')?.startsWith('b:') === true) {
  play({ mode: 'classic', level: q.get('level') ?? 'builder' });
}
