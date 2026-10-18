'use client';

import { useMemo } from 'react';
import Particles, { useParticlesProvider } from '@tsparticles/react';

import { buildParticleOptions } from '@/lib/particleConfigs';

import type { JSX } from 'react';
import type { HolidayTheme } from '@/lib/holidayTheme';

/** Full-bleed layer shared by the particle canvas and its placeholder. */
export const PARTICLE_LAYER_CLASS = 'absolute inset-0 z-1';

interface ParticlesLayerProps {
  theme: HolidayTheme;
}

/**
 * Renders the themed particles once the shared tsparticles engine (provided
 * by the parent `ParticlesProvider`) has finished loading. Shows a
 * placeholder in the meantime to avoid a layout shift.
 *
 * @param props - the holiday theme to render particles for
 */
export function ParticlesLayer({ theme }: ParticlesLayerProps): JSX.Element {
  const { loaded } = useParticlesProvider();
  const options = useMemo(() => buildParticleOptions(theme), [theme]);

  if (!loaded) {
    return <div className={PARTICLE_LAYER_CLASS} />;
  }

  return (
    <Particles
      id={`particles-${theme}`}
      className={PARTICLE_LAYER_CLASS}
      options={options}
    />
  );
}
