import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { site, money, yearlyPerMonth } from './site';

export type Source = { title: string; url: string };
export type Post = {
  slug: string;
  title: string;
  description: string;
  category: 'Comparisons' | 'Guides';
  date: string;
  updated: string;
  answer: string;
  faq: { q: string; a: string }[];
  sources: Source[];
  related: string[];
  html: string;
  words: number;
};

const DIR = path.join(process.cwd(), 'content/blog');

/** {{tokens}} keep ZivaAI's facts in one place (lib/site.ts), so a price change updates every post. */
function fill(s: string) {
  const t: Record<string, string> = {
    price_monthly: money(site.price.monthly),
    price_yearly: money(site.price.yearly),
    price_yearly_per_month: money(yearlyPerMonth()),
    availability: site.availability,
  };
  return s.replace(/\{\{(\w+)\}\}/g, (_, k) => t[k] ?? `{{${k}}}`);
}

function load(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), 'utf8');
  const { data, content } = matter(raw);
  const body = fill(content);
  let html = marked.parse(body, { async: false, gfm: true }) as string;
  html = html.replace(/<table>/g, '<div class="table-scroll"><table>').replace(/<\/table>/g, '</table></div>');
  html = html.replace(/<a href="(https?:\/\/[^"]+)"/g, '<a href="$1" rel="noopener"');
  return {
    slug: file.replace(/\.md$/, ''),
    title: fill(data.title),
    description: fill(data.description),
    category: data.category,
    date: String(data.date),
    updated: String(data.updated ?? data.date),
    answer: fill(data.answer),
    faq: (data.faq ?? []).map((x: { q: string; a: string }) => ({ q: fill(x.q), a: fill(x.a) })),
    sources: data.sources ?? [],
    related: data.related ?? [],
    html,
    words: body.split(/\s+/).length,
  };
}

let cache: Post[] | null = null;
export function allPosts(): Post[] {
  if (!cache) {
    cache = fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).map(load)
      .sort((a, b) => (a.updated < b.updated ? 1 : a.updated > b.updated ? -1 : a.title.localeCompare(b.title)));
  }
  return cache;
}
export const getPost = (slug: string) => allPosts().find((p) => p.slug === slug);

export function longDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return `${months[m - 1]} ${d}, ${y}`;
}
