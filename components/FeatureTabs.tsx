'use client';
import { useState } from 'react';

type Feature = { key: string; title: string; text: string; screen: React.ReactNode };

/** Feature list beside one phone; choosing a feature shows its screen. All text is in the HTML. */
export function FeatureTabs({ features }: { features: Feature[] }) {
  const [active, setActive] = useState(features[0].key);
  return (
    <div className="ftabs">
      <div className="ftabs__stage">
        {features.map((f) => (
          <div key={f.key} className="ftabs__screen" hidden={f.key !== active}>{f.screen}</div>
        ))}
        <div className="ftabs__dots" aria-hidden="true">
          {features.map((f) => <span key={f.key} className={f.key === active ? 'is-on' : ''} />)}
        </div>
      </div>
      <div className="ftabs__list" role="tablist" aria-label="ZivaAI features">
        {features.map((f) => (
          <button
            key={f.key}
            role="tab"
            type="button"
            aria-selected={f.key === active}
            className={`ftabs__item${f.key === active ? ' is-on' : ''}`}
            onClick={() => setActive(f.key)}
          >
            <h3>{f.title}</h3>
            <p>{f.text}</p>
          </button>
        ))}
      </div>
    </div>
  );
}
