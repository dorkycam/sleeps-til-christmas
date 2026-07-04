import { HolidayPage } from '@/components';
import {
  getAllHolidaySlugs,
  getHolidayBySlug,
  isValidHolidaySlug,
} from '@/lib/holidays';
import { generateHolidayMetadata, generateHolidayViewport } from '@/lib/metadata';
import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import React from 'react';

interface HolidayPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Generate metadata for dynamic holiday pages
 */
export async function generateMetadata({
  params,
}: HolidayPageProps): Promise<Metadata> {
  const { slug } = await params;
  const holiday = getHolidayBySlug(slug);

  if (!holiday || slug === 'christmas') {
    // Christmas is handled by the home page, redirect to 404 for /christmas
    notFound();
  }

  return generateHolidayMetadata(holiday);
}

/**
 * Generate viewport for dynamic holiday pages
 */
export async function generateViewport({
  params,
}: HolidayPageProps): Promise<Viewport> {
  const { slug } = await params;
  const holiday = getHolidayBySlug(slug);

  if (!holiday || slug === 'christmas') {
    notFound();
  }

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
  const { slug } = await params;

  // Validate the slug and get holiday data
  if (!isValidHolidaySlug(slug) || slug === 'christmas') {
    notFound();
  }

  const holiday = getHolidayBySlug(slug)!;

  return <HolidayPage holiday={holiday} />;
}
