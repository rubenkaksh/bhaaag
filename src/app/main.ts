import { startGame } from './game';
import { bestLabel, readBest, isGraphMode } from './modes/mode';
import { classicLevels } from './modes/levels';
import { resolvePlayKey } from './modes/registry';
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
// Builder levels (local or shipped) compile in a lazy chunk (T345); null = not a builder level or it failed.
async function levelOverrideFor(sel: Selection): Promise<LevelJson | undefined> {
  const e = classicLevels(true).find((l) => l.id === sel.level);
  if (sel.mode !== 'classic' || e?.builder === undefined) return undefined;
  const lv =
    e.builder === 'local'
      ? (await import('../content/builder/store')).readLocalBuilderLevel()
      : (await import('../content/builder/shipped')).compileShipped(e.id.slice(2));
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
  const lazy =
    key === 'village' ||
    isGraphMode(key) ||
    classicLevels(true).find((l) => l.id === sel.level)?.builder !== undefined;
  if (!lazy) {
    game = startGame(canvas, document.body, key);
    runningId = id;
    return;
  }
  // Cloud Village, graph levels and builder levels: fetch their code and data on demand (kept out of the initial chunk).
  if (starting) return;
  starting = true;
  const prepare = async (): Promise<GameHandle> => {
    if (key === 'village') {
      const { village } = await import('./villageAssets');
      return startGame(canvas, document.body, key, village);
    }
    if (isGraphMode(key)) {
      const { graphAssets } = await import('./graphAssets');
      return startGame(canvas, document.body, key, undefined, undefined, graphAssets);
    }
    return startGame(canvas, document.body, key, undefined, await levelOverrideFor(sel));
  };
  void prepare()
    .then((g) => {
      if (game === null) {
        game = g;
        runningId = id;
      } else g.destroy();
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
