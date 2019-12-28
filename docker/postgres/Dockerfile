FROM postgres:latest
RUN mkdir -p /back/
ADD ./dbbackups/20191228.sql /docker-entrypoint-initdb.d/001_data.sql
ENV PGDATA=/data

