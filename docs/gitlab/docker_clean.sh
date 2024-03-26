#!/bin/bash
set -e

#----------------------------------------------------
# Remove old docker containers & images
#----------------------------------------------------

echo "[+] Pruning docker"

echo "+ Removing unused cicd.pipeline containers"
docker container prune -f --filter 'label=cicd.pipeline' --filter until=24h

echo "+ Removing unused cicd.pipeline images"
DATE_LATEST=$(docker image ls --filter="reference=$CI_REGISTRY_IMAGE/*:latest" --format "{{.CreatedAt}}")

if [ ! -z "$DATE_LATEST" ]; then
  DATE=${DATE_LATEST:0:19}

  docker image prune -af --filter 'label=cicd.pipeline' --filter until="${DATE/ /T}"
fi

# 1 month = 24*31 hours
echo "+ Removing untagged images older than 1 month"
docker image prune -f --filter "until=744h"

# 3 months = 24*31*3 hours
echo "+ Removing unused images older than 3 months"
docker image prune -af --filter "until=2232h"
