import type { Metadata } from 'next';
import Link from 'next/link';
import { site, money, yearlyPerMonth, yearlySavingPct } from '@/lib/site';
import { appSchema, breadcrumbSchema } from '@/lib/schema';
import { AppStoreButton } from '@/components/AppStoreButton';
import { JsonLd } from '@/components/JsonLd';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Pricing',
  description: `ZivaAI Pro costs ${money(site.price.yearly)} a year or ${money(site.price.monthly)} a month. See what is included, how Apple bills it and how to cancel.`,
  alternates: { canonical: '/pricing' },
};

const included = [
  'A full week of meals with recipes, calories and macros',
  'Workouts of 20 to 60 minutes for the gym or home',
  'Chat with Ziva to change any meal or workout',
  'One grocery list for the week, sorted by aisle',
  'Calorie and macro estimates from a photo or a sentence',
  'Set logging with personal bests, on the Lock Screen too',
  'Daily progress photos, a timelapse, and graphs of your eating and training',
  'Reminders for meals, workouts and shopping day',
];

export default function Pricing() {
  return (
    <>
      <section className="page-head">
        <div className="wrap narrow">
          <h1>Simple pricing</h1>
          <p>
            ZivaAI Pro costs {money(site.price.yearly)} a year, which works out to {money(yearlyPerMonth())} a month, or {money(site.price.monthly)} billed
            monthly. Apple bills it, and you can cancel any time.
          </p>
        </div>
      </section>
      <div className="wrap narrow prose">
        <div className="plans">
          <div className="plan plan--best">
            <span className="plan__tag">{yearlySavingPct()}% less than monthly</span>
            <h2>Yearly</h2>
            <p className="plan__amount">{money(site.price.yearly)} <span>a year</span></p>
            <p className="plan__note">{money(yearlyPerMonth())} a month, billed once a year</p>
          </div>
          <div className="plan">
            <h2>Monthly</h2>
            <p className="plan__amount">{money(site.price.monthly)} <span>a month</span></p>
            <p className="plan__note">Billed every month, cancel any month</p>
          </div>
        </div>
        <h2 style={{ marginTop: 8 }}>Both plans include</h2>
        <ul className="checks">
          {included.map((x) => <li key={x}><Icon name="check" size={18} stroke={2.4} />{x}</li>)}
        </ul>
        <AppStoreButton campaign="web-pricing" size="l" />

        <h2>Is there a free version?</h2>
        <p>
          {site.price.freeTrialDays > 0
            ? `New subscribers get ${site.price.freeTrialDays} days free. The setup questions are always free.`
            : 'No, and there is no free trial. The setup questions are free, but building your plan needs ZivaAI Pro.'}
        </p>

        <h2>How billing works</h2>
        <ul>
          <li>Apple charges your Apple Account when you confirm the purchase.</li>
          <li>The subscription renews automatically unless you cancel at least 24 hours before the current period ends.</li>
          <li>To cancel, open Settings on your iPhone, tap your name, then Subscriptions, then ZivaAI.</li>
          <li>Refunds go through Apple at <a href="https://reportaproblem.apple.com">reportaproblem.apple.com</a>.</li>
          <li>Chat has fair-use limits so Ziva stays fast for everyone.</li>
        </ul>
        <p>More answers are on the <Link href="/faq">FAQ page</Link>.</p>
      </div>
      <JsonLd data={[appSchema(), breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Pricing', path: '/pricing' }])]} />
    </>
  );
}
