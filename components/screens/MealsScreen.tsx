import { ProgressRing, TabBar } from '@/components/Phone';
import { dayMeals, dayTotals, groceries, slotTime, SLOT_LABEL, targets } from '@/lib/week';

const DAY = 3; // Thursday in the sample week

export function MealsScreen() {
  const t = dayTotals(DAY);
  const bars: [string, number, number, string][] = [
    ['Protein', t.p, targets.proteinG, 'var(--m-protein)'],
    ['Carbs', t.c, targets.carbsG, 'var(--m-carbs)'],
    ['Fat', t.f, targets.fatG, 'var(--m-fat)'],
  ];
  return (
    <div className="app__body">
      <div className="app__head">
        <div>
          <p className="app__eyebrow">This week</p>
          <p className="app__title">Meal</p>
        </div>
        <span className="app__round app__round--badge" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg>
          <b>{groceries.itemCount}</b>
        </span>
      </div>
      <div className="app__days" aria-hidden="true">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className={i === DAY ? 'is-on' : ''}>{d}<b>{19 + i}</b></span>
        ))}
      </div>
      <div className="app__card app__summary">
        <div className="app__summary-top">
          <div>
            <p className="app__big app__big--s">{t.kcal.toLocaleString('en-US')} <small>/ {targets.kcal.toLocaleString('en-US')} kcal</small></p>
            <p className="app__sub">Planned for Thursday · {targets.kcal - t.kcal} under target</p>
          </div>
          <ProgressRing size={52} stroke={6} value={t.kcal / targets.kcal} color="var(--a-text)" />
        </div>
        <div className="app__bars">
          {bars.map(([name, v, max, color]) => (
            <div key={name}>
              <p className="app__bar-label"><i style={{ background: color }} />{name}</p>
              <p className="app__bar-value">{v} / {max} g</p>
              <span className="app__bar"><span style={{ width: `${Math.min(100, (v / max) * 100)}%`, background: color }} /></span>
            </div>
          ))}
        </div>
      </div>
      <div className="app__meals">
        {dayMeals(DAY).map((m) => (
          <div key={m.slot} className="app__card app__meal">
            <ProgressRing size={46} stroke={5} value={m.kcal / targets.kcal} color="var(--a-accent)">
              <span className="app__ring-kcal">{m.kcal}</span>
            </ProgressRing>
            <div className="app__item-main">
              <p className="app__item-meta">{SLOT_LABEL[m.slot]} · {slotTime(m.slot)}</p>
              <p className="app__item-name">{m.name}</p>
              <p className="app__macro-line"><i className="p" />{m.proteinG}g <i className="c" />{m.carbsG}g <i className="f" />{m.fatG}g</p>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="meal" />
    </div>
  );
}
