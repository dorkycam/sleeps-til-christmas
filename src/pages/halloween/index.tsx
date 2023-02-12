import { InteractivePumpkins } from '@/components/particles/InteractivePumpkins';
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
        <title>Sleeps &apos;til Halloween</title>
      </Head>
      <main>
        <Container>
          <SleepCountdown
            holiday={{
              month: 10,
              day: 31,
              message: 'Happy Halloween!',
              name: 'halloween',
            }}
          />
          <InteractivePumpkins />
        </Container>
      </main>
    </>
  );
}
