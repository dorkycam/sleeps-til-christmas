import { holidayThemes } from './holidayTheme';
import { getHolidayUrl } from './urls';

import type { Metadata, Viewport } from 'next';
import type { Holiday } from './holidays';

/**
 * Page title for a holiday. Static on purpose: the live count lives on the
 * page and the share card, since cached page titles would go stale.
 *
 * @param holiday - the holiday to title
 * @returns e.g. "sleeps 'til halloween"
 */
export function getHolidayTitle(holiday: Pick<Holiday, 'name'>): string {
  return `sleeps 'til ${holiday.name.toLowerCase()}`;
}

/**
 * SEO description for a holiday page.
 *
 * @param holiday - the holiday to describe
 * @returns description text with no sleep count
 */
export function getHolidayDescription(
  holiday: Pick<Holiday, 'name' | 'message'>,
): string {
  return `Count the sleeps until ${holiday.name}. ${holiday.message}`;
}

/**
 * Generate metadata for a holiday page, with Open Graph and Twitter cards
 * that point at the live `/api/og` share card.
 *
 * @param holiday - the holiday the page counts down to
 * @returns the page metadata
 */
export function generateHolidayMetadata(holiday: Holiday): Metadata {
  // title.absolute so the layout's "%s | ..." template doesn't double up.
  const pageTitle = getHolidayTitle(holiday);
  const description = getHolidayDescription(holiday);
  const colors = holidayThemes[holiday.theme];

  // Keywords for SEO
  const keywords = [
    'holiday countdown',
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
      url: getHolidayUrl(holiday),
      siteName: "sleeps 'til christmas",
      type: 'website',
      locale: 'en_US',

      // Dynamic social card image (used by most platforms)
      images: [
        {
          url: `/api/og?holiday=${holiday.slug}`,
          width: 1200,
          height: 630,
          alt: pageTitle,
          type: 'image/png',
        },
        // Smaller image for platforms that prefer it
        {
          url: `/api/og?holiday=${holiday.slug}&size=small`,
          width: 600,
          height: 315,
          alt: pageTitle,
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
          url: `/api/og?holiday=${holiday.slug}`,
          alt: pageTitle,
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
      'social:image': `/api/og?holiday=${holiday.slug}`,
      'social:url': getHolidayUrl(holiday),
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
      canonical: getHolidayUrl(holiday),
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
 * Generate metadata for the 404 page.
 *
 * @returns non-indexable 404 metadata
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
