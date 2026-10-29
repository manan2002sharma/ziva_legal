import { TabBar } from '@/components/Phone';
import { groceries, meals } from '@/lib/week';

export function GroceryScreen() {
  const produce = groceries.aisles.find((a) => a.key === 'produce')!;
  return (
    <div className="app__body">
      <div className="app__head">
        <div>
          <p className="app__eyebrow">This week</p>
          <p className="app__title">Weekly shop</p>
        </div>
        <span className="app__round" aria-hidden="true"><svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M12 15V3M7.5 7.5 12 3l4.5 4.5" /><path d="M5 12v7h14v-7" /></svg></span>
      </div>
      <div className="app__card app__shop">
        <p className="app__sub">Everything for your {meals.length} planned meals this week, in one shop.</p>
        <div className="app__shop-row">
          <div>
            <p className="app__big">{groceries.itemCount} <small>items to buy</small></p>
            <p className="app__sub">Shop on Sunday · {groceries.aisles.length} aisles</p>
          </div>
          <span className="app__cart" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.4 11h10.2L20 7H6.2" /><circle cx="9" cy="19.5" r="1.3" /><circle cx="17" cy="19.5" r="1.3" /></svg></span>
        </div>
        <span className="app__bar"><span style={{ width: `${(2 / groceries.itemCount) * 100}%`, background: 'var(--a-accent)' }} /></span>
        <p className="app__sub">2 of {groceries.itemCount} in cart</p>
      </div>
      <div className="app__row-head"><span>{produce.label}</span><span className="app__muted">{produce.items.length} items</span></div>
      <div className="app__card app__list">
        {produce.items.slice(0, 7).map((it, i) => (
          <div key={it.name} className={`app__item app__grocery ${i < 2 ? 'is-done' : ''}`}>
            <span className="app__check">{i < 2 && <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5" /></svg>}</span>
            <div className="app__item-main">
              <p className="app__item-name">{it.name}</p>
              <p className="app__item-meta">In {it.meals} meals</p>
            </div>
            <span className="app__item-kcal">{it.grams}<small>g</small></span>
          </div>
        ))}
      </div>
      <TabBar active="meal" />
    </div>
  );
}
