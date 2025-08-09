'use client';

import { HolidayTheme, holidayThemes } from '@/lib/themes/tokens';
// Removed ClientOnly - using 'use client' directive for proper client-side rendering
import Particles, {
  initParticlesEngine,
  IParticlesProps,
} from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import React, { memo, useCallback, useEffect, useState } from 'react';

// Inline styles to prevent hydration mismatches
// Using CSS-in-JS objects ensures identical styling on server and client
const particleStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
};

const placeholderStyle: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 1,
};

/**
 * Configuration interface for particle system
 * Defines all customizable aspects of particle behavior
 */
interface ParticleConfig {
  count: number; // Number of particles to render
  speed: number; // Movement speed of particles
  size: { min: number; max: number }; // Size range for particles
  shape: 'circle' | 'image'; // Particle shape type
  direction?: 'none' | 'bottom' | 'top'; // Movement direction
  bounce?: boolean; // Whether particles bounce off edges
  onClick?: 'repulse' | 'attract' | 'push'; // Click interaction
  onHover?: 'repulse' | 'attract' | 'grab'; // Hover interaction
}

/**
 * Holiday-specific particle configurations
 * Each theme has unique particle behavior to match the holiday mood
 */
const particleConfigs: Record<HolidayTheme, ParticleConfig> = {
  christmas: {
    count: 80, // Many particles for snow effect
    speed: 4, // Gentle falling speed
    size: { min: 1, max: 6 }, // Small snowflakes
    shape: 'circle', // Round snowflakes
    direction: 'bottom', // Falling snow
    onClick: 'repulse', // Push away on click
    onHover: 'repulse', // Push away on hover
  },
  halloween: {
    count: 30, // Fewer particles for spooky feel
    speed: 4, // Medium movement
    size: { min: 10, max: 50 }, // Large pumpkin shapes
    shape: 'image', // Custom pumpkin images
    direction: 'none', // Random floating
    bounce: true, // Bounce off walls
    onClick: 'repulse', // Push away on click
    onHover: 'repulse', // Push away on hover
  },
  valentines: {
    count: 80, // Many hearts for romantic feel
    speed: 4, // Gentle movement
    size: { min: 4, max: 10 }, // Small to medium hearts
    shape: 'image', // Heart shapes
    direction: 'none', // Floating hearts
    onClick: 'repulse', // Push away on click
    onHover: 'attract', // Draw towards cursor (romantic)
  },
  default: {
    count: 50, // Moderate particle count
    speed: 2, // Slow movement
    size: { min: 2, max: 8 }, // Small particles
    shape: 'circle', // Simple circles
    direction: 'none', // Random movement
    onClick: 'repulse', // Push away on click
    onHover: 'repulse', // Push away on hover
  },
};

interface ParticleBackgroundProps {
  theme: HolidayTheme;
  className?: string;
}

/**
 * Internal particle component that handles initialization
 * Separated from main component to ensure proper client-side rendering
 */
function ParticleBackgroundInner({ theme }: ParticleBackgroundProps) {
  // Track particle engine initialization state
  const [init, setInit] = useState(false);
  // Track client-side mounting to prevent SSR issues
  const [mounted, setMounted] = useState(false);

  // Set mounted flag after component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize particle engine only after mounting
  useEffect(() => {
    if (!mounted) return;

    const initEngine = async () => {
      try {
        // Initialize particles engine with slim bundle (smaller size)
        await initParticlesEngine(async engine => {
          await loadSlim(engine);
        });
        setInit(true);
      } catch (error) {
        console.error('Failed to initialize particles:', error);
      }
    };

    initEngine();
  }, [mounted]);

  // Callback when particles are loaded (can add custom logic here)
  const particlesLoaded = useCallback(async () => {
    // Optional: Add any initialization logic here
  }, []);

  // Show placeholder while not mounted (prevents hydration mismatch)
  if (!mounted) {
    return <div style={placeholderStyle} />;
  }

  // Show placeholder while particle engine initializes
  if (!init) {
    return <div style={placeholderStyle} />;
  }

  // Get configuration and colors for the specified theme
  const config = particleConfigs[theme];
  const colors = holidayThemes[theme];

  // Build particle configuration object
  const particleOptions: IParticlesProps['options'] = {
    autoPlay: true,
    background: {
      color: {
        value: colors.background,
      },
    },
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

/**
 * Main ParticleBackground component
 *
 * Renders themed particle animations with proper hydration safety.
 * Uses 'use client' directive for proper client-side rendering.
 *
 * @param theme - Holiday theme that determines particle behavior and colors
 */
export const ParticleBackground = memo(function ParticleBackground(
  props: ParticleBackgroundProps,
) {
  return <ParticleBackgroundInner {...props} />;
});
