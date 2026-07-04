import type { CSSProperties } from 'react';
import { holidayThemes, type HolidayTheme } from './tokens';

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
  } as CSSProperties;
}
