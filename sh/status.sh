#!/bin/bash

ROOT_DIR=$(dirname $( dirname "${BASH_SOURCE[0]}" ) )

LOCK_FILE="${ROOT_DIR}/data/app.lock"

if [ -f "$LOCK_FILE" ];
then
    kill -0 $(cat "${LOCK_FILE}") > /dev/null 2>&1
    if ! [ $? -eq 0 ];
    then
        echo "NOT RUNNING"
    else
        echo "RUNNING"
    fi
else
    echo "NOT RUNNING"
fi


