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

Any static host works — GitHub Pages, Cloudflare Pages, Netlify. Point
it at the repo root; there is nothing to build.

## History

Originally a 2015 Gulp + JSPM + SystemJS + Vue 1 project. Revived in
2026 as zero-build static HTML. See `docs/plans/static-revival.md`.
