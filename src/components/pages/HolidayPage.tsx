'use client';

import React, { memo, useCallback, useMemo, useState } from 'react';

import {
  Holiday,
  HolidayCountdown,
} from '@/components/countdown/HolidayCountdown';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { SpotifyEmbed } from '@/components/media/SpotifyEmbed';
import { StructuredData } from '@/components/seo/StructuredData';
import { holidayThemes } from '@/lib/themes/tokens';

/**
 * The three Spotify embed layouts, cycled on double-click:
 * wide (full-width bar) -> card (compact) -> hidden.
 */
const SPOTIFY_VISIBILITY = ['wide', 'card', 'hidden'] as const;
type SpotifyVisibility = (typeof SPOTIFY_VISIBILITY)[number];

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
}: HolidayPageProps): React.JSX.Element {
  const { theme, spotifyLinks } = holiday;
  const [spotifyVisibility, setSpotifyVisibility] =
    useState<SpotifyVisibility>('wide');

  const handleDoubleClick = useCallback(() => {
    setSpotifyVisibility(prev => {
      const nextIndex =
        (SPOTIFY_VISIBILITY.indexOf(prev) + 1) % SPOTIFY_VISIBILITY.length;
      return SPOTIFY_VISIBILITY[nextIndex];
    });
  }, []);

  const footerContent = useMemo(() => {
    if (spotifyLinks && spotifyLinks.length > 0) {
      return (
        <SpotifyEmbed
          className="w-full max-w-[500px] mx-auto"
          hidden={spotifyVisibility === 'hidden'}
          wide={spotifyVisibility === 'wide'}
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
