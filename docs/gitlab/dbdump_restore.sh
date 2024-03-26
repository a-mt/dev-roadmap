#!/bin/bash
set -e

#----------------------------------------------------
# Restore the database from the given .pgdump file
# Will stop the backend, drop the database and restore it
# from the file. You have to manually bring the backend back up
#----------------------------------------------------

if [ $UID != 1000 ]; then
  echo "Refusing to start containers as $USER" >&2
  exit 1
fi
filename="$1"

# List backups
CURRENT_DIR=$(dirname "${BASH_SOURCE[0]}")
bash "$CURRENT_DIR/dbdump_ls.sh"

if [ -z "$filename" -o "$filename" = "-" ]; then
  echo "Filename is empty: stopping" >&2
  exit 1
fi
echo "+ Restoring postgres database from $filename"

# Stop containers that depend on db
# Also stop db to force all "docker exec ... psql" to exit
docker-compose stop api celery db
docker-compose start db

# Restore the database using a backup
cmd=$(cat <<'NOWDOC'
[ -e "$file" ] &&
dropdb -U $POSTGRES_USER $POSTGRES_DB &&
createdb -U $POSTGRES_USER $POSTGRES_DB &&
pg_restore -U $POSTGRES_USER -d $POSTGRES_DB "$file" &&
echo Database restored from $file ||
echo Could not restore database from $file
NOWDOC
)
docker-compose exec db bash -c "file=/var/dump_pgsql/$filename; $cmd"
