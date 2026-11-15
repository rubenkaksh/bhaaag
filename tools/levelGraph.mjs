// Level graph, on demand.
//   node tools/levelGraph.mjs                          # Nagarkot Run, text summary
//   node tools/levelGraph.mjs nagarkot --svg > g.svg   # layered graph: success route, other
//                                                      #   moves, dead ends (open in a browser)
//   node tools/levelGraph.mjs nagarkot --json          # the layered data behind the SVG
//   node tools/levelGraph.mjs nagarkot --mermaid [--full]
//   node tools/levelGraph.mjs content/levels/village.json --svg
// Strategy levels use the generator's real kinematic graph. JSON levels have no stored graph:
// they use spawn, route anchors and goal as a chain, with unused anchors shown as decoy dead ends.
// Layers = fewest moves from the start. Only forward moves are drawn.
import { createServer } from 'vite';
import { readFileSync } from 'node:fs';

const args = process.argv.slice(2);
const target = args.find((a) => !a.startsWith('--')) ?? 'nagarkot';
const has = (f) => args.includes(f);
const seedArg = args.find((a) => a.startsWith('--seed='));

// ---- graph data: { n: [[id, depth, ok, label, x]], e: [[from, to, moveLetter]], sp: [ids], names }
async function strategyData() {
  const vite = await createServer({ server: { middlewareMode: true }, appType: 'custom', logLevel: 'silent' });
  try {
    const gen = await vite.ssrLoadModule('/src/content/strategy/gen.ts');
    const s = gen.buildStrategy(seedArg ? Number(seedArg.slice(7)) : undefined);
    const { edges, start, goal } = s.graph;
    const fw = new Map();
    const bw = new Map();
    for (const e of edges) {
      (fw.get(e.from) ?? fw.set(e.from, []).get(e.from)).push(e);
      (bw.get(e.to) ?? bw.set(e.to, []).get(e.to)).push(e);
    }
    const bfs = (src, m, k) => {
      const d = new Map([[src, 0]]);
      const q = [src];
      while (q.length) {
        const u = q.shift();
        for (const e of m.get(u) ?? []) if (!d.has(e[k])) (d.set(e[k], d.get(u) + 1), q.push(e[k]));
      }
      return d;
    };
    const df = bfs(start, fw, 'to');
    const db = bfs(goal, bw, 'from');
    const prev = new Map([[start, null]]);
    const q = [start];
    while (q.length) {
      const u = q.shift();
      for (const e of fw.get(u) ?? []) if (!prev.has(e.to)) (prev.set(e.to, u), q.push(e.to));
    }
    const sp = [];
    for (let v = goal; v !== null; v = prev.get(v)) sp.unshift(v);
    const n = [...df.keys()].map((id) => {
      const nd = s.nodes[id];
      return [id, df.get(id), db.has(id) ? 1 : 0, nd.kind === 2 ? 'rd' : (nd.kind === 1 ? 'b' : 'h') + nd.house, Math.round((nd.x0 + nd.x1) / 2)];
    });
    const e = edges
      .filter((x) => df.has(x.from) && df.get(x.to) > df.get(x.from))
      .map((x) => [x.from, x.to, gen.MOVE_NAMES[x.move][0]]);
    const moves = gen.MOVE_NAMES.map((m, i) => `${m}=${s.summary.moves[i]}`).join(' ');
    const title = `Nagarkot Run: ${s.graph.n} nodes, ${edges.length} edges, ${s.summary.escapePaths} escape paths, ${s.summary.deadRoofs} dead roofs (${moves})`;
    return { n, e, sp, title, xScale: 8.2 };
  } finally {
    await vite.close();
  }
}

function jsonData(path) {
  const lv = JSON.parse(readFileSync(path, 'utf8'));
  const anchors = lv.anchors ?? [];
  const route = lv.route ?? anchors.map((_, i) => i);
  const P = (a) => a.pos ?? a.p ?? a;
  const c = (p, i) => p[i] ?? p[['x', 'y', 'z'][i]];
  const n = [[0, 0, 1, 'spawn', 0]];
  const e = [];
  const sp = [0];
  route.forEach((ai, k) => {
    n.push([k + 1, k + 1, 1, `a${ai}`, Math.round(c(P(anchors[ai]), 0))]);
    e.push([k, k + 1, 'z']);
    sp.push(k + 1);
  });
  const gId = route.length + 1;
  n.push([gId, gId, 1, 'goal', 0]);
  e.push([route.length, gId, 'j']);
  sp.push(gId);
  anchors.forEach((a, i) => {
    if (route.includes(i)) return;
    // a decoy hangs off the route node whose height is closest above it
    const hy = c(P(a), 1);
    let from = 0;
    route.forEach((ri, k) => {
      if (c(P(anchors[ri]), 1) >= hy) from = k + 1;
    });
    const id = 100 + i;
    n.push([id, from + 1, 0, `decoy${i}`, Math.round(c(P(a), 0))]);
    e.push([from, id, 'z']);
  });
  return { n, e, sp, title: `${path}: ${anchors.length} anchors, ${route.length} on route`, xScale: 8.2 };
}

