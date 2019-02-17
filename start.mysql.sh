#!/bin/bash


#Create directory if not exist
if [ ! -d "store" ]; then mkdir -p store; fi

#Stop MySQL Docker if running...
printf "Stopping MySQL Container: "
docker stop marketplace-mysql

#Delete mysql container if exist...
printf "Removing MySQL Container: "
docker rm marketplace-mysql

#Run container mysql with custom parameters
printf "Starting MySQL Container: "
docker run --name marketplace-mysql \
           -e MYSQL_ROOT_PASSWORD=N6HSAlv8YD \
           -e MYSQL_DATABASE=marketplace \
           -e MYSQL_USER=user1 \
           -e MYSQL_PASSWORD=WuT2Tf26zl \
           -p 14001:3306 \
           -v "$PWD/store":/var/lib/mysql \
           -d mysql:5.7

#Get ip docker instance of mysql
printf "MySQL Container started in: "
docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' marketplace-mysql