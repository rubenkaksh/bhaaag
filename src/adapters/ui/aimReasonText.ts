import { AIM_BLOCKED, AIM_OUT_OF_RANGE, AIM_TOO_CLOSE, AIM_TOO_FLAT, AIM_TOO_STEEP, AIM_UPHILL } from '../../core/hook';

/** HUD text for an aimReason code; empty when there is nothing to explain. */
export function aimReasonText(code: number): string {
  switch (code) {
    case AIM_TOO_CLOSE:
      return 'Too close';
    case AIM_OUT_OF_RANGE:
      return 'Out of range';
    case AIM_UPHILL:
      return "Can't zip uphill";
    case AIM_TOO_FLAT:
      return 'Too flat';
    case AIM_TOO_STEEP:
      return 'Too steep';
    case AIM_BLOCKED:
      return 'Line blocked';
    default:
      return '';
  }
}
