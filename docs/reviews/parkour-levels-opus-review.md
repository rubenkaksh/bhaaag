# Review: feat/parkour-levels (T311 house kit v2, T312 parkour moves, T313 Valley Run)

Reviewer: Opus seat, read-only, 2026-11-13. Base `origin/main...origin/feat/parkour-levels`, 51 files.
Gates were not re-run (reported green). Every claim below was checked by reading code.

## Verdict: FIX-THEN-SHIP

4 MUST-FIX. The core is sound at `parkour 0` and the wiring is correct, but in Valley Run the
auto-vault takes the hero over ordinary side parapets and balcony rails into gullies that kill
instantly. The gullies are not drawn, and the spawn roof has an open lethal edge 4 m ahead. On a
first phone test that means unfair one-hit deaths, which goes against "feel real, not gamey".

## MUST-FIX

### M1. Auto-vault over 0.45 parapets and 0.9 balcony rails lands in a lethal gully
- Where: `src/content/graph/place.ts:464-470` (tall-parapet rule), `src/content/graph/place.ts:483-492`
  (hazard bands), `src/core/sim.ts:773-818` (`tryVault`, end check at :793).
- What happens: the tall (1.2 m) parapet rule measures the drop to the terrain height `gy(...)`
  and keeps 0.45 m parapets wherever that drop is at most 6.5 m. That covers every exposed side
  of every 1- and 2-storey house (2 storeys is about 6 m). The terrain has no solid, though: the
  sim has only house bodies, patches and props, and under all open ground there is a hazard band
  (`top = gy(zl) - 1`). So every drop that is not onto a patch kills. `tryVault` only checks that
  the end capsule is free. It never checks where the hero will land. Balcony rails (0.9, the
  "fall guard" in the `graphicsTier.ts` comment) are inside the vault band too.
  `tests/core/parkour.test.ts:154` builds this behaviour in as intended.
- How it fails: a player crosses a roof at run speed with the stick angled toward a side parapet
  (at most 45 deg off, at least 2.5 m/s, which is normal play). The hero vaults, falls into the
  gully and dies with no input mistake. The same happens from any balcony rail. This is risk 1 of
  ADR 0013, and the mitigation it names (1.2 m parapets on lethal sides) does not work.
- Fix (sim, generic): in `tryVault`, when `onto === 0`, predict the fall with a cheap loop using
  the air physics with no steering: start at (x1, y1, z1) with `vault.keep * pv`, step at 60 Hz
  for at most 2 s, and stop at the first `groundHeight` hit. Refuse the vault (return false, so the
  parapet blocks like a wall) unless the hit is a surface, `hazardAt` is false there, and the impact
  is `<= landing.vyRoll` or the surface is a cushion or tramp. Takeoff parapets over hay, tramps
  and the goal still vault. Side parapets and rails stop the hero.
  Replace the test at `parkour.test.ts:154` with "refuses to vault into a lethal drop" and add a
  balcony-rail case. Belt and braces: in the placer, treat the gully as lethal (`tall` on every
  non-takeoff, non-party, non-balcony face that has no patch beyond it). The level has not
  shipped, so update the hash in `graphFreeze.test.ts` in the same PR and say why.

### M2. Gullies are not drawn; the hero dies about 1-4.7 m under visible grass
- Where: `src/content/graph/place.ts:487-491` (hazard top `gy(zl) - 1.0` over a 10 m band whose
  uphill end is about 3.7 m higher), with no hazard or gully rendering anywhere. A grep of
  `houseV2.ts`, `terrain.ts` and `levelView.ts` finds no hazard drawing.
- How it fails: a fall between houses passes through the drawn hillside and dies below it. That
  reads as a bug, not a rule. It breaks Principle 3 (terracotta means danger) and ADR 0013 s3.x
  item 6 (gully with a terracotta lip). The player cannot read the route ("streets are fatal") at
  all.
- Fix: draw every `world.hazards` band where it meets the terrain, as a terracotta gully strip or
  terrain tint outside patches (render-only, graph levels only, so v1 stays untouched). Move the
  kill surface up to the visible terrain: either set the hazard top to `gy(z)` per sub-band
  (2 m bands are enough), or add thin ground slabs that are hazards. Death should happen where
  the hero visibly touches the ground.

