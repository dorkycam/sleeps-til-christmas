import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Holiday } from '@/lib/holidays';

import {
  calculateHolidayCountdown,
  formatCountdownTitle,
  getCountdownLabel,
} from './countdown';

const christmas: Holiday = {
  slug: 'christmas',
  month: 12,
  day: 25,
  message: 'Merry Christmas!',
  name: 'christmas',
  theme: 'christmas',
  iconName: 'home',
};

describe('calculateHolidayCountdown', () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it('counts the sleeps until an upcoming holiday this year', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0)); // Dec 20, 2026
    const { sleepsUntil, isToday } = calculateHolidayCountdown(christmas);
    expect(sleepsUntil).toBe(5);
    expect(isToday).toBe(false);
  });

  it('returns isToday=true and 0 sleeps on the holiday', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 25, 9, 0, 0)); // Dec 25, 2026
    const { sleepsUntil, isToday } = calculateHolidayCountdown(christmas);
    expect(sleepsUntil).toBe(0);
    expect(isToday).toBe(true);
  });

  it('rolls over to next year once the holiday has passed', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 26, 9, 0, 0)); // Dec 26, 2026
    const { sleepsUntil, isToday } = calculateHolidayCountdown(christmas);
    expect(isToday).toBe(false);
    expect(sleepsUntil).toBe(364); // Dec 26 2026 -> Dec 25 2027
  });
});

const ONE_SLEEP = { sleepsUntil: 1, isToday: false };
const MANY_SLEEPS = { sleepsUntil: 5, isToday: false };
const TODAY = { sleepsUntil: 0, isToday: true };

describe('getCountdownLabel', () => {
  it('uses singular "sleep" when exactly one sleep remains', () => {
    expect(getCountdownLabel(christmas, ONE_SLEEP)).toBe(
      "sleep 'til christmas",
    );
  });

  it('uses plural "sleeps" when more than one sleep remains', () => {
    expect(getCountdownLabel(christmas, MANY_SLEEPS)).toBe(
      "sleeps 'til christmas",
    );
  });

  it('celebrates on the day', () => {
    expect(getCountdownLabel(christmas, TODAY)).toBe('Happy christmas!');
  });
});

describe('formatCountdownTitle', () => {
  it('prefixes the plural label with the count', () => {
    expect(formatCountdownTitle(christmas, MANY_SLEEPS)).toBe(
      "5 sleeps 'til christmas",
    );
  });

  it('uses singular "sleep" for exactly one sleep', () => {
    expect(formatCountdownTitle(christmas, ONE_SLEEP)).toBe(
      "1 sleep 'til christmas",
    );
  });

  it('drops the count on the day', () => {
    expect(formatCountdownTitle(christmas, TODAY)).toBe('Happy christmas!');
  });
});
