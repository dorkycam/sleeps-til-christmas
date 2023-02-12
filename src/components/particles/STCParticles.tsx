import { useCallback } from 'react';
import Particles, { ParticlesProps } from 'react-tsparticles';
import styled from 'styled-components';
import { loadFull } from 'tsparticles';
import type { Container, Engine } from 'tsparticles-engine';

const StyledParticles = styled(Particles)`
  height: 100vh;
  width: 100vw;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
`;

export function STCParticles({
  ...props
}: Omit<ParticlesProps, 'id' | 'init' | 'loaded'>) {
  const particlesInit = useCallback(async (engine: Engine) => {
    console.log(engine);

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log(container);
    },
    [],
  );

  return (
    <StyledParticles
      id="tsparticles"
      init={particlesInit}
      loaded={particlesLoaded}
      {...props}
    />
  );
}
