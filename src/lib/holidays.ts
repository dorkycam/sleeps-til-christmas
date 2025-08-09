import { Holiday } from '@/components/features/HolidayCountdown';

export const holidays: Record<string, Holiday> = {
  christmas: {
    month: 12,
    day: 25,
    message: 'Merry Christmas!',
    name: 'Christmas',
    theme: 'christmas',
  },
  halloween: {
    month: 10,
    day: 31,
    message: 'Happy Halloween!',
    name: 'Halloween',
    theme: 'halloween',
  },
  valentines: {
    month: 2,
    day: 14,
    message: "Happy Valentine's Day!",
    name: "Valentine's Day",
    theme: 'valentines',
  },
} as const;
