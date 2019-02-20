FROM mhart/alpine-node:8.12.0
RUN clear
RUN mkdir /app
RUN mkdir /app/data

COPY ./ /app/

RUN cd /app && ls -C && npm install --loglevel=error && npm run build
RUN npm cache clean --force --loglevel=error
RUN rm -rf /tmp/* /var/cache/apk/*
RUN ls -C /app

EXPOSE 14002

ENTRYPOINT ["/app/docker-entrypoint.sh"]