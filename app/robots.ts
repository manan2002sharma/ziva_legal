import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

/** Search and AI crawlers are all welcome, including the training crawlers: a new brand wants to be known. */
export default function robots(): MetadataRoute.Robots {
  const bots = ['OAI-SearchBot', 'GPTBot', 'ChatGPT-User', 'PerplexityBot', 'Perplexity-User', 'Claude-SearchBot', 'ClaudeBot', 'Claude-User', 'Google-Extended', 'Googlebot', 'Bingbot', 'CCBot', 'Applebot'];
  return {
    rules: [{ userAgent: '*', allow: '/' }, ...bots.map((b) => ({ userAgent: b, allow: '/' }))],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
