import type { Holiday } from '@/components/countdown/HolidayCountdown';

/** Canonical production origin for the site. */
export const BASE_URL = 'https://sleepstilchristmas.com';

/**
 * Build the site-relative path for a holiday page.
 *
 * Christmas lives at the site root (`/`); every other holiday is served from
 * its slug. Centralized here so links, metadata, structured data, and the
 * sitemap all derive paths the same way.
 *
 * @param holiday - the holiday to build a path for
 * @returns the page path, e.g. `/` or `/halloween`
 */
export function getHolidayPath(holiday: Pick<Holiday, 'slug'>): string {
  return holiday.slug === 'christmas' ? '/' : `/${holiday.slug}`;
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
