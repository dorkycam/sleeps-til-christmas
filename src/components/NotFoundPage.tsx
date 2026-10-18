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

import { holidayButtonVars } from '@/lib/holidayStyle';
import { getAllHolidaySlugs, getHolidayBySlugSafe } from '@/lib/holidays';
import { getHolidayPath } from '@/lib/urls';

import { SafePageContainer } from './SafePageContainer';

import type { JSX } from 'react';
import type { IconName } from '@/lib/holidays';

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

const TITLE_CLASS =
  'text-8xl font-extrabold text-muted m-0 leading-none text-shadow-soft min-[451px]:text-9xl min-[641px]:text-10xl';
const HEADING_CLASS =
  'text-lg font-semibold text-strong m-0 mb-3 min-[451px]:text-2xl min-[451px]:mb-4 min-[641px]:text-3xl';
const MESSAGE_CLASS =
  'text-sm text-muted mb-6 text-center leading-[1.4] min-[451px]:text-base min-[451px]:mb-8 min-[641px]:text-lg';
const LINK_CLASS =
  'flex items-center gap-2 h-10 text-sm font-semibold rounded-lg min-w-35 justify-center px-4 shadow-btn transition-all duration-300 bg-[var(--btn-bg)] text-[var(--btn-fg)] hover:bg-[var(--btn-fg)] hover:text-[var(--btn-bg)] min-[451px]:h-12 min-[451px]:text-base min-[451px]:min-w-45';

/**
 * 404 Not Found page with links to each holiday countdown.
 */
export function NotFoundPage(): JSX.Element {
  return (
    <SafePageContainer className="bg-linear-135 from-not-found-from to-not-found-to">
      <div className="flex flex-col justify-center items-center h-full text-center gap-6 text-muted">
        <div className="flex flex-col items-center gap-4">
          <h1 className={TITLE_CLASS}>404</h1>
          <h2 className={HEADING_CLASS}>Oops! Page not found</h2>
          <p className={MESSAGE_CLASS}>
            The page you&apos;re looking for seems to have wandered off into the
            holiday spirit.
            <br />
            Let&apos;s get you back to celebrating!
          </p>
        </div>

        <div className="flex flex-col items-center gap-4">
          <p className="text-base text-muted mb-2">
            Try one of these festive destinations:
          </p>

          <div className="flex flex-col items-center gap-3">
            {getAllHolidaySlugs().map(slug => {
              const holiday = getHolidayBySlugSafe(slug);
              const IconComponent = HOLIDAY_ICONS[holiday.iconName];

              return (
                <Link
                  key={slug}
                  href={getHolidayPath(holiday)}
                  className={LINK_CLASS}
                  style={holidayButtonVars(holiday.theme)}
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
