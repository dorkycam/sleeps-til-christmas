import { HolidayPage } from '@/components';
import { getHolidayBySlugSafe } from '@/lib/holidays';
import { generateHolidayMetadata } from '@/lib/metadata';

export function generateMetadata() {
  const holiday = getHolidayBySlugSafe('christmas');
  return generateHolidayMetadata(holiday);
}

export default function Home() {
  const holiday = getHolidayBySlugSafe('christmas');
  return <HolidayPage holiday={holiday} />;
}
