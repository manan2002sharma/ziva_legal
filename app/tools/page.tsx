import type { Metadata } from 'next';
import Link from 'next/link';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Free nutrition calculators',
  description: 'Free calorie, macro and protein calculators from ZivaAI. No sign-up, results in under a minute.',
  alternates: { canonical: '/tools' },
};

export default function Tools() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Free nutrition calculators</h1>
          <p>Work out your calories, macros and protein in under a minute. No sign-up.</p>
        </div>
      </section>
      <div className="wrap prose">
        <ul className="tool-list">
          <li>
            <Link className="tool-card" href="/tools/macro-calculator">
              <span className="card__icon"><Icon name="calculator" /></span>
              <h2>Macro calculator</h2>
              <p>A daily calorie target with grams of protein, carbs and fat, from your age, height, weight, activity and goal.</p>
            </Link>
          </li>
          <li>
            <Link className="tool-card" href="/tools/protein-calculator">
              <span className="card__icon"><Icon name="flame" /></span>
              <h2>Protein calculator</h2>
              <p>How many grams of protein to eat a day for your weight and goal, and how much at each meal.</p>
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
