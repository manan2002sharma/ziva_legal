import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: 'How we compare apps',
  description: 'Where the facts in ZivaAI\'s app comparisons come from, how prices are checked and dated, and how we handle the fact that we make one of the apps.',
  alternates: { canonical: '/how-we-compare' },
};

export default function HowWeCompare() {
  return (
    <>
      <section className="page-head">
        <div className="wrap narrow">
          <h1>How we compare apps</h1>
          <p>
            Every comparison on this blog takes its facts from each app&rsquo;s own website, help pages or App Store listing, and says the date
            we checked them. We make ZivaAI, so we say so on every page where it appears.
          </p>
        </div>
      </section>
      <div className="wrap narrow prose">
        <h2>We make one of the apps</h2>
        <p>
          ZivaAI is our app, and it appears in most of our comparisons. Each of those pages opens with a note saying so. We list ZivaAI&rsquo;s
          trade-offs next to its strengths, including its price, which is higher than most apps we compare, and the features it doesn&rsquo;t have.
        </p>
        <h2>Where the facts come from</h2>
        <ul>
          <li><strong>Features:</strong> the app&rsquo;s own website, help center or App Store listing. Each page links them under Sources.</li>
          <li><strong>Prices:</strong> US prices from the App Store listing or the app&rsquo;s pricing page. When the App Store lists several prices for one plan, we show the range rather than pick one.</li>
          <li><strong>Ratings:</strong> the rating count shown on the US App Store on the day we checked.</li>
          <li><strong>Dates:</strong> every comparison says when its facts were checked, and the date at the top of the page is when it was last updated.</li>
        </ul>
        <h2>What we don&rsquo;t do</h2>
        <ul>
          <li>We don&rsquo;t claim a feature the source doesn&rsquo;t describe. If a listing doesn&rsquo;t say, the table says &ldquo;Not stated&rdquo;.</li>
          <li>We don&rsquo;t quote accuracy figures for photo calorie counting unless the app or an independent study publishes them.</li>
          <li>No app pays to be included or ranked, and our links to other apps aren&rsquo;t affiliate links.</li>
        </ul>
        <h2>Health and fitness guides</h2>
        <p>
          Our guides on protein, calories and training cite the research or guidelines behind each number, such as the Dietary Guidelines for
          Americans and position stands from the International Society of Sports Nutrition, and link them under Sources. They are general
          information, not medical advice.
        </p>
        <h2>Corrections</h2>
        <p>
          Apps change their features and prices often. If something on a page is out of date or wrong, email{' '}
          <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a> and we&rsquo;ll check it and update the page and its date.
        </p>
        <p>
          The comparisons and guides are written by <Link href={site.author.url}>{site.author.name}</Link>, {site.author.role.toLowerCase().replace('zivaai', 'ZivaAI')}.
        </p>
      </div>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'How we compare apps', path: '/how-we-compare' }])} />
    </>
  );
}
