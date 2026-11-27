// Level builder page (ADR 0014, 0016): ?builder. Top-down 2D canvas + a side panel, vanilla DOM.
// All rules live in src/content/builder (pure, tested); this file only draws and routes input.
import {
  compileLevel,
  linkOptions,
  newProblem,
  roofHeight,
  validate,
  viaName,
} from '../../content/builder/compile';
import type { LinkChoice, Problem, Report } from '../../content/builder/compile';
import { icon, iconImage } from './icons';
import type { IconName } from './icons';
import {
  GAP_VIAS,
  HOUSE_HALF,
  emptyLevel,
  parseBuilderLevel,
  serializeBuilderLevel,
} from '../../content/builder/format';
import type { BuilderLevel, GapVia } from '../../content/builder/format';
import {
  History,
  addEdge,
  addHouse,
  archetypeStoreys,
  blocked,
  houseById,
  moveHouse,
  removeEdge,
  removeHouse,
  setGoal,
  setStart,
  snapPosition,
  updateHouse,
} from '../../content/builder/model';
import { HK } from '../../content/house/houseSpec';
import { hayFinish } from '../../content/builder/hayFinish';
import { ARCHETYPE_IDS } from '../../content/house/archetypes';
import type { ArchetypeId } from '../../content/house/archetypes';
import { kitSampleLevel, sampleLevel } from '../../content/builder/sample';
import { loadDraft, saveDraft } from '../../content/builder/draft';
import { savePlayLevel } from '../../content/builder/store';
import {
  readLibrary,
  removeFromLibrary,
  saveToLibrary,
  setLibraryVisible,
} from '../../content/builder/library';

type Tool = 'select' | 'house' | 'zip' | 'gap' | 'delete';
const TOOLS: [Tool, IconName, string][] = [
  ['select', 'move', 'Move'],
  ['house', 'addhouse', 'Add house'],
  ['zip', 'zip', 'Zipline'],
  ['gap', 'gap', 'Gap link'],
  ['delete', 'del', 'Delete'],
];
const VIA_ICON: Record<GapVia, IconName> = {
  jump: 'jump',
  tramp: 'tramp',
  cushion: 'cushion',
  boxes: 'boxes',
  stairs: 'stairs',
};
const VIA_HELP: Record<GapVia, string> = {
  jump: 'Hero leaps the gap and lands on the far roof (or grabs its ledge).',
  tramp: 'A bounce pad launches the hero up and across.',
  cushion: 'Soft landing pad on a lower roof, for bigger drops.',
  boxes: 'Crate steps fill the gap. Walkable both ways.',
  stairs: 'Stairs fill the gap. Walkable both ways.',
};
const TOOL_HINT: Record<Tool, string> = {
  select: 'Drag a house to move it. Drag empty ground to pan, scroll to zoom.',
  house: 'Click empty ground to place a house.',
  zip: 'Drag from one house to another: a fixed zipline (start roof must be higher).',
  gap: 'Drag from one house to another to link them with the chosen gap type.',
  delete: 'Click a house or a link to remove it.',
};

const CSS = `
#bld{position:fixed;inset:0;display:flex;background:#1d2530;color:#eee;font:13px system-ui,sans-serif;z-index:50;touch-action:none}
#bld aside{width:290px;overflow:auto;padding:10px;background:#252f3d;box-sizing:border-box;flex:none}
#bld canvas{flex:1;min-width:0;display:block;width:100%}
#bld h3{margin:12px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#9fb0c4}
#bld button,#bld select,#bld input{font:inherit;margin:2px 2px 2px 0;padding:4px 8px;border-radius:4px;border:1px solid #4a5a70;background:#2f3b4d;color:#eee}
#bld button.on{background:#c9a227;color:#222;border-color:#c9a227}
#bld input[type=text]{width:120px}#bld input[type=number]{width:64px}
#bld .err{color:#ff8a7a}#bld .warn{color:#f0c060}#bld .ok{color:#8fd49a}#bld .note{color:#9fb0c4}
#bld textarea{width:100%;height:80px;box-sizing:border-box;background:#1b222c;color:#eee;border:1px solid #4a5a70;font:11px monospace}
#bld aside{width:310px}
#bld .ic{vertical-align:middle;flex:none}
#bld .grid{display:flex;flex-wrap:wrap;gap:4px}
#bld .big{display:flex;flex-direction:column;align-items:center;gap:2px;width:62px;padding:6px 2px;font-size:11px;line-height:1.1;text-align:center;margin:0}
#bld .row{display:flex;align-items:center;gap:6px}
#bld button.ib{display:inline-flex;align-items:center;gap:5px}
#bld .prob{display:flex;gap:8px;align-items:flex-start;margin:4px 0;padding:6px;border-radius:6px;background:#1b222c;border-left:3px solid #ff6b5a;cursor:pointer;user-select:text}
#bld .prob.warn{border-left-color:#f0c060}
#bld .prob:hover,#bld .prob.pin{background:#2a1f22}
#bld .prob b{display:block;color:#eee;font-weight:600}
#bld .prob span{color:#9fb0c4}
#bld .hintbar{position:absolute;left:12px;right:12px;bottom:12px;padding:8px 12px;border-radius:8px;background:#141a22ee;color:#dfe8f3;pointer-events:none;display:flex;gap:8px;align-items:center}
#bld .hintbar.bad{background:#3a1a1aee;color:#ffd0c8}
#bld .hintbar.good{background:#173020ee;color:#c8f0d0}
#bld .stage{position:relative;flex:1;min-width:0;display:flex}
#bld details{margin-top:6px}#bld summary{cursor:pointer;color:#9fb0c4}
#bld textarea{user-select:text}
@media (max-width:700px){#bld{flex-direction:column}#bld aside{width:auto;max-height:45%}}
`;

