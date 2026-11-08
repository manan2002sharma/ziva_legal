import { appStoreUrl } from '@/lib/site';

/**
 * Black App Store badge. `campaign` becomes the App Store ct= token, so installs are reported per placement.
 * Without an App Store ID it reads "Coming soon on the App Store" and isn't a link.
 */
export function AppStoreButton({ campaign, size = 'm', tone = 'dark' }: { campaign: string; size?: 's' | 'm' | 'l'; tone?: 'dark' | 'light' }) {
  const href = appStoreUrl(campaign);
  const cls = `badge badge--${size} badge--${tone}${href ? '' : ' badge--soon'}`;
  const inner = (
    <>
      <svg className="badge__mark" viewBox="0 0 17 20" aria-hidden="true">
        <path fill="currentColor" d="M14.1 10.6c0-2.4 2-3.6 2.1-3.7-1.1-1.7-2.9-1.9-3.5-1.9-1.5-.2-2.9.9-3.7.9s-1.9-.9-3.2-.8C4.2 5.1 2.6 6.1 1.8 7.6c-1.7 3-.4 7.4 1.2 9.8.8 1.2 1.8 2.5 3 2.4 1.2 0 1.7-.8 3.1-.8s1.9.8 3.2.8c1.3 0 2.1-1.2 2.9-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-.9-2.4-4zM11.7 3.5c.7-.8 1.1-1.9 1-3-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.8-1 2.9 1.1.1 2.2-.6 2.9-1.4z" />
      </svg>
      <span className="badge__text">
        <small>{href ? 'Download on the' : 'Coming soon on the'}</small>
        App Store
      </span>
    </>
  );
  return href ? (
    <a className={cls} href={href} data-campaign={campaign}>{inner}</a>
  ) : (
    <span className={cls} aria-disabled="true">{inner}</span>
  );
}
