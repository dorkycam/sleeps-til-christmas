import { useEffect, useMemo, useState } from 'react';
import { useClientOnly } from '@/lib/utils/client-only';

interface WindowSize {
  width: number | undefined;
  height: number | undefined;
}

export function useWindowSize() {
  const isClient = useClientOnly();
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (!isClient) return;

    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Set initial size
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  return useMemo(() => windowSize, [windowSize]);
}