export function mountBuilder(root: HTMLElement): void {
  const style = document.createElement('style');
  style.textContent = CSS;
  const wrap = document.createElement('div');
  wrap.id = 'bld';
  wrap.innerHTML =
    '<aside></aside><div class="stage"><canvas></canvas><div class="hintbar"></div></div>';
  root.append(style, wrap);
  const panel = wrap.querySelector('aside') as HTMLElement;
  const canvas = wrap.querySelector('canvas') as HTMLCanvasElement;
  const hintbar = wrap.querySelector('.hintbar') as HTMLElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const hist = new History<BuilderLevel>(loadDraft() ?? sampleLevel());
  let live: BuilderLevel | null = null; // a drag in progress, not yet in history
  let tool: Tool = 'select';
  let via: GapVia = 'jump';
  let storeys: 1 | 2 = 1;
  let newArch: ArchetypeId | undefined; // palette pick for new houses; undefined = plain box
  let sel = -1;
  let report: Report = validate(hist.present);
  let msg = '';
  const view = { cx: 0, cz: -50, scale: 5 }; // metres at screen centre, pixels per metre
  const cur = (): BuilderLevel => live ?? hist.present;
  let focus: { houses: number[]; edges: number[] } | null = null; // highlighted on the canvas
  let pinned = false; // focus set by clicking a problem; stays until the canvas is touched
  let status: { text: string; kind: 'info' | 'bad' | 'good' } | null = null; // the hint bar
  let preview: { house: number; ok: boolean } | null = null; // link target under the pointer
  const redraw = (): void => draw();

  function setStatus(text: string, kind: 'info' | 'bad' | 'good' = 'info'): void {
    status = { text, kind };
    renderHint();
  }
  function renderHint(): void {
    const h = status ?? {
      text:
        tool === 'gap'
          ? TOOL_HINT.gap + ' ' + VIA_HELP[via]
          : tool === 'house'
            ? 'Click empty ground to place a ' + storeys + '-storey house.'
            : TOOL_HINT[tool],
      kind: 'info' as const,
    };
    hintbar.className = 'hintbar ' + (h.kind === 'info' ? '' : h.kind);
    hintbar.innerHTML =
      icon(h.kind === 'bad' ? 'warn' : h.kind === 'good' ? 'ok' : 'hint', 18) + '<span></span>';
    (hintbar.lastElementChild as HTMLElement).textContent = h.text;
  }

  /** Apply an edit unless it would introduce a problem; then say exactly what it would break, and show where. */
  function commitChecked(next: BuilderLevel): boolean {
    const p = newProblem(report, validate(next));
    if (p !== null) {
      focus = { houses: p.houses, edges: p.edges };
      setStatus('Not allowed: ' + p.text + ' ' + p.fix, 'bad');
      renderPanel();
      draw();
      return false;
    }
    status = null;
    commit(next);
    return true;
  }
  function linkOptionsOk(a: number, b: number): boolean {
    const o = linkOptions(hist.present, a, b);
    return tool === 'zip' ? o.zip : o[via];
  }
  /** Why a link a -> b of the current kind would be refused, and which kinds would work. */
  function explainLink(a: number, b: number, kind: 'zip' | 'gap'): string {
    const l = hist.present;
    const next = kind === 'zip' ? addEdge(l, a, b, 'zip') : addEdge(l, a, b, 'gap', via);
    const p = newProblem(report, validate(next));
    const opts = linkOptions(l, a, b);
    const ok = (Object.keys(opts) as LinkChoice[]).filter((k) => opts[k]).map(viaName);
    return (
      (p?.text ?? 'That link is not allowed.') +
      (ok.length > 0
        ? ' Between these two houses these work: ' + ok.join(', ') + '.'
        : ' No link type works between these two houses as placed: move them closer or change heights.')
    );
  }

  function commit(next: BuilderLevel): void {
    hist.push(next);
    live = null;
    changed();
  }
  function changed(): void {
    report = validate(hist.present);
    saveDraft(hist.present);
    if (!pinned) focus = null;
    renderPanel();
    renderHint();
    draw();
  }

  const toX = (x: number): number => canvas.width / 2 + (x - view.cx) * view.scale;
  const toY = (z: number): number => canvas.height / 2 - (z - view.cz) * view.scale; // uphill (+z) is up
  const fromX = (px: number): number => view.cx + (px - canvas.width / 2) / view.scale;
  const fromZ = (py: number): number => view.cz - (py - canvas.height / 2) / view.scale;

  function hitHouse(px: number, py: number): number {
    const x = fromX(px);
    const z = fromZ(py);
    const l = cur();
    for (let i = l.houses.length - 1; i >= 0; i--) {
      const h = l.houses[i];
      if (Math.abs(x - h.x) <= HOUSE_HALF && Math.abs(z - h.z) <= HOUSE_HALF) return h.id;
    }
    return -1;
  }
  function hitEdge(px: number, py: number): number {
    for (const e of cur().edges) {
      const a = houseById(cur(), e.a);
      const b = houseById(cur(), e.b);
      if (a === undefined || b === undefined) continue;
      const [x0, y0, x1, y1] = [toX(a.x), toY(a.z), toX(b.x), toY(b.z)];
      const len2 = (x1 - x0) ** 2 + (y1 - y0) ** 2 || 1;
      const t = Math.max(0, Math.min(1, ((px - x0) * (x1 - x0) + (py - y0) * (y1 - y0)) / len2));
      if (Math.hypot(px - (x0 + t * (x1 - x0)), py - (y0 + t * (y1 - y0))) < 7) return e.id;
    }
    return -1;
  }

  function arrow(x0: number, y0: number, x1: number, y1: number): void {
    const ang = Math.atan2(y1 - y0, x1 - x0);
    const mx = (x0 + x1) / 2;
    const my = (y0 + y1) / 2;
    ctx.beginPath();
    ctx.moveTo(mx + Math.cos(ang) * 8, my + Math.sin(ang) * 8);
    ctx.lineTo(
      mx - Math.cos(ang) * 6 + Math.sin(ang) * 6,
      my - Math.sin(ang) * 6 - Math.cos(ang) * 6,
    );
    ctx.lineTo(
      mx - Math.cos(ang) * 6 - Math.sin(ang) * 6,
      my - Math.sin(ang) * 6 + Math.cos(ang) * 6,
    );
    ctx.closePath();
    ctx.fill();
  }

  let drag: {
    kind: 'house' | 'pan' | 'edge';
    id: number;
    ox: number;
    oz: number;
    sx: number;
    sy: number;
    cx: number;
    cz: number;
  } | null = null;
  let pointer = { x: 0, y: 0 };

  function draw(): void {
    const l = cur();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#26303d';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    // 8 m grid; z labels show downhill altitude of the bare hill, so the descent is visible.
    ctx.lineWidth = 1;
    ctx.font = '10px system-ui';
    const g = 8;
    for (let x = Math.floor(fromX(0) / g) * g; x < fromX(canvas.width); x += g) {
      ctx.strokeStyle = x === 0 ? '#566' : '#2e3a49';
      ctx.beginPath();
      ctx.moveTo(toX(x), 0);
      ctx.lineTo(toX(x), canvas.height);
      ctx.stroke();
    }
    for (let z = Math.floor(fromZ(canvas.height) / g) * g; z < fromZ(0); z += g) {
      ctx.strokeStyle = '#2e3a49';
      ctx.beginPath();
      ctx.moveTo(0, toY(z));
      ctx.lineTo(canvas.width, toY(z));
      ctx.stroke();
      if (z % 32 === 0) {
        ctx.fillStyle = '#6b7c91';
        ctx.fillText('z ' + z + (z === 0 ? '  (uphill is up)' : ''), 4, toY(z) - 2);
      }
    }
    const bad = new Set(report.edgeChecks.filter((c) => !c.ok).map((c) => c.edgeId));
    // Touching houses: a cream bar between the centres.
    ctx.strokeStyle = '#efe3c2';
    ctx.lineWidth = 6;
    ctx.setLineDash([]);
    for (const [a, b] of report.touching) {
      const ha = houseById(l, a);
      const hb = houseById(l, b);
      if (ha === undefined || hb === undefined) continue;
      ctx.beginPath();
      ctx.moveTo(toX(ha.x), toY(ha.z));
      ctx.lineTo(toX(hb.x), toY(hb.z));
      ctx.stroke();
    }
    const hay = hayFinish(l);
    if (hay !== null) {
      const p = hay.patch;
      ctx.fillStyle = '#4a5a3a';
      ctx.fillRect(toX(p.x0), toY(p.z1), (p.x1 - p.x0) * view.scale, (p.z1 - p.z0) * view.scale);
      const hs = HK.haySize * view.scale;
      ctx.fillStyle = '#efe3c2';
      ctx.fillRect(toX(hay.hay.x) - hs / 2, toY(hay.hay.z) - hs / 2, hs, hs);
      ctx.strokeStyle = '#8a7a52';
      ctx.lineWidth = 1.5;
      ctx.strokeRect(toX(hay.hay.x) - hs / 2, toY(hay.hay.z) - hs / 2, hs, hs);
    }
    const badHouses = new Set<number>();
    for (const pr of report.problems)
      if (pr.level === 'error') for (const h of pr.houses) badHouses.add(h);
    for (const h of l.houses) {
      const x = toX(h.x - HOUSE_HALF);
      const y = toY(h.z + HOUSE_HALF);
      const s = HOUSE_HALF * 2 * view.scale;
      ctx.fillStyle = h.storeys === 2 ? '#b98558' : '#d8b88a';
      ctx.fillRect(x, y, s, s);
      ctx.lineWidth = h.id === sel ? 3 : 1.5;
      ctx.strokeStyle = h.id === sel ? '#fff' : '#3a2a1c';
      ctx.strokeRect(x, y, s, s);
      if (h.balcony) {
        ctx.fillStyle = '#7a5a3c';
        ctx.fillRect(x, y - 2 * view.scale, s, 2 * view.scale);
      }
      ctx.fillStyle = '#222';
      ctx.font = 'bold 12px system-ui';
      const tag = (h.id === l.start ? 'START ' : '') + (h.id === l.goal ? 'GOAL ' : '');
      ctx.fillText(tag + '#' + h.id, x + 4, y + 14);
      ctx.font = '11px system-ui';
      ctx.fillText(h.storeys + ' storey  ' + roofHeight(h).toFixed(1) + ' m', x + 4, y + 28);
      const big = view.scale >= 7;
      const hi = iconImage(h.storeys === 2 ? 'house2' : 'house1', '#3a2a1c', redraw);
      const isz = Math.min(26, s * 0.45);
      if (big) ctx.drawImage(hi, x + s - isz - 4, y + s - isz - 4, isz, isz);
      if (big && h.balcony)
        ctx.drawImage(iconImage('balcony', '#3a2a1c', redraw), x + 4, y + s - isz - 4, isz, isz);
      if (badHouses.has(h.id)) {
        ctx.fillStyle = '#ff4a3a';
        ctx.beginPath();
        ctx.arc(x + s - 8, y + 8, 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 12px system-ui';
        ctx.fillText('!', x + s - 11, y + 12.5);
      }
      if (h.id === l.start || h.id === l.goal) {
        ctx.lineWidth = 3;
        ctx.strokeStyle = h.id === l.start ? '#6ccf7a' : '#ffd24a';
        ctx.strokeRect(x - 3, y - 3, s + 6, s + 6);
      }
    }
    for (const e of l.edges) {
      const a = houseById(l, e.a);
      const b = houseById(l, e.b);
      if (a === undefined || b === undefined) continue;
      const [x0, y0, x1, y1] = [toX(a.x), toY(a.z), toX(b.x), toY(b.z)];
      const col = bad.has(e.id) ? '#ff6b5a' : e.kind === 'zip' ? '#ffcf3a' : '#f4ecd8';
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      ctx.lineWidth = 3;
      ctx.setLineDash(e.kind === 'zip' ? [] : [9, 6]);
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.stroke();
      ctx.setLineDash([]);
      arrow(x0, y0, x1, y1);
      ctx.font = '11px system-ui';
      const mx = (x0 + x1) / 2;
      const my = (y0 + y1) / 2;
      ctx.fillStyle = '#1d2530';
      ctx.beginPath();
      ctx.arc(mx, my - 14, 13, 0, Math.PI * 2);
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = col;
      ctx.stroke();
      ctx.drawImage(
        iconImage(e.kind === 'zip' ? 'zip' : VIA_ICON[e.via ?? 'jump'], col, redraw),
        mx - 9,
        my - 23,
        18,
        18,
      );
    }
    if (focus !== null) {
      ctx.save();
      ctx.shadowColor = '#ff3b30';
      ctx.shadowBlur = 18;
      ctx.strokeStyle = '#ff5a4a';
      for (const id of focus.edges) {
        const e = l.edges.find((q) => q.id === id);
        const a = e && houseById(l, e.a);
        const b = e && houseById(l, e.b);
        if (!a || !b) continue;
        ctx.lineWidth = 7;
        ctx.beginPath();
        ctx.moveTo(toX(a.x), toY(a.z));
        ctx.lineTo(toX(b.x), toY(b.z));
        ctx.stroke();
      }
      for (const id of focus.houses) {
        const h = houseById(l, id);
        if (!h) continue;
        ctx.lineWidth = 5;
        const q = HOUSE_HALF * view.scale + 5;
        ctx.strokeRect(toX(h.x) - q, toY(h.z) - q, q * 2, q * 2);
      }
      ctx.restore();
    }
    if (preview !== null) {
      const h = houseById(l, preview.house);
      if (h) {
        ctx.lineWidth = 5;
        ctx.strokeStyle = preview.ok ? '#6ccf7a' : '#ff5a4a';
        const q = HOUSE_HALF * view.scale + 4;
        ctx.strokeRect(toX(h.x) - q, toY(h.z) - q, q * 2, q * 2);
      }
    }
    if (drag !== null && drag.kind === 'edge') {
      const a = houseById(l, drag.id);
      if (a !== undefined) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 4]);
        ctx.beginPath();
        ctx.moveTo(toX(a.x), toY(a.z));
        ctx.lineTo(pointer.x, pointer.y);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
  }

  function pos(ev: MouseEvent): { x: number; y: number } {
    const r = canvas.getBoundingClientRect();
    return {
      x: ((ev.clientX - r.left) * canvas.width) / r.width,
      y: ((ev.clientY - r.top) * canvas.height) / r.height,
    };
  }

  canvas.addEventListener('pointerdown', (ev) => {
    const p = pos(ev);
    pointer = p;
    canvas.setPointerCapture(ev.pointerId);
    pinned = false;
    focus = null;
    status = null;
    renderHint();
    const hit = hitHouse(p.x, p.y);
    const l = cur();
    if (tool === 'house' && hit === -1) {
      const s = snapPosition(l, -1, fromX(p.x), fromZ(p.y));
      if (blocked(l, -1, s.x, s.z)) {
        setStatus('Not allowed: that spot overlaps another house.', 'bad');
        return;
      }
      const next = addHouse(l, s.x, s.z, storeys, newArch);
      sel = next.houses[next.houses.length - 1].id;
      commit(next);
      return;
    }
    if (tool === 'delete') {
      if (hit !== -1) commit(removeHouse(l, hit));
      else {
        const e = hitEdge(p.x, p.y);
        if (e !== -1) commit(removeEdge(l, e));
      }
      sel = -1;
      return;
    }
    if ((tool === 'zip' || tool === 'gap') && hit !== -1) {
      drag = { kind: 'edge', id: hit, ox: 0, oz: 0, sx: p.x, sy: p.y, cx: 0, cz: 0 };
      return;
    }
    if (hit !== -1) {
      const h = houseById(l, hit);
      sel = hit;
      drag = {
        kind: 'house',
        id: hit,
        ox: (h?.x ?? 0) - fromX(p.x),
        oz: (h?.z ?? 0) - fromZ(p.y),
        sx: p.x,
        sy: p.y,
        cx: 0,
        cz: 0,
      };
      renderPanel();
    } else {
      sel = -1;
      drag = { kind: 'pan', id: -1, ox: 0, oz: 0, sx: p.x, sy: p.y, cx: view.cx, cz: view.cz };
      renderPanel();
    }
    draw();
  });
  canvas.addEventListener('pointermove', (ev) => {
    const p = pos(ev);
    pointer = p;
    if (drag === null) return;
    if (drag.kind === 'pan') {
      view.cx = drag.cx - (p.x - drag.sx) / view.scale;
      view.cz = drag.cz + (p.y - drag.sy) / view.scale;
    } else if (drag.kind === 'house') {
      const s = snapPosition(hist.present, drag.id, fromX(p.x) + drag.ox, fromZ(p.y) + drag.oz);
      if (blocked(hist.present, drag.id, s.x, s.z)) {
        setStatus('Not allowed: houses cannot overlap.', 'bad');
      } else {
        const cand = moveHouse(hist.present, drag.id, s.x, s.z);
        const bad = newProblem(report, validate(cand));
        if (bad === null) {
          live = cand;
          focus = null;
          status = null;
          renderHint();
        } else {
          focus = { houses: bad.houses, edges: bad.edges };
          setStatus('Not allowed here: ' + bad.text, 'bad');
        }
      }
    } else if (drag.kind === 'edge') {
      const t = hitHouse(p.x, p.y);
      if (t !== -1 && t !== drag.id) {
        const ok = linkOptionsOk(drag.id, t);
        preview = { house: t, ok };
        if (ok) setStatus('Release to link house ' + drag.id + ' to house ' + t + '.', 'good');
        else setStatus(explainLink(drag.id, t, tool === 'zip' ? 'zip' : 'gap'), 'bad');
      } else {
        preview = null;
        status = null;
        renderHint();
      }
    }
    draw();
  });
  canvas.addEventListener('pointerup', (ev) => {
    const p = pos(ev);
    const d = drag;
    drag = null;
    if (d === null) return;
    if (d.kind === 'house' && live !== null) commit(live);
    else if (d.kind === 'edge') {
      const to = hitHouse(p.x, p.y);
      preview = null;
      if (to !== -1 && to !== d.id) {
        const kind = tool === 'zip' ? 'zip' : 'gap';
        if (linkOptionsOk(d.id, to)) commitChecked(addEdge(hist.present, d.id, to, kind, via));
        else {
          focus = { houses: [d.id, to], edges: [] };
          setStatus('Not allowed: ' + explainLink(d.id, to, kind), 'bad');
          draw();
        }
      } else draw();
    } else draw();
  });
  canvas.addEventListener(
    'wheel',
    (ev) => {
      ev.preventDefault();
      const p = pos(ev);
      const x = fromX(p.x);
      const z = fromZ(p.y);
      view.scale = Math.max(1.5, Math.min(20, view.scale * (ev.deltaY < 0 ? 1.12 : 1 / 1.12)));
      view.cx = x - (p.x - canvas.width / 2) / view.scale;
      view.cz = z + (p.y - canvas.height / 2) / view.scale;
      draw();
    },
    { passive: false },
  );
  window.addEventListener('keydown', (ev) => {
    const t = ev.target as HTMLElement;
    if (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA') return;
    const mod = ev.metaKey || ev.ctrlKey;
    if (mod && ev.key.toLowerCase() === 'z') {
      ev.preventDefault();
      if (ev.shiftKey ? hist.redo() : hist.undo()) changed();
    } else if (mod && ev.key.toLowerCase() === 'y') {
      if (hist.redo()) changed();
    } else if ((ev.key === 'Delete' || ev.key === 'Backspace') && sel !== -1) {
      commit(removeHouse(hist.present, sel));
      sel = -1;
      renderPanel();
    }
  });

  function resize(): void {
    const r = canvas.getBoundingClientRect();
    canvas.width = Math.max(100, Math.round(r.width));
    canvas.height = Math.max(100, Math.round(r.height));
    draw();
  }
  window.addEventListener('resize', resize);

  function download(name: string, text: string): void {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  }

  function play(): void {
    try {
      if (!savePlayLevel(compileLevel(hist.present), serializeBuilderLevel(hist.present)))
        throw new Error('storage blocked');
      msg = 'Opened in a new tab.';
      window.open(location.pathname + '?mode=classic&level=builder', '_blank');
    } catch (err) {
      msg = 'Cannot play: ' + (err instanceof Error ? err.message : String(err));
    }
    renderPanel();
  }

  function saveLibrary(): void {
    try {
      const l = hist.present;
      if (!saveToLibrary(l, compileLevel(l))) throw new Error('storage blocked');
      msg = 'Saved "' + l.name + '" to the library (hidden until you tick Show in lobby).';
    } catch (err) {
      msg = 'Cannot save: ' + (err instanceof Error ? err.message : String(err));
    }
  }

  function esc(s: string): string {
    return s.replace(
      /[&<>"]/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c,
    );
  }

  function reportText(): string {
    const l = hist.present;
    const r = report;
    const lines = [
      'Level: ' + l.name + ' (' + l.id + ')',
      'Houses: ' +
        l.houses.length +
        ', links: ' +
        l.edges.length +
        ', start: ' +
        l.start +
        ', goal: ' +
        l.goal,
      'Result: ' +
        (r.ok ? 'valid' : r.problems.filter((p) => p.level === 'error').length + ' problem(s)'),
    ];
    for (const p of r.problems)
      lines.push(
        '- [' +
          (p.level === 'error' ? 'PROBLEM' : 'WARNING') +
          '] ' +
          p.text +
          ' Fix: ' +
          p.fix +
          (p.houses.length ? ' (houses ' + p.houses.join(', ') + ')' : '') +
          (p.edges.length ? ' (links ' + p.edges.join(', ') + ')' : ''),
      );
    for (const c of r.edgeChecks) {
      const e = l.edges.find((q) => q.id === c.edgeId);
      if (e)
        lines.push(
          '  link ' +
            e.id +
            ' ' +
            e.a +
            '->' +
            e.b +
            ' ' +
            (e.via ?? 'zip') +
            ': ' +
            (c.ok ? 'ok' : 'FAIL ') +
            c.note,
        );
    }
    lines.push(
      'Routes: ' +
        r.escapePaths +
        ', dead-end houses: ' +
        (r.deadEnds.length ? r.deadEnds.join(', ') : 'none') +
        '. Modelled from tuning, not the sim.',
    );
    return lines.join('\n');
  }

  function problemCard(p: Problem, i: number): string {
    return `<div class="prob ${p.level === 'warn' ? 'warn' : ''}" data-prob="${i}">${icon(p.level === 'warn' ? 'warn' : 'error', 18)}<div><b>${esc(p.text)}</b><span>${esc(p.fix)}</span></div></div>`;
  }

  function renderPanel(): void {
    const l = hist.present;
    const h = sel === -1 ? undefined : houseById(l, sel);
    const r = report;
    const nErr = r.problems.filter((p) => p.level === 'error').length;
    const btn = (act: string, ic: IconName, label: string, extra = ''): string =>
      `<button class="ib" data-act="${act}" ${extra}>${icon(ic, 16)}${label}</button>`;
    panel.innerHTML =
      `<div class="row"><b>Level builder</b> <a href="${location.pathname}" style="color:#c9a227;margin-left:auto">Back to game</a></div>
      <h3>Level</h3>
      <input type="text" data-f="id" value="${esc(l.id)}" title="file id: new iteration = new id"> <input type="text" data-f="name" value="${esc(l.name)}">
      <div class="row">Finish <select data-f="finish" title="How the level ends: drop into a haystack below the goal house, or land on the goal roof"><option value="hay" ${l.finish === 'hay' ? 'selected' : ''}>Haystack</option><option value="roof" ${l.finish === 'hay' ? '' : 'selected'}>Roof</option></select></div>
      <h3>Tools</h3><div class="grid">` +
      TOOLS.map(
        ([t, ic, label]) =>
          `<button class="big ${tool === t ? 'on' : ''}" data-tool="${t}" title="${esc(TOOL_HINT[t])}">${icon(ic, 26)}${label}</button>`,
      ).join('') +
      `</div>` +
      (tool === 'gap'
        ? `<h3>Gap crossed by</h3><div class="grid">` +
          GAP_VIAS.map(
            (v) =>
              `<button class="big ${v === via ? 'on' : ''}" data-via="${v}" title="${esc(VIA_HELP[v])}">${icon(VIA_ICON[v], 26)}${viaName(v)}</button>`,
          ).join('') +
          `</div><div class="note">${esc(VIA_HELP[via])}</div>`
        : tool === 'zip'
          ? '<div class="note">Solid gold line = fixed zipline, from a higher roof down to a lower one.</div>'
          : '') +
      `<h3>New house size</h3><div class="grid"><button class="big ${storeys === 1 ? 'on' : ''}" data-st="1">${icon('house1', 26)}1 storey</button><button class="big ${storeys === 2 ? 'on' : ''}" data-st="2">${icon('house2', 26)}2 storeys</button></div>
      New houses: <select data-f="newarch"><option value="">plain box (uses size above)</option>${ARCHETYPE_IDS.map((a) => `<option ${a === newArch ? 'selected' : ''}>${a}</option>`).join('')}</select>
      <div class="note">Cream bar between houses = they touch (adjoining).</div>
      <h3>${h === undefined ? 'House' : 'House #' + h.id}</h3>` +
      (h === undefined
        ? '<div class="note">Click a house to edit it.</div>'
        : `<div class="grid"><button class="big ${h.storeys === 1 ? 'on' : ''}" data-sto="1" ${h.archetype === undefined ? '' : 'disabled'}>${icon('house1', 26)}1 storey</button><button class="big ${h.storeys === 2 ? 'on' : ''}" data-sto="2" ${h.archetype === undefined ? '' : 'disabled'}>${icon('house2', 26)}2 storeys</button></div>
           lift <input type="number" step="0.5" min="0" max="12" data-f="lift" value="${h.lift}"> m &nbsp; roof ${roofHeight(h).toFixed(1)} m
           <label class="row">${icon('balcony', 18)}<input type="checkbox" data-f="balcony" ${h.balcony ? 'checked' : ''} ${h.archetype === undefined ? '' : 'disabled'}> balcony</label>
            type <select data-f="arch"><option value="">plain box</option>${ARCHETYPE_IDS.map((a) => `<option ${a === h.archetype ? 'selected' : ''}>${a}</option>`).join('')}</select><br>
           ${btn('start', 'start', 'Set start')}${btn('goal', 'goal', 'Set goal')}${btn('del', 'del', 'Delete')}`) +
      `<h3>Edit</h3>${btn('undo', 'undo', 'Undo', hist.canUndo ? '' : 'disabled')}${btn('redo', 'redo', 'Redo', hist.canRedo ? '' : 'disabled')}
      <h3>Check</h3><div class="row ${r.ok ? 'ok' : 'err'}">${icon(r.ok ? 'ok' : 'error', 20)}<b>${r.ok ? 'Valid: start reaches goal' : nErr + ' problem' + (nErr === 1 ? '' : 's') + ' to fix'}</b></div>` +
      (r.problems.length > 0
        ? '<div class="note">Click a problem to see it on the map.</div>'
        : '') +
      r.problems.map(problemCard).join('') +
      `<div class="note">routes: ${r.escapePaths}, dead-end houses: ${r.deadEnds.length ? r.deadEnds.join(', ') : 'none'}. Modelled from tuning, not the sim.</div>
      ${btn('copy', 'copy', 'Copy report')}
      <details><summary>Report text (select to copy)</summary><textarea readonly data-f="report">${esc(reportText())}</textarea></details>
      <h3>File</h3>${btn('play', 'play', 'Play this level')}${btn('export', 'download', 'Download JSON')}
      ${btn('import', 'import', 'Import…')}${btn('new', 'new', 'New')}${btn('sample', 'sample', 'Sample')}${btn('kit', 'sample', 'Kit sample')}
      <input type="file" accept=".json,application/json" data-f="file" hidden>
      <h3>Library</h3>${btn('save', 'save', 'Save to library')}` +
      (readLibrary().length === 0
        ? '<div class="note">No saved levels yet. Saved levels start hidden; tick Show in lobby to publish one to Classic.</div>'
        : readLibrary()
            .map(
              (e) =>
                `<div class="row"><label class="row" title="Show in Classic's level row">${icon(e.visible ? 'eye' : 'eyeoff', 18)}<input type="checkbox" data-f="vis" data-lid="${esc(e.id)}" ${e.visible ? 'checked' : ''}> lobby</label> <b>${esc(e.name)}</b> <button class="ib" data-lact="load" data-lid="${esc(e.id)}" title="Edit this level">${icon('edit', 16)}</button><button class="ib" data-lact="del" data-lid="${esc(e.id)}" title="Delete from library">${icon('del', 16)}</button></div>`,
            )
            .join('')) +
      `<div class="${msg.startsWith('Cannot') || msg.startsWith('Import') ? 'err' : 'note'}">${esc(msg)}</div>`;
  }

  async function copyReport(): Promise<void> {
    const text = reportText();
    try {
      await navigator.clipboard.writeText(text);
      msg = 'Report copied.';
    } catch {
      const ta = panel.querySelector('[data-f=report]') as HTMLTextAreaElement | null;
      const det = ta?.closest('details');
      if (det) det.open = true;
      ta?.focus();
      ta?.select();
      msg = document.execCommand('copy') ? 'Report copied.' : 'Select the text below and copy it.';
    }
    renderPanel();
  }

  function focusProblem(i: number, pin: boolean): void {
    const p = report.problems[i];
    if (p === undefined) return;
    focus = { houses: p.houses, edges: p.edges };
    if (pin) {
      pinned = true;
      const hs = p.houses.map((id) => houseById(hist.present, id)).filter((q) => q !== undefined);
      if (hs.length > 0) {
        view.cx = hs.reduce((a, q) => a + q.x, 0) / hs.length;
        view.cz = hs.reduce((a, q) => a + q.z, 0) / hs.length;
      }
      setStatus(p.text + ' ' + p.fix, p.level === 'error' ? 'bad' : 'info');
    }
    draw();
  }
  panel.addEventListener('mouseover', (ev) => {
    const el = (ev.target as HTMLElement).closest<HTMLElement>('[data-prob]');
    if (el && !pinned) focusProblem(Number(el.dataset.prob), false);
  });
  panel.addEventListener('mouseout', (ev) => {
    if ((ev.target as HTMLElement).closest('[data-prob]') && !pinned) {
      focus = null;
      draw();
    }
  });

  panel.addEventListener('click', (ev) => {
    const pr = (ev.target as HTMLElement).closest<HTMLElement>('[data-prob]');
    if (pr !== null) return focusProblem(Number(pr.dataset.prob), true);
    const b = (ev.target as HTMLElement).closest('button');
    if (b === null || b.disabled) return;
    const l = hist.present;
    const d = b.dataset;
    if (d.tool !== undefined) {
      tool = d.tool as Tool;
      status = null;
      renderHint();
    } else if (d.via !== undefined) {
      via = d.via as GapVia;
      renderHint();
    } else if (d.st !== undefined) storeys = d.st === '2' ? 2 : 1;
    else if (d.sto !== undefined && sel !== -1)
      return void commitChecked(updateHouse(l, sel, { storeys: d.sto === '2' ? 2 : 1 }));
    else if (d.act === 'start' && sel !== -1) return commit(setStart(l, sel));
    else if (d.act === 'goal' && sel !== -1) return commit(setGoal(l, sel));
    else if (d.act === 'del' && sel !== -1) {
      const id = sel;
      sel = -1;
      return commit(removeHouse(l, id));
    } else if (d.act === 'undo') {
      if (hist.undo()) return changed();
    } else if (d.act === 'redo') {
      if (hist.redo()) return changed();
    } else if (d.act === 'copy') return void copyReport();
    else if (d.act === 'play') return play();
    else if (d.act === 'save') saveLibrary();
    else if (d.lact === 'load' && d.lid !== undefined) {
      const e = readLibrary().find((x) => x.id === d.lid);
      if (e !== undefined) {
        sel = -1;
        msg = 'Loaded ' + e.id;
        return commit(e.source);
      }
    } else if (d.lact === 'del' && d.lid !== undefined) {
      removeFromLibrary(d.lid);
      msg = 'Deleted ' + d.lid + ' from the library.';
    } else if (d.act === 'export') {
      download(l.id + '.builder.json', serializeBuilderLevel(l));
      msg = 'Downloaded ' + l.id + '.builder.json';
    } else if (d.act === 'import') {
      (panel.querySelector('[data-f=file]') as HTMLInputElement).click();
      return;
    } else if (d.act === 'new') {
      sel = -1;
      return commit({
        ...emptyLevel('level-' + Date.now().toString(36), 'New level'),
        finish: 'hay',
      });
    } else if (d.act === 'kit') {
      sel = -1;
      return commit(kitSampleLevel());
    } else if (d.act === 'sample') {
      sel = -1;
      return commit(sampleLevel());
    }
    renderPanel();
    draw();
  });
  panel.addEventListener('change', (ev) => {
    const t = ev.target as HTMLInputElement;
    const f = t.dataset.f;
    const l = hist.present;
    if (f === 'vis' && t.dataset.lid !== undefined) {
      setLibraryVisible(t.dataset.lid, t.checked);
      msg = t.checked ? 'Now listed in the lobby.' : 'Hidden from the lobby.';
      renderPanel();
    } else if (f === 'id') {
      const id = t.value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+/, '');
      if (id !== '') commit({ ...l, id });
    } else if (f === 'name') commit({ ...l, name: t.value });
    else if (f === 'finish') commit({ ...l, finish: t.value === 'hay' ? 'hay' : 'roof' });
    else if (f === 'lift' && sel !== -1)
      void commitChecked(
        updateHouse(l, sel, { lift: Math.max(0, Math.min(12, Number(t.value) || 0)) }),
      );
    else if (f === 'newarch') newArch = t.value === '' ? undefined : (t.value as ArchetypeId);
    else if (f === 'arch' && sel !== -1) {
      const a = t.value === '' ? undefined : (t.value as ArchetypeId);
      void commitChecked(
        updateHouse(
          l,
          sel,
          a === undefined
            ? { archetype: undefined }
            : { archetype: a, storeys: archetypeStoreys(a) },
        ),
      );
    } else if (f === 'balcony' && sel !== -1)
      void commitChecked(updateHouse(l, sel, { balcony: t.checked }));
    else if (f === 'file' && t.files !== null && t.files[0] !== undefined) {
      void t.files[0].text().then((text) => {
        try {
          const next = parseBuilderLevel(text);
          sel = -1;
          commit(next);
          msg = 'Imported ' + next.id;
        } catch (err) {
          msg = 'Import failed: ' + (err instanceof Error ? err.message : String(err));
          renderPanel();
        }
      });
    }
  });

  renderPanel();
  renderHint();
  resize();
}
