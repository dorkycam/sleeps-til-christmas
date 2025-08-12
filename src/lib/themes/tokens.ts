/**
 * Design tokens for consistent styling across the application
 *
 * These tokens provide a centralized design system that ensures
 * consistent spacing, typography, and styling throughout the app.
 */
export const tokens = {
  // Spacing system based on 4px grid
  spacing: {
    xs: '4px', // 4px
    sm: '8px', // 8px
    md: '16px', // 16px
    lg: '24px', // 24px
    xl: '32px', // 32px
    '2xl': '48px', // 48px
    '3xl': '64px', // 64px
  },

  // Typography scale with responsive considerations
  fontSize: {
    xs: '12px', // Small text
    sm: '14px', // Body small
    base: '16px', // Base body text
    lg: '18px', // Large body
    xl: '20px', // Subheading small
    '2xl': '24px', // Subheading
    '3xl': '30px', // Subheading large
    '4xl': '36px', // Heading small
    '5xl': '48px', // Heading
    '6xl': '60px', // Heading large
    '7xl': '72px', // Display small
    '8xl': '96px', // Display
    '9xl': '128px', // Display large
    '10xl': '150px', // Hero text
  },

  // Font weight scale
  fontWeight: {
    normal: '400', // Regular text
    medium: '500', // Medium emphasis
    semibold: '600', // Strong emphasis
    bold: '700', // Headings and important text
  },

  // Border radius scale
  borderRadius: {
    none: '0', // No rounding
    sm: '2px', // Slight rounding
    base: '4px', // Default rounding
    md: '6px', // Medium rounding
    lg: '8px', // Large rounding
    xl: '12px', // Extra large rounding
    '2xl': '16px', // Very large rounding
    '3xl': '24px', // Maximum rounding
    full: '9999px', // Fully rounded (pills, circles)
  },

  // Z-index scale for layering
  zIndex: {
    base: 1, // Base layer
    dropdown: 1000, // Dropdowns
    sticky: 1020, // Sticky elements
    fixed: 1030, // Fixed positioned elements
    modal: 1040, // Modal backgrounds
    popover: 1050, // Popovers
    tooltip: 1060, // Tooltips
    toast: 1070, // Toast notifications
  },

  // Responsive breakpoints (mobile-first)
  breakpoints: {
    sm: '640px', // Small tablets
    md: '768px', // Large tablets
    lg: '1024px', // Small desktops
    xl: '1280px', // Large desktops
    '2xl': '1536px', // Extra large screens
  },
} as const;

/**
 * Holiday-specific color themes
 *
 * Each theme provides a cohesive color palette for different holidays,
 * ensuring consistent branding and visual identity.
 */
export const holidayThemes = {
  christmas: {
    primary: '#add8e6', // Light blue - winter sky
    secondary: '#ffffff', // White - snow
    text: '#ffffff', // White text for contrast
    background: '#add8e6', // Light blue background
  },
  halloween: {
    primary: '#000000', // Black - spooky night
    secondary: '#ff6b35', // Orange - pumpkin color
    text: '#ffffff', // White text for contrast
    background: '#000000', // Black background
  },
  valentines: {
    primary: '#EBCEDA', // Light pink - romantic
    secondary: '#ff69b4', // Hot pink - love
    text: '#ffffff', // White text for contrast
    background: '#EBCEDA', // Light pink background
  },
  newyear: {
    primary: '#FFD700', // Gold - celebration
    secondary: '#000000', // Black - classic
    text: '#ffffff', // White text for contrast
    background: '#FFD700', // Gold background
  },
  birthday: {
    primary: '#e4abfcff', // Light pink - festive
    secondary: '#ffffff', // Gold - celebration
    text: '#ffffff', // Black text for contrast
    background: '#e4abfcff', // Light pink background
  },
  /**
   * Default theme for fallback or unrecognized holidays
   * Provides a clean, neutral design.
   */
  default: {
    primary: '#ffffff', // White - clean
    secondary: '#000000', // Black - classic
    text: '#000000', // Black text
    background: '#ffffff', // White background
  },
} as const;

// Type definitions for theme system
export type HolidayTheme = keyof typeof holidayThemes;
export type TokenPath = keyof typeof tokens;
