# T290 Implementation Spec: Sprite-Based Cloud Dragon

## Context
Replace the procedural 3D puff dragon with a 2D sprite-based cloud dragon using the cropped assets from the sprite sheet.

## Assets Available
Located in `public/assets/dragon/`:
- `head-a.png` (449KB) - Dragon head pose A
- `head-b.png` (425KB) - Dragon head pose B
- `cloud-seg-a.png` (170KB) - Large cloud segment
- `cloud-seg-b.png` (164KB) - Large cloud segment
- `cloud-puff-a.png` (152KB) - Medium cloud puff
- `cloud-puff-b.png` (41KB) - Small cloud puff
- `cloud-puff-c.png` (51KB) - Small cloud puff
- `cloud-puff-d.png` (103KB) - Medium cloud puff

All assets have alpha transparency preserved.

## Requirements

### 1. Create `src/adapters/render/chase/dragonSpriteView.ts`

Replace the existing `dragonView.ts` with a sprite-based implementation.

**Interface (must match existing):**
```typescript
export class DragonSpriteView {
  readonly group: Group;
  constructor(tier: GraphicsTier);
  setTier(tier: GraphicsTier): void;
  update(dragonZ: number, time: number, lunge: number, heroX: number): void;
  dispose(): void;
}
```

**Implementation requirements:**

1. **Texture loading:**
   - Use Three.js `TextureLoader` to load all 8 PNG textures
   - Preload textures before first render (use LoadingManager or async constructor)
   - Set `texture.colorSpace = SRGBColorSpace`
   - Enable `texture.premultiplyAlpha = true` for proper alpha blending
   - Set `texture.minFilter = LinearFilter` and `texture.magFilter = LinearFilter`

2. **Dragon structure:**
   - Head: Use `head-a.png` or `head-b.png` as a `Sprite` (alternating subtly every 2-3 seconds)
   - Body: Create 8-12 body segments using the cloud segment/puff textures
   - Arrange segments in a vertical chain extending from head to tail
   - Each segment is a `Sprite` with appropriate scale (head largest, tail smallest)

3. **Serpentine animation:**
   - Body segments follow a sine-wave path: `x(s, t) = A(s) * sin(k * s - ω * t + phase)`
   - Where `s` is distance from head (0 at head, 1 at tail)
   - Amplitude `A(s)` increases from 0 at head to ~15 units at tail
   - Wave number `k` and frequency `ω` tuned for smooth serpentine motion
   - Each segment oriented to tangent of curve at its position
   - Phase offset creates traveling wave effect

4. **Positioning:**
   - Head positioned at `(dragonZ, hillY(dragonZ) + HOVER, dragonZ)` in world space
   - Body extends behind head (positive Z direction)
   - Use existing `hillY()` function from `src/core/chase/rows.ts`
   - `HOVER` constant ~15 meters above hill surface

5. **Lunge behavior:**
   - When `lunge > 0`, head dips toward hero by `lunge * 7` units in Y
   - Head sprite scales up slightly during lunge (1.0 + lunge * 0.2)

6. **Head animation:**
   - Subtle vertical bob: `Math.sin(time * 0.9) * 1.2`
   - Gentle rotation based on body curve tangent
   - Switch between head-a and head-b textures every 2-3 seconds (smooth crossfade)

7. **Graphics tier support:**
   - Low: 6 body segments, reduced texture resolution (optional)
   - Medium: 10 body segments
   - High: 12 body segments, full resolution textures
   - Adjust segment count in `setTier()` method

8. **Performance:**
   - Reuse textures across all segments (single load per texture)
   - Reuse materials where possible
   - No per-frame allocations
   - Dispose all textures/materials in `dispose()`

### 2. Update `src/app/game.ts`

Replace `DragonView` with `DragonSpriteView`:
- Line 63: Update import
- Line 194: Change `new DragonView(viewTier)` to `new DragonSpriteView(viewTier)`
- All other usages remain the same (interface is compatible)

### 3. Remove `src/adapters/ui/dragonFaceOverlay.ts`

Delete this file and remove all references:
- Remove import from `chaseHud.ts`
- Remove `setDragonFace()` calls from `game.ts`
- Remove CSS from `chaseHud.css`

### 4. Update `src/adapters/ui/chaseHud.ts`

Remove `setDragonFace()` method and related code.

## Acceptance Criteria

- [ ] Game builds without errors (`pnpm build`)
- [ ] Dragon head is visible and front-facing in chase mode
- [ ] Body extends behind head in smooth serpentine curve
- [ ] Body segments animate with sine-wave motion
- [ ] Head remains centered horizontally
- [ ] Lunge behavior works (head dips when catching)
- [ ] No white backgrounds visible (alpha blending correct)
- [ ] Textures preloaded (no flash/freeze on first appearance)
- [ ] Performance acceptable (profile with `?debug`)
- [ ] Old `dragonFaceOverlay.ts` removed
- [ ] No console errors or WebGL warnings

## Test Commands

```bash
pnpm build
pnpm exec vite preview --host 0.0.0.0
# Test: http://localhost:4174/?mode=chase&dragonGap=8&debug
```

## Files to Create/Modify

**Create:**
- `src/adapters/render/chase/dragonSpriteView.ts`

**Modify:**
- `src/app/game.ts` (update import and instantiation)
- `src/adapters/ui/chaseHud.ts` (remove setDragonFace)
- `src/adapters/ui/chaseHud.css` (remove dragon face overlay styles)

**Delete:**
- `src/adapters/ui/dragonFaceOverlay.ts`

## Reference

- Handoff: `docs/sessions/T290-handoff-updated.md`
- Existing implementation: `src/adapters/render/chase/dragonView.ts`
- Chase state: `src/core/chase/dragon.ts`
- Integration: `src/app/game.ts` lines 194, 668, 911
