import { ProgressRing, TabBar, TabIcon } from '@/components/Phone';
import { dayMeals, dayWorkouts, slotTime, SLOT_LABEL, targets } from '@/lib/week';

/** A meal logged from a photo instead of the planned lunch, as the 1.1 home screen shows it. */
export const loggedLunch = { name: 'Chicken Caesar salad', kcal: 480, proteinG: 38, carbsG: 18, fatG: 28 };

/** The app's home screen for the sample week's Monday, with breakfast ticked and lunch logged from a photo. */
export function HomeScreen() {
  const [breakfast, lunch, snack] = dayMeals(0);
  const w = dayWorkouts(0)[0];
  const eaten = {
    kcal: breakfast.kcal + loggedLunch.kcal,
    p: breakfast.proteinG + loggedLunch.proteinG,
    c: breakfast.carbsG + loggedLunch.carbsG,
    f: breakfast.fatG + loggedLunch.fatG,
  };
  const tick = (
    <span className="app__tick is-done" aria-hidden="true">
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>
    </span>
  );
  return (
    <div className="app__body">
      <div className="app__head">
        <div>
          <p className="app__eyebrow">Monday</p>
          <p className="app__title">Good afternoon</p>
        </div>
        <div className="app__head-btns" aria-hidden="true">
          <span className="app__round"><TabIcon name="bell" /></span>
          <span className="app__round"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg></span>
        </div>
      </div>

      <div className="app__card app__target">
        <div>
          <p className="app__label">Eaten today</p>
          <p className="app__big">{eaten.kcal.toLocaleString('en-US')}</p>
          <p className="app__sub">/ {targets.kcal.toLocaleString('en-US')} kcal</p>
        </div>
        <ProgressRing size={108} stroke={12} value={eaten.kcal / targets.kcal} color="var(--a-accent)">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-1.5-2-1.5-3C7 10 6 12.5 6 15a6 6 0 0 0 6 6Z" /></svg>
        </ProgressRing>
      </div>

      <div className="app__macros">
        {[
          ['Protein', eaten.p, targets.proteinG, 'var(--m-protein)'],
          ['Carbs', eaten.c, targets.carbsG, 'var(--m-carbs)'],
          ['Fat', eaten.f, targets.fatG, 'var(--m-fat)'],
        ].map(([name, g, of, color]) => (
          <div key={name as string} className="app__card app__macro">
            <p className="app__macro-g">{g}<small>/{of}g</small></p>
            <p className="app__sub">{name}</p>
            <ProgressRing size={34} stroke={5} value={(g as number) / (of as number)} color={color as string} />
          </div>
        ))}
      </div>

      <div className="app__card app__photo-row" aria-hidden="true">
        <span className="app__photo-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round"><path d="M4 8.5A1.5 1.5 0 0 1 5.5 7h2.2l1.6-2h5.4l1.6 2h2.2A1.5 1.5 0 0 1 20 8.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 17.5Z" /><circle cx="12" cy="13" r="3.4" /></svg></span>
        <span>Take today&rsquo;s photo</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m9 5 7 7-7 7" /></svg>
      </div>

      <div className="app__row-head"><span>Today</span><span className="app__muted">Next at {slotTime('snack')}</span></div>
      <div className="app__card app__list">
        <div className="app__item">
          {tick}
          <div className="app__item-main">
            <p className="app__item-meta">{slotTime('breakfast')} · {SLOT_LABEL.breakfast}</p>
            <p className="app__item-name">{breakfast.name}</p>
          </div>
          <span className="app__item-kcal">{breakfast.kcal}<small>kcal</small></span>
        </div>
        <div className="app__item">
          {tick}
          <div className="app__item-main">
            <p className="app__item-meta">{slotTime('lunch')} · {SLOT_LABEL.lunch} <span className="app__tag">Estimate</span></p>
            <p className="app__item-name">{loggedLunch.name}</p>
            <p className="app__item-meta">instead of {lunch.name}</p>
          </div>
          <span className="app__item-kcal">{loggedLunch.kcal}<small>kcal</small></span>
        </div>
        <div className="app__item">
          <span className="app__tick" aria-hidden="true" />
          <div className="app__item-main">
            <p className="app__item-meta">{slotTime('snack')} · {SLOT_LABEL.snack}</p>
            <p className="app__item-name">{snack.name}</p>
          </div>
          <span className="app__item-kcal">{snack.kcal}<small>kcal</small></span>
        </div>
        {w && (
          <div className="app__item">
            <span className="app__tick app__tick--workout" aria-hidden="true" />
            <div className="app__item-main">
              <p className="app__item-meta">6:00 PM · Workout</p>
              <p className="app__item-name">{w.focus}</p>
            </div>
            <span className="app__start">Start</span>
          </div>
        )}
      </div>
      <TabBar active="home" />
    </div>
  );
}
