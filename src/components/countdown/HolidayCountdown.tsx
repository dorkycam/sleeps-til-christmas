'use client';

import { holidayCssVars } from '@/lib/themes/holidayStyle';
import {
  calculateHolidayCountdown,
  getCountdownLabel,
  getCountdownNumber,
} from '@/lib/utils/countdown';
import { HolidayTheme } from '@/lib/themes/tokens';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';

// Icon name types for better type safety
export type IconName =
  | 'home'
  | 'heart'
  | 'smile'
  | 'fireworks'
  | 'tree'
  | 'pumpkin'
  | 'gift';

/**
 * Holiday configuration interface
 * Defines all properties needed to display a holiday countdown
 */
export interface Holiday {
  slug: string;
  month: number;
  day: number;
  message: string;
  name: string;
  theme: HolidayTheme;
  iconName: IconName;
  spotifyLinks?: string[];
}

interface HolidayCountdownProps {
  holiday: Holiday;
}

interface CountdownState {
  sleepsUntil: number;
  isHoliday: boolean;
  isLoaded: boolean;
}

const CONTAINER_CLASS =
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex flex-col items-center justify-center';

function CountdownInner({ holiday }: HolidayCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const { sleepsUntil, isToday: isHoliday } =
      calculateHolidayCountdown(holiday);
    return { sleepsUntil, isHoliday, isLoaded: true };
  });

  useEffect(() => {
    const updateCountdown = () => {
      const { sleepsUntil, isToday } = calculateHolidayCountdown(holiday);
      setCountdown({ sleepsUntil, isHoliday: isToday, isLoaded: true });
    };

    updateCountdown();

    const now = dayjs();
    const tomorrow = now.add(1, 'day').startOf('day');
    const msUntilMidnight = tomorrow.diff(now);

    const timeout = setTimeout(() => {
      updateCountdown();
      const interval = setInterval(updateCountdown, 24 * 60 * 60 * 1000);
      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [holiday]);

  const themeVars = holidayCssVars(holiday.theme);

  if (!countdown.isLoaded) {
    return (
      <div className={CONTAINER_CLASS} style={themeVars}>
        <h1 className="text-[96px] leading-none m-0 font-semibold text-[var(--holiday-text)] min-[451px]:text-[128px]">
          ...
        </h1>
      </div>
    );
  }

  if (countdown.isHoliday) {
    return (
      <div className={CONTAINER_CLASS} style={themeVars}>
        <h1 className="text-[48px] leading-none m-0 font-semibold text-[var(--holiday-text)] min-[451px]:text-[72px]">
          {holiday.message}
        </h1>
      </div>
    );
  }

  const countdownNumber = getCountdownNumber(holiday);
  const countdownLabel = getCountdownLabel(holiday);

  return (
    <div className={CONTAINER_CLASS} style={themeVars}>
      <h1 className="text-[128px] leading-none m-0 font-semibold text-[var(--holiday-text)] min-[451px]:text-[150px]">
        {countdownNumber}
      </h1>
      <h2 className="text-[36px] leading-[1.2] m-0 font-semibold text-[var(--holiday-text)] min-[451px]:text-[48px]">
        {countdownLabel}
      </h2>
    </div>
  );
}

/**
 * Displays a countdown to a holiday with automatic midnight updates.
 *
 * @param holiday - Holiday configuration object
 */
export const HolidayCountdown = memo(function HolidayCountdown(
  props: HolidayCountdownProps,
) {
  return <CountdownInner {...props} />;
});
