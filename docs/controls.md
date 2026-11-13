# Controls (T292, owner item 7)

Same scheme in Classic, Chase and the strategy level, portrait and landscape. ADR 0011 leaves the
tap mapping open ("double/triple tap ... without a core change"); this is the simplest mapping that
covers Hook, Mantle and Brake (release on the rope is DROP) with one thumb target. `InputFrame` is unchanged
(`taps` 0..3, `BTN_CLIMB`).

## Touch

- Left thumb: floating stick. It appears where the thumb lands, moves the hero. Swipe down on
  the right side = Drop.
- **MAP** button, bottom centre of the HUD (all modes): HOLD to zoom out to a bird's eye view. The camera rises and pulls back
  to an oblique overview that frames the hero plus the path ahead (next anchors, landing pads, finish), clamped to
  `camera.overviewMaxExtent` from the hero; release and it eases back to the follow camera (`overviewEase`, in and out).
  Tunables: `overviewHeight`, `overviewPullBack`, `overviewPitchDeg`, `overviewSpanScale`. Render-only: the sim never changes and the
  stick still moves relative to the normal follow view. The stick floats as usual and the Drop swipe is never suspended.
  While zoomed out a tap does not aim (tap-to-aim resumes when the view is back).
  **Availability (`overviewAvailable(heroMode)`, `overviewCam.ts`):** grounded on a roof or attached to the rope. Airborne, hanging,
  dead = the button is dimmed and any hold releases (the camera eases back).
- Right thumb: ONE big button (`#btn-jump`). Its label is the context (`ActionMode`, set by
  `game.ts` each frame, drawn by `hud.setActionLabel`):

| Context | Label | Tap | Hold | Double tap | Triple tap |
|---|---|---|---|---|---|
| On ground / in air (default) | JUMP | Jump (instant on press) | Jump held (roll carry) | Hook (free aim levels) | Drop |
| Grounded on a line pad (`lineOnly`, `lineAt >= 0`) | HOOK | Hook (instant) | - | - | Drop |
| Attached to the rope | BRAKE | Ignored (JUMP does nothing on the rope; release is DROP) | Hand-brake (`BTN_REEL`) from 180 ms | - | Drop (release) |
| Hanging with `hasLedge === 1` | CLIMB | Wall jump (on lift, under 350 ms) | Mantle (`BTN_CLIMB`) from 350 ms | - | Drop (let go) |

- Outside a line pad in a `lineOnly` level the label stays JUMP and the HUD hint reads "Stand on a
  line pad" (`AIM_NO_LINE`, via `aimReasonText`).
- Timings (`src/adapters/input/tapGesture.ts`): a tap is a press of at most 250 ms; the tap sequence
  closes 220 ms after the last lift (double tap resolves then; the third tap resolves at once). A
  longer press is a hold and breaks the sequence. `pointercancel`, window blur and orientation flip
  cancel: no tap, no edge, nothing held.
- Double tap = jump then hook: the first tap jumps at once (no latency), the hook arms ~220 ms
  later, in the air. On a line pad the single tap hooks, so the zip never waits.

## Desktop (unchanged, plus one key)

WASD / arrows move, **hold L or M = bird's eye overview** (same rules as the MAP button; nothing else changes while held), Space jump, E or left click hook, hold R or right mouse brake,
Shift / Ctrl / Q drop, **F hold = climb (mantle)**, Esc menu.

## Camera and aim

**The only view control is the hold-to-zoom-out MAP overview** (button or L / M, see above). There is no look-drag, mouse look, pointer lock, right stick or
Q/E camera turn. The camera is a fixed view from BEHIND the hero, looking downhill, that follows the hero and pans
left and right to keep the hero centred (pitch `camera.frontPitchDeg`).
Automatic changes: while moving sideways the camera leans up to `camera.sideYawDeg` (40 deg, full at
`sideYawSpeed` 2.5 m/s, `sideYawEaseBack` eases it home) so houses at the sides show; while ziplining diagonally the yaw eases by `camera.zipYawDeg` toward the
travel side, then back to the default downhill view when the line ends (`src/adapters/render/cameraYaw.ts`, tunables in
`content/config/tuning.json`). Movement is screen-space relative to that view.

Aim needs no look control. By default the hook aims at the glowing next route anchor; on touch, tap an
anchor to aim at it (nearest within `aim.tapRadiusNdc`). In line-only strategy levels ziplines are
fixed and aim is bypassed. Movement and tap gestures are as in the table above.

## Not verified

Feel on a real device: the 180 ms brake delay, the 220 ms double-tap window, thumb reach of the
button. Strategy mode is not wired into `game.ts` yet, so only the context logic (not a screenshot)
covers it.

## Screen orientation switch (touch devices)

Menu panel, row **Screen**: Auto / Landscape / Portrait (saved in `localStorage` key `bhaaag.orientation`). Auto follows the
device (default, no rotate overlay). Forced modes live in `src/adapters/ui/orientation.ts`:

- First choice: fullscreen + `screen.orientation.lock()` (Android Chrome), retried inside the PLAY tap for a saved choice.
- Fallback (iOS Safari, or lock refused): the game root (`body`) is rotated 90 degrees with CSS. The renderer, HUD layout and the touch adapter
  read the swapped logical size (`viewportSize()`) and remapped pointer coordinates (`toLogical()`); `@media (orientation: ...)` rules are
  swapped at runtime so the portrait/landscape HUD layouts follow the logical orientation.
- Limits of the fallback: the browser UI and safe-area insets (`env(safe-area-inset-*)`) and `vh`/`vw` units still describe the physical
  screen, so notch/home-indicator padding and some clamp() sizes can be off; the address bar is not hidden; not available on desktop.
