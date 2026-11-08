# ziva_legal: zivaai.app and the legal pages

This repo holds two things:

- `privacy.html`, `terms.html` and `support.html` at the root. GitHub Pages still serves them at
  `manan2002sharma.github.io/ziva_legal/…`, but each one redirects to its zivaai.app page, because the Ziva 1.0 app and
  older App Store listings link there. Keep them at these paths.
- The zivaai.app website (everything else). It renders those same three files at `/privacy`, `/terms` and `/support`,
  so there is one copy of the legal text.

The website is built with Next.js 15 as a static export: `npm run build` writes plain HTML to `out/`,
so every page's text is readable by search engines and AI crawlers without JavaScript.

## Run it locally

```
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in out/
```

## Deploy on Vercel

1. Commit and push this repo.
2. Vercel → Add New → Project → import `manan2002sharma/ziva_legal`. Framework preset: Next.js. Leave the root directory
   and build command as they are.
3. Environment variables (see `.env.example`):
   - `NEXT_PUBLIC_POSTHOG_KEY`: the app's PostHog project key, so web and app events land in one project.
   - `NEXT_PUBLIC_APP_STORE_ID` and `NEXT_PUBLIC_APP_STORE_PT`: once 1.0 is live. Until then every download
     button reads "Coming soon to the App Store". Redeploy after setting them.
4. Project → Settings → Domains: add `zivaai.app` and `www.zivaai.app` (redirect www to the apex), then set the DNS
   records Vercel shows at the domain registrar.
5. Check that https://zivaai.app/robots.txt, /sitemap.xml and /llms.txt load.
6. Google Search Console: add a Domain property for zivaai.app (DNS TXT record), then submit `/sitemap.xml`.
   Bing Webmaster Tools: import the site from Search Console.

## Where things live

| What | File |
| --- | --- |
| Prices, App Store ID, publisher, social profiles (`sameAs`) | `lib/site.ts` |
| FAQ (also feeds the FAQPage schema) | `lib/faq.ts` |
| Calculator formulas and sources | `lib/nutrition.ts` |
| Phone screens on the home page (drawn in HTML from the sample week) | `components/screens/`, data in `lib/week.ts` |
| Privacy, Terms, Support | `privacy.html`, `terms.html`, `support.html` at the repo root (also served by GitHub Pages) |
| Sample week on the home page | `data/sample-week.json`, copied from the app's `SampleWeek.json` |
| Prompt map for AI-search tracking | `data/prompt-map.csv`; rebuild with `npm run prompts -- <path to the app's exercises.json>` |
| robots.txt, sitemap, llms.txt | `app/robots.ts`, `app/sitemap.ts`, `public/llms.txt` |

## App Store campaign tokens

Each download button carries its own `ct=` token, so App Store Connect → App Analytics → Sources shows installs per placement:
`web-home-hero`, `web-home-footer`, `web-pricing`, `web-faq`, `web-tool-macro`, `web-tool-protein`.
Clicks are also sent to PostHog as `app_store_click` with the token.

## Before launch

- Prices on the site ($34.99 a month, $249.99 a year, no free trial) come from `lib/site.ts` and must match App Store Connect.
- Confirm with RepDB that its exercise data may appear on public web pages before adding exercise pages.
