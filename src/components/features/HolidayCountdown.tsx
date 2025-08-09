'use client';

import { memo, useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { ClientOnly } from '@/lib/utils/client-only';
import { ContentOverlay } from '@/components/ui/Container';
import { CountdownNumber, CountdownLabel } from '@/components/ui/Typography';
import { HolidayTheme, holidayThemes } from '@/lib/themes/tokens';

/**
 * Holiday configuration interface
 * Defines all properties needed to display a holiday countdown
 */
export interface Holiday {
  month: number; // Holiday month (1-12)
  day: number; // Holiday day (1-31)
  message: string; // Message to show on the holiday
  name: string; // Display name of the holiday
  theme: HolidayTheme; // Visual theme for colors and particles
}

interface HolidayCountdownProps {
  holiday: Holiday;
}

/**
 * Internal state for countdown calculation
 * Tracks the current countdown state and loading status
 */
interface CountdownState {
  sleepsUntil: number; // Number of days until holiday
  isHoliday: boolean; // Whether today is the holiday
  isLoaded: boolean; // Whether countdown has been calculated
}

/**
 * Internal countdown component that handles date calculations
 * Separated to ensure proper client-side rendering and hydration safety
 */
function CountdownInner({ holiday }: HolidayCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>({
    sleepsUntil: 0,
    isHoliday: false,
    isLoaded: false,
  });

  useEffect(() => {
    /**
     * Calculates days until holiday
     * Handles year rollover when holiday has passed this year
     */
    const calculateCountdown = () => {
      const today = dayjs();
      const currentYear = today.year();

      // Create holiday dates for this year and next year
      const holidayThisYear = dayjs(
        `${currentYear}-${holiday.month.toString().padStart(2, '0')}-${holiday.day.toString().padStart(2, '0')}`,
      );
      const holidayNextYear = dayjs(
        `${currentYear + 1}-${holiday.month.toString().padStart(2, '0')}-${holiday.day.toString().padStart(2, '0')}`,
      );

      // Check if holiday is in the future this year or if it's today
      const isBeforeHoliday = today.isBefore(holidayThisYear, 'day');
      const isTodayHoliday = today.isSame(holidayThisYear, 'day');

      // Use this year's date if holiday hasn't passed, otherwise next year
      const targetDate = isBeforeHoliday ? holidayThisYear : holidayNextYear;
      const sleepsUntil = targetDate.diff(today, 'day') + 1;

      setCountdown({
        sleepsUntil: Math.max(0, sleepsUntil), // Ensure non-negative
        isHoliday: isTodayHoliday,
        isLoaded: true,
      });
    };

    // Calculate countdown immediately
    calculateCountdown();

    // Schedule automatic updates at midnight
    const now = dayjs();
    const tomorrow = now.add(1, 'day').startOf('day');
    const msUntilMidnight = tomorrow.diff(now);

    // Update once at midnight, then every 24 hours
    const timeout = setTimeout(() => {
      calculateCountdown();

      // Set up daily interval after first midnight update
      const interval = setInterval(calculateCountdown, 24 * 60 * 60 * 1000);

      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [holiday.month, holiday.day]);

  // Get theme colors for consistent styling
  const colors = holidayThemes[holiday.theme];

  // Show loading state while calculating countdown
  if (!countdown.isLoaded) {
    return (
      <ContentOverlay>
        <CountdownNumber
          color={colors.text}
          align="center"
          margin="0"
          size="6xl"
          responsive={{ md: '10xl' }}
        >
          ...
        </CountdownNumber>
      </ContentOverlay>
    );
  }

  // Show holiday message if today is the holiday
  if (countdown.isHoliday) {
    return (
      <ContentOverlay>
        <CountdownNumber
          color={colors.text}
          align="center"
          margin="0"
          size="5xl"
          responsive={{ md: '8xl' }}
        >
          {holiday.message}
        </CountdownNumber>
      </ContentOverlay>
    );
  }

  // Show countdown with proper singular/plural handling
  return (
    <ContentOverlay>
      <CountdownNumber
        color={colors.text}
        align="center"
        margin="0"
        size="6xl"
        responsive={{ md: '10xl' }}
      >
        {countdown.sleepsUntil}
      </CountdownNumber>
      <CountdownLabel
        color={colors.text}
        align="center"
        margin="0"
        size="3xl"
        responsive={{ md: '4xl' }}
      >
        sleep{countdown.sleepsUntil !== 1 ? 's' : ''} 'til {holiday.name}
      </CountdownLabel>
    </ContentOverlay>
  );
}

/**
 * Main HolidayCountdown component
 *
 * Displays a countdown to a specified holiday with automatic updates.
 * Uses ClientOnly wrapper to prevent hydration mismatches from date calculations.
 *
 * Features:
 * - Automatic daily updates at midnight
 * - Proper year rollover handling
 * - Holiday celebration message when the day arrives
 * - Responsive typography
 * - Theme-aware colors
 *
 * @param holiday - Holiday configuration object
 */
export const HolidayCountdown = memo(function HolidayCountdown(
  props: HolidayCountdownProps,
) {
  return (
    <ClientOnly>
      <CountdownInner {...props} />
    </ClientOnly>
  );
});
