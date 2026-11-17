# Leaderboards and friends (T338)

Date 2026-11-17. Plan only: no code, no SQL in the repo. Mission check: `PRODUCT.md` Amendments 17b and 17f allow a Classic time leaderboard, optional Google/Facebook login, per-mode boards and friends on Supabase with static hosting; anonymous play stays; no full replay validation. Nothing here adds a server, a new mode or level content. Sources: `docs/plans/nine-points-plan.md` section 0 and T338/T339, owner decisions 2026-11-17 b/c/e/f, `workspaces/vidanta/docs/plans/2026-09-27-remote-game-config.md`.

## 1. Scope and non-goals

- In: Classic best time (T339 builds the local port; this plan is the cloud side), per-mode boards, friends via invite code, login with Google and Facebook, remote config for tuning values (sprint first).
- Out: replay traces and server re-simulation (owner 17c), a custom server, Edge Functions on the hot path, chat, push, achievements, realtime boards, per-level progression beyond best times.
- Anonymous play stays exactly as today: no login prompt before or during a run, local best in localStorage (`bhagdori.best.*`), game works offline and with Supabase down.

## 2. Scout result (rule 5)

Owner chose Supabase on 2026-11-17, so this is a decision, not a search. Alternatives were not re-scouted: Firebase (Auth + Firestore; also has a free tier), Nakama or Talo (leaderboard-specific, but need a server or are another vendor), PlayFab (heavy). Supabase wins here because Postgres RLS gives per-row rules, Auth supports Google and Facebook, the client talks to it directly, and the same project holds remote config (vidanta pattern). Own code reused: `src/app/tuning.ts` `resolveCfg`, the T339 `LeaderboardPort`. A scout note goes to `~/knowledge/scout/games/leaderboard-backend.md`.

## 3. Verified against current docs (2026-11-17)

