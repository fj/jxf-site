> "The time has come", the Walrus said,<br/>
> &emsp;"To talk of many things;<br/>
> Of ships, and shoes, and sealing-wax;<br/>
> &emsp;of cabbages and kings."<br/>

&mdash; Lewis Carroll

## Dependencies

This project needs two precompiled binaries:

* [Taskfile](https://taskfile.dev/#/) to run the commands in `Taskfile.yml`.

* [Hugo](https://gohugo.io/getting-started/installing/) to build the site. You'll need the _extended_ version, which includes SASS and SCSS compilation support, to build this site.

## Todo

* The asset paths are currently hardcoded. Is there a way to do this selectively, so that production assets are served from the S3 bucket while development assets aren't? Maybe a shortcode?
  * Let's use the layouts/partials/home/avatar.html partial as the test run for this.
  * After we `sync:down:hard` our images, should we `cp site/assets/images -> static/assets/images` and then .gitignore these?
  * Made an open post about this here: https://discourse.gohugo.io/t/best-practice-for-serving-different-images-in-production-vs-development/50560

* Follow new best practices for configuration -- it's `config/hugo.yaml` now instead of `config.yaml`.

* We should use the per-directory environment representation to do useful overrides, like having our image path for production.