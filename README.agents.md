# README.agents.md

A reference for AI agents working on this repository. The user-facing README
is intentionally sparse; this file captures the structural details an agent
needs to make safe edits.

## What this is

A personal-blog Hugo site built on the [hugo-coder](https://github.com/fj/hugo-coder)
theme (a fork at `site/themes/hugo-coder`, vendored as a git submodule —
see `.gitmodules`). Hugo's *extended* build is required (SCSS support).

The repository is currently a **skeleton**: it ships configuration, theme
overrides, and SCSS, but `site/content/` does not exist yet — content will
be created via `task new-post`.

## Top-level layout

```
.
├── README.md           Lewis Carroll epigraph + dependencies + author's TODOs
├── Taskfile.yml        Task runner (build, serve, sync, new-post, clean)
├── deploy.sh           Netlify build hook (installs the pinned Task + Hugo, runs `task build`)
├── netlify.toml        Netlify build command, publish dir, and pinned tool versions
├── .gitmodules         Pins site/themes/hugo-coder and site/assets/experiments
├── config/             Cloud infra config (NOT Hugo config — that lives in site/config/)
│   └── gcs-cors.json   CORS policy for the GCS assets bucket (see `task assets:cors:sync:up`)
├── out/                Hugo build output (gitignored)
└── site/               Hugo project root — passed to hugo as --source
    ├── config/         Hugo config (directory-based; merged per environment)
    │   └── _default/   Base config for every environment
    │       ├── hugo.yaml       Root settings: baseURL, title, theme, taxonomies, markup
    │       ├── params.yaml     Site params: assets, customJS, customizations, authorData, social
    │       └── languages.yaml  Languages + the `main` navigation menu (en)
    ├── archetypes/
    │   └── posts.md    Front-matter template for `task new-post`
    ├── assets/
    │   ├── images/     Binary images (gitignored — synced from GCS)
    │   └── styles/     SCSS pipeline
    │       ├── base.scss     Entry point (referenced from config/_default/params.yaml)
    │       ├── common.scss   Responsive breakpoint mixins
    │       └── author.scss   .about styles
    ├── layouts/        Site-level overrides of the theme
    │   └── partials/
    │       ├── head/custom-styles.html  Compiles SCSS via Hugo Pipes
    │       └── home/                     Customized homepage partials
    │           ├── author.html           Renders authorData.name + tagline
    │           ├── avatar.html           Honors authorData.avatar.url, falls back to gravatar
    │           ├── extensions.html       (empty)
    │           └── sections.html         Two-column "Posts" + "Events" lists (MODIFIED)
    ├── resources/      Hugo build cache (gitignored)
    └── themes/
        └── hugo-coder/ Vendored theme (submodule — DO NOT edit in place)
```

## Theme override mechanism

Hugo merges `site/layouts/` over `site/themes/hugo-coder/layouts/`. Files in
the local `layouts/` shadow the theme's identically named files. The current
overrides:

| Local file                                  | Shadows                                              | Purpose                                        |
| ------------------------------------------- | ---------------------------------------------------- | ---------------------------------------------- |
| `partials/head/custom-styles.html`          | theme's `_partials/head/custom-styles.html`          | Pipes `Site.Params.customizations.styles` through `toCSS \| minify \| fingerprint` (with sourcemaps in dev) |
| `partials/home/author.html`                 | theme's `_partials/home/author.html`                 | Reads `authorData.name` / `authorData.tagline` |
| `partials/home/avatar.html`                 | theme's `_partials/home/avatar.html`                 | Reads `authorData.avatar.url`; gravatar fallback |
| `partials/home/extensions.html`             | theme's `_partials/home/extensions.html`             | Empty — explicit no-op                          |
| `partials/home/sections.html`               | theme's stub `_partials/home/sections.html`          | Renders Posts and Events grid on the homepage   |

> **Don't edit anything under `site/themes/hugo-coder/`** — it's a submodule
> tracking an upstream fork. To change theme behavior, add or modify a file
> under `site/layouts/` with the same relative path (note: theme uses
> `_partials/`, but local overrides go in `partials/` — Hugo resolves both).

## Content model

Content lives in `site/content/` (not yet created). Two primary sections are
referenced by the homepage:

- **`posts/`** — blog posts. `task new-post ITEM_NAME=foo` creates
  `site/content/posts/foo.md` from `archetypes/posts.md`.
- **`events/`** — talks/conferences. No archetype exists yet; create one if
  you add this section formally.

The homepage (`partials/home/sections.html`) shows the first 5 entries of
each section, sorted by Hugo's default (date desc), with a "View all" link.

### Front-matter (from `archetypes/posts.md`)

```yaml
draft: true
date: "{{ .Date }}"
title: "example-title"
description: "example-description"
slug: ""
authors: []
tags: []
categories: []
externalLink: ""
series: []
```

`tags`, `categories`, `authors`, and `series` are all theme-supported
taxonomies — the theme ships taxonomy partials for each
(`_partials/taxonomy/{tags,categories,authors}.html` and
`_partials/posts/series.html`).

### Navigation menu (from `config/_default/languages.yaml`)

| Label | URL           | Notes                                  |
| ----- | ------------- | -------------------------------------- |
| Blog  | `/posts/`     | Section listing                        |
| Work  | `/projects/`  | Expects `content/projects.md` (single) |
| Meta  | `/meta/`      | Expects `content/meta/` or `meta.md`   |
| Self  | `/about/`     | Expects `content/about.md` — note the social "Connect" link points to `/self.html#connect`, suggesting an upcoming rename |

None of these targets exist yet; creating them is part of standing up the site.

## Asset pipeline

Two distinct asset flows:

1. **SCSS** — `site/assets/styles/base.scss` is listed in
   `config/_default/params.yaml` under `customizations.styles` (i.e. the
   effective key `params.customizations.styles`). The override at
   `layouts/partials/head/custom-styles.html` reads that list and runs each
   entry through Hugo Pipes:
   - **Server mode** (`hugo server`): `toCSS` with sourcemaps, no fingerprint.
   - **Build mode**: `toCSS | minify | fingerprint` with SRI integrity hashes.

2. **Binaries** — the gitignored trees `site/assets/{fonts,images,posts,projects}/`
   are stored in GCS (`gs://site-assets.jxf.me`) and synced via Taskfile:
   - `task assets:sync:down` (dry-run) / `task assets:sync:down:hard` (actual)
   - `task assets:sync:up`   (dry-run) / `task assets:sync:up:hard`   (actual)
   - `task assets:sync:prune` (dry-run) / `:prune:hard` — delete bucket entries
     outside those trees

   That list is `ASSETS_REMOTE_DIRS` in `Taskfile.yml`, and it must stay in
   agreement with the gitignore block naming the same paths — all three tasks
   depend on `assets:sync:_check`, which derives the truth from `git
   check-ignore` and refuses to sync on drift in either direction. The sync is
   deliberately per-tree rather than over `site/assets` as a whole: the rest of
   that tree (`js/`, `scss/`, `styles/`, `experiments/`) is version-controlled
   source that Hugo Pipes compiles into the build output, so pushing it to the
   bucket publishes files nothing fetches — and pulling it back down would
   clobber the working copy with stale ones.

   Auth is ambient: whatever `gcloud` account is active, so the same commands
   work interactively (`gcloud auth login`) and in CI
   (`gcloud auth activate-service-account`). A precondition fails fast if
   neither is set up.

   The avatar URL in `config/_default/params.yaml` is hardcoded to a public S3 URL
   (`https://s3.amazonaws.com/assets.jxf.me/images/jf.jpeg`) — see the
   author's TODOs in `README.md` about making prod/dev image paths
   environment-aware.

## Common commands

All run from the repo root via [Task](https://taskfile.dev):

| Command                       | What it does                                             |
| ----------------------------- | -------------------------------------------------------- |
| `task serve:dev`              | Live-reload server in the development environment — images served from disk, sourcemapped CSS (cleans first) |
| `task serve:prod`             | Live-reload server in the production environment — images served from the GCS bucket, minified CSS; mirrors the Netlify build (cleans first) |
| `task build`                  | Production build into `./out/`                            |
| `task clean`                  | Remove `out/` and `site/resources/`                       |
| `task new-post ITEM_NAME=foo` | Scaffold `site/content/posts/foo.md` from the archetype   |
| `task assets:sync:down` / `:down:hard` | Pull the bucket-backed asset trees from GCS (dry-run / actual) |
| `task assets:sync:up`   / `:up:hard`   | Push the bucket-backed asset trees to GCS (dry-run / actual)  |
| `task assets:sync:prune` / `:prune:hard` | Delete bucket entries outside those trees (dry-run / actual) |

Direct Hugo invocation (when Task isn't appropriate):

```sh
hugo server --source site --destination out          # dev
hugo --source site --destination out                 # build
hugo new content -k posts --source site posts/foo.md # new post
```

## Deployment

`netlify.toml` holds the deploy configuration — Netlify prefers it to the
settings in its web UI, so the build stays in version control. It runs
`./deploy.sh` and publishes `out/`.

`deploy.sh` installs the Task and Hugo that `netlify.toml` pins into `./bin`,
ahead of the build image's own Hugo, checks that it got them, then runs `task
build`. The pinned Hugo is the *extended* build, which the SCSS pipeline needs.
Raise `SITE_HUGO_VERSION` in `netlify.toml` to move the deploy to a newer Hugo.
The pins avoid the name `HUGO_VERSION` on purpose: Netlify's build image reads
that key and provisions a Hugo of its own from it.

Both submodules are public over HTTPS, so Netlify checks them out on its own.
A build that reports missing layouts (the theme) or a missing experiment
manifest is a build whose submodules did not check out.

## Outstanding TODOs (from README.md)

These are unresolved decisions the author flagged — useful context if a
proposed change touches them:

1. **Image path strategy** — should production read images from S3 while
   dev reads them locally? The avatar partial is the proposed test bed.
   Open Hugo forum thread:
   https://discourse.gohugo.io/t/best-practice-for-serving-different-images-in-production-vs-development/50560
2. **Per-environment overrides** — leverage Hugo's environment configs
   for production-only overrides (e.g., the image path issue above). The
   directory-based config now in `site/config/_default/` is the base layer;
   add a sibling `site/config/production/` (or `development/`) to override
   per environment — `task serve:dev` / `serve:prod` already pass
   `--environment`, and `task build` builds in production by default.

Config location (Hugo's directory-based config under `site/config/_default/`)
is **done** — the legacy `site/config.yaml` was split into `hugo.yaml`,
`params.yaml`, and `languages.yaml` there.

## Gotchas for agents

- **The theme is a submodule.** Don't edit `site/themes/hugo-coder/`
  directly. Override via `site/layouts/`.
- **Theme uses `_partials/`, project uses `partials/`.** Both paths resolve
  to the same lookup namespace in Hugo — keep using `partials/` for new
  overrides for consistency with what's already here.
- **No `content/` directory exists yet.** Don't assume sample posts are
  present; bootstrap with `task new-post` when you need one.
- **`site/assets/{fonts,images,posts,projects}/` are gitignored.** Don't commit
  binaries to git; push them to GCS with `task assets:sync:up:hard`. Adding a
  new bucket-backed tree means updating both `.gitignore` and
  `ASSETS_REMOTE_DIRS`, or the sync will silently skip it.
- **Hugo extended is required** (SCSS). The standard build will fail on
  `base.scss`.
- **Taskfile uses `{{.MATCH}}` wildcards** for `assets:sync:up*` /
  `assets:sync:down*`, so `task assets:sync:up:hard` and `task assets:sync:up`
  are the same task with different suffixes — `:hard` suppresses `--dry-run`.
