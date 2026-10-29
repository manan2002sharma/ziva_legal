import fs from 'node:fs';
import path from 'node:path';

/** Reads privacy.html, terms.html and support.html at the repo root, the same files GitHub Pages serves, and returns their body. */
export function legalPage(name: 'privacy' | 'terms' | 'support') {
  const html = fs.readFileSync(path.join(process.cwd(), `${name}.html`), 'utf8');
  const title = (html.match(/<title>([^<]*)<\/title>/)?.[1] ?? '').trim();
  const description = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? '';
  let body = html.match(/<main>([\s\S]*?)<\/main>/)?.[1] ?? '';
  body = body
    .replace(/<div class="brand">[\s\S]*?<\/div>/, '')
    .replace(/href="(privacy|terms|support)\.html"/g, 'href="/$1"');
  return { title, description, body };
}
