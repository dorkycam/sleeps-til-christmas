import { STCParticles } from './STCParticles';

export function InteractiveHearts() {
  return (
    <STCParticles
      options={{
        autoPlay: true,
        background: {
          color: {
            value: '#EBCEDA',
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
              mode: 'attract',
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
              default: 'out',
            },
            speed: 4,
          },
          number: {
            density: {
              enable: true,
              // area: 800,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: 'image',
            // image: {
            //   src: 'https://creazilla-store.fra1.digitaloceanspaces.com/cliparts/77965/pink-heart-clipart-md.png',
            // },
          },
          size: {
            value: { min: 4, max: 10 },
          },
        },
        detectRetina: true,
      }}
    />
  );
}
