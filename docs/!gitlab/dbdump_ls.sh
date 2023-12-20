#!/bin/bash
set -e

#----------------------------------------------------
# List .pgdump files in the db volume
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to start containers as $USER" >&2
  exit 1
fi
docker-compose start db

echo "[+] Listing postgres database dumps"
docker-compose exec db bash -c 'ls -lt /var/dump_pgsql'
