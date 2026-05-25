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
├── deploy.sh           Netlify build hook (installs Task + aws-cli, runs `task build`)
├── .gitmodules         Pins site/themes/hugo-coder
├── out/                Hugo build output (gitignored)
└── site/               Hugo project root — passed to hugo as --source
    ├── config.yaml     Site config (legacy path; see "Outstanding TODOs")
    ├── archetypes/
    │   └── posts.md    Front-matter template for `task new-post`
    ├── assets/
    │   ├── images/     Binary images (gitignored — synced from S3)
    │   └── styles/     SCSS pipeline
    │       ├── base.scss     Entry point (referenced from config.yaml)
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

### Navigation menu (from `config.yaml`)

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
   `config.yaml` under `params.customizations.styles`. The override at
   `layouts/partials/head/custom-styles.html` reads that list and runs each
   entry through Hugo Pipes:
   - **Server mode** (`hugo server`): `toCSS` with sourcemaps, no fingerprint.
   - **Build mode**: `toCSS | minify | fingerprint` with SRI integrity hashes.

2. **Images** — `site/assets/images/` is **gitignored**. Images are stored
   in S3 (`s3://site-assets.jxf.me`) and synced via Taskfile:
   - `task sync:down` (dry-run) / `task sync:down:hard` (actual)
   - `task sync:up`   (dry-run) / `task sync:up:hard`   (actual)

   AWS credentials come from the `jxf-site` AWS CLI profile, or from
   `SECRETS_AWS_ACCESS_KEY_ID` / `SECRETS_AWS_SECRET_ACCESS_KEY` env vars
   (the form Netlify exposes — see `deploy.sh`).

   The avatar URL in `config.yaml` is hardcoded to a public S3 URL
   (`https://s3.amazonaws.com/assets.jxf.me/images/jf.jpeg`) — see the
   author's TODOs in `README.md` about making prod/dev image paths
   environment-aware.

## Common commands

All run from the repo root via [Task](https://taskfile.dev):

| Command                       | What it does                                             |
| ----------------------------- | -------------------------------------------------------- |
| `task serve`                  | Live-reload server on http://localhost:1313 (cleans first) |
| `task build`                  | Production build into `./out/`                            |
| `task clean`                  | Remove `out/` and `site/resources/`                       |
| `task new-post ITEM_NAME=foo` | Scaffold `site/content/posts/foo.md` from the archetype   |
| `task sync:down` / `:down:hard` | Pull image assets from S3 (dry-run / actual)            |
| `task sync:up`   / `:up:hard`   | Push image assets to S3 (dry-run / actual)              |

Direct Hugo invocation (when Task isn't appropriate):

```sh
hugo server --source site --destination out          # dev
hugo --source site --destination out                 # build
hugo new content -k posts --source site posts/foo.md # new post
```

## Deployment

`deploy.sh` is the Netlify build script: it bootstraps Task and aws-cli, then
runs `task build`. The `baseURL` in `config.yaml`
(`https://jxf-dot-me.netlify.app/`) is the deploy target.

## Outstanding TODOs (from README.md)

These are unresolved decisions the author flagged — useful context if a
proposed change touches them:

1. **Image path strategy** — should production read images from S3 while
   dev reads them locally? The avatar partial is the proposed test bed.
   Open Hugo forum thread:
   https://discourse.gohugo.io/t/best-practice-for-serving-different-images-in-production-vs-development/50560
2. **Config location** — Hugo now prefers `config/hugo.yaml` over the
   legacy `config.yaml` this project still uses.
3. **Per-environment overrides** — leverage Hugo's environment configs
   for production-only overrides (e.g., the image path issue above).

## Gotchas for agents

- **The theme is a submodule.** Don't edit `site/themes/hugo-coder/`
  directly. Override via `site/layouts/`.
- **Theme uses `_partials/`, project uses `partials/`.** Both paths resolve
  to the same lookup namespace in Hugo — keep using `partials/` for new
  overrides for consistency with what's already here.
- **No `content/` directory exists yet.** Don't assume sample posts are
  present; bootstrap with `task new-post` when you need one.
- **`site/assets/images/` is gitignored.** Don't commit images to git;
  push them to S3 with `task sync:up:hard`.
- **Hugo extended is required** (SCSS). The standard build will fail on
  `base.scss`.
- **Taskfile uses `{{.MATCH}}` wildcards** for `sync:up*` / `sync:down*`,
  so `task sync:up:hard` and `task sync:up` are the same task with
  different suffixes — `:hard` suppresses `--dryrun`.
