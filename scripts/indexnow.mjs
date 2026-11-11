// Tells Bing (and other IndexNow engines: Yandex, Naver, Seznam) about new or changed pages.
// Run after a deploy is live:  npm run indexnow            → every URL in the live sitemap
//                              npm run indexnow -- /blog/x  → only the paths given
// Google doesn't use IndexNow; for Google, use the sitemap and Search Console.
const host = 'zivaai.app';
const key = '430789a4b0ca8118114381d20abb242e'; // must match public/430789a4b0ca8118114381d20abb242e.txt
const site = `https://${host}`;

const paths = process.argv.slice(2);
let urlList;
if (paths.length) {
  urlList = paths.map((p) => (p.startsWith('http') ? p : site + (p.startsWith('/') ? p : '/' + p)));
} else {
  const xml = await (await fetch(`${site}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
if (!urlList.length) throw new Error('No URLs to submit');

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host, key, keyLocation: `${site}/${key}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urlList.length} URLs`);
if (res.status >= 400) console.log(await res.text());
