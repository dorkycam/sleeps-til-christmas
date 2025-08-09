import { STCParticles } from './STCParticles';

export function InteractivePumpkins() {
  return (
    <STCParticles
      options={{
        autoPlay: true,
        background: {
          color: {
            value: '#000000',
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
            // resize: true,
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
            direction: 'none',
            enable: true,
            // collisions: true,
            // bounce: true,
            outModes: {
              default: 'bounce',
            },
            speed: 4,
          },
          number: {
            density: {
              enable: true,
              // area: 800,
            },
            value: 30,
          },
          opacity: {
            value: 1,
          },
          shape: {
            type: 'image',
            // image: {
            //   src: 'https://www.pngplay.com/wp-content/uploads/13/Pumpkin-Clipart-Download-Free-PNG.png',
            // },
          },
          size: {
            value: { min: 10, max: 50 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
