import { describe, expect, it } from 'vitest';

import { holidayThemes } from './holidayTheme';
import { buildParticleOptions } from './particleConfigs';

describe('buildParticleOptions', () => {
  it('colors particles with the theme secondary color', () => {
    const options = buildParticleOptions('christmas');
    expect(options.particles?.color).toEqual({
      value: holidayThemes.christmas.secondary,
    });
  });

  it('uses full opacity for halloween and the default elsewhere', () => {
    expect(buildParticleOptions('halloween').particles?.opacity).toEqual({
      value: 1,
    });
    expect(buildParticleOptions('christmas').particles?.opacity).toEqual({
      value: 0.5,
    });
  });

  it('passes image options only for image-shaped configs', () => {
    const halloween = buildParticleOptions('halloween').particles?.shape;
    const christmas = buildParticleOptions('christmas').particles?.shape;
    expect(halloween?.type).toBe('image');
    expect(halloween?.options).toBeDefined();
    expect(christmas?.options).toBeUndefined();
  });
});
