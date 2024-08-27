FROM caddy:2.8.4-alpine

RUN mkdir /site

WORKDIR /site

COPY ./out /site
COPY ./Caddyfile /etc/caddy/Caddyfile