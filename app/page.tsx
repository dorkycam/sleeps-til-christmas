import { HolidayPage } from '@/components';
import { holidays } from '@/lib/holidays';

export default function Home() {
  return <HolidayPage holiday={holidays.christmas} />;
}
