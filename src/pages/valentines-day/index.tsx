import { InteractiveHearts } from '@/components/particles/InteractiveHearts';
import { SleepCountdown } from '@/components/SleepCountdown';
import Head from 'next/head';
import styled from 'styled-components';

const Container = styled.div`
  margin: 0;
  position: relative;
  min-width: 100%;
  height: 100%;
`;

export default function ValentinesDayPage() {
  return (
    <>
      <Head>
        <title>Sleeps &apos;til Valentine&apos;s Day</title>
      </Head>
      <main>
        <Container>
          <SleepCountdown
            holiday={{
              month: 2,
              day: 14,
              message: "Happy Valentine's Day!",
              name: "valentine's day",
            }}
          />
          <InteractiveHearts />
        </Container>
      </main>
    </>
  );
}
