FROM eclipse-temurin:8-jdk-jammy

ENV USER author
ENV PORT 8080

RUN adduser --disabled-password $USER

WORKDIR /app

COPY ./deploy/autumn-leaves-1.0-SNAPSHOT.jar .

RUN apt-get update && \
    apt-get install -y gcc

COPY ./deploy/flag.c /flag.c
RUN chmod 444 /flag.c && \
    chown root:$USER /flag.c

USER $USER
EXPOSE $PORT

CMD ["java","-jar","./autumn-leaves-1.0-SNAPSHOT.jar"]