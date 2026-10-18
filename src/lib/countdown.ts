import dayjs from 'dayjs';

import type { Holiday } from './holidays';

export interface CountdownResult {
  sleepsUntil: number;
  isToday: boolean;
  targetDate: dayjs.Dayjs;
}

/**
 * Calculate sleeps remaining until a holiday
 *
 * This is the single source of truth for all countdown calculations
 * used across the entire application (metadata, components, etc.)
 *
 * @param holiday - Holiday object with month and day
 * @returns CountdownResult with sleeps remaining and additional info
 */
export function calculateHolidayCountdown(holiday: Holiday): CountdownResult {
  const today = dayjs().startOf('day'); // Start of current day
  const currentYear = today.year();

  // Create target date for this year
  let targetDate = dayjs()
    .year(currentYear)
    .month(holiday.month - 1) // dayjs months are 0-indexed
    .date(holiday.day)
    .startOf('day'); // Start of holiday day

  // Check if today is the holiday
  const isToday = targetDate.isSame(today, 'day');

  // If the holiday has passed this year (and it's not today), target next year
  if (targetDate.isBefore(today, 'day')) {
    targetDate = targetDate.add(1, 'year');
  }

  // Calculate exact sleeps until the holiday
  const sleepsUntil = isToday ? 0 : targetDate.diff(today, 'day');

  return {
    sleepsUntil: Math.max(0, sleepsUntil),
    isToday,
    targetDate,
  };
}

/**
 * Countdown label shown under the number, with singular/plural handling.
 *
 * @param holiday - the holiday being counted down to
 * @param countdown - the result of `calculateHolidayCountdown`
 * @returns e.g. "sleeps 'til christmas", "sleep 'til christmas", "Happy christmas!"
 */
export function getCountdownLabel(
  holiday: Pick<Holiday, 'name'>,
  countdown: Pick<CountdownResult, 'sleepsUntil' | 'isToday'>,
): string {
  if (countdown.isToday) {
    return `Happy ${holiday.name}!`;
  }
  return `${countdown.sleepsUntil === 1 ? 'sleep' : 'sleeps'} 'til ${holiday.name}`;
}

/**
 * Live countdown headline, used on the share card.
 *
 * @param holiday - the holiday being counted down to
 * @param countdown - the result of `calculateHolidayCountdown`
 * @returns e.g. "5 sleeps 'til christmas", or "Happy christmas!" on the day
 */
export function formatCountdownTitle(
  holiday: Pick<Holiday, 'name'>,
  countdown: Pick<CountdownResult, 'sleepsUntil' | 'isToday'>,
): string {
  const label = getCountdownLabel(holiday, countdown);
  return countdown.isToday ? label : `${countdown.sleepsUntil} ${label}`;
}
