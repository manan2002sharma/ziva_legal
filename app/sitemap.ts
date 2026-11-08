import type { MetadataRoute } from 'next';
import { site, routes } from '@/lib/site';
import { allPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages: MetadataRoute.Sitemap = routes.map((r) => ({
    url: `${site.url}${r === '/' ? '' : r}`,
    lastModified: now,
    changeFrequency: r === '/' || r.startsWith('/tools') || r === '/blog' ? 'weekly' : 'monthly',
    priority: r === '/' ? 1 : r === '/pricing' || r.startsWith('/tools') || r === '/blog' ? 0.8 : 0.5,
  }));
  const posts: MetadataRoute.Sitemap = allPosts().map((p) => ({
    url: `${site.url}/blog/${p.slug}`,
    lastModified: new Date(`${p.updated}T00:00:00Z`),
    changeFrequency: 'monthly',
    priority: p.category === 'Comparisons' ? 0.7 : 0.6,
  }));
  return [...pages, ...posts];
}
