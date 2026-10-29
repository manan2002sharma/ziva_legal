import { MacroRing, ProgressRing, TabBar } from '@/components/Phone';
import { dayMeals, dayWorkouts, macroSplit, slotTime, SLOT_LABEL, targets } from '@/lib/week';

/** The app's home screen for the sample week's Monday. */
export function HomeScreen() {
  const today = dayMeals(0);
  const w = dayWorkouts(0)[0];
  return (
    <div className="app__body">
      <div className="app__head">
        <div>
          <p className="app__eyebrow">Monday</p>
          <p className="app__title">Good afternoon</p>
        </div>
        <span className="app__round" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg></span>
      </div>

      <div className="app__card app__target">
        <div>
          <p className="app__label">Daily target</p>
          <p className="app__big">{targets.kcal.toLocaleString('en-US')}</p>
          <p className="app__sub">kcal a day</p>
          <span className="app__chip">Lose 0.5 kg / wk</span>
        </div>
        <MacroRing size={112} stroke={13} p={macroSplit.p} c={macroSplit.c} f={macroSplit.f}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21a6 6 0 0 0 6-6c0-4-3-6-4-10-2 2-3 4-3 6-1-1-1.5-2-1.5-3C7 10 6 12.5 6 15a6 6 0 0 0 6 6Z" /></svg>
        </MacroRing>
      </div>

      <div className="app__macros">
        {[
          ['Protein', targets.proteinG, macroSplit.p, 'var(--m-protein)'],
          ['Carbs', targets.carbsG, macroSplit.c, 'var(--m-carbs)'],
          ['Fat', targets.fatG, macroSplit.f, 'var(--m-fat)'],
        ].map(([name, g, pct, color]) => (
          <div key={name as string} className="app__card app__macro">
            <p className="app__macro-g">{g}g</p>
            <p className="app__sub">{name}</p>
            <ProgressRing size={40} stroke={5} value={(pct as number) / 100} color={color as string}>
              <span className="app__pct">{pct}%</span>
            </ProgressRing>
          </div>
        ))}
      </div>

      <div className="app__row-head"><span>Today</span><span className="app__muted">Next at 1:00 PM</span></div>
      <div className="app__card app__list">
        {today.map((m) => (
          <div key={m.slot} className="app__item">
            <span className="app__dot" style={{ background: 'var(--a-accent)' }} />
            <div className="app__item-main">
              <p className="app__item-meta">{slotTime(m.slot)} · {SLOT_LABEL[m.slot]}</p>
              <p className="app__item-name">{m.name}</p>
            </div>
            <span className="app__item-kcal">{m.kcal}<small>kcal</small></span>
          </div>
        ))}
        {w && (
          <div className="app__item">
            <span className="app__dot" style={{ background: 'var(--a-workout)' }} />
            <div className="app__item-main">
              <p className="app__item-meta">6:00 PM · Workout</p>
              <p className="app__item-name">{w.focus}</p>
            </div>
            <span className="app__item-kcal">{w.estimatedMinutes}<small>min</small></span>
          </div>
        )}
      </div>
      <TabBar active="home" />
    </div>
  );
}
