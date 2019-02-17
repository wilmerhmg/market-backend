#!/bin/bash
chmod -R +x *.sh

clear
echo "Select the type of deployment:"
echo "1. Production environment"
echo "2. Development environment"
printf "Codigo: " && read codigo

bash start.mysql.sh

if [ "$codigo" == "1" ]
then
    clear
    echo "--------------BUILDING ENVIRONMENT PRODUCTION--------------"
    docker rmi -f marketplace/backend
    docker build -t marketplace/backend .
    bash deploy.sh
elif [ "$codigo" == "2" ]
then
    bash dev-build.sh
else
    echo "has seleccionado una opción NO valida...." && read awbreak
fi