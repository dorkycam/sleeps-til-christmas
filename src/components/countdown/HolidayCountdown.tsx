'use client';

import { HolidayTheme, holidayThemes } from '@/lib/themes/tokens';
// Removed ClientOnly - using proper SSR handling with useState/useEffect
import {
  calculateHolidayCountdown,
  getCountdownLabel,
  getCountdownNumber,
} from '@/lib/utils/countdown';
import dayjs from 'dayjs';
import { memo, useEffect, useState } from 'react';
import {
  Container,
  CountdownLabel,
  CountdownNumber,
  CountdownNumberLarge,
  HolidayMessage,
} from './CountdownStyles';

// Icon name types for better type safety
export type IconName = 'home' | 'heart' | 'smile';

/**
 * Holiday configuration interface
 * Defines all properties needed to display a holiday countdown
 */
export interface Holiday {
  slug: string; // URL-friendly identifier (e.g., 'christmas', 'valentines-day')
  month: number; // Holiday month (1-12)
  day: number; // Holiday day (1-31)
  message: string; // Message to show on the holiday
  name: string; // Display name of the holiday
  theme: HolidayTheme; // Visual theme for colors and particles
  iconName: IconName; // Icon identifier with type safety
  spotifyLinks?: string[]; // Optional Spotify playlist links
}

interface HolidayCountdownProps {
  holiday: Holiday;
}

/**
 * Internal state for countdown calculation
 * Tracks the current countdown state and loading status
 */
interface CountdownState {
  sleepsUntil: number; // Number of sleeps until holiday
  isHoliday: boolean; // Whether today is the holiday
  isLoaded: boolean; // Whether countdown has been calculated
}

/**
 * Internal countdown component that handles date calculations
 * Separated to ensure proper client-side rendering and hydration safety
 */
function CountdownInner({ holiday }: HolidayCountdownProps) {
  const [countdown, setCountdown] = useState<CountdownState>(() => {
    const { sleepsUntil, isToday: isHoliday } =
      calculateHolidayCountdown(holiday);
    return { sleepsUntil, isHoliday, isLoaded: true };
  });

  useEffect(() => {
    /**
     * Updates countdown using centralized calculation logic
     */
    const updateCountdown = () => {
      const { sleepsUntil, isToday } = calculateHolidayCountdown(holiday);

      setCountdown({
        sleepsUntil,
        isHoliday: isToday,
        isLoaded: true,
      });
    };

    // Calculate countdown immediately
    updateCountdown();

    // Schedule automatic updates at midnight
    const now = dayjs();
    const tomorrow = now.add(1, 'day').startOf('day');
    const msUntilMidnight = tomorrow.diff(now);

    // Update once at midnight, then every 24 hours
    const timeout = setTimeout(() => {
      updateCountdown();

      // Set up daily interval after first midnight update
      const interval = setInterval(updateCountdown, 24 * 60 * 60 * 1000);

      return () => clearInterval(interval);
    }, msUntilMidnight);

    return () => clearTimeout(timeout);
  }, [holiday]);

  // Get theme colors for consistent styling
  const colors = holidayThemes[holiday.theme];

  // Show loading state while calculating countdown
  if (!countdown.isLoaded) {
    return (
      <Container vertical align="center" justify="center">
        <CountdownNumber level={1} style={{ color: colors.text }}>
          ...
        </CountdownNumber>
      </Container>
    );
  }

  // Show holiday message if today is the holiday
  if (countdown.isHoliday) {
    return (
      <Container vertical align="center" justify="center">
        <HolidayMessage level={1} style={{ color: colors.text }}>
          {holiday.message}
        </HolidayMessage>
      </Container>
    );
  }

  // Show countdown with proper singular/plural handling using helper function
  const countdownNumber = getCountdownNumber(holiday);
  const countdownLabel = getCountdownLabel(holiday);

  return (
    <Container vertical align="center" justify="center" gap={0}>
      <CountdownNumberLarge level={1} style={{ color: colors.text }}>
        {countdownNumber}
      </CountdownNumberLarge>
      <CountdownLabel level={2} style={{ color: colors.text }}>
        {countdownLabel}
      </CountdownLabel>
    </Container>
  );
}

/**
 * Main HolidayCountdown component
 *
 * Displays a countdown to a specified holiday with automatic updates.
 * Uses proper SSR-safe state management to prevent hydration mismatches.
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
  return <CountdownInner {...props} />;
});
