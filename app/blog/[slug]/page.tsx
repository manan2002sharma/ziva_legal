import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { allPosts, getPost, longDate } from '@/lib/blog';
import { site } from '@/lib/site';
import { breadcrumbSchema, faqSchema } from '@/lib/schema';
import { JsonLd } from '@/components/JsonLd';
import { FaqList } from '@/components/FaqList';
import { AppStoreButton } from '@/components/AppStoreButton';

export const dynamicParams = false;
export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = getPost((await params).slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.description,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { type: 'article', title: p.title, description: p.description, publishedTime: p.date, modifiedTime: p.updated, authors: [site.author.name] },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = getPost((await params).slug);
  if (!p) notFound();
  const related = p.related.map((s) => getPost(s)).filter(Boolean).slice(0, 3);
  const url = `${site.url}/blog/${p.slug}`;
  return (
    <>
      <article>
        <header className="page-head post-head">
          <div className="wrap narrow">
            <p className="post-crumb"><Link href="/blog">Blog</Link> / {p.category}</p>
            <h1>{p.title}</h1>
            <p className="post-byline">
              By {site.author.name}, {site.author.role.charAt(0).toLowerCase() + site.author.role.slice(1)}. Updated <time dateTime={p.updated}>{longDate(p.updated)}</time>.
            </p>
          </div>
        </header>
        <div className="wrap narrow prose post">
          <div className="answer">
            <p className="answer__label">The short answer</p>
            <p>{p.answer}</p>
          </div>
          <div dangerouslySetInnerHTML={{ __html: p.html }} />
          <aside className="post-cta">
            <img src="/images/ziva.png" alt="" width={60} height={67} />
            <div>
              <h2>Plan your week with ZivaAI</h2>
              <p>ZivaAI writes your meals, workouts and grocery list for the week, counts calories from a photo of your meal and logs your sets. For iPhone and iPad, {site.availability}.</p>
              <AppStoreButton campaign={`web-blog-${p.slug}`} />
            </div>
          </aside>
          {p.faq.length > 0 && (
            <section>
              <h2>Questions</h2>
              <FaqList items={p.faq} />
            </section>
          )}
          {p.sources.length > 0 && (
            <section>
              <h2>Sources</h2>
              <ul className="sources">
                {p.sources.map((s) => <li key={s.url}><a href={s.url} rel="noopener">{s.title}</a></li>)}
              </ul>
            </section>
          )}
          {related.length > 0 && (
            <section>
              <h2>Related</h2>
              <ul className="post-list post-list--compact">
                {related.map((r) => (
                  <li key={r!.slug}><Link href={`/blog/${r!.slug}`} className="post-card"><h3>{r!.title}</h3><p>{r!.description}</p></Link></li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </article>
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org', '@type': 'BlogPosting', headline: p.title, description: p.description,
            datePublished: p.date, dateModified: p.updated, mainEntityOfPage: url, url, wordCount: p.words,
            image: `${site.url}/og.jpg`,
            author: { '@type': 'Person', name: site.author.name, jobTitle: site.author.role, url: `${site.url}/about` },
            publisher: { '@id': `${site.url}/#organization` },
          },
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Blog', path: '/blog' }, { name: p.title, path: `/blog/${p.slug}` }]),
          ...(p.faq.length ? [faqSchema(p.faq)] : []),
        ]}
      />
    </>
  );
}
