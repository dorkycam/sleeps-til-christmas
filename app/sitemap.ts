import { MetadataRoute } from 'next';
import { getAllHolidaySlugs } from '@/lib/holidays';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sleepstilchristmas.com';
  const currentDate = new Date();

  // Base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Add holiday pages (excluding Christmas since it's the home page)
  const holidaySlugs = getAllHolidaySlugs().filter(
    slug => slug !== 'christmas',
  );

  holidaySlugs.forEach(slug => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 0.8,
    });
  });

  return routes;
}
