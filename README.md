# Balegdah

An ode to Balegdah. Achieve perfect pronunciation in three simple steps.

A tiny static site that plays sprite segments of a single mp3: the full
word, then each syllable — **Ba**, **Le**, **Gdah** — individually.

## Running locally

It's a static site with no build step. Serve the repo root with anything:

```
python3 -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` directly via `file://` won't work because the audio
fetch and the ESM import both require an HTTP origin.

## Structure

```
index.html          app shell
assets/app.css      styles (hand-written, single file)
assets/app.js       ES module, imports Howler from a CDN
assets/audio/       bolegda-full.mp3 (the sprite source)
favicon.ico
docs/plans/         design docs
```

## Deploying

Deploys are automated: every push to `master` triggers a GitHub Actions
workflow that runs `wrangler deploy` and publishes to Cloudflare Workers
(Static Assets). Live at **https://balegdah.issunboshi.com**.

Relevant files:

- `wrangler.toml` — Worker config, custom domain, asset directory
- `.assetsignore` — files excluded from the asset upload (docs, CI, etc.)
- `.github/workflows/deploy.yml` — the deploy pipeline

To deploy manually from a local checkout you'd need `wrangler` installed
and the same `CLOUDFLARE_API_TOKEN` + `CLOUDFLARE_ACCOUNT_ID` env vars
set — but the GitHub Actions workflow is the source of truth. Manual
runs can also be kicked off from the Actions tab via `workflow_dispatch`.

See `docs/plans/cf-workers-deploy.md` for the full rationale (including
why Workers rather than Pages).

## History

Originally a 2015 Gulp + JSPM + SystemJS + Vue 1 project. Revived in
2026 as zero-build static HTML. See `docs/plans/static-revival.md`.
