import { getAllHolidaySlugs, getHolidayBySlugSafe } from '@/lib/holidays';
import { getHolidayUrl, isHomeHoliday } from '@/lib/urls';

import type { MetadataRoute } from 'next';

/**
 * Sitemap with one entry per holiday page. The home holiday lives at `/`,
 * so it gets top priority.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return getAllHolidaySlugs().map(slug => {
    const holiday = getHolidayBySlugSafe(slug);
    return {
      url: getHolidayUrl(holiday),
      lastModified,
      changeFrequency: 'daily',
      priority: isHomeHoliday(holiday) ? 1 : 0.8,
    };
  });
}
