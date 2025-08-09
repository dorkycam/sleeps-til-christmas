import dayjs from 'dayjs';
import { Holiday } from '@/components/countdown/HolidayCountdown';

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
 * Legacy function for backward compatibility
 * @deprecated Use calculateHolidayCountdown instead
 */
export function getDaysUntilHoliday(holiday: Holiday): number {
  return calculateHolidayCountdown(holiday).sleepsUntil;
}

/**
 * Get sleeps until holiday - preferred function name
 * @param holiday - Holiday object
 * @returns Number of sleeps until the holiday
 */
export function getSleepsUntilHoliday(holiday: Holiday): number {
  return calculateHolidayCountdown(holiday).sleepsUntil;
}

/**
 * Generate SEO-friendly description for a holiday with countdown
 *
 * @param holiday - Holiday object
 * @returns SEO description with countdown
 */
export function getHolidayDescription(holiday: Holiday): string {
  const { sleepsUntil, isToday } = calculateHolidayCountdown(holiday);

  if (isToday) {
    return `Today is ${holiday.name}! ${holiday.message}`;
  } else if (sleepsUntil === 1) {
    return `Only 1 sleep left until ${holiday.name}! ${holiday.message}`;
  } else {
    return `${sleepsUntil} sleeps until ${holiday.name}! Track the countdown and get ready to celebrate.`;
  }
}

/**
 * Format countdown for display in titles and social cards
 *
 * @param holiday - Holiday object
 * @returns Formatted title text
 */
export function formatCountdownTitle(holiday: Holiday): string {
  const { sleepsUntil, isToday } = calculateHolidayCountdown(holiday);

  if (isToday) {
    return `Today is ${holiday.name}!`;
  } else if (sleepsUntil === 1) {
    return `1 Sleep Until ${holiday.name}`;
  } else {
    return `${sleepsUntil} Sleeps Until ${holiday.name}`;
  }
}
