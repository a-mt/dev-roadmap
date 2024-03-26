#!/bin/bash
set -e

#----------------------------------------------------
# Stop all containers & re-launch everything
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to start containers as $USER" >&2
  exit 1
fi
echo "[+] Restart"

file=~/cicd/current/docker-compose.yml

if [ -e "$file" ]; then
    docker-compose --file="$file" down
    docker-compose --file="$file" up -d
else
    echo "Not found: $file" >&2
    exit 1
fi

echo "...done"
