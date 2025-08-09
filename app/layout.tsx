import '@/styles/globals.css';
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';
import AntdRegistry from '@/lib/antd-registry';
import { ConfigProvider } from 'antd';
import { defaultAntdTheme } from '@/styles/antdTheme';

export const metadata: Metadata = {
  title: {
    template: "%s | Sleeps 'til Christmas",
    default: "Sleeps 'til Christmas",
  },
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
  metadataBase: new URL('https://sleepstilchristmas.com'),
};

export default function RootLayout({
  // Layouts must accept a children prop.
  // This will be populated with nested layouts or pages
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider theme={defaultAntdTheme}>
            <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
