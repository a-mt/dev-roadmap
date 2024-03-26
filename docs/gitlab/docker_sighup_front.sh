#!/bin/bash
set -e

#----------------------------------------------------
# Sends a SIGHUP signal
# to the front container (if running)
#
# This will reload nginx, so that nginx uses
# the new .conf file & SSL certificate
#----------------------------------------------------

if [[ $(docker ps -q -f name=front) ]]; then
    echo "Reloading..."
    docker kill --signal=SIGHUP front
else
    echo "Nothing to do!"
fi
