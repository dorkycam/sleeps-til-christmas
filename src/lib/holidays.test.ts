import { describe, expect, it } from 'vitest';

import { getAllHolidaySlugs, getHolidayBySlug } from './holidays';

describe('getHolidayBySlug', () => {
  it('returns the holiday for a known slug', () => {
    expect(getHolidayBySlug('halloween')?.name).toBe('halloween');
  });

  it('returns undefined for an unknown slug', () => {
    expect(getHolidayBySlug('arbor-day')).toBeUndefined();
  });

  it.each(['constructor', 'toString', '__proto__', 'hasOwnProperty'])(
    'returns undefined for the inherited object key %s',
    slug => {
      expect(getHolidayBySlug(slug)).toBeUndefined();
    },
  );
});

describe('getAllHolidaySlugs', () => {
  it('lists every holiday slug', () => {
    expect(getAllHolidaySlugs()).toEqual([
      'christmas',
      'halloween',
      'valentines-day',
      'rileys-birthday',
    ]);
  });
});
