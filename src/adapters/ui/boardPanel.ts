// Win-screen leaderboard panel (L4): name entry (first time) and the top Classic times. Everything online
// goes through the lazy ../../app/online chunk; with no Supabase config, or on any failure, the panel stays
// empty or shows one quiet line, and PLAY AGAIN is never blocked.
import type { BoardRow, Online } from '../../app/online';
import { formatRunTime } from './hud';

type Loader = () => Promise<{ appOnline(): Online | null }>;
const TOP_N = 8;

function node(tag: string, cls: string, text = ''): HTMLElement {
  const e = document.createElement(tag);
  e.className = cls;
  if (text) e.textContent = text;
  return e;
}

export function renderRows(
  rows: BoardRow[],
  me: string | null,
  myTicks: number | null,
): HTMLElement {
  const ol = node('ol', 'board-rows');
  let marked = false;
  rows.forEach((r, i) => {
    const li = node('li', 'board-row');
    const mine = !marked && me !== null && r.name === me && r.ticks === myTicks;
    if (mine) {
      li.classList.add('me');
      marked = true;
    }
    li.append(
      node('span', 'rank', String(i + 1)),
      node('span', 'nm', r.name),
      node('span', 'tm', formatRunTime(r.ticks / 60)),
    );
    ol.append(li);
  });
  return ol;
}

/** Fills `host` for one finished Classic run (`ticks` = run ticks). Safe to call with no network. */
export function mountBoard(
  host: HTMLElement,
  ticks: number,
  load: Loader = () => import('../../app/online'),
): void {
  host.replaceChildren();
  if (!(ticks > 0)) return;
  void load()
    .then(async (m) => {
      const online = m.appOnline();
      if (online === null) return;
      if (online.hasPlayer()) await post(host, online, ticks);
      else askName(host, online, ticks);
    })
    .catch(() => undefined);
}

async function post(host: HTMLElement, online: Online, ticks: number): Promise<void> {
  const status = node('p', 'board-note', 'Posting your time...');
  host.replaceChildren(status);
  const res = await online.submit(ticks);
  const rows = await online.top(TOP_N);
  if (rows.length === 0) {
    status.textContent = res ? '' : 'Offline: your time is saved on this device.';
    return;
  }
  host.replaceChildren(
    node('h2', 'board-title', 'Classic leaderboard'),
    renderRows(rows, online.playerName(), res?.bestTicks ?? ticks),
  );
  host.querySelector('.me')?.scrollIntoView({ block: 'nearest' });
}

function askName(host: HTMLElement, online: Online, ticks: number): void {
  const form = node('form', 'board-form');
  const input = document.createElement('input');
  input.type = 'text';
  input.maxLength = 20;
  input.placeholder = 'Your name for the leaderboard';
  input.autocomplete = 'off';
  input.setAttribute('aria-label', 'Leaderboard name');
  // Keep typing away from the game's window-level key handlers (H, L, M hotkeys).
  for (const t of ['keydown', 'keyup']) input.addEventListener(t, (e) => e.stopPropagation());
  const go = document.createElement('button');
  go.type = 'submit';
  go.textContent = 'POST TIME';
  const err = node('p', 'board-note');
  form.append(input, go, err);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!online.setPlayerName(input.value)) {
      err.textContent = 'Use 3 to 20 characters.';
      return;
    }
    void post(host, online, ticks);
  });
  host.replaceChildren(form);
}
