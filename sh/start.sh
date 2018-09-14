#!/bin/bash

ROOT_DIR=$(dirname $( dirname "${BASH_SOURCE[0]}" ) )

PORT_NUM=$1
if [ "${PORT_NUM}" = "" ];
then
    PORT_NUM=3000
fi


node "${ROOT_DIR}/index.js" $PORT_NUM >> "${ROOT_DIR}/data/app.log" 2>&1 &
PROC_EXIT_CODE=$?
PROC_PID=$!

if ! [ $PROC_EXIT_CODE -eq 0 ];
then
    echo -e "Unable to start server\nCheck ${ROOT_DIR}/data/app.log"
else
    echo -e "Process started under ${PROC_PID}"
    echo "$PROC_PID" > "${ROOT_DIR}/data/app.lock"
fi

