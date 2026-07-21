'use client';

import React, { useCallback } from 'react';
import Particles, {
  IParticlesProps,
  useParticlesProvider,
} from '@tsparticles/react';

import { holidayThemes, type HolidayTheme } from '@/lib/themes/tokens';

import { particleConfigs } from './particleConfigs';

// Inline styles to prevent hydration mismatches.
// Using CSS-in-JS objects ensures identical styling on server and client.
const particleStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
};

/** Full-bleed placeholder shown while the particle engine initializes. */
export const placeholderStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
};

/**
 * Renders the themed particles once the shared tsparticles engine (provided
 * by the parent `ParticlesProvider`) has finished loading. Shows a
 * placeholder in the meantime to avoid a layout shift.
 *
 * @param props - the holiday theme to render particles for
 */
export function ParticlesLayer({
  theme,
}: {
  theme: HolidayTheme;
}): React.JSX.Element {
  const { loaded } = useParticlesProvider();

  const particlesLoaded = useCallback(async () => {
    // Optional: add any post-load initialization logic here.
  }, []);

  // Show placeholder while particle engine initializes
  if (!loaded) {
    return <div style={placeholderStyle} />;
  }

  const config = particleConfigs[theme];
  const colors = holidayThemes[theme];

  const particleOptions: IParticlesProps['options'] = {
    autoPlay: true,
    fpsLimit: 120,
    interactivity: {
      events: {
        onClick: config.onClick
          ? {
              enable: true,
              mode: config.onClick,
            }
          : { enable: false },
        onHover: config.onHover
          ? {
              enable: true,
              mode: config.onHover,
            }
          : { enable: false },
      },
      modes: {
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        attract: {
          distance: 200,
          duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: colors.secondary,
      },

      move: {
        direction: config.direction || 'none',
        enable: true,
        outModes: {
          default: config.bounce ? 'bounce' : 'out',
        },
        speed: config.speed,
      },
      number: {
        density: {
          enable: true,
        },
        value: config.count,
      },
      opacity: {
        value: theme === 'halloween' ? 1 : 0.5,
      },
      shape: {
        type: config.shape,
        options:
          config.shape === 'image'
            ? {
                image: config.image,
              }
            : undefined,
      },
      size: {
        value: config.size,
      },
    },
    detectRetina: true,
  };

  return (
    <Particles
      id={`particles-${theme}`}
      style={particleStyle}
      options={particleOptions}
      particlesLoaded={particlesLoaded}
    />
  );
}
