#! /bin/sh

# Install Task to `./bin`.
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d

# Add ~/bin to path
PATH=/opt/buildhome/bin:$PATH

# Install aws-cli.
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install -i ~/aws-cli -b ~/bin

# Run build task.
./bin/task build
