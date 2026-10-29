import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="wrap narrow prose">
      <h1>This page doesn&rsquo;t exist</h1>
      <p>The link may be old or mistyped. Go to the <Link href="/">ZivaAI home page</Link> or the <Link href="/faq">FAQ</Link>.</p>
    </div>
  );
}
