import type { Metadata } from 'next';
import { ProteinCalculator } from '@/components/ProteinCalculator';
import { AppStoreButton } from '@/components/AppStoreButton';
import { JsonLd } from '@/components/JsonLd';
import { proteinGoals, proteinRange, sources, LB_PER_KG } from '@/lib/nutrition';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Protein calculator: how much protein do I need a day?',
  description: 'Free protein calculator. Enter your weight and goal to see grams of protein per day and per meal, with the research behind the numbers.',
  alternates: { canonical: '/tools/protein-calculator' },
};

const weightsLb = [120, 140, 160, 180, 200, 220];
const perLb = (gPerKg: number) => (gPerKg / LB_PER_KG).toFixed(2);

export default function ProteinCalculatorPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Protein calculator</h1>
          <p>Enter your body weight and goal to see how many grams of protein to eat a day, and how much at each meal.</p>
        </div>
      </section>
      <div className="wrap prose">
        <ProteinCalculator />
        <div className="narrow">
          <h2>How much protein do you need a day?</h2>
          <p className="lead-answer">
            Adults who lift weights to build muscle do well on 1.6 to 2.2 g of protein per kg of body weight a day, about 0.73 to 1 g per pound.
            Without regular exercise, 0.8 g per kg is the US recommended amount.
          </p>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Goal</th><th className="num">g per kg a day</th><th className="num">g per lb a day</th></tr></thead>
              <tbody>
                {proteinGoals.map((g) => (
                  <tr key={g.key}><td>{g.label}</td><td className="num">{g.min}–{g.max}</td><td className="num">{perLb(g.min)}–{perLb(g.max)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          <p>
            Muscle gains from extra protein level off around 1.6 g per kg a day, with some people benefiting up to about 2.2 g (Morton and others,
            2018). The International Society of Sports Nutrition puts most people who exercise at 1.4 to 2.0 g per kg (Jäger and others, 2017).
          </p>
        </div>

        <h2>Protein by body weight</h2>
        <div className="table-scroll">
          <table>
            <thead>
              <tr><th>Body weight</th>{proteinGoals.map((g) => <th key={g.key} className="num">{g.label}</th>)}</tr>
            </thead>
            <tbody>
              {weightsLb.map((lb) => (
                <tr key={lb}>
                  <td>{lb} lb ({Math.round(lb / LB_PER_KG)} kg)</td>
                  {proteinGoals.map((g) => {
                    const r = proteinRange(lb / LB_PER_KG, g.key);
                    return <td key={g.key} className="num">{r.min}–{r.max} g</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="narrow">
          <h2>How much protein per meal?</h2>
          <p>
            Spreading protein over at least four meals of about 0.4 g per kg each is a practical way to reach a muscle-building total
            (Schoenfeld and Aragon, 2018). For a 180 lb (82 kg) person that is about 33 g per meal.
          </p>
          <h2>Plan meals that hit your protein</h2>
          <p>ZivaAI plans a week of meals with protein worked out for every meal, so the daily total adds up without tracking.</p>
          <AppStoreButton campaign="web-tool-protein" />
          <h2>Sources</h2>
          <ul className="sources">
            {[sources.morton, sources.issn, sources.perMeal].map((s) => <li key={s.url}><a href={s.url}>{s.label}</a></li>)}
          </ul>
          <p className="updated">These ranges are for healthy adults. If you have kidney disease or another health condition, ask your doctor before raising your protein. Last updated October 28, 2026.</p>
        </div>
      </div>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'ZivaAI protein calculator', url: `${site.url}/tools/protein-calculator`, applicationCategory: 'HealthApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: { '@id': `${site.url}/#organization` } },
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Free tools', path: '/tools' }, { name: 'Protein calculator', path: '/tools/protein-calculator' }]),
        ]}
      />
    </>
  );
}
