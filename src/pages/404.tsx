import { minTablet } from '@/styles/mediaQueries';
import Head from 'next/head';
import Link from 'next/link';
import styled from 'styled-components';

const Container = styled.div`
  background-color: #ffffff;
  color: black;
  margin: 0;
  height: calc(100vh - 100px);
  text-align: center;
  justify-content: center;
  align-items: center;
  padding: 50px 10px;

  @media ${minTablet} {
    padding: 50px 0;
  }
`;

const StyledH1 = styled.h1`
  margin: 0;
`;

const StyledP = styled.p`
  margin: 20px 0;
`;

const HeadingContainer = styled.div`
  display: flex;
  flex-flow: column;
  justify-content: center;
  margin-bottom: 20px;

  @media ${minTablet} {
    flex-flow: row;
  }
`;

const StyledLink = styled(Link)`
  background-color: #e9e9e9;
  border-radius: 10px;

  font-size: 20px;
  font-weight: 700;
  padding: 15px;
  margin: 10px 0;

  @media ${minTablet} {
    margin: 0 10px;
  }
`;

export default function Custom404Page() {
  return (
    <>
      <Head>
        <title>404 - Not Found</title>
      </Head>
      <main>
        <Container>
          <HeadingContainer>
            <StyledH1>404 | This page is not found.</StyledH1>
          </HeadingContainer>
          <StyledP>You can try one of these alternative pages:</StyledP>
          <HeadingContainer>
            <StyledLink href={{ pathname: '/' }}>Christmas</StyledLink>
            <StyledLink href={{ pathname: '/valentines-day' }}>
              Valentine&apos;s Day
            </StyledLink>
            <StyledLink href={{ pathname: '/halloween' }}>Halloween</StyledLink>
          </HeadingContainer>
        </Container>
      </main>
    </>
  );
}
