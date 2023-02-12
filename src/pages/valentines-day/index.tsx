import { PageContainer } from '@/components/PageContainer';
import { InteractiveHearts } from '@/components/particles/InteractiveHearts';
import { SleepCountdown } from '@/components/SleepCountdown';
import Head from 'next/head';

export default function ValentinesDayPage() {
  return (
    <>
      <Head>
        <title>Sleeps &apos;til Valentine&apos;s Day</title>
      </Head>
      <main>
        <PageContainer>
          <SleepCountdown
            holiday={{
              month: 2,
              day: 14,
              message: "Happy Valentine's Day!",
              name: "valentine's day",
            }}
          />
          <InteractiveHearts />
        </PageContainer>
      </main>
    </>
  );
}
