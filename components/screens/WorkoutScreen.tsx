import { TabBar } from '@/components/Phone';
import { dayWorkouts, workoutsThisWeek } from '@/lib/week';

export function WorkoutScreen() {
  const w = dayWorkouts(2)[0]; // Wednesday: Lower Body Strength
  const sets = w.items.reduce((n, i) => n + i.sets, 0);
  const trainDays = new Set([0, 1, 2, 4]);
  return (
    <div className="app__body">
      <div className="app__head">
        <div>
          <p className="app__eyebrow">This week</p>
          <p className="app__title">Workout</p>
        </div>
        <span className="app__round" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9"><circle cx="12" cy="8.5" r="3.5" /><path d="M5 20a7 7 0 0 1 14 0" /></svg></span>
      </div>
      <p className="app__sub app__pad">{workoutsThisWeek} workouts this week</p>
      <div className="app__days" aria-hidden="true">
        {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
          <span key={i} className={`${i === 2 ? 'is-on' : ''} ${trainDays.has(i) ? 'has-dot' : ''}`}>{d}<b>{19 + i}</b></span>
        ))}
      </div>
      <div className="app__card app__session">
        <p className="app__item-meta app__workout-meta">Wednesday · 6:00 PM</p>
        <p className="app__session-title">{w.focus}</p>
        <div className="app__session-stats">
          <div><b>{w.estimatedMinutes}</b><span>minutes</span></div>
          <div><b>{w.items.length}</b><span>exercises</span></div>
          <div><b>{sets}</b><span>sets</span></div>
        </div>
        <span className="app__go">Go through exercises</span>
      </div>
      <div className="app__card app__list">
        {w.items.map((it, i) => (
          <div key={it.exerciseName} className="app__item">
            <span className="app__num">{i + 1}</span>
            <div className="app__item-main">
              <p className="app__item-name">{it.exerciseName}</p>
              <p className="app__item-meta">{it.sets} × {it.reps}{it.restSeconds ? ` · ${it.restSeconds} s rest` : ''}</p>
            </div>
          </div>
        ))}
      </div>
      <TabBar active="workout" />
    </div>
  );
}
