import { Holiday } from '@/components/countdown/HolidayCountdown';
import {
  calculateHolidayCountdown,
  getHolidayDescription,
} from '@/lib/utils/countdown';
import { Metadata, Viewport } from 'next';
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
  const colors = holidayThemes[holiday.theme];

  // Number-less title: for statically generated pages the sleep count would be
  // baked in at build time and go stale, so it is intentionally kept out of the
  // page <title>. The live count is shown in the on-page countdown UI, not the
  // browser tab.
  const pageTitle =
    holiday.slug === 'christmas'
      ? "sleeps 'til christmas"
      : `sleeps 'til ${holiday.name}`;

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
    title: { absolute: pageTitle },
    description,
    keywords: keywords.join(', '),

    // Open Graph for social sharing (Facebook, Instagram, LinkedIn, WhatsApp, Discord, etc.)
    openGraph: {
      title: pageTitle,
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
      title: pageTitle,
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
      'apple-mobile-web-app-title': pageTitle,
      'application-name': "sleeps 'til christmas",

      // Pinterest Rich Pins
      'pinterest-rich-pin': 'true',

      // Slack unfurling
      'slack-app-id': 'sleeps-til-christmas',

      // Discord embed
      'theme-color': colors.primary,

      // Generic social media meta
      'social:title': pageTitle,
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

    // Canonical URL
    alternates: {
      canonical:
        holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`,
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
 * Generate the viewport (and theme color) for a holiday page.
 *
 * Kept separate from metadata per Next.js's viewport API, which requires
 * viewport and themeColor to live in a `generateViewport`/`viewport` export
 * rather than inside the metadata object.
 *
 * @param holiday - Holiday to theme the viewport for
 * @returns the page viewport configuration
 */
export function generateHolidayViewport(holiday: Holiday): Viewport {
  const colors = holidayThemes[holiday.theme];
  return {
    themeColor: colors.primary,
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

/**
 * Generate metadata for the 404 page
 */
export function generate404Metadata(): Metadata {
  return {
    title: 'Page Not Found',
    description:
      "The page you're looking for seems to have wandered off into the holiday spirit. Choose from our festive destinations to get back to celebrating!",
    robots: {
      index: false,
      follow: false,
    },
  };
}
