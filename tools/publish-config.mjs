/* global process, fetch, console */
// Owner tool: publish a remote tuning set (leaderboards plan section 8). Not part of the build.
//   node tools/publish-config.mjs values.json            dry run: prints clamped values, hash, what would be written
//   node tools/publish-config.mjs values.json --apply    writes (needs SUPABASE_URL and SUPABASE_SERVICE_KEY in the environment)
// values.json = {"hero.sprintSpeed": 12, ...}. Keys outside CLAMPS are dropped and values clamped, exactly as the
// game does, and the hash is computed with the game's own code, so it matches what players compute. `{}` resets to defaults.
// Order matters: the cfg_versions row is written first, then game_config (an unpublished hash is rejected by the server).
// The service key is read from the environment only; never put it in a file or commit it.
import { readFileSync } from 'node:fs';
import { createServer } from 'vite';

const [file, flag] = process.argv.slice(2);
if (!file) {
  console.error('usage: node tools/publish-config.mjs values.json [--apply]');
  process.exit(2);
}
const raw = JSON.parse(readFileSync(file, 'utf8'));
const vals = Object.entries(raw).map(([key, value]) => ({ key, value }));

const vite = await createServer({
  server: { middlewareMode: true },
  appType: 'custom',
  logLevel: 'silent',
});
const { rowsToOverrides } = await vite.ssrLoadModule('/src/app/remoteConfig.ts');
const { resolveCfg, bakedTuning } = await vite.ssrLoadModule('/src/app/tuning.ts');
const { cfgHash } = await vite.ssrLoadModule('/src/app/cfgHash.ts');
const level = JSON.parse(readFileSync('content/levels/l1.json', 'utf8'));
await vite.close();

const warnings = [];
const overlay = rowsToOverrides(vals, (m) => warnings.push(m));
const rows = [];
for (const [section, o] of Object.entries(overlay ?? {}))
  for (const [name, value] of Object.entries(o)) rows.push({ key: `${section}.${name}`, value });
const defaultHash = await cfgHash('l1', level.version, bakedTuning());
const hash = await cfgHash('l1', level.version, resolveCfg('classic', overlay));

console.log('default hash :', defaultHash);
console.log(
  'new hash     :',
  hash,
  hash === defaultHash ? '(same as default: nothing to publish)' : '',
);
for (const w of warnings) console.log('dropped      :', w);
for (const r of rows)
  console.log(
    'row          :',
    r.key,
    '=',
    r.value,
    r.value === raw[r.key] ? '' : `(clamped from ${raw[r.key]})`,
  );
if (flag !== '--apply') {
  console.log('dry run only; add --apply to write.');
  process.exit(0);
}

const url = process.env.SUPABASE_URL?.replace(/\/$/, '');
const key = process.env.SUPABASE_SERVICE_KEY;
if (!url || !key) {
  console.error('--apply needs SUPABASE_URL and SUPABASE_SERVICE_KEY in the environment');
  process.exit(2);
}
const h = { apikey: key, Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' };
const call = async (path, init) => {
  const res = await fetch(`${url}/rest/v1${path}`, {
    ...init,
    headers: { ...h, ...init?.headers },
  });
  if (!res.ok)
    throw new Error(`${init?.method ?? 'GET'} ${path} -> ${res.status} ${await res.text()}`);
  return res.status === 204 ? null : res.json();
};

// 1. cfg_versions row for the new hash, with the bounds of the default row (same level, same ticks window).
const [def] = await call(`/cfg_versions?cfg_hash=eq.${defaultHash}&level=eq.l1&select=*`);
if (!def)
  throw new Error(`default hash ${defaultHash} has no cfg_versions row; publish the default first`);
if (hash !== defaultHash) {
  await call('/cfg_versions', {
    method: 'POST',
    headers: { Prefer: 'resolution=ignore-duplicates,return=minimal' },
    body: JSON.stringify({ ...def, cfg_hash: hash }),
  });
  console.log('cfg_versions :', hash, 'published');
}
// 2. game_config: upsert the set, then remove every other key so the table equals the file.
if (rows.length > 0)
  await call('/game_config?on_conflict=key', {
    method: 'POST',
    headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
    body: JSON.stringify(rows.map((r) => ({ ...r, updated_at: new Date().toISOString() }))),
  });
const keep = rows.length > 0 ? `&key=not.in.(${rows.map((r) => r.key).join(',')})` : '&key=neq.';
await call(`/game_config?${keep.slice(1)}`, {
  method: 'DELETE',
  headers: { Prefer: 'return=minimal' },
});
console.log('game_config  :', rows.length, 'rows published');
