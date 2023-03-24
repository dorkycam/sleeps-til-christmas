import { PageContainer } from '@/components/PageContainer';
import { InteractiveSnow } from '@/components/particles/InteractiveSnow';
import { SleepCountdown } from '@/components/SleepCountdown';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Sleeps &apos;til Christmas</title>
        <meta
          name="description"
          content="See how many sleeps are left until your favorite holiday!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PageContainer>
          <SleepCountdown />
          <InteractiveSnow />
        </PageContainer>
      </main>
    </>
  );
}
