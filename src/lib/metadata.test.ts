import { afterEach, describe, expect, it, vi } from 'vitest';

import type { Holiday } from '@/components/countdown/HolidayCountdown';
import {
  generate404Metadata,
  generateHolidayMetadata,
  generateHolidayViewport,
} from '@/lib/metadata';
import { holidayThemes } from '@/lib/themes/tokens';

const christmas: Holiday = {
  slug: 'christmas',
  month: 12,
  day: 25,
  message: 'Merry Christmas!',
  name: 'christmas',
  theme: 'christmas',
  iconName: 'home',
};

const halloween: Holiday = {
  slug: 'halloween',
  month: 10,
  day: 31,
  message: 'Happy Halloween!',
  name: 'halloween',
  theme: 'halloween',
  iconName: 'pumpkin',
};

const BASE_URL = 'https://sleepstilchristmas.com';

describe('generateHolidayMetadata — share card', () => {
  afterEach(() => vi.useRealTimers());

  it('points the OpenGraph + Twitter images at /api/og with the current sleep count', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0)); // Dec 20 2026 -> 5 sleeps
    const md = generateHolidayMetadata(christmas);

    const ogImages = md.openGraph?.images;
    expect(Array.isArray(ogImages)).toBe(true);
    const images = ogImages as Array<{
      url: string;
      width?: number;
      height?: number;
    }>;

    // Large card (1200x630) + small card (600x315), both carrying the live count.
    expect(images[0].url).toBe('/api/og?holiday=christmas&sleeps=5');
    expect(images[0].width).toBe(1200);
    expect(images[0].height).toBe(630);
    expect(images[1].url).toBe('/api/og?holiday=christmas&sleeps=5&size=small');
    expect(images[1].width).toBe(600);
    expect(images[1].height).toBe(315);

    const twitter = md.twitter as {
      card?: string;
      images?: Array<{ url: string }>;
    } | null;
    expect(twitter?.card).toBe('summary_large_image');
    expect(twitter?.images?.[0].url).toBe('/api/og?holiday=christmas&sleeps=5');
  });

  it('uses a number-less title and the canonical base URL for christmas', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0));
    const md = generateHolidayMetadata(christmas);

    expect(md.title).toEqual({ absolute: "sleeps 'til christmas" });
    expect(md.openGraph?.url).toBe(BASE_URL);
    expect(md.alternates?.canonical).toBe(BASE_URL);
  });

  it('uses the slug-scoped URL and title for non-christmas holidays', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 1, 9, 0, 0)); // Oct 1 2026 -> 30 sleeps to halloween
    const md = generateHolidayMetadata(halloween);

    expect(md.title).toEqual({ absolute: "sleeps 'til halloween" });
    expect(md.openGraph?.url).toBe(`${BASE_URL}/halloween`);
    expect(md.alternates?.canonical).toBe(`${BASE_URL}/halloween`);
    const images = md.openGraph?.images as Array<{ url: string }>;
    expect(images[0].url).toBe('/api/og?holiday=halloween&sleeps=30');
  });

  it('keeps viewport/themeColor out of metadata (they live in generateViewport)', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0));
    const md = generateHolidayMetadata(christmas);

    expect('themeColor' in md).toBe(false);
    expect('viewport' in md).toBe(false);
  });
});

describe('generateHolidayViewport', () => {
  it('returns the holiday theme color plus viewport sizing', () => {
    expect(generateHolidayViewport(christmas)).toEqual({
      themeColor: holidayThemes.christmas.primary,
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
    });
  });
});

describe('generate404Metadata', () => {
  it('is number-less and not indexable', () => {
    const md = generate404Metadata();
    expect(md.title).toBe('Page Not Found');
    expect(md.robots).toMatchObject({ index: false, follow: false });
  });
});
