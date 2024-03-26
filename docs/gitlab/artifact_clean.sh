#!/bin/bash
set -e

#----------------------------------------------------
# Archive directories in ~/artifacts/NAME/* as .tar.gz
# Only keep the last 3 .gz for each project
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to execute as $USER" >&2
  exit 1
fi
echo "[+] Removing old artifacts"

# Delete old artifacts
dirs=($HOME/artifacts/*)

for dir in "${dirs[@]}"; do
  echo "- $dir"

  # replace dir with .tar.gz
  find $dir \
    -mindepth 1 -maxdepth 1 \
    -type d \
    -execdir tar -czf {}.gz {} --remove-files \;

  # only keep the last 3 .gz
  ls -t1 $dir/*.gz | tail -n +4 | xargs rm -rf
done
