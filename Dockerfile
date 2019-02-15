FROM mhart/alpine-node:8.12.0
RUN clear
RUN mkdir /app
RUN mkdir /app/data

COPY ./app.js /app/
COPY ./package.json /app/
COPY docker-entrypoint.sh /

RUN cd /app && npm install
RUN npm cache clean --force
RUN rm -rf /tmp/* /var/cache/apk/*
RUN ls -C /app

EXPOSE 14002

ENTRYPOINT ["/docker-entrypoint.sh"]