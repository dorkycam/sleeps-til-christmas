import { Holiday } from '@/components/countdown/HolidayCountdown';
import {
  calculateHolidayCountdown,
  formatCountdownTitle,
  getHolidayDescription,
} from '@/lib/utils/countdown';
import { Metadata } from 'next';
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

  const fullTitle = `${title} | sleeps 'til christmas`;

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

    // Open Graph for social sharing (Facebook, Instagram, LinkedIn, WhatsApp, Discord, etc.)
    openGraph: {
      title: fullTitle,
      description,
      url:
        holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`,
      siteName: "sleeps 'til christmas",
      type: 'website',
      locale: 'en_US',

      // Dynamic social card image (used by most platforms)
      images: [
        {
          url: `/api/og?holiday=${holiday.slug}&sleeps=${sleepsUntil}`,
          width: 1200,
          height: 630,
          alt: `${sleepsUntil} sleeps until ${holiday.name}`,
          type: 'image/png',
        },
        // Smaller image for platforms that prefer it
        {
          url: `/api/og?holiday=${holiday.slug}&sleeps=${sleepsUntil}&size=small`,
          width: 600,
          height: 315,
          alt: `${sleepsUntil} sleeps until ${holiday.name}`,
          type: 'image/png',
        },
      ],
    },

    // Twitter/X card (also used by some other platforms)
    twitter: {
      card: 'summary_large_image',
      site: '@sleepstilxmas', // Add your Twitter handle if you have one
      creator: '@sleepstilxmas',
      title: fullTitle,
      description,
      images: [
        {
          url: `/api/og?holiday=${holiday.slug}&sleeps=${sleepsUntil}`,
          alt: `${sleepsUntil} sleeps until ${holiday.name}`,
          width: 1200,
          height: 630,
        },
      ],
    },

    // Additional metadata for better platform support
    other: {
      // Telegram link preview
      'telegram:channel': '@sleepstilchristmas',

      // WhatsApp & iMessage meta tags
      'apple-mobile-web-app-title': fullTitle,
      'application-name': "sleeps 'til christmas",

      // Pinterest Rich Pins
      'pinterest-rich-pin': 'true',

      // Slack unfurling
      'slack-app-id': 'sleeps-til-christmas',

      // Discord embed
      'theme-color': colors.primary,

      // Generic social media meta
      'social:title': fullTitle,
      'social:description': description,
      'social:image': `/api/og?holiday=${holiday.slug}&sleeps=${sleepsUntil}`,
      'social:url':
        holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`,
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

    // Theme color based on holiday (used by mobile browsers and some apps)
    themeColor: colors.primary,

    // Canonical URL
    alternates: {
      canonical:
        holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`,
    },

    // App-like behavior on mobile
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    },

    // Apple/iOS specific tags
    appleWebApp: {
      capable: true,
      title: "sleeps 'til christmas",
      statusBarStyle: 'default',
    },
  };
}

/**
 * Generate metadata for the 404 page
 */
export function generate404Metadata(): Metadata {
  return {
    title: "Page Not Found | sleeps 'til christmas",
    description:
      "The page you're looking for seems to have wandered off into the holiday spirit. Choose from our festive destinations to get back to celebrating!",
    robots: {
      index: false,
      follow: false,
    },
  };
}
