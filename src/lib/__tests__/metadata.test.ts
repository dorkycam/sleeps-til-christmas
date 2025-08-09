import { generateHolidayMetadata, generate404Metadata } from '../metadata';
import { Holiday } from '@/components/countdown/HolidayCountdown';

// Mock the countdown utilities
jest.mock('../utils/countdown', () => ({
  calculateHolidayCountdown: jest.fn(() => ({
    daysUntil: 139,
    isToday: false,
    targetDate: null,
  })),
  getHolidayDescription: jest.fn(
    () =>
      '139 days until Christmas! Track the countdown and get ready to celebrate.',
  ),
  formatCountdownTitle: jest.fn(() => '139 Days Until Christmas'),
}));

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

describe('metadata generation', () => {
  describe('generateHolidayMetadata', () => {
    it('generates correct metadata for Christmas (home page)', () => {
      const metadata = generateHolidayMetadata(mockChristmas);

      expect(metadata.title).toBe(
        "139 Days Until Christmas | Sleeps 'til Christmas",
      );
      expect(metadata.description).toBe(
        '139 days until Christmas! Track the countdown and get ready to celebrate.',
      );

      // Check Open Graph
      expect(metadata.openGraph?.title).toBe(
        "139 Days Until Christmas | Sleeps 'til Christmas",
      );
      expect(metadata.openGraph?.url).toBe('https://sleepstilchristmas.com');
      expect(metadata.openGraph?.siteName).toBe("Sleeps 'til Christmas");

      // Check social image
      expect(metadata.openGraph?.images).toEqual([
        {
          url: '/api/og?holiday=christmas&days=139',
          width: 1200,
          height: 630,
          alt: '139 days until Christmas',
        },
      ]);

      // Check Twitter card
      expect(metadata.twitter?.card).toBe('summary_large_image');
      expect(metadata.twitter?.images).toEqual([
        '/api/og?holiday=christmas&days=139',
      ]);

      // Check theme color
      expect(metadata.themeColor).toBe('#add8e6'); // Christmas theme color

      // Check canonical URL
      expect(metadata.alternates?.canonical).toBe(
        'https://sleepstilchristmas.com',
      );
    });

    it('generates correct metadata for Halloween (sub-page)', () => {
      const metadata = generateHolidayMetadata(mockHalloween);

      // Check URL structure for sub-pages
      expect(metadata.openGraph?.url).toBe(
        'https://sleepstilchristmas.com/halloween',
      );
      expect(metadata.alternates?.canonical).toBe(
        'https://sleepstilchristmas.com/halloween',
      );

      // Check theme color is different
      expect(metadata.themeColor).toBe('#000000'); // Halloween theme color

      // Check social image URL
      expect(metadata.openGraph?.images).toEqual([
        {
          url: '/api/og?holiday=halloween&days=139',
          width: 1200,
          height: 630,
          alt: '139 days until Halloween',
        },
      ]);
    });

    it('includes SEO-friendly keywords', () => {
      const metadata = generateHolidayMetadata(mockChristmas);

      const expectedKeywords = [
        'holiday countdown',
        'days until',
        'sleeps until',
        'christmas',
        'christmas countdown',
        'holiday tracker',
        'celebration countdown',
      ].join(', ');

      expect(metadata.keywords).toBe(expectedKeywords);
    });

    it('configures robots correctly for indexing', () => {
      const metadata = generateHolidayMetadata(mockChristmas);

      expect(metadata.robots).toEqual({
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-video-preview': -1,
          'max-image-preview': 'large',
          'max-snippet': -1,
        },
      });
    });

    it('uses correct Open Graph type and locale', () => {
      const metadata = generateHolidayMetadata(mockChristmas);

      expect(metadata.openGraph?.type).toBe('website');
      expect(metadata.openGraph?.locale).toBe('en_US');
    });
  });

  describe('generate404Metadata', () => {
    it('generates correct 404 metadata', () => {
      const metadata = generate404Metadata();

      expect(metadata.title).toBe("Page Not Found | Sleeps 'til Christmas");
      expect(metadata.description).toBe(
        "The page you're looking for seems to have wandered off into the holiday spirit. Choose from our festive destinations to get back to celebrating!",
      );

      // 404 pages should not be indexed
      expect(metadata.robots).toEqual({
        index: false,
        follow: false,
      });
    });

    it('does not include Open Graph or Twitter metadata for 404', () => {
      const metadata = generate404Metadata();

      expect(metadata.openGraph).toBeUndefined();
      expect(metadata.twitter).toBeUndefined();
      expect(metadata.themeColor).toBeUndefined();
    });
  });

  describe('dynamic content integration', () => {
    it('calls countdown utilities with correct parameters', () => {
      const {
        calculateHolidayCountdown,
        getHolidayDescription,
        formatCountdownTitle,
      } = require('../utils/countdown');

      generateHolidayMetadata(mockChristmas);

      expect(calculateHolidayCountdown).toHaveBeenCalledWith(mockChristmas);
      expect(getHolidayDescription).toHaveBeenCalledWith(mockChristmas);
      expect(formatCountdownTitle).toHaveBeenCalledWith(mockChristmas);
    });

    it('handles different countdown states', () => {
      const { calculateHolidayCountdown } = require('../utils/countdown');

      // Test when it's the holiday (0 days)
      calculateHolidayCountdown.mockReturnValueOnce({
        daysUntil: 0,
        isToday: true,
        targetDate: null,
      });

      const metadata = generateHolidayMetadata(mockChristmas);

      // Should still generate valid metadata structure
      expect(metadata.title).toBeDefined();
      expect(metadata.openGraph?.images).toBeDefined();
      expect(metadata.twitter?.images).toBeDefined();
    });
  });

  describe('URL generation', () => {
    it('generates correct base URLs', () => {
      expect(generateHolidayMetadata(mockChristmas).openGraph?.url).toBe(
        'https://sleepstilchristmas.com',
      );

      expect(generateHolidayMetadata(mockHalloween).openGraph?.url).toBe(
        'https://sleepstilchristmas.com/halloween',
      );
    });

    it('generates correct OG image URLs with parameters', () => {
      const metadata = generateHolidayMetadata(mockChristmas);
      const imageUrl = metadata.openGraph?.images?.[0];

      expect(imageUrl?.url).toBe('/api/og?holiday=christmas&days=139');
      expect(imageUrl?.width).toBe(1200);
      expect(imageUrl?.height).toBe(630);
    });
  });
});
