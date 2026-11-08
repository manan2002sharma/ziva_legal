import { TabBar } from '@/components/Phone';

/** Progress photos, newest first. The person is invented: the app's sample photos, made with an image model. */
const photos = [
  ['progress-6', 'Nov 8'], ['progress-5', 'Nov 7'], ['progress-4', 'Nov 6'],
  ['progress-3', 'Nov 5'], ['progress-2', 'Nov 4'], ['progress-1', 'Nov 3'],
];

export function PhotosScreen() {
  return (
    <div className="app__body">
      <span className="app__round app__back" aria-hidden="true"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round"><path d="m15 5-7 7 7 7" /></svg></span>
      <div className="app__head app__head--tight">
        <div>
          <p className="app__eyebrow">{photos.length} photos</p>
          <p className="app__title">Photos</p>
        </div>
      </div>
      <div className="app__photo-actions" aria-hidden="true">
        <span className="is-primary">Take today&rsquo;s photo</span>
        <span>Timelapse</span>
        <span>Compare</span>
      </div>
      <div className="app__photos">
        {photos.map(([f, d]) => (
          <figure key={f}>
            <img src={`/images/app/${f}.jpg`} alt={`Progress photo, ${d}`} width={300} height={398} loading="lazy" />
            <figcaption>{d}</figcaption>
          </figure>
        ))}
      </div>
      <TabBar active="progress" />
    </div>
  );
}
