import { Holiday } from '@/components/countdown/HolidayCountdown';
import {
  formatCountdownTitle,
  getCountdownLabel,
  getCountdownNumber,
} from '@/lib/utils/countdown';

interface StructuredDataProps {
  holiday: Holiday;
}

/**
 * Generates JSON-LD structured data for holiday countdown pages
 *
 * Helps search engines understand the content and may enable
 * rich snippets in search results.
 */
export function StructuredData({ holiday }: StructuredDataProps) {
  const countdownNumber = getCountdownNumber(holiday);
  const countdownLabel = getCountdownLabel(holiday);
  const title = formatCountdownTitle(holiday);
  const baseUrl = 'https://sleepstilchristmas.com';
  const pageUrl =
    holiday.slug === 'christmas' ? baseUrl : `${baseUrl}/${holiday.slug}`;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description: `Track the countdown to ${holiday.name}. ${countdownNumber} ${countdownLabel}!`,
    url: pageUrl,
    mainEntity: {
      '@type': 'Event',
      name: holiday.name,
      description: holiday.message,
      startDate: new Date(
        new Date().getFullYear(),
        holiday.month - 1,
        holiday.day,
      )
        .toISOString()
        .split('T')[0],
      eventStatus: 'https://schema.org/EventScheduled',
    },
    publisher: {
      '@type': 'Organization',
      name: "sleeps 'til christmas",
      url: baseUrl,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: baseUrl,
        },
        ...(holiday.slug !== 'christmas'
          ? [
              {
                '@type': 'ListItem',
                position: 2,
                name: holiday.name,
                item: pageUrl,
              },
            ]
          : []),
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
