FROM caddy:2.11-alpine

RUN mkdir /site

WORKDIR /site

COPY ./out /site
COPY ./Caddyfile /etc/caddy/Caddyfile