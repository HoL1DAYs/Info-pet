FROM python:alpine

WORKDIR /app

ENV PYTHONUNBUFFERED 1

RUN pip install requests beautifulsoup4 sqlalchemy psycopg2-binary lxml

COPY . .

CMD [ "python", "pushingData.py" ]