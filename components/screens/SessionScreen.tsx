import { dayWorkouts } from '@/lib/week';

/** A workout in progress: the first exercise done, two sets of push-ups to go, with last session's numbers. */
const plan: Record<string, { last: string; set: string }> = {
  'Goblet Squat': { last: '3 sets · 25 kg × 12', set: '25 kg × 12' },
  'Push-Up': { last: 'last time 13 reps', set: '10 reps' },
  'Bent-Over Dumbbell Row': { last: 'last time 25 kg × 10', set: '25 kg × 10' },
  'Kettlebell Swing': { last: 'last time 16 kg × 15', set: '16 kg × 15' },
  Plank: { last: 'last time 45 s', set: '40 s' },
};

export function SessionScreen() {
  const w = dayWorkouts(0)[0]; // Monday: Full Body Circuit
  const [done, current, next, later] = w.items;
  const check = (on: boolean) => (
    <span className={`app__tick ${on ? 'is-done' : ''}`} aria-hidden="true">
      {on && <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>}
    </span>
  );
  const sets = (name: string, n: number, doneCount: number, currentIndex = -1) =>
    Array.from({ length: n }, (_, i) => (
      <div key={i} className={`app__set ${i === currentIndex ? 'is-current' : ''}`}>
        <span className="app__set-n">{i + 1}</span>
        <span className="app__set-v">{plan[name]?.set}</span>
        {check(i < doneCount)}
      </div>
    ));
  return (
    <div className="app__body">
      <div className="app__session-head">
        <span className="app__round" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg></span>
        <p>{w.focus}</p>
        <span className="app__pill">End</span>
      </div>

      <div className="app__card app__ex is-done">
        <span className="app__num">1</span>
        <div className="app__item-main">
          <p className="app__item-name">{done.exerciseName}</p>
          <p className="app__item-meta">{plan[done.exerciseName]?.last}</p>
        </div>
        {check(true)}
      </div>

      <div className="app__card app__ex-open">
        <div className="app__ex">
          <span className="app__num">2</span>
          <div className="app__item-main">
            <p className="app__item-name">{current.exerciseName}</p>
            <p className="app__item-meta">{plan[current.exerciseName]?.last}</p>
          </div>
        </div>
        {sets(current.exerciseName, current.sets, 1, 1)}
        <p className="app__set-actions"><b>Log all sets</b><span>Add set</span><span>Skip</span></p>
      </div>

      <div className="app__card app__ex-open">
        <div className="app__ex">
          <span className="app__num">3</span>
          <div className="app__item-main">
            <p className="app__item-name">{next.exerciseName}</p>
            <p className="app__item-meta">{plan[next.exerciseName]?.last}</p>
          </div>
        </div>
        {sets(next.exerciseName, next.sets, 0)}
      </div>

      <div className="app__card app__ex">
        <span className="app__num">4</span>
        <div className="app__item-main">
          <p className="app__item-name">{later.exerciseName}</p>
          <p className="app__item-meta">{plan[later.exerciseName]?.last}</p>
        </div>
      </div>

      <span className="app__go app__go--float">Set done</span>
    </div>
  );
}
