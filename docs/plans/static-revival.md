# Static Revival

**Status:** in progress
**Branch:** `feature/static-revival`

## Purpose

Revive the 2015 Bolegda toy as a zero-build static site. The original used Gulp + JSPM + SystemJS + Vue 1 + node-sass beta — all dead ecosystems. The "app" itself is ~35 lines of meaningful code (an mp3 sprite player with 4 buttons), so the toolchain vastly outweighs the product.

## Goals

- Zero build step — plain `index.html` + `app.css` + `app.js` (ES module)
- Deployable as-is to GitHub Pages / Cloudflare Pages
- Will still run in 10 years
- Look noticeably better than the original
- Fix latent bugs from the original

## Non-goals

- No framework (Vue/React/etc.)
- No bundler, no Sass, no package.json at the root
- No new features beyond the original four actions (play full, play ba/le/gda, stop, loop)

## Design

- **Layout:** single centered column, mobile-first, dark background
- **Hero:** three large tactile syllable tiles — **Ba** / **Le** / **Gda** — in Jamaican flag colors on black
- **Secondary controls:** "play full" pill above the tiles; stop + loop toggle below
- **Typography:** system display font stack (no Typekit dependency)
- **Interactions:** press animation on tiles, `aria-pressed` on loop toggle, visible loading state while the mp3 decodes

### Palette

```css
--bg:  #000000;   /* Jamaican flag black */
--ba:  #009B3A;   /* Jamaican flag green */
--le:  #F5F5F0;   /* off-white */
--gda: #FED100;   /* Jamaican flag yellow */
--fg:  #F5F5F0;
```

## File layout (after revival)

```
index.html          # the whole app shell
assets/
  app.css           # hand-written, single file
  app.js            # ES module, imports Howler from CDN
  audio/bolegda-full.mp3   # unchanged
favicon.ico         # unchanged
docs/plans/archive/static-revival.md  # (on completion)
```

Everything under `assets/js/`, `assets/css/src`, `assets/css/dist`, `assets/gulpfile.js`, `assets/package.json`, and the old `index.html` SystemJS bootstrap gets deleted.

## Bug fixes rolled in

1. **Loop toggle** — original only ever calls `sound.loop(true)`; new version toggles and reflects state via `aria-pressed`
2. **Project identity** — drop the stray `just-eat-royal-kebabby` name and Beanstalk repo URL from `assets/package.json` by removing that file entirely
3. **Typekit** — remove the async loader (the kit may be gone, silent failure)
4. **Accessibility** — `aria-label`s on all buttons, focus styles, reduced-motion fallback

## Sprite timings

Preserved from the original for now:

```
full: [0, 600]
ba:   [0, 219]
le:   [220, 260]   # flagged as suspicious — 40ms is very short
gda:  [370, 450]
```

If `le` sounds wrong after revival, retime against the mp3 in a follow-up.

## Steps

1. Scaffold plan doc + branch + worktree ✅
2. Write new `index.html`, `assets/app.css`, `assets/app.js`
3. Delete legacy files (`assets/js/`, `assets/css/`, `assets/gulpfile.js`, `assets/package.json`, old `.jscsrc`)
4. Keep `assets/audio/bolegda-full.mp3` and `favicon.ico`
5. Add a real `README.md`
6. Manual smoke test in a browser
7. Commit atomically, open PR

## Deploy

Static hosting — any of GitHub Pages, Cloudflare Pages, Netlify. No CI required.