| Topic | Finding | Source |
|---|---|---|
| Keys | New projects get a publishable key (`sb_publishable_...`) and secret key; legacy `anon`/`service_role` are deprecated "by the end of 2026". Use the publishable key (the owner's "anon key"): it maps to Postgres role `anon`, or `authenticated` once a user is signed in. The secret key bypasses RLS and never ships. | supabase.com/docs/guides/api/api-keys |
| Redirect allow-list | `redirectTo` must match the Redirect URLs list; wildcards `*`, `**` exist; Supabase recommends the exact production path. Site URL is the default when `redirectTo` is absent. | .../auth/redirect-urls |
| Google | Basic scopes need no Google verification (only sensitive/restricted scopes do); add the app origin under Authorized JavaScript origins; callback is `https://<ref>.supabase.co/auth/v1/callback`; consent-screen branding verification is optional and takes days. | .../auth/social-login/auth-google |
| Facebook | Needs `public_profile` and `email` configured under Use Cases (email is required by Supabase Auth), and the Supabase callback URL under Valid OAuth Redirect URIs. | .../auth/social-login/auth-facebook |
| Facebook Live mode | Meta docs: new apps start in Development mode; in Live mode, Standard-Access permissions can only be requested from users with a role on the app, Advanced Access from anyone. **Not verified:** whether `public_profile` and `email` get Advanced Access without App Review for this app, and what Meta demands to go Live (privacy policy URL, data deletion instructions, possibly business verification). Test in Live mode with a non-role account before promising Facebook login (milestone L6). | developers.facebook.com/docs/development/build-and-test/app-modes |
| Pausing | Pricing page: "Free projects are paused after 1 week of inactivity"; limit of two active free projects; 500 MB database; 50,000 MAU. Paused projects are restorable from Studio (docs say a 1-year window; a 2024 changelog says 90 days, so assume 90). A paused project means boards and config fail until restored by the owner by hand. Pro plan projects are never paused. | supabase.com/pricing, .../platform/upgrading |
| Auth rate limits | Token endpoint 150 requests per 5 min per IP; sign-ins 30 per 5 min per IP; anonymous sign-ins 30 per hour per IP (and Supabase advises CAPTCHA for them). | .../auth/rate-limits, .../auth/auth-anonymous |

Open verification debt: exact `supabase-js` gzip size (measure in L3), Meta Live-mode requirements (L6).

## 4. Architecture on static GitHub Pages

- Site stays `https://rubenkaksh.github.io/bhaaag/` (vite `--base=/bhaaag/`, manual gh-pages push). No server, no headers file, no proxy. The browser talks straight to `https://<ref>.supabase.co` (Auth at `/auth/v1`, REST at `/rest/v1`).
- Only the publishable key and the project URL are in the bundle (read from `import.meta.env` at build). They are public by design; security is RLS (section 6). The secret key lives only in the owner's shell for migrations and for publishing config.
- **Lazy loading (hard rule).** The initial chunk is frozen at the T333 baseline, 264,521 B gz, until T345 brings it to <= 215 KB. Nothing in the initial chunk imports `@supabase/*`. One module `src/app/online/index.ts` is reached only through `await import(...)` from the lobby/finish screen and from run start. Every build card reports the initial chunk with the T333 command and must be <= baseline. Vite emits the SDK as its own `/bhaaag/assets/*.js` chunk, same origin.
- **Remote config needs no SDK:** one `fetch` to PostgREST (`/rest/v1/game_config?select=key,value` with `apikey` header) inside the lazy module; it works for anonymous players.
- **Login flow (OAuth with PKCE, supabase-js default for browser apps).** `signInWithOAuth({provider, options:{redirectTo:'https://rubenkaksh.github.io/bhaaag/'}})` goes to Google/Facebook, then to the Supabase callback, then back to `/bhaaag/` with `?code=...`; the SDK exchanges it for a session stored in localStorage (`detectSessionInUrl`). Game URLs carry `?mode=` and `?builder`; `redirectTo` is the clean base URL, and the intended mode is parked in `sessionStorage` before the redirect and restored after. A plain static page has no router, so no `/auth/callback` path is needed. GitHub Pages serves `/bhaaag/` and `/bhaaag/index.html` only; do not use a path that would 404.
- **Allow-list to set in Supabase (Authentication, URL Configuration):** Site URL `https://rubenkaksh.github.io/bhaaag/`. Redirect URLs: `https://rubenkaksh.github.io/bhaaag/` (exact; the `/bhaaag/` subpath matters, an origin-only entry would not match) and, dev only, `http://localhost:5173/**` (Vite default; confirm the port). No `**` on the production origin. The origin `https://rubenkaksh.github.io` is shared by every GitHub Pages project of the owner, so any other `rubenkaksh.github.io/*` site could in theory run code on the same origin; keep localStorage keys prefixed (`bhagdori.*`, `sb-<ref>-auth-token`) and keep the exact-path allow-list.
- **Google console:** OAuth client type Web; Authorized JavaScript origin `https://rubenkaksh.github.io`; Authorized redirect URI is the Supabase callback only; consent screen set to In production (otherwise only listed test users can log in).
- **Facebook console:** Valid OAuth Redirect URIs is the Supabase callback; app domain `rubenkaksh.github.io`; privacy policy URL and data-deletion instructions URL point at a static page in the game (`/bhaaag/privacy.html`, section 10).
- **CSP via `<meta http-equiv="Content-Security-Policy">` only** (GitHub Pages cannot set headers; meta cannot do `frame-ancestors`, `report-uri` or `sandbox`, so clickjacking protection is not available on this host; the game has nothing worth framing). Draft, to be tested against the real build in L6: `default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; connect-src 'self' https://<ref>.supabase.co; font-src 'self'; worker-src 'self' blob:; base-uri 'self'; form-action 'self'`. OAuth is a top-level navigation, so Google/Facebook hosts need no CSP entry. If three.js or the build needs `blob:` or wasm, widen only what the console errors prove. Meta CSP applies from parse time, so it must sit first in `<head>`.
- **Free-tier pausing** is handled in open question 2. Until answered, the game must treat every online call as optional: 3 s timeout, silent fallback to local, never a spinner that blocks restart (principle 2, near-instant restart).

## 5. Data model (design only; migrations come in L1 as a separate card)

All tables in `public`, RLS enabled on every one, privileges granted explicitly to `anon`/`authenticated`, only what a role needs. Leaderboard views use `security_invoker` where they read RLS tables.

| Table | Columns (units) | Who can do what |
|---|---|---|
| `profiles` | `user_id` (pk, = `auth.users.id`), `display_name` (3-20 chars, unique-ish), `invite_code` (unique, 8 chars, no look-alike letters), `created_at` | select: all (name only is public); insert/update own row only (`using` and `with check` both `auth.uid() = user_id`). A trigger on `auth.users` creates the row with a random name; the email is never copied. |
| `cfg_versions` | `cfg_hash` (pk, text), `level` (text), `min_ticks` (int, 60 Hz ticks), `max_ticks` (int), `created_at`, `note` | select: all; no client writes (owner publishes with the secret key). Defines which hashes are acceptable. |
| `runs` | `id`, `user_id`, `mode`, `level`, `cfg_hash` (fk `cfg_versions`), `ticks` (int, = finishTick - firstInputTick), `created_at` | insert: own user_id only, `with check` enforces the bounds in section 7; select: own rows; no update, no delete (append-only). |
| `bests` | `(user_id, mode, level, cfg_hash)` pk, `ticks`, `run_id`, `updated_at` | written only by a trigger on `runs` that keeps the minimum (client cannot write); select: all (this is what boards read). |
| `friendships` | `(user_a, user_b)` with `user_a < user_b`, `created_at` | select: rows containing me; insert only through the redeem function (below); delete: either side. |

- **Friends via invite code.** Each profile has a code; a player shares it as text or a link `.../bhaaag/?friend=CODE`. The client calls one function `redeem_invite(code)` that inserts the friendship for `auth.uid()` and the code owner (mutual, no pending state; the code can be rotated). The function is the one privileged piece: `SECURITY DEFINER`, in a non-exposed schema, `auth.uid()` checked in the body, `execute` revoked from `public`, wrapped by a thin `SECURITY INVOKER` shim if the Data API needs it; run `supabase db advisors` after. Rate limit: 10 redeems per hour per user.
- **Boards (read paths).** Global top N: `bests` for (mode, level, `cfg_hash` = my current hash) ordered by `ticks` asc, limit 50, joined to `profiles.display_name`. Friends board: same query restricted to `user_id in (my friends + me)`. Both are plain PostgREST selects with `limit`; index `(mode, level, cfg_hash, ticks)`. The "me" row is fetched separately so a rank outside the top 50 still shows.
- **Per mode.** `mode` is the registry id from T341. Classic ranks by lowest `ticks`. Dragon Chase is a survival score, direction is higher-is-better and needs its own `ModeRules` metric; it is a later milestone (L7), not part of the first release.
- **Display time** is `ticks / 60` seconds, shown to 2 decimals; the stored integer ticks avoid float drift.

## 6. RLS rules (the real security boundary)

1. The publishable key is public; assume attackers call the REST API with a valid user token at will. Every rule below must hold with no client cooperation.
2. No `user_metadata` in any policy (user-editable). Policies use `to authenticated` plus an ownership predicate `(select auth.uid()) = user_id`; never `auth.role()`.
3. `anon` may only `select` `profiles` (name), `cfg_versions`, `bests` and `game_config`. It cannot insert anything.
4. `runs` has no update/delete policy. `bests` has no client write policy at all.
5. Views use `security_invoker = true` (views bypass RLS otherwise).
6. Test plan for L1 (a script, not production code): two test users; user B cannot read A's `runs`, cannot insert with A's id, cannot insert a time below `min_ticks`, cannot write `bests`, cannot redeem its own code; `anon` cannot insert.

## 7. Anti-cheat: trust-the-client, bounded

Stated plainly: **the server cannot know the run was honest.** The client reports `ticks`; a cheater can send any number inside the bounds. There is no replay, no re-simulation and no signed trace (owner 17c: out unless re-opened). The goal is to stop trivial abuse (an impossible time, spam, a stale or edited config), not to prove a run.

- **Time definition (T339).** `ticks = finishTick - firstInputTick`, time = `ticks / 60` s. Planning time before the first gameplay input is excluded, by design. The client sends `ticks` only (no trace, no offset beyond what T339 `submit(level, ms, offsetTicks)` already carries locally).
- **Server bounds, enforced in the `runs` insert policy (or a `before insert` trigger):**
  - `cfg_hash` exists in `cfg_versions` for this `level`.
  - `ticks >= min_ticks` of that version. `min_ticks` = 60 x (shortest S-to-G route length in metres from the T336a graph) / (sprint speed cap in m/s) x 0.8 margin. Example with a hypothetical 700 m route and the approved 11 m/s cap: 60 x 700 / 11 x 0.8 = about 3,055 ticks (about 51 s). Real numbers come from T336a and T334 measurements; the owner's publish script computes them, they are not guessed here.
  - `ticks <= max_ticks` (default 36,000 = 10 min) so junk runs do not clutter boards.
  - Rate limit per user: at most 1 insert per 10 s and 200 per day (trigger raising an exception).
  - Sanity: `mode` and `level` are on an allow-list; `ticks` is an integer.
- **`cfgHash`** = first 16 hex of SHA-256 over canonical JSON (sorted keys) of: `simVersion` (a constant in code, bumped by hand when core physics change), the level id and its content version, and the resolved, clamped values of every tuning key that affects speed or reach (sprint, run speed, rope, brake). Every row carries it; **boards query only the player's current hash**, so a changed config or sim never mixes with old times. Old rows stay for history, not shown.
- **Residual cheats, accepted:** a modified client sending a legal-looking time near `min_ticks`; a time-scaled or lag-switched client; a human-script bot. Mitigations are social: friends boards (you know who cheats), owner can delete a row or user with the secret key, and a visible `display_name` for reports. Re-open full replay validation only if the owner decides boards matter enough.

## 8. Remote config (vidanta pattern, adapted)

Reference: vidanta fetches a Supabase `game_config` table at match start, clamps, never throws, keeps defaults on failure, fixes config for the match.

- Table `game_config(key text pk, value numeric, updated_at)`, RLS: `select` to all, no client writes. Keys mirror `Tuning` paths, for example `sprint.speed`, `sprint.afterSteps`, `sprint.jumpBoost` (names settle in T334).
- **Resolution order in `src/app/tuning.ts`:** `DEFAULT_TUNING` + `content/config/tuning.json` + `MODE_OVERRIDES[mode]` (as today), then the remote overlay, then **clamping**. `resolveCfg(mode, remote?)` gets an optional `remote` argument; with none it behaves exactly as today so existing tests and Dragon Chase stay unchanged. Clamp ranges live in code (a `CLAMPS` table next to `MODE_OVERRIDES`, for example sprint speed 7-14 m/s); a value outside the range is clamped, a non-numeric or unknown key is dropped. `tests/config/configScope.test.ts` must be extended: the overlay is global, not per-mode, and per-mode differences stay limited to `MODE_OVERRIDES`.
- **Read once at run start, never mid-run.** The lobby starts the lazy import and the fetch as soon as a level is picked; at `restart()`/run start the game takes the latest fetched snapshot (or the one cached in localStorage, or the defaults) and freezes the resulting `Tuning` for the whole run, including after death and instant restart within the same session until the next lobby pick (a restart must not change physics under the player). Timeout 1.5 s, no retry loop, no error UI; failure means defaults.
- `cfgHash` is computed from that frozen `Tuning`, so a failed fetch plays on the defaults board with the default hash; the owner publishes a `cfg_versions` row for the default hash too, so offline-default runs stay valid.
- **Owner workflow (no client path):** edit values with a small script or Studio using the secret key; the same script computes the new hash and `min_ticks` and inserts the `cfg_versions` row first, then the `game_config` rows. An unpublished hash is rejected by the server, so a config change that forgets the version row fails loudly instead of corrupting boards.
- Clamping stops a bad remote value from breaking the level (the T334 sprint range), not from being unfair; the server bound in section 7 uses the cap published in the same version row.

## 9. Anonymous play, login and identity

- Sign-in is optional and offered after a finish ("Save this time to the leaderboard") and in the lobby. A run never waits for it.
- Local best is untouched. After first login, the client offers to submit the current local best once, as a normal run; it is validated by the same bounds as any other (it is trust-the-client either way).
- No Supabase anonymous sign-ins (see open question 1): they add database rows per visitor and need CAPTCHA.
- Session tokens live in localStorage. Sign-out clears them; the leaderboard module disappears from the UI when `import.meta.env` has no URL (the build works without Supabase configured).

## 10. Privacy

- Collected: OAuth subject id, `display_name` (random at first, editable; never the Facebook/Google real name unless the player types it), runs and times, friend links, avatar not stored. Email arrives with Auth (Facebook requires the email permission for Supabase) and stays in `auth.users`, which is not exposed to the Data API; no policy or view ever returns it.
- Public: display name and best times. Friends: who is linked to whom is visible only to those two users.
- Required pages (L6): `/bhaaag/privacy.html` (what is stored, where, how to delete) and data-deletion instructions for Meta; deletion = the owner removes the user (secret key) or a "delete my data" button calling a function; access tokens stay valid until expiry after deletion, so keep JWT expiry short.
- Children: the game is casual; state a minimum age of 13 in the privacy page (owner confirm).
- Supabase hosts data in the region the owner picks at project creation; choose the closest free-tier region and record it in the privacy page.

## 11. Milestones and sizes

Sizes are focused minutes. The owner steps need the owner's accounts and cannot be done by a session.

| Id | Milestone | Size | Deps | Done when |
|---|---|---|---|---|
| L0 | Owner setup: Supabase project, Google OAuth client, Facebook app in Development mode, URL Configuration per section 4 | 45 (owner) | Q1, Q2 answered | Login works on localhost and on the live URL with a test user |
| L1 | Schema, RLS, triggers, `redeem_invite`, index; migration files under `supabase/` | 120 | L0 | RLS test script of section 6 passes; `supabase db advisors` clean |
| L2 | Remote config: `resolveCfg(mode, remote?)`, `CLAMPS`, `cfgHash`, publish script, `configScope` test | 90 | T334, T339 | Vitest: clamping, drops, defaults on failure, hash stable; no change with no remote |
| L3 | Lazy `online` module: auth, submit, top; swaps the T339 local port for a Supabase port behind the same `LeaderboardPort` | 150 | L1, L2, T339, T345 | Initial chunk gz <= T333 baseline; SDK size recorded; offline and timeout fall back |
| L4 | Boards UI: global and friends tabs, per mode, my rank row, 390x844 screenshot | 150 | L3 | Screenshots; works with Supabase unreachable |
| L5 | Friends: profile page, invite link `?friend=CODE`, redeem, friends board | 90 | L1, L4 | Two test accounts become friends and see each other |
| L6 | CSP meta, privacy page, Meta Live-mode check with a non-role account, Google consent screen In production | 60 (+ owner) | L3 | Console shows no CSP violations; Facebook login works for a non-role user, or Facebook is dropped from the release |
| L7 | Dragon Chase board (score metric via `ModeRules`) | 60 | L4, T341 | A second mode on the same tables |

Order: L0, L1, L2, then L3, L4, L5, L6 (ship Google first; Facebook only once the Live-mode check passes), L7 last. T339 (local port) must land before L3.

## 12. Risks

- Free-tier pause after 1 week idle: boards and config silently fail (see Q2).
- Facebook may need App Review or business verification; Google alone is a valid first release.
- `supabase-js` is large for a game whose initial chunk is frozen; if the lazy chunk is too heavy on phones, use `@supabase/auth-js` and plain `fetch` to PostgREST (the config call already does).
- Config or sim change resets every board (intended, see Q3).
- Trust-the-client: top times can be faked within bounds; stated, accepted.
- Shared GitHub Pages origin (section 4).
- The initial-chunk baseline can be breached by accident (a static import); the controller check on every build card is the guard.

## 13. Open owner questions

1. **Login required to submit?** Recommendation: yes. Boards are visible to everyone, submitting needs Google (or Facebook) login, and no Supabase anonymous sign-ins (they cost database rows and need CAPTCHA). Alternative: anonymous sign-ins with Turnstile, so a guest can rank without an account. Also: should a first login offer to upload the existing local best?
2. **Free-tier pausing:** after 1 week without activity the free project pauses and the owner must restore it by hand. Options: accept it; add a weekly keep-alive request (a scheduled GitHub Actions workflow with a plain REST ping; it is not a deploy job, so 17c still holds); or Pro plan (about 25 USD a month, no pausing). Recommendation: keep-alive now, Pro if the game gets real players.
3. **Board resets:** every change to a timing-affecting value or `simVersion` starts a new empty board (new `cfgHash`). Accept that and tune sprint freely before launch, then freeze a launch hash and change it only on purpose ("seasons")? Also confirm Facebook ships only after the Meta Live-mode check passes, with Google first.
