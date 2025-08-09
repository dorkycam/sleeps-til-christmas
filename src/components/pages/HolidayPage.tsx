'use client';

import {
  Holiday,
  HolidayCountdown,
} from '@/components/countdown/HolidayCountdown';
import { ParticleBackground } from '@/components/effects/ParticleBackground';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { StructuredData } from '@/components/seo/StructuredData';
import { holidayThemes } from '@/lib/themes/tokens';
import { memo, useCallback, useMemo, useState } from 'react';
import { Spotify } from 'react-spotify-embed';
import styled from 'styled-components';

enum SpotifyVisibilityState {
  Wide,
  Card,
  Hidden,
}

const StyledSpotify = styled(Spotify)`
  width: 100%;
  max-width: 500px;
`;

interface HolidayPageProps {
  holiday: Holiday;
}

export const HolidayPage = memo(function HolidayPage({
  holiday,
}: HolidayPageProps) {
  const { theme, spotifyLinks } = holiday;
  const [spotifyVisibility, setSpotifyVisibility] =
    useState<SpotifyVisibilityState>(SpotifyVisibilityState.Wide);

  const handleFooterDoubleClick = useCallback(() => {
    setSpotifyVisibility(prev =>
      prev === SpotifyVisibilityState.Hidden ? prev - 2 : prev + 1,
    );
  }, []);

  const footerContent = useMemo(() => {
    if (spotifyLinks && spotifyLinks.length > 0) {
      return (
        <StyledSpotify
          hidden={spotifyVisibility === SpotifyVisibilityState.Hidden}
          wide={spotifyVisibility === SpotifyVisibilityState.Wide}
          link={spotifyLinks[0]} // Use the first link for the footer for now
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
        footerOptions={{ onDoubleClick: handleFooterDoubleClick }}
      >
        <ParticleBackground theme={theme} />
        <HolidayCountdown holiday={holiday} />
      </SafePageContainer>
    </>
  );
});
