import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sleeps 'til Valentine's Day",
};

export default function ValentinesDayLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
