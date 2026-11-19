// Win-screen leaderboard panel (L4): name entry (first time) and the top Classic times. Everything online
// goes through the lazy ../../app/online chunk; with no Supabase config, or on any failure, the panel stays
// empty or shows one quiet line, and PLAY AGAIN is never blocked.
import type { BoardMode, BoardRow, FriendRow, Online } from '../../app/online';
import { formatRunTime } from './hud';

type Loader = () => Promise<{ appOnline(): Online | null }>;
const TOP_N = 8;

/** Per-mode board text: Classic ranks times, Chase ranks points (the `ticks` field carries either). */
const MODE_UI: Record<BoardMode, { title: string; noun: string; fmt: (v: number) => string }> = {
  classic: { title: 'Classic leaderboard', noun: 'time', fmt: (v) => formatRunTime(v / 60) },
  chase: { title: 'Dragon Chase leaderboard', noun: 'score', fmt: (v) => String(Math.floor(v)) },
};

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
  fmt: (v: number) => string = (v) => formatRunTime(v / 60),
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
      node('span', 'tm', fmt(r.ticks)),
    );
    ol.append(li);
  });
  return ol;
}

/** Fills `host` for one finished run (`ticks` = run ticks for Classic, points for Chase). Safe to call with no network. */
export function mountBoard(
  host: HTMLElement,
  ticks: number,
  mode: BoardMode = 'classic',
  load: Loader = () => import('../../app/online'),
): void {
  host.replaceChildren();
  if (!(ticks > 0)) return;
  void load()
    .then(async (m) => {
      const online = m.appOnline();
      if (online === null) return;
      if (online.hasPlayer()) await post(host, online, ticks, mode);
      else askName(host, online, ticks, mode);
    })
    .catch(() => undefined);
}

async function post(
  host: HTMLElement,
  online: Online,
  ticks: number,
  mode: BoardMode,
): Promise<void> {
  const ui = MODE_UI[mode];
  const status = node('p', 'board-note', `Posting your ${ui.noun}...`);
  host.replaceChildren(status);
  const res = await online.submit(ticks, mode);
  await online.redeemPending();
  const rows = await online.top(TOP_N, mode);
  if (rows.length === 0) {
    status.textContent = res ? '' : `Offline: your ${ui.noun} is saved on this device.`;
    return;
  }
  const mine = res?.bestTicks ?? ticks;
  const me = online.playerName();
  const list = node('div', 'board-list');
  const tabs = node('div', 'board-tabs');
  const global = node('button', 'tab on', 'GLOBAL') as HTMLButtonElement;
  const friends = node('button', 'tab', 'FRIENDS') as HTMLButtonElement;
  for (const b of [global, friends]) (b as HTMLButtonElement).type = 'button';
  tabs.append(global, friends);
  const showGlobal = (): void => {
    global.classList.add('on');
    friends.classList.remove('on');
    list.replaceChildren(renderRows(rows, me, mine, ui.fmt));
    list.querySelector('.me')?.scrollIntoView({ block: 'nearest' });
  };
  const showFriends = async (): Promise<void> => {
    friends.classList.add('on');
    global.classList.remove('on');
    list.replaceChildren(node('p', 'board-note', 'Loading...'));
    const fr = await online.friendsTop(TOP_N, mode);
    if (!friends.classList.contains('on')) return; // user switched back meanwhile
    list.replaceChildren(
      fr.length > 0
        ? renderFriendRows(fr, ui.fmt)
        : node('p', 'board-note', 'No friends yet. Share your link below.'),
      inviteButton(online),
    );
  };
  global.addEventListener('click', showGlobal);
  friends.addEventListener('click', () => void showFriends());
  const added = online.takeNotice();
  host.replaceChildren(
    node('h2', 'board-title', ui.title),
    ...(added ? [node('p', 'board-note', `You and ${added} are now friends.`)] : []),
    tabs,
    list,
  );
  host.append(privacyRow(host, online));
  showGlobal();
  if (added) void showFriends();
}

/** Privacy link and "delete my data" (name-only players have no account page, so it lives here). */
function privacyRow(host: HTMLElement, online: Online): HTMLElement {
  const row = node('p', 'board-note board-privacy');
  const a = document.createElement('a');
  a.href = 'privacy.html';
  a.target = '_blank';
  a.rel = 'noopener';
  a.textContent = 'Privacy';
  const del = node('button', 'link', 'Delete my data') as HTMLButtonElement;
  del.type = 'button';
  del.addEventListener('click', () => {
    if (
      !confirm('Delete your name, times and friends from the leaderboard? This cannot be undone.')
    )
      return;
    void online.deleteMyData().then((ok) => {
      host.replaceChildren(
        node(
          'p',
          'board-note',
          ok ? 'Your leaderboard data was deleted.' : 'Could not reach the server. Try again.',
        ),
      );
    });
  });
  row.append(a, ' · ', del);
  return row;
}

function renderFriendRows(rows: FriendRow[], fmt: (v: number) => string): HTMLElement {
  const ol = renderRows(rows, null, null, fmt);
  rows.forEach((r, i) => ol.children[i]?.classList.toggle('me', r.me));
  return ol;
}

/** Copies (or shares) the invite link; shows the link itself if neither works. */
function inviteButton(online: Online): HTMLElement {
  const wrap = node('div', 'board-invite');
  const btn = node('button', 'invite', 'INVITE A FRIEND') as HTMLButtonElement;
  btn.type = 'button';
  const note = node('p', 'board-note');
  btn.addEventListener('click', () => {
    void (async () => {
      note.textContent = '...';
      const link = await online.inviteLink();
      if (link === null) {
        note.textContent = 'Could not reach the server. Try again.';
        return;
      }
      try {
        if (typeof navigator.share === 'function')
          await navigator.share({ title: 'Bhaaag', url: link });
        else await navigator.clipboard.writeText(link);
        note.textContent = 'Link ready. Send it to a friend.';
      } catch {
        note.textContent = link; // clipboard blocked or share cancelled: show it to copy by hand
      }
    })();
  });
  wrap.append(btn, note);
  return wrap;
}

function askName(host: HTMLElement, online: Online, ticks: number, mode: BoardMode): void {
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
  go.textContent = mode === 'chase' ? 'POST SCORE' : 'POST TIME';
  const err = node('p', 'board-note');
  form.append(input, go, err);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!online.setPlayerName(input.value)) {
      err.textContent = 'Use 3 to 20 characters.';
      return;
    }
    void post(host, online, ticks, mode);
  });
  host.replaceChildren(form);
}
