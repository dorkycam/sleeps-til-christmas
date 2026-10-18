'use client';

import { ParticlesProvider } from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';

import { useMounted } from '@/lib/useMounted';

import { PARTICLE_LAYER_CLASS, ParticlesLayer } from './ParticlesLayer';

import type { JSX } from 'react';
import type { Engine } from '@tsparticles/engine';
import type { HolidayTheme } from '@/lib/holidayTheme';

interface ParticleBackgroundProps {
  theme: HolidayTheme;
}

/**
 * Registers the slim tsparticles bundle with the engine.
 *
 * Defined at module scope so the reference stays stable across renders,
 * since `ParticlesProvider` requires its `init` callback to be stable.
 */
async function initEngine(engine: Engine): Promise<void> {
  await loadSlim(engine);
}

/**
 * Themed particle animation behind the page content. Renders a placeholder
 * on the server and during hydration, then mounts the particle engine.
 *
 * @param props - holiday theme that sets particle behavior and colors
 */
export function ParticleBackground({
  theme,
}: ParticleBackgroundProps): JSX.Element {
  const isMounted = useMounted();

  if (!isMounted) {
    return <div className={PARTICLE_LAYER_CLASS} />;
  }

  return (
    <ParticlesProvider init={initEngine}>
      <ParticlesLayer theme={theme} />
    </ParticlesProvider>
  );
}
