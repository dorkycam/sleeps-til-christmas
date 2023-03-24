import { PageContainer } from '@/components/PageContainer';
import { STCParticles } from '@/components/particles/STCParticles';
import { SleepCountdown } from '@/components/SleepCountdown';
import Aliyor from '../../../public/aliyor.png';
import Head from 'next/head';

export default function AliyorsBirthdayPage() {
  return (
    <>
      <Head>
        <title>Sleeps &apos;til Aliyor&apos;s Birthday</title>
      </Head>
      <main>
        <PageContainer>
          <SleepCountdown
            holiday={{
              month: 10,
              day: 31,
              message: 'Happy Birthday Aliyor!',
              name: "aliyor's birthday",
            }}
          />
          <STCParticles
            options={{
              autoPlay: true,
              background: {
                color: {
                  value: '#0dc700',
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
                  direction: 'none',
                  enable: true,
                  collisions: true,
                  bounce: true,
                  outModes: {
                    default: 'bounce',
                  },
                  speed: 4,
                },
                number: {
                  density: {
                    enable: true,
                    area: 800,
                  },
                  value: 30,
                },
                opacity: {
                  value: 1,
                },
                shape: {
                  type: 'image',
                  image: { src: Aliyor.src, height: 225, width: 170 },
                },
                size: {
                  value: { min: 10, max: 50 },
                },
              },
              detectRetina: true,
            }}
          />
        </PageContainer>
      </main>
    </>
  );
}
