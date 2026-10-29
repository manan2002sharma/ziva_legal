import type { QA } from '@/lib/faq';

export function FaqList({ items, headingLevel = 3 }: { items: QA[]; headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className="faq">
      {items.map((x) => (
        <details key={x.q} className="faq__item">
          <summary>
            <H className="faq__q">{x.q}</H>
            <span className="faq__chev" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </span>
          </summary>
          <p className="faq__a">{x.a}</p>
        </details>
      ))}
    </div>
  );
}
