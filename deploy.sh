#!/bin/bash

docker stop marketplace-backend
docker rm marketplace-backend

docker run --name marketplace-backend \
           -p 14002:14002 \
           --link marketplace-mysql:mysql \
           -d marketplace/backend

docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' marketplace-backend