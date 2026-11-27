/** Fixed sim step. Units: metres, seconds. Ground plane is x/z; forward at heading h is (sin h, cos h). */
export const DT = 1 / 60;

export interface SpikeInput {
  /** Ride: -1 left .. 1 right. */
  steer: number;
  /** Ride: -1 brake .. 1 full throttle. */
  throttle: number;
  /** Ride: gallop / nitro, held. */
  boost: boolean;
  /** Ride: jump (edge-free, held is fine). */
  jump: boolean;
  /** Camp: walk direction, length capped at 1. */
  moveX: number;
  moveZ: number;
  /** Aim direction on the ground plane (any length; zero keeps the last facing). */
  aimX: number;
  aimZ: number;
  /** Bow: hold to draw, release to loose. Rifle: hold to fire. */
  fire: boolean;
  reload: boolean;
  /** Camp: cook or feed the fire (edge triggered). */
  interact: boolean;
  /** Camp: eat the best food you carry (edge triggered). */
  eat: boolean;
}

export function neutralInput(): SpikeInput {
  return {
    steer: 0,
    throttle: 0,
    boost: false,
    jump: false,
    moveX: 0,
    moveZ: 0,
    aimX: 0,
    aimZ: 0,
    fire: false,
    reload: false,
    interact: false,
    eat: false,
  };
}
