'use client';

import { memo } from 'react';
import { SafePageContainer } from '@/components/layout/SafePageContainer';
import { CenteredContainer, FlexContainer } from '@/components/ui/Container';
import { Heading, Text } from '@/components/ui/Typography';
import { ButtonLink } from '@/components/ui/Button';
import { tokens } from '@/lib/themes/tokens';

export const NotFoundPage = memo(function NotFoundPage() {
  return (
    <SafePageContainer background="#ffffff">
      <CenteredContainer height="100%" padding="3xl" flexDirection="column">
        <Heading
          size="5xl"
          color="#000000"
          align="center"
          margin={`0 0 ${tokens.spacing.lg} 0`}
        >
          404 | This page is not found.
        </Heading>

        <Text
          size="xl"
          color="#000000"
          align="center"
          margin={`0 0 ${tokens.spacing.xl} 0`}
        >
          You can try one of these alternative pages:
        </Text>

        <FlexContainer flexDirection="column" gap="md" alignItems="center">
          <ButtonLink href="/" variant="secondary" size="lg">
            Christmas
          </ButtonLink>
          <ButtonLink href="/valentines-day" variant="secondary" size="lg">
            Valentine's Day
          </ButtonLink>
          <ButtonLink href="/halloween" variant="secondary" size="lg">
            Halloween
          </ButtonLink>
        </FlexContainer>
      </CenteredContainer>
    </SafePageContainer>
  );
});
