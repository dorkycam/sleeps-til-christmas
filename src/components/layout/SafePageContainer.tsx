'use client';

import React, { ReactNode } from 'react';

interface SafePageContainerProps {
  children: ReactNode;
  background?: string;
  footerContent?: ReactNode;
  onDoubleClick?: () => void;
}

/**
 * Full-viewport page container. Renders a fixed footer when footerContent is
 * provided. Background is applied inline so it can vary per holiday.
 *
 * @param props - container content, background, footer, and double-click handler
 */
export function SafePageContainer({
  children,
  background,
  footerContent,
  onDoubleClick,
}: SafePageContainerProps): React.JSX.Element {
  return (
    <main
      className="relative h-screen min-h-screen w-full overflow-hidden box-border p-[clamp(16px,4vw,32px)]"
      style={{ background: background || 'transparent' }}
      onDoubleClick={onDoubleClick}
    >
      {children}
      {footerContent && (
        <footer className="fixed bottom-0 left-0 right-0 z-[1000] p-[25px] text-center bg-transparent">
          {footerContent}
        </footer>
      )}
    </main>
  );
}
