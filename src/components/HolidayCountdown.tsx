'use client';

import { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import { calculateHolidayCountdown, getCountdownLabel } from '@/lib/countdown';
import { useMounted } from '@/lib/useMounted';

import type { JSX } from 'react';
import type { CountdownResult } from '@/lib/countdown';
import type { Holiday } from '@/lib/holidays';

interface HolidayCountdownProps {
  holiday: Holiday;
}

const CONTAINER_CLASS =
  'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center z-10 flex flex-col items-center justify-center text-[var(--holiday-text)]';
const MESSAGE_CLASS =
  'text-5xl leading-none m-0 font-bold min-[451px]:text-7xl';
const NUMBER_CLASS =
  'text-9xl leading-none m-0 font-bold min-[451px]:text-10xl';
const LABEL_CLASS =
  'text-4xl leading-[1.2] m-0 font-semibold min-[451px]:text-5xl';

/**
 * Displays a countdown to a holiday that ticks over at local midnight.
 * Text color comes from the `--holiday-text` variable set on the page root.
 *
 * The count depends on the visitor's local date, so it only renders after
 * hydration. The server (UTC, cached HTML) would otherwise disagree with the
 * browser around midnight.
 *
 * @param props - holiday to count down to
 */
export function HolidayCountdown({
  holiday,
}: HolidayCountdownProps): JSX.Element {
  const isMounted = useMounted();
  const [countdown, setCountdown] = useState<CountdownResult>(() =>
    calculateHolidayCountdown(holiday),
  );

  useEffect(() => {
    const updateCountdown = (): void => {
      setCountdown(calculateHolidayCountdown(holiday));
    };

    // Re-arm a timeout for each upcoming midnight so the count ticks over at
    // the day boundary. A single handle is tracked so cleanup always clears
    // whichever timer is pending.
    let timeout: ReturnType<typeof setTimeout>;
    const scheduleNextMidnight = (): void => {
      const now = dayjs();
      const msUntilMidnight = now.add(1, 'day').startOf('day').diff(now);
      timeout = setTimeout(() => {
        updateCountdown();
        scheduleNextMidnight();
      }, msUntilMidnight);
    };

    updateCountdown();
    scheduleNextMidnight();

    return () => clearTimeout(timeout);
  }, [holiday]);

  if (!isMounted) {
    return <div className={CONTAINER_CLASS} />;
  }

  if (countdown.isToday) {
    return (
      <div className={CONTAINER_CLASS}>
        <h1 className={MESSAGE_CLASS}>{holiday.message}</h1>
      </div>
    );
  }

  return (
    <div className={CONTAINER_CLASS}>
      <h1 className={NUMBER_CLASS}>{countdown.sleepsUntil}</h1>
      <h2 className={LABEL_CLASS}>{getCountdownLabel(holiday, countdown)}</h2>
    </div>
  );
}
