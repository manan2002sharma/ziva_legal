'use client';
import { useState } from 'react';
import { proteinGoals, proteinRange, LB_PER_KG, type ProteinGoalKey } from '@/lib/nutrition';

export function ProteinCalculator() {
  const [units, setUnits] = useState<'us' | 'metric'>('us');
  const [weight, setWeight] = useState(180);
  const [goal, setGoal] = useState<ProteinGoalKey>('muscle');
  const [meals, setMeals] = useState(4);
  const kg = units === 'us' ? weight / LB_PER_KG : weight;
  const valid = kg >= 35 && kg <= 250;
  const r = valid ? proteinRange(kg, goal, meals) : null;

  return (
    <div className="calc">
      <form className="calc__form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="seg">
          <legend>Units</legend>
          <label><input type="radio" name="punits" checked={units === 'us'} onChange={() => { setUnits('us'); setWeight(Math.round(weight * LB_PER_KG)); }} /> Pounds</label>
          <label><input type="radio" name="punits" checked={units === 'metric'} onChange={() => { setUnits('metric'); setWeight(Math.round(weight / LB_PER_KG)); }} /> Kilograms</label>
        </fieldset>
        <label className="field">Body weight ({units === 'us' ? 'lb' : 'kg'})
          <input type="number" inputMode="decimal" value={weight || ''} onChange={(e) => setWeight(e.target.value === '' ? 0 : Number(e.target.value))} />
        </label>
        <label className="field">Goal
          <select value={goal} onChange={(e) => setGoal(e.target.value as ProteinGoalKey)}>
            {proteinGoals.map((g) => <option key={g.key} value={g.key}>{g.label}</option>)}
          </select>
        </label>
        <label className="field">Meals a day
          <select value={meals} onChange={(e) => setMeals(Number(e.target.value))}>
            {[3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
          </select>
        </label>
      </form>
      <output className="calc__result" aria-live="polite">
        {r ? (
          <>
            <p className="calc__big"><strong>{r.min}–{r.max} g</strong> protein a day</p>
            <p className="calc__note">That is about {r.perMealMin}–{r.perMealMax} g at each of your {meals} meals.</p>
          </>
        ) : (
          <p className="calc__note">Enter a body weight between {units === 'us' ? '80 and 550 lb' : '35 and 250 kg'}.</p>
        )}
      </output>
    </div>
  );
}
