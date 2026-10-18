import { NotFoundPage } from '@/components/NotFoundPage';
import { generate404Metadata } from '@/lib/metadata';

import type { JSX } from 'react';
import type { Metadata } from 'next';

/**
 * Metadata for the 404 page (noindex, no sleep count).
 */
export function generateMetadata(): Metadata {
  return generate404Metadata();
}

/**
 * Next.js not-found route; renders the themed 404 page.
 */
export default function NotFound(): JSX.Element {
  return <NotFoundPage />;
}
