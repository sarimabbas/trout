# Preserved Trout site

Trout is defunct. Only the marketing site, demo video, and documentation are
published at https://trout.lil.run, with documentation under `/docs/`.
The webhook application, CLI service infrastructure, cron jobs, and secrets are
not deployed. The backend source remains here for reference.

## Build and deploy

Use Node 22 and Corepack:

```sh
corepack pnpm@8.6.7 install:site
corepack pnpm@8.6.7 build:site
npx wrangler@4.129.0 deploy
```

The static installer uses the four package-local lockfiles so it does not install
the backend's unavailable historical Xata CLI dependency. The docs pin sitemap
to its original compatible version; later 7.1.x versions reject the old Astro
integration's output path.

`scripts/assemble-site.mjs` combines the marketing export and docs into `dist/`.
Cloudflare serves only this directory; no server bundle or environment variables
are required. The custom domain is declared in `wrangler.jsonc`.

Before removing Vercel's `trout-marketing` and `trout-docs` projects, verify the
new domain's homepage, `/docs/`, `/docs/tutorial/`, screenshots, and `/promo.mp4`.
The old `*.vercel.app` URLs cannot be retained after deleting their projects.
