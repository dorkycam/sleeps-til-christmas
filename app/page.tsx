import { HolidayPage } from '@/components/HolidayPage';
import { getHolidayBySlugSafe } from '@/lib/holidays';
import {
  generateHolidayMetadata,
  generateHolidayViewport,
} from '@/lib/metadata';
import { HOME_HOLIDAY_SLUG } from '@/lib/urls';

import type { JSX } from 'react';
import type { Metadata, Viewport } from 'next';

// Revalidate daily so the JSON-LD event date rolls to next year once the
// holiday passes. Titles are static; the live count is rendered client-side
// and by the OG card.
export const revalidate = 86400;

/**
 * Generate metadata for the home page (the Christmas countdown).
 */
export function generateMetadata(): Metadata {
  const holiday = getHolidayBySlugSafe(HOME_HOLIDAY_SLUG);
  return generateHolidayMetadata(holiday);
}

/**
 * Generate the viewport (and theme color) for the home page.
 */
export function generateViewport(): Viewport {
  const holiday = getHolidayBySlugSafe(HOME_HOLIDAY_SLUG);
  return generateHolidayViewport(holiday);
}

/**
 * Home page: the home holiday's countdown.
 */
export default function Home(): JSX.Element {
  const holiday = getHolidayBySlugSafe(HOME_HOLIDAY_SLUG);
  return <HolidayPage holiday={holiday} />;
}
