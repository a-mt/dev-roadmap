#!/bin/bash
set -e

#----------------------------------------------------
# Start all containers
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to start containers as $USER" >&2
  exit 1
fi

# ---
# Detect which image to launch
if [ $# = 0 ]; then
  TAG_VERSION="$CI_REGISTRY_IMAGE/$CI_PIPELINE:latest"
else
  TAG_VERSION="$1"
fi
echo "[+] Launching $TAG_VERSION"

if [[ ! $(docker images $TAG_VERSION -q) ]]; then
  echo "Existing images:"
  docker images "$CI_REGISTRY_IMAGE/$CI_PIPELINE"

  echo "Image $TAG_VERSION does not exist: stopping" >&2
  exit 1
fi

# ---
# Detect which settings to use
CICD_DIR="$HOME/cicd"

# Read cicd.settings label
hash=$(docker inspect -f '{{index .Config.Labels "cicd.settings"}}' $TAG_VERSION)
echo "Settings: $hash"

# No label: just use the latest settings
if [ -z "$hash" ]; then
  dir=$(ls -trF1 "$CICD_DIR" | grep '/$' | head -1)

  if [ -z "$dir" ]; then
    echo "Not found: $CICD_DIR/*" >&2
    exit 1
  fi
  hash="${dir:0:-1}"
  echo "Last: $hash"
fi

# Check that the settings have been pushed (job deploy-settings)
LATEST_CICD="$CICD_DIR/$hash"

if [ ! -d "$LATEST_CICD" ]; then
  echo "Not found: $LATEST_CICD" >&2
  exit 1
fi

# ---
# Check if we need to switch settings
if [ -h "$CICD_DIR/current" ]; then
  CURRENT_CICD=`readlink "$CICD_DIR/current"`

  # We do
  if [ "$CURRENT_CICD" != "$LATEST_CICD" ]; then

    # Stop the current containers
    echo "+ Switching settings: $CURRENT_CICD -> $LATEST_CICD"

    cd "$CURRENT_CICD"
    docker-compose --file docker-compose.yml down
    cd -

    # Install the new crontab
    if [ -f "$LATEST_CICD/crontab" ]; then
      crontab "$LATEST_CICD/crontab"
    fi
  fi
fi
ln -sfn "$LATEST_CICD" "$CICD_DIR/current"

# ---
# Start the new containers
echo "+ Starting containers"
cd "$LATEST_CICD"
chmod +x *.sh

# Start the databases first, then the containers
docker-compose up db redis -d

TAG_VERSION="$TAG_VERSION" docker-compose up -d

# Print latest API logs
echo "+ Logs"
echo -n "Wait 10s";
for i in $(seq 10 -1 1); do
  echo -n '.';
  sleep 1;
done
echo ""
docker-compose logs api

echo "...done"
