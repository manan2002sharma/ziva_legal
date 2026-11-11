import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';
import { allPosts, longDate } from '@/lib/blog';
import { JsonLd } from '@/components/JsonLd';
import { breadcrumbSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: `${site.author.name}, founder of ZivaAI`,
  description: `${site.author.name} founded ZivaAI and writes its app comparisons and meal planning and training guides.`,
  alternates: { canonical: site.author.url },
};

export default function Author() {
  const posts = allPosts();
  const role = site.author.role.charAt(0).toLowerCase() + site.author.role.slice(1);
  return (
    <>
      <section className="page-head">
        <div className="wrap narrow">
          <h1>{site.author.name}</h1>
          <p>
            {site.author.name} is the {role}, the iPhone app that plans your meals, workouts and groceries and logs what you eat and lift. He
            writes the ZivaAI blog: comparisons of meal planning, workout and calorie counting apps, and guides to protein, calories and training.
          </p>
        </div>
      </section>
      <div className="wrap narrow prose">
        <p>
          Each comparison takes its facts from the apps&rsquo; own websites and App Store listings and says when they were checked. See{' '}
          <Link href="/how-we-compare">how we compare apps</Link>. To report a mistake, email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>.
        </p>
        <h2>Articles</h2>
        <ul className="author-posts">
          {posts.map((p) => (
            <li key={p.slug}>
              <Link href={`/blog/${p.slug}`}>{p.title}</Link> <span className="muted">· {p.category}, updated {longDate(p.updated)}</span>
            </li>
          ))}
        </ul>
      </div>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            mainEntity: {
              '@type': 'Person',
              '@id': `${site.url}${site.author.url}#person`,
              name: site.author.name,
              jobTitle: site.author.role,
              url: `${site.url}${site.author.url}`,
              worksFor: { '@id': `${site.url}/#organization` },
            },
          },
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: site.author.name, path: site.author.url }]),
        ]}
      />
    </>
  );
}
