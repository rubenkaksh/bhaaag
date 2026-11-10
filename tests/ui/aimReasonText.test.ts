import { describe, expect, it } from 'vitest';
import {
  AIM_BLOCKED,
  AIM_NONE,
  AIM_OK,
  AIM_OUT_OF_RANGE,
  AIM_TOO_CLOSE,
  AIM_TOO_FLAT,
  AIM_TOO_STEEP,
  AIM_UPHILL,
} from '../../src/core/hook';
import { aimReasonText } from '../../src/adapters/ui/aimReasonText';

describe('aimReasonText', () => {
  const rows: Array<[number, string]> = [
    [AIM_OK, ''],
    [AIM_NONE, ''],
    [AIM_TOO_CLOSE, 'Too close'],
    [AIM_OUT_OF_RANGE, 'Out of range'],
    [AIM_UPHILL, "Can't zip uphill"],
    [AIM_TOO_FLAT, 'Too flat'],
    [AIM_TOO_STEEP, 'Too steep'],
    [AIM_BLOCKED, 'Line blocked'],
    [99, ''],
  ];
  for (const [code, text] of rows) {
    it(`code ${code}`, () => {
      expect(aimReasonText(code)).toBe(text);
    });
  }
});
