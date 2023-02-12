import { useWindowSize } from '@/hooks/useWindowSize';
import { ReactNode } from 'react';
import styled from 'styled-components';

const Container = styled.div<{ $height?: number }>`
  margin: 0;
  position: relative;
  min-width: 100%;
  min-height: ${props =>
    props.$height != null ? `${props.$height}px` : 'fill-available'};
  overflow-y: hidden;
`;

interface PageContainerProps {
  children: ReactNode;
}

export function PageContainer({ children }: PageContainerProps) {
  const { height } = useWindowSize();

  return <Container $height={height}>{children}</Container>;
}
