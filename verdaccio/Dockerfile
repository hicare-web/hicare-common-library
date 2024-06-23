FROM --platform=amd64 verdaccio/verdaccio:5.x-next

ADD ./config.yaml /verdaccio/conf/config.yaml
ADD ./htpasswd /verdaccio/conf/htpasswd

VOLUME /verdaccio/storage