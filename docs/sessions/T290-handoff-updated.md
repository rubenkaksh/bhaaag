# T290 Handoff: Cloud Dragon Chase Sprite Integration

**Updated:** 2026-11-11  
**Goal:** Replace the face-only DOM overlay approach with an animation-ready, portrait-mode 2.5D cloud dragon that chases the player in Three.js.

## 1. Intended in-game result

The dragon is a pursuing character, not a static face that fades over the HUD.

- Keep the dragon's **head facing the camera**, centered horizontally and positioned behind/above the player in the portrait composition.
- Its long cloud body and tail trail away from the head down the portrait frame.
- Make the body travel left and right in a smooth, continuous **side-to-side sine wave**. In screen coordinates, the body follows a vertical path whose horizontal displacement oscillates:
  `x(s, t) = A(s) * sin(k * s - w * t + phase)`
  where `s` is distance along the body from the head. Use a small amplitude near the head and increase it toward the tail.
- The dragon should read as one continuous serpentine creature. The cloud pieces are modular body segments, not independent floating decorations.
- The player remains the chase target. The dragon should maintain pursuit and animate continuously; it should not appear/disappear as a single full-screen image.
- Use a portrait camera/layout and preserve the head-on silhouette. A subtle 3/4 depth angle is acceptable, but do not turn the dragon into a side-view flying creature.

## 2. What the supplied sprite sheet actually contains

Source image: generated 2.5D game-art sheet, **1024 × 1536 RGBA**, approximately **3.2 MB**. It has transparent pixels around the artwork. The previous handoff's dimensions/orientation were incorrect (it said 1536 × 1024).

The sheet contains:

1. **Two large dragon head + lateral cloud-body poses** at the top. They are similar alternate poses/frames, not two complete body-and-tail animation frames.
2. **Several separate cloud forms** in the middle. These are the useful modular pieces for constructing the long body/tail.
3. **Floating stone/grass platforms and ground pieces** in the lower portion. These can be used as level props if the game needs them; they are not part of the dragon.

Approximate source-image crop bounds (x0, y0, x1, y1), in pixels. Bounds are starting points; inspect the crops and add a small transparent margin before final export.

| Asset | Approximate crop bounds | Intended use |
|---|---:|---|
| Dragon head/body pose A | `(48, 113, 963, 419)` | Main head sprite / alternate pose |
| Dragon head/body pose B | `(39, 440, 993, 723)` | Alternate head sprite / animation variation |
| Cloud segment A | `(50, 719, 485, 959)` | Modular body segment |
| Cloud segment B | `(517, 718, 977, 949)` | Modular body segment |
| Cloud puff A | `(27, 1000, 606, 1106)` | Smaller body/tail section |
| Cloud puff B | `(633, 1001, 796, 1102)` | Smaller body/tail section |
| Cloud puff C | `(813, 964, 996, 1104)` | Smaller body/tail section |
| Cloud puff D | `(634, 1132, 995, 1274)` | Modular cloud/particle/segment |
| Ground/platform pieces | approximately `y=1132–1536` | Optional level art; crop individual pieces |

**Important:** The source is an assembled concept sheet, not a packed, runtime-ready atlas. Do not display the whole sheet as one image, and do not use the two top poses as if they were consecutive positions of the entire dragon. Crop each usable element into its own transparent asset.

## 3. Asset preparation

