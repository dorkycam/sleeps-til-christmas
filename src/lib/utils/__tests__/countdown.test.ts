import dayjs from 'dayjs';
import {
  calculateHolidayCountdown,
  getDaysUntilHoliday,
  getSleepsUntilHoliday,
  getHolidayDescription,
  formatCountdownTitle,
} from '../countdown';
import { Holiday } from '@/components/countdown/HolidayCountdown';

// Mock holiday for testing
const mockChristmas: Holiday = {
  slug: 'christmas',
  month: 12,
  day: 25,
  message: 'Merry Christmas!',
  name: 'Christmas',
  theme: 'christmas',
  iconName: 'home',
};

const mockHalloween: Holiday = {
  slug: 'halloween',
  month: 10,
  day: 31,
  message: 'Happy Halloween!',
  name: 'Halloween',
  theme: 'halloween',
  iconName: 'smile',
};

// Mock dayjs to control the current date
jest.mock('dayjs', () => {
  const originalDayjs = jest.requireActual('dayjs');

  return {
    __esModule: true,
    default: jest.fn(() => originalDayjs('2024-08-08').startOf('day')),
  };
});

describe('countdown utilities', () => {
  beforeEach(() => {
    // Reset the mock to August 8, 2024
    const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
    mockedDayjs.mockImplementation(() =>
      jest.requireActual('dayjs')('2024-08-08').startOf('day'),
    );
  });

  describe('calculateHolidayCountdown', () => {
    it('calculates correct sleeps until Christmas from August 8', () => {
      const result = calculateHolidayCountdown(mockChristmas);

      expect(result.sleepsUntil).toBe(139);
      expect(result.isToday).toBe(false);
      expect(result.targetDate.format('YYYY-MM-DD')).toBe('2024-12-25');
    });

    it('calculates correct sleeps until Halloween from August 8', () => {
      const result = calculateHolidayCountdown(mockHalloween);

      expect(result.sleepsUntil).toBe(84);
      expect(result.isToday).toBe(false);
      expect(result.targetDate.format('YYYY-MM-DD')).toBe('2024-10-31');
    });

    it('returns 0 sleeps and isToday=true when today is the holiday', () => {
      // Mock current date to be Christmas day
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-25').startOf('day'),
      );

      const result = calculateHolidayCountdown(mockChristmas);

      expect(result.sleepsUntil).toBe(0);
      expect(result.isToday).toBe(true);
    });

    it('calculates next year when holiday has passed', () => {
      // Mock current date to be after Christmas
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-30').startOf('day'),
      );

      const result = calculateHolidayCountdown(mockChristmas);

      expect(result.sleepsUntil).toBe(360); // Sleeps until Christmas 2025
      expect(result.isToday).toBe(false);
      expect(result.targetDate.format('YYYY-MM-DD')).toBe('2025-12-25');
    });

    it('handles leap year correctly', () => {
      // Test from Feb 1 to Dec 25 in a leap year (2024)
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-02-01').startOf('day'),
      );

      const result = calculateHolidayCountdown(mockChristmas);

      // Feb 1 to Dec 25, 2024 (leap year) = 328 days
      expect(result.sleepsUntil).toBe(328);
    });
  });

  describe('getDaysUntilHoliday (legacy function)', () => {
    it('returns same result as calculateHolidayCountdown.sleepsUntil', () => {
      const newResult = calculateHolidayCountdown(mockChristmas);
      const legacyResult = getDaysUntilHoliday(mockChristmas);

      expect(legacyResult).toBe(newResult.sleepsUntil);
    });
  });

  describe('getSleepsUntilHoliday', () => {
    it('returns same result as calculateHolidayCountdown.sleepsUntil', () => {
      const newResult = calculateHolidayCountdown(mockChristmas);
      const sleepsResult = getSleepsUntilHoliday(mockChristmas);

      expect(sleepsResult).toBe(newResult.sleepsUntil);
  });

  describe('getHolidayDescription', () => {
    it('generates correct description for future holiday', () => {
      const description = getHolidayDescription(mockChristmas);

      expect(description).toBe(
        '139 sleeps until Christmas! Track the countdown and get ready to celebrate.',
      );
    });

    it('generates correct description for tomorrow (1 day)', () => {
      // Mock to be Dec 24 (1 day before Christmas)
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-24').startOf('day'),
      );

      const description = getHolidayDescription(mockChristmas);

      expect(description).toBe(
        'Only 1 sleep left until Christmas! Merry Christmas!',
      );
    });

    it('generates correct description for today', () => {
      // Mock to be Christmas day
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-25').startOf('day'),
      );

      const description = getHolidayDescription(mockChristmas);

      expect(description).toBe('Today is Christmas! Merry Christmas!');
    });
  });

  describe('formatCountdownTitle', () => {
    it('formats title correctly for multiple sleeps', () => {
      const title = formatCountdownTitle(mockChristmas);

      expect(title).toBe('139 Sleeps Until Christmas');
    });

    it('formats title correctly for 1 sleep', () => {
      // Mock to be Dec 24 (1 day before Christmas)
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-24').startOf('day'),
      );

      const title = formatCountdownTitle(mockChristmas);

      expect(title).toBe('1 Sleep Until Christmas');
    });

    it('formats title correctly for today', () => {
      // Mock to be Christmas day
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-25').startOf('day'),
      );

      const title = formatCountdownTitle(mockChristmas);

      expect(title).toBe('Today is Christmas!');
    });
  });

  describe('edge cases', () => {
    it('handles February 29 in leap year', () => {
      const leapDayHoliday: Holiday = {
        ...mockChristmas,
        month: 2,
        day: 29,
        name: 'Leap Day',
      };

      // Test from Feb 1, 2024 (leap year)
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-02-01').startOf('day'),
      );

      const result = calculateHolidayCountdown(leapDayHoliday);

      expect(result.sleepsUntil).toBe(28); // Feb 1 to Feb 29
      expect(result.targetDate.format('YYYY-MM-DD')).toBe('2024-02-29');
    });

    it('handles New Year rollover correctly', () => {
      // Test from Dec 30 to next Christmas
      const mockedDayjs = dayjs as jest.MockedFunction<typeof dayjs>;
      mockedDayjs.mockImplementation(() =>
        jest.requireActual('dayjs')('2024-12-30').startOf('day'),
      );

      const result = calculateHolidayCountdown(mockChristmas);

      expect(result.targetDate.format('YYYY-MM-DD')).toBe('2025-12-25');
      expect(result.sleepsUntil).toBeGreaterThan(300); // Should be next year
    });
  });
});