### M3. Zip-source roofs: an open lethal edge at spawn and no windows on the downhill wall
- Where: `src/content/graph/place.ts:266-268` (`a.party[3] = true` to suppress the parapet), and
  `src/content/house/houseSpec.ts:331` (`windowSlots` skips party faces).
- How it fails: (a) house 1 is the spawn and a zip source. The hero spawns at the deck centre
  facing downhill, the line zone is 2 m ahead (`zz = a.cz - 2`) and the open edge is 4 m ahead. A
  new player holding forward at 6 m/s goes over the edge into the gully in about 0.7 s, before
  learning that HOOK is needed. Houses 4 and 5 have the same open edge. (b) Setting `party` also
  deletes both window slots per storey on that downhill wall. That is the wall the camera sees
  while zipping away, which breaks "windows on every visible wall".
- Fix: add a separate `runout: Face[]` (or `noParapet`) flag. Leave `party` false so the windows
  return. On the run-out face, emit 0.45 m parapet segments with a 1.6 m gap centred where the rope
  chord crosses the face (x = a.cx + lat * 2 / (dz + 1.5), roughly). The rope still clears the gap
  (rim at most `stepUp`), and with M1 the rest of the face stops a runner. Add a `houseKit.test`
  assertion that no non-party face has zero windows.

### M4. Classic, Nagarkot and Village change on the Low tier: v1 rails are now drawn
- Where: `src/adapters/render/graphicsTier.ts:189-190` removes `'decor_rail'` from
  `LOW_HIDDEN_DECOR` for every mode. The v1 decor places rails at `placeDecor.ts:248, 642, 687`.
- How it fails: on the Low tier, all frozen v1 modes now draw rails (one extra instanced draw call
  plus their triangles). That breaks the owner's "must stay unchanged" and the lean-scope
  Amendment 2026-11-13 wording "Classic L1, Dragon Chase, Nagarkot Run and Cloud Village are
  frozen and unchanged". No test catches it: `budget.test.ts` only measures the v2 fixtures.
- Fix: put `'decor_rail'` back in `LOW_HIDDEN_DECOR` and give the v2 balcony rails their own
  piece id (for example `'guard'`, reusing the rail geometry) that is not hidden on Low. Add a
  decor test asserting that v1 Low hidden pieces are unchanged.

## SHOULD-FIX

### S1. Landing slide can freeze the hero forever under a low ceiling
- Where: `src/core/sim.ts:978-988` together with `:962` and `:821-832`.
- How it fails: the slide disables steering. Under an overhang with 1.0-1.8 m of clearance
  (`headBlocked`), `slideT` is re-armed to `dt` every tick. If the slide then meets a wall, the axis
  sweep sets `vx = vz = 0`, `slideSpeed(0)` stays 0, and JUMP is refused because `headBlocked` is
  true. The hero cannot move until restart. Valley-1 cannot reach this today (stairs are solid
  ramps, the balcony underside is about 2.6 m, awnings are not placed), but the first level with
  awnings or overhangs will.
- Fix: while `headBlocked`, allow a crawl along the stick at `slide.minKeep`, or end the slide
  when the speed is below 0.1 and let the stick steer at crawl speed until the hero is clear. Add a
  test: slide under a ceiling into a wall, then the hero must still escape.

### S2. The slide ignores the stick for 0.6 s (about 3.8 m at 7 to 5.6 m/s)
- Where: `src/core/sim.ts:978-988`.
- How it fails: after a zip landing on a small 8 m roof, the hero cannot brake or turn for about
  3.8 m. Combined with an open run-out edge (M3), that is a death. It feels "gamey", not fluid.
- Fix: end the slide (back to the normal chain skid) when the stick is released or pulled back
  (dot with the velocity below 0). Keep "no steering" only while the stick is held forward.

### S3. A second graph level without a `MODE_OVERRIDES` line crashes on start
- Where: `src/app/tuning.ts:38-39`. `Object.keys(MODE_OVERRIDES[mode])` throws on `undefined`.
  The `Record<\`g:${string}\`, ...>` type does not force the key.
- Fix: `const ov = MODE_OVERRIDES[mode] ?? {};`. The registry line is then the only per-level
  edit, as ADR 0013 s3.5 promises.

### S4. Awnings are never placed
- Where: `src/content/graph/place.ts:122` (`awnings: []`, never filled). The kit (`houseKit.ts:104`),
  the renderer (`houseV2.ts:305`) and the sim `slip` ramps all support awnings.
