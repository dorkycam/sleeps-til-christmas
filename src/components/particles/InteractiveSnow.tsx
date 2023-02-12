import { STCParticles } from './STCParticles';

export function InteractiveSnow() {
  return (
    <STCParticles
      options={{
        autoPlay: true,
        background: {
          color: {
            value: '#add8e6',
          },
        },
        fpsLimit: 120,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: 'repulse',
            },
            onHover: {
              enable: true,
              mode: 'repulse',
            },
            resize: true,
          },
          modes: {
            push: {
              quantity: 4,
            },
            repulse: {
              distance: 200,
              duration: 0.4,
            },
          },
        },
        particles: {
          color: {
            value: '#ffffff',
          },
          move: {
            direction: 'bottom',
            enable: true,
            outModes: {
              default: 'out',
            },
            speed: 4,
          },
          number: {
            density: {
              enable: true,
              area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'circle',
          },
          size: {
            value: { min: 1, max: 6 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
