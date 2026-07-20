import { describe, expect, it } from 'vitest';

import { getOgCopy } from './og';

describe('getOgCopy', () => {
  it('celebrates on the day (0 sleeps)', () => {
    expect(getOgCopy('christmas', 0)).toEqual({
      countdownText: 'today!',
      mainText: 'Today is christmas!',
    });
  });

  it('uses singular phrasing for exactly 1 sleep', () => {
    expect(getOgCopy('christmas', 1)).toEqual({
      countdownText: '1 sleep left',
      mainText: '1 sleep left Until christmas',
    });
  });

  it('uses plural phrasing for more than 1 sleep', () => {
    expect(getOgCopy('halloween', 162)).toEqual({
      countdownText: '162 sleeps',
      mainText: '162 sleeps Until halloween',
    });
  });
});
