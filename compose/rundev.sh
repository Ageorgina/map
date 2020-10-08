#!/bin/bash
PORT=8888 \
CONFIG_PATH=/home/chololo/disco2/workspaces/projects/cartografia_entropia/compose/nginx \
SITE_PATH=/home/chololo/disco2/workspaces/projects/cartografia_entropia/dist/cartografia \
docker-compose -f nginx-compose.yml up -d
