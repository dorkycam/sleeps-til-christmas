import type { HolidayTheme } from '@/lib/themes/tokens';

/** Fields shared by every particle configuration, regardless of shape. */
interface BaseParticleConfig {
  count: number; // Number of particles to render
  speed: number; // Movement speed of particles
  size: { min: number; max: number }; // Size range for particles
  direction?: 'none' | 'bottom' | 'top'; // Movement direction
  bounce?: boolean; // Whether particles bounce off edges
  onClick?: 'repulse' | 'attract' | 'push'; // Click interaction
  onHover?: 'repulse' | 'attract' | 'grab'; // Hover interaction
}

/** Circle-shaped particles (snow, fireworks, confetti). */
interface CircleParticleConfig extends BaseParticleConfig {
  shape: 'circle';
}

/** Image-shaped particles; `image` is required for this variant. */
interface ImageParticleConfig extends BaseParticleConfig {
  shape: 'image';
  image: { src: string; width: number; height: number }[];
}

/**
 * Discriminated on `shape` so an `image` config cannot omit its images and a
 * `circle` config cannot smuggle one in.
 */
export type ParticleConfig = CircleParticleConfig | ImageParticleConfig;

/**
 * Holiday-specific particle configurations
 * Each theme has unique particle behavior to match the holiday mood
 */
export const particleConfigs: Record<HolidayTheme, ParticleConfig> = {
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
    shape: 'image', // Custom images
    image: [
      { src: '/images/ghost.png', width: 32, height: 32 },
      { src: '/images/pumpkin.png', width: 32, height: 32 },
      { src: '/images/witch.png', width: 32, height: 32 },
    ],
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
    image: [
      {
        // Inline pink heart SVG (no external asset needed).
        src: "data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2032%2032'%3E%3Cpath%20fill='%23ff69b4'%20d='M23.6%202c-3.4%200-6.3%202.7-7.6%205.6C14.7%204.7%2011.8%202%208.4%202%203.8%202%200%205.8%200%2010.4c0%209%2016%2020%2016%2020s16-11%2016-20C32%205.8%2028.2%202%2023.6%202z'/%3E%3C/svg%3E",
        width: 32,
        height: 32,
      },
    ],
    direction: 'none', // Floating hearts
    onClick: 'repulse', // Push away on click
    onHover: 'attract', // Draw towards cursor (romantic)
  },
  newyear: {
    count: 50, // Moderate particle count
    speed: 3, // Moderate speed
    size: { min: 2, max: 8 }, // Small fireworks
    shape: 'circle', // Round fireworks
    direction: 'none', // Random movement
    onClick: 'repulse', // Push away on click
    onHover: 'repulse', // Push away on hover
  },
  birthday: {
    count: 50, // Many particles for festive feel
    speed: 5, // Fast movement
    size: { min: 2, max: 10 }, // Small to medium confetti
    shape: 'circle', // Round confetti shapes
    direction: 'none', // Random floating
    onClick: 'push', // Push away on click
    onHover: 'attract', // Push away on hover
  },
  /**
   * Default configuration for unrecognized themes
   * Provides a clean, neutral particle effect.
   */
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
