'use client';

import React from 'react';

/**
 * Props for {@link SpotifyEmbed}.
 */
interface SpotifyEmbedProps {
  /** Full Spotify share URL, e.g. https://open.spotify.com/playlist/ID?si=... */
  link: string;
  /** Wide layout (full-width, short) vs. compact card. */
  wide?: boolean;
  /** Hide the embed without unmounting it. */
  hidden?: boolean;
  /** Extra class names for the iframe wrapper. */
  className?: string;
}

/**
 * Lightweight Spotify embed. Renders Spotify's official iframe player directly,
 * replacing the react-spotify-embed dependency (which broke SSR in Next 16).
 *
 * @param props - embed link, layout, visibility, and class names
 */
export function SpotifyEmbed({
  link,
  wide = false,
  hidden = false,
  className,
}: SpotifyEmbedProps): React.JSX.Element {
  // Derive the embed path from the share URL (drops query string).
  const pathname = new URL(link).pathname;
  const src = `https://open.spotify.com/embed${pathname}`;

  return (
    <iframe
      hidden={hidden}
      className={className}
      src={src}
      width={wide ? '100%' : 300}
      height={wide ? 80 : 380}
      style={{ borderRadius: 12, border: 0 }}
      allow="encrypted-media; clipboard-write; autoplay; fullscreen; picture-in-picture"
      loading="lazy"
      title="Spotify player"
    />
  );
}
