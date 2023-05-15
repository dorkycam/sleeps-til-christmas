import { ReactNode } from 'react';
import styled from 'styled-components';
import { SiteDropdownMenu } from './SiteDropdownMenu';

const Container = styled.div``;

interface SiteLayoutProps {
  children?: ReactNode | ReactNode[];
}

export function SiteLayout({ children }: SiteLayoutProps): JSX.Element {
  return (
    <Container>
      {children}
      <SiteDropdownMenu />
    </Container>
  );
}
