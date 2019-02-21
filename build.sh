#!/bin/bash
chmod -R +x *.sh

clear

bash start.mysql.sh

clear
echo "--------------BUILDING ENVIRONMENT PRODUCTION--------------"
docker rmi -f marketplace/backend
docker build -t marketplace/backend .
bash deploy.sh