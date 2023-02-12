/**
 * Prefer mobile-first responsive styling / media queries.
 */

// minWidthMobile is zero
export const minWidthTablet = 451;
export const minWidthTabletLarge = 641;
export const minWidthDesktop = 901;
export const minWidthDesktopSafe = 1024;
export const maxWidthLayout = 1440;

// minMobile is implicit for mobile-first styling
export const minTablet = `(min-width: ${minWidthTablet}px)`;
export const minTabletLarge = `(min-width: ${minWidthTabletLarge}px)`;
export const minDesktop = `(min-width: ${minWidthDesktop}px)`;

/** Width at which desktop styles can be used safely (no adjustments needed) */
export const minDesktopSafe = `(min-width: ${minWidthDesktopSafe}px)`;

// -- Avoid using desktop-first media queries, if possible! --

/** Opposite of minTablet. Avoid if possible. */
export const maxMobile = `(max-width: ${minWidthTablet - 0.5}px)`;

/** Opposite of minTabletLarge. Avoid if possible. */
export const maxTablet = `(max-width: ${minWidthTabletLarge - 0.5}px)`;

/** Opposite of minDesktop. Avoid if possible. */
export const maxTabletLarge = `(max-width: ${minWidthDesktop - 0.5}px)`;

/** Opposite of minDesktopSafe. Avoid if possible. */
export const maxDesktop = `(max-width: ${minWidthDesktopSafe - 0.5}px)`;

// maxDesktopSafe is implicit for desktop-first styling
