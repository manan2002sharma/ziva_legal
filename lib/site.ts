/**
 * Everything that changes between launch and later lives here.
 * Prices are printed on the site, so they must match App Store Connect.
 */
export const site = {
  name: 'ZivaAI',
  url: 'https://zivaai.app',
  shortDescription: 'AI meal and workout planner for iPhone',
  /** The one-sentence definition. Reuse it word for word everywhere ZivaAI is described. */
  definition:
    'ZivaAI is an iPhone app that writes your weekly meal plan, workout plan and grocery list, counts calories from a photo of your meal, logs your sets, and changes the plan when you chat with Ziva, your AI coach.',
  platforms: 'iPhone and iPad',
  minOS: 'iOS 18 or later',
  minAge: 18,
  price: {
    currency: 'USD',
    monthly: 34.99,
    yearly: 249.99,
    freeTrialDays: 0,
  },
  supportEmail: 'whynothustle.manan@gmail.com',
  publisher: 'Manan Sharma',
  /** Byline on blog posts. */
  author: { name: 'Manan Sharma', role: 'Founder of ZivaAI' },
  /** Shown wherever a page says where to get the app. */
  availability: 'on the App Store',
  copyright: '© 2026 Manan Sharma',
  /** ZivaAI: Meal & Workout Planner, live since 6 November 2026. The env var can override it. */
  appStoreId: process.env.NEXT_PUBLIC_APP_STORE_ID || '6823512627',
  appStoreProviderToken: process.env.NEXT_PUBLIC_APP_STORE_PT ?? '',
  posthogKey: process.env.NEXT_PUBLIC_POSTHOG_KEY ?? '',
  posthogHost: 'https://us.i.posthog.com',
  /** Official profiles. Add each one as it is created; they feed the Organization schema. */
  sameAs: [] as string[],
};

export function money(n: number) {
  return `$${n.toFixed(2)}`;
}

/** Yearly price per month, and how much less it costs than 12 monthly payments. */
export const yearlyPerMonth = () => site.price.yearly / 12;
export const yearlySavingPct = () => Math.round((1 - site.price.yearly / (site.price.monthly * 12)) * 100);

/**
 * App Store link carrying a campaign token, so App Analytics reports installs per source.
 * Returns null before launch, when there is no App Store ID yet.
 */
export function appStoreUrl(campaign: string): string | null {
  if (!site.appStoreId) return null;
  const params = new URLSearchParams({ ct: campaign, mt: '8' });
  if (site.appStoreProviderToken) params.set('pt', site.appStoreProviderToken);
  return `https://apps.apple.com/app/id${site.appStoreId}?${params.toString()}`;
}

export const nav = [
  { href: '/#features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/tools', label: 'Free tools' },
  { href: '/blog', label: 'Blog' },
  { href: '/faq', label: 'FAQ' },
];

/** Every indexable route, for the sitemap. */
export const routes = [
  '/',
  '/pricing',
  '/faq',
  '/about',
  '/press',
  '/tools',
  '/tools/macro-calculator',
  '/tools/protein-calculator',
  '/blog',
  '/support',
  '/privacy',
  '/terms',
];
