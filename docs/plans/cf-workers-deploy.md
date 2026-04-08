# Cloudflare Workers Static Assets — Deploy via GitHub Actions

**Status:** in progress
**Branch:** `feature/cf-workers-deploy`

## Purpose

Wire up automated deploys of Balegdah to Cloudflare Workers (Static
Assets), triggered on push to `master` via GitHub Actions. Target
custom domain: **balegdah.issunboshi.com**.

## Why Workers instead of Pages

Cloudflare Pages has not been formally deprecated, but since late 2024
Cloudflare has clearly deprioritized it in favour of
**Workers Static Assets** as the unified platform. New feature work,
documentation emphasis, and CF's own migration guidance all point at
Workers. For a site being revived in 2026, starting on the path CF is
walking *towards* rather than *away from* is the right call.

Workers Static Assets reached parity with Pages on the bits we care
about:

- Custom domains
- `_headers` / `_redirects` file support
- SPA / 404 fallback handling
- Preview URLs per deployment
- Generous free tier

Because Balegdah is pure static files with no server logic, we omit
the `main` script entry in `wrangler.toml` — CF serves the assets
directly with no Worker runtime in the request path.

## Design

### Tooling

- **Wrangler** via `cloudflare/wrangler-action@v3` (official)
- No local install of wrangler required — the action handles it
- No `package.json` at the repo root — we don't need one just to hold
  wrangler as a devDep; the action uses its own pinned version

### wrangler.toml

```toml
name = "balegdah"
compatibility_date = "2026-04-08"

[assets]
directory = "./"
not_found_handling = "404-page"

[[routes]]
pattern = "balegdah.issunboshi.com"
custom_domain = true
```

Notes:
- `directory = "./"` serves the repo root. `index.html`, `favicon.ico`,
  `assets/*` are all reachable as-is. The deploy workflow checks out
  with no build step.
- We'll add a `.assetsignore` file so `docs/`, `.github/`, `README.md`,
  `LICENSE`, and `wrangler.toml` itself are **not** uploaded as
  servable assets. (Workers Static Assets respects `.assetsignore`
  with gitignore-style syntax.)
- `not_found_handling = "404-page"` serves `/404.html` on miss if we
  ever add one; until then CF returns a default 404. We are *not* using
  `single-page-application` mode because there's only one page.
- `custom_domain = true` on the route tells CF to provision + manage
  the cert and DNS record for `balegdah.issunboshi.com`. Requires the
  `issunboshi.com` zone to already be on Cloudflare DNS.

### .assetsignore

```
.git
.github
.worktrees
docs
node_modules
wrangler.toml
.assetsignore
README.md
LICENSE
.editorconfig
.gitignore
```

### .github/workflows/deploy.yml

- Trigger: `push` to `master` (and `workflow_dispatch` for manual runs)
- Permissions: `contents: read`
- Single job on `ubuntu-latest`:
  1. `actions/checkout@v4`
  2. `cloudflare/wrangler-action@v3` with `command: deploy`
- Concurrency group keyed on the workflow + ref so only one deploy runs
  at a time per branch

### Required GitHub Actions secrets

- `CLOUDFLARE_API_TOKEN` — scoped token, "Edit Cloudflare Workers"
  template. Because we're provisioning a custom domain on
  `issunboshi.com`, the token also needs **Zone → DNS → Edit** on the
  `issunboshi.com` zone. If the "Edit Workers" template doesn't
  include this by default, edit the token to add it.
- `CLOUDFLARE_ACCOUNT_ID` — the account the Worker lives under.

Both are already added by Cliff.

## Steps

1. Plan doc (this file) ✅
2. Add `wrangler.toml`
3. Add `.assetsignore`
4. Add `.github/workflows/deploy.yml`
5. Update README with a "Deploys" section
6. Commit atomically, push, open PR
7. After merge: first deploy runs automatically; verify
   `https://balegdah.issunboshi.com` serves the app
8. If custom domain provisioning fails (token scope), re-issue the API
   token with DNS:Edit on the issunboshi.com zone and re-run the workflow

## Known risks / gotchas

- **Token scope for custom domain:** the default "Edit Cloudflare
  Workers" template may not include zone DNS edit permission. If the
  first deploy fails on route provisioning, this is almost certainly
  why.
- **`compatibility_date`:** pinned to the plan date. Bump periodically
  to pick up runtime changes.
- **`.assetsignore` syntax:** gitignore-style but evaluated by
  wrangler, not git. Double-check which dotfiles get uploaded after
  first deploy by browsing
  `https://balegdah.issunboshi.com/.github/workflows/deploy.yml` —
  it should 404.
- **Worker name uniqueness:** `balegdah` is the Worker name within the
  CF account. If a prior Worker with that name exists, wrangler will
  update it, not error. Verify in the dashboard post-deploy.

## Deploy

Hands-off: push to `master` → GitHub Actions → `wrangler deploy` →
`balegdah.issunboshi.com` updated. No manual steps after initial setup.
