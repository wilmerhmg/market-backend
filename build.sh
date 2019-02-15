#!/bin/bash
chmod -R +x *.sh

clear
echo "Seleccione el tipo de despliegue:"
echo "1. Entorno de produccion"
echo "2. Entorno de desarrollo"
printf "Codigo: " && read codigo

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