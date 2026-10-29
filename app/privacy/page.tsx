import type { Metadata } from 'next';
import { legalPage } from '@/lib/legal';

const page = legalPage('privacy');

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: page.description,
  alternates: { canonical: '/privacy' },
};

export default function Page() {
  return <div className="wrap narrow prose legal" dangerouslySetInnerHTML={{ __html: page.body }} />;
}
