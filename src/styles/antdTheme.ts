import { HolidayTheme, holidayThemes } from '@/components';
import type { ThemeConfig } from 'antd';

/**
 * Base Ant Design theme configuration
 *
 * Uses Ant Design's native theming system with our design tokens.
 * Simple, powerful, and leverages Ant Design's built-in responsive capabilities.
 */
const baseTheme: ThemeConfig = {
  token: {
    // Color palette
    colorPrimary: '#1890ff',
    colorSuccess: '#52c41a',
    colorWarning: '#faad14',
    colorError: '#ff4d4f',
    colorInfo: '#1890ff',

    // Typography - using Ant Design's standard approach
    fontSize: 16, // Base font size
    fontSizeLG: 18,
    fontSizeSM: 14,
    fontSizeXL: 20,

    // Font weights
    fontWeightStrong: 700,

    // Spacing - using Ant Design's spacing system
    margin: 16,
    marginLG: 24,
    marginSM: 8,
    marginXL: 32,
    marginXS: 4,

    // Border radius
    borderRadius: 4,
    borderRadiusLG: 8,
    borderRadiusSM: 2,

    // Line heights for better typography
    lineHeight: 1.5,
    lineHeightLG: 1.2,
    lineHeightSM: 1.6,
  },

  components: {
    // Typography component - clean and simple
    Typography: {
      titleMarginBottom: 0,
      titleMarginTop: 0,
      // Let Ant Design handle responsive typography
    },

    // Button component - minimal customization
    Button: {
      borderRadius: 8,
      fontWeight: 700,
    },

    // Layout component - basic styling
    Layout: {
      bodyBg: '#ffffff',
      headerBg: '#ffffff',
      siderBg: '#ffffff',
    },
  },
};

/**
 * Generate holiday-specific Ant Design theme
 *
 * Takes our holiday themes and converts them to Ant Design theme format
 * while maintaining all custom design tokens.
 *
 * @param holidayTheme - The holiday theme to apply
 * @returns Complete Ant Design theme configuration
 */
export function createHolidayTheme(holidayTheme: HolidayTheme): ThemeConfig {
  const colors = holidayThemes[holidayTheme];

  return {
    ...baseTheme,
    token: {
      ...baseTheme.token,
      // Override colors with holiday theme
      colorPrimary: colors.primary,
      colorBgBase: colors.background,
      colorTextBase: colors.text,
      colorBgContainer: colors.background,
      colorBgElevated: colors.background,
    },
    components: {
      ...baseTheme.components,

      // Update Typography with holiday colors
      Typography: {
        ...baseTheme.components?.Typography,
        colorText: colors.text,
        colorTextHeading: colors.text,
        colorTextDescription: colors.text,
      },

      // Update Button with holiday theme
      Button: {
        ...baseTheme.components?.Button,
        colorText: colors.text,
        colorBgContainer: colors.secondary,
        borderColorDisabled: colors.primary,
      },

      // Update Layout with holiday background
      Layout: {
        ...baseTheme.components?.Layout,
        bodyBg: colors.background,
        headerBg: colors.background,
        siderBg: colors.background,
      },
    },
  };
}

/**
 * Default Ant Design theme (Christmas theme)
 * This is the base theme used when no specific holiday is selected
 */
export const defaultAntdTheme = createHolidayTheme('christmas');

/**
 * Export holiday-specific themes for easy access
 */
export const antdThemes = {
  christmas: createHolidayTheme('christmas'),
  halloween: createHolidayTheme('halloween'),
  valentines: createHolidayTheme('valentines'),
  default: createHolidayTheme('default'),
} as const;
