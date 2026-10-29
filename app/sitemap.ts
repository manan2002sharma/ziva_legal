import type { MetadataRoute } from 'next';
import { site, routes } from '@/lib/site';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((r) => ({
    url: `${site.url}${r === '/' ? '' : r}`,
    lastModified: now,
    changeFrequency: r === '/' || r.startsWith('/tools') ? 'weekly' : 'monthly',
    priority: r === '/' ? 1 : r === '/pricing' || r.startsWith('/tools') ? 0.8 : 0.5,
  }));
}
