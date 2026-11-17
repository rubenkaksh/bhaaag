# ADR 0016: Two modes, one runtime (Classic and Dragon Chase)

Date: 2026-11-17. Status: accepted (owner task 2026-11-17: "reduce the game to exactly TWO modes:
Classic and Dragon Chase"). Supersedes the mode lists in PRODUCT.md (Amendments 2026-11-10b,
2026-11-12, 2026-11-13) and ADR 0013 section 3.5 (one lobby entry per level).

## What "a single mode" means

`startGame` already runs every level through one world, one sim (`src/core`), one HUD and one
camera pipeline; the old "modes" were only a level source plus a few flags. We keep that engine and
change the public model:

- **Mode** (what the player picks): `classic` or `chase`. Nothing else.
- **Classic** = free-aim zipline play over any one finite **level**. Levels are data, not modes:
  `l1` (the original descent, default), `home-street`, `valley-1`, `nagarkot` (the generated
  Nagarkot Run), `village` (Cloud Village) and builder levels (the player's local one and any
  shipped under `content/builders/`). One level row in the lobby, shown only for Classic.
- **Dragon Chase** = the endless row generator plus the dragon (ADR 0010). The 1-D catch rule
  (`gap = dragonZ - heroZ`) needs a straight descent, so the dragon stays on the endless rows;
  it does not run on graph levels with turns (Home Street) or the 100-house maze. Reading of the
  owner's "all possible in one mode": every level and the chase start from one entry
  (`?mode=classic&level=<id>` or `?mode=chase`), one runtime, one HUD, one save model.
- Internally a `PlayKey` (the former `GameMode`: `classic|chase|strategy|village|g:<id>`) still selects
  tuning, best-time key and HUD flags. `src/app/modes/levels.ts` maps (mode, level) to it. Best times
  are unchanged per level (existing localStorage keys keep working).
- Old URLs keep working: `?mode=g:home-street`, `strategy`, `village` resolve to Classic plus that level.

## Removed

The lobby mode row of six entries (replaced by two plus a level row). The "fifth mode" `strategy`
and `village` as top-level modes. `?mode=strategy&level=builder`. Level content stays (frozen
levels are unchanged, hash tests untouched).

## Builder (ADR 0014 update)

Builder levels become playable in production: `?builder` (lazy chunk, no cost to the initial
chunk) edits and saves; Play stores the compiled level and opens `?level=builder`; files under
`content/builders/*.builder.json` are compiled at load and appear in the level row. None ships
yet (owner supplies them). `game.ts` no longer reads storage: `main.ts` hands it the `LevelJson`.

## PRODUCT.md

Non-goal "no level select" is lifted for Classic's level row (the owner's instruction merges the
lobby entries into one mode; a level row is the smallest UI that keeps every level reachable).
Amended in PRODUCT.md. Nothing else in it changes.
