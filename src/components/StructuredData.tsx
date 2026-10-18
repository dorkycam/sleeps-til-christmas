import { calculateHolidayCountdown } from '@/lib/countdown';
import { getHolidayDescription, getHolidayTitle } from '@/lib/metadata';
import { BASE_URL, getHolidayUrl, isHomeHoliday } from '@/lib/urls';

import type { JSX } from 'react';
import type { Holiday } from '@/lib/holidays';

interface StructuredDataProps {
  holiday: Holiday;
}

/**
 * Generates JSON-LD structured data for holiday countdown pages
 *
 * Helps search engines understand the content and may enable
 * rich snippets in search results.
 *
 * @param props - the holiday the page counts down to
 */
export function StructuredData({ holiday }: StructuredDataProps): JSX.Element {
  const { targetDate } = calculateHolidayCountdown(holiday);
  const pageUrl = getHolidayUrl(holiday);

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: getHolidayTitle(holiday),
    description: getHolidayDescription(holiday),
    url: pageUrl,
    mainEntity: {
      '@type': 'Event',
      name: holiday.name,
      description: holiday.message,
      startDate: targetDate.format('YYYY-MM-DD'),
      eventStatus: 'https://schema.org/EventScheduled',
    },
    publisher: {
      '@type': 'Organization',
      name: "sleeps 'til christmas",
      url: BASE_URL,
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: BASE_URL,
        },
        ...(!isHomeHoliday(holiday)
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
