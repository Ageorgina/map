#!/bin/bash
#PORT=8888 \
#CONFIG_PATH=/home/chololo/disco2/workspaces/projects/cartografia_entropia/compose/nginx \
#SITE_PATH=/home/chololo/disco2/workspaces/projects/cartografia_entropia/dist/cartografia \
PORT=8888
CONFIG_PATH=/respaldos/workspaces/projects/asg/cartografia_entropia/compose/nginx
SITE_PATH=/respaldos/workspaces/projects/asg/cartografia_entropia/dist/cartografia
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
