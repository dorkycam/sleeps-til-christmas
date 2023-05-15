import 'antd/dist/reset.css';
// import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SiteLayout } from '@/modules/siteLayout/SiteLayout';
import { createGlobalStyle } from 'styled-components';
import Head from 'next/head';

const GlobalStyles = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background-color: white;
    color: white;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta
          name="description"
          content="See how many sleeps are left until your favorite holiday!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GlobalStyles />
      <SiteLayout>
        <Component {...pageProps} />
      </SiteLayout>
    </>
  );
}
