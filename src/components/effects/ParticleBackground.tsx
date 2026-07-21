'use client';

import React, { memo, useSyncExternalStore } from 'react';
import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import type { HolidayTheme } from '@/lib/themes/tokens';
import type { Engine } from '@tsparticles/engine';

import { ParticlesLayer, placeholderStyle } from './ParticlesLayer';

interface ParticleBackgroundProps {
  theme: HolidayTheme;
  className?: string;
}

/**
 * Registers the slim tsparticles bundle with the engine.
 *
 * Defined at module scope (rather than inline in a render) so the reference
 * stays stable across renders, since `ParticlesProvider` requires its `init`
 * callback to be stable across the app lifecycle.
 */
async function initEngine(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

function subscribeNoop(): () => void {
  return () => {};
}

/**
 * Reports whether the component has hydrated on the client.
 *
 * Uses `useSyncExternalStore` (rather than `useState` + `useEffect`) so the
 * client/server snapshot mismatch is resolved by React itself instead of by
 * synchronously calling `setState` inside an effect, which can trigger
 * cascading renders.
 */
function useMounted(): boolean {
  return useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false,
  );
}

/**
 * Internal particle component that handles initialization
 * Separated from main component to ensure proper client-side rendering
 */
function ParticleBackgroundInner({
  theme,
}: ParticleBackgroundProps): React.JSX.Element {
  // Track client-side mounting to prevent SSR issues
  const mounted = useMounted();

  // Show placeholder while not mounted (prevents hydration mismatch)
  if (!mounted) {
    return <div style={placeholderStyle} />;
  }

  return (
    <ParticlesProvider init={initEngine}>
      <ParticlesLayer theme={theme} />
    </ParticlesProvider>
  );
}

/**
 * Main ParticleBackground component
 *
 * Renders themed particle animations with proper hydration safety.
 *
 * @param theme - Holiday theme that determines particle behavior and colors
 */
export const ParticleBackground = memo(function ParticleBackground(
  props: ParticleBackgroundProps,
): React.JSX.Element {
  return <ParticleBackgroundInner {...props} />;
});
