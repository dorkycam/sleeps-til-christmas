'use client';

import { useEffect, useState } from 'react';

/**
 * Higher-order component that prevents hydration mismatches
 *
 * Ensures children only render after client-side mounting.
 * Server renders the fallback, client renders the same fallback initially,
 * then switches to children after hydration is complete.
 *
 * @param children - Components that require client-side features
 * @param fallback - Content to show during server rendering and initial hydration
 */
export function ClientOnly({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  // Track if component has mounted on client side
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    // Set mounted to true after component mounts on client
    // This happens after hydration is complete
    setHasMounted(true);
  }, []);

  // Show fallback during server rendering and initial client render
  if (!hasMounted) {
    return <>{fallback}</>;
  }

  // Show actual children only after client has mounted
  return <>{children}</>;
}

/**
 * Hook that safely detects client-side rendering
 *
 * Returns false during server rendering and initial hydration,
 * then true after component has mounted on client.
 *
 * @returns boolean indicating if code is running on client
 */
export function useClientOnly() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Only runs on client after hydration
    setIsClient(true);
  }, []);

  return isClient;
}

/**
 * Hook for safe window object access
 *
 * Returns undefined during server rendering to prevent errors.
 * Returns actual window object after client-side mounting.
 *
 * @returns Window object or undefined
 */
export function useSafeWindow() {
  const [windowObj, setWindowObj] = useState<Window | undefined>(undefined);

  useEffect(() => {
    // Safely assign window object after mounting
    setWindowObj(window);
  }, []);

  return windowObj;
}
