import type { Holiday, HolidaySlug } from './holidays';

/** Canonical production origin for the site. */
export const BASE_URL = 'https://sleepstilchristmas.com';

/** The holiday served at the site root (`/`). */
export const HOME_HOLIDAY_SLUG: HolidaySlug = 'christmas';

/**
 * Whether a holiday is the one served at the site root.
 *
 * @param holiday - the holiday to check
 * @returns true for the home holiday
 */
export function isHomeHoliday(holiday: Pick<Holiday, 'slug'>): boolean {
  return holiday.slug === HOME_HOLIDAY_SLUG;
}

/**
 * Build the site-relative path for a holiday page.
 *
 * The home holiday lives at the site root (`/`); every other holiday is served
 * from its slug. Centralized here so links, metadata, structured data, and the
 * sitemap all derive paths the same way.
 *
 * @param holiday - the holiday to build a path for
 * @returns the page path, e.g. `/` or `/halloween`
 */
export function getHolidayPath(holiday: Pick<Holiday, 'slug'>): string {
  return isHomeHoliday(holiday) ? '/' : `/${holiday.slug}`;
}

/**
 * Build the canonical absolute URL for a holiday page.
 *
 * @param holiday - the holiday to build a URL for
 * @returns the absolute page URL
 */
export function getHolidayUrl(holiday: Pick<Holiday, 'slug'>): string {
  const path = getHolidayPath(holiday);
  return path === '/' ? BASE_URL : `${BASE_URL}${path}`;
}
