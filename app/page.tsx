import { HolidayPage } from '@/components';
import { getHolidayBySlugSafe } from '@/lib/holidays';
import { generateHolidayMetadata, generateHolidayViewport } from '@/lib/metadata';
import { Metadata, Viewport } from 'next';

export function generateMetadata(): Metadata {
  const holiday = getHolidayBySlugSafe('christmas');
  return generateHolidayMetadata(holiday);
}

export function generateViewport(): Viewport {
  const holiday = getHolidayBySlugSafe('christmas');
  return generateHolidayViewport(holiday);
}

export default function Home() {
  const holiday = getHolidayBySlugSafe('christmas');
  return <HolidayPage holiday={holiday} />;
}
