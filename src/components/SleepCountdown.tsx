import dayjs from 'dayjs';
import styled from 'styled-components';

const CountDown = styled.h1`
  margin: 0;
  padding: 0;
  position: absolute;
  transform: translate(50%, -50%);
  right: 50%;
  top: 50%;
  z-index: 5;
`;

export function SleepCountdown() {
  const today = dayjs();
  const currentYear = dayjs().year();
  const christmasThisYear = `${currentYear}-12-25`;
  const christmasNextYear = `${currentYear + 1}-12-25`;

  const isBeforeChristmas = today.isBefore(christmasThisYear);
  const isChristmas = today.isSame(christmasThisYear);

  const sleepsTilChristmas =
    dayjs(isBeforeChristmas ? christmasThisYear : christmasNextYear).diff(
      today,
      'day',
    ) + 1;

  return (
    <CountDown>
      {isChristmas ? (
        <>Merry Christmas!</>
      ) : (
        <>
          {sleepsTilChristmas} sleep{sleepsTilChristmas > 1 && 's'} &apos;til
          christmas
        </>
      )}
    </CountDown>
  );
}
