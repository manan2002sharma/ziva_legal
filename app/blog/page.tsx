import type { Metadata } from 'next';
import Link from 'next/link';
import { allPosts, longDate } from '@/lib/blog';
import { breadcrumbSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Blog: meal planning, workouts and app comparisons',
  description: 'Honest comparisons of meal planner and workout apps, and plain answers to meal planning and training questions, from the team behind ZivaAI.',
  alternates: { canonical: '/blog' },
};

export default function Blog() {
  const posts = allPosts();
  const groups: ['Comparisons' | 'Guides', string][] = [
    ['Comparisons', 'App comparisons and alternatives'],
    ['Guides', 'Meal planning and training guides'],
  ];
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>ZivaAI blog</h1>
          <p>Honest comparisons of meal planner and workout apps, and plain answers to planning questions. Prices are checked and dated in every post.</p>
        </div>
      </section>
      <div className="wrap prose">
        {groups.map(([cat, heading]) => {
          const list = posts.filter((p) => p.category === cat);
          if (!list.length) return null;
          return (
            <section key={cat} className="post-group">
              <h2>{heading}</h2>
              <ul className="post-list">
                {list.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/blog/${p.slug}`} className="post-card">
                      <h3>{p.title}</h3>
                      <p>{p.description}</p>
                      <span>Updated {longDate(p.updated)}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
      <JsonLd data={breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }])} />
    </>
  );
}
