import { HolidayPage } from '@/components';
import { holidays } from '@/lib/holidays';

export default function ValentinesDayPage() {
  return <HolidayPage holiday={holidays.valentines} />;
}
