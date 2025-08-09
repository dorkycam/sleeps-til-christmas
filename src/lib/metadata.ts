import { Metadata } from 'next';
import { Holiday } from '@/components/countdown/HolidayCountdown';
import {
  calculateHolidayCountdown,
  getHolidayDescription,
  formatCountdownTitle,
} from '@/lib/utils/countdown';
import { holidayThemes } from './themes/tokens';

const baseUrl = 'https://sleepstilchristmas.com';

/**
 * Generate dynamic metadata for holiday pages
 *
 * Creates SEO-optimized metadata with Open Graph and Twitter cards
 * that include the current countdown and holiday-specific theming.
 */
export function generateHolidayMetadata(holiday: Holiday): Metadata {
  const { sleepsUntil } = calculateHolidayCountdown(holiday);
  const description = getHolidayDescription(holiday);
  const title = formatCountdownTitle(holiday);
  const colors = holidayThemes[holiday.theme];

  const fullTitle = `${title} | Sleeps 'til Christmas`;

  // Keywords for SEO
  const keywords = [
    'holiday countdown',
    'sleeps until',
    'sleeps until',
    holiday.name.toLowerCase(),
    'christmas countdown',
    'holiday tracker',
    'celebration countdown',
  ];

  return {
    title: fullTitle,
    description,
    keywords: keywords.join(', '),

    // Open Graph for social sharing
    openGraph: {
      title: fullTitle,
      description,
      url:
        holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`,
      siteName: "Sleeps 'til Christmas",
      type: 'website',
      locale: 'en_US',

      // Dynamic social card image (we'll create this)
      images: [
        {
          url: `/api/og?holiday=${holiday.slug}&sleeps=${sleepsUntil}`,
          width: 1200,
          height: 630,
          alt: `${sleepsUntil} sleeps until ${holiday.name}`,
        },
      ],
    },

    // Twitter card
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [`/api/og?holiday=${holiday.slug}&sleeps=${sleepsUntil}`],
    },

    // Additional SEO tags
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Theme color based on holiday
    themeColor: colors.primary,

    // Canonical URL
    alternates: {
      canonical:
        holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`,
    },
  };
}

/**
 * Generate metadata for the 404 page
 */
export function generate404Metadata(): Metadata {
  return {
    title: "Page Not Found | Sleeps 'til Christmas",
    description:
      "The page you're looking for seems to have wandered off into the holiday spirit. Choose from our festive destinations to get back to celebrating!",
    robots: {
      index: false,
      follow: false,
    },
  };
}
