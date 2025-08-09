import { HolidayPage } from '@/components';
import { holidays } from '@/lib/holidays';

export default function HalloweenPage() {
  return <HolidayPage holiday={holidays.halloween} />;
}
