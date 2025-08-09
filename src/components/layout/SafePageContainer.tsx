'use client';

import { Layout } from 'antd';
import { ReactNode } from 'react';
import styled from 'styled-components';

const { Content, Footer } = Layout;

const StyledFooter = styled(Footer)`
  background: transparent;
  bottom: 0;
  left: 0;
  padding: 25px;
  position: fixed;
  right: 0;
  text-align: center;
  z-index: 1000;
`;
interface SafePageContainerProps {
  children: ReactNode;
  background?: string;
  footerContent?: ReactNode;
  onDoubleClick?: () => void;
}

/**
 * Simple page container following Next.js best practices
 *
 * Uses inline styles to avoid hydration mismatches with styled-components.
 * Responsive design handled by CSS custom properties.
 */
export function SafePageContainer({
  children,
  background,
  footerContent,
  onDoubleClick,
}: SafePageContainerProps) {
  return (
    <Content
      style={{
        minHeight: '100vh',
        height: '100vh',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        padding: 'clamp(16px, 4vw, 32px)',
        boxSizing: 'border-box',
        background: background || 'transparent',
      }}
      onDoubleClick={onDoubleClick}
    >
      {children}
      {footerContent && <StyledFooter>{footerContent}</StyledFooter>}
    </Content>
  );
}
