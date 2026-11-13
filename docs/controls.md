# Controls (T292, owner item 7)

Same scheme in Classic, Chase and the strategy level, portrait and landscape. ADR 0011 leaves the
tap mapping open ("double/triple tap ... without a core change"); this is the simplest mapping that
covers Hook, Mantle and Brake (release on the rope is DROP) with one thumb target. `InputFrame` is unchanged
(`taps` 0..3, `BTN_CLIMB`).

## Touch

- Left thumb: floating stick. It appears where the thumb lands, moves the hero. Swipe down on
  the right side = Drop.
- **LOOK** button, bottom centre of the HUD (all modes): tap to toggle look-around. While on, a drag on the
  look zone (anywhere outside the stick zone) turns the camera around the hero (yaw up to `lookYawMaxDeg`, pitch
  `lookPitchMinDeg`..`lookPitchMaxDeg`); touch taps (tap-to-aim) and the Drop swipe are suspended, so a drag or tap never aims,
  drops or hooks. Everything else keeps working: the stick, the JUMP button and the context action button. Tap LOOK again, or wait `lookIdleSec` (4 s) without a drag, and the camera eases back
  to the follow view (`lookEase`). Never changes movement direction (still relative to the follow view).
  **Stick while LOOK is on:** the stick is NOT floating; it is fixed at its home position (bottom-left, same place each time) and
  keeps steering. It floats again when LOOK ends.
  **Direction:** drag right turns the view right, drag down looks up (owner iPhone feedback); `camera.lookInvertX` / `lookInvertY`
  (1 / 0) flip them.
  **Availability (`lookAvailability(heroMode)`, `lookOffset.ts`):** grounded on a roof = LOOK toggles as above. Attached to the rope =
  look-around is ON by default (no toggle, button shows active, no idle timeout; the Drop swipe is suspended, use the button's triple tap) and eases
  back on detach or landing. Airborne, hanging, dead = LOOK button dimmed/disabled and any active LOOK switches off.
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

WASD / arrows move, **L toggles LOOK** (a mouse drag then turns the camera and the mouse click/drag no longer hooks or brakes; no pointer lock; the keyboard keeps working: Space jump, E hook, hold R brake, Shift/Ctrl/Q drop, F climb), Space jump, E or left click hook, hold R or right mouse brake,
Shift / Ctrl / Q drop, **F hold = climb (mantle)**, Esc menu.

## Camera and aim

**The only view control is LOOK** (button or L, see above). There is no always-on look-drag, mouse look, pointer lock, right stick or
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
