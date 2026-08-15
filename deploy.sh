#! /bin/sh

# Install Task to `./bin`.
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d

# Run build task.
./bin/task build
