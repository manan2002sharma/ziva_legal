import type { Metadata } from 'next';
import { legalPage } from '@/lib/legal';

const page = legalPage('terms');

export const metadata: Metadata = {
  title: 'Terms of Use',
  description: page.description,
  alternates: { canonical: '/terms' },
};

export default function Page() {
  return <div className="wrap narrow prose legal" dangerouslySetInnerHTML={{ __html: page.body }} />;
}
