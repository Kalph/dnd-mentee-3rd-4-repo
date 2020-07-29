FROM python:3.8-slim-buster AS builder

ENV ACCEPT_EULA=Y

# Ref: https://github.com/Azure/azure-functions-docker/blob/master/host/3.0/buster/amd64/python/python38/python38-buildenv.Dockerfile

RUN apt-get update && \
    apt-get install -y wget && \
    echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections && \
    apt-get update && \
    apt-get install -y apt-transport-https curl gnupg && \
    # curl https://packages.microsoft.com/keys/microsoft.asc | apt-key add - && \
    # curl https://packages.microsoft.com/config/debian/9/prod.list > /etc/apt/sources.list.d/mssql-release.list && \
    # Needed for libss1.0.0 and in turn MS SQL
    # echo 'deb http://security.debian.org/debian-security jessie/updates main' >> /etc/apt/sources.list && \
    # install necessary locales for MS SQL
    apt-get update && apt-get install -y locales && \
    echo 'ko_KR.UTF-8 UTF-8' > /etc/locale.gen && \
    locale-gen && \
    # install MS SQL related packages
    apt-get update && \
    apt-get install -y unixodbc-dev

RUN apt-get install -y build-essential libjpeg-dev

# 빌드 시점에만 참조되는 변수
ARG REQUIREMENTS_PATH=./requirements/prod.txt

WORKDIR /djangoproject
COPY requirements/ requirements.txt /djangoproject/requirements/
RUN echo "Using ${REQUIREMENTS_PATH} ..."
RUN pip install --target /python-packages/ -r ${REQUIREMENTS_PATH}

# 대략 385MB -> 215MB 효과
FROM python:3.8-slim-buster
COPY --from=builder /python-packages /python-packages
# COPY --from=builder /lib/x86_64-linux-gnu/ /lib/x86_64-linux-gnu/
# COPY --from=builder /usr/lib/x86_64-linux-gnu/ /usr/lib/x86_64-linux-gnu/
# COPY --from=builder /usr/lib64/ /usr/lib64
# COPY --from=builder /opt/microsoft/ /opt/microsoft/
# COPY --from=builder /opt/mssql-tools/ /opt/mssql-tools/
# COPY --from=builder /etc/odbcinst.ini /etc/odbcinst.ini
# COPY --from=builder /usr/bin/odbcinst /usr/bin/odbcinst
COPY ./bin/wait-for-it.sh /usr/bin

WORKDIR /djangoproject
COPY . /djangoproject

ENV PYTHONUNBUFFERED=1
ENV PYTHONPATH=/python-packages/

EXPOSE 80
EXPOSE 8000
EXPOSE 8888

# for dev
# CMD python manage.py runserver

# for test
# CMD pytest --junit-xml=./pytest_junit.xml > /dev/null && cat ./pytest_junit.xml

# for deploy
CMD /python-packages/bin/gunicorn \
    --access-logfile - \
    backend.wsgi.application \
    --bind 0.0.0.0:80 \
    --max-requests 1000 \
    --max-requests-jitter 50
