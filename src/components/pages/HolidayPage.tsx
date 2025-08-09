'use client';

import { memo } from 'react';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  HolidayCountdown,
  Holiday,
} from '@/components/countdown/HolidayCountdown';
import { holidayThemes } from '@/lib/themes/tokens';

interface HolidayPageProps {
  holiday: Holiday;
}

export const HolidayPage = memo(function HolidayPage({
  holiday,
}: HolidayPageProps) {
  return (
    <>
      <StructuredData holiday={holiday} />
      <SafePageContainer background={holidayThemes[holiday.theme].background}>
        <ParticleBackground theme={holiday.theme} />
        <HolidayCountdown holiday={holiday} />
      </SafePageContainer>
    </>
  );
});
