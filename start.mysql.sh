#!/bin/bash

docker stop marketplace-mysql
docker rm marketplace-mysql

docker run --name marketplace-mysql \
           -e MYSQL_ROOT_PASSWORD=N6HSAlv8YD \
           -e MYSQL_DATABASE=marketplace \
           -e MYSQL_USER=user1 \
           -e MYSQL_PASSWORD=WuT2Tf26zl \
           -p 14001:3306 \
           -v "$PWD/store":/var/lib/mysql \
           -d mysql:5.7

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' marketplace-mysql