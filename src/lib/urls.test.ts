import { describe, expect, it } from 'vitest';

import {
  BASE_URL,
  HOME_HOLIDAY_SLUG,
  getHolidayPath,
  getHolidayUrl,
  isHomeHoliday,
} from './urls';

describe('isHomeHoliday', () => {
  it('is true only for the home holiday', () => {
    expect(isHomeHoliday({ slug: HOME_HOLIDAY_SLUG })).toBe(true);
    expect(isHomeHoliday({ slug: 'halloween' })).toBe(false);
  });
});

describe('getHolidayPath', () => {
  it('serves the home holiday at the root', () => {
    expect(getHolidayPath({ slug: 'christmas' })).toBe('/');
  });

  it('serves other holidays at their slug', () => {
    expect(getHolidayPath({ slug: 'valentines-day' })).toBe('/valentines-day');
  });
});

describe('getHolidayUrl', () => {
  it('uses the bare origin for the home holiday', () => {
    expect(getHolidayUrl({ slug: 'christmas' })).toBe(BASE_URL);
  });

  it('appends the slug for other holidays', () => {
    expect(getHolidayUrl({ slug: 'halloween' })).toBe(`${BASE_URL}/halloween`);
  });
});
