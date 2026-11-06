import { startGame, readBestTime } from './game';
import type { GameHandle } from './game';
import { createLobby } from '../adapters/ui/lobby';

const canvas = document.getElementById('game');
if (!(canvas instanceof HTMLCanvasElement)) {
  throw new Error('canvas#game not found');
}

// Touch devices: ask for fullscreen + landscape where the browser allows it.
function requestImmersive(): void {
  if (!window.matchMedia('(pointer: coarse)').matches) return;
  try {
    const p = document.documentElement.requestFullscreen?.();
    if (p !== undefined) {
      p.then(
        () => {
          const o = screen.orientation as ScreenOrientation & {
            lock?: (o: string) => Promise<void>;
          };
          o.lock?.('landscape').catch(() => undefined);
        },
        () => undefined,
      );
    }
  } catch {
    // Fullscreen / orientation lock unsupported or denied: just play.
  }
}

// The game is created on the first PLAY, so nothing ticks behind the lobby.
// GameLoop pauses on document.hidden; game.ts wires the resize handler.
let game: GameHandle | null = null;
const lobby = createLobby(document.body, {
  getBest: readBestTime,
  onPlay: () => {
    lobby.hide();
    requestImmersive();
    if (game === null) game = startGame(canvas, document.body);
    else game.resume();
  },
  onMenu: () => {
    game?.pause();
    lobby.show();
  },
});
// HUD pause button (hud.ts) asks for the same menu path as the lobby's onMenu.
window.addEventListener('zt-menu', () => {
  game?.pause();
  lobby.show();
});
