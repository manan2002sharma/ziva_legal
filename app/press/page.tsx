import type { Metadata } from 'next';
import { site, money } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Press kit',
  description: 'Facts, a quotable description and images for writing about ZivaAI, the AI meal and workout planner for iPhone.',
  alternates: { canonical: '/press' },
};

const shots = [
  ['01-planner', 'Your week, planned for you'],
  ['02-calorie-counter', 'Snap a meal, get the calories'],
  ['03-ask-ziva', 'Change anything by asking'],
  ['04-workout-tracker', 'Log every set, beat your best'],
  ['05-progress', 'A photo a day, side by side'],
  ['06-diet-plan', 'Meals that fit your goal'],
  ['07-gym-or-home', 'Workouts for the gym or home'],
  ['08-grocery-list', 'Your shop, sorted by aisle'],
];

export default function Press() {
  return (
    <>
      <section className="page-head">
        <div className="wrap">
          <h1>ZivaAI press kit</h1>
          <p>Facts, a description you can quote, and images you can use when writing about ZivaAI.</p>
        </div>
      </section>
      <div className="wrap prose">
        <div className="narrow">
          <h2>ZivaAI in one sentence</h2>
          <p className="lead-answer">{site.definition}</p>
          <h2>Longer description</h2>
          <p>
            ZivaAI plans a full week: breakfast, lunch, dinner and snacks with recipes, calories and macros; workouts of 20 to 60 minutes for a
            gym, a few dumbbells or no equipment; and one grocery list sorted by aisle. People change anything by asking Ziva, the in-app coach,
            by typing or by voice, and see each change before it happens. Since version 1.1, ZivaAI also logs what people actually eat and lift:
            a photo or a one-sentence description of a meal gets a calorie and macro estimate, workouts are logged set by set with personal
            bests and a Lock Screen view, and a daily progress photo builds into a timelapse. Plans, chats, logs and photos stay on the device.
          </p>
          <h2>Facts</h2>
          <div className="table-scroll">
            <table className="facts">
              <tbody>
                <tr><th>Name</th><td>ZivaAI (App Store name: ZivaAI: Meal &amp; Workout Planner)</td></tr>
                <tr><th>What it is</th><td>AI meal and workout planner with a chat coach, photo calorie counting, set logging and progress photos</td></tr>
                <tr><th>Released</th><td>6 November 2026 (1.0); 1.1 added logging and progress</td></tr>
                <tr><th>App Store</th><td><a href={`https://apps.apple.com/app/id${site.appStoreId}`}>ZivaAI: Meal &amp; Workout Planner</a></td></tr>
                <tr><th>Platforms</th><td>{site.platforms}, {site.minOS}</td></tr>
                <tr><th>Price</th><td>ZivaAI Pro, {money(site.price.yearly)} a year or {money(site.price.monthly)} a month</td></tr>
                <tr><th>Category</th><td>Health &amp; Fitness</td></tr>
                <tr><th>Website</th><td><a href={site.url}>zivaai.app</a></td></tr>
                <tr><th>Publisher</th><td>{site.publisher}</td></tr>
                <tr><th>Press contact</th><td><a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a></td></tr>
              </tbody>
            </table>
          </div>
          <h2>How to write the name</h2>
          <p>Write ZivaAI as one word, with a capital A and I. Ziva on its own is the name of the coach inside the app.</p>
          <h2>Images</h2>
          <p>
            <a href="/press-kit/zivaai-app-icon-1024.png">App icon, 1024 × 1024 PNG</a>. Screenshots below link to full size (1320 × 2868 JPEG).
          </p>
        </div>
        <ul className="shots">
          {shots.map(([file, caption]) => (
            <li key={file}>
              <a href={`/press-kit/${file}.jpg`}>
                <img src={`/images/screens/${file}.jpg`} alt={`ZivaAI screenshot: ${caption}`} width={640} height={1391} loading="lazy" />
                {caption}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
