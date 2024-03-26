#!/bin/bash
set -e

#----------------------------------------------------
# Copy artifacts from in ~/artifacts/NAME/SHA
# To ~/front (served by nginx)
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to execute as $USER" >&2
  exit 1
fi

# Check parameters
if [ $# = 0 ]; then
  echo 'Usage: depiscann $CI_COMMIT_SHA'
  exit 1
fi

PROJECT_NAME="$1"
COMMIT_SHA="$2"
echo "[+] Setting $PROJECT_NAME artifact to $COMMIT_SHA"

ARTIFACT_DIR="artifacts/$PROJECT_NAME/$COMMIT_SHA"
TARGET_DIR="front/$PROJECT_NAME"

# ---
# Check artifact
if [ -d "$HOME/$ARTIFACT_DIR" ]; then
  : # pass

elif [ -f "$HOME/$ARTIFACT_DIR.gz" ]; then
  echo "+ Extract $ARTIFACT_DIR.gz to $ARTIFACT_DIR"

  mkdir "$HOME/$ARTIFACT_DIR"
  tar -xzf "$HOME/$ARTIFACT_DIR.gz" --directory "$HOME/$ARTIFACT_DIR"
  rm "$HOME/$ARTIFACT_DIR.gz"

else
  echo "Not found: $ARTIFACT_DIR" >&2
  exit 1
fi

echo "+ Copy $ARTIFACT_DIR to $TARGET_DIR"
cp -rfT "$HOME/$ARTIFACT_DIR" "$HOME/$TARGET_DIR"
