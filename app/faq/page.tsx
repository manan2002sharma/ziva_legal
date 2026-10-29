import type { Metadata } from 'next';
import { faq } from '@/lib/faq';
import { faqSchema } from '@/lib/schema';
import { FaqList } from '@/components/FaqList';
import { JsonLd } from '@/components/JsonLd';
import { AppStoreButton } from '@/components/AppStoreButton';

export const metadata: Metadata = {
  title: 'FAQ',
  description: 'Short answers about what ZivaAI does, what it costs, which diets and workouts it plans, and how your data is handled.',
  alternates: { canonical: '/faq' },
};

export default function FaqPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap narrow">
          <h1>ZivaAI questions and answers</h1>
          <p>What ZivaAI does, what it costs, and how your data is handled.</p>
        </div>
      </section>
      <div className="wrap narrow prose">
        <FaqList items={faq} headingLevel={2} />
        <p style={{ marginTop: 32 }}>Still have a question? Email <a href="mailto:whynothustle.manan@gmail.com">whynothustle.manan@gmail.com</a>.</p>
        <AppStoreButton campaign="web-faq" />
      </div>
      <JsonLd data={faqSchema(faq)} />
    </>
  );
}
