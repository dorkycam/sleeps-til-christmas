'use client';

import { useState } from 'react';

import { holidayCssVars } from '@/lib/holidayStyle';

import { HolidayCountdown } from './HolidayCountdown';
import { ParticleBackground } from './ParticleBackground';
import { SafePageContainer } from './SafePageContainer';
import { SpotifyEmbed } from './SpotifyEmbed';
import { StructuredData } from './StructuredData';

import type { JSX } from 'react';
import type { Holiday } from '@/lib/holidays';

/**
 * The three Spotify embed layouts, cycled on double-click:
 * wide (full-width bar) -> card (compact) -> hidden.
 */
const SPOTIFY_VISIBILITY = ['wide', 'card', 'hidden'] as const;
type SpotifyVisibility = (typeof SPOTIFY_VISIBILITY)[number];

/**
 * Next Spotify layout in the double-click cycle.
 *
 * @param current - the layout currently shown
 * @returns the layout to show next
 */
function nextSpotifyVisibility(current: SpotifyVisibility): SpotifyVisibility {
  const nextIndex =
    (SPOTIFY_VISIBILITY.indexOf(current) + 1) % SPOTIFY_VISIBILITY.length;
  return SPOTIFY_VISIBILITY[nextIndex] ?? 'wide';
}

interface HolidayPageProps {
  holiday: Holiday;
}

/**
 * Full holiday page: themed background, particles, countdown, and an optional
 * Spotify embed toggled through three states on double-click. Sets the
 * holiday's CSS variables once on the page root for every child to use.
 *
 * @param props - the holiday to render
 */
export function HolidayPage({ holiday }: HolidayPageProps): JSX.Element {
  const { theme, spotifyLinks } = holiday;
  const spotifyLink = spotifyLinks?.[0];
  const [spotifyVisibility, setSpotifyVisibility] =
    useState<SpotifyVisibility>('wide');

  const handleDoubleClick = (): void => {
    setSpotifyVisibility(nextSpotifyVisibility);
  };

  return (
    <>
      <StructuredData holiday={holiday} />
      <SafePageContainer
        className="bg-[var(--holiday-bg)]"
        style={holidayCssVars(theme)}
        footerContent={
          spotifyLink && (
            <SpotifyEmbed
              className="w-full max-w-[500px] mx-auto"
              hidden={spotifyVisibility === 'hidden'}
              wide={spotifyVisibility === 'wide'}
              link={spotifyLink}
            />
          )
        }
        onDoubleClick={handleDoubleClick}
      >
        <ParticleBackground theme={theme} />
        <HolidayCountdown holiday={holiday} />
      </SafePageContainer>
    </>
  );
}
