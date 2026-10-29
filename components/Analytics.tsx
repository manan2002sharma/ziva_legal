'use client';
import { useEffect } from 'react';

/** Loads PostHog only when a key is configured. Same project as the app, so web and app funnels join up. */
export function Analytics({ apiKey, host }: { apiKey: string; host: string }) {
  useEffect(() => {
    if (!apiKey) return;
    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(apiKey, { api_host: host, capture_pageview: true, persistence: 'localStorage+cookie' });
      document.addEventListener('click', (e) => {
        const a = (e.target as HTMLElement).closest('a[data-campaign]');
        if (a) posthog.capture('app_store_click', { campaign: a.getAttribute('data-campaign') });
      });
    });
  }, [apiKey, host]);
  return null;
}
