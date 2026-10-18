import { BASE_URL } from '@/lib/urls';

import type { JSX, ReactNode } from 'react';
import type { Metadata, Viewport } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: "%s | sleeps 'til christmas",
    default: "sleeps 'til christmas",
  },
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL(BASE_URL),
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
  children: ReactNode;
}): JSX.Element {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
