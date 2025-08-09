import { ImageResponse } from 'next/og';
import { NextRequest } from 'next/server';
import { getHolidayBySlug } from '@/lib/holidays';
import { holidayThemes } from '@/lib/themes/tokens';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const holidaySlug = searchParams.get('holiday') || 'christmas';
    const sleeps =
      searchParams.get('sleeps') || searchParams.get('days') || '0'; // Support both for backward compatibility

    const holiday = getHolidayBySlug(holidaySlug);
    if (!holiday) {
      return new Response('Holiday not found', { status: 404 });
    }

    const colors = holidayThemes[holiday.theme];
    const sleepsNumber = parseInt(sleeps, 10);

    // Dynamic text based on countdown
    const countdownText =
      sleepsNumber === 0
        ? 'Today!'
        : sleepsNumber === 1
          ? '1 Sleep Left'
          : `${sleepsNumber} Sleeps`;

    const mainText =
      sleepsNumber === 0
        ? `Today is ${holiday.name}!`
        : `${countdownText} Until ${holiday.name}`;

    return new ImageResponse(
      (
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
              fontSize: sleepsNumber > 99 ? '120px' : '180px',
              fontWeight: 900,
              color: colors.text,
              lineHeight: 1,
              marginBottom: '20px',
              textShadow: '4px 4px 8px rgba(0, 0, 0, 0.3)',
            }}
          >
            {sleepsNumber === 0 ? '🎉' : sleepsNumber}
          </div>

          {/* Main text */}
          <div
            style={{
              fontSize: '48px',
              fontWeight: 700,
              color: colors.text,
              textAlign: 'center',
              marginBottom: '12px',
              maxWidth: '900px',
              lineHeight: 1.1,
            }}
          >
            {mainText}
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: '28px',
              fontWeight: 500,
              color: colors.text,
              opacity: 0.9,
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            {sleepsNumber === 0
              ? holiday.message
              : 'Track the countdown at sleepstilchristmas.com'}
          </div>

          {/* Site branding */}
          <div
            style={{
              position: 'absolute',
              bottom: '40px',
              right: '40px',
              fontSize: '24px',
              fontWeight: 600,
              color: colors.text,
              opacity: 0.8,
            }}
          >
            sleepstilchristmas.com
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      },
    );
  } catch (error) {
    console.error('Error generating OG image:', error);
    return new Response('Failed to generate image', { status: 500 });
  }
}
