import {
  holidays,
  getHolidayBySlug,
  getHolidayBySlugSafe,
  getAllHolidaySlugs,
  isValidHolidaySlug,
  getDefaultHoliday,
} from '../holidays';

describe('holidays database', () => {
  describe('holidays data structure', () => {
    it('has the expected holidays', () => {
      const slugs = Object.keys(holidays);

      expect(slugs).toEqual(['christmas', 'halloween', 'valentines-day']);
    });

    it('has properly structured holiday objects', () => {
      Object.values(holidays).forEach(holiday => {
        expect(holiday).toHaveProperty('slug');
        expect(holiday).toHaveProperty('month');
        expect(holiday).toHaveProperty('day');
        expect(holiday).toHaveProperty('message');
        expect(holiday).toHaveProperty('name');
        expect(holiday).toHaveProperty('theme');
        expect(holiday).toHaveProperty('iconName');

        // Validate types
        expect(typeof holiday.slug).toBe('string');
        expect(typeof holiday.month).toBe('number');
        expect(typeof holiday.day).toBe('number');
        expect(typeof holiday.message).toBe('string');
        expect(typeof holiday.name).toBe('string');
        expect(typeof holiday.theme).toBe('string');
        expect(typeof holiday.iconName).toBe('string');

        // Validate ranges
        expect(holiday.month).toBeGreaterThanOrEqual(1);
        expect(holiday.month).toBeLessThanOrEqual(12);
        expect(holiday.day).toBeGreaterThanOrEqual(1);
        expect(holiday.day).toBeLessThanOrEqual(31);
      });
    });

    it('has consistent slug and internal key matching', () => {
      Object.entries(holidays).forEach(([key, holiday]) => {
        expect(holiday.slug).toBe(key);
      });
    });
  });

  describe('getHolidayBySlug', () => {
    it('returns holiday for valid slug', () => {
      const christmas = getHolidayBySlug('christmas');

      expect(christmas).toBeDefined();
      expect(christmas?.name).toBe('Christmas');
      expect(christmas?.month).toBe(12);
      expect(christmas?.day).toBe(25);
    });

    it('returns undefined for invalid slug', () => {
      const invalid = getHolidayBySlug('invalid-holiday');

      expect(invalid).toBeUndefined();
    });

    it('returns undefined for empty string', () => {
      const empty = getHolidayBySlug('');

      expect(empty).toBeUndefined();
    });
  });

  describe('getHolidayBySlugSafe', () => {
    it('returns holiday for valid slug', () => {
      const christmas = getHolidayBySlugSafe('christmas');

      expect(christmas).toBeDefined();
      expect(christmas.name).toBe('Christmas');
    });

    it('should only accept valid holiday slugs (type safety)', () => {
      // This is more of a TypeScript compile-time test
      // but we can verify the runtime behavior
      const validSlugs = ['christmas', 'halloween', 'valentines-day'] as const;

      validSlugs.forEach(slug => {
        const holiday = getHolidayBySlugSafe(slug);
        expect(holiday).toBeDefined();
        expect(holiday.slug).toBe(slug);
      });
    });
  });

  describe('getAllHolidaySlugs', () => {
    it('returns all holiday slugs', () => {
      const slugs = getAllHolidaySlugs();

      expect(slugs).toHaveLength(3);
      expect(slugs).toEqual(['christmas', 'halloween', 'valentines-day']);
    });

    it('returns array of strings', () => {
      const slugs = getAllHolidaySlugs();

      slugs.forEach(slug => {
        expect(typeof slug).toBe('string');
      });
    });
  });

  describe('isValidHolidaySlug', () => {
    it('returns true for valid slugs', () => {
      expect(isValidHolidaySlug('christmas')).toBe(true);
      expect(isValidHolidaySlug('halloween')).toBe(true);
      expect(isValidHolidaySlug('valentines-day')).toBe(true);
    });

    it('returns false for invalid slugs', () => {
      expect(isValidHolidaySlug('easter')).toBe(false);
      expect(isValidHolidaySlug('invalid')).toBe(false);
      expect(isValidHolidaySlug('')).toBe(false);
      expect(isValidHolidaySlug('Christmas')).toBe(false); // Case sensitive
    });

    it('acts as type guard', () => {
      const userInput = 'christmas';

      if (isValidHolidaySlug(userInput)) {
        // TypeScript should now know userInput is HolidaySlug
        const holiday = getHolidayBySlugSafe(userInput);
        expect(holiday.name).toBe('Christmas');
      }
    });
  });

  describe('getDefaultHoliday', () => {
    it('returns Christmas as default', () => {
      const defaultHoliday = getDefaultHoliday();

      expect(defaultHoliday.slug).toBe('christmas');
      expect(defaultHoliday.name).toBe('Christmas');
    });
  });

  describe('holiday-specific data validation', () => {
    it('has correct Christmas data', () => {
      const christmas = holidays.christmas;

      expect(christmas.slug).toBe('christmas');
      expect(christmas.month).toBe(12);
      expect(christmas.day).toBe(25);
      expect(christmas.name).toBe('Christmas');
      expect(christmas.message).toBe('Merry Christmas!');
      expect(christmas.theme).toBe('christmas');
      expect(christmas.iconName).toBe('home');
    });

    it('has correct Halloween data', () => {
      const halloween = holidays.halloween;

      expect(halloween.slug).toBe('halloween');
      expect(halloween.month).toBe(10);
      expect(halloween.day).toBe(31);
      expect(halloween.name).toBe('Halloween');
      expect(halloween.message).toBe('Happy Halloween!');
      expect(halloween.theme).toBe('halloween');
      expect(halloween.iconName).toBe('smile');
    });

    it("has correct Valentine's Day data", () => {
      const valentines = holidays['valentines-day'];

      expect(valentines.slug).toBe('valentines-day');
      expect(valentines.month).toBe(2);
      expect(valentines.day).toBe(14);
      expect(valentines.name).toBe("Valentine's Day");
      expect(valentines.message).toBe("Happy Valentine's Day!");
      expect(valentines.theme).toBe('valentines');
      expect(valentines.iconName).toBe('heart');
    });
  });
});
