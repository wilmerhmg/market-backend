# market-backend
Marketplace backend api for Technical Test https://condorlabs.io

#Installation
#### Requirements
- Docker
- Node JS
- Unix OS (Mac OSX, Linux)

Download and install
```
$ git clone https://github.com/Dev-Wito/market-backend.git
$ cd market-backend
$ npm install
```

#### Run development server

##### 1. Start MySQL Container
```
$ bash start.mysql.sh

Stopping MySQL Container: marketplace-mysql
Removing MySQL Container: marketplace-mysql
Starting MySQL Container: 90916b36a406a45ca22df370010618e5ea5492e0741c9e314b8098fc05ecee0e
MySQL Container started in: 172.17.0.2
```
MySQL exposes port `14001` development environment

##### 2. Run Server
```
$ npm run dev
consign v0.1.6 Initialized in /Users/wito/Repositorios/market-backend/src
+ ./config/init.js
+ ./config/db.js
+ ./core/middlewares.js
+ ./controllers/articles.js
+ ./controllers/categories.js
+ ./routes/articles.js
+ ./routes/categories.js
+ ./routes/circuit.breaker.js
+ ./core/boot.js
Middleware load...
Server on port 14002
```
The default backend port is `14002`

---
#### Run environment server

You just need
```
$ bash build.sh
--------------BUILDING ENVIRONMENT PRODUCTION--------------
Untagged: marketplace/backend:latest
...
Starting marketplace-backend Container: 7f8ff1ec954c9efe0fb1cd22e530aa795806e5cd44b955c32e2824d7a5a93d88
marketplace-backend Container started in: 172.17.0.3
```
Check status container

```
$ docker ps -a
CONTAINER ID        IMAGE                 COMMAND                  CREATED              STATUS              PORTS                                NAMES
7f8ff1ec954c        marketplace/backend   "/app/docker-entrypo…"   About a minute ago   Up About a minute   0.0.0.0:14002->14002/tcp             marketplace-backend
bf8a99517b64        mysql:5.7             "docker-entrypoint.s…"   2 minutes ago        Up 2 minutes        33060/tcp, 0.0.0.0:14001->3306/tcp   marketplace-mysql

```

You could make requests at `http://localhost:14002/marketplace/api/v1/`

### API Endpoints
View [API Documentation on Swagger](https://app.swaggerhub.com/apis-docs/Dev-Wito/marketplace-backend/1.0.0)