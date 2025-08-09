import styled from 'styled-components';
import { Typography, Flex } from 'antd';
import { minTablet } from '@/styles/mediaQueries';

const { Title } = Typography;

/**
 * Styled components for Holiday Countdown
 *
 * Uses our centralized media query tokens for consistency
 * across the codebase.
 */

export const Container = styled(Flex)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  text-align: center;
  z-index: 10;
`;

export const CountdownNumber = styled(Title)`
  font-size: 96px !important;
  line-height: 1 !important;
  margin: 0 !important;

  @media ${minTablet} {
    font-size: 128px !important;
  }
`;

export const CountdownNumberLarge = styled(Title)`
  font-size: 128px !important;
  line-height: 1 !important;
  margin: 0 !important;

  @media ${minTablet} {
    font-size: 150px !important;
  }
`;

export const CountdownLabel = styled(Title)`
  font-size: 36px !important;
  line-height: 1.2 !important;
  margin: 0 !important;
  font-weight: 600 !important;

  @media ${minTablet} {
    font-size: 48px !important;
  }
`;

export const HolidayMessage = styled(Title)`
  font-size: 48px !important;
  line-height: 1 !important;
  margin: 0 !important;

  @media ${minTablet} {
    font-size: 72px !important;
  }
`;
