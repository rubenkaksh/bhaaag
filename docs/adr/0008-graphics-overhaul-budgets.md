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
