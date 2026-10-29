import type { Metadata } from 'next';
import { legalPage } from '@/lib/legal';

const page = legalPage('support');

export const metadata: Metadata = {
  title: 'Support',
  description: page.description,
  alternates: { canonical: '/support' },
};

export default function Page() {
  return <div className="wrap narrow prose legal" dangerouslySetInnerHTML={{ __html: page.body }} />;
}
