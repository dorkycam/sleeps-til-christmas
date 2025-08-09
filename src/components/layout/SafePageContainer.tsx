'use client';

import { ReactNode } from 'react';
import { useClientOnly, useSafeWindow } from '@/lib/utils/client-only';
import { PageWrapper } from '@/components/ui/Container';

interface SafePageContainerProps {
  children: ReactNode;
  background?: string;
}

/**
 * A page container that safely handles window dimensions
 * and prevents hydration mismatches
 */
export function SafePageContainer({
  children,
  background,
}: SafePageContainerProps) {
  const isClient = useClientOnly();
  const window = useSafeWindow();

  // Use actual window height if available, otherwise fallback to 100vh
  const height = isClient && window ? `${window.innerHeight}px` : '100vh';

  return (
    <PageWrapper
      height={height}
      background={background}
      position="relative"
      overflow="hidden"
    >
      {children}
    </PageWrapper>
  );
}
