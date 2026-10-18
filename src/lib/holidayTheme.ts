/**
 * Holiday-specific color themes.
 *
 * These stay in JS (rather than only in the CSS `@theme`) because they are
 * needed at runtime: particle colors, the `/api/og` image, the viewport theme
 * color, and the per-page CSS variables from `holidayCssVars`. Spacing, type,
 * and other static scales live in `src/styles/globals.css`.
 */
export const holidayThemes = {
  christmas: {
    primary: '#add8e6', // Light blue - winter sky
    secondary: '#ffffff', // White - snow
    text: '#ffffff',
    background: '#add8e6',
  },
  halloween: {
    primary: '#000000', // Black - spooky night
    secondary: '#ff6b35', // Orange - pumpkin
    text: '#ffffff',
    background: '#000000',
  },
  valentines: {
    primary: '#EBCEDA', // Light pink
    secondary: '#ff69b4', // Hot pink
    text: '#ffffff',
    background: '#EBCEDA',
  },
  birthday: {
    primary: '#e4abfcff', // Light purple
    secondary: '#ffffff', // White
    text: '#ffffff',
    background: '#e4abfcff',
  },
} as const;

export type HolidayTheme = keyof typeof holidayThemes;
