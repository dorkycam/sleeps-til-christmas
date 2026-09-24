import React from 'react';
import Link from 'next/link';
import {
  Ghost,
  Gift,
  Heart,
  House,
  Smile,
  Sparkles,
  TreePine,
  type LucideIcon,
} from 'lucide-react';

import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { getAllHolidaySlugs, getHolidayBySlugSafe } from '@/lib/holidays';
import { holidayThemes, uiColors } from '@/lib/themes/tokens';
import { getHolidayPath } from '@/lib/urls';

import type { IconName } from '@/components/countdown/HolidayCountdown';

/** Neutral 404 backdrop, built from the shared UI color tokens. */
const NOT_FOUND_BACKGROUND = `linear-gradient(135deg, ${uiColors.notFoundGradientFrom} 0%, ${uiColors.notFoundGradientTo} 100%)`;

/** Lucide icon for each holiday iconName. Typed so a new IconName must be mapped. */
const HOLIDAY_ICONS: Record<IconName, LucideIcon> = {
  home: House,
  heart: Heart,
  smile: Smile,
  fireworks: Sparkles,
  tree: TreePine,
  pumpkin: Ghost,
  gift: Gift,
};

/**
 * 404 Not Found page with links to each holiday countdown.
 */
export function NotFoundPage(): React.JSX.Element {
  return (
    <SafePageContainer background={NOT_FOUND_BACKGROUND}>
      <div
        className="flex flex-col justify-center items-center h-full text-center gap-6 text-[var(--nf-muted)]"
        style={
          {
            '--nf-muted': uiColors.textMuted,
            '--nf-strong': uiColors.textStrong,
          } as React.CSSProperties
        }
      >
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-8xl font-extrabold text-[var(--nf-muted)] m-0 leading-none text-shadow-soft min-[451px]:text-9xl min-[641px]:text-10xl">
            404
          </h1>
          <h2 className="text-lg font-semibold text-[var(--nf-strong)] m-0 mb-3 min-[451px]:text-2xl min-[451px]:mb-4 min-[641px]:text-3xl">
            Oops! Page not found
          </h2>
          <p className="text-sm text-[var(--nf-muted)] mb-6 text-center leading-[1.4] min-[451px]:text-base min-[451px]:mb-8 min-[641px]:text-lg">
            The page you&apos;re looking for seems to have wandered off into the
            holiday spirit.
            <br />
            Let&apos;s get you back to celebrating!
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-base text-[var(--nf-muted)] mb-2">
            Try one of these festive destinations:
          </p>

          <div className="flex flex-col items-center gap-3">
            {getAllHolidaySlugs().map(slug => {
              const holiday = getHolidayBySlugSafe(slug);
              const IconComponent = HOLIDAY_ICONS[holiday.iconName];
              const colors = holidayThemes[holiday.theme];
              const fontColor =
                colors.background === colors.primary
                  ? colors.text
                  : colors.background;

              return (
                <Link
                  key={slug}
                  href={getHolidayPath(holiday)}
                  className="flex items-center gap-2 h-10 text-sm font-semibold rounded-lg min-w-35 justify-center px-4 shadow-btn transition-all duration-300 bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-fg)] hover:text-[var(--btn-bg)] min-[451px]:h-12 min-[451px]:text-base min-[451px]:min-w-45"
                  style={
                    {
                      '--btn-bg': colors.primary,
                      '--btn-fg': fontColor,
                    } as React.CSSProperties
                  }
                >
                  <IconComponent size={18} />
                  {holiday.name.toLowerCase()}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SafePageContainer>
  );
}
