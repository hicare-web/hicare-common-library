FROM node:20

RUN apt-get update && apt-get install -y \
    curl \
    git \
    jq \
    vim \
    wget

COPY . /app

WORKDIR /app

RUN corepack enable


ENTRYPOINT ["tail", "-f", "/dev/null"]