import React from 'react';
import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';

import { HolidayPage } from '@/components';
import { getAllHolidaySlugs, getHolidayBySlug } from '@/lib/holidays';
import { generateHolidayMetadata, generateHolidayViewport } from '@/lib/metadata';

import type { Holiday } from '@/components/countdown/HolidayCountdown';

// Revalidate hourly so the sleep count in the page <title> and metadata stays
// current (the count changes once a day). The OG card computes its own count.
export const revalidate = 3600;

interface HolidayPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Resolve the holiday for a dynamic route, or trigger a 404.
 *
 * Christmas lives at the home page (`/`), so `/christmas` and any unknown slug
 * render the not-found page. Shared by this route's metadata, viewport, and
 * page exports so the slug-resolution guard lives in exactly one place.
 *
 * @param params - the route params promise carrying the slug
 * @returns the resolved holiday (does not return for invalid slugs)
 */
async function resolveHolidayOrNotFound(
  params: HolidayPageProps['params'],
): Promise<Holiday> {
  const { slug } = await params;
  const holiday = getHolidayBySlug(slug);

  if (!holiday || slug === 'christmas') {
    notFound();
  }

  return holiday;
}

/**
 * Generate metadata for dynamic holiday pages
 */
export async function generateMetadata({
  params,
}: HolidayPageProps): Promise<Metadata> {
  const holiday = await resolveHolidayOrNotFound(params);
  return generateHolidayMetadata(holiday);
}

/**
 * Generate viewport for dynamic holiday pages
 */
export async function generateViewport({
  params,
}: HolidayPageProps): Promise<Viewport> {
  const holiday = await resolveHolidayOrNotFound(params);
  return generateHolidayViewport(holiday);
}

/**
 * Generate static paths for all holidays (except Christmas)
 * This enables static generation at build time for better performance
 */
export function generateStaticParams(): { slug: string }[] {
  const slugs = getAllHolidaySlugs().filter(slug => slug !== 'christmas');

  return slugs.map(slug => ({
    slug,
  }));
}

/**
 * Dynamic holiday page component
 *
 * Handles all holiday routes except Christmas (which is at /)
 * Uses the slug to determine which holiday to display
 */
export default async function DynamicHolidayPage({
  params,
}: HolidayPageProps): Promise<React.JSX.Element> {
  const holiday = await resolveHolidayOrNotFound(params);
  return <HolidayPage holiday={holiday} />;
}
