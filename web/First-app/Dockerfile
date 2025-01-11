FROM node:14.16.0-alpine

RUN apk add --update --no-cache supervisor

RUN mkdir -p /app

WORKDIR /app
COPY private .

RUN npm install

COPY config/supervisord.conf /etc/supervisord.conf

EXPOSE 8000

CMD tail -f /dev/null
#CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
