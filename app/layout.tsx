import '@/styles/globals.css';
import { Metadata } from 'next';
import StyledComponentsRegistry from '@/lib/registry';

export const metadata: Metadata = {
  title: {
    default: "Sleeps 'til Christmas",
    template: "%s | Sleeps 'til Christmas",
  },
  description: 'See how many sleeps are left until your favorite holiday!',
  viewport: 'width=device-width, initial-scale=1',
  icons: {
    icon: '/favicon.ico',
  },
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
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
      </body>
    </html>
  );
}
