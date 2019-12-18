FROM alpine:latest

MAINTAINER Shoaib Khan

RUN apk add --update \
    python3-dev \
    postgresql-client \
    bash \
    py-psycopg2 \
    py-openssl \
    gcc \
    g++ \
    py-pillow \
    openssl-dev \
    libffi-dev \
    jpeg-dev \
    zlib-dev

RUN pip3 install --upgrade pip setuptools && \
    if [ ! -e /usr/bin/pip ]; then ln -s pip3 /usr/bin/pip ; fi && \
    if [[ ! -e /usr/bin/python ]]; then ln -sf /usr/bin/python3 /usr/bin/python; fi && \
    pip install virtualenvwrapper && \
    virtualenv --python=python3 env && \
    source env/bin/activate

COPY requirements.txt /requirements.txt

RUN pip install -r requirements.txt

WORKDIR /todo

COPY ./todo .

COPY entrypoint.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/entrypoint.sh"]