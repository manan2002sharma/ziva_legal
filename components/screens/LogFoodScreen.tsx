import { dayMeals, slotTime } from '@/lib/week';

/** Ziva's estimate for a meal photo, as the Log food sheet shows it (dark). */
export const burritoBowl = { name: 'Chicken burrito bowl', kcal: 588, proteinG: 50, carbsG: 67, fatG: 13, assumed: 'Restaurant bowl, about 450 g. No cheese or sour cream.' };

export function LogFoodScreen() {
  const planned = dayMeals(0).find((m) => m.slot === 'dinner');
  const m = burritoBowl;
  return (
    <div className="app__body app__body--sheet">
      <span className="app__grabber" aria-hidden="true" />
      <div className="app__estimate">
        <img src="/images/app/meal-burrito-bowl.jpg" alt="A chicken burrito bowl with rice, black beans, guacamole and salsa" width={720} height={956} loading="lazy" />
        <div className="app__estimate-head">
          <p className="app__estimate-name">{m.name}</p>
          <span className="app__pill-ghost">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5 13.9 9 20.5 11l-6.6 2L12 19.5 10.1 13 3.5 11l6.6-2Z" /></svg>
            estimate
          </span>
        </div>
        <p className="app__big">{m.kcal} <small>kcal</small></p>
        <p className="app__pcf"><b className="p">P</b> {m.proteinG}g <b className="c">C</b> {m.carbsG}g <b className="f">F</b> {m.fatG}g</p>
        <p className="app__assumed">Assumed: {m.assumed}</p>
      </div>
      <div className="app__chips-row" aria-hidden="true">
        <span>Dinner · {slotTime('dinner')}</span>
        {planned && <span>instead of {planned.name}</span>}
      </div>
      <div className="app__note" aria-hidden="true">Add a note</div>
      <div className="app__sheet-actions" aria-hidden="true">
        <span className="is-primary">Save</span>
        <span>Discard</span>
      </div>
    </div>
  );
}
