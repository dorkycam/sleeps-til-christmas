import { Container } from '@tsparticles/engine';
import Particles, {
  initParticlesEngine,
  IParticlesProps,
} from '@tsparticles/react';
import { loadSlim } from '@tsparticles/slim';
import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';

const StyledParticles = styled(Particles)`
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
`;

export function STCParticles({
  ...props
}: Omit<IParticlesProps, 'id' | 'init' | 'loaded'>) {
  const [init, setInit] = useState(false);

  // this should be run only once per application lifetime
  useEffect(() => {
    initParticlesEngine(async engine => {
      // you can initiate the tsParticles instance (engine) here, adding custom shapes or presets
      // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
      // starting from v2 you can add only the features you need reducing the bundle size
      //await loadAll(engine);
      //await loadFull(engine);
      await loadSlim(engine);
      //await loadBasic(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = useCallback(async (container?: Container) => {
    console.log(container);
  }, []);

  return (
    <StyledParticles
      id="tsparticles"
      particlesLoaded={particlesLoaded}
      {...props}
    />
  );
}
