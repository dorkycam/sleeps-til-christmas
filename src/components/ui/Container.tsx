'use client';

import styled from 'styled-components';
import { tokens } from '@/lib/themes/tokens';

interface ContainerProps {
  padding?: keyof typeof tokens.spacing | string;
  margin?: keyof typeof tokens.spacing | string;
  background?: string;
  height?: string;
  width?: string;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  display?: 'block' | 'flex' | 'grid' | 'inline' | 'inline-block';
  alignItems?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justifyContent?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around';
  flexDirection?: 'row' | 'column';
  gap?: keyof typeof tokens.spacing;
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  zIndex?: keyof typeof tokens.zIndex | number;
  textAlign?: 'left' | 'center' | 'right';
}

export const Container = styled.div<ContainerProps>`
  padding: ${props => {
    if (!props.padding) return '0';
    return props.padding in tokens.spacing
      ? tokens.spacing[props.padding as keyof typeof tokens.spacing]
      : props.padding;
  }};

  margin: ${props => {
    if (!props.margin) return '0';
    return props.margin in tokens.spacing
      ? tokens.spacing[props.margin as keyof typeof tokens.spacing]
      : props.margin;
  }};

  background: ${props => props.background || 'transparent'};
  height: ${props => props.height || 'auto'};
  width: ${props => props.width || 'auto'};
  position: ${props => props.position || 'static'};
  display: ${props => props.display || 'block'};
  align-items: ${props => props.alignItems || 'stretch'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  flex-direction: ${props => props.flexDirection || 'row'};
  gap: ${props => (props.gap ? tokens.spacing[props.gap] : '0')};
  overflow: ${props => props.overflow || 'visible'};
  text-align: ${props => props.textAlign || 'left'};

  z-index: ${props => {
    if (!props.zIndex) return 'auto';
    return typeof props.zIndex === 'number'
      ? props.zIndex
      : tokens.zIndex[props.zIndex];
  }};
`;

export const FlexContainer = styled(Container)<ContainerProps>`
  display: flex;
`;

export const CenteredContainer = styled(FlexContainer)<ContainerProps>`
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const PageWrapper = styled(Container)<ContainerProps>`
  min-height: ${props => props.height || '100vh'};
  width: 100%;
  position: relative;
  overflow-y: hidden;
`;

export const ContentOverlay = styled(CenteredContainer)<ContainerProps>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: ${tokens.zIndex.sticky};
  width: 100%;
  flex-direction: column;
  gap: 0;
`;
