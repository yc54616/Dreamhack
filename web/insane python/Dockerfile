FROM python:3.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y python3-pip
RUN pip install --upgrade pip

COPY deploy/app.py /app/
COPY deploy/requirements.txt /app/
COPY deploy/templates /app/templates

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 9000

CMD ["python3", "app.py"]
