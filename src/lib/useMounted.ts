import { useSyncExternalStore } from 'react';

function subscribeNoop(): () => void {
  return () => {};
}

/**
 * Reports whether the component has hydrated on the client.
 *
 * Uses `useSyncExternalStore` so React resolves the server/client snapshot
 * mismatch itself instead of a `setState` inside an effect.
 *
 * @returns false on the server and during hydration, true afterwards
 */
export function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}
