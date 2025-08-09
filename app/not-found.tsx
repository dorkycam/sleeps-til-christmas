import { NotFoundPage } from '@/components';
import { generate404Metadata } from '@/lib/metadata';

export function generateMetadata() {
  return generate404Metadata();
}

export default function NotFound() {
  return <NotFoundPage />;
}
