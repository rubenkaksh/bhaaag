# Controls

**There is no view control.** The player cannot rotate or tilt the camera: no look-drag, no swipe-to-look,
no mouse look, no pointer lock, no right stick, no Q/E or arrow camera turns. The camera is a fixed FRONT
view that follows the hero (pitch `camera.frontPitchDeg`).

The only camera change is automatic: while ziplining diagonally toward NE or NW on screen, the yaw eases
by `camera.zipYawDeg` toward the travel side (only when the line is at least `camera.zipYawMinDiagDeg` off
straight ahead), then eases back to the exact front view when the zipline ends (`camera.zipYawEase` per
tick). Tunables live in `content/config/tuning.json`; the logic is `src/adapters/render/cameraYaw.ts`.

Movement is screen-space: the left stick / WASD moves relative to the fixed front view.

## Aim

Aim needs no look control. By default the hook aims at the glowing next route anchor. On touch, tap an
anchor to aim at it (nearest anchor within `aim.tapRadiusNdc` of the tap); the pick stays until the hook
fires. The aim assist cones and chord checks are unchanged.

## Touch

- Move: left thumb (floating stick)
- Aim: tap an anchor
- HOOK / BRAKE: big contextual button (hold on the rope to brake)
- JUMP: button; DROP: swipe down

## Desktop

- Move: WASD or arrows
- Hook: E or left click; Brake: hold R or right mouse; Jump: Space; Drop: Shift, Ctrl or Q
- Menu: Esc
