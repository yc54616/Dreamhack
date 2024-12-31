FROM node:18-alpine

COPY ./src/ /app/

RUN apk update && apk upgrade
RUN apk add chromium 

WORKDIR /app
RUN echo "bisc2023{FAKE_FLAG}" > flag.txt

EXPOSE 3000
CMD tail -f /dev/null
