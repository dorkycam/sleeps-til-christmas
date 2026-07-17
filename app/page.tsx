import { Metadata, Viewport } from 'next';

import { HolidayPage } from '@/components';
import { getHolidayBySlugSafe } from '@/lib/holidays';
import { generateHolidayMetadata, generateHolidayViewport } from '@/lib/metadata';

// Revalidate hourly so the sleep count in the page <title> and metadata stays
// current (the count changes once a day). The OG card computes its own count.
export const revalidate = 3600;

/**
 * Generate metadata for the home page (the Christmas countdown).
 */
export function generateMetadata(): Metadata {
  const holiday = getHolidayBySlugSafe('christmas');
  return generateHolidayMetadata(holiday);
}

/**
 * Generate the viewport (and theme color) for the home page.
 */
export function generateViewport(): Viewport {
  const holiday = getHolidayBySlugSafe('christmas');
  return generateHolidayViewport(holiday);
}

export default function Home() {
  const holiday = getHolidayBySlugSafe('christmas');
  return <HolidayPage holiday={holiday} />;
}
