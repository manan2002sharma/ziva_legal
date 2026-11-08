import { site } from './site';
import type { QA } from './faq';

export const organizationSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: `${site.url}/images/app-icon.png`,
  email: site.supportEmail,
  founder: { '@type': 'Person', name: site.publisher },
  ...(site.sameAs.length ? { sameAs: site.sameAs } : {}),
});

export const appSchema = () => ({
  '@context': 'https://schema.org',
  '@type': 'MobileApplication',
  '@id': `${site.url}/#app`,
  name: site.name,
  alternateName: 'ZivaAI: Meal & Workout Planner',
  description: site.definition,
  url: site.url,
  image: `${site.url}/images/app-icon.png`,
  operatingSystem: site.minOS.replace(' or later', '+'),
  applicationCategory: 'HealthApplication',
  featureList: [
    'Weekly meal plan with recipes, calories and macros for every meal',
    'Workouts of 20 to 60 minutes for a gym, dumbbells or no equipment',
    'One grocery list for the week, sorted by aisle',
    'AI coach chat that changes the plan',
    'Calorie and macro estimates from a meal photo or description',
    'Set logging with personal bests, on the Lock Screen and Dynamic Island',
    'Daily progress photos, timelapse, and graphs of eating and training',
  ],
  publisher: { '@id': `${site.url}/#organization` },
  ...(site.appStoreId ? { installUrl: `https://apps.apple.com/app/id${site.appStoreId}` } : {}),
  offers: [
    { '@type': 'Offer', price: site.price.monthly.toFixed(2), priceCurrency: site.price.currency, description: 'ZivaAI Pro, monthly subscription' },
    { '@type': 'Offer', price: site.price.yearly.toFixed(2), priceCurrency: site.price.currency, description: 'ZivaAI Pro, yearly subscription' },
  ],
});

export const faqSchema = (items: QA[]) => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: items.map((x) => ({ '@type': 'Question', name: x.q, acceptedAnswer: { '@type': 'Answer', text: x.a } })),
});

export const breadcrumbSchema = (trail: { name: string; path: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: trail.map((t, i) => ({ '@type': 'ListItem', position: i + 1, name: t.name, item: `${site.url}${t.path}` })),
});
