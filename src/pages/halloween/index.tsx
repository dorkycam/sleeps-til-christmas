import { PageContainer } from '@/components/PageContainer';
import { InteractivePumpkins } from '@/components/particles/InteractivePumpkins';
import { SleepCountdown } from '@/components/SleepCountdown';
import Head from 'next/head';

export default function HalloweenPage() {
  return (
    <>
      <Head>
        <title>Sleeps &apos;til Halloween</title>
      </Head>
      <main>
        <PageContainer>
          <SleepCountdown
            holiday={{
              month: 10,
              day: 31,
              message: 'Happy Halloween!',
              name: 'halloween',
            }}
          />
          <InteractivePumpkins />
        </PageContainer>
      </main>
    </>
  );
}
