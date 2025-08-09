'use client';

import { memo } from 'react';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { ParticleBackground } from './ParticleBackground';
import { HolidayCountdown, Holiday } from './HolidayCountdown';
import { holidayThemes } from '@/lib/themes/tokens';

interface HolidayPageProps {
  holiday: Holiday;
}

export const HolidayPage = memo(function HolidayPage({
  holiday,
}: HolidayPageProps) {
  return (
    <SafePageContainer background={holidayThemes[holiday.theme].background}>
      <ParticleBackground theme={holiday.theme} />
      <HolidayCountdown holiday={holiday} />
    </SafePageContainer>
  );
});
