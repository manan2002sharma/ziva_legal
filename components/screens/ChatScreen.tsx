import { dayMeals } from '@/lib/week';

/**
 * Asking Ziva to swap Sunday's dinner. The replacement (Chickpea & Spinach Curry, 560 kcal, 24 g protein)
 * is the one the app proposed in the App Store capture (Design/app-store, slide 2).
 */
export function ChatScreen() {
  const old = dayMeals(6).find((m) => m.slot === 'dinner')!;
  return (
    <div className="app__body app__body--chat">
      <div className="app__chat-head">
        <span className="app__round" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="m6 9 6 6 6-6" /></svg></span>
        <div className="app__chat-title">
          <p><img src="/images/ziva.png" alt="" width={16} height={18} /> Ziva</p>
          <span>Opened from Meal</span>
        </div>
        <span className="app__round" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg></span>
      </div>
      <div className="app__thread">
        <p className="app__bubble app__bubble--me">Swap Sunday&rsquo;s dinner for something vegetarian</p>
        <p className="app__bubble">Sure, I&rsquo;ll swap it. Here&rsquo;s the change, nothing moves until you confirm.</p>
        <div className="app__card app__change">
          <p className="app__change-kicker">Proposed change</p>
          <p className="app__change-title">Updating meals, groceries and reminders</p>
          <div className="app__change-row app__change-row--old">
            <span className="app__change-icon">−</span>
            <div><p>{old.name}</p><span>Dinner · {old.kcal} kcal · {old.proteinG} g protein</span></div>
          </div>
          <div className="app__change-row">
            <span className="app__change-icon app__change-icon--new">+</span>
            <div><p>Chickpea &amp; Spinach Curry</p><span>Dinner · 560 kcal · 24 g protein</span></div>
          </div>
          <p className="app__change-note">1 meal replaced. A vegetarian curry with a similar calorie count; the grocery list updates too.</p>
          <div className="app__change-actions"><span>Cancel</span><span className="is-primary">Confirm</span></div>
        </div>
      </div>
      <div className="app__composer" aria-hidden="true">
        <span>Message Ziva…</span>
        <span className="app__composer-btns">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round"><rect x="9" y="3" width="6" height="11" rx="3" /><path d="M5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21" /></svg>
          <b><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M6 11l6-6 6 6" /></svg></b>
        </span>
      </div>
    </div>
  );
}
