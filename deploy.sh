#! /bin/sh

# Install Task to `./bin`.
sh -c "$(curl --location https://taskfile.dev/install.sh)" -- -d

# Add ~/bin to path
PATH=/opt/buildhome/bin:$PATH

# Install aws-cli.
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
./aws/install -i ~/aws-cli -b ~/bin

printenv

echo "AWS access key is: [$SECRETS_AWS_SECRET_ACCESS_KEY]"
test -z "$SECRETS_AWS_SECRET_ACCESS_KEY"
echo "Exit code: $?"

echo "AWS secret key is: [$SECRETS_AWS_ACCESS_KEY_ID]"
test -z "$SECRETS_AWS_ACCESS_KEY_ID"
echo "Exit code: $?"

# Run build task.
./bin/task build
