'use client';

import styled from 'styled-components';
import { tokens } from '@/lib/themes/tokens';

interface TypographyProps {
  size?: keyof typeof tokens.fontSize;
  weight?: keyof typeof tokens.fontWeight;
  color?: string;
  align?: 'left' | 'center' | 'right';
  margin?: string;
  responsive?: {
    sm?: keyof typeof tokens.fontSize;
    md?: keyof typeof tokens.fontSize;
    lg?: keyof typeof tokens.fontSize;
  };
}

const BaseText = styled.div<TypographyProps>`
  font-size: ${props => tokens.fontSize[props.size || 'base']};
  font-weight: ${props => tokens.fontWeight[props.weight || 'normal']};
  color: ${props => props.color || 'inherit'};
  text-align: ${props => props.align || 'left'};
  margin: ${props => props.margin || '0'};

  @media (min-width: ${tokens.breakpoints.sm}) {
    font-size: ${props =>
      props.responsive?.sm ? tokens.fontSize[props.responsive.sm] : undefined};
  }

  @media (min-width: ${tokens.breakpoints.md}) {
    font-size: ${props =>
      props.responsive?.md ? tokens.fontSize[props.responsive.md] : undefined};
  }

  @media (min-width: ${tokens.breakpoints.lg}) {
    font-size: ${props =>
      props.responsive?.lg ? tokens.fontSize[props.responsive.lg] : undefined};
  }
`;

export const Heading = styled(BaseText).attrs({ as: 'h1' })<TypographyProps>`
  font-size: ${props => tokens.fontSize[props.size || '6xl']};
  font-weight: ${props => tokens.fontWeight[props.weight || 'bold']};
`;

export const SubHeading = styled(BaseText).attrs({ as: 'h2' })<TypographyProps>`
  font-size: ${props => tokens.fontSize[props.size || '3xl']};
  font-weight: ${props => tokens.fontWeight[props.weight || 'semibold']};
`;

export const Text = styled(BaseText).attrs({ as: 'p' })<TypographyProps>`
  font-size: ${props => tokens.fontSize[props.size || 'base']};
`;

export const CountdownNumber = styled(Heading)<TypographyProps>`
  font-size: ${props => tokens.fontSize[props.size || '6xl']};

  @media (min-width: ${tokens.breakpoints.md}) {
    font-size: ${props => tokens.fontSize[props.responsive?.md || '10xl']};
  }
`;

export const CountdownLabel = styled(SubHeading)<TypographyProps>`
  font-size: ${props => tokens.fontSize[props.size || '3xl']};
  width: 100%;

  @media (min-width: ${tokens.breakpoints.md}) {
    font-size: ${props => tokens.fontSize[props.responsive?.md || '4xl']};
  }
`;
