import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  calculateHolidayCountdown,
  formatCountdownTitle,
  getCountdownLabel,
} from './countdown';
import type { Holiday } from '@/components/countdown/HolidayCountdown';

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

describe('getCountdownLabel', () => {
  afterEach(() => vi.useRealTimers());

  it('uses singular "sleep" when exactly one sleep remains', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 24, 9, 0, 0)); // Dec 24, 2026
    expect(getCountdownLabel(christmas)).toBe("sleep 'til christmas");
  });

  it('uses plural "sleeps" when more than one sleep remains', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0));
    expect(getCountdownLabel(christmas)).toBe("sleeps 'til christmas");
  });

  it('celebrates on the day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 25, 9, 0, 0));
    expect(getCountdownLabel(christmas)).toBe('Happy christmas!');
  });
});

describe('formatCountdownTitle', () => {
  afterEach(() => vi.useRealTimers());

  it('formats the plural title', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0));
    expect(formatCountdownTitle(christmas)).toBe("5 Sleeps 'til christmas");
  });
});
