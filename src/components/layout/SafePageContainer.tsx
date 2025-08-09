import { ReactNode } from 'react';
import { Layout } from 'antd';

const { Content } = Layout;

interface SafePageContainerProps {
  children: ReactNode;
  background?: string;
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
    >
      {children}
    </Content>
  );
}
