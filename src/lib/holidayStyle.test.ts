import { describe, expect, it } from 'vitest';

import { holidayButtonVars, holidayCssVars } from './holidayStyle';
import { holidayThemes } from './holidayTheme';

describe('holidayCssVars', () => {
  it('maps the theme palette onto the --holiday-* variables', () => {
    const colors = holidayThemes.halloween;
    expect(holidayCssVars('halloween')).toEqual({
      '--holiday-primary': colors.primary,
      '--holiday-secondary': colors.secondary,
      '--holiday-text': colors.text,
      '--holiday-bg': colors.background,
    });
  });
});

describe('holidayButtonVars', () => {
  it('fills with the primary color and labels with the text color', () => {
    expect(holidayButtonVars('halloween')).toEqual({
      '--btn-bg': holidayThemes.halloween.primary,
      '--btn-fg': holidayThemes.halloween.text,
    });
  });
});
