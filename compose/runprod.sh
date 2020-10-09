#!/bin/bash
PORT=80
CONFIG_PATH=/opt/web/source/compose/nginx
SITE_PATH=/opt/web/source/dist/cartografia
if [ ! -d $CONFIG_PATH ]
then
    echo "CONFIG PATH no existe"
    exit 1
fi
if [ ! -d $SITE_PATH ]
then
    echo "SITE PATH no existe"
    exit 1
fi

PORT=$PORT CONFIG_PATH=$CONFIG_PATH SITE_PATH=$SITE_PATH docker-compose -f nginx-compose.yml up -d
