/**
 * Copy shown on the Open Graph share card, derived from the sleep count.
 */
export interface OgCopy {
  /** Short countdown phrase, e.g. "today!", "1 sleep left", "162 sleeps". */
  countdownText: string;
  /** Full headline, e.g. "Today is christmas!" or "162 sleeps Until christmas". */
  mainText: string;
}

/**
 * Build the Open Graph share-card copy for a holiday and sleep count.
 *
 * Extracted from the `/api/og` route so the wording is unit-testable without
 * rendering an image.
 *
 * @param holidayName - the holiday's display name
 * @param sleepsNumber - sleeps remaining (0 means the holiday is today)
 * @returns the countdown phrase and headline for the card
 */
export function getOgCopy(holidayName: string, sleepsNumber: number): OgCopy {
  const countdownText =
    sleepsNumber === 0
      ? 'today!'
      : sleepsNumber === 1
        ? '1 sleep left'
        : `${sleepsNumber} sleeps`;

  const mainText =
    sleepsNumber === 0
      ? `Today is ${holidayName}!`
      : `${countdownText} Until ${holidayName}`;

  return { countdownText, mainText };
}
