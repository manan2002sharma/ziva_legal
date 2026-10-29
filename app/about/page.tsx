import type { Metadata } from 'next';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'About',
  description: 'Who makes ZivaAI, what it does and how it writes your plan.',
  alternates: { canonical: '/about' },
};

export default function About() {
  return (
    <>
      <section className="page-head">
        <div className="wrap narrow">
          <h1>About ZivaAI</h1>
          <p>{site.definition}</p>
        </div>
      </section>
      <div className="wrap narrow prose">
        <h2>Why it exists</h2>
        <p>
          Planning a week of meals and training takes hours, and most apps handle only one half. ZivaAI plans both from the same answers,
          builds the grocery list from the meals, and lets you change any of it by asking.
        </p>
        <h2>How ZivaAI writes your plan</h2>
        <p>
          After you agree, your answers go through ZivaAI&rsquo;s server to OpenAI, which writes the plan. Each meal shows its calories, protein,
          carbs and fat. Exercise pictures and instructions come from RepDB&rsquo;s exercise dataset. Your plan and chats are stored on your
          device, not on ZivaAI&rsquo;s servers.
        </p>
        <h2>Who makes it</h2>
        <p>ZivaAI is published by {site.publisher}, its founder.</p>
        <h2>Contact</h2>
        <p>Email <a href={`mailto:${site.supportEmail}`}>{site.supportEmail}</a>. For help with the app, see <a href="/support">Support</a>; for writing about ZivaAI, see the <a href="/press">press kit</a>.</p>
      </div>
    </>
  );
}
