# README.agents.md

Notes for AI agents. Run all commands from the repository root.

## Stack

- Hugo *extended* (the SCSS needs it). Source is `site/`; output is `out/`.
- [Task](https://taskfile.dev) runs everything. See `task --list`.
- Hugo config is in `site/config/_default/`. The root `config/` holds GCS config, not Hugo config.
- `site/themes/hugo-coder` is a submodule. Do not edit it. To override a theme file, put a file at the same path under `site/layouts/`.
- `site/assets/experiments` is also a submodule.

## Commands

| Command                            | Does                                                      |
| ---------------------------------- | --------------------------------------------------------- |
| `task serve`                       | Dev server, images from disk (`DRAFTS=1` shows drafts)    |
| `task serve:prod`                  | Server with images from the bucket, as on Netlify         |
| `task build`                       | Production build into `out/`                              |
| `task new -- post NAME`            | Make `site/content/posts/NAME.md` from the archetype      |
| `task test:experiments`            | Run the experiments' unit tests (needs `node`)            |
| `task check:deploy`                | Check the deploy wiring                                   |
| `task assets:sync:{down,up,prune}` | Sync binaries with GCS (dry run; add `:hard` to do it)    |

## Assets

- Binaries in `site/assets/{fonts,images,posts,projects}/` are gitignored and live in `gs://site-assets.jxf.me`. Do not commit them.
- A new bucket-backed directory needs an entry in `.gitignore` and in `ASSETS_REMOTE_DIRS`. The sync stops if the two differ.
- Refer to binaries only through `_partials/asset.html`. It gives a disk path in development and a bucket URL in production.
- `task check:assets` fetches every bucket URL in `out/`. `task check:probe` checks that the last sync worked.

## Deploy

Netlify runs `deploy.sh` (see `netlify.toml`). It installs the pinned Task and Hugo, then runs `task check:deploy`, `task test:experiments`, `task build` with Netlify's URL, and `task check:assets`.

## Open TODO

Per-environment config overrides (for example `site/config/production/`) do not exist yet.
