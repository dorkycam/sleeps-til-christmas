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

  it('points the OpenGraph + Twitter images at /api/og with no baked count (the route computes it)', () => {
    const md = generateHolidayMetadata(christmas);

    const ogImages = md.openGraph?.images;
    expect(Array.isArray(ogImages)).toBe(true);
    const images = ogImages as Array<{
      url: string;
      width?: number;
      height?: number;
    }>;

    // Large card (1200x630) + small card (600x315); neither carries a sleeps
    // param, so shared cards are always freshly computed by the route.
    expect(images[0].url).toBe('/api/og?holiday=christmas');
    expect(images[0].width).toBe(1200);
    expect(images[0].height).toBe(630);
    expect(images[1].url).toBe('/api/og?holiday=christmas&size=small');
    expect(images[1].width).toBe(600);
    expect(images[1].height).toBe(315);

    const twitter = md.twitter as {
      card?: string;
      images?: Array<{ url: string }>;
    } | null;
    expect(twitter?.card).toBe('summary_large_image');
    expect(twitter?.images?.[0].url).toBe('/api/og?holiday=christmas');
  });

  it('puts the live sleep count in the title and uses the canonical base URL for christmas', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 20, 9, 0, 0)); // Dec 20 2026 -> 5 sleeps
    const md = generateHolidayMetadata(christmas);

    expect(md.title).toEqual({ absolute: "5 sleeps 'til christmas" });
    expect(md.openGraph?.url).toBe(BASE_URL);
    expect(md.alternates?.canonical).toBe(BASE_URL);
  });

  it('uses singular "sleep" in the title for exactly one sleep', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 24, 9, 0, 0)); // Dec 24 2026 -> 1 sleep
    expect(generateHolidayMetadata(christmas).title).toEqual({
      absolute: "1 sleep 'til christmas",
    });
  });

  it('celebrates in the title on the day', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 11, 25, 9, 0, 0)); // Dec 25 2026 -> today
    expect(generateHolidayMetadata(christmas).title).toEqual({
      absolute: 'Happy christmas!',
    });
  });

  it('uses the slug-scoped URL and title for non-christmas holidays', () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 1, 9, 0, 0)); // Oct 1 2026 -> 30 sleeps to halloween
    const md = generateHolidayMetadata(halloween);

    expect(md.title).toEqual({ absolute: "30 sleeps 'til halloween" });
    expect(md.openGraph?.url).toBe(`${BASE_URL}/halloween`);
    expect(md.alternates?.canonical).toBe(`${BASE_URL}/halloween`);
    const images = md.openGraph?.images as Array<{ url: string }>;
    expect(images[0].url).toBe('/api/og?holiday=halloween');
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
