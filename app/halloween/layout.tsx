import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sleeps 'til Halloween",
};

export default function HalloweenLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
