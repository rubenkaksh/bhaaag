// Level builder page (ADR 0014), dev only: ?builder. Top-down 2D canvas + a side panel, vanilla DOM.
// All rules live in src/content/builder (pure, tested); this file only draws and routes input.
import { compileLevel, roofHeight, validate } from '../../content/builder/compile';
import type { Report } from '../../content/builder/compile';
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
import { sampleLevel } from '../../content/builder/sample';
import { loadDraft, saveDraft } from '../../content/builder/draft';
import { savePlayLevel } from '../../content/builder/store';

type Tool = 'select' | 'house' | 'zip' | 'gap' | 'delete';
const TOOLS: [Tool, string][] = [
  ['select', 'Move'],
  ['house', 'Add house'],
  ['zip', 'Zipline (solid)'],
  ['gap', 'Gap (dashed)'],
  ['delete', 'Delete'],
];

const CSS = `
#bld{position:fixed;inset:0;display:flex;background:#1d2530;color:#eee;font:13px system-ui,sans-serif;z-index:50;touch-action:none}
#bld aside{width:290px;overflow:auto;padding:10px;background:#252f3d;box-sizing:border-box;flex:none}
#bld canvas{flex:1;min-width:0;display:block}
#bld h3{margin:12px 0 4px;font-size:12px;text-transform:uppercase;letter-spacing:.06em;color:#9fb0c4}
#bld button,#bld select,#bld input{font:inherit;margin:2px 2px 2px 0;padding:4px 8px;border-radius:4px;border:1px solid #4a5a70;background:#2f3b4d;color:#eee}
#bld button.on{background:#c9a227;color:#222;border-color:#c9a227}
#bld input[type=text]{width:120px}#bld input[type=number]{width:64px}
#bld .err{color:#ff8a7a}#bld .warn{color:#f0c060}#bld .ok{color:#8fd49a}#bld .note{color:#9fb0c4}
#bld textarea{width:100%;height:80px;box-sizing:border-box;background:#1b222c;color:#eee;border:1px solid #4a5a70;font:11px monospace}
@media (max-width:700px){#bld{flex-direction:column}#bld aside{width:auto;max-height:45%}}
`;

