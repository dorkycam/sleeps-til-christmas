'use client';

import {
  Holiday,
  HolidayCountdown,
} from '@/components/countdown/HolidayCountdown';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { SpotifyEmbed } from '@/components/media/SpotifyEmbed';
import { StructuredData } from '@/components/seo/StructuredData';
import { holidayThemes } from '@/lib/themes/tokens';
import { memo, useCallback, useMemo, useState } from 'react';

enum SpotifyVisibilityState {
  Wide,
  Card,
  Hidden,
}

interface HolidayPageProps {
  holiday: Holiday;
}

/**
 * Full holiday page: themed background, particles, countdown, and an optional
 * Spotify embed toggled through three states on double-click.
 *
 * @param props - the holiday to render
 */
export const HolidayPage = memo(function HolidayPage({
  holiday,
}: HolidayPageProps) {
  const { theme, spotifyLinks } = holiday;
  const [spotifyVisibility, setSpotifyVisibility] =
    useState<SpotifyVisibilityState>(SpotifyVisibilityState.Wide);

  const handleDoubleClick = useCallback(() => {
    setSpotifyVisibility(prev =>
      prev === SpotifyVisibilityState.Hidden ? 0 : prev + 1,
    );
  }, []);

  const footerContent = useMemo(() => {
    if (spotifyLinks && spotifyLinks.length > 0) {
      return (
        <SpotifyEmbed
          className="w-full max-w-[500px]"
          hidden={spotifyVisibility === SpotifyVisibilityState.Hidden}
          wide={spotifyVisibility === SpotifyVisibilityState.Wide}
          link={spotifyLinks[0]}
        />
      );
    }
  }, [spotifyLinks, spotifyVisibility]);

  return (
    <>
      <StructuredData holiday={holiday} />
      <SafePageContainer
        background={holidayThemes[theme].background}
        footerContent={footerContent}
        onDoubleClick={handleDoubleClick}
      >
        <ParticleBackground theme={theme} />
        <HolidayCountdown holiday={holiday} />
      </SafePageContainer>
    </>
  );
});
