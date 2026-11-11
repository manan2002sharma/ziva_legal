import Link from 'next/link';
import { site } from '@/lib/site';
import { AppStoreButton } from './AppStoreButton';

const groups = [
  { title: 'Product', links: [['/#features', 'Features'], ['/pricing', 'Pricing'], ['/faq', 'FAQ']] },
  { title: 'Free tools', links: [['/tools/macro-calculator', 'Macro calculator'], ['/tools/protein-calculator', 'Protein calculator']] },
  { title: 'Company', links: [['/about', 'About'], ['/blog', 'Blog'], ['/press', 'Press kit'], ['/how-we-compare', 'How we compare'], ['/support', 'Support']] },
  { title: 'Legal', links: [['/privacy', 'Privacy Policy'], ['/terms', 'Terms of Use']] },
];

export function SiteFooter() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer__top">
          <div className="footer__brand">
            <Link href="/" className="logo">
              <img src="/images/app-icon.png" alt="" width={30} height={30} />
              <span>ZivaAI</span>
            </Link>
            <p>{site.definition}</p>
            <AppStoreButton campaign="web-footer" />
          </div>
          <div className="footer__cols">
            {groups.map((g) => (
              <div key={g.title}>
                <h2>{g.title}</h2>
                <ul>{g.links.map(([href, label]) => <li key={href}><Link href={href}>{label}</Link></li>)}</ul>
              </div>
            ))}
          </div>
        </div>
        <div className="footer__fine">
          <p>ZivaAI gives general wellness guidance, not medical advice. For adults {site.minAge} and over. Exercise data by <a href="https://repdb.co">RepDB (repdb.co)</a>.</p>
          <p>{site.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
