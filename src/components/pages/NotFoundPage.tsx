'use client';

import React from 'react';
import { Heart, Home, Smile, type LucideIcon } from 'lucide-react';
import Link from 'next/link';

import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { getAllHolidaySlugs, getHolidayBySlug } from '@/lib/holidays';
import { holidayThemes } from '@/lib/themes/tokens';

/**
 * Map a holiday iconName to a lucide icon component.
 *
 * @param iconName - the holiday's iconName
 * @returns a lucide icon component
 */
function getIcon(iconName: string): LucideIcon {
  const icons: Record<string, LucideIcon> = {
    home: Home,
    heart: Heart,
    smile: Smile,
  };
  return icons[iconName] ?? Home;
}

/**
 * 404 Not Found page with links to each holiday countdown.
 */
export function NotFoundPage(): React.JSX.Element {
  return (
    <SafePageContainer background="linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)">
      <div className="flex flex-col justify-center items-center h-full text-center gap-6">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-[80px] font-extrabold text-[#4a5568] m-0 leading-none [text-shadow:2px_2px_4px_rgba(0,0,0,0.1)] min-[451px]:text-[120px] min-[641px]:text-[180px]">
            404
          </h1>
          <h2 className="text-[18px] font-semibold text-[#2d3748] m-0 mb-3 min-[451px]:text-[24px] min-[451px]:mb-4 min-[641px]:text-[32px]">
            Oops! Page not found
          </h2>
          <p className="text-[14px] text-[#4a5568] mb-6 text-center leading-[1.4] min-[451px]:text-[16px] min-[451px]:mb-8 min-[641px]:text-[18px]">
            The page you&apos;re looking for seems to have wandered off into the
            holiday spirit.
            <br />
            Let&apos;s get you back to celebrating!
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-[16px] text-[#4a5568] mb-2">
            Try one of these festive destinations:
          </p>

          <div className="flex flex-col items-center gap-3">
            {getAllHolidaySlugs().map(slug => {
              const holiday = getHolidayBySlug(slug)!;
              const IconComponent = getIcon(holiday.iconName);
              const colors = holidayThemes[holiday.theme];
              const fontColor =
                colors.background === colors.primary
                  ? colors.text
                  : colors.background;
              const isChristmas = slug === 'christmas';
              const href = isChristmas ? '/' : `/${slug}`;

              return (
                <Link key={slug} href={href} className="no-underline">
                  <button
                    type="button"
                    className="flex items-center gap-2 h-10 text-[14px] font-semibold rounded-lg min-w-[140px] justify-center px-4 shadow-[0_2px_8px_rgba(0,0,0,0.15)] transition-all duration-300 bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-fg)] hover:text-[var(--btn-bg)] min-[451px]:h-12 min-[451px]:text-[16px] min-[451px]:min-w-[180px]"
                    style={
                      {
                        '--btn-bg': colors.primary,
                        '--btn-fg': fontColor,
                      } as React.CSSProperties
                    }
                  >
                    <IconComponent size={18} />
                    {holiday.name.toLowerCase()}
                  </button>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </SafePageContainer>
  );
}
