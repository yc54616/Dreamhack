FROM python:3.10-slim-buster

ENV USER dreame
ENV PORT 80

RUN apt-get update -y && apt-get install -y python3-pip build-essential wget curl unzip
RUN apt-get install -y mariadb-common mariadb-server mariadb-client

## chrome

RUN wget -O /tmp/chrome.deb https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
RUN apt install -y /tmp/chrome.deb
RUN rm /tmp/chrome.deb

RUN apt-get update -y && apt-get install -y libnss3
RUN wget https://chromedriver.storage.googleapis.com/`curl -sS https://chromedriver.storage.googleapis.com/LATEST_RELEASE`/chromedriver_linux64.zip && unzip chromedriver_linux64.zip && rm chromedriver_linux64.zip

RUN pip install --upgrade pip
RUN adduser --disabled-password $USER

WORKDIR /app

COPY ./app /app
RUN pip install -r requirements.txt

RUN /bin/bash -c "/usr/bin/mysqld_safe &" && \
  sleep 5 && \
  mysql -uroot < /app/init.sql && \
  rm /app/init.sql

RUN chmod +x run.sh

EXPOSE $PORT

CMD ["./run.sh"]