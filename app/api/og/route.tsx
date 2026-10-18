import { ImageResponse } from 'next/og';

import {
  calculateHolidayCountdown,
  formatCountdownTitle,
} from '@/lib/countdown';
import { holidayThemes } from '@/lib/holidayTheme';
import { getHolidayBySlug } from '@/lib/holidays';
import { BASE_URL, HOME_HOLIDAY_SLUG } from '@/lib/urls';

import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const SITE_HOST = new URL(BASE_URL).host;

/**
 * Render the Open Graph share card for a holiday with the live sleep count.
 *
 * Styles are inline because `ImageResponse` (Satori) can't read Tailwind
 * classes or CSS variables; this route is the one exception to that rule.
 *
 * @param request - carries `?holiday=<slug>` and optional `&size=small`
 * @returns the PNG card, or a 404/500 response
 */
export async function GET(request: NextRequest): Promise<Response> {
  try {
    const { searchParams } = new URL(request.url);
    const holidaySlug = searchParams.get('holiday') || HOME_HOLIDAY_SLUG;
    const size = searchParams.get('size') || 'large'; // 'large' (1200x630) or 'small' (600x315)

    const holiday = getHolidayBySlug(holidaySlug);
    if (!holiday) {
      return new Response('Holiday not found', { status: 404 });
    }

    const colors = holidayThemes[holiday.theme];
    // Compute the live count here (this edge route runs per request) so shared
    // cards are always current, regardless of when the referencing page was
    // last generated.
    const countdown = calculateHolidayCountdown(holiday);
    const sleepsNumber = countdown.sleepsUntil;
    const mainText = formatCountdownTitle(holiday, countdown);

    // Determine dimensions based on size parameter
    const isSmall = size === 'small';
    const imageWidth = isSmall ? 600 : 1200;
    const imageHeight = isSmall ? 315 : 630;

    // Scale font sizes for smaller images
    const fontScale = isSmall ? 0.6 : 1;

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: `linear-gradient(135deg, ${colors.background} 0%, ${colors.primary} 100%)`,
          fontFamily: 'system-ui, -apple-system, sans-serif',
        }}
      >
        {/* Main countdown number */}
        <div
          style={{
            display: 'flex',
            fontSize: (sleepsNumber > 99 ? 120 : 180) * fontScale + 'px',
            fontWeight: 900,
            color: colors.text,
            lineHeight: 1,
            marginBottom: 20 * fontScale + 'px',
            textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
          }}
        >
          {sleepsNumber === 0 ? '🎉' : sleepsNumber}
        </div>

        {/* Main text */}
        <div
          style={{
            display: 'flex',
            fontSize: 48 * fontScale + 'px',
            fontWeight: 700,
            color: colors.text,
            textAlign: 'center',
            marginBottom: 12 * fontScale + 'px',
            maxWidth: 900 * fontScale + 'px',
            lineHeight: 1.1,
          }}
        >
          {mainText}
        </div>

        {/* Subtitle */}
        <div
          style={{
            display: 'flex',
            fontSize: 28 * fontScale + 'px',
            fontWeight: 500,
            color: colors.text,
            opacity: 0.9,
            textAlign: 'center',
            maxWidth: 800 * fontScale + 'px',
          }}
        >
          {sleepsNumber === 0
            ? holiday.message
            : `Track the countdown at ${SITE_HOST}`}
        </div>

        {/* Site branding */}
        <div
          style={{
            display: 'flex',
            position: 'absolute',
            bottom: 40 * fontScale + 'px',
            right: 40 * fontScale + 'px',
            fontSize: 24 * fontScale + 'px',
            fontWeight: 600,
            color: colors.text,
            opacity: 0.8,
          }}
        >
          {SITE_HOST}
        </div>
      </div>,
      {
        width: imageWidth,
        height: imageHeight,
      },
    );
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
