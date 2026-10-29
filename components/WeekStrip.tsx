import { DAYS, dayMeals, dayTotals, dayWorkouts, SLOT_LABEL } from '@/lib/week';

/** The app's sample week as text, so search engines and AI assistants can read a real plan. */
export function WeekStrip() {
  return (
    <div className="week" role="list" aria-label="A sample week planned by ZivaAI">
      {DAYS.map((day, i) => {
        const ws = dayWorkouts(i);
        return (
          <article key={day} role="listitem" className="week__day">
            <header className="week__head">
              <h3>{day}</h3>
              <span>{dayTotals(i).kcal.toLocaleString('en-US')} kcal</span>
            </header>
            {ws.length ? (
              ws.map((w) => (
                <p key={w.focus} className="week__workout"><i /><b>{w.focus}</b><span>{w.estimatedMinutes} min</span></p>
              ))
            ) : (
              <p className="week__workout week__workout--rest"><i /><b>Rest day</b></p>
            )}
            <ul className="week__meals">
              {dayMeals(i).map((m) => (
                <li key={m.slot}><span>{SLOT_LABEL[m.slot]}</span>{m.name}</li>
              ))}
            </ul>
          </article>
        );
      })}
    </div>
  );
}
