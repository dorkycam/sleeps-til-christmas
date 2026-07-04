import '@/styles/globals.css';
import { Metadata, Viewport } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: {
    template: "%s | sleeps 'til christmas",
    default: "sleeps 'til christmas",
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://sleepstilchristmas.com'),
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

/**
 * Root layout. Wraps every route; provides global styles and metadata.
 *
 * @param props.children - content to render inside the document body
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
