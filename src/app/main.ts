import './zodConfig';
import { startGame } from './game';
import { bestLabel, readBest, isGraphMode } from './modes/mode';
import { classicLevels } from './modes/levels';
import { resolvePlayKey } from './modes/registry';
import type { GameHandle } from './game';
import type { Selection } from './modes/levels';
import type { LevelJson } from '../content/load';
import type { BuilderLevel } from '../content/builder/format';
import type { HomeBundle } from './homeAssets';
import { WebGLUnavailableError } from '../adapters/render/scene';
import { createLobby } from '../adapters/ui/lobby';
import { createOrientation } from '../adapters/ui/orientation';
import { fetchTuningOverrides, tuningUrlFrom } from '../adapters/config/remoteTuning';
import { initRemoteTuning } from './tuning';

// Every level the game can start, listed in the lobby or not: a direct ?level=builder / b:<id> route must
// work whatever the lobby's legacy flag says (the local and shipped builder levels are not lobby rows).
const playable = () => classicLevels(true, true);

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
    const key = resolvePlayKey(sel, playable());
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
// Remote tuning (docs/config-scope.md, "Remote overrides"): fetched once at boot while the lobby shows.
// A PLAY tapped before it settles waits for it (at most the fetch timeout), so the sim always reads
// the remote values. Never rejects: any failure leaves the baked-in defaults.
const tuningWarn = (message: string): void => console.warn(`[tuning] ${message}`);
let tuningSettled = false;
let pendingPlay: Selection | null = null;
void (async () => {
  const url = tuningUrlFrom(location.search, import.meta.env.VITE_TUNING_URL);
  initRemoteTuning(
    url === null
      ? await import('./online').then((m) => m.remoteOverrides(tuningWarn))
      : await fetchTuningOverrides(url),
    tuningWarn,
  );
})()
  .catch(() => initRemoteTuning(undefined))
  .finally(() => {
    tuningSettled = true;
    const waiting = pendingPlay;
    pendingPlay = null;
    if (waiting !== null) play(waiting);
  });
// Builder levels (local, shipped or saved) compile in a lazy chunk (T345); they are dressed like Nagarkot
// Home (house kit, roof guard rails) when their source is known. Undefined = not a builder level or it failed.
async function levelOverrideFor(
  sel: Selection,
): Promise<{ level?: LevelJson; home?: HomeBundle } | undefined> {
  const e = playable().find((l) => l.id === sel.level);
  if (sel.mode !== 'classic') return undefined;
  if (e?.builder === undefined) {
    // Nagarkot Run: the generator is lazy; ?seed= still picks the seed.
    const { STRATEGY_SEED, generateStrategyLevel } = await import('../content/strategy/gen');
    const seed = Number(new URLSearchParams(location.search).get('seed'));
    const has = new URLSearchParams(location.search).has('seed') && Number.isFinite(seed);
    return { level: generateStrategyLevel(has ? seed | 0 : STRATEGY_SEED) };
  }
  let level: LevelJson | null;
  let source: BuilderLevel | null;
  if (e.builder === 'local') {
    const store = await import('../content/builder/store');
    level = store.readLocalBuilderLevel();
    const text = store.readLocalBuilderSource();
    source = null;
    if (text !== null) {
      try {
        source = (await import('../content/builder/format')).parseBuilderLevel(text);
      } catch {
        source = null; // stale or corrupt source: play undressed
      }
    }
  } else if (e.builder === 'library') {
    const lib = await import('../content/builder/library');
    level = lib.readLibraryLevel(e.id);
    source = lib.readLibrarySource(e.id);
    if (source !== null) {
      try {
        const f = await import('../content/builder/format');
        source = f.parseBuilderLevel(f.serializeBuilderLevel(source));
        // Recompile from the saved source so compile fixes reach old saves; the stored level stays the fallback.
        try {
          level = (await import('../content/builder/compile')).compileLevel(source);
        } catch {
          // keep the stored compiled level
        }
      } catch {
        source = null;
      }
    }
  } else {
    const shipped = await import('../content/builder/shipped');
    level = shipped.compileShipped(e.id.slice(2));
    source = shipped.shippedSource(e.id.slice(2));
  }
  if (level === null) return undefined;
  if (source === null) return { level };
  try {
    const { builderHome } = await import('../adapters/builder/dress');
    return { home: builderHome(source, level) };
  } catch {
    return { level }; // a source the dresser cannot read: play the level undressed
  }
}
function play(sel: Selection): void {
  requestImmersive(); // must run inside the tap, so it goes before any wait
  if (orientation.pref() !== 'auto') orientation.setPref(orientation.pref()); // retry the lock inside this tap
  lobby.notice(null);
  if (!tuningSettled) {
    pendingPlay = sel;
    lobby.setBusy('LOADING…');
    return;
  }
  const key = resolvePlayKey(sel, playable());
  const id = sel.mode === 'chase' ? 'chase' : sel.level;
  if (game !== null && runningId !== id) {
    game.destroy();
    game = null;
  }
  if (game !== null) {
    lobby.setBusy(null);
    lobby.hide();
    game.resume();
    return;
  }
  const lazy =
    key === 'village' ||
    key === 'home' ||
    key === 'strategy' ||
    isGraphMode(key) ||
    playable().find((l) => l.id === sel.level)?.builder !== undefined;
  if (!lazy) {
    lobby.setBusy(null);
    try {
      game = startGame(canvas, document.body, key);
      runningId = id;
      lobby.hide();
    } catch (e) {
      startFailed(e);
    }
    return;
  }
  // Cloud Village, graph levels and builder levels: fetch their code and data on demand (kept out of the initial chunk).
  if (starting) return;
  starting = true;
  lobby.setBusy('LOADING…');
  const prepare = async (): Promise<GameHandle> => {
    if (key === 'village') {
      const { village } = await import('./villageAssets');
      return startGame(canvas, document.body, key, village);
    }
    if (key === 'home') {
      const { loadHome } = await import('./homeAssets');
      return startGame(
        canvas,
        document.body,
        key,
        undefined,
        undefined,
        undefined,
        undefined,
        loadHome(),
      );
    }
    if (isGraphMode(key)) {
      const { graphAssets } = await import('./graphAssets');
      return startGame(canvas, document.body, key, undefined, undefined, graphAssets);
    }
    const o = await levelOverrideFor(sel);
    return startGame(
      canvas,
      document.body,
      key,
      undefined,
      o?.level,
      undefined,
      undefined,
      o?.home,
    );
  };
  void prepare()
    .then((g) => {
      if (game === null) {
        game = g;
        runningId = id;
      } else g.destroy();
      lobby.setBusy(null);
      lobby.hide();
    })
    .catch(startFailed)
    .finally(() => {
      starting = false;
    });
}
function startFailed(e: unknown): void {
  lobby.setBusy(null);
  lobby.show();
  lobby.notice(
    e instanceof WebGLUnavailableError
      ? 'This browser can’t run 3D here. Open the link in Safari or Chrome.'
      : 'Couldn’t load the level. Check your connection and tap PLAY to retry.',
  );
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
} else if (
  q.get('level') === 'builder' ||
  q.get('level')?.startsWith('b:') === true ||
  q.get('level')?.startsWith('l:') === true
) {
  play({ mode: 'classic', level: q.get('level') ?? 'builder' });
}
