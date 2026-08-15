#! /bin/sh

# Netlify build entry point: install the pinned tools into ./bin, then build.
# The versions come from netlify.toml, so a deploy uses known tools instead of
# whatever the build image happens to ship.
#
# `deploy.sh --base-url` prints the base URL the current context builds with
# and exits, which is how `task check:deploy` exercises that choice without
# downloading anything.

set -eu

# The address that serves this deploy: the site URL in production, and the
# deploy's own URL for a preview or branch deploy. The absolute URLs Hugo
# writes (canonical links, RSS, sitemap) must agree with it. Away from Netlify
# there is no such address, and the empty answer keeps the configured baseURL.
base_url() {
  if [ "${CONTEXT:-}" = "production" ]; then
    echo "${URL:-}"
  else
    echo "${DEPLOY_PRIME_URL:-}"
  fi
}

if [ "${1:-}" = "--base-url" ]; then
  base_url
  exit 0
fi

# Named apart from Netlify's own HUGO_VERSION: that key makes the build image
# provision a second Hugo of its own, which this build then has to shadow.
: "${SITE_HUGO_VERSION:?no SITE_HUGO_VERSION; set it in netlify.toml}"
: "${SITE_TASK_VERSION:?no SITE_TASK_VERSION; set it in netlify.toml}"

BIN_PATH="$PWD/bin"
PATH="$BIN_PATH:$PATH"
export PATH

mkdir -p "$BIN_PATH"

# Download to disk rather than pipe into a shell: `set -e` sees the exit status
# of the last command in a pipeline, so a failed download would otherwise reach
# the build as a missing or half-written tool.
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT

# TEMPORARY, remove before merge: run the real sequence, noting each stage — the
# stage name and exit status only, never command output. The trap publishes what
# the run reached even if it dies partway, which a plain marker cannot do.
if [ "${REPORT_BUILD_STAGE:-}" = "1" ]; then
  trace="$tmp/stage.txt"
  : >"$trace"
  trap 'mkdir -p out; cp "$trace" out/stage.txt 2>/dev/null; rm -rf "$tmp"; exit 0' EXIT
  note() { echo "$1" >>"$trace"; }

  note "deploy.sh ran"
  curl --fail --location --silent --show-error \
    --output "$tmp/task-install.sh" "https://taskfile.dev/install.sh"
  sh "$tmp/task-install.sh" -b "$BIN_PATH" "$SITE_TASK_VERSION" >/dev/null 2>&1
  note "task installed"

  curl --fail --location --silent --show-error --output "$tmp/hugo.tar.gz" \
    "https://github.com/gohugoio/hugo/releases/download/v${SITE_HUGO_VERSION}/hugo_extended_${SITE_HUGO_VERSION}_linux-amd64.tar.gz"
  tar -xzf "$tmp/hugo.tar.gz" -C "$BIN_PATH" hugo
  note "hugo installed"

  case "$(hugo version)" in
    *"v${SITE_HUGO_VERSION}"*"+extended"*) note "hugo assertion passed" ;;
    *) note "hugo assertion failed" ;;
  esac
  case "$(task --version)" in
    *"${SITE_TASK_VERSION#v}"*) note "task assertion passed" ;;
    *) note "task assertion failed" ;;
  esac

  status=0
  task check:deploy >/dev/null 2>&1 || status=$?
  note "check:deploy exit $status"

  # Does Task resolve OUTPUT_PATH under the repo? A count, not the path.
  note "output path under repo: $(task --dry build 2>&1 | grep -c "$PWD/out")"

  # Run hugo itself, writing outside out/ so the publish directory stays under
  # this script's control whatever hugo does.
  status=0
  hugo --source site --destination "$tmp/site-out" >/dev/null 2>&1 || status=$?
  note "hugo exit $status"
  note "hugo wrote files: $(find "$tmp/site-out" -type f 2>/dev/null | wc -l)"
  exit 0
fi

curl --fail --location --silent --show-error \
  --output "$tmp/task-install.sh" "https://taskfile.dev/install.sh"
sh "$tmp/task-install.sh" -b "$BIN_PATH" "$SITE_TASK_VERSION"

# The site needs the extended Hugo, which compiles SCSS. The build image has a
# Hugo of its own, so put ours earlier in PATH.
curl --fail --location --silent --show-error --output "$tmp/hugo.tar.gz" \
  "https://github.com/gohugoio/hugo/releases/download/v${SITE_HUGO_VERSION}/hugo_extended_${SITE_HUGO_VERSION}_linux-amd64.tar.gz"
tar -xzf "$tmp/hugo.tar.gz" -C "$BIN_PATH" hugo

# Prove the build runs the pinned tools. Without this the deploy log shows the
# versions but nothing rejects a different one — an installer that ignores the
# version it is given, or another Hugo found earlier in PATH.
hugo_found=$(hugo version)
case "$hugo_found" in
  *"v${SITE_HUGO_VERSION}"*"+extended"*) ;;
  *)
    echo "deploy: want extended Hugo v${SITE_HUGO_VERSION}, found: $hugo_found" >&2
    exit 1
    ;;
esac

task_found=$(task --version)
case "$task_found" in
  *"${SITE_TASK_VERSION#v}"*) ;;
  *)
    echo "deploy: want Task ${SITE_TASK_VERSION}, found: $task_found" >&2
    exit 1
    ;;
esac

echo "deploy: $hugo_found"
echo "deploy: task $task_found"

# TEMPORARY, remove before merge: a failed build publishes nothing, so which
# stage failed cannot be seen without the Netlify dashboard. In a preview,
# record the stage — the name only, never the output — and publish it.
if [ "${REPORT_BUILD_STAGE:-}" = "1" ]; then
  stage="tools installed"
  if task check:deploy >/dev/null 2>&1; then
    stage="check passed"
    if task build BASE_URL="$(base_url)" >/dev/null 2>&1; then
      stage="build passed"
    else
      stage="build failed (exit $?)"
    fi
  else
    stage="check failed (exit $?)"
  fi
  mkdir -p out
  printf '%s\n' "$stage" >out/stage.txt
  echo "deploy: reached stage: $stage"
  exit 0
fi

task check:deploy
task build BASE_URL="$(base_url)"
