#!/bin/bash

container="marketplace-backend"

#Stop marketplace Docker if running...
printf "Stopping $container Container: "
docker stop $container

#Delete marketplace container if exist...
printf "Removing $container Container: "
docker rm -f $container

#Run container
printf "Starting $container Container: "
docker run --name $container \
           -p 14002:14002 \
           -e MRKP_BACK_DB=marketplace \
           -e MRKP_BACK_DB_USER=user1 \
           -e MRKP_BACK_DB_PWD=WuT2Tf26zl \
           -e MRKP_BACK_DB_HOST=mysql \
           --link marketplace-mysql:mysql \
           -d marketplace/backend

#Get ip docker instance of mysql
printf "$container Container started in: "
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' $container