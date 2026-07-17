# Retromakers

Fun facts and stories about 80s/90s/2000s video games. Built with [Astro 7](https://astro.build) — a static site with typed content collections for blog posts and a wiki-style game database.

**Requires Node.js >= 22.12.0.** Astro 7 will refuse to run on older versions (including Node 18, which is end-of-life).

## Project structure

```
src/
  content.config.ts    # schemas + loaders for "blog" and "games" collections
  content/
    blog/*.md          # articles — each has decades, tags, relatedGames
    games/*.md          # game database entries — platform, releaseYear, funFacts
  layouts/
    BaseLayout.astro   # shared <head>, header, footer, fonts
  components/
    Header.astro, Footer.astro, GameCard.astro, ArticleCard.astro, NewsletterForm.astro
  pages/
    index.astro         # homepage
    blog/index.astro     # blog listing
    blog/[...slug].astro # blog post detail (auto-generated per file in content/blog)
    games/index.astro     # game database listing
    games/[...slug].astro # game detail page (auto-generated per file in content/games)
    about.astro, contact.astro
  styles/global.css    # brand colors/fonts (copper, charcoal, cream, teal accent)
```

Adding a new blog post or game entry is just adding a new Markdown file to `src/content/blog/` or `src/content/games/` with the right frontmatter — Astro builds the page automatically and validates the fields against the schema in `src/content.config.ts`.

Note: there's a leftover, unused `src/content/config.ts` file from an earlier scaffold version — it's not read by Astro (the real config is `src/content.config.ts` at the `src/` root). Safe to delete by hand.

## Step 1 — Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:4321.

## Step 2 — Push to GitHub

```bash
git init
git add .
git commit -m "Initial Retromakers scaffold"
```

Create a new repo on GitHub (e.g. `retromakers-site`), then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/retromakers-site.git
git branch -M main
git push -u origin main
```

## Step 3 — Deploy to Netlify

1. Go to [app.netlify.com](https://app.netlify.com) → "Add new site" → "Import an existing project" → connect GitHub → pick the repo.
2. Build command `npm run build`, publish directory `dist` (already set in `netlify.toml`, Netlify should detect it automatically).
3. Deploy. You'll get a temporary `https://your-site-name.netlify.app` URL — check it works before moving to the domain.

## Step 4 — Point retromakers.com at it (domain/hosting is on HostGator)

1. In Netlify: **Site settings → Domain management → Add a domain** → enter `retromakers.com`. Netlify will show you the exact DNS records it needs (usually an A record for the root domain and a CNAME for `www`).
2. In HostGator: log into the customer portal → **cPanel → Zone Editor** for `retromakers.com` → add/edit only the A and CNAME records Netlify gave you.
   - Do **not** change nameservers — that would also move your email, which should stay on HostGator.
3. Wait for DNS to propagate (can take a few minutes to a few hours). Netlify auto-issues a free SSL certificate once it sees the domain pointing correctly, and can force HTTPS.
4. Email (`leslava@retromakers.com`) is untouched by any of this — it keeps using HostGator's existing mail service.

## Step 5 — Add real content

Replace the 3 sample blog posts and 3 sample game entries with real ones. Copy an existing file in `src/content/blog/` or `src/content/games/` and edit the frontmatter + body — Astro will tell you at build time if a required field is missing.

## Step 6 — Newsletter

`src/components/NewsletterForm.astro` has a placeholder Buttondown form action. Sign up for [Buttondown](https://buttondown.email) (or ConvertKit), swap in your real embed URL.

## Step 7 — Contact form

Already wired for [Netlify Forms](https://docs.netlify.com/manage/forms/setup/) (`data-netlify="true"` in `src/pages/contact.astro`) — submissions show up in your Netlify dashboard automatically once deployed, no backend code needed.

## Later / optional

- **Pagefind** — add static search across articles/games once there's enough content to search (`npm install pagefind` + a postbuild step).
- **Decap CMS** — add a `/admin` form-based editor (writes Markdown back to the repo) if you want to publish without opening a code editor.
- **Google Analytics / AdSense** — add the script tags in `BaseLayout.astro`'s `<head>`.
