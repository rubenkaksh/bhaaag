# ADR 0008: graphics overhaul budgets (2026-11-09)

Rebaselines the binding tables of ADR 0006 s1 and ADR 0007 s1 for `docs/graphics-overhaul-plan.md`
(section 9 lists the Opus review that required this).

| Metric | Old | New |
|---|---|---|
| Draw calls per frame (main pass, no shadow pass) | <= 80 (~74 used) | <= 90 |
| Decor draw calls / instanced meshes | 16 / 16 | 24 / 24 (decor.test.ts already allows 24) |
| Decor triangles | 90k ceiling | 150k (decor.test.ts) |
| Frame triangles (`?debug`) | 120k | 200k |
| Shadow-pass draws | uncounted | counted separately; Medium/High only, about one per caster |
| JS bundle | ~600 KB gz | unchanged (~219 KB gz today) |
| Added textures | none | <= ~150 KB total |

Rules unchanged: stock materials, no hand-written shaders, no GLB, <= 5 additive meshes (cloud and
god-ray cards use normal alpha blending), 60 fps target on iPhone 12-class.

Hero mesh cap raised 25 -> 28 (P5: second scarf segment, top-knot, brow fringe; tri cap 1,500 unchanged). Within the 90-call frame budget (Low frame ~65 calls).

## Amendment 2026-11-10: accepted limits

- **Instanced wall UV stretch accepted.** `wallBrick` / `wallPlaster` share one geometry per piece, so tile density varies with the instance scale. Size-bucketed geometries would multiply instanced meshes past the 24-mesh budget; the walls are brick/plaster at 2 and 1.5 tiles per face and read as intended in shots. Revisit only if a wall looks visibly smeared.
- **Standard materials on High only.** Decor walls and roofs swap to `MeshStandardMaterial` (roughness 0.92, metalness 0) in `scene.ts` `swapStandard`; Medium and Low keep Lambert to protect phones.
- **No new tile images.** The existing six tiles plus normal maps stay (~58 KB normals); new tiles would need a generator that is not wired here. Licences: all tiles are in-repo procedural/own assets, nothing third-party added.
- **Tree/tank contact slabs dropped:** they overflow the 150k decor tri cap and overlap plinth colliders.
