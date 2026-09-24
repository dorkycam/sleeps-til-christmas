'use client';

import { memo, useEffect, useState } from 'react';
import type { JSX } from 'react';
import dayjs from 'dayjs';

import { holidayCssVars } from '@/lib/themes/holidayStyle';
import {
  calculateHolidayCountdown,
  getCountdownLabel,
  getCountdownNumber,
} from '@/lib/utils/countdown';
import type { HolidayTheme } from '@/lib/themes/tokens';

// Icon name types for better type safety
export type IconName =
  'home' | 'heart' | 'smile' | 'fireworks' | 'tree' | 'pumpkin' | 'gift';

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

function CountdownInner({ holiday }: HolidayCountdownProps): JSX.Element {
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

    // Re-arm a timeout for each upcoming midnight so the count ticks over at
    // the day boundary. A single handle is tracked so cleanup always clears
    // whichever timer is pending.
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleNextMidnight = (): void => {
      const now = dayjs();
      const msUntilMidnight = now.add(1, 'day').startOf('day').diff(now);
      timeout = setTimeout(() => {
        updateCountdown();
        scheduleNextMidnight();
      }, msUntilMidnight);
    };

    updateCountdown();
    scheduleNextMidnight();

    return () => clearTimeout(timeout);
  }, [holiday]);

  const themeVars = holidayCssVars(holiday.theme);

  if (!countdown.isLoaded) {
    return (
      <div className={CONTAINER_CLASS} style={themeVars}>
        <h1 className="text-8xl leading-none m-0 font-bold text-[var(--holiday-text)] min-[451px]:text-9xl">
          ...
        </h1>
      </div>
    );
  }

  if (countdown.isHoliday) {
    return (
      <div className={CONTAINER_CLASS} style={themeVars}>
        <h1 className="text-5xl leading-none m-0 font-bold text-[var(--holiday-text)] min-[451px]:text-7xl">
          {holiday.message}
        </h1>
      </div>
    );
  }

  const countdownNumber = getCountdownNumber(holiday);
  const countdownLabel = getCountdownLabel(holiday);

  return (
    <div className={CONTAINER_CLASS} style={themeVars}>
      <h1 className="text-9xl leading-none m-0 font-bold text-[var(--holiday-text)] min-[451px]:text-10xl">
        {countdownNumber}
      </h1>
      <h2 className="text-4xl leading-[1.2] m-0 font-semibold text-[var(--holiday-text)] min-[451px]:text-5xl">
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
): JSX.Element {
  return <CountdownInner {...props} />;
});
