# Controls (T292, owner item 7)

Same scheme in Classic, Chase and the strategy level, portrait and landscape. ADR 0011 leaves the
tap mapping open ("double/triple tap ... without a core change"); this is the simplest mapping that
covers Hook, Release, Mantle and Brake with one thumb target. `InputFrame` is unchanged
(`taps` 0..3, `BTN_CLIMB`).

## Touch

- Left thumb: floating stick. It appears where the thumb lands, moves the hero. Dragging the
  right side looks around; swipe down there = Drop.
- Right thumb: ONE big button (`#btn-jump`). Its label is the context (`ActionMode`, set by
  `game.ts` each frame, drawn by `hud.setActionLabel`):

| Context | Label | Tap | Hold | Double tap | Triple tap |
|---|---|---|---|---|---|
| On ground / in air (default) | JUMP | Jump (instant on press) | Jump held (roll carry) | Hook (free aim levels) | Drop |
| Grounded on a line pad (`lineOnly`, `lineAt >= 0`) | HOOK | Hook (instant) | - | - | Drop |
| Attached to the rope | BRAKE | Release with jump (on lift, under 180 ms) | Hand-brake (`BTN_REEL`) from 180 ms | - | Drop (release) |
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

WASD / arrows move, mouse look, Space jump, E or left click hook, hold R or right mouse brake,
Shift / Ctrl / Q drop, **F hold = climb (mantle)**, Esc menu.

## Not verified

Feel on a real device: the 180 ms brake delay, the 220 ms double-tap window, thumb reach of the
button. Strategy mode is not wired into `game.ts` yet, so only the context logic (not a screenshot)
covers it.
