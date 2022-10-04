FROM caddy:2.6.1-alpine

RUN mkdir /site

WORKDIR /site

COPY ./public /site
COPY ./Caddyfile /etc/caddy/Caddyfile