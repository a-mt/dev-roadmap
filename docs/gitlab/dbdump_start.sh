#!/bin/bash
set -e

#----------------------------------------------------
# Dump the database to a .pgdump file
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to start containers as $USER" >&2
  exit 1
fi
docker-compose start db

echo "[+] Dumping postgres database"

cmd=$(cat <<'NOWDOC'
file="/var/dump_pgsql/$(date -u +'%Y%m%d_%H%M').pgdump" &&
pg_dump --no-owner -x -Fc -f $file $POSTGRES_DB -U $POSTGRES_USER &&
echo Database dumped to $file
NOWDOC
)
docker-compose exec db bash -c "$cmd"