- Not needed before the owner first plays Valley Run. It is one of the owner's goals ("jumpable
  awnings") and the fall-breaker the ADR relies on, so add a placer rule (downhill ground floor of
  street-facing houses next to patches) before calling kit v2 done.

### S5. The airborne step-up does not check headroom
- Where: `src/core/sim.ts:1078-1088`, `:1110-1120`.
- How it fails: `s.py` is lifted up to 0.5 m onto a ledge without checking the body volume above
  it. Under a balcony deck or awning, the capsule can end up inside a solid.
- Fix: before accepting the lift, run the `groundHeight` / overlap test that `tryVault` uses
  (body volume above the lifted feet). If it is not free, keep the original blocked sweep.

### S6. The bot never probes the deaths in M1 to M3
- Where: `tests/content/graphBot.ts`, which drives straight lines between route points.
- Fix: add a "wanderer" check. From every house deck centre, run at full stick toward each
  non-takeoff face for 3 s. The hero must survive, either blocked or vaulting onto something safe.
  This would have caught M1 and M3.

### S7. PRODUCT.md amendment covers Non-goals only
- Where: `PRODUCT.md`, Non-goals lines 33 and 35.
- The 2026-11-10b and 2026-11-12 amendments each added a Purpose line and a Success line. Graph
  levels have neither, so there is no success test for Valley Run. Add one Success line (for
  example: a first-time player finishes Valley Run in under 2 minutes within a few restarts, and
  never dies without an input mistake). The other amendments (lean-scope 2026-11-13, ADR 0011
  addendum) are minimal and consistent.

## ACCEPT (verified)

- A1. `parkour 0` is unchanged. Every new rule is behind `w.parkour === 1`: the slide in
  `landHero` (`sim.ts:452`), the stick mantle in `hangStep` (`:722`), the grab probe (`:1148`),
  the vault and step-up (`pk`). `HERO_VAULT` can only be entered through `tryVault`. In the z-sweep
  change, `s.grounded === 1 ? baseY : s.py` equals the old `baseY` whenever no step-up fired. The
  module-level `stickDx/Dz/Mag` are written at the top of every `step()` before any read, so the
  result is deterministic. `tuning.test.ts:179` keeps the bot's `DEFAULT_TUNING` equal to the
  JSON.
- A2. Boxes and jump edges have no bot test. Valley-1 uses neither (its route is zip, touch,
  cushion and tramp). The builder's claim that stairs are not bot-tested is wrong: the 6-7 cushion
  edge walks up b's stairs (`graphBot.ts:264-271`). Any level that uses boxes or jump needs a bot
  test first.
- A3. Completion and skipping. All 9 route edges are played by the real `step()`. The thresholds
  (25/23/22/22 of 25) are sensible. A skip is unlikely: zip gaps are 14-26 m, and open ground is
  lethal. Spawn, goal box (around the hay), lobby entry (`GAME_MODES`, `parseMode`), best-time key
  `bhagdori.best.g.valley-1` and the `?mode=g:valley-1` URL are wired correctly.
- A4. The freeze hash is correct as a mechanism. Re-baselining once for M1 to M3 is fine because
  the level has not shipped.
- A5. Screenshots taken from a moved start: docs only. Retake them from the real spawn after M2
  and M3.
- A6. House kit: heights are not altitude-dependent (`deckY = groundY + plinth + storey * storeys`,
  `houseSpec.ts:180`). The window formula is right apart from M3. v2 pieces only enter the scene
  when `count > 0` (`kit.ts:590`), so v1 draw calls are untouched apart from M4. The v2 budget
  test is in place (at most 24 instanced meshes, at most 55 Low draw calls).
- A7. `game.ts` wiring: MANTLE, VAULT and SLIDE events map to AE bits, `hv.sliding` is set,
  `VAULTING = 5` matches `HERO_VAULT`, and `resetHero` clears every new field through
  `newHeroState`. HINT is disabled for graph modes.
- A8. The vault path has no collision mid-flight (only the end point is tested), and the hook is
  frozen for 0.28 s during a vault. Both are harmless with `lineOnly`. An overhead clip is
  possible only under geometry that valley-1 does not have.
- A9. The placer runs at runtime. Differences in `Math.atan2` or `Math.hypot` between JS engines
  could flip a borderline `Fail` and pick a different seed in Safari. The risk is low; baking the
  placed JSON at build time is a later option.
