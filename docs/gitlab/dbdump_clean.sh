#!/bin/bash
set -e

#----------------------------------------------------
# Only keep the last 16 .pgdump files in the db volume
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to start containers as $USER" >&2
  exit 1
fi
docker-compose start db

# only keep the last 15 .pgdump
echo "[+] Removing old postgres database dumps"
docker-compose exec db bash -c 'ls -t1 /var/dump_pgsql/*.pgdump | tail -n +16 | xargs rm -rf'
