'use client';
import { useMemo, useState } from 'react';
import { activityLevels, calorieGoals, macros, CM_PER_IN, LB_PER_KG, type ActivityKey, type CalorieGoalKey, type Sex } from '@/lib/nutrition';

type Units = 'us' | 'metric';

export function MacroCalculator() {
  const [units, setUnits] = useState<Units>('us');
  const [sex, setSex] = useState<Sex>('male');
  const [age, setAge] = useState(30);
  const [ft, setFt] = useState(5);
  const [inch, setInch] = useState(10);
  const [lb, setLb] = useState(180);
  const [cm, setCm] = useState(178);
  const [kg, setKg] = useState(82);
  const [activity, setActivity] = useState<ActivityKey>('moderate');
  const [goal, setGoal] = useState<CalorieGoalKey>('lose');

  const heightCm = units === 'us' ? (ft * 12 + inch) * CM_PER_IN : cm;
  const weightKg = units === 'us' ? lb / LB_PER_KG : kg;
  const valid = age >= 18 && age <= 90 && heightCm >= 120 && heightCm <= 230 && weightKg >= 35 && weightKg <= 250;
  const r = useMemo(
    () => (valid ? macros({ sex, age, kg: weightKg, cm: heightCm, activity, goal }) : null),
    [valid, sex, age, weightKg, heightCm, activity, goal],
  );
  const num = (v: string) => (v === '' ? 0 : Number(v));

  return (
    <div className="calc">
      <form className="calc__form" onSubmit={(e) => e.preventDefault()}>
        <fieldset className="seg">
          <legend>Units</legend>
          <label><input type="radio" name="units" checked={units === 'us'} onChange={() => setUnits('us')} /> US (lb, ft)</label>
          <label><input type="radio" name="units" checked={units === 'metric'} onChange={() => setUnits('metric')} /> Metric (kg, cm)</label>
        </fieldset>
        <fieldset className="seg">
          <legend>Sex</legend>
          <label><input type="radio" name="sex" checked={sex === 'male'} onChange={() => setSex('male')} /> Male</label>
          <label><input type="radio" name="sex" checked={sex === 'female'} onChange={() => setSex('female')} /> Female</label>
        </fieldset>
        <label className="field">Age
          <input type="number" inputMode="numeric" min={18} max={90} value={age || ''} onChange={(e) => setAge(num(e.target.value))} />
        </label>
        {units === 'us' ? (
          <div className="field-row">
            <label className="field">Height (ft)
              <input type="number" inputMode="numeric" min={4} max={7} value={ft || ''} onChange={(e) => setFt(num(e.target.value))} />
            </label>
            <label className="field">Height (in)
              <input type="number" inputMode="numeric" min={0} max={11} value={inch} onChange={(e) => setInch(num(e.target.value))} />
            </label>
            <label className="field">Weight (lb)
              <input type="number" inputMode="decimal" min={80} max={550} value={lb || ''} onChange={(e) => setLb(num(e.target.value))} />
            </label>
          </div>
        ) : (
          <div className="field-row">
            <label className="field">Height (cm)
              <input type="number" inputMode="numeric" min={120} max={230} value={cm || ''} onChange={(e) => setCm(num(e.target.value))} />
            </label>
            <label className="field">Weight (kg)
              <input type="number" inputMode="decimal" min={35} max={250} value={kg || ''} onChange={(e) => setKg(num(e.target.value))} />
            </label>
          </div>
        )}
        <label className="field">Activity
          <select value={activity} onChange={(e) => setActivity(e.target.value as ActivityKey)}>
            {activityLevels.map((a) => <option key={a.key} value={a.key}>{a.label}</option>)}
          </select>
        </label>
        <label className="field">Goal
          <select value={goal} onChange={(e) => setGoal(e.target.value as CalorieGoalKey)}>
            {calorieGoals.map((g) => <option key={g.key} value={g.key}>{g.label}</option>)}
          </select>
        </label>
      </form>

      <output className="calc__result" aria-live="polite">
        {r ? (
          <>
            <p className="calc__big"><strong>{r.kcal.toLocaleString('en-US')}</strong> kcal a day</p>
            <ul className="macro-bars">
              <MacroBar name="Protein" grams={r.proteinG} kcal={r.proteinG * 4} total={r.kcal} tone="protein" />
              <MacroBar name="Carbs" grams={r.carbsG} kcal={r.carbsG * 4} total={r.kcal} tone="carbs" />
              <MacroBar name="Fat" grams={r.fatG} kcal={r.fatG * 9} total={r.kcal} tone="fat" />
            </ul>
            <p className="calc__note">
              Maintenance is about {r.tdee.toLocaleString('en-US')} kcal a day; your body burns about {r.bmr.toLocaleString('en-US')} at rest.
              {r.floorApplied && ' Your number was raised to the minimum we suggest without a doctor’s advice.'}
            </p>
          </>
        ) : (
          <p className="calc__note">Enter an age from 18 to 90, a height and a weight to see your numbers.</p>
        )}
      </output>
    </div>
  );
}

function MacroBar({ name, grams, kcal, total, tone }: { name: string; grams: number; kcal: number; total: number; tone: string }) {
  const pct = Math.round((kcal / total) * 100);
  return (
    <li className={`macro-bar macro-bar--${tone}`}>
      <span className="macro-bar__label">{name}</span>
      <span className="macro-bar__value">{grams} g</span>
      <span className="macro-bar__track" aria-hidden="true"><span style={{ width: `${pct}%` }} /></span>
      <span className="macro-bar__pct">{pct}% of calories</span>
    </li>
  );
}