// ---- renderers
function svg(D) {
  const W = 680, RH = 21, X0 = 340, TOP = 34;
  const info = {}, layers = {}, pos = {};
  for (const [id, d, ok, label, x] of D.n) (info[id] = { d, ok, label, x }, (layers[d] ??= []).push(id));
  const maxD = Math.max(...D.n.map((r) => r[1]));
  for (const d of Object.keys(layers)) {
    const used = [];
    for (const id of layers[d].sort((a, b) => info[a].x - info[b].x)) {
      let x = X0 + info[id].x * D.xScale;
      while (used.some((u) => Math.abs(u - x) < 12)) x += 14;
      used.push(x);
      pos[id] = [x, TOP + d * RH];
    }
  }
  const spE = new Set(D.sp.slice(1).map((v, i) => `${D.sp[i]}>${v}`));
  const spN = new Set(D.sp);
  const curve = (a, b, c, w, dash, op) => {
    const [x1, y1] = pos[a], [x2, y2] = pos[b], m = (y1 + y2) / 2;
    return `<path d="M${x1} ${y1} C${x1} ${m} ${x2} ${m} ${x2} ${y2}" fill="none" stroke="${c}" stroke-width="${w}"${dash ? ' stroke-dasharray="3 2"' : ''} opacity="${op}"/>`;
  };
  let grey = '', red = '', green = '';
  for (const [a, b] of D.e) {
    if (!pos[a] || !pos[b]) continue;
    if (spE.has(`${a}>${b}`)) green += curve(a, b, '#1d9e75', 3.2, false, 0.95);
    else if (!info[a].ok || !info[b].ok) red += curve(a, b, '#d03a2c', 1.4, true, 0.95);
    else grey += curve(a, b, '#999', 0.8, false, 0.45);
  }
  let nodes = '';
  for (const [id, , ok, label] of D.n) {
    const [x, y] = pos[id];
    const fill = !ok ? '#d03a2c' : spN.has(id) ? '#1d9e75' : '#fff';
    const stroke = !ok ? '#a02a20' : spN.has(id) ? '#0f6e56' : '#777';
    nodes += /^(rd|b)/.test(label)
      ? `<rect x="${x - 4}" y="${y - 4}" width="8" height="8" fill="${fill}" stroke="${stroke}"/>`
      : `<circle cx="${x}" cy="${y}" r="5" fill="${fill}" stroke="${stroke}" stroke-width="1.2"/>`;
    if (!ok || spN.has(id)) nodes += `<text x="${x + 8}" y="${y + 3}" font-size="9" fill="${ok ? '#222' : '#d03a2c'}">${label}</text>`;
  }
  const guides = Array.from({ length: Math.floor(maxD / 3) + 1 }, (_, i) => `<text x="4" y="${TOP + i * 3 * RH + 3}" font-size="9" fill="#999">${i * 3}</text>`).join('');
  const H = TOP + maxD * RH + 30;
  const [gx, gy] = pos[D.sp[D.sp.length - 1]];
  const legend = `<text x="10" y="12" font-size="11" font-weight="500" fill="#222">${D.title.replace(/&/g, '&amp;')}</text>
<text x="10" y="${H - 6}" font-size="10" fill="#666">green = shortest success route; grey = other moves that still reach the goal; red dashed = moves into dead ends; red dot = dead end; square = balcony or road. Row number = fewest moves from start.</text>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" font-family="sans-serif"><rect width="100%" height="100%" fill="#fff"/>${legend}${guides}${grey}${red}${green}${nodes}<text x="${gx + 8}" y="${gy + 16}" font-size="11" font-weight="500" fill="#1d9e75">GOAL</text><text x="${pos[D.sp[0]][0] + 10}" y="${pos[D.sp[0]][1] - 6}" font-size="11" font-weight="500" fill="#222">START</text></svg>`;
}

function mermaid(D) {
  const info = Object.fromEntries(D.n.map((r) => [r[0], r]));
  const full = has('--full');
  const spE = new Set(D.sp.slice(1).map((v, i) => `${D.sp[i]}>${v}`));
  const use = D.e.filter(([a, b]) => full || spE.has(`${a}>${b}`));
  const seen = new Set();
  const out = ['flowchart TD'];
  for (const [a, b, m] of use) {
    for (const id of [a, b]) if (!seen.has(id)) (seen.add(id), out.push(`  N${id}["${info[id][3]}"]${info[id][2] ? '' : ':::dead'}`));
    out.push(`  N${a} -->|${m}| N${b}`);
  }
  out.push('  classDef dead fill:#d03a2c,color:#fff');
  return out.join('\n');
}

const D = target === 'nagarkot' || target === 'strategy' ? await strategyData() : jsonData(target);
if (has('--svg')) console.log(svg(D));
else if (has('--json')) console.log(JSON.stringify(D));
else if (has('--mermaid')) console.log(mermaid(D));
else {
  const dead = D.n.filter((r) => !r[2]).map((r) => r[3]);
  console.log(D.title);
  console.log(`shortest route: ${D.sp.length - 1} moves; dead ends: ${dead.length}${dead.length ? ' (' + dead.join(', ') + ')' : ''}`);
}
