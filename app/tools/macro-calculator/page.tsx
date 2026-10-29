import type { Metadata } from 'next';
import { MacroCalculator } from '@/components/MacroCalculator';
import { AppStoreButton } from '@/components/AppStoreButton';
import { JsonLd } from '@/components/JsonLd';
import { activityLevels, macros, sources, CM_PER_IN, LB_PER_KG, type MacroInput } from '@/lib/nutrition';
import { breadcrumbSchema } from '@/lib/schema';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Macro calculator: calories, protein, carbs and fat',
  description: 'Free macro calculator. Enter your age, height, weight, activity and goal to get daily calories and grams of protein, carbs and fat.',
  alternates: { canonical: '/tools/macro-calculator' },
};

const kg = (lb: number) => lb / LB_PER_KG;
const cm = (ft: number, inch: number) => (ft * 12 + inch) * CM_PER_IN;
const examples: { who: string; goal: string; input: MacroInput }[] = [
  { who: 'Man, 30, 5 ft 10 in, 180 lb, moderate exercise', goal: 'Lose fat', input: { sex: 'male', age: 30, kg: kg(180), cm: cm(5, 10), activity: 'moderate', goal: 'lose' } },
  { who: 'Woman, 30, 5 ft 5 in, 140 lb, light exercise', goal: 'Lose fat', input: { sex: 'female', age: 30, kg: kg(140), cm: cm(5, 5), activity: 'light', goal: 'lose' } },
  { who: 'Man, 25, 6 ft 0 in, 165 lb, moderate exercise', goal: 'Build muscle', input: { sex: 'male', age: 25, kg: kg(165), cm: cm(6, 0), activity: 'moderate', goal: 'gain' } },
  { who: 'Woman, 40, 5 ft 4 in, 160 lb, mostly sitting', goal: 'Maintain weight', input: { sex: 'female', age: 40, kg: kg(160), cm: cm(5, 4), activity: 'sedentary', goal: 'maintain' } },
];

export default function MacroCalculatorPage() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>Macro calculator</h1>
          <p>Enter your age, height, weight, activity and goal to get a daily calorie target with grams of protein, carbs and fat.</p>
        </div>
      </section>
      <div className="wrap prose">
        <MacroCalculator />
        <div className="narrow">
          <h2>How the macro calculator works</h2>
          <p className="lead-answer">
            It estimates the calories you burn at rest with the Mifflin–St Jeor equation, multiplies that by an activity factor, then adds or
            subtracts calories for your goal and splits the total into protein, fat and carbs.
          </p>
          <ol>
            <li>Calories at rest, men: 10 × weight in kg + 6.25 × height in cm − 5 × age + 5. Women: the same, − 161 instead of + 5.</li>
            <li>Maintenance calories: calories at rest × your activity factor (table below).</li>
            <li>Goal: lose fat subtracts 500 kcal a day, roughly 0.5 kg (1 lb) a week at first; build muscle adds 300 kcal; maintain adds nothing.</li>
            <li>Floor: the target never goes below 1,500 kcal for men or 1,200 kcal for women without a doctor&rsquo;s advice.</li>
            <li>Protein: 1.8 g per kg of body weight when losing fat or building muscle, 1.6 g per kg when maintaining.</li>
            <li>Fat: 25% of calories. Carbs: whatever calories remain.</li>
          </ol>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Activity level</th><th className="num">Factor</th></tr></thead>
              <tbody>
                {activityLevels.map((a) => <tr key={a.key}><td>{a.label}</td><td className="num">{a.factor}</td></tr>)}
              </tbody>
            </table>
          </div>

          <h2>Worked examples</h2>
          <div className="table-scroll">
            <table>
              <thead><tr><th>Person</th><th>Goal</th><th className="num">Calories</th><th className="num">Protein</th><th className="num">Carbs</th><th className="num">Fat</th></tr></thead>
              <tbody>
                {examples.map((e) => {
                  const r = macros(e.input);
                  return (
                    <tr key={e.who}>
                      <td>{e.who}</td><td>{e.goal}</td>
                      <td className="num">{r.kcal.toLocaleString('en-US')} kcal</td>
                      <td className="num">{r.proteinG} g</td><td className="num">{r.carbsG} g</td><td className="num">{r.fatG} g</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <h2>Get a week of meals built to these numbers</h2>
          <p>ZivaAI turns a calorie and macro target into a full week of meals with recipes and a grocery list, plus workouts for your equipment.</p>
          <AppStoreButton campaign="web-tool-macro" />

          <h2>Sources</h2>
          <ul className="sources">
            {[sources.mifflin, sources.issn, sources.morton].map((s) => <li key={s.url}><a href={s.url}>{s.label}</a></li>)}
          </ul>
          <p className="updated">These numbers are estimates for healthy adults, not medical advice. If you are pregnant, under 18 or have a health condition, ask a doctor or registered dietitian. Last updated October 28, 2026.</p>
        </div>
      </div>
      <JsonLd
        data={[
          { '@context': 'https://schema.org', '@type': 'WebApplication', name: 'ZivaAI macro calculator', url: `${site.url}/tools/macro-calculator`, applicationCategory: 'HealthApplication', operatingSystem: 'Any', offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' }, publisher: { '@id': `${site.url}/#organization` } },
          breadcrumbSchema([{ name: 'Home', path: '/' }, { name: 'Free tools', path: '/tools' }, { name: 'Macro calculator', path: '/tools/macro-calculator' }]),
        ]}
      />
    </>
  );
}