Create a small, explicit asset set under `public/assets/dragon/` (or the project's existing asset convention):

```text
public/assets/dragon/
  head-a.webp
  head-b.webp
  cloud-segment-a.webp
  cloud-segment-b.webp
  cloud-puff-a.webp
  cloud-puff-b.webp
  cloud-puff-c.webp
  cloud-puff-d.webp
  ...optional platform crops
```

Preparation requirements:

- Crop from the supplied RGBA source using the bounds above, then visually inspect every crop. Keep the full artwork and a little transparent padding; do not clip wisps, horns, whiskers, or cloud edges.
- Preserve alpha transparency. Do not export onto white, beige, or another opaque background.
- Export to WebP with alpha where supported by the project's browser targets. Keep PNG masters if useful. Optimize each runtime asset; avoid loading the 3.2 MB source sheet during gameplay.
- Normalize crop scale and anchor points. Define a consistent logical width/height and anchor for head and cloud segments so they can be positioned predictably in Three.js.
- The two head sprites are alternate visual poses. Use them for a controlled expression/roar or subtle animation only if the difference reads naturally. Do not rapidly flicker between them.
- The sheet does **not** provide a complete sequence of body poses for sine-wave motion. Generate the motion procedurally by placing/reorienting modular cloud segments along a curve. If the segment shapes do not join cleanly, use overlapping pieces and/or a soft cloud particle layer to hide seams.

## 4. Three.js implementation direction

### Dragon composition

Implement the dragon as a Three.js scene object/group, separate from the HUD.

Suggested structure:

```text
Dragon
├── HeadSprite (head-a / head-b)
├── BodySegments[]
│   ├── cloud-segment / cloud-puff sprites
│   └── optional small cloud particles
└── TailTip (small cloud segment, tapered/rotated)
```

Use transparent planes or sprites with alpha, with depth testing/render order configured deliberately so the head remains readable in front of its own body. Keep the dragon's scene transform independent of HUD layout.

### Serpentine body motion

- Define a vertical centerline extending from the back of the head toward the tail.
- Sample points along the centerline and offset each point horizontally with a time-varying sine function.
- Place cloud segments at those sample points. Orient each segment to the tangent between neighboring points; vary scale gradually toward the tail.
- Animate with the render-loop delta time. Avoid per-frame React/DOM state updates or recreating textures/materials.
- Use a stable phase progression along the body so the wave travels down its length rather than every segment sliding in the same direction at once.
- Keep the head centered and comparatively stable. The neck should transition smoothly into the oscillating body.
- Add restrained vertical bob/rotation to the head if desired, but the dominant readable motion is the body/tail sweeping left and right.

### Performance

- Load and decode the cropped textures before the chase encounter begins. In Three.js, use the project's existing asset-loading path / `TextureLoader` or `LoadingManager`; do not create a new DOM `<img>` on every update.
- Reuse textures, materials, geometries, and sprite objects. Update transforms only.
- Avoid loading the original sprite sheet at runtime.
- If using many segments, use a bounded pool or instanced/batched approach appropriate to the existing renderer. Start with a modest number of segments and profile before increasing it.
- Dispose of replaced textures/materials only when they are no longer referenced.

## 5. Existing implementation to inspect

The previous face-overlay implementation may still be useful as a temporary fallback, but it is not the intended final dragon system.

- `src/adapters/ui/dragonFaceOverlay.ts` — current DOM overlay; inspect and decide whether to remove it or retain only as a fallback/debug path.
- `src/adapters/ui/chaseHud.css` — overlay styling; remove obsolete face-overlay rules if the Three.js dragon replaces it.
- `ChaseHud` / `setDragonFace(k, timeSec)` — current wiring from `game.ts:672`; replace this with a clean gameplay-facing dragon state/API rather than driving a DOM face overlay.
- `public/assets/frame-0.png`, `frame-1.png` — legacy crops. Replace or retire them; do not assume their current crop bounds are correct.

Do not break chase HUD elements (score, distance, status, debug controls) while moving the dragon into the Three.js scene.

## 6. Suggested implementation sequence

1. **Verify source asset:** use the supplied 1024 × 1536 RGBA image and confirm the project copy is the same file.
2. **Prepare crops:** export the two head poses and modular cloud pieces with alpha; inspect at game size against the actual scene background.
3. **Build dragon group:** render the head centered and attach a short chain of cloud segments.
4. **Add curve motion:** extend the chain vertically and animate its lateral sine wave. Confirm it reads as one long body/tail.
5. **Integrate chase state:** connect dragon position, speed, and visibility to the existing chase/game state. Avoid a second competing DOM overlay.
6. **Preload and profile:** ensure all textures are ready before the encounter; check frame time and memory.
7. **Tune composition:** test on a narrow portrait viewport and ensure the head, body, and tail remain inside the intended play area.

## 7. Validation / acceptance criteria

- [ ] The game builds successfully.
- [ ] The dragon is visible in chase mode with no white rectangle/background.
- [ ] The head is front-facing and horizontally centered.
- [ ] The body extends behind the head down the portrait composition.
- [ ] The body/tail visibly snakes left and right in a smooth traveling sine wave.
- [ ] Cloud segments overlap naturally; no obvious gaps, detached pieces, or abrupt scale changes.
- [ ] Head animation is subtle and does not flicker.
- [ ] The player/HUD remain visible and gameplay controls are unaffected.
- [ ] Textures are preloaded; no freeze/stutter occurs when the dragon first appears.
- [ ] No repeated texture/material/DOM allocation occurs in the animation loop.
- [ ] No runtime console errors or WebGL warnings are introduced.

## 8. Test

Use the existing project command and debug route if it still exists:

```bash
pnpm build
pnpm exec vite preview --host 0.0.0.0
# Then open:
http://localhost:4174/?mode=chase&dragonGap=8&debug
```

If the query parameters or preview port have changed, use the project's current debug instructions. Test both the forced-immediate encounter and a normal chase progression.

## 9. Known limitations of the supplied art

- The top two dragon images are two similar head-with-wide-cloud-forms poses; they do not constitute a full animation atlas.
- The sheet has modular cloud pieces, but no clearly isolated, purpose-drawn tail tip or long continuous serpentine body.
- The side-to-side wave must therefore be created in Three.js from modular pieces. Do not expect a single supplied image to deform into a convincing 3D sine-wave body without additional geometry/shader work.
- Platform pieces are optional environment assets and should not be mixed into the dragon sprite group.
