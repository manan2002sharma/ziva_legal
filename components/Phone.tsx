/**
 * An iPhone frame around a 390 × 844 screen drawn in HTML. `scale` sets the on-page size
 * (0.7 → 273 px wide screen). The screen's text stays real text, so crawlers can read it.
 */
export function Phone({ children, scale = 0.7, dark = false, className = '', label }: { children: React.ReactNode; scale?: number; dark?: boolean; className?: string; label: string }) {
  return (
    <figure className={`phone ${dark ? 'phone--dark' : ''} ${className}`} style={{ ['--s' as string]: scale }} aria-label={label}>
      <div className="phone__glass">
        <div className={`app ${dark ? 'app--dark' : ''}`}>
          <div className="app__status" aria-hidden="true">
            <span>9:41</span>
            <span className="app__island" />
            <span className="app__status-icons">
              <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
              <svg width="25" height="12" viewBox="0 0 25 12"><rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill="none" stroke="currentColor" opacity=".4" /><rect x="2" y="2" width="18" height="8" rx="2" /><rect x="23" y="4" width="1.5" height="4" rx=".75" opacity=".4" /></svg>
            </span>
          </div>
          {children}
        </div>
      </div>
    </figure>
  );
}

/** The app's floating tab bar, with the Ziva button at the end. */
export function TabBar({ active }: { active: 'home' | 'workout' | 'meal' | 'progress' }) {
  const tabs: [typeof active, string, string][] = [['home', 'Home', 'home'], ['workout', 'Workout', 'workout'], ['meal', 'Meal', 'meal'], ['progress', 'Progress', 'calendar']];
  return (
    <div className="app__tabs" aria-hidden="true">
      <div className="app__tabbar">
        {tabs.map(([k, label, icon]) => (
          <span key={k} className={`app__tab ${k === active ? 'is-on' : ''}`}>
            <TabIcon name={icon} />
            {label}
          </span>
        ))}
      </div>
      <span className="app__ziva"><img src="/images/ziva.png" alt="" width={30} height={33} /></span>
    </div>
  );
}

export function TabIcon({ name }: { name: string }) {
  const d: Record<string, string> = {
    home: 'M4 11 12 4l8 7v9h-5v-6H9v6H4Z',
    workout: 'M6.5 6.5v11M17.5 6.5v11M3.5 9v6M20.5 9v6M6.5 12h11',
    meal: 'M7 3v8a2 2 0 0 0 2 2v8M5 3v5M9 3v5M17 21V3c-2 0-3 2-3 6v4h3',
    bell: 'M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15ZM10 20.5a2 2 0 0 0 4 0',
    calendar: 'M4 6.5A1.5 1.5 0 0 1 5.5 5h13A1.5 1.5 0 0 1 20 6.5v12a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 4 18.5ZM4 10h16M8 3v4M16 3v4M8 13.5h2M14 13.5h2M8 16.5h2',
  };
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d={d[name]} /></svg>
  );
}

/** A ring split into protein, carbs and fat, as on the app's home screen. */
export function MacroRing({ size = 108, stroke = 12, p, c, f, children }: { size?: number; stroke?: number; p: number; c: number; f: number; children?: React.ReactNode }) {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r, gap = 6;
  const total = p + c + f;
  const segs = [
    { v: p, color: 'var(--m-protein)' },
    { v: c, color: 'var(--m-carbs)' },
    { v: f, color: 'var(--m-fat)' },
  ];
  let off = 0;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <g transform={`rotate(-90 ${size / 2} ${size / 2})`}>
          {segs.map((s, i) => {
            const len = (s.v / total) * C;
            const el = <circle key={i} cx={size / 2} cy={size / 2} r={r} fill="none" stroke={s.color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${Math.max(len - gap, 1)} ${C}`} strokeDashoffset={-off} />;
            off += len;
            return el;
          })}
        </g>
      </svg>
      {children && <div className="ring__center">{children}</div>}
    </div>
  );
}

/** A single-value progress ring (one macro, or calories eaten against the target). */
export function ProgressRing({ size = 44, stroke = 5, value, color, children }: { size?: number; stroke?: number; value: number; color: string; children?: React.ReactNode }) {
  const r = (size - stroke) / 2, C = 2 * Math.PI * r;
  return (
    <div className="ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden="true">
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--a-fill)" strokeWidth={stroke} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeDasharray={`${Math.min(value, 1) * C} ${C}`} transform={`rotate(-90 ${size / 2} ${size / 2})`} />
      </svg>
      {children && <div className="ring__center">{children}</div>}
    </div>
  );
}
