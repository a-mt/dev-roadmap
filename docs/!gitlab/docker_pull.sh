#!/bin/bash
set -e

#----------------------------------------------------
# Pull a docker image from Gitlab
# Used in the CICD pipeline
#----------------------------------------------------

# Check parameters
if [ $# = 0 ]; then
  echo 'Usage: $TAG_LATEST -u gitlab-ci-token -p $CI_JOB_TOKEN $CI_REGISTRY'
  exit 1
fi

TAG_LATEST="$1"
shift

# ---
# Pull TAG_LATEST
echo "[+] Pull $TAG_LATEST"
docker --version

echo "+ Authenticating to registry"
docker login $@

echo "+ Pulling $TAG_LATEST"
docker pull $TAG_LATEST

echo "+ Logout"
docker logout

CI_COMMIT_SHA=$(docker inspect -f '{{index .Config.Labels "cicd.ci_commit_sha"}}' $TAG_LATEST)
if [ ! -z "$CI_COMMIT_SHA" ]; then
  TAG_VERSION="${TAG_LATEST%:*}:${CI_COMMIT_SHA}"

  echo "+ Tagging $TAG_VERSION"
  docker tag "$TAG_LATEST" "$TAG_VERSION"
fi

echo "...done"
