import { Holiday } from '@/components/countdown/HolidayCountdown';

/**
 * Holiday Database
 *
 * A comprehensive library of holidays with slug-based lookup.
 * Each holiday has a unique slug that can be used for URLs and routing.
 */
export const holidays = {
  christmas: {
    slug: 'christmas' as const,
    month: 12,
    day: 25,
    message: 'Merry Christmas!',
    name: 'christmas',
    theme: 'christmas' as const,
    iconName: 'home' as const,
    spotifyLinks: [
      'https://open.spotify.com/playlist/5VtKqkQ38BaTNDE45S7M8l?si=213b7495d5fb494d',
    ],
  },
  halloween: {
    slug: 'halloween' as const,
    month: 10,
    day: 31,
    message: 'Happy Halloween!',
    name: 'halloween',
    theme: 'halloween' as const,
    iconName: 'smile' as const,
  },
  'valentines-day': {
    slug: 'valentines-day' as const,
    month: 2,
    day: 14,
    message: "Happy Valentine's Day!",
    name: "valentine's day",
    theme: 'valentines' as const,
    iconName: 'heart' as const,
  },
} as const satisfies Record<string, Holiday>;

/**
 * Get a holiday by its slug
 *
 * @param slug - The URL-friendly holiday identifier
 * @returns Holiday object or undefined if not found
 */
export function getHolidayBySlug(slug: string): Holiday | undefined {
  return holidays[slug as HolidaySlug];
}

/**
 * Get a holiday by its slug (type-safe version)
 *
 * @param slug - The URL-friendly holiday identifier (must be valid)
 * @returns Holiday object
 */
export function getHolidayBySlugSafe(slug: HolidaySlug): Holiday {
  return holidays[slug];
}

/**
 * Get all available holiday slugs
 *
 * @returns Array of all holiday slugs
 */
export function getAllHolidaySlugs(): HolidaySlug[] {
  return Object.keys(holidays) as HolidaySlug[];
}

/**
 * Check if a slug is a valid holiday
 *
 * @param slug - The slug to validate
 * @returns true if the slug exists in the holiday database
 */
export function isValidHolidaySlug(slug: string): slug is HolidaySlug {
  return slug in holidays;
}

/**
 * Get the default holiday (Christmas)
 *
 * @returns The default holiday object
 */
export function getDefaultHoliday(): Holiday {
  return holidays.christmas;
}

// Type helpers for better TypeScript support
export type HolidaySlug = keyof typeof holidays;
export type HolidayRecord = typeof holidays;

// Utility type to get a holiday from its slug
export type GetHoliday<T extends HolidaySlug> = (typeof holidays)[T];

// Re-export countdown utilities for backward compatibility
export {
  calculateHolidayCountdown,
  formatCountdownTitle,
  getCelebrationMessage,
  getCountdownLabel,
  getCountdownNumber,
  getDaysUntilHoliday,
  getHolidayDescription,
  getSleepsUntilHoliday,
  isHolidayToday,
} from '@/lib/utils/countdown';