export function mountBuilder(root: HTMLElement): void {
  const style = document.createElement('style');
  style.textContent = CSS;
  const wrap = document.createElement('div');
  wrap.id = 'bld';
  wrap.innerHTML = '<aside></aside><canvas></canvas>';
  root.append(style, wrap);
  const panel = wrap.querySelector('aside') as HTMLElement;
  const canvas = wrap.querySelector('canvas') as HTMLCanvasElement;
  const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

  const hist = new History<BuilderLevel>(loadDraft() ?? sampleLevel());
  let live: BuilderLevel | null = null; // a drag in progress, not yet in history
  let tool: Tool = 'select';
  let via: GapVia = 'jump';
  let storeys: 1 | 2 = 1;
  let sel = -1;
  let report: Report = validate(hist.present);
  let msg = '';
  const view = { cx: 0, cz: -50, scale: 5 }; // metres at screen centre, pixels per metre
  const cur = (): BuilderLevel => live ?? hist.present;

  function commit(next: BuilderLevel): void {
    hist.push(next);
    live = null;
    changed();
  }
  function changed(): void {
    report = validate(hist.present);
    saveDraft(hist.present);
    renderPanel();
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
      ctx.fillText(e.kind === 'zip' ? 'zip' : (e.via ?? ''), (x0 + x1) / 2 + 8, (y0 + y1) / 2 - 6);
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
    const hit = hitHouse(p.x, p.y);
    const l = cur();
    if (tool === 'house' && hit === -1) {
      const s = snapPosition(l, -1, fromX(p.x), fromZ(p.y));
      if (!blocked(l, -1, s.x, s.z)) {
        const next = addHouse(l, s.x, s.z, storeys);
        sel = next.houses[next.houses.length - 1].id;
        commit(next);
      }
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
      if (!blocked(hist.present, drag.id, s.x, s.z))
        live = moveHouse(hist.present, drag.id, s.x, s.z);
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
      if (to !== -1 && to !== d.id)
        commit(addEdge(hist.present, d.id, to, tool === 'zip' ? 'zip' : 'gap', via));
      else draw();
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
      if (!savePlayLevel(compileLevel(hist.present))) throw new Error('storage blocked');
      msg = 'Opened in a new tab.';
      window.open(location.pathname + '?mode=strategy&level=builder', '_blank');
    } catch (err) {
      msg = 'Cannot play: ' + (err instanceof Error ? err.message : String(err));
    }
    renderPanel();
  }

  function esc(s: string): string {
    return s.replace(
      /[&<>"]/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c] ?? c,
    );
  }

  function renderPanel(): void {
    const l = hist.present;
    const h = sel === -1 ? undefined : houseById(l, sel);
    const r = report;
    panel.innerHTML =
      `<b>Level builder</b> <span class="note">dev only</span>
      <h3>Level</h3>
      <input type="text" data-f="id" value="${esc(l.id)}" title="file id: new iteration = new id"> <input type="text" data-f="name" value="${esc(l.name)}">
      <h3>Tool</h3>` +
      TOOLS.map(
        ([t, label]) =>
          `<button data-tool="${t}" class="${tool === t ? 'on' : ''}">${label}</button>`,
      ).join('') +
      `<div class="note">Solid gold = fixed zipline. Dashed = gap crossed by: <select data-f="via">${GAP_VIAS.map((v) => `<option ${v === via ? 'selected' : ''}>${v}</option>`).join('')}</select>. Touching houses (cream bar) are adjoining. Drag between two houses to draw an edge.</div>
      New houses: <button data-st="1" class="${storeys === 1 ? 'on' : ''}">1 storey</button><button data-st="2" class="${storeys === 2 ? 'on' : ''}">2 storeys</button>
      <h3>${h === undefined ? 'House' : 'House #' + h.id}</h3>` +
      (h === undefined
        ? '<div class="note">Click a house.</div>'
        : `<button data-sto="1" class="${h.storeys === 1 ? 'on' : ''}">1 storey</button><button data-sto="2" class="${h.storeys === 2 ? 'on' : ''}">2 storeys</button><br>
           lift <input type="number" step="0.5" min="0" max="12" data-f="lift" value="${h.lift}"> m &nbsp; roof ${roofHeight(h).toFixed(1)} m
           <label><input type="checkbox" data-f="balcony" ${h.balcony ? 'checked' : ''}> balcony</label><br>
           <button data-act="start">Set start</button><button data-act="goal">Set goal</button><button data-act="del">Delete</button>`) +
      `<h3>Edit</h3><button data-act="undo" ${hist.canUndo ? '' : 'disabled'}>Undo</button><button data-act="redo" ${hist.canRedo ? '' : 'disabled'}>Redo</button>
      <h3>Check</h3><div class="${r.ok ? 'ok' : 'err'}">${r.ok ? 'Valid: start reaches goal' : r.errors.length + ' problem(s)'}</div>` +
      r.errors.map((m) => `<div class="err">${esc(m)}</div>`).join('') +
      r.warnings.map((m) => `<div class="warn">${esc(m)}</div>`).join('') +
      `<div class="note">routes: ${r.escapePaths}, dead-end houses: ${r.deadEnds.length ? r.deadEnds.join(', ') : 'none'}. Modelled from tuning, not the sim.</div>
      <h3>File</h3><button data-act="play">Play this level</button> <button data-act="export">Download JSON</button>
      <button data-act="import">Import…</button><button data-act="new">New</button><button data-act="sample">Sample</button>
      <input type="file" accept=".json,application/json" data-f="file" hidden>
      <div class="${msg.startsWith('Cannot') || msg.startsWith('Import') ? 'err' : 'note'}">${esc(msg)}</div>`;
  }

  panel.addEventListener('click', (ev) => {
    const b = (ev.target as HTMLElement).closest('button');
    if (b === null || b.disabled) return;
    const l = hist.present;
    const d = b.dataset;
    if (d.tool !== undefined) tool = d.tool as Tool;
    else if (d.st !== undefined) storeys = d.st === '2' ? 2 : 1;
    else if (d.sto !== undefined && sel !== -1)
      return commit(updateHouse(l, sel, { storeys: d.sto === '2' ? 2 : 1 }));
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
    } else if (d.act === 'play') return play();
    else if (d.act === 'export') {
      download(l.id + '.builder.json', serializeBuilderLevel(l));
      msg = 'Downloaded ' + l.id + '.builder.json';
    } else if (d.act === 'import') {
      (panel.querySelector('[data-f=file]') as HTMLInputElement).click();
      return;
    } else if (d.act === 'new') {
      sel = -1;
      return commit(emptyLevel('level-' + Date.now().toString(36), 'New level'));
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
    if (f === 'via') via = t.value as GapVia;
    else if (f === 'id') {
      const id = t.value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]+/g, '-')
        .replace(/^-+/, '');
      if (id !== '') commit({ ...l, id });
    } else if (f === 'name') commit({ ...l, name: t.value });
    else if (f === 'lift' && sel !== -1)
      commit(updateHouse(l, sel, { lift: Math.max(0, Math.min(12, Number(t.value) || 0)) }));
    else if (f === 'balcony' && sel !== -1) commit(updateHouse(l, sel, { balcony: t.checked }));
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
  resize();
}
