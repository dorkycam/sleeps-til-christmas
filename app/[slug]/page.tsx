import { notFound } from 'next/navigation';
import { HolidayPage } from '@/components';
import {
  getHolidayBySlug,
  getAllHolidaySlugs,
  isValidHolidaySlug,
} from '@/lib/holidays';
import { generateHolidayMetadata } from '@/lib/metadata';

interface HolidayPageProps {
  params: {
    slug: string;
  };
}

/**
 * Generate metadata for dynamic holiday pages
 */
export function generateMetadata({ params }: HolidayPageProps) {
  const holiday = getHolidayBySlug(params.slug);

  if (!holiday || params.slug === 'christmas') {
    // Christmas is handled by the home page, redirect to 404 for /christmas
    notFound();
  }

  return generateHolidayMetadata(holiday);
}

/**
 * Generate static paths for all holidays (except Christmas)
 * This enables static generation at build time for better performance
 */
export function generateStaticParams() {
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
export default function DynamicHolidayPage({ params }: HolidayPageProps) {
  // Validate the slug and get holiday data
  if (!isValidHolidaySlug(params.slug) || params.slug === 'christmas') {
    notFound();
  }

  const holiday = getHolidayBySlug(params.slug)!;

  return <HolidayPage holiday={holiday} />;
}
