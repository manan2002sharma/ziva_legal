import type { Metadata } from 'next';
import { site, money } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Press kit',
  description: 'Facts, a quotable description and images for writing about ZivaAI, the AI meal and workout planner for iPhone.',
  alternates: { canonical: '/press' },
};

const shots = [
  ['01-home', 'Your week, planned for you'],
  ['02-chat', 'Change anything by asking'],
  ['03-meals', 'Meals that fit your goal'],
  ['04-recipe', 'Every recipe, step by step'],
  ['05-workouts', 'Workouts for gym or home'],
  ['06-groceries', 'Your shop, sorted by aisle'],
  ['07-onboarding', 'Built from your answers'],
  ['08-reminders', 'Reminders on cue'],
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
            by typing or by voice, and see each change before it happens. Plans and chats stay on the device.
          </p>
          <h2>Facts</h2>
          <div className="table-scroll">
            <table className="facts">
              <tbody>
                <tr><th>Name</th><td>ZivaAI (App Store name: ZivaAI: Meal &amp; Workout Planner)</td></tr>
                <tr><th>What it is</th><td>AI meal and workout planner with a chat coach</td></tr>
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
