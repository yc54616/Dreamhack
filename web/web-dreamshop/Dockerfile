FROM node:lts-slim

WORKDIR /app

RUN  apt-get update \
     && apt-get install -y wget gnupg ca-certificates \
     && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
     && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
     && apt-get update \
     && apt-get install -y google-chrome-stable libxss1 \
     && rm -rf /var/lib/apt/lists/* 

ADD deploy/app /app
RUN chown -R node:node /app

USER node
WORKDIR /app/backend
RUN npm install
CMD tail -f /dev/null