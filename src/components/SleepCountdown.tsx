import { minDesktop, minTablet } from '@/styles/mediaQueries';
import dayjs from 'dayjs';
import styled from 'styled-components';

const CountDown = styled.div`
  margin: 0;
  padding: 0;
  position: absolute;
  transform: translate(50%, -50%);
  right: 50%;
  text-align: center;
  top: 50%;
  z-index: 1000;
  width: 100%;
`;

const StyledH1 = styled.h1`
  font-size: 100px;
  margin: 0;

  @media ${minTablet} {
    font-size: 150px;
  }

  @media ${minDesktop} {
    font-size: 150px;
  }
`;

const StyledH2 = styled.h2`
  font-size: 30px;
  margin: 0;
  width: 100%;

  @media ${minTablet} {
    font-size: 40px;
  }

  @media ${minDesktop} {
  }
`;

interface SleepCountdownProps {
  holiday?: {
    month: number;
    day: number;
    message: string;
    name: string;
  };
}

export function SleepCountdown({
  holiday = {
    month: 12,
    day: 25,
    message: 'Merry Christmas!',
    name: 'christmas',
  },
}: SleepCountdownProps) {
  const { month, day, message, name } = holiday;
  const today = dayjs();
  const currentYear = dayjs().year();
  const christmasThisYear = `${currentYear}-${month}-${day}`;
  const christmasNextYear = `${currentYear + 1}-${month}-${day}`;

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
        <StyledH1>{message}</StyledH1>
      ) : (
        <>
          <StyledH1>{sleepsTilChristmas}</StyledH1>
          <StyledH2>
            sleep{sleepsTilChristmas > 1 && 's'} &apos;til {name}
          </StyledH2>
        </>
      )}
    </CountDown>
  );
}
