import type { Holiday } from '@/components/countdown/HolidayCountdown';

/** Canonical production origin for the site. */
export const BASE_URL = 'https://sleepstilchristmas.com';

/**
 * Build the canonical URL for a holiday page.
 *
 * Christmas lives at the site root (`/`); every other holiday is served from
 * its slug. Centralized here so metadata, structured data, and any future
 * consumer derive URLs the same way.
 *
 * @param holiday - the holiday to build a URL for
 * @returns the absolute page URL
 */
export function getHolidayUrl(holiday: Holiday): string {
  return holiday.slug === 'christmas' ? BASE_URL : `${BASE_URL}/${holiday.slug}`;
}
