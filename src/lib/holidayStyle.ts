import { holidayThemes } from './holidayTheme';

import type { CSSProperties } from 'react';
import type { HolidayTheme } from './holidayTheme';

/**
 * Build the per-holiday CSS custom properties for a theme.
 *
 * Spread the result into a `style` prop on a page-root element so that
 * static Tailwind utility classes (e.g. `text-[var(--holiday-text)]`) resolve
 * to the correct holiday colors without per-holiday class duplication.
 *
 * @param theme - Holiday theme key
 * @returns CSS custom properties for the holiday's color palette
 */
export function holidayCssVars(theme: HolidayTheme): CSSProperties {
  const colors = holidayThemes[theme];
  return {
    '--holiday-primary': colors.primary,
    '--holiday-secondary': colors.secondary,
    '--holiday-text': colors.text,
    '--holiday-bg': colors.background,
  };
}

/**
 * Build the `--btn-bg` / `--btn-fg` custom properties for a holiday button.
 *
 * The button fills with the primary color and labels in the text color; the
 * two swap on hover.
 *
 * @param theme - Holiday theme key
 * @returns CSS custom properties for the button colors
 */
export function holidayButtonVars(theme: HolidayTheme): CSSProperties {
  const colors = holidayThemes[theme];
  return {
    '--btn-bg': colors.primary,
    '--btn-fg': colors.text,
  };
}
