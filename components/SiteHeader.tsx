import Link from 'next/link';
import { nav } from '@/lib/site';
import { AppStoreButton } from './AppStoreButton';

export function SiteHeader() {
  return (
    <header className="header">
      <div className="wrap header__inner">
        <Link href="/" className="logo" aria-label="ZivaAI home">
          <img src="/images/app-icon.png" alt="" width={30} height={30} />
          <span>ZivaAI</span>
        </Link>
        <nav aria-label="Main" className="header__nav">
          {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
        </nav>
        <div className="header__cta"><AppStoreButton campaign="web-header" size="s" /></div>
        <details className="header__menu">
          <summary aria-label="Menu">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 7h16M4 12h16M4 17h16" /></svg>
          </summary>
          <div className="header__sheet">
            {nav.map((n) => <Link key={n.href} href={n.href}>{n.label}</Link>)}
            <AppStoreButton campaign="web-menu" />
          </div>
        </details>
      </div>
    </header>
  );
}
