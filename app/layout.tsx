import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/inter';
import './globals.css';
import { site } from '@/lib/site';
import { organizationSchema } from '@/lib/schema';
import { SiteHeader } from '@/components/SiteHeader';
import { SiteFooter } from '@/components/SiteFooter';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: 'ZivaAI: AI Meal Planner, Workout Planner & Calorie Counter', template: '%s | ZivaAI' },
  description: site.definition,
  applicationName: site.name,
  alternates: { canonical: '/' },
  openGraph: { type: 'website', siteName: site.name, url: site.url, images: [{ url: '/og.jpg', width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image' },
  ...(site.appStoreId ? { itunes: { appId: site.appStoreId } } : {}),
};

export const viewport: Viewport = { themeColor: '#ffffff', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">Skip to content</a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <JsonLd data={organizationSchema()} />
        <Analytics apiKey={site.posthogKey} host={site.posthogHost} />
      </body>
    </html>
  );
}
